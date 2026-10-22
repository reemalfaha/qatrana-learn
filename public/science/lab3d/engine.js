/* محرّك المختبر ثلاثي الأبعاد — منصّة العلوم · مدرسة القطرانة الثانوية للبنات
   مشهد مختبر (طاولة، إضاءة، ظلال) + أدوات زجاجية + تجربة استقصائية بخطوات:
   السؤال ← التوقّع ← التجربة ← البيانات والرسم ← الاستنتاج ← التقرير */
var Lab3D=(function(){
const T=THREE,REG={};
const SCRIPT_URL="https://script.google.com/macros/s/AKfycby_MosnfxzYeiveIWwN61c_Rx5HYc-lTMRPeRueHiAyFnRdeafhSIWuUxPnPEI1imSK/exec";
const $=s=>document.querySelector(s);
const h=(t,a={},...k)=>{const e=document.createElement(t);for(const[x,y]of Object.entries(a)){if(y==null||y===false)continue;if(x==="class")e.className=y;else if(x==="html")e.innerHTML=y;else if(x==="style"&&typeof y==="object")Object.assign(e.style,y);else if(x.startsWith("on"))e.addEventListener(x.slice(2),y);else e.setAttribute(x,y===true?"":y);}for(const c of k.flat())if(c!=null&&c!==false)e.append(c.nodeType?c:document.createTextNode(c));return e;};
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
function student(){try{const s=JSON.parse(localStorage.getItem("qatrana.sci.v1")||"{}");return s;}catch(e){return {};}}

/* ---------- مواد وأدوات ---------- */
const M={
 std:(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:new T.Color(c),roughness:.55,metalness:.05},o)),
 glass:()=>new T.MeshPhysicalMaterial({color:0xeaf6ff,transparent:true,opacity:.22,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.05,side:T.DoubleSide,depthWrite:false}),
 liquid:(c,op=.78)=>new T.MeshStandardMaterial({color:new T.Color(c),transparent:true,opacity:op,roughness:.15,metalness:0,depthWrite:false}),
 glow:c=>new T.MeshBasicMaterial({color:new T.Color(c),transparent:true,opacity:.9,depthWrite:false,toneMapped:false})};
function canvasTex(w,hh,draw){const c=document.createElement("canvas");c.width=w;c.height=hh;const x=c.getContext("2d");draw(x,w,hh);const t=new T.CanvasTexture(c);if(T.SRGBColorSpace)t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return {tex:t,ctx:x,cv:c,update:()=>t.needsUpdate=true};}
function sprite(text,o={}){const f=o.size||44,pad=24;const c=document.createElement("canvas"),x=c.getContext("2d");x.font="700 "+f+"px 'El Messiri','Noto Naskh Arabic',sans-serif";const w=Math.ceil(x.measureText(text).width)+pad*2;c.width=w;c.height=f+pad;
  x.font="700 "+f+"px 'El Messiri','Noto Naskh Arabic',sans-serif";x.fillStyle=o.bg||"rgba(255,255,255,.92)";x.beginPath();(x.roundRect?x.roundRect(0,0,w,c.height,20):x.rect(0,0,w,c.height));x.fill();if(o.border){x.strokeStyle=o.border;x.lineWidth=5;x.stroke();}
  x.fillStyle=o.color||"#2B1218";x.textAlign="center";x.textBaseline="middle";x.direction="rtl";x.fillText(text,w/2,c.height/2+2);
  const tx=new T.CanvasTexture(c);if(T.SRGBColorSpace)tx.colorSpace=T.SRGBColorSpace;const sp=new T.Sprite(new T.SpriteMaterial({map:tx,depthTest:false,transparent:true}));const s=o.scale||.32;sp.scale.set(w/c.height*s,s,1);sp.renderOrder=20;return sp;}
function beaker(L,o={}){const r=o.r||.55,hh=o.h||1.1,g=new T.Group();
  const wall=new T.Mesh(new T.CylinderGeometry(r,r*.97,hh,40,1,true),M.glass());wall.position.y=hh/2;g.add(wall);
  const bot=new T.Mesh(new T.CircleGeometry(r*.97,40),M.glass());bot.rotation.x=-Math.PI/2;bot.position.y=.01;g.add(bot);
  const rim=new T.Mesh(new T.TorusGeometry(r,.025,8,48),M.std("#dfeef8",{transparent:true,opacity:.6}));rim.rotation.x=Math.PI/2;rim.position.y=hh;g.add(rim);
  for(let i=1;i<=4;i++){const m=new T.Mesh(new T.BoxGeometry(.12,.01,.005),M.std("#ffffff",{transparent:true,opacity:.7}));m.position.set(0,hh*i/5,r+.002);g.add(m);}
  const liq=new T.Mesh(new T.CylinderGeometry(r*.94,r*.92,1,40),M.liquid(o.color||"#7fc8ff",o.op));liq.renderOrder=2;g.add(liq);
  const api={g,liq,wall,level:o.level==null?.6:o.level,setLevel(f){api.level=f;liq.visible=f>0.01;liq.scale.y=Math.max(.001,hh*f);liq.position.y=hh*f/2+.01;},setColor(c){liq.material.color.set(c);},r,h:hh};api.setLevel(api.level);
  wall.castShadow=false;return api;}
