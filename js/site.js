/* ============================================================
   HERO MEDIA PLAYLIST  (home page)
   Add more hero videos / GIFs here. They crossfade in order.
   video: { type:'video', src, mobile, poster }
   image/gif: { type:'image', src, duration (ms) }
   kind:'warm' nudges framing for warmer clips.
   ============================================================ */
const HERO_MEDIA = [
  { type:'video', src:'media/hero-1.mp4', mobile:'media/hero-1-m.mp4', poster:'media/hero-1-poster.webp' },
  { type:'video', src:'media/hero-2.mp4', mobile:'media/hero-2-m.mp4', poster:'media/hero-2-poster.webp', kind:'warm' },
];

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],root=document.documentElement,
  ic=n=>`<svg class="i"><use href="#${n}"/></svg>`,RM=matchMedia('(prefers-reduced-motion:reduce)').matches,
  MOB=matchMedia('(max-width:900px)').matches,HOME=!!$('#home.hero');
const G=()=>window.gsap&&window.ScrollTrigger;

/* ---------- theme: light default, circular wipe from the toggle ---------- */
const tb=$('#theme'),setIcon=()=>tb&&(tb.innerHTML=ic(root.dataset.theme==='dark'?'sun':'moon'));
try{const s=localStorage.getItem('oi-theme-v2');if(s)root.dataset.theme=s}catch(e){}
setIcon();
if(tb)tb.onclick=()=>{
  const flip=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';setIcon();try{localStorage.setItem('oi-theme-v2',root.dataset.theme)}catch(_){}};
  if(!document.startViewTransition||RM)return flip();
  const r=tb.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
  root.style.setProperty('--vx',x+'px');root.style.setProperty('--vy',y+'px');
  root.style.setProperty('--vr',Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y))+'px');
  document.startViewTransition(flip);
};

/* ---------- intro curtain: only first visit of the session, home only ---------- */
(()=>{const i=$('.intro');if(!i)return;let seen=false;try{seen=sessionStorage.getItem('oi-intro')}catch(e){}
  if(seen||RM){i.remove();root.classList.add('fast')}else{try{sessionStorage.setItem('oi-intro',1)}catch(e){};setTimeout(()=>i.remove(),2300)}})();

/* ---------- hero headline → masked words ---------- */
(()=>{const h=$('#heroTitle');if(!h)return;let i=0;
  const wrap=t=>t.split(/(\s+)/).map(w=>/^\s+$/.test(w)?w:`<span class="w"><span style="--i:${i++}">${w}</span></span>`).join('');
  h.innerHTML=[...h.childNodes].map(n=>n.nodeType===3?wrap(n.textContent):n.tagName==='EM'?`<em>${wrap(n.textContent)}</em>`:n.outerHTML).join('');
})();

/* ---------- hero media playlist: crossfade *before* a clip ends ---------- */
(()=>{const box=$('#heroMedia');if(!box)return;let cur=0,paused=RM,timer;
  const dots=$('#mediaDots'),ctl=$('#mediaCtl');
  const els=HERO_MEDIA.map((m,k)=>{let el;
    if(m.type==='video'){el=document.createElement('video');el.muted=true;el.playsInline=true;el.setAttribute('muted','');el.setAttribute('playsinline','');
      el.preload=k?'none':'auto';if(m.poster)el.poster=m.poster;el.src=(MOB&&m.mobile)?m.mobile:m.src;
      if(HERO_MEDIA.length===1)el.loop=true;
      else el.addEventListener('timeupdate',()=>{if(cur===k&&el.duration&&el.currentTime>el.duration-1.3&&!el._x){el._x=1;next()}});}
    else{el=document.createElement('img');el.src=m.src;el.alt=''}
    el.className='slide';box.appendChild(el);return el});
  if(dots&&els.length>1)dots.innerHTML=els.map(()=>'<i></i>').join('');
  function show(k){const m=HERO_MEDIA[k],el=els[k];box.dataset.kind=m.kind||'';
    els.forEach((e,j)=>{e.classList.toggle('on',j===k);if(e.tagName==='VIDEO'&&j!==k)setTimeout(()=>e.pause(),1400)});
    if(dots)[...dots.children].forEach((d,j)=>{d.classList.remove('on');if(j===k){void d.offsetWidth;d.classList.add('on')}});
    clearTimeout(timer);
    if(el.tagName==='VIDEO'){el._x=0;el.preload='auto';el.currentTime=0;
      const setDur=()=>dots&&dots.style.setProperty('--dur',(el.duration-1.3)+'s');el.duration?setDur():el.addEventListener('loadedmetadata',setDur,{once:true});
      if(!paused)el.play().catch(()=>{})}
    else if(els.length>1){dots&&dots.style.setProperty('--dur',(m.duration||6000)/1000+'s');timer=setTimeout(next,m.duration||6000)}
    const nx=els[(k+1)%els.length];if(nx!==el&&nx.tagName==='VIDEO')nx.preload='auto';}
  function next(){if(paused)return;cur=(cur+1)%els.length;show(cur)}
  show(0);
  const setCtl=()=>ctl&&(ctl.innerHTML=ic(paused?'play':'pause'),ctl.setAttribute('aria-label',paused?'Play background video':'Pause background video'));
  if(ctl){setCtl();ctl.onclick=()=>{paused=!paused;const v=els[cur];if(v.tagName==='VIDEO')paused?v.pause():v.play().catch(()=>{});
    if(dots)dots.style.animationPlayState=paused?'paused':'running';$$('#mediaDots i').forEach(d=>d.style.setProperty('animation-play-state',paused?'paused':'running'));setCtl()}}
  new IntersectionObserver(([e])=>{const v=els[cur];if(v.tagName!=='VIDEO'||paused)return;e.isIntersecting?v.play().catch(()=>{}):v.pause()}).observe($('#home'));
  window.replayHero=()=>{cur=0;show(0)};
})();

