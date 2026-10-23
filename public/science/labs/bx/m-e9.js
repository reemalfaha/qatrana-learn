/* تجارب علوم الأرض والبيئة — الصف التاسع (كتاب الأنشطة) — مطابقة لخطوات الكتاب */
(function(){const {sleep,lerp,clamp,mix,quiz,pickMany}=BX;const R=(a,b)=>a+Math.random()*(b-a);

/* ---------- أداة المجسّمات ثلاثية الأبعاد ---------- */
const PHI=(1+Math.sqrt(5))/2;
function hull(V){const F=[],key=new Set();const n=V.length;const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],cr=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],dt=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)for(let k=j+1;k<n;k++){let N=cr(sub(V[j],V[i]),sub(V[k],V[i]));const L=Math.hypot(...N);if(L<1e-6)continue;N=N.map(x=>x/L);const d=dt(N,V[i]);let pos=0,neg=0;const on=[];
    for(let m=0;m<n;m++){const s=dt(N,V[m])-d;if(s>1e-6)pos++;else if(s<-1e-6)neg++;else on.push(m);}if(pos&&neg)continue;if(pos){N=N.map(x=>-x);}const kk=on.slice().sort((a,b)=>a-b).join(",");if(key.has(kk))continue;key.add(kk);
    const c=[0,1,2].map(a=>on.reduce((s,m)=>s+V[m][a],0)/on.length);const u=sub(V[on[0]],c),w=cr(N,u);on.sort((a,b)=>{const pa=sub(V[a],c),pb=sub(V[b],c);return Math.atan2(dt(pa,w),dt(pa,u))-Math.atan2(dt(pb,w),dt(pb,u));});F.push({v:on,n:N});}
  const E=new Map();F.forEach(f=>f.v.forEach((a,i)=>{const b=f.v[(i+1)%f.v.length];const k=Math.min(a,b)+"-"+Math.max(a,b);E.set(k,[Math.min(a,b),Math.max(a,b)]);}));return {V,F,E:[...E.values()]};}
const SOLIDS={cube:["مكعّب",(()=>{const v=[];for(const x of[-1,1])for(const y of[-1,1])for(const z of[-1,1])v.push([x,y,z]);return v;})()],
 tetra:["رباعي الأوجه",[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]]],
 octa:["ثماني الأوجه",[[1.4,0,0],[-1.4,0,0],[0,1.4,0],[0,-1.4,0],[0,0,1.4],[0,0,-1.4]]],
 dodeca:["اثنا عشري الأوجه",(()=>{const v=[];for(const x of[-1,1])for(const y of[-1,1])for(const z of[-1,1])v.push([x,y,z]);for(const a of[-1,1])for(const b of[-1,1]){v.push([0,a/PHI,b*PHI]);v.push([a/PHI,b*PHI,0]);v.push([b*PHI,0,a/PHI]);}return v.map(p=>p.map(x=>x*.75));})()],
 icosa:["عشريني الأوجه",(()=>{const v=[];for(const a of[-1,1])for(const b of[-1,1]){v.push([0,a,b*PHI]);v.push([a,b*PHI,0]);v.push([b*PHI,0,a]);}return v.map(p=>p.map(x=>x*.8));})()]};
function solid3D(S,par,cx,cy,sc,poly,o={}){const g=S.g(par);let yaw=.6,pitch=.45;const marks={f:new Set(),e:new Set(),v:new Set()};let mode=null;
  const P=p=>{const cy_=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);let [x,y,z]=p;let x1=x*cy_+z*sy,z1=-x*sy+z*cy_;let y1=y*cp-z1*sp,z2=y*sp+z1*cp;return [cx+x1*sc,cy-y1*sc,z2];};
  const rot=n=>{const cy_=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);let [x,y,z]=n;let x1=x*cy_+z*sy,z1=-x*sy+z*cy_;let y1=y*cp-z1*sp,z2=y*sp+z1*cp;return [x1,y1,z2];};
  function draw(){g.innerHTML="";const PV=poly.V.map(P);const fs=poly.F.map((f,i)=>({f,i,z:f.v.reduce((s,k)=>s+PV[k][2],0)/f.v.length,n:rot(f.n)})).sort((a,b)=>a.z-b.z);
    fs.forEach(({f,i,n})=>{const front=n[2]>0;const sh=clamp(.35+.65*Math.max(0,n[0]*-.3+n[1]*.5+n[2]*.8),0,1);const col=marks.f.has(i)?mix("#ffe082","#ff8f00",sh):mix(o.col0||"#4a6fa5",o.col1||"#cfe3ff",sh);
      const p=S.path("M"+f.v.map(k=>PV[k][0]+" "+PV[k][1]).join(" L")+"Z",{fill:col,"fill-opacity":front?.92:.18,stroke:"#1a237e","stroke-width":1.2,"stroke-opacity":front?1:.35},g);
      if(mode==="f")S.tap(p,()=>{marks.f.has(i)?marks.f.delete(i):marks.f.add(i);draw();o.onMark&&o.onMark("f",marks.f.size);});});
    poly.E.forEach(([a,b],i)=>{const on=marks.e.has(i);const l=S.line(PV[a][0],PV[a][1],PV[b][0],PV[b][1],{stroke:on?"#d50000":"#0d47a1","stroke-width":on?5:mode==="e"?3:1.6,"stroke-linecap":"round",opacity:(PV[a][2]+PV[b][2])>0||on?1:.4},g);
      if(mode==="e"){const hit=S.line(PV[a][0],PV[a][1],PV[b][0],PV[b][1],{stroke:"#fff","stroke-opacity":0.01,"stroke-width":16},g);S.tap(hit,()=>{on?marks.e.delete(i):marks.e.add(i);draw();o.onMark&&o.onMark("e",marks.e.size);});}});
    if(mode==="v"||o.atoms)PV.forEach((p,i)=>{const on=marks.v.has(i);const c=S.circ(p[0],p[1],o.atoms?(on?13:9):(on?9:7),{fill:o.atoms?(on?"#e53935":"#ffcdd2"):(on?"#d50000":"#fff"),stroke:"#b71c1c","stroke-width":2,opacity:p[2]>0||on?1:.55},g);
      if(mode==="v"||o.atoms)S.tap(c,()=>{if(o.atoms&&on)return;on?marks.v.delete(i):marks.v.add(i);draw();o.onMark&&o.onMark("v",marks.v.size);});});
    if(o.center){const c=P([0,0,0]);S.circ(c[0],c[1],o.center,{fill:"#1565c0",stroke:"#0d47a1","stroke-width":2},g);}}
  draw();return {g,draw,set(y,p){yaw=y;pitch=p;draw();},mode(m){mode=m;draw();},marks,get yaw(){return yaw;},get pitch(){return pitch;}};}

