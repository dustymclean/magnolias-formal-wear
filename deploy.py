#!/usr/bin/env python3
"""Run inside Magnolia site repo after extracting this archive. No image assets touched."""
from pathlib import Path
import sys
root=Path(__file__).resolve().parent
if not (root/'index.html').exists() or not (root/'site.css').exists():
 sys.exit('ERROR: Extract the ZIP into ~/Downloads/magnolias-formal-wear and run from there.')
files=sorted(root.glob('*.html'));n=0
for f in files:
 s=f.read_text('utf-8');old='<link rel="stylesheet" href="site.css">';new=old+'<link rel="stylesheet" href="magnolias-luxe.css">'
 if old in s and 'href="magnolias-luxe.css"' not in s:
  f.write_text(s.replace(old,new,1),'utf-8');n+=1
print('Luxury CSS linked:',n,'additional HTML files')
print('Pageants registration page: events.html (7 events, signed-up applications stored securely)')
print('Preserved existing image files, filenames, and photo placements.')
print('Deploy using: git add -A && git commit -m "Launch Magnolias pageants and luxury styling" && git push origin main')