/* ---------- lazy autoplay for section videos (play only when visible) ---------- */
$$('video[data-auto]').forEach(v=>{if(RM)return;new IntersectionObserver(([e])=>e.isIntersecting?v.play().catch(()=>{}):v.pause(),{threshold:.25}).observe(v)});

/* ---------- kick off hero entrance ---------- */
requestAnimationFrame(()=>root.classList.add('ready'));
const rp=$('#replay');if(rp)rp.onclick=e=>{e.preventDefault();window.lenis?lenis.scrollTo(0):scrollTo({top:0,behavior:'smooth'});
  root.classList.remove('ready');void document.body.offsetWidth;root.classList.add('fast','ready');window.replayHero&&window.replayHero()};

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
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>{const h=a.getAttribute('href');a.classList.toggle('on',h==='#'+e.target.id||h==='index.html#'+e.target.id)})}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>so.observe(s));
const page=location.pathname.split('/').pop()||'index.html';
links.forEach(a=>{if(a.getAttribute('href')===page)a.classList.add('on')});

/* ---------- reveal transitions: 50ms stagger, capped at 5 ---------- */
/* clip-path-hidden (wipe) elements read as invisible to IntersectionObserver, so watch a proxy instead */
const rvMap=new Map();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;(rvMap.get(e.target)||[]).forEach(el=>el.classList.add('in'));rvMap.delete(e.target);io.unobserve(e.target)}),{threshold:0,rootMargin:'0px 0px -12% 0px'});
$$('.rv').forEach(el=>{const sib=[...el.parentElement.children].filter(c=>c.classList.contains('rv'));el.style.transitionDelay=Math.min(sib.indexOf(el),5)*50+'ms';
  let t=el;if(el.dataset.rv==='wipe'){t=document.createElement('span');t.style.cssText='position:absolute;inset:0;pointer-events:none;visibility:hidden';
    if(getComputedStyle(el.parentElement).position==='static')el.parentElement.style.position='relative';el.insertAdjacentElement('beforebegin',t);
    const r=el.getBoundingClientRect(),pr=el.parentElement.getBoundingClientRect();Object.assign(t.style,{inset:'auto',left:r.left-pr.left+'px',top:r.top-pr.top+'px',width:r.width+'px',height:r.height+'px'})}
  rvMap.set(t,[...(rvMap.get(t)||[]),el]);io.observe(t)});

/* ---------- card spotlight ---------- */
if(!MOB)$$('.card,.prod').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));

/* ---------- counters (ease-out) ---------- */
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,n=+el.dataset.count,suf=el.dataset.suf||'+',t0=performance.now(),D=1400;
  (function f(t){const p=Math.min(1,(t-t0)/D),v=Math.round(n*(1-Math.pow(1-p,4)));el.textContent=v+suf;if(p<1)requestAnimationFrame(f)})(t0)}));
setTimeout(()=>$$('[data-count]').forEach(el=>co.observe(el)),RM||root.classList.contains('fast')?300:2600);

/* ---------- page transition between pages (panel wipe; exit faster than enter) ---------- */
(()=>{const pt=$('.pt');if(!pt||RM)return;
  try{if(sessionStorage.getItem('oi-pt')){sessionStorage.removeItem('oi-pt');pt.classList.add('in');setTimeout(()=>pt.classList.remove('in'),800)}}catch(e){}
  document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.metaKey||e.ctrlKey||a.target==='_blank')return;
    const u=new URL(a.href,location.href);if(u.origin!==location.origin||u.pathname===location.pathname||/^(tel|mailto):/.test(a.href))return;
    e.preventDefault();try{sessionStorage.setItem('oi-pt',1)}catch(_){};pt.classList.add('out');setTimeout(()=>location.href=a.href,430)});
  addEventListener('pageshow',e=>{if(e.persisted)pt.classList.remove('out','in')});
})();

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
  $$('.split-media img,.duo-media video,.svc-side .thumb img').forEach(m=>{gsap.fromTo(m,{yPercent:-6,scale:1.12},{yPercent:6,scale:1.12,ease:'none',
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
(function load(){if(RM)return;const s=[
  'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
  'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js',
  'https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js'];
  let n=0;s.forEach(src=>{const el=document.createElement('script');el.src=src;el.async=false;el.onload=el.onerror=()=>{if(++n===s.length)document.fonts.ready.then(premium)};document.head.appendChild(el)});
})();
