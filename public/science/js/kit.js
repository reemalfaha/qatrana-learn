/* حقيبة الدرس: خطة الدرس · تقويم آخر الحصة · تذكرة الخروج · سلّم التقدير
   (إلكترونية للطالبات، وقابلة للطباعة والتصدير إلى Word للمعلّمة) */
(function(){
/* أسئلة ثابتة لكل درس حتى تتطابق النسخة الإلكترونية والمطبوعة */
function seeded(id){let h=2166136261;for(const c of id)h=Math.imul(h^c.codePointAt(0),16777619)>>>0;return ()=>{h=Math.imul(h^h>>>15,2246822507)>>>0;h=Math.imul(h^h>>>13,3266489909)>>>0;return ((h^h>>>16)>>>0)/4294967296;};}
function pickQ(l){const r=seeded(l.id),idx=l.quiz.map((_,i)=>i).sort(()=>r()-.5);const exitQ=l.quiz[idx[0]],endQ=idx.slice(1,6).map(i=>l.quiz[i]);
  const fix=q=>{const o=q.o.map((_,i)=>i).sort(()=>r()-.5);return {q:q.q,o:o.map(i=>q.o[i]),a:o.indexOf(q.a),why:q.why};};return {exit:fix(exitQ),end:endQ.map(fix)};}
const openQ=l=>{const t=l.terms[0],p=l.points[1]||l.points[0];return [t?"وضّحي المقصود بـ «"+t[0]+"»، واذكري مثالًا عليه.":"وضّحي الفكرة الرئيسة للدرس.",p?"فسّري: "+p[0]+"؟ (بالاستعانة بما تعلّمتِه في الحصة)":"لخّصي أهمّ ما تعلّمتِه."];};
const FEEL=[["😀","فهمت تمامًا"],["🙂","فهمت إلى حدٍّ ما"],["🤔","أحتاج إلى مساعدة"]];
window.LKIT={pickQ,openQ,FEEL};

/* ===================== الطالبة ===================== */
LTABS.splice(4,0,["end","✅ تقويم آخر الحصة"],["exit","🎫 تذكرة الخروج"]);
LTAB_FN.end=(P,l)=>{const Q=pickQ(l).end;const key="end:"+l.id;const prev=S.seen[key];
  P.append(el("div",{class:"card",style:{marginBottom:"12px"}},el("b",{},"✅ تقويم آخر الحصة"),el("p",{class:"muted small",style:{margin:"4px 0 0"}},Q.length+" أسئلة سريعة تقيس نتاجات الدرس، تصل نتيجتها إلى معلّمتكِ."+(prev!=null?" (نتيجتكِ السابقة: "+prev+"%)":""))));
  const box=el("div");P.append(box);
  runQuiz(box,Q.slice(),{title:l.title,onEnd:(sc,tot)=>{const pct=Math.round(sc/tot*100);S.seen[key]=pct;save();
    submit({unit:subjOf(l).name+" · الوحدة "+l.unit.n,activity:"تقويم آخر الحصة",activityTitle:l.title,score:sc,total:tot});}});};
LTAB_FN.exit=(P,l)=>{const q=pickQ(l).exit;const k="exit:"+l.id;const sent=S.seen[k];let pick=null,feel=null;
  const card=el("div",{class:"card exitcard"});P.append(card);
  card.append(el("div",{class:"row",style:{justifyContent:"space-between"}},el("h3",{style:{margin:0}},"🎫 تذكرة الخروج"),el("span",{class:"tag"},l.title)),
    el("p",{class:"muted small"},"أجيبي قبل الخروج من الحصة، فتصل إجابتكِ إلى معلّمتكِ."+(sent?" ✓ أرسلتِ تذكرة هذا الدرس سابقًا، ويمكنكِ إرسالها مرّة أخرى.":"")));
  const q1=el("div",{class:"opts"});q.o.forEach((o,i)=>q1.append(el("button",{class:"opt",onclick:e=>{pick=i;[...q1.children].forEach((b,j)=>b.classList.toggle("sel",j===i));}},o)));
  const t1=el("textarea",{rows:"3",placeholder:"اكتبي بكلماتكِ…",class:"ta"}),t2=el("textarea",{rows:"2",placeholder:"سؤالي…",class:"ta"});
  const fe=el("div",{class:"row"});FEEL.forEach(([ic,t],i)=>fe.append(el("button",{class:"chip feel",onclick:()=>{feel=i;[...fe.children].forEach((b,j)=>b.setAttribute("aria-pressed",String(j===i)));}},ic+" "+t)));
  const msg=el("div");
  card.append(el("h4",{},"1) "+q.q),q1,el("h4",{},"2) أهمّ فكرة تعلّمتُها اليوم:"),t1,el("h4",{},"3) سؤال ما زال لديّ:"),t2,el("h4",{},"4) كيف أقيّم فهمي للدرس؟"),fe,
    el("div",{class:"row",style:{marginTop:"12px"}},el("button",{class:"btn",onclick:()=>{if(pick==null||feel==null||t1.value.trim().length<3){msg.innerHTML='<div class="why">أكملي السؤال الأول والثاني والرابع 🙏</div>';return;}
      const ok=pick===q.a;submit({unit:subjOf(l).name+" · الوحدة "+l.unit.n,activity:"تذكرة الخروج",activityTitle:l.title,score:ok?1:0,total:1,skills:{"الفكرة":t1.value.trim().slice(0,200),"سؤالي":t2.value.trim().slice(0,150),"تقييمي":FEEL[feel][1]}});
      S.seen[k]=1;save();addPts(10,"أرسلتِ تذكرة الخروج");msg.innerHTML="";msg.append(el("div",{class:"why"},el("b",{},(ok?"✅ إجابة السؤال الأول صحيحة. ":"❌ الإجابة الصحيحة للسؤال الأول: "+q.o[q.a]+". ")),q.why||"",el("div",{style:{marginTop:"6px"}},"🎉 وصلت تذكرتكِ إلى معلّمتكِ. شكرًا!")));}},"📨 أرسلي التذكرة")),msg);};

/* ===================== المعلّمة ===================== */
const KT=[["plan","📝 خطة الدرس"],["end","✅ تقويم آخر الحصة"],["exit","🎫 تذكرة الخروج"],["rubric","📏 سلّم التقدير"],["checklist","☑️ قائمة الرصد"]];
route(/^#\/t\/kit$/,needT(V=>{V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"حقيبة الدرس"));
  V.append(el("div",{class:"hero"},el("div",{class:"orb"}),el("h1",{},"🎒 حقيبة الدرس"),el("p",{},"لكل درس: خطة جاهزة، وتقويم آخر الحصة، وتذكرة خروج، وسلّم تقدير، إلكترونيًّا للطالبات وقابلة للطباعة وWord")));
  const gs=el("div",{class:"chips",style:{margin:"14px 0"}});Object.keys(SCI.data).forEach(g=>gs.append(el("button",{class:"chip","aria-pressed":String(g===TG),onclick:()=>{TG=g;lsSet("qatrana.sci.tg",g);render();}},"الصف "+g)));V.append(gs);
  if(!SCI.data[TG])TG=Object.keys(SCI.data)[0];
  SUBJ_ORDER.forEach(k=>{const s=SCI.data[TG][k];if(!s)return;const box=el("section",{class:"card",style:{marginTop:"12px","--c":s.color}});box.append(el("h2",{style:{color:s.color,margin:"0 0 6px"}},s.name));
    s.units.forEach(u=>{box.append(el("h4",{style:{margin:"10px 0 6px"}},"الوحدة "+u.n+": "+u.title));const g=el("div",{class:"grid g2"});
      u.lessons.forEach((l,i)=>g.append(el("a",{class:"les",href:"#/t/kit/"+l.id+"/plan",style:{"--c":s.color}},el("span",{class:"st"},i+1),el("div",{},el("b",{},l.title),el("small",{},"خطة · تقويم · تذكرة خروج · سلّم تقدير")))));box.append(g);});V.append(box);});
  V.append(credit());}));
