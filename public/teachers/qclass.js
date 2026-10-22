/* «صفّي» — وحدة مشتركة لمنصّات مدرسة القطرانة (العلوم · لغتي · رياضيّاتي)
   أسماء الطالبات مشفّرة (AES-GCM)، ولكل معلّمة رمز سرّي خاص يفتح مبحثها فقط.
   تقسيم الفرق · تقييم الحصة · سجلّ التقييم · كشف الأسماء.  تصميمُ المنصّة وتنفيذُها: نوال بني عطية */
var QClass=(function(){
const LS="qclass.v1",SS="qclass.ses";
const CR=[["p","🙋","مشاركة",1],["a","✅","إجابة صحيحة",1],["t","🤝","عمل الفريق",1],["h","📘","الواجب",1],["b","⭐","انضباط",1],["w","⚠️","تنبيه",-1]];
const TEAMN=["ابن سينا","الخوارزمي","جابر بن حيّان","ابن الهيثم","البيروني","ماري كوري","الرازي","ابن النفيس"];
const TCOL=["#7A1F2E","#1d7f8c","#B8902A","#2f8f5b","#2563c9","#c2297a","#7a4fb5","#c98408"];
const GORD=["السابع","الثامن","التاسع","العاشر","الحادي عشر"];
let OPT=null,ROOT=null,R=null,TEA=null,view={v:"home"},minus=false,sel=null;
let C;function load(){C=Object.assign({teams:{},evals:{},extra:{},removed:{},queue:[]},(()=>{try{return JSON.parse(localStorage.getItem(LS))||{};}catch(e){return {};}})());}
const save=()=>{try{localStorage.setItem(LS,JSON.stringify(C));}catch(e){}};
function h(t,a={},...k){const e=document.createElement(t);for(const[x,y]of Object.entries(a)){if(y==null||y===false)continue;if(x==="class")e.className=y;else if(x==="style"&&typeof y==="object")Object.assign(e.style,y);else if(x.startsWith("on"))e.addEventListener(x.slice(2),y);else e.setAttribute(x,y===true?"":y);}for(const c of k.flat())if(c!=null&&c!==false)e.append(c.nodeType?c:document.createTextNode(c));return e;}
function toast(m){let t=document.querySelector(".qc-toast");if(!t){t=h("div",{class:"qc-toast",role:"status"});document.body.append(t);}t.textContent=m;t.classList.add("on");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("on"),2200);}
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");};
const first=n=>n.split(" ").slice(0,2).join(" ");
const b64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function derive(code,salt,it){const base=await crypto.subtle.importKey("raw",new TextEncoder().encode(code),"PBKDF2",false,["deriveKey"]);
  return crypto.subtle.deriveKey({name:"PBKDF2",salt:b64(salt),iterations:it,hash:"SHA-256"},base,{name:"AES-GCM",length:256},false,["decrypt"]);}
let FILE=null;async function file(url){if(!FILE){const r=await fetch(url||OPT.rosterUrl,{cache:"no-store"});FILE=await r.json();}return FILE;}
async function unlock(tid,code){if(!OPT)OPT={};const F=await file();const k=F.keys[tid];if(!k)throw 0;const kek=await derive(code,k.salt,F.it);
  const raw=await crypto.subtle.decrypt({name:"AES-GCM",iv:b64(k.iv)},kek,b64(k.ct));const mk=await crypto.subtle.importKey("raw",raw,"AES-GCM",false,["decrypt"]);
  const pt=await crypto.subtle.decrypt({name:"AES-GCM",iv:b64(F.data.iv)},mk,b64(F.data.ct));const D=JSON.parse(new TextDecoder().decode(pt));
  TEA=Object.assign({id:tid},D.teachers[tid]);R=D;}
/* المباحث المتاحة لهذه المعلّمة في هذه المنصّة */
const mySubj=()=>OPT.subjects.filter(s=>TEA&&(TEA.subj.includes("*")||TEA.subj.includes(s.k)));
const subjBy=k=>OPT.subjects.find(s=>s.k===k);
function classesFor(sk){const s=subjBy(sk);return Object.keys(R.classes).filter(k=>s.grades.includes(k.split("|")[0])).sort((a,b)=>GORD.indexOf(a.split("|")[0])-GORD.indexOf(b.split("|")[0])||a.localeCompare(b,"ar"));}
function names(ck){const base=(R.classes[ck]||[]).filter(n=>!(C.removed[ck]||[]).includes(n));return base.concat(C.extra[ck]||[]);}
const K=()=>view.s+"#"+view.c;
const score=r=>r.abs?0:CR.reduce((a,[k,,,w])=>a+(r.c[k]||0)*w,0);
function totals(){const t={};Object.values(C.evals[K()]||{}).forEach(se=>Object.entries(se.st).forEach(([n,r])=>{t[n]=(t[n]||0)+score(r);}));return t;}
function teamOf(n){const T=C.teams[K()];return T?T.list.findIndex(t=>t.includes(n)):-1;}
function go(v){view=Object.assign({},view,v);sel=null;draw();try{ROOT.scrollIntoView({block:"start"});}catch(e){}}

/* ---------- الواجهة ---------- */
function draw(){ROOT.innerHTML="";ROOT.className="qc";if(!TEA){login();return;}
  const bar=h("div",{class:"qc-top"},h("div",{},h("b",{},"👥 صفّي"),h("small",{}," · "+TEA.label)),h("div",{class:"qc-row"},
    view.v!=="home"?h("button",{class:"qc-btn g",onclick:()=>go({v:"home"})},"→ الشعب"):null,h("button",{class:"qc-btn g",onclick:logout},"🔒 خروج")));
  ROOT.append(bar);if(view.v==="home")home();else klass();}
function login(){const F=FILE;const sel=h("select",{class:"qc-in","aria-label":"المعلّمة"});
  const ok=Object.entries(F.keys).filter(([id,k])=>k.subj.includes("*")||k.subj.some(s=>OPT.subjects.find(x=>x.k===s)));ok.forEach(([id,k])=>sel.append(h("option",{value:id},k.label)));
  try{const last=localStorage.getItem("qclass.last");if(last&&F.keys[last])sel.value=last;}catch(e){}
  const pin=h("input",{class:"qc-in",type:"password",inputmode:"numeric",autocomplete:"off",placeholder:"رمزكِ السرّي"}),err=h("div",{class:"qc-err","aria-live":"polite"});
  const enter=async()=>{const v=pin.value.trim();if(!v)return;err.textContent="⏳ جارٍ الفتح…";try{await unlock(sel.value,v);try{localStorage.setItem("qclass.last",sel.value);sessionStorage.setItem(SS,JSON.stringify([sel.value,v]));}catch(e){}view={v:"home"};draw();}catch(e){err.textContent="الرمز غير صحيح لهذه المعلّمة.";pin.value="";}};
  pin.addEventListener("keydown",e=>{if(e.key==="Enter")enter();});
  ROOT.append(h("div",{class:"qc-card qc-login"},h("div",{class:"qc-big"},"👥"),h("h2",{},"صفّي: الفرق وتقييم الحصة"),h("p",{class:"qc-mut"},"لكل معلّمة رمز سرّي خاص يفتح شعب مبحثها فقط. أسماء الطالبات محفوظة مشفّرة."),
    h("label",{class:"qc-lbl"},"المعلّمة",sel),h("label",{class:"qc-lbl"},"الرمز السرّي",pin),h("button",{class:"qc-btn",onclick:enter},"🔓 فتح"),err));}
function logout(){TEA=null;R=null;try{sessionStorage.removeItem(SS);}catch(e){}view={v:"home"};if(OPT&&OPT.onLogout)OPT.onLogout();else draw();}
function home(){const S=mySubj();if(!S.length){ROOT.append(h("div",{class:"qc-card qc-mut"},"لا يوجد لهذا الرمز مبحث في هذه المنصّة."));return;}
  S.forEach(s=>{const gr=h("div",{class:"qc-grid"});classesFor(s.k).forEach(ck=>{const [g,sc]=ck.split("|"),ev=Object.keys(C.evals[s.k+"#"+ck]||{}).length;
      gr.append(h("button",{class:"qc-card qc-cls",style:{"--c":s.color||"#7A1F2E"},onclick:()=>go({v:"class",s:s.k,c:ck,t:"eval"})},h("b",{},"الصف "+g+" · الشعبة "+sc),h("small",{},names(ck).length+" طالبة · "+ev+" حصة مقيّمة")));});
    ROOT.append(h("h3",{class:"qc-h"},s.name),gr);});
  ROOT.append(h("p",{class:"qc-mut qc-small"},"🔒 التقييمات تُحفظ على هذا الجهاز، ويمكنكِ إرسالها إلى جدول النتائج من صفحة الحصة."));}
const TABS=[["eval","✅ تقييم الحصة"],["teams","👥 الفرق"],["log","📊 السجلّ"],["list","📋 الأسماء"]];
function klass(){const [g,sc]=view.c.split("|"),s=subjBy(view.s);
  ROOT.append(h("div",{class:"qc-head",style:{"--c":s.color||"#7A1F2E"}},h("small",{},s.name),h("h2",{},"الصف "+g+" · الشعبة "+sc),h("small",{},names(view.c).length+" طالبة")));
  const tb=h("div",{class:"qc-tabs",role:"tablist"});TABS.forEach(([k,t])=>tb.append(h("button",{role:"tab","aria-selected":String(k===view.t),onclick:()=>go({t:k})},t)));ROOT.append(tb);
  const P=h("div");ROOT.append(P);({eval:tEval,teams:tTeams,log:tLog,list:tList}[view.t]||tEval)(P,g,sc,s);}

/* ---------- تقييم الحصة ---------- */
function session(date,lid,ltitle){const k=K();C.evals[k]=C.evals[k]||{};const key=date+"|"+lid;let se=C.evals[k][key];if(!se)se=C.evals[k][key]={date,lesson:lid,title:ltitle,st:{}};
  names(view.c).forEach(n=>{if(!se.st[n])se.st[n]={c:{},abs:false,note:""};});return se;}
function tEval(P,g,sc,s){const ls=(s.lessons&&s.lessons(g))||[];const pk="qclass.pick."+K();let pick={};try{pick=JSON.parse(localStorage.getItem(pk))||{};}catch(e){}
  let date=pick.date||today();let lid=pick.lid||(ls[0]&&ls[0].id)||"general";if(ls.length&&!ls.find(l=>l.id===lid))lid=ls[0].id;
  const setP=()=>{try{localStorage.setItem(pk,JSON.stringify({date,lid}));}catch(e){}};
  const lt=(ls.find(l=>l.id===lid)||{t:"حصة عامة"}).t;const se=session(date,lid,lt);save();
  const di=h("input",{class:"qc-in",type:"date",value:date,onchange:e=>{date=e.target.value;setP();draw();}});
  const lsel=h("select",{class:"qc-in","aria-label":"الدرس",onchange:e=>{lid=e.target.value;setP();draw();}},...(ls.length?ls:[{id:"general",t:"حصة عامة"}]).map(l=>h("option",{value:l.id,selected:l.id===lid},l.t)));
  const mb=h("button",{class:"qc-btn g","aria-pressed":String(minus),onclick:()=>{minus=!minus;draw();}},minus?"➖ وضع الإنقاص مفعّل":"➖ إنقاص");
  P.append(h("div",{class:"qc-tools"},h("label",{class:"qc-small"},"تاريخ الحصة ",di),lsel,mb));
  const T=C.teams[K()];if(T){const tq=h("div",{class:"qc-row qc-teamq"},h("b",{class:"qc-small"},"نقطة لفريق كامل: "));T.list.forEach((mem,i)=>tq.append(h("button",{class:"qc-chip",style:{borderColor:TCOL[i%8]},onclick:()=>{mem.forEach(n=>{const r=se.st[n];if(r&&!r.abs)r.c.t=Math.max(0,(r.c.t||0)+(minus?-1:1));});save();draw();toast((minus?"−1 ":"+1 ")+"لفريق "+(T.tn[i]||i+1));}},"🤝 "+(T.tn[i]||i+1))));P.append(tq);}
  P.append(h("div",{class:"qc-row qc-small qc-mut",style:{gap:"10px",margin:"6px 0"}},...CR.map(([k,ic,t])=>h("span",{},ic+" "+t)),h("span",{},"🚫 غياب"),h("span",{},"✏️ ملاحظة")));
  const list=h("div",{class:"qc-ev"+(minus?" minus":"")});P.append(list);
  names(view.c).forEach((n,i)=>{const r=se.st[n],ti=teamOf(n);const row=h("div",{class:"qc-evr"+(r.abs?" abs":"")});
    row.append(h("span",{class:"qc-num"},i+1),h("div",{class:"qc-nm"},h("b",{},first(n)),h("small",{},n.split(" ").slice(2).join(" ")+(ti>=0?" · فريق "+(T.tn[ti]||ti+1):""))));
    const b=h("div",{class:"qc-crit"});CR.forEach(([k,ic,t,w])=>{const v=r.c[k]||0;b.append(h("button",{class:"qc-cb"+(w<0?" neg":"")+(v?" on":""),title:t,"aria-label":t+" "+v,disabled:r.abs,onclick:()=>{r.c[k]=Math.max(0,v+(minus?-1:1));save();draw();}},h("span",{},ic),v?h("i",{},v):null));});
    b.append(h("button",{class:"qc-cb"+(r.abs?" absb":""),title:"غياب",onclick:()=>{r.abs=!r.abs;save();draw();}},h("span",{},"🚫")),h("button",{class:"qc-cb"+(r.note?" on":""),title:r.note||"ملاحظة",onclick:()=>{const x=prompt("ملاحظة عن "+first(n)+":",r.note||"");if(x!==null){r.note=x.trim();save();draw();}}},h("span",{},"✏️")));
    row.append(b,h("span",{class:"qc-pts"},r.abs?"غائبة":String(score(r))));list.append(row);});
  const pres=names(view.c).filter(n=>!se.st[n].abs),tot=pres.reduce((a,n)=>a+score(se.st[n]),0);
  P.append(h("div",{class:"qc-card qc-row",style:{justifyContent:"space-between",marginTop:"12px"}},h("div",{},h("b",{},"الحاضرات: "+pres.length+" من "+names(view.c).length),h("div",{class:"qc-small qc-mut"},"مجموع نقاط الحصة: "+tot+(se.sent?" · أُرسلت إلى جدول النتائج ✓":""))),
    h("div",{class:"qc-row"},h("button",{class:"qc-btn",onclick:()=>send(se,g,sc,s)},"☁️ حفظ في جدول النتائج"),h("button",{class:"qc-btn g",onclick:()=>{if(confirm("تصفير تقييم هذه الحصة؟")){delete C.evals[K()][se.date+"|"+se.lesson];save();draw();}}},"🗑️ تصفير"))));}
function send(se,g,sc,s){if(!OPT.scriptUrl){toast("لم يُربط جدول النتائج بعد");return;}if(se.sent&&!confirm("أُرسل تقييم هذه الحصة سابقًا. إرساله مرّة أخرى؟"))return;
  Object.entries(se.st).forEach(([n,r])=>{const sco=score(r);C.queue.push({name:n,section:sc,grade:s.name+" "+g,at:new Date(se.date+"T10:00:00").toISOString(),unit:s.name,activity:"تقييم صفّي",activityTitle:(se.title||"")+" · "+se.date+" · "+TEA.label,score:Math.max(0,sco),total:Math.max(10,sco),passed:false,skills:Object.assign({},r.c,r.abs?{غياب:1}:{},r.note?{ملاحظة:r.note}:{})});});
  se.sent=new Date().toISOString();save();flush().then(ok=>{toast(ok?"تم الإرسال إلى جدول النتائج ✓":"سيُرسل تلقائيًّا عند توفّر الإنترنت");draw();});}
async function flush(){if(!OPT||!OPT.scriptUrl||!C.queue.length)return true;if(!navigator.onLine)return false;
  try{while(C.queue.length){const b=C.queue.slice(0,40);await fetch(OPT.scriptUrl,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({rows:b})});C.queue=C.queue.slice(b.length);save();}return true;}catch(e){return false;}}

