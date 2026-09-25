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

No single classifier gets fake-account detection right on its own. Naive Bayes is excellent at recognizing genuine accounts but misses most spammers. Decision Trees catch far more spammers but make more mistakes on genuine ones. Rather than picking a winner, this project runs all three algorithms independently and lets them vote: when two agree, that's the answer; when they split, the third breaks the tie.

**[fake-news-detection](https://github.com/haranloga/fake-news-detection)** is an Independent Study report from Level 3 at the University of Moratuwa (2019). It applies Naive Bayes, Clustering, and Decision Trees to a labeled Twitter spam dataset, then combines all three into a single voting classifier that outperforms any of them individually.

## The dataset and the features

The study used 1,064 labeled Twitter accounts from Benevenuto et al.'s spam-account dataset, roughly 36% of them fake, described by 62 account- and tweet-level features. Rather than feeding all 62 features to a black box, the paper picks five that map to how spam accounts actually behave differently from genuine ones:

- **Follower count** - unusually high or low counts (outside verified accounts) correlate with spam, since spammers want maximum reach.
- **URLs shared** - spam accounts lean heavily on shortened or hidden links.
- **Spam context** - the amount of spam-associated text in a user's posts.
- **Comments** - spam accounts rarely engage authentically, though some reply broadly to fake credibility.
- **Hashtags** - spam accounts tend to overload posts with hashtags to maximize discovery.

Continuous features were then discretized: accounts were sorted by feature value, and wherever the label flipped between consecutive accounts, that boundary became a bucket edge - a simple way to turn "follower count" into intervals a Naive Bayes model can use directly.

## Three classifiers, one vote

<div style="margin:2.25rem 0;padding:1.5rem 1.25rem;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg-elev);overflow-x:auto;">
<svg viewBox="0 0 640 400" role="img" aria-label="Diagram: Account features feed into three independent classifiers - Naive Bayes, Clustering, and Decision Trees - each producing a Spammer or Non-Spammer prediction. The three predictions feed into a vote: if two agree, that becomes the final label; if they split, the third classifier's prediction is used as the tiebreaker." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;min-width:520px;font-family:var(--font-sans);">
<defs>
<marker id="arrowfn1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="var(--fg-subtle)"></path>
</marker>
</defs>
<rect x="160" y="8" width="320" height="34" rx="17" fill="none" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<text x="320" y="30" text-anchor="middle" font-size="13.5" fill="var(--fg-muted)">Account features (followers, URLs, hashtags, ...)</text>
<path d="M320,42 L320,62 M320,62 L110,62 L110,84 M320,62 L320,84 M320,62 L530,62 L530,84" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#arrowfn1)"></path>
<rect x="20" y="84" width="180" height="66" rx="9" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.4"></rect>
<text x="110" y="112" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">Naive Bayes</text>
<text x="110" y="130" text-anchor="middle" font-size="11" fill="var(--fg-muted)">P(C|A) via Bayes' theorem</text>
<rect x="230" y="84" width="180" height="66" rx="9" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.4"></rect>
<text x="320" y="112" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">Clustering</text>
<text x="320" y="130" text-anchor="middle" font-size="11" fill="var(--fg-muted)">unsupervised grouping</text>
<rect x="440" y="84" width="180" height="66" rx="9" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.4"></rect>
<text x="530" y="112" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">Decision Trees</text>
<text x="530" y="130" text-anchor="middle" font-size="11" fill="var(--fg-muted)">feature-split classifier</text>
<path d="M110,150 L110,170 L320,170 L320,190 M320,170 L530,170 L530,190 M320,150 L320,190" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#arrowfn1)"></path>
<rect x="230" y="190" width="180" height="52" rx="9" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.4"></rect>
<text x="320" y="212" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">Vote</text>
<text x="320" y="230" text-anchor="middle" font-size="10.5" fill="var(--fg-muted)">2 agree -&gt; that wins</text>
<line x1="320" y1="242" x2="320" y2="264" stroke="var(--fg-subtle)" stroke-width="1.4" marker-end="url(#arrowfn1)"></line>
<rect x="200" y="264" width="240" height="52" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"></rect>
<text x="320" y="296" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent)">Spammer / Non-Spammer</text>
<text x="320" y="350" text-anchor="middle" font-size="12" fill="var(--fg-subtle)">Split vote falls back to the third classifier's own prediction</text>
<text x="320" y="368" text-anchor="middle" font-size="12" fill="var(--fg-subtle)">as the tiebreaker, rather than a fixed default.</text>
</svg>
</div>
<p style="margin:-1.5rem 0 2rem;font-size:0.82rem;font-style:italic;color:var(--fg-subtle);text-align:center;"><strong>Figure 1.</strong> Three independently trained classifiers vote on each account; a two-way split falls back to the third classifier's prediction.</p>

