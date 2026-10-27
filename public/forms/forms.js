/* نماذجي الذكية — منصة القطرانة · تصميمُ المنصّة وتنفيذُها: نوال بني عطية
   كل البيانات تُحفظ على جهاز المعلّمة فقط (localStorage)، ولا تُرسل لأي خادم. */
(()=>{
"use strict";
const KEY="forms.v1", ROSTER="../teachers/roster.enc.json";
const $=id=>document.getElementById(id);
function h(t,a,...k){const e=document.createElement(t);if(a)for(const[x,v]of Object.entries(a)){if(v==null||v===false)continue;if(x==="style"&&typeof v==="object")Object.assign(e.style,v);else if(x.startsWith("on"))e.addEventListener(x.slice(2),v);else if(x==="html")e.innerHTML=v;else e.setAttribute(x,v===true?"":v);}for(const c of k.flat(9)){if(c==null||c===false)continue;e.append(c.nodeType?c:document.createTextNode(String(c)));}return e;}
const toast=(m)=>{const t=$("toast");t.textContent=m;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,2600);};
const AR="٠١٢٣٤٥٦٧٨٩";const en=s=>String(s).replace(/[٠-٩]/g,d=>AR.indexOf(d)).replace(/[٫,]/g,".");
const fx=(n,d=1)=>Number.isFinite(n)?(Math.round(n*10**d)/10**d).toString():"–";
const today=()=>new Date().toISOString().slice(0,10);
const fmtD=s=>{if(!s)return"";const[y,m,d]=s.split("-");return`${+d}/${+m}/${y}`;};
const addDays=(s,n)=>{const d=new Date(s+"T12:00:00");d.setDate(d.getDate()+n);return d.toISOString().slice(0,10);};

/* ---------- state ---------- */
const DEF={
  sch:{school:"مدرسة القطرانة الثانوية للبنات",min:"وزارة التربية والتعليم",dir:"مديرية التربية والتعليم للواء القطرانة",principal:"",teacher:"",year:"2026/2027",logo:""},
  an:{subject:"",grade:"",section:"",exam:"الاختبار الأول",term:"الفصل الدراسي الأول",full:20,date:today(),rows:[],cuts:[90,80,70,50],qs:[],cmp:""},
  pl:{type:"rem",mode:"ind",incl4:false,src:"an",manual:"",weak:["ضعف المستوى التحصيلي في المبحث","صعوبة في فهم المفاهيم الأساسية"],strat:["أوراق عمل علاجية متدرّجة","التعلّم بالأقران","تبسيط المفهوم بالمحسوسات والتجارب","التغذية الراجعة الفورية"],acts:["لقاء فردي مع الطالبة","تواصل مع وليّة الأمر"],skills:"",start:today()},
  ce:{design:"A",who:"الطالبة",reason:"exc",text:"",src:"an",top:0,manual:"",date:today(),sign2:"معلّمة المبحث"},
  rp:{tpl:"act",title:"",date:today(),place:"مدرسة القطرانة الثانوية للبنات",by:"",target:"",goals:"",desc:"",out:"",photos:[]},
  hist:{}
};
let S=load();
function load(){let o={};try{o=JSON.parse(localStorage.getItem(KEY)||"{}");}catch(e){}const s=structuredClone(DEF);for(const k in s){if(o[k]&&typeof o[k]==="object")Object.assign(s[k],o[k]);}return s;}
let saveT;function save(){clearTimeout(saveT);saveT=setTimeout(()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){if(S.rp.photos.length){toast("الصور كبيرة على ذاكرة الجوال: حُفظ كل شيء ما عدا الصور");try{const c=structuredClone(S);c.rp.photos=[];localStorage.setItem(KEY,JSON.stringify(c));}catch(_){}}}},300);}

/* ---------- levels & stats ---------- */
const LV=[["ممتاز","var(--L1)","#1F7A4D"],["جيد جدًا","var(--L2)","#2A8C8C"],["جيد","var(--L3)","#2F6FB0"],["مقبول","var(--L4)","#C9822B"],["ضعيف","var(--L5)","#B3261E"]];
function levelOf(p,c){c=c||S.an.cuts;if(p>=c[0])return 0;if(p>=c[1])return 1;if(p>=c[2])return 2;if(p>=c[3])return 3;return 4;}
function stats(){
  const A=S.an,full=+A.full||0;
  const rows=A.rows.filter(r=>r.n&&r.n.trim());
  const sat=rows.filter(r=>!r.abs&&r.m!==""&&r.m!=null&&Number.isFinite(+r.m));
  const m=sat.map(r=>+r.m).sort((a,b)=>a-b),n=m.length;
  const sum=m.reduce((a,b)=>a+b,0),mean=n?sum/n:NaN;
  const med=n?(n%2?m[(n-1)/2]:(m[n/2-1]+m[n/2])/2):NaN;
  const sd=n?Math.sqrt(m.reduce((a,b)=>a+(b-mean)**2,0)/n):NaN;
  const cnt=[0,0,0,0,0];const lv=new Map();
  sat.forEach(r=>{const l=levelOf(+r.m/full*100);cnt[l]++;lv.set(r,l);});
  const pass=sat.filter(r=>+r.m/full*100>=A.cuts[3]).length;
  const bad=sat.filter(r=>+r.m>full||+r.m<0);
  return{full,rows,sat,n,sum,mean,med,sd,min:n?m[0]:NaN,max:n?m[n-1]:NaN,cnt,lv,pass,passP:n?pass/n*100:NaN,meanP:n?mean/full*100:NaN,abs:rows.filter(r=>r.abs).length,bad,sorted:[...sat].sort((a,b)=>b.m-a.m)};
}
const histKey=()=>[S.an.subject,S.an.grade,S.an.section].map(s=>(s||"").trim()).join("|");
function prevExam(){const L=S.hist[histKey()]||[];if(!L.length)return null;if(S.an.cmp){const f=L.find(x=>x.id===S.an.cmp);if(f)return f;}const cur=S.an.exam+"@"+S.an.date;const o=L.filter(x=>x.id!==cur);return o[o.length-1]||null;}