/* ---------- 1) خصائص المعادن ---------- */
const MIN6=[["كوارتز","#eceff1","زجاجي","بلّورات منشورية سداسية"],["كالسيت","#fff8e1","زجاجي","بلّورات معينية"],["جبس","#fafafa","لؤلؤي حريري","صفائح شفّافة"],["هاليت","#e3f2fd","زجاجي","مكعّبات"],["بيريت","#d4af37","فلزّي","مكعّبات ذهبية لامعة"],["غالينا","#90a4ae","فلزّي","مكعّبات رمادية ثقيلة"]];
BX.reg("e9-1-1-0",{cols:[["a","الخصائص التي تشترك فيها المعادن"],["b","الخصائص التي تختلف فيها المعادن"]],
 conclude:"تشترك المعادن جميعها في أنها مواد صلبة غير عضوية تتكوّن طبيعيًّا ولها تركيب كيميائي محدّد وبناء بلّوري منتظم، وتختلف في خصائص مثل اللون والبريق والقساوة والشكل البلّوري.",
 ans:["مادة صلبة، غير عضوية، تتكوّن طبيعيًّا، لها تركيب كيميائي محدّد، لها بناء بلّوري داخلي منتظم.","لا؛ فاللون وحده ليس خاصية مميّزة دائمًا، فقد يتّخذ المعدن الواحد ألوانًا مختلفة بسبب الشوائب، وقد تتشابه معادن مختلفة في لونها.","الظفر، العملة النحاسية، اللوح الزجاجي، نصل السكّين الفولاذي (ومقياس موس للقساوة).","المعدن: مادة صلبة غير عضوية تتكوّن طبيعيًّا، لها تركيب كيميائي محدّد وبناء بلّوري منتظم."],
 build(S,A){A.say("اطلبي إلى معلّمتك تزويدك بعيّنات معدنية وأدوات: اضغطي الزرّ.");
  A.ui.add(A.ui.btn("🧺 احصلي على العيّنات والأدوات",b=>{b.remove();show();A.step(0);},"gold"));
  const sm=[];function show(){MIN6.forEach((m,i)=>{const g=S.g();S.tr(g,90+i*125,330);const pts=Array.from({length:7},(_,k)=>{const a=k/7*Math.PI*2,r=R(26,40);return (k?"L":"M")+Math.cos(a)*r+" "+Math.sin(a)*r*.75;}).join("")+"Z";
      S.path(pts,{fill:m[1],stroke:"#546e7a","stroke-width":2},g);if(m[2]==="فلزّي")S.path("M-12 -14 l 16 -6 l 6 10Z",{fill:"#fff",opacity:.7},g);else S.path("M-14 -10 l 10 -8 l 4 8Z",{fill:"#fff",opacity:.6},g);S.text(0,56,m[0],{"font-size":13},g);g.m=m;sm.push(g);});
    const lens=S.g();S.tr(lens,720,450);S.circ(0,-20,26,{fill:"rgba(200,230,255,.4)",stroke:"#5d4037","stroke-width":6},lens);S.rect(-5,6,10,40,{rx:4,fill:"#5d4037",transform:"rotate(-30)"},lens);S.text(0,40,"عدسة مكبّرة",{"font-size":11},lens);
    S.emo(600,450,"🔨",34);S.text(600,485,"مطرقة جيولوجية",{"font-size":11});
    const seen=new Set();A.say("تفحّصي العيّنات بالعدسة المكبّرة: اسحبي العدسة إلى كل عيّنة.");const info=S.label(400,110,"",null,"#5d4037");info.style.display="none";
    S.drag(lens,{back:true,oy:-20,targets:()=>sm.map(g=>({g,pad:0,fn:async()=>{seen.add(g.m[0]);info.style.display="";info.set(g.m[0]+": لون "+(g.m[2]==="فلزّي"?"فلزّي":"")+" — بريق "+g.m[2]+" — "+g.m[3]);A.obs(g.m[0]+": بريق "+g.m[2]+"، "+g.m[3]+".");
      if(seen.size===6){await sleep(400);pickMany(A,"الخصائص التي تشترك فيها العيّنات المعدنية جميعها:",["صلبة","غير عضوية","تتكوّن طبيعيًّا","لها بناء بلّوري منتظم","لها اللون نفسه","لها البريق نفسه"],["صلبة","غير عضوية","تتكوّن طبيعيًّا","لها بناء بلّوري منتظم"],()=>{A.step(1);
        A.say("تفحّصي العيّنات مرّة أخرى، وحدّدي خصائص تختلف فيها.");pickMany(A,"الخصائص التي تختلف فيها العيّنات المعدنية:",["اللون","البريق","القساوة","الشكل البلّوري","الحالة (صلبة)","تتكوّن طبيعيًّا"],["اللون","البريق","القساوة","الشكل البلّوري"],()=>{A.step(2);
          A.rec({a:"صلبة، غير عضوية، تتكوّن طبيعيًّا، لها بناء بلّوري منتظم وتركيب كيميائي محدّد",b:"اللون، البريق، القساوة، الشكل البلّوري"});A.ui.add(A.ui.btn("📢 اعرضي النتائج أمام المجموعات",b=>{b.disabled=true;A.step(3);},"gold"));});});}}}))});}
 }});

