/* Hero: light hands video in light theme, dark hands video in dark theme.
   Hero copy fades in when the hands touch (data-reveal seconds on each <video>). */

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],root=document.documentElement,
  ic=n=>`<svg class="i"><use href="#${n}"/></svg>`,RM=matchMedia('(prefers-reduced-motion:reduce)').matches,
  MOB=matchMedia('(max-width:900px)').matches,HOME=!!$('#home.hero');
const G=()=>window.gsap&&window.ScrollTrigger;
const norm=p=>p.replace(/index\.html$/,'').replace(/\/+$/,'')||'/';   /* /techpartner == /techpartner/ == /techpartner/index.html */

/* ---------- theme: light default, circular wipe from the toggle ---------- */
const tb=$('#theme'),setIcon=()=>tb&&(tb.innerHTML=ic(root.dataset.theme==='dark'?'sun':'moon'));
try{const s=localStorage.getItem('oi-theme-v2');if(s)root.dataset.theme=s}catch(e){}
setIcon();
if(tb)tb.onclick=()=>{
  const flip=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';setIcon();window.heroSync&&window.heroSync();try{localStorage.setItem('oi-theme-v2',root.dataset.theme)}catch(_){}};
  if(!document.startViewTransition||RM)return flip();
  const r=tb.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
  root.style.setProperty('--vx',x+'px');root.style.setProperty('--vy',y+'px');
  root.style.setProperty('--vr',Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y))+'px');
  document.startViewTransition(flip);
};

root.classList.add('fast');

/* ---------- hero headline → masked words ---------- */
(()=>{const h=$('#heroTitle');if(!h)return;let i=0;
  const wrap=t=>t.split(/(\s+)/).map(w=>/^\s+$/.test(w)?w:`<span class="w"><span style="--i:${i++}">${w}</span></span>`).join('');
  h.innerHTML=[...h.childNodes].map(n=>n.nodeType===3?wrap(n.textContent):n.tagName==='EM'?`<em>${wrap(n.textContent)}</em>`:n.outerHTML).join('');
})();

/* ---------- hero video per theme + reveal copy at the touch moment ---------- */
(()=>{const box=$('#heroMedia');if(!box)return;const L=$('.hv-light'),D=$('.hv-dark'),ctl=$('#mediaCtl');let paused=RM,revealed=false,rt;
  const reveal=()=>{if(revealed)return;revealed=true;clearTimeout(rt);root.classList.add('ready');window.startCounters&&startCounters()};
  window.heroReveal=reveal;
  const active=()=>root.dataset.theme==='dark'?D:L,idle=()=>root.dataset.theme==='dark'?L:D;
  const load=v=>{if(v.dataset.poster&&!v.poster)v.poster=v.dataset.poster;if(!v.src){v.src=(MOB&&v.dataset.srcM)?v.dataset.srcM:v.dataset.src;v.preload='auto'}};
  [L,D].forEach(v=>{v.loop=true;v.muted=true;
    v.addEventListener('timeupdate',()=>{if(v===active()&&!revealed&&v.currentTime>=+v.dataset.reveal)reveal()})});
  function play(fromStart){const a=active(),b=idle();load(a);b.pause();if(fromStart)a.currentTime=0;
    if(!paused)a.play().catch(()=>reveal());}
  window.heroSync=()=>play(false);
  if(root.dataset.theme==='dark')load(D);           // called after a theme toggle
  window.replayHero=()=>{if(MOB){play(true);return}revealed=false;root.classList.remove('ready');play(true);rt=setTimeout(reveal,5000)};
  const intro=$('.intro'),delay=intro&&!root.classList.contains('fast')?1500:150;
  if(RM||MOB){reveal();setTimeout(()=>play(true),50)}else{setTimeout(()=>play(true),delay);rt=setTimeout(reveal,delay+3600)}
  [L,D].forEach(v=>v.addEventListener('playing',()=>{if(revealed||v!==active())return;clearTimeout(rt);rt=setTimeout(reveal,Math.max(0,(+v.dataset.reveal-v.currentTime+.8)*1000))}));
  [L,D].forEach(v=>v.addEventListener('error',reveal));
  addEventListener('scroll',()=>{if(scrollY>60)reveal()},{passive:true});
  const setCtl=()=>ctl&&(ctl.innerHTML=ic(paused?'play':'pause'),ctl.setAttribute('aria-label',paused?'Play background video':'Pause background video'));
  if(ctl){setCtl();ctl.onclick=()=>{paused=!paused;paused?active().pause():active().play().catch(()=>{});if(paused)reveal();setCtl()}}
  new IntersectionObserver(([e])=>{if(paused)return;e.isIntersecting?active().play().catch(()=>{}):active().pause()}).observe($('section#home'));
})();

