/* صفّي: أسماء الطالبات · تقسيم الفرق · تقييم الحصة · سجلّ التقييم
   الأسماء محفوظة مشفّرة (AES-GCM) ولا تُفتح إلا برمز المعلّمة. التقييمات تُحفظ على الجهاز وتُرسل إلى جدول النتائج. */
(function(){
const CK="qatrana.sci.class.v1";
let C=Object.assign({teams:{},evals:{},extra:{},removed:{},queue:[]},lsGet(CK,{}));const saveC=()=>lsSet(CK,C);
let ROSTER=null,LOADING=null;
const CR=[["p","🙋","مشاركة",1],["a","✅","إجابة صحيحة",1],["t","🤝","عمل الفريق",1],["h","📘","الواجب",1],["b","⭐","انضباط",1],["w","⚠️","تنبيه",-1]];
const TEAMN=["ابن سينا","الخوارزمي","جابر بن حيّان","ابن الهيثم","البيروني","ماري كوري","الرازي","ابن النفيس"];
const TCOL=["#7A1F2E","#1d7f8c","#B8902A","#2f8f5b","#2563c9","#c2297a","#7a4fb5","#c98408"];
const b64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function unlock(pin){const r=await fetch("data/roster.enc.json",{cache:"no-store"});const j=await r.json();const enc=new TextEncoder();
  const base=await crypto.subtle.importKey("raw",enc.encode(pin),"PBKDF2",false,["deriveKey"]);
  const key=await crypto.subtle.deriveKey({name:"PBKDF2",salt:b64(j.salt),iterations:600000,hash:"SHA-256"},base,{name:"AES-GCM",length:256},false,["decrypt"]);
  const pt=await crypto.subtle.decrypt({name:"AES-GCM",iv:b64(j.iv)},key,b64(j.ct));return JSON.parse(new TextDecoder().decode(pt));}
function getPin(){try{return (typeof PIN!=="undefined"&&PIN)||sessionStorage.getItem("qatrana.sci.pin")||"";}catch(e){return "";}}
async function roster(){if(ROSTER)return ROSTER;const pin=getPin();if(!pin)return null;if(!LOADING)LOADING=unlock(pin).then(r=>ROSTER=r).catch(e=>{LOADING=null;throw e;});return LOADING;}
const clsKey=(g,s)=>g+"-"+s;const parse=k=>{const i=k.lastIndexOf("-");return [k.slice(0,i),k.slice(i+1)];};
function names(k){const [g,s]=parse(k);const base=((ROSTER&&ROSTER.classes[g+"|"+s])||[]).filter(n=>!(C.removed[k]||[]).includes(n));return base.concat(C.extra[k]||[]);}
const first=n=>n.split(" ").slice(0,2).join(" ");
const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");};
function needRoster(V,then){const pin=getPin();
  if(!pin){const inp=el("input",{type:"password",inputmode:"numeric",placeholder:"رمز المعلّمة",style:{maxWidth:"220px",textAlign:"center"}}),err=el("div",{class:"small",style:{color:"var(--bad)"}});
    const ok=()=>{const v=inp.value.trim();if(pinHash(v)!==CONFIG.T_HASH){err.textContent="الرمز غير صحيح.";return;}PIN=v;try{sessionStorage.setItem("qatrana.sci.pin",v);}catch(e){}render();};
    inp.addEventListener("keydown",e=>{if(e.key==="Enter")ok();});
    V.append(el("div",{class:"card",style:{textAlign:"center",marginTop:"16px"}},el("h3",{},"🔐 أسماء الطالبات محميّة"),el("p",{class:"muted"},"أدخلي رمز المعلّمة لفتح كشوف الأسماء على هذا الجهاز."),el("div",{class:"row",style:{justifyContent:"center"}},inp,el("button",{class:"btn",onclick:ok},"فتح")),err));return;}
  const w=el("div",{class:"card empty"},"🔓 جارٍ فتح كشوف الأسماء…");V.append(w);
  roster().then(()=>{w.remove();then();}).catch(()=>{w.textContent="تعذّر فتح كشوف الأسماء. تأكّدي من الاتصال بالإنترنت ثم أعيدي المحاولة.";});}

/* ---------- اختيار الشعبة ---------- */
route(/^#\/t\/class$/,needT(V=>{V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"صفّي"));
  V.append(el("div",{class:"hero"},el("div",{class:"orb"}),el("h1",{},"👥 صفّي"),el("p",{},"أسماء الطالبات · تقسيم الفرق · تقييم الحصة · سجلّ التقييم")));
  needRoster(V,()=>{const gr=el("div",{class:"grid g3",style:{marginTop:"16px"}});
    Object.keys(ROSTER.classes).sort((a,b)=>CONFIG.GRADES.indexOf(a.split("|")[0])-CONFIG.GRADES.indexOf(b.split("|")[0])||a.localeCompare(b,"ar")).forEach(k=>{const [g,s]=k.split("|"),ck=clsKey(g,s),n=names(ck).length,ev=Object.keys(C.evals[ck]||{}).length;
      gr.append(el("a",{class:"card tcard",href:"#/t/class/"+encodeURIComponent(ck)+"/eval"},el("span",{class:"ic"},"👩‍🎓"),el("div",{},el("h3",{},"الصف "+g+" · الشعبة "+s),el("p",{},n+" طالبة · "+ev+" حصة مقيّمة"))));});
    V.append(gr,el("p",{class:"muted small",style:{marginTop:"12px"}},"🔒 الأسماء محفوظة مشفّرة، ولا تظهر إلا بعد إدخال رمز المعلّمة. التقييمات تُحفظ على هذا الجهاز، ويمكنكِ إرسالها إلى جدول النتائج."),credit());});}));

