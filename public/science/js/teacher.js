/* منصّة العلوم — ركن المعلّمة */
let T_OK=lsGet("qatrana.sci.tok",null)===CONFIG.T_HASH;let PIN="";try{PIN=sessionStorage.getItem("qatrana.sci.pin")||"";}catch(e){}
function pinHash(s){let a=5381,b=52711;for(const c of s){const k=c.codePointAt(0);a=((a*33)^k)>>>0;b=((b*31)+k*7)>>>0;}return a.toString(36)+b.toString(36);}
function tGate(V,next){const pin=el("input",{class:"inp",type:"password",inputmode:"numeric",autocomplete:"off",placeholder:"الرمز السرّي للمعلّمة"});const err=el("p",{class:"muted","aria-live":"polite"});
  const ok=()=>{const v=pin.value.trim();if(pinHash(v)!==CONFIG.T_HASH){err.textContent="الرمز غير صحيح.";pin.value="";return;}T_OK=true;PIN=v;lsSet("qatrana.sci.tok",CONFIG.T_HASH);try{sessionStorage.setItem("qatrana.sci.pin",v);}catch(e){}render();};
  pin.onkeydown=e=>{if(e.key==="Enter")ok();};
  V.append(crumbs(["الرئيسية","#/"],"ركن المعلّمة"),el("div",{class:"card",style:{maxWidth:"460px",margin:"30px auto",display:"grid",gap:"12px",textAlign:"center"}},el("div",{style:{fontSize:"44px"}},"👩‍🏫"),el("h2",{},"ركن المعلّمة"),el("p",{class:"muted"},"خطط الدروس والخطط الفصلية واستراتيجيات التدريس والتقويم ونتائج الطالبات."),pin,el("button",{class:"btn",onclick:ok},"دخول"),err));}
const needT=fn=>(V,...a)=>{if(!T_OK){tGate(V);return;}fn(V,...a);};

/* اختيار الصف والمبحث والدرس في أدوات المعلّمة */
let TG=lsGet("qatrana.sci.tg","التاسع");
function pickers(onChange,opt={}){const w=el("div",{class:"tools noprint"});
  const gs=el("select",{"aria-label":"الصف"},...Object.keys(SCI.data).map(g=>el("option",{value:g},"الصف "+g)));gs.value=SCI.data[TG]?TG:Object.keys(SCI.data)[0];TG=gs.value;
  const ss=el("select",{"aria-label":"المبحث"});const ls=el("select",{"aria-label":"الدرس أو الوحدة"});
  const fillS=()=>{ss.innerHTML="";SUBJ_ORDER.filter(k=>SCI.data[TG][k]).forEach(k=>ss.append(el("option",{value:k},SCI.data[TG][k].name)));if(opt.subj&&SCI.data[TG][opt.subj])ss.value=opt.subj;fillL();};
  const fillL=()=>{ls.innerHTML="";const s=SCI.data[TG][ss.value];if(!s)return;
    s.units.forEach(u=>{if(opt.units)ls.append(el("option",{value:u.id},"الوحدة "+u.n+": "+u.title));else{const og=el("optgroup",{label:"الوحدة "+u.n+": "+u.title});u.lessons.forEach(l=>og.append(el("option",{value:l.id},l.title)));ls.append(og);}});
    if(opt.sel)ls.value=opt.sel;};
  gs.onchange=()=>{TG=gs.value;lsSet("qatrana.sci.tg",TG);fillS();onChange(ss.value,ls.value);};ss.onchange=()=>{fillL();onChange(ss.value,ls.value);};ls.onchange=()=>onChange(ss.value,ls.value);
  fillS();w.append(gs,ss);if(!opt.noLesson)w.append(ls);w.vals=()=>[ss.value,ls.value];return w;}
function ptools(extra){return el("div",{class:"ptools noprint"},el("button",{class:"btn",onclick:()=>print()},"🖨️ طباعة / حفظ PDF"),el("button",{class:"btn ghost sm",onclick:e=>{wordExport(e.target.closest("main").querySelector(".paper"));}},"⬇ Word"),extra||null,el("span",{class:"muted small"},"✏️ كل النصوص قابلة للتعديل بالضغط عليها"));}
function wordExport(p){if(!p)return;const html=`<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><style>body{font-family:'Sakkal Majalla','Traditional Arabic',Arial;direction:rtl;font-size:14pt}table{border-collapse:collapse;width:100%}td,th{border:1px solid #555;padding:4px;vertical-align:top}th{background:#f3e7e9}h2{text-align:center;color:#7A1F2E}</style></head><body dir="rtl">${p.innerHTML.replace(/contenteditable=""/g,"")}</body></html>`;
  const a=el("a",{href:URL.createObjectURL(new Blob(["﻿"+html],{type:"application/msword"})),download:(p.querySelector("h2")||{}).textContent+".doc"});document.body.append(a);a.click();setTimeout(()=>a.remove(),500);}
const ce=(t,tag="span")=>el(tag,{contenteditable:""},t);
const nPages=l=>{const m=String(l.pages||"").match(/(\d+)\D+(\d+)/);return m?(+m[2]-+m[1]+1):6;};
const periodsFor=l=>Math.max(2,Math.min(6,Math.round(nPages(l)/3)));
const OUT_SKILL=/^(أرسم|أوظّف|أوظف|أستقصي|أستخدم|أصمّم|أصمم|أحسب|أقيس|أمثّل|أجري|أطبّق|أنفّذ|أفسّر|أحلّل|أصنّف|أتنبّأ)/;
const OUT_VALUE=/^(أقدّر|أقدر|أحترم|ألتزم|أُظهر|أظهر|أحافظ|أتعاون|أعتزّ|أثمّن)/;