/* ---------- الفرق ---------- */
function absentToday(){const se=Object.values(C.evals[K()]||{}).find(x=>x.date===today());return se?Object.keys(se.st).filter(n=>se.st[n].abs):[];}
function makeTeams(n,mode){const ab=absentToday();let L=names(view.c).filter(x=>!ab.includes(x));const list=Array.from({length:n},()=>[]);
  if(mode==="bal"){const t=totals();L=shuffle(L).sort((a,b)=>(t[b]||0)-(t[a]||0));L.forEach((x,i)=>{const r=Math.floor(i/n),j=i%n;list[r%2?n-1-j:j].push(x);});}else shuffle(L).forEach((x,i)=>list[i%n].push(x));
  C.teams[K()]={n,list,tn:(C.teams[K()]&&C.teams[K()].tn)||TEAMN.slice(),at:today()};save();}
function tTeams(P){const T=C.teams[K()];let n=T?T.n:Math.min(4,Math.max(2,Math.round(names(view.c).length/5)));
  const ns=h("select",{class:"qc-in","aria-label":"عدد الفرق",onchange:e=>{n=+e.target.value;}},...[2,3,4,5,6,7,8].map(v=>h("option",{value:v,selected:v===n},v+" فرق")));
  P.append(h("div",{class:"qc-tools"},ns,h("button",{class:"qc-btn",onclick:()=>{makeTeams(n,"rnd");draw();}},"🎲 توزيع عشوائي"),h("button",{class:"qc-btn gold",onclick:()=>{makeTeams(n,"bal");draw();}},"⚖️ توزيع متوازن"),
    T?h("button",{class:"qc-btn g",onclick:()=>document.body.classList.toggle("qc-bigteams")},"🖥️ عرض على الشاشة"):null));
  if(!T){P.append(h("div",{class:"qc-card qc-mut"},"اختاري عدد الفرق ثم «توزيع عشوائي» أو «توزيع متوازن» (حسب مجموع التقييمات). الغائبات اليوم لا يدخلن في التوزيع."));return;}
  P.append(h("p",{class:"qc-small qc-mut"},"لنقل طالبة: اضغطي على اسمها ثم على الفريق. اضغطي على اسم الفريق لتغييره."));
  const gr=h("div",{class:"qc-grid qc-teams"});
  T.list.forEach((mem,i)=>{const card=h("section",{class:"qc-card qc-team",style:{"--c":TCOL[i%8]},onclick:e=>{if(sel&&!e.target.closest(".qc-mem")&&!e.target.isContentEditable){T.list.forEach(t=>{const j=t.indexOf(sel);if(j>=0)t.splice(j,1);});mem.push(sel);sel=null;save();draw();}}});
    const hh=h("h3",{contenteditable:"true",spellcheck:"false"},"فريق "+(T.tn[i]||i+1));hh.addEventListener("blur",()=>{T.tn[i]=hh.textContent.replace(/^فريق\s*/,"").trim()||TEAMN[i];save();});
    card.append(h("div",{class:"qc-row",style:{justifyContent:"space-between"}},hh,h("span",{class:"qc-tag"},mem.length)),h("div",{class:"qc-mems"},...mem.map(x=>h("button",{class:"qc-mem","aria-pressed":String(sel===x),title:x,onclick:e=>{e.stopPropagation();sel=sel===x?null:x;gr.querySelectorAll(".qc-mem").forEach(b=>b.setAttribute("aria-pressed",String(b.title===sel)));}},first(x)))));gr.append(card);});
  P.append(gr);}