/* ---------- صفحة الشعبة ---------- */
const CTABS=[["eval","✅ تقييم الحصة"],["teams","👥 الفرق"],["log","📊 سجلّ التقييم"],["list","📋 الأسماء"]];
route(/^#\/t\/class\/([^/]+)\/(\w+)$/,needT((V,ck,tab)=>{ck=decodeURIComponent(ck);const [g,s]=parse(ck);
  V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],["صفّي","#/t/class"],"الصف "+g+" · "+s));
  needRoster(V,()=>{const tb=el("div",{class:"tabs noprint",role:"tablist"});CTABS.forEach(([k,t])=>tb.append(el("button",{role:"tab","aria-selected":String(k===tab),onclick:()=>go("#/t/class/"+encodeURIComponent(ck)+"/"+k)},t)));
    V.append(el("div",{class:"lhead",style:{"--c":"#7A1F2E"}},el("div",{class:"en"},CONFIG.SCHOOL),el("h1",{},"الصف "+g+" · الشعبة "+s),el("div",{class:"idea"},names(ck).length+" طالبة")),tb);
    const P=el("div",{style:{marginTop:"12px"}});V.append(P);({eval:tEval,teams:tTeams,log:tLog,list:tList}[tab]||tEval)(P,ck,g,s);V.append(credit());});}));

/* ---------- الفرق ---------- */
function teamOf(ck,n){const T=C.teams[ck];if(!T)return -1;return T.list.findIndex(t=>t.includes(n));}
function totals(ck){const t={};Object.values(C.evals[ck]||{}).forEach(se=>Object.entries(se.st).forEach(([n,r])=>{t[n]=(t[n]||0)+score(r);}));return t;}
const score=r=>r.abs?0:CR.reduce((a,[k,,,w])=>a+(r.c[k]||0)*w,0);
function absentToday(ck){const se=Object.values(C.evals[ck]||{}).find(x=>x.date===today());return se?Object.keys(se.st).filter(n=>se.st[n].abs):[];}
function makeTeams(ck,n,mode){const ab=absentToday(ck);let L=names(ck).filter(x=>!ab.includes(x));const list=Array.from({length:n},()=>[]);
  if(mode==="bal"){const t=totals(ck);L=shuffle(L).sort((a,b)=>(t[b]||0)-(t[a]||0));L.forEach((x,i)=>{const r=Math.floor(i/n),j=i%n;list[r%2?n-1-j:j].push(x);});}
  else shuffle(L).forEach((x,i)=>list[i%n].push(x));
  C.teams[ck]={n,list,tn:(C.teams[ck]&&C.teams[ck].tn)||TEAMN.slice(),at:today()};saveC();}