/* ---------- الرئيسية ---------- */
route(/^#\/t$/,needT(V=>{V.append(crumbs(["الرئيسية","#/"],"ركن المعلّمة"));
  V.append(el("div",{class:"hero"},el("div",{class:"orb"}),el("h1",{},"👩‍🏫 ركن المعلّمة"),el("p",{},"أدوات تخطيط وتدريس وتقويم جاهزة ومرتبطة بدروس الكتاب، قابلة للتعديل والطباعة")));
  const T=[["#/t/class","👥","صفّي: الفرق وتقييم الحصة","أسماء الطالبات، تقسيم الفرق، رصد المشاركة والغياب، وسجلّ التقييم"],["#/t/plan","📝","خطة الدرس","نموذج تخطيط درس كامل بدورة التعلّم الخماسية لكل درس"],["#/t/semester","📅","الخطة الفصلية","توزيع الوحدات والدروس على أسابيع الفصل بالتواريخ"],
   ["#/books","📖","الكتاب على السبّورة","صفحات الكتاب بفراغات للشرح وحلّ الأسئلة بالقلم، وكل تجربة مربوطة بالمختبر التفاعلي"],["#/t/analysis","🔎","تحليل المحتوى","المفاهيم والحقائق والمهارات والقيم لكل وحدة"],["#/t/strategies","🧩","بنك استراتيجيات التدريس","14 استراتيجية بخطوات تنفيذها ونماذجها"],
   ["#/t/assess","📊","استراتيجيات التقويم وأدواته","سلالم تقدير، قوائم رصد، سجلات، بطاقات خروج جاهزة"],["#/t/test","🧾","بنك الأسئلة والاختبارات","اختبار قصير أو امتحان وحدة مع مفتاح الإجابة"],
   ["#/t/contest","🏆","المسابقة الصفية","مسابقة بين المجموعات على الشاشة التفاعلية"],["#/t/results","📈","نتائج الطالبات","متابعة إنجاز الطالبات واختباراتهن"],
   ["#/t/remedial","🩺","تشخيص فوري – علاج فوري","تحليل الأخطاء الشائعة وخطة علاجية لكل درس"]];
  const g=el("div",{class:"grid g3",style:{marginTop:"16px"}});T.forEach(([h,ic,t,d])=>g.append(tool(h,ic,t,d)));V.append(g);
  V.append(el("div",{class:"row",style:{marginTop:"16px"}},el("button",{class:"btn ghost sm",onclick:()=>{if(confirm("قفل ركن المعلّمة على هذا الجهاز؟")){T_OK=false;lsSet("qatrana.sci.tok",null);go("#/");}}},"🔒 قفل ركن المعلّمة")),credit());}));

/* ---------- خطة الدرس ---------- */
route(/^#\/t\/plan(?:\/([\w-]+))?$/,needT((V,id)=>{let l=id&&findLesson(id)||allLessons(TG)[0];if(l)TG=l.grade;
  V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"خطة الدرس"));
  V.append(pickers((s,lid)=>go("#/t/plan/"+lid),{subj:l.subj,sel:l.id}),ptools());V.append(planPaper(l));}));
