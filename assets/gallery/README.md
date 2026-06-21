# Gallery Thumbnails

Generate low-quality thumbnails from original images:

```bash
for f in assets/gallery/*; do
  ext="${f##*.}"
  name="${f%.*}"
  [[ "$f" == *-lowq* || "$f" == *-highq* ]] && continue
  magick "$f" -resize 800x800 -quality 60 "${name}-lowq.${ext}"
done
```

Delete existing thumbnails:

```bash
rm assets/gallery/*-lowq*
```

## Category Thumbnails

Generate low-quality thumbnails for all category images:

```bash
for dir in assets/categories/*/; do
  for f in "$dir"*; do
    [[ "$f" == *-lowq* || "$f" == *-highq* ]] && continue
    ext="${f##*.}"
    name="${f%.*}"
    magick "$f" -resize 800x800 -quality 60 "${name}-lowq.${ext}"
  done
done
```

Delete existing category thumbnails:

```bash
find assets/categories -name '*-lowq*' -delete
```

## Web Optimization

Convert originals to web-standard quality, keeping originals as `-highq`:

```bash
find assets -type f \( -name '*.jpg' -o -name '*.jpeg' -o -name '*.JPG' \) ! -name '*-lowq*' ! -name '*-highq*' ! -name 'nf-logo*' ! -name 'our-story*' ! -name 'foss*' -print0 | while IFS= read -r -d '' f; do
  ext="${f##*.}"
  name="${f%.*}"
  highq="${name}-highq.${ext}"
  cp "$f" "$highq"
  magick "$highq" -quality 85 -strip "$f"
done
```

Delete highq backups:

```bash
find assets -name '*-highq*' -delete
```