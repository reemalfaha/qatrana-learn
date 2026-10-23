/* تجارب الكيمياء — الصف العاشر (كتاب الأنشطة) — مطابقة لخطوات الكتاب */
(function(){const {sleep,lerp,clamp,mix,quiz}=BX;const R=(a,b)=>a+Math.random()*(b-a);
const nextBtn=(A,t,fn,cls)=>{A.ui.clear();A.ui.add(A.ui.btn(t,b=>{b.disabled=true;fn(b);},cls||"gold"));};
function nm2rgb(l){let r=0,g=0,b=0;if(l<440){r=-(l-440)/60;b=1;}else if(l<490){g=(l-440)/50;b=1;}else if(l<510){g=1;b=-(l-510)/20;}else if(l<580){r=(l-510)/70;g=1;}else if(l<645){r=1;g=-(l-645)/65;}else r=1;return "rgb("+[r,g,b].map(v=>Math.round(clamp(v,0,1)*255)).join(",")+")";}

/* ---------- 1) الطيف الذرّي ---------- */
const TUBES={H:["الهيدروجين","#ff4fa3",[410,434,486,656]],Na:["الصوديوم","#ffc400",[589,590]],Ne:["النيون","#ff3d00",[585,588,594,603,607,614,626,633,640,650,659,692]]};
BX.reg("c10-1-1-0",{cols:[["s","مصدر الضوء"],["c","لون الضوء الصادر"],["sp","شكل الطيف على الشاشة"]],
 conclude:"الضوء الأبيض يتحلّل بالمنشور إلى طيف متّصل (ألوان متدرّجة دون فواصل)، أمّا الضوء الصادر عن ذرّات غاز مُثارة في أنبوب التفريغ فيعطي طيفًا خطّيًّا من خطوط ملوّنة محدّدة تفصلها مناطق معتمة، ولكل عنصر خطوطه المميّزة.",
 ans:["يتحلّل الضوء الأبيض عند مروره في المنشور الزجاجي إلى ألوانه، فتظهر على الشاشة حزمة ألوان متدرّجة متّصلة من الأحمر إلى البنفسجي (طيف متّصل)؛ لاختلاف انكسار كل لون في المنشور.","يتوهّج أنبوب الهيدروجين بلون وردي أرجواني، ويظهر على الشاشة عدد محدود من الخطوط الملوّنة (أحمر، أزرق مخضرّ، أزرق، بنفسجي) تفصلها مناطق معتمة (طيف خطّي).","طيف المصباح متّصل يحوي ألوان الطيف المرئي جميعها، أمّا طيف أنبوب التفريغ فخطّي يحوي ألوانًا محدّدة فقط تعتمد على نوع العنصر؛ لأن إلكترونات الذرّة تنتقل بين مستويات طاقة محدّدة."],
 build(S,A){const lampG=S.g();S.tr(lampG,95,300);S.rect(-34,-40,60,80,{rx:10,fill:"#455a64"},lampG);const lgl=S.circ(26,0,22,{fill:"#eee",stroke:"#999","stroke-width":2},lampG);S.text(-4,62,"مصباح ضوئي",{"font-size":12},lampG);
  const bar=S.g();S.tr(bar,240,300);S.rect(-8,-130,16,260,{fill:"#a1887f",stroke:"#6d4c41","stroke-width":2,rx:2},bar);const slit=S.rect(-9,-10,18,20,{fill:"#fff8e1",opacity:0},bar);S.text(0,150,"حاجز كرتون",{"font-size":12},bar);
  const scr=S.g();S.tr(scr,690,440);S.rect(-60,-320,120,320,{fill:"#fafafa",stroke:"#9e9e9e","stroke-width":3,rx:4},scr);S.text(0,20,"شاشة بيضاء",{"font-size":12},scr);const spec=S.g(scr);
  const pr=S.g();S.tr(pr,470,450);S.path("M0 -40 L36 26 L-36 26Z",{fill:S.lg([["#e3f2fd",0,.9],["#90caf9",1,.6]]),stroke:"#5c8fb5","stroke-width":2.5},pr);S.text(0,52,"منشور زجاجي",{"font-size":12},pr);
  const rays=S.g();const coil=S.g();S.tr(coil,110,450);S.rect(-60,-40,120,40,{rx:6,fill:"#5d4037"},coil);S.rect(-40,-62,80,22,{rx:11,fill:"#c62828"},coil);S.text(0,-12,"ملف رومكورف",{"font-size":11,fill:"#fff"},coil);coil.style.display="none";
  let lit=false,src=null,ang=0,placed={scr:0,pr:0};const done=new Set();
  const tubes=Object.entries(TUBES).map(([k,[n,c]],i)=>{const g=S.g();S.tr(g,320+i*90,470,-90,.5);S.rect(-80,-12,160,24,{rx:12,fill:"#eceff1",stroke:"#90a4ae","stroke-width":3},g);g.gl=S.rect(-72,-7,144,14,{rx:7,fill:c,opacity:0},g);S.text(0,6,k,{"font-size":24,fill:"#37474f"},g);g.k=k;g.style.display="none";return g;});
  const draw=()=>{rays.innerHTML="";spec.innerHTML="";if(!lit)return;const P=pr._x,Py=pr._y;const col=src?TUBES[src][1]:"#fff59d";
    S.path("M120 296 L240 297 L240 303 L120 304Z",{fill:col,opacity:.6},rays);if(Math.abs(Py-300)>20||P<380||P>560)return;S.line(240,300,P,300,{stroke:col,"stroke-width":5,opacity:.75},rays);
    const good=Math.abs(ang-40)<=6;if(!good){S.line(P,300,630,300+(ang-40)*6,{stroke:col,"stroke-width":5,opacity:.5},rays);return;}
    if(!src){for(let i=0;i<14;i++){const l=400+i*26;const y=150+i*14;S.line(P,300,630,y,{stroke:nm2rgb(l),"stroke-width":3,opacity:.55},rays);}
      for(let y=0;y<200;y+=2){S.rect(-50,-300+y+30,100,2.4,{fill:nm2rgb(700-y*1.5)},spec);}}
    else{TUBES[src][2].forEach(l=>{const y=150+(700-l)/300*200;S.line(P,300,630,y,{stroke:nm2rgb(l),"stroke-width":3,opacity:.7},rays);S.rect(-50,-300+30+(700-l)/1.5-1,100,4,{fill:nm2rgb(l)},spec);});S.rect(-50,-270,100,200,{fill:"#000",opacity:.0},spec);}
    return good;};
  const check=()=>{const good=draw();if(!good)return;if(!src&&!A.is(3)){A.step(3);A.rec({s:"مصباح ضوئي (ضوء أبيض)",c:"أبيض",sp:"طيف متّصل: ألوان متدرّجة من الأحمر إلى البنفسجي"});A.obs("تحلّل الضوء الأبيض بالمنشور إلى ألوان متّصلة متدرّجة (طيف متّصل).");
      A.say("الآن ضعي أنبوب التفريغ الذي يحوي غاز الهيدروجين محلّ المصباح: اسحبيه إلى مكان المصباح.");tubes.forEach(t=>t.style.display="");coil.style.display="";}
    else if(src&&!done.has(src)){done.add(src);const T=TUBES[src];A.rec({s:"أنبوب تفريغ "+T[0],c:{H:"وردي أرجواني",Na:"أصفر برتقالي",Ne:"أحمر برتقالي"}[src],sp:"طيف خطّي: "+T[2].length+" خط/خطوط ملوّنة تفصلها مناطق معتمة"});A.obs("أنبوب "+T[0]+": ظهرت خطوط ملوّنة محدّدة فقط (طيف خطّي).");
      if(src==="H"){A.step(4);A.say("قارني طيف الهيدروجين بالطيف المتّصل. يمكنكِ تجربة أنبوبَي الصوديوم والنيون أيضًا.");}}};
  A.say("اعملي شقًّا مستطيلًا رفيعًا في حاجز الكرتون: اضغطي على منتصف الحاجز.");
  S.tap(bar,()=>{if(A.is(0))return;slit.setAttribute("opacity",1);A.step(0);A.say("ضعي الشاشة البيضاء مقابل الشقّ، والمنشور في منتصف المسافة بينهما: اسحبيهما.");});
  S.tr(scr,575,495,0,.4);
  S.drag(scr,{targets:()=>A.is(0)&&!placed.scr?[{box:[620,140,140,320],fn:async()=>{placed.scr=1;await S.moveTo(scr,690,450,300);S.tr(scr,690,450,0,1);ok2();return "stay";}}]:[],back:true});
  S.drag(pr,{targets:()=>A.is(0)&&!placed.pr?[{box:[400,260,140,80],fn:async()=>{placed.pr=1;await S.moveTo(pr,470,300,300);ok2();return "stay";}}]:[],back:true});
  function ok2(){if(placed.scr&&placed.pr&&!A.is(1)){A.step(1);A.say("أضيئي المصباح خلف الحاجز: اضغطي على المصباح.");}}
  S.tap(lampG,()=>{if(!A.is(1)||src)return;lit=!lit;lgl.setAttribute("fill",lit?"#fff59d":"#eee");if(lit&&!A.is(2)){A.step(2);A.say("حرّكي المنشور (شريط الزاوية) حتى يتجمّع الضوء على الشاشة البيضاء.");A.ui.clear();A.ui.slider("📐 زاوية دوران المنشور",0,80,1,0,v=>{ang=v;S.tr(pr,pr._x,pr._y,v-40);check();},"°");}check();});
  tubes.forEach(t=>S.drag(t,{back:true,targets:()=>A.is(3)?[{box:[40,230,130,140],fn:async()=>{tubes.forEach(x=>{x.gl.setAttribute("opacity",0);if(x!==t&&x._in){x._in=0;S.tr(x,x._h,470,-90,.5);}});lampG.style.display="none";t._in=1;t._h=t._h||t._x;await S.moveTo(t,95,300,300,0);S.tr(t,95,300,-90,.9);src=null;lit=false;draw();A.say("صِلي الأنبوب بملف رومكورف وشغّليه: اضغطي على الملف.");return "stay";}}]:[]}));
  S.tap(coil,()=>{const t=tubes.find(x=>x._in);if(!t){A.toast("ضعي أنبوب التفريغ مكان المصباح أولًا");return;}src=t.k;lit=true;t.gl.setAttribute("opacity",.95);check();if(!done.has(src))A.say("حرّكي المنشور حتى يتجمّع الضوء على الشاشة.");});
 }});

/* ---------- 2) لون اللهب ---------- */
const SALT=[["NaCl","Na","كلوريد الصوديوم","#ffb300","أصفر برتقالي"],["LiCl","Li","كلوريد الليثيوم","#e0115f","أحمر قرمزي"],["KCl","K","كلوريد البوتاسيوم","#b388ff","بنفسجي فاتح (ليلكي)"],["CaCl₂","Ca","كلوريد الكالسيوم","#ff5722","أحمر برتقالي (طوبي)"],["CuCl","Cu","كلوريد النحاس (I)","#00bfa5","أزرق مخضرّ"]];
BX.reg("c10-1-1-1",{cols:[["f","صيغة الملح"],["m","الفلزّ"],["c","لون طيف الفلزّ"]],
 conclude:"لكل فلزّ لون لهب مميّز؛ لأن إلكترونات ذرّاته تُثار بالحرارة ثم تعود إلى مستويات أدنى مُطلقة طاقة بمقادير محدّدة تختلف من عنصر إلى آخر، ولون اللهب يدلّ على مقدار هذه الطاقة.",
 ans:["يختلف لون اللهب لاختلاف التركيب الذرّي (مستويات الطاقة) لكل عنصر؛ فعند التسخين تُثار الإلكترونات إلى مستويات أعلى، ثم تعود إلى مستويات أدنى مُطلقة طاقة بمقادير محدّدة خاصّة بكل عنصر، فيظهر لون مميّز له.","كلّما اتّجه لون الطيف نحو البنفسجي (طول موجي أقصر) كانت طاقته أعلى، وكلّما اتّجه نحو الأحمر (طول موجي أطول) كانت طاقته أقل؛ فطاقة طيف البوتاسيوم البنفسجي أعلى من طاقة طيف الليثيوم الأحمر."],
 build(S,A){const bn=S.burner(400,440);const flm=S.path("M0 -82 C -22 -115 -8 -150 0 -185 C 8 -150 22 -115 0 -82Z",{fill:"#ff0",opacity:0});S.tr(flm,400,440);const fg=S.g();S.tr(fg,400,440);fg.append(flm);flm.removeAttribute("transform");
  const hcl=S.beaker(130,440,90,100,{lvl:.6,col:"#fff9c4",label:"HCl مخفّف"});const wat=S.beaker(240,440,90,100,{lvl:.6,col:"#b3e5fc",label:"ماء مقطّر"});
  const glasses=SALT.map((s,i)=>{const d=S.dish(540+(i%3)*90,i<3?380:465,34,{label:s[0]});d.g.style.display="none";d.s=s;d.pile=S.ell(0,-4,18,6,{fill:"#fff",stroke:"#bbb"},d.inner);d.pile.style.display="none";return d;});
  const w=S.g();S.tr(w,640,170);S.line(0,0,-90,60,{stroke:"#bdbdbd","stroke-width":4},w);S.rect(-10,-10,60,20,{rx:6,fill:"#6d4c41",transform:"rotate(-34)"},w);const tip=S.circ(-94,63,6,{fill:"none",stroke:"#cfd8dc","stroke-width":3},w);const blob=S.circ(-94,63,5,{fill:"#fff",opacity:0},w);S.label(-10,-30,"سلك بلاتين",w,"#455a64");
  let st="dirty",cur=null,first=true;const did=new Set();const T=(g,fn)=>({g,pad:20,fn});
  A.say("ضعي في كلّ زجاجة ساعة كمّية قليلة من أحد الأملاح.");
  nextBtn(A,"🧂 ضعي الأملاح في زجاجات الساعة",()=>{glasses.forEach(d=>{d.g.style.display="";d.pile.style.display="";});A.step(0);A.ui.clear();A.say("أشعلي موقد بنسن (أشعلي عود الثقاب قبل فتح الغاز): اضغطي على الموقد.");});
  S.tap(bn.g,()=>{if(!A.is(0)||bn.lit)return;bn.on(true);A.step(1);A.say("نظّفي سلك البلاتين: اغمسيه في حمض الهيدروكلوريك (اسحبيه إلى الكأس).");});
  const flame=async c=>{flm.setAttribute("fill",c);for(let i=0;i<3;i++){await S.tween(300,t=>flm.setAttribute("opacity",.85*t));await S.tween(300,t=>flm.setAttribute("opacity",.85*(1-t*.3)));}await S.tween(400,t=>flm.setAttribute("opacity",.6*(1-t)));};
  S.drag(w,{back:true,ox:-94,oy:63,targets:()=>{if(!bn.lit)return[];return [
    T(hcl.g,async()=>{if(st!=="dirty"){A.toast(st==="acid"?"ضعي السلك على اللهب الآن":"السلك نظيف");return false;}st="acid";blob.setAttribute("opacity",0);A.say("ضعي السلك على اللهب بضع ثوانٍ لإكمال تنظيفه.");}),
    T(fg,async()=>{if(st==="acid"){await S.moveTo(w,494,281,300);await sleep(900);st="clean";if(first)A.step(2);A.say("اغمسي السلك في الماء المقطّر، ثم في "+(first?"كلوريد الصوديوم":"الملح التالي")+".");return;}
      if(st==="loaded"){const s=cur.s;await S.moveTo(w,494,281,300);blob.setAttribute("opacity",0);await flame(s[3]);did.add(s[0]);st="dirty";A.rec({f:s[0],m:s[1],c:s[4]});A.obs(s[2]+" ("+s[1]+"): لون اللهب "+s[4]+".");
        if(first){first=false;A.step(4);}if(did.size===5){A.step(5);A.say("أحسنتِ! قارني ألوان اللهب في الجدول.");}else A.say("كرّري مع ملح آخر ("+did.size+"/5): نظّفي السلك أولًا بالحمض ثم اللهب.");return;}
      A.toast(st==="dirty"?"نظّفي السلك بالحمض أولًا":"اغمسي السلك في الماء ثم في الملح");return false;}),
    T(wat.g,async()=>{if(st!=="clean"){A.toast("نظّفي السلك بالحمض واللهب أولًا");return false;}st="wet";A.say("اغمسي السلك في "+(first?"كلوريد الصوديوم NaCl":"ملح لم تجرّبيه بعد")+" ليلتقط بعض الملح.");}),
    ...glasses.map(d=>T(d.g,async()=>{if(st!=="wet"){A.toast(st==="clean"?"اغمسيه في الماء المقطّر أولًا":"نظّفي السلك أولًا");return false;}if(first&&d.s[0]!=="NaCl"){A.toast("ابدئي بكلوريد الصوديوم كما في الكتاب");return false;}if(did.has(d.s[0])){A.toast("جرّبتِ هذا الملح؛ اختاري غيره");return false;}
      cur=d;st="loaded";blob.setAttribute("opacity",1);if(first)A.step(3);A.say("ضعي السلك على اللهب لحرق الملح، ولاحظي لون اللهب.");}))];}});
 }});

/* ---------- 3) الخلايا الكهروضوئية ---------- */
const LAY=[["الموصل الأمامي","#90a4ae"],["الطبقة السالبة (n)","#5c6bc0"],["منطقة الوصلة","#bdbdbd"],["الطبقة الموجبة (p)","#ef5350"],["الموصل الخلفي","#78909c"]];
BX.reg("c10-1-2-0",{cols:[["i","شدّة الضوء (%)"],["a","التيار الكهربائي (mA)"]],chart:{x:"i",y:"a",xl:"شدّة الضوء (%)",yl:"التيار (mA)"},
 conclude:"تمتصّ الخلية الكهروضوئية فوتونات الضوء فتتحرّر إلكترونات (التأثير الكهروضوئي) تتّجه نحو القطب السالب، وتتّجه الفجوات الموجبة نحو الطبقة الموجبة، فيتولّد تيار كهربائي في الدارة الخارجية يزداد بزيادة شدّة الضوء.",
 ans:["ظاهرة التأثير الكهروضوئي: انبعاث الإلكترونات من سطح بعض الموادّ عند امتصاصها ضوءًا بتردّد مُحدَّد.","موادّ شبه موصلة، مثل: السليكون، والجيرمانيوم.","تمتصّ الألواح فوتونات الضوء فتتحرّر الإلكترونات وتتّجه نحو قطب الخلية السالب، وتتّجه الفجوات الموجبة نحو الطبقة الموجبة، ثم تتحرّك الإلكترونات من القطب السالب إلى الموجب عبر موصل خارجي، فيتولّد تيار كهربائي.","لارتفاع الطلب على الطاقة ونقص مصادرها التقليدية، ولأن الطاقة الشمسية متجدّدة ونظيفة ومتوافرة بكثرة في الأردن؛ لذا أُطلق أكبر مشروع طاقة شمسية على مستوى المنطقة."],
 room:{wall1:"#e3f2fd",wall2:"#bbdefb"},
 build(S,A){const sun=S.g();S.tr(sun,90,80);const sc=S.circ(0,0,38,{fill:"#fdd835",stroke:"#f9a825","stroke-width":4},sun);for(let i=0;i<8;i++){const a=i*Math.PI/4;S.line(Math.cos(a)*46,Math.sin(a)*46,Math.cos(a)*60,Math.sin(a)*60,{stroke:"#f9a825","stroke-width":4},sun);}S.text(0,82,"الشمس",{"font-size":12},sun);sun.style.opacity=.35;
  const X0=270,W=260,Y0=150,H=36;const stack=S.g();LAY.forEach((l,i)=>S.rect(X0,Y0+i*H,W,H-4,{rx:5,fill:"none",stroke:"#90a4ae","stroke-width":2,"stroke-dasharray":"6 5"},stack));S.label(X0+W/2,Y0-22,"الخلية الكهروضوئية (من الأعلى إلى الأسفل)",stack,"#455a64");
  const parts=S.g();let nxt=0;const order=[3,0,4,1,2];
  const cards=order.map((li,j)=>{const g=S.g();S.tr(g,95+j*152,465);S.rect(-68,-17,136,34,{rx:6,fill:LAY[li][1],stroke:"#37474f","stroke-width":1.5},g);S.text(0,6,LAY[li][0],{"font-size":12,fill:"#fff"},g);g.li=li;
    S.drag(g,{back:true,targets:()=>[{box:[X0,Y0-10,W,H*5+10],fn:async()=>{if(g.li!==nxt){A.toast("ليست الطبقة التالية؛ الترتيب من الأعلى: "+LAY[nxt][0]);return false;}g.remove();S.rect(X0,Y0+nxt*H,W,H-4,{rx:5,fill:LAY[nxt][1]},parts);S.text(X0+W/2,Y0+nxt*H+22,LAY[nxt][0],{"font-size":12,fill:"#fff"},parts);
      if(++nxt===5){A.step(0);A.say("عرّضي الخلية لضوء الشمس: اضغطي على الشمس.");}else A.say("أحسنتِ! اسحبي الطبقة التالية.");}}]});return g;});
  A.say("ركّبي طبقات الخلية بالترتيب من الأعلى: اسحبي الطبقة المناسبة إلى الخلية.");
  const fx=S.g();let I=100,lit=false,circ=false;const run=()=>{if(!lit)return;const n=Math.round(I/20);for(let k=0;k<n;k++){const p=S.circ(110,110,5,{fill:"#ffeb3b",stroke:"#f57f17"},fx);const tx=R(X0+20,X0+W-20);S.tween(700,t=>{p.setAttribute("cx",lerp(110,tx,t));p.setAttribute("cy",lerp(110,Y0+H*2.4,t));}).then(()=>{p.remove();if(I<=0)return;const e=S.circ(tx,Y0+H*2.4,5,{fill:"#1e88e5"},fx),hl=S.circ(tx,Y0+H*2.4,5,{fill:"#fff",stroke:"#e53935","stroke-width":2},fx);
      S.tween(800,t=>{e.setAttribute("cy",lerp(Y0+H*2.4,Y0+H*1.4,t));hl.setAttribute("cy",lerp(Y0+H*2.4,Y0+H*3.5,t));}).then(async()=>{if(circ){await S.tween(700,t=>{e.setAttribute("cx",lerp(tx,X0+W+40,t));e.setAttribute("cy",lerp(Y0+H*1.4,Y0+10,t));});}e.remove();hl.remove();});});}};
  setInterval(()=>{if(document.contains(fx))run();},900);
  const bulb=S.bulb(700,250);const am=S.screen(700,330,120,"0.0 mA");bulb.g.style.display=am.g.style.display="none";
  S.tap(sun,()=>{if(!A.is(0)||lit)return;lit=true;sun.style.opacity=1;A.step(1);A.say("لاحظي: تمتصّ الألواح فوتونات الضوء (الأصفر)، فتتحرّر الإلكترونات (الأزرق) نحو الطبقة السالبة والفجوات (الأحمر) نحو الطبقة الموجبة.");
    setTimeout(()=>{A.step(2);A.obs("تتحرّر الإلكترونات عند امتصاص فوتونات الضوء وتتّجه نحو القطب السالب، وتتّجه الفجوات الموجبة نحو الطبقة الموجبة.");nextBtn(A,"🔌 صِلي القطبين بدارة خارجية",()=>{circ=true;bulb.g.style.display=am.g.style.display="";
      S.wire([[X0+W,Y0+14],[700,Y0+14],[700,225]],"#212121");S.wire([[X0+W,Y0+4*H+14],[760,Y0+4*H+14],[760,250],[712,250]],"#212121");upd();A.step(3);A.say("غيّري شدّة الضوء الساقط، وسجّلي التيار في كل مرّة (4 قراءات على الأقل).");ctl();});},2600);});
  const amp=()=>Math.round(I*.42*10)/10;function upd(){bulb.on(I/100);am.set(amp().toFixed(1)+" mA");sun.style.opacity=.3+.7*I/100;}
  const got=new Set();function ctl(){A.ui.clear();A.ui.slider("☀️ شدّة الضوء",0,100,25,100,v=>{I=v;upd();},"%");A.ui.add(A.ui.btn("📝 سجّلي القراءة",()=>{if(got.has(I)){A.toast("سجّلتِ هذه الشدّة؛ غيّريها");return;}got.add(I);A.rec({i:I,a:amp()});
    if(got.size===4){A.step(4);A.obs("كلّما زادت شدّة الضوء زاد التيار الكهربائي المتولّد.");A.say("اكتبي تقريرًا: أجيبي عن أسئلة البحث القصيرة.");A.ui.add(A.ui.btn("🧾 تقريري",b=>{b.disabled=true;report();},"gold"));}}));}
  function report(){A.ui.clear();quiz(A,[["ما الظاهرة التي تعمل عليها الخلية؟",[[0,"التأثير الكهروضوئي"],[1,"التحليل الكهربائي"],[2,"الانشطار النووي"]],0,"تعتمد على تحرّر الإلكترونات بامتصاص الضوء."],["إلى أين تتّجه الإلكترونات المتحرّرة؟",[[0,"نحو قطب الخلية السالب"],[1,"نحو الطبقة الموجبة"],[2,"تبقى في مكانها"]],0,"تتّجه الإلكترونات نحو القطب السالب ثم تسري في الدارة الخارجية."],["من أيّ موادّ تُصنع ألواح الخلية؟",[[0,"السليكون والجيرمانيوم (شبه موصلة)"],[1,"النحاس والحديد"],[2,"البلاستيك"]],0,"تُصنع من موادّ شبه موصلة."]],()=>A.step(5));}
 }});

/* ---------- 4) نمذجة التوزيع الإلكتروني ---------- */
const EL=[["H","هيدروجين"],["He","هيليوم"],["Li","ليثيوم"],["Be","بيريليوم"],["B","بورون"],["C","كربون"],["N","نيتروجين"],["O","أكسجين"],["F","فلور"],["Ne","نيون"],["Na","صوديوم"],["Mg","مغنيسيوم"],["Al","ألمنيوم"],["Si","سليكون"],["P","فسفور"],["S","كبريت"],["Cl","كلور"],["Ar","آرجون"],["K","بوتاسيوم"],["Ca","كالسيوم"]];
const CAP=[2,8,8,2];const dist=z=>{const d=[];let r=z;for(const c of CAP){if(r<=0)break;d.push(Math.min(c,r));r-=c;}return d;};
const cellOf=z=>z===1?[0,0]:z===2?[0,7]:z<=10?[1,z-3]:z<=18?[2,z-11]:[3,z-19];
BX.reg("c10-2-1-0",{cols:[["s","العنصر"],["z","العدد الذرّي"],["d","التوزيع الإلكتروني"],["n","عدد المستويات الرئيسة"],["o","إلكترونات المستوى الخارجي"]],
 conclude:"تترتّب العناصر في الجدول الدوري بحسب أعدادها الذرّية؛ فعدد المستويات الرئيسة المشغولة بالإلكترونات يساوي رقم الدورة، وعدد إلكترونات المستوى الخارجي يحدّد رقم المجموعة.",
 ans:["العدد الذرّي (تزايده)، وتشابه التوزيع الإلكتروني للمستوى الخارجي.","تزداد سعة المستوى بزيادة رقمه، وتساوي 2n²: المستوى الأول 2، والثاني 8، والثالث 18 (ويحوي 8 إلكترونات فقط في العناصر 1–20).","عدد المستويات الرئيسة المشغولة بالإلكترونات يساوي رقم دورة العنصر.","عدد إلكترونات المستوى الخارجي يساوي رقم المجموعة (للمجموعتين 1 و2)، ويساوي رقم المجموعة مطروحًا منه 10 للمجموعات 13–18.","من التوزيع الإلكتروني: عدد المستويات يحدّد رقم الدورة، وعدد إلكترونات المستوى الخارجي يحدّد رقم المجموعة."],
 build(S,A){const C=[200,270],RR=[45,75,105,135];const card=S.g();S.rect(40,110,320,330,{rx:16,fill:"#fff",stroke:"#B8902A","stroke-width":3},card);
  const zt=S.text(70,140,"",{"font-size":18,fill:"#7A1F2E"},card),nt=S.text(300,140,"",{"font-size":15},card);RR.forEach(r=>S.circ(C[0],C[1],r,{fill:"none",stroke:"#b0bec5","stroke-width":2,"stroke-dasharray":"5 5"},card));
  S.circ(C[0],C[1],24,{fill:"#c62828"},card);const st=S.text(C[0],C[1]+7,"",{"font-size":20,fill:"#fff"},card);const pins=S.g(card);card.style.display="none";
  const rings=RR.map((r,k)=>{const g=S.g(card);S.circ(C[0],C[1],r,{fill:"none",stroke:"#000","stroke-opacity":0,"stroke-width":26,"pointer-events":"stroke"},g);S.tap(g,()=>add(k));return g;});
  let z=0,cnt=[],built=0;const wall=S.g();
  function load(){z++;cnt=[];st.textContent=EL[z-1][0];zt.textContent="Z = "+z;nt.textContent=EL[z-1][1];draw();A.say("بطاقة "+EL[z-1][1]+" ("+EL[z-1][0]+")، العدد الذرّي "+z+": اضغطي على مستوى الطاقة لتثبيت دبوس (إلكترون).");}
  function draw(){pins.innerHTML="";cnt.forEach((n,k)=>{for(let i=0;i<n;i++){const a=-Math.PI/2+i*2*Math.PI/Math.max(n,1);S.circ(C[0]+Math.cos(a)*RR[k],C[1]+Math.sin(a)*RR[k],7,{fill:["#1e88e5","#43a047","#fb8c00","#8e24aa"][k],stroke:"#fff","stroke-width":2},pins);}});}
  const tot=()=>cnt.reduce((a,b)=>a+b,0);
  function add(k){if(!z||tot()>=z||S.busy)return;for(let j=0;j<k;j++)if((cnt[j]||0)<CAP[j]){A.toast("املئي المستوى الأقرب إلى النواة أولًا");return;}if((cnt[k]||0)>=CAP[k]){A.toast("امتلأ هذا المستوى (السعة القصوى هنا "+CAP[k]+")");return;}cnt[k]=(cnt[k]||0)+1;draw();if(tot()===z)complete();}
  function complete(){const d=dist(z);A.rec({s:EL[z-1][1]+" ("+EL[z-1][0]+")",z,d:d.join("، "),n:d.length,o:d[d.length-1]});built++;if(built===1){A.step(1);}
    if(z===20){A.step(2);A.ui.clear();A.say("أعدّي اللوحة الجدارية: ألصقي كل بطاقة في مكانها وفق ترتيبها في الجدول الدوري.");setTimeout(board,600);return;}
    if(built===4){A.ui.clear();A.ui.add(A.ui.btn("⏩ أكملي بقية البطاقات (5–20) بالتوزيع نفسه",b=>{b.disabled=true;auto();},"gold"));}
    setTimeout(load,500);}
  async function auto(){A.ui.clear();await sleep(700);const fc=()=>{cnt=dist(z);draw();const d=cnt;A.rec({s:EL[z-1][1]+" ("+EL[z-1][0]+")",z,d:d.join("، "),n:d.length,o:d[d.length-1]});built++;};if(tot()<z)fc();while(z<20){load();fc();await sleep(120);}
    A.step(2);A.say("أعدّي اللوحة الجدارية: ألصقي كل بطاقة في مكانها وفق ترتيبها في الجدول الدوري.");board();}
  nextBtn(A,"🗂️ صمّمي بطاقات العناصر (1–20)",()=>{card.style.display="";A.step(0);A.ui.clear();load();});
  function board(){const GX=440,GY=90,CW=43,CH=52;S.rect(GX-12,GY-50,CW*8+24,CH*4+70,{rx:12,fill:"#fffdf5",stroke:"#B8902A","stroke-width":2},wall);S.text(GX+CW*4,GY-28,"اللوحة الجدارية",{"font-size":15,fill:"#7A1F2E"},wall);
    ["1","2","13","14","15","16","17","18"].forEach((g,c)=>S.text(GX+c*CW+CW/2,GY-6,g,{"font-size":11,fill:"#666"},wall));
    let k=1;const cells=[];for(let r=0;r<4;r++)for(let c=0;c<8;c++){const cl=S.g(wall);S.rect(GX+c*CW+2,GY+r*CH+2,CW-4,CH-4,{rx:5,fill:"#fff",stroke:"#ddd"},cl);cl.r=r;cl.c=c;cells.push(cl);S.tap(cl,()=>put(cl));}
    S.text(GX-22,GY+CH/2+5,"1",{"font-size":11,fill:"#666"},wall);for(let r=1;r<4;r++)S.text(GX-22,GY+r*CH+CH/2+5,String(r+1),{"font-size":11,fill:"#666"},wall);
    const ask=()=>A.say("ألصقي بطاقة "+EL[k-1][1]+" ("+EL[k-1][0]+"، "+dist(k).join("،")+"): اضغطي على مكانها في اللوحة.");ask();
    function fill(cl,z){S.rect(GX+cl.c*CW+2,GY+cl.r*CH+2,CW-4,CH-4,{rx:5,fill:["#bbdefb","#c8e6c9","#ffe0b2","#e1bee7"][dist(z).length-1],stroke:"#90a4ae"},wall);S.text(GX+cl.c*CW+CW/2,GY+cl.r*CH+24,EL[z-1][0],{"font-size":15},wall);S.text(GX+cl.c*CW+CW/2,GY+cl.r*CH+42,dist(z).join(","),{"font-size":9,fill:"#555"},wall);}
    function put(cl){if(k>20)return;const [r,c]=cellOf(k);if(cl.r!==r||cl.c!==c){A.toast("ليس مكانها؛ تذكّري: عدد المستويات = الدورة، وإلكترونات المستوى الخارجي = المجموعة");return;}fill(cl,k);k++;
      if(k===7){A.ui.clear();A.ui.add(A.ui.btn("⏩ ألصقي بقية البطاقات",b=>{b.disabled=true;while(k<=20){const [r,c]=cellOf(k);fill(cells.find(x=>x.r===r&&x.c===c),k);k++;}fin();},"gold"));}
      if(k>20)fin();else ask();}
    function fin(){A.ui.clear();A.step(3);A.obs("رُتّبت البطاقات وفق العدد الذرّي: العناصر في الدورة نفسها لها عدد المستويات نفسه، والعناصر في المجموعة نفسها لها عدد إلكترونات المستوى الخارجي نفسه.");}}
 }});

/* ---------- 5) الحجوم الأيونية ---------- */
const ION=[["Li","Li⁺",3,134,90,2,1],["Be","Be²⁺",4,90,59,2,2],["B","B³⁺",5,82,41,2,13],["O","O²⁻",8,73,126,2,16],["F","F⁻",9,71,119,2,17],["Na","Na⁺",11,154,116,3,1],["Mg","Mg²⁺",12,130,86,3,2],["Al","Al³⁺",13,118,68,3,13],["S","S²⁻",16,102,170,3,16],["Cl","Cl⁻",17,99,167,3,17],
 ["K","K⁺",19,196,152,4,1],["Ca","Ca²⁺",20,174,114,4,2],["Ga","Ga³⁺",31,126,76,4,13],["Se","Se²⁻",34,116,184,4,16],["Br","Br⁻",35,114,182,4,17],["Rb","Rb⁺",37,211,166,5,1],["Sr","Sr²⁺",38,192,132,5,2],["In","In³⁺",49,144,94,5,13],["Te","Te²⁻",52,135,207,5,16],["I","I⁻",53,133,206,5,17]];
const GX=(z)=>90+z*11,GY=(r)=>450-r*380/220;
BX.reg("c10-2-2-0",{cols:[["i","الأيون"],["z","العدد الذرّي"],["a","نصف قطر الذرّة (pm)"],["r","نصف القطر الأيوني (pm)"]],
 conclude:"الأيون الموجب أصغر من ذرّته، والأيون السالب أكبر من ذرّته؛ وفي الدورة الواحدة يقلّ نصف قطر الأيونات الموجبة ثم يقلّ نصف قطر الأيونات السالبة بزيادة العدد الذرّي، وفي المجموعة الواحدة يزداد نصف القطر الأيوني بزيادة العدد الذرّي.",
 ans:["حجم الأيون الموجب أصغر من حجم ذرّته، وحجم الأيون السالب أكبر من حجم ذرّته.","في الدورة الواحدة يقلّ نصف القطر الأيوني للأيونات الموجبة بزيادة العدد الذرّي (Li⁺ > Be²⁺ > B³⁺)، ثم يرتفع فجأة عند الأيونات السالبة ويقلّ أيضًا بزيادة العدد الذرّي (O²⁻ > F⁻).","في المجموعة الواحدة يزداد نصف القطر الأيوني بزيادة العدد الذرّي (Li⁺ < Na⁺ < K⁺ < Rb⁺).","الأيون الموجب أصغر لفقد إلكترونات المستوى الخارجي (يقلّ عدد المستويات) وقلّة التنافر وزيادة جذب البروتونات للإلكترونات، والأيون السالب أكبر لإضافة إلكترونات تزيد التنافر بينها.","مثلًا: Cs⁺ (Z=55) أكبر من Rb⁺، وAt⁻ أو أيون عنصر في المجموعة 17 أسفل اليود أكبر من I⁻."],
 build(S,A){const gp=S.g();S.rect(90,70,660,380,{fill:"#fff",stroke:"#90a4ae"},gp);for(let z=0;z<=60;z+=5){S.line(GX(z),70,GX(z),450,{stroke:z%10?"#eceff1":"#cfd8dc"},gp);S.text(GX(z),468,String(z),{"font-size":11},gp);}
  for(let r=0;r<=220;r+=20){S.line(90,GY(r),750,GY(r),{stroke:r%40?"#eceff1":"#cfd8dc"},gp);S.text(76,GY(r)+4,String(r),{"font-size":11},gp);}S.text(420,490,"العدد الذرّي",{"font-size":13},gp);S.text(420,58,"العلاقة بين الحجم الأيوني (pm) والعدد الذرّي",{"font-size":14,fill:"#7A1F2E"},gp);
  const lines=S.g(),pts=S.g();let k=0;const hit=S.rect(90,70,660,380,{fill:"#fff","fill-opacity":0});
  const info=S.label(250,100,"",null,"#7A1F2E");info.style.pointerEvents="none";
  const ask=()=>{const I=ION[k];info.set(I[1]+" · Z="+I[2]+" · r="+I[4]+" pm");A.say("حدّدي نقطة الأيون "+I[1]+": العدد الذرّي "+I[2]+"، ونصف قطره الأيوني "+I[4]+" pm (اضغطي على موقعها في الرسم).");};
  const plot=I=>{S.circ(GX(I[2]),GY(I[4]),6,{fill:I[4]>I[3]?"#e53935":"#1e88e5",stroke:"#fff","stroke-width":1.5},pts);S.text(GX(I[2])+2,GY(I[4])-10,I[1],{"font-size":11},pts);A.rec({i:I[1],z:I[2],a:I[3],r:I[4]});};
  S.tap(hit,e=>{if(k>=ION.length)return;const p=S.pt(e),I=ION[k];const z=(p.x-90)/11,r=(450-p.y)*220/380;if(Math.abs(z-I[2])>2.2||Math.abs(r-I[4])>14){A.toast("ليست في مكانها: العدد الذرّي "+I[2]+" على المحور الأفقي، و"+I[4]+" على العمودي");return;}plot(I);k++;
    if(k===6){A.ui.clear();A.ui.add(A.ui.btn("⏩ عيّني بقية النقاط",b=>{b.disabled=true;while(k<ION.length)plot(ION[k++]);done1();},"gold"));}if(k>=ION.length)done1();else ask();});
  ask();
  function done1(){A.ui.clear();info.style.display="none";A.step(0);A.obs("نقاط الأيونات الموجبة (الأزرق) أقل من ذرّاتها، ونقاط الأيونات السالبة (الأحمر) أعلى.");A.say("صِلي بين نقاط عناصر الدورة الواحدة بقلم التلوين الأزرق: اختاري كل دورة.");const dn=new Set();
    A.ui.group("🖍️ قلم أزرق — الدورة:",...[2,3,4,5].map(p=>A.ui.btn("الدورة "+p,b=>{b.disabled=true;link(ION.filter(x=>x[5]===p),"#1565c0");dn.add(p);if(dn.size===4){A.step(1);groups();}})));}
  function link(arr,col,dash){S.path("M"+arr.map(x=>GX(x[2])+" "+GY(x[4])).join(" L"),{stroke:col,"stroke-width":3,fill:"none","stroke-dasharray":dash||""},lines);}
  function groups(){A.ui.clear();A.obs("في الدورة الواحدة يقلّ نصف قطر الأيونات الموجبة بزيادة العدد الذرّي، ثم يقلّ نصف قطر الأيونات السالبة.");A.say("صِلي بين نقاط عناصر المجموعة الواحدة بقلم تلوين مختلف (الأحمر).");const dn=new Set();
    A.ui.group("🖍️ قلم أحمر — المجموعة:",...[1,2,13,16,17].map(g=>A.ui.btn("المجموعة "+g,b=>{b.disabled=true;link(ION.filter(x=>x[6]===g),"#e53935","7 5");dn.add(g);if(dn.size===5){A.step(2);A.obs("في المجموعة الواحدة يزداد نصف القطر الأيوني بزيادة العدد الذرّي.");}})));}
 }});

/* ---------- 6) الروابط في المركّبات التساهمية ---------- */
const AT={H:["الهيدروجين","1s¹",1,"#fafafa"],O:["الأكسجين","1s² 2s² 2p⁴",2,"#e53935"],C:["الكربون","1s² 2s² 2p²",4,"#263238"],N:["النيتروجين","1s² 2s² 2p³",3,"#1e88e5"]};
const MOL=[["CH₄",[["C",0,0],["H",0,-95],["H",-90,30],["H",90,30],["H",0,95]],[[0,1,1],[0,2,1],[0,3,1],[0,4,1]]],["CO₂",[["C",0,0],["O",-120,0],["O",120,0]],[[0,1,2],[0,2,2]]],["N₂",[["N",-60,0],["N",60,0]],[[0,1,3]]]];
BX.reg("c10-3-1-0",{cols:[["e","العنصر"],["s","رمز الذرّة"],["c","التركيب الإلكتروني"],["b","عدد الروابط"]],
 conclude:"تكوّن كل ذرّة عددًا من الروابط التساهمية يساوي عدد الإلكترونات التي تحتاج إليها لإكمال مستواها الخارجي؛ فالرابطة التساهمية زوج من الإلكترونات تشترك فيه ذرّتان، وقد تكون أحادية أو ثنائية أو ثلاثية.",
 ans:["N: 3 روابط، H: رابطة واحدة، O: رابطتان، C: 4 روابط.","(C–H): زوج واحد، (O=C): زوجان، (N≡N): ثلاثة أزواج من الإلكترونات المشتركة.","تشارك ذرّة H بإلكترون واحد، وO بإلكترونين، وC بأربعة إلكترونات، وN بثلاثة إلكترونات.","الرابطة التساهمية: رابطة تنشأ بين ذرّتين (لافلزّيتين غالبًا) بمشاركة كلٍّ منهما بإلكترون أو أكثر، فتتكوّن أزواج إلكترونات مشتركة بينهما."],
 build(S,A){const pal=S.g();const ball=(par,el,x,y,r)=>{const g=S.g(par);S.tr(g,x,y);S.circ(0,0,r,{fill:AT[el][3],stroke:"#455a64","stroke-width":2},g);const n=AT[el][2];for(let i=0;i<n;i++){const a=-Math.PI/2+i*2*Math.PI/n;S.circ(Math.cos(a)*r*.62,Math.sin(a)*r*.62,4,{fill:"#9e9e9e",stroke:"#424242"},g);}return g;};
  const types=["H","O","N","C"];const balls=types.map((el,i)=>{const g=ball(pal,el,130+i*180,455,26);S.text(0,44,AT[el][2]+(AT[el][2]===1?" ثقب":" ثقوب"),{"font-size":12},g);g.el=el;return g;});
  const tbl=S.g();const rows=["H","O","C","N"];S.rect(170,40,460,250,{rx:12,fill:"#fff",stroke:"#B8902A","stroke-width":2},tbl);[["العنصر",560],["الرمز",470],["التركيب الإلكتروني",370],["عدد الروابط",240]].forEach(([t,x])=>S.text(x,70,t,{"font-size":13,fill:"#7A1F2E"},tbl));
  const cellB=rows.map((el,i)=>{const y=110+i*48;S.text(560,y,AT[el][0],{"font-size":14},tbl);S.text(470,y,el,{"font-size":16},tbl);S.text(370,y,AT[el][1],{"font-size":14},tbl);return S.text(240,y,"؟",{"font-size":16,fill:"#B8902A"},tbl);});
  let r=0;const ask=()=>A.say("ذرّة "+AT[rows[r]][0]+" ("+AT[rows[r]][1]+"): كم رابطة تكوّن؟ اختاري نموذج الكرة الذي يتوافق عدد ثقوبه مع عدد الروابط.");ask();
  balls.forEach(b=>S.tap(b,()=>{if(r<4){if(AT[b.el][2]!==AT[rows[r]][2]){A.toast("عدد الثقوب لا يتوافق؛ كم إلكترونًا تحتاج الذرّة لإكمال مستواها الخارجي؟");return;}const el=rows[r];cellB[r].textContent=String(AT[el][2]);A.rec({e:AT[el][0],s:el,c:AT[el][1],b:AT[el][2]});if(++r<4)ask();else{A.step(0);tbl.style.display="none";mol(0);}}}));
  let m=0;const ws=S.g();window.__MOL=MOL;
  function mol(i){m=i;ws.innerHTML="";const M=MOL[i];const cx=400,cy=210;const filled=[];const bonds=M[2].map(()=>1);S.label(cx,40,"صمّمي نموذج "+M[0],ws,"#7A1F2E");
    const bl=S.g(ws);const drawB=()=>{bl.innerHTML="";M[2].forEach(([a,b],j)=>{const A1=M[1][a],B1=M[1][b];const dx=B1[1]-A1[1],dy=B1[2]-A1[2],L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L;const n=bonds[j];const g=S.g(bl);
      for(let q=0;q<n;q++){const o=(q-(n-1)/2)*9;S.line(cx+A1[1]+nx*o,cy+A1[2]+ny*o,cx+B1[1]+nx*o,cy+B1[2]+ny*o,{stroke:"#8d6e63","stroke-width":6,"stroke-linecap":"round"},g);}
      S.line(cx+A1[1],cy+A1[2],cx+B1[1],cy+B1[2],{stroke:"#000","stroke-opacity":0,"stroke-width":30},g);S.tap(g,()=>{if(filled.length<M[1].length){A.toast("ضعي الكرات أولًا");return;}bonds[j]=bonds[j]%3+1;drawB();});});};
    drawB();const gh=M[1].map(([el,x,y],j)=>{const g=S.g(ws);S.tr(g,cx+x,cy+y);S.circ(0,0,30,{fill:"#fff",stroke:"#90a4ae","stroke-width":2,"stroke-dasharray":"5 4"},g);S.text(0,6,el,{"font-size":18,fill:"#90a4ae"},g);g.el=el;g.j=j;return g;});
    A.say("اسحبي كرة مناسبة إلى موقع كل ذرّة في نموذج "+M[0]+".");
    balls.forEach(b=>{if(b._d)return;b._d=1;S.drag(b,{back:true,targets:()=>r<4?[]:MOL[m]._gh.filter(g=>!g.f).map(g=>({g,pad:10,fn:async()=>{if(g.el!==b.el){A.toast("هذه الكرة لا تناسب ذرّة "+g.el);return false;}g.f=1;ball(g,b.el,0,0,28);MOL[m]._fill.push(g.j);
      if(MOL[m]._fill.length===MOL[m][1].length){A.say("اضغطي على كل رابطة لتغيير نوعها (أحادية/ثنائية/ثلاثية) حتى يكتمل عدد روابط كل ذرّة، ثم تحقّقي.");A.ui.clear();A.ui.add(A.ui.btn("✅ تحقّقي من النموذج",()=>MOL[m]._check()));}}}))});});
    M._gh=gh;M._fill=filled;M._check=()=>check();
    function check(){const ok=M[1].every(([el],j)=>M[2].reduce((s,[a,b2],q)=>s+((a===j||b2===j)?bonds[q]:0),0)===AT[el][2]);if(!ok){A.toast("عدد الروابط حول ذرّة ما لا يساوي عدد ثقوبها؛ عدّلي الروابط");return;}
      A.ui.clear();A.obs("نموذج "+M[0]+": "+M[2].map(([a,b2],q)=>M[1][a][0]+["–","=","≡"][bonds[q]-1]+M[1][b2][0]).join("، ")+".");if(i<2)setTimeout(()=>mol(i+1),900);else{A.step(1);A.say("أحسنتِ! صمّمتِ نماذج CH₄ وCO₂ وN₂.");}}}
 }});

/* ---------- 7، 8) التوصيل الكهربائي ---------- */
function cond(S,A,o){const bat=S.battery(150,90,{v:"6 V"}),bulb=S.bulb(400,110);const E=S.g();S.tr(E,400,200);[-28,28].forEach(x=>{S.rect(x-7,0,14,130,{rx:3,fill:S.lg(["#212121","#616161","#212121"])},E);});S.rect(-50,-14,100,14,{rx:3,fill:"#8d6e63"},E);S.rect(-45,0,90,130,{fill:"#fff","fill-opacity":0},E);const EL1=S.line(-28,-14,-28,-14,{stroke:"#1565c0","stroke-width":4},E),EL2=S.line(28,-14,28,-14,{stroke:"#212121","stroke-width":4},E);S.text(0,-22,"قطبا جرافيت",{"font-size":12},E);
  const wires=S.g();let n=0;
  const bowl=S.g();S.tr(bowl,130,440);S.path("M-70 -60 Q-70 0 0 0 Q70 0 70 -60Z",{fill:"#eceff1",stroke:"#90a4ae","stroke-width":3},bowl);const pile=S.path("M-55 -45 Q0 -80 55 -45 Q0 -30 -55 -45Z",{fill:"#fff",stroke:"#cfd8dc"},bowl);S.text(0,20,"وعاء: 50 g "+o.short,{"font-size":12},bowl);
  const bk=S.beaker(660,450,140,160,{lvl:.5,label:"كأس زجاجية + ماء"});const undis=S.ell(0,-12,40,8,{fill:"#fff",stroke:"#ccc",opacity:0},bk.g);
  const inset=S.g();S.tr(inset,640,140);inset.style.display="none";S.circ(0,0,80,{fill:"#fff",stroke:"#7A1F2E","stroke-width":3},inset);const parts=S.g(inset);parts.setAttribute("clip-path",S.clip(S.mk("circle",{r:76})));const il=S.label(0,98,"",inset,"#7A1F2E");
  let mode=null,anim=0;function zoom(kind){inset.style.display="";parts.innerHTML="";const P=[];if(o.ionic){if(kind==="s"){for(let i=-3;i<=3;i++)for(let j=-3;j<=3;j++){const pos=(i+j)%2===0;const c=S.circ(i*22,j*22,pos?7:10,{fill:pos?"#7e57c2":"#66bb6a"},parts);P.push(null);}il.set("أيونات Na⁺ و Cl⁻ مقيّدة في البلّورة");}
      else{for(let i=0;i<16;i++){const pos=i%2===0;const g=S.g(parts);S.circ(0,0,pos?7:10,{fill:pos?"#7e57c2":"#66bb6a"},g);S.text(0,4,pos?"+":"−",{"font-size":11,fill:"#fff"},g);P.push([g,R(-60,60),R(-60,60),R(-1,1),R(-1,1)]);}il.set("أيونات حرّة الحركة في المحلول");}}
    else{const k=kind==="s"?9:7;for(let i=0;i<k;i++){const g=S.g(parts);S.path("M-10 -6 L0 -12 L10 -6 L10 6 L0 12 L-10 6Z",{fill:"#ffcc80",stroke:"#e65100","stroke-width":1.5},g);P.push(kind==="s"?(S.tr(g,(i%3-1)*30,(Math.floor(i/3)-1)*30),null):[g,R(-55,55),R(-55,55),R(-.6,.6),R(-.6,.6)]);}il.set(kind==="s"?"جزيئات C₆H₁₂O₆ متعادلة مترابطة":"جزيئات متعادلة (لا أيونات) منتشرة في الماء");}
    const id=++anim;const step=()=>{if(id!==anim)return;P.forEach(p=>{if(!p)return;p[1]+=p[3];p[2]+=p[4];if(Math.abs(p[1])>62)p[3]*=-1;if(Math.abs(p[2])>62)p[4]*=-1;S.tr(p[0],p[1],p[2]);});requestAnimationFrame(step);};step();}
  A.say("كوّني دارة كهربائية موصولة إلى قطبي الجرافيت: اضغطي على البطّارية، ثم المصباح، ثم القطبين.");
  S.tap(bat,()=>{if(n!==0)return;n=1;S.wire([[196,90],[260,90],[260,110],[388,110]],"#c62828",wires);});
  S.tap(bulb.g,()=>{if(n!==1){if(!n)A.toast("ابدئي بالبطّارية");return;}n=2;S.wire([[412,110],[440,110],[440,170],[428,170]],"#212121",wires);});
  S.tap(E,()=>{if(n===2){n=3;S.wire([[104,90],[80,90],[80,160],[372,160]],"#1565c0",wires);EL1.setAttribute("y2",160-E._y);EL2.setAttribute("y2",170-E._y);A.step(0);A.say("ضعي الوعاء الذي فيه 50 g من "+o.name+" تحت القطبين: اسحبيه.");}});
  const mvE=(y1,ms)=>{const y0=E._y;return S.tween(ms,t=>{const y=lerp(y0,y1,t);S.tr(E,400,y);EL1.setAttribute("y2",160-y);EL2.setAttribute("y2",170-y);});};const lower=async(on)=>{await mvE(330,700);bulb.on(on?1:0);await sleep(300);};const raise=()=>mvE(200,500);
  const T1=()=>A.is(0)&&!mode?[{box:[330,330,140,140],fn:async()=>{mode="s";await S.moveTo(bowl,400,470,300);nextBtn(A,"⬇️ اغمسي القطبين في "+o.short+" الصلب",async()=>{await lower(false);zoom("s");A.rec({s:o.short+" (صلب)",b:"لا يضيء"});A.obs("لم يُضِئ المصباح عند غمس القطبين في "+o.name+" الصلب.");A.step(1);
      nextBtn(A,"⬆️ ارفعي القطبين",async()=>{await raise();bulb.on(0);inset.style.display="none";A.ui.clear();await S.moveTo(bowl,130,440,400);mode="w";A.say("أذيبي 50 g من "+o.name+" في الكأس الزجاجية: اسحبي الوعاء إلى الكأس.");});});return "stay";}}]:[];
  let dis=0;
  const T2=()=>mode==="w"?[{g:bk.g,fn:async()=>{mode="x";await S.moveTo(bowl,660,250,300,-60);pile.style.display="none";undis.setAttribute("opacity",1);await S.moveTo(bowl,130,440,400,0);A.say(o.heat?"حرّكي المحلول، واستعملي السخّان لإذابة الكمّية كلّها إن لزم الأمر.":"حرّكي حتى يذوب الملح كاملًا.");
      A.ui.clear();A.ui.add(A.ui.btn("🥄 حرّكي",b=>{dis=Math.min(o.heat?.6:1,dis+(o.heat?.3:.5));undis.setAttribute("opacity",1-dis);if(dis>=1)dissolved();else if(o.heat&&dis>=.6)A.toast("بقي جزء لم يذب؛ استعملي السخّان");}));
      if(o.heat)A.ui.add(A.ui.btn("🔥 السخّان الكهربائي",b=>{if(dis<.3){A.toast("حرّكي أولًا");return;}b.disabled=true;S.tween(1200,t=>{undis.setAttribute("opacity",(1-dis)*(1-t));}).then(()=>{dis=1;dissolved();});},"gold"));return;}}]:[];
  S.drag(bowl,{back:true,targets:()=>[...T1(),...T2()]});
  function dissolved(){A.ui.clear();A.obs("ذاب "+o.name+" كاملًا في الماء.");A.say("انقلي الكأس تحت القطبين: اسحبيها.");S.drag(bk.g,{back:true,targets:()=>mode==="x"?[{box:[330,330,140,140],fn:async()=>{mode="y";await S.moveTo(bk.g,400,470,300);
      nextBtn(A,"⬇️ اغمسي القطبين في المحلول",async()=>{await lower(o.ionic);zoom("w");A.rec({s:"محلول "+o.short,b:o.ionic?"يضيء":"لا يضيء"});A.obs(o.ionic?"أضاء المصباح عند غمس القطبين في محلول ملح الطعام.":"لم يُضِئ المصباح عند غمس القطبين في محلول سكّر الجلوكوز.");A.step(2);A.ui.clear();});return "stay";}}]:[]});}
}
BX.reg("c10-3-2-0",{cols:[["s","المادّة"],["b","المصباح"]],
 conclude:"المركّبات الأيونية لا توصل التيار الكهربائي وهي صلبة؛ لأن أيوناتها مقيّدة الحركة في البلّورة، أمّا محاليلها المائية (ومصاهيرها) فتوصل التيار؛ لأن أيوناتها تتحرّر وتصبح حرّة الحركة (محاليل إلكتروليتية).",
 ans:["عند إذابة NaCl في الماء تتفكّك البلّورة الأيونية وتصبح أيونات Na⁺ و Cl⁻ حرّة الحركة، فتنتقل نحو الأقطاب المخالفة لها في الشحنة فيسري التيار ويضيء المصباح؛ أمّا الملح الصلب فأيوناته مقيّدة فلا يوصل."],
 build(S,A){cond(S,A,{ionic:true,name:"ملح الطعام",short:"NaCl",heat:false});}});
BX.reg("c10-3-2-1",{cols:[["s","المادّة"],["b","المصباح"]],
 conclude:"سكّر الجلوكوز مركّب تساهمي جزيئي لا يوصل التيار الكهربائي صلبًا ولا محلولًا؛ لأنه لا يتأيّن في الماء، بل تنفصل جزيئاته المتعادلة بعضها عن بعض فقط (محلول غير إلكتروليتي).",
 ans:["في الحالة الصلبة تتكوّن المادّة من جزيئات متعادلة كهربائيًّا مقيّدة لا تحوي أيونات، وعند الإذابة في الماء لا يتأيّن السكّر بل تنفصل جزيئاته المتعادلة بعضها عن بعض؛ فلا توجد أيونات حرّة الحركة تنقل التيار، فلا يضيء المصباح."],
 build(S,A){cond(S,A,{ionic:false,name:"سكّر الجلوكوز",short:"C₆H₁₂O₆",heat:true});}});
})();