function planPaper(l){const s=subjOf(l),u=l.unit,per=periodsFor(l),x=l.exps[0],sim=l.sims[0];
  const teach=["دورة التعلّم الخماسية (5E)",x?"الاستقصاء العلمي (تجربة عملية)":"التعلّم التعاوني",sim?"المحاكاة الحاسوبية التفاعلية":"فكّري – زاوجي – شاركي","المناقشة والحوار"];
  const q0=l.quiz[0];
  const steps=[
   ["الانشغال (التهيئة)","10 د",[`أعرض الفكرة الرئيسة على الشاشة: «${l.idea}».`,`أطرح سؤالًا مثيرًا للتفكير: «${q0?q0.q:"ماذا تعرفين عن "+l.title+"؟"}» وأستمع لإجابات الطالبات دون تصحيح.`,"أربط الدرس بالتعلّم القبلي وأعرض نتاجات الدرس."]],
   ["الاستكشاف","15 د",[x?`تنفّذ المجموعات ${x.kind} «${x.t}» (${x.src}) وفق ورقة العمل المطبوعة من المنصّة.`:"توزيع الطالبات في مجموعات تعاونية لدراسة الشكل/النص في الكتاب.",sim?`تستكشف الطالبات محاكاة «${sim.t}» على المنصّة، وتسجّل كل مجموعة توقّعها ثم ملاحظاتها.`:"تسجّل كل مجموعة ملاحظاتها في جدول."]],
   ["التفسير","15 د",["تعرض المجموعات نتائجها، وأوجّه النقاش للوصول إلى المفاهيم: "+l.terms.slice(0,5).map(t=>t[0]).join("، ")+".",...l.points.slice(0,3).map(p=>"أوضّح: "+p[0]+" — "+p[1])]],
   ["التوسّع","10 د",[l.m3d&&l.m3d.length?"أعرض النموذج ثلاثي الأبعاد على الشاشة التفاعلية وتحدّد الطالبات أجزاءه.":"أطرح موقفًا حياتيًّا تطبّق فيه الطالبات المفهوم.",...(l.points[3]?["أناقش: "+l.points[3][0]+"."]:[])]],
   ["التقويم","5 د",["تجيب الطالبات عن «اختبري نفسك» على المنصّة (أو أسئلة قصيرة شفوية).","بطاقة خروج: أهم فكرة تعلّمتها اليوم، وسؤال ما زال لديّ."]]];
  const p=el("div",{class:"paper land"});
  p.append(paperHead(s.name,l.grade),el("h2",{},"خطة درس"),
   el("table",{class:"info"},el("tr",{},el("td",{},el("b",{},"الصف: "),ce(l.grade)),el("td",{},el("b",{},"المبحث: "),ce(s.name)),el("td",{},el("b",{},"عنوان الوحدة: "),ce(u.title)),el("td",{},el("b",{},"عنوان الدرس: "),ce(l.title))),
     el("tr",{},el("td",{},el("b",{},"عدد الحصص: "),ce(String(per))),el("td",{},el("b",{},"الصفحات: "),ce(l.pages)),el("td",{},el("b",{},"التاريخ: من "),ce("..../..../...."),el("b",{}," إلى "),ce("..../..../....")),el("td",{},el("b",{},"الشعبة: "),ce("....")))),
   el("table",{},el("tr",{},el("th",{style:{width:"22%"}},"التعلّم القبلي"),el("td",{},ce("المفاهيم المرتبطة من الدروس السابقة: "+(prevLesson(l)?prevLesson(l).title:"معرفة سابقة من الصف السابق")))),
     el("tr",{},el("th",{},"التكامل الأفقي والرأسي"),el("td",{},ce("الرياضيات (تمثيل البيانات بيانيًّا) · اللغة العربية (التعبير العلمي) · التكنولوجيا (المحاكاة) · رأسيًّا مع دروس الصف السابق واللاحق.")))),
   el("table",{},el("tr",{},el("th",{},"النتاجات الخاصة"),el("th",{},"المواد والأدوات ومصادر التعلّم"),el("th",{},"استراتيجيات التدريس"),el("th",{},"استراتيجيات التقويم"),el("th",{},"أدوات التقويم")),
     el("tr",{},el("td",{},el("ol",{contenteditable:""},...l.outcomes.map(o=>el("li",{},o)))),el("td",{},ce("الكتاب المدرسي ص "+l.pages+"، كتاب الأنشطة، منصّة العلوم (المحاكاة والنماذج ثلاثية الأبعاد)، الشاشة التفاعلية"+(x?"، "+x.mats:""),"div")),
       el("td",{},el("ul",{contenteditable:""},...teach.map(t=>el("li",{},t)))),el("td",{},el("ul",{contenteditable:""},el("li",{},"التقويم المعتمد على الأداء"),el("li",{},"الملاحظة"),el("li",{},"القلم والورقة"))),
       el("td",{},el("ul",{contenteditable:""},el("li",{},"سلم تقدير عددي"),el("li",{},"قائمة رصد"),el("li",{},"اختبار قصير"))))),
   el("table",{},el("tr",{},el("th",{style:{width:"16%"}},"المرحلة"),el("th",{},"الإجراءات (دور المعلّمة والطالبة)"),el("th",{style:{width:"9%"}},"الزمن")),
     ...steps.map(([h,t,list])=>el("tr",{},el("th",{},h),el("td",{},el("ul",{contenteditable:""},...list.map(i=>el("li",{},i)))),el("td",{class:"center"},ce(t))))),
   el("table",{},el("tr",{},el("th",{colspan:3},"التأمّل الذاتي")),el("tr",{},el("th",{},"أشعر بالرضا عن"),el("th",{},"تحدّيات واجهتني"),el("th",{},"اقتراحات للتحسين")),el("tr",{},el("td",{style:{height:"60px"}},ce("")),el("td",{},ce("")),el("td",{},ce("")))),
   el("table",{},el("tr",{},el("th",{},"اليوم والتاريخ"),el("th",{},"الشعبة"),el("th",{},"الحصة"),el("th",{},"ما تمّ إنجازه"),el("th",{},"الواجب")),...[1,2,3].map(()=>el("tr",{},...[0,1,2,3,4].map(()=>el("td",{style:{height:"28px"}},ce("")))))),
   el("div",{class:"sig"},el("span",{},"معلّمة المبحث: ",ce("...................")),el("span",{},"المشرف التربوي: ",ce("...................")),el("span",{},"مديرة المدرسة: ",ce("..................."))),
   el("div",{class:"credit"},"أُعدّت من منصّة العلوم · "+CONFIG.SCHOOL+" · تصميم وتنفيذ: "+CONFIG.DESIGNER));
  return p;}
function prevLesson(l){const all=l.unit.lessons,i=all.indexOf(l);if(i>0)return all[i-1];const us=subjOf(l).units,ui=us.indexOf(l.unit);return ui>0?us[ui-1].lessons.slice(-1)[0]:null;}

/* ---------- الخطة الفصلية ---------- */
route(/^#\/t\/semester(?:\/(\w+))?$/,needT((V,k)=>{V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"الخطة الفصلية"));
  const st=lsGet("qatrana.sci.sem",{start:"2026-08-30",ppw:3,off:""});
  const box=el("div");
  const draw=(sk)=>{box.innerHTML="";const s=SCI.data[TG][sk||k]||SCI.data[TG][SUBJ_ORDER.find(x=>SCI.data[TG][x])];box.append(semPaper(s,st));};
  const start=el("input",{type:"date",value:st.start}),ppw=el("input",{type:"number",min:1,max:6,value:st.ppw,style:{width:"70px"}});
  const upd=()=>{st.start=start.value;st.ppw=+ppw.value||3;lsSet("qatrana.sci.sem",st);draw(pk.vals()[0]);};start.onchange=upd;ppw.onchange=upd;
  const pk=pickers((s)=>draw(s),{noLesson:true,subj:k});
  V.append(pk,el("div",{class:"tools noprint"},el("label",{},"بداية الفصل: ",start),el("label",{},"عدد الحصص أسبوعيًّا: ",ppw)),ptools(),box);draw(pk.vals()[0]);}));
