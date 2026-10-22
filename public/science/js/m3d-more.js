/* نماذج ثلاثية الأبعاد إضافية — الصف العاشر */
(function(){
const rnd=(a,b)=>a+Math.random()*(b-a);
function tube(T,pts,r,c,mat){const curve=new T.CatmullRomCurve3(pts);return new T.Mesh(new T.TubeGeometry(curve,Math.max(20,pts.length*12),r,10,false),mat(c));}
function arrow(T,from,to,c,mat,bend){const mid=from.clone().add(to).multiplyScalar(.5);mid.y+=bend||1.2;const curve=new T.QuadraticBezierCurve3(from,mid,to);const g=new T.Group();
 g.add(new T.Mesh(new T.TubeGeometry(curve,30,.07,8,false),mat(c)));const cone=new T.Mesh(new T.ConeGeometry(.22,.5,14),mat(c));const p=curve.getPoint(.97),d=curve.getTangent(.97);cone.position.copy(p);cone.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());g.add(cone);g.userData.curve=curve;return g;}

/* ---------- الفيروسات ---------- */
M3D.register("virus",{title:"تركيب الفيروسات وتكاثرها",desc:"قارني بين العاثية البكتيرية والفيروس المغلّف، وشغّلي «دورة التحلّل» لتري كيف يحقن الفيروس مادته الوراثية. اضغطي على أي جزء.",dist:14,
 build(A){const T=A.THREE,{mat,root}=A;const G={phage:new T.Group(),env:new T.Group()};root.add(G.phage,G.env);G.env.visible=false;
  const glass=(c,o)=>mat(c,Object.assign({transparent:true,opacity:.45,side:T.DoubleSide,depthWrite:false},o||{}));
  // العاثية
  const P=G.phage;const head=new T.Mesh(new T.IcosahedronGeometry(1.6,0),glass("#7fb3e8",{flatShading:true}));head.position.y=3.2;P.add(head);
  const hedge=new T.LineSegments(new T.EdgesGeometry(head.geometry),new T.LineBasicMaterial({color:0x1d4f8a}));hedge.position.copy(head.position);P.add(hedge);
  A.pick(head,"الرأس (المحفظة البروتينية)","غلاف بروتيني عشريني الأوجه يحمي المادة الوراثية للفيروس.");
  const dnaPts=[];for(let i=0;i<60;i++){const a=i*.55,r=.9*Math.sin(i/60*Math.PI)+.15;dnaPts.push(new T.Vector3(r*Math.cos(a),3.2+(i/60-.5)*2.2,r*Math.sin(a)));}
  const dna=tube(T,dnaPts,.07,"#e0457b",mat);P.add(dna);A.pick(dna,"المادة الوراثية (DNA)","تحمل التعليمات اللازمة لصنع فيروسات جديدة داخل الخلية العائلة.");
  const collar=new T.Mesh(new T.CylinderGeometry(.55,.55,.25,20),mat("#4c6a8f"));collar.position.y=1.55;P.add(collar);A.pick(collar,"العنق","يصل الرأس بالذيل.");
  const sheath=new T.Mesh(new T.CylinderGeometry(.32,.32,2.4,20,8),mat("#8aa4c4"));sheath.position.y=.2;P.add(sheath);A.pick(sheath,"غمد الذيل","أنبوب بروتيني ينقبض فيدفع المادة الوراثية إلى داخل الخلية البكتيرية.");
  for(let i=0;i<8;i++){const r=new T.Mesh(new T.TorusGeometry(.34,.05,8,20),mat("#5b7799"));r.rotation.x=Math.PI/2;r.position.y=-.9+i*.3;P.add(r);}
  const plate=new T.Mesh(new T.CylinderGeometry(.75,.75,.2,6),mat("#36506f"));plate.position.y=-1.05;P.add(plate);A.pick(plate,"الصفيحة القاعدية","تلتصق بسطح الخلية البكتيرية.");
  const fibers=new T.Group();for(let i=0;i<6;i++){const a=i/6*Math.PI*2,c=Math.cos(a),s=Math.sin(a);fibers.add(tube(T,[new T.Vector3(.7*c,-1.05,.7*s),new T.Vector3(1.7*c,-.6,1.7*s),new T.Vector3(2.4*c,-2.2,2.4*s)],.05,"#2f4a69",mat));}
  P.add(fibers);A.pick(fibers,"الألياف الذيلية","تتعرّف المستقبلات على سطح البكتيريا وتثبّت الفيروس عليها.");
  P.add(A.label("العاثية البكتيرية",new T.Vector3(0,5.4,0)));
  // الخلية البكتيرية (سطح)
  const wall=new T.Mesh(new T.BoxGeometry(12,.6,6),glass("#9bd18b",{opacity:.55}));wall.position.y=-3.2;P.add(wall);A.pick(wall,"جدار الخلية البكتيرية","يلتصق به الفيروس قبل حقن مادته الوراثية.");
  const inj=tube(T,[new T.Vector3(0,-1.1,0),new T.Vector3(0,-2.6,0),new T.Vector3(.6,-3.9,.3),new T.Vector3(-.4,-4.6,-.2)],.07,"#e0457b",mat);inj.visible=false;P.add(inj);
  const babies=new T.Group();for(let i=0;i<6;i++){const b=new T.Mesh(new T.IcosahedronGeometry(.35,0),mat("#7fb3e8",{flatShading:true}));b.position.set(rnd(-4,4),-4.4,rnd(-2,2));babies.add(b);}babies.visible=false;P.add(babies);
  // الفيروس المغلّف
  const E=G.env;const envl=new T.Mesh(new T.SphereGeometry(2.6,40,30),glass("#f2b36b",{opacity:.35}));E.add(envl);A.pick(envl,"الغلاف الخارجي الدهني","غشاء من الدهون يحيط ببعض الفيروسات (مثل فيروس الإنفلونزا وكورونا) ويأخذه الفيروس من غشاء الخلية العائلة.");
  const spikes=new T.Group();const sg=new T.CylinderGeometry(.06,.06,.7,8),kg=new T.SphereGeometry(.2,12,10);
  for(let i=0;i<46;i++){const v=new T.Vector3(rnd(-1,1),rnd(-1,1),rnd(-1,1)).normalize();const s=new T.Group();const st=new T.Mesh(sg,mat("#c0392b"));st.position.y=.35;const kn=new T.Mesh(kg,mat("#e74c3c"));kn.position.y=.75;s.add(st,kn);s.position.copy(v.clone().multiplyScalar(2.55));s.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v);spikes.add(s);}
  E.add(spikes);A.pick(spikes,"النتوءات البروتينية","بروتينات سكّرية على الغلاف ترتبط بمستقبلات الخلية العائلة فتسمح بدخول الفيروس.");
  const cap=new T.Mesh(new T.IcosahedronGeometry(1.5,1),glass("#7fb3e8",{opacity:.6,flatShading:true}));E.add(cap);A.pick(cap,"المحفظة (Capsid)","غلاف بروتيني داخلي يحمي المادة الوراثية.");
  const rp=[];for(let i=0;i<80;i++)rp.push(new T.Vector3(rnd(-1,1),rnd(-1,1),rnd(-1,1)).multiplyScalar(.95));const rna=tube(T,rp,.05,"#8e44ad",mat);E.add(rna);A.pick(rna,"المادة الوراثية (RNA)","سلسلة RNA تحمل جينات الفيروس.");
  E.add(A.label("فيروس مغلّف",new T.Vector3(0,3.9,0)));
  let mode="phage",phase=-1,pt=0;
  const bP=A.control("🦠 العاثية البكتيرية",()=>{mode="phage";G.phage.visible=true;G.env.visible=false;bE.setAttribute("aria-pressed","false");A.reset();return true;},true);
  const bE=A.control("🔴 فيروس مغلّف",()=>{mode="env";G.phage.visible=false;G.env.visible=true;bP.setAttribute("aria-pressed","false");phase=-1;A.reset();return true;});
  A.control("▶ دورة التحلّل",()=>{if(mode!=="phage")bP.click();phase=0;pt=0;P.position.y=3;inj.visible=false;babies.visible=false;A.info("1) الالتصاق","تتّجه العاثية نحو البكتيريا وتلتصق أليافها الذيلية بمستقبلات على جدارها.");});
  A.tick((dt,t)=>{if(mode==="env"){spikes.rotation.y+=dt*.15;return;}
   if(phase<0){P.position.y=Math.sin(t)*.15;return;}pt+=dt;
   if(phase===0){P.position.y=Math.max(0,3-pt*1.5);if(pt>2.2){phase=1;pt=0;A.info("2) الحقن","ينقبض غمد الذيل ويحقن الفيروس مادته الوراثية داخل الخلية، ويبقى الغلاف البروتيني خارجها.");}}
   else if(phase===1){sheath.scale.y=Math.max(.6,1-pt*.3);inj.visible=true;inj.scale.y=Math.min(1,pt/1.5);if(pt>2.5){phase=2;pt=0;A.info("3) التضاعف والتجميع","تستخدم المادة الوراثية للفيروس عضيّات الخلية لصنع نسخ من DNA وبروتينات الفيروس، ثم تتجمّع فيروسات جديدة.");}}
   else if(phase===2){babies.visible=true;babies.children.forEach((b,i)=>{b.scale.setScalar(Math.min(1,pt/2));b.rotation.y+=dt;});if(pt>3){phase=3;pt=0;A.info("4) التحلّل","تنفجر الخلية البكتيرية وتخرج الفيروسات الجديدة لتصيب خلايا أخرى.");}}
   else if(phase===3){babies.children.forEach((b,i)=>{b.position.y+=dt*(1.2+i*.2);b.position.x+=dt*(i-2.5)*.4;});if(pt>3){phase=-1;sheath.scale.y=1;inj.visible=false;babies.visible=false;babies.children.forEach(b=>{b.position.y=-4.4;b.position.x=rnd(-4,4);});}}});
 }});

