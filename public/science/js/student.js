/* منصّة العلوم — واجهة الطالبة */

/* ---------- الترحيب ---------- */
function welcome(V){
  let g=S.grade||"التاسع",sec=S.section||"";
  const nm=el("input",{class:"inp",id:"stName",placeholder:"اسمكِ الثلاثي",autocomplete:"name",value:S.name||""});
  const gbox=el("div",{class:"chips",role:"group","aria-label":"الصف"}),sbox=el("div",{class:"chips",role:"group","aria-label":"الشعبة"});
  const err=el("p",{class:"muted","aria-live":"polite"});
  const draw=()=>{gbox.innerHTML="";["الثامن","التاسع","العاشر"].forEach(x=>gbox.append(el("button",{class:"chip","aria-pressed":String(x===g),onclick:()=>{g=x;if(!CONFIG.SECTIONS(g).includes(sec))sec="";draw();}},"الصف "+x)));
    sbox.innerHTML="";CONFIG.SECTIONS(g).forEach(x=>sbox.append(el("button",{class:"chip","aria-pressed":String(x===sec),onclick:()=>{sec=x;draw();}},"الشعبة "+x)));};draw();
  V.append(el("div",{class:"hero"},el("div",{class:"orb"}),el("h1",{},"أهلًا بكِ في منصّة العلوم 🔬"),el("p",{},"أحياء · كيمياء · فيزياء · علوم الأرض — دروس تفاعلية ومختبرات ثلاثية الأبعاد")),
    el("div",{class:"card",style:{marginTop:"16px",display:"grid",gap:"12px"}},el("label",{for:"stName"},el("b",{},"اسمكِ")),nm,el("b",{},"صفّكِ"),gbox,el("b",{},"شعبتكِ"),sbox,err,
      el("button",{class:"btn",onclick:()=>{const v=nm.value.trim().replace(/\s+/g," ");if(v.split(" ").length<2){err.textContent="اكتبي اسمكِ واسم الأب على الأقل.";return;}
        if(!sec){err.textContent="اختاري شعبتكِ.";return;}S.name=v;S.grade=g;S.section=sec;save();touchStreak();go("#/");}},"ابدئي رحلتكِ العلمية")),
    el("p",{class:"muted small center"},"يُحفظ تقدّمكِ على هذا الجهاز، وتصل نتائج اختباراتكِ إلى معلّمتكِ."),credit());
}

/* ---------- الرئيسية ---------- */
route(/^#\/?$/,V=>{
  if(!S.name||!S.grade){welcome(V);return;}
  touchStreak();
  if(!SCI.data[S.grade]){V.append(el("div",{class:"card empty"},"محتوى الصف "+S.grade+" قيد الإعداد ✨ ",el("button",{class:"btn sm",onclick:()=>{S.name="";save();go("#/");}},"تغيير الصف")));return;}
  const done=Object.keys(S.done).filter(id=>{const l=findLesson(id);return l&&l.grade===S.grade;}).length,total=allLessons().length;
  V.append(el("section",{class:"hero"},el("div",{class:"orb"}),el("div",{class:"atom",html:svgI("atom")}),
    el("h1",{},"أهلًا "+S.name.split(" ")[0]+" 👋"),el("p",{},"الصف "+S.grade+" · الشعبة "+S.section+" · "+CONFIG.SCHOOL),
    el("div",{class:"stats"},el("span",{class:"stat"},el("b",{},S.pts.toLocaleString("en"))," نقطة"),el("span",{class:"stat"},el("b",{},done+"/"+total)," درسًا"),el("span",{class:"stat"},el("b",{},"🔥"+(S.streak.n||1))," أيام"),el("span",{class:"stat"},el("b",{},S.badges.length)," شارة"))));
  const last=S.last&&findLesson(S.last);
  if(last&&last.grade===S.grade)V.append(el("a",{class:"card les",href:"#/l/"+last.id,style:{marginTop:"14px","--c":subjOf(last).color}},el("span",{class:"st"},"▶"),el("div",{},el("small",{},"تابعي من حيث توقّفتِ"),el("b",{},last.title))));
  V.append(el("div",{class:"sec-h"},el("h2",{},"اختاري المبحث")));
  const gr=el("div",{class:"grid g4"});
  subjects().forEach(s=>{const p=subjProgress(s),n=s.units.reduce((a,u)=>a+u.lessons.length,0);
    gr.append(el("a",{class:"subj",href:"#/s/"+s.key,style:{"--c":s.color}},el("div",{class:"ic",html:svgI(s.icon)}),el("h3",{},s.name),el("span",{class:"meta"},s.units.length+" وحدات · "+n+" دروس"),el("div",{class:"bar"},el("i",{style:{width:p+"%"}})),el("span",{class:"meta"},p+"% مُنجَز")));});
  V.append(gr);
  V.append(el("div",{class:"sec-h"},el("h2",{},"أدوات العالِمة")),el("div",{class:"grid g4"},
    tool("#/labs","⚗️","المختبرات التفاعلية","محاكاة لكل درس"),tool("#/models","🧊","نماذج ثلاثية الأبعاد","دوّري وكبّري واستكشفي"),
    tool("#/books","📚","كتبي التفاعلية","اكتبي وظلّلي وحلّي على صفحات الكتاب"),tool("#/glossary","🔤","مسرد المصطلحات","عربي – إنجليزي مع البحث"),tool("#/me","🏅","إنجازاتي","الشارات والشهادات")));
  V.append(credit());
});
function tool(h,ic,t,d){return el("a",{class:"card tcard",href:h},el("span",{class:"ic"},ic),el("div",{},el("h3",{},t),el("p",{},d)));}

