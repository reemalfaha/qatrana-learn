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