function semPaper(s,st){let d=new Date(st.start+"T00:00:00");const fmt=x=>x.getDate()+"/"+(x.getMonth()+1);
  const addPeriods=n=>{const from=new Date(d);let left=n;let wkLeft=st.ppw;while(left>0){left--;wkLeft--;if(wkLeft<=0){d.setDate(d.getDate()+7);wkLeft=st.ppw;}}const to=new Date(d);to.setDate(to.getDate()+4);return[from,to];};
  const p=el("div",{class:"paper land"});
  p.append(paperHead(s.name,s.grade),el("h2",{},"الخطة الفصلية · الفصل الدراسي الأول"),
   el("table",{class:"info"},el("tr",{},el("td",{},el("b",{},"الصف: "),ce(s.grade)),el("td",{},el("b",{},"المبحث: "),ce(s.name)),el("td",{},el("b",{},"عدد الوحدات: "),ce(String(s.units.length))),el("td",{},el("b",{},"عدد الحصص أسبوعيًّا: "),ce(String(st.ppw))))));
  const t=el("table",{},el("tr",{},el("th",{},"الوحدة / الدرس"),el("th",{},"عدد الحصص"),el("th",{},"الفترة الزمنية"),el("th",{},"النتاجات"),el("th",{},"المواد والتجهيزات"),el("th",{},"استراتيجيات التدريس"),el("th",{},"التقويم: الاستراتيجية / الأداة"),el("th",{},"أنشطة مرافقة"),el("th",{},"تأمّل ذاتي")));
  s.units.forEach(u=>{t.append(el("tr",{},el("th",{colspan:9,style:{background:"#fbf1d6",color:"#5c3d00"}},ce("الوحدة "+u.n+": "+u.title+(u.pages?" (ص "+u.pages+")":"")))));
    u.lessons.forEach(l=>{const n=periodsFor(l),[a,b]=addPeriods(n);
      t.append(el("tr",{},el("td",{},ce(l.title)),el("td",{class:"center"},ce(String(n))),el("td",{},ce(fmt(a)+" – "+fmt(b))),el("td",{},el("ul",{contenteditable:""},...l.outcomes.slice(0,4).map(o=>el("li",{},o)))),
        el("td",{},ce((l.exps[0]?l.exps[0].mats:"الكتاب المدرسي")+"، منصّة العلوم")),el("td",{},ce(l.exps.length?"الاستقصاء، التعلّم التعاوني، المحاكاة":"دورة التعلّم الخماسية، فكّري-زاوجي-شاركي")),
        el("td",{},ce("الأداء/سلم تقدير · القلم والورقة/اختبار قصير")),el("td",{},ce(l.sims.length?"محاكاة: "+l.sims.map(x=>x.t).join("، "):"نشاط من كتاب الأنشطة")),el("td",{},ce(""))));});
    const [a,b]=addPeriods(1);t.append(el("tr",{},el("td",{},ce("مراجعة الوحدة وامتحانها")),el("td",{class:"center"},ce("1")),el("td",{},ce(fmt(a)+" – "+fmt(b))),el("td",{colspan:6},ce("امتحان الوحدة على المنصّة + أسئلة مراجعة الوحدة في الكتاب"))));});
  p.append(t,el("div",{class:"sig"},el("span",{},"معلّمة المبحث: ",ce("...................")),el("span",{},"رئيسة القسم: ",ce("...................")),el("span",{},"مديرة المدرسة: ",ce("..................."))),
   el("div",{class:"credit"},"أُعدّت من منصّة العلوم · "+CONFIG.SCHOOL+" · تصميم وتنفيذ: "+CONFIG.DESIGNER));return p;}

/* ---------- تحليل المحتوى ---------- */
route(/^#\/t\/analysis(?:\/([\w-]+))?$/,needT((V,id)=>{let u=id&&findUnit(id)||(SCI.data[TG][SUBJ_ORDER.find(x=>SCI.data[TG][x])].units[0]);TG=u.grade;
  V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"تحليل المحتوى"),pickers((s,uid)=>go("#/t/analysis/"+uid),{units:true,subj:u.subj,sel:u.id}),ptools());
  const s=SCI.data[u.grade][u.subj],p=el("div",{class:"paper land"});
  p.append(paperHead(s.name,u.grade),el("h2",{},"تحليل محتوى الوحدة "+u.n+": "+u.title));
  const t=el("table",{},el("tr",{},el("th",{},"الدرس"),el("th",{},"المفاهيم والمصطلحات"),el("th",{},"الحقائق والتعميمات"),el("th",{},"المهارات"),el("th",{},"القيم والاتجاهات"),el("th",{},"الأنشطة والتجارب")));
  u.lessons.forEach(l=>t.append(el("tr",{},el("th",{},l.title),el("td",{},el("ul",{contenteditable:""},...l.terms.map(x=>el("li",{},x[0]+" ("+x[1]+")")))),
    el("td",{},el("ul",{contenteditable:""},...l.points.map(x=>el("li",{},x[1].split(/[.،:]/)[0]+".")))),
    el("td",{},el("ul",{contenteditable:""},...l.outcomes.filter(o=>OUT_SKILL.test(o)).concat(["الملاحظة","التصنيف","الاستنتاج"]).slice(0,5).map(o=>el("li",{},o)))),
    el("td",{},el("ul",{contenteditable:""},...(l.outcomes.filter(o=>OUT_VALUE.test(o)).length?l.outcomes.filter(o=>OUT_VALUE.test(o)):["تقدير جهود العلماء","الدقّة والأمانة العلمية"]).map(o=>el("li",{},o)))),
    el("td",{},el("ul",{contenteditable:""},...l.exps.map(x=>el("li",{},x.kind+": "+x.t)),...l.sims.map(x=>el("li",{},"محاكاة: "+x.t)))))));
  p.append(t,el("div",{class:"credit"},"أُعدّ من منصّة العلوم · تصميم وتنفيذ: "+CONFIG.DESIGNER));V.append(p);}));