/* ---------- lazy autoplay for section videos (play only when visible) ---------- */
$$('video[data-auto]').forEach(v=>{new IntersectionObserver(([e])=>{if(e.isIntersecting&&v.dataset.poster&&!v.poster)v.poster=v.dataset.poster;if(RM)return;e.isIntersecting?v.play().catch(()=>{}):v.pause()},{rootMargin:'300px 0px',threshold:0}).observe(v)});

/* ---------- kick off hero entrance ---------- */
if(!HOME)requestAnimationFrame(()=>root.classList.add('ready'));
root.classList.add('fast');
const rp=$('#replay');if(rp)rp.onclick=e=>{e.preventDefault();window.lenis?lenis.scrollTo(0):scrollTo({top:0,behavior:'smooth'});window.replayHero&&window.replayHero()};

/* ---------- marquee seamless loop ---------- */
(()=>{const t=$('#mq');if(t)t.innerHTML+=t.innerHTML})();

/* ---------- scroll: header, progress, app bar, process line ---------- */
const hdr=$('header'),bar=$('#appbar'),prog=$('#progress'),steps=$('#steps'),stepEls=$$('.step');
let lastY=0;
function onScroll(){const y=scrollY,H=innerHeight;
  hdr.classList.toggle('solid',y>30||!HOME);
  if(y>H&&y>lastY+4)hdr.classList.add('hide');if(y<lastY-4||y<H)hdr.classList.remove('hide');lastY=y;
  bar&&bar.classList.toggle('show',y>H*.5||!HOME);
  prog&&(prog.style.transform=`scaleX(${y/(document.documentElement.scrollHeight-H)||0})`);
  if(steps){const r=steps.getBoundingClientRect(),sp=Math.min(1,Math.max(0,(H*.6-r.top)/r.height));
    steps.style.setProperty('--p',sp);stepEls.forEach((s,k)=>s.classList.toggle('lit',sp>=k/(stepEls.length-1)-.02))}
  if(!G()&&HOME&&!RM&&y<H){const p=y/H,c=$('#heroCopy');c.style.transform=`translateY(${p*-80}px)`;c.style.opacity=1-p*1.3}}
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* ---------- active nav ---------- */
const links=$$('.menu a,.appbar a');
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>{const u=new URL(a.href,location.href);a.classList.toggle('on',u.hash==='#'+e.target.id&&norm(u.pathname)===norm(location.pathname))})}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>so.observe(s));
links.forEach(a=>{const u=new URL(a.href,location.href);if(!u.hash&&norm(u.pathname)===norm(location.pathname)&&!/index\.html$|\/$/.test(u.pathname))a.classList.add('on')});

/* ---------- reveal transitions: 50ms stagger, capped at 5 ---------- */
/* clip-path-hidden (wipe) elements read as invisible to IntersectionObserver, so watch a proxy instead */
const rvMap=new Map();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;(rvMap.get(e.target)||[]).forEach(el=>el.classList.add('in'));rvMap.delete(e.target);io.unobserve(e.target)}),{threshold:0,rootMargin:MOB?'0px 0px -4% 0px':'0px 0px -12% 0px'});
$$('.rv').forEach(el=>{const sib=[...el.parentElement.children].filter(c=>c.classList.contains('rv'));el.style.transitionDelay=Math.min(sib.indexOf(el),5)*(MOB?40:50)+'ms';
  let t=el;if(el.dataset.rv==='wipe'){t=document.createElement('span');t.style.cssText='position:absolute;inset:0;pointer-events:none;visibility:hidden';
    if(getComputedStyle(el.parentElement).position==='static')el.parentElement.style.position='relative';el.insertAdjacentElement('beforebegin',t);
    const r=el.getBoundingClientRect(),pr=el.parentElement.getBoundingClientRect();Object.assign(t.style,{inset:'auto',left:r.left-pr.left+'px',top:r.top-pr.top+'px',width:r.width+'px',height:r.height+'px'})}
  rvMap.set(t,[...(rvMap.get(t)||[]),el]);io.observe(t)});