/* ---------- 2) عناصر الشكل الخارجي للبلّورة ---------- */
const XT=[["cube",6,12,8,90],["tetra",4,6,4,70.5],["octa",8,12,6,109.5],["dodeca",12,30,20,116.6],["icosa",20,30,12,138.2]];
BX.reg("e9-1-1-1",{cols:[["s","بلّورات مختلفة الأشكال"],["f","الوجه البلّوري (العدد)"],["e","الحافّة البلّورية"],["v","الزاوية المجسّمة"],["a","الزاوية بين الوجهين"]],
 conclude:"عناصر الشكل الخارجي للبلّورة: الأوجه، والحواف، والزوايا المجسّمة، والزوايا بين الوجهين؛ وتختلف أعدادها ومقادير الزوايا باختلاف شكل البلّورة.",
 ans:["المكعّب 6، رباعي الأوجه 4، ثماني الأوجه 8، اثنا عشري الأوجه 12، عشريني الأوجه 20.","في المكعّب 8 زوايا مجسّمة، و12 زاوية بين وجهين (عدد الحواف)، مقدار كلٍّ منها 90°.","لا؛ تختلف: المكعّب 90°، رباعي الأوجه ≈ 70.5°، ثماني الأوجه ≈ 109.5°، اثنا عشري ≈ 116.6°، عشريني ≈ 138.2°.","عدد الحواف أكبر من عدد الزوايا المجسّمة دائمًا (تحقّق علاقة أويلر: الأوجه + الزوايا = الحواف + 2)."],
 build(S,A){A.say("توزّعي مع زميلاتك في مجموعات، وخذي عيّنة من المجسّمات: اضغطي الزرّ.");let cur=null,k=0;const res={};
  A.ui.add(A.ui.btn("👥 وزّعي المجسّمات على المجموعات",b=>{b.remove();A.step(0);start();},"gold"));
  const stage=S.g();const cards=S.g();
  function start(){XT.forEach(([id],i)=>{const g=S.g(cards);S.tr(g,90+i*155,450);S.rect(-62,-32,124,64,{rx:12,fill:"#fff",stroke:"#B8902A","stroke-width":2},g);S.text(0,6,SOLIDS[id][0],{"font-size":13},g);g.id=id;S.tap(g,()=>open(id,g));});
    A.say("اختاري مجسّمًا لتتفحّصيه: اضغطي على اسمه.");}
  function open(id,card){if(res[id]){A.toast("سُجّل هذا المجسّم");return;}stage.innerHTML="";const poly=hull(SOLIDS[id][1]);const cnt=S.label(400,40,"",stage,"#1a237e");
    cur=solid3D(S,stage,400,210,id==="cube"?95:id==="tetra"?100:115,poly,{onMark:(m,n)=>cnt.set({f:"الأوجه المُعلَّمة: ",e:"الحواف المُعلَّمة: ",v:"الزوايا المجسّمة المُعلَّمة: "}[m]+n)});
    if(!A.is(1))A.step(1);A.ui.clear();A.ui.slider("↻ تدوير المجسّم",0,628,1,60,v=>cur.set(v/100,cur.pitch));A.ui.slider("↕ إمالة",-120,120,1,45,v=>cur.set(cur.yaw,v/100));
    const T=XT.find(x=>x[0]===id);const q=[["f","عُدّي الأوجه البلّورية (اضغطي على كل وجه لتعليمه):",T[1]],["e","عُدّي الحواف البلّورية (اضغطي على كل حافّة):",T[2]],["v","عُدّي الزوايا المجسّمة (اضغطي على كل رأس):",T[3]]];let j=0;const ans={};
    const ask=()=>{if(j>=3){A.ui.add(A.ui.btn("📐 قيسي الزاوية بين الوجهين",b=>{b.remove();ans.a=T[4];A.toast("الزاوية بين وجهين متجاورين ≈ "+T[4]+"°");A.rec({s:SOLIDS[id][0],f:ans.f,e:ans.e,v:ans.v,a:T[4]+"°"});res[id]=1;card.querySelector("rect").setAttribute("fill","#e8f5e9");cur.mode(null);
          if(Object.keys(res).length===1)A.step(2);if(Object.keys(res).length===XT.length){A.ui.clear();A.ui.add(A.ui.btn("📢 اعرضي النتائج أمام المجموعات",b2=>{b2.disabled=true;A.step(3);A.obs("المجموعة الثانية سجّلت للمكعّب: 6 أوجه، 12 حافّة، 8 زوايا مجسّمة، 90°.");A.step(4);A.ui.clear();A.ui.add(A.ui.btn("💬 ناقشي النتائج مع المجموعات",b3=>{b3.disabled=true;A.step(5);},"gold"));},"gold"));}else A.say("اختاري مجسّمًا آخر ("+Object.keys(res).length+"/"+XT.length+").");},"gold"));return;}
      const [m,t,v]=q[j];cur.mode(m);A.say(t);const opts=[v,v+2,Math.max(1,v-2)].sort(()=>Math.random()-.5);const grp=A.ui.group("العدد:");opts.forEach(o=>grp.append(A.ui.btn(String(o),b=>{if(o!==v){A.toast("عُدّي مرّة أخرى — دوّري المجسّم لتري الجهة الخلفية");return;}ans[m]=v;grp.remove();j++;ask();},"g")));};ask();}
 }});

/* ---------- 3) الخصائص الفيزيائية للمعادن ---------- */
const MIN8=[["الغالينا","#78909c","رمادي فضّي","رمادية داكنة","فلزّي","3 (مكعّبي)","—",2.5],["البيريت","#c9a227","أصفر نحاسي","أسود مخضرّ","فلزّي","لا يوجد","غير منتظم",6.5],["الكوارتز","#eceff1","عديم اللون/أبيض","بيضاء (عديمة اللون)","لافلزّي (زجاجي)","لا يوجد","محاري",7],["البيوتيت","#3e2723","بنّي داكن/أسود","بيضاء رمادية","لافلزّي (لؤلؤي)","1 (صفائح)","—",2.8],
 ["الكالسيت","#fff8e1","أبيض/عديم اللون","بيضاء","لافلزّي (زجاجي)","3 (معيني)","—",3],["الجبس","#f5f5f5","أبيض","بيضاء","لافلزّي (حريري)","1","—",2],["الملاكيت","#2e7d32","أخضر","خضراء فاتحة","لافلزّي (حريري)","لا يوجد","غير منتظم",3.8],["الكبريت","#fdd835","أصفر","صفراء باهتة","لافلزّي (راتنجي)","لا يوجد","غير منتظم",2]];
