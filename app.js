// =========== HELPERS ===========
const safeStorage = {
  get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
};
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// =========== SCHEDULE ===========
// Edit here to change run schedule without touching the rest of the code.
// dayOfWeek: 0=Sun..6=Sat. hour/minute in Tashkent time (UTC+5).
const RUN_SCHEDULE = [
  { dayOfWeek: 3, hour: 21, minute: 0 }, // Wednesday 21:00
  { dayOfWeek: 6, hour: 21, minute: 0 }  // Saturday 21:00
];

// =========== I18N ===========
const translations = {
  ru: {
    'nav.about':'Что входит','nav.map':'Маршруты','nav.rating':'Рейтинг','nav.gallery':'Галерея','nav.faq':'FAQ','nav.cta':'Записаться',
    'hero.tag':'● LIVE / Ташкент / следующий забег',
    'hero.title1':'Беги','hero.title2':'когда','hero.title3':'город спит',
    'hero.sub':'Yurgo — закрытое night-running комьюнити Ташкента. Огни, пустые улицы, темп твоего сердца. Один забег — и обычная пробежка больше не вернётся.',
    'hero.btn':'Записаться · 15 000 сум','hero.btn2':'Смотреть маршруты',
    'cd.days':'Дней','cd.hours':'Часов','cd.min':'Минут','cd.sec':'Секунд',
    'slots.next':'Ближайший забег','slots.taken':'Занято','slots.cta':'Успеть записаться',
    'price.label':'Стоимость участия','price.sublabel':'Один забег · полный пакет','price.subtext':'Комплимент от Yurgo, вода и вклад в благотворительность',
    'inc.title':'Что ты получаешь','inc.desc':'Регистрация — это не просто билет на пробежку. Это поддержка комьюнити, забота о тебе на дистанции и реальная помощь тем, кому она нужна.',
    'inc.1.title':'Комплимент от Yurgo','inc.1.desc':'Приятный подарок от организаторов каждому участнику забега — мерч, аксессуар или сюрприз вечера.','inc.1.tag':'Включено',
    'inc.2.title':'Вода 0.5 л','inc.2.desc':'Бутылка чистой воды 0.5 л на финише, чтобы восстановиться сразу после дистанции.','inc.2.tag':'Финиш-зона',
    'inc.3.title':'10 000 сум — благотворительность','inc.3.desc':'Из каждой регистрации <strong class="i18n-accent">10 000 сум</strong> уходит в благотворительный фонд. Отчёты публикуем в Telegram.',
  },
  uz: {
    'nav.about':'Nimalar kiradi','nav.map':'Marshrutlar','nav.rating':'Reyting','nav.gallery':'Galereya','nav.faq':'FAQ','nav.cta':"Ro'yxatdan o'tish",
    'hero.tag':"● LIVE / Toshkent / keyingi yugurish",
    'hero.title1':'Yugur','hero.title2':"qachonki",'hero.title3':"shahar uxlasa",
    'hero.sub':"Yurgo — Toshkentning yopiq night-running jamoasi. Chiroqlar, bo'sh ko'chalar, yuragingiz tempi. Bir yugurish — va oddiy yugurish endi qaytmaydi.",
    'hero.btn':"Ro'yxat · 15 000 so'm",'hero.btn2':"Marshrutlarni ko'rish",
    'cd.days':'Kun','cd.hours':'Soat','cd.min':'Daqiqa','cd.sec':'Soniya',
    'slots.next':'Yaqin yugurish','slots.taken':'Band','slots.cta':"Ro'yxatga ulgur",
    'price.label':"Ishtirok narxi",'price.sublabel':"Bitta yugurish · to'liq paket",'price.subtext':"Yurgo'dan sovg'a, suv va xayriya ulushi",
    'inc.title':'Siz nima olasiz','inc.desc':"Ro'yxatdan o'tish — bu shunchaki chipta emas. Bu jamoa qo'llab-quvvatlash, masofada g'amxo'rlik va haqiqiy yordamdir.",
    'inc.1.title':"Yurgo'dan sovg'a",'inc.1.desc':"Har bir ishtirokchiga tashkilotchilardan yoqimli sovg'a — merch, aksessuar yoki kechki syurpriz.",'inc.1.tag':'Kiritilgan',
    'inc.2.title':'0.5 l suv','inc.2.desc':"Marradan keyin tiklanish uchun 0.5 l toza suv shishasi.",'inc.2.tag':'Marra zonasi',
    'inc.3.title':"10 000 so'm — xayriya",'inc.3.desc':"Har bir ro'yxatdan <strong class=\"i18n-accent\">10 000 so'm</strong> xayriya jamg'armasiga o'tadi. Hisobotlar Telegram'da.",
  },
  en: {
    'nav.about':"What's inside",'nav.map':'Routes','nav.rating':'Leaderboard','nav.gallery':'Gallery','nav.faq':'FAQ','nav.cta':'Sign up',
    'hero.tag':'● LIVE / Tashkent / next run',
    'hero.title1':'Run','hero.title2':'when','hero.title3':'city sleeps',
    'hero.sub':"Yurgo is Tashkent's exclusive night-running community. Lights, empty streets, the rhythm of your heart. One run and a regular jog never feels the same.",
    'hero.btn':'Sign up · 15 000 UZS','hero.btn2':'See routes',
    'cd.days':'Days','cd.hours':'Hours','cd.min':'Minutes','cd.sec':'Seconds',
    'slots.next':'Next run','slots.taken':'Taken','slots.cta':'Grab a spot',
    'price.label':'Entry fee','price.sublabel':'One run · full pack','price.subtext':'Yurgo gift, water, and charity contribution',
    'inc.title':'What you get','inc.desc':"Registration is more than a ticket. It's community support, on-route care, and real help for those who need it.",
    'inc.1.title':'Gift from Yurgo','inc.1.desc':'A pleasant present from organizers for every participant — merch, accessory, or surprise of the evening.','inc.1.tag':'Included',
    'inc.2.title':'0.5L water','inc.2.desc':'A 0.5L bottle of clean water at the finish so you can recover right after the distance.','inc.2.tag':'Finish zone',
    'inc.3.title':'10 000 UZS — charity','inc.3.desc':'From every entry <strong class="i18n-accent">10 000 UZS</strong> goes to a charity fund. Reports published on Telegram.',
  }
};

