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

Most "AI security" projects add a moderation call in front of a chatbot and call it done. I wanted to see what security actually looks like once an LLM agent has real tools, real memory, and real permissions, so I built one where the security checks are part of the agent's own execution graph rather than a wrapper bolted on top of it.

**[AgentGuard](https://github.com/haranloga/AgentGuard)** is a defense-in-depth framework for LangGraph agents, demonstrated on ShopGuard, an AI e-commerce support agent. Every message flows through the agent's state graph, and every security check is a node in that graph, not a callback that runs before or after it.

## Architecture: security as graph nodes

<div style="margin:2.25rem 0;padding:1.5rem 1.25rem;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg-elev);overflow-x:auto;">
<svg viewBox="0 0 640 680" role="img" aria-label="Pipeline diagram: user message flows through Input Sanitiser, LLM Reasoning, Policy Engine, Tool Execution, Memory Firewall, and Output Filter before reaching the user. Sanitiser and Policy Engine are marked as points that can block a request." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;min-width:480px;font-family:var(--font-sans);">
<defs>
<marker id="arrow1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="var(--fg-subtle)"></path>
</marker>
</defs>
<line x1="320" y1="52" x2="320" y2="74" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#arrow1)"></line>
<line x1="320" y1="140" x2="320" y2="162" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#arrow1)"></line>
<line x1="320" y1="228" x2="320" y2="250" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#arrow1)"></line>
<line x1="320" y1="316" x2="320" y2="338" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#arrow1)"></line>
<line x1="320" y1="404" x2="320" y2="426" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#arrow1)"></line>
<line x1="320" y1="492" x2="320" y2="514" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#arrow1)"></line>
<line x1="320" y1="580" x2="320" y2="602" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#arrow1)"></line>
<rect x="140" y="16" width="360" height="36" rx="18" fill="none" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<text x="320" y="39" text-anchor="middle" font-size="14" fill="var(--fg-muted)">User message</text>
<rect x="40" y="76" width="560" height="64" rx="10" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<text x="60" y="102" font-size="15" font-weight="600" fill="var(--fg)">Input Sanitiser</text>
<text x="60" y="122" font-size="12.5" fill="var(--fg-muted)">injection patterns + encoding decode (base64 / hex / homoglyph / ROT13)</text>
<rect x="500" y="86" width="80" height="22" rx="11" fill="none" stroke="#ef4444" stroke-width="1.3"></rect>
<text x="540" y="101" text-anchor="middle" font-size="10.5" fill="#ef4444" font-weight="600">CAN BLOCK</text>
<rect x="40" y="164" width="560" height="64" rx="10" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<text x="60" y="190" font-size="15" font-weight="600" fill="var(--fg)">LLM Reasoning</text>
<text x="60" y="210" font-size="12.5" fill="var(--fg-muted)">agent reasons over state and picks a tool to call</text>
<rect x="40" y="252" width="560" height="64" rx="10" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<text x="60" y="278" font-size="15" font-weight="600" fill="var(--fg)">Policy Engine</text>
<text x="60" y="298" font-size="12.5" fill="var(--fg-muted)">role-based check against policy.yaml before any tool runs</text>
<rect x="500" y="262" width="80" height="22" rx="11" fill="none" stroke="#ef4444" stroke-width="1.3"></rect>
<text x="540" y="277" text-anchor="middle" font-size="10.5" fill="#ef4444" font-weight="600">CAN BLOCK</text>
<rect x="40" y="340" width="560" height="64" rx="10" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<text x="60" y="366" font-size="15" font-weight="600" fill="var(--fg)">Tool Execution</text>
<text x="60" y="386" font-size="12.5" fill="var(--fg-muted)">db_query / web_search / rag_search / file_read, scoped to role</text>
<rect x="40" y="428" width="560" height="64" rx="10" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<text x="60" y="454" font-size="15" font-weight="600" fill="var(--fg)">Memory Firewall</text>
<text x="60" y="474" font-size="12.5" fill="var(--fg-muted)">redacts PII before a tool result ever reaches conversation memory</text>
<rect x="40" y="516" width="560" height="64" rx="10" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<text x="60" y="542" font-size="15" font-weight="600" fill="var(--fg)">Output Filter</text>
<text x="60" y="562" font-size="12.5" fill="var(--fg-muted)">second PII pass on the LLM's reply before the user sees it</text>
<rect x="140" y="604" width="360" height="36" rx="18" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"></rect>
<text x="320" y="627" text-anchor="middle" font-size="14" fill="var(--accent)" font-weight="600">Response to user</text>
</svg>
</div>
<p style="margin:-1.5rem 0 2rem;font-size:0.82rem;font-style:italic;color:var(--fg-subtle);text-align:center;"><strong>Figure 1.</strong> Request pipeline. Every stage is a LangGraph node; the sanitiser and policy engine are hard enforcement points.</p>

Two of those six nodes can stop a request outright: the sanitiser before the model ever reasons about it, and the policy engine before a tool ever runs. Everything after that is about limiting the blast radius of a request that *was* allowed through.

## Why build the checks into the graph

A moderation layer in front of a chatbot can catch a bad first message. It can't catch an attack that unfolds over five turns, or a tool call that's technically valid but wrong for that user's role, or PII that leaks into memory two exchanges after the original request looked harmless. Once an agent has tools and state, security has to live at every step that touches them, not just the first one.

## Defense in depth, not defense in one place

<div style="margin:2.25rem 0;padding:1.5rem;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg-elev);overflow-x:auto;">
<svg viewBox="0 0 640 640" role="img" aria-label="Concentric diagram: Agent Core at the center, wrapped by Sanitiser and Output Filter, then Policy Engine RBAC, then ML Risk Scoring, then Cross-Layer Correlation as the outermost ring." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;min-width:420px;font-family:var(--font-sans);">
<rect x="20" y="20" width="600" height="600" rx="24" fill="none" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<rect x="248" y="8" width="220" height="20" fill="var(--bg-elev)"></rect>
<text x="320" y="23" text-anchor="middle" font-size="12.5" fill="var(--fg-muted)" font-weight="600" letter-spacing="0.02em">CROSS-LAYER CORRELATION</text>
<rect x="65" y="65" width="510" height="510" rx="22" fill="none" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<rect x="255" y="53" width="180" height="20" fill="var(--bg-elev)"></rect>
<text x="320" y="68" text-anchor="middle" font-size="12.5" fill="var(--fg-muted)" font-weight="600" letter-spacing="0.02em">ML RISK SCORING</text>
<rect x="110" y="110" width="420" height="420" rx="20" fill="none" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<rect x="255" y="98" width="180" height="20" fill="var(--bg-elev)"></rect>
<text x="320" y="113" text-anchor="middle" font-size="12.5" fill="var(--fg-muted)" font-weight="600" letter-spacing="0.02em">POLICY ENGINE (RBAC)</text>
<rect x="155" y="155" width="330" height="330" rx="18" fill="none" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<rect x="220" y="143" width="200" height="20" fill="var(--bg-elev)"></rect>
<text x="320" y="158" text-anchor="middle" font-size="12.5" fill="var(--fg-muted)" font-weight="600" letter-spacing="0.02em">SANITISER + OUTPUT FILTER</text>
<rect x="220" y="220" width="200" height="200" rx="16" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"></rect>
<text x="320" y="310" text-anchor="middle" font-size="16" font-weight="700" fill="var(--accent)">Agent Core</text>
<text x="320" y="332" text-anchor="middle" font-size="12" fill="var(--fg-muted)">LangGraph reasoning</text>
<text x="320" y="349" text-anchor="middle" font-size="12" fill="var(--fg-muted)">+ tools + memory</text>
</svg>
</div>
<p style="margin:-1.5rem 0 2rem;font-size:0.82rem;font-style:italic;color:var(--fg-subtle);text-align:center;"><strong>Figure 2.</strong> Defense-in-depth layering. Each ring is an independent control; the agent core is exposed only if every ring outside it fails at once.</p>

Each ring can fail without the ones inside it being exposed. If the sanitiser misses an obfuscated payload, the policy engine still won't let a `customer` session run `file_read`. If a single message looks clean, the correlation engine is still watching whether *this* session's last five messages form an escalation pattern. No single layer is the security boundary - the boundary is the whole graph.

## Role-based access control

The policy engine reads a plain YAML file, not a hard-coded `if` chain. Each role gets an explicit allow-list of tools, and for the two data-access tools it also gets row limits and table/path allow-lists:

| Role | Tools allowed | Constraints |
|---|---|---|
| `customer` | `web_search`, `rag_search` | No direct database access - answers come from the knowledge base only |
| `support_agent` | `web_search`, `db_query`, `rag_search` | `db_query` capped at 50 rows, limited to `orders`, `products`, `categories`, `reviews`, `support_tickets`; `DROP` / `DELETE` / `UPDATE` / `INSERT` / `ALTER` all denied |
| `admin` | `web_search`, `db_query`, `file_read`, `rag_search` | `db_query` capped at 100 rows, any table, but still no `DROP`/`ALTER`; `file_read` restricted to `data/` and `documents/`, and explicitly denied `.env`, `config/`, `/etc/`, `/secrets/` |

On top of the per-role rules, a set of global rules apply to every session regardless of role - a hard cap of 3 tool calls per turn, and arguments are checked against a denylist before any tool runs:

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

That last block matters as much as the role table above it: even an `admin` session can't pass `/etc/passwd` as a `file_read` argument, because the check happens on the argument itself, not just on which tool was called.

## The memory firewall and PII detector

Tool results go straight into the agent's conversation memory by default, which is exactly how PII ends up somewhere it shouldn't - a database row containing a customer's email and phone number gets pulled in to answer one question, and now it's sitting in context for every question after that. The memory firewall sits between `execute_tool` and memory and rewrites the result first.

The detector behind it looks for credit card numbers (with Luhn checksum validation, so it isn't just matching 16 digits in a row), emails, US phone numbers, SSNs, and street-address patterns, and replaces each with a typed placeholder:

```
Tool result: {"name": "Alice", "email": "alice@email.com", "phone": "555-0101"}
Redacted:    {"name": "Alice", "email": "[REDACTED_EMAIL]", "phone": "[REDACTED_PHONE]"}
```

The output filter runs the same detector again on the way out, as a backstop - if PII somehow reached the model anyway, it still doesn't reach the user.

## Scoring session risk with a classifier

Rules catch known patterns. They don't catch "this session feels wrong" - a `support_agent` who hasn't triggered a single hard block but has queried an unusual number of tables, had two tool calls denied, and shows a rising rate of borderline-injection-scored messages. That's what the ML layer is for.

It's a Random Forest classifier trained on features extracted per session: injection-score statistics, tool request/denial counts and denial rate, unique tools attempted, PII-detection counts, correlation-alert counts, session duration, and event velocity - not raw text, but the *behavioral shape* of a session. Evaluated on a 1,000-session synthetic holdout set:

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

`low` recall of 100% is the number I actually care about most here - the classifier never mistakes a genuinely low-risk session for anything higher, so it isn't adding friction where none is needed. The training data is entirely synthetic; there's no real user session data anywhere in the pipeline.

## Catching what one message can't show: correlation

A single message that says "show me my order" is nothing. Five messages that individually pass every check but together walk from a normal query, to a denied `db_query` on `users`, to a question about file paths, to a slightly-too-formal request for "all customer records for a report" - that's an escalation pattern, and no single-message filter will ever see it, because it's never looking at more than one message at a time.

The correlation engine ingests every `SecurityEvent` a session produces and evaluates them against two kinds of rules: threshold rules that fire when enough matching events pile up in a session, and sequence rules that fire only when events happen in a specific order. Either kind can raise the session's running risk score or flag it as blocked outright, independent of whether any individual message tripped anything on its own.

## Testing the pipeline against itself

An automated red-team harness generates adversarial attacks across six categories and runs them straight at the running pipeline, then reports pass/fail per category instead of per attack:

- **Prompt injection** - direct instruction overrides ("ignore previous instructions...")
- **Privilege escalation** - trying to get a `customer`-scoped session to run an `admin`-only tool
- **Data exfiltration** - phrasing that tries to get PII or full table dumps out through a tool result
- **Encoding bypass** - the same injection attempts, but base64/hex/ROT13/homoglyph-encoded to slip past the sanitiser's plain-text checks
- **RAG poisoning** - malicious content planted inside a document the agent would retrieve and trust
- **Multi-turn** - attacks split across several messages specifically to dodge single-message detection

On top of the red team, there's a **305-test** suite across the sanitiser, policy engine, PII detector, memory firewall, output filter, ML risk model, correlation engine, RAG guard, and the agent's own LangGraph wiring - so a change to one layer can't silently break what another layer assumes about it.

## What it's actually doing

The chat UI has a live security monitor alongside the conversation, so every block, redaction, and risk-score change shows up as it happens rather than in a log file after the fact. That was deliberate: a security framework you can't see working is one you can't trust or debug.

## Why this project

This is the same shape of work as everything else I do. I build the system first (the LangGraph agent, the tools, the policy rules, the backend it all runs on), then I secure every layer of it (the redaction, the access control, the risk scoring, the red-teaming). Building it is what makes the security decisions concrete instead of theoretical - I know where an agent can be attacked because I built the paths an attack would take.

## Read the full report

The system above is formally written up and evaluated in a CO6008 coursework report submitted by Subothini Sivakumar, who assessed what I built here - published with her consent.

<%= render("../../_partials/pdf-viewer.html", { src: "media/report.bin", outputPath, filename: "AgentGuard-Final-Report.pdf", note: "AgentGuard - A Multi-Layer Security Framework for LLM Based AI Agents" }) %>

Full code, the test suite, and the design writeup are on [GitHub](https://github.com/haranloga/AgentGuard).

<%= render("../../_partials/post-footer.html", { url, title, prevPost, nextPost }) %>
