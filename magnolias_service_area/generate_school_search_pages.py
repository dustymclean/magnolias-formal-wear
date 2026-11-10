"""Build a school occasion directory from verified school names supplied in a CSV.
Input CSV must have a 'school_name' column, optionally 'city' and 'county'.
Run: python generate_school_search_pages.py verified_mississippi_schools.csv
This does NOT assert school affiliation or confirmed events.
"""
import sys,csv,html,json,pathlib,re
if len(sys.argv)!=2: raise SystemExit('Usage: python generate_school_search_pages.py verified_schools.csv')
source=pathlib.Path(sys.argv[1]); records=list(csv.DictReader(source.open(newline='')))
if not records or 'school_name' not in records[0]:raise SystemExit('school_name column is required')
keywords=['prom','prom dresses','prom gowns','homecoming','homecoming dresses','HOCO','HOCO dresses','school dance','dance dresses','formal dance','formal dresses','winter formal','spring formal']
parts=[]; manifest=[]
for row in records:
 name=row['school_name'].strip();city=row.get('city','').strip();county=row.get('county','').strip()
 if not name:continue
 phrases=[f'{name} {k}' for k in keywords]
 manifest.append({'school':name,'city':city,'county':county,'search_phrases':phrases})
 parts.append('<article class="school-occasion"><h3>'+html.escape(name)+'</h3><p>Shopping for '+html.escape(name)+' prom, homecoming, HOCO or a school dance? Explore dresses and formalwear at our Water Valley boutique. Events and school affiliations are not implied; contact the school for event details.</p><p>'+html.escape(' · '.join(phrases))+'</p></article>')
root=pathlib.Path(__file__).parent
(root/'school_occasion_directory.html').write_text('<section id="mississippi-schools"><h2>Mississippi school prom, homecoming &amp; dance shopping</h2>'+''.join(parts)+'</section>')
(root/'school_search_phrase_inventory.json').write_text(json.dumps(manifest,indent=2))
print(f'Created {len(manifest)} verified-name entries and {len(manifest)*len(keywords)} search phrases')
