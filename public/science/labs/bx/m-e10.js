/* تجارب علوم الأرض والبيئة — الصف العاشر (كتاب الأنشطة) — مطابقة لخطوات الكتاب */
(function(){const {sleep,lerp,clamp,mix,quiz}=BX;const R=(a,b)=>a+Math.random()*(b-a);
const nextBtn=(A,t,fn,cls)=>{A.ui.clear();A.ui.add(A.ui.btn(t,b=>{b.disabled=true;fn(b);},cls||"gold"));};
const lcg=s=>()=>((s=(s*1103515245+12345)&0x7fffffff)/0x7fffffff);

/* ---------- رسم الصخور وأنماطها ---------- */
function pat(S,g,r,Rd,seed,thin){const rnd=lcg(seed||7);const inC=(k)=>{let x,y;do{x=rnd()*2-1;y=rnd()*2-1;}while(x*x+y*y>(k||.78));return [x*Rd,y*Rd];};
  const cs=thin?(r.th||["#4fc3f7","#ffb74d","#ba68c8","#81c784","#fff176","#e57373"]):r.cs;const pc=()=>cs[Math.floor(rnd()*cs.length)];
  const poly=(x,y,s,f,o)=>{const n=5+Math.floor(rnd()*3);S.path(Array.from({length:n},(_,k)=>{const a=k/n*Math.PI*2+rnd(),rr=s*(.6+rnd()*.5);return (k?"L":"M")+(x+Math.cos(a)*rr).toFixed(1)+" "+(y+Math.sin(a)*rr).toFixed(1);}).join("")+"Z",{fill:f,opacity:o||.95,stroke:"rgba(0,0,0,.15)","stroke-width":.6},g);};
  switch(r.p){
   case "coarse":for(let i=0;i<46;i++){const [x,y]=inC();poly(x,y,Rd*.16,pc());}break;
   case "porph":for(let i=0;i<70;i++){const [x,y]=inC();S.circ(x,y,Rd*.025,{fill:pc(),opacity:.8},g);}for(let i=0;i<8;i++){const [x,y]=inC(.6);poly(x,y,Rd*.09,cs[1]);}break;
   case "fine":for(let i=0;i<90;i++){const [x,y]=inC();S.circ(x,y,Rd*.022,{fill:pc(),opacity:.7},g);}if(r.ves)for(let i=0;i<6;i++){const [x,y]=inC(.6);S.ell(x,y,Rd*.06,Rd*.04,{fill:"#111",opacity:.6},g);}break;
   case "sand":for(let i=0;i<80;i++){const [x,y]=inC();S.circ(x,y,Rd*.06,{fill:pc(),stroke:"rgba(0,0,0,.12)"},g);}for(let k=-2;k<=2;k++)S.line(-Rd*.85,k*Rd*.3,Rd*.85,k*Rd*.3+4,{stroke:"rgba(120,80,40,.25)","stroke-width":2},g);break;
   case "fossil":for(let i=0;i<40;i++){const [x,y]=inC();S.circ(x,y,Rd*.02,{fill:pc()},g);}for(let i=0;i<6;i++){const [x,y]=inC(.55);const s=Rd*(.1+rnd()*.06);S.path(`M${x} ${y} m${-s} 0 a${s} ${s} 0 1 1 ${2*s} 0 a${s*.7} ${s*.7} 0 1 1 ${-1.4*s} 0 a${s*.4} ${s*.4} 0 1 1 ${.8*s} 0`,{fill:"none",stroke:"#8d6e63","stroke-width":2},g);}for(let i=0;i<3;i++){const [x,y]=inC(.5);S.path(`M${x-12} ${y} q12 -14 24 0 M${x-8} ${y} l2 -8 M${x} ${y} l0 -10 M${x+8} ${y} l-2 -8`,{fill:"none",stroke:"#a1887f","stroke-width":2},g);}break;
   case "chalk":for(let i=0;i<25;i++){const [x,y]=inC();S.circ(x,y,Rd*.012,{fill:pc()},g);}for(let i=0;i<8;i++){const [x,y]=inC(.6);S.circ(x,y,Rd*.03,{fill:"none",stroke:"#bcaaa4"},g);}break;
   case "band":for(let k=-6;k<=6;k++){const y=k*Rd*.14;S.path(`M${-Rd*.9} ${y} Q${-Rd*.3} ${y-10} 0 ${y+4} T ${Rd*.9} ${y-2}`,{fill:"none",stroke:k%2?cs[0]:cs[2],"stroke-width":Rd*.1,opacity:.9},g);}for(let i=0;i<20;i++){const [x,y]=inC();poly(x,y,Rd*.05,cs[1]);}break;
   case "foli":for(let i=0;i<55;i++){const [x,y]=inC();S.line(x-Rd*.08,y-2,x+Rd*.08,y+2,{stroke:pc(),"stroke-width":Rd*.035,"stroke-linecap":"round"},g);}break;
   case "marble":for(let i=0;i<42;i++){const [x,y]=inC();poly(x,y,Rd*.14,pc(),.85);}S.path(`M${-Rd*.8} ${-Rd*.2} Q 0 ${Rd*.2} ${Rd*.7} ${-Rd*.4}`,{fill:"none",stroke:"#90a4ae","stroke-width":2.5,opacity:.7},g);break;
   case "sugar":for(let i=0;i<55;i++){const [x,y]=inC();poly(x,y,Rd*.09,pc(),.8);}break;
   case "evap":for(let i=0;i<14;i++){const [x,y]=inC(.6);const s=Rd*(.14+rnd()*.12);S.rect(x-s/2,y-s/2,s,s,{fill:pc(),opacity:.65,stroke:"#fff","stroke-width":1.5},g);}break;
   case "gyps":for(let i=0;i<26;i++){const [x,y]=inC(.6);const a=rnd()*.6-.3;S.line(x-Rd*.25,y-Rd*.25*a,x+Rd*.25,y+Rd*.25*a,{stroke:pc(),"stroke-width":Rd*.05,"stroke-linecap":"round",opacity:.85},g);}break;}
}
function rock(S,par,r,Rd,seed){const g=S.g(par);const rnd=lcg(seed*31+5);const pts=Array.from({length:9},(_,k)=>{const a=k/9*Math.PI*2,rr=Rd*(.88+rnd()*.22);return (k?"L":"M")+(Math.cos(a)*rr).toFixed(1)+" "+(Math.sin(a)*rr*.82).toFixed(1);}).join("")+"Z";
  S.path(pts,{fill:r.c,stroke:"#4e342e","stroke-width":2},g);const inner=S.g(g);inner.setAttribute("transform","scale(1 .8)");pat(S,inner,r,Rd*.85,seed);return g;}

/* ---------- مختبر فحص الصخور (عدسة، حمض، قساوة) ---------- */
function rockLab(S,A,o){const rocks=o.rocks,N=rocks.length,sp=Math.min(110,700/N),x0=400-sp*(N-1)/2,RD=N>6?26:32;const st=rocks.map(()=>({}));const rows=rocks.map(()=>null);
  S.rect(20,40,760,90,{rx:14,fill:"#efebe9",stroke:"#bcaaa4"});const G=rocks.map((r,i)=>{const g=rock(S,null,r,RD,i+3);S.tr(g,x0+i*sp,86);g.i=i;g.r=r;g.tag=S.label(0,RD+6,o.numbered?String(i+1):"؟",g,"#5d4037");g.tag.style.display=o.numbered?"":"none";g.ic=S.text(0,-RD-4,"",{"font-size":11},g);return g;});
  const lensV=S.g();S.tr(lensV,400,250);lensV.style.display="none";const lensCap=S.label(400,345,"",null,"#37474f");lensCap.style.display="none";
  const T={};const tl=(id,x,lab,draw)=>{const g=S.g();S.tr(g,x,420);draw(g);S.text(0,40,lab,{"font-size":12,fill:"#4e342e"},g);T[id]=g;return g;};
  if(o.tools.includes("lens"))tl("lens",140,"عدسة مكبّرة",g=>{S.circ(0,-8,22,{fill:"rgba(200,230,255,.45)",stroke:"#5d4037","stroke-width":5},g);S.line(15,8,30,24,{stroke:"#5d4037","stroke-width":7,"stroke-linecap":"round"},g);});
  if(o.tools.includes("hcl"))tl("hcl",260,"قطّارة HCl مخفّف",g=>{S.rect(-6,-40,12,44,{rx:3,fill:"#fff8e1",stroke:"#8d6e63","stroke-width":2},g);S.rect(-8,-56,16,18,{rx:5,fill:"#e53935"},g);S.path("M-3 4 L0 16 L3 4Z",{fill:"#8d6e63"},g);});
  if(o.tools.includes("hard"))tl("hard",560,"أداة القساوة (مسمار)",g=>{S.rect(-4,-30,8,46,{fill:S.lg(["#cfd8dc","#78909c"]),rx:2},g);S.rect(-12,-34,24,6,{fill:"#607d8b",rx:2},g);S.path("M-4 16 L0 28 L4 16Z",{fill:"#78909c"},g);});
  if(o.tools.includes("ham"))tl("ham",660,"مطرقة",g=>{S.rect(-3,-10,6,40,{fill:"#8d6e63",rx:2},g);S.rect(-18,-22,36,14,{fill:"#546e7a",rx:3},g);});
  const showLens=(g,thin)=>{lensV.innerHTML="";lensV.style.display="";S.circ(0,0,92,{fill:"#263238"},lensV);S.circ(0,0,86,{fill:thin?"#111":g.r.c},lensV);const ins=S.g(lensV);const tsi=thin&&TSIMG[g.r.n];if(tsi){ins.setAttribute("clip-path",S.clip(S.mk("circle",{r:86})));S.mk("image",{href:"../img/ts-"+tsi+".jpg",x:-130,y:-86,width:260,height:172,preserveAspectRatio:"xMidYMid slice"},ins);}else pat(S,ins,g.r,80,g.i+3,thin);S.circ(0,0,86,{fill:"none",stroke:"#B8902A","stroke-width":5},lensV);};
  let hold=null;const ok=(g,id)=>{st[g.i][id]=1;g.ic.textContent=Object.keys(st[g.i]).map(k=>({lens:"🔍",hcl:"💧",hard:"🔩",ham:"🔨"})[k]).join("");upd(g);};
  const tgts=id=>()=>o.ready()?G.map(g=>({g,pad:8,fn:async()=>{await use(id,g);return false;}})):[];
  async function use(id,g){const r=g.r;if(id==="lens"){showLens(g);lensCap.style.display="";lensCap.set((o.numbered?"العيّنة "+(g.i+1):r.n)+": "+r.col+" • "+r.tex);A.toast("🔍 "+r.col+"؛ النسيج: "+r.tex+(r.fos?"؛ تظهر بقايا كائنات حيّة (أحافير)":"")+(r.lay?"؛ تظهر طبقات رقيقة":""));}
    else if(id==="hcl"){const d=S.circ(g._x,g._y-10,5,{fill:"#ffe082"});await S.tween(300,e=>d.setAttribute("cy",g._y-10+e*8));d.remove();if(r.hcl){const n=r.hcl===2?40:10;S.bubbles(g._x,g._y-4,RD,n,{h:r.hcl===2?60:25});}A.toast(r.hcl===2?"💧 فوران شديد: يتفاعل كثيرًا مع الحمض (يحوي كربونات الكالسيوم)":r.hcl===1?"💧 فوران ضعيف بطيء: يتفاعل قليلًا":"💧 لا يحدث فوران: لا يتفاعل مع الحمض");}
    else if(id==="hard"){const sc=S.line(g._x-12,g._y+6,g._x-12,g._y+6,{stroke:r.H<5.5?"#fff":"#bbb","stroke-width":3});await S.tween(400,e=>sc.setAttribute("x2",g._x-12+e*24));if(r.H>=5.5)sc.remove();A.toast("🔩 "+r.hard);}
    else if(id==="ham"){A.toast("🔨 كسرتِ العيّنة: سطح جديد نظيف يُظهر اللون الحقيقي");}
    ok(g,id);}
  Object.keys(T).forEach(id=>S.drag(T[id],{back:true,targets:tgts(id)}));
  function upd(g){const i=g.i;rows[i]=o.row(g.r,st[i],i);A.setRows(rows.filter(Boolean));
    for(const id in o.stepOf){const s=o.stepOf[id];if(!A.is(s)&&o.steps(s).every(t=>G.every(x=>st[x.i][t])))A.step(s);}
    const all=G.every(x=>o.tools.filter(t=>t!=="ham").every(t=>st[x.i][t]));if(all&&!hold){hold=1;Object.values(T).forEach(t=>S.off(t,true));o.after&&o.after(G,rows);}
    else if(!all)A.say("أحسنتِ! "+(o.numbered?"العيّنة "+(i+1):g.r.n)+": "+o.tools.filter(t=>t!=="ham"&&!st[i][t]).map(t=>({lens:"العدسة",hcl:"الحمض",hard:"أداة القساوة"})[t]).join("، ")+(o.tools.some(t=>t!=="ham"&&!st[i][t])?" لم تُستخدم بعد عليها.":" اكتملت. انتقلي إلى عيّنة أخرى."));}
  return {G,rows,st,showLens,refresh:()=>A.setRows(rows.filter(Boolean))};}

/* ---------- 1) تصنيف الصخور (استهلالية) ---------- */
const TSIMG={"غرانيت":"granite","بازلت":"basalt","رخام":"marble","صخر رملي":"sand","صخر جيري أحفوري":"fossil","الصخر الجيري":"fossil","صخر جيري":"fossil","نايس":"gneiss"};
const RK1=[{n:"غرانيت",c:"#d7c4bd",cs:["#f8bbd0","#fafafa","#212121","#bcaaa4"],p:"coarse",touch:"خشن",gr:"كبير",hcl:0,fos:0,lay:0,col:"فاتح مرقّط (وردي وأبيض وأسود)",tex:"بلّورات كبيرة متداخلة",hard:"قاسٍ: لا يخدشه المسمار",H:6,type:"ناري",why:"بلّورات معادن متداخلة كبيرة، ولا طبقات ولا أحافير، ولا يتفاعل مع الحمض."},
 {n:"صخر جيري أحفوري",c:"#eadfc6",cs:["#d7ccc8","#bcaaa4","#fff8e1"],p:"fossil",touch:"خشن",gr:"متوسط",hcl:2,fos:1,lay:1,col:"أبيض مصفرّ",tex:"حبيبات وبقايا أصداف",hard:"ليّن: يخدشه المسمار",H:3,type:"رسوبي",why:"يحوي أحافير وطبقات، ويتفاعل بشدّة مع الحمض."},
 {n:"بازلت",c:"#37474f",cs:["#263238","#546e7a","#455a64"],p:"fine",ves:1,touch:"ناعم",gr:"صغير جدًّا",hcl:0,fos:0,lay:0,col:"أسود/رمادي غامق",tex:"بلّورات دقيقة لا تُرى، وفيه فجوات",hard:"قاسٍ: لا يخدشه المسمار",H:6,type:"ناري",why:"بلّورات دقيقة جدًّا وفجوات غازية، ولا طبقات ولا أحافير."},
 {n:"نايس",c:"#9e9e9e",cs:["#eeeeee","#f8bbd0","#212121"],p:"band",touch:"خشن",gr:"كبير",hcl:0,fos:0,lay:0,col:"أشرطة فاتحة وغامقة متناوبة",tex:"معادن مصفوفة في أشرطة (متورّق)",hard:"قاسٍ: لا يخدشه المسمار",H:6,type:"متحوّل",why:"تورّق: أشرطة معادن فاتحة وغامقة متناوبة نتيجة الضغط والحرارة."},
 {n:"صخر رملي",c:"#e3c08d",cs:["#f0d6a8","#d9a866","#c69c6d","#fff3d6"],p:"sand",touch:"خشن",gr:"متوسط (حبيبات رمل)",hcl:0,fos:0,lay:1,col:"أصفر/بنّي فاتح",tex:"حبيبات رمل ملتحمة",hard:"متوسّط: يخدشه المسمار بصعوبة",H:5,type:"رسوبي",why:"حبيبات رمل ملتحمة مرتّبة في طبقات (فتات صخور)."},
 {n:"رخام",c:"#f5f5f5",cs:["#ffffff","#eceff1","#f5f5f5","#e0e0e0"],p:"marble",touch:"ناعم/سكّري",gr:"متوسط",hcl:2,fos:0,lay:0,col:"أبيض مع عروق رمادية",tex:"بلّورات كالسيت متداخلة (سكّري)",hard:"ليّن: يخدشه المسمار",H:3,type:"متحوّل",why:"بلّورات كالسيت متداخلة أُعيد تبلورها بلا أحافير ولا طبقات، ويتفاعل مع الحمض."}];
const TYP=[["ناري","🔥 ناري"],["رسوبي","🏖️ رسوبي"],["متحوّل","🌀 متحوّل"]];
BX.reg("e10-1-1-0",{cols:[["n","رقم العيّنة"],["t","الملمس"],["g","حجم الحبيبات"],["a","التفاعل مع HCl"],["f","أحافير"],["c","اللون"],["l","طبقات رقيقة"],["h","القساوة"],["k","نوع الصخر المقترح"],["w","مسوّغ التصنيف"]],
 conclude:"تُصنَّف الصخور إلى ثلاث مجموعات رئيسة: نارية (بلّورات متداخلة بلا أحافير ولا طبقات)، ورسوبية (حبيبات أو أحافير وطبقات، وكثير منها يتفاعل مع الحمض)، ومتحوّلة (تورّق أو بلّورات معاد تبلورها).",
 ans:["تتشابه في أنها جميعًا مكوّنة من معادن، وتختلف في: اللون، وحجم الحبيبات، ووجود الأحافير والطبقات، والتفاعل مع الحمض، والقساوة.","تتشابه غالبًا في الأساس (الأحافير والطبقات والبلّورات)، وقد تختلف في بعض العيّنات بحسب الخاصية التي اعتمدها كلٌّ منّا.","حجم الحبيبات والنسيج، والطبقات، والأحافير، والتفاعل مع الحمض، واللون، والقساوة، والتورّق."],
 build(S,A){let num=false;A.say("رقّمي العيّنات الصخرية: اضغطي الزرّ.");
  const L=rockLab(S,A,{rocks:RK1,tools:["lens","hcl","hard","ham"],numbered:true,ready:()=>num,stepOf:{lens:1},steps:()=>["lens","hcl","hard"],
   row:(r,s,i)=>({n:i+1,t:s.lens?r.touch:"",g:s.lens?r.gr:"",a:s.hcl?(r.hcl===2?"شديد":r.hcl?"ضعيف":"لا يتفاعل"):"",f:s.lens?(r.fos?"نعم":"لا"):"",c:s.lens?r.col:"",l:s.lens?(r.lay?"نعم":"لا"):"",h:s.hard?r.hard.split(":")[0]:"",k:"",w:""}),
   after:(G,rows)=>{A.say("صنّفي العيّنات بناءً على ملاحظاتك، واذكري المسوّغ.");let k=0;const ask=()=>{if(k>=G.length){A.step(2);A.ui.clear();return;}const g=G[k],r=g.r;S.glow(g,true);L.showLens(g,!!TSIMG[r.n]);if(TSIMG[r.n])A.say("العيّنة "+(k+1)+": هذه شريحتها الرقيقة تحت المجهر المستقطب. لاحظي: بلّورات متداخلة؟ حبيبات؟ أحافير؟ تورّق؟");A.ui.clear();
      A.ui.choice("العيّنة "+(k+1)+": ما نوع الصخر المقترح؟",TYP,v=>{if(v!==r.type){A.toast("راجعي ملاحظاتك: "+r.why.split("،")[0]);return;}S.glow(g,false);rows[k].k=r.type+" ("+r.n+")";rows[k].w=r.why;L.refresh();A.obs("العيّنة "+(k+1)+" ← "+r.type+": "+r.why);k++;ask();});};ask();}});
  L.G.forEach(g=>g.tag.style.display="none");A.ui.add(A.ui.btn("🏷️ رقّمي العيّنات",b=>{b.remove();num=true;L.G.forEach((g,i)=>{g.tag.style.display="";});A.step(0);A.say("تفحّصي كل عيّنة: اسحبي العدسة، وقطّارة الحمض، وأداة القساوة إلى العيّنة (المطرقة لكشف سطح جديد).");},"gold"));
 }});

/* ---------- 3) الصخور الرسوبية الكيميائية ---------- */
const RK3=[{n:"الجبس",c:"#f7f7f2",cs:["#ffffff","#eeeeee","#e0e0e0"],th:["#e0e0e0","#fafafa","#bdbdbd"],p:"gyps",col:"أبيض/عديم اللون",tex:"بلّوري ليفي ناعم",hcl:0,hard:"ليّن جدًّا: يخدشه الظفر",H:2,min:"بلّورات جبس متطاولة كبيرة عديمة اللون إلى رمادية"},
 {n:"الدولوميت",c:"#e6d3bf",cs:["#f1e3d3","#dcc5ad","#e8d6c3"],th:["#ffe0b2","#ffccbc","#fff3e0","#d7ccc8"],p:"sugar",col:"رمادي فاتح/بنّي وردي",tex:"بلّوري سكّري متوسط",hcl:1,hard:"متوسّط القساوة: يخدشه المسمار",H:3.8,min:"بلّورات معينية متوسطة الحجم متشابهة، بألوان باهتة (بيج وبنّي فاتح)"},
 {n:"الصخر الجيري",c:"#ece3cf",cs:["#f5eedd","#e0d4b8","#d8cbb0"],th:["#a1887f","#bcaaa4","#d7ccc8"],p:"chalk",col:"أبيض/رمادي فاتح",tex:"ناعم جدًّا",hcl:2,hard:"ليّن نسبيًّا: يخدشه المسمار",H:3,min:"بلّورات كالسيت دقيقة جدًّا (لا تُرى بالعين المجرّدة) بلون بنّي باهت"},
 {n:"الملح الصخري",c:"#f2e0e0",cs:["#ffffff","#ffebee","#f8bbd0"],th:["#212121","#424242","#303030"],p:"evap",col:"عديم اللون/وردي فاتح",tex:"بلّوري (مكعّبات)",hcl:0,hard:"ليّن: يخدشه المسمار بسهولة",H:2.5,min:"بلّورات هاليت مكعّبة كبيرة متلاصقة، تظهر معتمة تحت الضوء المستقطب المتعامد"}];
BX.reg("e10-1-2-0",{cols:[["n","العيّنة الصخرية"],["c","اللون"],["t","النسيج"],["a","شدّة التفاعل مع HCl"],["m","حجم المعادن وألوانها تحت المجهر"],["h","القساوة"]],
 conclude:"تتكوّن الصخور الرسوبية الكيميائية من ترسّب المعادن من المحاليل المشبعة؛ فنسيجها بلّوري، ولا تُصنَّف بحجم الحبيبات، ونميّزها بالتفاعل مع الحمض (الجيري بشدّة، والدولوميت قليلًا) والقساوة، وأدقّ تصنيف لها بدراسة شرائحها الرقيقة تحت المجهر.",
 ans:["لا؛ لأن نسيجها بلّوري (بلّورات متداخلة ترسّبت من محلول) وليس فتاتًا، وكثير من بلّوراتها دقيقة لا تُرى بالعين المجرّدة.","تفاعل الصخر الجيري بصورة كبيرة، والدولوميت تفاعل قليلًا، أمّا الجبس والملح الصخري فلم يتفاعلا.","الدولوميت أقساها، يليه الصخر الجيري، ثم الملح الصخري، والجبس أليَنها (يخدشه الظفر).","تحت المجهر أدقّ؛ لأنه يُظهر المعادن وحجومها وأشكالها وألوانها بوضوح."],
 build(S,A){A.say("تفحّصي كل عيّنة بالعين المجرّدة والعدسة المكبّرة: اسحبي العدسة إلى العيّنة.");
  const L=rockLab(S,A,{rocks:RK3,tools:["lens","hcl","hard"],numbered:false,ready:()=>true,stepOf:{lens:0,hcl:1,hard:2},steps:s=>[["lens"],["hcl"],["hard"]][s],
   row:(r,s)=>({n:r.n,c:s.lens?r.col:"",t:s.lens?r.tex:"",a:s.hcl?(r.hcl===2?"يتفاعل كثيرًا":r.hcl?"يتفاعل قليلًا":"لا يتفاعل"):"",m:"",h:s.hard?r.hard:""}),
   after:(G,rows)=>{A.say("ابحثي عن صور الشرائح الرقيقة لكل صخر تحت المجهر المستقطب.");nextBtn(A,"🌐 اعرضي صور الشرائح الرقيقة (Thin Sections)",()=>{A.step(3);let k=0;
      const nx=()=>{if(k>=G.length){A.step(4);A.ui.clear();A.obs("المعادن في الصخور الرسوبية الكيميائية بلّورية متداخلة تختلف حجومها من دقيقة جدًّا (الجيري) إلى كبيرة (الملح والجبس).");return;}const g=G[k];L.showLens(g,true);
        A.say("شريحة رقيقة لـ"+g.r.n+" تحت المجهر المستقطب. لاحظي حجوم المعادن وألوانها، ثم دوّنيها.");nextBtn(A,"📝 دوّني ملاحظة "+g.r.n,()=>{rows[k].m=g.r.min;L.refresh();k++;nx();});};nx();});}});
 }});

/* ---------- 4) تعرّف الصخور (إثرائية) ---------- */
const RK4=[{n:"رخام",type:"متحوّل",c:"#f5f5f5",cs:["#ffffff","#eceff1","#e0e0e0"],p:"marble",col:"أبيض",tex:"بلّوري سكّري، غير متورّق",fos:0,hcl:2,o:"قاسٍ نسبيًّا، عروق رمادية",H:3},
 {n:"بازلت",type:"ناري",c:"#37474f",cs:["#263238","#546e7a"],p:"fine",ves:1,col:"غامق، أسود مائل إلى الرمادي",tex:"ناعم الحبيبات (غير مرئي البلّورات)",fos:0,hcl:0,o:"قاسٍ، صعب الكسر، قد يكون فقاعيًّا",H:6},
 {n:"صخر جيري",type:"رسوبي",c:"#eadfc6",cs:["#d7ccc8","#bcaaa4","#fff8e1"],p:"fossil",col:"أبيض مصفرّ",tex:"حبيبي/بلّوري",fos:1,hcl:2,o:"ليّن نسبيًّا، طبقات",H:3},
 {n:"غرانيت",type:"ناري",c:"#d7c4bd",cs:["#f8bbd0","#fafafa","#212121"],p:"coarse",col:"فاتح يحوي ألوانًا متنوّعة",tex:"خشن الحبيبات (مرئي البلّورات)",fos:0,hcl:0,o:"قاسٍ، البلّورات مرتّبة بصورة عشوائية",H:6},
 {n:"شيست",type:"متحوّل",c:"#8a9a8a",cs:["#cfd8dc","#a5d6a7","#eceff1","#78909c"],p:"foli",col:"رمادي لامع/أخضر",tex:"متوسط الخشونة، متورّق، لامع",fos:0,hcl:0,o:"ينقسم إلى صفائح على امتداد المعادن",H:4},
 {n:"صخر رملي",type:"رسوبي",c:"#e3c08d",cs:["#f0d6a8","#d9a866","#c69c6d"],p:"sand",col:"أصفر/بنّي",tex:"خشن (حبيبات رمل ملتحمة)",fos:0,hcl:0,o:"حبيبات مستديرة، طبقات",H:5},
 {n:"ريوليت",type:"ناري",c:"#d9b3a3",cs:["#bcaaa4","#fafafa","#8d6e63"],p:"porph",col:"فاتح (الأحمر والرمادي الفاتح)",tex:"ناعم الحبيبات، قد يكون سماقيًّا",fos:0,hcl:0,o:"قاسٍ، تعدّد النسيج",H:6},
 {n:"طباشير",type:"رسوبي",c:"#fbfbf6",cs:["#eeeeee","#e0e0e0"],p:"chalk",col:"أبيض ناصع",tex:"ناعم جدًّا",fos:1,hcl:2,o:"ليّن جدًّا، يترك أثرًا أبيض على اليد",H:1.5},
 {n:"غابرو",type:"ناري",c:"#33433a",cs:["#1b2620","#4e6b57","#eceff1"],p:"coarse",col:"غامق، أخضر غامق مائل إلى الأسود",tex:"خشن الحبيبات (مرئي البلّورات)",fos:0,hcl:0,o:"قاسٍ، النسيج متوسط الخشونة إلى خشن جدًّا",H:6},
 {n:"نايس",type:"متحوّل",c:"#9e9e9e",cs:["#eeeeee","#f8bbd0","#212121"],p:"band",col:"أشرطة فاتحة وغامقة",tex:"خشن، متورّق (أشرطة)",fos:0,hcl:0,o:"قاسٍ، أشرطة معادن متناوبة",H:6}];
RK4.forEach(r=>{r.hard=r.H<5.5?"يخدشه المسمار":"لا يخدشه المسمار";r.lay=0;});
BX.reg("e10-1-2-1",{cols:[["n","رقم العيّنة"],["c","اللون"],["t","النسيج"],["f","احتواؤها على أحافير"],["a","تفاعلها مع HCl المخفّف"],["o","خصائص أخرى"],["x","اسم الصخر"],["k","نوع الصخر"]],
 conclude:"نميّز الصخور النارية بنسيجها البلّوري (خشن جوفي أو ناعم سطحي) وخلوّها من الأحافير، والرسوبية بالحبيبات والطبقات والأحافير وتفاعل الكربونات منها مع الحمض، والمتحوّلة بالتورّق أو إعادة التبلور.",
 ans:["النارية: البازلت، والغرانيت، والريوليت، والغابرو. الرسوبية: الصخر الجيري، والصخر الرملي، والطباشير. المتحوّلة: الرخام، والشيست، والنايس.","النسيج وحجم البلّورات، والتورّق، ووجود الأحافير والطبقات، والتفاعل مع حمض الهيدروكلوريك، واللون، والقساوة."],
 build(S,A){A.say("ادرسي خصائص العيّنات العشر: اسحبي العدسة، وقطّارة الحمض، وأداة القساوة إلى كل عيّنة.");
  const L=rockLab(S,A,{rocks:RK4,tools:["lens","hcl","hard"],numbered:true,ready:()=>true,stepOf:{lens:0},steps:()=>["lens","hcl","hard"],
   row:(r,s,i)=>({n:i+1,c:s.lens?r.col:"",t:s.lens?r.tex:"",f:s.lens?(r.fos?"تحتوي":"لا تحتوي"):"",a:s.hcl?(r.hcl?"تتفاعل":"لا تتفاعل"):"",o:s.hard?r.o:"",x:"",k:""}),
   after:(G,rows)=>{A.say("قارني خصائص كل عيّنة بجدول تصنيف الصخور، ثم حدّدي اسمها.");let k=0;const names=RK4.map(r=>r.n).sort();
     const ask=()=>{if(k>=G.length){A.step(1);A.ui.clear();quiz(A,[["أيّ الخصائص الآتية تميّز الصخور المتحوّلة؟",[[0,"التورّق أو إعادة التبلور"],[1,"وجود الأحافير"],[2,"الفجوات الغازية"]],0,"تذكّري الشيست والنايس."],["لماذا يتفاعل الرخام مع الحمض مع أنه متحوّل؟",[[0,"لأنه يتكوّن من الكالسيت (كربونات الكالسيوم)"],[1,"لأنه يحوي أحافير"],[2,"لأنه ناري"]],0,"الرخام صخر جيري متحوّل."]]);return;}
      const g=G[k],r=g.r;S.glow(g,true);L.showLens(g);A.ui.clear();A.ui.choice("العيّنة "+(k+1)+": ما اسم الصخر؟",names.map(n=>[n,n]),v=>{if(v!==r.n){const w=RK4.find(x=>x.n===v);A.toast("لا تطابق: "+v+" "+w.tex+"، أمّا العيّنة فـ"+r.tex);return;}
        S.glow(g,false);rows[k].x=r.n;rows[k].k=r.type;L.refresh();A.obs("العيّنة "+(k+1)+": "+r.n+" (صخر "+r.type+").");k++;ask();});};ask();}});
 }});

/* ---------- 2) علاقة معدّل التبريد بحجم البلّورات ---------- */
function crys(S,par,n,big,seed){const rnd=lcg(seed);const g=S.g(par);for(let i=0;i<n;i++){const x=(rnd()-.5)*2,y=(rnd()-.5)*2;const s=big?(10+rnd()*12):(2+rnd()*3);S.path(`M${x*70} ${y*70-s} L${x*70+s*.8} ${y*70} L${x*70} ${y*70+s} L${x*70-s*.8} ${y*70}Z`,{fill:mix("#1565c0","#4fc3f7",rnd()),stroke:"#bbdefb","stroke-width":big?1.5:.6,opacity:.95},g);}return g;}
BX.reg("e10-1-1-1",{cols:[["t","الوقت (الساعة)"],["a","الوعاء الأول — حرارة الغرفة (الملاحظات)"],["b","الوعاء الثاني — الثلّاجة (الملاحظات)"]],
 conclude:"كلّما زادت سرعة التبريد قلّ حجم البلّورات وزاد عددها؛ لذا تمتاز الصخور النارية السطحية (تبرد اللابة بسرعة) ببلّورات صغيرة، والجوفية (تبرد الماغما ببطء) ببلّورات كبيرة.",
 ans:["بلّورات الوعاء الأول (حرارة الغرفة) كبيرة وقليلة العدد، وبلّورات الوعاء الثاني (الثلّاجة) صغيرة وكثيرة العدد.","بدأ التبلّور في الوعاء الثاني بعد نحو 10 دقائق، وفي الوعاء الأول بعد نحو 30 دقيقة (تختلف قليلًا بين المجموعات).","علاقة عكسية: كلّما زادت سرعة التبلّور (التبريد) قلّ حجم البلّورات.","لأن الأيونات لا تجد وقتًا كافيًا لتترتّب وتنمو على بلّورات قليلة، فتتكوّن نوى كثيرة في وقت واحد وتبقى صغيرة."],
 build(S,A){const b1=S.beaker(250,400,100,140,{lvl:0,col:"#bbdefb",label:"الوعاء الأول"}),b2=S.beaker(430,400,100,140,{lvl:0,col:"#bbdefb",label:"الوعاء الثاني"});const B=[b1,b2];B.forEach(b=>{b.sp=0;b.st=0;b.cr=S.g(b.g);b.lab=S.label(0,-160,"",b.g,"#1565c0");b.lab.style.display="none";});
  const fr=S.g();S.tr(fr,690,250);S.rect(-75,-150,150,300,{rx:12,fill:"#eceff1",stroke:"#90a4ae","stroke-width":3},fr);S.rect(-65,-60,130,200,{rx:6,fill:"#e3f2fd",stroke:"#b0bec5"},fr);S.line(-75,-70,75,-70,{stroke:"#90a4ae","stroke-width":3},fr);S.text(0,-110,"❄️ ثلّاجة",{"font-size":15},fr);
  const ket=S.g();S.tr(ket,90,330);S.path("M-30 0 Q-34 -50 0 -52 Q34 -50 30 0Z",{fill:"#b0bec5",stroke:"#546e7a","stroke-width":2},ket);S.path("M28 -30 L52 -48",{stroke:"#546e7a","stroke-width":6,"stroke-linecap":"round"},ket);S.text(0,-20,"ماء ساخن",{"font-size":10},ket);S.bubbles(0,-55,10,6,{par:ket,h:30,col:"#cfd8dc"});
  const jar=S.bottle(590,400,"#1e88e5","CuSO₄");const spoon=S.g();S.tr(spoon,590,250);S.emo(0,0,"🥄",34,spoon);S.text(0,30,"ملعقة",{"font-size":11},spoon);
  const pen=[0,1].map(i=>{const g=S.g();S.tr(g,80,120+i*30);S.rect(-45,-5,90,10,{rx:3,fill:"#ffca28",stroke:"#8d6e63"},g);S.line(0,5,0,105,{stroke:"#795548","stroke-width":2},g);S.text(0,-14,"قلم + خيط",{"font-size":10},g);return g;});
  const clock=S.screen(170,40,170,"08:00"),thr=S.screen(400,40,200,"الغرفة: 22 °C");
  A.say("حضّري المحلول في الوعاءين بالماء الساخن: اسحبي الإبريق إلى كل وعاء (100 mL).");
  S.drag(ket,{back:true,targets:()=>B.filter(b=>!b.wat).map(b=>({g:b.g,pad:10,fn:async()=>{b.wat=1;const sl=S.line(b.g._x,230,b.g._x,230,{stroke:"#b3e5fc","stroke-width":7,"stroke-linecap":"round"});await S.tween(300,e=>sl.setAttribute("y2",230+e*160));b.to(.33,600);await sleep(400);sl.remove();await b.to(.33,600);if(!A.is(0))A.step(0);if(B.every(x=>x.wat))A.say("أضيفي كمّيات متساوية من كبريتات النحاس: اسحبي الملعقة إلى كل وعاء (4 ملاعق لكلٍّ منهما).");return false;}}))});
  S.drag(spoon,{back:true,targets:()=>B.every(x=>x.wat)&&!A.is(1)?B.filter(b=>b.sp<4).map(b=>({g:b.g,pad:10,fn:async()=>{b.sp++;b.to(.33,300,mix("#bbdefb","#1565c0",b.sp/5));b.lab.style.display="";b.lab.set("ملاعق: "+b.sp);
     if(b.sp===4)S.rect(-30,-14,60,10,{rx:4,fill:"#1e88e5",opacity:.9},b.cr);if(B.every(x=>x.sp===4)){A.step(1);A.say("حرّكي المحلول بالملعقة حتى يصبح مشبعًا: اضغطي على كل وعاء عدّة مرّات.");}return false;}})):[]});
  B.forEach(b=>S.tap(b.g,()=>{if(!A.is(1)||A.is(2)||b.st>=3)return;b.st++;b.cr.innerHTML="";if(b.st<3)S.rect(-30,-14,60,10-b.st*3,{rx:4,fill:"#1e88e5",opacity:.9},b.cr);else S.circ(-20,-10,3,{fill:"#0d47a1"},b.cr);b.lab.set(b.st<3?"تحريك… "+b.st:"محلول مشبع ✓");
     if(B.every(x=>x.st>=3)){A.step(2);A.say("ضعي في كل وعاء خيطًا مربوطًا بقلم: اسحبي القلمين إلى الوعاءين.");}}));
  pen.forEach(p=>S.drag(p,{back:true,targets:()=>A.is(2)&&!A.is(3)?B.filter(b=>!b.p).map(b=>({g:b.g,pad:10,fn:async()=>{b.p=p;await S.moveTo(p,b.g._x,b.g._y-150,300);if(B.every(x=>x.p)){A.step(3);A.rec({t:"08:00",a:"محلول مشبع ساخن، الخيط منغمر (حرارة الغرفة 22 °C)",b:"محلول مشبع ساخن، الخيط منغمر"});A.say("ضعي الوعاء الثاني في الثلّاجة: اسحبيه إليها.");}return "stay";}})):[]}));
  let T=0,t1=60,t2=60;S.drag(b2.g,{back:true,targets:()=>A.is(3)&&!A.is(4)?[{box:[620,140,140,240],fn:async()=>{await S.moveTo(b2.g,690,375,500);S.moveTo(b2.p,690,225,500);A.step(4);A.say("راقبي تشكّل البلّورات في مُدد محدّدة: مرّري الزمن.");go();return "stay";}}]:[]});
  const OB=[[10,"بدأ يبرد ببطء، لا بلّورات بعد","تبلّور سريع: بلّورات صغيرة كثيرة على الجوانب والخيط"],[20,"لا بلّورات بعد","بلّورات صغيرة كثيرة تغطّي الخيط"],[30,"بدأت بلّورات قليلة تتكوّن على الخيط","ازدادت البلّورات الصغيرة عددًا"],[40,"نمت البلّورات وأصبحت أكبر حجمًا","البلّورات صغيرة كثيرة ولم يزد حجمها كثيرًا"],[50,"بلّورات كبيرة قليلة العدد واضحة الأوجه","بلّورات صغيرة جدًّا كثيرة العدد"]];
  let k=0;function go(){nextBtn(A,"⏩ مرّري 10 دقائق",async()=>{const [m,a,c]=OB[k];t1=60-(60-22)*(1-Math.exp(-m/40));t2=60-(60-4)*(1-Math.exp(-m/12));clock.set("08:"+String(m).padStart(2,"0"));thr.set("① "+t1.toFixed(0)+" °C | ② "+t2.toFixed(0)+" °C");
     b2.cr.innerHTML="";S.tr(crys(S,b2.cr,Math.min(60,m*3),false,9),0,-58,0,.6);if(m>=30){b1.cr.innerHTML="";const c1=crys(S,b1.cr,m<40?4:6,true,4);c1.setAttribute("transform","translate(0 -58) scale("+(m<40?.3:m<50?.48:.6)+")");}
     A.rec({t:"08:"+String(m).padStart(2,"0"),a:a+" ("+t1.toFixed(0)+" °C)",b:c+" ("+t2.toFixed(0)+" °C)"});k++;if(k===1)A.obs("بدأ التبلّور في الوعاء الثاني (الثلّاجة) عند 08:10، وفي الوعاء الأول عند 08:30.");
     if(k<OB.length)go();else{A.step(5);A.ui.clear();A.ui.choice("أيّ المحلولين برد على نحو أسرع؟",[[2,"الوعاء الثاني (في الثلّاجة)"],[1,"الوعاء الأول (حرارة الغرفة)"]],v=>{if(v!==2){A.toast("قارني درجتي الحرارة على الشاشة.");return;}A.step(6);A.obs("برد محلول الوعاء الثاني (الثلّاجة) أسرع، فتكوّنت فيه بلّورات صغيرة كثيرة.");A.ui.clear();A.say("انظري إلى البلّورات بالعدسة المكبّرة: اسحبي العدسة إلى كل وعاء.");lens();});}});}
  function lens(){const L=S.g();S.tr(L,300,90);S.circ(0,0,22,{fill:"rgba(200,230,255,.5)",stroke:"#5d4037","stroke-width":5},L);S.line(15,15,30,30,{stroke:"#5d4037","stroke-width":7,"stroke-linecap":"round"},L);const seen=new Set();
    const V=S.g();S.drag(L,{back:true,targets:()=>B.map((b,i)=>({g:b.g,pad:10,fn:async()=>{V.innerHTML="";S.tr(V,i?560:120,170);S.circ(0,0,80,{fill:"#e3f2fd",stroke:"#B8902A","stroke-width":5},V);crys(S,V,i?70:6,!i,i?11:4);S.label(0,96,i?"الوعاء الثاني: صغيرة كثيرة":"الوعاء الأول: كبيرة قليلة",V,"#1565c0");seen.add(i);
      A.obs(i?"الوعاء الثاني: بلّورات زرقاء صغيرة جدًّا كثيرة متجمّعة.":"الوعاء الأول: بلّورات زرقاء كبيرة معيّنية الشكل (منشورية) قليلة العدد واضحة الأوجه.");if(seen.size===2)A.step(7);return false;}}))});}
 }});

/* ---------- 5) الصوف الصخري ---------- */
BX.reg("e10-1-3-0",{cols:[["s","المرحلة"],["o","ما يحدث"]],
 conclude:"يُصنَع الصوف الصخري بصهر البازلت عند نحو 1600 °C، ثم غزل الصهارة في عجلة سريعة مع تيار هوائي فتتكوّن ألياف رفيعة متشابكة تُجمَع بأشكال مختلفة؛ وهو عازل حراري وصوتي مقاوم للحرائق.",
 ans:["عزل جدران المباني حراريًّا وصوتيًّا، وصناعة بعض الأدوات الكهربائية مثل المكيّفات والثلّاجات، والزراعة (وسط لنموّ النباتات).","يُستخدَم البازلت حجرًا للبناء والأرصفة، وفي رصف الطرق (حصمة)، وصناعة ألياف البازلت، وتُعدّ صناعاته واعدة اقتصاديًّا في الأردن (توفير فرص عمل وتقليل الاستيراد)."],
 build(S,A){const fur=S.g();S.tr(fur,200,300);S.rect(-90,-130,180,200,{rx:14,fill:"#5d4037",stroke:"#3e2723","stroke-width":4},fur);S.rect(-55,-80,110,110,{rx:10,fill:"#212121"},fur);const glow=S.rect(-55,-80,110,110,{rx:10,fill:"#ff6f00",opacity:0},fur);S.text(0,-100,"فرن صهر",{"font-size":14,fill:"#fff"},fur);
  const th=S.screen(200,40,150,"25 °C");const bas=rock(S,null,{c:"#37474f",cs:["#263238","#546e7a"],p:"fine"},30,2);S.tr(bas,80,450);S.text(80,495,"صخر البازلت",{"font-size":12});
  const wh=S.g();S.tr(wh,520,280);const wr=S.g(wh);S.circ(0,0,55,{fill:"#90a4ae",stroke:"#455a64","stroke-width":4},wr);for(let i=0;i<6;i++)S.line(0,0,Math.cos(i)*50,Math.sin(i)*50,{stroke:"#455a64","stroke-width":3},wr);S.text(0,80,"عجلة الغزل",{"font-size":13},wh);
  const fan=S.g();S.tr(fan,520,420);S.emo(0,0,"💨",40,fan);S.text(0,30,"تيار هوائي",{"font-size":12},fan);const fib=S.g();
  A.say("ضعي صخر البازلت في الفرن: اسحبيه إليه.");let melt=0;
  S.drag(bas,{back:true,targets:()=>[{box:[110,170,180,200],fn:async()=>{await S.moveTo(bas,200,250,400);A.ui.clear();A.say("ارفعي درجة حرارة الفرن حتى ينصهر البازلت.");
    A.ui.add(A.ui.slider("🔥 درجة حرارة الفرن",25,1700,25,25,v=>{th.set(v+" °C");glow.setAttribute("opacity",clamp((v-600)/1000,0,.95));bas.setAttribute("opacity",v>=1500?.0:1-clamp((v-1100)/600,0,.8));
      if(v>=1600&&!melt){melt=1;A.step(0);A.rec({s:"الصهر",o:"انصهر البازلت عند نحو 1600 °C وتكوّنت صهارة متوهّجة."});A.say("حرّكي الصهارة على نحو دائري في عجلة الغزل: اضغطي على العجلة.");}},"°C"));return "stay";}}]});
  let spin=0;S.tap(wh,async()=>{if(!A.is(0)||spin)return;spin=1;const drop=S.circ(290,250,10,{fill:"#ff9800"});await S.tween(700,e=>{drop.setAttribute("cx",lerp(290,520,e));drop.setAttribute("cy",lerp(250,280,e)-Math.sin(e*3.14)*60);});drop.remove();
    let a=0;const run=()=>{if(!wr.isConnected)return;a+=25;wr.setAttribute("transform","rotate("+a+")");requestAnimationFrame(run);};run();S.circ(0,0,20,{fill:"#ff9800",opacity:.9},wh);A.step(1);A.rec({s:"الغزل",o:"تدور الصهارة بسرعة كبيرة في عجلة الغزل."});A.say("سلّطي التيار الهوائي على الصهارة: اضغطي على مروحة الهواء.");});
  S.tap(fan,async()=>{if(!A.is(1)||A.is(2))return;for(let i=0;i<60;i++){const y=R(220,340),c=mix("#ffb74d","#fff3e0",Math.random());S.path(`M575 ${y} q ${R(40,80)} ${R(-30,30)} ${R(120,190)} ${R(-20,20)}`,{fill:"none",stroke:c,"stroke-width":1.5,opacity:.9},fib);if(i%6===0)await sleep(60);}
    A.step(2);A.rec({s:"التيار الهوائي",o:"تتطاير الصهارة على شكل خيوط رفيعة متشابكة (كغزل الحلوى) وتبرد."});A.say("اجمعي الخيوط بأشكال مختلفة: اختاري الشكل.");A.ui.clear();
    A.ui.choice("📦 اجمعي الصوف الصخري على شكل:",[["roll","🧻 لفائف"],["board","🧱 ألواح"],["pipe","🔘 أنابيب عازلة"]],v=>{if(A.is(3))return;const p=S.g();S.tr(p,690,430);if(v==="roll")S.circ(0,-30,30,{fill:"#ffe0b2",stroke:"#d7a86e","stroke-width":6},p);else if(v==="board")S.rect(-45,-40,90,40,{fill:"#ffe0b2",stroke:"#d7a86e","stroke-width":3},p);else{S.circ(0,-30,30,{fill:"#ffe0b2",stroke:"#d7a86e","stroke-width":6},p);S.circ(0,-30,12,{fill:"#fff"},p);}
      A.step(3);A.rec({s:"التجميع",o:"جُمعت الألياف على شكل "+({roll:"لفائف",board:"ألواح",pipe:"أنابيب"})[v]+" تُستخدم في العزل."});A.ui.clear();quiz(A,[["لماذا يقاوم الصوف الصخري الحرائق؟",[[0,"لأن درجة انصهاره عالية (مصنوع من صخر)"],[1,"لأنه مبلّل بالماء"],[2,"لأنه بلاستيكي"]],0,"تذكّري درجة حرارة الفرن."],["أيّ استخدام الآتية للصوف الصخري؟",[[0,"العزل الحراري والصوتي للمباني"],[1,"صناعة الزجاج الشفّاف"],[2,"تحلية المياه"]],0]]);});});
 }});

/* ---------- 6) النجوم من حولنا (نموذج السماء) ---------- */
const SK=[[.19,.06,"#b3e5fc","أزرق مائل إلى الأبيض",11,"كبير لامع"],[.06,.05,"#fff176","أصفر",6,"صغير"],[.10,.37,"#ffb74d","برتقالي",8,"متوسط"],[.76,.05,"#ffffff","أبيض",9,"متوسط لامع"],[.63,.32,"#ef5350","أحمر",12,"كبير"],[.125,.83,"#fff9c4","أصفر مائل إلى الأبيض",5,"صغير خافت"]];
BX.reg("e10-2-1-0",{cols:[["n","رقم النجم"],["c","لون المصباح (النجم)"],["s","الحجم والسطوع الظاهري"]],
 conclude:"تظهر النجوم في السماء متفرّقة أحيانًا ومتجمّعة في عناقيد أحيانًا أخرى، وتختلف في ألوانها وحجومها وسطوعها؛ لاختلاف درجات حرارة سطوحها وكتلها وحجومها وبعدها عنّا.",
 ans:["تبدو بعض النجوم متفرّقة، وبعضها متجمّعة في عنقود نجمي كثيف.","لاختلاف درجات حرارة سطوحها (تحدّد اللون)، واختلاف حجومها وكتلها وبعدها عن الأرض (تحدّد السطوع والحجم الظاهري).","تظهر متفرّقة منفردة بألوان وحجوم مختلفة (وليست متجمّعة كالعنقود).","النجوم أجرام مضيئة بذاتها، تختلف في اللون والحجم والسطوع ودرجة الحرارة، وقد تكون منفردة أو متجمّعة في عناقيد."],
 build(S,A){const P=[40,70,320,240],C=[440,70,320,240];const ph=S.g();S.rect(P[0],P[1],P[2],P[3],{rx:6,fill:"#111"},ph);const rr=lcg(3);for(let i=0;i<160;i++)S.circ(P[0]+rr()*P[2],P[1]+rr()*P[3],rr()*1.3+.2,{fill:"#fff",opacity:rr()*.7+.2},ph);for(let i=0;i<70;i++){const a=rr()*6.28,d=rr()*22;S.circ(P[0]+.79*P[2]+Math.cos(a)*d,P[1]+.28*P[3]+Math.sin(a)*d,.9,{fill:"#fff"},ph);}
  SK.forEach(([x,y],i)=>{S.circ(P[0]+x*P[2],P[1]+y*P[3]+10,3,{fill:"#fff"},ph);S.text(P[0]+x*P[2]+10,P[1]+y*P[3]+4,String(i+1),{"font-size":13,fill:"#fff","font-weight":700},ph);});S.text(P[0]+P[2]/2,P[1]+P[3]+20,"صورة تمثّل جزءًا من السماء",{"font-size":12});
  const card=S.g();S.rect(C[0]-20,C[1]-20,C[2]+40,C[3]+40,{fill:"#c8a165",stroke:"#8d6e63","stroke-width":2},card);const rect=S.rect(C[0],C[1],C[2],C[3],{fill:"none",stroke:"#3e2723","stroke-width":2,"stroke-dasharray":"8 6"});rect.style.display="none";const lay=S.g();
  const tool=(x,ch,lab)=>{const g=S.g();S.tr(g,x,420);S.emo(0,-6,ch,34,g);S.text(0,26,lab,{"font-size":11},g);return g;};
  const ru=tool(120,"📏","مسطرة وقلم"),sc=tool(220,"✂️","مقصّ"),aw=tool(320,"📍","أداة ثقب"),br=tool(420,"🖌️","ألوان"),bl=tool(530,"💡","6 مصابيح"),bt=tool(630,"🔋","3 بطّاريات");const sw=S.g();S.tr(sw,730,420);S.rect(-22,-16,44,26,{rx:5,fill:"#455a64"},sw);const lev=S.line(-12,0,12,-12,{stroke:"#ffca28","stroke-width":5,"stroke-linecap":"round"},sw);S.text(0,26,"مفتاح",{"font-size":11},sw);
  const box=[C[0],C[1],C[2],C[3]];A.say("ارسمي على الكرتون مستطيلًا (30 cm × 40 cm): اسحبي المسطرة والقلم إلى الكرتون.");
  S.drag(ru,{back:true,targets:()=>A.is(0)?[]:[{box,fn:async()=>{rect.style.display="";const L=2*(C[2]+C[3]);rect.setAttribute("stroke-dasharray",L);rect.setAttribute("stroke-dashoffset",L);await S.tween(900,e=>rect.setAttribute("stroke-dashoffset",L*(1-e)));rect.setAttribute("stroke-dasharray","8 6");A.step(0);A.say("قصّي المستطيل: اسحبي المقصّ إلى الكرتون.");return false;}}]});
  S.drag(sc,{back:true,targets:()=>A.is(0)&&!A.is(1)?[{box,fn:async()=>{await S.tween(500,e=>card.setAttribute("opacity",1-e*.9));card.remove();S.rect(C[0],C[1],C[2],C[3],{fill:"#c8a165",stroke:"#8d6e63","stroke-width":2},lay);rect.remove();A.step(1);k=0;A.say("ارسمي النجم 1 على المستطيل في موضعه المناسب كما في الصورة: اضغطي على موضعه.");return false;}}]:[]});
  let k=0;const stars=[];let hint=null;S.tap(lay,e=>{if(!A.is(1)||A.is(2))return;const p=S.pt(e);const [x,y]=SK[k];const tx=C[0]+x*C[2],ty=C[1]+y*C[3]+10;if(Math.hypot(p.x-tx,p.y-ty)>38){A.toast("ليس في الموضع المناسب: قارني بموضع النجم "+(k+1)+" في الصورة.");if(hint)hint.remove();hint=S.circ(tx,ty,24,{fill:"none",stroke:"#B8902A","stroke-width":3,"stroke-dasharray":"5 4"});return;}
    if(hint){hint.remove();hint=null;}const g=S.g(lay);S.star(tx,ty,9,"#fff59d",g);S.text(tx+12,ty-6,String(k+1),{"font-size":12,"font-weight":700},g);g.c=[tx,ty];stars.push(g);k++;if(k<SK.length)A.say("ارسمي النجم "+(k+1)+" في موضعه.");else{A.step(2);A.say("اثقبي النجوم المرقّمة: اسحبي أداة الثقب إلى كل نجم.");}});
  let holes=0;S.drag(aw,{back:true,targets:()=>A.is(2)&&!A.is(3)?stars.filter(s=>!s.h).map(s=>({box:[s.c[0]-18,s.c[1]-18,36,36],fn:async()=>{s.h=1;S.circ(s.c[0],s.c[1],4,{fill:"#212121"},s);if(++holes===6){A.step(3);A.say("لوّني المستطيل بالأسود وأضيفي ألوانًا تمثّل الفضاء: اسحبي الألوان إليه.");}return false;}})):[]});
  S.drag(br,{back:true,targets:()=>A.is(3)&&!A.is(4)?[{box,fn:async()=>{const bg=S.g();lay.insertBefore(bg,lay.children[1]);const r0=S.rect(C[0],C[1],C[2],C[3],{fill:"#0d1033",opacity:0},bg);[["#4a148c",.3,.4],["#1a237e",.7,.6],["#880e4f",.5,.2]].forEach(([c,x,y])=>S.circ(C[0]+x*C[2],C[1]+y*C[3],70,{fill:c,opacity:.35},bg));await S.tween(700,e=>r0.setAttribute("opacity",e));
     stars.forEach(s=>s.querySelector("path").setAttribute("fill","#555"));A.step(4);A.say("من الجهة الخلفية صمّمي دارة كهربائية: اسحبي المصابيح إلى الثقوب، ثم البطّاريات.");return false;}}]:[]});
  let bulbs=0,bats=0;const wires=S.g();S.drag(bl,{back:true,targets:()=>A.is(4)&&!bulbs?[{box,fn:async()=>{bulbs=1;stars.forEach(s=>S.circ(s.c[0],s.c[1],6,{fill:"#9e9e9e",stroke:"#616161"},s));A.toast("ثُبّتت المصابيح الستّة في الثقوب.");chk();return false;}}]:[]});
  S.drag(bt,{back:true,targets:()=>A.is(4)&&!bats?[{box,fn:async()=>{bats=1;const B=S.g();S.tr(B,C[0]+C[2]-40,C[1]+C[3]-20);for(let i=0;i<3;i++)S.rect(-36+i*24,-10,22,20,{rx:3,fill:"#263238",stroke:"#f9a825"},B);chk();return false;}}]:[]});
  function chk(){if(!(bulbs&&bats))return;const pts=[[C[0]+C[2]-76,C[1]+C[3]-20],...stars.map(s=>s.c),[C[0]+C[2]-4,C[1]+C[3]-20]];S.wire(pts,"#e53935",wires);lay.appendChild(wires);stars.forEach(s=>lay.appendChild(s));A.step(5);A.say("وصّلتِ المصابيح على التوالي. أغلقي الدارة: اضغطي على المفتاح.");}
  S.tap(sw,async()=>{if(!A.is(5)||A.is(6))return;lev.setAttribute("x2",14);lev.setAttribute("y2",0);wires.setAttribute("opacity",.25);for(let i=0;i<6;i++){const s=stars[i],[,,c,cn,r,sz]=SK[i];S.circ(s.c[0],s.c[1],r*2.4,{fill:S.rg([[c,0,.9],[c,1,0]])},s);S.circ(s.c[0],s.c[1],r*.6,{fill:c},s);A.rec({n:i+1,c:cn,s:sz});await sleep(150);}
    A.step(6);A.obs("أضاءت النجوم بألوان وحجوم مختلفة: الأزرق والأبيض والأصفر والبرتقالي والأحمر.");quiz(A,[["كيف تبدو النجوم في الصورة؟",[[0,"بعضها متفرّق وبعضها متجمّع في عنقود"],[1,"كلّها متجمّعة"],[2,"كلّها بالحجم واللون نفسيهما"]],0,"انظري إلى العنقود الكثيف قرب النجم 5."],["لماذا تختلف ألوان النجوم؟",[[0,"لاختلاف درجات حرارة سطوحها"],[1,"لاختلاف بعدها فقط"],[2,"لأنها تعكس ضوء الشمس"]],0]]);});
 }});

/* ---------- 7) الكشف عن ألوان النجوم ---------- */
BX.reg("e10-2-1-1",{cols:[["c","الحالة"],["l","لون سلك المصباح"],["t","درجة الحرارة (مرتفعة، متوسطة، منخفضة)"]],
 conclude:"كلّما زادت درجة حرارة سلك المصباح تغيّر لونه من الأحمر إلى البرتقالي ثم الأصفر فالأبيض وزاد سطوعه؛ وبالمثل: النجوم الحارّة زرقاء بيضاء ساطعة، والأبرد حمراء.",
 ans:["كان أحمر خافتًا مع البطّارية الضعيفة، وبرتقاليًّا مصفرًّا مع البطّارية الجديدة، وأبيض مصفرًّا ساطعًا مع البطّاريتين الجديدتين.","كلّما زادت درجة حرارة السلك تغيّر لونه من الأحمر إلى البرتقالي فالأصفر فالأبيض وازداد سطوعه.","بسبب زيادة الطاقة الكهربائية (الجهد والتيار) التي تصل إلى السلك، فتزداد الطاقة المتحوّلة إلى حرارة.","النجوم ذات درجات حرارة السطح المرتفعة: زرقاء أو بيضاء مزرقّة، وذات درجات الحرارة المنخفضة: حمراء أو برتقالية."],
 build(S,A){const H=[300,400];const hold=S.g();S.tr(hold,H[0],H[1]);S.rect(-60,-26,120,52,{rx:8,fill:"none",stroke:"#8d6e63","stroke-width":3,"stroke-dasharray":"6 4"},hold);S.text(0,44,"مكان البطّارية",{"font-size":11},hold);
  const mk=(x,y,v,lab)=>{const b=S.battery(x,y,{v});S.text(0,40,lab,{"font-size":11},b.g||b);return b.g||b;};const bw=mk(110,250,"1.5 V","بطّارية ضعيفة (قديمة)"),bn1=mk(110,350,"1.5 V","بطّارية جديدة"),bn2=mk(110,450,"1.5 V","بطّارية جديدة");
  const bulb=S.bulb(560,300);const bg=bulb.g||bulb;const fil=S.path("M-8 -26 l4 -8 l4 8 l4 -8 l4 8",{fill:"none",stroke:"#9e9e9e","stroke-width":2.5},bg);S.text(0,40,"مصباح",{"font-size":12},bg);
  const w1=S.g(),w2=S.g();const watch=S.screen(560,80,140,"0 s");const ends=S.g();
  const draw=()=>{w1.innerHTML="";w2.innerHTML="";const lit=bg._placed;S.wire([[H[0]+46,H[1]],[440,H[1]],[440,lit?320:330]],"#d32f2f",w1);S.wire([[H[0]-46,H[1]],[H[0]-46,470],[480,470],[480,lit?310:340]],"#212121",w2);};
  let cur=null,ph=0;const CASES=[["باستخدام بطّارية ضعيفة",.25,"#b71c1c","أحمر خافت","منخفضة"],["باستخدام بطّارية جديدة",.6,"#ff9800","برتقالي مصفرّ","متوسطة"],["باستخدام بطّاريتين جديدتين",1,"#fffde7","أبيض مصفرّ ساطع","مرتفعة"]];
  A.say("اربطي السلكين بقطبي البطّارية الضعيفة: اسحبيها إلى مكان البطّارية.");
  const place=(b,x)=>S.drag(b,{back:true,targets:()=>[{box:[H[0]-70,H[1]-40,140,80],fn:async()=>{if(x===0&&ph!==0)return false;if(x===1&&ph!==3)return false;if(x===2&&ph!==5)return false;
     if(cur&&x===1){await S.moveTo(cur,110,250,300);cur=null;}const ox=x===2?H[0]+0:H[0];await S.moveTo(b,x===2?H[0]+0:ox,x===2?H[1]-50:H[1],300);
     if(x===2){A.ui.clear();A.say("ثبّتي البطّاريتين معًا بالشريط الكهربائي.");nextBtn(A,"🩹 ثبّتي البطّاريتين بالشريط",async()=>{S.rect(H[0]-12,H[1]-80,24,104,{fill:"#212121",opacity:.75});ph=6;light(2);});return "stay";}
     cur=b;draw();if(x===0){ph=1;A.step(0);A.say("المسي طرفي السلكين الحرّين بالمصباح من أسفله ومن الجزء المعدني: اسحبي المصباح إلى طرفي السلكين.");}else{ph=4;light(1);}return "stay";}}]});
  place(bw,0);place(bn1,1);place(bn2,2);
  S.drag(bg,{back:true,targets:()=>ph===1?[{box:[400,280,120,90],fn:async()=>{await S.moveTo(bg,460,330,300);bg._placed=1;ph=2;draw();A.step(1);light(0);return "stay";}}]:[]});
  async function light(i){const [c,k,col,cn,tn]=CASES[i];bulb.on&&bulb.on(k);fil.setAttribute("stroke",col);fil.setAttribute("stroke-width",2.5+k*1.5);A.say("انتظري 8 ثوانٍ ثم المسي المصباح بحذر لوصف درجة حرارته.");A.ui.clear();
    nextBtn(A,"⏱️ انتظري 8 ثوانٍ",async()=>{await S.tween(1600,e=>watch.set(Math.round(e*8)+" s"));A.ui.clear();A.say("المسي المصباح بحذر: اضغطي عليه.");ph=10+i;});}
  S.tap(bg,()=>{if(ph<10)return;const i=ph-10;const [c,k,col,cn,tn]=CASES[i];A.toast("✋ المصباح "+(tn==="منخفضة"?"دافئ قليلًا":tn==="متوسطة"?"ساخن":"ساخن جدًّا!"));A.rec({c,l:cn,t:tn});watch.set("0 s");
    if(i===0){A.step(2);ph=3;A.say("كرّري باستخدام بطّارية جديدة: اسحبي البطّارية الجديدة إلى مكان البطّارية.");}
    else if(i===1){A.step(3);ph=5;A.say("ثبّتي البطّارية الجديدة الثانية مع الأولى: اسحبيها إلى مكان البطّارية.");}
    else{ph=99;A.step(4);A.obs("كلّما زادت درجة حرارة السلك تغيّر لونه من الأحمر إلى البرتقالي ثم الأبيض المصفرّ وزاد سطوعه.");quiz(A,[["نجم سطحه حارّ جدًّا، ما لونه المتوقّع؟",[[0,"أزرق/أبيض مزرقّ"],[1,"أحمر"],[2,"برتقالي"]],0,"تذكّري: الأسخن ← الأبيض."],["نجم لونه أحمر، درجة حرارة سطحه:",[[0,"منخفضة نسبيًّا"],[1,"مرتفعة جدًّا"]],0]]);}});
 }});

/* ---------- 8) تمييز حجوم النجوم وعلاقتها بالسطوع (مخطّط) ---------- */
BX.reg("e10-2-1-2",{cols:[["n","النجم"],["t","درجة حرارة السطح (K)"],["l","السطوع نسبةً إلى الشمس"],["s","الحجم"]],
 conclude:"على المخطّط: النجوم العملاقة وفوق العملاقة في الأعلى (سطوع كبير)، والأقزام في الأسفل؛ وكلّما كبر حجم النجم زاد سطوعه عند درجة الحرارة نفسها، فالنجم البارد الكبير (العملاق الأحمر) ساطع ويقع أعلى يمين المخطّط.",
 ans:["نجوم عملاقة وفوق عملاقة (كبيرة جدًّا)، ونجوم متوسطة الحجم (مثل الشمس)، ونجوم قزمة صغيرة (الأقزام البيضاء والحمراء).","كلّما زاد حجم النجم زاد سطوعه (عند تقارب درجات الحرارة).","سطوعه كبير (أكثر من الشمس بآلاف المرّات)، ويقع في أعلى يمين المخطّط (منطقة العمالقة الحمراء)."],
 build(S,A){const X0=130,X1=740,Y0=50,Y1=410;const tx=T=>X0+(Math.log10(25000)-Math.log10(T))/(Math.log10(25000)-Math.log10(3000))*(X1-X0),ly=l=>Y1-(l+4)/10*(Y1-Y0);
  S.rect(X0,Y0,X1-X0,Y1-Y0,{fill:"#0d1033",stroke:"#546e7a"});[25000,10000,7000,5000,3000].forEach(T=>S.text(tx(T),Y1+18,T.toLocaleString("en"),{"font-size":11}));for(let l=-4;l<=6;l+=2)S.text(X0-26,ly(l)+4,"10^"+l,{"font-size":11,direction:"ltr"});
  S.text((X0+X1)/2,Y1+38,"درجة حرارة سطح النجم (كلفن)",{"font-size":13});const yl=S.text(30,(Y0+Y1)/2,"السطوع نسبةً إلى الشمس",{"font-size":13});yl.setAttribute("transform","rotate(-90 30 "+((Y0+Y1)/2)+")");
  const col=T=>T>15000?"#90caf9":T>9000?"#e3f2fd":T>6500?"#fffde7":T>5200?"#fff176":T>4000?"#ffb74d":"#ef5350";
  const MS=[[25000,4.5],[18000,3.5],[14000,2.6],[11000,1.9],[9000,1.3],[7500,.7],[6500,.3],[5800,0],[5000,-.5],[4300,-1.1],[3700,-2],[3200,-3],[3000,-3.5]];S.path("M"+MS.map(([T,l])=>tx(T)+" "+ly(l)).join(" L"),{fill:"none",stroke:"#ffffff",opacity:.25,"stroke-width":14,"stroke-linecap":"round"});
  MS.forEach(([T,l],i)=>S.circ(tx(T),ly(l),Math.max(3,10-i*.6),{fill:col(T),opacity:.85}));[[4500,2.3,12],[4000,3,15],[3600,4,20],[3400,5.2,26]].forEach(([T,l,r])=>S.circ(tx(T),ly(l),r,{fill:col(T),opacity:.8}));[[20000,-2.2],[14000,-2.7],[10000,-3.2]].forEach(([T,l])=>S.circ(tx(T),ly(l),3,{fill:"#fff"}));
  const KS=[["نجم السماك الأعزل",22000,4.3,18,"عملاق أزرق (كبير)"],["نجم النسر الواقع",9600,1.6,11,"متوسط (أكبر قليلًا من الشمس)"],["الشمس",5800,0,8,"متوسط"]];const got=new Set();
  KS.forEach(([n,T,l,r,sz],i)=>{const g=S.g();S.circ(tx(T),ly(l),r,{fill:col(T),stroke:"#B8902A","stroke-width":3},g);S.label(tx(T)+(i?50:60),ly(l)-r-8,n,g,"#7A1F2E");
    S.tap(g,()=>{if(got.has(i))return;got.add(i);A.rec({n,t:T.toLocaleString("en"),l:"10^"+l.toFixed(1),s:sz});A.toast(n+": "+T.toLocaleString("en")+" K، سطوعه ≈ 10^"+l.toFixed(1)+" من سطوع الشمس");if(got.size===3)part2();});});
  A.say("ادرسي المخطّط: اضغطي على النجوم الثلاثة المسمّاة لقراءة درجة حرارتها وسطوعها.");
  function part2(){quiz(A,[["صنّفي النجوم إلى فئات حجمية: ما الفئات؟",[[0,"عمالقة وفوق عمالقة، ونجوم متوسطة، وأقزام"],[1,"نجوم حارّة ونجوم باردة فقط"],[2,"نجوم قريبة ونجوم بعيدة"]],0,"لاحظي حجوم الدوائر على المخطّط."],["ما العلاقة بين حجم النجم وسطوعه؟",[[0,"كلّما زاد الحجم زاد السطوع"],[1,"كلّما زاد الحجم قلّ السطوع"],[2,"لا علاقة"]],0]],()=>{A.say("توقّعي: أين يقع نجم درجة حرارته السطحية منخفضة وحجمه كبير؟ اضغطي على موقعه في المخطّط.");pick=1;area.style.display="";area.parentNode.append(area);});}
  let pick=0;const area=S.rect(X0,Y0,X1-X0,Y1-Y0,{fill:"#fff",opacity:0});S.tap(area,e=>{if(pick!==1)return;const p=S.pt(e);if(p.x>tx(5000)&&p.y<ly(1.5)){pick=2;area.style.display="none";S.circ(p.x,p.y,24,{fill:"#ef5350",stroke:"#fff","stroke-width":3});S.label(p.x-40,p.y-34,"عملاق أحمر",null,"#c62828");A.rec({n:"النجم المتوقَّع",t:"منخفضة (≈ 3500)",l:"كبير جدًّا (10^4 تقريبًا)",s:"كبير جدًّا (عملاق أحمر)"});A.obs("النجم البارد الكبير يقع أعلى يمين المخطّط: سطوعه كبير جدًّا رغم انخفاض حرارته.");A.step(0);}
    else A.toast("درجة الحرارة المنخفضة على يمين المحور الأفقي، والحجم الكبير يعني سطوعًا كبيرًا (أعلى).");});
  area.style.display="none";
 }});

/* ---------- 9) كوكبات البروج ---------- */
const CA=[[1550,280],[1537,328],[1583,305],[1510,362],[1495,408],[1515,450],[1525,473],[1515,505],[1477,518],[1435,510],[1435,490],[1435,467],[1467,470]].map(([x,y])=>[(x-1400)*1.6+10,(y-260)*1.5+40]);
const CB=[[1893,307],[1868,288],[1825,347],[1845,405],[1738,440],[1703,503],[1775,490],[1898,475],[1898,428]].map(([x,y])=>[(x-1690)*1.6+440,(y-260)*1.5+40]);
BX.reg("e10-2-2-0",{cols:[["k","الكوكبة"],["n","عدد النجوم"],["x","الاسم المقترح"]],
 conclude:"الكوكبة مجموعة من النجوم تبدو قريبة بعضها من بعض في السماء، تخيّل القدماء أشكالها وأطلقوا عليها أسماء؛ وكوكبات البروج الاثنتا عشرة تظهر في أوقات مختلفة من السنة بسبب دوران الأرض حول الشمس.",
 ans:["تختلف الأسماء المقترحة باختلاف خيال كلّ منّا، وقد تتشابه أحيانًا.","تُستعمل مصادر المعرفة لمعرفة الاسم الحقيقي للكوكبة ووقت ظهورها؛ فكلّ برج يظهر ليلًا في فصل معيّن من السنة.","تختلف المشاهدة بحسب المكان والوقت والتلوّث الضوئي.","التشابه: نجوم يمكن وصلها بخطوط لتكوين أشكال. الاختلاف: في السماء تختلف النجوم في السطوع واللون، ويصعب تمييز بعضها، وقد لا تظهر كلّها."],
 build(S,A){S.rect(0,0,800,470,{fill:"#0d1033"});const rr=lcg(5);for(let i=0;i<120;i++)S.circ(rr()*800,rr()*470,rr()*1.2+.2,{fill:"#fff",opacity:.5});
  const lines=S.g();const mkC=(P,id,pre)=>{if(pre)S.line(...pre[0],...pre[1],{stroke:"#90caf9","stroke-width":2,opacity:.8},lines);return P.map(([x,y],i)=>{const g=S.g();S.star(x,y,9,"#fff59d",g);S.text(x+12,y-8,String(i+1),{"font-size":13,fill:"#fff","font-weight":700},g);S.circ(x,y,16,{fill:"#fff",opacity:0},g);g.c=[x,y];g.i=i;g.k=id;return g;});};
  const sa=mkC(CA,0,[CA[1],[(1615-1400)*1.6+10,(328-260)*1.5+40]]);S.star((1615-1400)*1.6+10,(328-260)*1.5+40,8,"#fff59d");const sb=mkC(CB,1,[CB[3],CB[8]]);
  const nx=[0,0];const done=[0,0];A.say("صِلي بخطوط بين النجوم متتبّعة تسلسل الأرقام: اضغطي على النجوم بالترتيب (1، 2، 3…) في كل كوكبة.");
  [sa,sb].forEach((L,k)=>L.forEach(g=>S.tap(g,()=>{if(A.is(0))return;if(g.i!==nx[k]){A.toast("تتبّعي الأرقام: النجم التالي رقم "+(nx[k]+1)+".");return;}
    if(g.i>0){const p=L[g.i-1].c;const l=S.line(p[0],p[1],p[0],p[1],{stroke:"#ffd54f","stroke-width":3},lines);S.tween(300,e=>{l.setAttribute("x2",lerp(p[0],g.c[0],e));l.setAttribute("y2",lerp(p[1],g.c[1],e));});}
    g.querySelector("path").setAttribute("fill","#ffca28");nx[k]++;if(nx[k]===L.length){done[k]=1;A.toast("اكتملت الكوكبة "+(k?"الثانية":"الأولى")+"!");if(done[0]&&done[1]){A.step(0);name(0);}}})));
  const NM=[["الأسد","🦁 الأسد"],["العقرب","🦂 العقرب"],["الحصان الطائر","🐎 الحصان الطائر"],["المغرفة","🥄 المغرفة"],["الطائرة الورقية","🪁 الطائرة الورقية"],["الثعبان","🐍 الثعبان"]];
  function name(k){A.ui.clear();A.say("اقترحي اسمًا لـ"+(k?"الكوكبة الثانية":"الكوكبة الأولى")+" كما تتخيّلينها.");A.ui.choice("✍️ اسم الكوكبة "+(k?"الثانية":"الأولى")+" المقترح:",NM,v=>{const P=k?CB:CA;const cx=P.reduce((s,p)=>s+p[0],0)/P.length;S.label(cx,455,"اسم الكوكبة المقترح: "+v,null,"#B8902A");A.rec({k:k?"الثانية":"الأولى",n:P.length,x:v});
    if(!k)name(1);else{A.step(1);A.ui.clear();A.obs("للتحقّق من الأسماء الحقيقية ووقت ظهور كل برج في السماء، أستعين بمصادر المعرفة، ثم أرصد السماء ليلًا وأقارن.");quiz(A,[["لماذا تظهر كوكبات البروج المختلفة في أوقات مختلفة من السنة؟",[[0,"بسبب دوران الأرض حول الشمس"],[1,"لأن النجوم تتحرّك بسرعة"],[2,"بسبب الغيوم"]],0],["كم عدد كوكبات البروج؟",[[0,"12 كوكبة"],[1,"7 كوكبات"],[2,"88 كوكبة"]],0,"البروج عددها مثل عدد أشهر السنة."]]);}});}
 }});

/* ---------- 10) نمذجة مبدأ عمل الثقب الأسود ---------- */
BX.reg("e10-2-3-0",{cols:[["n","المحاولة"],["b","الكرة في المنتصف"],["d","عمق الانحناء (cm)"],["v","أقصى سرعة للكرة الصغيرة (cm/s)"]],
 conclude:"تُحني الأجسام ذات الكتلة الكبيرة الفضاء حولها، فتنجذب الأجسام القريبة نحوها بسرعة متزايدة؛ وكلّما زادت الكتلة زاد الانحناء وزادت الجاذبية، والثقب الأسود كتلته هائلة في حجم صغير جدًّا فلا يفلت منه حتى الضوء.",
 ans:["انحنت قطعة القماش (تقعّرت) حول الكرة وتحت مكانها.","الانحناء يمثّل أثر جاذبية الثقب الأسود في الفضاء حوله: يجذب كل ما يقترب منه نحوه.","الكرة الأثقل وزنًا.","لأن الكرة الأثقل في المنتصف أحدثت انحناءً أكبر، فتسارعت الكرة الصغيرة أكثر وكانت سرعتها أكبر في الخطوة السادسة.","تنجذب الكرات الصغيرة نحو الكرة الكبيرة وتدور حولها ثم تسقط فيها، كما تنجذب الأجرام السماوية والضوء نحو الثقب الأسود ولا تستطيع الإفلات منه.","بمراقبة الأجرام القريبة: إذا كانت تدور بسرعة كبيرة جدًّا حول نقطة لا يُرى فيها جسم مضيء، أو تُسحب نحوها، دلّ ذلك على وجود ثقب أسود.","كلّما زادت كتلة الثقب الأسود في حجم صغير زادت كثافته وزادت جاذبيته."],
 build(S,A){const CX=400,CY=250;let M=0,mx=CX,my=CY;const grid=S.g();const prof=S.g();const fab=S.g();S.rect(110,70,580,360,{fill:"#b39ddb",opacity:.35,rx:6},fab);S.text(400,60,"قطعة القماش (40 cm)",{"font-size":13},fab);fab.style.display="none";
  const roll=S.g();S.tr(roll,140,250);S.rect(-30,-90,60,180,{rx:20,fill:"#9575cd"},roll);S.text(0,110,"لفّة قماش",{"font-size":12},roll);
  const sc=S.g();S.tr(sc,700,440);S.emo(0,-8,"✂️",34,sc);S.text(0,24,"مقصّ",{"font-size":11},sc);
  const warp=(x,y)=>{if(!M)return [x,y];const dx=x-mx,dy=y-my,r=Math.hypot(dx,dy)||1;const f=1-M*Math.exp(-r/110)*.55;return [mx+dx*f,my+dy*f];};
  let taut=0;function drawG(){grid.innerHTML="";const N=14,K=10;for(let i=0;i<=N;i++){const pts=[];for(let j=0;j<=K*3;j++){let x=120+i*560/N,y=80+j*340/(K*3);if(!taut)x+=Math.sin(j*.7+i)*4;pts.push(warp(x,y));}S.path("M"+pts.map(p=>p.join(" ")).join(" L"),{fill:"none",stroke:"#4a148c","stroke-width":1.2,opacity:.7},grid);}
    for(let j=0;j<=K;j++){const pts=[];for(let i=0;i<=N*3;i++){let x=120+i*560/(N*3),y=80+j*340/K;if(!taut)y+=Math.sin(i*.6+j)*4;pts.push(warp(x,y));}S.path("M"+pts.map(p=>p.join(" ")).join(" L"),{fill:"none",stroke:"#4a148c","stroke-width":1.2,opacity:.7},grid);}
    prof.innerHTML="";S.text(400,452,"منظر جانبي",{"font-size":11,fill:"#555"},prof);const d=M*40;S.path("M120 470 "+Array.from({length:57},(_,i)=>{const x=120+i*10;return "L"+x+" "+(470+d*Math.exp(-Math.abs(x-mx)/60)).toFixed(1);}).join(" "),{fill:"none",stroke:"#4a148c","stroke-width":3},prof);}
  A.say("قصّي 40 cm من قطعة القماش: اسحبي المقصّ إلى لفّة القماش.");
  S.drag(sc,{back:true,targets:()=>!A.is(0)?[{g:roll,pad:10,fn:async()=>{roll.style.display="none";fab.style.display="";drawG();A.step(0);A.say("مدّي القماش أفقيًّا مع زميلاتك حتى يصبح مشدودًا: اضغطي على زوايا القماش الأربع.");corners();return false;}}]:[]});
  function corners(){let c=0;[[110,70],[690,70],[110,430],[690,430]].forEach(([x,y])=>{const h=S.g();S.tr(h,x,y);S.circ(0,0,20,{fill:"#B8902A",opacity:.35},h);S.emo(0,0,"✋",26,h);S.tap(h,()=>{if(h.d)return;h.d=1;h.querySelector("circle").setAttribute("opacity",.9);if(++c===4){taut=1;drawG();A.step(1);A.say("مثّلي الثقب الأسود بالكرة الكبيرة: اسحبيها إلى طرف القماش ثم أفلتيها.");balls();}});});}
  const spd=S.screen(690,30,170,"0 cm/s");let trial=0;
  const ball=(x,r,c,lab)=>{const g=S.g();S.tr(g,x,440);S.circ(0,0,r,{fill:S.rg([["#fff",0,.9],[c,.5,1],[mix(c,"#000",.4),1,1]])},g);S.text(0,r+14,lab,{"font-size":11},g);return g;};
  function balls(){const big=ball(250,26,"#5c6bc0","كرة كبيرة"),sm=ball(330,10,"#26a69a","كرة صغيرة"),hv=ball(560,32,"#37474f","كرة أثقل"),sm2=ball(410,10,"#ef6c00","كرة صغيرة");
    const edge=[[110,70,580,60],[110,370,580,60],[110,70,60,360],[630,70,60,360]];const onEdge=fn=>()=>edge.map(b=>({box:b,fn}));
    S.drag(big,{back:true,targets:()=>!A.is(2)?edge.map(b=>({box:b,fn:async()=>{const sx=big._x,sy=big._y;await S.tween(1100,e=>{const ee=e*e;S.tr(big,lerp(sx,CX,ee),lerp(sy,CY,ee));M=ee*.55;mx=CX;my=CY;drawG();});A.step(2);A.rec({n:1,b:"كرة كبيرة",d:(M*12).toFixed(1),v:"—"});A.obs("انحنت قطعة القماش حول الكرة الكبيرة في المنتصف.");A.say("أفلتي كرة صغيرة (جرم سماوي) من طرف القماش: اسحبيها إلى الطرف.");return "stay";}})):[]});
    const shoot=async(g,n)=>{let x=g._x,y=g._y,vx=(CY-y)*.004,vy=(x-CX)*-.004+.0,vmax=0;vx+=(CX-x)*.002;vy+=(CY-y)*.002;const GM=M*900;const t0=performance.now();
      await new Promise(res=>{const st=()=>{for(let k=0;k<4;k++){const dx=CX-x,dy=CY-y,r=Math.hypot(dx,dy);const a=GM/(r*r+400);vx+=a*dx/r*.25;vy+=a*dy/r*.25;x+=vx;y+=vy;const v=Math.hypot(vx,vy);vmax=Math.max(vmax,v);if(r<22){res();return;}}S.tr(g,x,y);spd.set(Math.round(Math.hypot(vx,vy)*40)+" cm/s");if(performance.now()-t0>6000)res();else requestAnimationFrame(st);};st();});
      S.tr(g,CX+8,CY-6);return Math.round(vmax*40);};
    S.drag(sm,{back:true,targets:()=>A.is(2)&&!A.is(3)?edge.map(b=>({box:b,fn:async()=>{const v=await shoot(sm);A.step(3);A.rec({n:2,b:"كرة كبيرة",d:(M*12).toFixed(1),v});A.obs("تدحرجت الكرة الصغيرة نحو الكرة الكبيرة بسرعة متزايدة ثم استقرّت عندها (أقصى سرعة ≈ "+v+" cm/s).");sm.style.display="none";
       A.say("كرّري باستعمال كرة ذات كتلة أكبر: اسحبي الكرة الأثقل إلى طرف القماش.");big.style.display="none";M=0;drawG();return "stay";}})):[]});
    S.drag(hv,{back:true,targets:()=>A.is(3)&&!A.is(4)?edge.map(b=>({box:b,fn:async()=>{const sx=hv._x,sy=hv._y;await S.tween(1000,e=>{const ee=e*e;S.tr(hv,lerp(sx,CX,ee),lerp(sy,CY,ee));M=ee*.95;drawG();});A.step(4);A.rec({n:3,b:"كرة أثقل",d:(M*12).toFixed(1),v:"—"});A.obs("الكرة الأثقل أحدثت انحناءً أعمق في القماش.");A.say("ضعي كرة صغيرة على طرف القماش ولاحظي سرعتها: اسحبيها إلى الطرف.");return "stay";}})):[]});
    S.drag(sm2,{back:true,targets:()=>A.is(4)&&!A.is(5)?edge.map(b=>({box:b,fn:async()=>{const v=await shoot(sm2);A.step(5);A.rec({n:4,b:"كرة أثقل",d:(M*12).toFixed(1),v});A.obs("كانت سرعة الكرة الصغيرة أكبر مع الكرة الأثقل (≈ "+v+" cm/s) لأن الانحناء أعمق.");return "stay";}})):[]});}
 }});
})();