/* ---------- المبحث ---------- */
route(/^#\/s\/(\w+)$/,(V,k)=>{const s=G()[k];if(!s){go("#/");return;}
  V.append(crumbs(["الرئيسية","#/"],s.name+" · الصف "+S.grade));
  V.append(el("div",{class:"lhead",style:{"--c":s.color}},el("div",{class:"en"},"الصف "+S.grade+" · الفصل الدراسي الأول"),el("h1",{},s.name),el("div",{class:"idea"},subjProgress(s)+"% من دروس المبحث مُنجَزة")));
  if(k==="sci"||k==="chem")V.append(el("div",{class:"grid g2",style:{marginTop:"14px"}},el("a",{class:"card tcard",href:"chem3d/#ptable",target:"_blank",rel:"noopener"},el("span",{class:"ic"},"🧪"),el("div",{},el("h3",{},"الجدول الدوري التفاعلي"),el("p",{},"اضغطي على أي عنصر لتعرفي خصائصه وتدرّجها"))),
    el("a",{class:"card tcard",href:"labs/electrons.html",target:"_blank",rel:"noopener"},el("span",{class:"ic"},"⚛️"),el("div",{},el("h3",{},"ابني الذرّة"),el("p",{},"عبّئي الإلكترونات في المدارات حسب العدد الذرّي")))));
  s.units.forEach(u=>{const box=el("section",{class:"card unit",style:{"--c":s.color,marginTop:"16px"}});
    box.append(el("div",{class:"unit-h"},el("span",{class:"unit-n"},u.n),el("div",{},el("h3",{},"الوحدة "+u.n+": "+u.title),u.idea?el("p",{class:"muted small",style:{margin:0}},u.idea):null)));
    const ls=el("div",{class:"lessons"});
    u.lessons.forEach((l,i)=>ls.append(el("a",{class:"les"+(S.done[l.id]?" done":""),href:"#/l/"+l.id},el("span",{class:"st"},S.done[l.id]?"✓":i+1),
      el("div",{style:{flex:1}},el("b",{},"الدرس "+(i+1)+": "+l.title),el("small",{},(l.sims.length?"⚗️ "+l.sims.length+" محاكاة · ":"")+(l.exps.length?"🧫 "+l.exps.length+" تجارب · ":"")+"📝 "+l.quiz.length+" أسئلة")),
      S.best[l.id]!=null?el("span",{class:"tag"},S.best[l.id]+"%"):null)));
    box.append(ls,el("div",{class:"row",style:{marginTop:"12px"}},el("a",{class:"btn gold sm",href:"#/exam/"+u.id},"🎓 امتحان الوحدة"+(S.exams[u.id]!=null?" ("+S.exams[u.id]+"%)":""))));
    V.append(box);});
  V.append(credit());
});

