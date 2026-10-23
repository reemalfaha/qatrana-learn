/* تجارب العلوم الحياتية — الصف التاسع (كتاب الأنشطة والتجارب العملية) — مطابقة لخطوات الكتاب */
(function(){const {sleep,lerp,clamp,mix}=BX;
const R=(a,b)=>a+Math.random()*(b-a);
const {quiz,pickMany}=BX;

/* ---------- 1) أثر درجة الحرارة في نموّ عفن الخبز ---------- */
BX.reg("b9-1-1-0",{cols:[["env","البيئة"],["t","درجة الحرارة (°C)"],["n","عدد المربّعات"]],chart:{x:"env",y:"n",type:"bar",xl:"البيئة",yl:"عدد المربّعات المغطّاة بالفطر"},
 conclude:"كلما ارتفعت درجة الحرارة (ضمن المدى المناسب) زاد نموّ فطر عفن الخبز؛ ويُبطئ التبريد نموّه، ولذلك نحفظ الخبز في الثلّاجة.",
 ans:["الأنسب: رسم بياني بالأعمدة؛ لأن المتغيّر المستقل (البيئة/درجة الحرارة) فئات منفصلة، والمحور الرأسي عدد المربّعات المغطّاة بالفطر.","المكان الدافئ المظلم (نحو 30°C) كان الأنسب لنموّ عفن الخبز.","كلما ارتفعت درجة الحرارة زاد نموّ العفن؛ فقد كان النموّ قليلًا جدًّا في الثلّاجة، ومتوسّطًا في الخزانة، وكبيرًا في المكان الدافئ. (قارني بتوقّعكِ)"],
 build(S,A){const P=[["f","الثلّاجة",4,"#1565c0"],["c","الخزانة المظلمة",20,"#5d4037"],["w","المكان الدافئ المظلم",30,"#d84315"]];
  A.ui.choice("توقّعكِ: أين ينمو فطر العفن أكثر؟",P.map(p=>[p[0],p[1]]),v=>{A.obs("توقّعي: ينمو العفن أكثر في «"+P.find(p=>p[0]===v)[1]+"».");A.ui.clear();A.step(0);phase1();});
  const bags=[],breads=[];
  for(let i=0;i<3;i++){const x=170+i*230;const b=S.bag(x,385);bags.push(b);S.text(x,412,"كيس "+(i+1),{"font-size":14,fill:"#4e342e"});
    const br=S.g();S.rect(-38,-30,76,56,{rx:14,fill:S.lg(["#e9b872","#d4954a"],1),stroke:"#a8692c","stroke-width":3},br);S.rect(-30,-22,60,40,{rx:10,fill:"#f6deb0"},br);for(let k=0;k<6;k++)S.circ(R(-24,24),R(-14,12),1.8,{fill:"#d7b27a"},br);
    S.tr(br,x,456);br.drops=0;br.lab=S.label(0,-44,"💧 0/5",br,"#1d7f8c");br.lab.style.display="none";breads.push(br);}
  S.text(400,30,"قطع خبز متساوية الحجم وأكياس شفّافة قابلة للغلق",{"font-size":17,fill:"#5C1622"});
  function phase1(){A.say("ارسمي على كل كيس شبكة مربّعات طول ضلع كل منها 1cm: اضغطي على الأكياس الثلاثة.");let n=0;
    bags.forEach(b=>{S.glow(b.g,true);S.tap(b.g,async()=>{if(b.grid)return;b.grid=1;S.glow(b.g,false);const gg=S.g(b.g);for(let k=0;k<=8;k++){const l=S.line(-44+k*11,-100,-44+k*11,-100,{stroke:"#1565c0","stroke-width":1,opacity:.7},gg);S.tween(300,t=>l.setAttribute("y2",lerp(-100,-12,t)));}for(let k=0;k<=8;k++){const l=S.line(-44,-100+k*11,-44,-100+k*11,{stroke:"#1565c0","stroke-width":1,opacity:.7},gg);S.tween(300,t=>l.setAttribute("x2",lerp(-44,44,t)));}
      if(++n===3){A.step(1);phase2();}});});}
  function phase2(){A.say("بلّلي كل قطعة خبز بـ 5 قطرات: اسحبي القطّارة إلى القطعة 5 مرّات، فتدخل كيسها ويُفرَّغ من الهواء ويُغلق.");breads.forEach(b=>b.lab.style.display="");
    const dr=S.dropper(720,330,"#64b5f6",{label:"ماء"});let closed=0;
    S.drag(dr,{back:true,oy:10,targets:()=>breads.filter(b=>b.drops<5).map(b=>({g:b,pad:10,fn:async()=>{b.drops++;b.lab.set("💧 "+b.drops+"/5");const d=S.circ(b._x,b._y-60,5,{fill:"#42a5f5"},S.fx);await S.tween(250,t=>d.setAttribute("cy",lerp(b._y-60,b._y-10,t)));d.remove();S.circ(R(-20,20),R(-12,10),4,{fill:"#c9a06a",opacity:.7},b);
      if(b.drops===5){b.lab.style.display="none";const i=breads.indexOf(b);await S.moveTo(b,bags[i].g._x,330,500);bags[i].g.append(b);S.tr(b,0,-55,0,.8);
        const bp=bags[i].g.querySelector("path");await S.tween(500,t=>bp.setAttribute("d","M"+lerp(-50,-42,t)+" -110 L"+lerp(50,42,t)+" -110 L"+lerp(56,46,t)+" 0 Q0 10 "+lerp(-56,-46,t)+" 0Z"));S.rect(-46,-118,92,8,{fill:"#1565c0",rx:3},bags[i].g);
        if(++closed===3){S.off(dr,true);A.step(2);await sleep(500);phase3();}}}}))});}
  let spots;function phase3(){S.clear();S.room({table:false,wall1:"#eef2f5",wall2:"#dfe7ec"});A.say("اضبطي المتغيّرات: اسحبي كل كيس إلى مكانه — خلف الدرج الأخير من الثلّاجة، والخزانة المظلمة، والمكان الدافئ المظلم.");
    spots=P.map((p,i)=>{const x=140+i*260,g=S.g();S.tr(g,x,250);
      if(p[0]==="f"){S.rect(-95,-190,190,330,{rx:16,fill:S.lg(["#f5f9fc","#cfdde6"]),stroke:"#90a4ae","stroke-width":3},g);S.rect(-80,-170,160,290,{rx:8,fill:"#e3f2fd"},g);S.line(-80,-60,80,-60,{stroke:"#b0bec5","stroke-width":4},g);S.rect(-80,40,160,80,{fill:"#cfd8dc",opacity:.6},g);S.text(0,135,"الدرج الأخير",{"font-size":11,fill:"#546e7a"},g);S.emo(60,-140,"❄️",26,g);}
      else if(p[0]==="c"){S.rect(-95,-190,190,330,{rx:8,fill:S.lg(["#6d4c41","#4e342e"],1)},g);S.rect(-80,-170,160,290,{rx:4,fill:"#2b1d18"},g);S.circ(70,-20,6,{fill:"#d7a86e"},g);}
      else{S.rect(-95,-190,190,330,{rx:8,fill:S.lg(["#5d4037","#3e2723"],1)},g);S.rect(-80,-170,160,290,{rx:4,fill:S.rg([["#ff7043",0,.55],["#3e2723",1]],.5,.95,.8)},g);S.path("M-60 110 q 10 -30 20 0 q 10 -30 20 0 q 10 -30 20 0 q 10 -30 20 0 q 10 -30 20 0 q 10 -30 20 0",{stroke:"#ff7043","stroke-width":4,fill:"none"},g);}
      S.label(0,-205,p[1],g,p[3]);g.sp0={x,y:330};return g;});
    let placed=0;
    for(let i=0;i<3;i++){const b=S.g();S.tr(b,300+i*110,470,0,.55);S.path("M-46 -110 L46 -110 L50 0 Q0 10 -50 0Z",{fill:"#e3f2fd",stroke:"#90a4ae","stroke-width":3,opacity:.95},b);S.rect(-48,-118,96,8,{fill:"#1565c0"},b);S.rect(-38,-90,76,56,{rx:14,fill:"#e0a85f"},b);S.text(0,-40,"كيس "+(i+1),{"font-size":22,fill:"#3e2723"},b);
      S.drag(b,{oy:-30,targets:()=>spots.filter(s=>!s.bag).map(s=>({g:s,pad:0,fn:async()=>{s.bag=b;b._off=true;await S.moveTo(b,s.sp0.x,s.sp0.y,300);if(++placed===3){A.step(3);phase4();}return "stay";}}))});}}
  function phase4(){A.say("دوّني درجة الحرارة في كل مكان: اسحبي مقياس الحرارة إلى كل مكان.");const th=S.g();S.tr(th,400,470);const T=S.thermo(0,-20,120,{min:-10,max:40,val:22,par:th});th.setAttribute("transform","translate(400 470) scale(.7)");th._s=.7;let m=0;
    S.drag(th,{back:true,oy:-60,targets:()=>spots.filter(s=>s.temp==null).map(s=>({g:s,pad:0,fn:async()=>{const p=P[spots.indexOf(s)];await S.tween(700,t=>T.set(lerp(22,p[2],t)));s.temp=p[2];S.label(0,160,"🌡️ "+p[2]+" °C",s,"#c62828");A.obs("درجة الحرارة في "+p[1]+": "+p[2]+" °C");T.set(22);
      if(++m===3){th.style.display="none";A.step(4);days();}}}))});}
  function days(){A.say("تفحّصي الأكياس كل 3 أيام مدّة 9 أيام: اضغطي «⏩ مرور 3 أيام» ودوّني ملاحظاتك.");
    const MOLD={f:[0,0,1,2],c:[0,4,11,19],w:[0,9,23,37]};const OBS=[null,"الأيام الثلاثة الأولى: بقع صغيرة خضراء رمادية على خبز المكان الدافئ، وبقع قليلة في الخزانة، ولا تغيّر يُذكر في الثلّاجة.","الأيام الثلاثة الثانية: انتشر الفطر في المكان الدافئ والخزانة، وظهرت بقعة صغيرة في الثلّاجة.","الأيام الثلاثة الثالثة: غطّى الفطر معظم خبز المكان الدافئ، ونحو نصف خبز الخزانة، وبقي خبز الثلّاجة شبه سليم."];
    const zoom=spots.map((s,i)=>{const g=S.g();S.tr(g,s._x,175);S.rect(-66,-50,132,104,{rx:8,fill:"#fff",stroke:"#90a4ae","stroke-width":2},g);S.rect(-48,-36,96,72,{fill:"#e0a85f"},g);
      for(let r=0;r<=6;r++)S.line(-48,-36+r*12,48,-36+r*12,{stroke:"#1565c0","stroke-width":.7},g);for(let c=0;c<=8;c++)S.line(-48+c*12,-36,-48+c*12,36,{stroke:"#1565c0","stroke-width":.7},g);
      const mg=S.g(g);const cells=[];for(let r=0;r<6;r++)for(let c=0;c<8;c++)cells.push([c,r]);cells.sort((a,b)=>Math.hypot(a[0]-3.5+i,a[1]-2.5)-Math.hypot(b[0]-3.5+i,b[1]-2.5));return {g,mg,cells,n:0,s};});
    let d=0;const b=A.ui.btn("⏩ مرور 3 أيام",async()=>{d++;b.disabled=true;
      for(let i=0;i<3;i++){const z=zoom[i],k=P[i][0],to=MOLD[k][d];for(let j=z.n;j<to;j++){const [c,r]=z.cells[j];const cx=-42+c*12,cy=-30+r*12;const cl=["#558b2f","#33691e","#9e9d24","#607d8b","#263238"][j%5];for(let q=0;q<4;q++)S.circ(cx+R(-4,4),cy+R(-4,4),R(2,4.5),{fill:cl,opacity:.85},z.mg);await sleep(20);}z.n=to;}
      A.obs(OBS[d]);if(d<3)b.disabled=false;else{b.textContent="✔ انتهت 9 أيام";A.step(5);count();}},"gold");A.ui.add(b);
    function count(){A.ui.clear();A.say("ارتدي القفّازين، ثم عُدّي في كل كيس المربّعات التي يملأ الفطر نصفها على الأقل: اضغطي على كل كيس.");
      A.ui.add(A.ui.btn("🧤 ارتديتُ القفّازين",gb=>{gb.disabled=true;gb.textContent="🧤 القفّازان عليكِ";let c=0;
        zoom.forEach((z,i)=>{S.glow(z.g,true);S.tap(z.g,async()=>{if(z.cnt)return;z.cnt=1;S.glow(z.g,false);const lab=S.label(0,72,"0",z.g,"#2f8f5b");for(let j=1;j<=z.n;j++){lab.set(j+" مربّعًا");await sleep(40);}if(!z.n)lab.set("0 مربّع");
          if(++c===3){A.step(6);P.forEach((p,k)=>A.rec({env:p[1],t:p[2],n:zoom[k].n}));A.step(7);}});});},"gold"));}}
 }});

/* ---------- 2) أثر الضوء في اتجاه نموّ النباتات (تصميم تجربة) ---------- */
BX.reg("b9-1-2-0",{cols:[["day","اليوم"],["a","العيّنة التجريبية (داخل الصندوق)"],["b","العيّنة الضابطة (ضوء من الجهات جميعها)"]],
 conclude:"تنمو ساق النبات باتجاه مصدر الضوء (انتحاء ضوئي)؛ فتتعرّض أوراقه لأكبر قدر من الضوء اللازم لعملية البناء الضوئي.",
 ans:["تنمو ساق النبات وتنحني باتجاه مصدر الضوء، أما النبات المضاء من الجهات جميعها فينمو مستقيمًا إلى الأعلى.","—"],
 build(S,A){S.emo(745,60,"☀️",70);for(let i=0;i<5;i++)S.line(700,90+i*14,560,150+i*30,{stroke:"#ffd54f","stroke-width":5,opacity:.4});
  const box=S.g();S.tr(box,230,392);S.path("M-130 0 L-130 -230 L130 -230 L130 0Z",{fill:S.lg(["#d7a86e","#c08a4f"],1),stroke:"#8d5a2b","stroke-width":4},box);S.rect(-115,-215,230,212,{fill:"#3a2a1d"},box);
  S.rect(110,-150,30,60,{fill:"#fff59d"},box);S.path("M140 -150 L-100 -170 L-100 -40 L140 -90Z",{fill:"#fff59d",opacity:.18},box);S.label(0,-245,"صندوق مغلق له فتحة جانبية",box,"#8d5a2b");
  const lit=S.g();S.tr(lit,560,392);S.ell(0,-5,110,16,{fill:"#fff59d",opacity:.5},lit);S.label(0,-275,"مكان مضاء من الجهات جميعها",lit,"#f9a825");[[-130,-200],[130,-200],[0,-235]].forEach(([x,y])=>S.emo(x,y,"💡",30,lit));
  const pots=[0,1].map(i=>{const p=S.pot(0,0,{label:"أصيص "+(i?"ب":"أ")});p.h=34;p.draw();S.tr(p.g,345+i*90,470,0,.75);return p;});
  quiz(A,[["صوغي فرضية عن أثر الضوء في اتجاه نموّ النبات:",[["h1","إذا تعرّض النبات للضوء من جهة واحدة، فإن ساقه تنمو باتجاه الضوء"],["h2","ينمو النبات في الاتجاه نفسه مهما كان اتجاه الضوء"]],null],
    ["تنبّؤ قابل للاختبار:",[["p1","سينحني نبات الصندوق نحو الفتحة الجانبية"],["p2","سيذبل نبات الصندوق فورًا"]],"p1","التنبّؤ يجب أن يُختبر بالملاحظة ويتّفق مع الفرضية"]],()=>{A.step(0);place();});
  function place(){A.say("حدّدي العيّنتين: اسحبي أصيصًا إلى الصندوق (العيّنة التجريبية)، والآخر إلى المكان المضاء (العيّنة الضابطة).");let put=0;
    pots.forEach(p=>S.drag(p.g,{oy:-40,targets:()=>[box,lit].filter(t=>!t.pot).map(t=>({g:t,pad:0,fn:async()=>{t.pot=p;p.where=t===box?"box":"lit";p.g._off=true;await S.moveTo(p.g,t._x,385,400);S.label(0,-150,t===box?"تجريبية":"ضابطة",p.g,t===box?"#7A1F2E":"#2f8f5b");if(++put===2){A.step(1);vars();}return "stay";}}))}));}
  function vars(){quiz(A,[["المتغيّر المستقل:",[["a","اتجاه الضوء الساقط على النبات"],["b","طول النبات"],["c","كمية الماء"]],"a"],["المتغيّر التابع:",[["a","نوع التربة"],["b","اتجاه نموّ الساق"],["c","حجم الصندوق"]],"b"],
    ["العوامل التي يتعيّن تثبيتها:",[["a","نوع النبات وعمره، كمية الماء، نوع التربة، درجة الحرارة"],["b","اتجاه الضوء فقط"]],"a"]],()=>{A.step(2);water();});}
  function water(){A.say("اضبطي المتغيّرات: اسقي الأصيصين بالكمية نفسها — اسحبي المخبار (50 mL) إلى كل أصيص.");const cyl=S.cylinder(700,470,90,{w:30,col:"#64b5f6",lvl:.5,label:"50 mL"});let n=0;
    S.drag(cyl.g,{back:true,oy:-45,targets:()=>pots.filter(p=>!p.w).map(p=>({g:p.g,pad:20,fn:async()=>{p.w=1;await S.pour(cyl.g,p.g._x+40,p.g._y-140,-70,()=>S.stream(p.g._x+5,p.g._y-120,p.g._y-60,"#64b5f6",400));cyl.set(.5);if(++n===2){S.off(cyl.g,true);A.step(3);mats();}}}))});}
  function mats(){pickMany(A,"حدّدي الأدوات والمواد اللازمة (اختاري كل ما يلزم):",["أصيصان فيهما بادرات متماثلة","صندوق كرتوني له فتحة جانبية","ماء","مخبار مدرّج","مسطرة","مجهر ضوئي","حمض الهيدروكلوريك"],["أصيصان فيهما بادرات متماثلة","صندوق كرتوني له فتحة جانبية","ماء","مخبار مدرّج","مسطرة"],()=>{A.step(4);
    pickMany(A,"إرشادات السلامة العامّة:",["غسل اليدين بعد التعامل مع التربة","الحذر عند استعمال الأدوات","تذوّق التربة","ترك الماء منسكبًا على الأرض"],["غسل اليدين بعد التعامل مع التربة","الحذر عند استعمال الأدوات"],()=>{A.step(5);grow();});});}
  function grow(){A.say("نفّذي التجربة: حرّكي شريط الأيام مدّة أسبوع ولاحظي اتجاه نموّ الساقين.");const inB=pots.find(p=>p.where==="box"),inL=pots.find(p=>p.where==="lit");let last=-1;
    A.rec({day:0,a:"قائمة",b:"قائمة"});
    A.ui.slider("📅 اليوم",0,7,1,0,d=>{inB.h=34+d*12;inB.bend=d*.14;inB.draw();inL.h=34+d*13;inL.bend=0;inL.draw();
      if(d>last&&(d===3||d===7)){last=d;A.rec({day:d,a:d===7?"منحنية بشدّة نحو الفتحة ↗":"تبدأ بالانحناء نحو الفتحة",b:"قائمة نحو الأعلى ↑"});}
      if(d===7&&!A.is(6)){A.obs("انحنت ساق النبات داخل الصندوق نحو الفتحة (مصدر الضوء)، ونمت ساق النبات المضاء من الجهات جميعها مستقيمة.");A.step(6);
        quiz(A,[["أداة جمع البيانات المناسبة:",[["a","جدول لاتجاه النموّ كل يوم، ورسم للنبات"],["b","لا حاجة إلى تسجيل"]],"a"],["الاستنتاج العلمي الصحيح:",[["a","تنمو ساق النبات باتجاه مصدر الضوء"],["b","الضوء لا يؤثّر في اتجاه النموّ"]],"a"]],()=>{A.step(7);A.step(8);});}});}
 }});

/* ---------- 3) تأثير المطر الحمضي في نموّ الرشاد ---------- */
const AC=[["أ","ماء نقي","#e3f2fd",[3.1,6.4]],["ب","عصير ليمون صافٍ","#fff176",[0,0]],["ج","ليمون:ماء 1:1","#fff59d",[.4,.9]],["د","ليمون:ماء 1:10","#fffde7",[1.6,3.5]]];
BX.reg("b9-1-2-1",{cols:[["d","الطبق"],["s","المحلول"],["w1","متوسّط الطول بعد أسبوع (cm)"],["w2","متوسّط الطول بعد أسبوعين (cm)"]],chart:{x:"s",y:["w1","w2"],type:"bar",xl:"نوع المحلول (بحسب درجة حموضته)",yl:"طول النبات (cm)",names:{w1:"بعد أسبوع",w2:"بعد أسبوعين"}},
 conclude:"كلما زادت حموضة محلول الري قلّ نموّ نبات الرشاد، وقد لا تنبت البذور في المحلول شديد الحموضة؛ فالمطر الحمضي يضرّ بالنباتات.",
 ans:["(تقرير) نمت بادرات الماء النقي أكثر من غيرها، وقلّ النموّ كلما زاد تركيز عصير الليمون، ولم تنبت البذور في عصير الليمون الصافي.","تذكر المصادر أن المطر الحمضي يُتلف أوراق النباتات ويُذيب العناصر الغذائية من التربة ويُضعف نموّ الجذور، وهذا يتّفق مع نتائجنا."],
 build(S,A){const dishes=AC.map((d,i)=>{const o=S.dish(120+i*185,300,72,{label:"الطبق "+(i+1)});o.d=d;o.i=i;o.paper=0;o.seeds=0;o.drops=0;return o;});
  const fp=S.g();S.tr(fp,80,455);for(let i=0;i<3;i++)S.circ(i*4,-i*4,26,{fill:"#fafafa",stroke:"#bdbdbd"},fp);S.text(4,40,"ورق ترشيح",{"font-size":12},fp);
  A.say("ضعي ورقة ترشيح في كل طبق بتري: اسحبي ورق الترشيح إلى الأطباق الأربعة.");let n=0;
  S.drag(fp,{back:true,targets:()=>dishes.filter(o=>!o.paper).map(o=>({g:o.g,pad:0,fn:async()=>{o.paper=1;S.ell(0,0,64,20,{fill:"#fff",stroke:"#e0e0e0"},o.inner);if(++n===4){S.off(fp,true);A.step(0);sol();}}}))});
  let bks;function sol(){A.say("حضّري المحاليل الأربعة: اضغطي على كل كأس لتحضير محلولها.");const lem=S.bottle(0,0,"#fff176","عصير ليمون");S.tr(lem,40,470,0,.7);const wat=S.bottle(0,0,"#bbdefb","ماء");S.tr(wat,100,470,0,.7);
    bks=AC.map((d,i)=>{const b=S.beaker(230+i*120,470,70,70,{lvl:0,label:"("+d[0]+") "+d[1]});b.d=d;return b;});let c=0;
    bks.forEach(b=>S.tap(b.g,async()=>{if(b.ok)return;b.ok=1;await b.to(.7,600,b.d[2]);if(++c===4){A.step(1);seeds();}}));}
  function seeds(){A.say("ضعي (10) بذور رشاد فوق ورقة الترشيح في كل طبق: اسحبي كيس البذور إلى كل طبق.");const pk=S.g();S.tr(pk,730,455);S.rect(-26,-34,52,60,{rx:6,fill:S.lg(["#66bb6a","#2e7d32"],1)},pk);S.emo(0,-10,"🌱",26,pk);S.text(0,16,"بذور رشاد",{"font-size":10,fill:"#fff"},pk);let k=0;
    S.drag(pk,{back:true,targets:()=>dishes.filter(o=>!o.seeds).map(o=>({g:o.g,pad:0,fn:async()=>{o.seeds=10;o.sd=[];for(let j=0;j<10;j++){const x=-50+j*11,y=R(-8,6);o.sd.push([x,y]);S.ell(x,y,3,2,{fill:"#6d4c41"},o.inner);await sleep(40);}if(++k===4){S.off(pk,true);A.step(2);drops();}}}))});}
  function drops(){A.say("أضيفي (10) قطرات من كل محلول إلى طبقه: (أ) للطبق 1، (ب) للطبق 2، (ج) للطبق 3، (د) للطبق 4 — اسحبي كل كأس إلى طبقها.");let k=0;
    bks.forEach((b,i)=>S.drag(b.g,{back:true,oy:-35,targets:()=>[{g:dishes[i].g,pad:6,fn:async()=>{await S.pour(b.g,dishes[i].g._x+40,220,-70,()=>S.stream(dishes[i].g._x+8,232,292,b.d[2],350));S.ell(0,0,60,18,{fill:b.d[2],opacity:.35},dishes[i].inner);dishes[i].drops=1;if(++k===4){A.step(3);win();}}}],miss:()=>A.toast("لكل طبق محلوله المحدّد")}));}
  function win(){A.say("ضعي الأطباق على حافة نافذة دافئة: اضغطي على زرّ النافذة.");A.ui.add(A.ui.btn("🪟 ضعي الأطباق على النافذة",async b=>{b.disabled=true;const w=S.g(S.bg);S.rect(150,40,500,150,{fill:S.lg(["#bbdefb","#e3f2fd"],1),stroke:"#8d6e63","stroke-width":8},w);S.line(400,40,400,190,{stroke:"#8d6e63","stroke-width":6},w);S.emo(560,90,"☀️",40,w);S.rect(140,188,520,14,{fill:"#a1887f"},w);
    await Promise.all(dishes.map((o,i)=>S.moveTo(o.g,215+i*125,190,600)));dishes.forEach(o=>S.tr(o.g,o.g._x,o.g._y,0,.75));bks.forEach(b=>b.g.style.display="none");A.ui.clear();A.step(4);grow();},"gold"));}
  let day=0;const meas=[0,0];function grow(){A.say("أضيفي (10) قطرات من المحلول المخصّص لكل طبق يوميًّا: اضغطي «يوم جديد» حتى يمرّ أسبوع، ثم قيسي الأطوال.");
    const lab=S.label(400,240,"اليوم 0",null,"#2f8f5b");
    dishes.forEach(o=>o.len0=o.sd.map(()=>o.i===1?0:R(.75,1.25)));
    const draw=()=>dishes.forEach(o=>{if(!o.pl)o.pl=S.g(o.inner);o.pl.innerHTML="";const L=day<=7?o.d[3][0]*day/7:o.d[3][0]+(o.d[3][1]-o.d[3][0])*(day-7)/7;o.sd.forEach(([x,y],k)=>{const l=L*o.len0[k]*10;if(l<1)return;S.path("M"+x+" "+y+" q 3 "+(-l/2)+" 0 "+(-l),{stroke:"#7cb342","stroke-width":2,fill:"none"},o.pl);if(l>10){S.ell(x-4,y-l,4,2,{fill:"#8bc34a"},o.pl);S.ell(x+4,y-l,4,2,{fill:"#8bc34a"},o.pl);}});});
    const b=A.ui.btn("☀️ يوم جديد: أضيفي 10 قطرات لكل طبق",async()=>{if(day===7&&!meas[0]){A.toast("قيسي أطوال النباتات بعد أسبوع أولًا");return;}if(day>=14)return;day++;dishes.forEach(o=>{const d=S.circ(o.g._x,o.g._y-40,4,{fill:"#42a5f5"},S.fx);S.tween(300,t=>d.setAttribute("cy",o.g._y-40+30*t)).then(()=>d.remove());});lab.set("اليوم "+day);draw();
      if(day===1)A.step(5);if(day===7||day===14){A.say("اسحبي المسطرة إلى كل طبق لقياس طول كل نبتة ("+(day===7?"بعد أسبوع":"بعد أسبوعين")+").");ruler();}},"gold");A.ui.add(b);}
  let rl=null;function ruler(){if(!rl){rl=S.ruler(560,470,200,{n:10,sub:5});}const wk=day===7?0:1;let c=0;
    if(!rl.dr){rl.dr=1;S.drag(rl,{back:true,ox:100,oy:-12,targets:()=>{const w=day===7?0:day===14?1:-1;return w<0?[]:dishes.filter(o=>!(o.m&&o.m[w]!=null)).map(o=>({g:o.g,pad:0,fn:async()=>{o.m=o.m||[];const L=o.d[3][w];const vals=o.len0.map(f=>+(L*f).toFixed(1));const avg=+(vals.reduce((a,b)=>a+b,0)/10).toFixed(1);o.m[w]=avg;
      A.obs("الطبق "+(o.i+1)+" ("+o.d[1]+") "+(w?"بعد أسبوعين":"بعد أسبوع")+": "+vals.join("، ")+" cm");if(dishes.every(x=>x.m&&x.m[w]!=null)){meas[w]=1;if(w===0){A.step(6);A.say("تابعي: اضغطي «يوم جديد» حتى ينتهي الأسبوع الثاني.");}else{A.step(7);avgBtn();}}}}));}});}}
  function avgBtn(){A.ui.clear();A.say("احسبي متوسّط طول نبتة الرشاد في كل محلول، ثم مثّليها بالأعمدة.");A.ui.add(A.ui.btn("🧮 احسبي المتوسّطات وارسمي الأعمدة",b=>{b.disabled=true;dishes.forEach(o=>A.rec({d:o.i+1,s:"("+o.d[0]+") "+o.d[1],w1:o.m[0],w2:o.m[1]}));A.obs("لم تنبت بذور عصير الليمون الصافي، وكان النموّ الأكبر في الماء النقي.");A.step(8);A.step(9);},"gold"));}
 }});

/* ---------- 4) ملاحظة الخصائص الأساسية للكائنات الحية (مقاطع فيديو) ---------- */
const CLIPS=[["عملية الإخصاب لحيوان نجم البحر","fert",["التكاثر"],"استمرار النوع وإنتاج أفراد جدد","ينقرض النوع"],
 ["انقسام خلايا نجم البحر","div",["النموّ والتطوّر"],"زيادة عدد الخلايا ونموّ الجنين وتعويض الخلايا التالفة","يتوقّف النموّ ولا تُعوَّض الخلايا"],
 ["تركيب الخلية ووظائفها: خلايا أوراق نبات الإيلوديا","cell",["التركيب الخلوي (التنظيم)"],"الخلية وحدة البناء والوظيفة في الكائن الحي","لا يمكن أن يعيش"],
 ["حركة الأميبا","amoeba",["الحركة"],"الحصول على الغذاء والابتعاد عن الخطر","لا يحصل على غذائه فيموت"],
 ["نموّ سمك الدانيو المخطّط","fish",["النموّ والتطوّر"],"الوصول إلى مرحلة البلوغ والتكاثر","يبقى صغيرًا ولا يتكاثر"]];
BX.reg("b9-1-3-0",{cols:[["v","عنوان مقطع الفيديو"],["c","خصيصة (خصائص) الحياة"],["i","أهميتها"],["p","توقّعي عند فقدانها"]],room:{table:false,wall1:"#263238",wall2:"#37474f"},
 conclude:"تشترك الكائنات الحية في خصائص الحياة: التركيب الخلوي، والتكاثر، والنموّ والتطوّر، والحركة، والاستجابة، والحاجة إلى الطاقة.",
 ans:["التكاثر يضمن استمرار النوع ونقل الصفات الوراثية للأجيال اللاحقة.","لأنها لا تتكوّن من خلايا، ولا تتكاثر وحدها خارج الخلايا الحية، ولا تقوم بعمليات حيوية مستقلّة.","لا يستطيع الحصول على غذائه أو الهرب من الخطر، فقد يموت أو يُفترس."],
 build(S,A){const scr=S.g();S.rect(100,30,600,340,{rx:16,fill:"#111",stroke:"#90a4ae","stroke-width":6},scr);const vw=S.g(scr);vw.setAttribute("clip-path",S.clip(S.mk("rect",{x:106,y:36,width:588,height:328,rx:12})));
  const ttl=S.text(400,398,"اضغطي على مقطع لمشاهدته",{"font-size":17,fill:"#fff"});let anim=0;
  const btns=CLIPS.map((c,i)=>{const g=S.g();S.tr(g,90+i*155,455);S.rect(-70,-28,140,56,{rx:12,fill:"#455a64",stroke:"#B8902A","stroke-width":2},g);S.text(0,-4,"▶ مقطع "+(i+1),{"font-size":15,fill:"#fff"},g);S.text(0,16,c[0].split(":")[0].slice(0,20),{"font-size":9,fill:"#ffecb3"},g);return g;});
  A.say("شاهدي مقاطع الفيديو: اضغطي على أحد المقاطع.");let done=0,busy=false;
  btns.forEach((b,i)=>S.tap(b,()=>{if(b.done||busy)return;busy=true;play(i);}));
  function play(i){A.step(0);const c=CLIPS[i];ttl.textContent="🎬 "+c[0];vw.innerHTML="";S.rect(106,36,588,328,{fill:i===2?"#1b5e20":i===4?"#0d47a1":"#0b3d5c"},vw);const my=++anim;const G=S.g(vw);const t0=performance.now();
    const loop=now=>{if(my!==anim)return;const t=(now-t0)/1000;G.innerHTML="";draw(c[1],t,G);requestAnimationFrame(loop);};requestAnimationFrame(loop);
    setTimeout(()=>{if(my!==anim)return;ask(i);},2500);}
  function draw(k,t,G){const cx=400,cy=200;
    if(k==="fert"){S.circ(cx,cy,70,{fill:"#ffe0b2",stroke:"#ffb74d","stroke-width":3},G);S.circ(cx,cy,14,{fill:"#ff8a65"},G);const p=Math.min(1,t/3);for(let j=0;j<10;j++){const a=j*.63,r=lerp(250,74,j===0?p:Math.min(.9,p*1.1)),x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;S.circ(x,y,5,{fill:"#e3f2fd"},G);S.path("M"+x+" "+y+" q "+Math.cos(a)*14+" "+(Math.sin(a)*14+Math.sin(t*10+j)*6)+" "+Math.cos(a)*26+" "+Math.sin(a)*26,{stroke:"#e3f2fd","stroke-width":2,fill:"none"},G);}if(p>=1)S.circ(cx,cy,80,{fill:"none",stroke:"#fff","stroke-width":3,opacity:.8},G);}
    else if(k==="div"){const n=Math.min(3,Math.floor(t/1.2));const m=1<<n;const s=70/Math.sqrt(m);for(let j=0;j<m;j++){const a=j/m*Math.PI*2,r=m>1?s*1.1:0;S.circ(cx+Math.cos(a)*r,cy+Math.sin(a)*r,s,{fill:"#ffcc80",stroke:"#ef6c00","stroke-width":2},G);S.circ(cx+Math.cos(a)*r,cy+Math.sin(a)*r,s*.25,{fill:"#8d6e63"},G);}S.text(cx,330,m+" خلية",{"font-size":16,fill:"#fff"},G);}
    else if(k==="cell"){for(let r=0;r<4;r++)for(let c=0;c<6;c++){const x=150+c*85,y=60+r*75;S.rect(x,y,80,70,{fill:"#aed581",stroke:"#33691e","stroke-width":4},G);for(let q=0;q<9;q++){const a=t*1.2+q*.7,px=x+40+Math.cos(a)*30,py=y+35+Math.sin(a)*25;S.ell(px,py,6,4,{fill:"#2e7d32"},G);}}}
    else if(k==="amoeba"){const x=200+((t*40)%400),y=200;let d="";for(let a=0;a<=Math.PI*2+.01;a+=.3){const r=55+14*Math.sin(a*3+t*3)+(Math.cos(a)>.7?20*Math.sin(t*2)+20:0);d+=(d?"L":"M")+(x+Math.cos(a)*r)+" "+(y+Math.sin(a)*r);}S.path(d+"Z",{fill:"#b3e5fc",stroke:"#0288d1","stroke-width":3,opacity:.85},G);S.circ(x-5,y,12,{fill:"#0277bd"},G);S.circ(x+90,y+20,6,{fill:"#a5d6a7"},G);}
    else{const st=Math.min(3,Math.floor(t/1));const L=[20,45,80,130][st];S.ell(cx,cy,L,L*(st?0.3:1),{fill:st?"#e0e0e0":"#fff8e1",stroke:"#90a4ae","stroke-width":3},G);if(st){S.path("M"+(cx+L)+" "+cy+" l 30 -18 l 0 36Z",{fill:"#e0e0e0"},G);for(let q=0;q<4;q++)S.line(cx-L*.6+q*L*.4,cy-L*.25,cx-L*.6+q*L*.4,cy+L*.25,{stroke:"#1565c0","stroke-width":4},G);S.circ(cx-L*.7,cy-4,4,{fill:"#000"},G);}S.text(cx,340,["بيضة","جنين","يرقة","سمكة بالغة"][st],{"font-size":16,fill:"#fff"},G);}}
  function ask(i){const c=CLIPS[i];const all=["التكاثر","النموّ والتطوّر","التركيب الخلوي (التنظيم)","الحركة","الحاجة إلى الطاقة (التغذية)"];
    pickMany(A,"«"+c[0]+"»: اختاري الخصيصة التي لاحظتِها:",all,c[2],()=>{quiz(A,[["أهمية هذه الخصيصة:",[["a",c[3]],["b","لا أهمية لها للكائن الحي"]],"a"],["توقّعي ما سيحدث للكائن الحي عند فقدانها:",[["a",c[4]],["b","لا يتأثّر"]],"a"]],()=>{
      A.rec({v:c[0],c:c[2].join("، "),i:c[3],p:c[4]});btns[i].done=1;btns[i].querySelector("rect").setAttribute("fill","#2f8f5b");anim++;busy=false;if(++done===5){A.step(1);}else A.say("أحسنتِ! اختاري مقطعًا آخر ("+done+"/5).");});});}
 }});

/* ---------- 5) أشكال الحياة في نظام بيئي (المربّع 1m×1m) ---------- */
BX.reg("b9-1-3-1",{cols:[["q","المجتمع الحيوي"],["t","النوع"],["n","العدد"],["tot","عدد الأفراد الكلي"]],room:{table:false,wall1:"#c8e6c9",wall2:"#a5d6a7"},
 conclude:"تختلف أنواع الكائنات الحية وأعدادها من مكان إلى آخر حتى في المساحة الصغيرة، ويساعد حصرها على تقييم سلامة النظام البيئي وتنوّعه الحيوي.",
 ans:["تختلف النتائج بين المجموعات لاختلاف المواقع والظروف (الضوء، الرطوبة، نوع التربة)، لكن الأعشاب تكون غالبًا الأكثر عددًا."],
 build(S,A){const T=[["أ","عشب","🌿"],["ب","زهرة برّية","🌼"],["ج","نبات البابونج","🌾"]];
  const sticks=[];for(let i=0;i<4;i++){const g=S.g();S.tr(g,100+i*45,445,90,.9);S.rect(-60,-5,120,10,{rx:3,fill:"#8d6e63"},g);sticks.push(g);}S.text(170,490,"4 قطع خشب (100cm)",{"font-size":12});
  const fr=S.g();S.tr(fr,450,220);const sides=[[0,-100,0],[100,0,90],[0,100,0],[-100,0,90]];const slots=sides.map(([x,y,r])=>S.rect(r?x-6:x-100,r?y-100:y-6,r?12:200,r?200:12,{fill:"#fff",opacity:.35,stroke:"#B8902A","stroke-width":2,"stroke-dasharray":"6 4"},fr));
  S.label(0,-130,"المربّع 100cm × 100cm",fr,"#5d4037");let placed=0;
  A.say("اصنعي المربّع مع مجموعتك: اسحبي قطع الخشب الأربع إلى أضلاع المربّع.");
  sticks.forEach(s=>S.drag(s,{targets:()=>slots.filter(x=>!x.f).map(sl=>({g:sl,pad:14,fn:async()=>{sl.f=1;const [x,y,r]=sides[slots.indexOf(sl)];s._off=true;await S.moveTo(s,450+x,220+y,250,r);S.tr(s,450+x,220+y,r,1.67);if(++placed===4)tape();return "stay";}}))}));
  function tape(){A.say("ثبّتي نقاط التقاء الزوايا بالشريط اللاصق: اضغطي على الزوايا الأربع.");let t=0;[[-100,-100],[100,-100],[100,100],[-100,100]].forEach(([x,y])=>{const c=S.circ(450+x,220+y,14,{fill:"#fff59d",stroke:"#B8902A","stroke-width":3,class:"glow"});S.tap(c,()=>{if(c.ok)return;c.ok=1;c.removeAttribute("class");c.setAttribute("fill","#bdbdbd");if(++t===4){A.say("قسّمي المربّع إلى أربعة أقسام متساوية بالخيط.");A.ui.add(A.ui.btn("🧵 قسّمي المربّع بالخيط",b=>{b.disabled=true;S.line(450,120,450,320,{stroke:"#fff","stroke-width":3});S.line(350,220,550,220,{stroke:"#fff","stroke-width":3});A.ui.clear();A.step(0);area();},"gold"));}});});}
  function area(){quiz(A,[["حدّدي مساحة العمل وهدفكِ:",[["s","حديقة المدرسة — البحث عن أنواع النباتات الصغيرة"],["n","البيئة القريبة — البحث عن أنواع النباتات الصغيرة"]],null]],()=>{A.step(1);field();});}
  function field(){S.clear();S.rect(0,0,800,500,{fill:S.lg(["#a5d6a7","#66bb6a"],1)},S.bg);for(let i=0;i<120;i++)S.path("M"+R(0,800)+" "+R(40,500)+" l 3 -12 l 3 12",{stroke:"#2e7d32","stroke-width":2,fill:"none",opacity:.5},S.bg);
    const pl=[];const W=[[7,2,1],[4,3,1],[5,1,3],[3,4,2]];
    for(let k=0;k<70;k++){const ti=k%3;const e=S.emo(R(30,560),R(60,470),T[ti][2],ti?22:26);pl.push(e);}
    const q=S.g();S.tr(q,680,400,0,.5);S.rect(-100,-100,200,200,{fill:"rgba(255,255,255,.08)",stroke:"#8d6e63","stroke-width":10},q);S.line(0,-100,0,100,{stroke:"#fff","stroke-width":3},q);S.line(-100,0,100,0,{stroke:"#fff","stroke-width":3},q);
    A.say("ضعي المربّع على قطعة من الأرض توجد فيها نباتات مختلفة: اسحبيه إلى الأرض.");let set=false;
    S.drag(q,{free:true,targets:()=>[{box:[0,0,800,500],pad:0,fn:async()=>{if(set)return;set=true;q._off=true;S.tr(q,clamp(q._x,130,560),clamp(q._y,130,380),0,1);q.parentNode.insertBefore(q,q.parentNode.firstChild);A.step(2);count(q,pl,W);return "stay";}}]});}
  function count(q,pl,W){const x0=q._x-100,y0=q._y-100;pl.forEach(o=>{const b=o.getBBox(),cx=b.x+b.width/2,cy=b.y+b.height/2;if(cx>x0-10&&cx<x0+210&&cy>y0-10&&cy<y0+210)o.remove();else o.setAttribute("opacity",.3);});
    const QS=[[1,0],[0,0],[1,1],[0,1]];const items=[];QS.forEach(([qx,qy],qi)=>{const n=W[qi];let k=0;T.forEach((t,ti)=>{for(let j=0;j<n[ti];j++){const cx=x0+qx*100+14+(k%4)*24+R(-2,2),cy=y0+qy*100+18+Math.floor(k/4)*24+R(-2,2);const e=S.emo(cx,cy,t[2],17);e.t=ti;e.q=qi;items.push(e);k++;}});S.label(x0+qx*100+50,y0+qy*100+92,String(qi+1),null,"#5d4037");});
    const cnt=QS.map(()=>[0,0,0]);let left=items.length;A.say("عُدّي أفراد كل نوع داخل كل من المربّعات الأربعة: اضغطي على كل نبتة مرّة واحدة.");
    items.forEach(o=>S.tap(o,()=>{if(o._c)return;o._c=1;cnt[o.q][o.t]++;o.setAttribute("opacity",.4);if(--left===0){QS.forEach((_,qi)=>{const tot=cnt[qi].reduce((a,b)=>a+b,0);T.forEach((t,ti)=>A.rec({q:qi+1,t:t[0]+": "+t[1],n:cnt[qi][ti],tot:ti===0?tot:""}));});A.step(3);others(q);}else A.say("باقي "+left+" نبتة…");}));}
  function others(q){A.say("دوّني أعداد كائنات أخرى، مثل دودة الأرض والنمل: اضغطي عليها.");const O=[["🪱","دودة الأرض",2],["🐜","النمل",5]];let left=7;const c={};
    O.forEach(([e,t,n])=>{for(let j=0;j<n;j++){const o=S.emo(q._x-85+R(5,170),q._y-85+R(5,170),e,20);S.tap(o,()=>{if(o._c)return;o._c=1;c[t]=(c[t]||0)+1;o.setAttribute("opacity",.4);if(--left===0){O.forEach(([e,t])=>A.rec({q:"المربّع كاملًا",t:e+" "+t,n:c[t],tot:""}));A.obs("مجموعة أخرى سجّلت مثلًا: عشب 25، زهرة برّية 21، بابونج 9 — تختلف الأعداد باختلاف الموقع.");A.step(4);}});}});}
 }});

/* ---------- 6) خلايا نباتية وحيوانية بالمجهر الضوئي المركّب ---------- */
const SLD=[["خلايا كبد","liver","حيوانية"],["خلايا بصل","onion","نباتية"],["خلايا عصبية","nerve","حيوانية"],["خلايا ورقة نبات","leaf","نباتية"]];
BX.reg("b9-2-1-0",{cols:[["n","رقم الشريحة"],["see","العضيّات والتراكيب التي شاهدتُها"],["nm","اسم الشريحة"],["k","نوع الخلايا"]],
 conclude:"تتميّز الخلايا النباتية بالجدار الخلوي (والبلاستيدات الخضراء في الخلايا الخضراء) وشكلها المنتظم، أما الخلايا الحيوانية فليس لها جدار خلوي وأشكالها متنوّعة.",
 ans:["نباتية: خلايا البصل وخلايا ورقة النبات (لوجود الجدار الخلوي والشكل المنتظم، والبلاستيدات الخضراء في الورقة). حيوانية: خلايا الكبد والخلايا العصبية (لا جدار خلوي ولا بلاستيدات، وأشكال غير منتظمة)."],
 build(S,A){const order=[2,0,3,1];
  const sl=order.map((si,i)=>{const g=S.g();S.tr(g,90+i*130,460);S.rect(-58,-14,116,28,{rx:3,fill:"#e1f5fe",stroke:"#81d4fa","stroke-width":2,opacity:.95},g);S.ell(-18,0,16,7,{fill:["#f48fb1","#d7ccc8","#b39ddb","#a5d6a7"][si],opacity:.8},g);g.nm=S.text(30,4,SLD[si][0],{"font-size":10,fill:"#37474f"},g);g.si=si;return g;});
  A.say("غطّي الاسم المكتوب على كل شريحة بقصاصة ورقية بيضاء: اضغطي على الشرائح الأربع.");let c=0;
  sl.forEach(g=>S.tap(g,()=>{if(g.cov)return;g.cov=S.rect(4,-10,52,20,{fill:"#fff",stroke:"#ccc"},g);if(++c===4){A.step(0);A.say("رقّمي الشرائح بالأرقام (1–4): اضغطي على كل شريحة بالترتيب.");let k=0;sl.forEach(h=>S.tap(h,()=>{if(h.num||!h.cov)return;h.num=++k;S.text(30,5,String(k),{"font-size":14,fill:"#c62828"},h);if(k===4){A.step(1);scope();}}));}}));
  let cur=null,obj=4,focus=0;const seen={};
  function scope(){const view=S.g();S.tr(view,190,185);const g=S.g();S.tr(g,620,400);S.path("M-70 0 L70 0 L60 -20 L-60 -20Z",{fill:"#37474f"},g);S.path("M30 -20 C 60 -80 60 -180 20 -250",{stroke:"#455a64","stroke-width":26,fill:"none","stroke-linecap":"round"},g);S.rect(-60,-120,110,12,{fill:"#263238",rx:3},g);
    S.rect(-14,-300,26,110,{fill:"#455a64",rx:5,transform:"rotate(-15)"},g);S.rect(-30,-195,30,40,{fill:"#607d8b",rx:4},g);S.circ(50,-110,16,{fill:"#546e7a"},g);S.circ(-10,-60,10,{fill:"#fff59d"},g);S.label(0,-320,"مجهر ضوئي مركّب",g,"#37474f");
    S.circ(0,0,150,{fill:"#111"},view);const cells=S.g(view);cells.setAttribute("clip-path",S.clip(S.mk("circle",{r:140})));S.circ(0,0,142,{fill:"none",stroke:"#263238","stroke-width":10},view);const lab=S.label(0,168,"اسحبي شريحة إلى منصّة المجهر",view,"#263238");
    A.say("افحصي الشرائح: اسحبي كل شريحة إلى منصّة المجهر، واختاري قوّة التكبير المناسبة وحرّكي الضابط.");
    sl.forEach(s=>S.drag(s,{back:true,targets:()=>[{g,pad:0,fn:()=>{cur=s;A.step(2);draw();return false;}}]}));
    A.ui.choice("العدسة الشيئية",[[4,"×4"],[10,"×10"],[40,"×40"]],v=>{obj=v;draw();},4);A.ui.slider("🔧 الضابط (التركيز)",0,100,1,0,v=>{focus=v;draw();});
    const CP=Array.from({length:30},()=>[R(-120,120),R(-120,120),R(.8,1.2)]);
    function draw(){cells.innerHTML="";if(!cur)return;const k=SLD[cur.si][1],blur=Math.abs(focus-50)/12,z=Math.sqrt(obj);const grp=S.g(cells);if(blur>.6)grp.setAttribute("style","filter:blur("+blur.toFixed(1)+"px)");
      S.circ(0,0,140,{fill:{liver:"#fce4ec",onion:"#fff8e1",nerve:"#ede7f6",leaf:"#f1f8e9"}[k]},grp);
      if(k==="onion"||k==="leaf"){const w=24*z,hh=k==="onion"?w*.4:w*.7;for(let r=-9;r<=9;r++)for(let c=-7;c<=7;c++){const x=c*w+(r%2?w/2:0),y=r*hh;if(Math.abs(x)>170||Math.abs(y)>170)continue;S.rect(x-w/2,y-hh/2,w-2,hh-2,{fill:k==="onion"?"#ffe0b2":"#c5e1a5",stroke:k==="onion"?"#8d6e63":"#33691e","stroke-width":Math.max(1.5,z*.9),rx:2},grp);
        if(k==="onion")S.ell(x+w*.15,y,hh*.2,hh*.18,{fill:"#6d4c41"},grp);else{for(let q=0;q<5;q++)S.ell(x-w*.3+q*w*.15,y+(q%2?hh*.2:-hh*.2),w*.05,w*.035,{fill:"#2e7d32"},grp);S.ell(x,y,w*.08,w*.07,{fill:"#5d4037",opacity:.7},grp);}}}
      else if(k==="liver"){const w=22*z;for(let r=-8;r<=8;r++)for(let c=-8;c<=8;c++){const x=c*w*.9+(r%2?w*.45:0),y=r*w*.78;if(Math.abs(x)>170||Math.abs(y)>170)continue;let d="";for(let a=0;a<6;a++){const an=a*Math.PI/3+.5;d+=(a?"L":"M")+(x+Math.cos(an)*w*.5)+" "+(y+Math.sin(an)*w*.5);}S.path(d+"Z",{fill:"#f8bbd0",stroke:"#ad1457","stroke-width":1},grp);S.circ(x,y,w*.12,{fill:"#6a1b9a"},grp);}}
      else{CP.slice(0,Math.round(8/z)+1).forEach(([x,y,s])=>{const r=10*z*s;for(let q=0;q<6;q++){const a=q*1.05+s;S.path("M"+x+" "+y+" q "+Math.cos(a)*r*2+" "+Math.sin(a)*r*2+" "+Math.cos(a+.3)*r*4+" "+Math.sin(a+.3)*r*4,{stroke:"#7e57c2","stroke-width":Math.max(1,z*.6),fill:"none"},grp);}S.circ(x,y,r,{fill:"#b39ddb",stroke:"#5e35b1","stroke-width":1.5},grp);S.circ(x,y,r*.35,{fill:"#4527a0"},grp);});}
      lab.set("الشريحة "+cur.num+" · التكبير ×"+(obj*10)+(blur>.6?" · حرّكي الضابط":""));
      if(blur<=.6&&obj>=10&&!seen[cur.si]){seen[cur.si]=1;cur.see={liver:"خلايا متعدّدة الأضلاع، نواة واضحة، غشاء خلوي، لا جدار",onion:"خلايا مستطيلة منتظمة، جدار خلوي، نواة",nerve:"جسم خلية ونواة وزوائد متفرّعة طويلة، لا جدار",leaf:"خلايا منتظمة، جدار خلوي، بلاستيدات خضراء، نواة"}[k];
        A.obs("الشريحة "+cur.num+": "+cur.see);A.toast("📝 سُجّلت ملاحظاتكِ ورسمكِ للشريحة "+cur.num);if(Object.keys(seen).length===4){A.step(3);A.step(4);compare();}}}}
  function compare(){A.ui.clear();let k=0;const S2=sl.slice().sort((a,b)=>a.num-b.num);
    const ask=()=>{if(k>=4){A.step(5);A.ui.clear();A.ui.add(A.ui.btn("💬 شاركتُ زميلاتي النتائج",b=>{b.disabled=true;A.step(6);},"gold"));return;}const s=S2[k];A.say("قارني الشريحة "+s.num+" بالأشكال المرفقة في الكتاب: ما اسمها؟");A.ui.clear();
      A.ui.choice("الشريحة "+s.num+":",SLD.map((d,i)=>[i,d[0]]),v=>{if(v!==s.si){A.toast("قارني الشكل جيدًا…");return;}A.rec({n:s.num,see:s.see,nm:SLD[s.si][0],k:SLD[s.si][2]});k++;ask();});};ask();}
 }});

/* ---------- 7) أثر درجة الحرارة في الانتشار (الشمندر) ---------- */
BX.reg("b9-2-1-1",{cols:[["n","الأنبوب"],["t","درجة الحرارة"],["c","لون الماء بعد 5min"]],
 conclude:"يزداد معدّل الانتشار بارتفاع درجة الحرارة؛ فتنتشر صبغة الشمندر في الماء الأسخن أسرع وأكثر.",
 ans:["الأنبوب (1) لونه وردي فاتح جدًّا، والأنبوب (2) وردي، والأنبوب (3) أحمر داكن.","كلما ارتفعت درجة الحرارة زاد معدّل الانتشار؛ لزيادة الطاقة الحركية للجزيئات (وتأثّر أغشية الخلايا بالحرارة).","—"],
 build(S,A){const TT=[25,40,90];const tubes=[0,1,2].map(i=>{const t=S.tube(90+i*60,440,130,{w:36,lvl:0,col:"#f5fbff"});t.i=i;return t;});S.rect(60,350,160,10,{fill:"#8d6e63"});S.text(150,472,"حامل الأنابيب",{"font-size":12});
  const cyl=S.cylinder(290,470,110,{w:34,col:"#e3f2fd",lvl:.9,label:"15 mL"});let n=0;
  A.say("ضعي 15mL من الماء المقطّر في كل من الأنابيب الثلاثة: اسحبي المخبار إلى كل أنبوب.");
  S.drag(cyl.g,{back:true,oy:-55,targets:()=>tubes.filter(t=>!t.fw).map(t=>({g:t.g,pad:10,fn:async()=>{t.fw=1;await S.pour(cyl.g,t.g._x+40,230,-75,()=>t.to(.55,500,"#f5fbff"));if(++n===3){A.ui.add(A.ui.btn("🔢 رقّمي الأنابيب (1–3)",b=>{b.disabled=true;tubes.forEach((t,i)=>S.label(0,-150,String(i+1),t.g,"#7A1F2E"));A.ui.clear();A.step(0);baths();},"gold"));}}}))});
  let B;function baths(){A.say("ضعي الأنبوب (1) في درجة حرارة الغرفة، والأنبوب (2) في حمّام مائي 40°C، والأنبوب (3) في حمّام مائي 90°C: اسحبي الأنبوبين 2 و3.");
    B=[null,S.beaker(470,392,130,120,{col:"#ffe0b2",lvl:.65,label:"حمّام مائي 40°C"}),S.beaker(650,392,130,120,{col:"#ffab91",lvl:.65,label:"حمّام مائي 90°C"})];S.bubbles(650,330,100,8,{h:50});S.label(90,290,"25°C",null,"#1565c0");let k=0;
    [1,2].forEach(i=>S.drag(tubes[i].g,{targets:()=>[{g:B[i].g,pad:6,fn:async()=>{tubes[i].g._off=true;await S.moveTo(tubes[i].g,B[i].g._x,385,350);if(++k===2){A.step(1);beet();}return "stay";}}],miss:()=>A.toast(i===1?"الأنبوب 2 في حمّام 40°C":"الأنبوب 3 في حمّام 90°C"),back:true}));}
  function beet(){A.say("ضعي قطعة من الشمندر في كل أنبوب: اسحبي القطع.");let k=0;[0,1,2].forEach(j=>{const p=S.g();S.tr(p,330+j*30,470);S.rect(-8,-16,16,32,{rx:3,fill:"#880e4f"},p);
    S.drag(p,{targets:()=>tubes.filter(t=>!t.b).map(t=>({g:t.g,pad:8,fn:async()=>{t.b=1;p.remove();S.rect(-7,-50,14,26,{rx:3,fill:"#880e4f"},t.inner);if(++k===3){A.step(2);watch();}}})),back:true});});}
  function watch(){A.say("راقبي لون الماء في كل أنبوب مدّة 5min: حرّكي شريط الزمن.");const w=S.watch(330,130);let r1=0;const K=[.08,.3,.9];
    A.ui.slider("⏱️ الزمن (دقيقة)",0,5,.5,0,m=>{w.set(m*60);tubes.forEach((t,i)=>t.set(null,mix("#f5fbff","#ad1457",clamp(K[i]*m/5*1.05,0,.95))));
      if(m>=5&&!r1){r1=1;const C5=["وردي فاتح جدًّا","وردي","أحمر داكن"];tubes.forEach((t,i)=>A.rec({n:i+1,t:TT[i]+" °C",c:C5[i]}));A.obs("كلما ارتفعت درجة الحرارة أصبح لون الماء أحمر أغمق (انتشار أكبر لصبغة الشمندر).");A.step(3);}});}
 }});

/* ---------- 8) أثر تراكيز الغلوكوز في كتلة البطاطا ---------- */
BX.reg("b9-2-1-2",{cols:[["c","تركيز الغلوكوز (mol/dm³)"],["m2","الكتلة النهائية (g)"],["p","النسبة المئوية للتغيّر في الكتلة %"]],chart:{x:"c",y:"p",xl:"تركيز الغلوكوز",yl:"النسبة المئوية للتغيّر في الكتلة %"},
 conclude:"تكتسب قطع البطاطا الماء في الماء المقطّر والمحاليل المخفّفة فتزداد كتلتها، وتفقده في المحاليل المركّزة فتقلّ كتلتها، بالخاصية الأسموزية.",
 ans:["كلما زاد تركيز محلول الغلوكوز قلّت كتلة قطعة البطاطا؛ فقد زادت في الماء المقطّر و0.2، ونقصت في التراكيز الأعلى.","تنتقل جزيئات الماء من الوسط الأقل تركيزًا بالمادة المذابة إلى الأكثر تركيزًا بها؛ فتزداد الكتلة النسبية أو تقلّ حسب اتجاه حركة الماء.","القيمة السالبة تعني نقصان الكتلة؛ أي أن قطعة البطاطا فقدت الماء لأن المحلول أكثر تركيزًا من عصارة خلاياها.","—","—"],
 build(S,A){const C=[0,.2,.4,.6,.8,1.0],P=[12.4,3.1,-4.2,-9.6,-14.8,-19.5],m1=5.00;const bal=S.balance(110,392);const tubes=[];
  S.rect(250,350,520,12,{fill:"#8d6e63"});
  C.forEach((c,i)=>{const t=S.tube(290+i*88,440,150,{w:44,lvl:0,col:mix("#e3f2fd","#ffe082",c)});tubes.push(t);});
  A.say("ضعي أنابيب الاختبار في الحامل ورقّميها (1–6): اضغطي على الأنابيب.");let k=0;
  tubes.forEach((t,i)=>S.tap(t.g,()=>{if(t.num)return;t.num=1;S.label(0,-165,String(i+1),t.g,"#7A1F2E");if(++k===6){A.step(0);fill();}}));
  function fill(){A.say("ضعي 5mL ماء مقطّر في الأنبوب (1)، ومحاليل الغلوكوز مرتّبة في بقية الأنابيب: اسحبي كل زجاجة إلى أنبوبها.");let n=0;
    C.forEach((c,i)=>{const b=S.bottle(0,0,mix("#e3f2fd","#ffe082",c),c?c.toFixed(1):"ماء مقطّر");S.tr(b,40+i*40,470,0,.5);
      S.drag(b,{back:true,oy:-30,targets:()=>[{g:tubes[i].g,pad:6,fn:async()=>{await S.pour(b,tubes[i].g._x+40,230,-75,()=>tubes[i].to(.5,400));S.label(0,26,c.toFixed(1),tubes[i].g,"#455a64");S.off(b,true);if(++n===6){A.step(1);pieces();}}}],miss:()=>A.toast("بالترتيب: الماء المقطّر للأنبوب 1، ثم 0.2… حتى 1.0 للأنبوب 6")});});}
  const pcs=[];function pieces(){A.say("ضعي قطعة بطاطا (5.00g) في كل أنبوب: اسحبي القطع إلى الأنابيب.");let n=0;
    for(let i=0;i<6;i++){const p=S.g();S.tr(p,40+i*36,470);S.rect(-9,-34,18,34,{rx:4,fill:S.lg(["#fff3c4","#f5d98b"]),stroke:"#c9a227","stroke-width":2},p);pcs.push(p);
      S.drag(p,{back:true,oy:-17,targets:()=>tubes.filter(t=>!t.p).map(t=>({g:t.g,pad:4,fn:async()=>{t.p=p;p.ti=tubes.indexOf(t);p._off=true;await S.moveTo(p,t.g._x,t.g._y-40,250);t.g.append(p);S.tr(p,0,-40);if(++n===6){A.ui.add(A.ui.btn("⏩ اتركيها مدّة 3 ساعات",async b=>{b.disabled=true;await S.tween(1500,tt=>pcs.forEach(q=>q.setAttribute("transform","translate(0 -40) scale("+(1+P[q.ti]/100*tt)+")")));A.ui.clear();A.step(2);out();},"gold"));}return "stay";}}))});}}
  function out(){A.say("أخرجي القطع وجفّفيها بورق التجفيف، ثم زنيها: اسحبي كل قطعة إلى الميزان.");S.rect(170,410,70,24,{fill:"#fafafa",stroke:"#ccc"});S.text(205,450,"ورق تجفيف",{"font-size":11});let n=0;
    pcs.forEach(p=>{p._off=false;const t=tubes[p.ti];S.layer.append(p);S.tr(p,t.g._x,t.g._y-40,0,1+P[p.ti]/100);
      S.drag(p,{back:true,oy:-17,targets:()=>p.w?[]:[{g:bal.g,pad:10,fn:async()=>{p.w=1;await S.moveTo(p,205,415,250);await sleep(300);await S.moveTo(p,110,342,300);const m2=+(m1*(1+P[p.ti]/100)).toFixed(2);bal.set(m2);
        p.m2=m2;S.label(0,-50-(p.ti%2)*24,m2+" g",p,"#1d7f8c");await sleep(700);bal.set(0);if(++n===6){A.step(3);calc();}return false;}}]});});}
  function calc(){A.say("لاحظي التغيّر واحسبي النسبة المئوية للتغيّر في كتلة كل قطعة، ثم دوّني النتائج في الجدول.");A.ui.add(A.ui.btn("🧮 احسبي: (الكتلة النهائية − 5.00) ÷ 5.00 × 100%",b=>{b.disabled=true;pcs.slice().sort((a,b)=>a.ti-b.ti).forEach(p=>A.rec({c:C[p.ti].toFixed(1),m2:p.m2,p:+((p.m2-m1)/m1*100).toFixed(1)}));A.step(4);A.step(5);},"gold"));}
 }});

/* ---------- 9) معدّل التنفّس الخلوي وأزرق الميثيلين ---------- */
const TEMPS=[25,30,35,40,45,50],TIME={25:320,30:235,35:165,40:110,45:140,50:260};
BX.reg("b9-2-2-0",{cols:[["T","درجة الحرارة (°C)"],["t","الزمن اللازم لاختفاء لون المحلول (s)"],["r","معدّل التنفّس الخلوي (s⁻¹)"]],chart:{x:"T",y:"r",xl:"درجة الحرارة (°C)",yl:"معدّل التنفّس الخلوي (s⁻¹)"},
 conclude:"يزداد معدّل التنفّس الخلوي في الخميرة بارتفاع درجة الحرارة حتى درجة مثلى (نحو 40°C)، ثم يقلّ عند ارتفاعها أكثر.",
 ans:["الأنبوب (1) بلا سكّر: يبيّن أن الخميرة تحتاج إلى السكّر (الغذاء) لتتنفّس. الأنبوب (2): نقيس فيه زمن اختفاء اللون. كاشف أزرق الميثيلين: يختفي لونه عند استهلاك الأكسجين، فيدلّ على حدوث التنفّس. (والأنبوب 3 بالماء المغلي ضابط).","(رسم بياني: المحور السيني درجة الحرارة، والصادي معدّل التنفّس الخلوي)","يزداد المعدّل بزيادة درجة الحرارة حتى نحو 40°C ثم يقلّ."],
 build(S,A){const tubes=[0,1,2].map(i=>{const t=S.tube(120+i*80,440,140,{w:40,lvl:0,col:"#e3f2fd"});t.c={};return t;});S.rect(80,345,200,10,{fill:"#8d6e63"});
  A.say("رقّمي الأنابيب (1–3): اضغطي على الأنابيب.");let k=0;tubes.forEach((t,i)=>S.tap(t.g,()=>{if(t.num)return;t.num=1;S.label(0,-155,String(i+1),t.g,"#7A1F2E");if(++k===3){A.step(0);fill();}}));
  const NEED=[["w","y","mb"],["w","s","y","mb"],["bw","s","y","mb"]];
  function fill(){A.say("ضعي المواد كما في الجدول: (1) ماء + خميرة، (2) ماء + سكّر + خميرة، (3) ماء مغلي + سكّر + خميرة، ونقطتين من أزرق الميثيلين في كل أنبوب.");
    const R0=[["w","ماء 20mL","#bbdefb"],["bw","ماء مغلي 20mL","#ffccbc"],["s","سكّر 0.5g","#fafafa"],["y","خميرة 1g","#d7ccc8"],["mb","أزرق الميثيلين","#1565c0"]];
    R0.forEach(([id,t,c],i)=>{const g=S.g();S.tr(g,370+i*88,470);if(id==="mb")S.dropper(0,-10,"#1565c0",{par:g,bulb:"#0d47a1"});else{S.rect(-28,-46,56,46,{rx:8,fill:c,stroke:"#8d6e63","stroke-width":2},g);}S.text(0,20,t,{"font-size":11},g);
      S.drag(g,{back:true,oy:-25,targets:()=>tubes.map((tb,j)=>({g:tb.g,pad:8,fn:async()=>{if(!NEED[j].includes(id)){A.toast("الأنبوب "+(j+1)+" لا يحتاج إلى "+t);return false;}if(tb.c[id]){A.toast("أُضيف سابقًا");return false;}tb.c[id]=1;
        if(id==="w"||id==="bw")await tb.to(.5,400,"#e3f2fd");else if(id==="y")for(let q=0;q<8;q++)S.circ(R(-12,12),-R(4,40),2.5,{fill:"#a1887f"},tb.inner);else if(id==="s")for(let q=0;q<8;q++)S.circ(R(-12,12),-R(4,40),1.8,{fill:"#fff"},tb.inner);else tb.set(null,"#1e88e5");
        if(tubes.every((x,jj)=>NEED[jj].every(n=>x.c[n]))){A.step(1);bath();}}}))});});}
  let T=null,done={},th;function bath(){A.say("ضعي الأنابيب في حمّام مائي ضُبطت درجة حرارته على 25°C: اختاري درجة الحرارة.");const wb=S.beaker(650,392,200,150,{col:"#ffe0b2",lvl:.35,label:"حمّام مائي"});S.layer.insertBefore(wb.g,S.layer.firstChild);th=S.label(520,240,"",null,"#c62828");
    A.ui.clear();A.ui.choice("🌡️ درجة حرارة الحمّام المائي",TEMPS.map(t=>[t,t+"°C"]),v=>{if(v!==25&&!done[25]){A.toast("ابدئي بـ 25°C كما في الخطوة (3)");return;}if(done[v]){A.toast("سُجّلت هذه الدرجة");return;}if(run){A.toast("أكملي القياس الحالي أولًا");return;}T=v;th.set(v+" °C");start();});}
  let run=null,hook=null;S.tap(tubes[1].g,()=>hook&&hook());
  function start(){tubes.forEach((t,i)=>{t.set(null,"#1e88e5");S.tr(t.g,600+i*50,385);});if(!A.is(2))A.step(2);const w=S.watch(450,130);const sp=20,t0=performance.now();const tt=TIME[T];A.say("احسبي الزمن اللازم لاختفاء اللون الأزرق من الأنبوب (2): اضغطي على الأنبوب (2) لحظة اختفاء اللون (الساعة مسرَّعة ×20).");
    const bub=S.bubbles(650,380,40,6,{h:60});const me={stop:false};run=me;
    const f=()=>{if(me.stop)return;const s=(performance.now()-t0)/1000*sp;w.set(s);const p=clamp(s/tt,0,1);tubes[1].set(null,mix("#1e88e5","#fff3e0",p));tubes[1].p=p;requestAnimationFrame(f);};requestAnimationFrame(f);
    hook=()=>{if(run!==me)return;if(tubes[1].p<.95){A.toast("ما زال اللون أزرق…");return;}me.stop=true;run=null;hook=null;bub.remove();w.g.remove();const t=Math.round(tt*R(.97,1.03));done[T]=t;A.rec({T,t,r:(1/t).toFixed(4)});A.obs("عند "+T+"°C: اختفى اللون الأزرق من الأنبوب (2) بعد "+t+" s، وبقي الأنبوبان (1) و(3) أزرقين.");
      if(T===25)A.step(3);const left=TEMPS.filter(x=>!done[x]);if(!left.length){A.step(4);A.ui.clear();A.ui.add(A.ui.btn("🧮 احسبي معدّل التنفّس الخلوي = 1 ÷ الزمن",b=>{b.disabled=true;A.step(5);},"gold"));}else A.say("كرّري الخطوات بحمّام مائي درجة حرارته "+left[0]+"°C: اختاري الدرجة.");};}
 }});

/* ---------- 10) الكشف عن النشا ---------- */
BX.reg("b9-2-2-1",{cols:[["l","أوراق النبات"],["c","اللون بعد إضافة محلول لوغول"],["r","النتيجة"]],
 conclude:"أوراق النبات المعرّضة للضوء تحتوي على النشا (تتلوّن بالأزرق الداكن مع محلول لوغول)، أما المغطّاة بورق الألمنيوم فلا تحتوي عليه؛ فالضوء ضروري لعملية البناء الضوئي.",
 ans:["لقتل الخلايا وإيقاف التفاعلات الحيوية فيها، وتليين الورقة وإتلاف أغشية الخلايا ليسهل خروج الكلوروفيل ودخول المحلول.","لإذابة الكلوروفيل وإزالة اللون الأخضر من الأوراق حتى يظهر لون محلول لوغول بوضوح.","تلوّنت الأوراق المعرّضة للضوء باللون الأزرق الداكن؛ لاحتوائها على النشا.","الضوء ضروري لعملية البناء الضوئي؛ فالأوراق المغطّاة لم تُنتج النشا."],
 build(S,A){S.burner(230,392,{on:true});const hot=S.beaker(230,240,150,110,{col:"#e3f2fd",lvl:.7,label:"ماء يغلي"});S.rect(145,236,170,8,{fill:"#78909c"});S.bubbles(230,232,120,12,{h:70});
  const al=S.tube(230,215,110,{w:44,lvl:.6,col:"#fffde7"});al.g.style.display="none";S.label(0,-125,"كحول إيثيلي",al.g,"#6d4c41");
  const mk=(i)=>{const g=S.g();S.tr(g,500+i*150,460);for(let q=0;q<2;q++)S.path("M"+(q*14-7)+" 0 C "+(q*14-47)+" -20 "+(q*14-47)+" -70 "+(q*14-7)+" -90 C "+(q*14+33)+" -70 "+(q*14+33)+" -20 "+(q*14-7)+" 0Z",{fill:"#43a047",stroke:"#1b5e20","stroke-width":2},g);
    if(i){g.foil=S.path("M-50 -95 L40 -95 L46 4 L-46 4Z",{fill:S.lg(["#eceff1","#b0bec5","#eceff1"]),stroke:"#90a4ae"},g);}S.text(0,24,i?"مغطّاة بالألمنيوم 24h":"☀️ تعرّضت للضوء",{"font-size":11},g);g.i=i;g.st=0;return g;};
  const lv=[mk(0),mk(1)];const setCol=(g,c)=>g.querySelectorAll("path").forEach(p=>{if(p!==g.foil)p.setAttribute("fill",c);});
  let cur=0;const nap=S.g();S.tr(nap,600,330);S.rect(-90,-20,180,40,{rx:4,fill:"#fafafa",stroke:"#ccc"},nap);S.text(0,40,"ورق نشّاف",{"font-size":11},nap);
  const watch=S.watch(90,150);
  A.say("ضعي أوراق النبات التي تعرّضت للضوء في ماء يغلي مدّة 30s: اسحبيها إلى الكأس.");
  lv.forEach(g=>S.drag(g,{back:true,oy:-45,targets:()=>{if(g.i!==cur)return [];if(g.st===0)return [{g:hot.g,fn:async()=>{g.st=1;await S.moveTo(g,230,230,300);for(let s=0;s<=30;s+=2){watch.set(s);await sleep(35);}setCol(g,"#689f38");A.toast("مرّت 30s");if(cur===0)A.step(0);al.g.style.display="";A.say("أخرجي الأوراق وضعيها في أنبوب الكحول الإيثيلي، وضعي الأنبوب في الماء المغلي حتى يختفي اللون الأخضر: اسحبيها إلى الأنبوب.");return false;}}];
    if(g.st===1)return [{g:al.g,fn:async()=>{g.st=2;await S.moveTo(g,230,200,300);await S.tween(1600,t=>{setCol(g,mix("#689f38","#f1f8e9",t));al.set(null,mix("#fffde7","#66bb6a",t*.7));});if(cur===0)A.step(1);A.say("أخرجي الأوراق بالملقط واغسليها، ثم ضعيها على ورقة النشّاف: اسحبيها.");return false;}}];
    if(g.st===2)return [{g:nap,fn:async()=>{g.st=3;g._off=true;await S.moveTo(g,600+(g.i?45:-45),360,300);S.tr(g,g._x,g._y,0,.7);const tx=g.querySelector("text");if(tx)tx.style.display="none";if(cur===0)A.step(2);A.say("أضيفي بضع قطرات من محلول لوغول إلى الأوراق: اسحبي القطّارة.");return "stay";}}];return [];}}));
  const lg=S.dropper(760,440,"#8d6e00",{label:"لوغول",bulb:"#6d4c41"});
  S.drag(lg,{back:true,oy:10,targets:()=>lv.filter(g=>g.st===3).map(g=>({g,fn:async()=>{g.st=4;const c=g.i?"#c79a3c":"#1a237e";await S.tween(900,t=>setCol(g,mix("#f1f8e9",c,t)));
    A.rec({l:g.i?"مغطّاة بورق الألمنيوم":"معرّضة للضوء",c:g.i?"بنّي مصفرّ (لون محلول لوغول)":"أزرق داكن",r:g.i?"لا تحتوي على النشا":"تحتوي على النشا"});
    if(g.i===0){A.step(3);cur=1;lv[1].foil.remove();lv[1].foil=null;al.set(null,"#fffde7");A.say("كرّري الخطوات باستخدام الأوراق المغطّاة بورق الألمنيوم (بعد نزع الورق): ابدئي بالماء الذي يغلي.");}else{A.obs("تلوّنت الأوراق المعرّضة للضوء بالأزرق الداكن، وبقيت المغطّاة بلون محلول لوغول البنّي.");A.step(4);}}}))});
 }});
})();
