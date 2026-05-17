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



<figure style="width:100%;margin:1.5rem 0;clear:both;">
<video controls style="width:100%;border-radius:8px;">
<source src="media/vid_1777347915300_560.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>
</figure>

# The Complete Markdown Guide

A reference post showing every supported format in the 
[oscp.pdf](media/1777360071278_1110ef19-bea9-490f-b2f4-785cb6aed547_Untitled.pdf)
Blog Writer.

---

## Text Formatting

This is a normal paragraph with **bold text**, *italic text*, and `inline code` all mixed together. You can combine them too: **`bold code`**.

> This is a blockquote. Use it for callouts, quotes, or important notes.
> Great for highlighting key points.

---

## Headings

# H1 — Page Title
## H2 — Section
### H3 — Subsection
#### H4 — Detail

---

## Lists

### Bullet List
- First item
- Second item with **bold**
- Third item with `code`
- Nested ideas work too

### Numbered List
1. Step one
2. Step two
3. Step three

---

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown editor | ✅ Done | Full toolbar |
| Image paste | ✅ Done | Clipboard support |
| Live preview | ✅ Done | Toggle anytime |
| Table rendering | ✅ Done | With inline formatting |
| Export | ✅ Done | Downloads as `.md` |

### Table with longer content

| Risk | Description | Example |
|------|-------------|---------|
| **Prompt Injection** | Malicious inputs manipulate behavior | Hidden instructions in user input |
| **Data Leakage** | Exposure of sensitive data | Agent revealing private info |
| **Unauthorized Access** | Weak authentication controls | Account takeover |

---

## Code Blocks

### Bash
```bash
# Install dependencies
npm install
npm run dev
```
## size only render 
<figure style="width:28%;margin:1.5rem 0;clear:both;">
<img src="media/img_1777275979375_762.png" alt="screenshot" style="width:100%;">
</figure>
<figure style="width:52%;margin:1.5rem 0;clear:both;">
<img src="media/img_1777275979375_762.png" alt="screenshot" style="width:100%;">
</figure>
<figure style="width:78%;margin:1.5rem 0;clear:both;">
<img src="media/img_1777275979375_762.png" alt="screenshot" style="width:100%;">
</figure>
<figure style="width:100%;margin:1.5rem 0;clear:both;">
<img src="media/img_1777275979375_762.png" alt="screenshot" style="width:100%;">
</figure>

## Size + alignment:

<figure style="width:28%;margin:1.5rem auto;display:block;text-align:center;clear:both;">
<img src="media/img_1777275979375_762.png" alt="screenshot" style="width:100%;">
</figure>
<figure style="width:52%;margin:1.5rem auto;display:block;text-align:center;clear:both;">
<img src="media/img_1777275979375_762.png" alt="screenshot" style="width:100%;">
</figure>
<figure style="float:right;width:28%;margin:0 0 1.5rem 1.5rem;clear:right;">
<img src="media/img_1777275979375_762.png" alt="screenshot" style="width:100%;">
</figure>
<figure style="float:right;width:52%;margin:0 0 1.5rem 1.5rem;clear:right;">
<img src="media/img_1777275979375_762.png" alt="screenshot" style="width:100%;">
</figure>

## size + alignment + caption

<figure style="width:28%;margin:1.5rem auto;display:block;text-align:center;clear:both;">
<img src="media/img_1777275979375_762.png" alt="screenshot" style="width:100%;">
<figcaption>Figure 1: Overview</figcaption>
</figure>
<figure style="float:right;width:52%;margin:0 0 1.5rem 1.5rem;clear:right;">
<img src="media/img_1777275979375_762.png" alt="screenshot" style="width:100%;">
<figcaption>Source: 2024</figcaption>
</figure>

[cpsa.pdf](media/1777360100692_Exam_Security_Engineer_CUPA_JD.pdf)


And this text continues after the image, wrapping naturally below it.


<%= render("../../_partials/post-footer.html", { url, title, prevPost, nextPost }) %>
