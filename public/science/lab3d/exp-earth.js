/* تجارب علوم الأرض ثلاثية الأبعاد */
Lab3D.register("crystals",{title:"علاقة معدّل التبريد بحجم البلّورات",subject:"علوم الأرض والبيئة",grade:"العاشر",book:"كتاب الأنشطة",icon:"💎",desc:"صهر مادة ثم تبريدها ببطء وبسرعة ومقارنة حجم البلّورات (نمذجة الصخور النارية)",
 question:"كيف يؤثّر معدّل تبريد الصهارة في حجم البلّورات المتكوّنة؟",
 goal:"نمذجة تكوّن الصخور النارية الجوفية والسطحية، والربط بين سرعة التبريد وحجم البلّورات.",
 mats:"مادة السالول (أو الشبّة)، أنبوب اختبار، موقد، ثلاثة أطباق: طبق على الثلج، طبق بدرجة حرارة الغرفة، طبق دافئ، عدسة مكبّرة.",safety:"احذري من الأدوات الساخنة واستعملي الملقط، ولا تلمسي المادة المنصهرة.",
 predict:{q:"في أيّ طبق تتوقّعين أن تتكوّن بلّورات أكبر؟",o:["الطبق على الثلج (تبريد سريع)","الطبق بدرجة حرارة الغرفة","الطبق الدافئ (تبريد بطيء)","البلّورات متساوية"],right:2},
 steps:[{k:"melt",t:"اضغطي على الأنبوب ليُسخَّن على الموقد حتى تنصهر المادة."},{k:"pour",t:"اضغطي على كل طبق لتصبّي فيه جزءًا من المصهور."},{k:"cool",t:"اضغطي «⏩ راقبي التبلور» وشاهدي نموّ البلّورات."},{k:"look",t:"اضغطي على كل طبق لتفحصيه بالعدسة المكبّرة وتسجّلي حجم البلّورات."}],
 cols:[["dish","الطبق"],["rate","سرعة التبريد"],["size","متوسّط طول البلّورة (mm)"],["rock","يشبه صخرًا"]],
 chart:{x:"order",y:"size",title:"حجم البلّورات حسب سرعة التبريد (1 = الأسرع)",xl:"ترتيب السرعة (1 سريع ← 3 بطيء)",yl:"طول البلّورة mm",color:"#7a4fb5"},
 conclude:[{q:"تكوّنت أكبر البلّورات في الطبق الدافئ لأن:",o:["التبريد البطيء يعطي الوقت لنموّ البلّورات","الحرارة تكسر البلّورات","الدفء يضيف مادة جديدة","لا علاقة بين التبريد والحجم"],a:0,why:"كلما كان التبريد أبطأ نمت البلّورات مدّة أطول فأصبحت أكبر."},
  {q:"الطبق على الثلج يمثّل تكوّن صخور نارية:",o:["جوفية مثل الغرانيت","سطحية مثل البازلت","رسوبية","متحوّلة"],a:1,why:"اللابة على السطح تبرد بسرعة فتتكوّن بلّورات دقيقة."},
  {q:"الغرانيت كبير البلّورات لأنه:",o:["برد بسرعة على السطح","برد ببطء داخل القشرة","تكوّن من رسوبيات","تحوّل بالضغط"],a:1,why:"الصخور النارية الجوفية تبرد ببطء في الأعماق."}],
 scene:{yaw:.1,pitch:.5,dist:8,ty:.6,sky1:"#f3ecff",sky2:"#e6f4ff"},
 setup(L,A){const T=L.T;const bu=L.add(L.burner());bu.g.position.set(-3.2,0,0);L.tick((dt,t)=>bu.tick(t));
  const tube=L.testTube({color:"#f5f0e1",level:.35});tube.g.position.set(-2.4,.2,1.4);tube.g.rotation.z=.25;L.add(tube);const tr=L.ring(tube.g,1.7);
  const D=[["طبق على الثلج","سريع جدًّا",1,.6,"بازلت (ناري سطحي)","#cfe8ff"],["طبق بحرارة الغرفة","متوسّط",2,2.2,"صخر وسطي","#f4f4f4"],["طبق دافئ","بطيء",3,6.5,"غرانيت (ناري جوفي)","#ffe0c2"]];
  const dishes=D.map((d,i)=>{const g=new T.Group();g.position.set(-.4+i*2.1,0,.4);L.root.add(g);
    const base=new T.Mesh(new T.CylinderGeometry(.75,.75,.08,40),new T.MeshStandardMaterial({color:d[5],roughness:.3}));base.position.y=.04;base.receiveShadow=true;g.add(base);
    const rim=new T.Mesh(new T.CylinderGeometry(.62,.62,.12,40,1,true),L.M.glass());rim.position.y=.14;g.add(rim);
    if(i===0){for(let k=0;k<18;k++){const c=new T.Mesh(new T.BoxGeometry(.18,.12,.18),new T.MeshStandardMaterial({color:0xe8f6ff,roughness:.05,transparent:true,opacity:.85}));const a=k/18*Math.PI*2;c.position.set(.85*Math.cos(a),.06,.85*Math.sin(a));c.rotation.y=a;g.add(c);}}
    const melt=new T.Mesh(new T.CylinderGeometry(.6,.6,.02,40),new T.MeshStandardMaterial({color:0xfff3d6,roughness:.2,transparent:true,opacity:.9}));melt.position.y=.1;melt.visible=false;g.add(melt);
    const cr=new T.Group();g.add(cr);const n=[260,70,18][i],s=[.035,.09,.22][i];
    for(let k=0;k<n;k++){const r=Math.sqrt(Math.random())*.55,a=Math.random()*Math.PI*2;const len=s*(.6+Math.random()*.8);const m=new T.Mesh(new T.BoxGeometry(len,len*.35,len*.2),new T.MeshPhysicalMaterial({color:0xffffff,roughness:.05,metalness:0,clearcoat:1,transparent:true,opacity:.9}));
      m.position.set(r*Math.cos(a),.12,r*Math.sin(a));m.rotation.set(0,Math.random()*Math.PI,0);m.scale.setScalar(.001);cr.add(m);}
    const lb=L.sprite(d[0],{scale:.22,border:"#7a4fb5"});lb.position.y=.75;g.add(lb);const rg=L.ring(g,1.2);rg.off();return {g,melt,cr,rg,poured:false,seen:false};});
  let melted=false,busy=false,grown=false;
  L.click(tube.g,async()=>{if(busy||melted||!A.can())return;busy=true;tr.off();bu.lit(true);const home=tube.g.position.clone();await L.arc(tube.g,new T.Vector3(-3.2,1.3,0),.9,.5);
    const c0=new T.Color("#f5f0e1"),c1=new T.Color("#fff3c4");await L.anim(2.2,v=>{tube.setColor(c0.clone().lerp(c1,v).getStyle());tube.liq.material.opacity=.6+.3*v;});melted=true;A.step("melt");A.toast("🔥 انصهرت المادة. صبّيها في الأطباق");
    await L.arc(tube.g,home,.8,.4);bu.lit(false);dishes.forEach(d=>d.rg.on());busy=false;},"tube");
  dishes.forEach((d,i)=>L.click(d.g,async()=>{if(busy)return;
    if(!grown){if(!melted){A.toast("اصهري المادة أولًا");return;}if(d.poured)return;busy=true;const home=tube.g.position.clone();await L.arc(tube.g,d.g.position.clone().add(new T.Vector3(-.5,.9,0)),.7,.4);await L.anim(.3,v=>tube.g.rotation.z=.25+v*1.1);
      d.melt.visible=true;await L.anim(.6,v=>d.melt.scale.set(.2+.8*v,1,.2+.8*v));await L.anim(.3,v=>tube.g.rotation.z=1.35-v*1.1);await L.arc(tube.g,home,.6,.3);d.poured=true;d.rg.off();
      if(dishes.every(x=>x.poured)){A.step("pour");A.toast("اضغطي «⏩ راقبي التبلور» من اللوحة");A.go(2);}busy=false;return;}
    if(d.seen)return;busy=true;await L.focus(d.g.position.x,.2,d.g.position.z,3.2,.8);A.hud("<b>🔍 "+D[i][0]+"</b><br>طول البلّورة ≈ "+D[i][3]+" mm · "+(i===0?"بلّورات دقيقة جدًّا":i===1?"بلّورات متوسّطة":"بلّورات كبيرة واضحة"));
    await L.wait(2.2);d.seen=true;d.rg.off();A.record({dish:D[i][0],rate:D[i][1],order:D[i][2],size:D[i][3],rock:D[i][4]});if(dishes.every(x=>x.seen))A.step("look");await L.home(.8);A.hud("");busy=false;},"dish"+i));
  Lab3D._cry={grow:async()=>{if(grown||busy)return;if(!dishes.every(x=>x.poured)){A.toast("صبّي المصهور في الأطباق الثلاثة أولًا");return;}busy=true;
    const t=L.sprite("⏱ مراقبة التبلور…",{scale:.3,border:"#7a4fb5"});t.position.set(1.7,2,-.4);L.root.add(t);
    await L.anim(4.5,v=>dishes.forEach((d,i)=>{const sp=[3,1.4,.75][i];const k=Math.min(1,v*sp);d.cr.children.forEach((m,j)=>m.scale.setScalar(Math.max(.001,Math.min(1,k*1.2-j/d.cr.children.length*.2))));d.melt.material.opacity=.9*(1-k*.7);}));
    L.root.remove(t);grown=true;A.step("cool");dishes.forEach(d=>d.rg.on());A.toast("💎 تكوّنت البلّورات! افحصي كل طبق بالعدسة");busy=false;A.go(2);}};}
 ,tools:API=>{const b=document.createElement("button");b.className="lbtn gold";b.textContent="⏩ راقبي التبلور";b.onclick=()=>Lab3D._cry&&Lab3D._cry.grow();return b;}});