route(/^#\/t\/kit\/([\w-]+)\/(\w+)$/,needT((V,id,tab)=>{const l=findLesson(id);if(!l){go("#/t/kit");return;}TG=l.grade;const s=subjOf(l),u=l.unit;
  V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],["حقيبة الدرس","#/t/kit"],l.title));
  V.append(el("div",{class:"lhead noprint",style:{"--c":s.color}},el("div",{class:"en"},s.name+" · الصف "+l.grade+" · الوحدة "+u.n+": "+u.title),el("h1",{},"🎒 "+l.title),el("div",{class:"idea"},"💡 "+l.idea)));
  const idx=u.lessons.indexOf(l),pv=u.lessons[idx-1],nx=u.lessons[idx+1];
  const tb=el("div",{class:"tabs noprint",role:"tablist"});KT.forEach(([k,t])=>tb.append(el("button",{role:"tab","aria-selected":String(k===tab),onclick:()=>go("#/t/kit/"+l.id+"/"+k)},t)));V.append(tb);
  const base=location.href.split("#")[0];
  if(tab==="end"||tab==="exit"){const link=base+"#/l/"+l.id+"/"+tab;V.append(el("div",{class:"card noprint",style:{margin:"12px 0"}},el("b",{},"📱 النسخة الإلكترونية للطالبات: "),el("span",{class:"small",style:{direction:"ltr",display:"inline-block"}},link),
    el("div",{class:"row",style:{marginTop:"8px"}},el("button",{class:"btn sm",onclick:()=>{try{navigator.clipboard.writeText(link);toast("نُسخ الرابط ✓");}catch(e){prompt("انسخي الرابط:",link);}}},"📋 نسخ الرابط"),el("a",{class:"btn sm ghost",href:"#/l/"+l.id+"/"+tab},"👁️ معاينة كما تراها الطالبة"),el("a",{class:"btn sm ghost",href:"#/t/results"},"📈 نتائج الطالبات")),
    el("p",{class:"small muted",style:{margin:"6px 0 0"}},"تجده الطالبة أيضًا في صفحة الدرس، تبويب «"+(tab==="end"?"✅ تقويم آخر الحصة":"🎫 تذكرة الخروج")+"»، وتصل النتائج إلى جدول النتائج.")));}
  V.append(ptools());
  let p;if(tab==="plan")p=planPaper(l);else if(tab==="end")p=endPaper(l);else if(tab==="exit")p=exitPaper(l);else{const info=ATOOLS.find(a=>a[0]===tab)||ATOOLS.find(a=>a[0]==="rubric");p=assessPaper(info[0],info,l);if(tab==="rubric")p.append(rubricExtra(l));}
  V.append(p,el("div",{class:"row noprint",style:{justifyContent:"space-between",marginTop:"16px"}},pv?el("a",{class:"btn ghost sm",href:"#/t/kit/"+pv.id+"/"+tab},"→ "+pv.title):el("span"),nx?el("a",{class:"btn ghost sm",href:"#/t/kit/"+nx.id+"/"+tab},nx.title+" ←"):el("span")),credit());}));
