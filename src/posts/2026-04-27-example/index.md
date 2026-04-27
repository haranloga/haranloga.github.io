<%
	meta("../../meta.json")
	meta()
	const path = require('path');
	url = url + "/posts/" + path.basename(path.dirname(outputPath)) + "/";
%>
<%= render("../../_partials/post-header.html", { title, image, url, description, caption, date }) %>

# The Complete Markdown Guide

A reference post showing every supported format in the Blog Writer.

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




## Images

### Left aligned (default)
![screenshot](media/img_1777275979375_762.png)

### Centered
<img src="media/img_1777275979375_762.png" alt="screenshot" style="display:block;margin:0 auto;max-width:75%;">

### Centered with caption
<figure>
<img src="media/img_1777275979375_762.png" alt="screenshot" style="display:block;margin:0 auto;max-width:75%;">
<figcaption>Figure 1: AI Agent Security Overview</figcaption>
</figure>

### Right aligned
<img src="media/img_1777275979375_762.png" alt="screenshot" style="float:right;max-width:50%;margin:0 0 1rem 1.5rem;">

### Right aligned with caption
<figure>
<img src="media/img_1777275979375_762.png" alt="screenshot" style="float:right;max-width:50%;margin:0 0 1rem 1.5rem;">
<figcaption>Source: Security Research 2024</figcaption>
</figure>

### Small centered (add text around it)
This is some text before the image.

<figure>
<img src="media/img_1777275979375_762.png" alt="diagram" style="display:block;margin:0 auto;max-width:75%;">
<figcaption>Figure 2: Key Security Risks Table</figcaption>
</figure>

And this text continues after the image, wrapping naturally below it.

