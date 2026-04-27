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
![screenshot|center](media/img_1777275979375_762.png)

### Centered with caption
![screenshot|center](media/img_1777275979375_762.png "Figure 1: AI Agent Security Overview")

### Right aligned
![screenshot|right](media/img_1777275979375_762.png)

### Right aligned with caption
![screenshot|right](media/img_1777275979375_762.png "Source: Security Research 2024")

### Small centered (add text around it)
This is some text before the image.

![diagram|center](media/img_1777275979375_762.png "Figure 2: Key Security Risks Table")

And this text continues after the image, wrapping naturally below it.