/* ---------- card spotlight ---------- */
if(!MOB)$$('.card,.prod').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));

/* ---------- counters (ease-out) ---------- */
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,n=+el.dataset.count,suf=el.dataset.suf||'+',t0=performance.now(),D=1400;
  (function f(t){const p=Math.min(1,(t-t0)/D),v=Math.round(n*(1-Math.pow(1-p,4)));el.textContent=v+suf;if(p<1)requestAnimationFrame(f)})(t0)}));
window.startCounters=()=>setTimeout(()=>$$('[data-count]').forEach(el=>{co.unobserve(el);co.observe(el)}),1300);
if(!HOME||RM||root.classList.contains('ready'))startCounters();

/* ---------- page transition between pages (panel wipe; exit faster than enter) ---------- */
(()=>{const pt=$('.pt');if(!pt||RM)return;
  try{if(sessionStorage.getItem('oi-pt')){sessionStorage.removeItem('oi-pt');pt.classList.add('in');setTimeout(()=>pt.classList.remove('in'),800)}}catch(e){}
  document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.metaKey||e.ctrlKey||a.target==='_blank')return;
    const u=new URL(a.href,location.href);if(u.origin!==location.origin||norm(u.pathname)===norm(location.pathname)||/^(tel|mailto):/.test(a.href))return;
    e.preventDefault();try{sessionStorage.setItem('oi-pt',1)}catch(_){};pt.classList.add('out');setTimeout(()=>location.href=a.href,430)});
  addEventListener('pageshow',e=>{if(e.persisted)pt.classList.remove('out','in')});
})();

/* ---------- CTAs that pre-select a service in the enquiry form ---------- */
$$('[data-service]').forEach(b=>b.addEventListener('click',()=>{const sel=$('#inq select[name=service]');if(!sel)return;
  const o=[...sel.options].find(o=>o.text===b.dataset.service);if(o)sel.value=o.value}));

/* ---------- enquiry form → mailto ---------- */
const inq=$('#inq');if(inq)inq.onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),name=f.get('name').trim(),phone=f.get('phone').trim();
 if(!name||!phone){e.target.reportValidity();return}
 const body=`Name: ${name}\nPhone: ${phone}\nEmail: ${f.get('email')}\nInterested in: ${f.get('service')}\n\n${f.get('msg')}`;
 location.href=`mailto:info@openidea.world?subject=${encodeURIComponent('Website enquiry: '+f.get('service'))}&body=${encodeURIComponent(body)}`};

/* =====================================================================
   PREMIUM LAYER: Lenis smooth scroll + GSAP ScrollTrigger, ONE ticker.
   Loads after the page; site works fully without it.
   ===================================================================== */
