/* محرّك المشاهد ثلاثية الأبعاد للمختبر الافتراضي — Three.js
   زجاج حقيقي الانكسار، إضاءة بيئية، ظلال ناعمة، تدوير بالإصبع وتقريب، ونقر على الأدوات.
   تصميمُ المنصّة وتنفيذُها: نوال بني عطية */
(function(){
const T=THREE;const V3={};window.VLab3D=V3;
/* ---------- مواد ---------- */
const MAT={
 glass:(o={})=>new T.MeshPhysicalMaterial(Object.assign({color:0xffffff,metalness:0,roughness:.03,transmission:1,thickness:.06,ior:1.5,transparent:true,opacity:1,depthWrite:false,envMapIntensity:1.2,side:T.DoubleSide,specularIntensity:1,clearcoat:1,clearcoatRoughness:.02},o)),
 liquid:(c,o={})=>new T.MeshPhysicalMaterial(Object.assign({color:new T.Color(c),roughness:.08,metalness:0,transparent:true,opacity:.9,side:T.DoubleSide,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1,depthWrite:false},o)),
 std:(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:new T.Color(c),roughness:.5,metalness:0},o)),
 metal:(c="#c9ccd3",o={})=>new T.MeshStandardMaterial(Object.assign({color:new T.Color(c),roughness:.28,metalness:1,envMapIntensity:1.3},o)),
 glow:(c,op=1)=>new T.MeshBasicMaterial({color:new T.Color(c),transparent:true,opacity:op,depthWrite:false,blending:T.AdditiveBlending,toneMapped:false})};