/* smart reading — يُكتب بالفصحى */
function smart(st){
  const A=S.an,out=[],rec=[];if(!st.n)return{out:["أدخلي العلامات لتظهر القراءة التحليلية."],rec:[]};
  const mp=st.meanP,sdp=st.sd/st.full*100;
  const lvl=mp>=85?"مرتفع جدًا":mp>=75?"جيد":mp>=60?"متوسط":"منخفض";
  out.push(`بلغ متوسط الأداء ${fx(st.mean)} من ${st.full} (${fx(mp)}٪)، وهو مستوى ${lvl}، ونسبة النجاح ${fx(st.passP)}٪.`);
  out.push(sdp<10?`الانحراف المعياري ${fx(st.sd)}، أي أن أداء الطالبات متجانس ومتقارب.`:sdp<18?`الانحراف المعياري ${fx(st.sd)}، أي أن تشتّت العلامات متوسط.`:`الانحراف المعياري ${fx(st.sd)}، أي أن الفروق الفردية كبيرة بين الطالبات، وهذا يستدعي التعليم المتمايز.`);
  const sk=(st.mean-st.med)/st.full*100;
  if(sk<-3)out.push("الوسيط أعلى من المتوسط: أغلب الطالبات فوق المتوسط، وقلّة بعلامات منخفضة تسحبه للأسفل، فالأولوية للعلاج الفردي.");
  else if(sk>3)out.push("المتوسط أعلى من الوسيط: قلّة متفوّقة ترفع المتوسط، بينما أغلب الطالبات دونه، فالأولوية لإعادة تدريس جماعي.");
  const wp=st.cnt[4]/st.n*100,ep=st.cnt[0]/st.n*100;
  if(st.cnt[4])rec.push(`إعداد خطة علاجية لـ ${st.cnt[4]} ${st.cnt[4]>2&&st.cnt[4]<11?"طالبات":"طالبة"} في فئة «ضعيف» (${fx(wp)}٪)${wp>=20?"، ويُفضَّل علاج جماعي داخل الحصة لارتفاع النسبة":""}.`);
  if(st.cnt[0])rec.push(`تقديم أنشطة إثرائية لـ ${st.cnt[0]} ${st.cnt[0]>2&&st.cnt[0]<11?"طالبات":"طالبة"} متميّزات، وإشراكهن في تعليم الأقران.`);
  if(st.cnt[3])rec.push(`متابعة فئة «مقبول» (${st.cnt[3]}) بتدريبات قصيرة؛ فهي الأقرب للانتقال إلى «جيد».`);
  const wq=A.qs.filter(q=>q.t&&+q.max>0&&q.avg!==""&&Number.isFinite(+q.avg)).map(q=>({...q,p:+q.avg/+q.max*100})).sort((a,b)=>a.p-b.p);
  const weakQ=wq.filter(q=>q.p<60);
  if(weakQ.length){out.push(`أضعف النتاجات إتقانًا: ${weakQ.map(q=>`«${q.t}» (${fx(q.p,0)}٪)`).join("، ")}.`);rec.unshift("إعادة تدريس النتاجات التي قلّ إتقانها عن 60٪ بأسلوب مختلف قبل الانتقال للدرس التالي.");}
  else if(wq.length)out.push(`جميع النتاجات المقيسة تجاوز إتقانها 60٪، وأقلّها «${wq[0].t}» (${fx(wq[0].p,0)}٪).`);
  const pv=prevExam();
  if(pv){const pm=pv.mean/pv.full*100,d=mp-pm;
    out.push(`مقارنةً بـ«${pv.exam}» (${fmtD(pv.date)}): ${d>=0.5?"تحسّن":d<=-0.5?"تراجع":"ثبات"} المتوسط ${Math.abs(d)>=0.5?"بمقدار "+fx(Math.abs(d))+" نقطة مئوية":"تقريبًا"}.`);
    const ch=st.sat.map(r=>{const o=pv.marks[r.n.trim()];return o==null?null:{n:r.n,d:+r.m/st.full*100-o/pv.full*100};}).filter(Boolean);
    if(ch.length){const up=ch.filter(x=>x.d>=5).length,dn=ch.filter(x=>x.d<=-5).length;out.push(`تحسّنت ${up} وتراجعت ${dn} من ${ch.length} طالبة يمكن مقارنتهن.`);
      const best=[...ch].sort((a,b)=>b.d-a.d)[0];if(best&&best.d>=5)rec.push(`تعزيز الطالبة «${best.n}» لأنها الأكثر تحسّنًا (+${fx(best.d,0)}٪)، ويمكن منحها شهادة تقدير.`);
      const drop=ch.filter(x=>x.d<=-15).map(x=>x.n);if(drop.length)rec.push(`متابعة سبب التراجع الحاد لدى: ${drop.join("، ")}.`);}
  }
  if(st.abs)rec.push(`ترتيب اختبار بديل للغائبات (${st.abs}).`);
  return{out,rec,weakQ};
}

/* ---------- shared sheet parts ---------- */
const emb=()=>S.sch.logo?h("img",{src:S.sch.logo,alt:"شعار المدرسة"}):h("div",{class:"emb"},"مدرسة",h("br"),"القطرانة");
function head(extraL){return h("div",{class:"sh-hd"},
  h("div",{class:"r"},"المملكة الأردنية الهاشمية",h("br"),S.sch.min,h("br"),S.sch.dir),
  h("div",{class:"c"},emb()),
  h("div",{class:"l"},S.sch.school,h("br"),"العام الدراسي "+S.sch.year,extraL?[h("br"),extraL]:null));}
const foot=()=>h("div",{class:"foot"},"أُعِدّ عبر «نماذجي الذكية» · منصة القطرانة للتعلّم الرقمي · تصميمُ المنصّة وتنفيذُها: نوال بني عطية");
const sheet=(cls,...k)=>h("section",{class:"sheet "+(cls||"")},...k);
const pName=()=>S.sch.principal||"";const tName=()=>S.sch.teacher||"";

/* ---------- charts (SVG) ---------- */
function rings(st){const g=h("div",{style:{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"1mm"}});
  LV.forEach(([nm,,c],i)=>{const p=st.n?st.cnt[i]/st.n:0,r=15,C=2*Math.PI*r;
    g.insertAdjacentHTML("beforeend",`<div style="text-align:center"><svg viewBox="0 0 40 40" style="width:13mm;height:13mm"><circle cx="20" cy="20" r="${r}" fill="none" stroke="#eee3dc" stroke-width="5"/><circle cx="20" cy="20" r="${r}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${C*p} ${C}" transform="rotate(-90 20 20)"/><text x="20" y="22.5" text-anchor="middle" font-size="8" font-weight="700" fill="#2B1218" font-family="El Messiri, sans-serif">${fx(p*100,0)}٪</text></svg><div style="font-size:7.5pt;font-weight:700;color:${c}">${nm}</div></div>`);});return g;}
function bars(st){const W=170,H=52,mx=Math.max(1,...st.cnt),bw=22,gap=(W-5*bw)/6;let s=`<svg viewBox="0 0 ${W} ${H+14}">`;
  for(let i=0;i<=mx;i+=Math.max(1,Math.ceil(mx/4))){const y=H-i/mx*(H-8);s+=`<line x1="0" x2="${W}" y1="${y}" y2="${y}" stroke="#f0e6df" stroke-width=".4"/>`;}
  LV.forEach(([nm,,c],i)=>{const x=W-gap-(i+1)*bw-i*gap,hh=st.cnt[i]/mx*(H-8),y=H-hh;s+=`<rect x="${x}" y="${y}" width="${bw}" height="${Math.max(hh,.01)}" rx="2" fill="${c}"/><text x="${x+bw/2}" y="${y-1.5}" text-anchor="middle" font-size="5.5" font-weight="700" fill="#2B1218">${st.cnt[i]}</text><text x="${x+bw/2}" y="${H+7}" text-anchor="middle" font-size="5" fill="#5C1622" font-family="Noto Naskh Arabic, sans-serif">${nm}</text>`;});
  return h("div",{class:"chart b",html:s+"</svg>"});}
function hist(st){const W=170,H=46,B=Math.min(10,Math.max(4,Math.ceil(st.full/2))),step=st.full/B,cnt=Array(B).fill(0);st.sat.forEach(r=>{cnt[Math.min(B-1,Math.floor(+r.m/step))]++;});
  const mx=Math.max(1,...cnt),bw=W/B;let s=`<svg viewBox="0 0 ${W} ${H+12}">`;
  cnt.forEach((c,i)=>{const x=W-(i+1)*bw,hh=c/mx*(H-6);s+=`<rect x="${x+1}" y="${H-hh}" width="${bw-2}" height="${Math.max(hh,.01)}" fill="#7A1F2E" opacity="${.35+.65*c/mx}"/>${c?`<text x="${x+bw/2}" y="${H-hh-1.5}" text-anchor="middle" font-size="5" fill="#2B1218">${c}</text>`:""}<text x="${x+bw/2}" y="${H+6}" text-anchor="middle" font-size="4.3" fill="#76606A">${fx(i*step,0)}–${fx((i+1)*step,0)}</text>`;});
  if(st.n){const mxp=W-st.mean/st.full*W;s+=`<line x1="${mxp}" x2="${mxp}" y1="0" y2="${H}" stroke="#B8902A" stroke-width="1" stroke-dasharray="2 1.5"/><text x="${mxp-1}" y="5" font-size="4.6" fill="#9a7b2a" text-anchor="end">المتوسط</text>`;}
  return h("div",{class:"chart hs",html:s+"</svg>"});}

/* ================= views ================= */
const VIEWS={home,analysis,plans,certs,report,settings};
const NAV=[["home","الرئيسية"],["analysis","تحليل النتائج"],["plans","الخطط"],["certs","الشهادات"],["report","التوثيق"],["settings","بيانات المدرسة"]];
function route(){const v=(location.hash||"#home").slice(1);const fn=VIEWS[v]||home;$("nav").innerHTML="";NAV.forEach(([k,t])=>$("nav").append(h("a",{href:"#"+k,"aria-current":k===(VIEWS[v]?v:"home")?"page":null},t)));
  document.querySelectorAll(".bar").forEach(b=>b.remove());document.body.classList.toggle("landprint",v==="certs");$("app").innerHTML="";fn();window.scrollTo(0,0);}
addEventListener("hashchange",route);

