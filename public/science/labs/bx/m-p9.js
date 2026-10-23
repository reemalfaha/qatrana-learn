/* تجارب الفيزياء — الصف التاسع (كتاب الطالب) — مطابقة لخطوات الكتاب */
(function(){const {sleep,lerp,clamp,mix,quiz,pickMany}=BX;const R=(a,b)=>a+Math.random()*(b-a);
const f2=v=>(+v).toFixed(2);

/* ---------- 1) أنظمة القياس والوحدات ---------- */
BX.reg("p9-1-1-0",{cols:[["m","رمز الطريقة"],["n","العدد"],["u","وحدة القياس"]],room:{table:false,wall1:"#f3efe7",wall2:"#e7dfd2"},
 conclude:"تختلف نتائج القياس بالوحدات غير الموحّدة (البلاطة، القدم) من شخص لآخر ومن مكان لآخر، أما القياس بوحدة موحّدة (المتر) بأداة دقيقة فيعطي نتائج متقاربة؛ لذلك نحتاج إلى نظام دولي موحّد للوحدات.",
 ans:["تتقارب النتائج بالشريط المتري والمسطرة كثيرًا، وتختلف بطريقة القدم (وأحيانًا البلاط) بين المجموعات.","لأن طول القدم يختلف من شخص لآخر، وقد يختلف حجم البلاط بين الغرف، أما المتر فوحدة موحّدة ثابتة.","الشريط المتري؛ لأنه بوحدة موحّدة (المتر) وأكثر دقّة ويقيس الطول كاملًا مرّة واحدة."],
 build(S,A){const L=7.2,px=80;/* 1m = 80px */ const x0=60,y0=150,W=L*px,H=200;
  const room=S.g();S.rect(x0,y0,W,H,{fill:"#efe7da",stroke:"#6d4c41","stroke-width":6},room);const tile=.4;
  for(let i=0;i<=L/tile;i++)S.line(x0+i*tile*px,y0,x0+i*tile*px,y0+H,{stroke:"#cdbfa8","stroke-width":1.5},room);for(let j=0;j<=H/(tile*px);j++)S.line(x0,y0+j*tile*px,x0+W,y0+j*tile*px,{stroke:"#cdbfa8","stroke-width":1.5},room);
  S.text(x0+W/2,y0-14,"غرفة الصف (منظر علوي)",{"font-size":15,fill:"#5d4037"});S.emo(x0+20,y0+H/2,"🚪",26);
  const M=[["أ","عدّ البلاط","🔲","بلاطة"],["ب","القدم بخطوات متراصّة","👣","قدم"],["ج","مسطرة خشبية (1m)","📏","(m)"],["د","شريط متري","📼","(m)"]];const done={};
  const lane=y=>y0+40+y*40;
  M.forEach(([k,t,e,u],i)=>{const g=S.g();S.tr(g,110+i*170,440);S.rect(-75,-26,150,52,{rx:12,fill:"#fff",stroke:"#B8902A","stroke-width":2},g);S.emo(-52,0,e,24,g);S.text(12,-4,"("+k+") "+t,{"font-size":11},g);S.text(12,14,"اسحبيها إلى الغرفة",{"font-size":9,fill:"#888"},g);
    S.drag(g,{back:true,targets:()=>done[k]?[]:[{g:room,pad:0,fn:async()=>{done[k]=1;S.off(g,true);await run(k,i);return false;}}]});});
  A.say("قيسي طول غرفة الصف بالطرائق الأربع: اسحبي كل طريقة إلى الغرفة (كل فرد من المجموعة يختار طريقة).");
  async function run(k,i){const y=lane(i);let n=0;const lab=S.label(x0+W+40,y,"",null,"#7A1F2E");
    if(k==="أ"){for(let c=0;c<L/tile;c++){S.rect(x0+c*tile*px+2,y-14,tile*px-4,28,{fill:"#ffcc80",opacity:.6});n=c+1;lab.set(n+"");await sleep(60);}A.rec({m:"أ",n:n,u:"بلاطة"});}
    else if(k==="ب"){const foot=.255;for(let x=0;x+foot<=L+.001;x+=foot){S.emo(x0+(x+foot/2)*px,y+(n%2?6:-6),"👣",13);n++;lab.set(n+"");await sleep(45);}const r=+(L/foot).toFixed(1);A.rec({m:"ب",n:r,u:"قدم"});n=r;}
    else if(k==="ج"){for(let c=0;c<Math.ceil(L);c++){const w=Math.min(1,L-c);S.rect(x0+c*px,y-8,w*px,16,{fill:c%2?"#ffe082":"#ffd54f",stroke:"#b08b2a"});lab.set((c+w).toFixed(1));await sleep(250);}n=7.2;A.rec({m:"ج",n:"7.2",u:"(m)"});}
    else{const t=S.rect(x0,y-6,0,12,{fill:"#fff59d",stroke:"#f9a825"});await S.tween(1500,p=>{t.setAttribute("width",W*p);lab.set((L*p).toFixed(2));});n=7.20;A.rec({m:"د",n:"7.20",u:"(m)"});}
    lab.set(String(n)+" "+M[i][3]);A.obs("الطريقة ("+k+") "+M[i][1]+": "+n+" "+M[i][3]);
    if(Object.keys(done).length===4){A.step(0);A.ui.add(A.ui.btn("📋 نظّمي النتائج وقارني بالمجموعات الأخرى",b=>{b.disabled=true;A.obs("مجموعة أخرى: البلاط 18 بلاطة، القدم 30 قدمًا، المسطرة 7.2 m، الشريط 7.21 m.");A.step(1);},"gold"));}}
 }});

/* ---------- 2) أدوات القياس ---------- */
const QTY=[["طول غرفة الصف","tape","7.20 m"],["عرض غرفة الصف","tape","5.40 m"],["طول القلم","ruler","14.6 cm"],["كتلة كرة فلزية","bal","28.4 g"],["قطر كرة فلزية","mic","19.05 mm"],["قطر علبة أسطوانية","ruler","6.6 cm"],["ارتفاع علبة أسطوانية","ruler","12.2 cm"],["سُمك صفيحة فلزية","mic","0.52 mm"]];
const TOOLS={ruler:"📏 مسطرة",tape:"📼 شريط متري",bal:"⚖️ ميزان رقمي",mic:"🔩 ميكروميتر"};
BX.reg("p9-1-2-0",{cols:[["q","الكمّية المراد قياسها"],["t","الأداة المستخدمة"],["v","القياس"]],
 conclude:"لكل كمّية أداة قياس مناسبة لمقدارها والدقّة المطلوبة: الشريط للأطوال الكبيرة، والمسطرة للأطوال المتوسّطة، والميكروميتر للأطوال الصغيرة جدًّا، والميزان للكتلة.",
 ans:["تكون النتائج متقاربة غالبًا مع اختلاف بسيط في الرقم الأخير (المشكوك فيه).","لاختلاف طريقة قراءة الأداة وزاوية النظر (خطأ اختلاف المنظر)، ودقّة الأداة، والتقدير في الرقم الأخير.","تختلف دقّة الأدوات؛ واختيار الأداة المناسبة يعطي قياسًا دقيقًا بعدد مناسب من الأرقام المعنوية ويقلّل الخطأ."],
 build(S,A){A.say("ارسمي جدولًا من ثلاثة أعمدة: الكمّية، الأداة، القياس.");
  A.ui.add(A.ui.btn("📋 ارسمي الجدول",b=>{b.disabled=true;A.ui.clear();A.step(0);choose();},"gold"));
  const tg=S.g();S.tr(tg,400,250);const obj=S.g(tg);const lab=S.label(400,90,"",null,"#7A1F2E");lab.style.display="none";
  function show(i,tool){obj.innerHTML="";const q=QTY[i][0];
    if(i<2){S.rect(-300,-90,600,180,{fill:"#efe7da",stroke:"#6d4c41","stroke-width":5},obj);if(tool)S.rect(-300,i?-90:-6,i?12:600,i?180:12,{fill:"#fff59d",stroke:"#f9a825"},obj);}
    else if(i===2){S.rect(-120,-6,240,12,{rx:6,fill:"#1565c0"},obj);S.path("M120 -6 L150 0 L120 6Z",{fill:"#ffcc80"},obj);if(tool)S.ruler(-140,40,300,{n:15,sub:2,par:obj});}
    else if(i===3||i===4){S.circ(0,0,30,{fill:S.rg(["#eceff1","#90a4ae","#546e7a"],.35,.35,.7)},obj);if(tool==="bal"){obj.innerHTML="";S.balance(0,80,{par:obj}).set(28.4);S.circ(0,10,26,{fill:S.rg(["#eceff1","#90a4ae","#546e7a"],.35,.35,.7)},obj);}if(tool==="mic")mic(obj,19.05);}
    else if(i===5||i===6){S.rect(-40,-70,80,140,{rx:6,fill:S.lg(["#c62828","#ef5350","#b71c1c"])},obj);S.ell(0,-70,40,10,{fill:"#e0e0e0"},obj);if(tool)S.ruler(i===5?-50:60,i===5?100:80,i===5?100:160,{n:i===5?10:16,sub:1,par:obj,rot:i===5?0:-90});}
    else{S.rect(-120,-4,240,8,{fill:"#b0bec5",stroke:"#78909c"},obj);if(tool==="mic")mic(obj,.52);}
    S.text(0,-120,q,{"font-size":18,fill:"#5d4037"},obj);}
  function mic(par,v){const g=S.g(par);S.tr(g,0,40);S.path("M-120 -20 L-120 40 Q-120 70 -90 70 L60 70 Q90 70 90 40 L90 -20 L70 -20 L70 40 Q70 50 60 50 L-90 50 Q-100 50 -100 40 L-100 -20Z",{fill:"#546e7a"},g);S.rect(-100,-32,30,24,{fill:"#90a4ae"},g);S.rect(70,-32,140,24,{fill:"#b0bec5"},g);S.rect(130,-40,90,40,{rx:4,fill:"#78909c"},g);S.text(170,-60,v+" mm",{"font-size":16,fill:"#1b5e20"},g);}
  function choose(){let i=0;const ask=()=>{if(i>=QTY.length){A.step(1);measure();return;}const [q,ok]=QTY[i];show(i,null);A.say("اختاري الأداة المناسبة لقياس: "+q);A.ui.clear();
      A.ui.choice(q+":",Object.entries(TOOLS),v=>{if(v!==ok){A.toast(v==="mic"?"الميكروميتر للأطوال الصغيرة جدًّا فقط":v==="bal"?"الميزان يقيس الكتلة لا الطول":"فكّري في مقدار الكمّية والدقّة المطلوبة");return;}QTY[i].pick=v;i++;ask();});};ask();}
  function measure(){A.ui.clear();let i=0;A.say("قيسي الكمّيات المطلوبة بالأداة المختارة، ودوّني القياس برقم ووحدة.");
    const next=()=>{if(i>=QTY.length){A.step(2);return;}const [q,t,v]=QTY[i];show(i,t);lab.style.display="";lab.set("القياس = "+v);A.ui.clear();
      A.ui.add(A.ui.btn("✍️ دوّني القياس: "+v,()=>{A.rec({q,t:TOOLS[t],v});i++;next();},"gold"));};next();}
 }});

/* ---------- 3) قياس قطر سلك فلزي بالميكروميتر ---------- */
BX.reg("p9-1-3-0",{cols:[["n","رقم المحاولة"],["d","القياس (mm)"],["ea","الخطأ المطلق (mm)"],["er","الخطأ النسبي المئوي %"]],
 conclude:"يقيس الميكروميتر الأطوال الصغيرة بدقّة 0.01mm، وتكرار القياس وحساب الوسط الحسابي يقلّل الأخطاء العشوائية.",
 ans:["الوسط الحسابي = مجموع القياسات ÷ 5 (انظري أسفل الجدول).","الخطأ المطلق = |القياس − الوسط الحسابي|، والخطأ النسبي المئوي = (الخطأ المطلق ÷ الوسط الحسابي) × 100%.","تكون القيم متقاربة جدًّا مع فروق صغيرة في الجزء من المئة من المليمتر.","لا؛ قد تختلف قليلًا بسبب اختلاف موضع القياس على السلك، وعدم انتظام قطر السلك، وطريقة القراءة.","الخطأ الصفري للأداة، والضغط الزائد على السلك (عدم استخدام السقّاطة)، واختلاف المنظر عند القراءة، وعدم انتظام قطر السلك.","نعم؛ الورنية أقل دقّة (0.1mm أو 0.05mm) فيزداد الخطأ في القراءة ولا تصلح لقياس دقيق لقطر سلك رفيع."],
 build(S,A){const g=S.g();S.tr(g,330,300);/* إطار الميكروميتر */
  S.path("M-260 -40 L-260 70 Q-260 120 -210 120 L40 120 Q90 120 90 70 L90 -40 L60 -40 L60 70 Q60 90 40 90 L-210 90 Q-230 90 -230 70 L-230 -40Z",{fill:S.lg(["#78909c","#546e7a"],1)},g);
  S.rect(-262,-52,40,24,{fill:"#cfd8dc",stroke:"#78909c"},g);S.text(-242,-62,"السندان",{"font-size":11},g);
  const sp=S.rect(0,-50,160,20,{fill:"#cfd8dc",stroke:"#78909c"},g);/* عمود القياس */
  const sleeve=S.g(g);S.rect(60,-60,170,40,{fill:S.lg(["#eceff1","#b0bec5"],1),stroke:"#78909c"},sleeve);S.line(60,-40,230,-40,{stroke:"#263238","stroke-width":1.5},sleeve);
  const k=24;/* 1mm = 24px */for(let mm=0;mm<=7;mm++){S.line(64+mm*k,-40,64+mm*k,-54,{stroke:"#263238","stroke-width":1.5},sleeve);S.text(64+mm*k,-62+(mm%5?100:0),mm%5?"":String(mm),{"font-size":10},sleeve);S.line(64+mm*k+k/2,-40,64+mm*k+k/2,-28,{stroke:"#263238","stroke-width":1.2},sleeve);}
  const th=S.g(g);const thb=S.rect(0,-72,110,64,{rx:6,fill:S.lg(["#90a4ae","#cfd8dc","#78909c"],1),stroke:"#546e7a"},th);const ticks=S.g(th);S.rect(110,-62,40,44,{rx:4,fill:"#546e7a"},th);S.text(130,-80,"السقّاطة",{"font-size":10},th);
  const wire=S.g();S.rect(-60,-4,8,320,{fill:S.lg(["#b87333","#e6a15c","#8d5524"]),transform:"rotate(90)"},wire);wire.style.display="none";
  let gap=2.0;const posX=()=>-222+gap*k*1.0;
  function draw(){const x=-222+gap*k;sp.setAttribute("x",x);sp.setAttribute("width",230-x+0);S.tr(th,64+gap*k-0,0);ticks.innerHTML="";const frac=(gap*100)%50;/* قسمات الدائرية 50 */
    for(let j=-6;j<=6;j++){const val=((Math.round(frac)+j)%50+50)%50;const yy=-40-j*7+ (frac-Math.round(frac))*7;if(yy<-70||yy>-10)continue;S.line(0,yy,val%5?10:18,yy,{stroke:"#263238","stroke-width":1.2},ticks);if(val%5===0)S.text(30,yy+4,String(val),{"font-size":9,direction:"ltr"},ticks);}
    rd.set(st===3?"اقرئي التدريجين":f2(gap)+" mm");}
  const rd=S.label(330,120,"",null,"#1b5e20");const zoomNote=S.text(330,470,"التدريج الطولي (0.5mm) + التدريج الدائري (0.01mm)",{"font-size":12,fill:"#555"});
  const D=[.91,.92,.90,.92,.91];let st=0,tr=0;const reads=[];draw();
  A.say("عايِري الميكروميتر على الصفر: أديري المقياس الدائري حتى ينطبق الفكّان (حرّكي الشريط إلى 0).");
  A.ui.slider("🔄 تدوير المقياس الدائري (mm)",0,4,.01,2,v=>{let lim=st>=2&&wire.style.display===""?D[tr]:0;gap=Math.max(v,lim);draw();
    if(st===0&&gap<=.0001){st=1;A.toast("انطبق الفكّان: الصفر على الصفر ✔ (لا يوجد خطأ صفري)");A.step(0);A.say("أديري المقياس ليبتعد الفكّان مسافة تسمح بإدخال السلك (أكثر من 1mm).");}
    else if(st===1&&gap>1){st=2;A.step(1);wire.style.display="";A.say("أُدخل السلك بين الفكّين، ثم أديري المقياس ببطء (إلى الأسفل) حتى يُطبق الفكّان على السلك.");}
    else if(st===2&&Math.abs(gap-D[tr])<.005){st=3;if(!A.is(2))A.step(2);A.toast("طق طق — أطبق الفكّان على السلك (السقّاطة)");askRead();}
    else if(st===4&&gap>1.0){st=2;S.tr(wire,0,(tr%3-1)*14);A.say("أُطبقي الفكّين على السلك في موضع جديد (المحاولة "+(tr+1)+").");}});
  function askRead(){const v=D[tr];const opts=[v,+(v+.5).toFixed(2),+(v-.09).toFixed(2)].sort(()=>Math.random()-.5);A.ui.choice?0:0;
    const g2=A.ui.group("اقرئي الميكروميتر (المحاولة "+(tr+1)+"):");opts.forEach(o=>g2.append(A.ui.btn(f2(o)+" mm",b=>{if(o!==v){A.toast("اجمعي قراءة التدريج الطولي مع قراءة التدريج الدائري × 0.01mm");return;}g2.remove();rd.set(f2(v)+" mm ✔");reads.push(v);A.obs("المحاولة "+(tr+1)+": "+f2(v)+" mm");if(tr===0)A.step(3);tr++;
      if(tr>=5){A.step(4);calc();}else{st=4;A.say("أديري المقياس ليبتعد الفكّان (أكثر من 1mm)، ثم كرّري القياس في موضع آخر من السلك.");}},"g")));}
  function calc(){const m=reads.reduce((a,b)=>a+b,0)/5;A.ui.add(A.ui.btn("🧮 احسبي الوسط الحسابي والأخطاء",b=>{b.disabled=true;reads.forEach((v,i)=>{const ea=Math.abs(v-m);A.rec({n:i+1,d:f2(v),ea:ea.toFixed(3),er:(ea/m*100).toFixed(1)});});A.obs("الوسط الحسابي (القيمة المقبولة) = "+m.toFixed(3)+" mm");},"gold"));}
 }});

/* ---------- 4) القوّة والحركة (طبيعة السطح) ---------- */
const SURF=[["بلاط أرضية الغرفة","#e0d6c8",182],["لوح كرتون","#c8a46b",146],["كرتون مغطّى بالرمل","#e6c98a",48]];
BX.reg("p9-2-1-0",{cols:[["s","طبيعة السطح"],["d1","المحاولة 1 (cm)"],["d2","المحاولة 2 (cm)"],["d3","المحاولة 3 (cm)"],["av","متوسّط المسافة (cm)"]],chart:{x:"s",y:"av",type:"bar",xl:"طبيعة السطح",yl:"متوسّط المسافة (cm)"},
 conclude:"كلما زادت خشونة السطح (قوّة الاحتكاك) قلّت المسافة التي تقطعها السيارة قبل أن تتوقّف.",
 ans:["(مخطّط أعمدة: البلاط أكبر مسافة، ثم الكرتون، ثم الرمل).","كلما زادت خشونة السطح قلّت المسافة التي تقطعها السيارة؛ لزيادة قوّة الاحتكاك.","عدم إطلاق السيارة من النقطة نفسها، دفعها عند الإطلاق، عدم دقّة تحديد موقع التوقّف وقراءة المسطرة؛ ونقلّلها بالتكرار وأخذ المتوسّط والإطلاق دون دفع.","قوّة الاحتكاك بين العجلات والسطح (ومقاومة الهواء) تعاكس الحركة فتوقفها.","ستقطع السيارة مسافة أكبر بكثير؛ لأن الاحتكاك قليل جدًّا.","لا تتوقّف (تستمر بسرعة ثابتة) لعدم وجود قوّة محصّلة تعاكس حركتها — القانون الأول لنيوتن."],
 build(S,A){const floorY=392;const books=S.g();const board=S.g();S.tr(board,0,0);board.style.display="none";const car=S.g();
  S.rect(-22,-14,44,14,{rx:4,fill:"#e53935"},car);S.rect(-10,-24,22,12,{rx:3,fill:"#90caf9"},car);S.circ(-13,0,6,{fill:"#212121"},car);S.circ(13,0,6,{fill:"#212121"},car);car.style.display="none";
  const surfR=S.rect(160,floorY-4,620,8,{fill:"#e0d6c8"});const sand=S.g();sand.style.display="none";for(let i=0;i<180;i++)S.circ(R(165,775),floorY-4+R(-3,3),R(1.5,3),{fill:"#d4b06a"},sand);
  const bk=[];for(let i=0;i<3;i++){const b=S.g();S.tr(b,40+i*38,470);S.rect(-16,-40,32,40,{rx:3,fill:["#7A1F2E","#1d7f8c","#B8902A"][i]},b);bk.push(b);}
  const bw=S.g();S.tr(bw,190,470);S.rect(-70,-8,140,8,{fill:"#c8a46b"},bw);S.text(0,18,"لوح خشب أملس",{"font-size":11},bw);
  let nb=0;A.say("ضعي مستوًى مائلًا: اسحبي الكتب الثلاثة إلى الطاولة يسار الأرضية، ثم اللوح الخشبي.");const stackX=60;
  bk.forEach(b=>S.drag(b,{targets:()=>[{box:[20,250,120,145],pad:10,fn:async()=>{b._off=true;await S.moveTo(b,stackX,floorY-nb*40,250);nb++;return "stay";}}],back:true}));
  S.drag(bw,{back:true,targets:()=>nb===3?[{box:[20,200,160,195],pad:20,fn:async()=>{bw.style.display="none";board.style.display="";S.path("M"+(stackX-20)+" "+(floorY-120)+" L162 "+floorY,{stroke:"#a0763d","stroke-width":10,"stroke-linecap":"round"},board);car.style.display="";S.tr(car,stackX,floorY-128,22);A.step(0);ready();}}]:[]});
  let si=0,trial=0,cur=[];const marks=S.g();const tape=S.ruler(162,440,600,{n:6,step:100,sub:10});tape.style.display="none";
  function ready(){A.say("ضعي السيارة عند أعلى المستوى ثم اتركيها: اضغطي على السيارة.");}
  let busy=false;S.tap(car,async()=>{if(busy)return;if(cur.length>trial){A.toast("قيسي المسافة أولًا");return;}busy=true;const d=SURF[si][2]*R(.95,1.05);
    await S.tween(700,t=>{S.tr(car,lerp(stackX,162,t*t),lerp(floorY-128,floorY-8,t*t),22*(1-t));});const xe=162+d*1.0*3.2/1;/*1cm=3.2px? use scale*/
    const pxPerCm=600/200;const X=162+d*pxPerCm;await S.tween(Math.max(600,d*12),t=>{const k=1-(1-t)*(1-t);S.tr(car,lerp(162,X,k),floorY-8,0);});
    S.line(X,floorY-20,X,floorY+10,{stroke:"#c62828","stroke-width":3},marks);car.d=Math.round(d);busy=false;if(si===0&&trial===0)A.step(1);
    A.say("قيسي المسافة الأفقية التي قطعتها السيارة: اسحبي شريط القياس إلى الأرضية.");tape.style.display="";});
  S.drag(tape,{back:true,ox:300,oy:-12,targets:()=>car.d&&cur.length===trial?[{box:[160,370,620,60],pad:20,fn:async()=>{await S.moveTo(tape,162,floorY+26,250);cur.push(car.d);A.toast("المسافة = "+car.d+" cm");if(si===0&&trial===0)A.step(2);car.d=0;trial++;
      if(trial<3){A.say("كرّري المحاولة (المحاولة "+(trial+1)+" من 3): اضغطي على السيارة بعد إعادتها لأعلى المستوى.");S.tr(car,stackX,floorY-128,22);}
      else{const av=Math.round(cur.reduce((a,b)=>a+b,0)/3);A.rec({s:SURF[si][0],d1:cur[0],d2:cur[1],d3:cur[2],av});if(si===0)A.step(3);marks.innerHTML="";si++;trial=0;cur=[];S.tr(car,stackX,floorY-128,22);
        if(si===1){A.say("ضعي لوح الكرتون على الأرضية عند نهاية المستوى وثبّتيه، ثم كرّري: اضغطي «ضعي لوح الكرتون».");A.ui.add(A.ui.btn("📦 ضعي لوح الكرتون وثبّتيه باللاصق",b=>{b.remove();surfR.setAttribute("fill",SURF[1][1]);surfR.setAttribute("height",10);A.say("كرّري الخطوات على الكرتون: اضغطي على السيارة.");},"gold"));}
        else if(si===2){A.step(4);A.say("غطّي لوح الكرتون بطبقة من الرمل، ثم كرّري: اضغطي «غطّي بالرمل».");A.ui.add(A.ui.btn("🏖️ غطّي الكرتون بطبقة رمل",b=>{b.remove();sand.style.display="";A.say("كرّري الخطوات على الرمل: اضغطي على السيارة.");},"gold"));}
        else{A.step(5);A.obs("قطعت السيارة أكبر مسافة على البلاط وأقلّها على الرمل.");}}
      return "stay";}}]:[]});
 }});

/* ---------- 5) مقاومة الهواء ---------- */
BX.reg("p9-2-2-0",{cols:[["e","المحاولة"],["a","الجسم الأول"],["b","الجسم الثاني"],["r","النتيجة"]],
 conclude:"تؤثّر مقاومة الهواء في الأجسام الساقطة، وتزداد بزيادة مساحة السطح المعرّض للهواء؛ فتُبطئ الورقة المسطّحة، بينما تسقط قطعة النقود وكرة الورق معًا تقريبًا.",
 ans:["وصلت قطعة النقود أولًا، وسقطت الورقة ببطء وتمايلت؛ لأن مقاومة الهواء على الورقة كبيرة بالنسبة لوزنها.","تكوير الورقة قلّل مساحة سطحها فقلّت مقاومة الهواء، فسقطت أسرع من الورقة المسطّحة.","قوّة الجاذبية (الوزن) إلى الأسفل، وقوّة مقاومة الهواء إلى الأعلى.","عدم الإفلات في اللحظة نفسها ومن الارتفاع نفسه، وتيارات الهواء في الغرفة، وصعوبة الحكم بالعين؛ نقلّلها بالتكرار والإفلات من ارتفاع أكبر وتصوير السقوط."],
 build(S,A){const top=90,bot=392;S.ruler(60,top+30,(bot-top),{rot:90,n:3,step:50,sub:5});S.text(110,80,"الارتفاع نفسه",{"font-size":12});const hand=S.emo(400,60,"🙌",40);
  const OBJ={coin:["قطعة نقود","🪙",.55],sheet:["ورقة مسطّحة","📄",2.2],ball:["كرة ورق","⚪",.62]};const TR=[["coin","sheet"],["ball","sheet"],["coin","ball"]];let k=0;const els={};
  function setup(){Object.values(els).forEach(e=>e.remove());const [a,b]=TR[k];els.a=S.emo(330,top+20,OBJ[a][1],34);els.b=S.emo(470,top+20,OBJ[b][1],34);S.text(330,top-14,OBJ[a][0],{"font-size":12});S.text(470,top-14,OBJ[b][0],{"font-size":12});
    A.say(["أسقطي الورقة البيضاء وقطعة النقود من الارتفاع نفسه وفي اللحظة نفسها.","كوّري إحدى الورقتين على شكل كرة، ثم أسقطي الورقة المسطّحة وكرة الورق معًا.","أسقطي قطعة النقود وكرة الورق من الارتفاع نفسه وفي اللحظة نفسها."][k]);A.ui.clear();
    if(k===1)A.ui.add(A.ui.btn("✊ كوّري الورقة الثانية",b=>{b.remove();A.toast("أصبحت كرة ورق");A.ui.add(dropBtn());},"gold"));else A.ui.add(dropBtn());}
  function dropBtn(){return A.ui.btn("⬇️ أسقطيهما معًا",async b=>{b.disabled=true;const [a,c]=TR[k];const T=[OBJ[a][2],OBJ[c][2]];const tmax=Math.max(...T);const w=S.watch(640,150);
    await S.tween(tmax*1600,(e,t)=>{const tt=t*tmax;[["a",a,T[0]],["b",c,T[1]]].forEach(([id,o,tf])=>{const p=clamp(tt/tf,0,1);const y=top+20+(bot-top-30)*(o==="sheet"?p:p*p);const x=(id==="a"?330:470)+(o==="sheet"?Math.sin(tt*6)*30:0);els[id].setAttribute("y",y);els[id].setAttribute("x",x);});w.set(tt);});
    const same=Math.abs(T[0]-T[1])<.1;const r=same?"وصلا في اللحظة نفسها تقريبًا":(T[0]<T[1]?OBJ[a][0]:OBJ[c][0])+" وصلت أولًا";
    quiz(A,[["هل وصل الجسمان إلى سطح الأرض في اللحظة نفسها؟",[["y","نعم، تقريبًا معًا"],["n","لا"]],same?"y":"n","أعيدي مشاهدة السقوط بتمعّن"]],()=>{A.rec({e:k+1,a:OBJ[a][0],b:OBJ[c][0],r});A.step(k);w.g.remove();k++;if(k<3)setup();});},"gold");}
  setup();
 }});

/* ---------- 6) أحسب الشغل والقدرة (صعود الدرج) ---------- */
BX.reg("p9-3-1-0",{cols:[["c","طريقة الصعود"],["t","متوسّط الزمن (s)"],["W","الشغل Wg (J)"],["P","القدرة (W)"]],chart:{x:"c",y:"P",type:"bar",xl:"طريقة الصعود",yl:"القدرة (W)"},
 conclude:"الشغل المبذول في صعود الدرج نفسه لا يتغيّر بتغيّر السرعة (W = Fg × h)، لكن القدرة تزداد عند الصعود بسرعة أكبر لأن الزمن أقل (P = W ÷ t).",
 ans:["لا يتغيّر الشغل؛ لأن الوزن والإزاحة الرأسية (ارتفاع الدرج) لم يتغيّرا.","نعم تزداد القدرة؛ لأن الشغل نفسه يُنجز في زمن أقل.","(تختلف من زميلة لأخرى).","لاختلاف الكتل (الأوزان) واختلاف الزمن المستغرق في الصعود.","عدم دقّة قياس الزمن (زمن ردّ الفعل)، وعدم ثبات السرعة، وعدم دقّة قياس ارتفاع الدرجة؛ نقلّلها بتكرار القياس وأخذ المتوسّط."],
 build(S,A){const N=12,sh=.17,sw=34;const x0=330,y0=392;const st=S.g();for(let i=0;i<N;i++){S.rect(x0+i*sw,y0-(i+1)*sh*120,sw,(i+1)*sh*120,{fill:i%2?"#bcaaa4":"#a1887f",stroke:"#6d4c41"},st);}
  const girl=S.g();S.emo(0,-24,"🧍‍♀️",44,girl);S.tr(girl,90,y0);const sc=S.g();S.tr(sc,90,y0);S.rect(-34,-10,68,10,{rx:3,fill:"#eceff1",stroke:"#90a4ae"},sc);const scr=S.screen(0,-40,90,"0.0 kg",{par:sc});scr.g.setAttribute("transform","translate(0 26) scale(.6)");S.layer.append(girl);
  let m=50;A.ui.slider("⚖️ كتلتكِ (kg)",35,75,1,50,v=>{m=v;});
  A.say("قفي على الميزان واطلبي إلى زميلتك قياس كتلتك، ثم احسبي وزنك (Fg = m g): اختاري كتلتكِ ثم اضغطي «قيسي».");
  A.ui.add(A.ui.btn("⚖️ قيسي الكتلة واحسبي الوزن",b=>{b.disabled=true;scr.set(m.toFixed(1)+" kg");const Fg=+(m*9.8).toFixed(1);A.obs("الكتلة m = "+m+" kg، الوزن Fg = m g = "+m+" × 9.8 = "+Fg+" N");A.step(0);step2(Fg);},"gold"));
  function step2(Fg){A.ui.clear();A.say("قيسي ارتفاع الدرجة الواحدة بالمسطرة: اسحبي المسطرة إلى إحدى الدرجات.");const r=S.ruler(700,470,60,{rot:-90,n:2,step:10,sub:10});
    S.drag(r,{back:true,targets:()=>[{g:st,pad:0,fn:async()=>{A.toast("ارتفاع الدرجة = 17 cm");A.say("عُدّي الدرجات: اضغطي على الدرجات واحدة واحدة.");let c=0;[...st.children].forEach((e,i)=>S.tap(e,()=>{if(e._c)return;e._c=1;e.setAttribute("fill","#ffcc80");c++;if(c===N){const h=+(N*sh).toFixed(2);A.obs("عدد الدرجات "+N+" × 0.17 m = ارتفاع الدرج "+h+" m");A.step(1);climb(Fg,h);}}));}}]});}
  function climb(Fg,h){const times={walk:[],run:[]};let mode="walk";const w=S.watch(200,150);
    const go=async()=>{const base=mode==="walk"?10:5;const t=+(base*R(.96,1.04)).toFixed(1);S.tr(girl,x0-20,y0);await S.tween(1600,(e,p)=>{const i=p*N;S.tr(girl,x0-20+i*sw,y0-Math.floor(i)*sh*120);w.set(p*t);});w.set(t);times[mode].push(t);A.obs((mode==="walk"?"صعود عادي":"صعود سريع")+" — المحاولة "+times[mode].length+": "+t+" s");
      if(mode==="walk"&&times.walk.length===1)A.step(2);if(times[mode].length<3){A.say("أعيدي الصعود بالسرعة نفسها (المحاولة "+(times[mode].length+1)+" من 3): اضغطي «اصعدي».");S.tr(girl,90,y0);}else finish();};
    const finish=()=>{const av=+(times[mode].reduce((a,b)=>a+b,0)/3).toFixed(2);if(mode==="walk")A.step(3);A.ui.clear();A.say("احسبي الشغل Wg = Fg × h، ثم القدرة P = Wg ÷ t.");
      A.ui.add(A.ui.btn("🧮 احسبي الشغل والقدرة",b=>{b.disabled=true;const W=+(Fg*h).toFixed(0),P=+(W/av).toFixed(0);A.rec({c:mode==="walk"?"صعود بسرعة عادية":"صعود بسرعة أكبر",t:av,W,P});if(mode==="walk"){A.step(4);A.step(5);mode="run";S.tr(girl,90,y0);A.ui.clear();A.say("جرّبي صعود الدرج بسرعة أكبر وكرّري الخطوات: اضغطي «اصعدي».");A.ui.add(A.ui.btn("🏃‍♀️ اصعدي",()=>go(),"gold"));}else{A.step(6);A.ui.clear();}},"gold"));};
    A.say("اصعدي الدرج واطلبي إلى زميلتك قياس الزمن: اضغطي «اصعدي».");A.ui.add(A.ui.btn("🚶‍♀️ اصعدي",()=>go(),"gold"));}
 }});

/* ---------- 7) العلاقة بين الشغل والطاقة (البندول والصندوق) ---------- */
BX.reg("p9-3-1-1",{cols:[["h","ارتفاع الكرة (cm)"],["d1","المسافة 1 (cm)"],["d2","المسافة 2 (cm)"],["d3","المسافة 3 (cm)"],["av","المتوسّط (cm)"]],chart:{x:"h",y:"av",xl:"ارتفاع الكرة (cm)",yl:"المسافة التي قطعها الصندوق (cm)"},
 conclude:"كلما زاد ارتفاع الكرة زادت طاقة وضعها، فتتحوّل إلى طاقة حركية أكبر، وتبذل شغلًا أكبر على الصندوق فيقطع مسافة أكبر.",
 ans:["تتحوّل طاقة الوضع إلى طاقة حركية في أثناء نزول الكرة، وعند الاصطدام تبذل الكرة شغلًا على الصندوق فتنتقل إليه طاقة.","علاقة طردية: كلما زاد ارتفاع الكرة زادت المسافة التي يقطعها الصندوق.","تبذل الكرة قوّة على الصندوق خلال إزاحته فتبذل شغلًا عليه، فتنتقل الطاقة الحركية من الكرة إلى الصندوق، ثم تتحوّل إلى طاقة حرارية بفعل الاحتكاك حتى يتوقّف.","تزداد المسافة؛ لأن طاقة الوضع (mgh) أكبر. التجربة: نثبّت الارتفاع وطول الخيط والصندوق والسطح، ونغيّر كتلة الكرة فقط."],
 build(S,A){const pv=[300,90],L=250;const stand=S.g();S.rect(180,392-10,40,10,{fill:"#455a64"},stand);S.rect(195,80,8,302,{fill:"#607d8b"},stand);S.rect(195,80,110,8,{fill:"#607d8b"},stand);stand.style.display="none";
  const rl=S.ruler(380,392,250,{rot:-90,n:5,step:5,sub:5});const str=S.line(pv[0],pv[1],pv[0],pv[1]+L,{stroke:"#555","stroke-width":2});const ball=S.circ(pv[0],pv[1]+L,16,{fill:S.rg(["#eceff1","#90a4ae","#455a64"],.35,.35,.7)});[str,ball].forEach(e=>e.style.display="none");
  const box=S.g();S.rect(0,-34,70,34,{fill:"#d7a86e",stroke:"#8d6e63","stroke-width":2},box);S.text(35,-12,"صندوق",{"font-size":11},box);S.tr(box,620,470);
  A.say("اعملي نموذج البندول وعلّقيه بالحامل: اضغطي «اعملي البندول».");
  A.ui.add(A.ui.btn("🧵 اعملي البندول وعلّقيه",b=>{b.remove();stand.style.display="";[str,ball].forEach(e=>e.style.display="");A.step(0);A.step(1);A.say("ضعي الصندوق على الطاولة بحيث تلامسه الكرة: اسحبي الصندوق.");},"gold"));
  S.drag(box,{back:true,targets:()=>A.is(1)&&!A.is(2)?[{box:[310,330,120,70],pad:20,fn:async()=>{await S.moveTo(box,pv[0]+16,392,250);A.step(2);A.say("اسحبي الكرة جانبًا (إلى اليسار)، ولاحظي ارتفاعها على المسطرة، ثم أفلتيها.");setupBall();return "stay";}}]:[]});
  const H=[5,10,15,20];const res={};let cur=null;
  function setupBall(){let dragging=false,ang=0;const hl=S.label(470,120,"",null,"#7A1F2E");
    ball.style.cursor="grab";ball.addEventListener("pointerdown",e=>{if(S.busy)return;dragging=true;e.preventDefault();});
    addEventListener("pointermove",e=>{if(!dragging)return;const p=S.pt(e);const a=clamp(Math.atan2(pv[0]-p.x,p.y-pv[1]),0,1.1);ang=a;pos(a);const h=L*(1-Math.cos(a))/5;hl.set("الارتفاع ≈ "+Math.round(h)+" cm");});
    addEventListener("pointerup",async()=>{if(!dragging)return;dragging=false;const h=L*(1-Math.cos(ang))/5;const hs=H.reduce((a,b)=>Math.abs(b-h)<Math.abs(a-h)?b:a);if(Math.abs(hs-h)>2.5){A.toast("اسحبي الكرة إلى أحد الارتفاعات: 5، 10، 15، 20 cm");S.busy=1;await S.tween(300,t=>pos(ang*(1-t)));S.busy=0;return;}
      S.busy=window.__busy=1;const a0=Math.acos(1-hs*5/L);await S.tween(500,t=>pos(a0*(1-t)*(1-t)));const d=Math.round((hs*2.4-3)*R(.93,1.07));const x0=box._x;await S.tween(700,t=>{const k=1-(1-t)*(1-t);S.tr(box,x0+d*1.5*k,392);});
      (res[hs]=res[hs]||[]).push(d);A.toast("الارتفاع "+hs+" cm ← قطع الصندوق "+d+" cm");if(!A.is(3))A.step(3);await sleep(400);S.tr(box,pv[0]+16,392);S.busy=window.__busy=0;
      if(res[hs].length===3){const r=res[hs];A.rec({h:hs,d1:r[0],d2:r[1],d3:r[2],av:Math.round((r[0]+r[1]+r[2])/3)});if(!A.is(4))A.step(4);const left=H.filter(x=>!(res[x]&&res[x].length===3));if(left.length<=1&&!A.is(5)&&Object.keys(res).filter(x=>res[x].length===3).length>=3)A.step(5);
        A.say(left.length?"أعيدي الصندوق وكرّري بارتفاع آخر: "+left.join("، ")+" cm.":"أحسنتِ!");}else A.say("كرّري بالارتفاع نفسه ("+hs+" cm) — المحاولة "+(res[hs].length+1)+" من 3.");});
    function pos(a){const x=pv[0]-Math.sin(a)*L,y=pv[1]+Math.cos(a)*L;str.setAttribute("x2",x);str.setAttribute("y2",y);ball.setAttribute("cx",x);ball.setAttribute("cy",y);}}
 }});

/* ---------- 8) الكفاءة للمستوى المائل ---------- */
BX.reg("p9-3-2-0",{cols:[["m","الطريقة"],["F","قراءة الميزان (N)"],["d","المسافة (m)"],["W","الشغل (J)"]],
 conclude:"كفاءة المستوى المائل أقل من 100% لأن جزءًا من الشغل المبذول يُستهلك في التغلّب على الاحتكاك؛ والفائدة الآلية الفعلية (W/F) أقل من المثالية (d/h).",
 ans:["الفائدة الآلية المثالية = d ÷ h = 1.00 ÷ 0.50 = 2.0","الفائدة الآلية الفعلية = الوزن ÷ قراءة الميزان على المستوى ≈ 5.0 ÷ 2.9 ≈ 1.7","الفائدة الفعلية أقل من المثالية بسبب قوّة الاحتكاك بين العربة والمستوى.","الشغل على المستوى = 2.9 × 1.00 ≈ 2.9 J؛ الشغل عند الرفع رأسيًّا = 5.0 × 0.50 = 2.5 J.","e = (2.5 ÷ 2.9) × 100% ≈ 86%","لأن جزءًا من الشغل المبذول يتحوّل إلى طاقة حرارية بسبب الاحتكاك، فالشغل الناتج أقل من المبذول.","عدم سحب الميزان بسرعة ثابتة أو بموازاة المستوى، وقراءة الميزان في أثناء الحركة، وعدم دقّة قياس المسافة والارتفاع."],
 build(S,A){const ang=30*Math.PI/180,Ld=1.0,px=360;const x0=180,y0=392;const inc=S.g();inc.style.display="none";
  const xt=x0+px*Math.cos(ang),yt=y0-px*Math.sin(ang);S.path("M"+x0+" "+y0+" L"+xt+" "+yt+" L"+xt+" "+y0+"Z",{fill:S.lg(["#c8a46b","#a1774a"],1),stroke:"#6d4c41","stroke-width":3},inc);S.rect(xt-6,yt,12,y0-yt,{fill:"#ffca28"},inc);
  A.say("ضعي المستوى المائل على سطح أفقي وثبّتيه على زاوية معيّنة: اختاري الزاوية.");
  quiz(A,[["ثبّتي المستوى المائل على زاوية:",[["30","30°"]],"30"]],()=>{inc.style.display="";A.step(0);place();});
  const cart=S.g();S.rect(-26,-22,52,20,{rx:4,fill:"#1976d2"},cart);S.circ(-14,0,6,{fill:"#212121"},cart);S.circ(14,0,6,{fill:"#212121"},cart);S.tr(cart,90,470);
  const spr=S.spring(0,0);S.tr(spr.g,700,120,0,.7);const sl=S.label(700,90,"",null,"#c62828");sl.style.display="none";
  const W0=5.0,F=2.9,h=+(Ld*Math.sin(ang)).toFixed(2);const trials=[];
  function place(){A.say("ضعي العربة في أسفل المستوى وثبّتي بها الميزان النابضي: اسحبي العربة إلى أسفل المستوى.");
    S.drag(cart,{back:true,targets:()=>[{g:inc,pad:20,fn:async()=>{await S.moveTo(cart,x0+30,y0-14,250,-30);cart._off=true;A.say("اسحبي الميزان بلطف إلى أعلى المستوى بموازاته وبسرعة ثابتة: اضغطي «اسحبي».");pull();return "stay";}}]});}
  function pull(){A.ui.clear();A.ui.add(A.ui.btn("⬆️ اسحبي الميزان بسرعة ثابتة",async b=>{b.disabled=true;sl.style.display="";spr.g.style.display="none";const Fi=+(F*R(.97,1.03)).toFixed(1);
    const sx=x0+30,sy=y0-14,ex=x0+(px-40)*Math.cos(ang),ey=y0-(px-40)*Math.sin(ang)-14;const line=S.line(sx,sy,sx,sy,{stroke:"#555","stroke-width":2});
    await S.tween(1800,t=>{const x=lerp(sx,ex,t),y=lerp(sy,ey,t);S.tr(cart,x,y,-30);line.setAttribute("x1",x+20);line.setAttribute("y1",y-10);line.setAttribute("x2",x+90);line.setAttribute("y2",y-50);sl.setAttribute("transform","translate("+(x+90)+" "+(y-70)+")");sl.set("قراءة الميزان = "+Fi+" N");});
    line.remove();const t1=trials.length===0;if(t1){A.step(1);A.step(2);}trials.push({F:Fi});A.say("قيسي المسافة التي تحرّكتها العربة على المستوى: اضغطي «قيسي المسافة».");
    A.ui.clear();A.ui.add(A.ui.btn("📏 قيسي المسافة على المستوى",b2=>{b2.disabled=true;trials[trials.length-1].d=Ld;A.toast("المسافة = 1.00 m");if(t1)A.step(3);
      A.ui.clear();A.ui.add(A.ui.btn("⚖️ زني العربة بالميزان النابضي وقيسي الارتفاع h",b3=>{b3.disabled=true;const Wm=+(W0*R(.99,1.01)).toFixed(1);trials[trials.length-1].W=Wm;A.toast("الوزن = "+Wm+" N، الارتفاع h = "+h+" m");
        const T=trials[trials.length-1];A.rec({m:"استخدام المستوى المائل (المحاولة "+trials.length+")",F:T.F,d:T.d,W:+(T.F*T.d).toFixed(2)});A.rec({m:"الرفع رأسيًّا (المحاولة "+trials.length+")",F:T.W,d:h,W:+(T.W*h).toFixed(2)});
        if(t1)A.step(4);S.tr(cart,x0+30,y0-14,-30);sl.style.display="none";if(trials.length<3){A.say("كرّري القياس (المحاولة "+(trials.length+1)+" من 3).");pull();}else{A.step(5);const e=(trials.reduce((a,t)=>a+t.W*h/(t.F*t.d),0)/3*100).toFixed(0);A.obs("متوسّط الكفاءة = (Wout ÷ Win) × 100% ≈ "+e+"%");A.ui.clear();}},"gold"));},"gold"));},"gold"));}
 }});
})();
