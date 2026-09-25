<%
	meta("../../meta.json")
	meta()
	const path = require('path');
	url = url + "/posts/" + path.basename(path.dirname(outputPath)) + "/";
	const _allPosts = metas("../../posts").filter(p => p.meta.published);
	_allPosts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
	const _mySlug = path.basename(path.dirname(outputPath));
	const _myIdx = _allPosts.findIndex(p => p.directory === _mySlug);
	const prevPost = _myIdx < _allPosts.length - 1 ? _allPosts[_myIdx + 1] : null;
	const nextPost = _myIdx > 0 ? _allPosts[_myIdx - 1] : null;
%>
<%= render("../../_partials/post-header.html", { title, image, url, description, caption, date, tags, reading_time }) %>

AgentGuard started with one question: what does it take to stop an LLM agent from misusing its tools? The usual answer is a filter in front of the chat box. That catches "ignore all previous instructions" typed in plain English. It misses the same sentence in base64, an instruction hidden inside a document the agent retrieves, and an attack spread over four polite messages.

So I put the security inside the agent. **[AgentGuard](https://github.com/haranloga/AgentGuard)** is a set of security nodes inside a LangGraph `StateGraph`. It runs as the backbone of ShopGuard, a demo e-commerce support bot with three roles: customer, support agent and admin. The model is qwen2.5:7b running locally through Ollama, with Groq as an optional provider, on an ordinary laptop with no GPU. All data is synthetic, from the orders database to the ML training set. The whole thing is about 3,500 lines of Python across 15 modules, built in five phases, with each phase's tests passing before the next one started.

## The graph

Every message goes through eight nodes. This is the graph as built in `core/agent.py`:

```python
graph = StateGraph(AgentState)
graph.add_node("sanitise_input", self._node_sanitise_input)
graph.add_node("ml_risk_score", self._node_ml_risk_score)
graph.add_node("llm_reason", self._node_llm_reason)
graph.add_node("validate_tool", self._node_validate_tool)
graph.add_node("execute_tool", self._node_execute_tool)
graph.add_node("memory_firewall", self._node_memory_firewall)
graph.add_node("correlate", self._node_correlate)
graph.add_node("filter_output", self._node_filter_output)
graph.set_entry_point("sanitise_input")

graph.add_conditional_edges("sanitise_input", self._router_input_allowed,
                            {"blocked": "filter_output", "clean": "ml_risk_score"})
graph.add_conditional_edges("ml_risk_score", self._router_ml_risk,
                            {"blocked": "filter_output", "continue": "correlate"})
graph.add_conditional_edges("correlate", self._router_correlation,
                            {"blocked": "filter_output", "continue": "llm_reason"})
graph.add_conditional_edges("llm_reason", self._router_needs_tool,
                            {"tool": "validate_tool", "done": "filter_output"})
graph.add_conditional_edges("validate_tool", self._router_policy_decision,
                            {"allowed": "execute_tool", "denied": "llm_reason"})
graph.add_edge("execute_tool", "memory_firewall")
graph.add_edge("memory_firewall", "correlate")
graph.add_edge("filter_output", END)
```

The conditional edges are why I used LangGraph. I looked at LangChain callbacks first. A callback can watch a request and log it, but it can't send the request somewhere else. Here a flagged input jumps straight to `filter_output`, and a denied tool call goes back to `llm_reason` so the model can answer without that tool.

Two things broke early on. A customer asking for database access had `db_query` denied, so the model asked for it again, and again, forever. The fix was a counter: after two denials in a row, the router forces a final answer. The second problem took longer to find. LangGraph routers can only return a label, and anything a router writes to the state is silently dropped. All state changes had to move into the nodes.

## Access control from a YAML file

The policy engine reads `config/policy.yaml` at startup and checks every tool call in three steps: is this tool allowed for the role, are the arguments within that role's limits, and do the arguments match any globally denied pattern.

| Role | Tools allowed | Constraints |
|---|---|---|
| `customer` | `web_search`, `rag_search` | No database access. Answers come from the knowledge base only |
| `support_agent` | `web_search`, `db_query`, `rag_search` | `db_query` capped at 50 rows, limited to `orders`, `products`, `categories`, `reviews`, `support_tickets`. `DROP`, `DELETE`, `UPDATE`, `INSERT` and `ALTER` are denied |
| `admin` | `web_search`, `db_query`, `file_read`, `rag_search` | `db_query` capped at 100 rows on any table, still no `DROP` or `ALTER`. `file_read` limited to `data/` and `documents/`, with `.env`, `config/`, `/etc/` and `/secrets/` denied |

Some rules apply to every role: at most 3 tool calls per turn, and a list of argument patterns that are always refused.

```yaml
global_rules:
  max_tool_calls_per_turn: 3
  denied_tool_argument_patterns:
    - "password"
    - "secret"
    - "credit_card"
    - "/etc/passwd"
    - "rm -rf"
    - "api_key"
    - "auth_token"
```

Because the check runs on the arguments, even an admin can't pass `/etc/passwd` to `file_read`. Changing a permission means editing the YAML file, with no code change or redeploy.

One integration bug came from Groq's API, which rejected tool calls for tools that weren't in the original request. So the model always receives every tool definition, and the role check happens in `validate_tool`.

## Redacting PII before the model sees it

Tool results normally go straight into the conversation. If a support agent asks about an order and the database row includes the customer's email and phone number, the model now has both, and can repeat them in any later answer. The memory firewall node sits between `execute_tool` and the next reasoning step, so the model only ever sees the redacted version:

```
Tool result: {"name": "Alice", "email": "alice@email.com", "phone": "555-0101"}
Redacted:    {"name": "Alice", "email": "[REDACTED_EMAIL]", "phone": "[REDACTED_PHONE]"}
```

The detector finds card numbers, emails, phone numbers, SSNs and street addresses. Two of its checks came from false positives. Without a Luhn checksum, any 16-digit number starting with 4 looked like a Visa card, and order IDs matched. The first phone regex flagged 14 order IDs, so it now needs a `+1` prefix or a `(nnn)` area code. Both changes brought the false positives on the test data to zero. The output filter runs the same detector again on the final answer as a second check.

## Injection detection, and the base64 hole

The sanitiser gives each message a score. Each injection pattern has a weight, the score is the highest matching weight, and every extra match adds 0.05. A message is blocked at 0.80. A score avoids the problem of a plain blocklist, where one harmless word can block a normal question.

In the first version, a base64-encoded "ignore all previous instructions" scored 0.0, because the sanitiser only looked at the raw text. I added an encoding detector that decodes base64, hex, URL encoding, ROT13 and Unicode homoglyphs, then runs the same patterns on every decoded version. The same payload now scores 0.95.

For retrieved documents, a RAG guard checks each document before the model sees it: an injection scan, a SHA-256 integrity check, and a check that the document fits its category. A document that fails is quarantined and swapped for a placeholder.

## The attack that got through

Some attacks are harmless one message at a time. A customer claims to be an admin, then asks what tools exist, then asks for everyone's email addresses. The correlation engine keeps each session's security events in a sliding time window and runs six rules against them. Some rules fire when enough matching events pile up, others only when events happen in a certain order.

To test all of this, a red-team class sends 54 attacks through the full pipeline and records which are blocked:

| Category | Attacks | Blocked at first | Main defence |
|---|---|---|---|
| Direct injection | 12 | 12 | Sanitiser (score ≥ 0.80) |
| Indirect injection (poisoned document) | 8 | 8 | RAG guard |
| Role escalation | 10 | 10 | Permission manager and correlation |
| Encoded bypass | 10 | 10 | Encoding detector, then sanitiser |
| PII exfiltration | 8 | 8 | Memory firewall and output filter |
| Slow multi-turn | 6 | 5 | Correlation engine |
| **Total** | **54** | **53 (98.1%)** | |

The one that got through was a slow escalation: four turns, more than 90 seconds apart. The correlation window was 60 seconds, so the early warning signs had expired by the time the data request arrived. I extended the window to 90 seconds and added a `slow_escalation` rule that looks back 300 seconds. After that, all 54 were blocked. No unit test would have found this. It only showed up when an attack ran at a realistic pace.

<figure>
<img src="media/red-team-block-rates.png" alt="Bar chart of red-team block rates per attack category, initial and after the fix" loading="lazy">
<figcaption>Block rate per category before and after the slow-escalation fix, from the project report.</figcaption>
</figure>

Every decision is written as a `SecurityEvent` to a daily JSONL audit log, and the Streamlit app shows the same events live next to the chat:

<figure>
<img src="media/security-events.png" alt="Streamlit security monitor listing the security events for two messages" loading="lazy">
<figcaption>The event feed for two messages: a fake admin claim, and a request for every order in the database.</figcaption>
</figure>

## Scoring session risk with a classifier

Rules catch known patterns. The ML layer looks at the overall shape of a session: 16 features covering injection scores, tool requests and denials, PII detections, correlation alerts, session length and event rate. From these it predicts one of four risk levels: low, medium, high or critical.

There was no real session data to train on, so I wrote a generator: 1,000 labelled sessions, 250 per class. Each class has its own feature ranges, with Gaussian noise added, ranges that deliberately overlap between classes, and 10% of labels shifted by one level to imitate borderline cases. The model is a Random Forest (100 trees, max depth 10, balanced class weights) trained on a stratified 80/20 split.

<div style="margin:2.25rem 0;padding:1.5rem;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg-elev);overflow-x:auto;">
<svg viewBox="0 0 640 330" role="img" aria-label="Bar chart of the risk classifier's precision and recall per class. Critical: 97.4 percent precision, 95.8 percent recall. High: 93.2 percent precision, 95.0 percent recall. Medium: 97.5 percent precision, 92.5 percent recall. Low: 95.4 percent precision, 100 percent recall. Overall accuracy 95.8 percent." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;min-width:420px;font-family:var(--font-sans);">
<rect x="130" y="4" width="12" height="12" fill="var(--accent)"></rect>
<text x="148" y="14" font-size="12" fill="var(--fg-muted)">Precision</text>
<rect x="230" y="4" width="12" height="12" fill="var(--fg-subtle)"></rect>
<text x="248" y="14" font-size="12" fill="var(--fg-muted)">Recall</text>
<text x="20" y="60" font-size="13.5" font-weight="600" fill="#ef4444">Critical</text>
<rect x="130" y="46" width="457.4" height="14" rx="3" fill="var(--accent)"></rect>
<text x="595" y="57" font-size="11.5" fill="var(--fg-muted)">97.4%</text>
<rect x="130" y="64" width="449.7" height="14" rx="3" fill="var(--fg-subtle)"></rect>
<text x="587" y="75" font-size="11.5" fill="var(--fg-muted)">95.8%</text>
<text x="20" y="130" font-size="13.5" font-weight="600" fill="#f97316">High</text>
<rect x="130" y="116" width="437.8" height="14" rx="3" fill="var(--accent)"></rect>
<text x="575" y="127" font-size="11.5" fill="var(--fg-muted)">93.2%</text>
<rect x="130" y="134" width="446.5" height="14" rx="3" fill="var(--fg-subtle)"></rect>
<text x="584" y="145" font-size="11.5" fill="var(--fg-muted)">95.0%</text>
<text x="20" y="200" font-size="13.5" font-weight="600" fill="#eab308">Medium</text>
<rect x="130" y="186" width="458.3" height="14" rx="3" fill="var(--accent)"></rect>
<text x="596" y="197" font-size="11.5" fill="var(--fg-muted)">97.5%</text>
<rect x="130" y="204" width="434.8" height="14" rx="3" fill="var(--fg-subtle)"></rect>
<text x="573" y="215" font-size="11.5" fill="var(--fg-muted)">92.5%</text>
<text x="20" y="270" font-size="13.5" font-weight="600" fill="#22c55e">Low</text>
<rect x="130" y="256" width="448.4" height="14" rx="3" fill="var(--accent)"></rect>
<text x="586" y="267" font-size="11.5" fill="var(--fg-muted)">95.4%</text>
<rect x="130" y="274" width="470" height="14" rx="3" fill="var(--fg-subtle)"></rect>
<text x="608" y="285" font-size="11.5" fill="var(--fg-muted)">100%</text>
<text x="20" y="316" font-size="12" fill="var(--fg-subtle)">Overall accuracy: 95.8% · 1,000-session synthetic evaluation set</text>
</svg>
</div>
<p style="margin:-1.5rem 0 2rem;font-size:0.82rem;font-style:italic;color:var(--fg-subtle);text-align:center;"><strong>Figure 3.</strong> Risk classifier precision/recall by class, evaluated on a 1,000-session synthetic holdout set.</p>

On a separate holdout set of 1,000 generated sessions it scored 95.8%, and five-fold cross-validation gave 90.0% ± 1.41%. All 42 holdout errors were off by one level. No critical session was called low, and no low session was called anything higher, so the worst case is a one-level overreaction. The top three features are all injection scores and together carry 39% of the model's importance. Event rate carries 0.18%, so it can probably go.

Testing showed one weakness. Short sessions with a strong injection attempt came out as medium, because the rate-based features hadn't built up yet. The fix was a heuristic override: the risk level is whichever is higher, the model's prediction or a rule-based one.

The main caveat: the 95.8% is measured on data from the same generator the model was trained on. It shows the model learned my generator. It doesn't show how it would do on real traffic.

## Testing

The test suite grew with each phase: 61 tests after phase 1, 134 after PII protection, 173 after correlation, and 200 after the hardening phase. All 200 pass.

Two people also tried the app in short demo sessions, with four scenarios: a normal question, a direct injection, a customer asking for a database query, and a support agent opening a user profile with PII in it. Everything behaved as expected and no normal question was blocked. Their feedback still found two problems. The first answer from the local model took 8 to 12 seconds and looked like the app had frozen, so I added a spinner. And the block message, "I'm unable to assist with your request", didn't say why. It now reads "Your input was classified as potentially being a security risk and could not be processed."

## What's missing

- **Roles are self-declared.** The app trusts whatever role the session says it has. A real deployment needs signed identity, such as JWT role claims.
- **Everything runs in one process.** Against NIST SP 800-207 Zero Trust, the report scores the design at 87% overall. The weakest point was securing communication between components (67%), because they talk in-process with no network isolation. Separate containers with TLS would fix that.
- **Latency is estimated, not measured.** The report estimates the security nodes add under 100 ms per turn, a small part of the model's own response time, but they were never timed. The next step is timers at each node boundary and a 1,000-turn load test.
- **The classifier needs real data.** The audit log already records every feature the model uses, so real sessions could be labelled and used for retraining.

## Read the full report

<%= render("../../_partials/pdf-viewer.html", { src: "media/report.bin", outputPath, filename: "AgentGuard-Final-Report.pdf", note: "AgentGuard: A Multi-Layer Security Framework for LLM Based AI Agents" }) %>

The code, tests and policy files are on [GitHub](https://github.com/haranloga/AgentGuard).

<%= render("../../_partials/post-footer.html", { url, title, prevPost, nextPost }) %>