function home(){
  const T=(k,ic,t,d,c,em)=>h("a",{class:"tool",href:"#"+k,style:{"--c":c}},h("i",{},ic),h("b",{},t),h("span",{},d),em?h("em",{},em):null);
  $("app").append(
    h("section",{class:"hero"},h("div",{class:"small",style:{color:"var(--g2)",fontWeight:700}},"منصة القطرانة للتعلّم الرقمي"),
      h("h1",{},"نماذجكِ المدرسية،",h("br"),h("span",{},"تكتب نفسها")),
      h("p",{},"ألصقي علامات طالباتك مرة واحدة، فيخرج التحليل بالرسوم وقراءة تربوية جاهزة، ثم تُبنى منه الخطط العلاجية والإثرائية وشهادات التفوّق تلقائيًا. كل ذلك من جوالك وبهوية مدرستنا."),
      h("div",{class:"chips"},h("span",{},"📱 من الجوال"),h("span",{},"🔒 بياناتك على جهازك فقط"),h("span",{},"🖨️ A4 جاهز للطباعة"),h("span",{},"🧠 قراءة تحليلية تلقائية"),h("span",{},"🚫 بلا إعلانات"))),
    h("div",{class:"tools"},
      T("analysis","📊","تحليل نتائج اختبار","المتوسط والوسيط والانحراف المعياري، التقديرات بالرسوم، تحليل النتاجات، ومقارنة بالاختبار السابق.","#7A1F2E","الأذكى: قراءة وتوصيات تلقائية"),
      T("plans","🩺","الخطط العلاجية والإثرائية","تُبنى تلقائيًا للضعيفات والمتميزات من التحليل، فردية أو جماعية، مع جدول متابعة مؤرّخ.","#B3261E","مرتبطة بالنتاجات الضعيفة"),
      T("certs","🏅","شهادات الشكر والتقدير","شهادة لكل اسم بضغطة: للمتفوقات من التحليل أو لأي قائمة، بثلاثة تصاميم.","#B8902A"),
      T("report","📸","تقرير توثيق بالصور","لنشاط أو درس تطبيقي أو مبادرة أو تجربة مخبرية: أهداف ووصف ونتائج وحتى ست صور.","#2F6FB0","شواهد ملف الجائزة"),
      T("settings","🏫","بيانات المدرسة والتوقيعات","اسم المديرة والمعلّمة والعام الدراسي وشعار المدرسة، تظهر في كل النماذج.","#76606A")),
    h("div",{class:"flow"},h("span",{},"📊 التحليل"),h("i",{},"←"),h("span",{},"🩺 الخطط للضعيفات"),h("i",{},"←"),h("span",{},"🏅 شهادات المتفوقات"),h("i",{},"←"),h("span",{},"📈 مقارنة الاختبار القادم")),
    h("div",{class:"safe"},"🔒",h("div",{},"أسماء الطالبات وعلاماتهن تبقى في جوالك فقط ولا تُرسل لأي مكان. وإن كنتِ داخلة إلى بوابة المعلّمات، يمكنك استيراد أسماء صفّك مباشرة من السجلّ المشفّر.")),
    h("footer",{class:"small muted",style:{textAlign:"center",marginTop:"20px"}},"تصميمُ المنصّة وتنفيذُها: نوال بني عطية"));
}

/* ---- generic work layout ---- */
function work(edNodes,renderPv,actions){
  const pv=h("div",{class:"pv",id:"pv"});
  const cnt=h("span",{});
  const wrap=h("div",{class:"wk"},h("div",{class:"ed"},...edNodes),h("div",{class:"pvwrap"},h("div",{class:"pvh"},h("span",{},"👁️ معاينة الطباعة"),cnt),pv));
  $("app").append(wrap);
  const bar=h("div",{class:"bar noprint"},h("button",{class:"btn gold",onclick:()=>{draw();setTimeout(()=>window.print(),60);}},"🖨️ طباعة / حفظ PDF"),...(actions||[]));
  document.body.append(bar);
  function draw(){pv.innerHTML="";const pages=renderPv();pages.forEach(p=>pv.append(p));cnt.textContent=pages.length+(pages.length>2&&pages.length<11?" صفحات":" صفحة");fit();}
  let t;const later=()=>{clearTimeout(t);t=setTimeout(draw,220);};
  wrap.addEventListener("input",later);wrap.addEventListener("change",later);
  draw();return{draw,later};
}
function fit(){const pv=$("pv");if(!pv)return;const w=pv.clientWidth-24;pv.querySelectorAll(".sheet").forEach(s=>{s.style.zoom="";const sw=s.offsetWidth;s.style.zoom=Math.min(1,w/sw).toFixed(3);});}
addEventListener("resize",()=>{clearTimeout(fit.t);fit.t=setTimeout(fit,150);});
addEventListener("beforeprint",()=>document.querySelectorAll(".pv .sheet").forEach(s=>s.dataset.z=s.style.zoom));
addEventListener("afterprint",()=>document.querySelectorAll(".pv .sheet").forEach(s=>s.style.zoom=s.dataset.z||""));

const sec=(t,open,...k)=>h("details",open?{open:true}:{},h("summary",{},t),h("div",{class:"body"},...k));
function inp(obj,key,attrs={},onSet){const tag=attrs.tag==="textarea"?"textarea":attrs.tag==="select"?"select":"input";const o=Object.assign({},attrs);delete o.tag;delete o.opts;
  const e=h(tag,Object.assign({class:"in"},o),...(attrs.opts||[]).map(x=>h("option",{value:x},x)));e.value=obj[key]??"";
  e.addEventListener("input",()=>{obj[key]=attrs.type==="number"?en(e.value):e.value;save();onSet&&onSet();});return e;}
const fld=(label,el,hint)=>h("label",{class:"f"},h("span",{},label,hint?h("span",{class:"hint"}," · "+hint):null),el);
function seg(obj,key,opts,onSet){const w=h("div",{class:"seg",role:"group"});const paint=()=>w.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.v===String(obj[key]))));
  opts.forEach(([v,t])=>w.append(h("button",{type:"button","data-v":v,onclick:()=>{obj[key]=v;save();paint();onSet&&onSet();w.dispatchEvent(new Event("change",{bubbles:true}));}},t)));paint();return w;}
function checks(arr,opts){const w=h("div",{class:"ck"});const all=[...new Set([...opts,...arr])];
  all.forEach(o=>{const c=h("input",{type:"checkbox"});c.checked=arr.includes(o);c.addEventListener("change",()=>{const i=arr.indexOf(o);if(c.checked&&i<0)arr.push(o);if(!c.checked&&i>=0)arr.splice(i,1);save();});w.append(h("label",{},c,h("span",{},o)));});
  const add=h("input",{class:"in",placeholder:"➕ أضيفي بندًا من عندك ثم Enter"});add.addEventListener("keydown",e=>{if(e.key==="Enter"&&add.value.trim()){e.preventDefault();arr.push(add.value.trim());save();const p=w.parentNode;const n=checks(arr,opts);p.replaceChild(n,w);n.dispatchEvent(new Event("change",{bubbles:true}));}});
  return h("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},w,add);}

/* ---- roster import (encrypted roster of the teachers' portal) ---- */
async function rosterPicker(onNames){
  const box=h("div",{class:"login"},h("div",{class:"small"},"⏳ جارٍ فتح السجلّ…"));
  try{
    if(!window.QClass)throw 0;
    let s=await QClass.resume(ROSTER);
    const showClasses=(s)=>{const ks=Object.keys(s.data.classes||{}).sort((a,b)=>a.localeCompare(b,"ar"));box.innerHTML="";
      const sel=h("select",{class:"in"},...ks.map(k=>h("option",{value:k},"الصف "+k.replace("|"," · الشعبة "))));
      box.append(h("b",{},"اختاري الصف:"),sel,h("button",{class:"btn sm",type:"button",onclick:()=>{const k=sel.value;onNames((s.data.classes[k]||[]).slice(),k);box.remove();}},"📥 استيراد الأسماء"));};
    if(s){showClasses(s);return box;}
    const keys=await QClass.keys(ROSTER);box.innerHTML="";
    const who=h("select",{class:"in"},...Object.entries(keys).map(([id,k])=>h("option",{value:id},k.label)));
    try{const l=localStorage.getItem("qclass.last");if(l&&keys[l])who.value=l;}catch(e){}
    const pin=h("input",{class:"in",type:"password",inputmode:"numeric",placeholder:"رمزكِ السرّي في بوابة المعلّمات"}),err=h("div",{class:"small",style:{color:"var(--L5)"}});
    const go=async()=>{err.textContent="⏳";try{s=await QClass.signIn(ROSTER,who.value,pin.value.trim());showClasses(s);}catch(e){err.textContent="الرمز غير صحيح.";}};
    pin.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();go();}});
    box.append(h("b",{},"🔒 ادخلي برمز بوابة المعلّمات لاستيراد أسماء صفّك"),who,pin,h("button",{class:"btn sm",type:"button",onclick:go},"🔓 دخول"),err);
  }catch(e){box.innerHTML="";box.append(h("div",{class:"small"},"تعذّر فتح السجلّ. تأكّدي من الاتصال، أو ألصقي الأسماء يدويًا."));}
  return box;
}
function parseLines(txt){const out=[];txt.split(/\r?\n/).forEach(l=>{l=l.replace(/^\s*\d+[\.\-)\s]+(?=\D)/,"").trim();if(!l)return;
  const s=en(l);let m=s.match(/^(.*?)[\s\t,،;:|\-–]+(\d+(?:\.\d+)?)\s*$/);
  if(m&&m[1].trim())out.push({n:m[1].trim(),m:m[2],abs:false});
  else if(/(غائب|غائبة|غ)\s*$/.test(l))out.push({n:l.replace(/[\s\t,،\-–]*(غائب|غائبة|غ)\s*$/,"").trim(),m:"",abs:true});
  else out.push({n:l,m:"",abs:false});});return out;}