const TOOLH=[["nail","💅 الظفر",2.5],["coin","🪙 عملة نحاسية",3.5],["glass","🔲 لوح زجاجي",5.5],["knife","🔪 نصل فولاذي",6]];
BX.reg("e9-1-1-2",{cols:[["m","اسم المعدن"],["c","اللون"],["s","لون الحكاكة"],["l","البريق"],["v","سطوح الانفصام"],["f","المكسر"],["h","القساوة"]],
 conclude:"نميّز المعادن بخصائصها الفيزيائية مجتمعة: اللون، والحكاكة، والبريق، والانفصام والمكسر، والقساوة؛ ولون الحكاكة أكثر ثباتًا من لون المعدن.",
 ans:["البيريت (أصفر نحاسي وحكاكته سوداء مخضرّة)، والغالينا (حكاكة أغمق)، والبيوتيت والملاكيت (حكاكة أفتح من لونه).","الكوارتز (7) > البيريت (6–6.5) > الملاكيت (3.5–4) > الكالسيت (3) > البيوتيت (2.5–3) > الغالينا (2.5) > الجبس والكبريت (2).","لا؛ فمنها المحاري (الكوارتز)، والمتعرّج غير المنتظم (البيريت والملاكيت والكبريت).","لأن قوى الترابط بين ذرّاتها متساوية تقريبًا في الاتجاهات جميعها، فلا توجد مستويات ضعف تنكسر عندها بانتظام."],
 build(S,A){A.say("توزّعي مع زميلاتك في مجموعات صغيرة وخذي العيّنات: اضغطي الزرّ.");const st={};let sel=null;
  A.ui.add(A.ui.btn("🧺 خذي العيّنات المعدنية",b=>{b.remove();A.step(0);lay();},"gold"));
  const sm=[];const bench=S.g();const box=S.label(400,30,"اختاري عيّنة",null,"#5d4037");box.style.display="none";
  function lay(){MIN8.forEach((m,i)=>{const g=S.g();S.tr(g,60+i*97,120);const pts=Array.from({length:7},(_,k)=>{const a=k/7*Math.PI*2,r=R(20,30);return (k?"L":"M")+Math.cos(a)*r+" "+Math.sin(a)*r*.8;}).join("")+"Z";S.path(pts,{fill:m[1],stroke:"#455a64","stroke-width":2},g);S.text(0,44,m[0],{"font-size":11},g);g.m=m;g.i=i;sm.push(g);st[i]={};
      S.tap(g,()=>pick(g));});A.say("تفحّصي العيّنات: اضغطي على عيّنة لوضعها على طاولة الاختبار.");box.style.display="";
    const sp=S.g();S.tr(sp,120,330);S.rect(-60,-24,120,48,{rx:4,fill:"#fafafa",stroke:"#9e9e9e"},sp);S.text(0,44,"لوح الحكاكة",{"font-size":11},sp);sp.mark=S.g(sp);
    const lens=S.g();S.tr(lens,290,340);S.circ(0,-10,22,{fill:"rgba(200,230,255,.4)",stroke:"#5d4037","stroke-width":5},lens);S.text(0,34,"عدسة",{"font-size":11},lens);
    const ham=S.g();S.tr(ham,370,340);S.emo(0,-10,"🔨",32,ham);S.text(0,30,"مطرقة",{"font-size":11},ham);
    const tools=TOOLH.map(([id,t,h],j)=>{const g=S.g();S.tr(g,450+j*85,340);S.rect(-36,-26,72,40,{rx:8,fill:"#fff",stroke:"#B8902A","stroke-width":2},g);S.text(0,-2,t,{"font-size":11},g);S.text(0,30,"H = "+h,{"font-size":10,fill:"#777"},g);g.tid=id;g.h=h;return g;});
    const tgt=()=>sel?[{g:sel,pad:10,fn:null}]:[];
    S.drag(lens,{back:true,oy:-10,targets:()=>sel?[{g:sel,pad:10,fn:async()=>{const s=st[sel.i];s.c=1;s.l=1;A.toast(sel.m[0]+": اللون "+sel.m[2]+"، البريق "+sel.m[4]);upd();}}]:[]});
    S.drag(sp,{back:true,targets:()=>sel?[{g:sel,pad:14,fn:async()=>{const s=st[sel.i];if(sel.m[7]>6.5){A.toast("المعدن أقسى من لوح الحكاكة؛ يخدش اللوح ويترك حكاكة عديمة اللون");}s.s=1;sp.mark.innerHTML="";S.path("M-40 0 q 40 -8 80 0",{stroke:mix("#ffffff",sel.m[1],.7),"stroke-width":8,"stroke-linecap":"round",fill:"none"},sp.mark);A.toast("لون الحكاكة: "+sel.m[3]);upd();}}]:[]});
    S.drag(ham,{back:true,targets:()=>sel?[{g:sel,pad:10,fn:async()=>{const s=st[sel.i];s.v=1;A.toast(sel.m[5]!=="لا يوجد"?"انكسرت على سطوح مستوية: "+sel.m[5]:"تكسّرت عشوائيًّا: مكسر "+sel.m[6]);upd();}}]:[]});
    tools.forEach(t=>S.drag(t,{back:true,targets:()=>sel?[{g:sel,pad:10,fn:async()=>{const s=st[sel.i];const scr=t.h>sel.m[7];if(t.tid==="glass"){const mScr=sel.m[7]>5.5;A.toast(mScr?"خدش المعدنُ الزجاجَ ← قساوته أكبر من 5.5":"لم يخدش المعدنُ الزجاج ← قساوته أقل من 5.5");(s.T=s.T||{})[t.tid]=!mScr;}else{A.toast(scr?t.querySelector("text").textContent+" خدش المعدن":"لم يخدش المعدن");(s.T=s.T||{})[t.tid]=scr;}upd();}}]:[]}));}
  function pick(g){sel=g;sm.forEach(x=>x.querySelector("path").setAttribute("stroke-width",x===g?5:2));box.set("العيّنة: "+g.m[0]+" — استخدمي العدسة، ولوح الحكاكة، والمطرقة، وأدوات القساوة");if(!A.is(1))A.step(1);}
  function hard(s){const T=s.T||{};const H={nail:2.5,coin:3.5,glass:5.5,knife:6};let lo=0,hi=99;for(const k in T){if(T[k])hi=Math.min(hi,H[k]);else lo=Math.max(lo,H[k]);}if(hi===2.5)return "أقل من 2.5";if(lo>=5.5&&!("knife" in T&&T.knife))return lo>=6?"أكبر من 6":"أكبر من 5.5";if(hi<99&&lo>0)return lo+" – "+hi;return null;}
  let done=0;function upd(){const s=st[sel.i];const h=hard(s);if(s.c&&s.s&&s.v&&h&&!s.rec){s.rec=1;const m=sel.m;A.rec({m:m[0],c:m[2],s:m[3],l:m[4],v:m[5],f:m[6],h});sel.querySelector("path").setAttribute("opacity",.6);done++;if(done===1)A.step(2);
      if(done===8){A.step(3);A.obs("اكتمل جدول الخصائص الفيزيائية للعيّنات الثماني.");}else A.say("أحسنتِ! اختاري عيّنة أخرى ("+done+"/8).");}
    else if(s.c&&s.s&&s.v&&!h)A.say("حدّدي القساوة: جرّبي أدوات القساوة حتى تحصري قساوة "+sel.m[0]+".");}
 }});