/* ---------- السجلّ ---------- */
function tLog(P,g,sc,s){const ses=Object.values(C.evals[K()]||{}).sort((a,b)=>a.date.localeCompare(b.date));
  if(!ses.length){P.append(h("div",{class:"qc-card qc-mut"},"لا توجد حصص مقيّمة بعد."));return;}
  const rows=names(view.c).map(n=>{const r={n,pres:0,abs:0,c:{},tot:0,notes:[]};ses.forEach(se=>{const x=se.st[n];if(!x)return;if(x.abs){r.abs++;return;}r.pres++;CR.forEach(([k])=>r.c[k]=(r.c[k]||0)+(x.c[k]||0));r.tot+=score(x);if(x.note)r.notes.push(se.date+": "+x.note);});r.avg=r.pres?r.tot/r.pres:0;return r;});
  let sortBy=view.sort||"tot";const R2=rows.slice();if(sortBy==="tot")R2.sort((a,b)=>b.tot-a.tot);else if(sortBy==="abs")R2.sort((a,b)=>b.abs-a.abs);
  P.append(h("div",{class:"qc-tools qc-noprint"},h("select",{class:"qc-in",onchange:e=>go({sort:e.target.value})},...[["tot","ترتيب حسب المجموع"],["n","ترتيب حسب الكشف"],["abs","ترتيب حسب الغياب"]].map(([v,t])=>h("option",{value:v,selected:v===sortBy},t))),
    h("button",{class:"qc-btn g",onclick:()=>print()},"🖨️ طباعة"),h("button",{class:"qc-btn gold",onclick:()=>csv(rows,g,sc,s)},"⬇️ تنزيل Excel")));
  const tb=h("table",{class:"qc-tbl"});tb.append(h("thead",{},h("tr",{},h("th",{},"#"),h("th",{},"اسم الطالبة"),h("th",{},"حضور"),h("th",{},"غياب"),...CR.map(([,ic,t])=>h("th",{title:t},ic+" "+t)),h("th",{},"المجموع"),h("th",{},"المعدّل"),h("th",{},"ملاحظات"))));
  const bd=h("tbody");R2.forEach((r,i)=>bd.append(h("tr",{},h("td",{},i+1),h("td",{style:{textAlign:"right",whiteSpace:"nowrap"}},r.n),h("td",{},r.pres),h("td",{},r.abs),...CR.map(([k])=>h("td",{},r.c[k]||0)),h("td",{},h("b",{},r.tot)),h("td",{},r.avg.toFixed(1)),h("td",{class:"qc-small",style:{textAlign:"right"}},r.notes.join(" · ")))));tb.append(bd);
  P.append(h("div",{class:"qc-card qc-print"},h("div",{class:"qc-ph"},h("b",{},OPT.school||""),h("div",{},"سجلّ تقييم الطالبات الصفّي — "+s.name),h("div",{class:"qc-small"},"الصف "+g+" · الشعبة "+sc+" · "+TEA.label+" · الحصص: "+ses.length+" ("+ses[0].date+" ← "+ses[ses.length-1].date+")")),h("div",{style:{overflowX:"auto"}},tb)));
  const sl=h("div",{class:"qc-card qc-noprint"},h("h3",{},"الحصص المقيّمة"));ses.slice().reverse().forEach(se=>{const p=Object.values(se.st).filter(x=>!x.abs).length;
    sl.append(h("div",{class:"qc-row",style:{justifyContent:"space-between",borderBottom:"1px solid #e5d7cc",padding:"6px 0"}},h("span",{},se.date+" · "+(se.title||"")+" · حاضرات "+p+(se.sent?" · ☁️":"")),
      h("span",{class:"qc-row"},h("button",{class:"qc-btn g",onclick:()=>{try{localStorage.setItem("qclass.pick."+K(),JSON.stringify({date:se.date,lid:se.lesson}));}catch(e){}go({t:"eval"});}},"فتح"),
        h("button",{class:"qc-btn g",onclick:()=>{if(confirm("حذف تقييم حصة "+se.date+"؟")){delete C.evals[K()][se.date+"|"+se.lesson];save();draw();}}},"حذف"))));});P.append(sl);}