function tTeams(P,ck){const T=C.teams[ck];let n=T?T.n:Math.min(4,Math.max(2,Math.round(names(ck).length/5)));let sel=null;
  const ns=el("select",{"aria-label":"عدد الفرق",onchange:e=>{n=+e.target.value;}},...[2,3,4,5,6,7,8].map(v=>el("option",{value:v,selected:v===n},v+" فرق")));
  P.append(el("div",{class:"tools noprint"},ns,el("button",{class:"btn sm",onclick:()=>{makeTeams(ck,n,"rnd");render();}},"🎲 توزيع عشوائي"),el("button",{class:"btn sm gold",onclick:()=>{makeTeams(ck,n,"bal");render();}},"⚖️ توزيع متوازن (حسب التقييم)"),
    T?el("button",{class:"btn sm ghost",onclick:()=>{document.body.classList.toggle("bigteams");}},"🖥️ عرض على الشاشة"):null,T?el("button",{class:"btn sm ghost",onclick:()=>print()},"🖨️ طباعة"):null));
  if(!T){P.append(el("div",{class:"card empty"},"اختاري عدد الفرق ثم اضغطي «توزيع عشوائي» أو «توزيع متوازن». الطالبات الغائبات اليوم لا يدخلن في التوزيع."));return;}
  P.append(el("p",{class:"muted small noprint"},"لنقل طالبة: اضغطي على اسمها ثم على الفريق الذي تريدينه. اضغطي على اسم الفريق لتغييره."));
  const gr=el("div",{class:"grid g3 teams"});
  T.list.forEach((mem,i)=>{const c=TCOL[i%TCOL.length];const card=el("section",{class:"card team",style:{"--c":c},onclick:e=>{if(sel&&!e.target.closest(".mem")&&!e.target.isContentEditable){T.list.forEach(t=>{const j=t.indexOf(sel);if(j>=0)t.splice(j,1);});mem.push(sel);sel=null;saveC();render();}}});
    const h=el("h3",{contenteditable:"true",spellcheck:"false"},"فريق "+(T.tn[i]||i+1));h.addEventListener("blur",()=>{T.tn[i]=h.textContent.replace(/^فريق\s*/,"").trim()||TEAMN[i];saveC();});
    card.append(el("div",{class:"row",style:{justifyContent:"space-between"}},h,el("span",{class:"tag"},mem.length)),el("div",{class:"mems"},...mem.map(x=>el("button",{class:"mem","aria-pressed":"false",onclick:e=>{e.stopPropagation();sel=sel===x?null:x;gr.querySelectorAll(".mem").forEach(b=>b.setAttribute("aria-pressed",String(b.textContent===first(sel||"")&&b.title===sel)));},title:x},first(x)))));
    gr.append(card);});
  P.append(gr);}

/* ---------- تقييم الحصة ---------- */
function session(ck,date,lid){C.evals[ck]=C.evals[ck]||{};const key=date+"|"+lid;let se=C.evals[ck][key];
  if(!se){se=C.evals[ck][key]={date,lesson:lid,st:{}};}names(ck).forEach(n=>{if(!se.st[n])se.st[n]={c:{},abs:false,note:""};});return se;}
