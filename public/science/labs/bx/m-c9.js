/* تجارب الكيمياء — الصف التاسع (كتاب الطالب) — مطابقة لخطوات الكتاب */
(function(){const {sleep,lerp,clamp,mix,quiz,pickMany}=BX;const R=(a,b)=>a+Math.random()*(b-a);
/* مقياس الكاشف العام */
const UI=["#d50000","#e53935","#f4511e","#fb8c00","#fdd835","#ffee58","#c0ca33","#43a047","#26a69a","#1e88e5","#3949ab","#5e35b1","#6a1b9a","#4a148c","#311b92"];
const uiCol=ph=>UI[clamp(Math.round(ph),0,14)];
function chartUI(S,x,y,w,onPick){const g=S.g();S.tr(g,x,y);const cw=w/15;S.rect(-6,-30,w+12,62,{rx:10,fill:"#fff",stroke:"#B8902A","stroke-width":2},g);S.text(w/2,-14,"دليل الكاشف العام (pH)",{"font-size":12},g);
  UI.forEach((c,i)=>{const cell=S.g(g);S.rect(i*cw+1,-4,cw-2,22,{rx:4,fill:c},cell);S.text(i*cw+cw/2,30,String(i),{"font-size":11},cell);if(onPick)S.tap(cell,()=>onPick(i));});return g;}
function paper(S,x,y){const g=S.g();S.tr(g,x,y);S.rect(-8,-80,16,80,{rx:2,fill:"#fff59d",stroke:"#c9a227","stroke-width":1.5},g);g.tip=S.rect(-8,-24,16,24,{fill:"#fff59d"},g);S.text(0,18,"ورق الكاشف العام",{"font-size":11},g);return g;}
function swatch(sel,c){const tr=document.querySelector("table.dt tbody tr:last-child td:nth-child("+sel+")");if(tr)tr.innerHTML='<span style="display:inline-block;width:40px;height:16px;border-radius:4px;vertical-align:middle;background:'+c+'"></span> '+tr.textContent;}

/* ---------- 1) أنابيب التفريغ الكهربائي وأطياف العناصر ---------- */
const GAS=[["هيليوم","He","#ffc9a8","وردي مصفرّ",[447,471,492,501,587,667,706]],["نيون","Ne","#ff3d00","أحمر برتقالي",[585,588,594,603,607,614,626,633,640,650,659,692,703]],["آرجون","Ar","#b39ddb","بنفسجي فاتح",[420,427,433,451,696,706,738,750,763]],["صوديوم","Na","#ffc400","أصفر برتقالي",[589]],["هيدروجين","H","#ff4fa3","وردي أرجواني",[410,434,486,656]],["زئبق","Hg","#82b1ff","أزرق بنفسجي",[405,436,546,577,579]]];
function nm2rgb(l){let r=0,g=0,b=0;if(l<440){r=-(l-440)/60;b=1;}else if(l<490){g=(l-440)/50;b=1;}else if(l<510){g=1;b=-(l-510)/20;}else if(l<580){r=(l-510)/70;g=1;}else if(l<645){r=1;g=-(l-645)/65;}else r=1;return "rgb("+[r,g,b].map(v=>Math.round(clamp(v,0,1)*255)).join(",")+")";}
BX.reg("c9-1-1-0",{cols:[["g","نوع الغاز في أنبوب التفريغ"],["c","لون التوهّج"]],
 conclude:"يتوهّج كل غاز بلون مميّز له عند مرور التيار الكهربائي فيه؛ لأن لذرّات كل عنصر تركيبًا مختلفًا (مستويات طاقة مختلفة)، فيصدر كلٌّ منها طيفًا خاصًّا به.",
 ans:["تختلف ألوان التوهّج من غاز إلى آخر؛ فلكل غاز لون خاص به (الهيليوم وردي مصفرّ، النيون أحمر برتقالي، الآرجون بنفسجي، الصوديوم أصفر، الهيدروجين وردي أرجواني، الزئبق أزرق بنفسجي).","لأن ذرّات العناصر المختلفة تختلف في تركيبها (في مستويات الطاقة للإلكترونات)، فتُطلق كل منها ضوءًا بأطوال موجية (ألوان) مميّزة لها."],
 build(S,A){const coil=S.g();S.tr(coil,170,392);S.rect(-110,-70,220,70,{rx:8,fill:S.lg(["#5d4037","#3e2723"],1)},coil);S.rect(-70,-110,140,40,{rx:20,fill:S.lg(["#b71c1c","#e53935","#b71c1c"],1)},coil);for(let i=0;i<9;i++)S.line(-60+i*15,-110,-60+i*15,-70,{stroke:"#7f0000","stroke-width":2},coil);
  S.text(-20,-30,"ملف رومكورف",{"font-size":15,fill:"#fff"},coil);const sw=S.g(coil);S.tr(sw,80,-40);S.rect(-18,-14,36,28,{rx:6,fill:"#212121"},sw);const lev=S.rect(-4,-12,8,14,{fill:"#e53935",rx:2},sw);S.text(0,30,"المفتاح",{"font-size":11,fill:"#fff"},sw);
  const plug=S.g();S.tr(plug,40,460);S.rect(-22,-16,44,32,{rx:6,fill:"#eceff1",stroke:"#90a4ae","stroke-width":2},plug);S.circ(-8,0,4,{fill:"#455a64"},plug);S.circ(8,0,4,{fill:"#455a64"},plug);S.text(0,32,"مقبس 220V",{"font-size":11},plug);
  const clamp1=S.g();S.tr(clamp1,470,250);S.line(-170,0,170,0,{stroke:"#8d6e63","stroke-width":6},clamp1);S.rect(-180,-22,20,44,{fill:"#455a64",rx:3},clamp1);S.rect(160,-22,20,44,{fill:"#455a64",rx:3},clamp1);S.rect(-6,0,12,142,{fill:"#6d4c41"},clamp1);
  S.label(0,-50,"قطبا ملف رومكورف",clamp1,"#455a64");S.wire([[250,330],[250,250],[290,250]],"#d32f2f");S.wire([[90,330],[90,180],[650,180],[650,250]],"#212121");
  const spec=S.g();S.tr(spec,400,70);S.rect(-280,-30,560,60,{rx:8,fill:"#111"},spec);const lines=S.g(spec);S.text(0,48,"منظار الطيف (إضافة للمقارنة)",{"font-size":12},spec);
  let cur=null,on=false,pw=false;const done=new Set();let removed=0;
  const tubes=GAS.map(([n,s,c],i)=>{const g=S.g();S.tr(g,345+i*76,436,-90,.38);S.rect(-170,-14,340,28,{rx:14,fill:"#eceff1",stroke:"#90a4ae","stroke-width":3,opacity:.8},g);g.glow=S.rect(-160,-9,320,18,{rx:9,fill:c,opacity:0},g);S.ell(-176,0,10,16,{fill:"#9e9e9e"},g);S.ell(176,0,10,16,{fill:"#9e9e9e"},g);
    S.text(0,6,s,{"font-size":34,fill:"#37474f"},g);g.gas=i;g.style.display="none";
    S.drag(g,{back:true,targets:()=>cur==null&&pw?[{g:clamp1,fn:async()=>{if(on){A.toast("افتحي الدارة أولًا!");return false;}cur=g;S.tr(g,470,250,0,1);A.say("أغلقي الدارة الكهربائية (اضغطي على المفتاح) ولاحظي لون التوهّج.");return "stay";}}]:[]});
    S.tap(g,()=>{if(cur!==g)return;if(on){A.toast("افتحي الدارة الكهربائية أولًا قبل نزع الأنبوب");return;}cur=null;S.tr(g,345+i*76,436,-90,.38);if(!removed++)A.step(3);
      if(done.size===6){A.step(4);A.ui.add(A.ui.btn("📋 نظّمي ملاحظاتك في جدول البيانات",b=>{b.disabled=true;GAS.forEach(x=>A.rec({g:x[0]+" ("+x[1]+")",c:x[3]}));A.step(5);},"gold"));}else A.say("كرّري مع أنبوب آخر ("+done.size+"/6): اسحبيه بين القطبين.");});return g;});
  A.say("أحضري أنابيب التفريغ الكهربائي المتوافرة في المختبر.");
  A.ui.add(A.ui.btn("🧪 أحضري أنابيب التفريغ",b=>{b.disabled=true;tubes.forEach(t=>t.style.display="");A.ui.clear();A.step(0);A.say("صِلي ملف رومكورف بالمصدر الكهربائي (اضغطي على المقبس)، مع إبقاء الدارة مفتوحة.");},"gold"));
  S.tap(plug,()=>{if(pw||!A.is(0))return;pw=true;S.wire([[40,444],[40,400],[70,400],[70,380]],"#212121");A.step(1);A.say("ثبّتي أحد الأنابيب بين قطبي ملف رومكورف: اسحبيه.");});
  S.tap(sw,()=>{if(!pw){A.toast("صِلي الملف بالمصدر أولًا");return;}if(!cur&&!on){A.toast("ثبّتي أنبوبًا أولًا");return;}on=!on;lev.setAttribute("y",on?-2:-12);lev.setAttribute("fill",on?"#43a047":"#e53935");const G=GAS[cur.gas];
    cur.glow.setAttribute("opacity",on?.95:0);cur.glow.setAttribute("filter",on?"url(#bl)":"");lines.innerHTML="";
    if(on){G[4].forEach(l=>{const x=-270+(l-400)/(780-400)*540;S.rect(x-2,-26,4,52,{fill:nm2rgb(l)},lines);});
      if(!done.has(cur.gas)){done.add(cur.gas);A.obs("أنبوب "+G[0]+" ("+G[1]+"): توهّج "+G[3]+".");if(done.size===1)A.step(2);}
      A.say("لون التوهّج: "+G[3]+". افتحي الدارة (المفتاح)، ثم انزعي الأنبوب بالضغط عليه.");}});
 }});

/* ---------- 2) التحليل الكهربائي لمحلول كلوريد النحاس ---------- */
BX.reg("c9-1-1-1",{cols:[["e","قطب الكربون المتّصل بـ"],["o","الملاحظة"],["m","المادة المتكوّنة"]],
 conclude:"عند مرور التيار في محلول CuCl₂ تتّجه أيونات النحاس الموجبة إلى القطب المتّصل بالقطب السالب فيترسّب النحاس، وأيونات الكلوريد السالبة إلى القطب المتّصل بالموجب فيتصاعد غاز الكلور.",
 ans:["تترسّب طبقة بنّية محمرّة من النحاس على القطب المتّصل بالقطب السالب للبطّارية.","تتصاعد فقاعات غاز أصفر مخضرّ ذو رائحة نفّاذة (غاز الكلور) عند القطب المتّصل بالقطب الموجب.","تكتسب أيونات النحاس Cu²⁺ إلكترونين عند القطب السالب فتتحوّل إلى ذرّات نحاس، وتفقد أيونات الكلوريد Cl⁻ إلكترونات عند القطب الموجب فتتحوّل إلى غاز الكلور Cl₂."],
 build(S,A){const bot=S.bottle(0,0,"#4fc3f7","CuCl₂ 1M");S.tr(bot,80,470);const cyl=S.cylinder(200,470,150,{w:44,col:"#29b6f6",lvl:0,label:"مخبار مدرّج"});const bk=S.beaker(430,392,190,160,{lvl:0,label:"كأس 250 mL"});
  const ml=S.label(0,-175,"0 mL",cyl.g,"#0277bd");A.say("قيسي 150mL من محلول كلوريد النحاس: اسحبي الزجاجة إلى المخبار.");
  S.drag(bot,{back:true,oy:-50,targets:()=>!cyl.full?[{g:cyl.g,fn:async()=>{await S.pour(bot,250,250,-75,async()=>{S.stream(222,275,330,"#4fc3f7",900);await S.tween(1100,t=>{cyl.set(.75*t);ml.set(Math.round(150*t)+" mL");});});cyl.full=1;A.say("ضعي المحلول في الكأس الزجاجية: اسحبي المخبار إلى الكأس.");}}]:[]});
  S.drag(cyl.g,{back:true,oy:-80,targets:()=>cyl.full&&!bk.lvl?[{g:bk.g,fn:async()=>{await S.pour(cyl.g,560,200,-80,async()=>{S.stream(525,215,360,"#4fc3f7",700);await Promise.all([bk.to(.6,1000,"#4fc3f7"),S.tween(1000,t=>{cyl.set(.75*(1-t));ml.set(Math.round(150*(1-t))+" mL");})]);});A.step(0);elec();}}]:[]});
  function elec(){A.say("صِلي كل قطب كربون بسلك توصيل، وضعي القطبين في المحلول: اسحبي القطبين إلى الكأس.");const pos=[380,480];let n=0;
    [0,1].forEach(i=>{const r=S.g();S.tr(r,640+i*50,470);S.rect(-8,-150,16,150,{rx:4,fill:S.lg(["#212121","#616161","#212121"])},r);S.line(0,-150,0,-175,{stroke:"#c62828","stroke-width":3},r);S.text(0,18,"قطب كربون",{"font-size":11},r);
      S.drag(r,{targets:()=>[{g:bk.g,fn:async()=>{r._off=true;await S.moveTo(r,pos[n],372,300);r.querySelector("text").remove();if(++n===2){A.step(1);wire();}return "stay";}}],back:true});});}
  function wire(){const bat=S.battery(430,150,{v:"6 V"});A.say("صِلي أسلاك التوصيل بالبطّارية: اضغطي على البطّارية.");S.tap(bat,()=>{if(bat.c)return;bat.c=1;
      S.wire([[388,150],[380,150],[380,197]],"#1565c0");S.wire([[476,150],[480,150],[480,197]],"#c62828");S.label(380,240,"−",null,"#1565c0");S.label(480,240,"+",null,"#c62828");run();});}
  function run(){A.say("لاحظي ما يحدث في الوعاء: حرّكي شريط الزمن.");const cu=S.rect(373,282,14,90,{fill:"#b5651d",opacity:0});const gas=S.bubbles(480,370,14,10,{h:120,col:"#c5e1a5"});gas.style.display="none";let r=0;
    A.ui.slider("⏱️ الزمن (دقيقة)",0,10,1,0,m=>{cu.setAttribute("opacity",m/10);gas.style.display=m?"":"none";bk.set(null,mix("#4fc3f7","#b3e5fc",m/14));
      if(m>=6&&!r){r=1;A.rec({e:"القطب السالب للبطّارية",o:"ترسّب طبقة بنّية محمرّة",m:"النحاس Cu"});A.rec({e:"القطب الموجب للبطّارية",o:"فقاعات غاز أصفر مخضرّ ذو رائحة نفّاذة",m:"غاز الكلور Cl₂"});A.obs("ترسّب النحاس على القطب المتّصل بالسالب، وتصاعد غاز الكلور عند القطب المتّصل بالموجب، وخفّ اللون الأزرق للمحلول.");A.step(2);}});}
 }});

/* ---------- 3) التفريغ الكهربائي (أشعة المهبط) ---------- */
BX.reg("c9-1-1-2",{cols:[["c","الحالة"],["o","الملاحظة"]],
 conclude:"تنطلق من المهبط (القطب السالب) حزمة أشعة تسير في خطوط مستقيمة وتنحرف بالمجال المغناطيسي؛ فهي جسيمات سالبة الشحنة (الإلكترونات).",
 ans:["عند تمرير التيار الكهربائي تنطلق جسيمات سالبة (إلكترونات) من المهبط باتجاه المصعد، فتظهر حزمة من الأشعة وتتوهّج الشاشة عند اصطدامها بها.","ينحرف مسار الأشعة عند تقريب المغناطيس، ويتغيّر اتجاه الانحراف عند تقريب القطب الآخر.","تسير في خطوط مستقيمة، وتنحرف بالمجال المغناطيسي (وبالمجال الكهربائي نحو اللوح الموجب)، فهي جسيمات سالبة الشحنة."],
 build(S,A){const tb=S.g();S.tr(tb,400,220);S.path("M-260 -40 L200 -40 Q260 -40 270 0 Q260 40 200 40 L-260 40 Q-290 40 -290 0 Q-290 -40 -260 -40Z",{fill:S.lg([["#e3f2fd",0,.5],["#fff",.5,.25],["#e3f2fd",1,.5]],1),stroke:"#90a4ae","stroke-width":3},tb);
  S.rect(-280,-16,14,32,{fill:"#455a64"},tb);S.rect(-120,-30,10,60,{fill:"#78909c"},tb);S.rect(250,-30,14,60,{fill:"#9ccc65",opacity:.6},tb);S.text(-272,62,"المهبط (−)",{"font-size":12},tb);S.text(-115,62,"المصعد (+)",{"font-size":12},tb);S.text(240,62,"شاشة مُفلورة",{"font-size":12},tb);
  const beam=S.path("M-262 0 L255 0",{stroke:"#00e676","stroke-width":5,fill:"none",opacity:0,filter:"url(#bl)"},tb);const dot=S.circ(256,0,9,{fill:"#b9f6ca",opacity:0},tb);
  const coil=S.g();S.tr(coil,170,392);S.rect(-100,-60,200,60,{rx:8,fill:S.lg(["#5d4037","#3e2723"],1)},coil);S.text(0,-24,"ملف رومكورف",{"font-size":14,fill:"#fff"},coil);
  const sw=S.g();S.tr(sw,400,370);S.rect(-34,-14,68,28,{rx:6,fill:"#37474f"},sw);const arm=S.line(-24,0,18,-18,{stroke:"#ffca28","stroke-width":5,"stroke-linecap":"round"},sw);S.text(0,32,"المفتاح",{"font-size":12},sw);
  let con=false,closed=false,phase=0;A.say("صِلي أنبوب التفريغ مع ملف رومكورف، مع إبقاء الدارة مفتوحة: اضغطي على الملف.");
  S.tap(coil,()=>{if(con)return;con=true;S.wire([[230,350],[300,350],[300,280],[130,280],[130,220],[124,220]],"#212121");S.wire([[260,350],[366,350]],"#c62828");S.wire([[434,370],[690,370],[690,220],[664,220]],"#c62828");A.step(0);A.say("أغلقي الدارة الكهربائية: اضغطي على المفتاح.");A.rec({c:"الدارة مفتوحة",o:"لا تظهر أشعة"});});
  S.tap(sw,()=>{if(!con){A.toast("صِلي الأنبوب أولًا");return;}closed=!closed;arm.setAttribute("y2",closed?0:-18);beam.setAttribute("opacity",closed?.9:0);dot.setAttribute("opacity",closed?1:0);
    if(closed&&!A.is(1)){A.step(1);A.rec({c:"الدارة مغلقة",o:"تظهر حزمة أشعة من المهبط في خط مستقيم وتتوهّج الشاشة"});A.say("قرّبي أحد قطبي المغناطيس من الأنبوب: اسحبيه فوق الأنبوب.");}
    if(!closed&&A.is(3)&&!A.is(4)){A.step(4);A.rec({c:"فتح الدارة",o:"اختفت الأشعة، وفُصل التيار ونُزع الأنبوب"});}upd();});
  const mag=S.g();S.tr(mag,640,450);S.path("M-40 -30 L-40 20 Q-40 40 -20 40 L20 40 Q40 40 40 20 L40 -30 L22 -30 L22 18 L-22 18 L-22 -30Z",{fill:"#90a4ae"},mag);const pN=S.rect(-40,-50,18,22,{fill:"#e53935"},mag);const pS=S.rect(22,-50,18,22,{fill:"#1e88e5"},mag);const tN=S.text(-31,-34,"N",{"font-size":12,fill:"#fff"},mag);const tS=S.text(31,-34,"S",{"font-size":12,fill:"#fff"},mag);
  let flip=1;
  function upd(){const d=Math.hypot(mag._x-400,mag._y-170);const k=closed?clamp(1-(d-60)/180,0,1)*flip:0;const dy=k*70;beam.setAttribute("d","M-262 0 Q0 0 255 "+(-dy));dot.setAttribute("cy",-dy);
    if(closed&&Math.abs(k)>.7){if(phase===0){phase=1;A.step(2);A.rec({c:"تقريب القطب الشمالي N",o:"انحرفت حزمة الأشعة إلى الأعلى"});A.say("قرّبي القطب الآخر للمغناطيس: اقلبي المغناطيس ثم قرّبيه.");A.ui.add(A.ui.btn("🔄 اقلبي المغناطيس (القطب الآخر)",()=>{flip*=-1;pN.setAttribute("fill",flip>0?"#e53935":"#1e88e5");pS.setAttribute("fill",flip>0?"#1e88e5":"#e53935");tN.textContent=flip>0?"N":"S";tS.textContent=flip>0?"S":"N";upd();},"g"));}
      else if(phase===1&&flip<0){phase=2;A.step(3);A.rec({c:"تقريب القطب الجنوبي S",o:"انحرفت حزمة الأشعة إلى الأسفل (عكس الاتجاه)"});A.obs("تنحرف أشعة المهبط بالمجال المغناطيسي، ويعكس تغيير القطب اتجاه الانحراف.");A.say("افتحي الدارة الكهربائية وافصلي التيار: اضغطي على المفتاح.");}}}
  S.drag(mag,{free:true,move:upd,targets:()=>[]});
 }});

/* ---------- 4) نموذج استخدامات العناصر الممثّلة ---------- */
BX.reg("c9-1-2-0",{cols:[["e","العنصر"],["u","استخدامه"]],room:{table:false,wall1:"#fdf6ec",wall2:"#f3e5d0"},
 conclude:"تتشابه عناصر المجموعة الواحدة في خصائصها لتشابه توزيعها الإلكتروني الخارجي، ولذلك تتشابه كثير من استخداماتها.",
 ans:["تتشابه؛ فالكلور والفلور (واليود) تُستخدم في التعقيم ومنع التسوّس وقتل الجراثيم لأنها نشطة جدًّا وتكتسب الإلكترونات بسهولة.","تتشابه جزئيًّا؛ فعناصرها فلزّات نشطة تُستخدم مركّباتها في الأسمدة والأملاح والبطاريات (الليثيوم في البطاريات، الصوديوم في ملح الطعام، البوتاسيوم في الأسمدة).","الغازات النبيلة خاملة كيميائيًّا لامتلاء مستواها الخارجي، فتُستخدم في المصابيح وملء المناطيد واللافتات المضيئة لأنها لا تتفاعل وتتوهّج بألوان مميّزة."],
 build(S,A){const G=[1,2,13,14,15,16,17,18];const EL={1:["H","Li","Na","K"],2:[null,"Be","Mg","Ca"],13:[null,"B","Al",null],14:[null,"C","Si",null],15:[null,"N","P",null],16:[null,"O","S",null],17:[null,"F","Cl",null],18:["He","Ne","Ar",null]};
  const NM={H:"هيدروجين",Li:"ليثيوم",Na:"صوديوم",K:"بوتاسيوم",Be:"بيريليوم",Mg:"مغنيسيوم",Ca:"كالسيوم",B:"بورون",Al:"ألمنيوم",C:"كربون",Si:"سيليكون",N:"نيتروجين",P:"فسفور",O:"أكسجين",S:"كبريت",F:"فلور",Cl:"كلور",He:"هيليوم",Ne:"نيون",Ar:"آرجون"};
  const cw=74,ch=60,x0=110,y0=40;const cells={};const board=S.g();S.rect(x0-14,y0-16,cw*8+28,ch*4+40,{rx:12,fill:"#fff",stroke:"#8d6e63","stroke-width":3},board);board.style.opacity=.15;
  quiz(A,[["قيسي مساحة المربّعات في نموذج الجدول الدوري (2cm × 2cm)، واختاري مقياس رسم مناسبًا للوح الكرتون:",[["a","1 : 5 (كل مربّع 10cm × 10cm)"],["b","1 : 100"],["c","1 : 1"]],"a","اختاري مقياسًا يجعل الجدول كبيرًا وواضحًا ويتّسع له اللوح"]],()=>{A.step(0);draw();});
  function draw(){A.say("سجّلي رموز العناصر وأسماءها في النموذج: اضغطي على اللوح.");S.tap(board,async()=>{if(board.ok)return;board.ok=1;board.style.opacity=1;
    for(let gi=0;gi<8;gi++){const g=G[gi];S.text(x0+gi*cw+cw/2,y0-2,String(g),{"font-size":12,fill:"#5d4037"});
      for(let p=0;p<4;p++){const s=EL[g][p];if(!s)continue;const c=S.g();S.tr(c,x0+gi*cw,y0+6+p*ch);c.bg=S.rect(2,2,cw-4,ch-4,{rx:6,fill:"#fafafa",stroke:"#bcaaa4","stroke-width":1.5},c);S.text(cw/2,22,s,{"font-size":17},c);S.text(cw/2,52,NM[s],{"font-size":9,fill:"#6d4c41"},c);c.g=g;c.s=s;cells[s]=c;await sleep(25);}}
    A.step(1);uses();});}
  const U2=[["H","🚀","وقود الصواريخ"],["He","🎈","ملء المناطيد"],["Li","🔋","البطاريات"],["Na","🧂","ملح الطعام"],["K","🌾","الأسمدة"],["Mg","🎆","الألعاب النارية"],["Al","🥫","العلب ورقائق التغليف"],["C","✏️","أقلام الرصاص"],["Si","💻","الشرائح الإلكترونية"],["N","🌱","صناعة الأسمدة"],["O","🫁","أسطوانات التنفّس"],["F","🪥","معجون الأسنان"],["Cl","🏊","تعقيم المياه"],["Ne","💡","اللافتات المضيئة"],["Ar","🔆","مصابيح الإنارة"],["Ca","🦴","الإسمنت والعظام"]];
  function uses(){A.say("ابحثي عن استخدامات العناصر، وألصقي كل صورة في موقع عنصرها: اسحبي البطاقات.");let n=0;const pal=S.g();
    U2.forEach(([s,e,t],i)=>{const g=S.g(pal);S.tr(g,55+(i%8)*98,345+Math.floor(i/8)*78);S.rect(-45,-30,90,56,{rx:10,fill:"#fff",stroke:"#B8902A","stroke-width":2},g);S.emo(0,-10,e,22,g);S.text(0,19,t,{"font-size":9},g);
      S.drag(g,{back:true,targets:()=>Object.values(cells).map(c=>({g:c,pad:4,fn:async()=>{if(c.s!==s){A.toast("ليس هذا العنصر… ابحثي عن استخدامات "+NM[c.s]);return false;}g._off=true;c.append(g);S.tr(g,cw/2+20,ch/2-12,0,.36);A.rec({e:s+" ("+NM[s]+")",u:e+" "+t});if(++n===U2.length){A.step(2);A.ui.add(A.ui.btn("📌 ثبّتي الجدول في المختبر",b=>{b.disabled=true;S.tween(600,t=>board.parentNode&&0);S.emo(400,20,"📌",30);A.obs("ثُبّت نموذج الجدول الدوري لاستخدامات العناصر الممثّلة في المختبر.");A.step(3);},"gold"));}return "stay";}}))});});}
 }});

/* ---------- 5) الخصائص الحمضية والقاعدية لبعض المواد ---------- */
const HOUSE=[["عصير ليمون","#fff59d",2],["خلّ","#fffde7",3],["لبن","#fafafa",4],["ربّ البندورة","#e53935",4],["منظّف صابوني منزلي","#a5d6a7",9],["سائل تنظيف الزجاج","#4fc3f7",10],["مبيّض غسيل","#f5f5f5",12],["منظّف أفران","#ffe0b2",13]];
BX.reg("c9-2-1-0",{cols:[["s","المادة"],["ph","الرقم الهيدروجيني pH"]],chart:{x:"s",y:"ph",type:"bar",xl:"المادة",yl:"pH",min:0,max:14},
 conclude:"المواد التي pH لها أقل من 7 حمضية، وأكبر من 7 قاعدية، و7 متعادلة؛ ويُقدَّر pH بمطابقة لون ورقة الكاشف العام مع دليله.",
 ans:["حمضية: عصير الليمون، الخلّ، اللبن، ربّ البندورة. قاعدية: المنظّف الصابوني، سائل تنظيف الزجاج، مبيّض الغسيل، منظّف الأفران.","عصير الليمون (2) < الخلّ (3) < اللبن وربّ البندورة (4).","المنظّف الصابوني (9) < سائل تنظيف الزجاج (10) < مبيّض الغسيل (12) < منظّف الأفران (13).","عصير الليمون.","منظّف الأفران."],
 build(S,A){const wg=HOUSE.map((h,i)=>{const g=S.g();S.tr(g,60+i*97,330);S.ell(0,0,38,11,{fill:"#e1f5fe",stroke:"#81d4fa","stroke-width":2,opacity:.9},g);g.l=S.ell(0,-1,0,0,{fill:h[1],opacity:.9},g);S.text(0,30,h[0],{"font-size":10},g);g.h=h;g.i=i;return g;});
  const pp=paper(S,760,200);pp.style.display="none";let sel=null,m=0;
  const ch=chartUI(S,170,110,450,ph=>{if(!sel){A.toast("اغمسي الورقة في مادة أولًا");return;}if(Math.abs(ph-sel.h[2])>0){A.toast("طابقي اللون بدقّة مع دليل الكاشف…");return;}sel.ok=1;A.rec({s:sel.h[0],ph:sel.h[2]});swatch(2,uiCol(sel.h[2]));S.label(sel._x,sel._y-95,"pH "+sel.h[2],null,"#7A1F2E");
    if(++m===1)A.step(1);sel=null;if(m===8){A.step(2);A.step(3);}else A.say("كرّري للمادة التالية: ضعيها في زجاجة الساعة، ثم اغمسي ورقة كاشف جديدة.");});ch.style.display="none";
  A.say("ضعي قليلًا من عصير الليمون في زجاجة الساعة: اسحبي الزجاجة.");let n=0;
  HOUSE.forEach((h,i)=>{const b=S.bottle(0,0,h[1],"");S.tr(b,60+i*97,475,0,.6);
    S.drag(b,{back:true,oy:-40,targets:()=>[{g:wg[i],pad:8,fn:async()=>{if(i!==n){A.toast("ابدئي بعصير الليمون ثم بقية المواد بالترتيب");return false;}await S.pour(b,wg[i]._x+30,250,-70,()=>S.tween(500,t=>{wg[i].l.setAttribute("rx",30*t);wg[i].l.setAttribute("ry",7*t);}));S.off(b,true);n++;if(n===1)A.step(0);
      pp.style.display="";ch.style.display="";A.say("اغمسي ورقة الكاشف العام في "+h[0]+"، ثم طابقي لونها مع دليل الكاشف (اضغطي اللون المطابق).");}}],miss:()=>A.toast("كل مادة في زجاجة الساعة التي تحمل اسمها")});});
  S.drag(pp,{back:true,oy:-50,targets:()=>wg.filter(w=>w.l.getAttribute("rx")!=="0"&&!w.d).map(w=>({g:w,pad:6,fn:async()=>{w.d=1;await S.moveTo(pp,w._x,w._y+20,250);const c=uiCol(w.h[2]);await S.tween(500,t=>pp.tip.setAttribute("fill",mix("#fff59d",c,t)));
    S.rect(w._x-6,w._y-70,12,34,{rx:2,fill:c,stroke:"#999"});sel=w;pp.tip.setAttribute("fill","#fff59d");A.say("طابقي لون الورقة مع دليل الكاشف العام: اضغطي اللون المطابق.");}}))});
 }});

/* ---------- 6) قوّة الحموض والقواعد ---------- */
const SOL=[["HCl","حمض الهيدروكلوريك",0,1,"#fff9c4"],["CH₃COOH","حمض الأسيتيك",2.4,.25,"#fffde7"],["NaOH","هيدروكسيد الصوديوم",14,1,"#e1f5fe"],["NH₃","محلول الأمونيا",11.6,.25,"#e8f5e9"]];
BX.reg("c9-2-1-1",{cols:[["s","المحلول"],["ph","pH للمحلول"],["c","توصيل التيار الكهربائي"],["z","سرعة تفاعل Zn مع الحمض"]],
 conclude:"الحموض والقواعد القوية تتأيّن كليًّا في الماء فتوصل التيار بدرجة كبيرة، وpH الحمض القوي أقل وpH القاعدة القوية أعلى، ويتفاعل الحمض القوي مع الخارصين أسرع.",
 ans:["الحمض الأقوى HCl، والقاعدة الأقوى NaOH.","لأن HCl حمض قوي يتأيّن كليًّا فيُنتج عددًا أكبر من الأيونات، أما CH₃COOH فحمض ضعيف يتأيّن جزئيًّا.","لأن NaOH قاعدة قوية تتأيّن كليًّا، أما NH₃ فقاعدة ضعيفة تتأيّن جزئيًّا في الماء.","كلما زادت قوّة الحمض قلّت قيمة pH لمحلوله.","كلما زادت قوّة القاعدة زادت قيمة pH لمحلولها.","تصاعد فقاعات غاز (الهيدروجين) وتآكل حبّة الخارصين.","كلما زادت قوّة الحمض زادت سرعة تفاعله مع الخارصين."],
 build(S,A){const rows={};SOL.forEach(s=>rows[s[0]]={s:s[0]+" ("+s[1]+")",ph:"",c:"",z:s[0].includes("COOH")||s[0]==="HCl"?"":"—"});
  const cyl=S.cylinder(70,470,120,{w:36,col:"#fff9c4",lvl:.85,label:"مخبار"});const bk=S.beaker(240,392,110,110,{lvl:0,label:"كأس زجاجية"});
  const bots=SOL.map((s,i)=>{const b=S.bottle(0,0,s[4],s[0]);S.tr(b,380+i*62,475,0,.62);b.s=s;return b;});
  let cur=null,phase=0;
  const meter=S.g();S.tr(meter,560,300);S.rect(-30,-70,60,70,{rx:8,fill:"#37474f"},meter);const sc=S.screen(0,-44,50,"--",{par:meter});sc.g.setAttribute("transform","translate(0 -44) scale(.55)");S.rect(-3,0,6,40,{fill:"#90a4ae"},meter);S.text(0,-80,"مقياس pH",{"font-size":12},meter);
  const wb=S.beaker(680,392,70,70,{col:"#e3f2fd",lvl:.7,label:"ماء مقطّر"});
  const bat=S.battery(560,90,{v:"بطّارية"}),bulb=S.bulb(700,110);const hold=S.g();S.tr(hold,700,300);S.rect(-40,-12,80,12,{rx:3,fill:"#8d6e63"},hold);S.rect(-26,0,10,80,{fill:"#424242"},hold);S.rect(16,0,10,80,{fill:"#424242"},hold);S.text(0,-20,"قطبا كربون",{"font-size":11},hold);hold.style.display="none";
  function needSol(){const s=SOL.find(x=>!rows[x[0]].c);return s;}
  A.say("قيسي 100mL من محلول حمض الهيدروكلوريك HCl بالمخبار وضعيها في الكأس: اسحبي زجاجة HCl إلى الكأس.");
  bots.forEach(b=>S.drag(b,{back:true,oy:-40,targets:()=>[{g:bk.g,fn:async()=>{const ns=needSol();if(phase>0||!ns){A.toast(phase>0?"أكملي القياس للمحلول الحالي أولًا":"انتهت المحاليل");return false;}if(b.s!==ns){A.toast("الترتيب: "+ns[0]);return false;}
    await S.pour(b,bk.g._x+70,230,-75,()=>bk.to(.6,600,b.s[4]));cur=b.s;phase=1;if(cur[0]==="HCl")A.step(0);A.say("اغمسي قطب مقياس pH في المحلول وسجّلي القراءة: اسحبي المقياس إلى الكأس.");}}]}));
  S.drag(meter,{back:true,oy:-30,targets:()=>phase===1?[{g:bk.g,fn:async()=>{await S.moveTo(meter,bk.g._x,bk.g._y-90,300);sc.set(cur[2].toFixed(1));rows[cur[0]].ph=cur[2];if(cur[0]==="HCl")A.step(1);await sleep(900);phase=2;sc.set("--");A.say("أخرجي القطب ونظّفيه بالماء المقطّر: اسحبي المقياس إلى كأس الماء المقطّر.");}}]:phase===2?[{g:wb.g,fn:async()=>{await S.moveTo(meter,wb.g._x,wb.g._y-80,300);await sleep(500);phase=3;if(cur[0]==="HCl")A.step(2);hold.style.display="";A.say("صِلي قطبي الكربون بالمصباح والبطّارية، وضعيهما في المحلول: اسحبي القطبين إلى الكأس.");}}]:[]});
  let wired=false;S.drag(hold,{back:true,oy:40,targets:()=>phase===3?[{g:bk.g,fn:async()=>{await S.moveTo(hold,bk.g._x,bk.g._y-100,300);if(!wired){wired=true;S.wire([[606,90],[680,90],[680,110]],"#c62828");S.wire([[720,110],[760,110],[760,260],[716,260]],"#c62828");S.wire([[514,90],[470,90],[470,250],[684,250]],"#1565c0");}
      bulb.on(cur[3]);rows[cur[0]].c=cur[3]>.5?"💡 جيّد":"🔅 ضعيف";A.toast(cur[3]>.5?"إضاءة قويّة":"إضاءة خافتة");if(cur[0]==="HCl")A.step(3);await sleep(1200);bulb.on(0);phase=4;
      A.say("افتحي الدارة وأخرجي القطبين واغسليهما بالماء المقطّر: اسحبي القطبين إلى كأس الماء المقطّر.");return "stay";}}]:phase===4?[{g:wb.g,fn:async()=>{await S.moveTo(hold,700,300,300);if(cur[0]==="HCl")A.step(4);phase=0;await bk.to(0,500);
      const ns=needSol();if(ns)A.say("كرّري الخطوات باستخدام محلول "+ns[0]+" ("+ns[1]+"): اسحبي زجاجته إلى الكأس.");else{A.step(5);zinc();}return "stay";}}]:[]});
  function zinc(){A.say("قيسي 10mL من HCl ومثلها من CH₃COOH وضعيهما في أنبوبي اختبار: اسحبي الزجاجتين إلى الأنبوبين.");S.rect(160,350,200,10,{fill:"#8d6e63"});const tb=[0,1].map(i=>{const t=S.tube(210+i*100,430,120,{w:40,lvl:0});return t;});let k=0;
    [0,1].forEach(i=>S.drag(bots[i],{back:true,oy:-40,targets:()=>[{g:tb[i].g,fn:async()=>{if(tb[i].f)return false;tb[i].f=1;await S.pour(bots[i],tb[i].g._x+60,220,-75,()=>tb[i].to(.4,400,SOL[i][4]));S.label(0,-140,SOL[i][0],tb[i].g,"#7A1F2E");if(++k===1)A.step(6);if(k===2){A.step(7);zn();}}}],miss:()=>A.toast(i?"CH₃COOH في الأنبوب الثاني":"HCl في الأنبوب الأول")}));
    function zn(){A.say("ضعي في كل أنبوب حبّة من الخارصين، ولاحظي سرعة التفاعل: اسحبي الحبيبات.");let z=0;[0,1].forEach(j=>{const g=S.g();S.tr(g,440+j*40,470);S.path("M-9 -6 L-3 -12 L8 -9 L10 2 L2 8 L-8 5Z",{fill:"#b0bec5",stroke:"#607d8b"},g);S.text(0,24,"Zn",{"font-size":11},g);
      S.drag(g,{targets:()=>tb.filter(t=>!t.z).map(t=>({g:t.g,fn:async()=>{t.z=1;g.remove();S.path("M-7 -5 L-2 -10 L6 -7 L8 2 L2 6 L-6 4Z",{fill:"#b0bec5",stroke:"#607d8b",transform:"translate(0 -8)"},t.inner);const i=tb.indexOf(t);S.bubbles(t.g._x,t.g._y-12,20,i?4:16,{h:i?30:50});rows[SOL[i][0]].z=i?"بطيء (فقاعات قليلة)":"سريع (فوران شديد)";
        if(++z===2){A.obs("تصاعدت فقاعات غاز بسرعة في أنبوب HCl، وببطء في أنبوب CH₃COOH.");A.step(8);A.ui.add(A.ui.btn("📋 نظّمي البيانات في الجدول",b=>{b.disabled=true;SOL.forEach(s=>A.rec(rows[s[0]]));A.step(9);},"gold"));}}})),back:true});});}}
 }});

/* ---------- 7) تفاعل تعادل حمض وقاعدة ---------- */
BX.reg("c9-2-2-0",{cols:[["s","المحلول"],["t","درجة الحرارة (°C)"],["ph","درجة الحموضة pH (تقديرًا)"]],
 conclude:"تفاعل التعادل طارد للحرارة؛ ترتفع درجة الحرارة عند خلط الحمض بالقاعدة، ويصبح المحلول متعادلًا تقريبًا (pH ≈ 7)، ويبقى بعد التبخير ملح كلوريد الصوديوم: HCl + NaOH → NaCl + H₂O.",
 ans:["ارتفعت درجة حرارة المحلول بعد الخلط؛ وهذا يدلّ على حدوث تفاعل كيميائي طارد للحرارة (تفاعل التعادل).","HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)","قبل الخلط: الحمض pH ≈ 0–1 (حمضي جدًّا)، والقاعدة pH ≈ 13–14 (قاعدي جدًّا). بعد الخلط: pH ≈ 7 (متعادل)."],
 build(S,A){const acid=S.bottle(0,0,"#fff9c4","HCl 1M");S.tr(acid,50,470,0,.8);const base=S.bottle(0,0,"#e1f5fe","NaOH 1M");S.tr(base,110,470,0,.8);
  const cy=[S.cylinder(190,470,110,{w:32,col:"#fff9c4",lvl:0,label:"مخبار 1"}),S.cylinder(250,470,110,{w:32,col:"#e1f5fe",lvl:0,label:"مخبار 2"})];
  const bk=[S.beaker(380,392,110,100,{lvl:0,label:"الكأس الأولى"}),S.beaker(530,392,110,100,{lvl:0,label:"الكأس الثانية"})];
  const th=S.g();S.tr(th,700,470);const T=S.thermo(0,-10,120,{min:10,max:40,val:22,par:th});th.setAttribute("transform","translate(700 470) scale(.7)");th._s=.7;
  const pp=paper(S,770,470);const ch=chartUI(S,170,40,450,null);let st=0;const temps=[];
  A.say("قيسي 10mL من محلول HCl بالمخبار: اسحبي زجاجة HCl إلى المخبار 1.");
  S.drag(acid,{back:true,oy:-40,targets:()=>st===0?[{g:cy[0].g,fn:async()=>{await S.pour(acid,240,260,-75,()=>cy[0].to(.3,500));st=1;A.say("ضعي الحمض في الكأس الأولى: اسحبي المخبار 1 إلى الكأس.");}}]:[]});
  S.drag(cy[0].g,{back:true,oy:-55,targets:()=>st===1?[{g:bk[0].g,fn:async()=>{await S.pour(cy[0].g,450,230,-80,()=>Promise.all([cy[0].to(0,600),bk[0].to(.25,600,"#fff9c4")]));st=2;A.say("قيسي درجة حرارة المحلول: اسحبي ميزان الحرارة إلى الكأس الأولى.");}}]:[]});
  S.drag(base,{back:true,oy:-40,targets:()=>st===3?[{g:cy[1].g,fn:async()=>{await S.pour(base,300,260,-75,()=>cy[1].to(.3,500));st=4;A.say("ضعي محلول NaOH في الكأس الثانية: اسحبي المخبار 2.");}}]:[]});
  S.drag(cy[1].g,{back:true,oy:-55,targets:()=>st===4?[{g:bk[1].g,fn:async()=>{await S.pour(cy[1].g,600,230,-80,()=>Promise.all([cy[1].to(0,600),bk[1].to(.25,600,"#e1f5fe")]));st=5;A.say("قيسي درجة حرارة محلول NaOH: اسحبي ميزان الحرارة إلى الكأس الثانية.");}}]:[]});
  S.drag(th,{back:true,oy:-60,targets:()=>st===2?[{g:bk[0].g,fn:async()=>{await meas(bk[0],22.1);temps[0]=22.1;A.step(0);st=3;A.say("كرّري مستخدمة محلول NaOH: اسحبي زجاجة NaOH إلى المخبار 2.");}}]:st===5?[{g:bk[1].g,fn:async()=>{await meas(bk[1],22.3);temps[1]=22.3;A.step(1);st=6;A.say("ضعي ورقة الكاشف العام في كل محلول وطابقي لونها مع الدليل: اسحبي الورقة إلى الكأسين.");}}]:st===8?[{g:bk[1].g,fn:async()=>{await meas(bk[1],28.9);temps[2]=28.9;A.step(3);st=9;A.say("ضعي ورقة الكاشف العام في المحلول الناتج: اسحبي الورقة إلى الكأس الثانية.");}}]:[]});
  async function meas(b,v){await S.moveTo(th,b.g._x+20,b.g._y-20,300);await S.tween(800,t=>T.set(lerp(T.v,v,t)));A.toast("T = "+v+" °C");await sleep(500);}
  let dipped=new Set();S.drag(pp,{back:true,oy:-50,targets:()=>st===6?bk.filter((b,i)=>!dipped.has(i)).map(b=>({g:b.g,fn:async()=>{const i=bk.indexOf(b);dipped.add(i);const ph=i?14:0;await S.tween(400,t=>pp.tip.setAttribute("fill",mix("#fff59d",uiCol(ph),t)));S.rect(b.g._x-6,b.g._y-150,12,30,{rx:2,fill:uiCol(ph),stroke:"#999"});
      A.rec({s:i?"NaOH قبل الخلط":"HCl قبل الخلط",t:temps[i],ph:i?"13–14 (قاعدي جدًّا)":"0–1 (حمضي جدًّا)"});pp.tip.setAttribute("fill","#fff59d");if(dipped.size===2){A.step(2);st=7;A.say("أضيفي محتويات الكأس الأولى إلى الكأس الثانية: اسحبي الكأس الأولى.");}}})):st===9?[{g:bk[1].g,fn:async()=>{await S.tween(400,t=>pp.tip.setAttribute("fill",mix("#fff59d",uiCol(7),t)));A.rec({s:"المحلول الناتج بعد الخلط",t:temps[2],ph:"≈ 7 (متعادل)"});A.step(4);st=10;evap();}}]:[]});
  S.drag(bk[0].g,{back:true,oy:-50,targets:()=>st===7?[{g:bk[1].g,fn:async()=>{await S.pour(bk[0].g,610,220,-75,()=>Promise.all([bk[0].to(0,700),bk[1].to(.5,700,uiCol(7))]));st=8;A.say("قيسي درجة حرارة المحلول الناتج: اسحبي ميزان الحرارة إلى الكأس الثانية.");}}]:[]});
  function evap(){A.say("ضعي المحلول في جفنة على منصب التسخين، وسخّنيه على لهب خفيف حتى يتبخّر الماء كلّه: اسحبي الكأس إلى الجفنة.");th.style.display="none";pp.style.display="none";ch.style.display="none";
    const bur=S.burner(150,392,{on:true});S.rect(100,212,100,6,{fill:"#78909c"});const dish=S.g();S.tr(dish,150,206);S.path("M-50 0 Q0 40 50 0Z",{fill:"#eceff1",stroke:"#90a4ae","stroke-width":3},dish);const liq=S.path("M-40 4 Q0 30 40 4Z",{fill:"#c8e6c9",opacity:0},dish);S.text(0,-12,"جفنة",{"font-size":12},dish);
    S.drag(bk[1].g,{back:true,oy:-50,targets:()=>[{g:dish,pad:20,fn:async()=>{await S.pour(bk[1].g,250,150,-70,async()=>{liq.setAttribute("opacity",.9);await sleep(400);});bk[1].set(0);const stm=S.bubbles(150,190,60,10,{h:60,col:"#eceff1"});
      await S.tween(2500,t=>liq.setAttribute("opacity",.9*(1-t)));stm.remove();for(let i=0;i<26;i++)S.rect(150+R(-34,34),206+R(2,14),4,4,{fill:"#fff",stroke:"#cfd8dc"});
      A.obs("بعد تبخّر الماء بقيت في الجفنة بلّورات بيضاء من ملح كلوريد الصوديوم NaCl.");A.step(5);}}]});}
 }});

/* ---------- 8) قياس pH لمحاليل بعض الأملاح ---------- */
const SALT=[["NH₄Cl","كلوريد الأمونيوم",5,"حمضي"],["NaCl","كلوريد الصوديوم",7,"متعادل"],["CH₃COONa","إيثانوات الصوديوم",9,"قاعدي"]];
BX.reg("c9-2-2-1",{cols:[["s","محلول الملح (0.1M)"],["ph","pH (تقديرًا)"],["k","نوع المحلول"]],chart:{x:"s",y:"ph",type:"bar",xl:"المحلول",yl:"pH",min:0,max:14},
 conclude:"محاليل الأملاح قد تكون حمضية (NH₄Cl) أو متعادلة (NaCl) أو قاعدية (CH₃COONa) بحسب قوّة الحمض والقاعدة المكوّنين للملح.",
 ans:["حمضي: NH₄Cl. متعادل: NaCl. قاعدي: CH₃COONa.","pH لمحلول NH₄Cl أقل من 7، وNaCl يساوي 7 تقريبًا، وCH₃COONa أكبر من 7."],
 build(S,A){const bk=SALT.map((s,i)=>{const b=S.beaker(200+i*200,392,110,110,{lvl:0,label:s[0]});b.s=s;return b;});const cyl=S.cylinder(70,470,110,{w:34,col:"#f1f8e9",lvl:0,label:"5 mL"});
  const bots=SALT.map((s,i)=>{const b=S.bottle(0,0,"#f5f5f5",s[0]);S.tr(b,560+i*80,475,0,.75);return b;});let cur=0,st=0;
  const pp=paper(S,140,470);const ch=chartUI(S,170,80,450,ph=>{if(st!==2){A.toast("اغمسي الورقة في المحلول أولًا");return;}const s=SALT[cur];if(ph!==s[2]){A.toast("طابقي اللون بدقّة…");return;}A.rec({s:s[0]+" ("+s[1]+")",ph,k:s[3]});swatch(2,uiCol(ph));S.label(bk[cur].g._x,bk[cur].g._y-150,"pH ≈ "+ph,null,"#7A1F2E");
    if(cur===0)A.step(1);cur++;st=0;if(cur===3){A.step(2);}else A.say("كرّري مستخدمة محلول "+SALT[cur][0]+": اسحبي زجاجته إلى المخبار.");});
  A.say("قيسي 5mL من محلول NH₄Cl بالمخبار: اسحبي زجاجته إلى المخبار.");
  bots.forEach((b,i)=>S.drag(b,{back:true,oy:-40,targets:()=>st===0?[{g:cyl.g,fn:async()=>{if(i!==cur){A.toast("الآن: "+SALT[cur][0]);return false;}await S.pour(b,120,260,-75,()=>cyl.to(.25,400));st=1;A.say("ضعيها في الكأس: اسحبي المخبار إلى كأس "+SALT[cur][0]+".");}}]:[]}));
  S.drag(cyl.g,{back:true,oy:-55,targets:()=>st===1?[{g:bk[cur].g,fn:async()=>{await S.pour(cyl.g,bk[cur].g._x+70,230,-80,()=>Promise.all([cyl.to(0,500),bk[cur].to(.2,500,"#f1f8e9")]));if(cur===0)A.step(0);st=1.5;A.say("ضعي ورقة الكاشف العام في المحلول، ثم طابقي لونها مع الدليل: اسحبي الورقة.");}}]:[]});
  S.drag(pp,{back:true,oy:-50,targets:()=>st===1.5?[{g:bk[cur].g,fn:async()=>{const c=uiCol(SALT[cur][2]);await S.tween(500,t=>pp.tip.setAttribute("fill",mix("#fff59d",c,t)));S.rect(bk[cur].g._x+40,bk[cur].g._y-140,12,30,{rx:2,fill:c,stroke:"#999"});pp.tip.setAttribute("fill","#fff59d");st=2;A.say("اضغطي اللون المطابق في دليل الكاشف العام.");}}]:[]});
 }});
})();