function setLang(lang){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.dataset.i18n;
    if(translations[lang]&&translations[lang][k])el.innerHTML=translations[lang][k];
  });
  document.querySelectorAll('.lang-switch button, .drawer-lang button').forEach(b=>{
    const active=b.dataset.lang===lang;
    b.classList.toggle('active',active);
    b.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  document.documentElement.lang=lang;
  safeStorage.set('yurgo_lang',lang);
}
document.querySelectorAll('.lang-switch button').forEach(b=>{
  b.addEventListener('click',()=>setLang(b.dataset.lang));
});
const savedLang = safeStorage.get('yurgo_lang');
if(savedLang) setLang(savedLang);

// =========== COUNTDOWN ===========
// Picks the next slot from RUN_SCHEDULE (Tashkent time, UTC+5).
function nextRunDate(){
  const now=new Date();
  const candidates=RUN_SCHEDULE.map(s=>{
    const target=new Date(now);
    const dow=now.getUTCDay();
    let daysAhead=(s.dayOfWeek-dow+7)%7;
    if(daysAhead===0){
      const tashkentMin=((now.getUTCHours()+5)%24)*60+now.getUTCMinutes();
      if(tashkentMin>=s.hour*60+s.minute) daysAhead=7;
    }
    target.setUTCDate(now.getUTCDate()+daysAhead);
    // Tashkent = UTC+5, so subtract 5h to land on UTC
    target.setUTCHours(s.hour-5, s.minute, 0, 0);
    return target;
  });
  return candidates.reduce((a,b)=>a<b?a:b);
}
const targetDate=nextRunDate();
function pad(n){return String(n).padStart(2,'0');}
function tick(){
  const diff=targetDate-new Date();
  if(diff<=0){
    document.getElementById('cd-d').textContent='00';
    document.getElementById('cd-h').textContent='00';
    document.getElementById('cd-m').textContent='00';
    document.getElementById('cd-s').textContent='00';
    return;
  }
  const d=Math.floor(diff/86400000);
  const h=Math.floor(diff%86400000/3600000);
  const m=Math.floor(diff%3600000/60000);
  const s=Math.floor(diff%60000/1000);
  document.getElementById('cd-d').textContent=pad(d);
  document.getElementById('cd-h').textContent=pad(h);
  document.getElementById('cd-m').textContent=pad(m);
  document.getElementById('cd-s').textContent=pad(s);
}
tick();
setInterval(tick,1000);

// =========== SLOTS (animated fill on viewport + live +1) ===========
const totalSlots=60;
let takenSlots=44;
const slotsBarEl=document.getElementById('slotsBar');
const slotsCountEl=document.getElementById('slotsCount');
let slotsAnimated=false;

function setSlotsBar(animate){
  const pct=(takenSlots/totalSlots)*100;
  if(animate){
    slotsBarEl.style.transition='width 1.4s cubic-bezier(0.16,1,0.3,1)';
    slotsBarEl.style.width=pct+'%';
  }else{
    slotsBarEl.style.width=pct+'%';
  }
  slotsCountEl.textContent=takenSlots;
}
// Start at 0, animate to actual on reveal
slotsBarEl.style.width='0%';

// observe slots bar to trigger fill animation
const slotsObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting && !slotsAnimated){
      slotsAnimated=true;
      // count up from 0
      const startCount=0;
      const duration=1400;
      const startTime=performance.now();
      function tickCount(now){
        const p=Math.min(1,(now-startTime)/duration);
        const eased=1-Math.pow(1-p,3); // easeOutCubic
        const cur=Math.floor(startCount+(takenSlots-startCount)*eased);
        slotsCountEl.textContent=cur;
        if(p<1)requestAnimationFrame(tickCount);
        else slotsCountEl.textContent=takenSlots;
      }
      requestAnimationFrame(tickCount);
      setSlotsBar(true);
    }
  });
},{threshold:0.3});
slotsObserver.observe(slotsBarEl.parentElement);