function testTube(o={}){const r=o.r||.13,hh=o.h||1.1,g=new T.Group();const w=new T.Mesh(new T.CylinderGeometry(r,r,hh,28,1,true),M.glass());w.position.y=hh/2+r;g.add(w);
  const b=new T.Mesh(new T.SphereGeometry(r,28,14,0,Math.PI*2,Math.PI/2,Math.PI/2),M.glass());b.position.y=r;g.add(b);
  const liq=new T.Mesh(new T.CylinderGeometry(r*.9,r*.9,1,24),M.liquid(o.color||"#7fc8ff"));g.add(liq);const lb=new T.Mesh(new T.SphereGeometry(r*.9,20,10,0,Math.PI*2,Math.PI/2,Math.PI/2),M.liquid(o.color||"#7fc8ff"));lb.position.y=r;g.add(lb);
  const api={g,liq,lb,setLevel(f){liq.scale.y=Math.max(.001,hh*f);liq.position.y=r+hh*f/2;liq.visible=lb.visible=f>.01;},setColor(c){liq.material.color.set(c);lb.material.color.set(c);}};api.setLevel(o.level==null?.4:o.level);return api;}
function burner(){const g=new T.Group();const base=new T.Mesh(new T.CylinderGeometry(.45,.55,.14,32),M.std("#2d3436",{metalness:.6,roughness:.35}));base.position.y=.07;base.castShadow=true;g.add(base);
  const tube=new T.Mesh(new T.CylinderGeometry(.12,.12,1.1,24),M.std("#b2bec3",{metalness:.85,roughness:.25}));tube.position.y=.69;tube.castShadow=true;g.add(tube);
  const coll=new T.Mesh(new T.CylinderGeometry(.15,.15,.16,24),M.std("#636e72",{metalness:.7,roughness:.3}));coll.position.y=.35;g.add(coll);
  const knob=new T.Mesh(new T.CylinderGeometry(.09,.09,.12,16),M.std("#e17055"));knob.rotation.z=Math.PI/2;knob.position.set(.48,.08,0);g.add(knob);
  const hose=new T.Mesh(new T.TorusGeometry(.5,.05,10,30,Math.PI/1.4),M.std("#d63031",{roughness:.6}));hose.position.set(.95,.1,0);hose.rotation.y=Math.PI/2;hose.rotation.x=Math.PI/2;g.add(hose);
  const fl=new T.Group();fl.position.y=1.25;g.add(fl);
  const inner=new T.Mesh(new T.ConeGeometry(.075,.34,24,1,true),M.glow("#3d7bff"));inner.position.y=.17;fl.add(inner);
  const outer=new T.Mesh(new T.ConeGeometry(.17,1,28,1,true),M.glow("#7fb8ff"));outer.material.opacity=.45;outer.position.y=.5;fl.add(outer);
  const gc=document.createElement("canvas");gc.width=gc.height=128;const gx=gc.getContext("2d");const gg=gx.createRadialGradient(64,64,0,64,64,64);gg.addColorStop(0,"rgba(255,255,255,1)");gg.addColorStop(.35,"rgba(255,255,255,.55)");gg.addColorStop(1,"rgba(255,255,255,0)");gx.fillStyle=gg;gx.fillRect(0,0,128,128);
  const gt=new T.CanvasTexture(gc);const halo=new T.Sprite(new T.SpriteMaterial({map:gt,color:0x7fb8ff,transparent:true,opacity:.55,depthWrite:false,toneMapped:false}));halo.scale.set(1.1,1.7,1);halo.position.y=.55;fl.add(halo);
  const light=new T.PointLight(0x88aaff,0,4);light.position.y=.5;fl.add(light);
  fl.visible=false;
  const api={g,knob,fl,on:false,color:"#7fb8ff",lit(v){api.on=v;fl.visible=v;light.intensity=v?1.2:0;},setColor(c,strength=1){api.color=c;outer.material.color.set(c);outer.material.opacity=.45+.45*strength;halo.material.color.set(c);halo.material.opacity=.45+.45*strength;halo.scale.set(1.1+.6*strength,1.7+.9*strength,1);outer.scale.x=outer.scale.z=1+.5*strength;light.color.set(c);light.intensity=api.on?1.2+3*strength:0;},
   tick(t){if(!api.on)return;const s=1+.08*Math.sin(t*23)+.05*Math.sin(t*37);outer.scale.y=s;inner.scale.set(1,1+.05*Math.sin(t*31),1);}};return api;}
