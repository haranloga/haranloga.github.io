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

This was my Level 3 independent study at the University of Moratuwa, written in August 2019. The title says fake news, but the work is about the accounts that spread it: can a few simple features tell a spam account on Twitter from a genuine one? And does combining three simple classifiers do better than picking the best one?

**[fake-news-detection](https://github.com/haranloga/fake-news-detection)** holds the report. There's no code in the repo: the submission was the study and its results. It's published as submitted, with my email address and student number removed.

## The data

The dataset came from Benevenuto et al., who collected and labelled Twitter accounts for their own spam research. It has 1,064 accounts, about 36% of them spammers, and 62 features per account covering both the account and its tweets. The original authors classified them with an SVM. I wanted to see how far simpler methods could get.

I picked five features, each tied to how spammers behave:

- **Followers.** Spam accounts want reach, so their follower numbers look unusual compared with who they follow. Verified accounts were excluded from this rule.
- **URLs shared.** Spam leans on links, often hidden behind URL shorteners.
- **Spam words.** How much of an account's text uses spam and phishing wording.
- **Comments and replies.** Spam accounts rarely have real conversations, though some reply to many tweets at once to look active.
- **Hashtags.** Spammers pile on trending hashtags to show up in more searches.

Naive Bayes needs categories, not raw counts, so each numeric feature was split into ranges. The accounts were sorted by that feature, and wherever the label changed between two neighbouring accounts, the midpoint between their values became a range boundary. This method came from earlier work in the report's references.

## Three classifiers and a vote

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

- **Naive Bayes** calculates the probability that an account is a spammer given its features, using Bayes' theorem, and decides at 0.5.
- **Clustering** splits the accounts into two groups without using the labels, based on reply behaviour and spam text.
- **Decision Trees** make a series of yes/no splits on the features until each account lands in a spammer or genuine leaf.

The combined approach compares two of the classifiers. If they agree, that's the answer. If they disagree, the third one decides.

## Results

The results cover 365 accounts: 232 genuine and 133 spammers.

| Method | Overall | Genuine accounts correct | Spammers caught |
|---|---|---|---|
| Clustering | 80.9% | 99.1% (230 of 232) | 48.9% (65 of 133) |
| Decision Trees | 85.7% | 90.5% (210 of 232) | 77.4% (103 of 133) |
| Naive Bayes | 86.5% | 97.0% | 68.4% |
| **Combined vote** | **87.9%** | **99.1% (230 of 232)** | **68.4% (91 of 133)** |

The combined vote had the best overall accuracy. Looking at the counts, it did something specific: it kept Clustering's record on genuine accounts (only 2 flagged wrongly) and Naive Bayes's rate on spammers. The report's cover chart above shows the same four methods side by side.

Decision Trees alone caught the most spammers, 103 against the vote's 91. They paid for it with 22 genuine accounts flagged as spam, against 2 for the vote. So the vote traded 12 missed spammers for 20 fewer false alarms. For a platform that suspends accounts, that's probably the right trade. For a tool that queues accounts for human review, catching more spammers might matter more.

## Looking back

A few things I'd point out if I reviewed this now:

- **The tables have an error.** The table labelled Naive Bayes has the same numbers as the one labelled Clustering, and those numbers match what the chart and the text say about Clustering. One table was copied over the other while putting the report together. I've used the chart's figures above, since they agree with the report's own discussion.
- **The split isn't described.** The dataset has 1,064 accounts but the results cover 365. The report doesn't say how those 365 were chosen, or whether the classifiers were trained on the other accounts.
- **Accuracy hides the imbalance.** About a third of the accounts are spammers, so accuracy mostly rewards getting genuine accounts right. Precision and recall on the spam class would have shown the trade-offs above more clearly.
- **The data is old.** The dataset dates from around 2010. Spam accounts have changed a lot since, and so has the platform.

The report's own ideas for next steps were more training data, and cleaning the tweet text with stemming and stop-word removal before extracting the spam-word feature.

## Read the original report

<%= render("../../_partials/pdf-viewer.html", { src: "media/report.bin", outputPath, filename: "Fake-News-Detection-Report.pdf", note: "Fake News Detection" }) %>

The report and a text version of it are on [GitHub](https://github.com/haranloga/fake-news-detection).

<%= render("../../_partials/post-footer.html", { url, title, prevPost, nextPost }) %>