function premium(){if(!G()||RM)return;const {gsap,ScrollTrigger}=window;gsap.registerPlugin(ScrollTrigger);
  if(window.Lenis&&!MOB){const l=window.lenis=new Lenis({duration:1.15,easing:t=>1-Math.pow(1-t,4),smoothWheel:true});
    l.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>l.raf(t*1000));gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.length<2)return;const t=$(id);if(!t)return;e.preventDefault();l.scrollTo(t,{offset:-70})}));
    if(location.hash&&$(location.hash))setTimeout(()=>l.scrollTo($(location.hash),{offset:-70,immediate:true}),50);}

  /* hero: video settles into a rounded card, copy lifts away (scrub, transforms only) */
  if(HOME){const tl=gsap.timeline({scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:.6}});
    tl.to('#heroCopy',{y:-120,opacity:0,ease:'none'},0)
      .to('#heroMedia',{scale:.86,y:40,borderRadius:40,ease:'none'},0)
      .to('.stats',{y:-40,opacity:.0,ease:'none'},.2);}

  /* headings: line-by-line mask reveal */
  $$('.sec-head h2,.duo h2,.auto-txt h2,.inq-info h2,.svc h2,.cta-band h2,.page-hero h1').forEach(h=>{
    const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;'),toks=[];
    h.childNodes.forEach(n=>{if(n.nodeType===3)n.textContent.split(/\s+/).filter(Boolean).forEach(w=>toks.push(esc(w)));
      else if(n.nodeType===1&&n.tagName!=='BR'){const tag=n.tagName.toLowerCase(),cl=n.className?` class="${n.className}"`:'';n.textContent.split(/\s+/).filter(Boolean).forEach(w=>toks.push(`<${tag}${cl}>${esc(w)}</${tag}>`))}});
    h.innerHTML=toks.map(w=>`<span class="wd" style="display:inline-block">${w}</span>`).join(' ');
    const ws=[...h.querySelectorAll('.wd')];let lines=[],top=-1e9;ws.forEach(w=>{const t=w.offsetTop+w.offsetHeight/2;if(Math.abs(t-top)>w.offsetHeight*.5){lines.push([]);top=t}lines[lines.length-1].push(w)});
    h.innerHTML=lines.map(l=>`<span class="ln"><span>${l.map(w=>w.innerHTML).join(' ')}</span></span>`).join('');
    const parent=h.closest('.rv');if(parent){parent.classList.add('in');parent.style.transitionDelay='0ms'}
    gsap.from(h.querySelectorAll('.ln>span'),{yPercent:105,duration:.9,ease:'expo.out',stagger:.05,
      scrollTrigger:{trigger:h,start:'top 88%'},delay:h.closest('.page-hero')?.35:0});});

  /* images: subtle parallax inside their frames */
  $$('.split-media img,.duo-media video,.svc-side .thumb img,.auto-bg img').forEach(m=>{gsap.fromTo(m,{yPercent:-6,scale:1.12},{yPercent:6,scale:1.12,ease:'none',
    scrollTrigger:{trigger:m.parentElement,start:'top bottom',end:'bottom top',scrub:true}})});

  /* marquee reacts to scroll velocity */
  const tr=$('#mq');if(tr){let skew=gsap.quickTo(tr,'skewX',{duration:.4,ease:'power3'});
    ScrollTrigger.create({onUpdate:s=>skew(gsap.utils.clamp(-8,8,s.getVelocity()/-300))})}

  /* magnetic primary buttons (desktop, earned delight) */
  if(!MOB)$$('.btn-p,.tbtn').forEach(b=>{b.classList.add('mag');const xTo=gsap.quickTo(b,'x',{duration:.5,ease:'elastic.out(1,.4)'}),yTo=gsap.quickTo(b,'y',{duration:.5,ease:'elastic.out(1,.4)'});
    b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();xTo((e.clientX-r.left-r.width/2)*.25);yTo((e.clientY-r.top-r.height/2)*.35)});
    b.addEventListener('pointerleave',()=>{xTo(0);yTo(0)})});
  ScrollTrigger.refresh();
}
(function load(){if(RM)return;const s=['js/vendor/gsap.min.js','js/vendor/ScrollTrigger.min.js'];if(!MOB)s.push('js/vendor/lenis.min.js');
  const go=()=>{let n=0;s.forEach(src=>{const el=document.createElement('script');el.src=src;el.async=false;el.onload=el.onerror=()=>{if(++n===s.length)document.fonts.ready.then(premium)};document.head.appendChild(el)})};
  /* wait until the first screen has painted and the page is idle, so animation code never delays the hero */
  const idle=()=>('requestIdleCallback' in window)?requestIdleCallback(go,{timeout:1200}):setTimeout(go,300);
  document.readyState==='complete'?idle():addEventListener('load',idle,{once:true});
})();

/* =====================================================================
   LIVE DEMOS: 3D coverflow slideshow. Centre card opens the demo in a new tab.
   ===================================================================== */
