/* ربط كل تجربة بموقعها في المختبر التفاعلي (بترتيب التجارب داخل الدرس) */
(function(){
const M={t:"مختبر القياس الدقيق"};
const S=(lab,id,t)=>({lab,id,t});
const MAP={
 "b9-1-1":[S("biology","micro","المجهر والكائنات الدقيقة")],
 "b9-1-2":[S("biology","photo","البناء الضوئي والضوء"),S("biology","photo","العوامل المؤثّرة في نموّ النبات")],
 "b9-1-3":[S("biology","micro","خصائص الكائنات الحية"),S("biology","eco","النظام البيئي")],
 "b9-2-1":[S("biology","cell","الخلية تحت المجهر"),S("biology","osmo","الانتشار والخاصية الأسموزية"),S("lab3d","osmosis","الأسموزية في البطاطا (مختبر ثلاثي الأبعاد)")],
 "b9-2-2":[S("biology","resp","التنفّس الخلوي"),S("biology","photo","البناء الضوئي وتكوّن النشا")],
 "c9-1-1":[S("lab3d","flame","كشف اللهب (مختبر ثلاثي الأبعاد)"),S("chemistry","cell","التحليل الكهربائي"),S("chem3d","atom3d","الذرّة ثلاثية الأبعاد")],
 "c9-1-2":[S("chem3d","ptable","الجدول الدوري التفاعلي")],
 "c9-2-1":[S("lab3d","indicator","الكواشف (مختبر ثلاثي الأبعاد)"),S("chem3d","titr","قوّة الحموض والقواعد")],
 "c9-2-2":[S("chem3d","titr","المعايرة والتعادل"),S("chem3d","titr","الرقم الهيدروجيني")],
 "p9-1-1":[S("measure","ruler","المسطرة وخطأ المنظر")],
 "p9-1-2":[S("measure","vernier","الورنية")],
 "p9-1-3":[S("measure","micro","الميكروميتر")],
 "p9-2-1":[S("lab3d","surface","القوّة والحركة (مختبر ثلاثي الأبعاد)")],
 "p9-2-2":[S("physics","kinematics","السقوط ومقاومة الهواء")],
 "p9-3-1":[S("physics","incline","الشغل والقدرة"),S("physics","pendulum","الشغل والطاقة")],
 "p9-3-2":[S("physics","incline","كفاءة المستوى المائل")],
 "e9-1-1":[S("chem3d","crystal3d","البلّورات والمعادن"),S("chem3d","crystal3d","عناصر شكل البلّورة"),S("chem3d","crystal3d","الخصائص الفيزيائية")],
 "e9-1-2":[S("chem3d","crystal3d","رباعي أوجه السيليكا")],
 "e9-2-1":[S("earth","water","دورة الماء والأمطار"),S("earth","water","الموازنة المائية")],
 "e9-2-2":[S("earth","water","المياه الجوفية"),S("earth","water","المسامية والنفاذية")]};
/* مختبر القياس لدروس القياس */
const MS={"p9-1-1":[S("measure","ruler","المسطرة وخطأ اختلاف المنظر")],"p9-1-2":[S("measure","vernier","الورنية"),S("measure","micro","الميكروميتر")],"p9-1-3":[S("measure","micro","الميكروميتر وتكرار القياس"),S("measure","vernier","الورنية")]};
/* التجارب التي لها محاكاة مطابقة سابقة نُبقيها */
const KEEP={"e10-1-1-1":S("lab3d","crystals","معدّل التبريد وحجم البلّورات (مختبر ثلاثي الأبعاد)")};
const BXDONE=/^(s8|b9|c9|p9|e9|b10|c10|p10)-/;
const XE={"s8-2-1":1,"s8-2-2":1,"c9-1-1":1,"c9-1-2":1,"c10-1-1":1,"c10-2-1":1},XP={"s8-2-2":1,"s8-2-1":1,"c9-1-2":1,"c10-2-1":1,"c10-2-2":1};
const X3={"b9-2-1":["osmosis","الخاصية الأسموزية في البطاطا 🔬"],"c9-1-1":["flame","كشف اللهب 🔬"],"c10-1-1":["flame","كشف اللهب 🔬"],"c9-2-1":["indicator","الكواشف والحموض والقواعد 🔬"],"p9-2-1":["surface","أثر نوع السطح في الحركة 🔬"],"e10-1-1":["crystals","معدّل التبريد وحجم البلّورات 🔬"],"s8-3-2":["density","حساب الكثافة بالإزاحة 🔬"]};
for(const g in SCI.data)for(const k in SCI.data[g])SCI.data[g][k].units.forEach(u=>u.lessons.forEach(l=>{if(X3[l.id]&&!l.sims.some(s=>s.lab==="lab3d"))l.sims.unshift(S("lab3d",X3[l.id][0],X3[l.id][1]));if(XP[l.id]&&!l.sims.some(s=>s.lab==="chem3d"&&s.id==="ptable"))l.sims.unshift(S("chem3d","ptable","الجدول الدوري التفاعلي"));if(XE[l.id]&&!l.sims.some(s=>s.lab==="electrons"))l.sims.unshift(S("electrons","z","ابني الذرّة: عبّئي الإلكترونات ⚛️"));
  const m=MAP[l.id];if(m)l.exps.forEach((x,i)=>{if(!x.sim)x.sim=m[Math.min(i,m.length-1)];});
  if(MS[l.id])l.sims=MS[l.id].concat(l.sims.filter(s=>s.lab!=="measure"));
  /* محاكاة لكل تجربة كما في الكتاب (مختبر تجارب الكتاب) */
  const bx=[];l.exps.forEach((x,i)=>{const key=l.id+"-"+i;if(KEEP[key]){x.sim=KEEP[key];return;}if(BXDONE.test(l.id)){x.sim=S("bx",key,"🧪 "+x.t);bx.push(x.sim);}});
  if(bx.length)l.sims=bx.concat(l.sims.filter(s=>s.lab!=="bx"));}));
})();