/* ---------- الاستراتيجيات ---------- */
route(/^#\/t\/strategies$/,needT(V=>{V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"بنك استراتيجيات التدريس"));
  V.append(el("div",{class:"hero"},el("div",{class:"orb"}),el("h1",{},"🧩 بنك استراتيجيات التدريس"),el("p",{},TSTRAT.length+" استراتيجية بخطوات التنفيذ وأداة التقويم المناسبة · اضغطي على أي استراتيجية لطباعة بطاقتها")));
  const g=el("div",{class:"grid g2",style:{marginTop:"16px"}});
  TSTRAT.forEach(x=>g.append(el("a",{class:"card tcard",href:"#/t/strategy/"+x.id},el("span",{class:"ic"},x.ic),el("div",{},el("h3",{},x.t),el("p",{},x.when)))));
  V.append(g,el("div",{class:"sec-h"},el("h2",{},"استراتيجيات التقويم الخمس")),el("div",{class:"grid g2"},...ASTRAT.map(a=>el("div",{class:"card"},el("h3",{},a.t),el("p",{class:"small"},a.d),el("div",{class:"chips"},...a.tools.map(t=>el("span",{class:"tag"},t)))))),credit());}));
route(/^#\/t\/strategy\/(\w+)(?:\/([\w-]+))?$/,needT((V,id,lid)=>{const x=TSTRAT.find(s=>s.id===id);if(!x){go("#/t/strategies");return;}
  const l=lid&&findLesson(lid);
  V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],["الاستراتيجيات","#/t/strategies"],x.t),pickers((s,lid2)=>go("#/t/strategy/"+id+"/"+lid2),{subj:l&&l.subj,sel:l&&l.id}),ptools());
  const p=el("div",{class:"paper"});p.append(paperHead(l?subjOf(l).name:"العلوم",l?l.grade:TG),el("h2",{},x.ic+" استراتيجية "+x.t),el("p",{class:"center gold"},x.en),
    l?el("div",{class:"box"},el("b",{},"الدرس: "),ce(l.title+" — الوحدة "+l.unit.n+": "+l.unit.title)):null,
    el("div",{class:"box"},el("b",{},"متى أستخدمها؟ "),ce(x.when)),el("div",{class:"box"},el("b",{},"خطوات التنفيذ:"),el("ol",{contenteditable:""},...x.steps.map(s=>el("li",{},s)))),
    l?el("div",{class:"box"},el("b",{},"تطبيقها على الدرس:"),el("ul",{contenteditable:""},el("li",{},"المهمة: "+(l.exps[0]?l.exps[0].t:l.points[0][0])),el("li",{},"المفاهيم المستهدفة: "+l.terms.slice(0,4).map(t=>t[0]).join("، ")),el("li",{},"الناتج المتوقّع: "+l.outcomes[0]))):null,
    el("div",{class:"box"},el("b",{},"نصائح للمعلّمة:"),el("ul",{contenteditable:""},...x.tips.map(s=>el("li",{},s)))),el("div",{class:"box"},el("b",{},"التقويم المقترح: "),ce(x.assess)),
    el("div",{class:"credit"},"منصّة العلوم · تصميم وتنفيذ: "+CONFIG.DESIGNER));V.append(p);}));

/* ---------- أدوات التقويم ---------- */
route(/^#\/t\/assess(?:\/(\w+))?(?:\/([\w-]+))?$/,needT((V,kind,lid)=>{V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"أدوات التقويم"));
  if(!kind){V.append(el("div",{class:"hero"},el("div",{class:"orb"}),el("h1",{},"📊 استراتيجيات التقويم وأدواته"),el("p",{},"اختاري الأداة، ثم الدرس، فتُعبَّأ تلقائيًّا بنتاجات الدرس ومهاراته")));
    const g=el("div",{class:"grid g3",style:{marginTop:"16px"}});ATOOLS.forEach(([k,t,ic,d])=>g.append(tool("#/t/assess/"+k,ic,t,d)));V.append(g,credit());return;}
  const l=lid&&findLesson(lid)||allLessons(TG)[0];const info=ATOOLS.find(a=>a[0]===kind);
  V.append(pickers((s,l2)=>go("#/t/assess/"+kind+"/"+l2),{subj:l.subj,sel:l.id}),ptools());V.append(assessPaper(kind,info,l));}));
