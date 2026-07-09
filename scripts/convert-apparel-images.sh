#!/usr/bin/env bash
# Convert HOODIES and SHIRTS PNG images to WebP.
#
# Source:  public/images/HOODIES/*.png       (e.g. "1 - REDTIDE - F.png")
# Source:  public/images/SHIRTS/*.png        (e.g. "2 - ELITE - B.png")
#
# Output:  public/images/products/hoodies/hs-{name}-{f|b}.webp
# Output:  public/images/products/crew-shirts/hs-{name}-{f|b}.webp
#
# Uses ImageMagick `convert` with quality 85, sRGB colorspace, resize max 2000px.
# Same convention as scripts/convert-off-the-rack.sh for the suits.
#
# Usage:
#   bash scripts/convert-apparel-images.sh
#
# Created: 2026-07-09
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"

convert_one() {
  local src="$1"
  local dst_dir="$2"
  local filename
  filename="$(basename "$src")"

  # Filename format: "N - NAME - F.png" or "N - NAME - B.png"
  # (some have double spaces like "6 -  HIGHLINE - B.png" — collapse them)
  local clean
  clean="$(echo "$filename" | tr -s ' ')"

  # Parse "N - NAME - X.png"
  # Strip the number prefix and the extension
  local name_part side_letter
  name_part="$(echo "$clean" | sed -E 's/^[0-9]+ - //' | sed -E 's/ - [FB]\.png$//' | tr '[:upper:]' '[:lower:]' | tr -s ' ' | sed 's/^ //;s/ $//' | tr ' ' '-')"
  side_letter="$(echo "$clean" | grep -oE ' - [FB]\.png$' | tr -d ' .-' | tr '[:upper:]' '[:lower:]' | sed 's/png//')"

  local out="${dst_dir}/hs-${name_part}-${side_letter}.webp"
  mkdir -p "$dst_dir"

  echo "  → $filename → $(basename "$out")"
  convert "$src" \
    -colorspace sRGB \
    -resize '2000x2000>' \
    -quality 85 \
    -define webp:method=6 \
    "$out"
}

echo "▶ HOODIES → public/images/products/hoodies/"
for f in "${REPO}/public/images/HOODIES"/*.png; do
  [[ -e "$f" ]] || continue
  convert_one "$f" "${REPO}/public/images/products/hoodies"
done

echo ""
echo "▶ SHIRTS  → public/images/products/crew-shirts/"
for f in "${REPO}/public/images/SHIRTS"/*.png; do
  [[ -e "$f" ]] || continue
  convert_one "$f" "${REPO}/public/images/products/crew-shirts"
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ Done. Hoodies:"
ls "${REPO}/public/images/products/hoodies" | wc -l | xargs -I{} echo "    {} .webp files"
echo "✓ Done. Shirts:"
ls "${REPO}/public/images/products/crew-shirts" | wc -l | xargs -I{} echo "    {} .webp files"
