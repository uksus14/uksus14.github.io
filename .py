from PIL import Image
from pathlib import Path
import os
folder = Path("static/full-list")
lines = []
for filename in os.listdir(folder):
    with Image.open(folder / filename) as img: width, height = img.size
    lines.append(f'    {{ "filename": "{filename}", "width": {width}, "height": {height} }}')
script = "[\n" + ",\n".join(lines) + "\n]"
with open("static/images-list.json", "w") as f: f.write(script)