/* ---------- الدرس ---------- */
var LTAB_FN={learn:lLearn,lab:lLab,exp:lExp,quiz:lQuiz,cards:lCards};
const LTABS=[["learn","📘 الدرس"],["lab","⚗️ المختبر"],["exp","🧫 التجارب"],["quiz","📝 اختبري نفسك"],["cards","🃏 المصطلحات"]];
route(/^#\/l\/([\w-]+)(?:\/(\w+))?$/,(V,id,tab)=>{const l=findLesson(id);if(!l){go("#/");return;}tab=tab||"learn";
  const s=subjOf(l),u=l.unit,idx=u.lessons.indexOf(l);S.last=l.id;save();
  V.style.setProperty("--c",s.color);
  V.append(crumbs(["الرئيسية","#/"],[s.name,"#/s/"+s.key],"الوحدة "+u.n));
  V.append(el("header",{class:"lhead",style:{"--c":s.color}},el("div",{class:"en"},"الوحدة "+u.n+": "+u.title+" · الدرس "+(idx+1)+" · ص "+l.pages),
    el("h1",{},l.title),el("div",{class:"en",style:{direction:"ltr",textAlign:"right"}},l.en),el("div",{class:"idea"},"💡 الفكرة الرئيسة: "+l.idea),
    (window.SCIBOOK&&SCIBOOK.lessonLink(l))?el("div",{class:"row",style:{marginTop:"10px"}},el("a",{class:"btn sm gold",href:SCIBOOK.lessonLink(l)},"📖 الدرس في الكتاب")):null));
  const tb=el("div",{class:"tabs",role:"tablist"});
  LTABS.forEach(([k,t])=>tb.append(el("button",{role:"tab","aria-selected":String(k===tab),onclick:()=>go("#/l/"+l.id+"/"+k)},t)));
  V.append(tb);const P=el("div");V.append(P);
  (LTAB_FN[tab]||lLearn)(P,l);
  const nav=el("div",{class:"row",style:{justifyContent:"space-between",marginTop:"20px"}});
  const prev=u.lessons[idx-1],next=u.lessons[idx+1];
  nav.append(prev?el("a",{class:"btn ghost sm",href:"#/l/"+prev.id},"→ "+prev.title):el("span"),next?el("a",{class:"btn ghost sm",href:"#/l/"+next.id},next.title+" ←"):el("a",{class:"btn gold sm",href:"#/exam/"+u.id},"🎓 امتحان الوحدة"));
  V.append(nav,credit());
});
function lLearn(P,l){
  P.append(el("section",{class:"card"},el("h3",{style:{marginBottom:"8px"}},"🎯 نتاجات التعلّم"),el("ul",{class:"outs"},...l.outcomes.map(o=>el("li",{},o)))));
  const pts=el("div",{class:"pts"});l.points.forEach(([h,p],i)=>pts.append(el("div",{class:"pt"},el("span",{class:"n"},i+1),el("div",{},el("h4",{},h),el("p",{},p)))));
  P.append(el("section",{class:"card",style:{marginTop:"14px"}},el("h3",{style:{marginBottom:"12px"}},"📚 خلاصة الدرس"),pts));
  if(l.m3d&&l.m3d.length&&window.M3D)l.m3d.forEach(k=>{if(M3D.has(k)){const box=el("section",{style:{marginTop:"14px"}});P.append(box);M3D.mount(box,k);}});
  P.append(el("section",{class:"card",style:{marginTop:"14px"}},el("h3",{style:{marginBottom:"10px"}},"🔤 المفاهيم والمصطلحات"),
    el("div",{class:"terms"},...l.terms.map(([a,e,d])=>el("div",{class:"term"},el("b",{},a),el("span",{class:"e"},e),el("div",{class:"small"},d))))));
  P.append(el("div",{class:"row",style:{marginTop:"14px"}},el("button",{class:"btn",onclick:()=>go("#/l/"+l.id+"/quiz")},"📝 اختبري فهمكِ الآن"),
    l.sims.length?el("button",{class:"btn ghost",onclick:()=>go("#/l/"+l.id+"/lab")},"⚗️ افتحي المختبر التفاعلي"):null));
  if(!S.seen["l:"+l.id]){S.seen["l:"+l.id]=1;save();addPts(5,"قرأتِ خلاصة الدرس");}
}
function lLab(P,l){
  const ci=l.sims.findIndex(x=>x.lab==="cell"),simFirst=ci>=0;const m3dHost=el("div");P.append(m3dHost);
  if(l.m3d&&l.m3d.length&&window.M3D)l.m3d.forEach(k=>{if(M3D.has(k)){const box=el("section",{style:{marginBottom:"14px"}});m3dHost.append(box);M3D.mount(box,k);}});
  if(!l.sims.length&&!(l.m3d||[]).length){P.append(el("div",{class:"card empty"},"لا توجد محاكاة لهذا الدرس بعد. جرّبي ",el("a",{href:"#/labs"},"المختبرات التفاعلية"),"."));return;}
  let cur=Math.max(0,ci);const chips=el("div",{class:"chips",style:{marginBottom:"10px"}}),box=el("div");
  const show=()=>{chips.innerHTML="";l.sims.forEach((x,i)=>chips.append(el("button",{class:"chip","aria-pressed":String(i===cur),onclick:()=>{cur=i;show();}},x.t)));
    const x=l.sims[cur];if(!x)return;const src=simHref(x);
    box.innerHTML="";box.append(el("div",{class:"simbox"},el("div",{class:"simbar"},el("b",{},"⚗️ "+x.t),el("a",{class:"btn sm ghost",href:src,target:"_blank",rel:"noopener"},"⛶ ملء الشاشة")),el("iframe",{src,title:x.t,loading:"lazy",allow:"fullscreen"})));
    const k="sim:"+x.lab+":"+x.id;if(!S.seen[k]){S.seen[k]=1;save();addPts(10,"جرّبتِ المحاكاة");}};
  if(l.sims.length){if(simFirst){P.insertBefore(chips,m3dHost);P.insertBefore(box,m3dHost);m3dHost.style.marginTop="14px";}else P.append(chips,box);show();}
  P.append(el("div",{class:"card",style:{marginTop:"14px"}},el("b",{},"🔎 جرّبي واكتشفي: "),"غيّري قيمة واحدة في كل مرّة، وسجّلي توقّعكِ قبل التغيير، ثم قارني النتيجة بتوقّعكِ. هكذا يعمل العلماء!"));
}
function lExp(P,l){
  if(!l.exps.length){P.append(el("div",{class:"card empty"},"لا توجد تجارب عملية مقرّرة لهذا الدرس في كتاب الأنشطة."));return;}
  const gr=el("div",{class:"grid"});
  l.exps.forEach((x,i)=>gr.append(el("article",{class:"exp"},el("div",{class:"exp-h"},el("span",{class:"tag"},x.kind),el("h3",{style:{marginTop:"6px",fontSize:"19px"}},x.t),el("small",{class:"muted"},x.src)),
    el("div",{class:"exp-b"},el("div",{},el("b",{},"🎯 الهدف: "),x.goal),el("div",{},el("b",{},"🧰 المواد والأدوات: "),x.mats),el("div",{},el("b",{},"⚠️ إرشادات السلامة: "),x.safety),
      el("h5",{},"خطوات العمل"),el("ol",{},...x.steps.map(s=>el("li",{},s))),x.qs&&x.qs.length?el("div",{},el("h5",{},"التحليل والاستنتاج"),el("ol",{},...x.qs.map(q=>el("li",{},q)))):null,
      el("div",{class:"row"},(x.sim||l.sims[0])?el("a",{class:"btn sm",href:simHref(x.sim||l.sims[0]),target:"_blank",rel:"noopener"},"⚗️ جرّبيها في المختبر التفاعلي"):null,
        (window.SCIBOOK&&SCIBOOK.expLink(l,x))?el("a",{class:"btn sm gold",href:SCIBOOK.expLink(l,x)},"📖 موقعها في الكتاب"):null,
        el("a",{class:"btn sm ghost",href:"#/ws/"+l.id+"/"+i},"🖨️ ورقة عمل التجربة"))))));
  P.append(gr);
}
/* ---------- اختبري نفسك ---------- */
function lQuiz(P,l){runQuiz(P,shuffle(l.quiz).map(q=>shuffleQ(q)),{title:l.title,onEnd:(sc,tot)=>{const pct=Math.round(sc/tot*100);
  const old=S.best[l.id];if(old==null||pct>old)S.best[l.id]=pct;if(pct>=60&&!S.done[l.id]){S.done[l.id]=1;addPts(20,"أنجزتِ الدرس");}save();
  submit({unit:subjOf(l).name+" · الوحدة "+l.unit.n,activity:"quiz",activityTitle:l.title,score:sc,total:tot});checkBadges();}});}