V3.MAT=MAT;
function canvasTex(w,h,draw){const c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d");draw(x,w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;t._c=c;t._x=x;return t}
V3.canvasTex=canvasTex;
/* لوحة نصّية في المشهد (تتّجه دائمًا للكاميرا) */
function label(text,o={}){const f=o.size||46;const c=document.createElement("canvas");const x=c.getContext("2d");x.font="700 "+f+"px 'Cairo','El Messiri',sans-serif";const w=Math.ceil(x.measureText(text).width)+44;c.width=w;c.height=f+30;
 x.font="700 "+f+"px 'Cairo','El Messiri',sans-serif";x.fillStyle=o.bg||"rgba(30,12,18,.86)";x.beginPath();x.roundRect?x.roundRect(0,0,w,c.height,18):x.rect(0,0,w,c.height);x.fill();x.strokeStyle="rgba(243,223,168,.7)";x.lineWidth=3;x.stroke();
 x.fillStyle=o.color||"#fff";x.textAlign="center";x.textBaseline="middle";x.direction="rtl";x.fillText(text,w/2,c.height/2+2);
 const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;const sp=new T.Sprite(new T.SpriteMaterial({map:tx,depthTest:false,transparent:true}));const s=o.scale||.0022;sp.scale.set(w*s,c.height*s,1);sp.renderOrder=20;return sp}
V3.label=label;
/* ---------- أدوات زجاجية ---------- */
function lathe(pts,seg=64){return new T.LatheGeometry(pts.map(p=>new T.Vector2(p[0],p[1])),seg)}
V3.beaker=function(o={}){const r=o.r||.45,h=o.h||.9,g=new T.Group();
 const prof=[[r*.96,0],[r,.02],[r,h],[r*1.04,h+.02]];const outer=new T.Mesh(lathe(prof),MAT.glass());g.add(outer);
 const bot=new T.Mesh(new T.CylinderGeometry(r*.96,r*.96,.02,48),MAT.glass({thickness:.2}));bot.position.y=.01;g.add(bot);
 for(let i=1;i<=5;i++){const m=new T.Mesh(new T.BoxGeometry(i%5?.08:.14,.006,.004),MAT.std("#ffffff",{transparent:true,opacity:.85}));m.position.set(-r*.3,h*i/6,r+.002);g.add(m)}
 const liq=new T.Mesh(new T.CylinderGeometry(r*.93,r*.93,1,48),MAT.liquid(o.color||"#9fd4ff"));liq.renderOrder=3;g.add(liq);
 const top=new T.Mesh(new T.CircleGeometry(r*.93,48),MAT.liquid(o.color||"#9fd4ff",{opacity:.6}));top.rotation.x=-Math.PI/2;top.renderOrder=4;g.add(top);
 const api={g,liq,top,r,h,set(level,color){const y=Math.max(.002,h*level);liq.scale.y=y;liq.position.y=y/2+.02;top.position.y=y+.02;liq.visible=top.visible=level>.004;if(color){liq.material.color.set(color);top.material.color.set(color)}}};
 api.set(o.level==null?.5:o.level);return api};
V3.flask=function(o={}){const s=o.s||1,g=new T.Group();
 const prof=[[.42*s,0],[.46*s,.03*s],[.44*s,.12*s],[.12*s,.62*s],[.11*s,.9*s],[.13*s,.92*s]];g.add(new T.Mesh(lathe(prof),MAT.glass()));
 const base=new T.Mesh(new T.CylinderGeometry(.44*s,.44*s,.02,48),MAT.glass({thickness:.2}));base.position.y=.01;g.add(base);
 // السائل: مخروط ناقص يتبع شكل الدورق
 let liq=null;const mat=MAT.liquid(o.color||"#eef3f6");
 const api={g,mat,set(level,color){if(liq){g.remove(liq);liq.geometry.dispose()}const yt=Math.max(.02,Math.min(.6,.6*level))*s;const rt=(.44-(.32)*(yt/(.62*s)))*s;
  liq=new T.Mesh(lathe([[0,.02*s],[.42*s,.02*s],[.43*s,.1*s],[rt*.97,yt],[0,yt]],48),mat);liq.renderOrder=3;g.add(liq);if(color)mat.color.set(color);api.yt=yt;api.rt=rt}};
 api.set(o.level==null?.3:o.level);return api};
V3.tube=function(o={}){const r=o.r||.09,h=o.h||.8,g=new T.Group();
 const prof=[[0,0]];for(let a=0;a<=10;a++){const t=a/10*Math.PI/2;prof.push([Math.sin(t)*r,r-Math.cos(t)*r])}prof.push([r,h],[r*1.12,h+.01]);g.add(new T.Mesh(lathe(prof,40),MAT.glass()));
 const mat=MAT.liquid(o.color||"#e9eef2");let liq=null;
 const api={g,mat,set(level,color){if(liq){g.remove(liq);liq.geometry.dispose()}const y=Math.max(.01,h*level);const pr=[[0,.004]];for(let a=0;a<=10;a++){const t=a/10*Math.PI/2;pr.push([Math.sin(t)*r*.86,r-Math.cos(t)*r*.86+.004])}pr.push([r*.86,y],[0,y]);
  liq=new T.Mesh(lathe(pr,32),mat);liq.renderOrder=3;g.add(liq);if(color)mat.color.set(color)}};api.set(o.level==null?.35:o.level);return api};
/* قطرات وفقاعات */
V3.drops=function(scene,color="#9fd4ff",n=6){const geo=new T.SphereGeometry(.018,12,10);geo.scale(1,1.4,1);const list=[];for(let i=0;i<n;i++){const m=new T.Mesh(geo,MAT.liquid(color,{opacity:.95}));m.visible=false;scene.add(m);list.push({m,t:-1})}
 return{list,emit(x,y,z){const d=list.find(d=>d.t<0);if(d){d.t=0;d.x=x;d.y=y;d.z=z;d.m.visible=true}},update(dt,floor,onHit){list.forEach(d=>{if(d.t<0)return;d.t+=dt;const y=d.y-4.9*d.t*d.t;d.m.position.set(d.x,y,d.z);if(y<floor){d.t=-1;d.m.visible=false;onHit&&onHit()}})},color(c){list.forEach(d=>d.m.material.color.set(c))}}};
V3.bubbles=function(parent,n=30,r=.3,h=.5,col="#ffffff"){const geo=new T.SphereGeometry(1,10,8);const mat=new T.MeshPhysicalMaterial({color:col,transparent:true,opacity:.45,roughness:0,transmission:.5,depthWrite:false});const im=new T.InstancedMesh(geo,mat,n);im.renderOrder=5;parent.add(im);
 const P=[...Array(n)].map(()=>({a:Math.random()*6.28,r:Math.random()*r,y:Math.random()*h,s:.006+Math.random()*.012,v:.1+Math.random()*.25}));const dm=new T.Object3D();
 return{im,on:true,update(dt,top=h){P.forEach((p,i)=>{p.y+=p.v*dt*(this.on?1:0);if(p.y>top){p.y=0;p.a=Math.random()*6.28}dm.position.set(Math.cos(p.a)*p.r,p.y,Math.sin(p.a)*p.r);const s=this.on?p.s:0;dm.scale.set(s,s,s);dm.updateMatrix();im.setMatrixAt(i,dm.matrix)});im.instanceMatrix.needsUpdate=true}}};
/* ---------- الغرفة والمختبر ---------- */
function envMap(renderer){const s=new T.Scene();const room=new T.Mesh(new T.BoxGeometry(20,10,20),new T.MeshBasicMaterial({color:0x5a4a48,side:T.BackSide}));s.add(room);
 const panel=(w,h,x,y,z,c,int)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(c).multiplyScalar(int),side:T.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);s.add(m)};
 panel(8,3,0,4.9,0,"#fff6e8",6);panel(3,6,-9.9,1,0,"#dfeaff",3.5);panel(3,6,9.9,1,-3,"#fff1dd",2.2);panel(10,4,0,0,-9.9,"#c8a882",1.2);
 const pm=new T.PMREMGenerator(renderer);const t=pm.fromScene(s,.03).texture;pm.dispose();return t}