/* ================= 1) analysis ================= */
function analysis(){
  const A=S.an;let W;
  const tbl=h("div",{class:"tbl"});
  const paste=h("textarea",{class:"in",placeholder:"ألصقي هنا من إكسل أو واتساب، كل سطر: الاسم ثم العلامة\nمثال:\nسارة أحمد  18\nلين محمد 15.5\nرهف خالد غ"});
  const drawRows=()=>{tbl.innerHTML="";const full=+A.full||0;
    A.rows.forEach((r,i)=>{const nm=h("input",{class:"in",value:r.n,"aria-label":"اسم الطالبة "+(i+1)});nm.addEventListener("input",()=>{r.n=nm.value;save();});
      const mk=h("input",{class:"in",value:r.m,inputmode:"decimal","aria-label":"العلامة",dir:"ltr",style:{textAlign:"center"}});
      const lvB=h("div",{class:"lv"});const paint=()=>{const v=+en(mk.value);if(r.abs||mk.value===""||!Number.isFinite(v)||!full){lvB.textContent=r.abs?"غ":"";lvB.style.background=r.abs?"var(--mut)":"transparent";return;}const l=levelOf(v/full*100);lvB.textContent=LV[l][0];lvB.style.background=v>full?"#000":LV[l][1];};
      mk.addEventListener("input",()=>{r.m=en(mk.value).trim();save();paint();});
      const ab=h("input",{type:"checkbox","aria-label":"غائبة"});ab.checked=!!r.abs;ab.addEventListener("change",()=>{r.abs=ab.checked;save();paint();});
      paint();
      tbl.append(h("div",{class:"tr"},h("span",{class:"n"},i+1),nm,mk,h("label",{class:"ab",title:"غائبة"},ab,"غ"),h("button",{class:"x",type:"button","aria-label":"حذف",onclick:()=>{A.rows.splice(i,1);save();drawRows();W&&W.later();}},"×")));
      tbl.lastChild.insertBefore(lvB,tbl.lastChild.children[3]);tbl.lastChild.style.gridTemplateColumns="24px minmax(0,1fr) 58px 52px 34px 28px";});
    if(!A.rows.length)tbl.append(h("div",{class:"small muted"},"لا توجد أسماء بعد. ألصقيها بالأعلى أو استورديها من صفّك."));};
  const addParsed=(L,replace)=>{if(replace)A.rows=L;else A.rows.push(...L);save();drawRows();W&&W.draw();};
  const imp=h("div");
  const qsBox=h("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}});
  const drawQs=()=>{qsBox.innerHTML="";A.qs.forEach((q,i)=>{const r=h("div",{style:{display:"grid",gridTemplateColumns:"minmax(0,1fr) 62px 70px 28px",gap:"6px"}},inp(q,"t",{placeholder:"السؤال / النتاج"}),inp(q,"max",{placeholder:"علامته",inputmode:"decimal"}),inp(q,"avg",{placeholder:"متوسطه",inputmode:"decimal"}),h("button",{class:"x",type:"button",onclick:()=>{A.qs.splice(i,1);save();drawQs();W.later();}},"×"));qsBox.append(r);});
    qsBox.append(h("button",{class:"btn g sm",type:"button",onclick:()=>{A.qs.push({t:"",max:"",avg:""});save();drawQs();}},"➕ سؤال / نتاج"));};
  const cmpSel=h("select",{class:"in"});
  const drawCmp=()=>{const L=S.hist[histKey()]||[];cmpSel.innerHTML="";cmpSel.append(h("option",{value:""},L.length?"تلقائي: آخر اختبار محفوظ":"لا يوجد اختبار سابق محفوظ لهذا الصف والمبحث"),...L.map(x=>h("option",{value:x.id},x.exam+" · "+fmtD(x.date))));cmpSel.value=A.cmp||"";};
  cmpSel.addEventListener("change",()=>{A.cmp=cmpSel.value;save();});
  const cuts=h("div",{class:"row"},...["ممتاز من","جيد جدًا من","جيد من","مقبول (النجاح) من"].map((t,i)=>{const e=h("input",{class:"in",value:A.cuts[i],inputmode:"decimal"});e.addEventListener("input",()=>{A.cuts[i]=+en(e.value)||0;save();drawRows();});return fld(t+" ٪",e);}));
  const ed=[
    sec("1. بيانات الاختبار",true,
      h("div",{class:"row"},fld("المبحث",inp(A,"subject",{list:"subjL",placeholder:"مثال: الأحياء"},drawCmp)),fld("الصف",inp(A,"grade",{tag:"select",opts:["","السابع","الثامن","التاسع","العاشر","الحادي عشر","الثاني عشر"]},drawCmp)),fld("الشعبة",inp(A,"section",{placeholder:"أ"},drawCmp))),
      h("datalist",{id:"subjL"},...["الأحياء","الكيمياء","الفيزياء","علوم الأرض والبيئة","العلوم","الرياضيات","اللغة العربية","اللغة الإنجليزية","التربية الإسلامية","التاريخ","الجغرافيا","الثقافة المالية","الحاسوب"].map(x=>h("option",{value:x}))),
      h("div",{class:"row"},fld("نوع الاختبار",inp(A,"exam",{list:"exL"})),fld("العلامة الكاملة",inp(A,"full",{type:"number",inputmode:"decimal"},drawRows)),fld("التاريخ",inp(A,"date",{type:"date"}))),
      h("datalist",{id:"exL"},...["الاختبار الأول","الاختبار الثاني","الاختبار النهائي","اختبار قصير","اختبار تشخيصي","الاختبار الشهري","المشاريع والأعمال"].map(x=>h("option",{value:x}))),
      fld("الفصل",inp(A,"term",{tag:"select",opts:["الفصل الدراسي الأول","الفصل الدراسي الثاني"]}))),
    sec("2. الأسماء والعلامات",true,
      paste,h("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"}},
        h("button",{class:"btn sm",type:"button",onclick:()=>{const L=parseLines(paste.value);if(!L.length)return toast("ألصقي الأسماء أولًا");addParsed(L,!A.rows.length);paste.value="";toast("أُضيفت "+L.length+" طالبة ✓");}},"✨ حوّلي النص لجدول"),
        h("button",{class:"btn g sm",type:"button",onclick:async()=>{imp.innerHTML="";imp.append(await rosterPicker((names,k)=>{const[g,sct]=k.split("|");if(g&&!A.grade)A.grade=g;if(sct&&!A.section)A.section=sct;addParsed(names.map(n=>({n,m:"",abs:false})),true);toast("استُوردت "+names.length+" اسمًا، اكتبي العلامات");}));}},"👩‍🎓 استيراد صفّي"),
        h("button",{class:"btn g sm",type:"button",onclick:()=>{A.rows.push({n:"",m:"",abs:false});save();drawRows();tbl.lastChild.querySelector("input").focus();}},"➕ سطر"),
        h("button",{class:"btn g sm",type:"button",onclick:()=>{if(!A.rows.length)return;if(clearAll.dataset.s!=="1"){clearAll.dataset.s="1";clearAll.textContent="⚠️ اضغطي مرة ثانية للتأكيد";setTimeout(()=>{clearAll.dataset.s="";clearAll.textContent="🗑️ مسح الكل";},3000);return;}A.rows=[];save();drawRows();W.draw();clearAll.dataset.s="";clearAll.textContent="🗑️ مسح الكل";},id:"clrA"},"🗑️ مسح الكل")),
      imp,tbl),
    sec("3. تحليل الأسئلة / النتاجات (اختياري)",false,h("div",{class:"hint"},"اكتبي لكل سؤال علامته ومتوسط علامات الطالبات فيه؛ فتُحسب نسبة الإتقان، وتنتقل النتاجات الضعيفة تلقائيًا إلى الخطة العلاجية."),qsBox),
    sec("4. حدود التقديرات والمقارنة",false,cuts,fld("المقارنة مع",cmpSel,"تُحفظ الاختبارات بزر «حفظ للمقارنة»")),
  ];
  const clearAll=ed[1].querySelector("#clrA");
  drawRows();drawQs();drawCmp();
  W=work(ed,()=>anSheets(),[
    h("button",{class:"btn g",onclick:()=>{const st=stats();if(!st.n)return toast("لا توجد علامات للحفظ");const k=histKey();const L=S.hist[k]=S.hist[k]||[];const id=A.exam+"@"+A.date;const marks={};st.sat.forEach(r=>marks[r.n.trim()]=+r.m);const rec={id,exam:A.exam,date:A.date,full:st.full,mean:st.mean,marks};const i=L.findIndex(x=>x.id===id);if(i>=0)L[i]=rec;else L.push(rec);save();drawCmp();toast("حُفظ للمقارنة مع الاختبار القادم ✓");}},"💾 حفظ للمقارنة"),
    h("a",{class:"btn g",href:"#plans",onclick:()=>{S.pl.type="rem";S.pl.src="an";save();}},"🩺 خطط للضعيفات"),
    h("a",{class:"btn g",href:"#certs",onclick:()=>{S.ce.src="an";S.ce.reason="exc";save();}},"🏅 شهادات للمتميزات")]);
}
function anSheets(){
  const A=S.an,st=stats(),sm=smart(st);
  const meta=h("div",{class:"meta"},...[["المبحث",A.subject||"—"],["الصف والشعبة",(A.grade||"—")+(A.section?" / "+A.section:"")],["الاختبار",A.exam],["التاريخ",fmtD(A.date)]].map(([a,b])=>h("div",{},h("b",{},a),b)));
  const K=(v,t)=>h("div",{class:"kpi"},h("b",{},v),h("span",{},t));
  const kp=h("div",{class:"kpis"},K(st.rows.length,"عدد الطالبات"),K(st.n,"المتقدّمات"),K(fx(st.mean)+" / "+st.full,"المتوسط"),K(fx(st.passP,0)+"٪","نسبة النجاح"),K(fx(st.max),"أعلى علامة"),K(fx(st.min),"أدنى علامة"),K(fx(st.med),"الوسيط"),K(fx(st.sd,2),"الانحراف المعياري"));
  const c=A.cuts;const rng=[[c[0],100],[c[1],c[0]],[c[2],c[1]],[c[3],c[2]],[0,c[3]]];
  const lvT=h("table",{class:"t"},h("tr",{},h("th",{},"التقدير"),h("th",{},"المدى (من "+st.full+")"),h("th",{},"العدد"),h("th",{},"النسبة")),
    ...LV.map(([nm,,col],i)=>h("tr",{},h("td",{},h("span",{class:"lvchip",style:{background:col}},nm)),h("td",{dir:"ltr"},fx(rng[i][0]*st.full/100)+" – "+(i===0?st.full:fx(rng[i][1]*st.full/100-.01,2))),h("td",{},st.cnt[i]),h("td",{},st.n?fx(st.cnt[i]/st.n*100,0)+"٪":"–"))));
  const p1=sheet("",head(A.term),h("div",{class:"sh-t"},"تحليل نتائج "+A.exam+(A.subject?" · "+A.subject:"")),meta,kp,
    h("div",{class:"two"},h("div",{class:"box"},h("h4",{},"توزيع التقديرات"),lvT),h("div",{class:"box"},h("h4",{},"عدد الطالبات لكل تقدير"),bars(st))),
    h("div",{class:"two"},h("div",{class:"box"},h("h4",{},"نسب الطالبات"),rings(st)),h("div",{class:"box"},h("h4",{},"توزيع العلامات"),hist(st))),
    h("div",{class:"box read"},h("h4",{},"🧠 القراءة التحليلية"),...sm.out.map(t=>h("p",{},"• "+t)),sm.rec.length?[h("h4",{style:{marginTop:"1.5mm"}},"التوصيات"),h("ul",{},...sm.rec.map(t=>h("li",{},t)))]:null),
    h("div",{class:"sig"},h("div",{},"معلّمة المبحث",h("span",{},tName()||"............")),h("div",{},"المنسّقة / رئيسة القسم",h("span",{},"............")),h("div",{},"مديرة المدرسة",h("span",{},pName()||"............"))),foot());
  const pages=[p1];
  /* names list */
  const L=st.rows.map(r=>r);const per=34;
  for(let i=0;i<Math.max(1,Math.ceil(L.length/per));i++){const part=L.slice(i*per,(i+1)*per);if(!part.length&&i>0)break;
    const t=h("table",{class:"t"},h("tr",{},h("th",{},"#"),h("th",{},"اسم الطالبة"),h("th",{},"العلامة"),h("th",{},"النسبة"),h("th",{},"التقدير"),h("th",{},"مقارنة بالسابق")));
    const pv=prevExam();
    part.forEach((r,j)=>{const ok=!r.abs&&r.m!==""&&Number.isFinite(+r.m);const p=ok?+r.m/st.full*100:NaN;const l=ok?levelOf(p):null;let cmp="";
      if(pv&&ok){const o=pv.marks[r.n.trim()];if(o!=null){const d=p-o/pv.full*100;cmp=(d>=0.5?"▲ +":d<=-0.5?"▼ ":"● ")+fx(d,0)+"٪";}}
      t.append(h("tr",{},h("td",{},i*per+j+1),h("td",{class:"nm"},r.n),h("td",{},r.abs?"غائبة":ok?fx(+r.m,2):"–"),h("td",{},ok?fx(p,0)+"٪":""),h("td",{},l!=null?h("span",{class:"lvchip",style:{background:LV[l][2]}},LV[l][0]):""),h("td",{dir:"ltr",style:{color:cmp.startsWith("▲")?"#1F7A4D":cmp.startsWith("▼")?"#B3261E":"#76606A"}},cmp)));});
    let extra=null;
    if(i===0&&A.qs.some(q=>q.t)){const qt=h("table",{class:"t"},h("tr",{},h("th",{},"السؤال / النتاج"),h("th",{},"العلامة"),h("th",{},"المتوسط"),h("th",{},"نسبة الإتقان"),h("th",{},"الحكم")));
      A.qs.filter(q=>q.t).forEach(q=>{const p=+q.max>0?+q.avg/+q.max*100:NaN;qt.append(h("tr",{},h("td",{class:"nm"},q.t),h("td",{},q.max),h("td",{},q.avg),h("td",{},fx(p,0)+"٪"),h("td",{style:{fontWeight:700,color:p>=80?"#1F7A4D":p>=60?"#C9822B":"#B3261E"}},p>=80?"متقَن":p>=60?"يحتاج تعزيزًا":"يحتاج إعادة تدريس")));});
      extra=h("div",{class:"box"},h("h4",{},"تحليل الأسئلة والنتاجات"),qt);}
    pages.push(sheet("",head(A.term),h("div",{class:"sh-t"},"كشف علامات الطالبات"+(L.length>per?" ("+(i+1)+")":"")),meta.cloneNode(true),h("div",{class:"box",style:{padding:"0"}},t),extra,h("div",{class:"sig"},h("div",{},"معلّمة المبحث",h("span",{},tName()||"............")),h("div",{}),h("div",{},"مديرة المدرسة",h("span",{},pName()||"............"))),foot()));}
  return pages;
}

