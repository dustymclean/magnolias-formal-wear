
(()=>{
 const container=document.querySelector('.hero-slideshow');
 if(!container)return;
 const slides=[...container.querySelectorAll('.hero-slide')],dots=[...container.querySelectorAll('.hero-dot')];
 let selected=0,timer=null;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 function show(n){
   selected=(n+slides.length)%slides.length;
   slides.forEach((s,i)=>{const active=i===selected;s.classList.toggle('active',active);s.setAttribute('aria-hidden',String(!active));});
   dots.forEach((b,i)=>{b.classList.toggle('selected',i===selected);b.setAttribute('aria-pressed',String(i===selected));});
 }
 function stop(){if(timer!==null){clearInterval(timer);timer=null}}
 function start(){stop();if(reduced.matches||document.hidden)return;timer=setInterval(()=>show(selected+1),6500)}
 function jump(n){show(n);start()}
 container.querySelector('#heroPrev').addEventListener('click',()=>jump(selected-1));
 container.querySelector('#heroNext').addEventListener('click',()=>jump(selected+1));
 dots.forEach((b,i)=>b.addEventListener('click',()=>jump(i)));
 container.addEventListener('mouseenter',stop);
 container.addEventListener('mouseleave',start);
 container.addEventListener('focusin',stop);
 container.addEventListener('focusout',e=>{if(!container.contains(e.relatedTarget))start()});
 document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
 if(reduced.addEventListener)reduced.addEventListener('change',start);
 show(0);start();
})();