function tEval(P,ck,g){const ls=allLessons(g);let date=lsGet("qatrana.sci.cl.date:"+ck,today());if(date!==today()&&!Object.keys(C.evals[ck]||{}).some(k=>k.startsWith(date)))date=today();
  let lid=lsGet("qatrana.sci.cl.lid:"+ck,ls[0]&&ls[0].id);if(!ls.find(l=>l.id===lid))lid=ls[0]&&ls[0].id;let minus=false;
  if(!lid){P.append(el("div",{class:"card empty"},"لا توجد دروس لهذا الصف بعد."));return;}
  const se=session(ck,date,lid);saveC();
  const di=el("input",{type:"date",value:date,onchange:e=>{lsSet("qatrana.sci.cl.date:"+ck,e.target.value);render();}});
  const lsSel=el("select",{"aria-label":"الدرس",onchange:e=>{lsSet("qatrana.sci.cl.lid:"+ck,e.target.value);render();}},...ls.map(l=>el("option",{value:l.id,selected:l.id===lid},subjOf(l).short+" · "+l.title)));
  const mb=el("button",{class:"btn sm ghost","aria-pressed":"false",onclick:()=>{minus=!minus;mb.setAttribute("aria-pressed",String(minus));mb.textContent=minus?"➖ وضع الإنقاص مفعّل":"➖ إنقاص";list.classList.toggle("minus",minus);}},"➖ إنقاص");
  P.append(el("div",{class:"tools noprint"},el("label",{class:"small"},"تاريخ الحصة ",di),lsSel,mb));
  const T=C.teams[ck];
  if(T){const tbar=el("div",{class:"row teamq noprint"},el("b",{class:"small"},"نقطة لفريق كامل: "));T.list.forEach((mem,i)=>tbar.append(el("button",{class:"chip",style:{borderColor:TCOL[i%8]},onclick:()=>{mem.forEach(n=>{const r=se.st[n];if(r&&!r.abs)r.c.t=Math.max(0,(r.c.t||0)+(minus?-1:1));});saveC();draw();toast((minus?"−1 ":"+1 ")+"لفريق "+(T.tn[i]||i+1));}},"🤝 "+(T.tn[i]||i+1))));P.append(tbar);}
  const legend=el("div",{class:"row small muted noprint",style:{gap:"10px",margin:"6px 0"}},...CR.map(([k,ic,t])=>el("span",{},ic+" "+t)),el("span",{},"🚫 غياب"),el("span",{},"✏️ ملاحظة"));
  const list=el("div",{class:"evlist"});P.append(legend,list);
  const sum=el("div",{class:"card",style:{marginTop:"12px"}});P.append(sum);
  function draw(){list.innerHTML="";const tt=totals(ck);
    names(ck).forEach((n,idx)=>{const r=se.st[n];const ti=teamOf(ck,n);const row=el("div",{class:"evrow"+(r.abs?" abs":"")});
      row.append(el("span",{class:"num"},idx+1),el("div",{class:"nm"},el("b",{},first(n)),el("small",{},n.split(" ").slice(2).join(" ")+(ti>=0?" · فريق "+(T.tn[ti]||ti+1):""))));
      const btns=el("div",{class:"crit"});CR.forEach(([k,ic,t,w])=>{const v=r.c[k]||0;btns.append(el("button",{class:"cb"+(w<0?" neg":"")+(v?" on":""),title:t,"aria-label":t+" "+v,disabled:r.abs,onclick:()=>{r.c[k]=Math.max(0,v+(minus?-1:1));saveC();draw();}},el("span",{},ic),v?el("i",{},v):null));});
      btns.append(el("button",{class:"cb"+(r.abs?" absb":""),title:"غياب",onclick:()=>{r.abs=!r.abs;saveC();draw();}},el("span",{},"🚫")),
        el("button",{class:"cb"+(r.note?" on":""),title:r.note||"ملاحظة",onclick:()=>{const x=prompt("ملاحظة عن "+first(n)+":",r.note||"");if(x!==null){r.note=x.trim();saveC();draw();}}},el("span",{},"✏️")));
      row.append(btns,el("span",{class:"pts"},r.abs?"غائبة":String(score(r))));list.append(row);});
    const pres=names(ck).filter(n=>!se.st[n].abs),tot=pres.reduce((a,n)=>a+score(se.st[n]),0);
    sum.innerHTML="";sum.append(el("div",{class:"row",style:{justifyContent:"space-between"}},el("div",{},el("b",{},"الحاضرات: "+pres.length+" من "+names(ck).length),el("div",{class:"small muted"},"مجموع نقاط الحصة: "+tot+(se.sent?" · أُرسلت إلى جدول النتائج ✓":""))),
      el("div",{class:"row"},el("button",{class:"btn sm",onclick:()=>send(ck,se)},"☁️ حفظ في جدول النتائج"),el("button",{class:"btn sm ghost",onclick:()=>{if(confirm("تصفير تقييم هذه الحصة؟")){delete C.evals[ck][se.date+"|"+se.lesson];saveC();render();}}},"🗑️ تصفير الحصة"))));}
  draw();}