/* ================= 2) plans ================= */
const WEAK=["ضعف المستوى التحصيلي في المبحث","صعوبة في فهم المفاهيم الأساسية","ضعف في المهارات الحسابية/القرائية اللازمة","قلّة المشاركة الصفية","إهمال الواجبات","كثرة الغياب","ضعف التركيز والانتباه","قلق الاختبار"];
const STRAT=["أوراق عمل علاجية متدرّجة","التعلّم بالأقران","تبسيط المفهوم بالمحسوسات والتجارب","التغذية الراجعة الفورية","تذاكر الخروج اليومية","التعلّم في مجموعات صغيرة","الخرائط المفاهيمية","فيديو قصير ومحاكاة من منصة القطرانة","تنويع أساليب التقويم","التعزيز والتحفيز"];
const ACTS=["لقاء فردي مع الطالبة","تواصل مع وليّة الأمر","إحالة للمرشدة التربوية","إعادة الاختبار بعد العلاج","حصص تقوية"];
const E_STR=["مسائل وأنشطة تفكير عليا","مشروع بحثي قصير","قيادة مجموعة في تعلّم الأقران","المشاركة في المسابقات العلمية","تصميم تجربة أو نموذج","قراءات إثرائية ومصادر رقمية","تقديم عرض أمام الصف"];
const E_ACTS=["تكريم في الإذاعة المدرسية","شهادة تقدير","تواصل تحفيزي مع وليّة الأمر","ترشيح لنادي العلوم"];
function planStudents(){const P=S.pl;if(P.src==="manual")return P.manual.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).map(n=>({n,m:"",l:null}));
  const st=stats();return st.sat.map(r=>({n:r.n,m:+r.m,l:levelOf(+r.m/st.full*100)})).filter(x=>P.type==="rem"?(x.l===4||(P.incl4&&x.l===3)):x.l===0).sort((a,b)=>P.type==="rem"?a.m-b.m:b.m-a.m);}