function studRows(cols,n=18){return Array.from({length:n},(_,i)=>el("tr",{},el("td",{class:"center"},i+1),el("td",{},ce("")),...Array.from({length:cols},()=>el("td",{},ce(""))))); }
function assessPaper(kind,info,l){const s=subjOf(l),p=el("div",{class:["checklist","numeric"].includes(kind)?"paper land":"paper"});
  const crit=l.outcomes.map(o=>o.replace(/\.$/,""));
  p.append(paperHead(s.name,l.grade),el("h2",{},info[1]),el("table",{class:"info"},el("tr",{},el("td",{},el("b",{},"الدرس: "),ce(l.title)),el("td",{},el("b",{},"الشعبة: "),ce("....")),el("td",{},el("b",{},"التاريخ: "),ce("..../..../....")))));
  if(kind==="checklist"){p.append(el("p",{class:"small"},"ضعي (✓) عند تحقّق المعيار و(✗) عند عدم تحقّقه."),el("table",{},el("tr",{},el("th",{},"م"),el("th",{style:{width:"22%"}},"اسم الطالبة"),...crit.map(c=>el("th",{class:"small"},ce(c)))),...studRows(crit.length)));}
  else if(kind==="numeric"){p.append(el("p",{class:"small"},"4 ممتاز · 3 جيد جدًّا · 2 جيد · 1 يحتاج إلى تحسين"),el("table",{},el("tr",{},el("th",{},"م"),el("th",{style:{width:"20%"}},"اسم الطالبة"),...crit.map(c=>el("th",{class:"small"},ce(c))),el("th",{},"المجموع")),...studRows(crit.length+1)));}
  else if(kind==="rubric"){const lv=["ممتاز (4)","جيد جدًّا (3)","جيد (2)","يحتاج إلى تحسين (1)"];
    p.append(el("table",{},el("tr",{},el("th",{},"المعيار"),...lv.map(x=>el("th",{},x))),...crit.slice(0,5).map(c=>el("tr",{},el("th",{class:"small"},ce(c)),
      el("td",{class:"small"},ce("تحقّق المعيار بدقّة كاملة ودون مساعدة، وتقدّم أمثلة إضافية.")),el("td",{class:"small"},ce("تحقّق المعيار بدقّة مع أخطاء بسيطة.")),el("td",{class:"small"},ce("تحقّق جزءًا من المعيار بمساعدة.")),el("td",{class:"small"},ce("لم يتحقّق المعيار بعد وتحتاج إلى خطة علاجية.")))))); }
  else if(kind==="progress"){p.append(el("table",{},el("tr",{},el("th",{},"م"),el("th",{},"اسم الطالبة"),el("th",{},"التاريخ"),el("th",{},"النتاج"),el("th",{},"وصف سير التعلّم"),el("th",{},"الإجراء المتّبع")),...Array.from({length:14},(_,i)=>el("tr",{},el("td",{class:"center"},i+1),...[0,1,2,3,4].map(j=>el("td",{style:{height:"34px"}},ce(j===2&&i<l.outcomes.length?crit[i]:"")))))));}
  else if(kind==="anecdotal"){p.append(...[1,2].map(()=>el("div",{class:"box"},el("table",{class:"info"},el("tr",{},el("td",{},"اسم الطالبة: ",ce("............")),el("td",{},"الصف والشعبة: ",ce(l.grade+" / ....")),el("td",{},"التاريخ: ",ce("....")))),el("b",{},"الموقف/السلوك الملاحَظ:"),el("div",{class:"lines"}),el("div",{class:"lines"}),el("b",{},"تفسير المعلّمة:"),el("div",{class:"lines"}),el("b",{},"التوصيات:"),el("div",{class:"lines"}))));}
  else if(kind==="exit"){const card=()=>el("div",{class:"box",style:{breakInside:"avoid"}},el("b",{},"🚪 بطاقة الخروج · "+l.title),el("div",{},"الاسم: ......................... الشعبة: ......"),el("p",{},"3️⃣ ثلاثة أشياء تعلّمتها اليوم:"),el("div",{class:"lines"}),el("div",{class:"lines"}),el("div",{class:"lines"}),el("p",{},"2️⃣ شيئان أعجباني:"),el("div",{class:"lines"}),el("div",{class:"lines"}),el("p",{},"1️⃣ سؤال ما زال لديّ:"),el("div",{class:"lines"}));
    p.append(el("div",{class:"grid g2"},card(),card()));}
  else if(kind==="kwl"){p.append(el("table",{},el("tr",{},el("th",{},"K: ماذا أعرف عن «"+l.title+"»؟"),el("th",{},"W: ماذا أريد أن أعرف؟"),el("th",{},"L: ماذا تعلّمت؟")),el("tr",{},el("td",{style:{height:"420px"}},""),el("td",{},""),el("td",{},""))));}
  else if(kind==="self"){p.append(el("p",{},"عزيزتي الطالبة: ضعي (✓) في المكان الذي يعبّر عن مستواكِ بصدق."),el("table",{},el("tr",{},el("th",{},"أستطيع أن…"),el("th",{},"متمكّنة 😀"),el("th",{},"إلى حدٍّ ما 🙂"),el("th",{},"أحتاج مساعدة 🤔")),...crit.map(c=>el("tr",{},el("td",{},ce(c.replace(/^(أ)/,"$1"))),el("td",{}),el("td",{}),el("td",{})))),el("p",{},"أكثر ما استمتعت به: ......................................................"),el("p",{},"أحتاج إلى المزيد من التدريب على: ..........................................."));}
  else if(kind==="lab"){const c=["الالتزام بإرشادات السلامة","استخدام الأدوات بطريقة صحيحة","اتّباع خطوات العمل بدقّة","تسجيل الملاحظات والبيانات بدقّة","تحليل النتائج والاستنتاج","العمل بروح الفريق وتنظيف المكان"];
    p.append(el("div",{class:"box"},el("b",{},"التجربة: "),ce(l.exps[0]?l.exps[0].t:"................")),el("table",{},el("tr",{},el("th",{},"م"),el("th",{style:{width:"20%"}},"اسم الطالبة"),...c.map(x=>el("th",{class:"small"},ce(x+" (3)"))),el("th",{},"المجموع (18)")),...studRows(c.length+1,16)));}
  p.append(el("div",{class:"sig"},el("span",{},"معلّمة المبحث: ",ce("..................."))),el("div",{class:"credit"},"منصّة العلوم · تصميم وتنفيذ: "+CONFIG.DESIGNER));return p;}

