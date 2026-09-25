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

Given a passage of text and a question about it, there's more than one honest way to find the answer. You can measure how close the question is in meaning to each sentence and pick the closest one. You can turn that closeness score into a feature and train a classifier on labeled examples. Or you can skip sentence-level matching entirely and train a model to point at the exact span of text that answers the question. I built all three for this project and ran them side by side, rather than picking one and hoping it was the right call.

**[automated-answer-grading](https://github.com/haranloga/automated-answer-grading)** started as a Level 4 (final year) undergraduate project. It takes a context passage and a question and answers it three different ways: an unsupervised sentence-similarity method, a supervised classifier trained on top of that similarity signal, and a fine-tuned BERT model that extracts the answer directly.

## Three approaches, one input

<div style="margin:2.25rem 0;padding:1.5rem 1.25rem;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg-elev);overflow-x:auto;">
<svg viewBox="0 0 640 440" role="img" aria-label="Diagram: Context and Question fans out into three parallel pipelines. Unsupervised: InferSent embeddings, then cosine and Euclidean distance, then best-matching sentence. Supervised: similarity features, then logistic regression, random forest, or XGBoost, then predicted sentence. Extractive: fine-tuned BERT, then answer span extraction, then exact answer text." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;min-width:520px;font-family:var(--font-sans);">
<defs>
<marker id="arrow3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="var(--fg-subtle)"></path>
</marker>
</defs>
<rect x="140" y="8" width="360" height="34" rx="17" fill="none" stroke="var(--border-strong)" stroke-width="1.5"></rect>
<text x="320" y="30" text-anchor="middle" font-size="13.5" fill="var(--fg-muted)">Context + Question</text>
<path d="M320,42 L320,64 M320,64 L110,64 L110,86 M320,64 L320,86 M320,64 L530,64 L530,86" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#arrow3)"></path>
<text x="110" y="112" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--fg-muted)">UNSUPERVISED</text>
<text x="320" y="112" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--fg-muted)">SUPERVISED</text>
<text x="530" y="112" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--fg-muted)">EXTRACTIVE</text>
<rect x="20" y="124" width="180" height="60" rx="9" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.4"></rect>
<text x="110" y="149" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">InferSent</text>
<text x="110" y="166" text-anchor="middle" font-size="11" fill="var(--fg-muted)">sentence embeddings</text>
<line x1="110" y1="184" x2="110" y2="200" stroke="var(--fg-subtle)" stroke-width="1.4" marker-end="url(#arrow3)"></line>
<rect x="20" y="200" width="180" height="60" rx="9" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.4"></rect>
<text x="110" y="225" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">Cosine + Euclidean</text>
<text x="110" y="242" text-anchor="middle" font-size="11" fill="var(--fg-muted)">distance to the question</text>
<line x1="110" y1="260" x2="110" y2="276" stroke="var(--fg-subtle)" stroke-width="1.4" marker-end="url(#arrow3)"></line>
<rect x="20" y="276" width="180" height="52" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"></rect>
<text x="110" y="307" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">Best-matching sentence</text>
<rect x="230" y="124" width="180" height="60" rx="9" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.4"></rect>
<text x="320" y="149" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">Similarity features</text>
<text x="320" y="166" text-anchor="middle" font-size="11" fill="var(--fg-muted)">from the step above</text>
<line x1="320" y1="184" x2="320" y2="200" stroke="var(--fg-subtle)" stroke-width="1.4" marker-end="url(#arrow3)"></line>
<rect x="230" y="200" width="180" height="60" rx="9" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.4"></rect>
<text x="320" y="222" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">LogReg / RF / XGBoost</text>
<text x="320" y="242" text-anchor="middle" font-size="11" fill="var(--fg-muted)">trained on labeled data</text>
<line x1="320" y1="260" x2="320" y2="276" stroke="var(--fg-subtle)" stroke-width="1.4" marker-end="url(#arrow3)"></line>
<rect x="230" y="276" width="180" height="52" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"></rect>
<text x="320" y="307" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">Predicted sentence</text>
<rect x="440" y="124" width="180" height="60" rx="9" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.4"></rect>
<text x="530" y="149" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">BERT (SQuAD2)</text>
<text x="530" y="166" text-anchor="middle" font-size="11" fill="var(--fg-muted)">fine-tuned further</text>
<line x1="530" y1="184" x2="530" y2="200" stroke="var(--fg-subtle)" stroke-width="1.4" marker-end="url(#arrow3)"></line>
<rect x="440" y="200" width="180" height="60" rx="9" fill="var(--bg)" stroke="var(--border-strong)" stroke-width="1.4"></rect>
<text x="530" y="222" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">Answer span extraction</text>
<text x="530" y="242" text-anchor="middle" font-size="11" fill="var(--fg-muted)">start/end token prediction</text>
<line x1="530" y1="260" x2="530" y2="276" stroke="var(--fg-subtle)" stroke-width="1.4" marker-end="url(#arrow3)"></line>
<rect x="440" y="276" width="180" height="52" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"></rect>
<text x="530" y="307" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">Exact answer text</text>
<text x="320" y="360" text-anchor="middle" font-size="12" fill="var(--fg-subtle)">The Flask app exposes both the sentence-selection route and the BERT extraction route</text>
<text x="320" y="380" text-anchor="middle" font-size="12" fill="var(--fg-subtle)">so the two can be compared directly on the same input.</text>
</svg>
</div>
<p style="margin:-1.5rem 0 2rem;font-size:0.82rem;font-style:italic;color:var(--fg-subtle);text-align:center;"><strong>Figure 1.</strong> Three independent pipelines for the same context/question input, compared on sentence- and span-level output.</p>

