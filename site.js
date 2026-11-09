(()=>{
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const f=document.getElementById('contactForm');
if(f){
 const topic=document.getElementById('inquiryTopic'),otherLabel=document.getElementById('otherTopicLabel'),other=document.getElementById('otherTopic');
 function syncOther(){const show=topic.value==='Other / something else';otherLabel.classList.toggle('hide-field',!show);other.required=show;if(!show)other.value=''}
 topic.addEventListener('change',syncOther);syncOther();
 f.addEventListener('submit',e=>{
  e.preventDefault();if(!f.reportValidity())return;
  const d=new FormData(f),reason=d.get('topic')==='Other / something else'?d.get('otherTopic'):d.get('topic');
  const body=['Name: '+d.get('name'),'Email: '+d.get('email'),'Reason: '+reason,'','Message:',d.get('message')].join('\n');
  location.href='mailto:magnoliasformalwear2025@yahoo.com?subject='+encodeURIComponent('Magnolias inquiry: '+reason)+'&body='+encodeURIComponent(body);
 });
}
const noMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=window.matchMedia('(pointer:fine)');
if(noMotion.matches||!finePointer.matches)return;
let last=0,particles=0;
const symbols=['✦','✧','✳','⋆'];
window.addEventListener('pointermove',e=>{
 if(e.pointerType==='touch'||document.hidden)return;
 const now=performance.now();if(now-last<65||particles>=28)return;last=now;
 const sparkle=document.createElement('span');
 sparkle.className='mouse-sparkle';
 sparkle.textContent=symbols[Math.floor(Math.random()*symbols.length)];
 sparkle.style.left=e.clientX+'px';sparkle.style.top=e.clientY+'px';
 sparkle.style.setProperty('--drift-x',(Math.random()*70-35)+'px');
 sparkle.style.setProperty('--drift-y',(-18-Math.random()*60)+'px');
 sparkle.style.setProperty('--rot',(Math.random()*130-65)+'deg');
 sparkle.style.color=Math.random()<.5?'#d7b45e':'#e8e9ef';
 document.body.appendChild(sparkle);particles++;
 sparkle.addEventListener('animationend',()=>{sparkle.remove();particles--},{once:true});
},{passive:true});
})();