/* ---------- البكتيريا ---------- */
M3D.register("bacteria",{title:"تركيب الخلية البكتيرية",desc:"خلية بدائية النواة: اقطعيها لتري ما في داخلها، وبدّلي بين الأشكال: عصوية وكروية وحلزونية. اضغطي على أي جزء.",dist:13,
 build(A){const T=A.THREE,{mat,root}=A;const clip=new T.Plane(new T.Vector3(0,0,-1),0);let cut=true;
  const cm=(c,o)=>{const m=mat(c,Object.assign({side:T.DoubleSide},o||{}));m.clippingPlanes=[clip];return m;};
  const G={bac:new T.Group(),coc:new T.Group(),spi:new T.Group()};root.add(G.bac,G.coc,G.spi);G.coc.visible=G.spi.visible=false;
  const B=G.bac;const L=5;
  const caps=new T.Mesh(new T.CapsuleGeometry(1.9,L,16,32),cm("#f3e3a8",{transparent:true,opacity:.35,depthWrite:false}));caps.rotation.z=Math.PI/2;B.add(caps);A.pick(caps,"المحفظة","طبقة لزجة خارجية تحمي البكتيريا من الجفاف ومن خلايا الدم البيضاء.");
  const wall=new T.Mesh(new T.CapsuleGeometry(1.6,L,16,32),cm("#5aa36a"));wall.rotation.z=Math.PI/2;B.add(wall);A.pick(wall,"الجدار الخلوي","يعطي الخلية شكلها ويحميها، ويحتوي مادة الببتيدوغلايكان.");
  const mem=new T.Mesh(new T.CapsuleGeometry(1.45,L,16,32),cm("#e6a23c"));mem.rotation.z=Math.PI/2;B.add(mem);A.pick(mem,"الغشاء البلازمي","ينظّم دخول المواد إلى الخلية وخروجها.");
  const cyto=new T.Mesh(new T.CapsuleGeometry(1.4,L,16,32),cm("#cfe8f7",{transparent:true,opacity:.5,depthWrite:false}));cyto.rotation.z=Math.PI/2;B.add(cyto);A.pick(cyto,"السيتوبلازم","سائل هلامي تحدث فيه التفاعلات الحيوية.");
  const np=[];for(let i=0;i<140;i++)np.push(new T.Vector3(rnd(-1.8,1.8),rnd(-.6,.6),rnd(-.6,.6)));const nuc=tube(T,np,.05,"#c0392b",mat);B.add(nuc);A.pick(nuc,"المنطقة النووية (DNA الحلقي)","مادة وراثية حلقية غير محاطة بغشاء نووي.");
  const plas=new T.Group();[[2.5,.6,.3],[-2.6,-.5,.2],[1,-.9,-.4]].forEach(([x,y,z])=>{const t=new T.Mesh(new T.TorusGeometry(.28,.05,8,24),mat("#8e44ad"));t.position.set(x,y,z);t.rotation.set(rnd(0,3),rnd(0,3),0);plas.add(t);});B.add(plas);A.pick(plas,"البلازميدات","جزيئات DNA حلقية صغيرة إضافية، قد تحمل جينات مقاومة المضادّات الحيوية.");
  const ribo=new T.Group();const rg=new T.SphereGeometry(.07,8,6);for(let i=0;i<160;i++){const m=new T.Mesh(rg,mat("#34495e"));m.position.set(rnd(-3.6,3.6),rnd(-1.1,1.1),rnd(-1.1,1.1));if(Math.hypot(m.position.y,m.position.z)<1.2)ribo.add(m);}B.add(ribo);A.pick(ribo,"الرايبوسومات","تصنع البروتينات، وهي أصغر من رايبوسومات حقيقيات النوى.");
  const fl=[];for(let i=0;i<70;i++){const x=-4.3-i*.12;fl.push(new T.Vector3(x,.5*Math.sin(i*.45),.5*Math.cos(i*.45)));}const flag=tube(T,fl,.07,"#6d4c41",mat);B.add(flag);A.pick(flag,"السوط","تركيب طويل يدور كالمروحة فيحرّك البكتيريا.");
  const pili=new T.Group();for(let i=0;i<22;i++){const v=new T.Vector3(rnd(-1,1),rnd(-1,1),rnd(-1,1)).normalize();const x=rnd(-2.4,2.4);const base=new T.Vector3(x,v.y*1.9,v.z*1.9);const m=new T.Mesh(new T.CylinderGeometry(.025,.025,.9,6),mat("#7f8c8d"));m.position.copy(base.clone().add(new T.Vector3(0,v.y,v.z).multiplyScalar(.45)));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),new T.Vector3(0,v.y,v.z).normalize());pili.add(m);}B.add(pili);A.pick(pili,"الشعيرات","زوائد قصيرة تساعد البكتيريا على الالتصاق بالأسطح وتبادل المادة الوراثية (الاقتران).");
  B.add(A.label("بكتيريا عصوية",new T.Vector3(0,3.2,0)));
  // كروية
  [[0,0],[2.2,0],[4.4,0],[-2.2,0],[-4.4,0]].forEach(([x])=>{const s=new T.Mesh(new T.SphereGeometry(1,28,20),mat("#5aa36a"));s.position.x=x;G.coc.add(s);A.pick(s,"بكتيريا كروية (Cocci)","مثل المكوّرات العنقودية والسبحية؛ قد تترتّب في سلاسل أو عناقيد.");});G.coc.add(A.label("كروية في سلسلة",new T.Vector3(0,2,0)));
  // حلزونية
  const sp=[];for(let i=0;i<120;i++){const x=-5+i*.085;sp.push(new T.Vector3(x,1.1*Math.sin(i*.16),1.1*Math.cos(i*.16)));}const spi=tube(T,sp,.35,"#5aa36a",mat);G.spi.add(spi);A.pick(spi,"بكتيريا حلزونية (Spirilla)","خلايا ملتوية، تتحرّك بالأسواط، مثل اللولبيات.");G.spi.add(A.label("حلزونية",new T.Vector3(0,2.4,0)));
  const btn=[];const show=k=>{Object.keys(G).forEach(x=>G[x].visible=x===k);btn.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.k===k)));A.reset();};
  [["bac","عصوية"],["coc","كروية"],["spi","حلزونية"]].forEach(([k,t])=>{const b=A.control(t,()=>{show(k);});b.dataset.k=k;btn.push(b);});btn[0].setAttribute("aria-pressed","true");
  A.control("✂️ قطع",()=>{cut=!cut;clip.constant=cut?0:50;return cut;},true);
  A.tick((dt,t)=>{flag.rotation.x+=dt*6;spi.rotation.x+=dt*1.5;});}});