## Why three, not one

| | Needs labeled data? | Output | What it's actually testing |
|---|---|---|---|
| **Unsupervised** | No | A whole sentence | Whether semantic-similarity alone, with zero training, gets you close enough |
| **Supervised** | Yes | A whole sentence | Whether a classifier can learn a better decision boundary than raw similarity thresholds |
| **Extractive (BERT)** | Yes | The exact answer span | Whether a transformer can localize the answer inside a sentence, not just find the right sentence |

The unsupervised and supervised paths both stop at sentence granularity - "the answer is somewhere in this sentence" - while the extractive path goes one level deeper and points at the exact words. Keeping the coarser methods in the comparison isn't just for completeness: they're the baseline that shows whether the extra machinery of a fine-tuned transformer is actually buying you something, or whether a much cheaper embedding-distance lookup gets most of the way there on its own.

## How the unsupervised path actually decides

Every sentence in the context gets split out and embedded with [InferSent](https://arxiv.org/abs/1705.02364), a pretrained sentence-embedding model - not word embeddings averaged together, but a representation trained specifically so that sentence-level meaning is comparable by vector distance. The question is embedded the same way, and the app computes both cosine similarity and Euclidean distance from the question to every candidate sentence:

```python
# unsupervised/unsupervised.py
train = pd.read_csv(r'data/train2.csv')
# ... build sentence embeddings for each context with InferSent ...
# ... compare question embedding to each sentence embedding via
#     scipy.spatial.distance (cosine) and Euclidean distance ...
```

Both distance metrics are kept rather than just one, because they don't always agree - `predicted["pred_idx_cos"]` and `predicted["pred_idx_euc"]` in `app.py` are tracked as separate predictions, which is what makes it possible to compare them against the supervised model's predictions on the same examples later.

## The supervised layer, and the honest limitation of the dataset

The supervised classifiers (Logistic Regression, Random Forest, XGBoost, in `supervised/trainalgo.py`) don't see raw text - they see the similarity scores the unsupervised step already computed, plus a handful of related features, and learn to predict which sentence index is correct from labeled examples. The labels come from a mix of SQuAD and a smaller hand-annotated dataset (`fyp_annatator.json`, `newadchu.xlsx`) built specifically for this project, since SQuAD alone doesn't cover the sentence-selection framing directly.

That hand-annotated dataset is the honest limitation worth naming: it's small by deep-learning standards, and a classifier trained on a small labeled set will generalize less reliably than the fine-tuned BERT model, which benefits from SQuAD2's much larger pretraining signal before ever seeing this project's own data. Keeping the unsupervised baseline in the comparison is partly a hedge against that - it needs no labeled data at all, so it doesn't inherit the small-dataset problem the supervised path has.

## Cleaning this up for release

The original project directory was about 14GB, almost none of it code. `InferSent`'s pretrained encoder and the GloVe word vectors it depends on run into the multiple gigabytes on their own, the fine-tuned BERT checkpoint's weight file alone was 254MB (past GitHub's 100MB hard limit per file), and there were duplicate copies of SQuAD sitting in more than one folder. None of that belongs in a git repository - it's either downloadable from its original public source or regenerable by rerunning the training scripts - so the published repo ships the code, the small trained classifier pickles, and the model config files, with instructions for fetching the rest.

## Read the full report

This was one module of a three-person final year group project ("Digital Video Making and Smart Answering System," Team Zip2, University of Moratuwa 2021), which also covered a separate video-generation component not part of this repo.

<%= render("../../_partials/pdf-viewer.html", { src: "media/report.bin", outputPath, filename: "Digital-Video-Making-and-Smart-Answering-System-Report.pdf", note: "Digital Video Making and Smart Answering System" }) %>

Full code and setup instructions are on [GitHub](https://github.com/haranloga/automated-answer-grading).

<%= render("../../_partials/post-footer.html", { url, title, prevPost, nextPost }) %>