function plans(){
  const P=S.pl;let W;
  if(P.type==="enr"&&P._swap!=="enr"){P.strat=E_STR.slice(0,4);P.acts=E_ACTS.slice(0,2);P._swap="enr";}
  if(P.type==="rem"&&P._swap==="enr"){P.strat=DEF.pl.strat.slice();P.acts=DEF.pl.acts.slice();P._swap="rem";}
  const sm=smart(stats());
  if(!P.skills&&sm.weakQ&&sm.weakQ.length)P.skills=sm.weakQ.map(q=>q.t).join("، ");
  const info=h("div",{class:"smart"});
  const paint=()=>{const L=planStudents();info.innerHTML="";info.append(P.src==="an"?h("span",{},h("b",{},L.length)," ",P.type==="rem"?"طالبة من التحليل (ضعيف"+(P.incl4?" + مقبول":"")+")":"طالبة متميّزة من التحليل",L.length?": "+L.map(x=>x.n).join("، "):" · افتحي «تحليل النتائج» وأدخلي العلامات أولًا"):h("span",{},h("b",{},L.length)," اسمًا من القائمة"));};
  const man=inp(P,"manual",{tag:"textarea",placeholder:"اسم في كل سطر"});
  const ed=[
    sec("1. نوع الخطة",true,seg(P,"type",[["rem","🩺 علاجية"],["enr","🌟 إثرائية"]],()=>route()),seg(P,"mode",[["ind","صفحة لكل طالبة"],["grp","خطة جماعية في صفحة"]]),
      fld("الطالبات",seg(P,"src",[["an","من تحليل النتائج"],["manual","قائمة أكتبها"]],()=>{man.parentNode.hidden=P.src!=="manual";paint();})),
      (()=>{const l=fld("الأسماء",man);l.hidden=P.src!=="manual";return l;})(),
      P.type==="rem"?h("label",{class:"small",style:{display:"flex",gap:"6px",alignItems:"center"}},(()=>{const c=h("input",{type:"checkbox"});c.checked=P.incl4;c.addEventListener("change",()=>{P.incl4=c.checked;save();paint();});return c;})(),"تشمل فئة «مقبول» أيضًا"):null,info),
    sec("2. "+(P.type==="rem"?"النتاجات/المهارات غير المتقنة":"المهارات المستهدفة"),true,inp(P,"skills",{tag:"textarea",placeholder:"تُملأ تلقائيًا من النتاجات الضعيفة في التحليل، ويمكنك التعديل"}),
      h("div",{class:"row"},fld("تاريخ البدء",inp(P,"start",{type:"date"})))),
    P.type==="rem"?sec("3. أسباب الضعف",false,checks(P.weak,WEAK)):null,
    sec((P.type==="rem"?"4":"3")+". الاستراتيجيات",false,checks(P.strat,P.type==="rem"?STRAT:E_STR)),
    sec((P.type==="rem"?"5":"4")+". الإجراءات",false,checks(P.acts,P.type==="rem"?ACTS:E_ACTS)),
  ].filter(Boolean);
  paint();
  W=work(ed,planSheets,[h("a",{class:"btn g",href:"#analysis"},"📊 الرجوع للتحليل")]);
}
function planSheets(){
  const P=S.pl,A=S.an,L=planStudents(),rem=P.type==="rem",title=rem?"خطة علاجية":"خطة إثرائية";
  const meta=(n,m)=>h("div",{class:"meta"},...[["اسم الطالبة",n||"............"],["الصف والشعبة",(A.grade||"—")+(A.section?" / "+A.section:"")],["المبحث",A.subject||"—"],["العلامة",m!==""&&m!=null?fx(m,2)+" / "+A.full:"—"]].map(([a,b])=>h("div",{},h("b",{},a),b)));
  const list=(t,arr)=>h("div",{class:"box"},h("h4",{},t),h("div",{class:"ckp"},...arr.map(x=>h("span",{class:"on"},x)),h("span",{},"................")));
  const follow=()=>{const t=h("table",{class:"t"},h("tr",{},h("th",{},"الأسبوع"),h("th",{},"التاريخ"),h("th",{},"الإجراء المنفَّذ"),h("th",{},"ملاحظة المعلّمة")));
    [0,7,14,21].forEach((d,i)=>t.append(h("tr",{},h("td",{},i===3?"إعادة التقويم":"الأسبوع "+(i+1)),h("td",{},fmtD(addDays(P.start||today(),d))),h("td",{style:{height:"9mm"}},""),h("td",{},""))));return h("div",{class:"box"},h("h4",{},"جدول التنفيذ والمتابعة"),t);};
  const result=()=>h("div",{class:"box"},h("h4",{},"نتيجة الخطة"),h("div",{class:"ckp"},...(rem?["تحسّن واضح","تحسّن جزئي","لم يتحسّن بعد، تُمدَّد الخطة"]:["حقّقت الأهداف","تحتاج متابعة","تُرشَّح لمستوى أعلى"]).map(x=>h("span",{},x))),h("div",{class:"lines",style:{marginTop:"2mm"}},h("div",{}),h("div",{})));
  const sig=()=>h("div",{class:"sig"},h("div",{},"معلّمة المبحث",h("span",{},tName()||"............")),h("div",{},rem?"المرشدة التربوية":"المنسّقة",h("span",{},"............")),h("div",{},"مديرة المدرسة",h("span",{},pName()||"............")));
  const skills=()=>h("div",{class:"box"},h("h4",{},rem?"النتاجات / المهارات غير المتقنة":"المهارات المستهدفة"),h("div",{style:{fontSize:"10pt"}},P.skills||"................................................................"));
  if(P.mode==="grp"||!L.length){
    const t=h("table",{class:"t"},h("tr",{},h("th",{},"#"),h("th",{},"اسم الطالبة"),h("th",{},"العلامة"),h("th",{},"التقدير"),h("th",{},"ملاحظة")));
    (L.length?L:[{n:"",m:""},{n:"",m:""},{n:"",m:""}]).forEach((x,i)=>t.append(h("tr",{},h("td",{},i+1),h("td",{class:"nm"},x.n),h("td",{},x.m!==""?fx(x.m,2):""),h("td",{},x.l!=null?h("span",{class:"lvchip",style:{background:LV[x.l][2]}},LV[x.l][0]):""),h("td",{},""))));
    return[sheet("",head(A.term),h("div",{class:"sh-t"},title+" جماعية"+(A.subject?" · "+A.subject:"")),
      h("div",{class:"meta"},...[["المبحث",A.subject||"—"],["الصف والشعبة",(A.grade||"—")+(A.section?" / "+A.section:"")],["بناءً على",A.exam],["تاريخ البدء",fmtD(P.start)]].map(([a,b])=>h("div",{},h("b",{},a),b))),
      h("div",{class:"box",style:{padding:0}},t),skills(),rem?list("أسباب الضعف",P.weak):null,list("الاستراتيجيات",P.strat),list("الإجراءات",P.acts),follow(),sig(),foot())];}
  return L.map(x=>sheet("",head(A.term),h("div",{class:"sh-t"},title+(A.subject?" · "+A.subject:"")),meta(x.n,x.m),
    h("div",{class:"meta"},h("div",{},h("b",{},"التقدير"),x.l!=null?LV[x.l][0]:"—"),h("div",{},h("b",{},"بناءً على"),A.exam),h("div",{},h("b",{},"تاريخ البدء"),fmtD(P.start)),h("div",{},h("b",{},"مدة الخطة"),"ثلاثة أسابيع")),
    skills(),rem?list("أسباب الضعف",P.weak):null,list("الاستراتيجيات",P.strat),list("الإجراءات",P.acts),follow(),result(),sig(),foot()));
}

