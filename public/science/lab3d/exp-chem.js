/* تجارب الكيمياء ثلاثية الأبعاد */
Lab3D.register("flame",{title:"اختلاف لون اللهب الصادر عن ذرّات العناصر",subject:"الكيمياء",grade:"التاسع والعاشر",book:"كتاب الأنشطة",icon:"🔥",desc:"كشف اللهب لأملاح الليثيوم والصوديوم والبوتاسيوم والكالسيوم والنحاس",
 question:"هل تُصدر ذرّات العناصر المختلفة ألوانًا مختلفة عند تسخينها في اللهب؟ ولماذا؟",
 goal:"تمييز لون اللهب الصادر عن ذرّات العناصر المختلفة، وربطه بانتقال الإلكترونات بين مستويات الطاقة.",
 mats:"موقد بنسن، سلك بلاتين (نيكروم)، كلوريد الليثيوم، كلوريد الصوديوم، كلوريد البوتاسيوم، كلوريد الكالسيوم، كلوريد النحاس (II)، حمض الهيدروكلوريك المخفّف.",
 safety:"اربطي الشعر، وأبعدي الأوراق عن اللهب، ولا تلمسي الحمض أو السلك الساخن.",
 predict:{q:"ماذا تتوقّعين أن يحدث للون اللهب عند إدخال أملاح عناصر مختلفة فيه؟",o:["يبقى لون اللهب أزرق دائمًا","يتغيّر اللون، ولكل عنصر لون مميّز","تعطي جميع الأملاح اللون نفسه","ينطفئ اللهب"],right:1},
 steps:[{k:"burn",t:"أشعلي موقد بنسن بالضغط على صمّام الغاز الأحمر."},{k:"clean",t:"نظّفي السلك بغمسه في حمض الهيدروكلوريك (الكأس)."},{k:"salt",t:"اضغطي على أحد الأملاح ليُغمس فيه السلك ثم يُدخَل في اللهب."},{k:"name",t:"اختاري لون اللهب الذي شاهدتِه، فيُسجَّل في الجدول."},{k:"all",t:"كرّري مع الأملاح الخمسة (ونظّفي السلك بين كل ملح وآخر)."}],
 cols:[["salt","الملح"],["ion","الأيون الفلزّي"],["seen","لون اللهب الذي سجّلتِه"],["ok","التحقّق"]],
 conclude:[{q:"لماذا تختلف ألوان اللهب باختلاف العنصر؟",o:["لأن كتل الذرّات مختلفة","لأن لكل عنصر مستويات طاقة خاصة، فتطلق إلكتروناته عند عودتها فوتونات بطاقات (ألوان) مميّزة","لأن الأملاح تحترق بسرعات مختلفة","بسبب لون الملح الصلب"],a:1,why:"تمتصّ الإلكترونات الطاقة فتنتقل إلى مستويات أعلى (إثارة)، وعند عودتها تطلق فوتونات طاقتها تساوي فرق الطاقة بين المستويين، وهو مميّز لكل عنصر."},
  {q:"لماذا ننظّف السلك بالحمض بين كل ملح وآخر؟",o:["لتبريده فقط","لإزالة بقايا الملح السابق حتى لا يختلط لونه باللون الجديد","لزيادة حرارة اللهب","لأن الحمض يعطي لونًا"],a:1,why:"بقايا الملح السابق (خاصة الصوديوم) تعطي لونها فتغطّي على لون العنصر الجديد."},
  {q:"عنصر يعطي لهبًا أخضر مزرقًّا، هو على الأرجح:",o:["الصوديوم","الليثيوم","النحاس","البوتاسيوم"],a:2,why:"أيونات النحاس تعطي لونًا أخضر مزرقًّا مميّزًا."},
  {q:"يُستفاد من كشف اللهب في:",o:["الكشف عن بعض العناصر وصناعة الألعاب النارية","قياس الكتلة","تحضير الحموض","فصل المخاليط"],a:0,why:"لكل عنصر بصمة لونية، فتُستخدم في التحليل وفي ألوان الألعاب النارية."}],
 scene:{yaw:-.25,pitch:.38,dist:8.2,ty:1.1},
 tools:API=>Lab3D._flameTools?Lab3D._flameTools(API):null,
 setup(L,A){const T=L.T;
  const SALTS=[["كلوريد الليثيوم","LiCl","Li⁺","#ff1744","أحمر قرمزي"],["كلوريد الصوديوم","NaCl","Na⁺","#ffb300","أصفر برتقالي"],["كلوريد البوتاسيوم","KCl","K⁺","#c39bff","بنفسجي فاتح (ليلكي)"],["كلوريد الكالسيوم","CaCl₂","Ca²⁺","#ff6d00","برتقالي محمرّ"],["كلوريد النحاس (II)","CuCl₂","Cu²⁺","#00e5a0","أخضر مزرق"]];
  const COLORS=[["أحمر قرمزي","#ff1744"],["أصفر برتقالي","#ffb300"],["بنفسجي فاتح (ليلكي)","#c39bff"],["برتقالي محمرّ","#ff6d00"],["أخضر مزرق","#00e5a0"],["أزرق (لا تغيير)","#4aa3ff"]];
  const bu=L.add(L.burner());bu.g.position.set(0,0,0);L.tick((dt,t)=>bu.tick(t));
  const knobRing=L.ring(bu.knob,.35);
  // الأملاح
  const wg=SALTS.map((s,i)=>{const w=L.watchGlass(s[1]==="CuCl₂"?"#4fc3a1":"#f4f4f4");const a=-.95+i*.47;w.g.position.set(2.8*Math.cos(a)+.6,0,2.0*Math.sin(a)+.9);L.add(w);
    const lb=L.sprite(s[1],{scale:.26,border:"#B8902A"});lb.position.set(0,.55,0);w.g.add(lb);return w;});
  // كأس الحمض
  const acid=L.beaker({r:.38,h:.8,color:"#d8f3ff",level:.55,op:.35});acid.g.position.set(-2.2,0,1.1);L.add(acid);const al=L.sprite("HCl مخفّف",{scale:.24,border:"#c2410c"});al.position.y=1.15;acid.g.add(al);
  // السلك ومقبضه
  const wire=new T.Group();const handle=new T.Mesh(new T.CylinderGeometry(.06,.06,.9,16),L.M.std("#8d6e63"));handle.rotation.z=Math.PI/2.4;handle.position.set(.55,.2,0);wire.add(handle);
  const rod=new T.Mesh(new T.CylinderGeometry(.012,.012,1,8),L.M.std("#c0c0c0",{metalness:.9,roughness:.2}));rod.rotation.z=Math.PI/2.4;rod.position.set(-.38,-.18,0);wire.add(rod);
  const loop=new T.Mesh(new T.TorusGeometry(.06,.012,8,20),L.M.std("#d0d0d0",{metalness:.9,roughness:.2}));loop.position.set(-.86,-.38,0);wire.add(loop);
  const tip=new T.Object3D();tip.position.copy(loop.position);wire.add(tip);wire.position.set(-1.2,1.2,-.8);L.root.add(wire);
  const home=wire.position.clone();const tipOff=()=>tip.getWorldPosition(new T.Vector3()).sub(wire.position);
  const glowSalt=new T.Mesh(new T.SphereGeometry(.05,10,8),L.M.std("#fff"));glowSalt.visible=false;loop.add(glowSalt);
  let busy=false,dirty=null,cur=null,seenSet=new Set();const rings=wg.map(w=>L.ring(w.g,.9));rings.forEach(r=>r.off());const acidRing=L.ring(acid.g,1.5);acidRing.off();
  const moveTipTo=(p,d=.9,hgt=.6)=>{const target=p.clone().sub(tipOff());return L.arc(wire,target,d,hgt);};
  function hints(){knobRing[bu.on?"off":"on"]();acidRing[bu.on&&(dirty||!A.state.done.has("clean"))?"on":"off"]();rings.forEach((r,i)=>r[bu.on&&!dirty&&A.state.done.has("clean")&&!seenSet.has(i)?"on":"off"]());}
  L.click(bu.knob,()=>{if(!A.can())return;bu.lit(!bu.on);if(bu.on){A.step("burn");A.toast("🔥 اشتعل الموقد: لاحظي اللون الأزرق للهب");L.focus(0,1.4,0,7);}hints();},"knob");
  L.click(acid.g,async()=>{if(busy||!A.can())return;if(!bu.on){A.toast("أشعلي الموقد أولًا");return;}busy=true;await moveTipTo(new T.Vector3(-2.2,.35,1.1));await L.wait(.4);
    glowSalt.visible=false;dirty=null;A.step("clean");A.toast("🧽 نُظّف السلك");await moveTipTo(new T.Vector3(0,1.6,0),.8,.3);bu.setColor("#7fb8ff",0);await L.wait(.6);await L.move(wire,home,.6);busy=false;hints();},"acid");
  wg.forEach((w,i)=>L.click(w.g,async()=>{if(busy||!A.can())return;if(!bu.on){A.toast("أشعلي الموقد أولًا");return;}
    if(!A.state.done.has("clean")){A.toast("🧽 نظّفي السلك بالحمض أولًا");return;}busy=true;const s=SALTS[i];
    const p=w.g.position.clone();p.y=.14;await moveTipTo(p,.9,.7);glowSalt.material.color.set(s[1]==="CuCl₂"?"#4fc3a1":"#f4f4f4");glowSalt.visible=true;await L.wait(.3);
    await moveTipTo(new T.Vector3(0,1.62,0),1,.6);L.focus(0,1.6,0,5.2,.8);
    const col=dirty!=null&&dirty!==i?SALTS[1][3]:s[3];bu.setColor(col,1);A.state.done.has("salt")||A.step("salt");
    if(dirty!=null&&dirty!==i)A.toast("⚠️ السلك غير نظيف! بقايا الملح السابق تغطّي اللون. نظّفيه وأعيدي.",3500);
    cur={i,contaminated:dirty!=null&&dirty!==i};dirty=i;
    A.hud(`<b>${s[0]} (${s[1]})</b><br>شاهدي لون اللهب، ثم اختاري اللون من لوحة «التجربة»`);
    await L.wait(2.6);bu.setColor("#7fb8ff",0);glowSalt.visible=false;await L.move(wire,home,.7);L.home(.8);busy=false;A.go(2);hints();},"salt"+i));
  // لوحة اختيار اللون
  Lab3D._flameTools=(API)=>{const box=document.createElement("div");box.className="box";if(!cur){box.innerHTML="<b>🎨 اختيار اللون:</b> يظهر هنا بعد إدخال ملح في اللهب.";return box;}
    const s=SALTS[cur.i];box.innerHTML="<b>🎨 ما لون اللهب الذي شاهدتِه مع "+s[0]+"؟</b>";const r=document.createElement("div");r.className="swatches";
    COLORS.forEach(([n,c])=>{const b=document.createElement("button");b.className="sw";b.style.setProperty("--c",c);b.textContent=n;b.onclick=()=>{const ok=!cur.contaminated&&n===s[4];
      A.record({salt:s[0]+" "+s[1],ion:s[2],seen:n,ok:cur.contaminated?"⚠️ ملوّث، أعيدي بعد التنظيف":ok?"✅ صحيح":"❌ الصحيح: "+s[4]});if(ok)seenSet.add(cur.i);A.step("name");if(seenSet.size>=5)A.step("all");
      A.toast(ok?"✅ أحسنتِ! سُجّل في الجدول":"سُجّل. راجعي اللون في الجدول");cur=null;A.hud("");A.go(2);hints();};r.append(b);});box.append(r);return box;};
  hints();}});