function shuffleQ(q){const idx=shuffle(q.o.map((_,i)=>i));return {q:q.q,o:idx.map(i=>q.o[i]),a:idx.indexOf(q.a),why:q.why};}
function runQuiz(P,qs,opt){let i=0,sc=0;const res=[];
  const draw=()=>{P.innerHTML="";const w=el("div",{class:"qwrap"});P.append(w);
    const pr=el("div",{class:"qprog"});qs.forEach((_,k)=>pr.append(el("i",{class:k<i?(res[k]?"ok":"no"):k===i?"cur":""})));w.append(pr);
    if(i>=qs.length){const pct=Math.round(sc/qs.length*100);opt.onEnd&&opt.onEnd(sc,qs.length);if(pct>=80)confetti();
      w.append(el("div",{class:"card score"},el("div",{class:"big"},pct+"%"),el("p",{},sc+" من "+qs.length+" إجابات صحيحة"),el("p",{class:"muted"},pct>=90?"ممتاز! أنتِ عالِمة حقيقية 🌟":pct>=70?"أحسنتِ! راجعي الأسئلة التي أخطأتِ فيها 👍":"لا بأس، راجعي خلاصة الدرس وحاولي من جديد 💪"),
        el("div",{class:"row",style:{justifyContent:"center"}},el("button",{class:"btn",onclick:()=>{i=0;sc=0;res.length=0;qs=shuffle(qs);draw();}},"🔁 أعيدي المحاولة"),opt.after||null)));
      const wrong=qs.filter((_,k)=>!res[k]);if(wrong.length)w.append(el("div",{class:"card",style:{marginTop:"14px"}},el("h3",{},"📌 راجعي هذه الأسئلة"),...wrong.map(q=>el("div",{class:"why"},el("b",{},q.q),el("div",{},"✔ "+q.o[q.a]),el("div",{class:"small"},q.why)))));
      return;}
    const q=qs[i],card=el("div",{class:"card"});w.append(card);
    card.append(el("div",{class:"muted small"},"السؤال "+(i+1)+" من "+qs.length),el("div",{class:"q"},q.q));
    const os=el("div",{class:"opts"});let answered=false;
    q.o.forEach((o,k)=>os.append(el("button",{class:"opt",onclick:e=>{if(answered)return;answered=true;const ok=k===q.a;res[i]=ok;if(ok){sc++;addPts(10);}
      [...os.children].forEach((b,j)=>{if(j===q.a)b.classList.add("ok");else if(j===k)b.classList.add("no");});
      card.append(el("div",{class:"why"},el("b",{},ok?"✅ إجابة صحيحة! ":"❌ الإجابة الصحيحة: "+q.o[q.a]+". "),q.why||""),el("div",{class:"row",style:{marginTop:"12px"}},el("button",{class:"btn",onclick:()=>{i++;draw();}},i+1<qs.length?"السؤال التالي ←":"اعرضي النتيجة")));}},
      el("span",{class:"k"},AR_LET[k]),o)));
    card.append(os);};
  draw();}