/* ================= 3) certificates ================= */
const REASONS={exc:["التفوّق","وذلك لتفوّقها وتميّزها في مبحث {المبحث}، متمنّين لها دوام التقدّم والنجاح."],imp:["التحسّن","تقديرًا لتحسّنها الملحوظ ومثابرتها في مبحث {المبحث}، فالجهد الصادق يصنع الفرق."],part:["المشاركة","وذلك لمشاركتها الفاعلة والمتميّزة في {النشاط}."],lab:["المختبر","تقديرًا لتميّزها في تنفيذ التجارب العلمية والتزامها بقواعد السلامة في المختبر."],thx:["شكر","تقديرًا لجهودها المخلصة وعطائها المتميّز في خدمة المدرسة والطالبات."],custom:["نص حرّ",""]};
function certNames(){const C=S.ce;if(C.src==="manual")return C.manual.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  const st=stats();let L=st.sorted;if(C.reason==="imp"){const pv=prevExam();if(pv)L=st.sat.map(r=>{const o=pv.marks[r.n.trim()];return o==null?null:{n:r.n,d:+r.m/st.full*100-o/pv.full*100};}).filter(x=>x&&x.d>=5).sort((a,b)=>b.d-a.d);else L=[];}
  else L=C.top>0?L.slice(0,C.top):L.filter(r=>levelOf(+r.m/st.full*100)===0);return L.map(r=>r.n);}
function certs(){
  const C=S.ce;let W;
  const txt=inp(C,"text",{tag:"textarea"});
  const setTxt=()=>{const r=REASONS[C.reason];if(C.reason!=="custom"){C.text=r[1];txt.value=C.text;save();}};
  if(!C.text)setTxt();
  const info=h("div",{class:"smart"});
  const man=inp(C,"manual",{tag:"textarea",placeholder:"اسم في كل سطر"});
  const paint=()=>{const L=certNames();info.innerHTML="";info.append(h("b",{},L.length)," شهادة",L.length?": "+L.join("، "):(C.src==="an"?(C.reason==="imp"?" · احفظي اختبارًا سابقًا للمقارنة ليظهر الأكثر تحسّنًا":" · أدخلي العلامات في التحليل أولًا"):""));};
  const ed=[
    sec("1. التصميم",true,seg(C,"design",[["A","كلاسيكي"],["B","شريط خمري"],["C","زخرفة هندسية"]])),
    sec("2. سبب التقدير",true,seg(C,"reason",Object.entries(REASONS).map(([k,v])=>[k,v[0]]),()=>{setTxt();paint();}),
      fld("النص",txt,"اكتبي {المبحث} أو {النشاط} ليُستبدلا تلقائيًا"),
      h("div",{class:"row"},fld("تُمنح إلى",inp(C,"who",{tag:"select",opts:["الطالبة","المعلّمة","الزميلة","وليّة الأمر"]})),fld("التاريخ",inp(C,"date",{type:"date"})))),
    sec("3. الأسماء",true,seg(C,"src",[["an","من تحليل النتائج"],["manual","قائمة أكتبها"]],()=>{man.parentNode.hidden=C.src!=="manual";topF.hidden=C.src!=="an"||C.reason==="imp";paint();}),
      (()=>{const l=fld("الأسماء",man);l.hidden=C.src!=="manual";return l;})(),
      h("button",{class:"btn g sm",type:"button",onclick:async e=>{const b=e.currentTarget;b.after(await rosterPicker(names=>{C.src="manual";C.manual=names.join("\n");save();route();}));}},"👩‍🎓 استيراد أسماء صفّي"),
      info),
    sec("4. التوقيعات",false,h("div",{class:"row"},fld("التوقيع الأيمن",inp(C,"sign2",{placeholder:"معلّمة المبحث"}))),h("div",{class:"hint"},"اسم المديرة واسمك من «بيانات المدرسة».")),
  ];
  const topF=fld("العدد",inp(C,"top",{tag:"select",opts:["0","3","5","10"]}),"0 = كل فئة «ممتاز»");topF.hidden=C.src!=="an"||C.reason==="imp";
  ed[2].querySelector(".body").insertBefore(topF,info);
  ed[2].addEventListener("input",paint);
  paint();
  W=work(ed,certSheets);
}
function certSheets(){const C=S.ce,A=S.an;const L=certNames();const names=L.length?L:["اسم الطالبة"];
  const text=(C.text||"").replace(/\{المبحث\}/g,A.subject||"..........").replace(/\{النشاط\}/g,"النشاط");
  const fixGender=C.who==="الطالبة"||C.who==="المعلّمة"||C.who==="الزميلة"||C.who==="وليّة الأمر";
  const corner=`<svg viewBox="0 0 100 100"><g fill="none" stroke="#B8902A" stroke-width="1.2"><path d="M100 0 L100 60 L40 0 Z" fill="#7A1F2E" stroke="none"/><path d="M100 0 L100 40 L60 0Z" fill="#B8902A" stroke="none" opacity=".9"/>${[0,1,2,3].map(i=>`<path d="M${100-18-i*12} 0 L100 ${18+i*12}"/>`).join("")}<circle cx="78" cy="22" r="6" stroke="#fff"/><path d="M78 13 L80 20 L87 22 L80 24 L78 31 L76 24 L69 22 L76 20Z" fill="#fff" stroke="none"/></g></svg>`;
  return names.map(n=>{const s=sheet("land cert d"+C.design);
    if(C.design==="B"){s.append(h("div",{class:"band"}),h("div",{class:"band2"}));}
    if(C.design==="C"){s.append(h("div",{class:"cn a",html:corner}),h("div",{class:"cn b",html:corner}));}
    if(C.design!=="B")s.append(h("div",{class:"frame"}));
    s.append(h("div",{class:"cin"},
      h("div",{class:"hdr"},h("div",{},"المملكة الأردنية الهاشمية",h("br"),S.sch.min),h("div",{style:{width:"20mm",height:"20mm",display:"grid",placeItems:"center"}},emb()),h("div",{class:"l"},S.sch.dir,h("br"),S.sch.school)),
      h("h2",{},"شهادة شكر وتقدير"),
      h("div",{class:"lead"},"تتقدّم إدارة "+S.sch.school+" بخالص الشكر والتقدير إلى "+(fixGender?C.who:"")),
      h("div",{class:"nm"},n),
      h("div",{class:"why"},text),
      h("div",{class:"pray"},"سائلين الله لها دوام التوفيق والسداد"),
      h("div",{class:"csig"},h("div",{},C.sign2||"معلّمة المبحث",h("span",{},tName()||"")),h("div",{class:"seal"},"ختم المدرسة"),h("div",{},"مديرة المدرسة",h("span",{},pName()||""))),
      h("div",{style:{fontSize:"9pt",color:"#9a7b2a"}},fmtD(C.date)+" · العام الدراسي "+S.sch.year)));
    return s;});}