/* ---------- دورة الصخور ---------- */
M3D.register("rockcycle",{title:"دورة الصخور",desc:"تتحوّل الصخور من نوع إلى آخر: اضغطي على أي صخر أو سهم لتعرفي العملية، وشغّلي الحركة لتتبّعي حبيبة صخرية في الدورة.",dist:17,
 build(A){const T=A.THREE,{mat,root}=A;
  const speck=(base,dots,n)=>{const c=document.createElement("canvas");c.width=c.height=256;const x=c.getContext("2d");x.fillStyle=base;x.fillRect(0,0,256,256);for(let i=0;i<n;i++){x.fillStyle=dots[i%dots.length];const r=rnd(2,9);x.fillRect(rnd(0,256),rnd(0,256),r,r*rnd(.6,1.4));}const tx=new T.CanvasTexture(c);if(T.SRGBColorSpace)tx.colorSpace=T.SRGBColorSpace;return tx;};
  const layers=(cols,wavy)=>{const c=document.createElement("canvas");c.width=c.height=256;const x=c.getContext("2d");let y=0,i=0;while(y<256){const h=rnd(14,34);x.fillStyle=cols[i++%cols.length];x.beginPath();x.moveTo(0,y);for(let k=0;k<=256;k+=16)x.lineTo(k,y+(wavy?Math.sin(k/20+i)*6:0));x.lineTo(256,y+h);x.lineTo(0,y+h);x.fill();y+=h;}const tx=new T.CanvasTexture(c);if(T.SRGBColorSpace)tx.colorSpace=T.SRGBColorSpace;return tx;};
  const R=5.2,pos=k=>{const a={ign:Math.PI/2,sed:Math.PI/2+2.094,met:Math.PI/2+4.189}[k];return new T.Vector3(R*Math.cos(a),0,R*Math.sin(a));};
  const rock=(k,tex,name,info)=>{const g=new T.DodecahedronGeometry(1.5,1);const m=new T.Mesh(g,new T.MeshPhongMaterial({map:tex,flatShading:true}));m.position.copy(pos(k));m.scale.set(1.2,.9,1);root.add(m);A.pick(m,name,info);root.add(A.label(name,pos(k).clone().add(new T.Vector3(0,2,0))));return m;};
  rock("ign",speck("#e8d6cf",["#222","#f5f5f5","#c98b7a"],900),"صخور نارية","تتكوّن من تبريد الماغما وتبلورها: جوفية كبيرة البلّورات (الغرانيت) أو سطحية دقيقة البلّورات (البازلت).");
  rock("sed",layers(["#d9b77e","#c79a5b","#e8d0a2","#b5844a"]),"صخور رسوبية","تتكوّن من تصخّر الرسوبيات (التراصّ والتلاحم) في طبقات، وقد تحتوي على أحافير.");
  rock("met",layers(["#6b6f7a","#d9d9d9","#3f434c","#a0a4ad"],true),"صخور متحوّلة","تتكوّن عندما تتعرّض الصخور لحرارة وضغط عاليين دون انصهار، مثل الرخام والنايس.");
  const magma=new T.Mesh(new T.CylinderGeometry(2.3,2.5,.5,48),new T.MeshPhongMaterial({color:0xff5a1f,emissive:0xb22a00,shininess:90}));magma.position.y=-2.6;root.add(magma);A.pick(magma,"الماغما (الصهارة)","صخور منصهرة داخل الأرض؛ أيّ صخر ينصهر يتحوّل إلى ماغما، وبتبريدها تتكوّن الصخور النارية.");root.add(A.label("ماغما",new T.Vector3(0,-1.2,0),"#b22a00"));
  const arrows=[];const AR=(a,b,c,name,info,bend,lb)=>{const g=arrow(T,a,b,c,mat,bend);root.add(g);A.pick(g,name,info);arrows.push(g);if(lb){const p=g.userData.curve.getPoint(.5);root.add(A.label(lb,p.clone().add(new T.Vector3(0,.5,0)),"#333"));}return g;};
  const P=k=>pos(k).clone().multiplyScalar(.78);const M=new T.Vector3(0,-1.9,0);
  AR(P("ign"),P("sed"),"#c79a5b","التجوية والحتّ والترسيب والتصخّر","تتفتّت الصخور بالتجوية، وتُنقل الرسوبيات وتترسّب ثم تتصخّر فتصبح صخورًا رسوبية.",1.6,"تجوية وترسيب");
  AR(P("sed"),P("met"),"#5d6d7e","الحرارة والضغط","تتعرّض الصخور الرسوبية لحرارة وضغط عاليين في باطن الأرض فتتحوّل.",1.6,"حرارة وضغط");
  AR(P("met"),M,"#e74c3c","الانصهار","ترتفع الحرارة كثيرًا فينصهر الصخر المتحوّل ويصبح ماغما.",.5,"انصهار");
  AR(M,P("ign"),"#ff7f27","التبريد والتبلور","تبرد الماغما ببطء (جوفية) أو بسرعة (سطحية) فتتكوّن صخور نارية.",.5,"تبريد وتبلور");
  AR(P("ign"),P("met"),"#7f8c8d","الحرارة والضغط","يمكن أن تتحوّل الصخور النارية مباشرة إلى متحوّلة.",-1.2);
  AR(P("met"),P("sed"),"#b08d57","التجوية والترسيب","تتعرّض الصخور المتحوّلة المكشوفة للتجوية فتصبح رسوبيات.",-1.4);
  const dot=new T.Mesh(new T.SphereGeometry(.22,16,12),new T.MeshBasicMaterial({color:0xffd23f}));root.add(dot);let on=true,seg=0,u=0;const path=[0,1,2,3];
  A.control("⏯ تتبّعي حبيبة صخرية",()=>{on=!on;dot.visible=on;return on;},true);
  A.tick((dt,t)=>{magma.material.emissive.setHSL(.03,1,.25+.08*Math.sin(t*3));if(!on)return;u+=dt*.35;if(u>1){u=0;seg=(seg+1)%path.length;}dot.position.copy(arrows[path[seg]].userData.curve.getPoint(u));});}});