function send(ck,se){const [g,s]=parse(ck);const l=findLesson(se.lesson);if(se.sent&&!confirm("أُرسل تقييم هذه الحصة سابقًا. إرساله مرّة أخرى؟"))return;
  Object.entries(se.st).forEach(([n,r])=>{const sc=score(r);C.queue.push({name:n,section:s,grade:CONFIG.SUBJ+" "+g,at:new Date(se.date+"T10:00:00").toISOString(),unit:l?l.unit.title:"",activity:"تقييم صفّي",activityTitle:(l?l.title:"")+" · "+se.date,score:Math.max(0,sc),total:Math.max(10,sc),passed:false,skills:Object.assign({},r.c,r.abs?{غياب:1}:{},r.note?{ملاحظة:r.note}:{})});});
  se.sent=new Date().toISOString();saveC();flushC().then(ok=>{toast(ok?"تم الإرسال إلى جدول النتائج ✓":"سيُرسل التقييم تلقائيًّا عند توفّر الإنترنت");render();});}
async function flushC(){if(!CONFIG.SCRIPT_URL||!C.queue.length)return true;if(!navigator.onLine)return false;
  try{while(C.queue.length){const b=C.queue.slice(0,40);await fetch(CONFIG.SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({rows:b})});C.queue=C.queue.slice(b.length);saveC();}return true;}catch(e){return false;}}
addEventListener("online",flushC);addEventListener("hashchange",()=>document.body.classList.remove("bigteams"));

/* ---------- سجلّ التقييم ---------- */
function tLog(P,ck,g,s){const ses=Object.values(C.evals[ck]||{}).sort((a,b)=>a.date.localeCompare(b.date));
  if(!ses.length){P.append(el("div",{class:"card empty"},"لا توجد حصص مقيّمة بعد. ابدئي من تبويب «تقييم الحصة»."));return;}
  const rows=names(ck).map(n=>{const r={n,pres:0,abs:0,c:{},tot:0,notes:[]};ses.forEach(se=>{const x=se.st[n];if(!x)return;if(x.abs){r.abs++;return;}r.pres++;CR.forEach(([k])=>r.c[k]=(r.c[k]||0)+(x.c[k]||0));r.tot+=score(x);if(x.note)r.notes.push(se.date+": "+x.note);});r.avg=r.pres?r.tot/r.pres:0;return r;});
  let sortBy="tot";const box=el("div");
  P.append(el("div",{class:"tools noprint"},el("select",{onchange:e=>{sortBy=e.target.value;draw();}},el("option",{value:"tot"},"ترتيب حسب المجموع"),el("option",{value:"n"},"ترتيب حسب الكشف"),el("option",{value:"abs"},"ترتيب حسب الغياب")),
    el("button",{class:"btn sm ghost",onclick:()=>print()},"🖨️ طباعة"),el("button",{class:"btn sm gold",onclick:()=>csv(ck,rows,ses)},"⬇️ تنزيل Excel")),box);
  function draw(){box.innerHTML="";const R=rows.slice();if(sortBy==="tot")R.sort((a,b)=>b.tot-a.tot);else if(sortBy==="abs")R.sort((a,b)=>b.abs-a.abs);
    const paper=el("div",{class:"paper"});paper.append(paperHead("العلوم",g),el("h2",{style:{textAlign:"center",margin:"8px 0"}},"سجلّ تقييم الطالبات الصفّي"),el("p",{class:"small"},"الشعبة "+s+" · عدد الحصص المقيّمة: "+ses.length+" · من "+ses[0].date+" إلى "+ses[ses.length-1].date));
    const tb=el("table",{class:"tbl"});tb.append(el("thead",{},el("tr",{},el("th",{},"#"),el("th",{},"اسم الطالبة"),el("th",{},"حضور"),el("th",{},"غياب"),...CR.map(([,ic,t])=>el("th",{title:t},ic+" "+t)),el("th",{},"المجموع"),el("th",{},"المعدّل/حصة"),el("th",{},"ملاحظات"))));
    const body=el("tbody");R.forEach((r,i)=>body.append(el("tr",{},el("td",{},i+1),el("td",{style:{textAlign:"right",whiteSpace:"nowrap"}},r.n),el("td",{},r.pres),el("td",{},r.abs),...CR.map(([k])=>el("td",{},r.c[k]||0)),el("td",{},el("b",{},r.tot)),el("td",{},r.avg.toFixed(1)),el("td",{class:"small",style:{textAlign:"right"}},r.notes.join(" · ")))));
    tb.append(body);paper.append(el("div",{style:{overflowX:"auto"}},tb));
    const sl=el("div",{class:"noprint",style:{marginTop:"14px"}},el("h3",{},"الحصص المقيّمة"));ses.slice().reverse().forEach(se=>{const l=findLesson(se.lesson);const p=Object.values(se.st).filter(x=>!x.abs).length;
      sl.append(el("div",{class:"row",style:{justifyContent:"space-between",borderBottom:"1px solid var(--line)",padding:"6px 0"}},el("span",{},se.date+" · "+(l?l.title:"")+" · حاضرات "+p+(se.sent?" · ☁️":"")),
        el("span",{class:"row"},el("button",{class:"btn sm ghost",onclick:()=>{lsSet("qatrana.sci.cl.date:"+ck,se.date);lsSet("qatrana.sci.cl.lid:"+ck,se.lesson);go("#/t/class/"+encodeURIComponent(ck)+"/eval");}},"فتح"),
          el("button",{class:"btn sm ghost",onclick:()=>{if(confirm("حذف تقييم حصة "+se.date+"؟")){delete C.evals[ck][se.date+"|"+se.lesson];saveC();render();}}},"حذف"))));});
    box.append(paper,sl);}
  draw();}