/* ---------- 4) السيليكا رباعية الأوجه (هرم السيليكا) ---------- */
BX.reg("e9-1-2-0",{cols:[["s","الشكل"],["si","عدد ذرّات Si"],["o","عدد ذرّات O"],["r","النسبة O : Si"]],
 conclude:"يتكوّن هرم السيليكا من ذرّة سيليكون في المركز تحيط بها أربع ذرّات أكسجين في رؤوس الهرم (SiO₄)⁴⁻، وترتبط الأهرام بمشاركة ذرّات الأكسجين لتكوّن أشكالًا مختلفة.",
 ans:["في مركز الهرم، محاطة بأربع ذرّات أكسجين في الرؤوس.","الهرمان المزدوجان: 2 سيليكون و7 أكسجين، النسبة 7 : 2 (3.5 : 1).","الهرم المفرد 4 : 1، والمزدوج 3.5 : 1؛ أي تقلّ نسبة الأكسجين عند المشاركة.","سلسلة من 3 أهرام: 3 سيليكون و10 أكسجين (2 أكسجين مشتركة)، النسبة 10 : 3 (≈ 3.3 : 1)."],
 build(S,A){const net=S.g();const s=60,x0=300,y0=300,h=s*Math.sqrt(3)/2;const tri=(x,y,up)=>"M"+x+" "+y+" L"+(x+s)+" "+y+" L"+(x+s/2)+" "+(up?y-h:y+h)+"Z";
  const T=[[x0,y0,1],[x0+s/2,y0-h,0],[x0+s,y0,1],[x0+s*1.5,y0-h,0]];const pieces=[];
  A.say("ارسمي على قطعة الكرتون مثلّثات متساوية الأضلاع (طول الضلع 15cm): اضغطي على الكرتون.");const card=S.rect(220,150,360,220,{rx:6,fill:"#f3e5c0",stroke:"#bcaaa4"});S.text(400,140,"قطعة كرتون",{"font-size":13});
  S.tap(card,async()=>{if(pieces.length)return;for(const [x,y,u] of T){pieces.push(S.path(tri(x,y,u),{fill:"#fff8e1",stroke:"#5d4037","stroke-width":2.5}));await sleep(200);}S.path("M"+x0+" "+y0+" l -14 -20 l 14 -10",{stroke:"#5d4037","stroke-dasharray":"5 4",fill:"none","stroke-width":2});S.text(x0+s/2,y0+18,"15 cm",{"font-size":11,direction:"ltr"});A.step(0);
    A.say("قصّي حول الشكل الخارجي: اضغطي المقصّ.");A.ui.add(A.ui.btn("✂️ قصّي حول الشكل",async b=>{b.remove();card.remove();A.step(1);A.say("اطوي على امتداد الخطوط المتّصلة لتشكيل الهرم، والصقي الأطراف: اضغطي «اطوي».");
      A.ui.add(A.ui.btn("📐 اطوي والصقي",async b2=>{b2.remove();pieces.forEach(p=>p.remove());S.layer.querySelectorAll("path,text").forEach(e=>{if(e.getAttribute("stroke-dasharray")||e.textContent==="15 cm")e.remove();});fold();},"gold"));},"gold"));});
  let tet;function fold(){const poly=hull(SOLIDS.tetra[1]);let n=0;tet=solid3D(S,null,400,240,100,poly,{atoms:true,center:11,col0:"#c8a46b",col1:"#fff3e0",onMark:(m,k)=>{if(m==="v"&&k===4){A.step(3);A.obs("رُسمت ذرّات الأكسجين الأربع في رؤوس الهرم (الزوايا المجسّمة).");more();}}});A.step(2);
    A.ui.slider("↻ تدوير الهرم",0,628,1,60,v=>tet.set(v/100,tet.pitch));A.say("ارسمي ذرّات الأكسجين على رؤوس الهرم: اضغطي على الرؤوس الأربعة.");}
  function more(){A.ui.clear();A.ui.add(A.ui.btn("🔁 كرّري لصنع هرمين آخرين",b=>{b.remove();S.clear();S.room();A.step(4);chain();},"gold"));}
  function chain(){A.say("شكّلي سلسلة منفردة من ثلاثة أهرام: اسحبي كل هرم إلى موقعه في السلسلة (يتشارك الهرمان المتجاوران ذرّة أكسجين).");
    const slots=[0,1,2].map(i=>{const x=250+i*120,y=220;const g=S.g();S.path("M"+(x-60)+" "+(y+35)+" L"+(x+60)+" "+(y+35)+" L"+x+" "+(y-70)+"Z",{fill:"none",stroke:"#B8902A","stroke-width":2,"stroke-dasharray":"6 4"},g);g.x=x;g.y=y;return g;});let k=0;
    for(let i=0;i<3;i++){const p=S.g();S.tr(p,170+i*230,440,0,.6);S.path("M-60 35 L60 35 L0 -70Z",{fill:"#f3e5c0",stroke:"#5d4037","stroke-width":3},p);S.circ(0,0,10,{fill:"#1565c0"},p);[[-60,35],[60,35],[0,-70],[0,10]].forEach(([x,y],j)=>S.circ(x,y,j===3?0:9,{fill:"#e53935"},p));
      S.drag(p,{back:true,targets:()=>slots.filter(s=>!s.f).map(s=>({g:s,pad:10,fn:async()=>{s.f=1;await S.moveTo(p,s.x,s.y,250);S.tr(p,s.x,s.y,0,1);p._off=true;if(++k===3){A.step(5);A.rec({s:"هرم مفرد SiO₄",si:1,o:4,r:"4 : 1"});A.rec({s:"هرمان مزدوجان Si₂O₇",si:2,o:7,r:"7 : 2"});A.rec({s:"سلسلة منفردة من 3 أهرام",si:3,o:10,r:"10 : 3"});A.obs("في السلسلة المنفردة يشارك كل هرم ذرّتَي أكسجين مع الهرمين المجاورين.");}return "stay";}}))});}}
 }});

/* ---------- 5) إنتاج العالم من بعض المعادن ---------- */
const PROD=[["الملاكيت",[19.3,20.4,20.0,20.6,20.7]],["الماس",[0.00002497,0.00002457,0.00002966,0.00002941,0.00002673]],["الفلسبار",[29.963,33.619,29.759,31.929,31.856]],["الذهب",[0.00315,0.00325,0.00336,0.00347,0.00335]],["الهيماتيت والماغنتيت",[3359,3319,3360,2945,3040]],["الغالينا",[5.0,4.9,4.5,4.5,4.7]],["الأباتيت",[264,271,255,230,226]],["الفضّة",[0.028144,0.028132,0.027146,0.027961,0.026261]]];
BX.reg("e9-1-2-1",{cols:[["m","المعدن"],["y15","2015"],["y16","2016"],["y17","2017"],["y18","2018"],["y19","2019"]],chart:{x:"m",y:"y19",type:"bar",xl:"المعدن",yl:"إنتاج 2019 (مليون طن)"},
 conclude:"تتفاوت كمّيات إنتاج المعادن عالميًّا تفاوتًا كبيرًا؛ فخامات الحديد (الهيماتيت والماغنتيت) الأكثر إنتاجًا، والمعادن النفيسة كالذهب والماس الأقل، وتسهم المعادن كالفوسفات في دعم الاقتصاد الوطني الأردني.",
 ans:["لأنها خامات الحديد، أكثر الفلزّات استخدامًا في البناء والصناعة، ولوفرتها في القشرة الأرضية.","مجموعة الفوسفات.","226 مليون طن × 62 دينارًا = 14012 مليون دينار (نحو 14 مليار دينار أردني).","يوجد في الأردن: الأباتيت (الفوسفات)، والملاكيت (خامات النحاس)، والفلسبار؛ إضافة إلى معادن أخرى كالجبس والكاولين والسيليكا."],
 build(S,A){const x0=40,y0=60,cw=[150,90,90,90,90,90];const head=["المعدن","2015","2016","2017","2018","2019"];const tbl=S.g();
  head.forEach((h,j)=>{const x=760-cw.slice(0,j+1).reduce((a,b)=>a+b,0);S.rect(x,y0,cw[j],26,{fill:"#efe7da",stroke:"#8d6e63"},tbl);S.text(x+cw[j]/2,y0+18,h,{"font-size":12},tbl);});
  const rows=PROD.map(([m,v],i)=>{const y=y0+26+i*34;const g=S.g(tbl);const vals=[m,...v.map(String)];vals.forEach((t,j)=>{const x=760-cw.slice(0,j+1).reduce((a,b)=>a+b,0);S.rect(x,y,cw[j],34,{fill:"#fff",stroke:"#bcaaa4"},g);S.text(x+cw[j]/2,y+22,t,{"font-size":j?10:12},g);});g.i=i;return g;});
  S.text(400,y0-14,"كمّيات بعض المعادن المنتجة في العالم (مليون طن) 2015–2019",{"font-size":14,fill:"#5d4037"});
  A.say("ادرسي الجدول: اضغطي على كل صفّ لتمثيله بيانيًّا في الجدول والرسم أسفل الصفحة.");const seen=new Set();
  rows.forEach(g=>S.tap(g,()=>{if(seen.has(g.i))return;seen.add(g.i);g.querySelectorAll("rect").forEach(r=>r.setAttribute("fill","#fff8e1"));const [m,v]=PROD[g.i];A.rec({m,y15:v[0],y16:v[1],y17:v[2],y18:v[3],y19:v[4]});if(seen.size===1)A.step(0);
    if(seen.size===8){A.step(1);A.obs("الهيماتيت والماغنتيت الأكبر إنتاجًا (آلاف ملايين الأطنان)، والماس الأقل.");calc();}}));
  function calc(){quiz(A,[["ما مجموعة المعادن التي ينتمي إليها الأباتيت؟",[["p","الفوسفات"],["s","السيليكات"],["c","الكربونات"]],"p"],["إنتاج العالم من الفوسفات عام 2019 = 226 مليون طن، وسعر الطن 62 دينارًا. ما ثمن الإنتاج؟",[["a","14012 مليون دينار"],["b","288 مليون دينار"],["c","1401.2 مليون دينار"]],"a","اضربي 226 × 62"]],
    ()=>pickMany(A,"أيّ المعادن المذكورة في الجدول مكتشفة في الأردن؟",["الأباتيت (الفوسفات)","الملاكيت (النحاس)","الفلسبار","الماس","الفضّة"],["الأباتيت (الفوسفات)","الملاكيت (النحاس)","الفلسبار"],()=>A.step(2)));}
 }});