(()=>{const cf=$('#cf'),stage=$('#cfStage'),dataEl=$('#demoData');if(!cf||!dataEl)return;
  const D=JSON.parse(dataEl.textContent),esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  stage.innerHTML=D.map((d,i)=>`<a class="cf-card" href="${esc(d.u)}" target="_blank" rel="noopener" data-i="${i}" aria-label="${esc(d.n)}, ${esc(d.t)}: open live demo in a new tab">
    <div class="cf-ph"><img src="${d.i}" alt="" loading="lazy" decoding="async"><span class="cf-tag">${esc(d.t)}</span><span class="cf-view">View<br>live</span></div>
    <div class="cf-cap"><h3>${esc(d.n)}</h3><p>${esc(d.d)}</p><div class="cf-tags">${d.g.map(g=>`<span>${esc(g)}</span>`).join('')}</div></div></a>`).join('');
  const cards=[...stage.children],curEl=$('#cfCur'),totEl=$('#cfTot'),live=$('#cfLive');
  let list=D.map((_,i)=>i),cur=0,timer,hover=false,inView=false;
  const pad=n=>String(n).padStart(2,'0');
  function layout(){const n=list.length,narrow=innerWidth<=700,cw=cf.getBoundingClientRect().width&&parseFloat(getComputedStyle(cf).getPropertyValue('--cw'))||cards[0].offsetWidth;
    const w=cards[0].offsetWidth;
    cards.forEach((c,i)=>{const k=list.indexOf(i);
      if(k<0){c.classList.add('off');c.classList.remove('c');c.style.transform='translateZ(-600px) scale(.4)';c.style.zIndex=0;c.tabIndex=-1;return}
      let d=k-cur;if(d>n/2)d-=n;if(d<-n/2)d+=n;const a=Math.abs(d),s=Math.sign(d),max=narrow?1:4;
      c.classList.toggle('off',a>max);c.classList.toggle('c',a===0);c.tabIndex=a===0?0:-1;c.style.zIndex=50-a;
      const x=a===0?0:s*w*(narrow?(.86+(a-1)*.1):(.6+(a-1)*.2)),sc=a===0?1:Math.max(.5,(narrow?.84:.8)-(a-1)*.09),ry=a===0?0:-s*(narrow?12:24);
      c.style.transform=`translateX(${x}px) translateZ(${-a*90}px) rotateY(${ry}deg) scale(${sc})`;
      c.style.filter=a===0?'none':`brightness(${Math.max(.35,.72-(a-1)*.12)})`});
    curEl.textContent=pad(cur+1);totEl.textContent=pad(n);
    const d=D[list[cur]];live.textContent=`${d.n}, ${cur+1} of ${n}`}
  const go=k=>{const n=list.length;cur=(k%n+n)%n;layout()};
  const next=()=>go(cur+1),prev=()=>go(cur-1);
  $('.cf-arrow.next').onclick=()=>{next();restart()};$('.cf-arrow.prev').onclick=()=>{prev();restart()};
  stage.addEventListener('click',e=>{const c=e.target.closest('.cf-card');if(!c)return;const k=list.indexOf(+c.dataset.i);
    if(k!==cur){e.preventDefault();go(k);restart()}});
  cf.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){next();restart()}else if(e.key==='ArrowLeft'){prev();restart()}});
  $$('#cfFilters button').forEach(b=>b.onclick=()=>{$$('#cfFilters button').forEach(x=>x.classList.toggle('on',x===b));
    const f=b.dataset.f;list=D.map((d,i)=>[d,i]).filter(([d])=>f==='all'||d.c===f).map(([,i])=>i);cur=0;layout();restart()});
  /* swipe / drag */
  let sx=null,dragged=false;stage.addEventListener('pointerdown',e=>{sx=e.clientX;dragged=false});
  addEventListener('pointerup',e=>{if(sx===null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)>45){dragged=true;dx<0?next():prev();restart()}});
  stage.addEventListener('click',e=>{if(dragged){e.preventDefault();e.stopImmediatePropagation();dragged=false}},true);
  stage.addEventListener('dragstart',e=>e.preventDefault());
  /* gentle autoplay: only while visible, paused on hover/focus */
  function restart(){clearInterval(timer);if(RM)return;timer=setInterval(()=>{if(inView&&!hover&&!document.hidden)next()},4200)}
  cf.addEventListener('pointerenter',()=>hover=true);cf.addEventListener('pointerleave',()=>hover=false);
  cf.addEventListener('focusin',()=>hover=true);cf.addEventListener('focusout',()=>hover=false);
  new IntersectionObserver(([e])=>inView=e.isIntersecting,{threshold:.35}).observe(cf);
  addEventListener('resize',layout);layout();restart();
})();
