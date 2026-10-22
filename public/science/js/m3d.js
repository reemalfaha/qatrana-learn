/* نماذج ثلاثية الأبعاد تفاعلية — منصّة العلوم (three.js) */
var M3D=(()=>{const REG={};const live=new Set();
 const mat=(c,o={})=>new THREE.MeshPhongMaterial(Object.assign({color:new THREE.Color(c),shininess:70,specular:0x444444},o));
 function register(k,d){REG[k]=d;}
 function has(k){return !!REG[k];}
 function list(){return Object.entries(REG).map(([k,d])=>[k,d.title]);}
 function mount(box,k){const d=REG[k];if(!d||!window.THREE)return;
  const wrap=el("div",{class:"m3d"});const cv=el("canvas",{"aria-label":d.title});const hint=el("div",{class:"hint"},"اسحبي للتدوير · اضغطي على أي جزء");
  const lbl=el("div",{class:"lbl"},el("b",{},d.title),el("div",{class:"small muted"},d.desc));wrap.append(cv,hint,lbl);
  const head=el("div",{class:"row",style:{justifyContent:"space-between",marginBottom:"8px"}},el("h3",{},"🧊 "+d.title));const ctr=el("div",{class:"chips"});head.append(ctr);
  box.append(head,wrap);
  const R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));
  if(THREE.SRGBColorSpace)R.outputColorSpace=THREE.SRGBColorSpace;R.localClippingEnabled=true;
  const sc=new THREE.Scene();const cam=new THREE.PerspectiveCamera(40,1,.1,500);
  sc.add(new THREE.HemisphereLight(0xffffff,0x998877,.9));const dl=new THREE.DirectionalLight(0xffffff,.8);dl.position.set(5,8,6);sc.add(dl);const dl2=new THREE.DirectionalLight(0xffeedd,.35);dl2.position.set(-6,-3,-4);sc.add(dl2);
  const root=new THREE.Group();sc.add(root);
  const st={yaw:.6,pitch:.35,dist:d.dist||14,auto:true,t:0,picks:[],sel:null,onT:[]};
  const api={THREE,mat,root,sc,st,
   pick(obj,name,info){obj.traverse(o=>{if(o.isMesh){o.userData.pick={name,info,obj};st.picks.push(o);}});return obj;},
   label(text,pos,color="#7A1F2E"){const c=document.createElement("canvas"),x=c.getContext("2d"),f=44;x.font="700 "+f+"px Cairo,sans-serif";const w=Math.ceil(x.measureText(text).width)+28;c.width=w;c.height=f+22;
     x.font="700 "+f+"px Cairo,sans-serif";x.fillStyle="rgba(255,255,255,.88)";x.beginPath();x.roundRect?x.roundRect(0,0,w,c.height,18):x.rect(0,0,w,c.height);x.fill();x.fillStyle=color;x.textAlign="center";x.textBaseline="middle";x.direction="rtl";x.fillText(text,w/2,c.height/2+2);
     const tx=new THREE.CanvasTexture(c);if(THREE.SRGBColorSpace)tx.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,depthTest:false,transparent:true}));sp.scale.set(w/c.height*.55,.55,1);sp.position.copy(pos);sp.renderOrder=9;return sp;},
   tick(fn){st.onT.push(fn);},
   control(label,fn,pressed){const b=el("button",{class:"chip","aria-pressed":String(!!pressed),onclick:()=>{const r=fn(b);if(r!==undefined)b.setAttribute("aria-pressed",String(r));}},label);ctr.append(b);return b;},
   info(name,text){lbl.innerHTML="";lbl.append(el("b",{},name),el("div",{class:"small"},text));},
   reset(){lbl.innerHTML="";lbl.append(el("b",{},d.title),el("div",{class:"small muted"},d.desc));}};
  d.build(api);
  const size=()=>{const w=wrap.clientWidth||600,h=Math.round(Math.min(520,Math.max(320,w*.72)));R.setSize(w,h,false);cv.style.height=h+"px";cam.aspect=w/h;cam.updateProjectionMatrix();};size();
  new ResizeObserver(size).observe(wrap);
  let drag=null,moved=0,pts=new Map(),pinch=0;
  cv.addEventListener("pointerdown",e=>{cv.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);drag=[e.clientX,e.clientY];moved=0;st.auto=false;if(pts.size===2){const[a,b]=[...pts.values()];pinch=Math.hypot(a[0]-b[0],a[1]-b[1]);}});
  cv.addEventListener("pointermove",e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,[e.clientX,e.clientY]);
    if(pts.size===2){const[a,b]=[...pts.values()],q=Math.hypot(a[0]-b[0],a[1]-b[1]);if(pinch)st.dist=Math.max(4,Math.min(40,st.dist*pinch/q));pinch=q;moved=99;return;}
    if(!drag)return;const dx=e.clientX-drag[0],dy=e.clientY-drag[1];moved+=Math.abs(dx)+Math.abs(dy);st.yaw-=dx*.008;st.pitch=Math.max(-1.3,Math.min(1.3,st.pitch+dy*.008));drag=[e.clientX,e.clientY];});
  const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=0;if(drag&&moved<6)click(e);drag=null;};cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",e=>{pts.delete(e.pointerId);drag=null;});
  cv.addEventListener("wheel",e=>{e.preventDefault();st.dist=Math.max(4,Math.min(40,st.dist*(e.deltaY>0?1.1:.9)));},{passive:false});
  cv.addEventListener("dblclick",()=>{st.yaw=.6;st.pitch=.35;st.dist=d.dist||14;st.auto=true;api.reset();});
  const ray=new THREE.Raycaster();
  function click(e){const r=cv.getBoundingClientRect();ray.setFromCamera({x:(e.clientX-r.left)/r.width*2-1,y:-(e.clientY-r.top)/r.height*2+1},cam);
    const hit=ray.intersectObjects(st.picks.filter(o=>o.visible&&isVis(o)),false)[0];
    if(st.sel){st.sel.traverse(o=>{if(o.isMesh&&o.userData.em0!==undefined){o.material.emissive.setHex(o.userData.em0);}});st.sel=null;}
    if(!hit){api.reset();return;}const p=hit.object.userData.pick;st.sel=p.obj;p.obj.traverse(o=>{if(o.isMesh&&o.material.emissive){o.material=o.material.clone();o.userData.em0=o.material.emissive.getHex();o.material.emissive.setHex(0x553300);}});api.info(p.name,p.info);
    if(!S.seen["m3d:"+k+":"+p.name]){S.seen["m3d:"+k+":"+p.name]=1;save();}}
  const isVis=o=>{for(let x=o;x;x=x.parent)if(!x.visible)return false;return true;};
  live.add(R);let last=performance.now();
  (function loop(now){if(!document.body.contains(cv)){R.dispose();live.delete(R);return;}const dt=Math.min(.05,(now-last)/1000);last=now;st.t+=dt;
    if(st.auto)st.yaw+=dt*.18;st.onT.forEach(f=>f(dt,st.t));
    cam.position.set(st.dist*Math.cos(st.pitch)*Math.sin(st.yaw),st.dist*Math.sin(st.pitch),st.dist*Math.cos(st.pitch)*Math.cos(st.yaw));cam.lookAt(0,0,0);R.render(sc,cam);requestAnimationFrame(loop);})(last);
 }
 return {register,has,list,mount,mat};})();

