#!/usr/bin/env python3
"""
Crop and resize screenshots for the UppGrad user manual.

Usage:
  1. Place raw screenshots in public/screenshots/raw/<name>.png
  2. Run: python3 crop-screenshots.py
  3. Cropped files appear in public/screenshots/<name>.png
"""
from PIL import Image
import os

SHOTS_DIR  = os.path.join(os.path.dirname(__file__), "public", "screenshots")
RAW_DIR    = os.path.join(SHOTS_DIR, "raw")
OUT_DIR    = SHOTS_DIR
os.makedirs(RAW_DIR, exist_ok=True)

def trim_whitespace(img, threshold=242, padding=24):
    """Trim near-white rows from top and bottom."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    sample_xs = list(range(0, w, max(1, w // 40)))

    def row_is_blank(y):
        return all(
            all(rgb.getpixel((x, y))[c] >= threshold for c in range(3))
            for x in sample_xs
        )

    top = 0
    while top < h and row_is_blank(top):
        top += 1

    bottom = h - 1
    while bottom > top and row_is_blank(bottom):
        bottom -= 1

    top    = max(0, top - padding)
    bottom = min(h, bottom + padding)
    return img.crop((0, top, w, bottom))

def fit_width(img, max_w):
    if img.width > max_w:
        ratio  = max_w / img.width
        return img.resize((max_w, int(img.height * ratio)), Image.LANCZOS)
    return img

# ── per-screenshot config ────────────────────────────────────────────────────
# key → (box_or_None, max_width, trim_top_bottom)
# box = (left, upper, right, lower) in original pixels, or None to keep full
CONFIGS = {
    "ss-01":  (None,        1800, True),   # Login page
    "ss-02":  (None,        1800, True),   # Register page
    "ss-03":  (None,        1800, True),   # Profile page
    "ss-04":  (None,        1800, True),   # Dashboard
    "ss-05":  (None,        1800, True),   # Documental Feedback
    "ss-10":  (None,        1800, True),   # Opportunities
    "ss-11":  (None,        1800, True),   # Auto-Apply start
    "ss-11b": (None,         900, True),   # Auto-Apply modal: choose docs (portrait)
    "ss-11c": (None,         900, True),   # Auto-Apply modal: review package (portrait)
    "ss-07":  (None,        1800, True),   # Review Proposals (full panel)
    "ss-08":  (None,         900, True),   # Proposal card detail (portrait)
    "ss-09":  (None,        1800, True),   # Session history with download
    "ss-12":  (None,        1800, True),   # Post Opportunity (employer)
    "ss-13":  (None,        1800, True),   # Admin Analytics
}

print(f"Reading from : {RAW_DIR}")
print(f"Writing to   : {OUT_DIR}\n")

processed = 0
for name, (box, max_w, do_trim) in CONFIGS.items():
    src = os.path.join(RAW_DIR, f"{name}.png")
    if not os.path.exists(src):
        print(f"  --  {name}.png  (not in raw/, skipping)")
        continue
    img = Image.open(src).convert("RGBA")
    if box:
        img = img.crop(box)
    if do_trim:
        img = trim_whitespace(img)
    img = fit_width(img, max_w)
    # flatten alpha → white before saving as PNG
    bg = Image.new("RGB", img.size, (255, 255, 255))
    bg.paste(img, mask=img.split()[3] if img.mode == "RGBA" else None)
    out_path = os.path.join(OUT_DIR, f"{name}.png")
    bg.save(out_path, optimize=True)
    print(f"  OK  {name}.png  →  {bg.size[0]}×{bg.size[1]} px")
    processed += 1

print(f"\n{processed} screenshot(s) processed.")