/* ---------- بطاقات المصطلحات ---------- */
function lCards(P,l){let i=0;const terms=l.terms;
  const draw=()=>{P.innerHTML="";const t=terms[i];const f=el("div",{class:"flash"},el("div",{class:"in"},el("div",{class:"face fr"},el("b",{},t[0]),el("span",{},t[1]),el("small",{},"اضغطي لقلب البطاقة")),el("div",{class:"face bk"},t[2])));
    f.onclick=()=>f.classList.toggle("f");
    P.append(f,el("div",{class:"row",style:{justifyContent:"center",marginTop:"14px"}},el("button",{class:"btn ghost sm",onclick:()=>{i=(i-1+terms.length)%terms.length;draw();}},"→ السابقة"),el("span",{class:"muted"},(i+1)+" / "+terms.length),el("button",{class:"btn ghost sm",onclick:()=>{i=(i+1)%terms.length;draw();}},"التالية ←")));};
  draw();}

/* ---------- امتحان الوحدة والشهادة ---------- */
route(/^#\/exam\/([\w-]+)$/,(V,id)=>{const u=findUnit(id);if(!u){go("#/");return;}const s=SCI.data[u.grade][u.subj];
  V.append(crumbs(["الرئيسية","#/"],[s.name,"#/s/"+s.key],"امتحان الوحدة "+u.n));
  V.append(el("div",{class:"lhead",style:{"--c":s.color}},el("div",{class:"en"},s.name+" · الصف "+u.grade),el("h1",{},"🎓 امتحان الوحدة "+u.n+": "+u.title),el("div",{class:"idea"},"اجتازي الامتحان بنسبة "+CONFIG.PASS+"% أو أكثر لتحصلي على شهادة تقدير باسمكِ.")));
  const pool=shuffle(u.lessons.flatMap(l=>l.quiz)).slice(0,Math.min(15,u.lessons.flatMap(l=>l.quiz).length)).map(shuffleQ);
  const P=el("div",{style:{marginTop:"16px"}});V.append(P);
  runQuiz(P,pool,{onEnd:(sc,tot)=>{const pct=Math.round(sc/tot*100);if(S.exams[u.id]==null||pct>S.exams[u.id])S.exams[u.id]=pct;
    if(pct>=CONFIG.PASS){if(!S.certs.find(c=>c.u===u.id))S.certs.push({u:u.id,pct,date:new Date().toLocaleDateString("ar-JO-u-nu-latn",{day:"numeric",month:"long",year:"numeric"})});addPts(50,"اجتزتِ امتحان الوحدة");}
    save();submit({unit:s.name+" · الوحدة "+u.n,activity:"exam",activityTitle:"امتحان الوحدة: "+u.title,score:sc,total:tot,passed:pct>=CONFIG.PASS});checkBadges();},
    after:el("a",{class:"btn gold",href:"#/me"},"🏅 شهاداتي")});
  V.append(credit());
});
route(/^#\/me$/,V=>{V.append(crumbs(["الرئيسية","#/"],"إنجازاتي"));
  V.append(el("section",{class:"card"},el("h2",{style:{marginBottom:"12px"}},"🏅 شاراتي"),el("div",{class:"badges"},...BADGES.map(b=>el("div",{class:"bdg"+(S.badges.includes(b.id)?"":" off")},el("span",{class:"m"},b.ic),b.t)))));
  const cs=el("section",{class:"card",style:{marginTop:"14px"}},el("h2",{style:{marginBottom:"12px"}},"📜 شهاداتي"));
  if(!S.certs.length)cs.append(el("p",{class:"muted"},"اجتازي امتحان أي وحدة بنسبة "+CONFIG.PASS+"% لتظهر شهادتكِ هنا."));
  S.certs.forEach(c=>{const u=findUnit(c.u);if(!u)return;const s=SCI.data[u.grade][u.subj];cs.append(el("div",{class:"les",style:{"--c":s.color}},el("span",{class:"st"},"🎓"),el("div",{style:{flex:1}},el("b",{},s.name+" · الوحدة "+u.n+": "+u.title),el("small",{},c.pct+"% · "+c.date)),el("button",{class:"btn sm",onclick:()=>printCert(c,u,s)},"🖨️ طباعة")));});
  V.append(cs,el("div",{class:"row",style:{marginTop:"14px"}},el("button",{class:"btn ghost sm",onclick:()=>{if(confirm("تغيير الاسم أو الصف أو الشعبة؟")){S.name="";save();go("#/");}}},"✏️ تعديل بياناتي")),credit());
});
function printCert(c,u,s){const w=window.open("","_blank");if(!w){toast("اسمحي بالنوافذ المنبثقة للطباعة");return;}
  w.document.write(`<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>شهادة تقدير</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&family=El+Messiri:wght@700&display=swap" rel="stylesheet"><style>
  @page{size:A4 landscape;margin:0}body{margin:0;font-family:Cairo,sans-serif}.c{width:297mm;height:210mm;box-sizing:border-box;padding:16mm;background:#FBF7F3;position:relative}
  .b{position:absolute;inset:10mm;border:3px solid #7A1F2E;outline:2px solid #B8902A;outline-offset:-8px;border-radius:8px}.in{position:relative;text-align:center;padding-top:18mm}
  h1{font-family:'El Messiri';font-size:52px;color:#7A1F2E;margin:4mm 0}h2{font-family:'El Messiri';font-size:38px;color:#B8902A;margin:6mm 0}p{font-size:21px;margin:3mm 0}.s{display:flex;justify-content:space-around;margin-top:16mm;font-size:17px}</style>
  <div class="c"><div class="b"></div><div class="in"><p style="color:#7A1F2E;font-weight:700">${esc(CONFIG.SCHOOL)}</p><h1>شهادة تقدير</h1><p>تتقدّم منصّة العلوم بالتهنئة إلى الطالبة</p><h2>${esc(S.name)}</h2>
  <p>لاجتيازها امتحان الوحدة ${u.n} «${esc(u.title)}» في مبحث ${esc(s.name)} للصف ${esc(u.grade)}</p><p>بنسبة <b>${c.pct}%</b> بتاريخ ${esc(c.date)}، متمنّين لها دوام التفوّق والنجاح.</p>
  <div class="s"><span>معلّمة المبحث<br>........................</span><span>مديرة المدرسة<br>........................</span></div><p style="font-size:12px;color:#888;margin-top:10mm">منصّة العلوم · تصميمُ المنصّة وتنفيذُها: ${esc(CONFIG.DESIGNER)}</p></div></div><script>onload=()=>setTimeout(()=>print(),400)<\/script>`);w.document.close();}