/* ---------- دورة حياة النجوم ---------- */
M3D.register("starlife",{title:"دورة حياة النجوم",desc:"تتبّعي مصير نجم متوسّط الكتلة مثل الشمس، ونجم ضخم الكتلة، من السديم حتى النهاية. اضغطي على أي مرحلة.",dist:25,
 build(A){const T=A.THREE,{mat,root}=A;
  const glow=(c,s)=>{const cv=document.createElement("canvas");cv.width=cv.height=128;const x=cv.getContext("2d");const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,c);g.addColorStop(.35,c);g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(0,0,128,128);const sp=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(cv),transparent:true,depthWrite:false,blending:T.AdditiveBlending}));sp.scale.setScalar(s);return sp;};
  const star=(c,r,x,y,name,info,lab)=>{const g=new T.Group();const m=new T.Mesh(new T.SphereGeometry(r,32,24),new T.MeshBasicMaterial({color:c}));g.add(m,glow(c,r*3.2));g.position.set(x,y,0);root.add(g);A.pick(m,name,info);root.add(A.label(lab||name,new T.Vector3(x,y-r-.9,0),"#2b1218"));return g;};
  const cloud=(x,y,c1,c2,n,rad,name,info,lab)=>{const geo=new T.BufferGeometry(),p=new Float32Array(n*3),col=new Float32Array(n*3),a=new T.Color(c1),b=new T.Color(c2);for(let i=0;i<n;i++){const v=new T.Vector3(rnd(-1,1),rnd(-1,1),rnd(-1,1)).normalize().multiplyScalar(rad*Math.cbrt(Math.random()));p.set([v.x,v.y,v.z],i*3);const cc=a.clone().lerp(b,Math.random());col.set([cc.r,cc.g,cc.b],i*3);}
   geo.setAttribute("position",new T.BufferAttribute(p,3));geo.setAttribute("color",new T.BufferAttribute(col,3));const pts=new T.Points(geo,new T.PointsMaterial({size:.12,vertexColors:true,transparent:true,opacity:.9,depthWrite:false}));pts.position.set(x,y,0);root.add(pts);
   const hit=new T.Mesh(new T.SphereGeometry(rad,12,8),new T.MeshBasicMaterial({visible:false}));hit.position.set(x,y,0);root.add(hit);A.pick(hit,name,info);root.add(A.label(lab||name,new T.Vector3(x,y-rad-.7,0),"#2b1218"));return pts;};
  const neb=cloud(-9,0,"#c38cff","#ff7eb6",1400,2,"السديم","سحابة هائلة من الغاز (الهيدروجين أساسًا) والغبار؛ تنكمش أجزاء منها بالجاذبية فتسخن وتبدأ ولادة النجم.");
  const proto=star("#ffb070",.7,-5.4,0,"النجم الأوّلي","كتلة غازية تنكمش وتسخن؛ عندما تصل حرارة قلبها إلى ملايين الدرجات يبدأ الاندماج النووي.");
  const ms=star("#fff1a8",1,-2,0,"نجم النسق الرئيس","أطول مراحل حياة النجم: يندمج الهيدروجين إلى هيليوم في قلبه، وتتوازن الجاذبية مع ضغط الطاقة. الشمس الآن في هذه المرحلة.","النسق الرئيس");
  // المسار المتوسّط (أعلى)
  const rg=star("#ff5b3a",1.9,2.6,3.6,"العملاق الأحمر","عند نفاد الهيدروجين في القلب تتمدّد الطبقات الخارجية وتبرد فيصبح لونه أحمر، ويحرق الهيليوم في قلبه.");
  const pn=cloud(7.4,3.6,"#57d3c1","#4f7cff",900,1.6,"السديم الكوكبي","يقذف النجم طبقاته الخارجية إلى الفضاء على شكل غلاف غازي متوهّج.");
  const wd=star("#e8f1ff",.35,7.4,3.6,"القزم الأبيض","قلب النجم المتبقّي: صغير جدًّا وكثيف وساخن، يبرد ببطء عبر مليارات السنين ليصبح قزمًا أسود.","");
  const bd=star("#3a3a3a",.35,11,3.6,"القزم الأسود","مرحلة نظرية: قزم أبيض برد تمامًا ولم يعد يشعّ.");
  // المسار الضخم (أسفل)
  const rsg=star("#ff3b2f",2.1,2.6,-4.4,"العملاق الأحمر الأعظم","نجم ضخم الكتلة يتمدّد كثيرًا، وتتكوّن في قلبه عناصر أثقل حتى الحديد.");
  const sn=cloud(7.6,-4.2,"#ffd166","#ff4d4d",1600,1.9,"المستعر الأعظم (سوبرنوفا)","انفجار هائل للنجم الضخم يقذف العناصر الثقيلة إلى الفضاء، ويسطع أكثر من مجرّة كاملة لفترة قصيرة.");
  const ns=star("#9fd3ff",.3,11,-2.9,"النجم النيوتروني","بقايا شديدة الكثافة: ملعقة صغيرة منه كتلتها ملايين الأطنان.");
  const bhG=new T.Group();const bh=new T.Mesh(new T.SphereGeometry(.6,32,24),new T.MeshBasicMaterial({color:0x000000}));const disk=new T.Mesh(new T.RingGeometry(.8,1.6,64),new T.MeshBasicMaterial({color:0xff9a3c,side:T.DoubleSide,transparent:true,opacity:.85}));disk.rotation.x=1.2;bhG.add(bh,disk);bhG.position.set(11,-5.6,0);root.add(bhG);A.pick(bhG,"الثقب الأسود","إذا كانت الكتلة المتبقّية كبيرة جدًّا تنهار إلى نقطة جاذبيتها هائلة لا يفلت منها حتى الضوء.");root.add(A.label("الثقب الأسود",new T.Vector3(11,-7.1,0),"#2b1218"));
  const AR=(a,b,c,bend)=>root.add(arrow(T,a,b,c,mat,bend||0));const V=(x,y)=>new T.Vector3(x,y,0);
  AR(V(-7,0),V(-6.2,0),"#999",.3);AR(V(-4.6,0),V(-3.1,0),"#999",.3);AR(V(-.9,.7),V(.9,3),"#e0a84f",.6);AR(V(-.9,-.7),V(.6,-3.4),"#e05a4f",-.6);
  AR(V(4.6,3.6),V(5.7,3.6),"#aaa",.4);AR(V(8.2,3.9),V(10.5,3.8),"#aaa",.5);AR(V(5.3,-4.2),V(5.8,-4.2),"#aaa",.3);AR(V(9.1,-3.9),V(10.6,-3.1),"#aaa",.3);AR(V(9.1,-4.6),V(10.2,-5.4),"#aaa",-.3);
  root.add(A.label("نجم متوسّط الكتلة (مثل الشمس)",V(5,6.4),"#1f6f5b"));root.add(A.label("نجم ضخم الكتلة",V(-1.5,-6.6),"#9b2c3f"));
  const up=[rg,wd,bd],down=[rsg,ns,bhG];const ptsU=[pn],ptsD=[sn];
  const dim=(arr,v)=>arr.forEach(g=>g.traverse(o=>{if(o.material){o.material.transparent=true;o.material.opacity=v;}}));
  let path="all";const bA=A.control("✨ المساران",()=>{path="all";dim(up,1);dim(down,1);ptsU.concat(ptsD).forEach(p=>p.material.opacity=.9);[bS,bB].forEach(b=>b.setAttribute("aria-pressed","false"));return true;},true);
  const bS=A.control("☀️ نجم متوسّط",()=>{path="sun";dim(up,1);dim(down,.15);ptsU.forEach(p=>p.material.opacity=.9);ptsD.forEach(p=>p.material.opacity=.1);[bA,bB].forEach(b=>b.setAttribute("aria-pressed","false"));A.info("مصير نجم مثل الشمس","سديم ← نجم أوّلي ← نسق رئيس (≈ 10 مليارات سنة) ← عملاق أحمر ← سديم كوكبي + قزم أبيض ← قزم أسود.");return true;});
  const bB=A.control("💥 نجم ضخم",()=>{path="big";dim(down,1);dim(up,.15);ptsD.forEach(p=>p.material.opacity=.9);ptsU.forEach(p=>p.material.opacity=.1);[bA,bS].forEach(b=>b.setAttribute("aria-pressed","false"));A.info("مصير نجم ضخم الكتلة","سديم ← نجم أوّلي ← نسق رئيس (ملايين السنين فقط) ← عملاق أحمر أعظم ← مستعر أعظم ← نجم نيوتروني أو ثقب أسود.");return true;});
  A.st.yaw=0;A.st.pitch=.15;A.st.auto=false;
  A.tick((dt,t)=>{neb.rotation.y+=dt*.15;pn.rotation.y-=dt*.2;sn.rotation.y+=dt*.25;const s=1+.08*Math.sin(t*4);sn.scale.setScalar(1+.15*Math.sin(t*2));rg.scale.setScalar(1+.04*Math.sin(t*1.3));ms.children[1].scale.setScalar(3.2*s);disk.rotation.z+=dt*1.5;});}});