Lab3D.register("indicator",{title:"الكشف عن الحموض والقواعد بالكواشف",subject:"الكيمياء",grade:"التاسع",book:"كتاب الطالب",icon:"🧪",desc:"كاشف الملفوف الأحمر وورق تبّاع الشمس مع مواد من البيت",
 question:"كيف نميّز الحموض من القواعد باستخدام الكواشف؟",goal:"تصنيف مواد شائعة إلى حمضية وقاعدية ومتعادلة باستخدام كاشف الملفوف الأحمر.",
 mats:"خمس كؤوس فيها: عصير الليمون، الخلّ، ماء مقطّر، محلول صودا الخبز، منظّف الأفران (قاعدة قويّة)، وكاشف الملفوف الأحمر في قطّارة.",safety:"لا تتذوّقي المواد، وارتدي النظّارة والقفّازين عند التعامل مع المنظّفات.",
 predict:{q:"ما لون كاشف الملفوف الأحمر الذي تتوقّعينه في عصير الليمون؟",o:["أحمر/وردي","بنفسجي","أخضر","أصفر"],right:0},
 steps:[{k:"drop",t:"اضغطي على أي كأس لتُضاف إليها قطرات من كاشف الملفوف الأحمر."},{k:"read",t:"لاحظي اللون، وقدّري الرقم الهيدروجيني من شريط الألوان."},{k:"all",t:"اختبري الكؤوس الخمس جميعها."}],
 cols:[["sub","المادة"],["col","لون الكاشف"],["ph","pH التقريبي"],["type","التصنيف"]],
 chart:{x:"ph",y:"ph",title:"الرقم الهيدروجيني للمواد",xl:"pH",yl:"pH"},
 conclude:[{q:"المادة التي يتحوّل فيها الكاشف إلى أحمر:",o:["قاعدية","حمضية","متعادلة","ملح"],a:1,why:"الوسط الحمضي (pH أقل من 7) يحوّل كاشف الملفوف إلى الأحمر أو الوردي."},
  {q:"الرقم الهيدروجيني للماء المقطّر:",o:["1","7","10","14"],a:1,why:"الماء المقطّر متعادل pH = 7."},{q:"كلما زاد الرقم الهيدروجيني فوق 7:",o:["زادت الحمضية","زادت القاعدية","لا يتغيّر شيء","أصبح متعادلًا"],a:1,why:"القيم الأكبر من 7 قاعدية، وتزداد قوّتها كلما اقتربت من 14."}],
 scene:{yaw:0,pitch:.42,dist:8.5,ty:.8},
 setup(L,A){const T=L.T;const SUB=[["عصير الليمون",2.2,"#f9e79f"],["الخلّ",3,"#fdfefe"],["ماء مقطّر",7,"#eaf6ff"],["صودا الخبز",8.5,"#fdfefe"],["منظّف الأفران",13,"#fdfefe"]];
  const phCol=p=>p<3?"#e91e63":p<5?"#ec407a":p<6.5?"#ab47bc":p<7.5?"#7e57c2":p<9?"#3f51b5":p<11?"#26a69a":p<12.5?"#9ccc65":"#fdd835";
  const phName=p=>p<3?"أحمر":p<5?"وردي":p<6.5?"بنفسجي محمرّ":p<7.5?"بنفسجي":p<9?"أزرق":p<11?"أخضر مزرق":p<12.5?"أخضر":"أصفر";
  const done=new Set();
  SUB.forEach((s,i)=>{const b=L.beaker({r:.45,h:.95,color:s[2],level:.5,op:.55});b.g.position.set(-3.2+i*1.6,0,.6);L.add(b);const lb=L.sprite(s[0],{scale:.24,border:"#B8902A"});lb.position.y=1.35;b.g.add(lb);const rg=L.ring(b.g,1.75);
   const drops=new T.Group();b.g.add(drops);
   L.click(b.g,async()=>{if(!A.can()||done.has(i))return;const d=new T.Mesh(new T.SphereGeometry(.07,12,10),L.M.liquid("#6a1b9a",.9));d.position.set(0,2.1,0);drops.add(d);
     await L.anim(.6,v=>d.position.y=2.1-1.6*v);drops.remove(d);const from=b.liq.material.color.clone(),to=new T.Color(phCol(s[1]));await L.anim(1.2,v=>b.liq.material.color.copy(from).lerp(to,v));b.liq.material.opacity=.85;
     done.add(i);rg.off();A.step("drop");A.step("read");if(done.size===5)A.step("all");A.record({sub:s[0],col:phName(s[1]),ph:s[1],type:s[1]<6.5?"حمضية":s[1]>7.5?"قاعدية":"متعادلة"});A.toast("🎨 "+s[0]+": "+phName(s[1])+" ← pH ≈ "+s[1]);},"b"+i);});
  // شريط الألوان
  const strip=L.canvasTex(1024,120,(x,w,hh)=>{for(let p=0;p<=14;p++){x.fillStyle=phCol(p);x.fillRect(p*w/15,0,w/15+1,80);x.fillStyle="#2B1218";x.font="bold 28px sans-serif";x.textAlign="center";x.fillText(p,p*w/15+w/30,112);}});
  const sm=new T.Mesh(new T.PlaneGeometry(8,.95),new T.MeshBasicMaterial({map:strip.tex}));sm.position.set(0,2.8,-2.5);L.root.add(sm);const sl=L.sprite("شريط ألوان كاشف الملفوف الأحمر (pH)",{scale:.26});sl.position.set(0,3.5,-2.5);L.root.add(sl);}});