/* ================= 4) report ================= */
const RTPL={act:["تقرير توثيق نشاط","تنفيذ نشاط"],les:["تقرير درس تطبيقي","درس تطبيقي"],lab:["تقرير تجربة مخبرية","تجربة مخبرية"],ini:["تقرير توثيق مبادرة","مبادرة"],wrk:["تقرير ورشة عمل","ورشة عمل"],day:["تقرير يوم عالمي / مناسبة","مناسبة"]};
const RHINT={act:{goals:"تنمية روح المشاركة والعمل الجماعي لدى الطالبات.\nربط التعلّم بالحياة اليومية.",out:"تفاعل واسع من الطالبات، وتحقّق أهداف النشاط."},les:{goals:"تطبيق استراتيجية تدريس نشطة أمام الزميلات.\nتبادل الخبرات المهنية.",out:"أبدت الزميلات ملاحظات إيجابية، وتحقّقت نتاجات الدرس."},lab:{goals:"تنفيذ التجربة بخطوات علمية صحيحة.\nتطبيق قواعد السلامة في المختبر.\nتفسير النتائج والربط بالمفهوم العلمي.",out:"نفّذت الطالبات التجربة بأنفسهن وسجّلن الملاحظات وفسّرن النتائج."},ini:{goals:"معالجة مشكلة واقعية في البيئة المدرسية.\nتعزيز الانتماء والمسؤولية.",out:"لمس أثر المبادرة في سلوك الطالبات وبيئة المدرسة."},wrk:{goals:"تدريب المشاركات على مهارة محدّدة.\nتطبيق عملي لما تمّ التدرّب عليه.",out:"اكتسبت المشاركات المهارة وطبّقنها عمليًا."},day:{goals:"التوعية بالمناسبة وأهميتها.\nإشراك الطالبات في أنشطة هادفة.",out:"شاركت الطالبات بفاعلية في فقرات المناسبة."}};
function report(){
  const R=S.rp;let W;
  const ph=h("div",{class:"photos"});
  const drawPh=()=>{ph.innerHTML="";R.photos.forEach((src,i)=>ph.append(h("div",{},h("img",{src,alt:"صورة "+(i+1)}),h("button",{type:"button","aria-label":"حذف الصورة",onclick:()=>{R.photos.splice(i,1);save();drawPh();W.draw();}},"×"))));};
  const file=h("input",{type:"file",accept:"image/*",multiple:true,class:"in"});
  file.addEventListener("change",async()=>{for(const f of [...file.files].slice(0,6-R.photos.length)){R.photos.push(await shrink(f,1100,.72));}file.value="";save();drawPh();W.draw();});
  const goals=inp(R,"goals",{tag:"textarea",placeholder:"هدف في كل سطر"}),out=inp(R,"out",{tag:"textarea"});
  const ed=[
    sec("1. نوع التقرير",true,seg(R,"tpl",Object.entries(RTPL).map(([k,v])=>[k,v[1]]),()=>{const x=RHINT[R.tpl];if(!R.goals||Object.values(RHINT).some(v=>v.goals===R.goals)){R.goals=x.goals;goals.value=x.goals;}if(!R.out||Object.values(RHINT).some(v=>v.out===R.out)){R.out=x.out;out.value=x.out;}save();})),
    sec("2. البيانات",true,fld("العنوان",inp(R,"title",{placeholder:"مثال: معرض التجارب العلمية"})),h("div",{class:"row"},fld("التاريخ",inp(R,"date",{type:"date"})),fld("المكان",inp(R,"place",{}))),
      h("div",{class:"row"},fld("المنفِّذة",inp(R,"by",{placeholder:"اسمك"})),fld("الفئة المستهدفة",inp(R,"target",{placeholder:"طالبات الصف العاشر"})))),
    sec("3. الأهداف والوصف والنتائج",true,fld("الأهداف",goals),fld("وصف التنفيذ",inp(R,"desc",{tag:"textarea",placeholder:"ماذا حدث؟ بالترتيب وبجمل قصيرة"})),fld("النتائج والأثر",out)),
    sec("4. الصور (حتى 6)",true,file,ph,h("div",{class:"hint"},"تُصغَّر الصور تلقائيًا. تجنّبي صور وجوه الطالبات دون موافقة.")),
  ];
  if(!R.goals){R.goals=RHINT[R.tpl].goals;goals.value=R.goals;R.out=RHINT[R.tpl].out;out.value=R.out;}
  drawPh();
  W=work(ed,repSheets);
}
function shrink(f,max,q){return new Promise(res=>{const img=new Image();const u=URL.createObjectURL(f);img.onload=()=>{const k=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement("canvas");c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);c.getContext("2d").drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(u);res(c.toDataURL("image/jpeg",q));};img.onerror=()=>res("");img.src=u;});}
function repSheets(){const R=S.rp;const T=RTPL[R.tpl][0];
  const meta=h("div",{class:"meta"},...[["العنوان",R.title||"—"],["التاريخ",fmtD(R.date)],["المكان",R.place||"—"],["المنفِّذة",R.by||tName()||"—"]].map(([a,b])=>h("div",{},h("b",{},a),b)));
  const ul=t=>h("ul",{style:{margin:0,paddingRight:"5mm"}},...String(t||"").split(/\r?\n/).filter(s=>s.trim()).map(s=>h("li",{},s)));
  const P=R.photos.filter(Boolean),first=P.slice(0,P.length>4?2:P.length<=2?P.length:1),rest=P.slice(first.length);
  const grid=a=>a.length?h("div",{class:"rep-ph n"+Math.min(a.length,3)},...a.map(s=>h("img",{src:s,alt:""}))):null;
  const sig=h("div",{class:"sig"},h("div",{},"المنفِّذة",h("span",{},R.by||tName()||"............")),h("div",{}),h("div",{},"مديرة المدرسة",h("span",{},pName()||"............")));
  const p1=sheet("",head(),h("div",{class:"sh-t"},T),meta,R.target?h("div",{class:"box"},h("b",{},"الفئة المستهدفة: "),R.target):null,
    h("div",{class:"box"},h("h4",{},"الأهداف"),ul(R.goals)),h("div",{class:"box"},h("h4",{},"وصف التنفيذ"),h("div",{style:{whiteSpace:"pre-wrap"}},R.desc||"...")),
    h("div",{class:"box"},h("h4",{},"النتائج والأثر"),ul(R.out)),grid(first),rest.length?null:sig,foot());
  if(!rest.length)return[p1];
  return[p1,sheet("",head(),h("div",{class:"sh-t"},"الشواهد المصوّرة · "+(R.title||T)),grid(rest),sig,foot())];}

/* ================= settings ================= */
function settings(){
  const Sc=S.sch;let W;
  const logo=h("input",{type:"file",accept:"image/*",class:"in"});
  logo.addEventListener("change",async()=>{if(logo.files[0]){Sc.logo=await shrink(logo.files[0],300,.85);save();W.draw();}});
  const ed=[sec("بيانات تظهر في كل النماذج",true,
    fld("اسم المدرسة",inp(Sc,"school")),fld("الوزارة",inp(Sc,"min")),fld("المديرية",inp(Sc,"dir")),
    h("div",{class:"row"},fld("اسم مديرة المدرسة",inp(Sc,"principal",{placeholder:"لتوقيع النماذج"})),fld("اسم المعلّمة",inp(Sc,"teacher",{placeholder:"اسمك"}))),
    fld("العام الدراسي",inp(Sc,"year")),fld("شعار المدرسة (اختياري)",logo),
    Sc.logo?h("button",{class:"btn g sm",type:"button",onclick:()=>{Sc.logo="";save();route();}},"إزالة الشعار"):null,
    h("div",{class:"hint"},"تُحفظ على جوالك فقط."))];
  W=work(ed,()=>[sheet("",head(),h("div",{class:"sh-t"},"معاينة الترويسة"),h("div",{class:"box read"},h("p",{},"هكذا تظهر ترويسة النماذج وتوقيعاتها.")),h("div",{class:"sig"},h("div",{},"المعلّمة",h("span",{},tName()||"............")),h("div",{}),h("div",{},"مديرة المدرسة",h("span",{},pName()||"............"))),foot())]);
}

route();
})();