function balance(L){const g=new T.Group();const body=new T.Mesh(new T.BoxGeometry(1.3,.22,1),M.std("#f5f6fa",{roughness:.4}));body.position.y=.11;body.castShadow=true;g.add(body);
  const plate=new T.Mesh(new T.CylinderGeometry(.42,.42,.04,40),M.std("#dfe6e9",{metalness:.8,roughness:.2}));plate.position.set(0,.25,-.1);g.add(plate);
  const scr=canvasTex(256,96,(x,w,hh)=>{x.fillStyle="#0b2b14";x.fillRect(0,0,w,hh);});const screen=new T.Mesh(new T.PlaneGeometry(.55,.2),new T.MeshBasicMaterial({map:scr.tex}));screen.position.set(0,.16,.505);g.add(screen);
  const api={g,plate,top:.27,set(v,unit="g"){const x=scr.ctx;x.fillStyle="#0b2b14";x.fillRect(0,0,256,96);x.fillStyle="#7CFC00";x.font="700 58px monospace";x.textAlign="right";x.fillText(v,200,68);x.font="700 30px monospace";x.fillText(unit,246,68);scr.update();}};api.set("0.00");return api;}
function watchGlass(color="#ffffff"){const g=new T.Group();const d=new T.Mesh(new T.SphereGeometry(.38,32,10,0,Math.PI*2,Math.PI*.78,Math.PI*.22),M.glass());d.rotation.x=Math.PI;d.position.y=.42*.6;g.add(d);
  const pile=new T.Mesh(new T.ConeGeometry(.2,.12,24),M.std(color,{roughness:.95}));pile.position.y=.08;pile.castShadow=true;g.add(pile);return {g,pile};}

