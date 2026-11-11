#!/usr/bin/env python3
"""Run from the root of your magnolias-formal-wear Git repository.
Place this script and stylists.html alongside index.html before running.
It only inserts the Stylists link into existing top navigation blocks.
"""
from pathlib import Path
import re
root=Path(__file__).resolve().parent
if not (root/'index.html').is_file() or not (root/'stylists.html').is_file():
    raise SystemExit('Put BOTH files in the repository root next to index.html.')
changed=[]
for path in root.glob('*.html'):
    if path.name=='stylists.html': continue
    before=path.read_text(encoding='utf-8')
    match=re.search(r'(<nav\b[^>]*\bid=[\"\']mainnav[\"\'][^>]*>)(.*?)(</nav>)',before,re.S|re.I)
    if not match or 'href="stylists.html"' in match.group(2):continue
    nav=match.group(2)
    link='<a href="stylists.html">Stylists</a>'
    contact=re.search(r'<a\b[^>]*href="contact\.html"[^>]*>[^<]*Contact</a>',nav,re.I)
    nav=nav[:contact.start()]+link+nav[contact.start():] if contact else nav+link
    after=before[:match.start(2)]+nav+before[match.end(2):]
    path.write_text(after,encoding='utf-8')
    changed.append(path.name)
print('Navigation updated in:', ', '.join(changed) or '(already present or no matching nav)')
print('Page ready: stylists.html (4 referral links)')
