import csv,json,re,html,pathlib,sys
from collections import OrderedDict
root=pathlib.Path(__file__).parent
counties=OrderedDict()
for line in (root/'municipalities_by_county.txt').read_text().splitlines():
 c,places=line.split(':',1)
 counties[c]=places.split(',')
assert len(counties)==82
with (root/'municipalities_by_county.csv').open('w',newline='') as f:
 w=csv.writer(f); w.writerow(['county','municipality','state','source_status'])
 for c,places in counties.items():
  for p in places:w.writerow([c,p,'MS','working compilation; verify against Secretary of State Blue Book'])
(root/'municipalities_by_county.json').write_text(json.dumps(counties,indent=2))
primary='Water Valley|Oxford|Batesville|Grenada|Coffeeville|Pope|Enid|Tillatoba|Oakland|Charleston|Sardis|Como|Senatobia|Taylor|Abbeville|Winona|Calhoun City|Bruce|Pontotoc|Holly Springs|New Albany|Tupelo|Clarksdale|Greenwood|Hernando|Southaven|Olive Branch|Collierville|Starkville|West Point|Cleveland|Kosciusko|Ripley|Saltillo|Houston|Coldwater|Byhalia|Marks|Vardaman'.split('|')
rem=[]
for c,places in counties.items():
 a=[p for p in places if p not in primary]
 chunks=''.join(f'<span>{html.escape(p)}, MS</span>' for p in a) if a else '<span>See primary communities above</span>'
 rem.append(f'<details class="ms-county"><summary>{html.escape(c)} County ({len(a)} additional municipalities)</summary><div class="service-towns">{chunks}</div></details>')
section='<section class="statewide-listing" id="all-mississippi"><div class="eyebrow">Statewide destination boutique</div><h2>We also serve… all 82 Mississippi counties.</h2><p>Beyond our primary approximately 150-mile service region, we welcome visitors from communities throughout Mississippi. Explore our county-by-county directory of additional municipalities.</p><div class="ms-counties">'+''.join(rem)+'</div><p>One physical boutique, located in Water Valley. Contact us before traveling to confirm available sizes, rentals and appointments.</p></section>'
(root/'service_area_addition.html').write_text(section)
# Run as: python build.py /path/to/repo/service-area.html
if len(sys.argv)>1:
 path=pathlib.Path(sys.argv[1]); original=path.read_text(); s=original
 if 'id="all-mississippi"' not in s:
  s=s.replace('<div class="editorial" style="margin-top:60px">',section+'<div class="editorial" style="margin-top:60px">',1)
  s=s.replace('Communities around Magnolias</h2>','Primarily serving communities within approximately 150 miles of Water Valley</h2>',1)
  s=s.replace('</head>','<style>.ms-counties{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;margin:26px 0}.ms-county{padding:14px;border:1px solid #d9c9b4;border-radius:8px}.ms-county summary{cursor:pointer;font-weight:600}.ms-county .service-towns{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}.statewide-listing{margin-top:60px}</style></head>',1)
  m=re.search(r'<script type="application/ld\+json">(.*?)</script>',s,re.S)
  if m:
   data=json.loads(m.group(1)); graph=data.get('@graph',[])
   store=next((n for n in graph if n.get('@type')=='ClothingStore'),None)
   if store:store.setdefault('areaServed',[]).append({'@type':'State','name':'Mississippi'})
   graph.append({'@type':'ItemList','@id':'https://magnoliasformalwear.com/service-area.html#counties','name':'Mississippi counties','numberOfItems':82,'itemListElement':[{'@type':'ListItem','position':i+1,'item':{'@type':'AdministrativeArea','name':c+' County, Mississippi'}} for i,c in enumerate(counties)]})
   s=s[:m.start()]+ '<script type="application/ld+json">'+json.dumps(data,separators=(',',':'))+'</script>'+s[m.end():]
  path.write_text(s)
 print('Patched',path)
print('County count:',len(counties),'municipality county-membership records:',sum(map(len,counties.values())))