/* ---------- 6) قياس كمّية الأمطار الهاطلة ---------- */
const RAIN=[["السبت",85],["الأحد",62],["الإثنين",101],["الثلاثاء",94],["الأربعاء",60],["الخميس",5],["الجمعة",0]];
BX.reg("e9-2-1-0",{cols:[["d","اليوم"],["r","كمّية الأمطار (mm)"]],chart:{x:"d",y:"r",type:"bar",xl:"أيام الأسبوع",yl:"كمّية الأمطار (mm)"},
 conclude:"يقيس مقياس المطر كمّية الهطل بالمليمتر، ونحسب المتوسّط بقسمة المجموع على عدد الأيام: (85+62+101+94+60+5+0) ÷ 7 ≈ 58.1 mm.",
 ans:["(رسم بالأعمدة لأيام الأسبوع وكمّيات المطر).","المتوسّط = 407 ÷ 7 ≈ 58.1 mm.","حتى لا تحجبه الأشجار والمباني أو تتسرّب إليه مياه الجريان، فيقيس الهطل المباشر بدقّة.","ستكون الكمّيات أكبر بكثير؛ لغزارة الأمطار في المناطق الاستوائية.","بجمع كمّيات الهطل في السنة ثم حساب متوسّطها لعدد من السنوات."],
 build(S,A){const g=S.g();S.tr(g,400,392);S.rect(-40,-250,80,250,{fill:S.lg([["#fff",0,.5],["#e3f2fd",1,.4]]),stroke:"#78909c","stroke-width":3},g);S.path("M-60 -250 L60 -250 L20 -200 L-20 -200Z",{fill:"#b0bec5",stroke:"#78909c"},g);
  const wat=S.rect(-36,0,72,0,{fill:"#64b5f6",opacity:.8},g);for(let mm=0;mm<=110;mm+=10){const y=-mm*2;S.line(40,y,52,y,{stroke:"#263238"},g);if(mm%20===0)S.text(66,y+4,String(mm),{"font-size":11},g);}S.text(0,22,"مقياس المطر (mm)",{"font-size":12},g);
  const cloud=S.emo(400,70,"🌧️",60);cloud.style.display="none";let d=0;const rec=[];
  const day=()=>{if(d>=7)return;A.say("يوم "+RAIN[d][0]+": اضغطي «يهطل المطر» ثم اقرئي القياس.");A.ui.clear();A.ui.add(A.ui.btn("🌧️ يهطل المطر — "+RAIN[d][0],async b=>{b.disabled=true;cloud.style.display=RAIN[d][1]?"":"none";const drops=S.g();if(RAIN[d][1])for(let i=0;i<30;i++){const c=S.line(0,0,0,10,{stroke:"#42a5f5","stroke-width":2},drops);const x=R(300,500),y0=R(90,140);S.tween(800,t=>{c.setAttribute("x1",x);c.setAttribute("x2",x-2);c.setAttribute("y1",y0+t*60);c.setAttribute("y2",y0+t*60+10);});}
      await S.tween(1000,t=>{const v=RAIN[d][1]*t;wat.setAttribute("y",-v*2);wat.setAttribute("height",v*2);});drops.remove();cloud.style.display="none";
      const v=RAIN[d][1];const opts=[v,v+10,Math.max(0,v-10)+(v<10?20:0)].filter((x,i,a)=>a.indexOf(x)===i).sort(()=>Math.random()-.5);const grp=A.ui.group("اقرئي مقياس المطر:");opts.forEach(o=>grp.append(A.ui.btn(o+" mm",()=>{if(o!==v){A.toast("اقرئي مستوى الماء على التدريج بدقّة");return;}A.rec({d:RAIN[d][0],r:v});if(!d)A.step(0);d++;wat.setAttribute("height",0);if(d===7){A.step(1);A.ui.clear();A.ui.add(A.ui.btn("🧮 احسبي المتوسّط",b2=>{b2.disabled=true;A.obs("المجموع = 407 mm، المتوسّط = 407 ÷ 7 ≈ 58.1 mm");A.step(2);},"gold"));}else day();},"g")));},"gold"));};
  day();
 }});

/* ---------- 7) حساب الموازنة المائية لمسطّح مائي ---------- */
const MON=["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"];
const PR=[16.764,19.812,42.164,62.23,80.772,52.324,42.418,36.83,39.116,34.036,26.416,17.78],EV=[0,0,0,64.77,126.746,207.01,103.124,36.83,33.02,32.004,13.462,0];
BX.reg("e9-2-1-1",{cols:[["m","الشهر"],["p","الهطل (mm)"],["e","التبخّر (mm)"],["d","التغيّر (mm)"]],chart:{x:"m",y:["p","e"],xl:"الشهر",yl:"mm",names:{p:"الهطل",e:"التبخّر"}},
 conclude:"الموازنة المائية = المدخلات − المخرجات؛ مجموع الهطل 470.662 mm ومجموع التبخّر 616.966 mm، فالتغيّر السنوي ≈ −146.3 mm (عجز مائي).",
 ans:["(رسم خطّي أو بالأعمدة للهطل والتبخّر لكل شهر).","كمّية الهطل، ودرجة الحرارة والتبخّر، والجريان السطحي الداخل والخارج، والتسرّب إلى باطن الأرض، والاستهلاك البشري.","470.662 − 616.966 = −146.304 mm (نقص في المياه المخزّنة).","تشرين الثاني: 26.416 − 13.462 = +12.954 mm؛ شباط: 19.812 − 0 = +19.812 mm؛ أي أن الزيادة في شباط أكبر.","يبقى مستوى الماء ثابتًا تقريبًا (موازنة متعادلة) إذا أُهملت العوامل الأخرى."],
 build(S,A){const x0=40,y0=380,w=60;S.line(x0,y0,x0+12*w,y0,{stroke:"#555","stroke-width":2});for(let v=0;v<=200;v+=50){S.line(x0,y0-v*1.4,x0+12*w,y0-v*1.4,{stroke:"#ddd"});S.text(x0-4,y0-v*1.4+4,String(v),{"font-size":10,"text-anchor":"end"});}
  const lake=S.g();S.ell(680,90,90,26,{fill:"#64b5f6",opacity:.8},lake);S.text(680,95,"البحيرة",{"font-size":13,fill:"#fff"},lake);
  A.say("ارسمي بيانيًّا الهطل والتبخّر لكل شهر: اضغطي على أعمدة الأشهر بالترتيب.");let k=0;
  MON.forEach((m,i)=>{const x=x0+i*w;const hit=S.rect(x+2,y0-300,w-4,300,{fill:"#fff",opacity:.01});S.text(x+w/2,y0+16,m.split(" ")[0].slice(0,6),{"font-size":9});S.tap(hit,async()=>{if(i!==k){A.toast("بالترتيب: "+MON[k]);return;}k++;
    const a=S.rect(x+8,y0,20,0,{fill:"#1565c0"}),b=S.rect(x+32,y0,20,0,{fill:"#ff7043"});await S.tween(400,t=>{a.setAttribute("y",y0-PR[i]*1.4*t);a.setAttribute("height",PR[i]*1.4*t);b.setAttribute("y",y0-EV[i]*1.4*t);b.setAttribute("height",EV[i]*1.4*t);});
    A.rec({m,p:PR[i],e:EV[i],d:+(PR[i]-EV[i]).toFixed(3)});if(k===12){A.step(0);A.step(1);calc();}});});
  S.rect(560,170,14,10,{fill:"#1565c0"});S.text(600,180,"الهطل",{"font-size":11});S.rect(640,170,14,10,{fill:"#ff7043"});S.text(680,180,"التبخّر",{"font-size":11});
  function calc(){quiz(A,[["مقدار التغيّر في المياه المخزّنة خلال السنة = مجموع الهطل − مجموع التبخّر:",[["a","−146.304 mm (عجز)"],["b","+146.304 mm (فائض)"],["c","1087.6 mm"]],"a","470.662 − 616.966"],["قارني: أيّ الشهرين كانت الزيادة فيه أكبر؟ (تشرين الثاني: 26.416−13.462، شباط: 19.812−0)",[["f","شباط (+19.812 mm)"],["n","تشرين الثاني (+12.954 mm)"]],"f"]],()=>{A.step(2);A.obs("البحيرة في حالة عجز مائي سنوي ≈ 146.3 mm.");});}
 }});