/* ---------- الخلية الحيوانية والنباتية ---------- */
M3D.register("cell",{title:"الخلية الحيوانية والنباتية",desc:"قارني بين الخليتين، واقطعي الخلية لتري ما بداخلها، واضغطي على أي عضية لتعرفي وظيفتها.",dist:15,
 build(A){const T=A.THREE,{mat,root}=A;let plant=false,cut=true;const G={animal:new T.Group(),plant:new T.Group()};root.add(G.animal,G.plant);
  const clip=new T.Plane(new T.Vector3(0,0,-1),0.0);const clipM=(c,o={})=>{const m=mat(c,o);m.clippingPlanes=[clip];m.side=T.DoubleSide;return m;};
  const add=(g,mesh,name,info)=>{g.add(mesh);A.pick(mesh,name,info);return mesh;};
  const rnd=(a,b)=>a+Math.random()*(b-a);
  const blob=(r,c,o)=>{const g=new T.SphereGeometry(r,64,48);const p=g.attributes.position;for(let i=0;i<p.count;i++){const v=new T.Vector3().fromBufferAttribute(p,i);const n=1+.06*Math.sin(v.x*1.3)*Math.cos(v.y*1.1)+.04*Math.sin(v.z*1.7);v.multiplyScalar(n);p.setXYZ(i,v.x,v.y,v.z);}g.computeVertexNormals();return new T.Mesh(g,o||clipM(c,{transparent:true,opacity:.35,depthWrite:false}));};
  function mito(){const g=new T.Group();const body=new T.Mesh(new T.CapsuleGeometry?new T.CapsuleGeometry(.32,.9,8,16):new T.SphereGeometry(.45,24,16),mat("#e2683c"));g.add(body);
    for(let i=-2;i<=2;i++){const f=new T.Mesh(new T.TorusGeometry(.22,.035,6,20,Math.PI),mat("#ffd0a8"));f.position.y=i*.2;f.rotation.y=Math.PI/2;g.add(f);}return g;}
  function golgi(){const g=new T.Group();for(let i=0;i<5;i++){const s=new T.Mesh(new T.TorusGeometry(1-i*.06,.09,8,30,Math.PI*.9),mat("#e6b422"));s.position.z=i*.2;s.rotation.z=Math.PI*.55;g.add(s);}
    for(let i=0;i<5;i++){const v=new T.Mesh(new T.SphereGeometry(.11,12,10),mat("#f2c94c"));v.position.set(rnd(-1,1),rnd(.6,1.2),rnd(0,1));g.add(v);}return g;}
  function er(rough){const g=new T.Group();for(let i=0;i<4;i++){const t=new T.Mesh(new T.TorusGeometry(2+i*.32,.07,8,60,Math.PI*1.3),mat(rough?"#5b8def":"#8fb8ff"));t.rotation.x=Math.PI/2;t.rotation.z=i*.3;t.position.y=(i-1.5)*.18;g.add(t);
    if(rough)for(let k=0;k<18;k++){const a=k/18*Math.PI*1.3,rb=new T.Mesh(new T.SphereGeometry(.06,6,5),mat("#2b3a8f"));rb.position.set(Math.cos(a)*(2+i*.32),(i-1.5)*.18+.08,Math.sin(a)*(2+i*.32));g.add(rb);}}return g;}
  function nucleus(){const g=new T.Group();const env=new T.Mesh(new T.SphereGeometry(1.6,48,36),clipM("#8e5bd0",{transparent:true,opacity:.55}));g.add(env);
    const nl=new T.Mesh(new T.SphereGeometry(.55,32,24),mat("#4b1f7a"));nl.position.set(.3,.2,0);g.add(nl);
    for(let i=0;i<14;i++){const c=new T.Mesh(new T.TorusKnotGeometry(.18,.03,30,5,2,3),mat("#c39bec"));c.position.set(rnd(-1,1),rnd(-1,1),rnd(-1,1)).clampLength(0,1.1);g.add(c);}return {g,env,nl};}
  /* الحيوانية */
  {const g=G.animal;add(g,blob(4.2,"#f3a5a5"),"الغشاء البلازمي","يحيط بالخلية وينظّم دخول المواد وخروجها؛ له نفاذية اختيارية، ويتكوّن من طبقتين من الدهون المفسفرة تتخلّلها بروتينات.");
   const cy=new T.Mesh(new T.SphereGeometry(4.05,48,36),clipM("#ffe3dc",{transparent:true,opacity:.12,depthWrite:false}));g.add(cy);
   const n=nucleus();g.add(n.g);A.pick(n.env,"النواة","مركز التحكّم في أنشطة الخلية، وتحوي المادة الوراثية DNA، ويحيط بها غلاف نووي مثقّب.");A.pick(n.nl,"النوية","تركيب داخل النواة يصنع الرايبوسومات.");
   add(g,er(true),"الشبكة الإندوبلازمية الخشنة","قنوات أغشية تحيط بالنواة، تلتصق بها رايبوسومات، وتنقل البروتينات داخل الخلية.");
   const sm=er(false);sm.scale.setScalar(1.25);sm.rotation.set(.6,0,.4);add(g,sm,"الشبكة الإندوبلازمية الملساء","قنوات بلا رايبوسومات، تصنع الدهون وتخلّص الخلية من بعض السموم.");
   const go=golgi();go.position.set(-2.4,1.2,.6);add(g,go,"جهاز غولجي","أكياس غشائية متراصّة تعدّل البروتينات وتغلّفها وتوزّعها في حويصلات.");
   for(let i=0;i<7;i++){const m=mito();m.position.set(rnd(-3,3),rnd(-3,3),rnd(-3,3)).setLength(rnd(2.4,3.3));m.rotation.set(rnd(0,3),rnd(0,3),rnd(0,3));add(g,m,"الميتوكندريا","مصنع الطاقة في الخلية؛ يحدث فيها التنفّس الخلوي الهوائي وتنتج ATP.");}
   for(let i=0;i<6;i++){const l=new T.Mesh(new T.SphereGeometry(.28,20,16),mat("#3fae6b"));l.position.set(rnd(-3,3),rnd(-3,3),rnd(-3,3)).setLength(rnd(2.2,3.4));add(g,l,"الأجسام المحلّلة","حويصلات تحوي إنزيمات هاضمة تحلّل المواد الغذائية والعضيات التالفة.");}
   const ce=new T.Group();for(let i=0;i<2;i++){const c=new T.Mesh(new T.CylinderGeometry(.16,.16,.7,9),mat("#2a9d8f"));c.rotation.z=i?Math.PI/2:0;c.position.x=i*.25;ce.add(c);}ce.position.set(2.3,-1.6,.8);add(g,ce,"المريكزان","تركيبان أسطوانيان في الخلية الحيوانية يشاركان في تكوين خيوط المغزل في أثناء الانقسام.");
   const rb=new T.InstancedMesh(new T.SphereGeometry(.06,6,5),mat("#1d2b6b"),160);const M=new T.Matrix4();for(let i=0;i<160;i++){const v=new T.Vector3(rnd(-1,1),rnd(-1,1),rnd(-1,1)).setLength(rnd(1.8,3.8));M.setPosition(v);rb.setMatrixAt(i,M);}add(g,rb,"الرايبوسومات","أصغر العضيات؛ تصنع البروتينات، وتوجد حرّة في السيتوبلازم أو ملتصقة بالشبكة الخشنة.");
   g.add(A.label("الخلية الحيوانية",new T.Vector3(0,4.9,0)));}
  /* النباتية */
  {const g=G.plant;const box=(w,h,d,r)=>{const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
     const geo=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelThickness:.25,bevelSize:.25,bevelSegments:4});geo.translate(0,0,-d/2);return geo;};
   add(g,new T.Mesh(box(9,6.6,4.6,.8),clipM("#6aa84f",{transparent:true,opacity:.28,depthWrite:false})),"الجدار الخلوي","طبقة صلبة من السليلوز خارج الغشاء البلازمي تمنح الخلية النباتية الدعامة والشكل الثابت.");
   add(g,new T.Mesh(box(8.5,6.1,4.1,.7),clipM("#b9e39f",{transparent:true,opacity:.22,depthWrite:false})),"الغشاء البلازمي","يلي الجدار الخلوي من الداخل، وينظّم دخول المواد وخروجها.");
   const vac=new T.Mesh(box(5,3.6,2.4,.9),clipM("#7fc8f8",{transparent:true,opacity:.5}));vac.position.set(.8,-.3,0);add(g,vac,"الفجوة العصارية المركزية","فجوة كبيرة تخزّن الماء والأملاح والفضلات، وتحافظ على امتلاء الخلية وصلابتها.");
   const n=nucleus();n.g.scale.setScalar(.75);n.g.position.set(-2.9,1.6,.4);g.add(n.g);A.pick(n.env,"النواة","تتحكّم في أنشطة الخلية وتحوي المادة الوراثية، وتُدفع غالبًا إلى جانب الخلية بسبب الفجوة الكبيرة.");A.pick(n.nl,"النوية","تصنع الرايبوسومات.");
   for(let i=0;i<9;i++){const c=new T.Group();const b=new T.Mesh(new T.SphereGeometry(.5,24,16),mat("#2e8b3a"));b.scale.set(1.4,.75,.9);c.add(b);
     for(let k=-1;k<=1;k++){const gr=new T.Mesh(new T.CylinderGeometry(.13,.13,.22,12),mat("#0f5a1f"));gr.position.set(k*.3,0,0);gr.rotation.x=Math.PI/2;c.add(gr);}
     const a=i/9*Math.PI*2;c.position.set(Math.cos(a)*3.5,Math.sin(a)*2.5,rnd(-1.4,1.4));c.rotation.z=a;add(g,c,"البلاستيدات الخضراء","تحوي صبغة الكلوروفيل، ويحدث فيها البناء الضوئي فتحوّل طاقة الضوء إلى طاقة كيميائية في الغلوكوز.");}
   for(let i=0;i<4;i++){const m=mito();m.scale.setScalar(.8);m.position.set(rnd(-3.4,-1.5),rnd(-2.5,0),rnd(-1.4,1.4));m.rotation.set(rnd(0,3),rnd(0,3),0);add(g,m,"الميتوكندريا","مكان التنفّس الخلوي وإنتاج الطاقة في الخلية النباتية أيضًا.");}
   const go=golgi();go.scale.setScalar(.6);go.position.set(-1.2,2.2,.5);add(g,go,"جهاز غولجي","يعدّل البروتينات ويغلّفها ويوزّعها.");
   g.add(A.label("الخلية النباتية",new T.Vector3(0,4.4,0)));G.plant.visible=false;}
  A.st.dist=15;
  A.control("🐾 حيوانية",b=>{plant=false;G.animal.visible=true;G.plant.visible=false;b.parentNode.children[1].setAttribute("aria-pressed","false");A.reset();return true;},true);
  A.control("🌿 نباتية",b=>{plant=true;G.animal.visible=false;G.plant.visible=true;b.parentNode.children[0].setAttribute("aria-pressed","false");A.reset();return true;});
  A.control("✂️ قطع",()=>{cut=!cut;clip.constant=cut?0:50;return cut;},true);
  A.tick((dt,t)=>{G.animal.children.forEach((c,i)=>{if(c.userData.pick&&c.userData.pick.name==="الميتوكندريا")c.rotation.x+=dt*.2;});});
 }});

