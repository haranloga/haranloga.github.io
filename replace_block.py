# -*- coding: utf-8 -*-
from pathlib import Path
path = Path('src/index.html')
text = path.read_text()
old = '<div class="flex gap-2 mb-3">\n            <a href="https://www.linkedin.com/in/mariozechner/"><i class="icon w-8 h-8" style="color: var(--link-color);"><%=render("./_icons/linkedin-line.svg")%></i></a\n            <a href="https://twitter.com/badlogicgames"><i class="icon w-8 h-8" style="color: var(--link-color);"><%=render("./_icons/twitter-line.svg")%></i></a\n            <a href="https://github.com/badlogic"><i class="icon w-8 h-8" style="color: var(--link-color);"><%=render("./_icons/github-line.svg")%></i></a\n        </div>\n        <a href="mailto:contact@mariozechner.at">contact@mariozechner.at</a\n        <span>GlacisstraAYe 63</span>'
new = '<div class="flex gap-2 mb-3">\n            <a href="https://www.linkedin.com/in/dream4ip/"><i class="icon w-8 h-8" style="color: var(--link-color);"><%=render("./_icons/linkedin-line.svg")%></i></a\n            <a href="https://twitter.com/haran_loga"><i class="icon w-8 h-8" style="color: var(--link-color);"><%=render("./_icons/twitter-line.svg")%></i></a\n            <a href="https://github.com/haranloga"><i class="icon w-8 h-8" style="color: var (--link-color);"><%=render("./_icons/github-line.svg")%></i></a\n        </div>\n        <a href="mailto:contact@mariozechner.at">contact@mariozechner.at</a\n        <span>Glacisstrasse 63</span>'
text = text.replace(old, new, 1)
path.write_text(text)