function endPaper(l){const s=subjOf(l),Q=pickQ(l).end,O=openQ(l);let key=false;const wrap=el("div");
  const draw=()=>{wrap.innerHTML="";const p=el("div",{class:"paper"});
    p.append(paperHead(s.name,l.grade),el("h2",{contenteditable:""},(key?"مفتاح الإجابة · ":"")+"تقويم آخر الحصة: "+l.title),
      el("table",{class:"info"},el("tr",{},el("td",{},"الاسم: .................................."),el("td",{},"الشعبة: ......"),el("td",{},"العلامة: ...... / "+(Q.length+4)))),
      el("p",{class:"small"},"أولًا: اختاري رمز الإجابة الصحيحة (علامة لكل فرع):"),
      ...Q.map((q,i)=>el("div",{style:{breakInside:"avoid",margin:"6px 0"}},el("b",{contenteditable:""},(i+1)+") "+q.q),el("div",{style:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px 16px",paddingRight:"18px"}},...q.o.map((o,k)=>el("span",{style:key&&k===q.a?{fontWeight:"700",color:"#1f7a4d"}:{}},AR_LET[k]+") "+o+(key&&k===q.a?" ✓":"")))))),
      el("p",{class:"small",style:{marginTop:"10px"}},"ثانيًا: أجيبي عمّا يأتي (علامتان لكل سؤال):"),
      ...O.map((x,i)=>el("div",{style:{breakInside:"avoid"}},el("b",{contenteditable:""},(Q.length+i+1)+") "+x),key?el("div",{class:"small",style:{color:"#1f7a4d"},contenteditable:""},"الإجابة النموذجية: "+(i===0&&l.terms[0]?l.terms[0][2]:(l.points[1]||l.points[0])[1])):el("div",{},el("div",{class:"lines"}),el("div",{class:"lines"})))),
      el("div",{class:"box",style:{marginTop:"10px"}},el("b",{},"النتاجات المقيسة: "),l.outcomes.slice(0,3).join(" · ")),
      el("div",{class:"credit"},"منصّة العلوم · تصميم وتنفيذ: "+CONFIG.DESIGNER));wrap.append(p);};
  const t=el("div",{class:"tools noprint"},el("button",{class:"btn ghost sm",onclick:()=>{key=!key;draw();}},"🔑 إظهار/إخفاء مفتاح الإجابة"));draw();return el("div",{},t,wrap);}
function exitPaper(l){const s=subjOf(l),q=pickQ(l).exit,p=el("div",{class:"paper"});
  const card=()=>el("div",{class:"box",style:{breakInside:"avoid"}},el("div",{class:"row",style:{justifyContent:"space-between"}},el("b",{},"🎫 تذكرة الخروج"),el("span",{class:"small"},s.short+" · "+l.title)),
    el("div",{class:"small"},"الاسم: ............................ الشعبة: ...... التاريخ: ........"),
    el("p",{style:{margin:"6px 0 2px"}},el("b",{},"1) "),q.q),el("div",{class:"small",style:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"0 12px"}},...q.o.map((o,k)=>el("span",{},"◯ "+o))),
    el("p",{style:{margin:"6px 0 2px"}},el("b",{},"2) "),"أهمّ فكرة تعلّمتُها اليوم:"),el("div",{class:"lines"}),el("div",{class:"lines"}),
    el("p",{style:{margin:"6px 0 2px"}},el("b",{},"3) "),"سؤال ما زال لديّ:"),el("div",{class:"lines"}),
    el("p",{style:{margin:"6px 0 2px"}},el("b",{},"4) "),"فهمي للدرس: ",FEEL.map(f=>"◯ "+f[0]+" "+f[1]).join("   ")));
  p.append(paperHead(s.name,l.grade),el("h2",{},"تذكرة الخروج: "+l.title),el("p",{class:"small"},"تُقصّ الورقة إلى بطاقتين. الإجابة الصحيحة للسؤال الأول: «"+q.o[q.a]+"»."),el("div",{class:"grid g2"},card(),card()),
    el("h3",{style:{marginTop:"14px"}},"📊 تحليل تذاكر الخروج (للمعلّمة)"),el("table",{},el("tr",{},el("th",{},"عدد الطالبات"),el("th",{},"😀 فهمن تمامًا"),el("th",{},"🙂 إلى حدٍّ ما"),el("th",{},"🤔 يحتجن مساعدة"),el("th",{},"أسئلة متكرّرة"),el("th",{},"الإجراء في الحصة القادمة")),el("tr",{},...[0,1,2,3,4,5].map(()=>el("td",{style:{height:"60px"}},ce(""))))),
    el("div",{class:"credit"},"منصّة العلوم · تصميم وتنفيذ: "+CONFIG.DESIGNER));return p;}
function rubricExtra(l){return el("div",{class:"box",style:{marginTop:"10px"}},el("b",{},"طريقة الاستخدام: "),"تُقدَّر الطالبة على كل معيار من 1 إلى 4، والمجموع من "+Math.min(5,l.outcomes.length)*4+". ",
  el("b",{},"التقدير: "),"90% فأكثر ممتاز · 80–89% جيد جدًّا · 65–79% جيد · أقل من 65% يحتاج إلى خطة علاجية.");}


/* ===================== المادة: كل درس في صفحة واحدة ===================== */
const MT=[["book","📖 الكتاب"],["exps","🧪 التجارب"],["plan","📝 الخطة"],["end","✅ تقويم الدرس"],["exit","🎫 تذكرة الخروج"],["rubric","📏 سلّم التقدير"]];
route(/^#\/t\/m$/,needT(V=>{V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"المادة"));
  V.append(el("div",{class:"hero"},el("div",{class:"orb"}),el("h1",{},"📚 المادة"),el("p",{},"اختاري الدرس: الكتاب للشرح بالقلم، والتجارب بروابطها، والخطة، وتقويم الدرس، وتذكرة الخروج، في صفحة واحدة")));
  const gs=el("div",{class:"chips",style:{margin:"14px 0"}});Object.keys(SCI.data).forEach(g=>gs.append(el("button",{class:"chip","aria-pressed":String(g===TG),onclick:()=>{TG=g;lsSet("qatrana.sci.tg",g);render();}},"الصف "+g)));V.append(gs);
  if(!SCI.data[TG])TG=Object.keys(SCI.data)[0];
  SUBJ_ORDER.forEach(k=>{const s=SCI.data[TG][k];if(!s)return;const box=el("section",{class:"card",style:{marginTop:"12px"}});box.append(el("h2",{style:{color:s.color,margin:"0 0 6px"}},s.name));
    if(k==="sci"||k==="chem")box.append(el("div",{class:"row",style:{margin:"4px 0 8px"}},el("a",{class:"btn sm gold",href:"chem3d/#ptable",target:"_blank",rel:"noopener"},"🧪 الجدول الدوري التفاعلي"),el("a",{class:"btn sm",href:"labs/electrons.html",target:"_blank",rel:"noopener"},"⚛️ نشاط تعبئة الإلكترونات")));
    s.units.forEach(u=>{box.append(el("h4",{style:{margin:"10px 0 6px"}},"الوحدة "+u.n+": "+u.title));const g=el("div",{class:"grid g2"});
      u.lessons.forEach((l,i)=>g.append(el("a",{class:"les",href:"#/t/m/"+l.id+"/book",style:{"--c":s.color}},el("span",{class:"st"},i+1),el("div",{},el("b",{},l.title),el("small",{},"ص "+l.pages+" · "+(l.exps.length?l.exps.length+" تجارب · ":"")+"كتاب · خطة · تقويم · تذكرة")))));box.append(g);});V.append(box);});
  V.append(credit());}));
function bookRange(l){const link=window.SCIBOOK&&SCIBOOK.lessonLink(l);if(!link)return null;const m=link.match(/#\/book\/(\w+)\/(\d+)/);const pg=String(l.pages).match(/(\d+)\D+(\d+)/);const st=+m[2],off=st-(pg?+pg[1]:st);return {key:m[1],lo:st,hi:pg?+pg[2]+off:st+8};}
route(/^#\/t\/m\/([\w-]+)\/(\w+)$/,needT(async(V,id,tab)=>{const l=findLesson(id);if(!l){go("#/t/m");return;}TG=l.grade;const s=subjOf(l),u=l.unit;
  V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],["المادة","#/t/m"],l.title));
  V.append(el("div",{class:"lhead noprint",style:{"--c":s.color}},el("div",{class:"en"},s.name+" · الصف "+l.grade+" · الوحدة "+u.n+": "+u.title+" · ص "+l.pages),el("h1",{},l.title),el("div",{class:"idea"},"💡 "+l.idea)));
  const tb=el("div",{class:"tabs noprint",role:"tablist"});MT.forEach(([k,t])=>tb.append(el("button",{role:"tab","aria-selected":String(k===tab),onclick:()=>go("#/t/m/"+l.id+"/"+k)},t+(k==="exps"&&l.exps.length?" ("+l.exps.length+")":""))));V.append(tb);
  const idx=u.lessons.indexOf(l),pv=u.lessons[idx-1],nx=u.lessons[idx+1];const navR=el("div",{class:"row noprint",style:{justifyContent:"space-between",marginTop:"16px"}},pv?el("a",{class:"btn ghost sm",href:"#/t/m/"+pv.id+"/"+tab},"→ "+pv.title):el("span"),nx?el("a",{class:"btn ghost sm",href:"#/t/m/"+nx.id+"/"+tab},nx.title+" ←"):el("span"));
  if(tab==="book"){const r=bookRange(l);if(!r){V.append(el("div",{class:"card empty"},"كتاب هذا الدرس غير متوفّر بعد."));}else{const box=el("div",{style:{marginTop:"10px"}});V.append(el("p",{class:"muted small noprint"},"صفحات الدرس "+l.pages+" مقسّمة فقرات بينها فراغات للشرح. اختاري ✏️ القلم أو 🖍️ التظليل للكتابة، و⛶ للشاشة الكاملة."),box);await SCIBOOK.mount(box,r.key,r.lo,{lo:r.lo,hi:r.hi});}}
  else if(tab==="exps"){V.append(expsPanel(l));}
  else{V.append(ptools());let p;if(tab==="plan")p=planPaper(l);else if(tab==="end")p=endPaper(l);else if(tab==="exit")p=exitPaper(l);else{const info=ATOOLS.find(a=>a[0]==="rubric");p=assessPaper("rubric",info,l);p.append(rubricExtra(l));}V.append(p);
    if(tab==="end"||tab==="exit")V.append(el("div",{class:"card noprint",style:{marginTop:"12px"}},el("b",{},"📱 النسخة الإلكترونية للطالبات: "),el("a",{href:"#/l/"+l.id+"/"+tab},"افتحي كما تراها الطالبة"),el("span",{class:"small muted"}," · تجده الطالبة في صفحة الدرس، وتصل النتائج إلى «نتائج الطالبات».")));}
  V.append(navR,credit());}));