/* ---------- الأنظمة البلّورية للمعادن ---------- */
M3D.register("crystal",{title:"الأنظمة البلّورية للمعادن",desc:"اختاري المعدن، وأظهري عناصر التناظر، واضغطي على البلّورة لتعرفي خصائصها.",dist:9,
 build(A){const T=A.THREE,{mat,root}=A;const G={};
  const glass=(c)=>new T.MeshPhongMaterial({color:new T.Color(c),shininess:120,specular:0xffffff,transparent:true,opacity:.82,flatShading:true});
  const edges=(geo,c="#3a2a30")=>new T.LineSegments(new T.EdgesGeometry(geo),new T.LineBasicMaterial({color:c}));
  function make(k,geo,c,name,info){const g=new T.Group();const m=new T.Mesh(geo,glass(c));g.add(m,edges(geo));A.pick(m,name,info);G[k]=g;g.visible=false;root.add(g);return g;}
  make("halite",new T.BoxGeometry(3,3,3),"#e9eef5","الهاليت (ملح الطعام) NaCl","النظام المكعّب: ثلاثة محاور متساوية متعامدة. مجموعة الهاليدات، قساوته 2.5، له انفصام مكعّب في ثلاثة اتجاهات متعامدة، وطعمه مالح.");
  {const g=new T.CylinderGeometry(1.4,1.4,3.2,6);const q=make("quartz",g,"#d9c7f2","الكوارتز SiO₂","النظام السداسي: منشور سداسي ينتهي بهرم. من السيليكات، قساوته 7، بلا انفصام ومكسره محاري، وبريقه زجاجي.");
   const top=new T.ConeGeometry(1.4,1.4,6);const t1=new T.Mesh(top,glass("#d9c7f2"));t1.position.y=2.3;const t2=t1.clone();t2.rotation.z=Math.PI;t2.position.y=-2.3;q.add(t1,t2,(()=>{const e=edges(top);e.position.y=2.3;return e;})());A.pick(t1,"الكوارتز SiO₂","النظام السداسي: منشور سداسي ينتهي بهرم. قساوته 7.");}
  {const g=new T.BoxGeometry(2.6,2.6,2.6);const m4=new T.Matrix4().makeShear(0,.45,0,.45,0,0);g.applyMatrix4(m4);make("calcite",g,"#fff3d6","الكالسايت CaCO₃","النظام ثلاثي التماثل (معيني الأوجه). من الكربونات، قساوته 3، انفصام معيني في ثلاثة اتجاهات غير متعامدة، ويفور مع الحمض المخفّف، ويُظهر انكسارًا مزدوجًا.");}
  {const g=new T.OctahedronGeometry(2.1);make("diamond",g,"#bfe9ff","الألماس C","النظام المكعّب (ثماني الأوجه). معدن أحادي العنصر من الكربون، أقسى المعادن (10 على مقياس موس)، بريقه ماسي.");}
  {const g=new T.BoxGeometry(2.4,2.4,2.4);make("pyrite",g,"#d8b13a","البايرايت (ذهب المغفّلين) FeS₂","النظام المكعّب. من الكبريتيدات، بريقه فلزّي ولونه أصفر نحاسي، وحكاكته سوداء مخضرّة، وقساوته 6–6.5.");G.pyrite.children[0].material=new T.MeshPhongMaterial({color:"#c9a227",shininess:140,specular:0xffffff,flatShading:true});}
  /* عناصر التناظر */
  const sym=new T.Group();root.add(sym);sym.visible=false;
  const plane=new T.Mesh(new T.PlaneGeometry(5,5),new T.MeshBasicMaterial({color:0xc2297a,transparent:true,opacity:.22,side:T.DoubleSide,depthWrite:false}));sym.add(plane);A.pick(plane,"مستوى التناظر","مستوى يقسم البلّورة إلى نصفين، كلٌّ منهما صورة مرآة للآخر.");
  const ax=new T.Mesh(new T.CylinderGeometry(.05,.05,6.5,8),mat("#2563c9"));sym.add(ax);A.pick(ax,"محور التناظر","خطّ وهمي إذا دارت البلّورة حوله دورة كاملة تكرّرت أوجهها عددًا من المرّات (2 أو 3 أو 4 أو 6).");
  const cen=new T.Mesh(new T.SphereGeometry(.16,16,12),mat("#1f8f5b"));sym.add(cen);A.pick(cen,"مركز التناظر","نقطة في مركز البلّورة، لكل وجه يقابله وجه مماثل على البعد نفسه منها.");
  let cur="halite";const show=k=>{Object.entries(G).forEach(([x,g])=>g.visible=x===k);cur=k;A.reset();};show(cur);
  const names=[["halite","🧂 هاليت"],["quartz","💎 كوارتز"],["calcite","🪨 كالسايت"],["pyrite","✨ بايرايت"],["diamond","💠 ألماس"]];
  const btns=names.map(([k,t])=>A.control(t,()=>{btns.forEach(b=>b.setAttribute("aria-pressed","false"));show(k);return true;},k===cur));
  A.control("📐 عناصر التناظر",()=>{sym.visible=!sym.visible;return sym.visible;});
  A.tick((dt,t)=>{plane.rotation.y=Math.sin(t*.6)*.0;});}});