/* ---------- بنك الأسئلة والاختبار المطبوع ---------- */
route(/^#\/t\/test(?:\/([\w-]+))?$/,needT((V,uid)=>{const u=uid&&findUnit(uid)||SCI.data[TG][SUBJ_ORDER.find(x=>SCI.data[TG][x])].units[0];TG=u.grade;const s=SCI.data[u.grade][u.subj];
  V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"بنك الأسئلة"),pickers((x,u2)=>go("#/t/test/"+u2),{units:true,subj:u.subj,sel:u.id}));
  const all=u.lessons.flatMap(l=>l.quiz.map(q=>({q,l})));let n=Math.min(10,all.length),key=false;
  const box=el("div"),nI=el("input",{type:"number",min:3,max:all.length,value:n,style:{width:"70px"}}),kB=el("button",{class:"btn ghost sm",onclick:()=>{key=!key;draw();}},"🔑 مفتاح الإجابة");
  nI.onchange=()=>{n=Math.max(3,Math.min(all.length,+nI.value||10));pick();draw();};
  let sel;const pick=()=>{sel=shuffle(all).slice(0,n).map(x=>Object.assign(shuffleQ(x.q),{l:x.l}));};
  const draw=()=>{box.innerHTML="";const p=el("div",{class:"paper"});p.append(paperHead(s.name,u.grade),el("h2",{contenteditable:""},key?"مفتاح الإجابة":"اختبار قصير: الوحدة "+u.n+" «"+u.title+"»"),
    el("table",{class:"info"},el("tr",{},el("td",{},"الاسم: .................................."),el("td",{},"الشعبة: ......"),el("td",{},"العلامة: ...... / "+sel.length))),
    el("p",{class:"small"},"اختاري رمز الإجابة الصحيحة في كل مما يأتي:"),
    ...sel.map((q,i)=>el("div",{style:{breakInside:"avoid",margin:"6px 0"}},el("b",{contenteditable:""},(i+1)+") "+q.q),el("div",{style:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px 16px",paddingRight:"18px"}},...q.o.map((o,k)=>el("span",{style:key&&k===q.a?{fontWeight:"700",color:"#1f7a4d"}:{}},AR_LET[k]+") "+o+(key&&k===q.a?" ✓":"")))))),
    el("div",{class:"credit"},"منصّة العلوم · تصميم وتنفيذ: "+CONFIG.DESIGNER));box.append(p);};
  V.append(el("div",{class:"tools noprint"},el("label",{},"عدد الأسئلة: ",nI),el("button",{class:"btn ghost sm",onclick:()=>{pick();draw();}},"🔀 أسئلة أخرى"),kB),ptools(),box);pick();draw();}));

/* ---------- المسابقة الصفية ---------- */
route(/^#\/t\/contest(?:\/([\w-]+))?$/,needT((V,uid)=>{const u=uid&&findUnit(uid)||SCI.data[TG][SUBJ_ORDER.find(x=>SCI.data[TG][x])].units[0];TG=u.grade;
  V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"المسابقة الصفية"),pickers((x,u2)=>go("#/t/contest/"+u2),{units:true,subj:u.subj,sel:u.id}));
  const teams=[["🔴 الأحمر","#c2410c"],["🔵 الأزرق","#2563c9"],["🟢 الأخضر","#1f8f5b"],["🟡 الذهبي","#B8902A"]];let nT=2;const sc=[0,0,0,0];
  const qs=shuffle(u.lessons.flatMap(l=>l.quiz)).map(shuffleQ);let i=0,turn=0;const box=el("div");
  const draw=()=>{box.innerHTML="";const bd=el("div",{class:"grid g4",style:{marginBottom:"14px"}});teams.slice(0,nT).forEach(([t,c],k)=>bd.append(el("div",{class:"card",style:{borderTop:"6px solid "+c,textAlign:"center",outline:k===turn?"3px solid "+c:"none"}},el("b",{},t),el("div",{style:{fontFamily:"var(--fd)",fontSize:"40px",color:c}},sc[k]))));box.append(bd);
    if(i>=qs.length){const best=Math.max(...sc.slice(0,nT));box.append(el("div",{class:"card score"},el("div",{class:"big"},"🏆"),el("h2",{},"الفائز: "+teams.slice(0,nT).filter((_,k)=>sc[k]===best).map(t=>t[0]).join(" و "))));confetti();return;}
    const q=qs[i],c=el("div",{class:"card"});c.append(el("div",{class:"muted"},"السؤال "+(i+1)+" من "+qs.length+" · دور الفريق "+teams[turn][0]),el("div",{class:"q",style:{fontSize:"26px"}},q.q));
    const os=el("div",{class:"opts"});let done=false;q.o.forEach((o,k)=>os.append(el("button",{class:"opt",style:{fontSize:"20px"},onclick:()=>{if(done)return;done=true;const ok=k===q.a;if(ok)sc[turn]+=10;
      [...os.children].forEach((b,j)=>{if(j===q.a)b.classList.add("ok");else if(j===k)b.classList.add("no");});c.append(el("div",{class:"why"},(ok?"✅ أحسنتنّ! ":"❌ ")+(q.why||"")),el("button",{class:"btn",style:{marginTop:"10px"},onclick:()=>{i++;turn=(turn+1)%nT;draw();}},"التالي ←"));}},el("span",{class:"k"},AR_LET[k]),o)));
    c.append(os);box.append(c);};
  const nS=el("select",{},...[2,3,4].map(n=>el("option",{value:n},n+" فرق")));nS.onchange=()=>{nT=+nS.value;draw();};
  V.append(el("div",{class:"tools noprint"},nS,el("button",{class:"btn ghost sm",onclick:()=>{document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();}},"⛶ ملء الشاشة")),box);draw();}));