// "+1" popup on increment
function showLivePlus(){
  const container=slotsBarEl.parentElement.parentElement;
  if(!container)return;
  const plus=document.createElement('div');
  plus.className='live-plus';
  plus.textContent='+1';
  plus.style.left='50%';
  plus.style.top='0';
  plus.style.transform='translateX(-50%)';
  container.style.position='relative';
  container.appendChild(plus);
  setTimeout(()=>plus.remove(),1800);
}

// simulate growing demand
setInterval(()=>{
  if(takenSlots<58 && Math.random()<0.18 && slotsAnimated){
    takenSlots++;
    setSlotsBar(true);
    slotsCountEl.textContent=takenSlots;
    showLivePlus();
  }
},9000);

// =========== HERO PHOTO ===========
// Замени URL ниже на путь к своей фотографии бегуна (jpg/png)
const HERO_PHOTO_URL = ''; // например: 'images/runner.jpg'

if(HERO_PHOTO_URL){
  const photo=document.getElementById('hvPhoto');
  const fallback=document.getElementById('hvFallback');
  const img=new Image();
  img.onload=()=>{
    photo.style.backgroundImage=
      `linear-gradient(180deg,rgba(5,5,5,0.4) 0%,rgba(5,5,5,0.1) 40%,rgba(5,5,5,0.7) 100%),url('${HERO_PHOTO_URL}')`;
    photo.classList.add('has-image');
    if(fallback)fallback.style.display='none';
  };
  img.src=HERO_PHOTO_URL;
}

// =========== MOBILE DRAWER ===========
const burger=document.getElementById('burger');
const drawer=document.getElementById('mobileDrawer');
const drawerBackdrop=document.getElementById('drawerBackdrop');
const drawerClose=document.getElementById('drawerClose');

function openDrawer(){
  drawer.classList.add('open');
  drawerBackdrop.classList.add('open');
  burger.classList.add('open');
  burger.setAttribute('aria-expanded','true');
  document.body.style.overflow='hidden';
}
function closeDrawer(){
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded','false');
  document.body.style.overflow='';
}
if(burger){
  burger.addEventListener('click',()=>{
    if(drawer.classList.contains('open'))closeDrawer();
    else openDrawer();
  });
}
if(drawerClose)drawerClose.addEventListener('click',closeDrawer);
if(drawerBackdrop)drawerBackdrop.addEventListener('click',closeDrawer);
// Close drawer when any link clicked
document.querySelectorAll('.drawer-link,.drawer-cta').forEach(l=>{
  l.addEventListener('click',()=>setTimeout(closeDrawer,200));
});
// Drawer language buttons
document.querySelectorAll('.drawer-lang button').forEach(b=>{
  b.addEventListener('click',()=>{
    const lang=b.dataset.lang;
    if(typeof setLang==='function')setLang(lang);
    // sync state
    document.querySelectorAll('.drawer-lang button').forEach(x=>x.classList.toggle('active',x.dataset.lang===lang));
  });
});