/* ---------- المشهد ---------- */
function stage(host,cfg){const TEST=/[?&]test/.test(location.search);const R=new T.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:TEST});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;
  if(T.SRGBColorSpace)R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.05;host.append(R.domElement);
  const sc=new T.Scene();const bg=canvasTex(8,256,(x,w,hh)=>{const g=x.createLinearGradient(0,0,0,hh);g.addColorStop(0,cfg.sky1||"#fdf2e9");g.addColorStop(1,cfg.sky2||"#e8d9f1");x.fillStyle=g;x.fillRect(0,0,w,hh);});sc.background=bg.tex;
  const cam=new T.PerspectiveCamera(40,1,.05,200);
  sc.add(new T.HemisphereLight(0xffffff,0xb39ddb,.75));const sun=new T.DirectionalLight(0xffffff,1.6);sun.position.set(4,9,6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-8,right:8,top:8,bottom:-8});sun.shadow.bias=-.0005;sc.add(sun);
  const fill=new T.DirectionalLight(0xffe0f0,.45);fill.position.set(-6,4,-3);sc.add(fill);
  // الطاولة والغرفة
  const top=new T.Mesh(new T.BoxGeometry(14,.3,7),M.std(cfg.bench||"#3d4a5c",{roughness:.6}));top.position.y=-.15;top.receiveShadow=true;sc.add(top);
  const edge=new T.Mesh(new T.BoxGeometry(14.1,.08,7.1),M.std("#B8902A",{metalness:.5,roughness:.35}));edge.position.y=-.33;sc.add(edge);
  const cab=new T.Mesh(new T.BoxGeometry(13.6,2.2,6.6),M.std("#f4ecf7"));cab.position.y=-1.4;sc.add(cab);
  for(let i=0;i<4;i++){const d=new T.Mesh(new T.BoxGeometry(3.2,1.8,.04),M.std(["#7A1F2E","#1d7f8c","#B8902A","#7a4fb5"][i],{roughness:.5}));d.position.set(-5.1+i*3.4,-1.4,3.32);sc.add(d);}
  const wall=new T.Mesh(new T.PlaneGeometry(40,14),M.std("#fbf4ee"));wall.position.set(0,5,-4.5);wall.receiveShadow=true;sc.add(wall);
  const tiles=canvasTex(512,256,(x,w,hh)=>{x.fillStyle="#ffffff";x.fillRect(0,0,w,hh);const C=["#ffe5ec","#e3f2fd","#e8f5e9","#fff8e1","#f3e5f5"];for(let i=0;i<16;i++)for(let j=0;j<8;j++){x.fillStyle=C[(i*3+j*7)%5];x.fillRect(i*32+1,j*32+1,30,30);}});
  tiles.tex.wrapS=tiles.tex.wrapT=T.RepeatWrapping;tiles.tex.repeat.set(3,1);const tw=new T.Mesh(new T.PlaneGeometry(40,3),new T.MeshStandardMaterial({map:tiles.tex,roughness:.4}));tw.position.set(0,1.5,-4.48);sc.add(tw);
  try{const pm=new T.PMREMGenerator(R);const es=new T.Scene();es.background=new T.Color(0xf6efe9);
    [[0xffffff,0,6,0,6],[0xffe2c4,-6,3,2,3],[0xc9e4ff,6,3,-2,3],[0xffd6e7,0,2,-6,3]].forEach(([c,x,y,z,s])=>{const m=new T.Mesh(new T.BoxGeometry(s,s*.4,s),new T.MeshBasicMaterial({color:c}));m.position.set(x,y,z);es.add(m);});
    sc.environment=pm.fromScene(es,.04).texture;}catch(e){}
  const wood=canvasTex(512,512,(x,w,hh)=>{x.fillStyle="#8a5a36";x.fillRect(0,0,w,hh);for(let i=0;i<220;i++){x.strokeStyle=Math.random()<.5?"rgba(60,32,16,"+(.18+Math.random()*.3)+")":"rgba(190,140,90,"+(.12+Math.random()*.2)+")";x.lineWidth=1+Math.random()*3;x.beginPath();const y=Math.random()*hh;x.moveTo(0,y);for(let k=0;k<=w;k+=32)x.lineTo(k,y+Math.sin(k/60+i)*6);x.stroke();}});
  wood.tex.wrapS=wood.tex.wrapT=T.RepeatWrapping;wood.tex.repeat.set(3,1.5);if(cfg.wood!==false){top.material=new T.MeshStandardMaterial({map:wood.tex,roughness:.5,metalness:.05});}
  const root=new T.Group();sc.add(root);
  const st={yaw:cfg.yaw||0,pitch:cfg.pitch||.42,dist:cfg.dist||9,tx:0,ty:cfg.ty||.8,tz:0,auto:false,ticks:[],anims:[],picks:[],hover:null,t:0};
  const size=()=>{const w=host.clientWidth||800,hh=host.clientHeight||480;R.setSize(w,hh,false);R.domElement.style.width=w+"px";R.domElement.style.height=hh+"px";cam.aspect=w/hh;cam.updateProjectionMatrix();};size();new ResizeObserver(size).observe(host);
  // تدوير وتكبير
  const cv=R.domElement;let drag=null,moved=0,pts=new Map(),pinch=0;const ray=new T.Raycaster();
  const hit=e=>{const r=cv.getBoundingClientRect();ray.setFromCamera({x:(e.clientX-r.left)/r.width*2-1,y:-(e.clientY-r.top)/r.height*2+1},cam);const vis=o=>{for(let x=o;x;x=x.parent)if(!x.visible)return false;return true;};const hs=ray.intersectObjects(st.picks.filter(vis),false);return hs[0]&&hs[0].object.userData.act;};
  cv.addEventListener("pointerdown",e=>{cv.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);drag=[e.clientX,e.clientY];moved=0;if(pts.size===2){const[a,b]=[...pts.values()];pinch=Math.hypot(a[0]-b[0],a[1]-b[1]);}});
  cv.addEventListener("pointermove",e=>{if(!pts.has(e.pointerId)){const a=hit(e);cv.style.cursor=a?"pointer":"grab";return;}pts.set(e.pointerId,[e.clientX,e.clientY]);
    if(pts.size===2){const[a,b]=[...pts.values()],q=Math.hypot(a[0]-b[0],a[1]-b[1]);if(pinch)st.dist=Math.max(4,Math.min(16,st.dist*pinch/q));pinch=q;moved=99;return;}
    if(!drag)return;const dx=e.clientX-drag[0],dy=e.clientY-drag[1];moved+=Math.abs(dx)+Math.abs(dy);st.yaw-=dx*.006;st.pitch=Math.max(.12,Math.min(1.25,st.pitch+dy*.005));drag=[e.clientX,e.clientY];});
  const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=0;if(drag&&moved<7){const a=hit(e);if(a)a();}drag=null;};cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",e=>{pts.delete(e.pointerId);drag=null;});
  cv.addEventListener("wheel",e=>{e.preventDefault();st.dist=Math.max(4,Math.min(16,st.dist*(e.deltaY>0?1.08:.92)));},{passive:false});
  let last=performance.now();(function loop(now){const dt=Math.min(.05,(now-last)/1000)*(st.speed==null?1:st.speed);last=now;st.t+=dt;
    st.anims=st.anims.filter(a=>{a.e+=dt;const k=Math.min(1,a.e/a.d),v=ease(k);a.f(v);if(k>=1){a.done&&a.done();return false;}return true;});
    st.ticks.forEach(f=>f(dt,st.t));
    cam.position.set(st.tx+st.dist*Math.cos(st.pitch)*Math.sin(st.yaw),st.ty+st.dist*Math.sin(st.pitch),st.tz+st.dist*Math.cos(st.pitch)*Math.cos(st.yaw));cam.lookAt(st.tx,st.ty,st.tz);R.render(sc,cam);requestAnimationFrame(loop);})(last);
  const L={T,sc,root,cam,st,R,M,render(){cam.position.set(st.tx+st.dist*Math.cos(st.pitch)*Math.sin(st.yaw),st.ty+st.dist*Math.sin(st.pitch),st.tz+st.dist*Math.cos(st.pitch)*Math.cos(st.yaw));cam.lookAt(st.tx,st.ty,st.tz);R.render(sc,cam);},beaker:o=>beaker(L,o),testTube,burner,balance:()=>balance(L),watchGlass,sprite,canvasTex,
    add(o){root.add(o.g||o);return o;},
    acts:{},click(obj,fn,name){if(name)L.acts[name]=fn;obj.traverse(m=>{if(m.isMesh){m.userData.act=fn;st.picks.push(m);}});},
    tick(f){st.ticks.push(f);},
    anim(d,f,done){return new Promise(res=>st.anims.push({d,e:0,f,done:()=>{done&&done();res();}}));},
    move(o,to,d=.8){const fr=o.position.clone();return L.anim(d,v=>o.position.lerpVectors(fr,to,v));},
    arc(o,to,d=1,hgt=1){const fr=o.position.clone();return L.anim(d,v=>{o.position.lerpVectors(fr,to,v);o.position.y+=Math.sin(v*Math.PI)*hgt;});},
    wait:s=>L.anim(s,()=>{}),
    fit(extra=1.08){const b=new T.Box3().setFromObject(root);if(b.isEmpty())return;const sz=b.getSize(new T.Vector3()),c=b.getCenter(new T.Vector3());const vf=cam.fov*Math.PI/180,hf=2*Math.atan(Math.tan(vf/2)*cam.aspect);
      const d=Math.max((sz.x/2)/Math.tan(hf/2),(sz.y/2+.6)/Math.tan(vf/2))*extra+sz.z/2;const ex2=cam.aspect<1?.72:1;st.dist=Math.max(4.5,Math.min(18,d*ex2));st.tx=c.x;st.tz=c.z*.5;st.ty=Math.max(.4,Math.min(1.4,c.y+.15));st.home={dist:st.dist,tx:st.tx,ty:st.ty,tz:st.tz};},
    home(d=1){const H=st.home;if(H)return L.focus(H.tx,H.ty,H.tz,H.dist,d);},
    focus(x,y,z,dist,d=1){const a={tx:st.tx,ty:st.ty,tz:st.tz,dist:st.dist};return L.anim(d,v=>{st.tx=a.tx+(x-a.tx)*v;st.ty=a.ty+(y-a.ty)*v;st.tz=a.tz+(z-a.tz)*v;if(dist)st.dist=a.dist+(dist-a.dist)*v;});},
    ring(obj,y=1.6){const r=new T.Mesh(new T.TorusGeometry(.17,.03,10,40),new T.MeshBasicMaterial({color:0xffc928,toneMapped:false}));r.rotation.x=Math.PI/2;const ar=new T.Mesh(new T.ConeGeometry(.1,.24,16),new T.MeshBasicMaterial({color:0xffb300,toneMapped:false}));ar.rotation.x=Math.PI;
      const g=new T.Group();g.add(r,ar);ar.position.y=.28;g.renderOrder=30;obj.add(g);g.position.y=y;let on=true;L.tick((dt,t)=>{if(!on){g.visible=false;return;}g.visible=true;g.position.y=y+.12*Math.sin(t*4);r.scale.setScalar(1+.15*Math.sin(t*4));});return {off(){on=false;},on(){on=true;}};},
    bubbles(parent,o={}){const n=o.n||40,geo=new T.SphereGeometry(o.size||.025,8,6),mt=new T.MeshStandardMaterial({color:o.color||0xffffff,transparent:true,opacity:.7,roughness:.1});const arr=[];
      for(let i=0;i<n;i++){const m=new T.Mesh(geo,mt);m.position.set((Math.random()-.5)*(o.w||.6),Math.random()*(o.h||1),(Math.random()-.5)*(o.w||.6));parent.add(m);arr.push(m);}
      let rate=0;L.tick(dt=>{arr.forEach(m=>{m.visible=rate>0;m.position.y+=dt*(.3+Math.random()*.4)*rate;if(m.position.y>(o.h||1)){m.position.y=0;}});});return {set(r){rate=r;}};}};
  return L;}