Naive Bayes classifies each account by comparing P(Spammer | features) against P(Non-Spammer | features) via Bayes' theorem: P(C|A) = P(A|C)&middot;P(C) / P(A). Clustering groups accounts unsupervised, using signals like reply behavior and spam-text density to separate the two groups without ever seeing labels during training. Decision Trees split accounts through a sequence of feature thresholds - "is follower count above X, does the account use more than Y shortened URLs" - down to a leaf classification. None of the three sees the others' output during training; the voting only happens at prediction time.

## Where the combination actually helps

<div style="margin:2.25rem 0;padding:1.5rem 1.25rem;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg-elev);overflow-x:auto;">
<svg viewBox="0 0 620 320" role="img" aria-label="Bar chart comparing Naive Bayes, Decision Trees, and the Combined approach on three metrics: overall accuracy, non-spammer accuracy, and spammer accuracy. Naive Bayes: 80.8 percent overall, 99.1 percent non-spammer, 48.9 percent spammer. Decision Trees: 85.8 percent overall, 90.5 percent non-spammer, 77.4 percent spammer. Combined: 87.9 percent overall, 99.1 percent non-spammer, 68.4 percent spammer." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;min-width:520px;font-family:var(--font-sans);">
<line x1="70" y1="20" x2="70" y2="250" stroke="var(--border-strong)" stroke-width="1.4"></line>
<line x1="70" y1="250" x2="600" y2="250" stroke="var(--border-strong)" stroke-width="1.4"></line>
<text x="60" y="24" text-anchor="end" font-size="10.5" fill="var(--fg-subtle)">100%</text>
<line x1="70" y1="20" x2="600" y2="20" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3"></line>
<text x="60" y="135" text-anchor="end" font-size="10.5" fill="var(--fg-subtle)">50%</text>
<line x1="70" y1="135" x2="600" y2="135" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3"></line>
<!-- Naive Bayes group -->
<rect x="95" y="64.2" width="34" height="185.8" fill="var(--fg-subtle)" opacity="0.55"></rect>
<text x="112" y="58" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--fg-muted)">80.8%</text>
<rect x="133" y="22.1" width="34" height="227.9" fill="var(--fg-subtle)" opacity="0.8"></rect>
<text x="150" y="16" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--fg-muted)">99.1%</text>
<rect x="171" y="137.5" width="34" height="112.5" fill="var(--fg-subtle)"></rect>
<text x="188" y="131.5" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--fg-muted)">48.9%</text>
<text x="150" y="272" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">Naive Bayes</text>
<!-- Decision Trees group -->
<rect x="245" y="52.7" width="34" height="197.3" fill="var(--fg-subtle)" opacity="0.55"></rect>
<text x="262" y="46.5" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--fg-muted)">85.8%</text>
<rect x="283" y="41.9" width="34" height="208.1" fill="var(--fg-subtle)" opacity="0.8"></rect>
<text x="300" y="35.7" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--fg-muted)">90.5%</text>
<rect x="321" y="72" width="34" height="178" fill="var(--fg-subtle)"></rect>
<text x="338" y="65.8" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--fg-muted)">77.4%</text>
<text x="300" y="272" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">Decision Trees</text>
<!-- Combined group -->
<rect x="395" y="47.8" width="34" height="202.2" fill="var(--accent)" opacity="0.55"></rect>
<text x="412" y="41.6" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--accent)">87.9%</text>
<rect x="433" y="22.1" width="34" height="227.9" fill="var(--accent)" opacity="0.8"></rect>
<text x="450" y="16" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--accent)">99.1%</text>
<rect x="471" y="92.7" width="34" height="157.3" fill="var(--accent)"></rect>
<text x="488" y="86.5" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--accent)">68.4%</text>
<text x="450" y="272" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">Combined</text>
</svg>
<div style="display:flex;gap:18px;justify-content:center;margin-top:6px;flex-wrap:wrap;">
<span style="font-size:11px;color:var(--fg-muted);"><span style="display:inline-block;width:10px;height:10px;background:var(--fg-subtle);opacity:0.55;border-radius:2px;margin-right:5px;"></span>Overall accuracy</span>
<span style="font-size:11px;color:var(--fg-muted);"><span style="display:inline-block;width:10px;height:10px;background:var(--fg-subtle);opacity:0.8;border-radius:2px;margin-right:5px;"></span>Non-spammer accuracy</span>
<span style="font-size:11px;color:var(--fg-muted);"><span style="display:inline-block;width:10px;height:10px;background:var(--fg-subtle);border-radius:2px;margin-right:5px;"></span>Spammer accuracy</span>
</div>
</div>
<p style="margin:-1.5rem 0 2rem;font-size:0.82rem;font-style:italic;color:var(--fg-subtle);text-align:center;"><strong>Figure 2.</strong> Combined voting keeps Naive Bayes' 99.1% non-spammer accuracy while recovering more of Decision Trees' spammer-catching ability, lifting overall accuracy above either algorithm alone.</p>