/* ---------- 8) علاقة مياه الأمطار بالمياه الجوفية ---------- */
BX.reg("e9-2-2-0",{cols:[["t","الزمن"],["o","ملاحظة حركة الماء"]],
 conclude:"تتسرّب مياه الأمطار خلال الطبقات المسامية (الرمل ثم الحصى) وتتجمّع في الأسفل مكوّنة نطاق التشبّع (المياه الجوفية)، ويرتفع مستواها بزيادة الهطل.",
 ans:["يتسرّب الماء إلى الأسفل خلال فراغات الرمل، ثم يمرّ بسرعة أكبر خلال الحصى، ويتجمّع في قاع الكأس مالئًا الفراغات بين الحصى.","تمثّل الكأس باطن الأرض: الماء يرتشح عبر التربة والصخور المسامية ويتجمّع في الطبقة المسامية فوق طبقة كتيمة مكوّنًا خزّانًا جوفيًّا.","لا تتسرّب (أو تتسرّب ببطء شديد)؛ لأن الطين قليل النفاذية فيتجمّع الماء فوقه."],
 build(S,A){const bx=400,by=392,W=220,H=260;const cm=20;/* 1cm = 20px */const g=S.g();S.rect(bx-W/2,by-H,W,H,{fill:"rgba(227,242,253,.35)",stroke:"#78909c","stroke-width":4},g);
  const gravel=S.g(),sand=S.g(),water=S.g(),clay=S.g();const ru=S.ruler(bx+W/2+30,by,H,{rot:-90,n:13,step:1,sub:1});
  const water0=S.rect(bx-W/2+3,by,W-6,0,{fill:"#1e88e5",opacity:.45});
  let gL=0,sL=0;A.say("أضيفي كمّية من الحصى إلى الكأس لتشكيل طبقة سُمكها 5cm: اسحبي وعاء الحصى.");
  const bowl=(x,t,c)=>{const b=S.g();S.tr(b,x,470);S.path("M-34 -30 L34 -30 L24 0 L-24 0Z",{fill:"#8d6e63"},b);for(let i=0;i<10;i++)S.circ(R(-26,26),-30+R(-8,2),R(3,6),{fill:c},b);S.text(0,18,t,{"font-size":11},b);return b;};
  const gb=bowl(110,"حصى","#9e9e9e"),sb=bowl(220,"رمل جافّ","#e6c98a");
  S.drag(gb,{back:true,targets:()=>gL===0?[{g,pad:10,fn:async()=>{gL=5;for(let i=0;i<120;i++){S.ell(R(bx-W/2+8,bx+W/2-8),by-R(4,5*cm-4),R(5,9),R(4,7),{fill:["#9e9e9e","#757575","#bdbdbd"][i%3],stroke:"#616161","stroke-width":.5},gravel);if(i%20===0)await sleep(30);}A.step(0);A.say("غطّي الحصى بطبقة من الرمل الجافّ سُمكها 3cm: اسحبي وعاء الرمل.");}}]:[]});
  S.drag(sb,{back:true,targets:()=>gL&&!sL?[{g,pad:10,fn:async()=>{sL=3;const top=by-5*cm;S.rect(bx-W/2+3,top-3*cm,W-6,3*cm,{fill:"#e6c98a"},sand);for(let i=0;i<300;i++)S.circ(R(bx-W/2+5,bx+W/2-5),top-R(2,3*cm-2),1.4,{fill:"#c9a25f"},sand);A.step(1);A.say("رشّي الماء على الرمل من ارتفاع 10cm: اسحبي المرشّ إلى المؤشّر فوق الكأس.");sp();}}]:[]});
  function sp(){const mk=S.line(bx-60,by-8*cm-10*cm,bx+60,by-8*cm-10*cm,{stroke:"#B8902A","stroke-width":3,"stroke-dasharray":"6 4"});S.text(bx+90,by-18*cm+4,"10 cm",{"font-size":11,direction:"ltr"});
    const can=S.g();S.tr(can,640,440);S.emo(0,-20,"🚿",44,can);S.text(0,20,"مرشّ ماء",{"font-size":11},can);
    S.drag(can,{back:true,targets:()=>[{box:[bx-80,by-18*cm-40,160,60],pad:10,fn:async()=>{await S.moveTo(can,bx,by-18*cm-20,250);A.step(2);await rain();return false;}}]});}
  async function rain(){A.say("تتبّعي حركة الماء خلال طبقتي الرمل والحصى (انظري من الجانب).");const top=by-8*cm;const front=S.rect(bx-W/2+3,top,W-6,0,{fill:"#1e88e5",opacity:.35});
    for(let k=0;k<3;k++){const drops=S.g();for(let i=0;i<40;i++){const x=R(bx-90,bx+90);const l=S.line(x,by-18*cm,x,by-18*cm+8,{stroke:"#42a5f5","stroke-width":2},drops);S.tween(600,t=>{l.setAttribute("y1",by-18*cm+t*(10*cm-10));l.setAttribute("y2",by-18*cm+t*(10*cm-10)+8);});}await sleep(650);drops.remove();}
    A.rec({t:"البداية",o:"يبتلّ سطح الرمل ويغمق لونه"});await S.tween(1500,t=>{front.setAttribute("height",3*cm*t);});A.rec({t:"بعد قليل",o:"يتسرّب الماء خلال فراغات الرمل إلى الأسفل"});
    await S.tween(800,t=>{front.setAttribute("height",3*cm+5*cm*t);});A.rec({t:"لاحقًا",o:"يمرّ الماء بسرعة خلال الحصى ويتجمّع في قاع الكأس"});front.setAttribute("height",0);front.setAttribute("y",top);
    await S.tween(1500,t=>{water0.setAttribute("y",by-2.5*cm*t);water0.setAttribute("height",2.5*cm*t);});S.label(bx-W/2-70,by-1.2*cm,"نطاق التشبّع",null,"#1565c0");A.rec({t:"النهاية",o:"تتجمّع المياه في الأسفل مالئة الفراغات بين الحصى (مياه جوفية)"});A.step(3);
    A.ui.add(A.ui.btn("🧪 جرّبي: أضيفي طبقة طين سميكة فوق الرمل",b=>{b.disabled=true;S.rect(bx-W/2+3,by-8*cm-2*cm,W-6,2*cm,{fill:"#8d6e63"},clay);S.label(bx,by-11*cm,"الماء يتجمّع فوق الطين ولا يتسرّب تقريبًا",null,"#5d4037");A.obs("الطين قليل النفاذية؛ فيتجمّع الماء فوقه.");},"g"));}
 }});