/* ---------- DNA ---------- */
M3D.register("dna",{title:"جزيء DNA (اللولب المزدوج)",desc:"شريطان من السكّر والفوسفات تربطهما قواعد نيتروجينية متزاوجة: A مع T و G مع C. شغّلي «التضاعف» لتري انفصال الشريطين.",dist:21,
 build(A){const T=A.THREE,{mat,root}=A;const N=22,rise=.55,R=2.1,tw=.6;const COL={A:"#e74c3c",T:"#f1c40f",G:"#2ecc71",C:"#3498db"},PAIR={A:"T",T:"A",G:"C",C:"G"};
  const seq=Array.from({length:N},()=>"ATGC"[Math.floor(Math.random()*4)]);const g=new T.Group();root.add(g);const bb1=[],bb2=[],rungs=[];
  const sug=new T.SphereGeometry(.26,14,10),pho=new T.SphereGeometry(.2,12,8),rg=new T.CylinderGeometry(.13,.13,1,10);
  for(let i=0;i<N;i++){const a=i*tw,y=(i-N/2)*rise;const p1=new T.Vector3(R*Math.cos(a),y,R*Math.sin(a)),p2=new T.Vector3(R*Math.cos(a+Math.PI*.8),y,R*Math.sin(a+Math.PI*.8));
   const s1=new T.Mesh(sug,mat("#e67e22")),s2=new T.Mesh(sug,mat("#e67e22"));s1.position.copy(p1);s2.position.copy(p2);g.add(s1,s2);A.pick(s1,"سكّر رايبوز منقوص الأكسجين","جزء من العمود الفقري لشريط DNA، ترتبط به القاعدة النيتروجينية.");A.pick(s2,"سكّر رايبوز منقوص الأكسجين","جزء من العمود الفقري لشريط DNA.");
   if(i<N-1){[[p1,a+tw*.5,R],[p2,a+Math.PI*.8+tw*.5,R]].forEach(([p,aa],k)=>{const ph=new T.Mesh(pho,mat("#8e44ad"));ph.position.set(R*Math.cos(aa),y+rise/2,R*Math.sin(aa));g.add(ph);A.pick(ph,"مجموعة الفوسفات","تربط السكّر في نيوكليوتيد بالسكّر في النيوكليوتيد التالي.");(k?bb2:bb1).push(ph);});}
   const b=seq[i],c=PAIR[b];const mid=p1.clone().add(p2).multiplyScalar(.5);
   const mk=(from,to,base)=>{const m=new T.Mesh(rg,mat(COL[base]));const d=to.clone().sub(from);m.scale.y=d.length();m.position.copy(from.clone().add(to).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());
     const nm={A:"الأدينين (A)",T:"الثايمين (T)",G:"الغوانين (G)",C:"السايتوسين (C)"}[base];A.pick(m,nm,"قاعدة نيتروجينية تتزاوج دائمًا مع "+{A:"الثايمين T",T:"الأدينين A",G:"السايتوسين C",C:"الغوانين G"}[base]+"، وترتيب القواعد يحمل المعلومات الوراثية.");g.add(m);return m;};
   const r1=mk(p1,mid,b),r2=mk(mid,p2,c);bb1.push(s1,r1);bb2.push(s2,r2);rungs.push([r1,r2,s1,s2]);}
  g.add(A.label("A–T  ·  G–C",new T.Vector3(0,N/2*rise+1.2,0)));
  let rep=false,u=0;A.control("🧬 التضاعف (فكّ الشريطين)",()=>{rep=!rep;return rep;});
  A.tick((dt,t)=>{g.rotation.y+=dt*.25;u+=((rep?1:0)-u)*dt*1.5;bb1.forEach(m=>{m.userData.o=m.userData.o||m.position.clone();m.position.x=m.userData.o.x-u*2.2;});bb2.forEach(m=>{m.userData.o=m.userData.o||m.position.clone();m.position.x=m.userData.o.x+u*2.2;});});}});

})();
