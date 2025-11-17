from pathlib import Path
text = Path('src/index.html').read_text()
idx = text.index('<div class="flex gap-2 mb-3">')
print(repr(text[idx:idx+200]))
