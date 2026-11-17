/* امتحان إلكتروني يحاكي الامتحانات الوزارية: علامة، أخطاء بالحلول، وخطة علاجية */
(function(){
"use strict";
const LT=["أ","ب","ج","د"],LVN={1:"سهل",2:"متوسط",3:"صعب"};
const MODES={full:{n:40,min:90,t:"النموذج الكامل",d:"40 سؤالًا · 90 دقيقة"},short:{n:20,min:45,t:"النموذج القصير",d:"20 سؤالًا · 45 دقيقة"},les:{n:10,min:20,t:"اختبار تحقّق لدرس",d:"10 أسئلة · 20 دقيقة"}};
const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
const grade=p=>p>=90?["ممتاز","ok"]:p>=80?["جيد جدًا","ok"]:p>=70?["جيد","mid"]:p>=50?["مقبول","mid"]:["يحتاج إلى خطة علاج مكثّفة","no"];
const today=()=>{const d=new Date();return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()};

/* بناء الامتحان وفق جدول مواصفات: توزيع متساوٍ على الدروس، 30% سهل · 50% متوسط · 20% صعب، وأسئلة من الكتاب */
function build(lids,n){const U=window.G11U,B={items:(G11.book||[]).flatMap(b=>b.items)};const out=[],seen=new Set();const per=Math.max(1,Math.round(n/lids.length));
 lids.forEach((lid,li)=>{const k=li===lids.length-1?n-out.length:Math.min(per,n-out.length);if(k<=0)return;
  const nb=Math.round(k*.2),ne=Math.round((k-nb)*.35),nh=Math.round((k-nb)*.2),nm=k-nb-ne-nh;
  const book=B?U.shuffle(B.items.filter(i=>i.lid===lid&&i.t==="mcq"&&i.o&&!i.onl&&!i.og)):[];
  book.slice(0,nb).forEach(it=>{const P=U.shuffle([0,1,2,3].slice(0,it.o.length));out.push({q:it.q,o:P.map(j=>it.o[j]),a:P.indexOf(0),s:it.sol||[],g:it.g||null,nl:it.nl||null,lid,lt:U.LES[lid].L.title,lvl:2,gid:"book:"+it.id,gt:"من الكتاب: "+it.lab+" (ص "+it.pg+")",src:"book"});seen.add(it.q)});
  const add=(lvl,c)=>{for(let i=0;i<c;i++){for(let g=0;g<25;g++){const q=U.gen(lid,lvl);if(q&&!seen.has(q.q)){seen.add(q.q);out.push(q);break}}}};
  add(1,ne+(nb-Math.min(nb,book.length)));add(2,nm);add(3,nh)});
 /* ترتيب من الأسهل إلى الأصعب كما في الامتحانات الوزارية */
 return out.sort((x,y)=>x.lvl-y.lvl||x.lid.localeCompare(y.lid))}

function wiz(arg){const U=window.G11U,{el,H,math,LS,go}=U;const app=document.getElementById("app");const K=window.G11K||{};
 const cur=LS.get("g11.wiz.cur",null);
 if(arg==="run"&&cur)return run(cur);
 if(arg==="res"){const r=LS.get("g11.wiz.last",null);if(r)return result(r)}
 /* شاشة البداية */
 const name=LS.get("g11.wiz.name","");
 app.append(el("section",{class:"hero"},el("div",{},el("h1",{},"🏛️ امتحان يحاكي الامتحان الوزاري"),
  el("p",{},"امتحان إلكتروني بأسئلة اختيار من متعدد (أربعة بدائل)، مرتّبة من الأسهل إلى الأصعب، ومؤقّت بوقت محدّد. بعد التسليم تظهر علامتك من 100، وأخطاؤك مع الحل خطوة بخطوة، وخطة علاجية خاصة بك."))));
 if(cur&&cur.end>Date.now())app.append(el("div",{class:"card row between"},el("b",{},"لديك امتحان لم يُسلَّم بعد."),el("button",{class:"btn gold",onclick:()=>go("wiz/run")},"أكملي الامتحان ←")));
 const c=el("div",{class:"card"});const nm=el("input",{type:"text",value:name,placeholder:"اكتبي اسمك (يظهر في التقرير فقط)",class:"kin",style:"text-align:right;font-family:var(--f)"});
 c.append(el("h2",{},"تعليمات الامتحان"),el("ul",{},...["اقرئي كل سؤال جيدًا، ثم اختاري رمز الإجابة الصحيحة.","تستطيعين التنقّل بين الأسئلة، وتعليم أي سؤال للمراجعة بالعلم 🚩.","تُحفظ إجاباتك تلقائيًّا؛ إذا أُغلقت الصفحة تستطيعين الإكمال.","عند انتهاء الوقت يُسلَّم الامتحان تلقائيًّا.","لا تظهر الإجابات الصحيحة إلا بعد التسليم."].map(t=>el("li",{},t))),el("label",{},el("span",{class:"mut"},"الاسم:"),nm));
 const sel=LS.get("g11.wiz.sel",U.ALL);const box=el("div",{class:"grid g2",style:"margin:10px 0"});const chosen=new Set(sel.filter(x=>U.LES[x]));
 U.ALL.forEach(k=>{const cb=el("input",{type:"checkbox",checked:chosen.has(k)});cb.onchange=()=>{cb.checked?chosen.add(k):chosen.delete(k);LS.set("g11.wiz.sel",[...chosen])};box.append(el("label",{class:"ck"},cb,"الوحدة "+U.LES[k].U.n+" · الدرس "+U.LES[k].L.n+": "+U.LES[k].L.title))});
 c.append(el("h3",{},"الدروس المشمولة"),el("div",{class:"row"},...U.UNITS.map(Un=>el("button",{class:"btn sm alt",onclick:()=>{chosen.clear();Un.lessons.forEach(L=>chosen.add(L.id));LS.set("g11.wiz.sel",[...chosen]);box.querySelectorAll("input").forEach((cb,i)=>cb.checked=chosen.has(U.ALL[i]))}},"الوحدة "+Un.n+" فقط")),el("button",{class:"btn sm alt",onclick:()=>{U.ALL.forEach(k=>chosen.add(k));LS.set("g11.wiz.sel",[...chosen]);box.querySelectorAll("input").forEach(cb=>cb.checked=true)}},"كل الوحدات")),box);
 const start=m=>{const lids=[...chosen];if(!lids.length)return;LS.set("g11.wiz.name",nm.value.trim());const M=MODES[m];
  const st={mode:m,lids,qs:build(lids,M.n),ans:[],flag:[],i:0,start:Date.now(),end:Date.now()+M.min*6e4,name:nm.value.trim()};st.ans=Array(st.qs.length).fill(null);st.flag=Array(st.qs.length).fill(false);LS.set("g11.wiz.cur",st);go("wiz/run")};
 c.append(el("div",{class:"grid g2"},...["full","short"].map(m=>el("button",{class:"tool",style:"text-align:right;cursor:pointer;border:2px solid var(--ln)",onclick:()=>start(m)},el("span",{class:"ic"},m==="full"?"🏛️":"⏱"),el("b",{},MODES[m].t),el("span",{class:"mut"},MODES[m].d)))));
 app.append(c);
 const h=LS.get("g11.wiz.hist",[]);
 if(h.length){const t=el("table",{class:"t"},el("tr",{},...["التاريخ","النموذج","العلامة","التقدير"].map(x=>el("th",{},x))));h.slice(-10).reverse().forEach(r=>t.append(el("tr",{},el("td",{},r.d),el("td",{},MODES[r.mode]?MODES[r.mode].t:""),el("td",{},r.mark+" / 100"),el("td",{},grade(r.mark)[0]))));
  app.append(el("div",{class:"card"},el("div",{class:"row between"},el("h2",{style:"margin:0"},"امتحاناتي السابقة"),LS.get("g11.wiz.last",null)?el("a",{class:"btn sm alt",href:"#wiz/res"},"آخر تقرير وخطتي العلاجية"):""),el("div",{class:"scroll"},t)))}

 /* ---------- تقديم الامتحان ---------- */
 function run(st){app.replaceChildren();let confirmSub=false;const N=st.qs.length;const save=()=>LS.set("g11.wiz.cur",st);
  const tm=el("span",{class:"timer"});const tick=()=>{if(!document.body.contains(tm)&&tm.dataset.on){clearInterval(iv);return}tm.dataset.on=1;const l=st.end-Date.now();if(l<=0){finish();return}const m=Math.floor(l/6e4);tm.textContent="⏱ "+Math.floor(m/60)+":"+String(m%60).padStart(2,"0")+":"+String(Math.floor(l%6e4/1000)).padStart(2,"0");tm.classList.toggle("low",l<5*6e4)};
  const iv=setInterval(tick,500);window.__wizIv&&clearInterval(window.__wizIv);window.__wizIv=iv;
  const head=el("div",{class:"card wzh"});const body=el("div");const pal=el("div",{class:"card"});app.append(head,body,pal);
  const draw=()=>{const q=st.qs[st.i];const done=st.ans.filter(a=>a!=null).length;
   head.replaceChildren(el("div",{class:"row between"},el("b",{},"امتحان يحاكي الوزاري · "+MODES[st.mode].t),tm),el("div",{class:"prog"},el("i",{style:"width:"+Math.round(done/N*100)+"%"})),el("div",{class:"mut"},"أجبتِ عن "+done+" من "+N));
   const c=el("div",{class:"card"});c.append(el("div",{class:"row between"},el("b",{},"السؤال "+(st.i+1)+" من "+N),el("button",{class:"btn sm "+(st.flag[st.i]?"gold":"alt"),onclick:()=>{st.flag[st.i]=!st.flag[st.i];save();draw()}},st.flag[st.i]?"🚩 معلَّم للمراجعة":"🏳 علّميه للمراجعة")));
   c.append(H("div","q",q.q));if(q.g&&K.svgPlot)c.append(H("div","gwrap",K.svgPlot(q.g)));if(q.nl&&K.svgLine)c.append(H("div","gwrap",K.svgLine(q.nl)));
   q.o.forEach((o,k)=>{const b=el("button",{class:"opt","aria-pressed":st.ans[st.i]===k?"true":"false",onclick:()=>{const at=st.i;st.ans[at]=k;save();draw();if(at<N-1)setTimeout(()=>{if(st.i===at){st.i++;save();draw()}},350)}},el("span",{class:"l"},LT[k]),H("span","",o));c.append(b)});
   c.append(el("div",{class:"row between",style:"margin-top:10px"},el("button",{class:"btn alt",disabled:st.i===0,onclick:()=>{st.i--;save();draw()}},"→ السابق"),el("button",{class:"btn alt",disabled:st.i===N-1,onclick:()=>{st.i++;save();draw()}},"التالي ←")));
   body.replaceChildren(c);
   const left=st.ans.filter(a=>a==null).length,fl=st.flag.filter(Boolean).length;
   const sub=el("button",{class:"btn",onclick:function(){if(!confirmSub&&(left||fl)){confirmSub=true;this.textContent=(left?"بقي "+left+" دون إجابة":"")+(left&&fl?" و":"")+(fl?fl+" معلَّم للمراجعة":"")+" — اضغطي مرة ثانية للتسليم";return}finish()}},"✅ تسليم الامتحان");
   pal.replaceChildren(el("div",{class:"mut"},"خريطة الأسئلة (اضغطي على الرقم للانتقال):"),el("div",{class:"wzp"},...st.qs.map((_,k)=>el("button",{class:"wzb"+(k===st.i?" cur":"")+(st.ans[k]!=null?" ans":"")+(st.flag[k]?" fl":""),onclick:()=>{st.i=k;save();draw()}},String(k+1)))),
    el("div",{class:"row mut",style:"font-size:.85rem"},el("span",{},"■ مُجاب"),el("span",{},"🚩 للمراجعة"),el("span",{},"□ غير مُجاب")),el("div",{class:"row",style:"justify-content:center;margin-top:8px"},sub));
   math(app);tick()};
  function finish(){clearInterval(iv);LS.set("g11.wiz.cur",null);
   const r={mode:st.mode,lids:st.lids,name:st.name,d:today(),used:Math.min(Date.now(),st.end)-st.start,qs:st.qs,ans:st.ans};
   r.ok=st.qs.map((q,k)=>st.ans[k]===q.a);r.mark=Math.round(r.ok.filter(Boolean).length/st.qs.length*100);
   st.qs.forEach((q,k)=>{try{U.rec(q,r.ok[k])}catch(_){}});
   LS.set("g11.wiz.last",r);const h=LS.get("g11.wiz.hist",[]);h.push({d:r.d,mode:r.mode,mark:r.mark});LS.set("g11.wiz.hist",h.slice(-30));
   if(location.hash!=="#wiz/res")location.hash="wiz/res";else{app.replaceChildren();result(r)}}
  draw()}

 /* ---------- النتيجة والأخطاء والخطة العلاجية ---------- */
 function result(r){app.replaceChildren();const N=r.qs.length,okN=r.ok.filter(Boolean).length,[gt,gc]=grade(r.mark);
  const by={};r.qs.forEach((q,k)=>{const b=by[q.lid]=by[q.lid]||{lid:q.lid,t:q.lt,n:0,ok:0,miss:{}};b.n++;if(r.ok[k])b.ok++;else{const m=b.miss[q.gid]=b.miss[q.gid]||{gt:q.gt,lvl:q.lvl,n:0,src:q.src};m.n++}});
  const L=Object.values(by).map(b=>({...b,p:Math.round(b.ok/b.n*100)})).sort((a,b)=>a.p-b.p);
  const mins=Math.round(r.used/6e4);
  app.append(el("div",{class:"card wzr"},el("div",{class:"mut"},"تقرير الامتحان"+(r.name?" · "+r.name:"")+" · "+r.d),
   el("div",{class:"wzm "+gc},el("b",{},String(r.mark)),el("span",{},"/ 100")),el("p",{style:"text-align:center;font-weight:700"},gt),
   el("div",{class:"stats"},...[[okN+" / "+N,"إجابات صحيحة"],[String(N-okN-r.ans.filter(a=>a==null).length),"إجابات خاطئة"],[String(r.ans.filter(a=>a==null).length),"دون إجابة"],[mins+" د","الوقت المستغرق"]].map(([b,s])=>el("div",{class:"stat"},el("b",{},b),el("span",{},s)))),
   el("div",{class:"row",style:"justify-content:center;margin-top:10px"},el("button",{class:"btn",onclick:()=>printRep(r,L)},"🖨 طباعة التقرير والخطة"),el("a",{class:"btn alt",href:"#wiz"},"امتحان جديد"))));
  /* حسب الدرس */
  const t=el("table",{class:"t"},el("tr",{},...["الدرس","الصحيح","النسبة","المستوى"].map(x=>el("th",{},x))));
  L.forEach(b=>t.append(el("tr",{},el("td",{},b.t),el("td",{},b.ok+" / "+b.n),el("td",{},el("span",{class:"bar",style:"display:inline-block;width:90px;vertical-align:middle"},el("i",{style:"width:"+b.p+"%"}))," "+b.p+"%"),el("td",{style:"font-weight:700;color:"+(b.p>=80?"var(--ok)":b.p>=50?"#8a6100":"var(--no)")},b.p>=80?"متقَن":b.p>=50?"يحتاج تقوية":"يحتاج علاجًا"))));
  app.append(el("div",{class:"card"},el("h2",{},"📊 أداؤك في كل درس"),el("div",{class:"scroll"},t)));
  /* الخطة العلاجية */
  app.append(planCard(L,r));
  /* الأخطاء */
  const wrong=r.qs.map((q,k)=>[q,k]).filter(([q,k])=>!r.ok[k]);
  const mw=el("div",{class:"card"},el("h2",{},"❌ أخطائي مع الحل خطوة بخطوة ("+wrong.length+")"));
  if(!wrong.length)mw.append(el("p",{},"لا توجد أخطاء. أحسنتِ! 🌟"));
  wrong.forEach(([q,k])=>{const c=el("div",{class:"wzw"});c.append(el("div",{class:"row between"},el("span",{},el("b",{},"السؤال "+(k+1)+" "),el("span",{class:"chip"},q.lt),el("span",{class:"chip lv"+q.lvl},LVN[q.lvl])),el("span",{class:"mut"},q.gt||"")));
   c.append(H("div","q",q.q));if(q.g&&K.svgPlot)c.append(H("div","gwrap",K.svgPlot(q.g)));
   if(r.ans[k]!=null)c.append(el("div",{class:"opt no"},el("span",{class:"l"},LT[r.ans[k]]),H("span","","إجابتك: "+q.o[r.ans[k]])));else c.append(el("p",{class:"mut"},"لم تُجيبي عن هذا السؤال."));
   c.append(el("div",{class:"opt ok"},el("span",{class:"l"},LT[q.a]),H("span","","الإجابة الصحيحة: "+q.o[q.a])));
   const ol=el("ol",{class:"stp"});(q.s||[]).forEach((s,j)=>ol.append(el("li",{},el("b",{class:"sn"},"الخطوة "+(j+1)),H("div","",s))));
   const det=el("details",{},el("summary",{class:"btn sm alt",style:"display:inline-flex"},"🪜 الحل خطوة بخطوة"),ol);c.append(det);mw.append(c)});
  app.append(mw);
  /* مراجعة كاملة */
  const all=el("details",{class:"card"},el("summary",{style:"cursor:pointer;font-weight:700;color:var(--m)"},"مراجعة كل أسئلة الامتحان"));
  r.qs.forEach((q,k)=>all.append(el("div",{class:"wzw"},el("b",{class:r.ok[k]?"fb ok":"fb no"},(r.ok[k]?"✔ ":"✘ ")+"السؤال "+(k+1)),H("div","q",q.q),H("div","mut","الإجابة الصحيحة: "+LT[q.a]+") "+q.o[q.a]))));
  app.append(all);math(app);scrollTo({top:0})}

 function planCard(L,r){const weak=L.filter(b=>b.p<80);const c=el("div",{class:"card wzplan"},el("h2",{},"🩺 خطتي العلاجية"));
  if(!weak.length){c.append(el("p",{},"أداؤك متقَن في كل الدروس. خطة إثرائية مقترحة:"),
    el("ol",{},...L.map(b=>el("li",{},"تدرّبي على الأسئلة الصعبة في «"+b.t+"» ",el("a",{href:"#p/"+b.lid+"/3"},"ابدئي ←"))),el("li",{},"حلّي أسئلة «مهارات التفكير العليا» في ",el("a",{href:"#kb"},"أسئلة الكتاب")),el("li",{},"أعيدي ",el("a",{href:"#wiz"},"امتحانًا وزاريًّا كاملًا")," بعد أسبوع للمحافظة على مستواك.")));return c}
  c.append(el("p",{class:"mut"},"رتّبنا الدروس من الأضعف إلى الأقوى. خصّصي لكل درس يومًا، ونفّذي المهام بالترتيب، ثم أعيدي اختبار التحقق."));
  weak.forEach((b,di)=>{const intense=b.p<50;const d=el("div",{class:"wzday"});
   d.append(el("div",{class:"row between"},el("h3",{style:"margin:0"},"اليوم "+(di+1)+": "+b.t),el("span",{class:"chip "+(intense?"lv3":"lv2")},intense?"علاج مكثّف ("+b.p+"%)":"تقوية ("+b.p+"%)")));
   const tasks=[];
   tasks.push(["راجعي بطاقات المفاهيم والقوانين (10 دقائق)","#l/"+b.lid+"/cards"]);
   tasks.push(["ادرسي الأمثلة المحلولة خطوة بخطوة"+(intense?" وأعيدي حلّها بنفسك":""),"#l/"+b.lid+"/ex"]);
   Object.values(b.miss).forEach(m=>{if(m.src==="book")return;const lv=Math.max(1,m.lvl-(intense?1:0));tasks.push(["تدرّبي على مهارة: «"+m.gt+"» — ابدئي بالمستوى "+LVN[lv]+" حتى تحلّي 5 أسئلة متتالية صحيحة","#p/"+b.lid+"/"+lv])});
   if(Object.values(b.miss).some(m=>m.src==="book"))tasks.push(["أعيدي حلّ أسئلة الكتاب التي أخطأتِ فيها","#kb/"+b.lid]);
   tasks.push(["حلّي أسئلة «أتحقق من فهمي» و«أتدرّب» في أسئلة الكتاب لهذا الدرس","#kb/"+b.lid]);
   d.append(el("ol",{},...tasks.map(([t,h])=>el("li",{},t+" ",el("a",{href:h},"افتحي ←")))));
   d.append(el("button",{class:"btn sm gold",onclick:()=>{const M=MODES.les;const st={mode:"les",lids:[b.lid],qs:build([b.lid],M.n),ans:[],flag:[],i:0,start:Date.now(),end:Date.now()+M.min*6e4,name:r.name};st.ans=Array(st.qs.length).fill(null);st.flag=Array(st.qs.length).fill(false);LS.set("g11.wiz.cur",st);go("wiz/run")}},"✍️ اختبار تحقّق لهذا الدرس (10 أسئلة)"));
   c.append(d)});
  c.append(el("div",{class:"wzday"},el("h3",{style:"margin:0"},"اليوم "+(weak.length+1)+": التقييم"),el("p",{},"أعيدي امتحانًا وزاريًّا كاملًا وقارني علامتك بهذه العلامة ("+r.mark+")."),el("a",{class:"btn sm",href:"#wiz"},"امتحان جديد ←")));
  return c}

 function printRep(r,L){const root=document.getElementById("prt");root.replaceChildren();const s=el("div",{class:"sheet"});
  s.append(el("div",{class:"sh"},el("div",{class:"l"},"المملكة الأردنية الهاشمية",el("br"),"وزارة التربية والتعليم"),el("div",{class:"c"},el("h1",{},"تقرير امتحان يحاكي الامتحان الوزاري"),el("div",{},"الرياضيات · الصف الحادي عشر الأكاديمي")),el("div",{class:"l",style:"text-align:left"},"مدرسة القطرانة الثانوية للبنات",el("br"),"التاريخ: "+r.d)));
  s.append(el("div",{class:"info"},el("span",{},"اسم الطالبة: "+(r.name||"……………………")),el("span",{},"العلامة: "+r.mark+" / 100"),el("span",{},"التقدير: "+grade(r.mark)[0])));
  const t=el("table",{class:"key",style:"font-family:var(--f)"},el("tr",{},el("th",{},"الدرس"),el("th",{},"الصحيح"),el("th",{},"النسبة"),el("th",{},"المهارات التي تحتاج علاجًا")));
  L.forEach(b=>t.append(el("tr",{},el("td",{},b.t),el("td",{},b.ok+"/"+b.n),el("td",{},b.p+"%"),el("td",{},Object.values(b.miss).map(m=>m.gt).join("، ")||"—"))));s.append(el("h3",{},"الأداء حسب الدرس"),t);
  const weak=L.filter(b=>b.p<80);s.append(el("h3",{},"الخطة العلاجية"));
  s.append(weak.length?el("ol",{},...weak.map((b,i)=>el("li",{},"اليوم "+(i+1)+" — "+b.t+": مراجعة البطاقات والأمثلة المحلولة، ثم تدريب على: "+(Object.values(b.miss).map(m=>m.gt).join("، ")||"أسئلة الدرس")+"، ثم اختبار تحقّق."))):el("p",{},"أداء متقَن؛ يُقترح التدريب على الأسئلة الصعبة ومهارات التفكير العليا."));
  s.append(el("div",{class:"pfoot"},"توقيع المعلمة: ……………………    توقيع ولي الأمر: ……………………"));root.append(s);math(root);setTimeout(()=>window.print(),300)}
}
window.G11X=window.G11X||{};window.G11X.wiz=wiz;
})();
