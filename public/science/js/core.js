/* منصّة العلوم — النواة: البيانات، الحالة، التوجيه، الأدوات العامة. تصميم وتنفيذ: نوال بني عطية */
const CONFIG={
  SCHOOL:"مدرسة القطرانة الثانوية للبنات", DIR:"مديرية التربية والتعليم للواء القطرانة", DESIGNER:"نوال بني عطية",
  SCRIPT_URL:"https://script.google.com/macros/s/AKfycby_MosnfxzYeiveIWwN61c_Rx5HYc-lTMRPeRueHiAyFnRdeafhSIWuUxPnPEI1imSK/exec",
  T_HASH:"1pfqq3z1hhzlsl", SUBJ:"علوم", PASS:70, YEAR:"2026/2027",
  GRADES:["الثامن","التاسع","العاشر","الحادي عشر"], SECTIONS:g=>g==="التاسع"?["أ","ب"]:["أ"]
};
const SUBJ_ORDER=["sci","bio","chem","phys","earth"];
const SCI={data:{},add(g,k,d){(this.data[g]=this.data[g]||{})[k]=Object.assign({key:k,grade:g},d);
  d.units.forEach(u=>{u.subj=k;u.grade=g;u.lessons.forEach(l=>{l.unit=u;l.subj=k;l.grade=g;})});}};
const ICONS={
 leaf:'<path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14z"/><path d="M5 19l8-8"/>',
 flask:'<path d="M9 3h6M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9V3"/><path d="M7.5 15h9"/>',
 bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
 atom:'<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
 book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 22H20v-4"/>',
 cube:'<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 22V12M21 7l-9 5-9-5"/>'};
const svgI=(k,s)=>`<svg viewBox="0 0 24 24" ${s?`style="width:${s}px;height:${s}px"`:""}>${ICONS[k]||""}</svg>`;

/* ---------- أدوات ---------- */
const $=s=>document.querySelector(s);
function el(t,a={},...k){const e=document.createElement(t);for(const[x,y]of Object.entries(a||{})){if(y==null||y===false)continue;
  if(x==="class")e.className=y;else if(x==="html")e.innerHTML=y;else if(x==="style"&&typeof y==="object"){for(const[k,v]of Object.entries(y)){if(k.startsWith("--"))e.style.setProperty(k,v);else e.style[k]=v;}}
  else if(x.startsWith("on")&&typeof y==="function")e.addEventListener(x.slice(2),y);else e.setAttribute(x,y===true?"":y);}
  for(const c of k.flat(9)){if(c==null||c===false)continue;e.append(c.nodeType?c:document.createTextNode(String(c)));}return e;}
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
let toastT;function toast(m){const t=$("#toast");t.textContent=m;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,2600);}
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const lsGet=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}};
const lsSet=(k,v)=>{try{v==null?localStorage.removeItem(k):localStorage.setItem(k,JSON.stringify(v));}catch(e){}};
const todayStr=()=>{const d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();};
const AR_LET=["أ","ب","ج","د","هـ","و"];

/* ---------- الحالة ---------- */
const LSK="qatrana.sci.v1";
let S=Object.assign({name:"",section:"",grade:"",pts:0,done:{},best:{},seen:{},exams:{},certs:[],badges:[],streak:{last:"",n:0},queue:[],last:""},lsGet(LSK,{}));
const save=()=>lsSet(LSK,S);
(function fromPortal(){try{const q=new URLSearchParams(location.search),g=q.get("g"),s=q.get("s");
  if(g&&CONFIG.GRADES.includes(g))S.grade=g; if(s&&CONFIG.SECTIONS(S.grade||"التاسع").includes(s))S.section=s;
  const pl=lsGet("qatrana.learn",null); if(!S.grade&&pl&&pl.g)S.grade=pl.g; if(!S.section&&pl&&pl.s)S.section=pl.s; save();}catch(e){}})();
function touchStreak(){const t=todayStr();if(S.streak.last===t)return;const y=new Date();y.setDate(y.getDate()-1);
  const ys=y.getFullYear()+"-"+(y.getMonth()+1)+"-"+y.getDate();S.streak.n=S.streak.last===ys?S.streak.n+1:1;S.streak.last=t;save();}
function addPts(n,why){S.pts+=n;save();refreshTop();if(why)toast("+"+n+" ★ "+why);checkBadges();}

/* ---------- الإرسال للمعلمة (Google Sheet) ---------- */
function submit(rec){if(!S.name)return;S.queue.push(Object.assign({name:S.name,section:S.section,grade:CONFIG.SUBJ+" "+S.grade,at:new Date().toISOString()},rec));save();flush();}
async function flush(){if(!CONFIG.SCRIPT_URL||!S.queue.length||!navigator.onLine)return;const batch=S.queue.slice(0,20);
  try{await fetch(CONFIG.SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({rows:batch})});S.queue=S.queue.slice(batch.length);save();}catch(e){}}
addEventListener("online",flush);

