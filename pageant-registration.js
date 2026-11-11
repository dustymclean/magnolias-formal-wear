(()=>{'use strict';
const API='https://magnolias-pageant-registration.pixies-intelligence.workers.dev/register';
const events={
 'christmas-2026':{name:'Magnolias Christmas Pageant',date:'December 13, 2026',entry:true},
 'lebonheur-2027':{name:"Le Bonheur Children's Hospital Charity Pageant",date:'February 13, 2027'},
 'golden-ticket-2027':{name:'Magnolias Golden Ticket',date:'March 21, 2027'},
 'glow-2027':{name:'Magnolias Glow in the Dark Pageant',date:'May 16, 2027'},
 'blonde-2027':{name:'Magnolias Legally Blonde Pageant',date:'July 18, 2027'},
 'halloween-2027':{name:'Magnolias Halloween Pageant',date:'October 10, 2027'},
 'christmas-2027':{name:'Magnolias Christmas Pageant',date:'December 12, 2027'}};
const form=document.getElementById('magnoliaRegistrationForm');if(!form)return;
const $=s=>document.querySelector(s),eventSelect=$('#eventId'),extras=$('#extraPhotos'),bundle=$('#bundle'),addons=[...form.querySelectorAll('input[name=addon]')];
const money=n=>'$'+(n/100).toFixed(2).replace(/\.00$/,'');
function cost(){let e=events[eventSelect.value];if(!e)return null;if(!e.entry)return 0;const selected=addons.filter(x=>x.checked).map(x=>x.value);let base=bundle.checked?10000:5000;let fee={side:2000,outfit:4000,supreme:4500,photogenic:1000,judges:500};return base+selected.reduce((sum,id)=>sum+(fee[id]||0),0)+Number(extras.value)*500;}
function update(){const e=events[eventSelect.value],isEntry=!!e?.entry;$('#christmasPricing').hidden=!isEntry;$('#paymentNumber').innerHTML=(isEntry?'05':'04')+' <span>Payment preference</span>';$('#summaryEvent').textContent=e?.name||'Choose a pageant';$('#summaryDate').textContent=e?.date||'Dates available above';$('#eventNotice').textContent=!e?'Choose a date to see its registration status.':isEntry?'December 13 entry — $50 basic beauty division; optional categories available below.':'Interest signup only — full entry registration, categories and payment fees have not yet been announced.';
 const late=isEntry&&new Date()>new Date('2026-12-05T23:59:59-06:00');$('#lateNotice').hidden=!late;
 if(bundle.checked){addons.filter(x=>['side','outfit'].includes(x.value)).forEach(x=>{x.checked=false;x.disabled=true;});}else addons.forEach(x=>x.disabled=false);
 const rows=$('#receiptLines');rows.replaceChildren();const add=(text,price)=>{const div=document.createElement('div'),s=document.createElement('span'),v=document.createElement('strong');s.textContent=text;v.textContent=price;div.append(s,v);rows.append(div);};
 if(!e){add('Choose a pageant','—');$('#summaryTotal').textContent='—';return;}
 if(!isEntry){add('2027 entry fee','Not announced');$('#summaryTotalLabel').textContent='Estimated total';$('#summaryTotal').textContent='TBA';$('#summaryDisclaimer').textContent='This is an interest request, not a paid pageant entry.';return;}
 add(bundle.checked?'All-events package':'Beauty entry',money(bundle.checked?10000:5000));const fee={side:2000,outfit:4000,supreme:4500,photogenic:1000,judges:500};addons.filter(x=>x.checked).forEach(x=>add(x.parentElement.textContent.trim().replace(/\+\$[\d.]+$/,''),money(fee[x.value])));if(Number(extras.value))add('Extra photos × '+extras.value,money(Number(extras.value)*500));
 $('#summaryTotalLabel').textContent='Selected total';$('#summaryTotal').textContent=money(cost());$('#summaryDisclaimer').textContent=late?'After the Dec. 5 deadline: +$25 late-entry fee may apply. Contact the boutique to confirm availability and final total.':'All fees due when submitting the application. No payment is collected through this form.';
}
eventSelect.addEventListener('change',update);extras.addEventListener('change',update);bundle.addEventListener('change',update);addons.forEach(x=>x.addEventListener('change',update));
document.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>{eventSelect.value=b.dataset.pick;update();document.querySelector('#register').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});setTimeout(()=>eventSelect.focus({preventScroll:true}),450)}));
$('#printApplication').addEventListener('click',()=>window.print());
form.addEventListener('submit',async e=>{e.preventDefault();const err=$('#formError'),button=$('#submitRegistration');err.hidden=true;
if(!form.reportValidity()){err.textContent='Please complete all required fields and agreements.';err.hidden=false;return;}
const data=new FormData(form),id=data.get('eventId');if(!events[id])return;
const payment=data.get('paymentMethod');if(!payment){err.textContent='Select a payment preference.';err.hidden=false;return;}
const eventIds={'christmas-2026':'christmas2026','lebonheur-2027':'bonheur2027','golden-ticket-2027':'golden2027','glow-2027':'glow2027','blonde-2027':'blonde2027','halloween-2027':'halloween2027','christmas-2027':'christmas2027'};
const payload={event_id:eventIds[id],contestant_name:data.get('contestantName'),age_division:data.get('ageGroup'),guardian_name:data.get('guardianName'),guardian_phone:data.get('guardianPhone'),guardian_email:data.get('guardianEmail'),guardian_consent:!!data.get('guardianConsent')&&!!data.get('acceptStatus'),payment_method:payment==='online-card'||payment==='undecided'?'call':payment,package:events[id].entry?!!data.get('bundle'):false,add_ons:events[id].entry?data.getAll('addon'):[],photos:events[id].entry?Number(data.get('extraPhotos')||0):0,website:data.get('website')||''};
button.disabled=true;button.textContent='Sending application…';
try{const response=await fetch(API,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload),mode:'cors'});const result=await response.json();if(!response.ok||!result.ok)throw Error(result.error||'Unable to submit your application.');form.hidden=true;$('#successPanel').hidden=false;$('#successMessage').textContent=result.message;$('#successReference').textContent=result.reference;$('#successPanel').focus();$('#successPanel').scrollIntoView({behavior:'smooth'});
}catch(ex){err.textContent=ex.message||'Registration is currently unavailable. Please call (662) 816-0032.';err.hidden=false;err.scrollIntoView({block:'center'});}finally{button.disabled=false;button.innerHTML='Submit application <span aria-hidden="true">✦</span>';}
});update();
})();