// =========== SMART MOBILE-CTA (only show after hero) ===========
const mobileCta=document.querySelector('.mobile-cta');
if(mobileCta){
  const heroEl=document.querySelector('.hero');
  const ctaObserver=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      // hide when hero is visible, show when hero scrolled out
      if(e.isIntersecting)mobileCta.classList.remove('visible');
      else mobileCta.classList.add('visible');
    });
  },{threshold:0.1});
  if(heroEl)ctaObserver.observe(heroEl);
}

// =========== HERO PARALLAX (subtle on scroll) ===========
const heroVisual=document.querySelector('.hero-visual');
const heroLeft=document.querySelector('.hero-left');
if(heroVisual && window.innerWidth>640 && !prefersReducedMotion){
  let parallaxFrame=0;
  window.addEventListener('scroll',()=>{
    if(parallaxFrame) return;
    parallaxFrame=requestAnimationFrame(()=>{
      parallaxFrame=0;
      const y=window.scrollY;
      if(y<window.innerHeight){
        const opacity=Math.max(0,1-y/500);
        if(heroLeft){
          heroLeft.style.transform=`translateY(${y*0.15}px)`;
          heroLeft.style.opacity=opacity;
        }
        heroVisual.style.transform=`translateY(${y*0.08}px)`;
      }
    });
  },{passive:true});
}

// =========== HAPTIC FEEDBACK (mobile only) ===========
function haptic(duration=10){
  if('vibrate' in navigator && window.innerWidth<=960){
    navigator.vibrate(duration);
  }
}
// Light tap on CTAs
document.querySelectorAll('.btn-primary,.btn-huge,.nav-cta,.mobile-cta a,.drawer-cta,.btn-ghost').forEach(b=>{
  b.addEventListener('click',()=>haptic(8));
});
// Slightly longer for drawer/modal open
document.querySelectorAll('.faq-item').forEach(b=>{
  b.addEventListener('click',()=>haptic(5));
});

// =========== PRELOADER ===========
(function preloaderInit(){
  const pre=document.getElementById('preloader');
  if(!pre) return;
  let dismissed=false;
  function dismiss(){
    if(dismissed) return;
    dismissed=true;
    pre.classList.add('done');
    setTimeout(()=>pre.remove(),700);
  }
  // Hard cap so users never get stuck on a slow asset
  setTimeout(dismiss, prefersReducedMotion ? 200 : 1500);
  if(document.readyState==='complete'){
    setTimeout(dismiss, prefersReducedMotion ? 0 : 600);
  }else{
    window.addEventListener('load',()=>setTimeout(dismiss, prefersReducedMotion ? 0 : 600),{once:true});
  }
})();

// =========== CUSTOM CURSOR ===========
const cursorDot=document.getElementById('cursorDot');
const cursorRing=document.getElementById('cursorRing');
const ambientGlow=document.getElementById('ambientGlow');