function tileTex(){return canvasTex(512,512,(x,w,h)=>{x.fillStyle="#e9e4dc";x.fillRect(0,0,w,h);for(let i=0;i<8;i++)for(let j=0;j<8;j++){x.fillStyle=`hsl(30,${12+((i*7+j*3)%5)}%,${88-((i*3+j*5)%4)}%)`;x.fillRect(i*64+2,j*64+2,60,60)}x.strokeStyle="#cfc6b8";x.lineWidth=3;for(let k=0;k<=8;k++){x.beginPath();x.moveTo(k*64,0);x.lineTo(k*64,h);x.stroke();x.beginPath();x.moveTo(0,k*64);x.lineTo(w,k*64);x.stroke()}})}
function woodTex(){return canvasTex(512,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,"#7a4f30");g.addColorStop(1,"#5e3a22");x.fillStyle=g;x.fillRect(0,0,w,h);for(let i=0;i<70;i++){x.strokeStyle=`rgba(40,20,10,${.05+Math.random()*.12})`;x.lineWidth=1+Math.random()*2;x.beginPath();const y=Math.random()*h;x.moveTo(0,y);x.bezierCurveTo(w*.3,y+Math.random()*20-10,w*.7,y+Math.random()*20-10,w,y+Math.random()*10-5);x.stroke()}})}
function benchTex(){return canvasTex(512,512,(x,w,h)=>{x.fillStyle="#22262b";x.fillRect(0,0,w,h);for(let i=0;i<4000;i++){x.fillStyle=`rgba(255,255,255,${Math.random()*.05})`;x.fillRect(Math.random()*w,Math.random()*h,1.5,1.5)}})}
function room(scene){const wall=new T.Mesh(new T.PlaneGeometry(14,7),MAT.std("#fff",{map:tileTex(),roughness:.35}));wall.material.map.wrapS=wall.material.map.wrapT=T.RepeatWrapping;wall.material.map.repeat.set(5,2.5);wall.position.set(0,2.4,-2.2);wall.receiveShadow=true;scene.add(wall);
 const floor=new T.Mesh(new T.PlaneGeometry(14,10),MAT.std("#8a8f96",{roughness:.8}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.1;scene.add(floor);
 // الطاولة
 const top=new T.Mesh(new T.BoxGeometry(7,.12,3.2),MAT.std("#fff",{map:benchTex(),roughness:.32,metalness:.05,envMapIntensity:.8}));top.position.y=-.06;top.receiveShadow=true;scene.add(top);
 const cab=new T.Mesh(new T.BoxGeometry(6.9,1,3),MAT.std("#fff",{map:woodTex(),roughness:.6}));cab.position.y=-.62;scene.add(cab);
 for(let i=-2;i<=2;i++){const d=new T.Mesh(new T.BoxGeometry(1.2,.8,.02),MAT.std("#6b4429",{roughness:.55}));d.position.set(i*1.35,-.6,1.51);scene.add(d);const hnd=new T.Mesh(new T.CylinderGeometry(.015,.015,.3,10),MAT.metal());hnd.rotation.z=Math.PI/2;hnd.position.set(i*1.35,-.35,1.54);scene.add(hnd)}
 // رفّ بقوارير خلفية
 const sh=new T.Mesh(new T.BoxGeometry(6,.06,.35),MAT.std("#fff",{map:woodTex()}));sh.position.set(0,1.95,-2.0);sh.castShadow=true;scene.add(sh);
 const cols=["#2f8f5b","#c84b6a","#4aa3df","#e8b04a","#8e4fb0","#e06a3a"];for(let i=0;i<9;i++){const x=-2.7+i*.68;const b=i%3===0?V3.flask({s:.5,level:.5,color:cols[i%6]}):V3.beaker({r:.13,h:.36,level:.6,color:cols[i%6]});b.g.position.set(x,1.98,-1.95);scene.add(b.g)}
 // لوحة جدار
 const poster=new T.Mesh(new T.PlaneGeometry(1.5,1),MAT.std("#fff",{map:canvasTex(600,400,(x,w,h)=>{x.fillStyle="#7A1F2E";x.fillRect(0,0,w,h);x.fillStyle="#F3DFA8";x.font="700 54px Cairo";x.textAlign="center";x.direction="rtl";x.fillText("قواعد السلامة",w/2,80);x.font="600 34px Cairo";["ارتدي النظارة الواقية","لا تتذوّقي المواد","اغسلي يديكِ بعد التجربة"].forEach((t,i)=>x.fillText("• "+t,w/2,170+i*70))}),roughness:.6}));poster.position.set(2.6,3,-2.18);scene.add(poster)}
/* ---------- تحكّم بالإصبع ---------- */
function controls(cam,dom,target,opt){const S={th:opt.th||0,ph:opt.ph||1.15,r:opt.r||4.2,tth:opt.th||0,tph:opt.ph||1.15,tr:opt.r||4.2};const P=new Map();let last=null,moved=0,pinch=0;
 const apply=()=>{S.th+=(S.tth-S.th)*.15;S.ph+=(S.tph-S.ph)*.15;S.r+=(S.tr-S.r)*.15;cam.position.set(target.x+S.r*Math.sin(S.ph)*Math.sin(S.th),target.y+S.r*Math.cos(S.ph),target.z+S.r*Math.sin(S.ph)*Math.cos(S.th));cam.lookAt(target)};
 dom.addEventListener("pointerdown",e=>{dom.setPointerCapture(e.pointerId);P.set(e.pointerId,[e.clientX,e.clientY]);moved=0;if(P.size===2){const[a,b]=[...P.values()];pinch=Math.hypot(a[0]-b[0],a[1]-b[1])}});
 dom.addEventListener("pointermove",e=>{if(!P.has(e.pointerId))return;const p=P.get(e.pointerId);const dx=e.clientX-p[0],dy=e.clientY-p[1];P.set(e.pointerId,[e.clientX,e.clientY]);
  if(P.size===1){moved+=Math.abs(dx)+Math.abs(dy);S.tth-=dx*.008;S.tph=Math.max(.45,Math.min(1.5,S.tph-dy*.006));S.tth=Math.max(-1.2,Math.min(1.2,S.tth))}
  else if(P.size===2){const[a,b]=[...P.values()];const d=Math.hypot(a[0]-b[0],a[1]-b[1]);S.tr=Math.max(opt.min||2,Math.min(opt.max||7,S.tr*pinch/d));pinch=d;moved=99}});
 const up=e=>{const was=P.has(e.pointerId);P.delete(e.pointerId);if(was&&moved<6&&opt.onTap)opt.onTap(e)};dom.addEventListener("pointerup",up);dom.addEventListener("pointercancel",e=>P.delete(e.pointerId));
 dom.addEventListener("wheel",e=>{e.preventDefault();S.tr=Math.max(opt.min||2,Math.min(opt.max||7,S.tr*(1+Math.sign(e.deltaY)*.1)))},{passive:false});
 dom.addEventListener("dblclick",()=>{S.tth=opt.th||0;S.tph=opt.ph||1.15;S.tr=opt.r||4.2});
 return{apply,S,reset(){S.tth=opt.th||0;S.tph=opt.ph||1.15;S.tr=opt.r||4.2}}}
/* ---------- التهيئة ---------- */
V3.ok=function(){try{const c=document.createElement("canvas");return !!(c.getContext("webgl2")||c.getContext("webgl"))}catch(e){return false}};
V3.init=function(host,def,S){const w=host.clientWidth||400,h=Math.round(w*(def.aspect||.78));
 const renderer=new T.WebGLRenderer({antialias:true,powerPreference:"high-performance"});renderer.setPixelRatio(Math.min(2,devicePixelRatio||1));renderer.setSize(w,h);
 renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 host.append(renderer.domElement);renderer.domElement.style.cssText="display:block;width:100%;height:auto;touch-action:none;border-radius:0";
 const scene=new T.Scene();scene.environment=envMap(renderer);scene.background=new T.Color("#3a2e2e");scene.fog=new T.Fog("#3a2e2e",8,16);
 const cam=new T.PerspectiveCamera(def.fov||38,w/h,.05,50);
 scene.add(new T.HemisphereLight("#fff4e6","#3a2a28",.55));const sun=new T.DirectionalLight("#fff3e0",1.4);sun.position.set(2.5,5,3);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.radius=6;sun.shadow.bias=-.0004;
 Object.assign(sun.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.5,far:15});scene.add(sun);
 room(scene);const target=new T.Vector3(...(def.target||[0,.55,0]));
 const ray=new T.Raycaster(),mouse=new T.Vector2();const ctx={T,scene,cam,renderer,V3,MAT,host,taps:[]};
 const ctl=controls(cam,renderer.domElement,target,Object.assign({},def.view||{},{onTap:e=>{const r=renderer.domElement.getBoundingClientRect();mouse.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mouse,cam);
  const hits=ray.intersectObjects(ctx.taps,true);if(hits.length&&def.tap){let o=hits[0].object;while(o&&!o.userData.tap)o=o.parent;if(o)def.tap(o.userData.tap,S,ctx)}}}));
 ctx.ctl=ctl;const world=def.build(ctx,S)||{};
 scene.traverse(o=>{if(o.isMesh&&!o.material.transparent){o.castShadow=true;o.receiveShadow=true}});
 const ro=new ResizeObserver(()=>{const W=host.clientWidth;if(!W)return;const H=Math.round(W*(def.aspect||.78));renderer.setSize(W,H);cam.aspect=W/H;cam.updateProjectionMatrix()});ro.observe(host);
 // جودة تتكيّف مع قدرة الجهاز
 let acc=0,fr=0,lowered=0;
 return{ctx,render(Sm,t,dt,Sraw){acc+=dt;fr++;if(acc>2.5){const avg=acc/fr;acc=0;fr=0;if(avg>.045&&lowered<2){lowered++;if(lowered===1)renderer.setPixelRatio(Math.min(1.25,devicePixelRatio||1));else{renderer.setPixelRatio(1);renderer.shadowMap.enabled=false;scene.traverse(o=>{if(o.material&&o.material.transmission){o.material.transmission=0;o.material.opacity=.25;o.material.needsUpdate=true}})}const W2=host.clientWidth;renderer.setSize(W2,Math.round(W2*(def.aspect||.78)))}}
  ctl.apply();def.update&&def.update(ctx,world,Sm,t,dt,Sraw);renderer.render(scene,cam)}}};
})();