function csv(ck,rows,ses){const [g,s]=parse(ck);const H=["#","اسم الطالبة","حضور","غياب",...CR.map(x=>x[2]),"المجموع","المعدّل","ملاحظات"];
  const q=v=>'"'+String(v).replace(/"/g,'""')+'"';const L=[H.map(q).join(",")];rows.forEach((r,i)=>L.push([i+1,r.n,r.pres,r.abs,...CR.map(([k])=>r.c[k]||0),r.tot,r.avg.toFixed(1),r.notes.join(" | ")].map(q).join(",")));
  const a=el("a",{href:URL.createObjectURL(new Blob(["﻿"+L.join("\r\n")],{type:"text/csv;charset=utf-8"})),download:"سجل-تقييم-"+g+"-"+s+".csv"});document.body.append(a);a.click();a.remove();}

/* ---------- الأسماء ---------- */
function tList(P,ck){const L=names(ck);const T=el("table",{class:"tbl"});T.append(el("thead",{},el("tr",{},el("th",{},"#"),el("th",{},"اسم الطالبة"),el("th",{class:"noprint"},""))));
  const b=el("tbody");L.forEach((n,i)=>b.append(el("tr",{},el("td",{},i+1),el("td",{style:{textAlign:"right"}},n),el("td",{class:"noprint"},el("button",{class:"btn sm ghost",onclick:()=>{if(!confirm("إخفاء "+n+" من كشف هذه الشعبة على هذا الجهاز؟"))return;if((C.extra[ck]||[]).includes(n))C.extra[ck]=C.extra[ck].filter(x=>x!==n);else (C.removed[ck]=C.removed[ck]||[]).push(n);saveC();render();}},"إخفاء")))));
  T.append(b);const inp=el("input",{placeholder:"اسم طالبة جديدة (منقولة إلى الشعبة)",style:{flex:1}});
  P.append(el("div",{class:"tools noprint"},inp,el("button",{class:"btn sm",onclick:()=>{const v=inp.value.trim().replace(/\s+/g," ");if(v.split(" ").length<2){toast("اكتبي الاسم الثلاثي على الأقل");return;}(C.extra[ck]=C.extra[ck]||[]).push(v);saveC();render();}},"➕ إضافة"),el("button",{class:"btn sm ghost",onclick:()=>print()},"🖨️ طباعة الكشف")),
    el("div",{class:"paper"},paperHead("العلوم",parse(ck)[0]),el("h2",{style:{textAlign:"center",margin:"8px 0"}},"كشف أسماء الطالبات"),el("p",{class:"small"},"الشعبة "+parse(ck)[1]+" · العدد "+L.length),T));}
})();