/* ---------- دورة الماء والمياه الجوفية ---------- */
M3D.register("water",{title:"دورة الماء والمياه الجوفية",desc:"تابعي قطرة الماء: تبخّر، تكاثف، هطل، جريان سطحي، وارتشاح إلى الخزّان الجوفي. اضغطي على أي جزء.",dist:20,
 build(A){const T=A.THREE,{mat,root}=A;A.st.pitch=.45;
  const box=(w,h,d,c,o)=>new T.Mesh(new T.BoxGeometry(w,h,d),mat(c,o));
  /* الطبقات (مقطع عرضي) */
  const L=[[-3.6,1.2,"#c9a36b","طبقة رملية (خزّان جوفي)","طبقة مسامية نفّاذة مشبّعة بالماء: خزّان مائي جوفي (Aquifer)."],[-4.8,1.2,"#8a7a6a","طبقة طينية غير نفّاذة","طبقة قليلة النفاذية تمنع تسرّب الماء إلى الأسفل، فيتجمّع فوقها الماء الجوفي."],[-2.2,1.6,"#b08d57","التربة ونطاق التهوية","نطاق غير مشبّع؛ يمرّ فيه الماء المرتشح نحو الأسفل."]];
  L.forEach(([y,h,c,n,i])=>{const m=box(16,h,6,c);m.position.y=y;root.add(m);A.pick(m,n,i);});
  const wt=new T.Mesh(new T.BoxGeometry(16.02,.06,6.02),mat("#2b7bd6"));wt.position.y=-3.0;root.add(wt);A.pick(wt,"منسوب المياه الجوفية","السطح العلوي لنطاق التشبّع، يرتفع في الشتاء وينخفض بالضخّ الجائر.");
  const sat=new T.Mesh(new T.BoxGeometry(16.02,1.2,6.02),new T.MeshPhongMaterial({color:0x3a8ee6,transparent:true,opacity:.35}));sat.position.y=-3.6;root.add(sat);
  /* السطح: جبل وبحر */
  const ground=new T.Mesh(new T.BoxGeometry(10,.4,6),mat("#6aa84f"));ground.position.set(-3,-1.2,0);root.add(ground);A.pick(ground,"سطح الأرض","يرتشح جزء من الماء عبره إلى باطن الأرض، ويجري جزء آخر على السطح.");
  const mt=new T.Mesh(new T.ConeGeometry(3,4.5,5),mat("#7d8f5a",{flatShading:true}));mt.position.set(-5,1.2,0);root.add(mt);const snow=new T.Mesh(new T.ConeGeometry(1.05,1.6,5),mat("#ffffff",{flatShading:true}));snow.position.set(-5,2.75,0);root.add(snow);A.pick(mt,"الجبل","تهطل عليه الأمطار والثلوج، وتنحدر منه المياه بالجريان السطحي.");
  const sea=new T.Mesh(new T.BoxGeometry(6,.5,6),new T.MeshPhongMaterial({color:0x1e6fb8,shininess:120,transparent:true,opacity:.9}));sea.position.set(5,-1.25,0);root.add(sea);A.pick(sea,"البحر","أكبر مخزون للماء؛ تبخّر الشمس ماءه فيصعد بخارًا إلى الجو.");
  const river=new T.Mesh(new T.BoxGeometry(6,.08,.7),mat("#3d8fe0"));river.position.set(-.5,-.98,1.6);river.rotation.z=-.08;root.add(river);A.pick(river,"الجريان السطحي (نهر)","مياه تجري على سطح الأرض نحو البحر بعد الهطل.");
  const well=new T.Mesh(new T.CylinderGeometry(.18,.18,3.2,12),mat("#555"));well.position.set(-1,-2.6,-1.5);root.add(well);A.pick(well,"البئر","تُضخّ منه المياه الجوفية؛ والضخّ الجائر يخفض منسوبها.");
  /* الشمس والسحب */
  const sun=new T.Mesh(new T.SphereGeometry(1,24,16),new T.MeshBasicMaterial({color:0xffc928}));sun.position.set(7,7,-2);root.add(sun);A.pick(sun,"الشمس","مصدر الطاقة المحرّك لدورة الماء؛ تسخّن الماء فيتبخّر.");
  const cloud=new T.Group();[[0,0,0,1.1],[1,.2,0,.9],[-1,.1,.2,.85],[.4,.6,0,.8]].forEach(([x,y,z,r])=>{const s=new T.Mesh(new T.SphereGeometry(r,18,14),mat("#f4f6fb"));s.position.set(x,y,z);cloud.add(s);});cloud.position.set(-2,5.2,0);root.add(cloud);A.pick(cloud,"السحب (التكاثف)","يبرد بخار الماء في طبقات الجو العليا فيتكاثف قطرات صغيرة تكوّن السحب.");
  /* جسيمات: بخار ومطر ورشح */
  const mk=(n,c,sz)=>{const g=new T.BufferGeometry(),p=new Float32Array(n*3);g.setAttribute("position",new T.BufferAttribute(p,3));const pts=new T.Points(g,new T.PointsMaterial({color:c,size:sz,transparent:true,opacity:.9}));root.add(pts);return {g,p,n};};
  const vap=mk(70,0xdde9ff,.22),rain=mk(110,0x2f7fd8,.16),inf=mk(50,0x1d5fb0,.14);
  const R=(a,b)=>a+Math.random()*(b-a);
  for(let i=0;i<vap.n;i++){vap.p.set([R(3,7.5),R(-1,5),R(-2,2)],i*3);}for(let i=0;i<rain.n;i++){rain.p.set([R(-4,0),R(-1,4.5),R(-1.5,1.5)],i*3);}for(let i=0;i<inf.n;i++){inf.p.set([R(-6,0),R(-3,-1.2),R(-2.5,2.5)],i*3);}
  let on=true;A.control("⏯ تشغيل/إيقاف",()=>{on=!on;return on;},true);
  const lbl=(t,x,y,z)=>root.add(A.label(t,new T.Vector3(x,y,z)));lbl("تبخّر",6,2.5,2.4);lbl("تكاثف",-2,6.7,0);lbl("هطل",-3.4,3,2);lbl("جريان سطحي",.5,-.3,2.6);lbl("ارتشاح",-4,-1.9,3.2);lbl("خزّان جوفي",3,-3.6,3.2);
  A.tick(dt=>{if(!on)return;for(let i=0;i<vap.n;i++){let y=vap.p[i*3+1]+dt*1.6,x=vap.p[i*3]-dt*.9;if(y>5){y=-1;x=R(3,7.5);}vap.p[i*3]=x;vap.p[i*3+1]=y;}vap.g.attributes.position.needsUpdate=true;
    for(let i=0;i<rain.n;i++){let y=rain.p[i*3+1]-dt*5;if(y<-1){y=4.6;rain.p[i*3]=R(-4,0);}rain.p[i*3+1]=y;}rain.g.attributes.position.needsUpdate=true;
    for(let i=0;i<inf.n;i++){let y=inf.p[i*3+1]-dt*.7;if(y<-3.1){y=-1.3;}inf.p[i*3+1]=y;}inf.g.attributes.position.needsUpdate=true;cloud.position.x=-2+Math.sin(A.st.t*.3)*.6;});}});

