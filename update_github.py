from pathlib import Path
path = Path('src/index.html')
text = path.read_text()
text = text.replace('https://github.com/someoldusername', 'https://github.com/haranloga')
path.write_text(text)