/* ---------- واجهة التجربة الاستقصائية ---------- */
function run(id){const X=REG[id];if(!X){document.body.innerHTML="<p style='padding:30px'>التجربة غير موجودة.</p>";return;}
  document.title=X.title+" · المختبر ثلاثي الأبعاد";const S=student();
  const app=$("#app");app.innerHTML="";
  const head=h("header",{class:"lh"},h("div",{},h("small",{},X.subject+" · "+X.grade+(X.book?" · "+X.book:"")),h("h1",{},"🧪 "+X.title)),h("a",{class:"back",href:"../#/labs"},"→ منصّة العلوم"));
  const view=h("div",{class:"view"}),hud=h("div",{class:"hud"}),toastEl=h("div",{class:"ltoast"});view.append(hud,toastEl);
  const panel=h("aside",{class:"panel"});app.append(head,h("div",{class:"lab"},view,panel));
  const L=stage(view,X.scene||{});
  const state={stage:0,pred:null,data:[],concl:{},done:new Set(),started:false};
  const STG=[["🎯","السؤال"],["🤔","التوقّع"],["🧪","التجربة"],["📋","البيانات"],["💡","الاستنتاج"],["📄","التقرير"]];
  const API={L,state,hud(html){hud.innerHTML=html;hud.style.display=html?"block":"none";},
    toast(m,ms=2200){toastEl.textContent=m;toastEl.classList.add("on");clearTimeout(toastEl._t);toastEl._t=setTimeout(()=>toastEl.classList.remove("on"),ms);},
    step(k){if(state.done.has(k))return;state.done.add(k);draw();if(X.steps.every(s=>state.done.has(s.k))){API.toast("🎉 أنهيتِ خطوات التجربة! انتقلي إلى البيانات",3000);}},
    record(row){state.data.push(row);if(state.stage===3)draw();else draw();},
    can(){if(!state.pred&&X.predict){API.toast("🤔 سجّلي توقّعكِ أولًا من اللوحة");go(1);return false;}return true;},
    go:(i)=>go(i)};
  function go(i){state.stage=i;draw();}
  function chart(){if(!X.chart||!state.data.length)return null;const c=h("canvas",{width:640,height:340,class:"chart"});const x=c.getContext("2d");const ch=X.chart,D=state.data.slice().sort((a,b)=>(+a[ch.x])-(+b[ch.x]));
    const W=640,H=340,p={l:60,r:20,t:30,b:54};x.fillStyle="#fff";x.fillRect(0,0,W,H);const xs=D.map(d=>+d[ch.x]),ys=D.map(d=>+d[ch.y]);const x0=ch.xmin!=null?ch.xmin:Math.min(0,...xs),x1=Math.max(...xs)*1.05||1,y0=Math.min(0,...ys)*1.15,y1=Math.max(0,...ys)*1.15||1;
    const X_=v=>p.l+(v-x0)/(x1-x0)*(W-p.l-p.r),Y_=v=>H-p.b-(v-y0)/(y1-y0)*(H-p.t-p.b);
    x.strokeStyle="#ddd";x.lineWidth=1;for(let i=0;i<=5;i++){const v=y0+(y1-y0)*i/5,yy=Y_(v);x.beginPath();x.moveTo(p.l,yy);x.lineTo(W-p.r,yy);x.stroke();x.fillStyle="#666";x.font="13px sans-serif";x.textAlign="right";x.fillText(v.toFixed(1),p.l-6,yy+4);}
    x.strokeStyle="#333";x.lineWidth=2;x.beginPath();x.moveTo(p.l,Y_(0));x.lineTo(W-p.r,Y_(0));x.stroke();
    x.strokeStyle=ch.color||"#7A1F2E";x.lineWidth=3;x.beginPath();D.forEach((d,i)=>{const a=X_(+d[ch.x]),b=Y_(+d[ch.y]);i?x.lineTo(a,b):x.moveTo(a,b);});x.stroke();
    D.forEach(d=>{const a=X_(+d[ch.x]),b=Y_(+d[ch.y]);x.fillStyle=ch.color||"#7A1F2E";x.beginPath();x.arc(a,b,6,0,7);x.fill();x.fillStyle="#333";x.textAlign="center";x.font="12px sans-serif";x.fillText(d[ch.x],a,H-p.b+18);});
    x.fillStyle="#333";x.font="bold 14px 'Noto Naskh Arabic',sans-serif";x.textAlign="center";x.fillText(ch.xl,(W+p.l)/2,H-10);x.save();x.translate(16,(H-p.b+p.t)/2);x.rotate(-Math.PI/2);x.fillText(ch.yl,0,0);x.restore();return c;}
  function table(){const t=h("table",{class:"dt"});t.append(h("tr",{},...X.cols.map(c=>h("th",{},c[1]))));state.data.forEach(r=>t.append(h("tr",{},...X.cols.map(c=>h("td",{},r[c[0]]==null?"—":String(r[c[0]]))))));return t;}
  function draw(){panel.innerHTML="";const sb=h("div",{class:"stepper"});STG.forEach(([ic,t],i)=>sb.append(h("button",{class:"sg"+(i===state.stage?" on":"")+(i<state.stage?" past":""),onclick:()=>go(i)},h("span",{},ic),h("small",{},t))));panel.append(sb);
    const P=h("div",{class:"pbody"});panel.append(P);const nav=(n,label)=>h("button",{class:"lbtn",onclick:()=>go(n)},label);
    if(state.stage===0){P.append(h("h2",{},"🎯 سؤال الاستقصاء"),h("p",{class:"big"},X.question),h("div",{class:"box"},h("b",{},"الهدف: "),X.goal),X.safety?h("div",{class:"box warn"},h("b",{},"⚠️ السلامة: "),X.safety):null,
      h("div",{class:"box"},h("b",{},"🧰 المواد والأدوات: "),X.mats),h("p",{class:"muted"},"💡 اسحبي في المشهد لتدويره، وكبّري بإصبعين. الحلقة الصفراء تدلّكِ على الخطوة التالية."),nav(1,"التالي: توقّعي ←"));}
    else if(state.stage===1){P.append(h("h2",{},"🤔 توقّعي قبل التجربة"),h("p",{class:"big"},X.predict.q));const o=h("div",{class:"opts"});X.predict.o.forEach((t,i)=>o.append(h("button",{class:"opt"+(state.pred===i?" sel":""),onclick:()=>{state.pred=i;draw();}},t)));P.append(o,
      state.pred!=null?h("div",{},h("p",{class:"muted"},"ممتاز! سنختبر توقّعكِ بالتجربة."),nav(2,"ابدئي التجربة 🧪")):null);}
    else if(state.stage===2){P.append(h("h2",{},"🧪 خطوات العمل"));const ol=h("ol",{class:"steps"});X.steps.forEach((s,i)=>ol.append(h("li",{class:state.done.has(s.k)?"ok":(X.steps.findIndex(z=>!state.done.has(z.k))===i?"cur":"")},s.t)));P.append(ol);
      {const tl=X.tools&&X.tools(API);if(tl)P.append(tl);}P.append(h("div",{class:"row"},nav(3,"📋 البيانات ("+state.data.length+")")));}
    else if(state.stage===3){P.append(h("h2",{},"📋 جدول البيانات"));if(!state.data.length)P.append(h("p",{class:"muted"},"لم تُسجَّل بيانات بعد. نفّذي خطوات التجربة."));else{P.append(table());const c=chart();if(c)P.append(h("h3",{},"📈 "+X.chart.title),c);}
      if(X.analysis&&state.data.length)P.append(h("div",{class:"box"},X.analysis(state.data)));P.append(h("div",{class:"row"},nav(2,"→ التجربة"),nav(4,"💡 الاستنتاج ←")));}
    else if(state.stage===4){P.append(h("h2",{},"💡 التحليل والاستنتاج"));X.conclude.forEach((q,qi)=>{const a=state.concl[qi];const o=h("div",{class:"opts"});
      q.o.forEach((t,i)=>o.append(h("button",{class:"opt"+(a!=null?(i===q.a?" ok":i===a?" no":""):""),onclick:()=>{if(state.concl[qi]!=null)return;state.concl[qi]=i;draw();}},t)));
      P.append(h("div",{class:"cq"},h("b",{},(qi+1)+") "+q.q),o,a!=null?h("div",{class:"why"},(a===q.a?"✅ ":"❌ ")+q.why):null));});
      const pr=X.predict.o[state.pred];P.append(h("div",{class:"box"},h("b",{},"توقّعكِ كان: "),pr==null?"—":pr,h("br"),h("b",{},"والنتيجة: "),X.predict.right!=null?(state.pred===X.predict.right?"✅ توقّعكِ صحيح!":"❌ الصحيح: "+X.predict.o[X.predict.right]):""),nav(5,"📄 تقرير المختبر ←"));}
    else{const ok=Object.entries(state.concl).filter(([i,a])=>X.conclude[i].a===a).length;const ta=h("textarea",{class:"ta",rows:"3",placeholder:"ماذا تعلّمتِ؟ وما الذي تحسّنينه لو أعدتِ التجربة؟"});
      P.append(h("h2",{},"📄 تقرير المختبر"),h("p",{},"الطالبة: ",h("b",{},S.name||"—")," · الصف ",S.grade||"—"," · الشعبة ",S.section||"—"),h("div",{class:"box"},"خطوات منجزة: "+state.done.size+"/"+X.steps.length+" · بيانات: "+state.data.length+" · أسئلة الاستنتاج: "+ok+"/"+X.conclude.length),
        h("label",{class:"muted"},"تأمّلي:"),ta,h("div",{class:"row"},h("button",{class:"lbtn",onclick:()=>report(ta.value)},"🖨️ طباعة التقرير / PDF"),h("button",{class:"lbtn gold",onclick:()=>send(ok,ta.value)},"📨 أرسلي التقرير لمعلّمتي")));}
  }
  function send(ok,refl){const s=student();if(!s.name){API.toast("ادخلي منصّة العلوم أولًا بالاسم ليصل التقرير");return;}
    const row={name:s.name,section:s.section||"",grade:"علوم "+(s.grade||""),at:new Date().toISOString(),unit:X.subject,activity:"مختبر ثلاثي الأبعاد",activityTitle:X.title,score:ok,total:X.conclude.length,skills:{خطوات:state.done.size+"/"+X.steps.length,توقّع:X.predict.o[state.pred]||"",تأمّل:(refl||"").slice(0,200)}};
    try{fetch(SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({rows:[row]})});API.toast("📨 وصل تقريركِ إلى معلّمتكِ. أحسنتِ!",3000);}catch(e){API.toast("تعذّر الإرسال، حاولي لاحقًا");}}
  function report(refl){const s=student(),c=chart();const w=window.open("","_blank");if(!w){API.toast("اسمحي بالنوافذ المنبثقة");return;}
    const rows=state.data.map(r=>"<tr>"+X.cols.map(c=>"<td>"+(r[c[0]]==null?"—":r[c[0]])+"</td>").join("")+"</tr>").join("");
    w.document.write(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>تقرير مختبر</title><style>body{font-family:"Noto Naskh Arabic",Tahoma,sans-serif;margin:24px;color:#2B1218}h1{color:#7A1F2E;text-align:center;margin:4px}h3{color:#7A1F2E;border-bottom:2px solid #B8902A;padding-bottom:3px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #bbb;padding:5px;text-align:center}th{background:#f6ece6}.hd{text-align:center;border-bottom:3px solid #B8902A;padding-bottom:8px}img{max-width:100%}</style></head><body>
     <div class="hd"><div>مدرسة القطرانة الثانوية للبنات · ${X.subject} · ${X.grade}</div><h1>تقرير مختبر: ${X.title}</h1><div>الطالبة: ${s.name||"................"} · الشعبة: ${s.section||"...."} · التاريخ: ${new Date().toLocaleDateString("ar-JO")}</div></div>
     <h3>سؤال الاستقصاء</h3><p>${X.question}</p><h3>الهدف</h3><p>${X.goal}</p><h3>توقّعي</h3><p>${X.predict.o[state.pred]||"—"}</p>
     <h3>خطوات العمل</h3><ol>${X.steps.map(s=>"<li>"+s.t+(state.done.has(s.k)?" ✔":"")+"</li>").join("")}</ol>
     <h3>البيانات</h3><table><tr>${X.cols.map(c=>"<th>"+c[1]+"</th>").join("")}</tr>${rows}</table>${c?`<h3>${X.chart.title}</h3><img src="${c.toDataURL()}">`:""}
     <h3>الاستنتاج</h3><ol>${X.conclude.map((q,i)=>"<li>"+q.q+"<br><b>"+(state.concl[i]!=null?q.o[state.concl[i]]:"—")+"</b> "+(state.concl[i]===q.a?"✔":"")+"</li>").join("")}</ol>
     <h3>تأمّلي</h3><p>${(refl||"").replace(/</g,"&lt;")||"........................................................"}</p><p style="text-align:center;color:#888;font-size:12px">المختبر ثلاثي الأبعاد · منصّة العلوم · تصميمُ المنصّة وتنفيذُها: نوال بني عطية</p><script>setTimeout(()=>print(),500)<\/script></body></html>`);w.document.close();}
  X.setup(L,API);L.fit(X.fit||.85);new ResizeObserver(()=>{if(!L.st.busyCam)L.fit(X.fit||.85);}).observe(view);draw();API.hud("");window.__lab={L,A:API,X};}
return {register:(id,x)=>REG[id]=x,run,list:()=>Object.entries(REG).map(([k,x])=>({id:k,title:x.title,subject:x.subject,grade:x.grade,icon:x.icon||"🧪",desc:x.desc||""}))};})();