/* ---------- بيانات مساعدة ---------- */
const G=()=>SCI.data[S.grade]||{};
const subjects=()=>SUBJ_ORDER.map(k=>G()[k]).filter(Boolean);
function allLessons(g){const out=[];for(const k of SUBJ_ORDER){const s=(SCI.data[g||S.grade]||{})[k];if(s)s.units.forEach(u=>u.lessons.forEach(l=>out.push(l)));}return out;}
function findLesson(id){for(const g in SCI.data)for(const k in SCI.data[g])for(const u of SCI.data[g][k].units)for(const l of u.lessons)if(l.id===id)return l;return null;}
function findUnit(id){for(const g in SCI.data)for(const k in SCI.data[g])for(const u of SCI.data[g][k].units)if(u.id===id)return u;return null;}
const subjOf=x=>SCI.data[x.grade][x.subj];
function subjProgress(s){let n=0,d=0;s.units.forEach(u=>u.lessons.forEach(l=>{n++;if(S.done[l.id])d++;}));return n?Math.round(d/n*100):0;}

/* ---------- الشارات ---------- */
const BADGES=[
 {id:"first",ic:"🌱",t:"أول درس",test:()=>Object.keys(S.done).length>=1},
 {id:"five",ic:"🔬",t:"خمسة دروس",test:()=>Object.keys(S.done).length>=5},
 {id:"ten",ic:"🧪",t:"عشرة دروس",test:()=>Object.keys(S.done).length>=10},
 {id:"perfect",ic:"💯",t:"علامة كاملة",test:()=>Object.values(S.best).some(v=>v>=100)},
 {id:"exam",ic:"🎓",t:"اجتياز وحدة",test:()=>Object.values(S.exams).some(v=>v>=CONFIG.PASS)},
 {id:"streak3",ic:"🔥",t:"3 أيام متتالية",test:()=>S.streak.n>=3},
 {id:"labber",ic:"⚗️",t:"مستكشفة المختبر",test:()=>Object.keys(S.seen).filter(k=>k.startsWith("sim:")).length>=5},
 {id:"star",ic:"⭐",t:"500 نقطة",test:()=>S.pts>=500},
 {id:"sci",ic:"👩‍🔬",t:"عالِمة صغيرة",test:()=>subjects().length&&subjects().every(s=>subjProgress(s)===100)}];
function checkBadges(){for(const b of BADGES)if(!S.badges.includes(b.id)&&b.test()){S.badges.push(b.id);save();setTimeout(()=>{toast("🏅 شارة جديدة: "+b.t);confetti();},700);}}

/* ---------- احتفال ---------- */
function confetti(){const c=el("canvas",{style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:98}});document.body.append(c);
  const W=c.width=innerWidth,H=c.height=innerHeight,x=c.getContext("2d"),cols=["#7A1F2E","#B8902A","#F3DFA8","#2f8f5b","#2563c9"];
  const P=Array.from({length:120},()=>({x:Math.random()*W,y:-20-Math.random()*H*.4,v:2+Math.random()*4,s:5+Math.random()*6,r:Math.random()*6,c:cols[Math.floor(Math.random()*5)]}));
  let t=0;(function f(){x.clearRect(0,0,W,H);P.forEach(p=>{p.y+=p.v;p.x+=Math.sin((t+p.r)*.05)*1.5;x.fillStyle=p.c;x.save();x.translate(p.x,p.y);x.rotate(t*.05+p.r);x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);x.restore();});
    if(++t<160)requestAnimationFrame(f);else c.remove();})();}

/* ---------- الشريط العلوي ---------- */
function refreshTop(){const r=$("#tright");if(!r)return;r.innerHTML="";
  if(S.name){r.append(el("span",{class:"chipx gold",title:"نقاطك"},"★ "+S.pts.toLocaleString("en")));if(S.streak.n>1)r.append(el("span",{class:"chipx",title:"أيام متتالية"},"🔥 "+S.streak.n));}
  r.append(el("a",{class:"iconbtn",href:"#/t",title:"ركن المعلمة","aria-label":"ركن المعلمة",html:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>'}));}

/* ---------- التوجيه ---------- */
const ROUTES=[];function route(re,fn){ROUTES.push([re,fn]);}
function go(h){if(location.hash===h)render();else location.hash=h;}
function render(){const h=location.hash||"#/";const V=$("#view");V.innerHTML="";window.scrollTo(0,0);
  const sec=h.startsWith("#/t")?"t":h.startsWith("#/glossary")?"g":"s";document.querySelectorAll(".maintabs a").forEach(x=>x.setAttribute("aria-selected",String(x.dataset.sec===sec)));
  for(const[re,fn]of ROUTES){const m=h.match(re);if(m){try{fn(V,...m.slice(1).map(decodeURIComponent));}catch(e){console.error(e);V.append(el("div",{class:"empty"},"حدث خطأ في عرض الصفحة."));}refreshTop();return;}}
  go("#/");}
addEventListener("hashchange",render);
function crumbs(...items){return el("nav",{class:"crumbs","aria-label":"مسار التنقل"},...items.flatMap((it,i)=>[i?el("span",{},"‹"):null,Array.isArray(it)?el("a",{href:it[1]},it[0]):el("span",{},it)]));}
function credit(){return el("div",{class:"foot"},"منصّة العلوم · "+CONFIG.SCHOOL+" · تصميمُ المنصّة وتنفيذُها: "+CONFIG.DESIGNER);}
