from pathlib import Path
text = Path('src/index.html').read_text()
start = text.index('        <div class="flex gap-2 mb-3">')
print(text[start:start+200])
