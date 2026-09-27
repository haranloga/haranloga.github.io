"""Generate web-optimised images for the site. Safe to re-run; only writes when output is missing or older than its source.

- Post covers (meta.json "image" = png/jpg): writes <name>.webp (full width, max 1400px)
  and <name>-card.webp (640x640 centre crop, matching the square project cards).
  The original stays for og:image, since not every social crawler accepts WebP.

Run from the repo root:  python scripts/optimize-images.py
"""
import json
import os
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
POSTS = ROOT / "src" / "posts"
RASTER = {".png", ".jpg", ".jpeg"}


def stale(src: Path, out: Path) -> bool:
    return not out.exists() or out.stat().st_mtime < src.stat().st_mtime


def load_rgb(path: Path) -> Image.Image:
    im = ImageOps.exif_transpose(Image.open(path))
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (0, 0, 0))
        bg.paste(im, mask=im.split()[-1])
        return bg
    return im.convert("RGB")


def write_cover_variants(cover: Path) -> list[str]:
    done = []
    full = cover.with_suffix(".webp")
    card = cover.with_name(cover.stem + "-card.webp")
    if stale(cover, full) or stale(cover, card):
        im = load_rgb(cover)
        if stale(cover, full):
            f = im.copy()
            if f.width > 1400:
                f = f.resize((1400, round(f.height * 1400 / f.width)), Image.LANCZOS)
            f.save(full, "WEBP", quality=82, method=6)
            done.append(str(full.relative_to(ROOT)))
        if stale(cover, card):
            ImageOps.fit(im, (640, 640), Image.LANCZOS).save(card, "WEBP", quality=70, method=6)
            done.append(str(card.relative_to(ROOT)))
    return done


def main() -> int:
    written = []
    for meta_file in sorted(POSTS.glob("*/meta.json")):
        image = json.loads(meta_file.read_text(encoding="utf-8")).get("image") or ""
        cover = meta_file.parent / image
        if image and cover.suffix.lower() in RASTER and cover.exists():
            written += write_cover_variants(cover)
    for w in written:
        print("wrote", w, os.path.getsize(ROOT / w) // 1024, "KB")
    if not written:
        print("all images up to date")
    return 0


if __name__ == "__main__":
    sys.exit(main())
