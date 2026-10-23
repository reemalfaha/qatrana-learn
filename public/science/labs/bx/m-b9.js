/* تجارب العلوم الحياتية — الصف التاسع (كتاب الأنشطة والتجارب العملية) */
(function(){const {sleep,lerp,clamp,mix}=BX;
const R=(a,b)=>a+Math.random()*(b-a);

/* ---------- 1) أثر درجة الحرارة في نموّ عفن الخبز ---------- */
BX.reg("b9-1-1-0",{cols:[["day","اليوم"],["f","الثلّاجة"],["c","الخزانة المظلمة"],["w","المكان الدافئ المظلم"]],
 chart:{x:"day",y:["f","c","w"],xl:"الزمن (يوم)",yl:"عدد المربّعات المغطّاة بالعفن",names:{f:"الثلّاجة 4°C",c:"الخزانة 20°C",w:"الدافئ 30°C"}},
 conclude:"كلما ارتفعت درجة الحرارة (ضمن مدى مناسب) زاد نموّ عفن الخبز؛ والتبريد يبطئ نموّ العفن ولذلك نحفظ الطعام في الثلّاجة.",
 ans:["المتغيّر المستقل: درجة الحرارة. المتغيّر التابع: نموّ العفن (عدد المربّعات التي غطّاها العفن).","في المكان الدافئ المظلم؛ لأن الحرارة المعتدلة والرطوبة تناسب نشاط فطر العفن وتكاثره.","لضبط المتغيّرات؛ حتى يكون الاختلاف في النتائج ناتجًا عن درجة الحرارة وحدها (اختبار عادل)."],
 build(S,A){const P=[["f","الثلّاجة",4,"#90caf9"],["c","خزانة مظلمة",20,"#8d6e63"],["w","مكان دافئ مظلم",30,"#ff8a65"]];
  /* المرحلة 1: التوقّع */
  A.ui.choice("توقّعكِ: أين ينمو العفن أكثر؟",P.map(p=>[p[0],p[1]]),v=>{A.obs("توقّعي: ينمو العفن أكثر في «"+P.find(p=>p[0]===v)[1]+"».");A.ui.clear();A.step(0);phase1();});
  const bags=[],breads=[];
  for(let i=0;i<3;i++){const x=170+i*230;const b=S.bag(x,385);bags.push(b);S.text(x,412,"كيس "+(i+1),{"font-size":14,fill:"#4e342e"});
    const br=S.g();S.rect(-38,-30,76,56,{rx:14,fill:S.lg(["#e9b872","#d4954a"],1),stroke:"#a8692c","stroke-width":3},br);S.rect(-30,-22,60,40,{rx:10,fill:"#f6deb0"},br);for(let k=0;k<6;k++)S.circ(R(-24,24),R(-14,12),1.8,{fill:"#d7b27a"},br);
    S.tr(br,x,456);br.drops=0;br.lab=S.label(0,-44,"💧 0/5",br,"#1d7f8c");br.lab.style.display="none";breads.push(br);}
  S.text(400,30,"بيئات مختلفة الحرارة لنموّ عفن الخبز",{"font-size":18,fill:"#5C1622"});
  function phase1(){A.say("ارسمي شبكة مربّعات (1 cm) على كل كيس: اضغطي على الأكياس الثلاثة.");let n=0;
    bags.forEach(b=>{S.glow(b.g,true);S.tap(b.g,async()=>{if(b.grid)return;b.grid=1;S.glow(b.g,false);const gg=S.g(b.g);for(let k=0;k<=8;k++){const l=S.line(-44+k*11,-100,-44+k*11,-100,{stroke:"#1565c0","stroke-width":1,opacity:.7},gg);S.tween(300,t=>l.setAttribute("y2",lerp(-100,-12,t)));}for(let k=0;k<=8;k++){const l=S.line(-44,-100+k*11,-44,-100+k*11,{stroke:"#1565c0","stroke-width":1,opacity:.7},gg);S.tween(300,t=>l.setAttribute("x2",lerp(-44,44,t)));}
      if(++n===3){A.step(1);phase2();}});});}
  function phase2(){A.say("اسحبي القطّارة إلى كل قطعة خبز 5 مرّات (5 قطرات)، فتدخل القطعة كيسها ويُغلق.");breads.forEach(b=>b.lab.style.display="");
    const dr=S.dropper(720,330,"#64b5f6",{label:"ماء"});let closed=0;
    S.drag(dr,{back:true,oy:10,targets:()=>breads.filter(b=>b.drops<5).map(b=>({g:b,pad:10,fn:async()=>{b.drops++;b.lab.querySelector("text").textContent="💧 "+b.drops+"/5";const d=S.circ(b._x,b._y-60,5,{fill:"#42a5f5"},S.fx);await S.tween(250,t=>d.setAttribute("cy",lerp(b._y-60,b._y-10,t)));d.remove();S.circ(R(-20,20),R(-12,10),4,{fill:"#c9a06a",opacity:.7},b);
      if(b.drops===5){b.lab.style.display="none";const i=breads.indexOf(b);await S.moveTo(b,bags[i].g._x,330,500);S.tr(b,b._x,b._y,0,.8);bags[i].g.append(b);S.tr(b,0,-55,0,.8);const z=S.rect(-52,-118,104,8,{fill:"#1565c0",rx:3},bags[i].g);
        if(++closed===3){S.off(dr,true);A.step(2);await sleep(500);phase3();}}}}))});}
  function phase3(){S.clear();S.room({table:false,wall1:"#eef2f5",wall2:"#dfe7ec"});A.say("اسحبي كل كيس إلى مكانه: الثلّاجة، والخزانة المظلمة، والمكان الدافئ المظلم.");
    const spots=P.map((p,i)=>{const x=140+i*260,g=S.g();S.tr(g,x,250);
      if(p[0]==="f"){S.rect(-95,-190,190,330,{rx:16,fill:S.lg(["#f5f9fc","#cfdde6"]),stroke:"#90a4ae","stroke-width":3},g);S.rect(-80,-170,160,290,{rx:8,fill:"#e3f2fd"},g);S.line(-80,-60,80,-60,{stroke:"#b0bec5","stroke-width":4},g);S.emo(60,-140,"❄️",26,g);}
      else if(p[0]==="c"){S.rect(-95,-190,190,330,{rx:8,fill:S.lg(["#6d4c41","#4e342e"],1)},g);S.rect(-80,-170,160,290,{rx:4,fill:"#2b1d18"},g);S.circ(70,-20,6,{fill:"#d7a86e"},g);}
      else{S.rect(-95,-190,190,330,{rx:8,fill:S.lg(["#5d4037","#3e2723"],1)},g);S.rect(-80,-170,160,290,{rx:4,fill:S.rg([["#ff7043",0,.55],["#3e2723",1]],.5,.95,.8)},g);S.path("M-60 110 q 10 -30 20 0 q 10 -30 20 0 q 10 -30 20 0 q 10 -30 20 0 q 10 -30 20 0 q 10 -30 20 0",{stroke:"#ff7043","stroke-width":4,fill:"none"},g);}
      S.label(0,-205,p[1],g,p[3]==="#90caf9"?"#1565c0":p[0]==="c"?"#5d4037":"#d84315");g.sp0={x,y:330};return g;});
    const bg=[];let placed=0;
    for(let i=0;i<3;i++){const b=S.g();S.tr(b,300+i*110,470,0,.55);S.path("M-50 -110 L50 -110 L56 0 Q0 10 -56 0Z",{fill:"#e3f2fd",stroke:"#90a4ae","stroke-width":3,opacity:.95},b);S.rect(-52,-118,104,8,{fill:"#1565c0"},b);S.rect(-38,-90,76,56,{rx:14,fill:"#e0a85f"},b);S.text(0,-40,"كيس "+(i+1),{"font-size":22,fill:"#3e2723"},b);bg.push(b);
      S.drag(b,{oy:-30,targets:()=>spots.filter(s=>!s.bag).map(s=>({g:s,pad:0,fn:async()=>{s.bag=b;S.off(b,true);b._off=true;b.style.opacity=1;await S.moveTo(b,s.sp0.x,s.sp0.y,300);
        if(++placed===3){A.step(3);phase4(spots);}}}))});}}
  function phase4(spots){A.say("اسحبي مقياس الحرارة إلى كل مكان لقياس درجة حرارته.");const th=S.g();S.tr(th,400,470);const T=S.thermo(0,-20,120,{min:-10,max:40,val:22,par:th});th.setAttribute("transform","translate(400 470) scale(.7)");th._s=.7;let m=0;
    S.drag(th,{back:true,oy:-60,targets:()=>spots.filter(s=>!s.temp).map(s=>({g:s,pad:0,fn:async()=>{const p=P[spots.indexOf(s)];await S.tween(700,t=>T.set(lerp(22,p[2],t)));s.temp=p[2];S.label(0,160,"🌡️ "+p[2]+" °C",s,"#c62828");A.obs("درجة حرارة "+p[1]+": "+p[2]+" °C");T.set(22);
      if(++m===3){th.style.display="none";days(spots);}}}))});}
  function days(spots){A.say("تفحّصي الأكياس كل 3 أيام مدّة 9 أيام: اضغطي «⏩ مرور 3 أيام» وعُدّي المربّعات التي غطّاها العفن.");
    const MOLD={f:[0,0,1,2],c:[0,4,11,19],w:[0,9,23,37]};const zoom=spots.map((s,i)=>{const g=S.g();S.tr(g,s._x,175);S.rect(-66,-50,132,104,{rx:8,fill:"#fff",stroke:"#90a4ae","stroke-width":2},g);S.rect(-48,-36,96,72,{fill:"#e0a85f"},g);
      for(let r=0;r<=6;r++)S.line(-48,-36+r*12,48,-36+r*12,{stroke:"#1565c0","stroke-width":.7},g);for(let c=0;c<=8;c++)S.line(-48+c*12,-36,-48+c*12,36,{stroke:"#1565c0","stroke-width":.7},g);
      const mg=S.g(g);const cells=[];for(let r=0;r<6;r++)for(let c=0;c<8;c++)cells.push([c,r]);cells.sort((a,b)=>Math.hypot(a[0]-3.5+i,a[1]-2.5)-Math.hypot(b[0]-3.5+i,b[1]-2.5));const cnt=S.label(0,72,"0 مربّع",g,"#2f8f5b");return {g,mg,cells,cnt,n:0};});
    A.rec({day:0,f:0,c:0,w:0});let d=0;const b=A.ui.btn("⏩ مرور 3 أيام",async()=>{d++;b.disabled=true;
      for(let i=0;i<3;i++){const z=zoom[i],k=P[i][0],to=MOLD[k][d];for(let j=z.n;j<to;j++){const [c,r]=z.cells[j];const cx=-42+c*12,cy=-30+r*12;const cl=["#558b2f","#33691e","#9e9d24","#607d8b","#263238"][j%5];for(let q=0;q<4;q++)S.circ(cx+R(-4,4),cy+R(-4,4),R(2,4.5),{fill:cl,opacity:.85},z.mg);await sleep(25);}z.n=to;z.cnt.querySelector("text").textContent=to+" مربّع";}
      A.rec({day:d*3,f:MOLD.f[d],c:MOLD.c[d],w:MOLD.w[d]});if(d<3)b.disabled=false;else{b.textContent="✔ انتهت 9 أيام";A.obs("بعد 9 أيام: الثلّاجة "+MOLD.f[3]+" مربّع، الخزانة "+MOLD.c[3]+" مربّعًا، المكان الدافئ "+MOLD.w[3]+" مربّعًا.");A.step(4);}},"gold");A.ui.add(b);}
 }});

/* ---------- 2) أثر الضوء في اتجاه نموّ النباتات ---------- */
BX.reg("b9-1-2-0",{cols:[["day","اليوم"],["a","النبات داخل الصندوق"],["b","النبات في المكان المضاء"]],
 conclude:"تنمو ساق النبات باتجاه مصدر الضوء (انتحاء ضوئي موجب)؛ فتحصل الأوراق على ضوء أكثر للبناء الضوئي.",
 ans:["نمت نحو الفتحة الجانبية، أي باتجاه مصدر الضوء.","اتجاه الضوء الساقط على النبات.","تحصل أوراق النبات على أكبر كمية من الضوء اللازم لعملية البناء الضوئي."],
 build(S,A){S.emo(745,60,"☀️",70);const sun=S.g();for(let i=0;i<5;i++)S.line(700,90+i*14,560,150+i*30,{stroke:"#ffd54f","stroke-width":5,opacity:.5},sun);
  const box=S.g();S.tr(box,230,392);S.path("M-130 0 L-130 -230 L130 -230 L130 0Z",{fill:S.lg(["#d7a86e","#c08a4f"],1),stroke:"#8d5a2b","stroke-width":4},box);S.rect(-115,-215,230,212,{fill:"#3a2a1d"},box);
  S.rect(110,-150,30,60,{fill:"#fff59d"},box);S.path("M140 -150 L-100 -170 L-100 -40 L140 -90Z",{fill:"#fff59d",opacity:.18},box);S.label(0,-245,"صندوق مغلق له فتحة جانبية",box,"#8d5a2b");
  const lit=S.g();S.tr(lit,560,392);S.ell(0,-5,110,16,{fill:"#fff59d",opacity:.5},lit);S.label(0,-260,"مكان مضاء من الجهات جميعها",lit,"#f9a825");[[-120,-220],[120,-220],[0,-250]].forEach(([x,y])=>S.emo(x,y,"💡",30,lit));
  const pots=[0,1].map(i=>{const p=S.pot(390+i*90-45,470,{label:"أصيص "+(i?"ب":"أ")});p.h=34;p.draw();p.g.setAttribute("transform","translate("+(345+i*90)+" 470) scale(.75)");p.g._s=.75;p.g._x=345+i*90;p.g._y=470;return p;});
  let put=0;A.say("اسحبي أصيصًا إلى داخل الصندوق، والآخر إلى المكان المضاء.");
  pots.forEach(p=>S.drag(p.g,{oy:-40,targets:()=>[box,lit].filter(t=>!t.pot).map(t=>({g:t,pad:0,fn:async()=>{t.pot=p;p.where=t===box?"box":"lit";p.g._off=true;await S.moveTo(p.g,t._x,385,400);if(++put===2){A.step(0);water();}}}))}));
  function water(){A.say("اسقي النباتين بالكمية نفسها من الماء: اسحبي المخبار (50 mL) إلى كل أصيص.");const cyl=S.cylinder(680,470,90,{w:30,col:"#64b5f6",lvl:.5,label:"50 mL"});let n=0;
    S.drag(cyl.g,{back:true,oy:-45,targets:()=>pots.filter(p=>!p.w).map(p=>({g:p.g,pad:20,fn:async()=>{p.w=1;await S.pour(cyl.g,p.g._x+40,p.g._y-140,-70,()=>S.stream(p.g._x+5,p.g._y-120,p.g._y-60,"#64b5f6",400));cyl.set(.5);A.toast("سُقي الأصيص بـ 50 mL");if(++n===2){S.off(cyl.g,true);A.step(1);grow();}}}))});}
  function grow(){A.say("حرّكي شريط الأيام ولاحظي اتجاه نموّ الساقين، ثم سجّلي ملاحظتكِ.");const inB=pots.find(p=>p.where==="box"),inL=pots.find(p=>p.where==="lit");let last=-1;
    A.rec({day:0,a:"قائمة",b:"قائمة"});
    A.ui.slider("📅 اليوم",0,7,1,0,d=>{inB.h=34+d*12;inB.bend=d*.14;inB.draw();inL.h=34+d*13;inL.bend=0;inL.draw();
      if(d>last&&(d===3||d===7)){last=d;A.rec({day:d,a:d===7?"منحنية بشدّة نحو الفتحة ↗":"تبدأ بالانحناء نحو الفتحة",b:"قائمة نحو الأعلى ↑"});}
      if(d===7&&!A.is(2)){A.obs("انحنت ساق النبات داخل الصندوق نحو الفتحة (مصدر الضوء)، ونمت ساق النبات في المكان المضاء مستقيمة.");A.step(2);}});}
 }});

/* ---------- 3) أثر المطر الحمضي في نموّ الرشاد ---------- */
BX.reg("b9-1-2-1",{cols:[["dish","الطبق"],["liq","سائل الري"],["ph","pH"],["len","متوسّط طول البادرات (cm)"]],chart:{x:"liq",y:"len",type:"bar",xl:"سائل الري",yl:"متوسّط الطول (cm)"},
 conclude:"كلما زادت حموضة ماء الري قلّ نموّ بادرات الرشاد؛ فالمطر الحمضي يضرّ بالنباتات.",
 ans:["كلما زادت الحموضة قلّ طول البادرات وضعف نموّها، وقد لا تنبت البذور.","الطبق الأول (الماء المقطّر)؛ لأنه لا يحتوي على المتغيّر المستقل (الحموضة) ونقارن به النتائج.","تقليل حرق الوقود الأحفوري، استخدام مصادر الطاقة المتجدّدة، تركيب مرشّحات في مداخن المصانع، استعمال وسائل النقل العام."],
 build(S,A){const D=[["ماء مقطّر","#bbdefb",7,4.3],["خلّ مخفّف","#fff59d",4,2.2],["خلّ مركّز","#ffcc80",3,.7]];
  const dishes=D.map((d,i)=>{const o=S.dish(180+i*220,330,80,{label:"الطبق "+(i+1)});o.cot=0;o.seeds=0;o.d=d;o.g.dish=o;return o;});
  const cot=S.g();S.tr(cot,90,455);for(let i=0;i<6;i++)S.circ(R(-20,20),R(-12,8),14,{fill:"#fafafa",stroke:"#ddd"},cot);S.text(0,32,"قطن",{"font-size":13},cot);
  const pack=S.g();S.tr(pack,190,455);S.rect(-26,-34,52,60,{rx:6,fill:S.lg(["#66bb6a","#2e7d32"],1)},pack);S.emo(0,-10,"🌱",26,pack);S.text(0,16,"بذور",{"font-size":12,fill:"#fff"},pack);
  A.say("اسحبي القطن إلى الأطباق الثلاثة، ثم اسحبي كيس البذور إلى كل طبق (10 بذور).");
  S.drag(cot,{back:true,targets:()=>dishes.filter(o=>!o.cot).map(o=>({g:o.g,pad:0,fn:async()=>{o.cot=1;for(let k=0;k<14;k++)S.ell(R(-60,60),R(-14,10),R(12,18),R(6,9),{fill:"#fff",stroke:"#e0e0e0"},o.inner);chk();}}))});
  S.drag(pack,{back:true,targets:()=>dishes.filter(o=>o.cot&&!o.seeds).map(o=>({g:o.g,pad:0,fn:async()=>{o.seeds=10;o.sd=[];for(let k=0;k<10;k++){const x=-50+k*11,y=R(-10,6);o.sd.push([x,y]);S.ell(x,y,3,2,{fill:"#6d4c41"},o.inner);await sleep(50);}chk();}}))});
  function chk(){if(dishes.every(o=>o.cot&&o.seeds)){S.off(cot,true);S.off(pack,true);A.step(0);irrigate();}}
  function irrigate(){A.say("اسحبي كل زجاجة إلى طبقها: الماء المقطّر للطبق 1، والخلّ المخفّف للطبق 2، والخلّ المركّز للطبق 3.");let n=0;
    D.forEach((d,i)=>{const b=S.bottle(330+i*120,470,d[1],d[0]+" pH="+d[2]);S.tr(b,330+i*120,470,0,.8);S.drag(b,{back:true,oy:-40,targets:()=>[{g:dishes[i].g,pad:10,fn:async()=>{await S.pour(b,dishes[i].g._x+40,250,-80,()=>S.stream(dishes[i].g._x+10,262,322,d[1],400));S.ell(0,0,74,24,{fill:d[1],opacity:.35},dishes[i].inner);S.off(b,true);if(++n===3){A.step(1);days();}}}],miss:()=>A.toast("انتبهي: لكل طبق سائله المحدّد")});});}
  function days(){A.say("اضغطي «⏩ مرور 5 أيام»، ثم اسحبي المسطرة إلى كل طبق لقياس أطوال البادرات.");const b=A.ui.btn("⏩ مرور 5 أيام",async()=>{b.disabled=true;
      await S.tween(1600,t=>{dishes.forEach(o=>{if(!o.pl){o.pl=S.g(o.inner);}o.pl.innerHTML="";o.sd.forEach(([x,y],k)=>{const L=o.d[3]*R(.85,1.15)*14*t*(k%3?1:.9);if(L<1)return;S.path("M"+x+" "+y+" q 3 "+(-L/2)+" 0 "+(-L),{stroke:"#7cb342","stroke-width":2,fill:"none"},o.pl);if(L>10){S.ell(x-4,y-L,4,2,{fill:"#8bc34a"},o.pl);S.ell(x+4,y-L,4,2,{fill:"#8bc34a"},o.pl);}});});});
      b.textContent="✔ مرّت 5 أيام";measure();},"gold");A.ui.add(b);}
  function measure(){const r=S.ruler(560,470,200,{n:5,sub:5});let n=0;S.drag(r,{back:true,ox:100,oy:-12,targets:()=>dishes.filter(o=>!o.m).map(o=>({g:o.g,pad:0,fn:async()=>{o.m=1;const i=dishes.indexOf(o),d=o.d;S.label(0,-50,"≈ "+d[3]+" cm",o.g,"#2f8f5b");A.rec({dish:i+1,liq:d[0],ph:d[2],len:d[3]});if(++n===3){S.off(r,true);A.obs("كلما زادت حموضة سائل الري قلّ طول بادرات الرشاد.");A.step(2);}}}))});}
 }});

/* ---------- 4) ملاحظة الخصائص الأساسية للكائنات الحية (الخميرة والحصى) ---------- */
BX.reg("b9-1-3-0",{cols:[["c","خاصية الحياة"],["y","الخميرة"],["p","الحصى"]],
 conclude:"الخميرة كائن حي: تتغذّى على السكّر وتتنفّس فتُطلق غاز CO₂ الذي ينفخ البالون، أما الحصى فلا تظهر عليه خصائص الحياة.",
 ans:["انتفخ بالون قارورة الخميرة؛ لأن الخميرة تتنفّس وتحلّل السكّر فينتج غاز ثاني أكسيد الكربون.","التغذية (استهلاك السكّر)، التنفّس وإنتاج الغاز، والنموّ والتكاثر (التبرعم).","لا يتغذّى ولا يتنفّس ولا يُنتج غازًا ولا ينمو أو يتكاثر؛ فلم يتغيّر البالون."],
 build(S,A){const bot=[0,1].map(i=>{const f=S.flask(250+i*300,392,1,{label:i?"قارورة الحصى":"قارورة الخميرة",col:"#e3f2fd"});f.add=new Set();f.bal=null;return f;});
  const items=[["yeast","خميرة","#d7ccc8",0],["sugar","سكّر","#fafafa",-1],["water","ماء دافئ","#90caf9",-1],["peb","حصى","#9e9e9e",1],["bal","بالون","#e53935",-1],["bal2","بالون","#43a047",-1]];
  const need=[["yeast","sugar","water","bal"],["peb","sugar","water","bal2"]];
  A.say("القارورة الأولى: اسحبي الخميرة ثم السكّر ثم الماء الدافئ، وثبّتي البالون على فوهتها.");
  items.forEach(([k,t,c,who],i)=>{const g=S.g();S.tr(g,60+i*58+(i>3?20:0),470);
    if(k.startsWith("bal")){S.path("M0 -10 C -18 -10 -20 -50 0 -52 C 20 -50 18 -10 0 -10Z",{fill:c},g);S.rect(-4,-10,8,8,{fill:c},g);}
    else if(k==="water"){S.beaker(0,0,40,48,{col:c,lvl:.8,par:g});}
    else if(k==="peb"){for(let q=0;q<5;q++)S.ell(R(-14,14),-R(6,20),R(6,9),R(5,7),{fill:["#9e9e9e","#757575","#bdbdbd"][q%3]},g);}
    else{S.rect(-20,-40,40,40,{rx:6,fill:c,stroke:"#8d6e63","stroke-width":2},g);for(let q=0;q<8;q++)S.circ(R(-14,14),R(-34,-6),2,{fill:k==="yeast"?"#8d6e63":"#ddd"},g);}
    S.text(0,22,t,{"font-size":12},g);g.k=k;
    S.drag(g,{oy:-20,targets:()=>bot.map((f,j)=>({g:f.g,pad:10,fn:async()=>{const n=need[j];const nx=n.find(x=>!f.add.has(x));if(k!==nx){A.toast(nx?"أضيفي أولًا: "+items.find(x=>x[0]===nx)[1]:"اكتملت هذه القارورة");return false;}
      f.add.add(k);if(k==="bal"||k==="bal2"){S.off(g,true);g._off=true;g.style.opacity=1;const lt=g.querySelector("text");if(lt)lt.remove();await S.moveTo(g,f.g._x,f.g._y-110,350);f.bal=g;}
      else{await S.moveTo(g,f.g._x+30,f.g._y-170,400);await S.moveTo(g,f.g._x+30,f.g._y-170,250,-60);if(k==="water")f.to(.45,500,"#bbdefb");else if(k==="sugar")for(let q=0;q<10;q++)S.circ(R(-30,30),-R(4,30),2,{fill:"#fff"},f.inner);else if(k==="yeast")for(let q=0;q<14;q++)S.circ(R(-34,34),-R(2,12),2.5,{fill:"#a1887f"},f.inner);else for(let q=0;q<6;q++)S.ell(R(-34,34),-R(4,10),8,6,{fill:"#9e9e9e"},f.inner);await S.moveTo(g,g._x,g._y,200,0);if(k==="yeast"||k==="peb")g.style.display="none";}
      const fin=f.add.size===4;if(!k.startsWith("bal")&&k!=="yeast"&&k!=="peb"){/* يعود إلى مكانه لاستعماله مرّة أخرى */}
      if(fin){if(j===0){A.step(0);A.say("القارورة الثانية: اسحبي الحصى ثم السكّر ثم الماء الدافئ، وثبّتي البالون الآخر.");}else{A.step(1);wait();}}if(k==="sugar"||k==="water")return false;}}))});});
  /* السكّر والماء يُستعملان مرّتين */
  function wait(){A.say("حرّكي شريط الزمن حتى 30 دقيقة ولاحظي البالونين.");const yb=bot[0];let shown=0;const bub=S.bubbles(yb.g._x,yb.g._y-10,60,12,{h:40,col:"#fff"});bub.style.display="none";
    A.ui.slider("⏱️ الزمن (دقيقة)",0,30,1,0,m=>{bub.style.display=m>2?"":"none";const s=1+m/30*1.6;const b=yb.bal;b.setAttribute("transform","translate("+b._x+" "+b._y+") scale("+s+")");
      if(m===30&&!shown){shown=1;A.obs("بعد 30 دقيقة: انتفخ بالون قارورة الخميرة وظهرت فقاعات، ولم يتغيّر بالون قارورة الحصى.");classify();}});}
  function classify(){A.say("صنّفي: أيّ خصائص الحياة ظهرت؟ اختاري لكل خاصية.");const C=[["إنتاج غاز (التنفّس)","y"],["استهلاك الغذاء (السكّر)","y"],["النموّ والتكاثر (التبرعم)","y"],["لا خصائص حياة","p"]];let k=0;
    const ask=()=>{A.ui.clear();if(k>=C.length){A.step(2);return;}const [c,ok]=C[k];A.ui.choice(c+":",[["y","الخميرة"],["p","الحصى"]],v=>{if(v!==ok){A.toast("فكّري مرّة أخرى…");return;}A.rec({c,y:ok==="y"?"✔":"✖",p:ok==="p"?"✔":"✖"});k++;ask();});};ask();}
 }});

/* ---------- 5) أشكال الحياة في نظام بيئي (المربّع 1m×1m) ---------- */
BX.reg("b9-1-3-1",{cols:[["t","الكائن الحي"],["n","العدد"],["k","التصنيف"]],chart:{x:"t",y:"n",type:"bar",xl:"الكائن",yl:"العدد"},
 room:{table:false,wall1:"#c8e6c9",wall2:"#a5d6a7"},
 conclude:"يضمّ النظام البيئي منتجات ومستهلكات ومحلّلات، وكلما زاد التنوّع الحيوي زاد توازن النظام البيئي واستقراره.",
 ans:["الأعشاب (المنتجات) هي الأكثر عددًا عادةً، ثم النمل.","كلما زاد التنوّع زادت السلاسل والشبكات الغذائية، فإذا اختفى نوع وُجد بديل له، فيبقى النظام البيئي متوازنًا."],
 build(S,A){S.rect(0,0,800,500,{fill:S.lg(["#a5d6a7","#66bb6a"],1)},S.bg);for(let i=0;i<120;i++)S.path("M"+R(0,800)+" "+R(40,500)+" l 3 -12 l 3 12",{stroke:"#2e7d32","stroke-width":2,fill:"none",opacity:.6},S.bg);
  const T=[["عشب","🌿","منتج",14],["زهرة برّية","🌼","منتج",4],["نملة","🐜","مستهلك",7],["حلزون","🐌","مستهلك",2],["خنفساء","🐞","مستهلك",2],["دودة أرض","🪱","محلّل",2],["فطر (عيش الغراب)","🍄","محلّل",3]];
  const orgs=[];T.forEach(([t,e,k,n],ti)=>{for(let i=0;i<n+3;i++){const g=S.emo(R(30,770),R(60,470),e,ti===0?30:24);g.t=ti;orgs.push(g);}});
  const fr=S.g();S.tr(fr,120,130);S.rect(-110,-110,220,220,{fill:"none",stroke:"#fff",["stroke-width"]:10},fr);S.rect(-110,-110,220,220,{fill:"rgba(255,255,255,.08)",stroke:"#B8902A","stroke-width":5,"stroke-dasharray":"12 6"},fr);S.label(0,-125,"إطار 1m × 1m",fr,"#B8902A");
  const ar=S.rect(0,0,0,0,{});A.say("اسحبي الإطار المربّع وضعيه في أيّ مكان من الحديقة.");let set=false;
  S.drag(fr,{free:true,start:()=>{},targets:()=>[{box:[0,0,800,500],pad:0,fn:()=>{if(set)return;set=true;fr._off=true;fr.parentNode.insertBefore(fr,fr.parentNode.firstChild);A.step(0);count();}}]});
  function count(){const x0=fr._x-110,y0=fr._y-110;const inside=orgs.filter(o=>{const b=o.getBBox();const cx=b.x+b.width/2,cy=b.y+b.height/2;return cx>x0&&cx<x0+220&&cy>y0&&cy<y0+220;});
    orgs.filter(o=>!inside.includes(o)).forEach(o=>o.setAttribute("opacity",.35));
    if(inside.length<4){T.forEach((t,ti)=>{for(let i=0;i<(ti<3?3:1);i++){const g=S.emo(R(x0+20,x0+200),R(y0+20,y0+200),t[1],24);g.t=ti;inside.push(g);}});}
    const nC=Math.ceil(Math.sqrt(inside.length));inside.forEach((o,k)=>{const b=o.getBBox();const tx=x0+20+(k%nC+.5)*180/nC+R(-6,6),ty=y0+20+(Math.floor(k/nC)+.5)*180/nC+R(-6,6);o.setAttribute("x",+o.getAttribute("x")+(tx-(b.x+b.width/2)));o.setAttribute("y",+o.getAttribute("y")+(ty-(b.y+b.height/2)));});
    const cnt=T.map(()=>0);A.say("عُدّي الكائنات داخل الإطار: اضغطي على كل كائن مرّة واحدة.");let left=inside.length;
    inside.forEach(o=>{S.tap(o,()=>{if(o._c)return;o._c=1;cnt[o.t]++;const b=o.getBBox();S.circ(b.x+b.width/2,b.y+b.height/2,16,{fill:"none",stroke:"#fff","stroke-width":3},S.fx);if(--left===0){A.step(1);sort(cnt);}else A.say("باقي "+left+" كائنًا داخل الإطار…");});});}
  function sort(cnt){const found=T.map((t,i)=>[t,cnt[i]]).filter(x=>x[1]>0);let k=0;const ask=()=>{A.ui.clear();if(k>=found.length){A.obs("قارني نتائجكِ بزميلاتكِ: تختلف الأعداد من مربّع لآخر، لكن الأعشاب (المنتجات) هي الأكثر غالبًا.");A.step(2);return;}
      const [[t,e,kind],n]=found[k];A.say("صنّفي: "+e+" "+t+" ("+n+")");A.ui.choice(e+" "+t+":",[["منتج","🌱 منتج"],["مستهلك","🐾 مستهلك"],["محلّل","🍂 محلّل"]],v=>{if(v!==kind){A.toast("ليس صحيحًا، فكّري: من أين يحصل على غذائه؟");return;}A.rec({t:e+" "+t,n,k:kind});k++;ask();});};ask();}
 }});

/* ---------- 6) خلايا نباتية وحيوانية بالمجهر الضوئي المركّب ---------- */
BX.reg("b9-2-1-0",{cols:[["s","الشريحة"],["obj","العدسة الشيئية"],["tot","التكبير الكلي"],["see","ما شاهدته"]],
 conclude:"تحتوي الخلية النباتية (البصل) على جدار خلوي وشكل منتظم، والخلية الحيوانية (الخدّ) غير منتظمة وليس لها جدار خلوي، وكلتاهما فيها نواة وغشاء بلازمي وسيتوبلازم.",
 ans:["الجدار الخلوي (والشكل المنتظم المستطيل)، وفي الخلايا الخضراء تظهر البلاستيدات الخضراء أيضًا.","لإظهار تراكيب الخلية الشفّافة كالنواة والجدار؛ فالصبغة تلوّنها فتصبح واضحة.","التكبير الكلي = تكبير العدسة العينية × تكبير العدسة الشيئية؛ مثلًا 10 × 40 = 400 مرّة."],
 build(S,A){const sl=[0,1].map(i=>{const g=S.g();S.tr(g,300+i*190,440);S.rect(-60,-14,120,28,{rx:3,fill:"#e1f5fe",stroke:"#81d4fa","stroke-width":2,opacity:.9},g);S.text(0,40,i?"شريحة الخدّ":"شريحة البصل",{"font-size":13},g);g.st=0;g.i=i;g.sp=S.g(g);return g;});
  const on=S.g();S.tr(on,90,440);S.ell(0,-20,46,40,{fill:S.rg(["#f3e5f5","#ce93d8"])},on);S.path("M0 -60 q 6 -30 18 -40",{stroke:"#7cb342","stroke-width":4,fill:"none"},on);S.text(0,40,"بصلة",{"font-size":13},on);
  const io=S.dropper(700,430,"#8d6e00",{label:"يود",bulb:"#6d4c41"}),mb=S.dropper(750,430,"#1565c0",{label:"أزرق الميثيلين",bulb:"#0d47a1"});
  const cv=S.g();S.tr(cv,610,445);for(let k=0;k<2;k++)S.rect(-24+k*6,-24+k*6,40,40,{fill:"#e1f5fe",stroke:"#81d4fa","stroke-width":2,opacity:.8},cv);S.text(0,40,"أغطية",{"font-size":12},cv);
  const sw=S.g();S.tr(sw,170,450);S.line(-40,0,40,0,{stroke:"#fff","stroke-width":4},sw);S.ell(-44,0,8,5,{fill:"#fafafa",stroke:"#ccc"},sw);S.text(0,22,"عود قطن",{"font-size":12},sw);
  const face=S.g();S.tr(face,90,230);S.circ(0,0,60,{fill:"#ffcc80"},face);S.circ(-20,-12,6,{fill:"#3e2723"},face);S.circ(20,-12,6,{fill:"#3e2723"},face);S.path("M-22 22 q 22 18 44 0",{stroke:"#c62828","stroke-width":4,fill:"none"},face);S.circ(30,14,10,{fill:"#ef9a9a",opacity:.6},face);S.text(0,85,"باطن الخدّ",{"font-size":13},face);
  A.say("اضغطي على البصلة لنزع غشاء رقيق من بشرتها.");let mem=null;
  S.tap(on,async()=>{if(mem)return;mem=S.g();S.tr(mem,90,380);S.path("M-20 0 q 20 -10 40 0 q -20 8 -40 0",{fill:"#f8bbd0",opacity:.8,stroke:"#ec407a"},mem);S.text(0,22,"غشاء البصل",{"font-size":12},mem);
    A.say("اسحبي غشاء البصل إلى شريحة البصل.");S.drag(mem,{targets:()=>[{g:sl[0],pad:10,fn:async()=>{mem.style.display="none";S.path("M-30 0 q 30 -10 60 0 q -30 8 -60 0",{fill:"#f8bbd0",opacity:.8},sl[0].sp);sl[0].st=1;A.say("أضيفي قطرة يود إلى شريحة البصل، ثم غطّيها بغطاء الشريحة.");}}]});});
  S.drag(io,{back:true,oy:10,targets:()=>sl[0].st===1?[{g:sl[0],fn:async()=>{S.ell(0,0,26,7,{fill:"#a1887f",opacity:.6},sl[0].sp);sl[0].st=2;}}]:[]});
  S.drag(mb,{back:true,oy:10,targets:()=>sl[1].st===1?[{g:sl[1],fn:async()=>{S.ell(0,0,26,7,{fill:"#42a5f5",opacity:.6},sl[1].sp);sl[1].st=2;}}]:[]});
  S.drag(cv,{back:true,targets:()=>sl.filter(s=>s.st===2).map(s=>({g:s,fn:async()=>{S.rect(-22,-12,44,24,{fill:"#e1f5fe",opacity:.6,stroke:"#4fc3f7"},s.sp);s.st=3;if(s.i===0){A.step(0);if(sl[1].st<3)A.say("اسحبي عود القطن إلى باطن الخدّ برفق، ثم إلى شريحة الخدّ.");}else{A.step(1);}if(sl.every(x=>x.st===3))scope();}}))});
  let swab=0;S.drag(sw,{back:true,ox:-44,targets:()=>swab===0?[{g:face,fn:()=>{swab=1;S.ell(-44,0,8,5,{fill:"#ffe0b2"},sw);A.toast("أُخذت عيّنة من باطن الخدّ");}}]:swab===1?[{g:sl[1],fn:()=>{swab=2;S.path("M-30 0 q 30 -6 60 0",{stroke:"#ffe0b2","stroke-width":6,fill:"none"},sl[1].sp);sl[1].st=1;A.say("أضيفي قطرة أزرق الميثيلين، ثم غطّيها بغطاء الشريحة.");}}]:[]});
  /* المجهر */
  let M=null;const CK=Array.from({length:20},()=>[R(-100,100),R(-100,100)]);function scope(){if(M)return;[on,face,sw,io,mb,cv].forEach(x=>{x.style.transition="opacity .5s";x.style.opacity=0;x.style.pointerEvents="none";});const g=S.g();S.tr(g,560,390);M=g;
    S.path("M-70 0 L70 0 L60 -20 L-60 -20Z",{fill:"#37474f"},g);S.path("M30 -20 C 60 -80 60 -180 20 -250",{stroke:"#455a64","stroke-width":26,fill:"none","stroke-linecap":"round"},g);S.rect(-60,-120,110,12,{fill:"#263238",rx:3},g);
    S.rect(-14,-300,26,110,{fill:"#455a64",rx:5,transform:"rotate(-15)"},g);S.rect(-30,-195,30,40,{fill:"#607d8b",rx:4},g);S.circ(50,-110,16,{fill:"#546e7a"},g);S.circ(-10,-60,10,{fill:"#fff59d"},g);
    const spot=S.rect(-40,-128,80,10,{fill:"none",stroke:"#B8902A","stroke-width":3,"stroke-dasharray":"6 4",class:"glow"},g);
    const view=S.g();S.tr(view,180,170);const vc=S.circ(0,0,130,{fill:"#111"},view);const cl=S.clip(S.mk("circle",{r:122}));const cells=S.g(view);cells.setAttribute("clip-path",cl);S.circ(0,0,124,{fill:"none",stroke:"#263238","stroke-width":10},view);
    const lab=S.label(0,150,"ضعي شريحة على المنصّة",view,"#263238");let cur=null,obj=4,focus=0;const seen={};
    sl.forEach(s=>S.drag(s,{back:true,targets:()=>s.st===3?[{g:g,pad:0,fn:()=>{cur=s.i;draw();return false;}}]:[]}));
    function draw(){cells.innerHTML="";if(cur==null)return;const mag=obj*10,z=obj/10,blur=Math.abs(focus-50)/12;S.circ(0,0,122,{fill:cur?"#e3f2fd":"#fff8e1"},cells);const grp=S.g(cells);if(blur>.6)grp.setAttribute("style","filter:blur("+blur.toFixed(1)+"px)");
      if(cur===0){const w=26*Math.sqrt(obj),hh=w*.38;for(let r=-8;r<=8;r++)for(let c=-6;c<=6;c++){const x=c*w+(r%2?w/2:0),y=r*hh;if(Math.abs(x)>180||Math.abs(y)>180)continue;S.rect(x-w/2,y-hh/2,w-3,hh-3,{fill:"#ffe0b2",stroke:"#8d6e63","stroke-width":Math.max(1.5,z*3),rx:2},grp);S.ell(x+w*.15,y,hh*.2,hh*.18,{fill:"#6d4c41"},grp);}}
      else{for(let k=0;k<Math.round(40/obj)+3;k++){const [x,y]=CK[k%CK.length],r=9*Math.sqrt(obj);S.path("M"+(x-r)+" "+y+" q "+r*.3+" "+(-r)+" "+r+" "+(-r*.8)+" q "+r+" "+r*.1+" "+r*.9+" "+r*.9+" q "+(-r*.2)+" "+r+" "+(-r)+" "+r*.8+" q "+(-r)+" "+(-r*.2)+" "+(-r*.9)+" "+(-r*.9)+"Z",{fill:"#bbdefb",stroke:"#1e88e5","stroke-width":1.5,opacity:.9},grp);S.circ(x+r*.1,y,r*.18,{fill:"#1565c0"},grp);}}
      lab.querySelector("text").textContent=(cur?"خلايا باطن الخدّ":"خلايا بشرة البصل")+" · ×"+mag+(blur>.6?" · حرّكي الضابط":"");
      if(blur<=.6&&obj>=10){const k=cur+"-"+obj;if(!seen[k]){seen[k]=1;A.rec({s:cur?"باطن الخدّ":"بشرة البصل",obj:"×"+obj,tot:"×"+mag,see:cur?"خلايا غير منتظمة، نواة زرقاء، لا جدار خلوي":"خلايا مستطيلة منتظمة، جدار خلوي، نواة"});}
        if(seen["0-40"]&&seen["1-40"]&&!A.is(2)){A.step(2);}}}
    A.ui.clear();A.ui.choice("العدسة الشيئية",[[4,"×4"],[10,"×10"],[40,"×40"]],v=>{obj=v;draw();},4);A.ui.slider("🔧 الضابط (التركيز)",0,100,1,0,v=>{focus=v;draw();});
    A.say("اسحبي الشريحة إلى المنصّة، وابدئي بالعدسة الصغرى ×4 ثم الكبرى ×40، وحرّكي الضابط حتى تتّضح الصورة. افحصي الشريحتين.");}
 }});

/* ---------- 7) أثر درجة الحرارة في الانتشار ---------- */
BX.reg("b9-2-1-1",{cols:[["b","الكأس"],["t","درجة حرارة الماء (°C)"],["s","زمن تجانس اللون (s)"]],chart:{x:"b",y:"s",type:"bar",xl:"الكأس",yl:"الزمن (s)"},
 conclude:"يزداد معدّل الانتشار بارتفاع درجة الحرارة؛ لأن الطاقة الحركية للجزيئات تزداد فتتحرّك أسرع.",
 ans:["في كأس الماء الساخن؛ لأن جزيئات الماء الساخن تمتلك طاقة حركية أكبر فتتحرّك بسرعة وتنقل جزيئات الملوّن.","كلما زادت درجة الحرارة زادت سرعة حركة الجزيئات فيزداد معدّل الانتشار."],
 build(S,A){const bk=[0,1].map(i=>{const b=S.beaker(250+i*300,392,150,190,{lvl:0,label:i?"الكأس 2":"الكأس 1"});b.i=i;b.t=i?70:8;return b;});
  const jug=S.g();S.tr(jug,80,470);S.beaker(0,0,70,90,{col:"#81d4fa",lvl:.8,par:jug});S.emo(0,-110,"🧊",26,jug);S.text(0,20,"ماء بارد 8°C",{"font-size":12},jug);
  const ket=S.g();S.tr(ket,720,470);S.path("M-40 0 L40 0 L34 -80 L-34 -80Z",{fill:S.lg(["#b0bec5","#eceff1","#90a4ae"])},ket);S.path("M34 -60 l 30 -10",{stroke:"#90a4ae","stroke-width":8},ket);S.path("M-34 -70 q -30 10 -20 40",{stroke:"#546e7a","stroke-width":6,fill:"none"},ket);S.text(0,20,"ماء ساخن 70°C",{"font-size":12},ket);
  const steam=S.bubbles(720,380,30,6,{h:60,col:"#eceff1"});
  A.say("املئي الكأس 1 بالماء البارد والكأس 2 بالماء الساخن بالحجم نفسه (200 mL): اسحبي كل إبريق إلى كأسه.");let n=0;
  [[jug,0,"#e1f5fe"],[ket,1,"#fffde7"]].forEach(([j,i,c])=>S.drag(j,{back:true,oy:-40,targets:()=>[{g:bk[i].g,fn:async()=>{await S.pour(j,bk[i].g._x+100,220,-70,()=>bk[i].to(.75,900,c));S.off(j,true);S.label(0,-215,(i?"70":"8")+" °C · 200 mL",bk[i].g,i?"#d84315":"#1565c0");if(++n===2){A.step(0);go();}}}],miss:()=>A.toast(i?"الماء الساخن للكأس 2":"الماء البارد للكأس 1")}));
  function go(){A.say("أضيفي قطرة الملوّن إلى الكأسين في اللحظة نفسها.");const w=S.watch(400,120);const b=A.ui.btn("💧 أضيفي القطرتين معًا",async()=>{b.disabled=true;A.step(1);
      const cl=bk.map(B=>{const g=S.g(B.g);g.setAttribute("clip-path",B.cl);const c=S.circ(0,-120,4,{fill:"#7b1fa2",opacity:.9,filter:"url(#bl)"},g);return c;});
      await Promise.all(bk.map((B,i)=>S.tween(400,t=>cl[i].setAttribute("cy",lerp(-190,-120,t)))));
      const T={0:150,1:35};const t0=performance.now();const sp=8;const stop=[null,null];let p=[0,0];
      A.say("راقبي انتشار اللون، واضغطي على الكأس عندما يتجانس لونها تمامًا (الساعة مسرَّعة ×8).");
      bk.forEach((B,i)=>S.tap(B.g,()=>{if(stop[i]!=null)return;if(p[i]<.93){A.toast("لم يتجانس اللون بعد في الكأس "+(i+1));return;}stop[i]=Math.round(T[i]*R(.97,1.04));A.rec({b:"الكأس "+(i+1),t:B.t,s:stop[i]});S.label(0,30,"⏱️ "+stop[i]+" s",B.g,"#2f8f5b");if(stop[0]!=null&&stop[1]!=null){A.obs("تجانس اللون في الماء الساخن أسرع ("+stop[1]+" s) منه في الماء البارد ("+stop[0]+" s).");A.step(2);}}));
      const f=()=>{const s=(performance.now()-t0)/1000*sp;w.set(Math.min(s,200));bk.forEach((B,i)=>{p[i]=clamp(s/T[i],0,1);const r=4+p[i]*110;cl[i].setAttribute("r",r);cl[i].setAttribute("opacity",lerp(.9,.25,p[i]));B.set(null,mix(i?"#fffde7":"#e1f5fe","#9c27b0",p[i]*.6));});if(stop[0]==null||stop[1]==null)requestAnimationFrame(f);};requestAnimationFrame(f);});A.ui.add(b);}
 }});

/* ---------- 8) أثر تراكيز محلول الغلوكوز في كتلة البطاطا ---------- */
BX.reg("b9-2-1-2",{cols:[["c","تركيز الغلوكوز (M)"],["m1","الكتلة الابتدائية (g)"],["m2","الكتلة النهائية (g)"],["p","نسبة التغيّر %"]],chart:{x:"c",y:"p",xl:"تركيز الغلوكوز (M)",yl:"نسبة التغيّر في الكتلة %"},
 conclude:"تكتسب خلايا البطاطا الماء في المحاليل المخفّفة (منخفضة التركيز) وتفقده في المحاليل المركّزة بالخاصية الأسموزية، وعند التركيز المماثل لعصارتها لا تتغيّر الكتلة.",
 ans:["في الماء المقطّر والمحلول المخفّف؛ لأن تركيز الماء خارج الخلايا أعلى فيدخل الماء إليها بالخاصية الأسموزية.","التركيز الذي يقطع عنده الخطّ البياني محور السينات (نسبة تغيّر = صفر)، وهو تقريبًا 0.3 M."],
 build(S,A){const C=[0,.2,.4,.6,.8],P=[14.5,4.2,-3.6,-9.8,-15.1];const bal=S.balance(130,392);const pcs=[],tubes=[];
  C.forEach((c,i)=>{const t=S.tube(330+i*95,392,170,{w:46,lvl:.75,col:mix("#e3f2fd","#ffe082",c),label:c?c+" M":"ماء مقطّر"});tubes.push(t);
    const p=S.g();S.tr(p,90+i*50,470);S.rect(-8,-34,16,34,{rx:4,fill:S.lg(["#fff3c4","#f5d98b"]),stroke:"#c9a227","stroke-width":2},p);S.text(0,18,String(i+1),{"font-size":12},p);p.i=i;p.m1=+(R(2.4,2.6)).toFixed(2);pcs.push(p);});
  A.say("قيسي كتلة كل أسطوانة بطاطا: اسحبيها إلى الميزان.");let w=0;
  const toBal=p=>({g:bal.g,pad:10,fn:async()=>{await S.moveTo(p,130,342,300);if(!p.w){p.w=1;bal.set(p.m1);A.toast("الكتلة: "+p.m1+" g");S.label(0,-50-(p.i%2)*26,p.m1+" g",p,"#1d7f8c");if(++w===5){A.step(0);A.say("ضعي كل أسطوانة في أنبوب: الأسطوانة 1 في الماء المقطّر… والأسطوانة 5 في 0.8 M.");}}await sleep(500);bal.set(0);return false;}});
  pcs.forEach(p=>S.drag(p,{back:true,oy:-17,targets:()=>!p.w?[toBal(p)]:(!p.in&&w===5)?[{g:tubes[p.i].g,pad:5,fn:async()=>{p.in=1;p._off=true;await S.moveTo(p,tubes[p.i].g._x,tubes[p.i].g._y-40,300);p.querySelectorAll("rect")[0]&&0;tubes[p.i].g.append(p);S.tr(p,0,-40);if(pcs.every(q=>q.in)){A.ui.add(A.ui.btn("⏩ مرور 24 ساعة",async b=>{b.disabled=true;await S.tween(1500,t=>pcs.forEach((q,k)=>{const s=1+P[k]/100*t;q.setAttribute("transform","translate(0 -40) scale("+s+")");}));A.step(1);weigh2();},"gold"));}}}]:p.in&&p.out?[toBal2(p)]:[]}));
  function weigh2(){A.say("أخرجي الأسطوانات (اضغطي على كل أنبوب) وجفّفيها، ثم قيسي كتلتها بالميزان.");pcs.forEach(p=>S.tap(tubes[p.i].g,()=>{if(p.out)return;p.out=1;S.g().append(p);S.tr(p,90+p.i*50,470,0,1+P[p.i]/100);p._off=false;}));}
  let w2=0;const toBal2=p=>({g:bal.g,pad:10,fn:async()=>{await S.moveTo(p,130,342,300);if(!p.w2){p.w2=1;const m2=+(p.m1*(1+P[p.i]/100)).toFixed(2);bal.set(m2);A.rec({c:C[p.i],m1:p.m1,m2,p:+((m2-p.m1)/p.m1*100).toFixed(1)});if(++w2===5){A.obs("زادت كتلة البطاطا في الماء المقطّر و0.2 M، ونقصت في 0.4 M فما فوق.");A.step(2);}}await sleep(500);bal.set(0);return false;}});
 }});

/* ---------- 9) الكشف عن CO₂ الناتج من التنفّس الخلوي ---------- */
BX.reg("b9-2-2-0",{cols:[["t","الزمن (دقيقة)"],["a","ماء الجير (البذور المنبتة)"],["b","ماء الجير (البذور المغليّة)"]],
 conclude:"البذور المنبتة حيّة تتنفّس وتُطلق غاز CO₂ الذي يعكّر ماء الجير، أما البذور المغليّة فميّتة لا تتنفّس.",
 ans:["لأن البذور المنبتة تتنفّس وتُطلق غاز ثاني أكسيد الكربون الذي يتفاعل مع ماء الجير فيعكّره (يُكوّن كربونات الكالسيوم).","هو الدورق الضابط؛ لنثبت أن تعكّر ماء الجير ناتج عن تنفّس البذور الحيّة وليس من عامل آخر."],
 build(S,A){const fl=[0,1].map(i=>{const f=S.flask(200+i*330,392,1,{label:i?"الدورق ب":"الدورق أ",col:"#fff"});return f;});
  const tb=[0,1].map(i=>{const t=S.tube(330+i*330,392,150,{w:40,lvl:.7,col:"#f1f8e9",label:"ماء الجير"});return t;});
  const seeds=[["منبتة","#c5e1a5",0],["مغليّة","#d7ccc8",1]].map(([t,c,i])=>{const g=S.g();S.tr(g,60+i*0,470-i*0);S.tr(g,i?720:60,470);S.rect(-30,-46,60,46,{rx:8,fill:"#fff",stroke:"#90a4ae","stroke-width":2},g);for(let k=0;k<9;k++){S.ell(R(-20,20),-R(8,36),7,5,{fill:c,stroke:"#8d6e63"},g);if(!i)S.path("M"+R(-18,18)+" "+(-R(10,30))+" q 4 -8 8 -6",{stroke:"#7cb342","stroke-width":2,fill:"none"},g);}S.text(0,20,"بذور "+t,{"font-size":12},g);return g;});
  A.say("ضعي البذور المنبتة في الدورق أ، والبذور المغليّة في الدورق ب.");let n=0;
  seeds.forEach((s,i)=>S.drag(s,{back:true,oy:-20,targets:()=>[{g:fl[i].g,fn:async()=>{s.style.display="none";for(let k=0;k<12;k++){S.ell(R(-40,40),-R(6,22),7,5,{fill:i?"#d7ccc8":"#c5e1a5",stroke:"#8d6e63"},fl[i].inner);if(!i&&k%2)S.path("M"+R(-30,30)+" "+(-R(8,20))+" q 4 -8 8 -6",{stroke:"#7cb342","stroke-width":2,fill:"none"},fl[i].inner);}
    S.rect(-18,-130,36,14,{fill:"#6d4c41",rx:3},fl[i].g);if(++n===2){A.step(0);connect();}}}],miss:()=>A.toast(i?"البذور المغليّة للدورق ب":"البذور المنبتة للدورق أ")}));
  function connect(){A.say("صِلي كل دورق بأنبوب ماء الجير: اضغطي على كل دورق لتركيب أنبوب التوصيل.");let c=0;
    fl.forEach((f,i)=>S.tap(f.g,()=>{if(f.con)return;f.con=1;const x1=f.g._x,x2=tb[i].g._x;S.path("M"+x1+" 262 L"+x1+" 210 L"+x2+" 210 L"+x2+" 370",{stroke:"#90a4ae","stroke-width":7,fill:"none","stroke-linejoin":"round",opacity:.9});S.path("M"+x1+" 262 L"+x1+" 210 L"+x2+" 210 L"+x2+" 370",{stroke:"#e3f2fd","stroke-width":3,fill:"none"});
      if(++c===2){A.step(1);time();}}));}
  function time(){A.say("حرّكي شريط الزمن حتى 60 دقيقة وراقبي لون ماء الجير في الأنبوبين.");const bub=S.bubbles(tb[0].g._x,375,14,8,{h:80});let rec=new Set([0]);A.rec({t:0,a:"رائق",b:"رائق"});
    A.ui.slider("⏱️ الزمن (دقيقة)",0,60,5,0,m=>{const k=m/60;tb[0].set(null,mix("#f1f8e9","#ffffff",k));tb[0].liq.setAttribute("opacity",lerp(.6,1,k));
      [20,40,60].forEach(t=>{if(m>=t&&!rec.has(t)){rec.add(t);A.rec({t,a:t===20?"يبدأ بالتعكّر":t===40?"متعكّر":"حليبي (متعكّر جدًا)",b:"رائق"});}});
      if(m===60&&!A.is(2)){A.obs("تعكّر ماء الجير المتّصل بدورق البذور المنبتة، وبقي رائقًا في أنبوب البذور المغليّة.");A.step(2);}});}
 }});

/* ---------- 10) الكشف عن النشا في الأوراق ---------- */
BX.reg("b9-2-2-1",{cols:[["l","الورقة"],["c","اللون بعد إضافة اليود"],["r","النتيجة"]],
 conclude:"الورقة المعرّضة للضوء تحتوي على النشا الناتج من البناء الضوئي (تتلوّن بالأزرق الداكن مع اليود)، أما ورقة الظلام فلا تحتوي عليه.",
 ans:["الورقة المعرّضة للضوء؛ لأنها قامت بالبناء الضوئي وكوّنت الغلوكوز الذي خُزّن على شكل نشا، واليود يكشف النشا بلون أزرق داكن.","إذابة الكلوروفيل (إزالة اللون الأخضر) حتى يظهر لون اليود بوضوح."],
 build(S,A){const bur=S.burner(220,392,{on:true});const hot=S.beaker(220,240,140,110,{col:"#e3f2fd",lvl:.7,label:"ماء ساخن"});S.rect(140,236,160,8,{fill:"#78909c"});const st=S.bubbles(220,232,110,10,{h:70});
  const al=S.tube(220,215,110,{w:44,lvl:.6,col:"#fffde7",label:""});al.g.style.display="none";
  const leaf=(i)=>{const g=S.g();S.tr(g,520+i*110,460);S.path("M0 0 C -40 -20 -40 -70 0 -90 C 40 -70 40 -20 0 0Z",{fill:"#43a047",stroke:"#1b5e20","stroke-width":2},g);S.line(0,0,0,-86,{stroke:"#1b5e20","stroke-width":2},g);S.text(0,22,i?"🌑 ورقة الظلام":"☀️ ورقة الضوء",{"font-size":13},g);g.i=i;g.st=0;return g;};
  const lv=[leaf(0),leaf(1)];
  A.say("اغمري الورقتين في الماء الساخن دقيقة: اسحبي كل ورقة إلى الكأس.");let n=0;
  const setCol=(g,c)=>g.querySelector("path").setAttribute("fill",c);
  lv.forEach(g=>S.drag(g,{back:true,oy:-45,targets:()=>g.st===0?[{g:hot.g,fn:async()=>{g.st=1;setCol(g,"#689f38");if(++n===2){A.step(0);bath();}}}]:g.st===1&&al.g.style.display===""?[{g:al.g,fn:async()=>{g.st=2;await S.tween(1500,t=>{setCol(g,mix("#f1f8e9","#43a047",(1-t)*.8));al.set(null,mix("#fffde7","#66bb6a",t*.7));});if(lv.every(x=>x.st===2)){A.obs("تلوّن الكحول بالأخضر وأصبحت الورقتان باهتتين (أُزيل الكلوروفيل).");A.step(1);iodine();}}}]:g.st===2&&dishes?[{g:dishes[g.i].g,fn:async()=>{g.st=3;const lt=g.querySelector("text");if(lt)lt.remove();await S.moveTo(g,dishes[g.i].g._x,dishes[g.i].g._y+40,300);return "stay";}}]:[]}));
  function bath(){A.say("ضعي الورقتين في أنبوب الكحول داخل الحمّام المائي (لا تسخّني الكحول على اللهب مباشرة).");al.g.style.display="";S.label(0,-125,"كحول",al.g,"#6d4c41");}
  let dishes=null;function iodine(){A.say("اغسلي الورقتين وضعيهما في طبقَي بتري، ثم أضيفي قطرات اليود إلى كل ورقة.");dishes=[0,1].map(i=>S.dish(520+i*140,320,62,{label:i?"طبق ورقة الظلام":"طبق ورقة الضوء"}));
    const io=S.dropper(740,440,"#8d6e00",{label:"يود",bulb:"#6d4c41"});let k=0;
    S.drag(io,{back:true,oy:10,targets:()=>lv.filter(g=>g.st===3).map(g=>({g,fn:async()=>{g.st=4;const c=g.i?"#c79a3c":"#1a237e";await S.tween(900,t=>setCol(g,mix("#f1f8e9",c,t)));A.rec({l:g.i?"ورقة الظلام":"ورقة الضوء",c:g.i?"بنّي مصفرّ (لون اليود)":"أزرق داكن",r:g.i?"لا يوجد نشا":"يوجد نشا"});if(++k===2){A.step(2);}}}))});}
 }});
})();
