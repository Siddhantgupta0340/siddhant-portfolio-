"""Generate the SG monogram favicon, app icons and Open Graph image.

Run from the project root:  python scripts/make-icons.py
Outputs go to app/ (Next.js file-based metadata: favicon.ico, icon.png,
apple-icon.png, opengraph-image.png).
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "app"
FONT = "C:/Windows/Fonts/segoeuib.ttf"
FONT_MONO = "C:/Windows/Fonts/consolab.ttf"

BG_TOP = (18, 26, 34)
BG_BOTTOM = (7, 10, 14)
EMERALD = (62, 224, 165)
TEAL = (94, 234, 212)
WHITE = (238, 242, 246)
MUTED = (163, 175, 189)


def vertical_gradient(size, top, bottom):
    w, h = size
    grad = Image.new("RGB", (1, h))
    for y in range(h):
        t = y / max(h - 1, 1)
        grad.putpixel((0, y), tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    return grad.resize((w, h))


def monogram(size: int) -> Image.Image:
    """Rounded dark tile with an emerald 'SG' and a soft glow."""
    s = size * 4  # supersample for crisp edges
    radius = int(s * 0.22)
    tile = Image.new("RGBA", (s, s), (0, 0, 0, 0))

    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, s - 1, s - 1], radius=radius, fill=255)
    tile.paste(vertical_gradient((s, s), BG_TOP, BG_BOTTOM), (0, 0), mask)

    # emerald border
    border = max(int(s * 0.025), 2)
    ImageDraw.Draw(tile).rounded_rectangle(
        [border // 2, border // 2, s - 1 - border // 2, s - 1 - border // 2],
        radius=radius,
        outline=EMERALD + (150,),
        width=border,
    )

    font = ImageFont.truetype(FONT, int(s * 0.46))
    text = "SG"
    d = ImageDraw.Draw(tile)
    l, t, r, b = d.textbbox((0, 0), text, font=font)
    x = (s - (r - l)) / 2 - l
    y = (s - (b - t)) / 2 - t - s * 0.01

    glow = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    ImageDraw.Draw(glow).text((x, y), text, font=font, fill=EMERALD + (200,))
    glow = glow.filter(ImageFilter.GaussianBlur(s * 0.04))
    tile = Image.alpha_composite(tile, Image.composite(glow, Image.new("RGBA", (s, s)), mask))
    ImageDraw.Draw(tile).text((x, y), text, font=font, fill=EMERALD)

    # small accent dot (cursor) bottom-right
    dot = s * 0.055
    cx, cy = s * 0.78, s * 0.76
    ImageDraw.Draw(tile).ellipse([cx - dot, cy - dot, cx + dot, cy + dot], fill=TEAL)

    return tile.resize((size, size), Image.LANCZOS)


def og_image() -> Image.Image:
    w, h = 1200, 630
    img = vertical_gradient((w, h), (14, 20, 27), BG_BOTTOM).convert("RGBA")

    # dotted grid
    dots = ImageDraw.Draw(img)
    for gx in range(0, w, 32):
        for gy in range(0, h, 32):
            dots.point((gx, gy), fill=(255, 255, 255, 28))

    # emerald glow blob
    blob = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(blob).ellipse([650, -250, 1350, 450], fill=EMERALD + (70,))
    img = Image.alpha_composite(img, blob.filter(ImageFilter.GaussianBlur(120)))

    icon = monogram(132)
    img.alpha_composite(icon, (80, 80))

    d = ImageDraw.Draw(img)
    d.text((80, 270), "Siddhant Gupta", font=ImageFont.truetype(FONT, 88), fill=WHITE)
    d.text((84, 380), "Junior Software Engineer", font=ImageFont.truetype(FONT, 44), fill=EMERALD)
    d.text(
        (84, 450),
        "React  ·  TypeScript  ·  FastAPI  ·  Node.js  ·  PostgreSQL",
        font=ImageFont.truetype(FONT, 30),
        fill=MUTED,
    )
    d.text((84, 545), "Indore, India", font=ImageFont.truetype(FONT_MONO, 24), fill=(120, 132, 146))
    return img.convert("RGB")


def main():
    monogram(512).save(APP / "icon.png")
    monogram(180).save(APP / "apple-icon.png")
    monogram(256).save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    og_image().save(APP / "opengraph-image.png", optimize=True)
    print("icons written to", APP)


if __name__ == "__main__":
    main()
