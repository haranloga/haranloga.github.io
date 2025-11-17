from pathlib import Path
path = Path('src/index.html')
text = path.read_text()
text = text.replace('https://www.linkedin.com/in/mariozechner/', 'https://www.linkedin.com/in/dream4ip/')
text = text.replace('https://twitter.com/badlogicgames', 'https://twitter.com/haran_loga')
text = text.replace('https://github.com/badlogic', 'https://github.com/realspaceeagle')
text = text.replace('GlacisstraAYe 63', 'Glacisstrasse 63')
path.write_text(text)