/* ---------- نتائج الطالبات ---------- */
route(/^#\/t\/results$/,needT(async V=>{V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"نتائج الطالبات"));
  const box=el("div",{class:"card"},"جارٍ تحميل النتائج…");V.append(box);
  if(!PIN){box.innerHTML="";const pin=el("input",{class:"inp",type:"password",placeholder:"الرمز السرّي"});box.append(el("p",{},"أدخلي الرمز لعرض النتائج:"),pin,el("button",{class:"btn",style:{marginTop:"8px"},onclick:()=>{PIN=pin.value.trim();try{sessionStorage.setItem("qatrana.sci.pin",PIN);}catch(e){}render();}},"عرض"));return;}
  let rows=null;try{const r=await fetch(CONFIG.SCRIPT_URL+"?pin="+encodeURIComponent(PIN)+"&t="+Date.now());const j=await r.json();if(j.ok)rows=j.rows.filter(r=>String(r.grade||"").startsWith(CONFIG.SUBJ));}catch(e){}
  box.innerHTML="";if(!rows){box.append("تعذّر تحميل النتائج. تأكّدي من الإنترنت والرمز.");return;}
  if(!rows.length){box.append("لا توجد نتائج بعد. ستظهر هنا عندما تحلّ الطالبات الاختبارات على المنصّة.");return;}
  const gs=[...new Set(rows.map(r=>r.grade+" / "+r.section))].sort();const f=el("select",{},el("option",{value:""},"كل الصفوف والشعب"),...gs.map(g=>el("option",{value:g},g)));const tb=el("div");
  const draw=()=>{tb.innerHTML="";const R=rows.filter(r=>!f.value||(r.grade+" / "+r.section)===f.value);const st={};R.forEach(r=>{const k=r.name+"|"+r.section;const s=st[k]=st[k]||{name:r.name,sec:r.section,n:0,sum:0,ex:0};s.n++;s.sum+=+r.pct||0;if(r.passed)s.ex++;});
    const t=el("table",{style:{width:"100%",borderCollapse:"collapse"}},el("tr",{},...["الطالبة","الشعبة","عدد الأنشطة","متوسط النسبة","وحدات مجتازة"].map(h=>el("th",{style:{textAlign:"right",borderBottom:"2px solid var(--line)",padding:"6px"}},h))));
    Object.values(st).sort((a,b)=>b.sum/b.n-a.sum/a.n).forEach(s=>t.append(el("tr",{},...[s.name,s.sec,s.n,Math.round(s.sum/s.n)+"%",s.ex].map(v=>el("td",{style:{borderBottom:"1px solid var(--line)",padding:"6px"}},v)))));
    tb.append(el("p",{class:"muted"},R.length+" نتيجة · "+Object.keys(st).length+" طالبة"),t);};
  f.onchange=draw;box.append(el("div",{class:"tools"},f),tb);draw();}));

/* ---------- تشخيص فوري – علاج فوري ---------- */
route(/^#\/t\/remedial(?:\/([\w-]+))?$/,needT((V,lid)=>{const l=lid&&findLesson(lid)||allLessons(TG)[0];
  V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"تشخيص فوري – علاج فوري"),pickers((s,l2)=>go("#/t/remedial/"+l2),{subj:l.subj,sel:l.id}),ptools());
  const s=subjOf(l),p=el("div",{class:"paper"});
  p.append(paperHead(s.name,l.grade),el("h2",{},"خطة علاجية: "+l.title),el("p",{class:"small"},"تُبنى على نتائج «اختبري نفسك» في المنصّة: حدّدي الطالبات اللواتي لم يحقّقن 60% في كل نتاج."),
    el("table",{},el("tr",{},el("th",{},"النتاج"),el("th",{},"مؤشّر عدم التمكّن"),el("th",{},"أسماء الطالبات"),el("th",{},"الإجراء العلاجي"),el("th",{},"إعادة القياس")),
      ...l.outcomes.map((o,i)=>{const q=l.quiz[i%l.quiz.length];return el("tr",{},el("td",{class:"small"},ce(o)),el("td",{class:"small"},ce("خطأ في: «"+q.q+"»")),el("td",{},ce("")),
        el("td",{class:"small"},ce(i%3===0?"إعادة شرح بنموذج حسّي/ثلاثي الأبعاد ومحاكاة المنصّة":i%3===1?"تعلّم بالأقران (طالبة متمكّنة مع زميلتها)":"ورقة عمل علاجية متدرّجة + بطاقات المصطلحات")),el("td",{class:"small"},ce("سؤال بديل بعد يومين")));})),
    el("div",{class:"box"},el("b",{},"الأخطاء المفاهيمية الشائعة وطريقة معالجتها:"),el("ul",{contenteditable:""},...l.quiz.slice(0,4).map(q=>el("li",{},q.q+" ← الصحيح: "+q.o[q.a]+". "+(q.why||""))))),
    el("div",{class:"credit"},"منصّة العلوم · تصميم وتنفيذ: "+CONFIG.DESIGNER));V.append(p);}));
