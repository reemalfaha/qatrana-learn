/* ركن «صفّي» داخل منصّة العلوم — يستخدم الوحدة المشتركة qclass.js */
route(/^#\/t\/class$/,needT(V=>{V.append(crumbs(["الرئيسية","#/"],["ركن المعلّمة","#/t"],"صفّي"));const box=el("div");V.append(box,credit());
  QClass.mount(box,classOpt());}));
function classOpt(extra){const S=(k,name,grades,color)=>({k,name,grades,color,lessons:g=>{const s=(SCI.data[g]||{})[k];return s?s.units.flatMap(u=>u.lessons.map(l=>({id:l.id,t:"الوحدة "+u.n+" · "+l.title}))):[];}});
  return Object.assign({school:CONFIG.SCHOOL,scriptUrl:CONFIG.SCRIPT_URL,rosterUrl:"data/roster.enc.json",
    subjects:[S("sci","العلوم (الصف الثامن)",["الثامن"],"#1d7f8c"),S("bio","العلوم الحياتية",["التاسع","العاشر"],"#2f8f5b"),S("chem","الكيمياء",["التاسع","العاشر"],"#c2297a"),S("phys","الفيزياء",["التاسع","العاشر"],"#c98408"),S("earth","علوم الأرض والبيئة",["التاسع","العاشر"],"#7a4fb5")]},extra||{});}