/* ---------- 9) نمذجة المسامية والنفاذية ---------- */
const SED=[["الرمل","#e6c98a",3,40],["الحصى","#9e9e9e",1,9],["الطين","#8d6e63",45,600]];
BX.reg("e9-2-2-1",{cols:[["m","الرسوبيات"],["a","زمن بدء التدفّق (s)"],["b","زمن انتهاء التدفّق (s)"]],chart:{x:"m",y:"b",type:"bar",xl:"الرسوبيات",yl:"زمن انتهاء التدفّق (s)"},
 conclude:"كلما كبر حجم الحبيبات زادت الفراغات المتّصلة بينها فزادت النفاذية: الحصى أكثرها نفاذية، ثم الرمل، والطين أقلّها.",
 ans:["تصاعديًّا حسب القدرة على تمرير الماء: الطين < الرمل < الحصى.","لاختلاف حجم الحبيبات وحجم الفراغات بينها ومدى اتّصالها؛ فحبيبات الطين دقيقة جدًّا وفراغاتها صغيرة غير متّصلة جيدًا.","علاقة طردية: كلما زاد حجم الحبيبات زادت النفاذية.","لا؛ الغرانيت صخر ناري متماسك قليل المسامية والنفاذية، فلا يمرّ الماء خلاله تقريبًا (أو يمرّ ببطء شديد عبر الشقوق)."],
 build(S,A){const F=[0,1,2].map(i=>{const x=180+i*220;const g=S.g();S.tr(g,x,392);S.flask(0,0,1,{par:g,col:"#bbdefb"});const fn=S.g(g);S.path("M-60 -170 L60 -170 L12 -120 L12 -95 L-12 -95 L-12 -120Z",{fill:"rgba(255,255,255,.5)",stroke:"#78909c","stroke-width":3},fn);g.fn=fn;g.cl=null;g.i=i;S.text(0,30,"قمع ودورق "+(i+1),{"font-size":12},g);return g;});
  const cloth=S.g();S.tr(cloth,70,460);S.rect(-26,-20,52,30,{rx:4,fill:"#fafafa",stroke:"#bdbdbd"},cloth);S.text(0,26,"قماش + أربطة",{"font-size":10},cloth);let c=0;
  A.say("غلّفي القمع من الداخل بقطعة القماش القطنية وثبّتيها بالأربطة، وضعيه فوق الدورق: اسحبي القماش إلى كل قمع.");
  S.drag(cloth,{back:true,targets:()=>F.filter(f=>!f.cl).map(f=>({g:f.fn,pad:10,fn:async()=>{f.cl=S.path("M-56 -166 L56 -166 L10 -121 L-10 -121Z",{fill:"#fafafa",opacity:.9},f.fn);if(++c===3){S.off(cloth,true);A.step(0);sedStep();}}}))});
  let cur=0;const w=S.watch(70,150);
  function sedStep(){const s=SED[cur];A.say("ضعي 100mL من "+s[0]+" في القمع "+(cur+1)+": اسحبي الكأس.");const b=S.beaker(0,0,60,60,{lvl:.8,col:s[1],label:s[0]+" 100mL"});S.tr(b.g,90,300);
    S.drag(b.g,{back:true,oy:-30,targets:()=>[{g:F[cur].fn,pad:30,fn:async()=>{await S.pour(b.g,F[cur]._x+50,180,-80,()=>sleep(300));b.g.remove();const top=F[cur];for(let i=0;i<70;i++)S.circ(R(-44,44)*(1-R(0,.4)),-166+R(4,40),s[0]==="الحصى"?R(4,7):s[0]==="الرمل"?1.8:1.2,{fill:s[1]},top.fn);if(!cur)A.step(1);pour();}}]});}
  function pour(){const s=SED[cur];A.say("اسكبي ببطء 100mL من الماء فوق "+s[0]+"، واضغطي ساعة التوقيت لحظة بدء التدفّق ثم لحظة انتهائه.");const cy=S.cylinder(0,0,90,{w:30,col:"#64b5f6",lvl:.8,label:"100 mL"});S.tr(cy.g,90,470);
    S.drag(cy.g,{back:true,oy:-45,targets:()=>[{g:F[cur].fn,pad:30,fn:async()=>{await S.pour(cy.g,F[cur]._x+50,170,-80,()=>cy.to(0,700));cy.g.remove();if(!cur)A.step(2);run();}}]});}
  function run(){const s=SED[cur];const f=F[cur];const t0=performance.now();const sp=s[3]>100?40:4;let a=null,b=null,started=false,ended=false;
    const drip=S.g(f);const L=S.line(0,-95,0,-95,{stroke:"#1e88e5","stroke-width":4},drip);
    const tick=()=>{const t=(performance.now()-t0)/1000*sp;w.set(t);started=t>=s[2];ended=t>=s[3];L.setAttribute("y2",started&&!ended?-20:-95);if(!b)requestAnimationFrame(tick);};requestAnimationFrame(tick);
    A.ui.clear();const g=A.ui.group("⏱️ ساعة التوقيت (مسرَّعة ×"+sp+"):");g.append(A.ui.btn("▶ بدأ التدفّق",bt=>{if(!started){A.toast("لم يبدأ الماء بالتدفّق بعد");return;}a=Math.round(s[2]*R(.95,1.1));bt.disabled=true;},"g"),A.ui.btn("⏹ انتهى التدفّق",bt=>{if(!a){A.toast("سجّلي بدء التدفّق أولًا");return;}if(!ended){A.toast("ما زال الماء يتدفّق");return;}b=Math.round(s[3]*R(.95,1.05));bt.disabled=true;
      A.rec({m:s[0],a,b});if(!cur)A.step(3);cur++;A.ui.clear();if(cur<3){A.say("كرّري الخطوات مستخدمة "+SED[cur][0]+".");sedStep();}else{A.step(4);A.obs("أسرع تدفّق في الحصى، ثم الرمل، وأبطؤه في الطين.");}},"gold"));}
 }});
})();
