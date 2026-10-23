/* تجارب العلوم — الصف الثامن (كتاب الأنشطة) — مطابقة لخطوات الكتاب */
(function(){const {sleep,lerp,clamp,mix,quiz,pickMany}=BX;const R=(a,b)=>a+Math.random()*(b-a);
const nextBtn=(A,t,fn,cls)=>{A.ui.clear();A.ui.add(A.ui.btn(t,b=>{b.disabled=true;fn(b);},cls||"gold"));};

/* ---------- 1) استخلاص المادّة الوراثية من الفاكهة ---------- */
BX.reg("s8-1-1-0",{conclude:"تظهر المادّة الوراثية (DNA) على شكل خيوط بيضاء دقيقة لزجة قرب سطح المحلول عند إضافة الكحول المبرّد.",
 ans:["محلول تنظيف الصحون يُذيب أغشية الخلايا وأغشية الأنوية (المكوّنة من الدهون) فيُحرّر DNA، والملح يساعد على تجمّع جزيئاته؛ أما الكحول المبرّد فلا يذوب فيه DNA فيترسّب ويظهر على شكل خيوط بيضاء."],
 build(S,A){const fr=S.g();S.tr(fr,110,440);S.emo(0,-20,"🍓",50,fr);S.text(0,22,"فراولة",{"font-size":12},fr);
  const plate=S.dish(110,330,60,{label:"طبق"});const bk1=S.beaker(330,392,120,120,{lvl:0,label:"الكأس 1"}),bk2=S.beaker(560,392,120,120,{lvl:0,label:"الكأس 2"});
  A.say("قطّعي الفاكهة وضعيها في الطبق واهرسيها: اسحبي الفراولة إلى الطبق.");let st=0;const mash=S.g(plate.inner);
  S.drag(fr,{back:true,targets:()=>st===0?[{g:plate.g,fn:async()=>{fr.style.display="none";for(let i=0;i<8;i++)S.ell(R(-35,35),R(-8,6),9,6,{fill:"#e53935"},mash);
    nextBtn(A,"🥄 اهرسيها جيدًا",async()=>{mash.innerHTML="";S.ell(0,0,45,13,{fill:"#c62828",opacity:.9},mash);for(let i=0;i<20;i++)S.circ(R(-35,35),R(-8,6),1.5,{fill:"#fff59d"},mash);A.step(0);st=1;A.ui.clear();A.say("قيسي 200mL من الماء بالمخبار وضعيها في الكأس 1: اسحبي المخبار.");});}}]:[]});
  const cyl=S.cylinder(220,470,110,{w:34,col:"#bbdefb",lvl:.8,label:"200 mL"});
  S.drag(cyl.g,{back:true,oy:-55,targets:()=>st===1?[{g:bk1.g,fn:async()=>{await S.pour(cyl.g,400,230,-75,()=>Promise.all([cyl.to(0,600),bk1.to(.6,600,"#e3f2fd")]));st=2;A.step(1);A.say("أضيفي ملعقة صغيرة من الملح و2mL من محلول تنظيف الصحون، وحرّكي المزيج: اسحبي الملح ثم المنظّف.");}}]:[]});
  const salt=S.bottle(0,0,"#fafafa","ملح");S.tr(salt,680,470,0,.6);const soap=S.bottle(0,0,"#a5d6a7","منظّف");S.tr(soap,740,470,0,.6);const got={};
  [[salt,"s"],[soap,"d"]].forEach(([b,k])=>S.drag(b,{back:true,oy:-30,targets:()=>st===2&&!got[k]?[{g:bk1.g,fn:async()=>{await S.pour(b,420,230,-70,()=>sleep(300));got[k]=1;if(k==="d")S.bubbles(330,300,90,10,{h:30});if(got.s&&got.d){bk1.set(null,"#dcedc8");A.step(2);st=3;A.say("أضيفي مهروس الفاكهة إلى المزيج وحرّكي: اسحبي الطبق إلى الكأس 1.");}}}]:[]}));
  S.drag(plate.g,{back:true,targets:()=>st===3?[{g:bk1.g,fn:async()=>{mash.innerHTML="";await bk1.to(.7,600,"#ef9a9a");st=4;A.step(3);A.say("ضعي ورقة الترشيح في القمع وثبّتيه فوق الكأس 2، ثم رشّحي المزيج: اسحبي الكأس 1 إلى القمع.");
    const fn=S.g();S.tr(fn,560,240);S.path("M-50 -40 L50 -40 L8 10 L8 40 L-8 40 L-8 10Z",{fill:"rgba(255,255,255,.6)",stroke:"#78909c","stroke-width":3},fn);S.path("M-44 -36 L44 -36 L6 6 L-6 6Z",{fill:"#fafafa"},fn);bk2.fn=fn;}}]:[]});
  S.drag(bk1.g,{back:true,oy:-60,targets:()=>st===4?[{g:bk2.g,fn:async()=>{await S.pour(bk1.g,630,170,-80,()=>Promise.all([bk1.to(.1,900),bk2.to(.45,900,"#f8bbd0")]));st=5;A.step(4);A.say("أضيفي الكحول المبرّد بسكبه برفق على الجدار الداخلي للكأس 2: اسحبي زجاجة الكحول.");}}]:[]});
  const alc=S.bottle(0,0,"#e1f5fe","كحول مبرّد");S.tr(alc,450,470,0,.7);
  S.drag(alc,{back:true,oy:-40,targets:()=>st===5?[{g:bk2.g,fn:async()=>{if(bk2.fn)bk2.fn.remove();await S.pour(alc,630,230,-60,()=>bk2.to(.7,900,"#f8bbd0"));const lay=S.rect(512,260,96,24,{fill:"#e1f5fe",opacity:.9});const dna=S.g();
    for(let i=0;i<14;i++)S.path("M"+(520+i*6)+" 282 q 4 -10 -2 -20 q -5 -8 3 -16",{stroke:"#fff","stroke-width":2.5,fill:"none",opacity:0},dna);await S.tween(1500,t=>dna.querySelectorAll("path").forEach(p=>p.setAttribute("opacity",t)));A.step(5);st=6;
    A.say("افصلي الطبقة البيضاء بالملعقة وضعيها على ورقة ترشيح، ولاحظي قوامها.");nextBtn(A,"🥄 افصلي الخيوط البيضاء",()=>{S.moveTo(dna,dna._x||0,0);S.tween(800,t=>dna.setAttribute("transform","translate("+(-200*t)+" "+(-120*t)+")"));A.obs("ظهرت خيوط بيضاء دقيقة لزجة قرب سطح المحلول؛ هي المادّة الوراثية DNA.");A.step(6);});}}]:[]});
 }});

/* ---------- 2) نمذجة DNA ---------- */
BX.reg("s8-1-1-1",{conclude:"يتكوّن DNA من شريطين ملتفّين حلزونيًّا، تربط بينهما أزواج من القواعد النيتروجينية الأربع (A مع T، وC مع G)، كدرجات السلّم.",
 ans:["لأن القواعد النيتروجينية في DNA أربعة أنواع (A، T، C، G).","لأن القواعد تترابط في أزواج محدّدة دائمًا: الأدينين (A) مع الثايمين (T)، والسايتوسين (C) مع الجوانين (G)."],
 build(S,A){const C={y:"#fdd835",b:"#1e88e5",r:"#e53935",g:"#43a047"};let pairs=[];
  A.say("قصّي من الماصّات قطعًا طولها 6cm، وألصقي كل قطعة صفراء بزرقاء، وكل حمراء بخضراء.");
  const tray=S.g();["y","b","r","g"].forEach((k,i)=>{for(let j=0;j<5;j++)S.rect(80+i*30+j*3,400-j*6,8,60,{rx:3,fill:C[k]},tray);});S.text(140,480,"ماصّات بأربعة ألوان",{"font-size":12});
  const pl=[];[["y","b"],["r","g"]].forEach((pr,i)=>{const g=S.g();S.tr(g,360+i*160,430);S.rect(-60,-8,58,16,{rx:6,fill:C[pr[0]]},g);S.rect(2,-8,58,16,{rx:6,fill:C[pr[1]]},g);S.text(0,30,"اضغطي لتلصقي ("+(i?"أحمر+أخضر":"أصفر+أزرق")+")",{"font-size":11},g);pl.push(g);g.pr=pr;});
  let n=0;pl.forEach(g=>S.tap(g,()=>{if(g.ok)return;g.ok=1;g.querySelector("text").textContent="✔ 10 أنابيب";if(++n===2){A.step(0);rails();}}));
  let rl;function rails(){A.say("افتحي الشريط اللاصق الملوّن مسافة 1m وضعيه على الطاولة، ثم الشريط الثاني على بُعد 10cm.");nextBtn(A,"📏 ضعي الشريطين اللاصقين",async()=>{rl=[S.rect(80,170,640,10,{fill:"#263238"}),S.rect(80,270,640,10,{fill:"#263238"})];A.step(1);A.step(2);A.ui.clear();rungs();});}
  function rungs(){A.say("ألصقي قطع الماصّات بين الشريطين لتكوّني سلّمًا: اسحبي كل زوج إلى مكانه (20 درجة).");pl.forEach(g=>g.remove());let k=0;
    const add=pr=>{if(k>=20)return;const x=95+k*32;const g=S.g();S.rect(x-6,180,12,45,{rx:4,fill:C[pr[0]]},g);S.rect(x-6,225,12,45,{rx:4,fill:C[pr[1]]},g);pairs.push(g);k++;if(k===20){A.step(3);finish();}};
    A.ui.clear();A.ui.add(A.ui.btn("🟨🟦 ألصقي زوج أصفر-أزرق",()=>add(Math.random()<.5?["y","b"]:["b","y"]),"g"),A.ui.btn("🟥🟩 ألصقي زوج أحمر-أخضر",()=>add(Math.random()<.5?["r","g"]:["g","r"]),"g"));}
  function finish(){S.rect(70,160,10,130,{fill:"#ffca28"});S.rect(720,160,10,130,{fill:"#ffca28"});nextBtn(A,"🩹 غطّي الشريط بطبقة لاصقة أخرى",()=>{A.step(4);nextBtn(A,"🌀 لفّي السلّم بالشكل الحلزوني",async()=>{const all=[...rl,...pairs];
    await S.tween(1800,t=>{pairs.forEach((g,i)=>{const ph=i*.55*t;const s=Math.cos(ph);g.setAttribute("transform","translate(0 "+(225*(1-s))*0+") translate("+0+" 225) scale(1 "+(s||.01)+") translate(0 -225)");});rl.forEach((r,j)=>r.setAttribute("opacity",1-t*.85));});
    const pth=(sgn)=>{let d="";for(let i=0;i<=20;i++){const x=95+i*32,y=225-sgn*50*Math.cos(i*.55);d+=(i?"L":"M")+x+" "+y;}return d;};S.path(pth(1),{stroke:"#263238","stroke-width":8,fill:"none"});S.path(pth(-1),{stroke:"#263238","stroke-width":8,fill:"none"});
    A.obs("تكوّن نموذج DNA على شكل سلّم ملتفّ حلزونيًّا، درجاته أزواج القواعد.");A.step(5);});});}
 }});

/* ---------- 3) التكاثر اللاجنسي (حصى البان) ---------- */
BX.reg("s8-1-2-0",{cols:[["d","اليوم"],["o","الملاحظة عند العُقد المغمورة"]],conclude:"تنمو جذور جديدة من العُقد المغمورة في الماء، فينتج نبات جديد مطابق للنبات الأم دون بذور (تكاثر خضري بالعُقل).",
 ans:["إنتاج نباتات كثيرة بسرعة مطابقة للنبات الأم في صفاته المرغوبة، دون الحاجة إلى البذور أو التلقيح، والمحافظة على الأصناف الجيدة."],
 build(S,A){const plant=S.g();S.tr(plant,140,392);S.pot(0,0,{par:plant});const st=S.g(plant);S.path("M0 -60 L0 -260",{stroke:"#558b2f","stroke-width":6},st);for(let i=0;i<10;i++)S.ell((i%2?14:-14),-80-i*18,14,5,{fill:"#7cb342",transform:"rotate("+(i%2?20:-20)+" "+(i%2?14:-14)+" "+(-80-i*18)+")"},st);
  const sc=S.g();S.tr(sc,300,450);S.emo(0,-10,"✂️",34,sc);S.text(0,24,"مقصّ",{"font-size":11},sc);const cut=[];
  A.say("اقطعي أجزاء بطول 5cm من أعلى ساق حصى البان: اسحبي المقصّ إلى أعلى الساق (3 مرّات).");
  S.drag(sc,{back:true,targets:()=>cut.length<3?[{box:[100,120,80,120],pad:10,fn:async()=>{const g=S.g();S.tr(g,260+cut.length*60,300);S.rect(-3,-60,6,60,{fill:"#558b2f"},g);for(let k=0;k<3;k++)S.ell(k%2?10:-10,-50+k*16,10,4,{fill:"#7cb342"},g);cut.push(g);
    if(cut.length===3){A.say("أزيلي الأوراق عن العُقد السفلية: اضغطي على كل جزء.");let r=0;cut.forEach(c=>S.tap(c,()=>{if(c.ok)return;c.ok=1;c.querySelectorAll("ellipse")[2].remove();if(++r===3){A.step(0);glass();}}));}}}]:[]});
  let gl;function glass(){gl=S.beaker(600,392,140,150,{lvl:.6,col:"#e3f2fd",label:"كأس ماء عذب"});S.emo(720,80,"🌤️",40);A.say("ضعي الأجزاء عموديًّا في كأس الماء في مكان مضاء (بعيدًا عن أشعّة الشمس المباشرة): اسحبيها.");let n=0;
    cut.forEach(c=>S.drag(c,{targets:()=>[{g:gl.g,fn:async()=>{c._off=true;await S.moveTo(c,565+n*35,330,250);n++;if(n===3){A.step(1);week();}return "stay";}}],back:true}));}
  function week(){A.say("اتركيها أسبوعًا ولاحظي العُقد المغمورة: حرّكي شريط الأيام.");const roots=S.g();let rec=new Set();
    A.ui.slider("📅 اليوم",0,7,1,0,d=>{roots.innerHTML="";cut.forEach(c=>{for(let k=0;k<Math.max(0,d-2)*2;k++)S.path("M"+(c._x)+" 330 q "+R(-12,12)+" "+(6+d*3)+" "+R(-18,18)+" "+(10+d*5),{stroke:"#f5f5dc","stroke-width":1.6,fill:"none"},roots);});
      [[0,"لا جذور"],[3,"ظهور نتوءات بيضاء صغيرة عند العُقد"],[7,"جذور بيضاء واضحة متفرّعة"]].forEach(([k,o])=>{if(d>=k&&!rec.has(k)){rec.add(k);A.rec({d:k,o});}});if(d===7&&!A.is(2)){A.step(2);A.obs("نمت جذور جديدة من العُقد المغمورة في الماء.");nextBtn(A,"🪴 انقلي النباتات إلى التربة وازرعيها",()=>{A.step(3);});}});}
 }});

/* ---------- 4) استكشاف الكروموسومات في القمم النامية لجذور البصل ---------- */
BX.reg("s8-1-2-1",{cols:[["s","الشريحة"],["o","ما شاهدتُه"]],conclude:"تظهر الكروموسومات واضحة في خلايا القمم النامية للجذور لأن الخلايا فيها تنقسم انقسامًا متساويًا نشطًا، ويُظهر الصبغ أطوار الانقسام المختلفة.",
 ans:["(تُقارن الطالبة بين توقّعها ونتائجها).","(حسب الفرضية: تظهر الكروموسومات في خلايا القمم النامية).","(تفسير التوافق أو الاختلاف).","الطور التمهيدي، والاستوائي، والانفصالي، والنهائي (والطور البيني أكثرها).","حمض HCl يفصل الخلايا عن بعضها ويليّن الأنسجة لسهولة هرسها، وصبغة أسيتوكارمن تصبغ الكروموسومات فتظهر واضحة."],
 build(S,A){quiz(A,[["صوغي فرضيّتك:",[["h","يمكن مشاهدة الكروموسومات في خلايا القمم النامية لجذور البصل بعد صبغها"],["n","لا تظهر الكروموسومات أبدًا في الخلايا الحيّة"]],"h"]],()=>go());
  function go(){const on=S.g();S.tr(on,90,380);S.ell(0,-40,50,44,{fill:S.rg(["#f3e5f5","#ce93d8"])},on);for(let i=0;i<9;i++)S.path("M"+(-30+i*7)+" 0 q "+R(-6,6)+" 30 "+R(-8,8)+" 50",{stroke:"#fffde7","stroke-width":3,fill:"none"},on);S.text(0,70,"بصلة بجذور نامية",{"font-size":11},on);
   const tb=S.tube(260,440,120,{w:36,lvl:.3,col:"#fff9c4",label:"HCl"});const bath=S.beaker(420,392,130,110,{lvl:.6,col:"#ffccbc",label:"حمّام مائي"});const pd=S.dish(600,330,60,{label:"أسيتوكارمن",fill:"#f48fb1"});const W=S.watch(720,120);const th=S.label(420,240,"",null,"#c62828");th.style.display="none";
   let st=0;A.say("اقطعي الجذور النامية (2mm) بالمشرط وضعيها في أنبوب الاختبار مع HCl: اسحبي البصلة إلى الأنبوب.");
   S.drag(on,{back:true,targets:()=>st===0?[{g:tb.g,fn:async()=>{S.rect(-6,-30,12,8,{fill:"#fffde7"},tb.inner);for(let s=0;s<=600;s+=40){W.set(s/60,1);W.set(s);await sleep(25);}A.toast("مرّت 10 min");A.step(0);st=1;A.say("سخّني الأنبوب في الحمّام المائي حتى 60°C: اسحبي الأنبوب.");}}]:[]});
   S.drag(tb.g,{back:true,targets:()=>st===1?[{g:bath.g,fn:async()=>{th.style.display="";for(let t=25;t<=60;t+=5){th.set(t+" °C");await sleep(80);}A.step(1);st=2;A.say("انقلي الجذور بالملقط إلى طبق صبغة أسيتوكارمن واتركيها 10 min: اسحبي الأنبوب إلى الطبق.");}}]:st===2?[{g:pd.g,fn:async()=>{S.rect(-10,-4,20,6,{fill:"#880e4f"},pd.inner);for(let s=0;s<=600;s+=40){W.set(s);await sleep(25);}A.step(2);st=3;A.say("اغمري الطبق بالماء المقطّر لإزالة الصبغة الزائدة.");nextBtn(A,"💧 اغمريه بالماء المقطّر",()=>{A.step(3);st=4;slide();});}}]:[]});
   function slide(){const sl=S.g();S.tr(sl,300,250);S.rect(-60,-12,120,24,{fill:"#e1f5fe",stroke:"#81d4fa","stroke-width":2},sl);A.say("ضعي بعض الجذور على شريحة مع قطرة ماء، وغطّيها: اسحبي الطبق إلى الشريحة.");
     S.drag(pd.g,{back:true,targets:()=>st===4?[{g:sl,fn:async()=>{S.rect(-12,-4,24,8,{fill:"#880e4f"},sl);S.rect(-22,-10,44,20,{fill:"#e1f5fe",opacity:.6,stroke:"#4fc3f7"},sl);A.step(4);st=5;A.say("ضعي ورقة ترشيح على الغطاء واضغطي بلطف لهرس الجذور.");nextBtn(A,"👍 اضغطي بلطف (هرس)",()=>{sl.querySelectorAll("rect")[1].setAttribute("width",40);sl.querySelectorAll("rect")[1].setAttribute("x",-20);A.step(5);micro(sl);});}}]:[]});}
   function micro(sl){S.clear();S.room();const v=S.g();S.tr(v,250,230);S.circ(0,0,150,{fill:"#111"},v);const cells=S.g(v);cells.setAttribute("clip-path",S.clip(S.mk("circle",{r:140})));const lab=S.label(0,168,"",v,"#263238");
     const ph=["بيني","تمهيدي","استوائي","انفصالي","نهائي"];let which=0,obj=4;const seen={};
     const draw=()=>{cells.innerHTML="";S.circ(0,0,140,{fill:"#fce4ec"},cells);const w=26*Math.sqrt(obj)*.8,hh=w*.8;let k=0;for(let r=-6;r<=6;r++)for(let c=-6;c<=6;c++){const x=c*w,y=r*hh;if(Math.hypot(x,y)>160)continue;S.rect(x-w/2,y-hh/2,w-1.5,hh-1.5,{fill:"#f8bbd0",stroke:"#ad1457","stroke-width":1},cells);
       const p=(k*7+r*3+c*5+which)%9;k++;const s=w*.18;if(p<4)S.circ(x,y,s*1.4,{fill:"#880e4f",opacity:.8},cells);else if(p===4){for(let q=0;q<5;q++)S.path("M"+(x-s+q*s*.5)+" "+(y-s)+" q 3 "+s+" -2 "+s*2,{stroke:"#4a0029","stroke-width":2,fill:"none"},cells);}else if(p===5){S.line(x,y-hh*.35,x,y+hh*.35,{stroke:"#4a0029","stroke-width":4},cells);}else if(p===6){S.line(x-w*.3,y-hh*.3,x-w*.3,y+hh*.3,{stroke:"#4a0029","stroke-width":3},cells);S.line(x+w*.3,y-hh*.3,x+w*.3,y+hh*.3,{stroke:"#4a0029","stroke-width":3},cells);}else{S.circ(x-w*.25,y,s,{fill:"#880e4f"},cells);S.circ(x+w*.25,y,s,{fill:"#880e4f"},cells);S.line(x,y-hh/2,x,y+hh/2,{stroke:"#ad1457"},cells);}}
       lab.set((which?"الشريحة الجاهزة":"الشريحة التي أعددتُها")+" · ×"+obj*10);if(obj>=40)seen[which]=1;};
     A.ui.clear();A.ui.choice("العدسة الشيئية",[[4,"×4"],[10,"×10"],[40,"×40"]],v=>{obj=v;draw();if(seen[0]&&!A.is(6)){A.step(6);A.obs("شريحتي: خلايا مربّعة، بعضها فيه كروموسومات مصبوغة بأطوار انقسام مختلفة.");A.say("افحصي الشريحة الجاهزة: اضغطي «الشريحة الجاهزة».");}if(seen[1]&&!A.is(7)){A.step(7);compare();}},4);
     A.ui.add(A.ui.btn("🔁 الشريحة الجاهزة",b=>{which=1;obj=4;draw();b.disabled=true;},"g"));A.say("افحصي شريحتك بالمجهر، وابدئي بالعدسة الصغرى ثم الكبرى ×40.");draw();
     function compare(){pickMany(A,"أيّ أطوار الانقسام المتساوي شاهدتِ؟",ph.map(p=>"الطور "+p),ph.map(p=>"الطور "+p),()=>{A.rec({s:"الشريحة التي أعددتُها",o:"كروموسومات مصبوغة، أطوار مختلفة، الخلايا أقل وضوحًا"});A.rec({s:"الشريحة الجاهزة",o:"أطوار الانقسام واضحة جدًّا ومنتظمة"});A.step(8);});}}}
 }});

/* ---------- 5) بصمة DNA ---------- */
BX.reg("s8-1-3-0",{conclude:"بصمة DNA نمط من الحزم يختلف من شخص لآخر (عدا التوائم المتماثلة)، ويرث الطفل نصف حزمه من الأم ونصفها من الأب.",
 ans:["نمط خاص من تتابع النيوكليوتيدات في جزء محدّد من DNA يميّز كل فرد عن غيره.","لأن ترتيب النيوكليوتيدات في DNA يختلف من شخص لآخر.","القضايا الجنائية والتعرّف إلى المجرمين، وإثبات النسب، والتعرّف إلى ضحايا الكوارث."],
 build(S,A){const lanes=[["الأم",[1,3,6,8,11]],["الطفل",[1,4,6,9,11]],["الأب 1",[2,4,5,9,12]],["الأب 2",[2,5,7,10,12]]];
  const gel=S.g();S.rect(150,60,500,330,{rx:8,fill:"#0d47a1",opacity:.85},gel);const bands=S.g(gel);
  lanes.forEach((l,i)=>{S.text(230+i*115,85,l[0],{"font-size":14,fill:"#fff"},gel);S.rect(205+i*115,95,50,8,{fill:"#90caf9"},gel);});
  A.say("ابحثي عن ماهيّة بصمة DNA: شغّلي جهاز الفصل الكهربائي لعيّنات الأم والطفل والأبوين المحتملين.");
  nextBtn(A,"⚡ شغّلي الفصل الكهربائي",async()=>{await S.tween(1600,t=>{bands.innerHTML="";lanes.forEach((l,i)=>l[1].forEach(b=>S.rect(207+i*115,110+b*22*t,46,7,{rx:3,fill:"#e3f2fd",opacity:.9},bands)));});A.step(0);
    quiz(A,[["قارني حزم الطفل بحزم الأم والأبوين: مَن الأب البيولوجي للطفل؟",[["1","الأب 1"],["2","الأب 2"]],"1","كل حزمة عند الطفل لا توجد عند الأم يجب أن توجد عند الأب"],["من أين يمكن الحصول على عيّنة DNA؟",[["a","الدم، الشعر بجذوره، اللعاب، الجلد"],["b","الأظافر المقصوصة فقط"]],"a"]],()=>{A.step(1);A.obs("حزم الطفل نصفها من الأم (1، 6، 11) ونصفها من الأب 1 (4، 9).");nextBtn(A,"📢 اعرضي ما توصّلتِ إليه",()=>A.step(2));});});
 }});

/* ---------- 6) كيف نعرف ماذا يوجد داخل الأشياء؟ ---------- */
const BOXS=[["أقلام","✏️",[["s","صوت خشبي متدحرج"],["w","خفيف"]]],["كرات زجاجية","🔮",[["s","صوت رنّان متدحرج"],["w","ثقيل"]]],["مكعّبات خشبية","🧱",[["s","صوت طقطقة"],["w","متوسّط"]]],["محايات","🧽",[["s","صوت مكتوم"],["w","خفيف جدًّا"]]],["قطع ألعاب تركيب","🧩",[["s","خشخشة كثيرة"],["w","خفيف"]]]];
BX.reg("s8-2-1-0",{cols:[["n","رقم الصندوق"],["g","توقّعاتنا (المحتويات)"],["r","المحتويات فعلًا"]],
 conclude:"يمكن استنتاج ما بداخل الأشياء المغلقة بطرق غير مباشرة (الصوت والحركة والوزن)، كما استنتج العلماء تركيب الذرّة دون رؤيتها.",
 ans:["كما توقّعنا محتوى الصناديق دون رؤيته من خلال الأدلة غير المباشرة، استنتج العلماء مكوّنات الذرّة من نتائج تجارب غير مباشرة (مثل أنابيب التفريغ وتجربة رذرفورد) لأنهم لا يستطيعون رؤيتها."],
 build(S,A){const bx=BOXS.map((b,i)=>{const g=S.g();S.tr(g,120+i*140,200);S.rect(-45,-40,90,80,{rx:6,fill:["#e57373","#64b5f6","#81c784","#ffb74d","#ba68c8"][i]},g);S.rect(-4,-40,8,80,{fill:"#fff59d"},g);S.rect(-45,-4,90,8,{fill:"#fff59d"},g);S.text(0,62,"صندوق "+(i+1),{"font-size":13},g);g.i=i;return g;});
  const desk=S.g();S.rect(250,330,300,40,{rx:6,fill:"#a1887f"},desk);S.text(400,355,"طاولة مجموعتنا",{"font-size":13,fill:"#fff"},desk);let cur=null,done=0;const guess={};
  A.say("اختاري أحد الصناديق من طاولة المعلّمة وعودي به إلى طاولتك: اسحبي صندوقًا.");
  bx.forEach(g=>S.drag(g,{back:true,targets:()=>!cur&&!guess[g.i]?[{g:desk,pad:20,fn:async()=>{cur=g;await S.moveTo(g,400,300,250);if(!done)A.step(0);shake(g);return "stay";}}]:[]}));
  function shake(g){const b=BOXS[g.i];A.say("هزّي الصندوق وحرّكيه واسمعي الصوت؛ لتحديد ما بداخله.");A.ui.clear();
    A.ui.add(A.ui.btn("🔊 هزّي الصندوق",async()=>{for(let k=0;k<6;k++){S.tr(g,400+(k%2?8:-8),300,k%2?6:-6);await sleep(70);}S.tr(g,400,300);A.toast("🔊 "+b[2][0][1]+" — الوزن: "+b[2][1][1]);if(!done)A.step(1);
      const opts=BOXS.map(x=>[x[0],x[1]+" "+x[0]]);A.ui.clear();A.ui.choice("توقّعي ما بداخله:",opts,v=>{guess[g.i]=v;A.toast("دُوّن توقّعكِ في جدول البيانات");if(!done)A.step(2);A.ui.clear();A.say("أعيدي الصندوق إلى طاولة المعلّمة: اضغطي «أعيدي».");
        A.ui.add(A.ui.btn("↩️ أعيدي الصندوق واختاري آخر",async()=>{await S.moveTo(g,120+g.i*140,200,250);cur=null;done++;if(done===1)A.step(3);if(done===5){A.step(4);open();}else{A.ui.clear();A.say("اختاري صندوقًا آخر ("+done+"/5).");}},"gold"));});},"gold"));}
  function open(){A.say("افتحي الصناديق لمعرفة ما بداخلها فعلًا.");nextBtn(A,"📦 افتحي الصناديق",async()=>{bx.forEach((g,i)=>{g.querySelectorAll("rect")[1].remove();g.querySelectorAll("rect")[1].remove();S.emo(0,0,BOXS[i][1],36,g);A.rec({n:i+1,g:guess[i],r:BOXS[i][0]});});A.step(5);
    const ok=bx.filter((g,i)=>guess[i]===BOXS[i][0]).length;A.obs("أصابت توقّعاتنا "+ok+" من 5 صناديق.");nextBtn(A,"📢 اعرضي النتائج على المجموعات",()=>{A.step(6);A.obs("مجموعة أخرى: أخطأت في التمييز بين المحايات وقطع التركيب.");nextBtn(A,"🔍 قارني الجداول ولاحظي الاختلاف",()=>{A.step(7);A.step(8);nextBtn(A,"💬 شاركي المجموعات ما توصّلتِ إليه",()=>A.step(9));});});});}
 }});

/* ---------- 7) صنع نموذج للذرّة ---------- */
const EL2=[["Li","ليثيوم",3,4],["Be","بيريليوم",4,5],["B","بورون",5,6],["C","كربون",6,6],["N","نيتروجين",7,7],["O","أكسجين",8,8]];
BX.reg("s8-2-1-1",{conclude:"تتكوّن الذرّة من نواة تحوي بروتونات موجبة ونيوترونات متعادلة، وتدور حولها إلكترونات سالبة في مستويات طاقة؛ وعدد الإلكترونات يساوي عدد البروتونات في الذرّة المتعادلة.",
 ans:["(حسب العنصر) مثل الكربون: 6 بروتونات و6 نيوترونات.","لأنه يمثّل النواة فقط، ولا يحوي الإلكترونات.","نموذج بور (النموذج الذرّي)، ويمثّل العنصر المكتوب على البطاقة.","عدد الإلكترونات = عدد البروتونات، وقد يساوي عدد النيوترونات أو يختلف عنه.","نموذج الخطوة 3 نواة فقط، أما نموذج الخطوة 5 فذرّة كاملة بإلكتروناتها في مستويات الطاقة."],
 build(S,A){let E=null;A.say("اختاري إحدى البطاقات لأحد العناصر، وحدّدي عدد بروتوناته ونيوتروناته وإلكتروناته.");
  A.ui.choice("البطاقة:",EL2.map((e,i)=>[i,e[0]]),i=>{E=EL2[i];A.ui.clear();A.toast(E[1]+": "+E[2]+" بروتونات، "+E[3]+" نيوترونات، "+E[2]+" إلكترونات");A.obs("البطاقة: "+E[0]+" ("+E[1]+") — p="+E[2]+"، n="+E[3]+"، e="+E[2]);A.step(0);kit();});
  const cx=400,cy=210;let nuc=S.g();const NP=[];
  function kit(){A.say("احصلي على الكرات الحمراء والزرقاء والخضراء والصمغ والعيدان وقاعدة الفلين.");nextBtn(A,"🧺 احصلي على المواد",()=>{A.step(1);
    const cups=[["p","#e53935","بروتونات (حمراء)",100],["n","#1e88e5","نيوترونات (زرقاء)",220],["e","#43a047","إلكترونات (خضراء)",640]];cups.forEach(([k,c,t,x])=>{const g=S.g();S.tr(g,x,450);S.path("M-40 -30 L40 -30 L30 10 L-30 10Z",{fill:"#d7ccc8"},g);for(let i=0;i<6;i++)S.circ(R(-26,26),-30+R(-6,2),k==="e"?6:8,{fill:c},g);S.text(0,30,t,{"font-size":11},g);g.k=k;cups[k]=g;});
    A.say("ألصقي البروتونات والنيوترونات معًا بالصمغ لتكوين النواة: اسحبي من الكوبين الأحمر والأزرق إلى المركز.");let p=0,n=0;
    ["p","n"].forEach(k=>S.drag(cups[k],{back:true,targets:()=>[{box:[cx-60,cy-60,120,120],pad:10,fn:()=>{if(k==="p"&&p>=E[2]){A.toast("اكتمل عدد البروتونات ("+E[2]+")");return false;}if(k==="n"&&n>=E[3]){A.toast("اكتمل عدد النيوترونات ("+E[3]+")");return false;}
      const t=p+n;const a=t*2.4,r=5*Math.sqrt(t);S.circ(cx+Math.cos(a)*r,cy+Math.sin(a)*r,9,{fill:k==="p"?"#e53935":"#1e88e5",stroke:"#fff"},nuc);if(k==="p"){S.text(cx+Math.cos(a)*r,cy+Math.sin(a)*r+4,"+",{"font-size":11,fill:"#fff"},nuc);p++;}else n++;
      if(p===E[2]&&n===E[3]){A.step(2);A.obs("صُنعت النواة: "+p+" بروتونات و"+n+" نيوترونات.");sticks(cups);}return false;}}]}));});}
  function sticks(cups){A.say("اغرسي كل كرة خضراء في طرف عود شواء: اضغطي الزرّ.");nextBtn(A,"🍡 اغرسي الكرات الخضراء في العيدان",()=>{A.step(3);
    A.say("اغرسي العيدان حول النواة على شكل دائري بأبعاد تحاكي مستويات الطاقة: اسحبي من الكوب الأخضر إلى حول النواة.");const R1=90,R2=150;S.circ(cx,cy,R1,{fill:"none",stroke:"#9e9e9e","stroke-dasharray":"4 4"});S.circ(cx,cy,R2,{fill:"none",stroke:"#9e9e9e","stroke-dasharray":"4 4"});let e=0;
    S.drag(cups.e,{back:true,targets:()=>[{box:[cx-170,cy-170,340,340],pad:0,fn:()=>{if(e>=E[2]){A.toast("اكتمل عدد الإلكترونات");return false;}const sh=e<2?0:1,i=sh?e-2:e,nn=sh?E[2]-2:2,rr=sh?R2:R1,a=i/nn*Math.PI*2-Math.PI/2;const x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr;S.line(cx,cy,x,y,{stroke:"#bcaaa4","stroke-width":2});nuc.parentNode.append(nuc);S.circ(x,y,8,{fill:"#43a047",stroke:"#fff"});e++;
      if(e===E[2]){A.step(4);A.obs("اكتمل النموذج: "+E[2]+" إلكترونات موزّعة "+Math.min(2,E[2])+"، "+Math.max(0,E[2]-2)+" على مستويي الطاقة.");nextBtn(A,"📌 ثبّتي النموذج على قاعدة الفلين",()=>{S.rect(cx-6,cy+160,12,60,{fill:"#a1887f"});S.rect(cx-60,cy+220,120,14,{fill:"#d7ccc8"});A.step(5);nextBtn(A,"🏷️ ضعي عنوانًا: نموذج ذرّة "+E[1],()=>A.step(6));});}return false;}}]});});}
 }});

/* ---------- 8) تحديد العناصر ومواقعها في الجدول الدوري ---------- */
const UNK=[["A",7,"N","نيتروجين"],["X",11,"Na","صوديوم"],["Y",18,"Ar","آرجون"],["Z",3,"Li","ليثيوم"]];
const conf=z=>{const a=[];let r=z;for(const c of [2,8,8,2]){if(r<=0)break;a.push(Math.min(c,r));r-=c;}return a;};
const grp=z=>{const c=conf(z),v=c[c.length-1];return v===8||(z===2)?18:v<=2?v:v+10;};
function atomDraw(S,par,x,y,z,sc){const g=S.g(par);S.tr(g,x,y);const c=conf(z);S.circ(0,0,12*sc,{fill:"#c62828"},g);S.text(0,4*sc,String(z)+"p",{"font-size":9*sc,fill:"#fff"},g);c.forEach((n,k)=>{const r=(24+k*16)*sc;S.circ(0,0,r,{fill:"none",stroke:"#78909c"},g);for(let i=0;i<n;i++){const a=i/n*Math.PI*2;S.circ(Math.cos(a)*r,Math.sin(a)*r,3.5*sc,{fill:"#1565c0"},g);}});return g;}
BX.reg("s8-2-2-0",{cols:[["el","العنصر"],["s","رمزه"],["z","عدده الذرّي"],["c","التوزيع الإلكتروني"],["l","عدد مستويات الطاقة"],["p","الدورة"],["v","إلكترونات التكافؤ"],["g","المجموعة"]],
 conclude:"رقم الدورة = عدد مستويات الطاقة المشغولة، ورقم المجموعة يُحدَّد من عدد إلكترونات التكافؤ؛ وبذلك نحدّد موقع العنصر وهويّته.",
 ans:["X (Na) وY (Ar) في الدورة الثالثة، وA (N) وZ (Li) في الدورة الثانية.","لا يوجد عنصران في المجموعة نفسها هنا (Z في 1، وX في 1 أيضًا! — Li وNa كلاهما في المجموعة 1).","لأن مستوى طاقته الخارجي ممتلئ بثمانية إلكترونات (غاز نبيل).","يختلفان؛ فـ Z (Li) فلزّ نشط له إلكترون تكافؤ واحد، وY (Ar) غاز نبيل خامل مستواه الخارجي ممتلئ."],
 build(S,A){A.say("أنشئي جدولًا من 5 صفوف و8 أعمدة، واتركي عمود العنصر فارغًا.");nextBtn(A,"📋 أنشئي الجدول",()=>{A.step(0);go(0);});
  const area=S.g();function go(i){if(i>=4){A.step(1);A.step(2);quiz(A,[["أيّ العناصر يقع في الدورة نفسها؟",[["a","X و Y (الدورة 3)، A و Z (الدورة 2)"],["b","A و Y"]],"a"],["أيّ العنصرين في المجموعة نفسها؟",[["a","X و Z (المجموعة 1)"],["b","A و Y"]],"a"]],()=>name());return;}
    const [s,z]=UNK[i];area.innerHTML="";S.text(400,40,"العنصر "+s+" — العدد الذرّي "+z,{"font-size":18,fill:"#5C1622"},area);const c=conf(z);
    A.say("ارسمي التوزيع الإلكتروني للعنصر "+s+": اضغطي «ارسمي التوزيع».");A.ui.clear();A.ui.add(A.ui.btn("✏️ ارسمي التوزيع الإلكتروني",async()=>{atomDraw(S,area,400,230,z,1.6);A.ui.clear();
      quiz(A,[["التوزيع الإلكتروني لـ "+s+":",[[c.join("،"),c.join("، ")],[[2,z-2].join("،"),"2، "+(z-2)],[[1,z-1].join("،"),"1، "+(z-1)]].filter((v,j,a)=>a.findIndex(x=>x[0]===v[0])===j),c.join("،")],["الدورة (عدد مستويات الطاقة):",[[c.length,String(c.length)],[c.length+1,String(c.length+1)]],c.length],["المجموعة:",[[grp(z),String(grp(z))],[c[c.length-1],String(c[c.length-1])+(grp(z)===c[c.length-1]?" ":"")+(grp(z)===c[c.length-1]?"(أخرى)":"")],[1+c.length,String(1+c.length)]].filter((v,j,a)=>a.findIndex(x=>String(x[0])===String(v[0]))===j),grp(z)]],
        ()=>{UNK[i].row={el:"؟",s,z,c:c.join("، "),l:c.length,p:c.length,v:c[c.length-1],g:grp(z)};A.rec(UNK[i].row);go(i+1);});},"gold"));}
  function name(){A.say("استعيني بالجدول الدوري واملئي عمود أسماء العناصر.");nextBtn(A,"🔎 استعيني بالجدول الدوري",()=>{A.setRows(UNK.map(u=>Object.assign({},u.row,{el:u[3],s:u[2]+" ("+u[0]+")"})));A.obs("A = N نيتروجين، X = Na صوديوم، Y = Ar آرجون، Z = Li ليثيوم.");A.step(3);});}
 }});

/* ---------- 9) معرفة هويّة العنصر ---------- */
const CARDS=[["Q",12],["M",16],["T",9],["R",13],["G",10],["K",19]];
const NAMES={9:["F","فلور"],10:["Ne","نيون"],12:["Mg","مغنيسيوم"],13:["Al","ألمنيوم"],16:["S","كبريت"],19:["K","بوتاسيوم"]};
BX.reg("s8-2-2-1",{cols:[["el","العنصر"],["s","رمزه"],["z","عدده الذرّي"],["c","التوزيع الإلكتروني"],["l","عدد مستويات الطاقة"],["p","الدورة"],["v","إلكترونات التكافؤ"],["g","المجموعة"]],
 conclude:"من صورة التوزيع الإلكتروني نعرف العدد الذرّي (مجموع الإلكترونات)، والدورة (عدد المستويات)، والمجموعة (إلكترونات التكافؤ)، فنحدّد هويّة العنصر من الجدول الدوري.",
 ans:["بجمع الإلكترونات في المستويات جميعها (= العدد الذرّي).","هي إلكترونات المستوى الخارجي في الصورة.","= عدد مستويات الطاقة.","من عدد إلكترونات التكافؤ (1 و2 → المجموعة نفسها، 3–8 → المجموعة 13–18).","من العدد الذرّي وموقعه (الدورة والمجموعة) في الجدول الدوري."],
 build(S,A){quiz(A,[["صوغي فرضيّتك:",[["h","يمكن تحديد هويّة العنصر وموقعه من صورة توزيعه الإلكتروني فقط"],["n","لا يمكن ذلك"]],"h"]],()=>{A.say("احصلي على بطاقة: اختاري بطاقة عنصر.");pick();});
  let n=0;const area=S.g();function pick(){A.ui.clear();A.ui.choice("بطاقة العنصر:",CARDS.filter(c=>!c.done).map(c=>[c[0],"🃏 "+c[0]]),k=>{const C=CARDS.find(c=>c[0]===k);C.done=1;card(C);});}
  function card(C){const [s,z]=C;const c=conf(z);area.innerHTML="";S.rect(240,40,320,330,{rx:16,fill:"#fff",stroke:"#B8902A","stroke-width":3},area);S.text(400,70,"البطاقة: "+s,{"font-size":16},area);const ag=atomDraw(S,area,400,220,z,1.5);ag.querySelector("text").textContent="?";
    if(!n)A.step(0);if(!n)A.step(1);
    quiz(A,[["عُدّي الإلكترونات جميعها: العدد الذرّي =",[[z,String(z)],[z+1,String(z+1)],[z-2,String(z-2)]].sort(()=>Math.random()-.5),z],["الدورة:",[[c.length,String(c.length)],[c.length-1,String(c.length-1)]],c.length],["المجموعة:",[[grp(z),String(grp(z))],[c[c.length-1]===grp(z)?grp(z)+10:c[c.length-1],String(c[c.length-1]===grp(z)?grp(z)+10:c[c.length-1])]],grp(z)],
      ["هويّة العنصر من الجدول الدوري:",[[NAMES[z][0],NAMES[z][1]+" "+NAMES[z][0]],...Object.entries(NAMES).filter(([k])=>+k!==z).slice(0,2).map(([k,v])=>[v[0],v[1]+" "+v[0]])].sort(()=>Math.random()-.5),NAMES[z][0]]],
      ()=>{A.rec({el:NAMES[z][1],s:NAMES[z][0]+" ("+s+")",z,c:c.join("، "),l:c.length,p:c.length,v:c[c.length-1],g:grp(z)});if(!n){A.step(2);A.step(3);A.step(4);}n++;if(n>=2&&!A.is(5)){A.step(5);}A.say(n>=2?"أحسنتِ! يمكنكِ تحديد عنصر آخر.":"كرّري الخطوات لعنصر آخر.");if(CARDS.some(c=>!c.done))pick();});}
 }});

/* ---------- 10) نموذج الغوّاص ---------- */
BX.reg("s8-3-1-0",{cols:[["a","العملية"],["o","حركة الغوّاص"]],conclude:"عند الضغط على القارورة ينتقل الضغط عبر الماء فيدخل ماء أكثر إلى الماصّة ويُضغط الهواء فيها، فتزداد كثافة الغوّاص ويهبط؛ وعند الإفلات يتمدّد الهواء ويطفو.",
 ans:["عند الضغط على القارورة يقلّ حجم الهواء في الغوّاص فيقلّ حجم الماء المُزاح، فتقلّ قوّة الطفو المؤثّرة فيه فيغوص؛ وعند الإفلات تزداد قوّة الطفو فيرتفع."],
 build(S,A){const dv=S.g();const mk=(par)=>{const g=S.g(par);S.rect(-6,-18,12,30,{rx:5,fill:"rgba(255,255,255,.6)",stroke:"#e53935","stroke-width":2},g);g.air=S.rect(-4,-16,8,16,{fill:"#e3f2fd"},g);S.path("M-8 8 l 0 14 q 8 8 16 0 l 0 -14",{stroke:"#78909c","stroke-width":3,fill:"none"},g);return g;};
  const straw=S.g();S.tr(straw,120,440);S.rect(-5,-70,10,70,{fill:"#ef5350"},straw);S.text(0,20,"ماصّة ومشبك",{"font-size":11},straw);
  A.say("اعملي نموذجًا: اثني الماصّة واقصّي الأطراف (2cm)، وثبّتي مشبك الورق عليها.");nextBtn(A,"✂️ اصنعي «الغوّاص»",()=>{straw.innerHTML="";const d=mk(straw);S.text(0,40,"الغوّاص",{"font-size":11},straw);A.step(0);cup();});
  function cup(){const c=S.beaker(280,392,90,100,{lvl:.8,col:"#bbdefb",label:"كأس ماء"});A.say("اختبري النموذج في كأس الماء للتأكّد أنه يطفو: اسحبيه إلى الكأس.");
    S.drag(straw,{back:true,targets:()=>[{g:c.g,fn:async()=>{await S.moveTo(straw,280,325,300);A.toast("يطفو، وطرفه العلوي ملامس لسطح الماء ✔");A.step(1);await sleep(600);bottle();return false;}}]});}
  let B,div,y=0;function bottle(){const g=S.g();S.tr(g,560,392);S.path("M-60 0 L-60 -250 Q-60 -280 -30 -290 L-20 -320 L20 -320 L30 -290 Q60 -280 60 -250 L60 0Z",{fill:"rgba(187,222,251,.55)",stroke:"#78909c","stroke-width":3},g);B=g;
    A.say("املئي القارورة بالماء تمامًا وضعي فيها الغوّاص، ثم أغلقيها: اسحبي الغوّاص إلى القارورة.");
    S.drag(straw,{back:true,targets:()=>[{g:B,fn:async()=>{straw.style.display="none";div=mk(B);S.tr(div,0,-280);S.rect(-22,-332,44,14,{fill:"#1565c0"},B);A.step(2);press();return false;}}]});}
  function press(){let p=0,cnt=0,lastDown=false;A.say("اضغطي على جانبي القارورة (حرّكي شريط الضغط) وراقبي حركة الغوّاص.");
    const hand=S.g();S.emo(470,-0,"",1,hand);
    A.ui.slider("✋ الضغط على جانبي القارورة",0,100,1,0,v=>{p=v;});
    const loop=()=>{const target=p>55?-30:-280+0*(p/55)*20;y=lerp(y||-280,p>55?-30:-280,.04);S.tr(div,0,y);div.air.setAttribute("height",16-p*.08);div.air.setAttribute("y",-16+p*.08);B.querySelector("path").setAttribute("d",(()=>{const k=p/100*8;return "M"+(-60+k)+" 0 L"+(-60+k)+" -250 Q-60 -280 -30 -290 L-20 -320 L20 -320 L30 -290 Q60 -280 "+(60-k)+" -250 L"+(60-k)+" 0Z";})());
      const down=y>-80;if(down&&!lastDown){cnt++;if(cnt===1){A.step(3);A.rec({a:"الضغط على القارورة",o:"يهبط الغوّاص إلى القاع، ويدخل ماء أكثر إلى الماصّة"});}}if(!down&&lastDown&&y<-250){if(!A.is(4)){A.step(4);A.rec({a:"إبعاد اليدين",o:"يرتفع الغوّاص ويطفو من جديد"});}else if(cnt>=3&&!A.is(5)){A.step(5);A.rec({a:"تكرار الضغط والإفلات",o:"يهبط ويصعد مع كل ضغط وإفلات"});}}
      if(y<-250||y>-80)lastDown=down;requestAnimationFrame(loop);};requestAnimationFrame(loop);}
 }});

/* ---------- 11) ضغط السائل والعمق ---------- */
BX.reg("s8-3-1-1",{cols:[["h","الثقب"],["d","المسافة التي يصل إليها الماء (cm)"]],chart:{x:"h",y:"d",type:"bar",xl:"الثقب",yl:"المسافة (cm)"},conclude:"يزداد ضغط السائل بزيادة العمق؛ فيندفع الماء من الثقب السفلي بسرعة أكبر ويصل إلى مسافة أبعد.",
 ans:["كلما زاد عمق الثقب عن سطح الماء زاد ضغط الماء عنده، فيندفع منه الماء بسرعة أكبر ويصل إلى مسافة أبعد؛ فالضغط يزداد بزيادة العمق."],
 build(S,A){const bx=260,by=392;const tub=S.rect(150,330,560,62,{fill:"#90a4ae",opacity:.6});S.text(430,385,"وعاء بلاستيكي عميق",{"font-size":12});
  const bt=S.g();S.tr(bt,bx,by-10);S.path("M-50 0 L-50 -250 Q-50 -280 -25 -290 L-15 -315 L15 -315 L25 -290 Q50 -280 50 -250 L50 0Z",{fill:"rgba(227,242,253,.6)",stroke:"#78909c","stroke-width":3},bt);const w=S.rect(-46,0,92,0,{fill:"#64b5f6",opacity:.75},bt);
  const holes=[-210,-140,-60].map((y,i)=>{const t=S.rect(44,y-8,20,16,{fill:"#fff176",stroke:"#f9a825"},bt);S.circ(50,y,4,{fill:"#263238"},bt);return {y,t};});
  A.say("غطّي الثقوب بالشريط اللاصق واملئي القارورة بالماء.");nextBtn(A,"💧 املئي القارورة",async()=>{await S.tween(800,t=>{w.setAttribute("y",-270*t);w.setAttribute("height",270*t);});A.step(0);A.say("ضعي القارورة في الوعاء البلاستيكي: اسحبيها.");
    S.drag(bt,{back:false,targets:()=>[{box:[150,300,560,92],pad:30,fn:async()=>{await S.moveTo(bt,220,by-10,300);bt._off=true;A.step(1);A.say("انزعي الشريط اللاصق بسرعة، ولاحظي اندفاع الماء.");nextBtn(A,"⚡ انزعي الشريط اللاصق",run);return "stay";}}]});});
  async function run(){holes.forEach(h=>h.t.remove());A.step(2);const D=[62,118,168];const jets=S.g();
    await S.tween(1500,t=>{jets.innerHTML="";holes.forEach((h,i)=>{const x0=bt._x+50,y0=bt._y+h.y,vx=D[i]*1.6,H=by-y0;let d="M"+x0+" "+y0;for(let k=1;k<=12;k++){const u=k/12*t;d+=" L"+(x0+vx*u)+" "+(y0+H*u*u);}S.path(d,{stroke:"#1e88e5","stroke-width":5,fill:"none",opacity:.8},jets);});});
    holes.forEach((h,i)=>S.label(bt._x+50+D[i]*1.6,by+22-i*0,["علوي","أوسط","سفلي"][i],null,"#0d47a1"));
    A.say("لاحظي المسافة التي يصل إليها الماء من كل ثقب.");nextBtn(A,"📏 قيسي المسافات",()=>{["الثقب العلوي","الثقب الأوسط","الثقب السفلي"].forEach((n,i)=>A.rec({h:n,d:Math.round(D[i]/2)}));A.obs("يصل الماء المندفع من الثقب السفلي إلى أبعد مسافة.");A.step(3);});}
 }});

/* ---------- 12) حساب كثافة أجسام مختلفة ---------- */
BX.reg("s8-3-2-0",{cols:[["o","الجسم/المادّة"],["m","الكتلة (g)"],["v","الحجم (cm³)"],["d","الكثافة (g/cm³)"]],conclude:"الكثافة = الكتلة ÷ الحجم؛ نقيس الكتلة بالميزان، والحجم بالأبعاد للجسم المنتظم، أو بإزاحة الماء للجسم غير المنتظم، أو بالمخبار للسوائل.",
 ans:["الكتلة (بالميزان) والحجم (بالمسطرة للأجسام المنتظمة، أو بالمخبار المدرّج للأجسام غير المنتظمة والسوائل)."],
 build(S,A){const bal=S.balance(130,392);const cyl=S.cylinder(560,470,200,{w:56,lvl:0,col:"#bbdefb",label:"مخبار 100 mL"});const rl=S.ruler(250,470,180,{n:9,sub:1});
  const wood=S.g();S.tr(wood,330,300);S.rect(-50,-20,100,40,{fill:S.lg(["#d7a86e","#b98a50"]),stroke:"#8d5a2b"},wood);S.text(0,5,"خشب",{"font-size":12},wood);
  const stone=S.g();S.tr(stone,700,300);S.path("M-20 -8 L-6 -20 L14 -16 L22 2 L8 16 L-14 14Z",{fill:"#8d8d8d",stroke:"#616161"},stone);S.text(0,34,"حجر",{"font-size":12},stone);
  const ml=S.label(0,-215,"",cyl.g,"#0277bd");ml.style.display="none";let st=0;const rows=[];
  const weigh=(obj,m,next)=>({g:bal.g,pad:10,fn:async()=>{await S.moveTo(obj,130,340,250);bal.set(m);A.toast("الكتلة = "+m+" g");await sleep(600);bal.set(0);next(m);return false;}});
  A.say("أولًا: قيسي كتلة قطعة الخشب بوضعها على الميزان: اسحبيها.");
  S.drag(wood,{back:true,targets:()=>st===0?[weigh(wood,48,m=>{A.step(0);st=1;wood.m=m;A.say("قيسي أبعاد القطعة بالمسطرة: اسحبي المسطرة إلى الخشب.");})]:[]});
  S.drag(rl,{back:true,targets:()=>st===1?[{g:wood,fn:async()=>{A.toast("L = 10 cm، W = 4 cm، H = 2 cm");const V=80,d=+(wood.m/V).toFixed(2);rows.push({o:"قطعة الخشب",m:wood.m,v:V,d});A.rec(rows[0]);A.obs("V = 10 × 4 × 2 = 80 cm³، الكثافة = 48 ÷ 80 = 0.60 g/cm³");A.step(1);st=2;A.say("ثانيًا: قيسي كتلة الحجر بالميزان: اسحبيه.");}}]:[]});
  S.drag(stone,{back:true,targets:()=>st===2?[weigh(stone,54,m=>{stone.m=m;A.step(2);st=3;A.say("اسكبي ماء في المخبار واقرئي حجمه، ثم ضعي الحجر واقرئي الحجم بعد وضعه.");nextBtn(A,"💧 اسكبي الماء في المخبار",async()=>{await cyl.to(.5,600,"#bbdefb");ml.style.display="";ml.set("50 mL");A.ui.clear();st=4;});})]:st===4?[{g:cyl.g,fn:async()=>{stone.style.display="none";await cyl.to(.7,700);ml.set("70 mL");const V=20,d=+(stone.m/V).toFixed(2);A.rec({o:"الحجر",m:stone.m,v:V,d});A.obs("حجم الحجر = 70 − 50 = 20 cm³، الكثافة = 54 ÷ 20 = 2.70 g/cm³");A.step(3);liq();}}]:[]});
  function liq(){S.clear();S.room();const bal2=S.balance(200,392);const c2=S.cylinder(200,342,150,{w:44,lvl:0,col:"#bbdefb",label:""});c2.g.style.display="none";const L=S.label(200,120,"",null,"#0277bd");
    const run=async(name,col,mPer)=>{c2.g.style.display="";c2.set(0);bal2.set(60);A.toast("كتلة المخبار الفارغ = 60.0 g");await sleep(900);await c2.to(.5,700,col);const mt=+(60+50*mPer).toFixed(1);bal2.set(mt);L.set(name+": الكتلة الكلّية "+mt+" g، الحجم 50 mL");await sleep(900);const m=+(mt-60).toFixed(1);A.rec({o:name,m,v:50,d:+(m/50).toFixed(2)});};
    A.say("ثالثًا: احسبي كثافة الماء ثم الزيت: قيسي كتلة المخبار فارغًا، ثم اسكبي السائل وقيسي الكتلة والحجم.");
    nextBtn(A,"💧 الماء",async()=>{await run("الماء","#bbdefb",1);A.step(4);A.step(5);nextBtn(A,"🫒 الزيت",async()=>{await run("الزيت","#ffe082",.92);A.step(6);A.ui.clear();});});}
 }});

/* ---------- 13) الكثافة خاصيّة للمادّة (المعجون) ---------- */
BX.reg("s8-3-2-1",{cols:[["n","الجسم"],["m","الكتلة (g)"],["v1","حجم الماء قبل (cm³)"],["v2","حجم الماء بعد (cm³)"],["v","حجم الجسم (cm³)"]],chart:{x:"v",y:"m",xl:"V (cm³)",yl:"m (g)"},
 conclude:"العلاقة بين الكتلة والحجم لمادّة واحدة خطّ مستقيم يمرّ بنقطة الأصل؛ ميله يساوي الكثافة، وهي ثابتة للمادّة مهما تغيّر حجم الجسم.",
 ans:["(الرسم البياني أسفل الجدول).","خطّ مستقيم يمرّ بنقطة الأصل تقريبًا (علاقة طردية).","الميل = Δm ÷ ΔV ≈ 1.5 g/cm³، ويمثّل كثافة المعجون.","لا؛ الكثافة ثابتة للمادّة نفسها، فإذا زادت الكتلة زاد الحجم بالنسبة نفسها."],
 build(S,A){quiz(A,[["صوغي فرضيّتك:",[["h","كثافة المعجون ثابتة مهما تغيّر حجم الجسم المصنوع منه"],["n","تزداد الكثافة كلما كبر الجسم"]],null]],()=>go());
  function go(){const bal=S.balance(130,392);const cyl=S.cylinder(560,470,200,{w:56,lvl:.4,col:"#bbdefb",label:"مخبار"});const ml=S.label(0,-215,"40 mL",cyl.g,"#0277bd");
    const SZ=[[6,4],[12,8],[18,12],[27,18]];const balls=[];A.say("اعملي من المعجون 4 أجسام مختلفة الحجم (كرات): اضغطي الزرّ.");
    nextBtn(A,"🟠 شكّلي 4 كرات من المعجون",()=>{SZ.forEach(([m,v],i)=>{const g=S.g();S.tr(g,280+i*55,440);S.circ(0,-Math.cbrt(v)*6,Math.cbrt(v)*6,{fill:"#ff8a65",stroke:"#d84315"},g);S.text(0,20,String(i+1),{"font-size":12},g);g.m=m;g.v=v;g.i=i;balls.push(g);});A.step(0);A.ui.clear();
      A.say("قيسي كتلة كل جسم: اسحبيه إلى الميزان، ثم ضعيه في المخبار لقياس حجمه.");
      balls.forEach(g=>S.drag(g,{back:true,targets:()=>!g.mm?[{g:bal.g,pad:10,fn:async()=>{await S.moveTo(g,130,340,250);const m=+(g.m*R(.97,1.03)).toFixed(1);g.mm=m;bal.set(m);if(!A.is(1))A.step(1);await sleep(600);bal.set(0);return false;}}]:!g.vv?[{g:cyl.g,fn:async()=>{const v1=40;g.style.display="none";await cyl.to((40+g.v)/100,600);ml.set((40+g.v)+" mL");g.vv=g.v;A.rec({n:["الأول","الثاني","الثالث","الرابع"][g.i],m:g.mm,v1,v2:v1+g.v,v:g.v});
        if(!A.is(2))A.step(2);await sleep(700);await cyl.to(.4,400);ml.set("40 mL");if(balls.every(b=>b.vv)){A.step(3);A.obs("الميل ≈ 1.5 g/cm³ = كثافة المعجون (ثابتة).");}}}]:[]}));});}
 }});

/* ---------- 14) حركة الصفائح التكتونية (الإسفنج) ---------- */
BX.reg("s8-4-1-0",{cols:[["m","نوع الحركة"],["a","المسافة بين 1 و2 (cm)"],["b","المسافة بين 2 و3 (cm)"]],conclude:"تتغيّر المسافة بين النقاط على الصفيحتين المختلفتين حسب نوع الحركة (تباعد، تقارب، انزلاق)، أما المسافة بين نقطتين على الصفيحة نفسها فلا تتغيّر.",
 ans:["تبقى مساحة الكرة الأرضية ثابتة تقريبًا؛ لأن ما يتكوّن من قشرة جديدة عند الحدود المتباعدة يُستهلك عند الحدود المتقاربة."],
 build(S,A){const L=S.g(),Rr=S.g();const mk=(g,x,lab)=>{S.tr(g,x,250);S.rect(-120,-80,240,160,{rx:10,fill:S.lg(["#ffe082","#ffca28"],1),stroke:"#f9a825","stroke-width":3},g);for(let i=0;i<30;i++)S.circ(R(-110,110),R(-70,70),R(2,5),{fill:"#fbc02d"},g);return g;};
  mk(L,270);mk(Rr,530);let x1=0,x2=0,y2=0;
  A.say("اكتبي الرقم 1 في منتصف الإسفنجة الأولى، والرقم 2 في منتصف الثانية، والرقم 3 على بُعد 1cm يمين الرقم 2.");
  nextBtn(A,"✏️ اكتبي الأرقام",()=>{S.text(0,6,"1",{"font-size":26,fill:"#c62828"},L);S.text(0,6,"2",{"font-size":26,fill:"#1565c0"},Rr);S.text(25,6,"3",{"font-size":26,fill:"#1565c0"},Rr);A.step(0);mov("tb");});
  const P=()=>({a:+((530+x2)-(270+x1))/25,b:1});const M={tb:["تباعد (أ)",1],ta:["تقارب (ب)",-1],tz:["حركة متوازية (ج)",0]};
  function mov(k){A.say("حرّكي القطعتين: "+M[k][0]+" — استخدمي الشريط.");A.ui.clear();const base={a:10.4};
    A.ui.slider("↔️ تحريك القطعتين",0,40,1,0,v=>{if(k==="tz"){y2=v;S.tr(L,270,250-v/2);S.tr(Rr,530,250+v/2);}else{x1=-M[k][1]*v/2;x2=M[k][1]*v/2;S.tr(L,270+x1,250);S.tr(Rr,530+x2,250);}});
    A.ui.add(A.ui.btn("📏 قيسي المسافات",()=>{const d=k==="tz"?Math.hypot(260,y2)/25:(260+x2-x1)/25;A.rec({m:M[k][0],a:d.toFixed(1),b:"1.0"});if(k==="tb"){A.step(1);A.step(2);A.step(3);reset("ta");}else if(k==="ta")reset("tz");else{A.step(4);A.step(5);A.step(6);A.obs("تغيّرت المسافة بين 1 و2 في كل حركة، ولم تتغيّر المسافة بين 2 و3 (على الصفيحة نفسها).");nextBtn(A,"💬 ناقشي زميلاتك",()=>A.step(7));}},"gold"));}
  function reset(k){x1=x2=y2=0;S.tr(L,270,250);S.tr(Rr,530,250);mov(k);}
 }});

/* ---------- 15) آليّة حركة الصفائح عند الحدود المتباعدة ---------- */
BX.reg("s8-4-1-1",{conclude:"عند الحدود المتباعدة تصعد الصهارة وتبرد مكوّنة غلافًا صخريًّا جديدًا يدفع الصفائح بعيدًا؛ فأحدث الصخور قرب الحدّ المتباعد وأقدمها أبعدها عنه.",
 ans:["عند الحدود المتباعدة يتكوّن غلاف صخري جديد باستمرار من الصهارة الصاعدة.","(أ) و(ب): حدود متقاربة (تهبط الصفيحة المحيطية تحت القارّية)، (ج): حدود متباعدة.","أحدث الصخور عند (ج) الحدّ المتباعد، وأقدمها عند (أ) و(ب) بعيدًا عنه."],
 build(S,A){const strip=S.g();S.tr(strip,400,140);const cols=["#ef5350","#ffb74d","#fff176","#81c784","#81c784","#fff176","#ffb74d","#ef5350"];
  A.say("ارسمي 8 مستطيلات متساوية على قطعة الكرتون (80cm × 4cm) ولوّنيها لتمثّل الغلاف الصخري.");
  nextBtn(A,"🎨 ارسمي ولوّني الشريط",()=>{cols.forEach((c,i)=>S.rect(-320+i*80,-14,80,28,{fill:c,stroke:"#555"},strip));S.text(-300,40,"2",{"font-size":16},strip);S.text(300,40,"1",{"font-size":16},strip);A.step(0);
    nextBtn(A,"🗺️ ارسمي النموذج: قارّية | محيطية | محيطية | قارّية",()=>{const m=S.g();S.tr(m,400,330);[["صفيحة قارّية","#a1887f"],["صفيحة محيطية","#4fc3f7"],["صفيحة محيطية","#4fc3f7"],["صفيحة قارّية","#a1887f"]].forEach(([t,c],i)=>{S.rect(-200+i*100,-30,100,60,{fill:c,stroke:"#555"},m);S.text(-150+i*100,6,t,{"font-size":11},m);});
      [["أ",-100],["ج",0],["ب",100]].forEach(([t,x])=>{S.line(x,-30,x,30,{stroke:"#c62828","stroke-width":3},m);S.label(x,-48,t,m,"#c62828");});A.step(1);
      A.say("اعملي شقًّا عند الخطوط الحمراء، وضعي الشريط أسفل النموذج واسحبي طرفيه من الشقّ (ج) وأدخليهما عند (أ) و(ب).");nextBtn(A,"✂️ رتّبي النموذج",()=>{A.step(2);run(m);});});});
  function run(m){A.say("أمسكي الطرفين (1) و(2) واسحبيهما ببطء بعيدًا عن النموذج: حرّكي الشريط.");strip.remove();const band=S.g();S.tr(band,400,262);const clip=S.clip(S.mk("rect",{x:-100,y:-16,width:200,height:32}));band.setAttribute("clip-path",clip);S.label(400,215,"الصهارة تصعد عند (ج) ← غلاف صخري جديد",null,"#d84315");let last=0;
    A.ui.slider("↔️ اسحبي الطرفين",0,100,1,0,v=>{band.innerHTML="";const off=v*.8;for(let s=-1;s<=1;s+=2)for(let i=0;i<8;i++){const x=i*25-25+off%25+ (off>=25?0:0);const age=Math.floor((x+25)/25);const col=["#81c784","#fff176","#ffb74d","#ef5350","#ba68c8"][Math.min(4,Math.max(0,i-Math.floor(off/25)+ (Math.floor(off/25))))%5];S.rect(s>0?x:-x-25,-14,25,28,{fill:["#81c784","#fff176","#ffb74d","#ef5350","#ba68c8","#90a4ae","#90a4ae","#90a4ae"][i],stroke:"#555"},band);}
      if(v>=90&&!last){last=1;A.step(3);A.obs("يخرج الشريط من (ج) ويتّجه نحو (أ) و(ب) حيث يغوص؛ الألوان الحديثة قرب (ج).");}});}
 }});

/* ---------- 16) آليّة تكوّن معدن الهاليت ---------- */
BX.reg("s8-4-2-0",{cols:[["d","المدّة"],["o","الملاحظة"]],conclude:"يتكوّن الهاليت من ترسّب الملح بعد تبخّر الماء من المحلول المشبع، فتتكوّن بلّورات مكعّبة الشكل.",
 ans:["يتبخّر الماء تدريجيًّا فيزداد تركيز الملح حتى يصبح المحلول مشبعًا، فيترسّب الملح الزائد على شكل بلّورات مكعّبة (الهاليت)."],
 build(S,A){const bk=S.beaker(400,392,170,160,{lvl:0,label:"كأس زجاجية"});const bal=S.balance(150,392);const cyl=S.cylinder(640,470,120,{w:36,col:"#bbdefb",lvl:.8,label:"100 mL"});let st=0;
  A.say("ضعي 100mL من الماء في الكأس الزجاجية: اسحبي المخبار.");
  S.drag(cyl.g,{back:true,oy:-60,targets:()=>st===0?[{g:bk.g,fn:async()=>{await S.pour(cyl.g,500,220,-75,()=>Promise.all([cyl.to(0,600),bk.to(.55,600,"#e3f2fd")]));A.step(0);st=1;A.say("زني 10g من ملح الطعام بالميزان الإلكتروني: اضغطي الزرّ.");nextBtn(A,"⚖️ زني 10 g ملح",async()=>{for(let m=0;m<=10;m+=.5){bal.set(m);await sleep(40);}const s=S.g();S.tr(s,150,340);for(let i=0;i<20;i++)S.rect(R(-20,20),R(-10,4),4,4,{fill:"#fff",stroke:"#ccc"},s);A.step(1);st=2;A.ui.clear();A.say("أضيفي الملح إلى الكأس وحرّكي: اسحبي الملح.");
    S.drag(s,{back:true,targets:()=>[{g:bk.g,fn:async()=>{s.remove();A.toast("حرّكي المحلول…");await sleep(500);A.rec({d:"عند الإضافة",o:"ذاب الملح في الماء واختفى (محلول شفّاف)"});A.step(2);st=3;win();}}]});});}}]:[]});
  function win(){A.say("ضعي الكأس على النافذة في مكان دافئ وراقبيها مدّة أسبوعين.");S.emo(650,90,"☀️",50);const cr=S.g();let r=new Set();
    A.ui.slider("📅 اليوم",0,14,1,0,d=>{bk.set(.55*(1-d/14*.92));cr.innerHTML="";const n=Math.max(0,d-4)*4;for(let i=0;i<n;i++){const s=R(5,9+d*.6);S.rect(400+R(-70,70),392-6-s-R(0,8),s,s,{fill:"#fff",stroke:"#b0bec5","stroke-width":1.2,opacity:.95},cr);}
      [[7,"نقص مستوى الماء، وبدأت بلّورات صغيرة بالظهور على القاع والجدران"],[14,"تبخّر معظم الماء، وتكوّنت بلّورات ملح مكعّبة بيضاء (الهاليت)"]].forEach(([k,o])=>{if(d>=k&&!r.has(k)){r.add(k);A.rec({d:k+" يومًا",o});}});if(d===14&&!A.is(3))A.step(3);});}
 }});

/* ---------- 17) ملوّثات الهواء ---------- */
BX.reg("s8-4-3-0",{cols:[["p","المكان"],["o","الملوّثات الملاحظة بالعدسة"]],conclude:"يحتوي الهواء على ملوّثات صلبة دقيقة (غبار، دخان، سخام، حبوب لقاح) تلتصق بالفازلين، وتكثر قرب الشوارع والأماكن المكشوفة.",
 ans:["جسيمات صلبة دقيقة: غبار وأتربة، سخام ودخان أسود، حبوب لقاح، ألياف.","تسبّب أمراض الجهاز التنفّسي والحساسية للإنسان، وتسدّ ثغور النبات وتقلّل البناء الضوئي.","زراعة الأشجار، تقليل حرق الوقود واستخدام وسائل النقل العام، تركيب مرشّحات للمصانع، رشّ الساحات بالماء."],
 build(S,A){const sheet=S.g();S.rect(250,80,300,300,{fill:"#fff",stroke:"#bdbdbd"},sheet);const cuts=[];
  A.say("قصّي الكرتونة قطعًا مربّعة (20cm × 20cm).");nextBtn(A,"✂️ قصّي الكرتونة",()=>{sheet.remove();for(let i=0;i<3;i++){const g=S.g();S.tr(g,150+i*130,420);S.rect(-45,-45,90,90,{fill:"#fff",stroke:"#bdbdbd"},g);g.dust=S.g(g);cuts.push(g);}A.step(0);
    nextBtn(A,"🕳️ اثقبي القطع من الأعلى",()=>{cuts.forEach(c=>S.circ(0,-36,5,{fill:"#9e9e9e"},c));A.step(1);nextBtn(A,"🧴 ادهنيها بطبقة رقيقة من الفازلين",()=>{cuts.forEach(c=>c.querySelector("rect").setAttribute("fill","#fffde7"));A.step(2);hang();});});});
  const PL=[["المختبر","#eceff1",10,"غبار ناعم قليل"],["ساحة المدرسة","#c8e6c9",40,"غبار وأتربة وحبوب لقاح"],["قرب الشارع","#cfd8dc",90,"سخام أسود ودخان وغبار كثيف"]];
  function hang(){A.say("علّقي القطع في أماكن مختلفة: اسحبي كل قطعة إلى مكان.");const spots=PL.map((p,i)=>{const g=S.g();S.rect(470+i*0,40+i*110,300,100,{rx:10,fill:p[1],stroke:"#90a4ae"},g);S.text(620,70+i*110,p[0],{"font-size":14},g);S.line(620,40+i*110,620,62+i*110,{stroke:"#555"},g);g.i=i;g.y=110+i*110;return g;});let n=0;
    cuts.forEach(c=>S.drag(c,{targets:()=>spots.filter(s=>!s.c).map(s=>({g:s,pad:0,fn:async()=>{s.c=c;c.p=s.i;c._off=true;await S.moveTo(c,620,s.y-5,250);S.tr(c,620,s.y-5,0,.55);if(++n===3){A.step(3);day();}return "stay";}}))}));}
  function day(){A.say("لاحظي القطع في اليوم اللاحق: اضغطي «اليوم التالي».");nextBtn(A,"🌙 اليوم التالي",()=>{cuts.forEach(c=>{const k=PL[c.p][2];for(let i=0;i<k;i++)S.circ(R(-40,40),R(-30,40),R(.8,2.2),{fill:c.p===2&&i%2?"#212121":"#795548",opacity:.8},c.dust);});A.step(4);
    A.say("لاحظي الملوّثات بالعدسة المكبّرة: اضغطي على كل قطعة.");let k=0;cuts.forEach(c=>{c._off=false;S.tr(c,c._x,c._y,0,1);});cuts.forEach(c=>S.tap(c,()=>{if(c.seen)return;c.seen=1;A.rec({p:PL[c.p][0],o:PL[c.p][3]});if(++k===1)A.step(5);if(k===3){quiz(A,[["تنبّئي بطبيعة الملوّثات:",[["a","جسيمات صلبة دقيقة (غبار، سخام، حبوب لقاح)"],["b","غازات فقط"]],"a"]],()=>A.step(6));}}));});}
 }});

/* ---------- 18) استدامة الموارد الطبيعية ---------- */
BX.reg("s8-4-3-1",{conclude:"إعادة استخدام العبوات الفارغة في الزراعة تقلّل النفايات البلاستيكية وتحافظ على الموارد، وزراعة النباتات تحسّن البيئة المدرسية.",
 ans:["تقليل النفايات البلاستيكية وتلوّث البيئة، وتوفير المال والموارد، والاستفادة منها بدلًا من رميها.","تحسين جودة الهواء وإنتاج الأكسجين، وتجميل المدرسة، وتعزيز الانتماء والمسؤولية لدى الطالبات."],
 build(S,A){const bot=S.g();S.tr(bot,400,380);S.path("M-50 0 L-50 -150 Q-50 -170 -30 -180 L-20 -210 L20 -210 L30 -180 Q50 -170 50 -150 L50 0Z",{fill:"rgba(187,222,251,.6)",stroke:"#78909c","stroke-width":3},bot);bot.style.display="none";
  A.ui.choice("اختاري عبوة بحجم مناسب للنبتة:",[["s","🧃 عبوة عصير صغيرة"],["m","🍶 عبوة ماء 1.5 L"],["c","🥤 كوب صغير جدًّا"]],v=>{if(v!=="m"){A.toast("اختاري عبوة تتّسع لجذور النبتة");return;}A.ui.clear();bot.style.display="";A.step(0);deco();});
  function deco(){A.say("زيّني العبوة: ضعي الغراء ثم لفّي قطع الخيش أو خيوط الصوف الملوّنة.");nextBtn(A,"🧶 لفّي الخيش والصوف",async()=>{bot.querySelector("path").setAttribute("d","M-50 0 L-50 -110 L50 -110 L50 0Z");for(let i=0;i<10;i++){S.rect(-52,-10-i*10,104,8,{fill:["#a1887f","#e57373","#ffb74d","#81c784"][i%4]},bot);await sleep(60);}A.step(1);
    nextBtn(A,"🪴 ضعي التراب وازرعي النبتة",()=>{S.rect(-48,-55,96,55,{fill:"#6d4c41"},bot);const p=S.pot(0,0);p.g.remove();const pl=S.g(bot);S.tr(pl,0,-55);S.path("M0 0 L0 -70",{stroke:"#2e7d32","stroke-width":4},pl);for(let i=0;i<4;i++)S.ell(i%2?14:-14,-20-i*14,14,6,{fill:"#43a047"},pl);S.emo(0,-82,"🌸",26,pl);A.step(2);
      nextBtn(A,"💧 اروي النبتة وضعيها في حديقة المدرسة",()=>{S.emo(650,150,"🏫",60);S.moveTo(bot,620,392,700);A.step(3);nextBtn(A,"🗓️ احرصي على الريّ باستمرار",()=>{A.obs("أُعيد استخدام عبوة بلاستيكية تالفة كأصيص لنبتة في حديقة المدرسة.");A.step(4);});});});});}
 }});

/* ---------- 19) تأثير ملوحة مياه الريّ في النبات ---------- */
const SAL=[["(1) ماء نقي",0,[3.2,6.1]],["(2) 5 g ملح / 1000 mL",5,[2.0,3.4]],["(3) 10 g ملح / 1000 mL",10,[.8,1.1]]];
BX.reg("s8-4-3-2",{cols:[["p","رقم الأصيص"],["s","المحلول"],["w1","الأسبوع الأول (cm)"],["w2","الأسبوع الثاني (cm)"]],chart:{x:"s",y:["w1","w2"],type:"bar",xl:"نوع المحلول",yl:"متوسّط ارتفاع النبات (cm)",names:{w1:"الأسبوع الأول",w2:"الأسبوع الثاني"}},
 conclude:"كلما زادت ملوحة مياه الريّ قلّ نموّ نبات الرشاد؛ لأن الملوحة تُصعّب امتصاص الجذور للماء (بالخاصية الأسموزية).",
 ans:["لاختلاف ملوحة مياه الريّ؛ فالماء المالح يقلّل امتصاص الجذور للماء فيضعف النموّ.","تتّفق مع المصادر التي تبيّن أن الملوحة العالية تضرّ بنموّ معظم النباتات.","(حسب توقّع الطالبة).","كلما زادت ملوحة المياه قلّ نموّ نبات الرشاد."],
 build(S,A){quiz(A,[["صوغي فرضيّتك:",[["h","كلما زادت ملوحة مياه الريّ أثّرت سلبًا في نموّ النبات"],["n","لا تؤثّر الملوحة في النموّ"]],null]],()=>go());
  function go(){const bk=SAL.map((s,i)=>{const b=S.beaker(110+i*110,470,80,80,{lvl:0,col:mix("#e3f2fd","#fffde7",s[1]/10),label:"محلول "+(i+1)});return b;});
   A.say("حضّري المحاليل الثلاثة: (1) ماء نقي، (2) 5g ملح في 1000mL، (3) 10g ملح في 1000mL.");nextBtn(A,"🧂 حضّري المحاليل",async()=>{for(const b of bk)await b.to(.7,300);A.step(0);A.step(1);
     const pots=SAL.map((s,i)=>{const p=S.pot(0,0,{label:"أصيص "+(i+1)});S.tr(p.g,480+i*110,430,0,.8);p.h=0;p.draw();return p;});A.step(2);
     nextBtn(A,"🌱 ضعي التربة وحبّات الرشاد في الأصص",()=>{A.step(3);A.say("اروي كل أصيص بمحلوله: اسحبي كل كأس إلى أصيصها.");let k=0;
       bk.forEach((b,i)=>S.drag(b.g,{back:true,oy:-40,targets:()=>[{g:pots[i].g,pad:10,fn:async()=>{await S.pour(b.g,pots[i].g._x+40,300,-70,()=>sleep(300));if(++k===3){A.step(4);light(pots);}}}],miss:()=>A.toast("الأصيص "+(i+1)+" يُروى بالمحلول "+(i+1))}));});});}
  function light(pots){A.say("ضعي الأصص في مكان ذي إضاءة مناسبة، وكرّري الريّ يوميًّا: اضغطي «يوم جديد».");S.emo(720,70,"💡",40);A.step(5);let d=0;const res={};
    A.ui.clear();const b=A.ui.btn("💧 يوم جديد: اروي الأصص",()=>{if((d===7&&!res[7])||d>=14){A.toast(d>=14?"انتهت المدّة":"قيسي الارتفاع بعد أسبوع أولًا");return;}d++;if(d===1)A.step(6);pots.forEach((p,i)=>{const L=d<=7?SAL[i][2][0]*d/7:SAL[i][2][0]+(SAL[i][2][1]-SAL[i][2][0])*(d-7)/7;p.h=L*10;p.n=5;p.col=i===2?"#9ccc65":"#43a047";p.draw();});
      if(d===7||d===14)A.ui.add(A.ui.btn("📏 قيسي ارتفاع النباتات (اليوم "+d+")",bb=>{bb.remove();res[d]=1;if(d===14){A.step(7);SAL.forEach((s,i)=>A.rec({p:i+1,s:s[0],w1:s[2][0],w2:s[2][1]}));A.step(8);A.step(9);A.step(10);A.obs("كان أعلى نموّ في الماء النقي، وأقلّه في المحلول الأكثر ملوحة.");}else A.toast("سُجّلت قياسات الأسبوع الأول");},"g"));},"gold");A.ui.add(b);}
 }});
})();