/* ---------- المسرد والمختبرات والنماذج ---------- */
route(/^#\/glossary$/,V=>{V.append(crumbs(["الرئيسية","#/"],"مسرد المصطلحات"));
  const q=el("input",{class:"inp",placeholder:"ابحثي عن مصطلح بالعربية أو الإنجليزية…",type:"search"});const box=el("div",{class:"terms",style:{marginTop:"12px"}});
  const all=allLessons().flatMap(l=>l.terms.map(t=>({t,l})));
  const draw=()=>{const v=q.value.trim().toLowerCase();box.innerHTML="";all.filter(({t})=>!v||t[0].includes(v)||t[1].toLowerCase().includes(v)||t[2].includes(v)).sort((a,b)=>a.t[0].localeCompare(b.t[0],"ar"))
    .forEach(({t,l})=>box.append(el("div",{class:"term"},el("b",{},t[0]),el("span",{class:"e"},t[1]),el("div",{class:"small"},t[2]),el("a",{class:"small",href:"#/l/"+l.id,style:{color:"var(--muted)"}},subjOf(l).short+" · "+l.title))));
    if(!box.children.length)box.append(el("div",{class:"empty"},"لا نتائج."));};
  q.oninput=draw;V.append(el("div",{class:"card"},el("h2",{},"📖 مسرد المصطلحات · الصف "+S.grade),el("p",{class:"muted"},all.length+" مصطلحًا علميًّا"),q),box,credit());draw();
});
route(/^#\/labs$/,V=>{V.append(crumbs(["الرئيسية","#/"],"المختبرات التفاعلية"));
  V.append(el("div",{class:"hero"},el("div",{class:"orb"}),el("h1",{},"⚗️ المختبرات التفاعلية"),el("p",{},"غيّري القيم، توقّعي، جرّبي، واكتشفي القانون بنفسكِ")));
  const LABS=[["electrons","⚛️ ابني الذرّة: تعبئة الإلكترونات","اسحبي البروتونات والنيوترونات إلى النواة والإلكترونات إلى المدارات، ويرفض المدار إذا امتلأ","#2563c9"],["shapes","🧊 الشكل الفراغي والتهجين والقطبية","جزيئات ثلاثية الأبعاد تدوّرينها: زوايا الروابط، التهجين sp وsp² وsp³، وأسهم القطبية وفرق الكهرسلبية","#1a9fc4"],["bonds","🔗 أنواع الروابط الكيميائية (الصف العاشر)","قرّبي الذرّات وشاهدي الرابطة الأيونية والتساهمية والفلزّية والهيدروجينية وقوى فاندرفالز","#8e44c9"],["orbitals","🧪 التوزيع الإلكتروني بالأفلاك (الصف العاشر)","ضعي الإلكترونات في أفلاك s وp وd وفق أوفباو وهوند وباولي، وشاهدي الصيغة المكتوبة والمستويات والدورة والمجموعة","#c2297a"],["lab3d","🔬 المختبر ثلاثي الأبعاد (جديد)","تجارب الكتاب كأنها أمامكِ: كشف اللهب، الكواشف، الخاصية الأسموزية، الاحتكاك، تبلور الصخور… توقّعي وجرّبي وسجّلي واكتبي تقريرك","#5C1622"],["genetics","🧬 مختبر الوراثة","اختاري الصفة وطراز الأبوين الجيني، وتوقّعي، وشاهدي الأبناء في مربّع بانيت، وتحدّي المحقّقة","#2f8f5b"],["fluids","💧 مختبر الموائع","ضغط السائل، الرافعة الهيدروليكية، الغوّاص الديكارتي، الطفو ومبدأ أرخميدس، والكثافة","#1d7f8c"],["measure","📏 مختبر القياس الدقيق","الورنية والميكروميتر وخطأ اختلاف المنظر مع عدسة مكبّرة وتحدّي القراءة","#7A1F2E"],["chem3d","🧊 مختبر الكيمياء ثلاثي الأبعاد","جزيئات وبلورات وموازنة معادلات واتزان كيميائي بالمجسّمات","#2563c9"],["biology","🌿 مختبر العلوم الحياتية","الخلية، الانتشار، الانقسام، البناء الضوئي، الوراثة…","#2f8f5b"],["chemistry","🧪 مختبر الكيمياء","الذرة، الجدول الدوري، الروابط، الغازات، المعايرة…","#c2297a"],["physics","⚡ مختبر الفيزياء","المتجهات، الحركة، المقذوفات، نيوتن، الضوء…","#c98408"],["earth","🌍 مختبر علوم الأرض","الصفائح، الزلازل، الصخور، الغلاف الجوي، النجوم…","#7a4fb5"]];
  const g=el("div",{class:"grid g2",style:{marginTop:"16px"}});LABS.forEach(([k,t,d,c])=>g.append(el("a",{class:"subj",href:k==="chem3d"?"chem3d/":k==="lab3d"?"lab3d/":"labs/"+k+".html",target:"_blank",rel:"noopener",style:{"--c":c,minHeight:"auto"}},el("h3",{},t),el("span",{class:"meta"},d))));
  V.append(g);
  const per=el("section",{class:"card",style:{marginTop:"16px"}},el("h3",{style:{marginBottom:"10px"}},"المحاكاة حسب دروس الصف "+S.grade));
  allLessons().filter(l=>l.sims.length).forEach(l=>per.append(el("a",{class:"les",href:"#/l/"+l.id+"/lab",style:{"--c":subjOf(l).color,marginBottom:"8px"}},el("span",{class:"st"},"⚗️"),el("div",{},el("b",{},l.title),el("small",{},subjOf(l).short+" · "+l.sims.map(x=>x.t).join("، "))))));
  V.append(per,credit());
});
route(/^#\/models$/,V=>{V.append(crumbs(["الرئيسية","#/"],"نماذج ثلاثية الأبعاد"));
  V.append(el("div",{class:"hero"},el("div",{class:"orb"}),el("h1",{},"🧊 نماذج ثلاثية الأبعاد"),el("p",{},"اسحبي للتدوير · إصبعان للتكبير · اضغطي على أي جزء لتعرفي اسمه ووظيفته")));
  if(!window.M3D){V.append(el("div",{class:"card empty"},"جارٍ التحميل…"));return;}
  M3D.list().forEach(([k,t])=>{const s=el("section",{style:{marginTop:"16px"}});V.append(s);M3D.mount(s,k);});V.append(credit());
});