The pattern is visible in the numbers: Naive Bayes is nearly perfect at recognizing genuine accounts (99.1%) but only catches spam about half the time (48.9%) - it's biased toward "innocent until proven guilty." Decision Trees flip that trade-off, catching more spammers (77.4%) at some cost to non-spammer accuracy (90.5%). The combined vote lands closer to the best of both: it keeps Naive Bayes' 99.1% non-spammer accuracy intact while pulling spammer accuracy up to 68.4%, for 87.9% overall - higher than either algorithm running alone.

## A note on the Clustering numbers

The original report includes a fourth table for the standalone Clustering algorithm, and its numbers are worth flagging rather than quietly reproducing as fact: they come out numerically identical to the Naive Bayes table, which doesn't match the surrounding text describing Clustering's behavior as distinct ("performs better in recognition of non-spam accounts however was extremely poor in identifying spam accounts"). It reads like a copy-paste artifact from when the report was assembled, and the true Clustering-only figures aren't recoverable from the source document - so rather than inventing corrected numbers, the comparison above sticks to the two results that check out independently (Naive Bayes and Decision Trees) against the Combined approach. The full detail, tables, and this caveat as it appears in context are in [PAPER.md](https://github.com/haranloga/fake-news-detection/blob/main/PAPER.md).

## What this is, and isn't

This repository is the report itself, not a runnable pipeline - the original submission was a study and its results, without an accompanying codebase. It's published here as-is, with the title page's personal email and student index number removed, everything else preserved as submitted.

## Read the original report

<%= render("../../_partials/pdf-viewer.html", { src: "media/report.bin", outputPath, filename: "Fake-News-Detection-Report.pdf", note: "Fake News Detection" }) %>

Full write-up, tables, and related-work discussion on [GitHub](https://github.com/haranloga/fake-news-detection).

<%= render("../../_partials/post-footer.html", { url, title, prevPost, nextPost }) %>