/* ---------- دورة الكربون: البناء الضوئي والتنفّس ---------- */
M3D.register("carbon",{title:"البناء الضوئي والتنفّس: تبادل الغازات",desc:"تأخذ النبتة CO₂ وتطلق O₂ في الضوء، ويتنفّس الكائن الحي فيطلق CO₂. شاهدي الجزيئات تتحرّك، واضغطي على أي جزء.",dist:16,
 build(A){const T=A.THREE,{mat,root}=A;
  const soil=new T.Mesh(new T.CylinderGeometry(7,7,.6,48),mat("#8a6a45"));soil.position.y=-2.3;root.add(soil);
  const stem=new T.Mesh(new T.CylinderGeometry(.18,.25,4,10),mat("#3f7d2a"));stem.position.set(-2.5,-.2,0);root.add(stem);
  const leaves=new T.Group();for(let i=0;i<6;i++){const l=new T.Mesh(new T.SphereGeometry(.9,16,10),mat("#2e9b43"));l.scale.set(1.3,.25,.6);const a=i/6*Math.PI*2;l.position.set(-2.5+Math.cos(a)*1,1+i*.35,Math.sin(a)*1);l.rotation.y=-a;leaves.add(l);}root.add(leaves);
  A.pick(leaves,"أوراق النبات (البلاستيدات الخضراء)","تمتصّ الضوء بالكلوروفيل، وتأخذ CO₂ والماء لتصنع الغلوكوز وتطلق O₂: 6CO₂ + 6H₂O ← C₆H₁₂O₆ + 6O₂.");
  const sun=new T.Mesh(new T.SphereGeometry(.9,24,16),new T.MeshBasicMaterial({color:0xffcc33}));sun.position.set(-6,5.5,-2);root.add(sun);A.pick(sun,"الضوء","مصدر الطاقة للبناء الضوئي؛ وبزيادة شدّته تزداد سرعة البناء الضوئي حتى يحدّها عامل آخر.");
  const rab=new T.Group();const b=new T.Mesh(new T.SphereGeometry(1,20,16),mat("#d9cbbd"));b.scale.set(1.3,1,1);rab.add(b);const h=new T.Mesh(new T.SphereGeometry(.6,16,12),mat("#d9cbbd"));h.position.set(1.2,.6,0);rab.add(h);
  [[-.15],[.15]].forEach(([z])=>{const e=new T.Mesh(new T.CapsuleGeometry?new T.CapsuleGeometry(.12,.8,4,8):new T.CylinderGeometry(.1,.1,.9),mat("#e8dccf"));e.position.set(1.2,1.4,z);rab.add(e);});
  rab.position.set(3,-1.2,0);root.add(rab);A.pick(rab,"الكائن الحي (التنفّس الخلوي)","تحلّل خلاياه الغلوكوز بوجود O₂ في الميتوكندريا لإنتاج الطاقة، ويطلق CO₂ والماء: C₆H₁₂O₆ + 6O₂ ← 6CO₂ + 6H₂O + طاقة.");
  const mol=(c1,c2)=>{const g=new T.Group();const a=new T.Mesh(new T.SphereGeometry(.17,12,10),mat(c1));g.add(a);[-1,1].forEach(s=>{const o=new T.Mesh(new T.SphereGeometry(.14,12,10),mat(c2));o.position.x=s*.26;g.add(o);});return g;};
  const P=[];for(let i=0;i<14;i++){const co2=mol("#333333","#e03b3b");co2.userData={k:"co2",u:Math.random()};root.add(co2);P.push(co2);const o2=new T.Group();[-1,1].forEach(s=>{const o=new T.Mesh(new T.SphereGeometry(.15,12,10),mat("#e03b3b"));o.position.x=s*.13;o2.add(o);});o2.userData={k:"o2",u:Math.random()};root.add(o2);P.push(o2);}
  A.pick(P[0],"ثاني أكسيد الكربون CO₂","ينتج من التنفّس، وتمتصّه النباتات في البناء الضوئي.");A.pick(P[1],"الأكسجين O₂","ينتج من البناء الضوئي، ويستخدمه الكائن الحي في التنفّس.");
  let light=true;const lb=A.control("☀️ ضوء",()=>{light=!light;sun.visible=light;return light;},true);
  root.add(A.label("CO₂ ← تنفّس",new T.Vector3(1.5,2.6,0),"#333"));root.add(A.label("O₂ ← بناء ضوئي",new T.Vector3(-1,3.8,0),"#c0392b"));
  const a=new T.Vector3(3,-.4,0),bP=new T.Vector3(-2.5,2,0);
  A.tick(dt=>{P.forEach(p=>{const d=p.userData;d.u+=dt*.18*(light||d.k==="co2"?1:.0);if(!light&&d.k==="o2"){p.visible=false;return;}p.visible=true;if(d.u>1)d.u-=1;const u=d.u;
    const from=d.k==="co2"?a:bP,to=d.k==="co2"?bP:a;const pos=from.clone().lerp(to,u);pos.y+=Math.sin(u*Math.PI)*2.2;pos.z=Math.sin(u*9+d.u*3)*.8;p.position.copy(pos);p.rotation.y+=dt*2;});
    leaves.children.forEach((l,i)=>{l.material.emissive&&l.material.emissive.setHex(light?0x0a2a0a:0x000000);});});}});