if(isTouchDevice || !isFinePointer || prefersReducedMotion){
  if(cursorDot) cursorDot.style.display='none';
  if(cursorRing) cursorRing.style.display='none';
  if(ambientGlow) ambientGlow.style.display='none';
}else{
  let mouseX=window.innerWidth/2,mouseY=window.innerHeight/2;
  let ringX=mouseX,ringY=mouseY;
  let pendingMove=false;
  document.addEventListener('mousemove',e=>{
    mouseX=e.clientX; mouseY=e.clientY;
    if(pendingMove) return;
    pendingMove=true;
    requestAnimationFrame(()=>{
      pendingMove=false;
      cursorDot.style.transform=`translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
      if(ambientGlow){
        ambientGlow.style.transform=`translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
      }
    });
  },{passive:true});
  function trailLoop(){
    ringX+=(mouseX-ringX)*0.18;
    ringY+=(mouseY-ringY)*0.18;
    cursorRing.style.transform=`translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(trailLoop);
  }
  requestAnimationFrame(trailLoop);

  const hoverSel='a,button,[role="button"],input,textarea,select,.faq-item,.podium-spot,.lb-row,.route-item,.gallery-item,.map-pin,.lang-switch button,label,.cd-box,.testi-card,.include-card';
  document.querySelectorAll(hoverSel).forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
  });
  document.addEventListener('mousedown',()=>document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',()=>document.body.classList.remove('cursor-click'));
}

// =========== SCROLL PROGRESS ===========
const scrollProgressEl=document.getElementById('scrollProgress');
window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const scrolled=(h.scrollTop)/(h.scrollHeight-h.clientHeight);
  scrollProgressEl.style.width=(scrolled*100)+'%';
},{passive:true});

// =========== REVEAL ON SCROLL (stagger) ===========
// Mark elements for reveal
const revealTargets=[
  // headers
  {sel:'.section-head',cls:'reveal'},
  // cards (children of containers will stagger via JS)
  {sel:'.include-card',cls:'reveal',stagger:true},
  {sel:'.testi-card',cls:'reveal',stagger:true},
  {sel:'.gallery-item',cls:'reveal',stagger:true,interval:80},
  {sel:'.charity-stat',cls:'reveal',stagger:true,interval:120},
  {sel:'.timeline-row',cls:'reveal',stagger:true,interval:100},
  {sel:'.schedule-item',cls:'reveal',stagger:true,interval:100},
  {sel:'.faq-item',cls:'reveal',stagger:true,interval:60},
  {sel:'.step',cls:'reveal',stagger:true,interval:120},
  {sel:'.lb-row',cls:'reveal',stagger:true,interval:50},
  {sel:'.podium-spot',cls:'reveal',stagger:true,interval:150},
  {sel:'.charity-callout',cls:'reveal'},
  {sel:'.charity-report',cls:'reveal'},
  {sel:'.price-banner',cls:'reveal'},
  {sel:'.register-card',cls:'reveal'},
  {sel:'.map-wrap',cls:'reveal'},
];

revealTargets.forEach(t=>{
  document.querySelectorAll(t.sel).forEach((el,i)=>{
    el.classList.add(t.cls);
    if(t.stagger){
      el.style.transitionDelay=((i%6)*(t.interval||100)/1000)+'s';
    }
  });
});

const revealObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

// =========== NUMBER TICKER (hero metrics) ===========
// Find the hero meta-num elements and animate them
function animateCount(el,target,duration=1600){
  const isInfinity=target==='∞';
  if(isInfinity){
    // Just write directly
    el.textContent='∞';
    return;
  }
  const targetStr=String(target);
  const hasPlus=targetStr.endsWith('+');
  const numTarget=parseInt(targetStr,10);
  const startTime=performance.now();
  function step(now){
    const p=Math.min(1,(now-startTime)/duration);
    const eased=1-Math.pow(1-p,3);
    const cur=Math.floor(numTarget*eased);
    el.textContent=cur+(hasPlus?'+':'');
    if(p<1)requestAnimationFrame(step);
    else el.textContent=targetStr;
  }
  requestAnimationFrame(step);
}

// Initialize tickers (find hero meta-num)
const heroMetaNums=document.querySelectorAll('.meta-num');
heroMetaNums.forEach(el=>{
  const original=el.textContent.trim();
  el.dataset.target=original;
  el.textContent=original==='∞'?'∞':'0';
});
const heroMetricsObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      heroMetaNums.forEach((el,i)=>{
        setTimeout(()=>animateCount(el,el.dataset.target),i*200);
      });
      heroMetricsObserver.disconnect();
    }
  });
},{threshold:0.3});
if(heroMetaNums.length)heroMetricsObserver.observe(heroMetaNums[0]);

// Charity stats also get ticker
document.querySelectorAll('.charity-stat-num').forEach(el=>{
  // Parse: e.g. "4.8<span class='small'> млн</span>" — leave structure intact for non-numeric ones
  const text=el.childNodes[0]&&el.childNodes[0].nodeValue;
  if(!text)return;
  const num=parseFloat(text);
  if(isNaN(num))return;
  el.dataset.target=text.trim();
  el.childNodes[0].nodeValue='0';
});
const charityObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.charity-stat-num').forEach((el,i)=>{
        const target=el.dataset.target;
        if(!target)return;
        setTimeout(()=>{
          const num=parseFloat(target);
          const decimals=(target.split('.')[1]||'').length;
          const startTime=performance.now();
          const duration=1500;
          function tk(now){
            const p=Math.min(1,(now-startTime)/duration);
            const eased=1-Math.pow(1-p,3);
            const cur=(num*eased).toFixed(decimals);
            el.childNodes[0].nodeValue=cur;
            if(p<1)requestAnimationFrame(tk);
            else el.childNodes[0].nodeValue=target;
          }
          requestAnimationFrame(tk);
        },i*150);
      });
      charityObserver.disconnect();
    }
  });
},{threshold:0.3});
const firstCharityStat=document.querySelector('.charity-stat-num');
if(firstCharityStat)charityObserver.observe(firstCharityStat);

// =========== MAGNETIC BUTTONS ===========
if(isFinePointer && !prefersReducedMotion){
  const magneticSel=['.btn-primary','.btn-huge','.nav-cta'];
  document.querySelectorAll(magneticSel.join(',')).forEach(btn=>{
    btn.classList.add('magnetic');
    let frame=0;
    btn.addEventListener('mousemove',e=>{
      if(frame) return;
      const rect=btn.getBoundingClientRect();
      const x=e.clientX-rect.left-rect.width/2;
      const y=e.clientY-rect.top-rect.height/2;
      frame=requestAnimationFrame(()=>{
        frame=0;
        btn.style.transform=`translate(${x*0.25}px, ${y*0.25}px)`;
      });
    });
    btn.addEventListener('mouseleave',()=>{
      btn.style.transform='translate(0,0)';
    });
  });
}

// =========== FAQ ===========
document.querySelectorAll('.faq-item').forEach(item=>{
  item.addEventListener('click',()=>item.classList.toggle('open'));
});

// =========== SMOOTH SCROLL ===========
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});

// =========== MAP ROUTES (with drawing animation) ===========
function selectRoute(r){
  document.querySelectorAll('.route-item').forEach(x=>x.classList.remove('active'));
  const item=document.querySelector(`.route-item[data-route="${r}"]`);
  if(item)item.classList.add('active');
  // Hide all routes
  document.querySelectorAll('.route').forEach(x=>{
    x.style.display='none';
    x.classList.remove('drawn');
  });
  // Show selected with drawing animation
  const el=document.querySelector('.route-'+r);
  if(el){
    el.style.display='block';
    // Force reflow then add class to trigger animation
    void el.offsetWidth;
    setTimeout(()=>el.classList.add('drawn'),30);
  }
}

document.querySelectorAll('.route-item').forEach(item=>{
  item.addEventListener('click',()=>selectRoute(item.dataset.route));
});

document.querySelectorAll('.map-pin').forEach(pin=>{
  pin.addEventListener('click',e=>{
    const r=pin.dataset.route;
    // Ripple effect
    const svg=pin.closest('svg');
    const rect=pin.getBoundingClientRect();
    const mapWrap=document.querySelector('.map-svg-wrap');
    if(mapWrap){
      const wrapRect=mapWrap.getBoundingClientRect();
      const ripple=document.createElement('div');
      ripple.className='pin-ripple';
      ripple.style.left=(rect.left-wrapRect.left+rect.width/2)+'px';
      ripple.style.top=(rect.top-wrapRect.top+rect.height/2)+'px';
      ripple.style.width='30px';
      ripple.style.height='30px';
      mapWrap.style.position='relative';
      mapWrap.appendChild(ripple);
      setTimeout(()=>ripple.remove(),800);
    }
    selectRoute(r);
  });
});

// Initial route drawn on first viewport
const mapWrapEl=document.querySelector('.map-wrap');
if(mapWrapEl){
  const mapObserver=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        // Trigger draw of route 1
        setTimeout(()=>{
          const r1=document.querySelector('.route-1');
          if(r1){
            r1.style.display='block';
            void r1.offsetWidth;
            r1.classList.add('drawn');
          }
        },300);
        mapObserver.disconnect();
      }
    });
  },{threshold:0.2});
  mapObserver.observe(mapWrapEl);
}

// =========== GALLERY LIGHTBOX ===========
const lightbox=document.getElementById('lightbox');
const lightboxBody=document.getElementById('lightboxBody');
const lightboxCaption=document.getElementById('lightboxCaption');
const lightboxClose=document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item').forEach(item=>{
  item.addEventListener('click',()=>{
    const svg=item.querySelector('svg');
    const label=item.querySelector('.gallery-label');
    if(!svg)return;
    // Clone SVG to lightbox
    lightboxBody.innerHTML='';
    const clone=svg.cloneNode(true);
    // Make it larger
    clone.removeAttribute('preserveAspectRatio');
    clone.style.width='auto';
    clone.style.height='80vh';
    clone.style.maxWidth='90vw';
    lightboxBody.appendChild(clone);
    lightboxCaption.textContent=label?label.textContent:'';
    lightbox.classList.add('open');
    document.body.style.overflow='hidden';
  });
});

function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow='';
}
lightboxClose.addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&lightbox.classList.contains('open'))closeLightbox();
});

// =========== PROFILE MODAL ===========
const profiles={
  rustam:{name:'Rustam M.',avatar:'R',rank:'● RANK 01 · GOLD TIER',km:'168',runs:'14',pace:"4'48\"",
    badges:[['🌙','Первый ночной',1],['⭐','10 КМ',1],['💎','50 КМ',1],['🔥','100 КМ',1],['🏆','Подиум',1],['⚡','Sub-5 pace',1],['🌟','200 КМ',0],['👑','Король сезона',0]],
    runs_history:[['07.05.2026','Юнусабад · Парк Магистр','5 км',"4'52\""],['04.05.2026','Мирабад → Бродвей','10 км',"5'01\""],['30.04.2026','Большая петля Ташкента','15 км',"4'58\""],['26.04.2026','Центр · Mustaqillik','5 км',"4'42\""],['23.04.2026','Юнусабад · Парк Магистр','5 км',"4'47\""]]
  },
  aziz:{name:'Aziz K.',avatar:'A',rank:'● RANK 02 · SILVER TIER',km:'142',runs:'12',pace:"5'02\"",
    badges:[['🌙','Первый ночной',1],['⭐','10 КМ',1],['💎','50 КМ',1],['🔥','100 КМ',1],['🏆','Подиум',1],['⚡','Sub-5 pace',0],['🌟','200 КМ',0],['👑','Король сезона',0]],
    runs_history:[['07.05.2026','Юнусабад · Парк Магистр','5 км',"5'05\""],['04.05.2026','Мирабад → Бродвей','10 км',"5'10\""],['30.04.2026','Большая петля Ташкента','15 км',"5'15\""],['26.04.2026','Центр · Mustaqillik','5 км',"4'58\""],['23.04.2026','Юнусабад · Парк Магистр','5 км',"5'02\""]]
  },
  diyora:{name:'Diyora S.',avatar:'D',rank:'● RANK 03 · BRONZE TIER',km:'128',runs:'11',pace:"5'14\"",
    badges:[['🌙','Первый ночной',1],['⭐','10 КМ',1],['💎','50 КМ',1],['🔥','100 КМ',1],['🏆','Подиум',1],['⚡','Sub-5 pace',0],['🌟','200 КМ',0],['👑','Король сезона',0]],
    runs_history:[['07.05.2026','Юнусабад · Парк Магистр','5 км',"5'14\""],['04.05.2026','Мирабад → Бродвей','10 км',"5'20\""],['30.04.2026','Большая петля Ташкента','15 км',"5'25\""],['26.04.2026','Центр · Mustaqillik','5 км',"5'10\""],['23.04.2026','Юнусабад · Парк Магистр','5 км',"5'08\""]]
  },
  sardor:{name:'Sardor B.',avatar:'S',rank:'● RANK 04',km:'112',runs:'10',pace:"5'21\"",
    badges:[['🌙','Первый ночной',1],['⭐','10 КМ',1],['💎','50 КМ',1],['🔥','100 КМ',1],['🏆','Подиум',0],['⚡','Sub-5 pace',0],['🌟','200 КМ',0],['👑','Король сезона',0]],
    runs_history:[['07.05.2026','Юнусабад · Парк Магистр','5 км',"5'18\""],['04.05.2026','Мирабад → Бродвей','10 км',"5'25\""],['30.04.2026','Большая петля Ташкента','15 км',"5'30\""]]
  },
  madina:{name:'Madina T.',avatar:'M',rank:'● RANK 05',km:'98',runs:'9',pace:"5'33\"",
    badges:[['🌙','Первый ночной',1],['⭐','10 КМ',1],['💎','50 КМ',1],['🔥','100 КМ',0],['🏆','Подиум',0],['⚡','Sub-5 pace',0],['🌟','200 КМ',0],['👑','Король сезона',0]],
    runs_history:[['07.05.2026','Юнусабад · Парк Магистр','5 км',"5'30\""],['04.05.2026','Мирабад → Бродвей','10 км',"5'38\""]]
  },
  bekzod:{name:'Bekzod U.',avatar:'B',rank:'● RANK 06',km:'87',runs:'8',pace:"5'45\"",
    badges:[['🌙','Первый ночной',1],['⭐','10 КМ',1],['💎','50 КМ',1],['🔥','100 КМ',0],['🏆','Подиум',0],['⚡','Sub-5 pace',0],['🌟','200 КМ',0],['👑','Король сезона',0]],
    runs_history:[['07.05.2026','Юнусабад · Парк Магистр','5 км',"5'42\""],['04.05.2026','Мирабад → Бродвей','10 км',"5'50\""]]
  },
  nilufar:{name:'Nilufar A.',avatar:'N',rank:'● RANK 07',km:'74',runs:'7',pace:"5'52\"",
    badges:[['🌙','Первый ночной',1],['⭐','10 КМ',1],['💎','50 КМ',1],['🔥','100 КМ',0],['🏆','Подиум',0],['⚡','Sub-5 pace',0],['🌟','200 КМ',0],['👑','Король сезона',0]],
    runs_history:[['07.05.2026','Юнусабад · Парк Магистр','5 км',"5'52\""],['04.05.2026','Мирабад → Бродвей','10 км',"5'58\""]]
  },
  jasur:{name:'Jasur R.',avatar:'J',rank:'● RANK 08',km:'62',runs:'6',pace:"6'08\"",
    badges:[['🌙','Первый ночной',1],['⭐','10 КМ',1],['💎','50 КМ',1],['🔥','100 КМ',0],['🏆','Подиум',0],['⚡','Sub-5 pace',0],['🌟','200 КМ',0],['👑','Король сезона',0]],
    runs_history:[['07.05.2026','Юнусабад · Парк Магистр','5 км',"6'05\""],['04.05.2026','Мирабад → Бродвей','10 км',"6'12\""]]
  }
};

const modal=document.getElementById('modal');
function openProfile(key){
  const p=profiles[key];if(!p)return;
  document.getElementById('m-avatar').textContent=p.avatar;
  document.getElementById('m-name').textContent=p.name;
  document.getElementById('m-rank').textContent=p.rank;
  document.getElementById('m-km').textContent=p.km;
  document.getElementById('m-runs').textContent=p.runs;
  document.getElementById('m-pace').textContent=p.pace;
  document.getElementById('m-badges').innerHTML=p.badges.map(b=>`<div class="badge ${b[2]?'earned':''}"><div class="badge-icon">${b[0]}</div><div class="badge-name">${b[1]}</div></div>`).join('');
  document.getElementById('m-history').innerHTML=p.runs_history.map(r=>`<div class="run-row"><div class="run-date">${r[0]}</div><div>${r[1]}</div><div class="run-km">${r[2]}</div><div class="run-pace">${r[3]}</div></div>`).join('');
  modal.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeProfile(){
  modal.classList.remove('open');
  document.body.style.overflow='';
}
document.querySelectorAll('[data-user]').forEach(el=>{
  el.addEventListener('click',e=>{
    if(e.target.closest('.lb-stat'))return; // do nothing on small stats? we still allow
    openProfile(el.dataset.user);
  });
});
document.getElementById('modalClose').addEventListener('click',closeProfile);
modal.addEventListener('click',e=>{if(e.target===modal)closeProfile();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProfile();});