/* ---------- ورقة عمل التجربة (للطباعة) ---------- */
route(/^#\/ws\/([\w-]+)\/(\d+)$/,(V,id,i)=>{const l=findLesson(id),x=l&&l.exps[+i];if(!x){go("#/");return;}const s=subjOf(l);
  V.append(crumbs(["الرئيسية","#/"],[l.title,"#/l/"+l.id+"/exp"],"ورقة عمل"));
  V.append(el("div",{class:"ptools"},el("button",{class:"btn",onclick:()=>print()},"🖨️ طباعة / حفظ PDF"),el("span",{class:"muted small"},"يمكنكِ تعديل أي نص بالضغط عليه قبل الطباعة")));
  const p=el("div",{class:"paper"});p.append(paperHead(s.name,l.grade),el("h2",{contenteditable:""},"ورقة عمل: "+x.t),
    el("table",{class:"info"},el("tr",{},el("td",{},"اسم الطالبة: ............................................"),el("td",{},"الشعبة: ........"),el("td",{},"التاريخ: ...../...../......."))),
    el("div",{class:"box"},el("b",{},"الهدف: "),el("span",{contenteditable:""},x.goal)),el("div",{class:"box"},el("b",{},"المواد والأدوات: "),el("span",{contenteditable:""},x.mats)),
    el("div",{class:"box"},el("b",{},"⚠ إرشادات السلامة: "),el("span",{contenteditable:""},x.safety)),
    el("div",{class:"box"},el("b",{},"توقّعي قبل التجربة: "),el("div",{class:"lines"}),el("div",{class:"lines"})),
    el("div",{class:"box"},el("b",{},"خطوات العمل:"),el("ol",{contenteditable:""},...x.steps.map(s=>el("li",{},s)))),
    el("div",{class:"box"},el("b",{},"ملاحظاتي ونتائجي (جدول/رسم):"),el("div",{style:{height:"120px"}})),
    el("div",{class:"box"},el("b",{},"التحليل والاستنتاج:"),...(x.qs||[]).map((q,k)=>el("div",{},el("div",{contenteditable:""},(k+1)+") "+q),el("div",{class:"lines"}),el("div",{class:"lines"})))),
    el("div",{class:"box"},el("b",{},"ما الذي تعلّمته؟ "),el("div",{class:"lines"})),el("div",{class:"credit"},"منصّة العلوم · "+CONFIG.SCHOOL+" · تصميم وتنفيذ: "+CONFIG.DESIGNER));
  V.append(p);
});
function paperHead(subj,grade){return el("div",{class:"ph"},el("div",{class:"small"},"وزارة التربية والتعليم",el("br"),el("span",{contenteditable:""},CONFIG.DIR)),
  el("div",{class:"c"},el("b",{contenteditable:""},CONFIG.SCHOOL),el("div",{class:"small",contenteditable:""},"المبحث: "+subj+" · الصف: "+grade)),el("div",{class:"small"},"العام الدراسي",el("br"),el("span",{contenteditable:""},CONFIG.YEAR)));}