function expsPanel(l){const w=el("div",{style:{marginTop:"12px"}});
  if(!l.exps.length&&!l.sims.length){w.append(el("div",{class:"card empty"},"لا توجد تجارب لهذا الدرس."));return w;}
  const frame=el("div");
  const open=(x,t)=>{frame.innerHTML="";frame.append(el("div",{class:"simbox",style:{marginTop:"12px"}},el("div",{class:"simbar"},el("b",{},"⚗️ "+t),el("a",{class:"btn sm ghost",href:simHref(x),target:"_blank",rel:"noopener"},"⛶ ملء الشاشة")),el("iframe",{src:simHref(x),title:t,allow:"fullscreen"})));frame.scrollIntoView({behavior:"smooth"});};
  l.exps.forEach((x,i)=>{const sim=x.sim||l.sims[0];const bl=window.SCIBOOK&&SCIBOOK.expLink(l,x);
    w.append(el("article",{class:"card",style:{marginBottom:"10px"}},el("div",{class:"row",style:{justifyContent:"space-between"}},el("div",{},el("span",{class:"tag"},x.kind),el("h3",{style:{margin:"4px 0"}},x.t),el("small",{class:"muted"},x.src+" · 🎯 "+x.goal))),
      el("div",{class:"row",style:{marginTop:"8px"}},sim?el("button",{class:"btn sm",onclick:()=>open(sim,x.t)},"⚗️ افتحي التجربة في "+(sim.lab==="lab3d"?"المختبر ثلاثي الأبعاد":sim.lab==="chem3d"?"مختبر الكيمياء ثلاثي الأبعاد":["biology","chemistry","physics","earth"].includes(sim.lab)?"مختبر بلا حدود":"المختبر التفاعلي")):null,
        sim?el("a",{class:"btn sm ghost",href:simHref(sim),target:"_blank",rel:"noopener"},"↗ في صفحة مستقلّة"):null,bl?el("a",{class:"btn sm ghost",href:bl},"📖 موقعها في الكتاب"):null,el("a",{class:"btn sm ghost",href:"#/ws/"+l.id+"/"+i},"🖨️ ورقة العمل"))));});
  const other=l.sims.filter(sm=>!l.exps.some(x=>x.sim&&x.sim.lab===sm.lab&&x.sim.id===sm.id));
  if(other.length)w.append(el("div",{class:"card"},el("b",{},"🔬 محاكاة أخرى للدرس: "),el("div",{class:"row",style:{marginTop:"6px"}},...other.map(sm=>el("button",{class:"btn sm ghost",onclick:()=>open(sm,sm.t)},sm.t)))));
  w.append(frame);return w;}

/* بطاقة في ركن المعلّمة وفي صفحة الدرس */
addEventListener("DOMContentLoaded",()=>{});
})();