function csv(rows,g,sc,s){const H=["#","اسم الطالبة","حضور","غياب",...CR.map(x=>x[2]),"المجموع","المعدّل","ملاحظات"];const q=v=>'"'+String(v).replace(/"/g,'""')+'"';
  const L=[H.map(q).join(",")];rows.forEach((r,i)=>L.push([i+1,r.n,r.pres,r.abs,...CR.map(([k])=>r.c[k]||0),r.tot,r.avg.toFixed(1),r.notes.join(" | ")].map(q).join(",")));
  const a=h("a",{href:URL.createObjectURL(new Blob(["﻿"+L.join("\r\n")],{type:"text/csv;charset=utf-8"})),download:"سجل-تقييم-"+s.name+"-"+g+"-"+sc+".csv"});document.body.append(a);a.click();a.remove();}

/* ---------- الأسماء ---------- */
function tList(P,g,sc){const L=names(view.c),ck=view.c;const tb=h("table",{class:"qc-tbl"});tb.append(h("thead",{},h("tr",{},h("th",{},"#"),h("th",{},"اسم الطالبة"),h("th",{class:"qc-noprint"},""))));
  const bd=h("tbody");L.forEach((n,i)=>bd.append(h("tr",{},h("td",{},i+1),h("td",{style:{textAlign:"right"}},n),h("td",{class:"qc-noprint"},h("button",{class:"qc-btn g",onclick:()=>{if(!confirm("إخفاء "+n+" من الكشف على هذا الجهاز؟"))return;if((C.extra[ck]||[]).includes(n))C.extra[ck]=C.extra[ck].filter(x=>x!==n);else (C.removed[ck]=C.removed[ck]||[]).push(n);save();draw();}},"إخفاء")))));tb.append(bd);
  const inp=h("input",{class:"qc-in",placeholder:"اسم طالبة جديدة (منقولة إلى الشعبة)",style:{flex:"1"}});
  P.append(h("div",{class:"qc-tools qc-noprint"},inp,h("button",{class:"qc-btn",onclick:()=>{const v=inp.value.trim().replace(/\s+/g," ");if(v.split(" ").length<2){toast("اكتبي الاسم الثلاثي على الأقل");return;}(C.extra[ck]=C.extra[ck]||[]).push(v);save();draw();}},"➕ إضافة"),h("button",{class:"qc-btn g",onclick:()=>print()},"🖨️ طباعة")),
    h("div",{class:"qc-card qc-print"},h("div",{class:"qc-ph"},h("b",{},OPT.school||""),h("div",{},"كشف أسماء الطالبات"),h("div",{class:"qc-small"},"الصف "+g+" · الشعبة "+sc+" · العدد "+L.length)),tb));}

/* ---------- الأنماط ---------- */
const CSS=`.qc{--w:#7A1F2E;--g:#B8902A;--bg2:#fbf6f1;--ln:#e5d7cc;--ink:#2B1218;--mut:#76606A;color:var(--ink);font-family:inherit;text-align:right;direction:rtl}
.qc *{box-sizing:border-box}.qc-top{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px}
.qc-row{display:flex;gap:6px;flex-wrap:wrap;align-items:center}.qc-card{background:#fff;border:1px solid var(--ln);border-radius:16px;padding:14px;box-shadow:0 4px 16px rgba(60,20,30,.06)}
.qc-btn{font:inherit;font-weight:700;border:0;border-radius:12px;padding:8px 14px;min-height:42px;background:var(--w);color:#fff;cursor:pointer}.qc-btn.g{background:#f6ece6;color:var(--ink);border:1.5px solid var(--ln)}.qc-btn.gold{background:var(--g);color:#2b1a00}.qc-btn[aria-pressed=true]{outline:3px solid var(--g)}
.qc-in{font:inherit;border:1.5px solid var(--ln);border-radius:10px;padding:7px 9px;min-height:42px;background:#fff;color:var(--ink);max-width:100%}
.qc-login{max-width:440px;margin:10px auto;display:flex;flex-direction:column;gap:10px;text-align:center}.qc-login h2{margin:0}.qc-big{font-size:46px}.qc-lbl{display:flex;flex-direction:column;gap:4px;font-weight:700;text-align:right}
.qc-err{color:#c2410c;font-weight:700;min-height:1.4em}.qc-mut{color:var(--mut)}.qc-small{font-size:13px}.qc-h{margin:14px 0 8px}
.qc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}.qc-cls{font:inherit;text-align:right;cursor:pointer;border-inline-start:6px solid var(--c);display:flex;flex-direction:column;gap:4px}.qc-cls b{font-size:18px}.qc-cls small{color:var(--mut)}
.qc-head{background:linear-gradient(135deg,var(--c),#3a0f17);color:#fff;border-radius:18px;padding:14px 18px;margin-bottom:10px}.qc-head h2{margin:2px 0}.qc-head small{opacity:.85}
.qc-tabs{display:flex;gap:4px;background:#fff;border:1px solid var(--ln);border-radius:14px;padding:4px;margin-bottom:10px;overflow-x:auto}.qc-tabs button{font:inherit;font-weight:700;border:0;background:none;padding:8px 12px;border-radius:10px;cursor:pointer;white-space:nowrap;color:var(--ink)}.qc-tabs button[aria-selected=true]{background:var(--w);color:#fff}
.qc-tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px}
.qc-ev{display:flex;flex-direction:column;gap:6px}.qc-evr{display:grid;grid-template-columns:30px minmax(120px,1fr) auto 56px;gap:8px;align-items:center;background:#fff;border:1px solid var(--ln);border-radius:14px;padding:6px 10px}
.qc-num{color:var(--mut);font-weight:700;text-align:center}.qc-nm b{display:block;font-size:17px;line-height:1.3}.qc-nm small{color:var(--mut);font-size:12px}.qc-pts{font-weight:800;font-size:20px;color:var(--w);text-align:center}.qc-evr.abs{opacity:.55}
.qc-crit{display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end}.qc-cb{position:relative;min-width:44px;min-height:44px;border:1.5px solid var(--ln);border-radius:12px;background:#fff;font-size:20px;cursor:pointer;padding:0 6px}
.qc-cb.on{border-color:var(--g);background:#fbf1d6}.qc-cb.neg.on,.qc-cb.absb{border-color:#c2410c;background:#fdeee6}.qc-cb i{position:absolute;top:-7px;left:-7px;background:var(--w);color:#fff;font:700 12px/20px sans-serif;min-width:20px;height:20px;border-radius:10px;font-style:normal;text-align:center}.qc-cb:disabled{opacity:.35}.qc-ev.minus .qc-cb{border-style:dashed}
.qc-chip{font:inherit;border:2px solid;border-radius:999px;background:#fff;padding:5px 12px;cursor:pointer;color:var(--ink)}
.qc-team{border-top:6px solid var(--c)}.qc-team h3{color:var(--c);margin:0;outline:none}.qc-tag{background:#fbf1d6;border-radius:999px;padding:2px 10px;font-weight:700}
.qc-mems{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.qc-mem{font:inherit;font-weight:600;border:1.5px solid var(--ln);background:#f6ece6;border-radius:999px;padding:6px 12px;cursor:pointer;color:var(--ink)}.qc-mem[aria-pressed=true]{background:var(--w);color:#fff;border-color:var(--w)}
.qc-tbl{width:100%;border-collapse:collapse;font-size:14px}.qc-tbl th,.qc-tbl td{border:1px solid var(--ln);padding:5px 7px;text-align:center}.qc-tbl th{background:#f6ece6}
.qc-ph{text-align:center;margin-bottom:10px;border-bottom:2px solid var(--g);padding-bottom:8px}.qc-ph b{font-size:18px}
.qc-toast{position:fixed;bottom:18px;left:50%;transform:translateX(-50%) translateY(30px);opacity:0;background:#2B1218;color:#fff;padding:10px 18px;border-radius:999px;z-index:99;transition:.25s;font-weight:700;pointer-events:none}.qc-toast.on{opacity:1;transform:translateX(-50%)}
body.qc-bigteams .qc-mem{font-size:24px;padding:10px 18px}body.qc-bigteams .qc-team h3{font-size:30px}
@media (max-width:640px){.qc-evr{grid-template-columns:24px 1fr 46px}.qc-evr .qc-crit{grid-column:1/-1;justify-content:flex-start}.qc-cb{min-width:40px;min-height:40px;font-size:18px}}
@media (prefers-color-scheme:dark){.qc{--ink:#f6e9ec;--mut:#c4abb3;--ln:#3b2a30}.qc-card,.qc-evr,.qc-tabs,.qc-in,.qc-cb,.qc-chip{background:#22171b;color:var(--ink)}.qc-btn.g,.qc-mem,.qc-tbl th{background:#2b1d22;color:var(--ink)}.qc-cb.on{background:#2e2516}}
@media print{body *{visibility:hidden}.qc-print,.qc-print *{visibility:visible}.qc-print{position:absolute;inset:0;border:0;box-shadow:none}.qc-noprint{display:none}}`;
function style(){if(document.getElementById("qc-css"))return;const s=document.createElement("style");s.id="qc-css";s.textContent=CSS;document.head.append(s);}

/* ---------- التركيب ---------- */
async function mount(el,opt){OPT=opt;ROOT=el;load();style();document.body.classList.remove("qc-bigteams");
  ROOT.innerHTML='<div class="qc-card" style="text-align:center">⏳ جارٍ التحميل…</div>';
  try{await file();}catch(e){ROOT.innerHTML='<div class="qc-card" style="text-align:center">تعذّر التحميل. تأكّدي من الاتصال بالإنترنت.</div>';return;}
  if(!TEA){try{const s=JSON.parse(sessionStorage.getItem(SS)||"null");if(s)await unlock(s[0],s[1]);}catch(e){}}
  if(view.v==="class"&&!(TEA&&mySubj().find(x=>x.k===view.s)))view={v:"home"};draw();flush();}
addEventListener("online",()=>{if(C)flush();});
/* واجهة للبوابة الموحّدة */
async function signIn(url,tid,code){await file(url);await unlock(tid,code);try{localStorage.setItem("qclass.last",tid);sessionStorage.setItem(SS,JSON.stringify([tid,code]));}catch(e){}return {teacher:TEA,data:R};}
async function resume(url){await file(url);if(!TEA){try{const s=JSON.parse(sessionStorage.getItem(SS)||"null");if(s)await unlock(s[0],s[1]);}catch(e){}}return TEA?{teacher:TEA,data:R}:null;}
function signOut(){TEA=null;R=null;try{sessionStorage.removeItem(SS);}catch(e){}}
async function keys(url){return (await file(url)).keys;}
return {mount,signIn,resume,signOut,keys,openClass:(s,c)=>{view={v:"class",s,c,t:"eval"};}};})();
