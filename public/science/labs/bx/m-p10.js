/* تجارب الفيزياء — الصف العاشر (كتاب الأنشطة) — مطابقة لخطوات الكتاب */
(function(){const {sleep,lerp,clamp,mix,quiz}=BX;const R=(a,b)=>a+Math.random()*(b-a);const g0=9.8;
const nextBtn=(A,t,fn,cls)=>{A.ui.clear();A.ui.add(A.ui.btn(t,b=>{b.disabled=true;fn(b);},cls||"gold"));};
const f2=v=>(Math.round(v*100)/100).toFixed(2),f3=v=>(Math.round(v*1000)/1000).toFixed(3);
/* ميزان نابضي: يمتدّ من الأصل إلى الأعلى (طول 170) */
function sbal(S,par){const g=S.g(par);S.line(0,0,0,-20,{stroke:"#555","stroke-width":2},g);S.path("M-6 -20 Q0 -10 6 -20",{stroke:"#555","stroke-width":2,fill:"none"},g);S.rect(-15,-160,30,130,{rx:8,fill:S.lg(["#eceff1","#b0bec5"]),stroke:"#607d8b","stroke-width":2},g);
  for(let i=0;i<=10;i++)S.line(-15,-150+i*11,-7,-150+i*11,{stroke:"#455a64"},g);S.circ(0,-168,7,{fill:"none",stroke:"#555","stroke-width":2},g);const lab=S.label(0,-95,"0 N",g,"#263238");g.set=v=>lab.set(f2(v)+" N");return g;}
function weight(S,par,txt){const g=S.g(par);S.line(0,0,0,14,{stroke:"#555","stroke-width":2},g);S.path("M-22 14 L22 14 L30 60 L-30 60Z",{fill:S.lg(["#90a4ae","#546e7a"],1),stroke:"#37474f","stroke-width":2},g);S.text(0,44,txt,{"font-size":13,fill:"#fff"},g);return g;}

/* ---------- 1) ناتج جمع قوّتين ---------- */
BX.reg("p10-1-1-0",{cols:[["c","الحالة (الشكل)"],["r1","قراءة الميزان الأول (N)"],["r2","قراءة الميزان الثاني (N)"]],
 conclude:"جمع القوى جمع متّجهات يعتمد على اتجاهاتها؛ فقوّتان مقدار كلٍّ منهما 5 N قد يكون مجموعهما 10 N إذا كانتا في الاتجاه نفسه، و5 N فقط إذا كانت الزاوية بينهما 120°. لذا فادّعاء هيا صحيح أحيانًا وادّعاء يمان صحيح أحيانًا، والحاسم هو الاتجاه.",
 ans:["تمثّل وزن الثقل (قوّة جذب الأرض له) ≈ 4.9 N.","في الحالة (ب) قلّت قراءة كلٍّ منهما إلى النصف تقريبًا (2.45 N)، وفي الحالة (ج) زادت قراءة كلٍّ منهما حتى ساوت وزن الثقل (4.9 N) عندما صارت الزاوية بين الميزانين 120° (60° لكلٍّ منهما عن الرأسي).","الحالة (ب): مجموع القراءتين = 4.9 N = وزن الثقل. الحالة (ج): مجموع القراءتين = 9.8 N ≠ وزن الثقل؛ مع أن محصّلتهما (المتّجهة) تساوي الوزن.","كلا الادّعاءين ممكن؛ فقد يكون المجموع 10 N إذا كانت القوّتان في الاتجاه نفسه (ادّعاء يمان)، و5 N إذا كانت الزاوية بينهما 120° (ادّعاء هيا). أستنتج أن جمع القوى ليس جمعًا جبريًّا بل جمع متّجهات يعتمد على الاتجاه."],
 build(S,A){S.rect(120,50,560,14,{rx:4,fill:"#6d4c41"});const RG=[400,320];const ring=S.circ(RG[0],RG[1],9,{fill:"none",stroke:"#455a64","stroke-width":4});ring.style.display="none";
  const b1=sbal(S),b2=sbal(S);S.tr(b1,400,250);b2.style.display="none";const th1=S.line(400,64,400,82,{stroke:"#555","stroke-width":2}),th2=S.line(0,0,0,0,{stroke:"#555","stroke-width":2});
  const W=4.9;const w=weight(S,null,"500 g");S.tr(w,120,400);let st=0;
  A.say("علّقي الثقل بالميزان الأول: اسحبيه إلى خطّاف الميزان.");
  S.drag(w,{back:true,targets:()=>st===0?[{box:[360,200,80,100],fn:async()=>{st=1;await S.moveTo(w,400,250,300);b1.set(W);A.rec({c:"أ",r1:f2(W),r2:"—"});A.obs("الحالة (أ): قراءة الميزان = "+f2(W)+" N (وزن الثقل).");A.step(0);
     A.say("علّقي الميزان الثاني بالحلقة إضافةً إلى الأول: اسحبي الميزان الثاني.");b2.style.display="";S.tr(b2,640,300);return "stay";}}]:[]});
  const pose=th=>{const L=170,r=th*Math.PI/180;ring.style.display="";S.tr(w,RG[0],RG[1]);const T=W/(2*Math.cos(r));
    S.tr(b1,RG[0],RG[1],-th);S.tr(b2,RG[0],RG[1],th);b1.set(T);b2.set(T);const t1=[RG[0]-Math.sin(r)*L,RG[1]-Math.cos(r)*L-6],t2=[RG[0]+Math.sin(r)*L,RG[1]-Math.cos(r)*L-6];
    th1.setAttribute("x1",t1[0]);th1.setAttribute("y1",t1[1]);th1.setAttribute("x2",t1[0]);th1.setAttribute("y2",64);th2.setAttribute("x1",t2[0]);th2.setAttribute("y1",t2[1]);th2.setAttribute("x2",t2[0]);th2.setAttribute("y2",64);return T;};
  S.drag(b2,{back:true,targets:()=>st===1?[{box:[340,220,120,140],fn:async()=>{st=2;S.tr(b1,RG[0]-1,RG[1]);await sleep(100);let T=pose(0);
     S.tr(b1,RG[0]-16,RG[1],0);S.tr(b2,RG[0]+16,RG[1],0);th1.setAttribute("x1",384);th1.setAttribute("x2",384);th2.setAttribute("x1",416);th2.setAttribute("x2",416);
     A.rec({c:"ب",r1:f2(T),r2:f2(T)});A.obs("الحالة (ب): قراءة كل ميزان = "+f2(T)+" N، ومجموعهما = "+f2(2*T)+" N.");A.step(1);
     A.say("أزيحي الميزانين: أحدهما يمينًا والآخر يسارًا، حتى تساوي قراءة كلٍّ منهما قراءة الحالة (أ).");A.ui.clear();let cur=0;
     const sl=A.ui.slider("↔️ زاوية كل ميزان عن الرأسي",0,75,1,0,v=>{cur=v;const T=pose(v);bt.disabled=Math.abs(T-W)>0.06;},"°");
     const bt=A.ui.btn("📝 سجّلي القراءتين",()=>{const T=pose(cur);A.rec({c:"ج",r1:f2(T),r2:f2(T)});A.obs("الحالة (ج): قراءة كل ميزان = "+f2(T)+" N عند زاوية "+cur+"° لكلٍّ منهما (120° بينهما)، ومجموع القراءتين "+f2(2*T)+" N ≠ وزن الثقل.");A.step(2);A.ui.clear();});bt.disabled=true;A.ui.add(bt);return "stay";}}]:[]});
 }});

/* ---------- 2) طاولة القوى ---------- */
BX.reg("p10-1-2-0",{cols:[["n","المحاولة"],["m","الكتلة لكل حامل (حامل + ثقل)"],["F","القوّة لكل خيط F = mg (N)"],["a","تدريجات الخيوط"]],
 conclude:"عند الاتزان تكون محصّلة القوى الثلاث صفرًا؛ فمحصّلة أيّ قوّتين تساوي القوّة الثالثة مقدارًا وتعاكسها اتجاهًا. وللقوى الثلاث المتساوية تكون الزاوية بين كل قوّتين 120°.",
 ans:["F = mg = 0.15 × 9.8 = 1.47 N لكل خيط في المحاولة الأولى (و2.45 N في الثانية)، ومحصّلة القوى الثلاث = صفر (الحلقة متّزنة).","بالرسم (طريقة متوازي الأضلاع): محصّلة القوّتين المتساويتين اللتين بينهما 120° تساوي مقدار إحداهما (1.47 N)، واتجاهها على منصّف الزاوية بينهما (60°).","محصّلة القوّتين الأولى والثانية تساوي القوّة الثالثة في المقدار، وتعاكسها في الاتجاه (60° مقابل 240°).","محصّلة أيّ قوّتين تساوي القوّة الثالثة مقدارًا وتعاكسها اتجاهًا (القوّة الثالثة هي القوّة الموازنة).","محصّلة القوى الثلاث بيانيًّا = صفر؛ لأن الحلقة متّزنة (المضلّع المغلق).","(تتشابه النتائج: تنطبق الحلقة على المركز عند التدريج 240° تقريبًا؛ وتعود الفروق البسيطة إلى الاحتكاك في البكرات وأخطاء القراءة)."],
 build(S,A){const C=[290,265],RD=175;const tb=S.g();S.circ(C[0],C[1],RD+12,{fill:"#eceff1",stroke:"#78909c","stroke-width":3},tb);S.circ(C[0],C[1],RD,{fill:"#fff",stroke:"#b0bec5"},tb);
  for(let a=0;a<360;a+=10){const r=a*Math.PI/180,l=a%30?8:16;S.line(C[0]+Math.cos(r)*RD,C[1]-Math.sin(r)*RD,C[0]+Math.cos(r)*(RD-l),C[1]-Math.sin(r)*(RD-l),{stroke:"#607d8b"},tb);if(a%30===0)S.text(C[0]+Math.cos(r)*(RD-30),C[1]-Math.sin(r)*(RD-30)+4,a+"°",{"font-size":10,fill:"#455a64"},tb);}
  S.circ(C[0],C[1],5,{fill:"#c62828"},tb);S.label(C[0],C[1]+RD+30,"طاولة القوى (منظر علوي)",tb,"#455a64");
  const strs=S.g();const ring=S.circ(C[0],C[1],14,{fill:"none",stroke:"#37474f","stroke-width":4});
  const bal=S.balance(660,440);const hg=S.g();S.tr(hg,560,120);S.line(0,-30,0,0,{stroke:"#555"},hg);S.rect(-6,0,12,40,{rx:3,fill:"#78909c"},hg);S.rect(-16,40,32,8,{rx:2,fill:"#546e7a"},hg);S.text(0,66,"حامل أثقال",{"font-size":11},hg);
  let ang=[0,120,200],m=0,set=0,n=0;const MH=0.05;
  const draw=()=>{strs.innerHTML="";let fx=0,fy=0;if(!m){ring.setAttribute("cx",C[0]);ring.setAttribute("cy",C[1]);return 0;}ang.forEach(a=>{const r=a*Math.PI/180;fx+=Math.cos(r);fy+=Math.sin(r);});const net=Math.hypot(fx,fy)*m*g0;
    const off=Math.min(50,net*40);const ox=fx/Math.hypot(fx,fy||1e-9)*off||0,oy=fy/Math.hypot(fx||1e-9,fy)*off||0;const rx=C[0]+(isFinite(ox)?ox:0),ry=C[1]-(isFinite(oy)?oy:0);ring.setAttribute("cx",rx);ring.setAttribute("cy",ry);
    ang.forEach((a,i)=>{const r=a*Math.PI/180;const ex=C[0]+Math.cos(r)*(RD+12),ey=C[1]-Math.sin(r)*(RD+12);S.line(rx,ry,ex,ey,{stroke:["#c62828","#1565c0","#2e7d32"][i],"stroke-width":3},strs);S.circ(ex,ey,9,{fill:"#455a64"},strs);S.text(ex+Math.cos(r)*22,ey-Math.sin(r)*22+4,Math.round((MH+m)*1000)+"g",{"font-size":11},strs);});return net;};
  A.say("قيسي كتلة حامل الأثقال: اسحبيه إلى الميزان الإلكتروني.");
  S.drag(hg,{back:true,targets:()=>!A.is(0)?[{g:bal.g||bal,fn:async()=>{bal.set(50);A.obs("كتلة حامل الأثقال = 50 g = 0.05 kg.");A.step(0);go(0.1);}}]:[]});
  function go(w){m=w;set++;A.say("ضعي ثقلًا ("+w*1000+" g) على كل حامل، واضبطي الخيطين على 0° و120°.");nextBtn(A,"⚖️ ضعي الأثقال واضبطي الخيطين (0° و120°)",()=>{m=MH+w;ang=[0,120,200];draw();A.say("حرّكي خيط الحامل الثالث حتى ينطبق مركز الحلقة على مركز الطاولة.");A.ui.clear();
    A.ui.slider("🧵 تدريج الخيط الثالث",130,350,1,200,v=>{ang[2]=v;const net=draw();b.disabled=net>0.03;},"°");const b=A.ui.btn("📝 انطبق المركز — سجّلي",()=>{n++;A.rec({n,m:Math.round(m*1000)+" g",F:f2(m*g0),a:"0° ، 120° ، "+ang[2]+"°"});A.obs("المحاولة "+n+": انطبق مركز الحلقة على مركز الطاولة عند التدريج "+ang[2]+"° (القوى: "+f2(m*g0)+" N لكلٍّ منها).");
      if(set===1){A.step(1);go(0.2);}else{A.step(2);A.ui.clear();A.obs("لم تتغيّر نتيجة الزاوية (240°) بتغيّر الأثقال المتساوية، وإنّما تغيّر مقدار القوى.");}},"gold");b.disabled=true;A.ui.add(b);});}
 }});

/* ---------- 3) مركّبتا القوّة (الباب) ---------- */
BX.reg("p10-1-2-1",{cols:[["F","مقدار القوّة (N)"],["t","الزاوية بين الباب والقوّة θ"],["p","المركّبة الموازية للباب (N)"],["v","المركّبة العمودية على الباب (N)"]],
 conclude:"المركّبة العمودية على مستوى الباب (F sinθ) هي التي تُديره، أمّا المركّبة الموازية (F cosθ) فلا أثر لها في فتحه؛ لذا يلزم أقل قوّة عند θ = 90°، ويستحيل فتح الباب عند θ = 0°.",
 ans:["θ = 60°: F∥ = F cos60 ≈ 0.5F، F⊥ = F sin60 ≈ 0.87F. θ = 90°: F∥ = 0، F⊥ = F. (انظري الجدول)","كلّما زادت θ قلّت المركّبة الموازية (F cosθ) وزادت المركّبة العمودية (F sinθ).","كلّما زادت الزاوية θ (حتى 90°) قلّت القوّة اللازمة لتحريك الباب.","عند θ = 0° (القوّة موازية لمستوى الباب) لا يُمكن فتح الباب.","عند θ = 90° (القوّة عمودية على الباب).","المركّبة العمودية للقوّة هي المسؤولة عن تدوير الباب، وأثر القوّة في تحريك الجسم يعتمد على اتجاهها، لا على مقدارها فقط."],
 build(S,A){const H=[150,330],L=300,NEED=3.0;S.rect(60,322,90,16,{fill:"#8d6e63"});S.rect(H[0]+L+10,322,180,16,{fill:"#8d6e63"});S.label(400,470,"منظر علوي للباب",null,"#455a64");
  const door=S.g();S.tr(door,H[0],H[1]);S.rect(0,-8,L,16,{rx:3,fill:S.lg(["#a1887f","#6d4c41"],1)},door);S.circ(0,0,8,{fill:"#455a64"},door);const hd=S.circ(L-20,0,7,{fill:"#ffd54f",stroke:"#8d6e63","stroke-width":2},door);
  const fx=S.g();let th=null,F=0,open=false,tied=false;const done={};
  const draw=()=>{fx.innerHTML="";if(!tied||th==null)return;const hx=H[0]+(L-20)*Math.cos(door._r*Math.PI/180),hy=H[1]+(L-20)*Math.sin(door._r*Math.PI/180);const r=th*Math.PI/180,len=60+F*14;
    const ex=hx+Math.cos(r)*len,ey=hy-Math.sin(r)*len;S.line(hx,hy,ex,ey,{stroke:"#555","stroke-width":2,"stroke-dasharray":"4 3"},fx);const sb=S.g(fx);S.tr(sb,ex,ey,90-th);S.rect(-12,-60,24,60,{rx:6,fill:"#cfd8dc",stroke:"#607d8b"},sb);S.label(ex+30,ey-30,f2(F)+" N",fx,"#263238");
    if(F>0){S.arrow(hx,hy,hx+Math.cos(r)*F*14,hy,"#1565c0",fx,3);S.arrow(hx,hy,hx,hy-Math.sin(r)*F*14,"#c62828",fx,3);}
    S.path("M"+(hx+30)+" "+hy+" A30 30 0 0 0 "+(hx+Math.cos(r)*30)+" "+(hy-Math.sin(r)*30),{stroke:"#B8902A","stroke-width":2,fill:"none"},fx);S.text(hx+44,hy-14,"θ="+th+"°",{"font-size":12,fill:"#B8902A"},fx);};
  S.tr(door,H[0],H[1],0);A.say("ثبّتي أحد طرفي الخيط بمقبض الباب، والطرف الآخر بالميزان النابضي.");
  nextBtn(A,"🧵 اربطي الخيط بالمقبض والميزان",()=>{tied=true;A.step(0);ui();});
  function ui(){A.ui.clear();A.ui.choice("📐 الزاوية θ بين الخيط ومستوى الباب:",[[0,"0° (موازٍ)"],[60,"60°"],[90,"90° (قائمة)"]],v=>{th=v;F=0;sl.value=0;sl.dispatchEvent(new Event("input"));close();});
    const sl=A.ui.slider("💪 قوّة الشدّ",0,10,0.1,0,v=>{F=v;pull();},"N");A.say("اختاري الزاوية، ثم زيدي قوّة الشدّ تدريجيًّا بدءًا بالصفر.");}
  async function close(){if(open){open=false;await S.moveTo(door,H[0],H[1],400,0);}draw();}
  function pull(){if(th==null){A.toast("اختاري الزاوية أولًا");return;}draw();const per=F*Math.sin(th*Math.PI/180);
    if(th===0&&F>=8&&!done[0]){done[0]=1;A.rec({F:"حتى 10 (لم يتحرّك)",t:"0°",p:"= F",v:"0"});A.obs("θ = 0°: لم يتحرّك الباب مهما زادت قوّة الشدّ؛ لأن المركّبة العمودية = صفر.");A.step(1);A.say("الآن اجعلي θ = 60°، وزيدي الشدّ من الصفر حتى يبدأ الباب بالحركة.");}
    if(th>0&&per>=NEED&&!open){open=true;S.moveTo(door,H[0],H[1],700,-35).then(draw);if(!done[th]){done[th]=1;const r=th*Math.PI/180;A.rec({F:f2(F),t:th+"°",p:f2(F*Math.cos(r)),v:f2(F*Math.sin(r))});A.obs("θ = "+th+"°: بدأ الباب بالحركة عند قراءة "+f2(F)+" N.");
      if(th===60){if(!done[0])A.toast("جرّبي أيضًا θ = 0°");A.step(2);A.say("كرّري باستعمال زاوية قائمة θ = 90°.");}if(th===90)A.step(3);}}}
 }});

/* ---------- مدرج هوائي مشترك ---------- */
const PX=500,X0=140;
function airTrack(S,o={}){const T={};S.rect(60,212,660,18,{rx:4,fill:S.lg(["#cfd8dc","#90a4ae"],1),stroke:"#607d8b"});for(let x=80;x<700;x+=16)S.circ(x,221,2,{fill:"#546e7a"});S.rect(90,230,20,240,{fill:"#78909c"});S.rect(660,230,20,240,{fill:"#78909c"});
  T.pump=S.g();S.tr(T.pump,40,250);S.rect(-30,-20,50,50,{rx:6,fill:"#607d8b"},T.pump);S.text(-5,48,"مضخّة",{"font-size":11},T.pump);T.air=S.g();
  T.pul=S.g();S.tr(T.pul,724,212);S.circ(0,0,13,{fill:"#eceff1",stroke:"#455a64","stroke-width":3},T.pul);S.line(-12,10,-30,10,{stroke:"#455a64","stroke-width":4},T.pul);T.pul.style.display="none";
  T.cart=S.g();S.rect(-40,-26,80,26,{rx:4,fill:S.lg(["#ef5350","#b71c1c"],1)},T.cart);S.rect(-10,-40,20,14,{fill:"#212121"},T.cart);T.cart.style.display="none";T.str=S.line(0,0,0,0,{stroke:"#333","stroke-width":1.5});T.str2=S.line(0,0,0,0,{stroke:"#333","stroke-width":1.5});
  T.hang=S.g();S.line(0,0,0,12,{stroke:"#555","stroke-width":2},T.hang);S.rect(-14,12,28,26,{rx:3,fill:"#546e7a"},T.hang);T.hlab=S.text(0,30,"",{"font-size":10,fill:"#fff"},T.hang);T.hang.style.display="none";
  T.gates=[0,1].map(i=>{const g=S.g();S.path("M-14 0 L-14 -60 L14 -60 L14 0",{stroke:"#263238","stroke-width":5,fill:"none"},g);S.circ(-14,-30,4,{fill:"#e53935"},g);return g;});
  T.timer=S.screen(400,90,170,"0.000 s");T.x=0;
  T.place=(x,y)=>{T.x=x;const cx=X0-40+x*PX;S.tr(T.cart,cx,212);T.str.setAttribute("x1",cx+40);T.str.setAttribute("y1",200);T.str.setAttribute("x2",724);T.str.setAttribute("y2",200);const hy=240+x*PX*.45;T.str2.setAttribute("x1",737);T.str2.setAttribute("y1",212);T.str2.setAttribute("x2",737);T.str2.setAttribute("y2",hy);S.tr(T.hang,737,hy);};
  T.on=v=>{T.air.innerHTML="";if(v)for(let x=100;x<680;x+=40)S.path("M"+x+" 210 q4 -6 0 -12",{stroke:"#81d4fa","stroke-width":2,fill:"none"},T.air);};
  T.run=async(a,d)=>{const t=Math.sqrt(2*d/a);const t0=performance.now();await S.tween(t*1000*1.4,(e,l)=>{const tt=l*t;T.place(Math.min(d+.05,.5*a*tt*tt));T.timer.set(f3(Math.min(tt,t))+" s");});T.timer.set(f3(t)+" s");return t;};
  return T;}

/* ---------- 4) المدرج الهوائي: السرعة المتوسّطة ---------- */
BX.reg("p10-2-1-0",{cols:[["m","الكتلة المعلّقة"],["x","الإزاحة Δx (m)"],["t","زمن الحركة Δt (s)"],["v","السرعة المتوسّطة v̄ (m/s)"]],
 conclude:"قِيست الإزاحة بين البوّابتين والزمن بدقّة بالعدّاد الرقمي، والسرعة المتوسّطة = الإزاحة ÷ الزمن؛ وكلّما زادت الكتلة المعلّقة قلّ زمن الحركة وزادت السرعة المتوسّطة.",
 ans:["(من الجدول) الزمن مع الكتلة 50 g أكبر منه مع الكتلة 100 g.","v̄ = Δx/Δt لكل حالة (انظري الجدول).","عند زيادة الكتلة المعلّقة من 50 g إلى 100 g قلّ زمن الحركة وزادت السرعة المتوسّطة؛ لزيادة القوّة المحرّكة للعربة.","نعم؛ إذا كان التسارع ثابتًا وبدأت العربة من السكون، فإن السرعة المتوسّطة = (v₁ + v₂)/2، فتكون السرعة النهائية = 2 × السرعة المتوسّطة."],
 build(S,A){const T=airTrack(S);const MC=0.2,D=1.0;let mh=0,runs=0;T.gates.forEach((g,i)=>S.tr(g,i?520:300,470));
  const ms=[0.05,0.1].map((m,i)=>{const g=S.g();S.tr(g,560+i*80,430);S.rect(-16,0,32,30,{rx:3,fill:"#546e7a"},g);S.text(0,20,m*1000+"g",{"font-size":11,fill:"#fff"},g);g.m=m;g.style.display="none";return g;});
  A.say("جهّزي المدرج الهوائي وثبّتيه أفقيًّا، ثم صِلي البوّابتين بالعدّاد الزمني.");
  nextBtn(A,"🔧 ثبّتي المدرج أفقيًّا وصِلي البوّابتين بالعدّاد",()=>{S.label(400,140,"✓ المدرج أفقي",null,"#2e7d32");A.step(0);
    nextBtn(A,"🛞 ثبّتي البكرة وضعي العربة واربطيها بالخيط",()=>{T.pul.style.display="";T.cart.style.display="";T.place(0);A.step(1);A.ui.clear();A.say("ثبّتي البوّابتين فوق المدرج: الأولى عند بداية الحركة، والأخرى عند نهايتها (اسحبيهما).");});});
  let gp=0;T.gates.forEach((g,i)=>S.drag(g,{back:true,targets:()=>A.is(1)&&!g.p?[{box:i?[X0+D*PX-40,140,80,90]:[X0-40,140,80,90],fn:async()=>{g.p=1;await S.moveTo(g,i?X0+D*PX:X0,212,250);if(++gp===2){A.step(2);T.hang.style.display="";T.place(0);ms.forEach(x=>x.style.display="");A.say("اربطي الطرف الحرّ للخيط بالكتلة 50 g: اسحبيها إلى طرف الخيط.");}return "stay";}}]:[]}));
  ms.forEach(g=>S.drag(g,{back:true,targets:()=>A.is(2)&&(runs===0?g.m===0.05:runs===1&&g.m===0.1)?[{g:T.hang,pad:40,fn:async()=>{mh=g.m;T.hlab.textContent=g.m*1000+"g";g.style.display="none";T.place(0);
    if(runs===0){A.step(3);A.say("شغّلي مضخّة الهواء (اضغطي عليها)، ثم اتركي الكتلة لتتحرّك.");}else{A.say("شغّلي المضخّة واتركي الكتلة (100 g).");}return true;}}]:[],miss:()=>{if(A.is(2)&&runs===0&&g.m!==0.05)A.toast("ابدئي بالكتلة 50 g");}}));
  let air=false;S.tap(T.pump,()=>{if(!mh)return;air=!air;T.on(air);if(air)nextBtn(A,"▶️ اتركي الكتلة",async()=>{const a=mh*g0/(MC+mh);const t=await T.run(a,D)*(1+R(-.01,.01));T.on(air=false);A.ui.clear();
      if(runs===0){A.step(4);A.step(5);A.obs("تحرّكت العربة من السكون بسرعة متزايدة، وسجّل العدّاد الزمن بين البوّابتين: "+f3(t)+" s.");A.say("قيسي المسافة بين البوّابتين على طول المدرج.");
        nextBtn(A,"📏 قيسي المسافة بين البوّابتين",()=>{S.ruler(X0,190,D*PX,{n:10,step:10});A.rec({m:"50 g",x:f2(D),t:f3(t),v:f2(D/t)});A.step(6);runs=1;mh=0;T.place(0);T.hlab.textContent="";A.ui.clear();A.say("كرّري التجربة بالكتلة الأخرى (100 g): اسحبيها إلى طرف الخيط.");});}
      else{A.rec({m:"100 g",x:f2(D),t:f3(t),v:f2(D/t)});A.obs("بالكتلة 100 g قلّ زمن الحركة إلى "+f3(t)+" s.");A.step(7);runs=2;}},"gold");});
 }});

/* ---------- 5) تسارع السقوط الحرّ ---------- */
BX.reg("p10-2-1-1",{cols:[["n","رقم المحاولة"],["dy","Δy (m)"],["dt","Δt = t₂ − t₁ (s)"],["t2","(Δt)² (s²)"],["y2","2Δy (m)"]],chart:{x:"t2",y:"y2",xl:"(Δt)² (s²)",yl:"2Δy (m)"},
 conclude:"العلاقة بين 2Δy و(Δt)² خطّية تمرّ بنقطة الأصل، وميلها يساوي تسارع السقوط الحرّ g ≈ 9.8 m/s².",
 ans:["الميل الذي حصلنا عليه قريب جدًّا من 9.8 m/s² (الفرق صغير).","بسبب أخطاء القياس (موضع البوّابتين، قياس الارتفاع) واختلاف طريقة الإفلات، ومقاومة الهواء القليلة.","لأن تأثير مقاومة الهواء فيها قليل مقارنة بوزنها. ولو استُخدمت كرة كبيرة خفيفة لزاد أثر مقاومة الهواء، فيقلّ تسارعها ويزداد زمن السقوط، فتقلّ قيمة g المحسوبة."],
 build(S,A){const GY=455,SC=150,X=380;S.rect(0,GY,800,45,{fill:"#a1887f"});S.rect(X+70,GY-340,10,340,{fill:"#78909c"});S.rect(X+40,GY-6,70,10,{fill:"#455a64"});S.rect(X-140,GY-330,8,330,{fill:"#e0e0e0"});
  for(let h=0;h<=2;h+=.5){S.line(X-150,GY-h*SC,X-120,GY-h*SC,{stroke:"#c62828","stroke-width":2});S.text(X-170,GY-h*SC+4,h+" m",{"font-size":11});}S.label(X-140,GY-345,"علامات على الجدار",null,"#455a64");
  const timer=S.screen(620,100,170,"0.000 s");const gate=(y)=>{const g=S.g();S.tr(g,X,y);S.rect(-30,-6,60,12,{rx:3,fill:"#263238"},g);S.circ(-30,0,4,{fill:"#e53935"},g);S.line(30,0,75,0,{stroke:"#78909c","stroke-width":5},g);return g;};
  const g1=gate(GY+20),g2=gate(GY+20);S.tr(g1,560,300);S.tr(g2,560,360);const ball=S.circ(X,0,10,{fill:"#e53935"});ball.style.display="none";let H=1,n=0;const data=[];
  A.say("ثبّتي إحدى البوّابتين عند العلامة (Δy = 1 m): اسحبيها إلى العلامة.");
  S.drag(g1,{back:true,targets:()=>!A.is(0)?[{box:[X-40,GY-SC-30,80,60],fn:async()=>{await S.moveTo(g1,X,GY-SC,250);A.step(0);A.say("ثبّتي البوّابة الأخرى قرب سطح الأرض، ثم صِلي البوّابتين بالعدّاد (اضغطي على العدّاد).");return "stay";}}]:[]});
  let c=0;const ready=()=>{if(c===2){A.step(1);ball.style.display="";ball.parentNode.appendChild(ball);ball.setAttribute("cy",GY-H*SC-26);A.say("أسقطي الكرة لتمرّ أمام البوّابتين: اضغطي على الكرة.");}};
  S.drag(g2,{back:true,targets:()=>A.is(0)&&!g2.p?[{box:[X-40,GY-40,80,60],fn:async()=>{g2.p=1;await S.moveTo(g2,X,GY,250);c++;ready();return "stay";}}]:[]});
  S.tap(timer.g,()=>{if(!A.is(0)||timer.c)return;timer.c=1;S.wire([[540,100],[X+75,GY-SC]],"#455a64");S.wire([[540,110],[X+75,GY]],"#455a64");c++;ready();});
  S.tap(ball,async()=>{if(!A.is(1)||S.busy)return;S.busy=1;const t=Math.sqrt(2*H/g0)+R(-.004,.004);const y0=GY-H*SC-26;await S.tween(t*1000*2,(e,l)=>{const tt=l*t;ball.setAttribute("cy",y0+.5*g0*tt*tt*SC*(1+16/(H*SC)));timer.set(f3(tt)+" s");});timer.set(f3(t)+" s");S.busy=0;
    n++;data.push([H,t]);A.rec({n,dy:H.toFixed(1),dt:f3(t),t2:"",y2:""});A.obs("المحاولة "+n+": Δy = "+H+" m، Δt = "+f3(t)+" s.");A.step(n+1);
    if(n<3){H=n===1?1.5:2;A.ui.clear();A.ui.add(A.ui.btn("⬆️ ارفعي البوّابة العليا إلى "+H+" m",async b=>{b.disabled=true;await S.moveTo(g1,X,GY-H*SC,400);ball.setAttribute("cy",GY-H*SC-26);ball.parentNode.appendChild(ball);A.ui.clear();A.say("أسقطي الكرة مرّة أخرى (Δy = "+H+" m).");},"gold"));}
    else{ball.style.display="none";nextBtn(A,"🧮 أكملي الجدول: (Δt)² و 2Δy",()=>{A.setRows(data.map(([h,t],i)=>({n:i+1,dy:h.toFixed(1),dt:f3(t),t2:f3(t*t),y2:(2*h).toFixed(1)})));A.step(5);
      nextBtn(A,"📈 مثّلي بيانيًّا واحسبي الميل",()=>{const sxy=data.reduce((s,[h,t])=>s+t*t*2*h,0),sxx=data.reduce((s,[h,t])=>s+t**4,0);const k=sxy/sxx;A.obs("ميل المنحنى (2Δy مقابل (Δt)²) = "+f2(k)+" m/s² ≈ تسارع السقوط الحرّ.");A.say("الميل = "+f2(k)+" m/s². قارنيه بالقيمة المقبولة 9.8 m/s².");A.step(6);A.ui.clear();});});}});
 }});

/* ---------- 6) مقاومة الهواء والأكواب الورقية ---------- */
function fallT(h,vt){let y=0,v=0,t=0;const dt=.001;while(y<h){const a=g0*(1-(v*v)/(vt*vt));v+=a*dt;y+=v*dt;t+=dt;}return t;}
BX.reg("p10-2-1-2",{cols:[["p","الجزء"],["c","الكوب"],["d","مسافة السقوط (m)"],["t1","t₁ (s)"],["t2","t₂ (s)"],["t3","t₃ (s)"],["ta","متوسّط الزمن (s)"],["v","السرعة الحدّية التقريبية (m/s)"]],
 conclude:"تزداد مقاومة الهواء بزيادة السرعة حتى تساوي الوزن فيتحرّك الكوب بسرعة ثابتة (السرعة الحدّية)؛ وتقلّ السرعة الحدّية بزيادة مساحة القاعدة (عند ثبات الكتلة)، وتزداد بزيادة الكتلة (عند ثبات المساحة).",
 ans:["تزداد السرعة في البداية لفترة قصيرة، ثم تصبح ثابتة تقريبًا؛ لأن مقاومة الهواء تزداد بزيادة السرعة حتى تساوي وزن الكوب فتصبح المحصّلة صفرًا.","الكوب الأصغر مساحةً أسرع، والأكبر مساحةً أبطأ.","علاقة عكسية: كلّما زادت مساحة القاعدة قلّت السرعة؛ وتُسمّى السرعة الحدّية.","زيادة مساحة القاعدة تزيد مقاومة الهواء عند السرعة نفسها، فتتساوى المقاومة مع الوزن عند سرعة أقل.","لتغيير متغيّر واحد فقط (الكتلة)؛ فتكون المقارنة عادلة ونعرف أثر الكتلة وحدها.","الأكواب الأكبر كتلةً (3 أكواب) أسرع من الأقل كتلةً (كوب واحد).","علاقة طردية: كلّما زادت الكتلة زادت السرعة الحدّية.","زيادة الكتلة تزيد الوزن، فيحتاج الكوب إلى سرعة أكبر لتصبح مقاومة الهواء مساوية لوزنه.","كرة التنس أكبر كتلة مقارنة بمساحتها، فأثر مقاومة الهواء فيها أقل كثيرًا، وتقترب حركتها من السقوط الحرّ، أمّا الكوب فيصل سريعًا إلى سرعته الحدّية.","(تختلف النتائج قليلًا بسبب زمن ردّ فعل من يشغّل ساعة الإيقاف، واختلاف ارتفاع الإسقاط، وتيارات الهواء)."],
 build(S,A){const GY=455,TOP=130,Hm=2.0,SC=(GY-TOP)/Hm;S.rect(0,GY,800,45,{fill:"#a1887f"});S.rect(470,330,220,14,{fill:"#8d6e63"});S.rect(480,344,12,111,{fill:"#6d4c41"});S.rect(668,344,12,111,{fill:"#6d4c41"});
  S.emo(560,250,"🧍‍♀️",110);S.emo(720,400,"🧍",70);const w=S.watch(740,300);const wl=S.label(740,350,"0.00 s",null,"#263238");
  const cupG=(r,n)=>{const g=S.g();for(let k=0;k<n;k++)S.path("M"+(-r)+" "+(-k*3)+" L"+r+" "+(-k*3)+" L"+(r*.7)+" "+(22-k*3)+" L"+(-r*.7)+" "+(22-k*3)+"Z",{fill:"#fff8e1",stroke:"#c9a227","stroke-width":1.5},g);return g;};
  const P1=[["الأصغر",14,2.25],["الأوسط",20,1.85],["الأكبر",28,1.45]],P2=[["كوب واحد",1,1.45],["كوبان",2,2.05],["3 أكواب",3,2.5]];
  let part=1,cur=null,tr=[],cupEl=null,idx=0;const rows=[];
  A.say("قيسي كتل الأكواب الثلاثة، ثم ألصقي ورقًا داخل الصغير والأوسط حتى تتساوى الكتل.");
  const bal=S.balance(160,450);const show=S.g();P1.forEach((c,i)=>{const g=cupG(c[1],1);S.tr(g,90+i*70,330);show.append(g);});
  nextBtn(A,"⚖️ قيسي الكتل",async()=>{for(const m of ["0.75","1.05","1.60"]){bal.set(+m);await sleep(500);}A.obs("كتل الأكواب: الأصغر 0.75 g، الأوسط 1.05 g، الأكبر 1.60 g.");
    nextBtn(A,"📎 ألصقي ورقًا لتتساوى الكتل",()=>{bal.set(1.6);A.obs("بعد لصق الورق: كتلة كل كوب = 1.60 g.");A.step(0);show.remove();A.say("اصعدي بحذر فوق الطاولة وبيدكِ الكوب الأصغر.");start(P1[0]);});});
  function start(c){cur=c;tr=[];if(cupEl)cupEl.remove();cupEl=cupG(part===1?c[1]:20,part===1?1:c[1]);S.tr(cupEl,600,TOP);A.ui.clear();
    if(!(part===1&&idx===0)&&!(part===2&&idx===0))A.say("الآن الكوب: "+c[0]+". أسقطيه ثلاث مرّات.");
    if(part===1&&idx===0){A.step(1);A.say("أسقطي الكوب وقاعدته إلى الأسفل، وزميلتكِ تشغّل ساعة الإيقاف.");}if(part===2&&idx===0){A.step(5);A.say("أسقطي الكوب الواحد ثلاث مرّات.");}
    A.ui.add(A.ui.btn("🫳 أسقطي الكوب",async b=>{b.disabled=true;const vt=c[2],t=fallT(Hm,vt),tm=t+R(-.06,.06);await S.tween(t*1000,(e,l)=>{const tt=l*t;let y=0,v=0;const dt=.002;for(let s=0;s<tt;s+=dt){v+=g0*(1-v*v/(vt*vt))*dt;y+=v*dt;}S.tr(cupEl,600,TOP+Math.min(y,Hm)*SC-22);wl.set(f2(tt)+" s");});
      wl.set(f2(tm)+" s");tr.push(tm);A.obs("الكوب "+c[0]+" — المحاولة "+tr.length+": "+f2(tm)+" s");await sleep(400);S.tr(cupEl,600,TOP);b.disabled=false;
      if(tr.length===3){b.disabled=true;const first=(idx===0);if(first){if(part===1)A.step(2);else A.step(6);
          A.ui.add(A.ui.btn("📏 قيسي مسافة السقوط",()=>{S.ruler(440,TOP,Hm*SC,{rot:90,n:4,step:.5});A.obs("مسافة السقوط = "+Hm.toFixed(1)+" m");A.step(part===1?3:7);fin();},"gold"));}else fin();}},"gold"));}
  function fin(){const avg=tr.reduce((a,b)=>a+b,0)/3;A.rec({p:part===1?"الأول (كتل متساوية)":"الثاني (مساحات متساوية)",c:cur[0],d:Hm.toFixed(1),t1:f2(tr[0]),t2:f2(tr[1]),t3:f2(tr[2]),ta:f2(avg),v:f2(Hm/avg)});idx++;
    const L=part===1?P1:P2;if(idx<3){if(part===1&&idx===2)0;if(part===2&&idx===2)A.step(8);start(L[idx]);}
    else if(part===1){A.step(4);part=2;idx=0;A.say("ثانيًا: كوب ورقي لم يُلصق داخله شيء، ثم ضعي داخله كوبًا مماثلًا، ثم ثالثًا.");start(P2[0]);}
    else{A.step(9);A.ui.clear();A.obs("كلّما زاد عدد الأكواب المتداخلة (الكتلة) قلّ زمن السقوط وزادت السرعة الحدّية.");}}
 }});

/* ---------- 7) المقذوف الأفقي ---------- */
BX.reg("p10-2-2-0",{cols:[["b","عدد الكتب"],["h","h (m)"],["R","R المقيس (m)"],["S","S (m)"],["dt","Δt (s)"],["v","v₀ₓ (m/s)"],["t","t = √(2h/g) (s)"],["Rc","R = t v₀ₓ (m)"]],
 conclude:"زمن سقوط المقذوف الأفقي يعتمد على الارتفاع فقط (t = √(2h/g))، والمدى الأفقي يتناسب طرديًّا مع السرعة الابتدائية الأفقية (R = v₀ₓ t)، والقيم المقيسة قريبة من المحسوبة.",
 ans:["القيم التجريبية قريبة جدًّا من القيم المحسوبة، والفروق البسيطة ناتجة من أخطاء القياس ومقاومة الهواء.","زمن السقوط ثابت لا يتأثّر بالسرعة الابتدائية (يعتمد على h فقط)، والمدى الأفقي يزداد بزيادة السرعة الابتدائية (علاقة طردية).","كلّما زاد عدد الكتب زاد ميل المجرى، فتزداد السرعة الابتدائية الأفقية للكرة عند حافّة الطاولة.","زيادة ارتفاع الطاولة تزيد زمن السقوط، فيزداد المدى الأفقي للكرة."],
 build(S,A){const GY=455,TX=330,TY=290,SC=(GY-TY)/0.8;S.rect(0,GY,800,45,{fill:"#a1887f"});S.rect(60,TY,TX-60,14,{fill:"#8d6e63"});S.rect(80,TY+14,14,GY-TY-14,{fill:"#6d4c41"});S.rect(TX-24,TY+14,14,GY-TY-14,{fill:"#6d4c41"});
  const plumb=S.g();S.line(TX,TY+14,TX,GY-8,{stroke:"#555","stroke-dasharray":"3 3"},plumb);S.path("M"+(TX-6)+" "+(GY-14)+" L"+(TX+6)+" "+(GY-14)+" L"+TX+" "+(GY-2)+"Z",{fill:"#b0bec5"},plumb);S.label(TX-40,GY+22,"نقطة الأصل",plumb,"#455a64");
  const books=S.g(),ramp=S.g();const timer=S.screen(560,90,150,"0.000 s");const gts=S.g();[TX-50,TX-50+0.1*SC].forEach(x=>{S.path("M"+(x)+" "+(TY)+" L"+x+" "+(TY-34),{stroke:"#263238","stroke-width":5},gts);});gts.style.display="none";
  const paper=S.g();S.tr(paper,650,GY-4);S.rect(-34,-4,68,8,{fill:"#212121"},paper);S.label(0,-22,"ورق كربون",paper,"#212121");const marks=S.g();const ball=S.circ(0,0,8,{fill:"#78909c",stroke:"#37474f"});ball.style.display="none";
  const V={2:1.0,3:1.25,4:1.48};let nb=0,last=null;const data=[];const t0=Math.sqrt(2*.8/g0);
  const setB=n=>{nb=n;books.innerHTML="";ramp.innerHTML="";for(let i=0;i<n;i++)S.rect(70,TY-14-i*14,70,13,{rx:2,fill:["#1565c0","#c62828","#2e7d32","#f9a825"][i]},books);S.line(105,TY-14*n,TX-60,TY-2,{stroke:"#90a4ae","stroke-width":6},ramp);S.line(TX-60,TY-2,TX,TY-2,{stroke:"#90a4ae","stroke-width":6},ramp);ball.style.display="";ball.setAttribute("cx",110);ball.setAttribute("cy",TY-14*n-8);};
  A.say("ركّبي أدوات التجربة: ضعي كتابين فوق الطاولة وطرف المجرى فوقهما.");
  nextBtn(A,"📚 ركّبي الأدوات (كتابان + المجرى)",()=>{setB(2);gts.style.display="";A.step(0);nextBtn(A,"📏 قيسي h و S",()=>{S.label(TX+40,TY+80,"h = 0.80 m",null,"#7A1F2E");S.label(TX-45,TY-50,"S = 0.10 m",null,"#7A1F2E");A.obs("ارتفاع الطاولة h = 0.80 m، والمسافة بين البوّابتين S = 0.10 m.");A.step(1);A.ui.clear();A.say("توقّعي مكان سقوط الكرة، وضعي فيه ورق الكربون: اسحبيه.");});});
  S.drag(paper,{free:true,targets:()=>A.is(1)?[{box:[TX+10,GY-60,440,80],fn:async()=>{S.tr(paper,clamp(paper._x,TX+30,760),GY-4);if(!A.is(2)){A.step(2);A.say("صِلي البوّابتين بالعدّاد الزمني وشغّليه: اضغطي على العدّاد.");}return "stay";}}]:[]});
  S.tap(timer.g,()=>{if(!A.is(2)||timer.c)return;timer.c=1;S.wire([[485,90],[TX-50,TY-34]],"#455a64");A.step(3);A.say("ضعي الكرة في أعلى المجرى ثم اتركيها: اضغطي على الكرة.");});
  S.tap(ball,async()=>{if(!A.is(3)||S.busy||last)return;S.busy=1;const v=V[nb]*(1+R(-.015,.015));const x0=110,y0=TY-14*nb-8;await S.tween(700,(e,l)=>{ball.setAttribute("cx",lerp(x0,TX-60,l));ball.setAttribute("cy",lerp(y0,TY-10,l));});
    const dt=0.1/v;await S.tween(dt*1000*3,(e,l)=>{ball.setAttribute("cx",lerp(TX-60,TX,l));timer.set(f3(Math.min(1,l*1.7)*dt)+" s");});timer.set(f3(dt)+" s");
    await S.tween(t0*1000*2,(e,l)=>{const tt=l*t0;ball.setAttribute("cx",TX+v*tt*SC);ball.setAttribute("cy",TY-10+.5*g0*tt*tt*SC);});const Rm=v*t0,lx=TX+Rm*SC;S.busy=0;
    if(Math.abs(lx-paper._x)>34){A.toast("سقطت الكرة خارج ورق الكربون! انقلي الورق إلى مكان السقوط وكرّري.");S.circ(lx,GY-2,4,{fill:"#ffab91"},marks);setTimeout(()=>{ball.setAttribute("cx",110);ball.setAttribute("cy",TY-14*nb-8);},500);if(!A.is(2))0;S.drag;paperReady();return;}
    S.circ(lx,GY-4,4,{fill:"#000"},marks);last={dt,Rm};A.step(4);A.say("سجّلي قراءة العدّاد (Δt) وقيسي الإزاحة الأفقية R من نقطة الأصل.");
    nextBtn(A,"📏 سجّلي Δt وقيسي R",()=>{const Rr=Math.round(Rm*100)/100;data.push({b:nb,dt,R:Rr});A.rec({b:nb,h:"0.80",R:Rr.toFixed(2),S:"0.10",dt:f3(dt),v:"",t:"",Rc:""});A.obs(nb+" كتب: Δt = "+f3(dt)+" s، R = "+Rr.toFixed(2)+" m.");A.step(5);last=null;
      if(nb<4){nextBtn(A,"📚 أضيفي كتابًا "+(nb===2?"ثالثًا":"رابعًا"),()=>{setB(nb+1);A.ui.clear();A.say("أعيدي إطلاق الكرة (قد تحتاجين إلى نقل ورق الكربون).");});}
      else{A.step(6);nextBtn(A,"🧮 احسبي v₀ₓ = S/Δt",()=>{fill(1);A.step(7);nextBtn(A,"🧮 احسبي t و R من المعادلات",()=>{fill(2);A.step(8);A.ui.clear();A.obs("زمن السقوط المحسوب ثابت ("+f3(t0)+" s) لكل المحاولات، والمدى الأفقي يزداد بزيادة v₀ₓ.");});});}});});
  function paperReady(){}
  function fill(k){A.setRows(data.map(d=>{const v=0.1/d.dt;return {b:d.b,h:"0.80",R:d.R.toFixed(2),S:"0.10",dt:f3(d.dt),v:f2(v),t:k>1?f3(t0):"",Rc:k>1?f2(v*t0):""};}));}
 }});

/* ---------- 8) بناء مظلّة هبوط ---------- */
BX.reg("p10-2-2-1",{cols:[["n","الاختبار"],["d","التصميم"],["m","الحمل"],["h","الارتفاع (m)"],["v","سرعة الوصول (m/s)"],["r","النتيجة"]],
 conclude:"المظلّة تزيد مقاومة الهواء فيهبط الجسم بسرعة حدّية صغيرة؛ وتقلّ هذه السرعة بزيادة مساحة المظلّة، وتزداد بزيادة الحمل، ويجب أن تكون المادّة خفيفة ومتينة ولا يمرّ منها الهواء.",
 ans:["إنزال بيضة من نافذة الطابق الثاني إلى الأرض دون أن تنكسر، بإبطاء سرعة هبوطها باستخدام مظلّة.","(مثال) مظلّة قطرها نحو 60 cm أو أكثر، من مادّة خفيفة ومتينة لا ينفذ منها الهواء، بخيوط متساوية الطول تحمل سلّة البيضة في المنتصف.","كيس بلاستيكي أو قماش خفيف، خيوط، لاصق، وكوب ورقي أو علبة صغيرة لحمل البيضة.","زيادة مساحة المظلّة، أو استعمال مادّة لا ينفذ منها الهواء وأكثر متانة، أو تقليل كتلة الحمل، أو إضافة وسادة امتصاص صدمات حول البيضة، وجعل الخيوط متساوية لثبات الهبوط."],
 build(S,A){const GY=460,SC=55;S.rect(0,GY,800,40,{fill:"#a5d6a7"});const bld=S.g();S.rect(520,GY-6.5*SC-20,200,6.5*SC+20,{fill:"#d7ccc8",stroke:"#8d6e63"},bld);S.rect(560,GY-6*SC,50,40,{fill:"#90caf9",stroke:"#5d4037","stroke-width":3},bld);S.text(585,GY-6*SC+60,"نافذة الطابق الثاني",{"font-size":11},bld);
  const MAT={plastic:["كيس بلاستيكي",1.3,true],cloth:["قماش خفيف",1.2,true],paper:["ورق مناديل",1.3,false]};let mat="plastic",D=40,strings="eq",built=false,n=0;
  const para=S.g();const drawP=(m,egg)=>{para.innerHTML="";const r=D*0.9;S.path("M"+(-r)+" 0 Q0 "+(-r*0.9)+" "+r+" 0Z",{fill:mat==="plastic"?"#e1f5fe":mat==="cloth"?"#f8bbd0":"#fffde7",stroke:"#607d8b","stroke-width":2},para);
    [-r,-r/2,r/2,r].forEach(x=>S.line(x,0,0,50,{stroke:"#555"},para));if(egg)S.ell(0,60,9,12,{fill:"#fff8e1",stroke:"#bca37f","stroke-width":2},para);else S.rect(-10,50,20,18,{rx:3,fill:m>0.04?"#546e7a":"#90a4ae"},para);};
  const vt=m=>{const A2=Math.PI*Math.pow(D/200,2);return Math.sqrt(2*m*g0/(1.2*MAT[mat][1]*A2))*(strings==="eq"?1:1.25);};
  const vimp=(m,h)=>{const V=vt(m);let y=0,v=0;const dt=.002;while(y<h){v+=g0*(1-v*v/(V*V))*dt;y+=v*dt;}return v;};
  A.say("حدّدي المشكلة التي ستحلّينها بصنع المظلّة.");
  quiz(A,[["ما المشكلة التي يتعيّن عليّ حلّها بصنع المظلّة؟",[[0,"إنزال بيضة من نافذة الطابق الثاني إلى الأرض دون أن تنكسر"],[1,"رمي البيضة لأبعد مسافة"],[2,"جعل البيضة تسقط بأسرع ما يمكن"]],0,"الهدف إبطاء الهبوط لحماية البيضة."]],()=>{A.step(0);design();});
  function design(){A.ui.clear();A.say("صمّمي المظلّة: اختاري المادّة والقطر والخيوط، ثم ابنيها.");A.ui.choice("🧵 المادّة:",Object.entries(MAT).map(([k,v])=>[k,v[0]]),v=>{mat=v;drawP(0.03);},mat);A.ui.slider("⭕ قطر المظلّة",20,100,5,D,v=>{D=v;drawP(0.03);},"cm");
    A.ui.choice("🪢 الخيوط:",[["eq","متساوية الطول"],["un","غير متساوية"]],v=>{strings=v;},strings);A.ui.add(A.ui.btn("🛠️ ابني المظلّة",()=>{built=true;if(!A.is(1))A.step(1);A.obs("التصميم: "+MAT[mat][0]+"، قطر "+D+" cm، خيوط "+(strings==="eq"?"متساوية":"غير متساوية")+".");tests();},"gold"));S.tr(para,300,200);drawP(0.03);}
  async function drop(m,h,egg){S.busy=1;drawP(m,egg);const v=vimp(m,h),V=vt(m);const top=GY-h*SC-70;let y=0,u=0;const dt=.004;const path=[];while(y<h){u+=g0*(1-u*u/(V*V))*dt;y+=u*dt;path.push(y);}const T=path.length*dt;
    await S.tween(Math.min(3500,T*1000),(e,l)=>{const i=Math.min(path.length-1,Math.floor(l*path.length));S.tr(para,egg?585:300,top+path[i]*SC);});S.busy=0;return v;}
  function rec(m,h,v,egg){n++;const safe=v<=3;const tear=!MAT[mat][2]&&m>=0.06;const r=tear?"تمزّقت المظلّة":egg?(safe?"🥚 وصلت سليمة":"💥 انكسرت"):(safe?"سرعة آمنة":"سرعة كبيرة");A.rec({n,d:MAT[mat][0]+" "+D+"cm",m:egg?"بيضة 60 g":m*1000+" g",h:h,v:tear?"—":f2(v),r});return {safe:safe&&!tear,tear};}
  function tests(){A.ui.clear();const B=(t,fn)=>A.ui.add(A.ui.btn(t,async b=>{if(S.busy)return;await fn();}));
    B("🧪 جسم تجريبي 30 g من 1.5 m",async()=>{const v=await drop(0.03,1.5);rec(0.03,1.5,v);A.obs("من ارتفاع منخفض: سرعة الوصول "+f2(v)+" m/s.");if(!A.is(2))A.step(2);});
    B("🧪 الجسم نفسه من 6 m",async()=>{if(!A.is(2)){A.toast("ابدئي بالارتفاع المنخفض");return;}const v=await drop(0.03,6);rec(0.03,6,v);A.obs("من ارتفاع أكبر: سرعة الوصول "+f2(v)+" m/s (تقترب من السرعة الحدّية).");if(!A.is(3))A.step(3);});
    B("⚖️ حمل أكبر 60 g من 6 m",async()=>{if(!A.is(3)){A.toast("أكملي الاختبارين السابقين");return;}const v=await drop(0.06,6);const r=rec(0.06,6,v);A.obs(r.tear?"تمزّقت المظلّة الورقية بالحمل الأكبر.":"بزيادة الحمل زادت السرعة إلى "+f2(v)+" m/s.");if(!A.is(4))A.step(4);});
    B("🥚 البيضة من نافذة الطابق الثاني",async()=>{if(!A.is(4)){A.toast("أكملي اختبارات الجسم التجريبي أولًا");return;}const v=await drop(0.06,6,true);const r=rec(0.06,6,v,true);
      if(r.safe){A.obs("نجح التصميم: وصلت البيضة سليمة بسرعة "+f2(v)+" m/s.");A.step(5);A.ui.clear();nextBtn(A,"👥 قارني بنتائج المجموعات",()=>{A.obs("مقارنة: المظلّات الأكبر مساحةً ومن موادّ لا ينفذ منها الهواء أنزلت البيضة بسرعة أقل.");A.step(6);A.ui.clear();});}
      else{A.obs(r.tear?"تمزّقت المظلّة وانكسرت البيضة؛ أحتاج إلى مادّة أمتن.":"انكسرت البيضة (السرعة "+f2(v)+" m/s كبيرة)؛ أحتاج إلى تعديل التصميم.");A.say("عدّلي التصميم (مادّة أمتن، قطر أكبر، خيوط متساوية) ثم أعيدي الاختبار.");design();}});}
 }});

/* ---------- 9) القصور الذاتي ---------- */
BX.reg("p10-3-1-0",{cols:[["c","الحالة"],["o","الملاحظة"]],
 conclude:"يميل الجسم إلى المحافظة على حالته الحركية (القصور الذاتي)؛ فعند توقّف اللوح فجأة استمرّ المكعّب في الحركة واندفع إلى الأمام، أمّا عند تثبيته بالشريط فقد توقّف مع اللوح.",
 ans:["في الخطوة (2) اندفع المكعّب إلى الأمام وسقط عن اللوح عند اصطدامه بالحاجز، وفي الخطوة (3) بقي المكعّب المثبّت على اللوح وتوقّف معه.","القصور الذاتي: المكعّب كان يتحرّك مع اللوح، وعند توقّف اللوح فجأة لم تؤثّر في المكعّب قوّة توقفه، فاستمرّ في حركته إلى الأمام.","نعم؛ لأن جسم الراكب يستمرّ في الحركة بسبب القصور الذاتي عند توقّف السيارة فجأة، فيندفع إلى الأمام ويصطدم بما أمامه، وحزام الأمان يؤثّر فيه بقوّة توقفه مع السيارة (كالشريط اللاصق)."],
 build(S,A){const GY=400;S.rect(0,GY,800,100,{fill:"#bcaaa4"});const bar=S.g();S.rect(0,-70,24,70,{fill:"#5d4037"},bar);S.tr(bar,640,GY);bar.style.display="none";
  const bd=S.g();S.rect(-70,-14,140,10,{rx:5,fill:"#ff7043"},bd);S.circ(-50,-2,7,{fill:"#333"},bd);S.circ(50,-2,7,{fill:"#333"},bd);S.tr(bd,180,GY);bd.style.display="none";
  const cb=S.g();S.rect(-22,-44,44,44,{fill:"#d7a86e",stroke:"#8d6e63","stroke-width":2},cb);S.tr(cb,180,GY-14);cb.style.display="none";const tape=S.g();S.rect(-30,-30,60,10,{fill:"#fff59d",opacity:.85},tape);tape.style.display="none";
  let taped=false,k=0;A.say("ضعي لوح التزلّج في منتصف الغرفة، والمكعّب عليه، والحاجز على بُعد 1–2 m.");
  nextBtn(A,"🛹 ضعي اللوح والمكعّب والحاجز",()=>{bd.style.display=cb.style.display=bar.style.display="";S.label(420,GY+40,"≈ 1.5 m",null,"#455a64");A.step(0);A.ui.clear();A.say("ادفعي اللوح باتجاه الحاجز: اضغطي على اللوح.");});
  S.tap(bd,async()=>{if(!A.is(0)||S.busy)return;S.busy=1;const x0=180;await S.tween(1100,(e,l)=>{const x=lerp(x0,558,l*l*.3+l*.7);S.tr(bd,x,GY);if(!taped||true)S.tr(cb,x,GY-14);if(taped)S.tr(tape,x,GY-14);});
    if(!taped){await S.tween(700,(e,l)=>{S.tr(cb,558+l*120,GY-14-Math.sin(l*Math.PI)*60+l*14,l*120);});A.rec({c:"المكعّب غير مثبّت",o:"توقّف اللوح عند الحاجز، واندفع المكعّب إلى الأمام وسقط"});A.obs("عند اصطدام اللوح بالحاجز توقّف اللوح، واستمرّ المكعّب في الحركة واندفع إلى الأمام.");A.step(1);
      S.busy=0;nextBtn(A,"🩹 ثبّتي المكعّب باللوح بالشريط اللاصق",async()=>{S.tr(bd,180,GY);S.tr(cb,180,GY-14,0);S.tr(tape,180,GY-14);tape.style.display="";taped=true;A.ui.clear();A.say("ادفعي اللوح مرّة أخرى.");});}
    else{A.rec({c:"المكعّب مثبّت بالشريط",o:"توقّف اللوح والمكعّب معًا عند الحاجز، ولم يندفع المكعّب"});A.obs("بعد التثبيت بالشريط توقّف المكعّب مع اللوح.");A.step(2);S.busy=0;}});
 }});

/* ---------- 10) القوّة والكتلة والتسارع ---------- */
BX.reg("p10-3-2-0",{cols:[["tb","الجدول"],["n","المحاولة"],["mh","m_hang (kg)"],["mc","m_cart (kg)"],["t","t (s)"],["a","a (m/s²)"],["ma","(m_hang+m_cart)a (N)"],["w","m_hang g (N)"]],
 conclude:"تسارع الجسم يتناسب طرديًّا مع القوّة المحصّلة المؤثّرة فيه عند ثبات كتلته، وعكسيًّا مع كتلته عند ثبات القوّة: ΣF = m a (القانون الثاني لنيوتن).",
 ans:["(m_hang + m_cart)a ≈ m_hang g في كل حالة؛ أي أن القوّة المحصّلة = الكتلة الكلّية × التسارع.","خطّ مستقيم يمرّ بنقطة الأصل؛ أستنتج أن التسارع يتناسب طرديًّا مع القوّة المحصّلة عند ثبات الكتلة.","ميل المنحنى يمثّل الكتلة الكلّية للنظام (m_hang + m_cart).","قلّ التسارع بزيادة كتلة العربة؛ فالتسارع يتناسب عكسيًّا مع الكتلة عند ثبات القوّة المحصّلة."],
 build(S,A){const T=airTrack(S);T.gates.forEach(g=>g.style.display="none");const D=1.0;const MC0=0.2,HG=0.01;let mh=0,mc=0,n=0,tb=1;const rows=[];const info=S.label(400,150,"",null,"#7A1F2E");info.style.display="none";
  const upd=()=>{info.style.display="";info.set("m_hang = "+f3(mh)+" kg · m_cart = "+f3(mc)+" kg");T.hlab.textContent=Math.round(mh*1000)+"g";};
  A.say("ثبّتي المدرج الهوائي أفقيًّا، وثبّتي البكرة في نهايته.");
  const seq=[["🔧 ثبّتي المدرج أفقيًّا والبكرة",()=>{T.pul.style.display="";}],["⚖️ قيسي كتلة العربة وضعيها عند البداية",()=>{T.cart.style.display="";T.place(0);A.obs("كتلة العربة = 0.200 kg.");}],
    ["🧵 اربطي الخيط بالعربة وبحامل الأثقال",()=>{T.hang.style.display="";T.place(0);}],["🚪 ثبّتي البوّابتين (d = 1 m) وحاجز الاصطدام",()=>{T.gates.forEach(g=>g.style.display="");S.tr(T.gates[0],X0,212);S.tr(T.gates[1],X0+D*PX,212);S.rect(X0+D*PX+50,180,10,32,{fill:"#212121"});A.obs("d = 1.00 m");}],
    ["🔌 صِلي البوّابتين بالعدّاد وشغّليه",()=>{S.wire([[315,90],[X0,152]],"#455a64");}],["🏋️ ضعي الأثقال: 2 على الحامل و8 على العربة",()=>{mh=HG+0.02;mc=MC0+0.08;upd();}]];
  let si=0;const nx=()=>{if(si<seq.length){const [t,f]=seq[si];nextBtn(A,t,()=>{f();A.step(si);si++;nx();});}else rel();};nx();
  function rel(){A.say(tb===1?"شغّلي المضخّة وأفلتي العربة، ثم سجّلي زمن العدّاد.":"أفلتي العربة (m_hang ثابتة).");nextBtn(A,"▶️ شغّلي المضخّة وأفلتي العربة",async()=>{T.on(true);T.place(0);const a=mh*g0/(mh+mc);const t=(await T.run(a,D))*(1+R(-.008,.008));T.on(false);n++;rows.push({tb,n,mh,mc,t});
    A.rec({tb:"("+tb+")",n,mh:f3(mh),mc:f3(mc),t:f3(t),a:"",ma:"",w:""});
    if(tb===1){if(n===1){A.step(6);nextBtn(A,"↪️ انقلي ثقلًا من العربة إلى الحامل",()=>{mh+=.01;mc-=.01;upd();T.place(0);rel();});}
      else if(n<4){if(n===2)A.step(7);nextBtn(A,"↪️ انقلي ثقلًا آخر إلى الحامل",()=>{mh+=.01;mc-=.01;upd();T.place(0);rel();});if(n===3){}}
      if(n===4){A.step(8);nextBtn(A,"🧮 احسبي a = 2d/t² و (m_hang+m_cart)a",()=>{calc();A.step(9);graph();tb=2;n=0;mh=0.05;mc=0.2;upd();T.place(0);A.say("ثبّتي m_hang = 0.05 kg، وغيّري كتلة العربة.");rel();});}}
    else{if(n<3)nextBtn(A,"➕ أضيفي 0.1 kg إلى العربة",()=>{mc+=.1;upd();T.place(0);rel();});else{calc();A.step(10);A.ui.clear();A.obs("الجدول (2): بثبات m_hang = 0.05 kg قلّ التسارع بزيادة كتلة العربة.");}}});}
  function calc(){A.setRows(rows.map(r=>{const a=2*D/(r.t*r.t);return {tb:"("+r.tb+")",n:r.n,mh:f3(r.mh),mc:f3(r.mc),t:f3(r.t),a:f2(a),ma:f3((r.mh+r.mc)*a),w:f3(r.mh*g0)};}));}
  function graph(){const g=S.g();S.tr(g,520,300);S.rect(0,0,250,170,{fill:"#fff",stroke:"#B8902A","stroke-width":2,rx:8},g);S.line(30,145,235,145,{stroke:"#333"},g);S.line(30,145,30,15,{stroke:"#333"},g);S.text(130,166,"a (m/s²)",{"font-size":10},g);S.text(14,80,"F",{"font-size":11},g);
    const pts=rows.filter(r=>r.tb===1).map(r=>[2*D/(r.t*r.t),r.mh*g0]);const mx=Math.max(...pts.map(p=>p[0]))*1.15,my=Math.max(...pts.map(p=>p[1]))*1.15;const k=pts[3][1]/pts[3][0];S.line(30,145,230,145-k*mx/my*130,{stroke:"#1d7f8c","stroke-width":2},g);
    pts.forEach(([a,F])=>S.circ(30+a/mx*200,145-F/my*130,4,{fill:"#7A1F2E"},g));S.text(130,14,"F = m_hang g مقابل a",{"font-size":11,fill:"#7A1F2E"},g);A.obs("العلاقة بين القوّة المحصّلة والتسارع خطّية تمرّ بنقطة الأصل، وميلها ≈ الكتلة الكلّية "+f3(rows[0].mh+rows[0].mc)+" kg.");}
 }});

/* ---------- 11) اختبار دمى التصادم ---------- */
const DUM=[["الصغيرة",20,18],["المتوسطة",40,22],["الكبيرة",60,26]];
BX.reg("p10-3-2-1",{cols:[["d","الدمية"],["m","الكتلة (g)"],["t1","المحاولة 1 (cm)"],["t2","المحاولة 2 (cm)"],["t3","المحاولة 3 (cm)"],["av","متوسّط القياسات (cm)"]],
 conclude:"تندفع الدمى خارج العربة عند توقّفها المفاجئ بسبب القصور الذاتي، ويزداد بُعد سقوطها بزيادة كتلتها (القصور الذاتي يزداد بزيادة الكتلة)؛ وحزام الأمان المصمّم جيّدًا يُبقي الدمية داخل العربة.",
 ans:["لأن العربة توقّفت فجأة عند اصطدامها بالمكعّب، أمّا الدمى فاستمرّت في حركتها بسبب القصور الذاتي (لم تؤثّر فيها قوّة توقفها).","الدمية الكبيرة (الأكبر كتلةً).","كتلة الدمية؛ فكلّما زادت الكتلة زاد القصور الذاتي (ممانعة تغيير الحالة الحركية) فقلّ أثر الاحتكاك في إبطائها.","علاقة طردية: كلّما زادت كتلة الجسم زاد قصوره الذاتي.","نعم؛ لأن حزام الأمان يؤثّر في الراكب بقوّة توقفه مع السيارة، فيمنع اندفاعه خارجها أو اصطدامه بالزجاج، ويقلّل الإصابات."],
 build(S,A){const GY=470,TY=330;S.rect(0,GY,800,30,{fill:"#a1887f"});S.rect(60,TY,700,12,{fill:"#8d6e63"});S.rect(80,TY+12,14,GY-TY-12,{fill:"#6d4c41"});S.rect(720,TY+12,14,GY-TY-12,{fill:"#6d4c41"});
  const P0=[110,200],P1=[400,TY];const inc=S.g(),blk=S.g(),rul=S.g();const cart=S.g();S.rect(-34,-22,68,22,{rx:4,fill:"#42a5f5"},cart);S.circ(-22,2,7,{fill:"#333"},cart);S.circ(22,2,7,{fill:"#333"},cart);cart.style.display="none";
  const ang=Math.atan2(P1[1]-P0[1],P1[0]-P0[0])*180/Math.PI;const bal=S.balance(640,250);
  const dumG=(i)=>{const g=S.g();const s=.8+i*.25;S.circ(0,-30*s,8*s,{fill:"#ffcc80",stroke:"#8d6e63"},g);S.rect(-7*s,-22*s,14*s,22*s,{rx:4,fill:"#ff8a65",stroke:"#8d6e63"},g);g.i=i;return g;};
  const dums=DUM.map((d,i)=>{const g=dumG(i);S.tr(g,480+i*50,150);g.style.display="none";return g;});let wd=new Set(),cur=null,tr=[],di=0,belt=null;const res=[];
  A.say("استعملي الصلصال لصناعة ثلاث دمى مختلفة الكتلة.");
  nextBtn(A,"🧸 اصنعي ثلاث دمى من الصلصال",()=>{dums.forEach(d=>d.style.display="");A.step(0);A.ui.clear();A.say("قيسي كتلة كل دمية: اسحبيها إلى الميزان.");});
  dums.forEach(d=>S.drag(d,{back:true,targets:()=>A.is(0)&&!A.is(1)&&!wd.has(d.i)?[{g:bal.g||bal,fn:async()=>{wd.add(d.i);bal.set(DUM[d.i][1]);A.obs("كتلة الدمية "+DUM[d.i][0]+" = "+DUM[d.i][1]+" g");if(wd.size===3){A.step(1);setup();}}}]:A.is(4)&&!cur&&d.i===di?[{g:cart,pad:30,fn:async()=>{cur=d;d.style.display="none";seat();A.say("أفلتي العربة من أعلى المستوى المائل: اضغطي على العربة.");}}]:[]}));
  function setup(){nextBtn(A,"📚 اصنعي المستوى المائل (كتابان)",()=>{S.line(P0[0],P0[1],P1[0],P1[1],{stroke:"#bdbdbd","stroke-width":10},inc);S.rect(90,P0[1],40,TY-P0[1],{fill:"#1565c0"},inc);A.step(2);
    nextBtn(A,"🧱 ثبّتي المكعّب عند نهاية المستوى",()=>{S.rect(P1[0]+30,TY-40,40,40,{fill:"#d7a86e",stroke:"#8d6e63","stroke-width":2},blk);A.step(3);
      nextBtn(A,"📏 ثبّتي المسطرة (صفرها عند نهاية المستوى)",()=>{const r=S.ruler(P1[0]+70,TY,300,{n:6,step:5});S.text(P1[0]+230,TY+30,"cm",{"font-size":11},rul);A.step(4);A.ui.clear();cart.style.display="";S.tr(cart,P0[0]+40,P0[1]+18,ang);A.say("ضعي الدمية الصغيرة في العربة: اسحبيها إلى العربة.");});});});}
  const seatD=S.g();function seat(){seatD.innerHTML="";if(!cur)return;const g=dumG(cur.i);seatD.append(g);S.tr(seatD,cart._x,cart._y-20,cart._r);if(belt){S.line(-12,-14,12,-4,{stroke:belt==="rub"?"#e53935":belt==="str"?"#795548":"#ff9800","stroke-width":3},g);}}
  S.tap(cart,async()=>{if(!cur||S.busy)return;S.busy=1;const x0=P0[0]+40,y0=P0[1]+18;await S.tween(900,(e,l)=>{const t=l*l;S.tr(cart,lerp(x0,P1[0]+0,t),lerp(y0,TY-2,t),ang*(1-Math.max(0,(t-.9)*10)));seat();});
    S.tr(cart,P1[0],TY,0);if(belt){await belted();S.busy=0;return;}
    const dcm=DUM[cur.i][2]+R(-1.5,1.5);const xL=P1[0]+70+dcm*10;await S.tween(600,(e,l)=>{S.tr(seatD,lerp(P1[0],xL,l),TY-20-Math.sin(l*Math.PI)*70+l*20,l*90);});tr.push(dcm);S.busy=0;
    A.say("قيسي بُعد نقطة سقوط الدمية عن نهاية المستوى: "+dcm.toFixed(1)+" cm");nextBtn(A,"📝 سجّلي القراءة",()=>{A.obs("الدمية "+DUM[cur.i][0]+" — المحاولة "+tr.length+": "+dcm.toFixed(1)+" cm");if(tr.length===1&&di===0){A.step(5);A.step(6);}
      if(tr.length<3){again();}else{const av=tr.reduce((a,b)=>a+b,0)/3;A.rec({d:DUM[cur.i][0],m:DUM[cur.i][1],t1:tr[0].toFixed(1),t2:tr[1].toFixed(1),t3:tr[2].toFixed(1),av:av.toFixed(1)});if(di===0)A.step(7);di++;tr=[];
        if(di<3){const d=dums[di];cur=null;seatD.innerHTML="";resetCart();A.ui.clear();A.say("كرّري باستعمال الدمية "+DUM[di][0]+": اسحبيها إلى العربة.");}else{A.step(8);part2();}}});});
  function resetCart(){S.tr(cart,P0[0]+40,P0[1]+18,ang);seat();}
  function again(){resetCart();S.tr(seatD,cart._x,cart._y-20,ang);A.ui.clear();A.say("كرّري: أفلتي العربة مرّة أخرى.");}
  function part2(){cur=dums[1];seatD.innerHTML="";resetCart();seat();A.ui.clear();A.say("الجزء الثاني: صمّمي حزام أمان للدمية المتوسطة، وناقشي مجموعتكِ.");let bm=null,bs2=null;
    A.ui.choice("🎗️ مادّة الحزام:",[["rub","رباط مطّاطي عريض"],["str","خيط رفيع"],["cu","سلك نحاس"]],v=>bm=v);A.ui.choice("📐 شكل الحزام:",[["lap","حول البطن فقط"],["full","كتف + بطن"]],v=>bs2=v);
    A.ui.add(A.ui.btn("🛠️ اصنعي الحزام واربطي الدمية",()=>{if(!bm||!bs2){A.toast("اختاري المادّة والشكل");return;}belt=bm;belt2=bs2;seat();A.step(9);A.ui.clear();A.say("اختبري التصميم أمام المجموعات: أفلتي العربة.");},"gold"));}
  let belt2=null,ev=0;
  async function belted(){let q;if(belt==="rub"&&belt2==="full")q=0;else if(belt==="rub"||belt2==="full")q=1;else q=2;if(belt==="str"||belt==="cu")q=Math.max(q,1);
    if(q===0){await S.tween(300,(e,l)=>S.tr(seatD,cart._x+l*6,cart._y-20,0));}else if(q===1){await S.tween(400,(e,l)=>S.tr(seatD,cart._x+l*25,cart._y-20-l*10,l*40));}else{await S.tween(600,(e,l)=>S.tr(seatD,cart._x+l*150,TY-20-Math.sin(l*Math.PI)*60+l*20,l*90));}
    const R3=[["بقاء الدمية داخل العربة","عدم حدوث إصابات أو تشوّهات للدمية","عدم تقييد حركة الدمية، شكل الحزام جميل"],["خروج بعض أجزاء الدمية من العربة","حدوث تشوّهات أو إصابات بسيطة للدمية","حرّية الحركة متوسطة، شكل الحزام مقبول"],["خروج الدمية كلّها من العربة","حدوث تشوّهات أو إصابات كبيرة للدمية","تقييد حركة الدمية، شكل الحزام غير مقبول"]];
    A.obs("نتيجة الاختبار: "+R3[q][0]+(belt==="str"||belt==="cu"?"، وترك الحزام الرفيع أثرًا في الصلصال (تشوّه).":"."));A.step(10);A.say("قيّمي فاعلية تصميمكِ وفق الجدول (3).");
    A.ui.clear();A.ui.choice("📋 جودة التصميم:",R3.map((r,i)=>[i,r[0]]),v=>{if(v!==q){A.toast("لاحظي ما حدث للدمية في الاختبار");return;}A.obs("التقييم: "+R3[q].join("؛ ")+".");A.step(11);A.ui.clear();if(q>0)A.ui.add(A.ui.btn("🔁 حسّني التصميم وأعيدي الاختبار",()=>{belt=null;part2();}));});}
 }});
})();
