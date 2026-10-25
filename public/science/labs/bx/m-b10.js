/* تجارب العلوم الحياتية — الصف العاشر (كتاب الأنشطة) — مطابقة لخطوات الكتاب */
(function(){const {sleep,lerp,clamp,mix,quiz,pickMany}=BX;const R=(a,b)=>a+Math.random()*(b-a);
const nextBtn=(A,t,fn,cls)=>{A.ui.clear();A.ui.add(A.ui.btn(t,b=>{b.disabled=true;fn(b);},cls||"gold"));};
/* مجهر عام: slides=[{n,bg,draw(S,g,z,t)}], onSeen(slide) عند الوضوح بالتكبير ≥ minObj */
function scope(S,A,slides,onSeen,o={}){const view=S.g();S.tr(view,210,200);const g=S.g();S.tr(g,620,400);
  S.path("M-70 0 L70 0 L60 -20 L-60 -20Z",{fill:"#37474f"},g);S.path("M30 -20 C 60 -80 60 -180 20 -250",{stroke:"#455a64","stroke-width":26,fill:"none","stroke-linecap":"round"},g);S.rect(-60,-120,110,12,{fill:"#263238",rx:3},g);
  S.rect(-14,-300,26,110,{fill:"#455a64",rx:5,transform:"rotate(-15)"},g);S.rect(-30,-195,30,40,{fill:"#607d8b",rx:4},g);S.circ(50,-110,16,{fill:"#546e7a"},g);S.circ(-10,-60,10,{fill:"#fff59d"},g);S.label(0,-322,o.name||"مجهر ضوئي مركّب",g,"#37474f");
  S.circ(0,0,160,{fill:"#111"},view);const cells=S.g(view);cells.setAttribute("clip-path",S.clip(S.mk("circle",{r:150})));S.circ(0,0,152,{fill:"none",stroke:"#263238","stroke-width":10},view);const lab=S.label(0,178,"اسحبي شريحة إلى منصّة المجهر",view,"#263238");
  let cur=null,obj=o.obj0||4,focus=0,t0=performance.now();const seen=new Set();
  const draw=()=>{cells.innerHTML="";if(!cur)return;const blur=Math.abs(focus-50)/12,z=Math.sqrt(obj);const grp=S.g(cells);if(blur>.6)grp.setAttribute("style","filter:blur("+blur.toFixed(1)+"px)");S.circ(0,0,150,{fill:cur.bg||"#f5f5f5"},grp);cur.draw(S,grp,z,(performance.now()-t0)/1000);
    lab.set(cur.n+" · ×"+(obj*10)+(blur>.6?" · حرّكي الضابط":""));if(blur<=.6&&obj>=(o.minObj||40)&&!seen.has(cur)){seen.add(cur);onSeen&&onSeen(cur);}};
  const anim=()=>{if(cur&&cur.live)draw();requestAnimationFrame(anim);};requestAnimationFrame(anim);
  A.ui.clear();A.ui.choice("العدسة الشيئية",(o.objs||[[4,"×4"],[10,"×10"],[40,"×40"],[100,"×100 زيتية"]]).map(x=>x),v=>{obj=v;draw();},obj);const fsl=A.ui.slider("🔧 الضابط (التركيز)",0,100,1,0,v=>{focus=v;draw();});S.knob(g,50,-110,fsl);
  const sl=slides.map((s,i)=>{const e=S.g();S.tr(e,90+i*130,470);S.rect(-55,-12,110,24,{rx:3,fill:"#e1f5fe",stroke:"#81d4fa","stroke-width":2},e);S.ell(0,0,14,6,{fill:s.dot||"#ce93d8",opacity:.8},e);S.text(0,30,s.n,{"font-size":11},e);
    S.drag(e,{back:true,targets:()=>[{g,pad:0,fn:()=>{cur=s;draw();return false;}}]});return e;});
  return {set(s){cur=s;draw();},seen};}

/* ---------- 1) طيور داروين ---------- */
const TOOLS=[["spoon","🥄 ملعقة",{g:7,b:4,c:5,r:9}],["fork","🍴 شوكة",{g:9,b:1,c:2,r:1}],["tw","🗜️ ملقط",{g:4,b:3,c:6,r:8}],["clip","📎 مشبك غسيل",{g:6,b:2,c:7,r:3}]];
const FOOD={g:["حبيبات الجيلاتين","#e91e63"],b:["الكرات الزجاجية","#4fc3f7"],c:["بذور الحمّص","#d7b56d"],r:["بذور الأرز","#fffde7"]};
BX.reg("b10-1-1-0",{cols:[["t","الأداة (نوع المنقار)"],["g","حبيبات الجيلاتين"],["r","بذور الأرز"],["c","بذور الحمّص"],["b","الكرات الزجاجية"]],chart:{x:"t",y:["g","r","c","b"],type:"bar",xl:"الأداة",yl:"عدد ما جُمع",names:{g:"جيلاتين",r:"أرز",c:"حمّص",b:"كرات زجاجية"}},
 conclude:"شكل المنقار يحدّد نوع الغذاء الذي يستطيع الطائر التقاطه وكمّيته؛ فالطيور ذات المناقير الملائمة للغذاء المتوافر تحصل على غذاء أكثر وتبقى وتتكاثر (الانتقاء الطبيعي).",
 ans:["الملعقة (التقطت أكبر عدد من البذور الصغيرة والكبيرة).","نعم؛ فلكل شكل منقار غذاء يلائمه، مثل الشوكة للحبيبات الطرية، والملقط للبذور الصغيرة.","تضعف وتموت، أو تهاجر، فيقلّ عددها في الجيل التالي.","(تصميم الطالبة: مثلًا منقار عريض مقعّر بأطراف دقيقة يجمع بين الملعقة والملقط)."],
 build(S,A){let my=null;A.ui.choice("اختاري أداتكِ (منقاركِ):",TOOLS.map(t=>[t[0],t[1]]),v=>{my=v;A.ui.clear();A.step(0);table();});
  const items=[];function table(){S.rect(130,240,540,140,{rx:20,fill:"#d7ccc8",stroke:"#8d6e63","stroke-width":3});A.say("ضعي كمّيات متساوية من الحلوى والبذور والكرات على الطاولة.");
   nextBtn(A,"🍬 ضعي الغذاء على الطاولة",()=>{Object.entries(FOOD).forEach(([k,[n,c]])=>{for(let i=0;i<14;i++){const e=S.circ(R(160,640),R(260,365),k==="r"?4:k==="c"?7:k==="b"?8:6,{fill:c,stroke:"#555","stroke-width":.6});e.k=k;items.push(e);}});A.step(1);play();});}
  function play(){const T=TOOLS.find(t=>t[0]===my);const cup=S.g();S.tr(cup,720,470);S.path("M-30 -50 L30 -50 L22 0 L-22 0Z",{fill:"#fff",stroke:"#bdbdbd","stroke-width":2},cup);S.text(0,20,"كأسي الورقية",{"font-size":11},cup);
   A.say("ابدئي التقاط الغذاء بأداتكِ: اضغطي على حبّات الغذاء خلال 20 ثانية!");const w=S.watch(80,120);let t=20,got={g:0,b:0,c:0,r:0},on=true;A.step(2);
   const tm=setInterval(()=>{t-=.1;w.set(Math.max(0,20-t));if(t<=0){clearInterval(tm);on=false;finish();}},100);
   items.forEach(e=>S.tap(e,()=>{if(!on||e.got)return;const p=T[2][e.k]/10;if(Math.random()>p){A.toast("أفلتت من "+T[1].split(" ")[1]+"!");return;}e.got=1;got[e.k]++;S.moveTo?0:0;e.setAttribute("cx",720+R(-15,15));e.setAttribute("cy",440+R(-10,0));}));
   function finish(){A.step(3);A.obs("جمعتُ بـ "+T[1]+": "+Object.entries(got).map(([k,v])=>FOOD[k][0]+" "+v).join("، "));
     nextBtn(A,"📋 املئي الجدول مع المجموعات الأخرى",()=>{TOOLS.forEach(x=>{const r=x[0]===my?got:Object.fromEntries(Object.entries(x[2]).map(([k,v])=>[k,Math.round(v*1.4*R(.8,1.15))]));A.rec({t:x[1],g:r.g,r:r.r,c:r.c,b:r.b});});A.step(4);});}}
 }});

/* ---------- 2) نمذجة الأحافير ---------- */
BX.reg("b10-1-1-1",{conclude:"تتكوّن الطبعة عند ضغط الكائن على رسوبيات طرية، ويمثّل ملء تجويفها بمادّة تتصلّب القالب (الأحفورة) الذي يحفظ شكل الكائن.",
 ans:["يمثّل الأحفورة القالبية (القالب) التي تتكوّن عند امتلاء طبعة الكائن بالمعادن وتصلّبها.","شكل الصدفة وحجمها وتفاصيل سطحها الخارجي (الخطوط والتضاريس).","شكل الكائنات القديمة وحجمها وتركيبها وبيئتها، وكيف تغيّرت الأنواع بمرور الزمن."],
 build(S,A){const clay=S.g();S.tr(clay,400,330);const slab=S.ell(0,0,10,4,{fill:"#a1887f"},clay);
  A.say("ابسطي كمّية من الصلصال: اضغطي الزرّ.");nextBtn(A,"🫓 ابسطي الصلصال",async()=>{await S.tween(600,t=>{slab.setAttribute("rx",160*t+10);slab.setAttribute("ry",55*t+4);});shell();});
  function shell(){const sh=S.g();S.tr(sh,680,440);for(let i=0;i<7;i++)S.path("M0 0 L"+(Math.cos(-Math.PI+i*.52)*50)+" "+(Math.sin(-Math.PI+i*.52)*50)+"",{stroke:"#8d6e63","stroke-width":2},sh);S.path("M-50 0 A50 50 0 0 1 50 0Z",{fill:"#ffe0b2",stroke:"#8d6e63","stroke-width":2,opacity:.9},sh);S.text(0,24,"صدفة",{"font-size":11},sh);
   A.say("اضغطي بالصدفة على الصلصال حتى تتكوّن طبعة: اسحبيها إلى الصلصال.");
   S.drag(sh,{back:true,targets:()=>[{g:clay,fn:async()=>{await S.moveTo(sh,400,330,300);await sleep(400);const imp=S.g(clay);S.path("M-50 0 A50 50 0 0 1 50 0Z",{fill:"#6d4c41",opacity:.6},imp);for(let i=0;i<7;i++)S.path("M0 0 L"+(Math.cos(-Math.PI+i*.52)*48)+" "+(Math.sin(-Math.PI+i*.52)*48),{stroke:"#3e2723","stroke-width":2},imp);imp.setAttribute("transform","scale(1 .45)");A.step(0);
     A.say("أزيلي الصدفة بلطف: اسحبيها بعيدًا.");sh._back=1;return "stay";}}]});
   S.tap(sh,async()=>{if(!A.is(0)||A.is(1))return;await S.moveTo(sh,680,440,400);A.step(1);glue(clay);});}
  function glue(clay){const gl=S.bottle(0,0,"#fafafa","غراء");S.tr(gl,150,470,0,.7);A.say("املئي تجويف الطبعة بالغراء الأبيض واتركيه حتى يجفّ: اسحبي الغراء.");
   S.drag(gl,{back:true,oy:-40,targets:()=>[{g:clay,fn:async()=>{await S.pour(gl,460,240,-60,()=>sleep(500));const f=S.path("M-50 0 A50 50 0 0 1 50 0Z",{fill:"#fafafa",transform:"scale(1 .45)"},clay);A.step(2);
     nextBtn(A,"⏳ اتركيه يجفّ ثم أزيليه بلطف",async()=>{await sleep(300);const fos=S.g();S.tr(fos,400,170);S.path("M-50 0 A50 50 0 0 1 50 0Z",{fill:"#eceff1",stroke:"#90a4ae","stroke-width":2},fos);for(let i=0;i<7;i++)S.path("M0 0 L"+(Math.cos(-Math.PI+i*.52)*48)+" "+(Math.sin(-Math.PI+i*.52)*48),{stroke:"#78909c","stroke-width":2},fos);
       S.label(0,30,"قالب الغراء = الأحفورة",fos,"#5d4037");f.remove();A.step(3);A.obs("تكوّن قالب من الغراء يطابق شكل الصدفة وتفاصيلها، والطبعة بقيت في الصلصال.");});}}]});}
 }});

/* ---------- 3) انتشار الفيروسات ---------- */
BX.reg("b10-2-1-0",{cols:[["n","رقم كأسي"],["c","الكؤوس التي تبادلتُ معها"],["r","اللون بعد الفينول فثالين"]],
 conclude:"تنتشر العدوى من مصابين قليلين إلى كثيرين بتبادل السوائل؛ ويمكن تتبّع مصدر العدوى بتحليل سجلّات المخالطة.",
 ans:["تغيّر اللون إلى الوردي في الكؤوس التي وصلها شيء من محلول كربونات الصوديوم (القاعدي) مباشرة أو بالتبادل، ولم يتغيّر في الكؤوس التي لم تختلط بها.","الكؤوس الثلاث الأولى التي وُضع فيها محلول كربونات الصوديوم (يُستدلّ عليها بتتبّع سجلّ التبادل).","—","تمثّل الفيروس (العامل المسبّب للعدوى)."],
 build(S,A){const N=24,cups=[];for(let i=0;i<N;i++){const g=S.g();const x=70+(i%12)*55,y=180+Math.floor(i/12)*130;S.tr(g,x,y);S.path("M-18 -40 L18 -40 L14 0 L-14 0Z",{fill:"rgba(227,242,253,.5)",stroke:"#90a4ae","stroke-width":2},g);g.liq=S.rect(-15,-10,30,0,{fill:"#e3f2fd"},g);g.t=S.text(0,20,"",{"font-size":11},g);g.i=i;g.inf=false;cups.push(g);}
  A.say("رقّمي الكؤوس ووزّعيها عشوائيًّا على الطاولة.");nextBtn(A,"🔢 رقّمي الكؤوس",()=>{cups.forEach((c,i)=>c.t.textContent=String(i+1));A.step(0);
    nextBtn(A,"🧪 أذيبي كربونات الصوديوم ووزّعيها على 3 كؤوس عشوائية",()=>{const src=[];while(src.length<3){const k=Math.floor(Math.random()*N);if(!src.includes(k))src.push(k);}src.forEach(k=>{cups[k].inf=true;});cups.forEach(c=>{c.liq.setAttribute("y",-12);c.liq.setAttribute("height",12);});cups.src=src;A.step(1);
      nextBtn(A,"💧 املئي بقيّة الكؤوس بالماء ووزّعيها",()=>{A.step(2);A.step(3);exch(src);});});});
  function exch(src){const me=Math.floor(Math.random()*N);const mine=cups[me];mine.querySelector("path").setAttribute("stroke","#7A1F2E");mine.querySelector("path").setAttribute("stroke-width",4);A.say("كأسكِ رقم "+(me+1)+" (المحاطة بالخمري). تبادلي المحتوى مع 3 زميلات: اسحبي كأسكِ إلى كأس زميلة.");
    const log=[];let rounds=0;/* محاكاة تبادل الصف كلّه */
    const classRound=()=>{const idx=[...Array(N).keys()].sort(()=>Math.random()-.5);for(let k=0;k+1<N;k+=2){const a=cups[idx[k]],b=cups[idx[k+1]];if(a===mine||b===mine)continue;const inf=a.inf||b.inf;a.inf=b.inf=inf;}};
    S.drag(mine,{back:true,targets:()=>rounds<3?cups.filter(c=>c!==mine&&!log.includes(c.i+1)).map(c=>({g:c,pad:4,fn:async()=>{const inf=c.inf||mine.inf;c.inf=mine.inf=inf;log.push(c.i+1);classRound();rounds++;A.toast("تبادلتِ مع الكأس "+(c.i+1));
      if(rounds===3){A.step(4);A.say("أضيفي قطرتين من الفينول فثالين إلى كأسكِ، وقارني بكؤوس الزميلات.");const ph=S.dropper(740,440,"#fce4ec",{label:"فينول فثالين",bulb:"#ad1457"});
        S.drag(ph,{back:true,oy:10,targets:()=>[{g:mine,fn:async()=>{mine.liq.setAttribute("fill",mine.inf?"#ec407a":"#e3f2fd");A.step(5);A.rec({n:me+1,c:log.join("، "),r:mine.inf?"وردي (مُصابة)":"عديم اللون (سليمة)"});
          nextBtn(A,"👀 قارني بكؤوس الزميلات",()=>{cups.forEach(c=>c.liq.setAttribute("fill",c.inf?"#ec407a":"#e3f2fd"));const n=cups.filter(c=>c.inf).length;A.obs("أصبح "+n+" كأسًا من "+N+" ورديًّا بعد 3 جولات تبادل، مع أن مصدر العدوى 3 كؤوس فقط: "+src.map(x=>x+1).join("، ")+".");A.step(6);});}}]});}}})):[]});}
 }});

/* ---------- 4) تركيب البريونات وطريقة عملها ---------- */
BX.reg("b10-2-2-0",{cols:[["st","المرحلة"],["n","عدد البريونات المُمرضة"]],chart:{x:"st",y:"n",xl:"المرحلة",yl:"عدد البريونات"},
 conclude:"البريون المُمرض بروتين مطويّ بشكل خاطئ، يحوّل البروتينات الطبيعية التي يلامسها إلى بريونات مُمرضة، فيتضاعف عددها بسرعة (2، 4، 8…).",
 ans:["البروتين الطبيعي مطويّ بشكل صحيح ويؤدّي وظيفته، أما البريون فبروتين مطويّ بشكل خاطئ؛ ويحوّل البروتينات الطبيعية إلى بريونات مُمرضة.","يتضاعف العدد في كل مرحلة: بعد 10 مراحل = 2¹⁰ = 1024 بريونًا."],
 build(S,A){const spiral=(g,x,y,col,bad)=>{const p=S.g(g);S.tr(p,x,y);let d="M-20 0";for(let i=0;i<6;i++)d+=bad?" l 8 "+(i%2?14:-14):" q 4 -12 8 0 q 4 12 8 0";S.path(d,{stroke:col,"stroke-width":7,fill:"none","stroke-linecap":"round"},p);return p;};
  A.say("صمّمي نموذجًا للبروتين الطبيعي (الشريط الأزرق) ونموذجًا للبريون المُمرض (الشريط الأحمر).");
  nextBtn(A,"🎀 صمّمي النموذجين",()=>{spiral(null,250,120,"#1e88e5",false);S.label(250,160,"بروتين طبيعي (لولبي)",null,"#1e88e5");spiral(null,550,120,"#e53935",true);S.label(550,160,"بريون مُمرض (مطويّ خطأً)",null,"#e53935");A.step(0);
    nextBtn(A,"📌 ثبّتي التصاميم على الكرتون وشغّلي النموذج",async()=>{const board=S.g();S.rect(60,200,680,200,{rx:10,fill:"#fff8e1",stroke:"#bcaaa4"},board);let bad=[[110,300]];spiral(board,110,300,"#e53935",true);A.rec({st:0,n:1});
      for(let s=1;s<=5;s++){await sleep(500);const nb=[];bad.forEach(([x,y],i)=>{const nx=110+s*120,ny=230+(nb.length+1)*170/(bad.length*2+1);});const cnt=bad.length*2;const xs=110+s*120;for(let k=0;k<Math.min(cnt,16);k++){const y=215+(k+.5)*170/Math.min(cnt,16);const p=spiral(board,xs,y,"#1e88e5",false);p.setAttribute("transform","translate("+xs+" "+y+") scale(.5)");await sleep(40);p.remove();const q=spiral(board,xs,y,"#e53935",true);q.setAttribute("transform","translate("+xs+" "+y+") scale(.5)");}
        bad=Array(cnt).fill([xs,0]);A.rec({st:s,n:cnt});}
      A.step(1);A.obs("في كل مرحلة يحوّل كل بريون مُمرض بروتينًا طبيعيًّا إلى بريون، فيتضاعف العدد: 1، 2، 4، 8، 16، 32 … وبعد 10 مراحل 1024.");});});
 }});

/* ---------- 5) التصنيف (البصمات) ---------- */
const FP=["arch","loop","whorl"],FPN={arch:"قوس",loop:"حلقة (عروة)",whorl:"دوّامة"};
function drawFP(S,g,type,s){S.ell(0,0,34*s,44*s,{fill:"#fff",stroke:"#ccc"},g);const P=[];for(let i=1;i<=7;i++){const r=i*5*s;
  if(type==="arch")P.push("M"+(-32*s)+" "+(18*s-i*6*s)+" Q0 "+(-10*s-i*6*s)+" "+(32*s)+" "+(18*s-i*6*s));
  else if(type==="loop")P.push("M"+(-30*s)+" "+(30*s-i*3*s)+" C "+(-10*s)+" "+(-30*s-i*2*s)+" "+(20*s)+" "+(-20*s-i*2*s)+" "+(8*s+i*1.5*s)+" "+(30*s));
  else P.push("M"+r+" 0 A"+r+" "+r*1.2+" 0 1 0 "+(-r)+" 0 A"+r+" "+r*1.2+" 0 1 0 "+r+" 0");}
  P.forEach(d=>S.path(d,{stroke:"#37474f","stroke-width":1.6*s,fill:"none"},g));}
BX.reg("b10-3-1-0",{cols:[["n","البصمة"],["p","نمط الخطوط"]],conclude:"يمكن تصنيف البصمات حسب نمط خطوطها إلى: أقواس، وحلقات، ودوّامات؛ والتصنيف يُرتّب الأشياء في مجموعات حسب تشابهها ويسهّل مقارنتها.",
 ans:["أقواس، وحلقات (عُرى)، ودوّامات — حسب الشكل المجاور في الجدول.","(تختلف الأنظمة: بعضهم صنّف حسب عدد الخطوط أو اتجاه الحلقة).","مثلًا حسب اتجاه الحلقة (يمين/يسار)، أو عدد الخطوط بين المركز والدلتا، أو سُمك الخطوط."],
 build(S,A){const people=Array.from({length:8},(_,i)=>FP[[0,1,1,2,1,2,0,1][i]]);
  A.say("خطّي بقلم الرصاص على ورقة بيضاء حتى تتكوّن بُرادة: اضغطي الزرّ.");const sheet=S.g();S.rect(80,60,640,250,{fill:"#fff",stroke:"#ccc"},sheet);
  nextBtn(A,"✏️ خطّي حتى تتكوّن بُرادة",()=>{S.rect(100,330,120,40,{fill:"#9e9e9e",opacity:.6});A.step(0);let k=0;
    const one=async()=>{const t=people[k];A.say("البصمة "+(k+1)+": اضغطي الإبهام على البُرادة، ثم ألصقي الشريط وانزعيه، ثم الصقيه في الجدول.");A.ui.clear();
      A.ui.add(A.ui.btn("👍 اضغطي الإبهام على البُرادة",b=>{b.disabled=true;if(!k)A.step(1);A.ui.add(A.ui.btn("🩹 ألصقي الشريط وانزعيه والصقيه في الجدول",b2=>{b2.disabled=true;if(!k)A.step(2);const g=S.g(sheet);S.tr(g,140+(k%4)*150,120+Math.floor(k/4)*120);drawFP(S,g,t,1);S.text(0,62,String(k+1),{"font-size":12},g);g.t=t;g.k=k;
        A.ui.add(A.ui.btn("🧻 امسحي الإصبع بالقطن والكحول",()=>{if(!k)A.step(3);k++;if(k<8)one();else{A.step(4);inspect(sheet);}},"g"));},"g"));},"g"));};one();});
  function inspect(sheet){A.say("تفحّصي البصمات بالعدسة المكبّرة، ولاحظي شكل الخطوط وصنّفيها: اضغطي على كل بصمة.");A.ui.clear();let k=0;
    [...sheet.children].filter(x=>x.t).forEach(g=>S.tap(g,()=>{if(g.done)return;A.ui.clear();A.say("البصمة "+(g.k+1)+": ما نمط خطوطها؟");g.setAttribute("transform",g.getAttribute("transform")+" scale(1.3)");if(!A.is(5))A.step(5);
      A.ui.choice("النمط:",FP.map(f=>[f,FPN[f]]),v=>{if(v!==g.t){A.toast("لاحظي: القوس بلا مركز، الحلقة تنعطف وترجع، الدوّامة دوائر حول مركز");return;}g.done=1;A.rec({n:g.k+1,p:FPN[v]});A.ui.clear();if(++k===1)A.step(6);if(k===8){A.step(7);A.obs("أقواس: "+people.filter(p=>p==="arch").length+"، حلقات: "+people.filter(p=>p==="loop").length+"، دوّامات: "+people.filter(p=>p==="whorl").length+".");}});}));}
 }});

/* ---------- 6) خصائص البكتيريا ---------- */
const BAC=[{n:"بكتيريا كروية (Cocci)",bg:"#fce4ec",dot:"#ab47bc",draw(S,g,z){for(let i=0;i<40;i++){const x=((i*53)%260)-130,y=((i*97)%260)-130,r=2.2*z;for(let k=0;k<(i%3)+2;k++)S.circ(x+k*r*2,y,r,{fill:"#8e24aa"},g);}}},
 {n:"بكتيريا عصوية (Bacilli)",bg:"#fff3e0",dot:"#ef6c00",draw(S,g,z){for(let i=0;i<30;i++){const x=((i*61)%260)-130,y=((i*89)%260)-130,a=(i*37)%180;S.rect(x,y,9*z,3*z,{rx:1.5*z,fill:"#d84315",transform:"rotate("+a+" "+x+" "+y+")"},g);}}},
 {n:"بكتيريا حلزونية (Spirilla)",bg:"#e8f5e9",dot:"#2e7d32",draw(S,g,z){for(let i=0;i<14;i++){const x=((i*71)%240)-120,y=((i*113)%240)-120;let d="M"+x+" "+y;for(let k=0;k<5;k++)d+=" q "+2*z+" "+(-3*z)+" "+4*z+" 0 q "+2*z+" "+3*z+" "+4*z+" 0";S.path(d,{stroke:"#1b5e20","stroke-width":1.4*z,fill:"none"},g);}}}];
BX.reg("b10-3-2-0",{cols:[["s","الشريحة"],["f","الشكل"],["d","وصف ما شاهدتُه"]],conclude:"للبكتيريا ثلاثة أشكال رئيسة: كروية، وعصوية، وحلزونية؛ وقد تكون منفردة أو في أزواج أو سلاسل أو عناقيد.",
 ans:["كروية، وعصوية، وحلزونية.","حسب الشكل: كروية (Cocci)، عصوية (Bacilli)، حلزونية (Spirilla)."],
 build(S,A){A.say("لاحظي أشكال البكتيريا على الشرائح بقوّة التكبير المناسبة (×1000 بالعدسة الزيتية): اسحبي كل شريحة إلى المجهر.");let k=0;
  scope(S,A,BAC,s=>{const f=s.n.split(" (")[0].replace("بكتيريا ","");A.rec({s:"الشريحة "+(BAC.indexOf(s)+1),f,d:["خلايا كروية صغيرة في أزواج وسلاسل وعناقيد","خلايا عصوية الشكل منفردة","خلايا ملتوية حلزونية"][BAC.indexOf(s)]});if(++k===1)A.step(0);if(k===3){A.step(1);}},{minObj:100,obj0:10});}
 });

/* ---------- 7) البكتيريا في اللبن ---------- */
const YOG={n:"عيّنة لبن الزبادي",bg:"#fffde7",dot:"#fafafa",draw(S,g,z){for(let i=0;i<60;i++){const x=((i*53)%270)-135,y=((i*97)%270)-135,a=(i*37)%180;if(i%3)S.rect(x,y,7*z,2.2*z,{rx:1.1*z,fill:"#5e35b1",transform:"rotate("+a+" "+x+" "+y+")"},g);else for(let k=0;k<4;k++)S.circ(x+k*2.6*z,y+k*.6*z,1.3*z,{fill:"#3949ab"},g);}for(let i=0;i<8;i++)S.circ(((i*131)%240)-120,((i*71)%240)-120,6*z,{fill:"#fff",opacity:.7},g);}};
BX.reg("b10-3-2-1",{cols:[["f","شكل البكتيريا"],["d","الوصف"]],conclude:"يحتوي لبن الزبادي على بكتيريا نافعة عصوية (Lactobacillus) وكروية في سلاسل (Streptococcus) تخمّر سكّر الحليب وتنتج حمض اللبن.",
 ans:["عصوية (Lactobacillus bulgaricus) وكروية في سلاسل (Streptococcus thermophilus).","لأن بكتيريا اللبن تحلّل سكّر اللاكتوز (تحوّله إلى حمض اللبن) في أثناء التخمّر، فيقلّ اللاكتوز في الزبادي ويسهل هضمه."],
 build(S,A){const tp=S.g();S.tr(tp,120,450);S.emo(0,-20,"🥣",44,tp);S.text(0,18,"لبن زبادي",{"font-size":11},tp);const sl=S.g();S.tr(sl,330,450);S.rect(-60,-12,120,24,{fill:"#e1f5fe",stroke:"#81d4fa","stroke-width":2},sl);S.text(0,30,"شريحة فارغة",{"font-size":11},sl);
  A.say("ضعي مسحة من اللبن على الشريحة بعود أسنان: اسحبي اللبن إلى الشريحة.");let st=0;
  S.drag(tp,{back:true,targets:()=>st===0?[{g:sl,fn:async()=>{S.ell(0,0,16,5,{fill:"#fff",stroke:"#ddd"},sl);A.step(0);st=1;A.say("امزجي المسحة بقطرة ماء، ثم ضعي غطاء الشريحة بلطف.");nextBtn(A,"💧 امزجيها بقطرة ماء وضعي الغطاء",()=>{S.rect(-22,-10,44,20,{fill:"#e1f5fe",opacity:.6,stroke:"#4fc3f7"},sl);A.step(1);st=2;go();});}}]:[]});
  function go(){S.clear();S.room();A.say("افحصي الشريحة بالمجهر الضوئي المركّب (ابدئي بالتكبير الصغير ثم الكبير).");scope(S,A,[YOG],()=>{A.step(2);A.rec({f:"عصوية",d:"عصيّات بنفسجية منفردة أو في أزواج"});A.rec({f:"كروية في سلاسل",d:"كرات صغيرة متّصلة كالخرز"});A.step(3);},{minObj:100,obj0:10});}
 }});

/* ---------- 8) خصائص الطلائعيات ---------- */
const PRO=[{n:"الأميبا",bg:"#e3f2fd",dot:"#90caf9",live:1,mv:"الأقدام الكاذبة",pl:"لا",sh:"غير ثابت الشكل",draw(S,g,z,t){const x=-40+Math.sin(t*.4)*30,y=0,r=22*z;let d="";for(let a=0;a<=6.3;a+=.3){const rr=r*(1+.25*Math.sin(a*3+t*2)+(Math.cos(a)>.6?.35*Math.sin(t):0));d+=(d?"L":"M")+(x+Math.cos(a)*rr)+" "+(y+Math.sin(a)*rr);}S.path(d+"Z",{fill:"#bbdefb",stroke:"#1565c0","stroke-width":2},g);S.circ(x,y,r*.25,{fill:"#0d47a1"},g);S.circ(x+r*.5,y-r*.3,r*.12,{fill:"#fff",stroke:"#1565c0"},g);}},
 {n:"البراميسيوم",bg:"#fff8e1",dot:"#ffe082",live:1,mv:"الأهداب",pl:"لا",sh:"يشبه النعل",draw(S,g,z,t){const x=Math.sin(t*.8)*60;S.ell(x,0,40*z/2,16*z/2,{fill:"#ffe0b2",stroke:"#e65100","stroke-width":2},g);for(let i=0;i<30;i++){const a=i/30*6.28;S.line(x+Math.cos(a)*20*z/2,Math.sin(a)*8*z/2,x+Math.cos(a)*(22+2*Math.sin(t*10+i))*z/2,Math.sin(a)*(10+2*Math.sin(t*10+i))*z/2,{stroke:"#e65100","stroke-width":1},g);}S.ell(x,0,6*z/2,4*z/2,{fill:"#bf360c"},g);}},
 {n:"اليوغلينا",bg:"#f1f8e9",dot:"#aed581",live:1,mv:"السوط",pl:"نعم",sh:"مغزلي",draw(S,g,z,t){const x=Math.cos(t*.6)*50,y=Math.sin(t*.6)*30;S.ell(x,y,24*z/2,9*z/2,{fill:"#c5e1a5",stroke:"#33691e","stroke-width":2},g);for(let i=0;i<6;i++)S.ell(x-10*z/2+i*4*z/2,y+(i%2?3:-3)*z/2,2.5*z/2,1.5*z/2,{fill:"#2e7d32"},g);S.circ(x+16*z/2,y-2*z/2,1.5*z/2,{fill:"#d50000"},g);S.path("M"+(x+24*z/2)+" "+y+" q "+8*z/2+" "+(10*Math.sin(t*8))*z/4+" "+18*z/2+" 0",{stroke:"#33691e","stroke-width":1.5,fill:"none"},g);}}];
BX.reg("b10-3-3-0",{cols:[["n","اسم الكائن"],["sh","الشكل العام"],["mv","وسيلة الحركة"],["pl","وجود البلاستيدات"]],conclude:"تختلف الطلائعيات في شكلها ووسيلة حركتها (أقدام كاذبة، أهداب، أسواط) وطريقة تغذيتها؛ فمنها غير ذاتية التغذية كالأميبا والبراميسيوم، ومنها ذاتية التغذية كاليوغلينا لاحتوائها على البلاستيدات.",
 ans:["لأن بعضها يحتوي على بلاستيدات خضراء فيصنع غذاءه بالبناء الضوئي (اليوغلينا)، وبعضها لا يحتويها فيتغذّى على غيره (الأميبا والبراميسيوم).","الأميبا بالأقدام الكاذبة، والبراميسيوم بالأهداب، واليوغلينا بالسوط.","الأميبا والبراميسيوم: غير ذاتية التغذية؛ اليوغلينا: ذاتية التغذية في الضوء وقد تتغذّى على غيرها في الظلام."],
 build(S,A){A.say("لاحظي الأنواع المختلفة للطلائعيات في الشرائح بالمجهر: اسحبي كل شريحة.");let k=0;
  scope(S,A,PRO,s=>{A.rec({n:s.n,sh:s.sh,mv:s.mv,pl:s.pl});if(++k===1)A.step(0);if(k===3){A.step(1);A.step(2);nextBtn(A,"📝 دوّني تقريرًا واقرئيه أمام زميلاتك",()=>A.step(3));}},{minObj:10,obj0:4,objs:[[4,"×4"],[10,"×10"],[40,"×40"]]});}
 });

/* ---------- 9) تركيب الفطريات وخصائصها ---------- */
const FUN=[{n:"عفن الخبز (مجهر تشريحي)",bg:"#efebe9",dot:"#8d6e63",draw(S,g,z){for(let i=0;i<30;i++){const x=((i*53)%260)-130,y=((i*31)%80)+40;S.path("M"+x+" 140 Q"+(x+R(-10,10))+" "+(y+40)+" "+x+" "+y,{stroke:"#9e9e9e","stroke-width":1.4,fill:"none"},g);S.circ(x,y,4*z/2,{fill:"#212121"},g);}S.rect(-150,130,300,30,{fill:"#d7a86e"},g);}},
 {n:"عفن الخبز (مجهر ضوئي)",bg:"#fafafa",dot:"#424242",draw(S,g,z){S.path("M-150 60 Q -60 40 0 70 T 150 50",{stroke:"#9e9e9e","stroke-width":3,fill:"none"},g);for(let i=0;i<4;i++){const x=-110+i*70;S.line(x,58,x,-40,{stroke:"#9e9e9e","stroke-width":3},g);S.circ(x,-55,16*z/3,{fill:"#424242"},g);for(let k=0;k<12;k++)S.circ(x+R(-12,12)*z/3,-55+R(-12,12)*z/3,1.6,{fill:"#9e9e9e"},g);S.path("M"+x+" 60 l -8 14 M"+x+" 60 l 8 14",{stroke:"#bcaaa4","stroke-width":2},g);}
   S.label(-110,-95,"كيس بوغي",g,"#424242");S.label(30,10,"حامل",g,"#757575");S.label(100,95,"خيوط فطرية",g,"#9e9e9e");}},
 {n:"فطر المشروم (مجهر تشريحي)",bg:"#fff8e1",dot:"#d7ccc8",draw(S,g,z){S.path("M-110 -10 Q 0 -130 110 -10Z",{fill:"#d7ccc8",stroke:"#8d6e63","stroke-width":3},g);for(let i=-10;i<=10;i++)S.line(i*10,-10,i*7,8,{stroke:"#8d6e63"},g);S.rect(-18,0,36,120,{fill:"#efebe9",stroke:"#8d6e63","stroke-width":2},g);S.ell(0,30,30,8,{fill:"none",stroke:"#8d6e63","stroke-width":2},g);
   S.label(0,-80,"القبعة",g,"#5d4037");S.label(80,5,"الخياشيم",g,"#5d4037");S.label(50,90,"الساق",g,"#5d4037");S.label(-60,35,"الحلقة",g,"#5d4037");}}];
BX.reg("b10-3-4-0",{cols:[["s","العيّنة"],["d","التراكيب التي شاهدتُها"]],conclude:"تتكوّن الفطريات من خيوط فطرية، وتتكاثر بالأبواغ التي تتكوّن في أكياس بوغية (عفن الخبز) أو على الخياشيم (المشروم)، ولا تحتوي على الكلوروفيل.",
 ans:["عفن الخبز: خيوط فطرية متفرّعة، وحوامل تحمل أكياسًا بوغية سوداء. المشروم: قبعة، وخياشيم أسفلها، وساق، وحلقة.","(تتطابق التراكيب مع الشكل مع اختلاف الحجم والوضوح).","تتكوّن من خيوط فطرية، ليس لها بلاستيدات، تتكاثر بالأبواغ، غير ذاتية التغذية."],
 build(S,A){A.say("تفحّصي الخبز المتعفّن بالمجهر التشريحي، ثم شريحة العفن بالمجهر الضوئي، ثم المشروم: اسحبي كل عيّنة.");let k=0;
  scope(S,A,FUN,s=>{const i=FUN.indexOf(s);A.rec({s:s.n,d:["خيوط فطرية بيضاء وأكياس بوغية سوداء على الخبز","خيوط فطرية، حوامل، أكياس بوغية فيها أبواغ","قبعة، خياشيم، ساق، حلقة"][i]});A.step(Math.min(i,2));k++;if(k===3)A.step(3);},{minObj:4,obj0:4,objs:[[4,"×4"],[10,"×10"]],name:"المجهر"});}
 });

/* ---------- 10) صنع عجينة الخبز ---------- */
BX.reg("b10-3-4-1",{cols:[["c","وجه المقارنة"],["w","الوزن (بالغرام)"]],conclude:"تتخمّر الخميرة (فطر) فتحوّل السكّر إلى كحول وغاز CO₂ الذي ينفخ العجين، ويقلّ وزن العجين المختمر قليلًا لخروج الغاز وتبخّر الكحول والماء.",
 ans:["المختمرة: هشّة منتفخة إسفنجية ولها رائحة الكحول (التخمّر). غير المختمرة: متماسكة كثيفة بلا رائحة تُذكر.","تتنفّس الخميرة لاهوائيًّا وتُنتج غاز CO₂ الذي يُحتجز في العجين فينتفخ.","قلّ وزن العجينة المختمرة لأن الخميرة حوّلت جزءًا من السكّريات إلى CO₂ وكحول خرج من العجين وتبخّر."],
 build(S,A){const bowl=S.beaker(160,392,130,90,{lvl:0,label:"خليط الخميرة"});const bal=S.balance(400,392);
  A.say("حضّري خليط الخميرة: ملعقة منها ومن السكّر إلى 200mL من الماء الدافئ.");nextBtn(A,"🥄 حضّري خليط الخميرة",async()=>{await bowl.to(.6,600,"#ffe0b2");S.bubbles(160,330,80,10,{h:30});A.step(0);
    nextBtn(A,"👐 اعجني 1000 g من الطحين بالماء",()=>{const d=S.g();S.tr(d,620,370);S.ell(0,0,90,40,{fill:"#fff3e0",stroke:"#d7ccc8"},d);S.text(0,6,"1000 g عجين",{"font-size":13},d);A.step(1);
      A.say("زني 400g من العجين، وأضيفي إليه الخميرة، وضعيه في وعاء مغطّى.");
      nextBtn(A,"⚖️ زني 400 g وأضيفي الخميرة",async()=>{for(let m=0;m<=400;m+=25){bal.set(m);await sleep(25);}const b1=pot(240,"مع خميرة");A.step(2);
        nextBtn(A,"⚖️ زني 400 g أخرى دون خميرة",async()=>{for(let m=0;m<=400;m+=25){bal.set(m);await sleep(25);}bal.set(0);const b2=pot(560,"دون خميرة");A.step(3);
          A.say("ضعي الوعاءين في مكان دافئ مدّة 24 ساعة: حرّكي شريط الزمن.");let done=0;A.ui.clear();
          A.ui.slider("⏱️ الزمن (ساعة)",0,24,1,0,h=>{b1.dough.setAttribute("ry",30+h*1.6);b1.dough.setAttribute("cy",-30-h*1.6);if(h>6&&!b1.b){b1.b=S.bubbles(240,180,80,8,{h:20});}if(h===24&&!done){done=1;A.step(4);
            nextBtn(A,"⚖️ زني العجينتين وقارني",()=>{A.rec({c:"العجينة المختمرة",w:388});A.rec({c:"العجينة غير المختمرة",w:399});A.obs("انتفخت العجينة المختمرة إلى ضعف حجمها تقريبًا وأصبحت إسفنجية ذات رائحة كحولية، وقلّ وزنها قليلًا.");A.step(5);});}});});});});});
  function pot(x,t){const g=S.g();S.tr(g,x,330);S.path("M-80 0 L80 0 L64 60 L-64 60Z",{fill:"#90a4ae"},g);g.dough=S.ell(0,-30,70,30,{fill:"#fff3e0",stroke:"#d7ccc8"},g);S.path("M-84 -2 Q0 -120 84 -2",{fill:"rgba(255,255,255,.25)",stroke:"#b0bec5","stroke-width":2},g);S.text(0,85,t,{"font-size":12},g);return g;}
 }});
})();
