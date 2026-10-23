/* تجارب الكيمياء — الصف التاسع */
(function(){const {sleep,lerp,clamp,mix}=BX;const R=(a,b)=>a+Math.random()*(b-a);const U=s=>"⁦"+s+"⁩";
/* مقياس الكاشف العام */
const UI=["#d50000","#e53935","#f4511e","#fb8c00","#fdd835","#ffee58","#c0ca33","#43a047","#26a69a","#1e88e5","#3949ab","#5e35b1","#6a1b9a","#4a148c","#311b92"];
const uiCol=ph=>UI[clamp(Math.round(ph),0,14)];
function chartUI(S,x,y,w,onPick){const g=S.g();S.tr(g,x,y);const cw=w/15;S.rect(-6,-30,w+12,62,{rx:10,fill:"#fff",stroke:"#B8902A","stroke-width":2},g);S.text(w/2,-14,"مقياس الكاشف العام (pH)",{"font-size":12},g);
  UI.forEach((c,i)=>{const cell=S.g(g);S.rect(i*cw+1,-4,cw-2,22,{rx:4,fill:c},cell);S.text(i*cw+cw/2,30,String(i),{"font-size":11},cell);if(onPick)S.tap(cell,()=>onPick(i));});return g;}
function paper(S,x,y){const g=S.g();S.tr(g,x,y);S.rect(-8,-80,16,80,{rx:2,fill:"#fff59d",stroke:"#c9a227","stroke-width":1.5},g);g.tip=S.rect(-8,-24,16,24,{fill:"#fff59d"},g);S.text(0,18,"ورق الكاشف",{"font-size":11},g);return g;}

/* ---------- 1) أنابيب التفريغ الكهربائي وأطياف العناصر ---------- */
const GAS=[["هيليوم","He","#ffc9a8",[447,471,492,501,587,667,706]],["نيون","Ne","#ff3d00",[585,588,594,597,603,607,614,617,626,633,640,650,659,667,692,703]],["آرجون","Ar","#b39ddb",[420,427,433,451,696,706,738,750,763]],["هيدروجين","H","#ff4fa3",[410,434,486,656]],["صوديوم","Na","#ffc400",[589,589.6]],["زئبق","Hg","#82b1ff",[405,436,546,577,579]]];
function nm2rgb(l){let r=0,g=0,b=0;if(l<440){r=-(l-440)/60;b=1;}else if(l<490){g=(l-440)/50;b=1;}else if(l<510){g=1;b=-(l-510)/20;}else if(l<580){r=(l-510)/70;g=1;}else if(l<645){r=1;g=-(l-645)/65;}else r=1;return "rgb("+[r,g,b].map(v=>Math.round(clamp(v,0,1)*255)).join(",")+")";}
BX.reg("c9-1-1-0",{cols:[["g","الغاز"],["c","لون الضوء الصادر"],["n","عدد الخطوط الطيفية الظاهرة"]],
 conclude:"يُصدر كل عنصر ضوءًا بلون مميّز وطيفًا خطّيًّا خاصًّا به كبصمة الإصبع؛ لأن لذرّات كل عنصر مستويات طاقة مختلفة.",
 ans:["لا؛ يُصدر كل غاز لونًا خاصًّا به وطيفًا خطّيًّا مختلفًا (مثل البصمة).","تختلف ذرّات العناصر في تركيبها (مستويات الطاقة للإلكترونات)، فيُطلق كل عنصر طاقة بأطوال موجية مميّزة له."],
 build(S,A){const coil=S.g();S.tr(coil,170,392);S.rect(-110,-70,220,70,{rx:8,fill:S.lg(["#5d4037","#3e2723"],1)},coil);S.rect(-70,-110,140,40,{rx:20,fill:S.lg(["#b71c1c","#e53935","#b71c1c"],1)},coil);for(let i=0;i<9;i++)S.line(-60+i*15,-110,-60+i*15,-70,{stroke:"#7f0000","stroke-width":2},coil);
  S.text(0,-30,"ملف رومكورف",{"font-size":15,fill:"#fff"},coil);const sw=S.g(coil);S.tr(sw,80,-40);S.rect(-18,-14,36,28,{rx:6,fill:"#212121"},sw);const lev=S.rect(-4,-12,8,14,{fill:"#e53935",rx:2},sw);S.text(0,30,"المصدر",{"font-size":11,fill:"#fff"},sw);
  const clamp1=S.g();S.tr(clamp1,470,250);S.line(-170,0,170,0,{stroke:"#8d6e63","stroke-width":6},clamp1);S.rect(-180,-22,20,44,{fill:"#455a64",rx:3},clamp1);S.rect(160,-22,20,44,{fill:"#455a64",rx:3},clamp1);S.rect(-6,0,12,142,{fill:"#6d4c41"},clamp1);
  S.label(0,-50,"ضعي الأنبوب هنا",clamp1,"#455a64");
  S.wire([[250,330],[250,250],[290,250]],"#d32f2f");S.wire([[90,330],[90,180],[650,180],[650,250]],"#212121");
  const spec=S.g();S.tr(spec,400,70);S.rect(-280,-30,560,60,{rx:8,fill:"#111"},spec);const lines=S.g(spec);S.text(0,48,"الطيف الخطّي (منظار الطيف)",{"font-size":12},spec);
  let cur=null,on=false;const done=new Set();
  const tubes=GAS.map(([n,s,c,L],i)=>{const g=S.g();S.tr(g,345+i*76,436,-90,.38);S.rect(-170,-14,340,28,{rx:14,fill:"#eceff1",stroke:"#90a4ae","stroke-width":3,opacity:.8},g);g.glow=S.rect(-160,-9,320,18,{rx:9,fill:c,opacity:0},g);S.ell(-176,0,10,16,{fill:"#9e9e9e"},g);S.ell(176,0,10,16,{fill:"#9e9e9e"},g);
    const t=S.text(0,6,s,{"font-size":34,fill:"#37474f"},g);g.gas=i;
    S.drag(g,{targets:()=>cur==null?[{g:clamp1,fn:async()=>{if(on){A.toast("افصلي المصدر أولًا!");return false;}cur=g;S.tr(g,470,250,0,1);g.querySelector("text").setAttribute("transform","rotate(0)");if(i===0||A.is(0))A.step(0);A.say("شغّلي المصدر (اضغطي على المفتاح) ولاحظي لون الضوء.");return "stay";}}]:[],back:true});return g;});
  /* إعادة الأنبوب للرفّ بالضغط عليه */
  tubes.forEach((g,i)=>S.tap(g,async()=>{if(cur!==g)return;if(on){A.toast("افصلي المصدر أولًا قبل نزع الأنبوب");return;}cur=null;S.tr(g,345+i*76,436,-90,.38);}));
  A.say("اسحبي أنبوب الهيليوم (He) وضعيه بين طرفي التوصيل.");
  S.tap(sw,()=>{if(!cur){A.toast("ضعي أنبوبًا أولًا");return;}on=!on;lev.setAttribute("y",on?-2:-12);lev.setAttribute("fill",on?"#43a047":"#e53935");const [n,s,c,L]=GAS[cur.gas];
    cur.glow.setAttribute("opacity",on?.95:0);cur.glow.setAttribute("filter",on?"url(#bl)":"");lines.innerHTML="";
    if(on){L.forEach(l=>{const x=-270+(l-400)/(780-400)*540;S.rect(x-2,-26,4,52,{fill:nm2rgb(l)},lines);});for(let w=400;w<=750;w+=50)S.text(-270+(w-400)/380*540,-34,String(w),{"font-size":9,fill:"#999"},lines);
      if(!done.has(cur.gas)){done.add(cur.gas);A.rec({g:n+" ("+s+")",c:["وردي مصفرّ","أحمر برتقالي","بنفسجي فاتح","وردي أرجواني","أصفر برتقالي","أزرق بنفسجي"][cur.gas],n:L.length>10?"كثيرة (أكثر من 10)":String(new Set(L.map(Math.round)).size)});A.step(1);}
      A.say("لاحظي اللون والطيف، ثم افصلي المصدر وانزعي الأنبوب (اضغطي عليه) وجرّبي غازًا آخر. ("+done.size+"/6)");}
    else if(done.size===6){A.obs("لكل غاز لون ضوء وطيف خطّي مختلف.");A.step(2);}});
 }});

/* ---------- 2) التحليل الكهربائي لمحلول كلوريد النحاس ---------- */
BX.reg("c9-1-1-1",{cols:[["e","القطب"],["q","شحنته"],["o","الملاحظة"],["m","المادة المتكوّنة"]],
 conclude:"عند مرور التيار في محلول CuCl₂ تتّجه أيونات النحاس الموجبة إلى القطب السالب فيترسّب النحاس، وأيونات الكلوريد السالبة إلى القطب الموجب فيتصاعد غاز الكلور؛ فالمادة تحتوي على جسيمات مشحونة.",
 ans:["النحاس (طبقة بنّية محمرّة) على القطب السالب (المهبط).","يدلّ على أن المادة تتكوّن من جسيمات مشحونة (أيونات موجبة وسالبة) تنجذب إلى الأقطاب المخالفة لها في الشحنة؛ أي أن الذرّة تحتوي على شحنات كهربائية."],
 build(S,A){const bot=S.bottle(80,470,"#4fc3f7","CuCl₂ 1M");const cyl=S.cylinder(200,470,150,{w:44,col:"#29b6f6",lvl:0,label:"مخبار"});const bk=S.beaker(430,392,190,160,{lvl:0,label:"كأس 250 mL"});
  const ml=S.label(0,-175,"0 mL",cyl.g,"#0277bd");A.say("قيسي 150 mL من المحلول: اسحبي الزجاجة إلى المخبار.");
  S.drag(bot,{back:true,oy:-50,targets:()=>!cyl.full?[{g:cyl.g,fn:async()=>{await S.pour(bot,250,250,-75,async()=>{S.stream(222,275,330,"#4fc3f7",900);await S.tween(1100,t=>{cyl.set(.75*t);ml.set(Math.round(150*t)+" mL");});});cyl.full=1;A.say("اسحبي المخبار إلى الكأس لسكب المحلول فيها.");}}]:[]});
  S.drag(cyl.g,{back:true,oy:-80,targets:()=>cyl.full&&!bk.lvl?[{g:bk.g,fn:async()=>{await S.pour(cyl.g,560,200,-80,async()=>{S.stream(525,215,360,"#4fc3f7",700);await Promise.all([bk.to(.6,1000,"#4fc3f7"),S.tween(1000,t=>{cyl.set(.75*(1-t));ml.set(Math.round(150*(1-t))+" mL");})]);});A.step(0);elec();}}]:[]});
  let rods=[];function elec(){A.say("اغمري قطبي الكربون في المحلول: اسحبي كل قطب إلى الكأس.");const pos=[380,480];let n=0;
    [0,1].forEach(i=>{const r=S.g();S.tr(r,640+i*50,470);S.rect(-8,-150,16,150,{rx:4,fill:S.lg(["#212121","#616161","#212121"])},r);S.text(0,18,"قطب كربون",{"font-size":11},r);rods.push(r);
      S.drag(r,{targets:()=>[{g:bk.g,fn:async()=>{r._off=true;await S.moveTo(r,pos[n],372,300);r.querySelector("text").remove();if(++n===2)wire();return "stay";}}],back:true});});}
  function wire(){const bat=S.battery(430,150);A.say("صِلي القطبين بالبطارية: اضغطي على البطارية.");S.tap(bat,()=>{if(bat.c)return;bat.c=1;
      S.wire([[388,150],[380,150],[380,222]],"#1565c0");S.wire([[476,150],[480,150],[480,222]],"#c62828");S.label(380,240,"−",null,"#1565c0");S.label(480,240,"+",null,"#c62828");A.step(1);run();});}
  function run(){A.say("حرّكي شريط الزمن، ولاحظي ما يتكوّن عند كل قطب.");const cu=S.rect(372,282,16,90,{fill:"#b5651d",opacity:0});const gas=S.bubbles(480,370,14,10,{h:120,col:"#c5e1a5"});gas.style.display="none";let r=0;
    A.ui.slider("⏱️ الزمن (دقيقة)",0,10,1,0,m=>{cu.setAttribute("opacity",m/10);gas.style.display=m?"":"none";bk.set(null,mix("#4fc3f7","#b3e5fc",m/14));
      if(m>=6&&!r){r=1;A.rec({e:"المهبط",q:"سالب (−)",o:"ترسّب طبقة بنّية محمرّة",m:"النحاس Cu"});A.rec({e:"المصعد",q:"موجب (+)",o:"فقاعات غاز أصفر مخضرّ ذو رائحة نفّاذة",m:"غاز الكلور Cl₂"});A.obs("ترسّب النحاس على القطب السالب، وتصاعد غاز الكلور عند القطب الموجب، وخفّ اللون الأزرق للمحلول.");A.step(2);}});}
 }});

/* ---------- 3) التفريغ الكهربائي (أشعة المهبط) ---------- */
BX.reg("c9-1-1-2",{cols:[["c","الحالة"],["o","الملاحظة"]],
 conclude:"تنطلق أشعة المهبط من القطب السالب وتسير في خطوط مستقيمة، وتنحرف بالمجال المغناطيسي؛ فهي جسيمات سالبة الشحنة (إلكترونات).",
 ans:["تنحرف الأشعة عن مسارها المستقيم، ويتغيّر اتجاه الانحراف بعكس قطبي المغناطيس.","سالبة؛ وهي الإلكترونات."],
 build(S,A){const tb=S.g();S.tr(tb,400,220);S.path("M-260 -40 L200 -40 Q260 -40 270 0 Q260 40 200 40 L-260 40 Q-290 40 -290 0 Q-290 -40 -260 -40Z",{fill:S.lg([["#e3f2fd",0,.5],["#fff",.5,.25],["#e3f2fd",1,.5]],1),stroke:"#90a4ae","stroke-width":3},tb);
  S.rect(-280,-16,14,32,{fill:"#455a64"},tb);S.rect(250,-30,14,60,{fill:"#9ccc65",opacity:.6},tb);S.text(-272,62,"المهبط (−)",{"font-size":12},tb);S.text(240,62,"شاشة مُفلورة",{"font-size":12},tb);
  const beam=S.path("M-262 0 L255 0",{stroke:"#00e676","stroke-width":5,fill:"none",opacity:0,filter:"url(#bl)"},tb);const dot=S.circ(256,0,9,{fill:"#b9f6ca",opacity:0},tb);
  const coil=S.g();S.tr(coil,170,392);S.rect(-100,-60,200,60,{rx:8,fill:S.lg(["#5d4037","#3e2723"],1)},coil);S.text(0,-24,"ملف رومكورف",{"font-size":14,fill:"#fff"},coil);
  const sw=S.g();S.tr(sw,400,370);S.rect(-34,-14,68,28,{rx:6,fill:"#37474f"},sw);const arm=S.line(-24,0,18,-18,{stroke:"#ffca28","stroke-width":5,"stroke-linecap":"round"},sw);S.text(0,32,"المفتاح",{"font-size":12},sw);
  let con=false,closed=false;A.say("صِلي الأنبوب بملف رومكورف: اضغطي على الملف (الدارة مفتوحة).");
  S.tap(coil,()=>{if(con)return;con=true;S.wire([[230,350],[300,350],[300,280],[130,280],[130,220],[124,220]],"#212121");S.wire([[260,350],[366,350]],"#c62828");S.wire([[434,370],[690,370],[690,220],[664,220]],"#c62828");A.step(0);A.say("أغلقي الدارة: اضغطي على المفتاح.");A.rec({c:"الدارة مفتوحة",o:"لا تظهر أشعة"});});
  S.tap(sw,()=>{if(!con){A.toast("صِلي الأنبوب أولًا");return;}closed=!closed;arm.setAttribute("y2",closed?0:-18);beam.setAttribute("opacity",closed?.9:0);dot.setAttribute("opacity",closed?1:0);
    if(closed&&!A.is(1)){A.step(1);A.rec({c:"الدارة مغلقة",o:"تنطلق أشعة من المهبط في خط مستقيم وتُضيء الشاشة"});A.say("قرّبي المغناطيس من الأشعة: اسحبيه فوق الأنبوب.");}upd();});
  const mag=S.g();S.tr(mag,640,450);S.path("M-40 -30 L-40 20 Q-40 40 -20 40 L20 40 Q40 40 40 20 L40 -30 L22 -30 L22 18 L-22 18 L-22 -30Z",{fill:"#90a4ae"},mag);S.rect(-40,-50,18,22,{fill:"#e53935"},mag);S.rect(22,-50,18,22,{fill:"#1e88e5"},mag);S.text(-31,-34,"N",{"font-size":12,fill:"#fff"},mag);S.text(31,-34,"S",{"font-size":12,fill:"#fff"},mag);
  let flip=1;const tested=new Set();
  function upd(){const d=Math.hypot(mag._x-400,mag._y-170);const k=closed?clamp(1-(d-60)/180,0,1)*flip:0;const dy=k*70;beam.setAttribute("d","M-262 0 Q0 0 255 "+(-dy));dot.setAttribute("cy",-dy);
    if(closed&&Math.abs(k)>.7){const key=flip>0?"a":"b";if(!tested.has(key)){tested.add(key);A.rec({c:"تقريب المغناطيس"+(flip>0?"":" (بعد عكس قطبيه)"),o:"انحرفت الأشعة "+(flip>0?"إلى الأعلى":"إلى الأسفل")});A.obs("انحرفت أشعة المهبط عند تقريب المغناطيس"+(flip>0?"":"، وانعكس اتجاه الانحراف عند عكس الأقطاب")+".");if(tested.size===1)A.ui.add(A.ui.btn("🔄 اعكسي قطبي المغناطيس",()=>{flip*=-1;mag.querySelectorAll("rect")[1].setAttribute("fill",flip>0?"#e53935":"#1e88e5");mag.querySelectorAll("rect")[2].setAttribute("fill",flip>0?"#1e88e5":"#e53935");upd();},"g"));if(tested.size===2)A.step(2);}}}
  S.drag(mag,{free:true,move:upd,targets:()=>[]});
 }});

/* ---------- 4) نموذج استخدامات العناصر الممثّلة ---------- */
BX.reg("c9-1-2-0",{cols:[["e","العنصر"],["u","استخدامه"]],room:{table:false,wall1:"#fdf6ec",wall2:"#f3e5d0"},
 conclude:"تتشابه عناصر المجموعة الواحدة في خصائصها لتشابه تركيبها الإلكتروني الخارجي، ولكل عنصر استخدامات مرتبطة بخصائصه.",
 ans:["لها العدد نفسه من إلكترونات التكافؤ (في المستوى الخارجي)، لذا تتشابه في خصائصها الكيميائية.","لأنها خاملة كيميائيًّا (مستوى طاقتها الخارجي ممتلئ) فلا تتفاعل مع فتيل المصباح، وتُصدر ألوانًا مميّزة عند مرور التيار فيها."],
 build(S,A){const G=[1,2,13,14,15,16,17,18];const EL={1:["H","Li","Na","K"],2:[null,"Be","Mg","Ca"],13:[null,"B","Al",null],14:[null,"C","Si",null],15:[null,"N","P",null],16:[null,"O","S",null],17:[null,"F","Cl",null],18:["He","Ne","Ar",null]};
  const GC={1:"#ef9a9a",2:"#ffcc80",13:"#fff59d",14:"#c5e1a5",15:"#80deea",16:"#90caf9",17:"#ce93d8",18:"#f48fb1"};
  const cw=74,ch=60,x0=110,y0=40;const cells={};const board=S.g();S.rect(x0-14,y0-16,cw*8+28,ch*4+40,{rx:12,fill:"#fff",stroke:"#8d6e63","stroke-width":3},board);board.style.opacity=.15;
  A.say("ارسمي الجدول الدوري للعناصر الممثّلة: اضغطي على اللوح.");S.tap(board,async()=>{if(board.ok)return;board.ok=1;board.style.opacity=1;
    for(let gi=0;gi<8;gi++){const g=G[gi];const hd=S.g();S.text(x0+gi*cw+cw/2,y0-2,String(g),{"font-size":12,fill:"#5d4037"},hd);hd.gi=g;
      for(let p=0;p<4;p++){const s=EL[g][p];if(!s)continue;const c=S.g();S.tr(c,x0+gi*cw,y0+6+p*ch);c.bg=S.rect(2,2,cw-4,ch-4,{rx:6,fill:"#fafafa",stroke:"#bcaaa4","stroke-width":1.5},c);S.text(cw/2,24,s,{"font-size":18},c);c.g=g;c.s=s;cells[s]=c;await sleep(30);}
      S.tap(hd,()=>colorG(g));}
    A.step(0);uses();});
  const U2=[["H","🚀","وقود الصواريخ"],["He","🎈","ملء المناطيد والبالونات"],["Li","🔋","البطاريات"],["Na","🧂","ملح الطعام"],["Mg","🎆","الألعاب النارية"],["Al","🥫","العلب ورقائق التغليف"],["C","✏️","أقلام الرصاص"],["Si","💻","الشرائح الإلكترونية"],["N","🌱","صناعة الأسمدة"],["O","🫁","أسطوانات التنفّس"],["F","🪥","معجون الأسنان"],["Cl","🏊","تعقيم مياه المسابح"],["Ne","💡","اللافتات المضيئة"],["Ca","🦴","الإسمنت وبناء العظام"]];
  function uses(){A.say("ابحثي عن استخدام كل عنصر: اسحبي كل بطاقة إلى عنصرها.");let n=0;const pal=S.g();
    U2.forEach(([s,e,t],i)=>{const g=S.g(pal);S.tr(g,60+(i%7)*112,345+Math.floor(i/7)*78);S.rect(-50,-30,100,56,{rx:10,fill:"#fff",stroke:"#B8902A","stroke-width":2},g);S.emo(0,-10,e,24,g);S.text(0,20,t,{"font-size":10},g);
      S.drag(g,{back:true,targets:()=>Object.values(cells).map(c=>({g:c,pad:4,fn:async()=>{if(c.s!==s){A.toast("ليس هذا العنصر… فكّري في خصائص "+c.s);return false;}g._off=true;await S.moveTo(g,c._x+cw/2,c._y+ch/2+6,300);S.tr(g,c._x+cw/2,c._y+ch/2+8,0,.5);c.append(g);S.tr(g,cw/2,ch/2+12,0,.42);A.rec({e:s,u:e+" "+t});if(++n===U2.length){A.step(1);A.say("لوّني كل مجموعة بلون مختلف: اضغطي على رقم كل مجموعة أعلى الجدول.");}return "stay";}}))});});}
  const colored=new Set();function colorG(g){if(!A.is(1)){A.toast("ضعي الاستخدامات أولًا");return;}Object.values(cells).filter(c=>c.g===g).forEach(c=>c.bg.setAttribute("fill",GC[g]));colored.add(g);if(colored.size===8){A.obs("اكتمل نموذج الجدول الدوري للعناصر الممثّلة، ولكل مجموعة لون مختلف.");A.step(2);}}
 }});

/* ---------- 5) الخصائص الحمضية والقاعدية لبعض المواد ---------- */
const HOUSE=[["عصير ليمون","#fff59d",2],["خلّ","#fffde7",3],["لبن","#fafafa",4],["عصير بندورة","#e53935",4],["سائل جلي","#a5d6a7",7],["ماء مقطّر","#e3f2fd",7],["منظّف زجاج","#4fc3f7",10],["مسحوق غسيل","#e1f5fe",11]];
BX.reg("c9-2-1-0",{cols:[["s","المادة"],["c","لون ورقة الكاشف"],["ph","pH التقريبي"],["k","التصنيف"]],chart:{x:"s",y:"ph",type:"bar",xl:"المادة",yl:"pH",min:0,max:14},
 conclude:"المواد التي pH لها أقل من 7 حمضية، وأكبر من 7 قاعدية، و7 متعادلة؛ والكاشف العام يحدّد pH التقريبي من لونه.",
 ans:["حمضية: عصير الليمون، الخلّ، اللبن، عصير البندورة. متعادلة: الماء المقطّر وسائل الجلي (تقريبًا). قاعدية: منظّف الزجاج، مسحوق الغسيل.","عصير الليمون (أقل قيمة pH ≈ 2)."],
 build(S,A){const wg=HOUSE.map((h,i)=>{const g=S.g();S.tr(g,70+i*94,330);S.ell(0,0,38,11,{fill:"#e1f5fe",stroke:"#81d4fa","stroke-width":2,opacity:.9},g);g.l=S.ell(0,-1,0,0,{fill:h[1],opacity:.9},g);S.text(0,30,h[0],{"font-size":11},g);g.h=h;return g;});
  A.say("ضعي قليلًا من كل مادة في زجاجة الساعة الخاصة بها: اسحبي كل زجاجة إلى زجاجة ساعتها.");let n=0;
  HOUSE.forEach((h,i)=>{const b=S.bottle(70+i*94,470,h[1],"");S.tr(b,70+i*94,475,0,.62);
    S.drag(b,{back:true,oy:-40,targets:()=>[{g:wg[i],pad:8,fn:async()=>{await S.pour(b,wg[i]._x+30,250,-70,()=>S.tween(500,t=>{wg[i].l.setAttribute("rx",30*t);wg[i].l.setAttribute("ry",7*t);}));S.off(b,true);if(++n===8){A.step(0);dip();}}}],miss:()=>A.toast("كل مادة في زجاجة الساعة التي تحمل اسمها")});});
  function dip(){A.say("اغمسي ورقة الكاشف العام في كل مادة: اسحبي الورقة إلى كل زجاجة ساعة.");const pp=paper(S,760,470);let k=0;
    S.drag(pp,{back:true,oy:-50,targets:()=>wg.filter(w=>!w.d).map(w=>({g:w,pad:6,fn:async()=>{w.d=1;await S.moveTo(pp,w._x,w._y+20,250);const c=uiCol(w.h[2]);await S.tween(500,t=>pp.tip.setAttribute("fill",mix("#fff59d",c,t)));
      const st=S.rect(w._x-6,w._y-70,12,34,{rx:2,fill:c,stroke:"#999"});w.c=c;pp.tip.setAttribute("fill","#fff59d");if(++k===8){A.step(1);match();}}}))});}
  function match(){A.say("قارني لون كل ورقة بالمقياس: اضغطي على زجاجة الساعة ثم على اللون المطابق في المقياس.");let sel=null,m=0;const mk=S.circ(0,0,46,{fill:"none",stroke:"#7A1F2E","stroke-width":4,"stroke-dasharray":"6 4"});mk.style.display="none";
    wg.forEach(w=>S.tap(w,()=>{if(w.ok)return;sel=w;mk.style.display="";mk.setAttribute("cx",w._x);mk.setAttribute("cy",w._y-20);}));
    const ch=chartUI(S,170,120,450,ph=>{if(!sel){A.toast("اختاري زجاجة ساعة أولًا");return;}if(Math.abs(ph-sel.h[2])>1){A.toast("قارني اللون جيدًا بالمقياس…");return;}sel.ok=1;mk.style.display="none";const k=sel.h[2]<7?"حمضية":sel.h[2]>7?"قاعدية":"متعادلة";A.rec({s:sel.h[0],c:"■",ph:sel.h[2],k});
      const tr=document.querySelector("table.dt tbody tr:last-child td:nth-child(2)");if(tr)tr.innerHTML='<span style="display:inline-block;width:40px;height:16px;border-radius:4px;background:'+uiCol(sel.h[2])+'"></span>';S.label(sel._x,sel._y-90,"pH "+sel.h[2],null,"#7A1F2E");sel=null;if(++m===8)A.step(2);});}
 }});

/* ---------- 6) قوّة الحموض والقواعد ---------- */
const SOL=[["HCl","حمض قوي",0,1],["CH₃COOH","حمض ضعيف",2.4,.25],["NaOH","قاعدة قوية",14,1],["NH₃","قاعدة ضعيفة",11.6,.25]];
BX.reg("c9-2-1-1",{cols:[["s","المحلول (1M)"],["b","شدّة إضاءة المصباح"],["ph","pH"],["k","القوّة"]],
 conclude:"الحموض والقواعد القوية تتأيّن كليًّا في الماء فتوصل التيار بدرجة كبيرة (إضاءة شديدة)، والضعيفة تتأيّن جزئيًّا فتكون إضاءتها خافتة.",
 ans:["حمض الهيدروكلوريك HCl؛ لأنه حمض قوي يتأيّن كليًّا فيُنتج عددًا أكبر من الأيونات الموصلة للتيار.","الحموض من الأقوى: HCl ثم CH₃COOH. القواعد من الأقوى: NaOH ثم NH₃."],
 build(S,A){const bk=SOL.map((s,i)=>{const b=S.beaker(130+i*150,392,100,110,{lvl:.6,col:["#fff9c4","#fffde7","#e1f5fe","#e8f5e9"][i],label:s[0]});b.s=s;return b;});
  const bat=S.battery(200,90),bulb=S.bulb(420,110);const hold=S.g();S.tr(hold,680,300);S.rect(-40,-12,80,12,{rx:3,fill:"#8d6e63"},hold);S.rect(-26,0,10,90,{fill:"#424242"},hold);S.rect(16,0,10,90,{fill:"#424242"},hold);S.text(0,-20,"القطبان",{"font-size":12},hold);
  let c=0;A.say("ركّبي الدارة: اضغطي على البطارية، ثم المصباح، ثم القطبين.");const parts=[bat,bulb.g,hold];const W=S.g();
  parts.forEach((p,i)=>S.tap(p,()=>{if(i!==c){A.toast("اتّبعي الترتيب: البطارية ← المصباح ← القطبان");return;}c++;if(c===2)S.wire([[246,90],[400,90],[400,110]],"#c62828",W);if(c===3){S.wire([[440,110],[600,110],[600,250],[700,250],[700,288]],"#c62828",W);S.wire([[154,90],[110,90],[110,40],[640,40],[640,220],[660,220],[660,288]],"#1565c0",W);A.step(0);A.say("اغمسي القطبين في كل محلول: اسحبي القطبين إلى كل كأس، ولاحظي شدّة الإضاءة.");go();}}));
  function go(){let n=0;S.drag(hold,{back:true,oy:40,move:()=>{},targets:()=>bk.map(b=>({g:b.g,pad:6,fn:async()=>{await S.moveTo(hold,b.g._x,b.g._y-100,300);const k=b.s[3];bulb.on(k);
      if(!b.d){b.d=1;b.row={s:b.s[0],b:k>.5?"💡 شديدة":"🔅 خافتة",ph:"—",k:b.s[1]};A.toast(k>.5?"إضاءة شديدة!":"إضاءة خافتة");if(++n===4){A.step(1);meter();}}await sleep(900);bulb.on(0);}}))});}
  function meter(){A.say("قيسي pH لكل محلول: اسحبي مقياس pH إلى كل كأس.");const m=S.g();S.tr(m,740,470);S.rect(-30,-70,60,70,{rx:8,fill:"#37474f"},m);const sc=S.screen(0,-44,50,"--",{par:m});sc.g.setAttribute("transform","translate(0 -44) scale(.55)");S.rect(-3,0,6,40,{fill:"#90a4ae"},m);S.text(0,-80,"مقياس pH",{"font-size":12},m);let n=0;
    S.drag(m,{back:true,oy:-30,targets:()=>bk.map(b=>({g:b.g,pad:6,fn:async()=>{await S.moveTo(m,b.g._x,b.g._y-80,300);sc.set(b.s[2].toFixed(1));if(!b.m){b.m=1;b.row.ph=b.s[2];A.rec(b.row);if(++n===4){A.obs("أضاء المصباح بشدّة في HCl وNaOH، وبخفوت في CH₃COOH وNH₃.");A.step(2);}}await sleep(900);}}))});}
 }});

/* ---------- 7) تفاعل تعادل حمض وقاعدة ---------- */
BX.reg("c9-2-2-0",{cols:[["v","حجم NaOH المضاف (mL)"],["t","درجة الحرارة (°C)"],["ph","pH"]],chart:{x:"v",y:"t",xl:"حجم NaOH المضاف (mL)",yl:"درجة الحرارة (°C)"},
 conclude:"تفاعل التعادل طارد للحرارة؛ ترتفع درجة الحرارة حتى نقطة التعادل (pH = 7)، وينتج ملح وماء: HCl + NaOH → NaCl + H₂O.",
 ans:["ارتفعت درجة الحرارة تدريجيًّا حتى نقطة التعادل؛ لأن التفاعل طارد للحرارة، ثم انخفضت قليلًا عند إضافة قاعدة زائدة.","ملح كلوريد الصوديوم NaCl.  HCl + NaOH → NaCl + H₂O"],
 build(S,A){const acid=S.bottle(70,470,"#fff9c4","HCl 1M");const base=S.bottle(160,470,"#e1f5fe","NaOH 1M");const cyl=S.cylinder(270,470,120,{w:36,col:"#fff9c4",lvl:0,label:"مخبار"});
  const bk=S.beaker(470,392,140,120,{lvl:0,label:"كأس 100 mL"});const th=S.g();S.tr(th,700,470);const T=S.thermo(0,-10,120,{min:10,max:40,val:22,par:th});th.setAttribute("transform","translate(700 470) scale(.75)");th._s=.75;
  const lab=S.label(300,300,"",null,"#7A1F2E");lab.style.display="none";let V=0,temp=22;
  A.say("قيسي 20 mL من الحمض بالمخبار وضعيها في الكأس، ثم قيسي درجة حرارته.");let st=0;
  S.drag(acid,{back:true,oy:-50,targets:()=>st===0?[{g:cyl.g,fn:async()=>{await S.pour(acid,320,270,-75,()=>cyl.to(.33,700));st=1;}}]:[]});
  S.drag(cyl.g,{back:true,oy:-60,targets:()=>st===1?[{g:bk.g,fn:async()=>{await S.pour(cyl.g,580,220,-80,()=>Promise.all([cyl.to(0,700),bk.to(.22,700,"#fff9c4")]));st=2;
    A.say("أضيفي قطرات الكاشف العام إلى الحمض، ثم ضعي مقياس الحرارة في الكأس.");}}]:[]});
  const ind=S.dropper(600,470,"#43a047",{label:"الكاشف العام",bulb:"#2e7d32"});
  S.drag(ind,{back:true,oy:10,targets:()=>st===2?[{g:bk.g,fn:async()=>{bk.set(null,uiCol(0));st=3;}}]:[]});
  S.drag(th,{oy:-60,targets:()=>st===3?[{g:bk.g,fn:async()=>{await S.moveTo(th,520,350,300);th._off=true;st=4;lab.style.display="";lab.set("T = 22 °C · pH ≈ 0");A.rec({v:0,t:22,ph:0.0});A.step(0);addB();return "stay";}}]:[],back:true});
  function addB(){A.say("أضيفي القاعدة تدريجيًّا مع التحريك، وراقبي درجة الحرارة ولون الكاشف.");const b=A.ui.btn("➕ أضيفي 5 mL من NaOH وحرّكي",async()=>{if(V>=30)return;b.disabled=true;V+=5;
      await S.pour(base,560,230,-75,()=>bk.to(bk.lvl+.055,500));const ex=(20-V)/(20+V);const ph=V<20?-Math.log10(ex):V===20?7:14+Math.log10((V-20)/(20+V));
      const tt=V<=20?22+6.8*V/20:28.8-(V-20)*.12;await S.tween(600,t=>{T.set(lerp(temp,tt,t));});temp=tt;bk.set(null,uiCol(ph));lab.set("T = "+tt.toFixed(1)+" °C · pH ≈ "+ph.toFixed(1));
      A.rec({v:V,t:+tt.toFixed(1),ph:+ph.toFixed(1)});if(V===20)A.toast("نقطة التعادل: pH = 7 وأعلى درجة حرارة");if(V<30)b.disabled=false;else{A.step(1);evap();}},"gold");A.ui.add(b);}
  function evap(){th.style.display="none";lab.style.display="none";A.say("بخّري كمية من المحلول الناتج في الجفنة: اسحبي الكأس إلى الجفنة فوق اللهب.");const bur=S.burner(130,392,{on:true});const dish=S.g();S.tr(dish,130,206);S.path("M-50 0 Q0 40 50 0Z",{fill:"#eceff1",stroke:"#90a4ae","stroke-width":3},dish);const liq=S.path("M-40 4 Q0 30 40 4Z",{fill:"#e1f5fe",opacity:0},dish);
    S.drag(bk.g,{back:true,oy:-60,targets:()=>[{g:dish,pad:20,fn:async()=>{await S.pour(bk.g,230,150,-70,async()=>{liq.setAttribute("opacity",.9);await sleep(400);});const stm=S.bubbles(130,190,60,10,{h:60,col:"#eceff1"});
      await S.tween(2500,t=>liq.setAttribute("opacity",.9*(1-t)));stm.remove();for(let i=0;i<26;i++)S.rect(130+R(-34,34),206+R(2,14),4,4,{fill:"#fff",stroke:"#cfd8dc",transform:"rotate(45 "+(130)+" 210)"});
      A.obs("بعد تبخير الماء بقيت بلّورات بيضاء من ملح كلوريد الصوديوم NaCl.");A.step(2);}}]});}
 }});

/* ---------- 8) قياس pH لمحاليل بعض الأملاح ---------- */
const SALT=[["NH₄Cl",5,"حمضي","حمض قوي (HCl) + قاعدة ضعيفة (NH₃)"],["NaCl",7,"متعادل","حمض قوي (HCl) + قاعدة قوية (NaOH)"],["CH₃COONa",9,"قاعدي","حمض ضعيف (CH₃COOH) + قاعدة قوية (NaOH)"]];
BX.reg("c9-2-2-1",{cols:[["s","الملح (0.1M)"],["ph","pH"],["k","نوع المحلول"],["o","الحمض والقاعدة المكوّنان"]],
 conclude:"محلول الملح المكوّن من حمض قوي وقاعدة ضعيفة حمضي، ومن حمض ضعيف وقاعدة قوية قاعدي، ومن حمض قوي وقاعدة قوية متعادل.",
 ans:["كلوريد الأمونيوم NH₄Cl.","يكون المحلول بخصائص الطرف الأقوى: حمض قوي + قاعدة ضعيفة ← حمضي، حمض ضعيف + قاعدة قوية ← قاعدي، كلاهما قوي ← متعادل."],
 build(S,A){const bk=SALT.map((s,i)=>{const b=S.beaker(200+i*200,392,110,110,{lvl:0,label:s[0]});b.s=s;return b;});let n=0;
  A.say("ضعي 20 mL من كل محلول في كأسه: اسحبي كل زجاجة إلى الكأس التي تحمل اسمها.");
  SALT.forEach((s,i)=>{const b=S.bottle(80+i*0,470,"#f5f5f5",s[0]);S.tr(b,520+i*90,475,0,.8);S.drag(b,{back:true,oy:-40,targets:()=>[{g:bk[i].g,fn:async()=>{await S.pour(b,bk[i].g._x+60,230,-75,()=>bk[i].to(.35,600,"#f1f8e9"));S.off(b,true);if(++n===3){A.step(0);dip();}}}],miss:()=>A.toast("كل محلول في الكأس التي تحمل اسمه")});});
  function dip(){A.say("اغمسي ورقة الكاشف في كل محلول، ثم اختاري اللون المطابق من المقياس.");const pp=paper(S,90,470);let sel=null,k=0;
    const ch=chartUI(S,170,90,450,ph=>{if(!sel){A.toast("اغمسي الورقة في محلول أولًا");return;}if(ph!==sel.s[1]){A.toast("قارني اللون جيّدًا…");return;}sel.ph=ph;A.toast("pH = "+ph);S.label(sel.g._x,sel.g._y-150,"pH "+ph,null,"#7A1F2E");sel=null;if(bk.every(b=>b.ph!=null)){A.step(1);classify();}});
    S.drag(pp,{back:true,oy:-50,targets:()=>bk.filter(b=>b.ph==null).map(b=>({g:b.g,fn:async()=>{await S.moveTo(pp,b.g._x,b.g._y-20,250);const c=uiCol(b.s[1]);await S.tween(500,t=>pp.tip.setAttribute("fill",mix("#fff59d",c,t)));S.rect(b.g._x+40,b.g._y-150,12,34,{rx:2,fill:c,stroke:"#999"});sel=b;pp.tip.setAttribute("fill","#fff59d");A.say("اختاري من المقياس اللون المطابق لورقة "+b.s[0]+".");}}))});}
  function classify(){let i=0;const ask=()=>{A.ui.clear();if(i>=3){A.step(2);return;}const s=SALT[i];A.say("صنّفي محلول "+s[0]+" (pH = "+s[1]+"):");A.ui.choice(s[0]+":",[["حمضي","حمضي"],["متعادل","متعادل"],["قاعدي","قاعدي"]],v=>{if(v!==s[2]){A.toast("راجعي قيمة pH");return;}A.rec({s:s[0],ph:s[1],k:s[2],o:s[3]});i++;ask();});};ask();}
 }});
})();
