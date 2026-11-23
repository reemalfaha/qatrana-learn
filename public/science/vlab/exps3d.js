/* تجارب ثلاثية الأبعاد — المختبر الافتراضي — تصميم وتنفيذ: نوال بني عطية */
(function(){const T=window.THREE,V3=window.VLab3D||{},M=V3.MAT||{};
const sub=f=>f.replace(/\d/g,d=>"₀₁₂₃₄₅₆₇₈₉"[d]);
const lerpC=(st,p)=>{for(let i=0;i<st.length-1;i++){const[a,c1]=st[i],[b,c2]=st[i+1];if(p<=b){const f=Math.max(0,(p-a)/(b-a));return new T.Color(c1).lerp(new T.Color(c2),f)}}return new T.Color(st[st.length-1][1])};
const UNI=[[1,"#e0201b"],[3,"#f26b1d"],[5,"#f3c21f"],[7,"#3fae3f"],[9,"#2a7fd6"],[11,"#3d3db8"],[13,"#6a2a9a"]];
const set=(k,v)=>VLab.cur&&VLab.cur.set(k,v);

/* ======================= 1) المعايرة ثلاثية الأبعاد ======================= */
const phOf=v=>{const na=2.5,nb=.1*v,V=25+v;if(Math.abs(nb-na)<1e-9)return 7;if(nb<na)return -Math.log10((na-nb)/V);return 14+Math.log10((nb-na)/V)};
VLab.reg({id:"c9-titration3d",three:1,icon:"⚗️",grade:"الصف التاسع",subject:"الكيمياء",unit:"الوحدة 2: الحموض والقواعد",src:"كتاب الطالب ص61",
 title:"المعايرة في مختبر ثلاثي الأبعاد",question:"ماذا يحدث للرقم الهيدروجيني عند إضافة قاعدة إلى حمض تدريجيًّا؟ ومتى يحدث التعادل؟",
 view:{th:-.3,ph:1.3,r:4.9,min:2.2,max:7.5},target:[.1,1.0,0],
 vars:[{k:"v",label:"حجم NaOH المضاف",unit:"mL",min:0,max:50,step:.5,val:0,c:"#2b7bd6",ticks:[0,10,20,30,40,50]},
  {k:"run",label:"صنبور السحّاحة",type:"seg",val:0,c:"#B8902A",opts:[[0,"🔒 مغلق"],[1,"💧 تقطير بطيء"],[2,"🚿 تقطير سريع"]]},
  {k:"i",label:"الكاشف",type:"seg",val:"php",c:"#7A1F2E",opts:[["php","الفينولفثالين"],["uni","الكاشف العامّ"],["none","بلا كاشف"]]}],
 read(s){const p=phOf(s.v);return[{label:"الرقم الهيدروجيني pH",val:p.toFixed(2)},{label:"حالة المحلول",val:p<6.8?"حمضي":p<=7.2?"متعادل":"قاعدي"},{label:"حجم NaOH المضاف",val:s.v.toFixed(1),unit:"mL"},{label:"نقطة التكافؤ",val:Math.abs(s.v-25)<.3?"وصلتِ إليها ✔":"عند 25 mL"}]},
 build(c,S){const{scene}=c;const W={};
  // الحامل
  const base=new T.Mesh(new T.BoxGeometry(1.1,.05,.7),M.metal("#2b2d33",{roughness:.4,metalness:.6}));base.position.set(-.35,.025,0);scene.add(base);
  const rod=new T.Mesh(new T.CylinderGeometry(.025,.025,2.8,16),M.metal());rod.position.set(-.75,1.4,0);scene.add(rod);
  const clamp=new T.Mesh(new T.BoxGeometry(.5,.06,.08),M.metal("#9aa0aa"));clamp.position.set(-.5,1.95,0);scene.add(clamp);
  // السحّاحة
  const bur=new T.Group();bur.position.set(-.25,1.05,0);scene.add(bur);W.bur=bur;
  const tube=new T.Mesh(new T.CylinderGeometry(.05,.05,1.6,32,1,true),M.glass());tube.position.y=.95;bur.add(tube);
  const tip=new T.Mesh(new T.CylinderGeometry(.05,.008,.2,24,1,true),M.glass());tip.position.y=.05;bur.add(tip);
  W.bliq=new T.Mesh(new T.CylinderGeometry(.043,.043,1,24),M.liquid("#cfe6ff",{opacity:.7}));W.bliq.renderOrder=3;bur.add(W.bliq);
  for(let k=0;k<=50;k+=5){const y=1.7-k/50*1.4;const m=new T.Mesh(new T.BoxGeometry(k%10?.03:.06,.004,.004),M.std("#ffffff"));m.position.set(0,y,.052);bur.add(m)}
  const cock=new T.Group();cock.position.y=.2;bur.add(cock);const ck=new T.Mesh(new T.CylinderGeometry(.03,.03,.16,16),M.std("#3a5fd6",{roughness:.3}));ck.rotation.z=Math.PI/2;cock.add(ck);
  const handle=new T.Mesh(new T.BoxGeometry(.03,.14,.03),M.std("#3a5fd6",{roughness:.3}));handle.position.x=.1;cock.add(handle);W.handle=handle;cock.userData.tap="cock";c.taps.push(cock);
  const lbl=V3.label("NaOH 0.1 M",{size:40});lbl.position.set(-.25,2.9,0);scene.add(lbl);
  const hint=V3.label("👆 انقري الصنبور",{size:34,bg:"rgba(184,144,42,.9)",color:"#2b1218"});hint.position.set(.25,1.27,.1);scene.add(hint);W.hint=hint;
  // الدورق
  const fl=V3.flask({s:.9,level:.32,color:"#eef3f6"});fl.g.position.set(-.25,.0,0);scene.add(fl.g);W.fl=fl;
  W.drops=V3.drops(scene,"#d8ecff",8);W.flash=0;W.acc=0;
  const fl2=V3.label("HCl 0.1 M · 25 mL",{size:36});fl2.position.set(-.25,-.0,.62);scene.add(fl2);
  // جهاز pH
  const box=new T.Mesh(new T.BoxGeometry(.55,.32,.3),M.std("#e9ecef",{roughness:.4}));box.position.set(.75,.16,.15);scene.add(box);
  W.scr=V3.canvasTex(256,128,()=>{});const scr=new T.Mesh(new T.PlaneGeometry(.42,.21),new T.MeshBasicMaterial({map:W.scr,toneMapped:false}));scr.position.set(.75,.2,.302);scene.add(scr);
  const cable=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([new T.Vector3(.6,.25,.15),new T.Vector3(.35,.9,.1),new T.Vector3(.0,.95,0),new T.Vector3(-.17,.55,0),new T.Vector3(-.17,.08,0)]),40,.008,6),M.std("#222"));scene.add(cable);
  // لوح المنحنى
  W.board=V3.canvasTex(640,420,()=>{});const bd=new T.Mesh(new T.PlaneGeometry(1.7,1.12),new T.MeshStandardMaterial({map:W.board,roughness:.7}));bd.position.set(1.15,1.75,-1.9);scene.add(bd);
  const frame=new T.Mesh(new T.BoxGeometry(1.78,1.2,.03),M.std("#7a4f30"));frame.position.set(1.15,1.75,-1.92);scene.add(frame);
  W.last=-1;return W},
 tap(name,S){if(name==="cock")set("run",S.run?0:1)},
 update(c,W,s,t,dt,S){// تشغيل الصنبور
  if(S.run&&S.v<50){W.acc+=dt*(S.run===2?2.2:.6);if(W.acc>=.5){W.acc=0;set("v",Math.min(50,+(S.v+.5).toFixed(1)))}}
  W.handle.rotation.z=S.run?Math.PI/2:0;W.hint.visible=!S.run&&S.v<1;
  const v=s.v,p=phOf(S.v);const top=1.7-1.4*v/50;W.bliq.scale.y=Math.max(.01,top-.3);W.bliq.position.y=(top+.3)/2;
  const dripping=S.run||Math.abs(S.v-s.v)>.04;if(dripping&&Math.random()<dt*(S.run===2?14:6))W.drops.emit(-.25,1.12,0);
  W.drops.update(dt,.35,()=>{if(S.i==="php"&&phOf(Math.min(50,S.v+1.2))>8.2&&p<8.2)W.flash=1});
  W.flash=Math.max(0,W.flash-dt*.9);
  let col;if(S.i==="php"){const f=Math.max(0,Math.min(1,(p-8.2)/1.6));col=new T.Color("#f2f4f6").lerp(new T.Color("#e0368f"),Math.max(f,W.flash*.55))}else if(S.i==="uni")col=lerpC(UNI,p);else col=new T.Color("#eef3f6");
  W.fl.mat.color.copy(col);W.fl.g.rotation.y+=dt*(dripping?1.4:.2);W.fl.g.position.x=-.25+Math.sin(t*3)*.01*(dripping?1:0);
  if(W.lvl!==Math.round(v)){W.lvl=Math.round(v);W.fl.set(.32+v/50*.25)}
  // شاشة pH
  const key=p.toFixed(2)+S.i;if(key!==W.last){W.last=key;const x=W.scr._x;x.fillStyle="#0e2a1c";x.fillRect(0,0,256,128);x.fillStyle="#7dffb5";x.font="700 26px Cairo";x.textAlign="left";x.fillText("pH",14,34);x.font="800 64px monospace";x.textAlign="right";x.fillText(p.toFixed(2),244,104);W.scr.needsUpdate=true;
   const b=W.board._x;b.fillStyle="#f8f7f2";b.fillRect(0,0,640,420);b.fillStyle="#7A1F2E";b.font="700 30px Cairo";b.textAlign="center";b.direction="rtl";b.fillText("منحنى المعايرة",320,40);
   const gx=70,gy=60,gw=540,gh=300;b.strokeStyle="#bbb";b.lineWidth=1;for(let k=0;k<=14;k+=7){const y=gy+gh-k/14*gh;b.beginPath();b.moveTo(gx,y);b.lineTo(gx+gw,y);b.stroke();b.fillStyle="#555";b.font="20px Cairo";b.direction="ltr";b.fillText(k,gx-26,y+6)}
   for(let k=0;k<=50;k+=25){b.fillText(k,gx+k/50*gw,gy+gh+28)}b.strokeStyle="#ccc";b.setLineDash([6,6]);b.beginPath();for(let x=0;x<=50;x+=.5){const X=gx+x/50*gw,Y=gy+gh-phOf(x)/14*gh;x?b.lineTo(X,Y):b.moveTo(X,Y)}b.stroke();b.setLineDash([]);
   b.strokeStyle="#B8902A";b.lineWidth=5;b.beginPath();for(let x=0;x<=S.v;x+=.5){const X=gx+x/50*gw,Y=gy+gh-phOf(x)/14*gh;x?b.lineTo(X,Y):b.moveTo(X,Y)}b.stroke();
   b.fillStyle="#e04848";b.beginPath();b.arc(gx+S.v/50*gw,gy+gh-p/14*gh,9,0,7);b.fill();b.fillStyle="#555";b.direction="rtl";b.fillText("حجم NaOH (mL)",320,410);W.board.needsUpdate=true}},
 challenges:[{t:"افتحي الصنبور بالنقر عليه",test:s=>s.run>0},{t:"صلي إلى نقطة التكافؤ (25 mL)",test:s=>Math.abs(s.v-25)<.3},{t:"لاحظي الوميض الزهري قبل التكافؤ",test:s=>s.i==="php"&&s.v>=22&&s.v<25},{t:"سجّلي 5 قراءات",test:(s,h,r)=>r.length>=5}],
 notebook:{goal:"أدرس تفاعل التعادل بين حمض قويّ وقاعدة قويّة، وأحدّد نقطة التكافؤ.",mats:"سحّاحة، حامل، دورق مخروطي، HCl و NaOH بتركيز 0.1 M، فينولفثالين، جهاز pH.",
  steps:["دوّري المشهد بإصبعك وتعرّفي إلى الأدوات: السحّاحة والدورق وجهاز pH ولوح المنحنى.","انقري صنبور السحّاحة لفتحه، وراقبي القطرات ولون المحلول وشاشة الجهاز.","أغلقي الصنبور كلّ 5 mL وسجّلي القراءة.","قرب 22 mL حرّكي المؤشّر بخطوات صغيرة: لاحظي الوميض الزهري الذي يختفي مع الرجّ.","تابعي حتى 50 mL وراقبي اكتمال المنحنى على اللوح."],
  questions:[{q:"اكتبي معادلة تفاعل التعادل.",a:"HCl + NaOH → NaCl + H₂O"},{q:"لماذا يظهر لون زهري ثمّ يختفي قرب نقطة التكافؤ؟",a:"لأنّ القطرة تجعل المنطقة القريبة منها قاعدية مؤقّتًا، ثمّ يختفي اللون عند الرجّ لأنّ الحمض المتبقّي يعادلها."},
   {q:"عند أيّ حجم حدث التعادل؟ ولماذا؟",a:"عند 25 mL؛ لأنّ عدد مولات NaOH المضافة يساوي عدد مولات HCl."},{q:"لماذا يتغيّر pH بسرعة كبيرة قرب 25 mL؟",a:"لأنّ كمّية الحمض المتبقّية صغيرة جدًّا، فتكفي قطرة واحدة لتغيير كبير في تركيز أيونات H⁺."}],
  concl:"في تفاعل التعادل يتكوّن ملح وماء، ويحدث تغيّر حادّ في pH عند نقطة التكافؤ التي يتساوى فيها عدد مولات الحمض والقاعدة."}});

/* ======================= 2) كشف اللهب ثلاثي الأبعاد ======================= */
const FL={Li:["الليثيوم","LiCl","#ff2448","أحمر قرمزي"],Na:["الصوديوم","NaCl","#ffae1a","أصفر برتقالي"],K:["البوتاسيوم","KCl","#c58cff","بنفسجي فاتح"],Ca:["الكالسيوم","CaCl₂","#ff6a24","أحمر برتقالي"],Cu:["النحاس","CuCl₂","#26e0a6","أخضر مزرقّ"],Sr:["السترونشيوم","SrCl₂","#ff1830","أحمر"],Ba:["الباريوم","BaCl₂","#a6ef52","أخضر مصفرّ"]};
const FV=`uniform float t;varying vec2 vUv;varying float vH;
float n(vec3 p){return sin(p.x*7.+t*9.)*sin(p.y*5.-t*13.)*sin(p.z*7.+t*7.);}
void main(){vUv=uv;vec3 p=position;vH=uv.y;float k=pow(vH,1.4);p.x+=n(p*2.)*.03*k+sin(t*6.+p.y*8.)*.02*k;p.z+=n(p.zyx*2.)*.03*k;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`;
const FF=`uniform vec3 c1;uniform vec3 c2;uniform float a;uniform float mixv;varying vec2 vUv;varying float vH;
void main(){float edge=1.-abs(vUv.x-.5)*2.;float fade=smoothstep(0.,.15,vH)*(1.-smoothstep(.55,1.,vH));vec3 col=mix(c1,c2,smoothstep(.08,.45,vH)*mixv);gl_FragColor=vec4(col,a*fade*(.35+.65*edge));}`;
VLab.reg({id:"c10-flame3d",three:1,icon:"🔥",grade:"الصف العاشر",subject:"الكيمياء",unit:"الوحدة 1: تركيب الذرّة",src:"كتاب الأنشطة ص6",
 title:"كشف اللهب في مختبر ثلاثي الأبعاد",question:"لماذا يختلف لون اللهب باختلاف العنصر؟",view:{th:.2,ph:1.25,r:4.4,min:2,max:7},target:[-.1,.85,0],
 vars:[{k:"e",label:"الملح المستخدم",type:"seg",val:"Na",c:"#7A1F2E",opts:Object.keys(FL).map(k=>[k,FL[k][1]])},{k:"d",label:"إدخال السلك في اللهب",unit:"%",min:0,max:100,step:1,val:0,c:"#e86a2a",ticks:[0,50,100]},
  {k:"gas",label:"صمّام الغاز",type:"seg",val:1,c:"#2b7bd6",opts:[[0,"مغلق"],[1,"مفتوح"]]}],
 read(s){const F=FL[s.e],on=s.d>60&&s.gas;return[{label:"العنصر",val:F[0]+" ("+s.e+")"},{label:"لون اللهب",val:!s.gas?"لا يوجد لهب":on?F[3]:"أزرق (لهب الموقد)"},{label:"التفسير",val:on?"إلكترونات مُثارة تعود إلى مستويات أدنى وتطلق ضوءًا بلون مميّز":"أدخلي السلك في اللهب"}]},
 build(c,S){const{scene}=c;const W={};
  const burner=new T.Group();scene.add(burner);
  burner.add(new T.Mesh(new T.CylinderGeometry(.3,.34,.06,40),M.metal("#3a3d44",{roughness:.4})));
  const tb=new T.Mesh(new T.CylinderGeometry(.06,.07,.75,32),M.metal("#c9ccd3"));tb.position.y=.4;burner.add(tb);
  const col=new T.Mesh(new T.CylinderGeometry(.075,.075,.12,32),M.metal("#b08d57",{roughness:.35}));col.position.y=.15;burner.add(col);
  const hose=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([new T.Vector3(.07,.12,0),new T.Vector3(.45,.08,.1),new T.Vector3(.9,.02,.3),new T.Vector3(1.6,.02,.2)]),40,.025,8),M.std("#c8402c",{roughness:.6}));scene.add(hose);
  // اللهب: طبقتان بشيدر يتراقص
  W.u=[];const mk=(r,h,y,c1,c2,a)=>{const u={t:{value:0},c1:{value:new T.Color(c1)},c2:{value:new T.Color(c2)},a:{value:a},mixv:{value:0}};W.u.push(u);
   const m=new T.Mesh(new T.ConeGeometry(r,h,48,24,true),new T.ShaderMaterial({uniforms:u,vertexShader:FV,fragmentShader:FF,transparent:true,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide}));m.position.y=y+h/2;m.rotation.x=0;m.renderOrder=10;burner.add(m);return m};
  W.outer=mk(.11,.75,.77,"#3d6dff","#ffffff",.9);W.inner=mk(.05,.28,.77,"#7fb0ff","#bcd6ff",.95);
  W.light=new T.PointLight("#7aa0ff",1.2,4,1.6);W.light.position.set(0,1.2,0);scene.add(W.light);
  W.halo=new T.Sprite(new T.SpriteMaterial({map:V3.canvasTex(128,128,(x)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,"rgba(255,255,255,1)");g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.fillRect(0,0,128,128)}),blending:T.AdditiveBlending,transparent:true,depthWrite:false,opacity:.35}));W.halo.scale.set(1.4,1.8,1);W.halo.position.y=1.15;W.halo.renderOrder=11;scene.add(W.halo);
  // السلك بمقبض
  W.wire=new T.Group();scene.add(W.wire);const hd=new T.Mesh(new T.CylinderGeometry(.03,.03,.5,16),M.std("#5a3a24"));hd.rotation.z=Math.PI/2-.35;hd.position.set(.75,0,0);W.wire.add(hd);
  const w=new T.Mesh(new T.CylinderGeometry(.006,.006,.7,8),M.metal("#d8d8dc"));w.rotation.z=Math.PI/2-.35;w.position.set(.2,-.2,0);W.wire.add(w);
  W.loop=new T.Mesh(new T.TorusGeometry(.035,.006,8,24),M.metal("#e8e8ec",{emissive:new T.Color("#000")}));W.loop.position.set(-.13,-.32,0);W.wire.add(W.loop);
  // أطباق الأملاح (انقري لاختيار الملح)
  Object.keys(FL).forEach((k,i)=>{const g=new T.Group();const x=-1.25+i*.4;g.position.set(x,0,.95);const dish=new T.Mesh(new T.CylinderGeometry(.14,.1,.04,32),M.glass({thickness:.1}));g.add(dish);
   const salt=new T.Mesh(new T.SphereGeometry(.08,20,12,0,6.3,0,1.2),M.std(k==="Cu"?"#4cc0a0":"#f4f4f2",{roughness:.95}));salt.scale.y=.4;salt.position.y=.01;g.add(salt);
   const lb=V3.label(FL[k][1],{size:34});lb.position.set(0,.2,0);lb.scale.multiplyScalar(.8);g.add(lb);g.userData.tap="salt:"+k;c.taps.push(g);scene.add(g);if(k===S.e)W.sel=g});
  // شرارات
  const n=80,geo=new T.BufferGeometry();W.sp=new Float32Array(n*3);W.spv=[...Array(n)].map(()=>({t:Math.random(),x:0,z:0}));geo.setAttribute("position",new T.BufferAttribute(W.sp,3));
  W.spm=new T.PointsMaterial({size:.03,color:"#ffcc66",transparent:true,blending:T.AdditiveBlending,depthWrite:false});W.pts=new T.Points(geo,W.spm);scene.add(W.pts);
  // لوح الطيف
  W.spec=V3.canvasTex(700,200,()=>{});const sp=new T.Mesh(new T.PlaneGeometry(1.75,.5),new T.MeshBasicMaterial({map:W.spec,toneMapped:false}));sp.position.set(-.9,1.75,-1.2);sp.rotation.y=.2;scene.add(sp);W.lastE="";
  return W},
 tap(name){if(name.startsWith("salt:"))set("e",name.slice(5))},
 update(c,W,s,t,dt,S){const F=FL[S.e];const gas=S.gas?1:0;const k=gas*Math.max(0,Math.min(1,(s.d-45)/45));
  W.u.forEach(u=>u.t.value=t);W.outer.visible=W.inner.visible=W.halo.visible=!!gas;
  const fc=new T.Color("#3d6dff").lerp(new T.Color(F[2]),k);W.u[0].c2.value.copy(new T.Color(F[2]));W.u[0].mixv.value=k;W.u[0].a.value=.75+.35*k;W.outer.scale.set(1+k*.5,1+k*.25,1+k*.5);
  W.light.color.copy(k>.1?new T.Color(F[2]):new T.Color("#7aa0ff"));W.light.intensity=gas*(.8+k*2.6+Math.sin(t*20)*.08);W.halo.material.color.copy(fc);W.halo.material.opacity=gas*(.18+.32*k);
  // السلك: ينتقل من فوق الطبق نحو اللهب
  const p=s.d/100;W.wire.position.set(.3+(1-p)*.9,1.12+(1-p)*.1,.05+(1-p)*.5);W.loop.material.emissive.set(k>.1?F[2]:"#000");W.loop.material.emissiveIntensity=k*2;
  W.sel&&(W.sel.position.y=0);const sel=c.taps.find(g=>g.userData.tap==="salt:"+S.e);if(sel){sel.position.y=.03+Math.sin(t*4)*.015;W.sel=sel}
  W.spv.forEach((q,i)=>{q.t+=dt*(.6+Math.random()*.4);if(q.t>1){q.t=0;q.x=(Math.random()-.5)*.1;q.z=(Math.random()-.5)*.1}const on=k>.15;W.sp[i*3]=q.x*(1+q.t*3)+Math.sin(q.t*9+i)*.05;W.sp[i*3+1]=on?1.05+q.t*.9:-5;W.sp[i*3+2]=q.z*(1+q.t*3)});
  W.pts.geometry.attributes.position.needsUpdate=true;W.spm.color.set(F[2]);
  const key=S.e+(k>.5);if(key!==W.lastE){W.lastE=key;const x=W.spec._x;x.fillStyle="#0a0608";x.fillRect(0,0,700,200);x.fillStyle="#F3DFA8";x.font="700 28px Cairo";x.textAlign="center";x.direction="rtl";x.fillText("المطياف: طيف الانبعاث الخطّي",350,36);
   for(let l=400;l<=750;l+=2){const X=40+(l-400)/350*620;x.fillStyle="hsl("+(270-(l-400)/350*270)+",90%,50%)";x.globalAlpha=.25;x.fillRect(X,60,3,100);x.globalAlpha=1}
   const L={Li:[670,610],Na:[589,590],K:[766,404],Ca:[622,554,445],Cu:[510,522,578],Sr:[641,606,461],Ba:[554,524,578]}[S.e];if(k>.5)L.forEach(l=>{if(l>750)l=748;const X=40+(l-400)/350*620;x.fillStyle="hsl("+(270-(l-400)/350*270)+",100%,62%)";x.fillRect(X-3,60,6,100)});
   x.fillStyle="#cfd5de";x.font="20px Cairo";x.direction="ltr";x.fillText("400 nm",60,190);x.fillText("750 nm",640,190);W.spec.needsUpdate=true}},
 challenges:[{t:"انقري طبق ملح لاختياره",test:(s,h)=>h.e.size>=2},{t:"أدخلي السلك في اللهب",test:s=>s.d>60&&s.gas},{t:"قارني 5 عناصر",test:(s,h)=>h.e.size>=6},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أميّز لون اللهب الصادر عن ذرّات العناصر المختلفة، وأفسّر سببه.",mats:"موقد بنسن، سلك نيكروم، أملاح كلوريدات، حمض HCl مخفّف لتنظيف السلك.",
  steps:["دوّري المشهد وقرّبي الموقد بإصبعين.","انقري أحد أطباق الأملاح لاختياره، ثمّ أدخلي السلك في اللهب بالمؤشّر.","لاحظي لون اللهب، وانعكاس ضوئه على الطاولة، وخطوط الطيف على اللوح.","كرّري مع بقيّة الأملاح."],
  questions:[{q:"فسّري ظهور اللون عند تسخين ذرّات العنصر.",a:"تمتصّ الإلكترونات الطاقة فتنتقل إلى مستويات أعلى، وعند عودتها تطلق الطاقة ضوءًا بطول موجي محدّد."},{q:"لماذا يختلف لون اللهب من عنصر لآخر؟",a:"لأنّ فروق الطاقة بين مستويات الطاقة تختلف من عنصر لآخر."},
   {q:"لماذا نستخدم الطيف إضافة إلى لون اللهب؟",a:"لأنّ بعض العناصر تعطي ألوانًا متقاربة (Li و Sr)، أمّا خطوط الطيف فمميّزة لكلّ عنصر."}],
  concl:"لكلّ عنصر لون لهب وطيف انبعاث خطّي مميّز؛ لأنّ إلكترونات ذرّاته المُثارة تطلق ضوءًا بأطوال موجية محدّدة."}});

/* ======================= 3) الجزيئات ثلاثية الأبعاد ======================= */
const EL={H:["#f4f6f8",.22,1.1,"هيدروجين"],C:["#3b3d42",.34,1.7,"كربون"],N:["#3466e0",.33,1.55,"نيتروجين"],O:["#e2342e",.32,1.52,"أكسجين"],Cl:["#2fc25d",.44,1.75,"كلور"]};
const tet=[[0,1,0],[.943,-.333,0],[-.471,-.333,.816],[-.471,-.333,-.816]];
const MO={
 H2O:{n:"الماء",a:[["O",[0,0,0]],["H",[.757,-.586,0]],["H",[-.757,-.586,0]]],b:[[0,1,1],[0,2,1]],shape:"منحنٍ",ang:"104.5°"},
 NH3:{n:"الأمونيا",a:[["N",[0,.1,0]],["H",[.94,-.28,0]],["H",[-.47,-.28,.81]],["H",[-.47,-.28,-.81]]],b:[[0,1,1],[0,2,1],[0,3,1]],shape:"هرم ثلاثي",ang:"107°"},
 CH4:{n:"الميثان",a:[["C",[0,0,0]],...tet.map(v=>["H",v.map(x=>x*1.09)])],b:[[0,1,1],[0,2,1],[0,3,1],[0,4,1]],shape:"رباعي الأوجه",ang:"109.5°"},
 CO2:{n:"ثاني أكسيد الكربون",a:[["C",[0,0,0]],["O",[1.16,0,0]],["O",[-1.16,0,0]]],b:[[0,1,2],[0,2,2]],shape:"خطّي",ang:"180°"},
 N2:{n:"النيتروجين",a:[["N",[.55,0,0]],["N",[-.55,0,0]]],b:[[0,1,3]],shape:"خطّي",ang:"—"},
 O2:{n:"الأكسجين",a:[["O",[.6,0,0]],["O",[-.6,0,0]]],b:[[0,1,2]],shape:"خطّي",ang:"—"},
 HCl:{n:"كلوريد الهيدروجين",a:[["Cl",[-.4,0,0]],["H",[.87,0,0]]],b:[[0,1,1]],shape:"خطّي",ang:"—"},
 C2H4:{n:"الإيثين",a:[["C",[.67,0,0]],["C",[-.67,0,0]],["H",[1.23,.93,0]],["H",[1.23,-.93,0]],["H",[-1.23,.93,0]],["H",[-1.23,-.93,0]]],b:[[0,1,2],[0,2,1],[0,3,1],[1,4,1],[1,5,1]],shape:"مستوٍ",ang:"120°"},
 C2H2:{n:"الإيثاين",a:[["C",[.6,0,0]],["C",[-.6,0,0]],["H",[1.66,0,0]],["H",[-1.66,0,0]]],b:[[0,1,3],[0,2,1],[1,3,1]],shape:"خطّي",ang:"180°"}};
const VAL={H:1,C:4,N:5,O:6,Cl:7};
function lonePairs(m){const M2=MO[m];const out=[];M2.a.forEach((a,i)=>{const nb=[],ord={};let bs=0;M2.b.forEach(([x,y,o])=>{if(x===i||y===i){const j=x===i?y:x;nb.push(j);bs+=o}});const L=(VAL[a[0]]-bs)/2;if(L<=0)return;
 const P=new T.Vector3(...a[1]);const dirs=nb.map(j=>new T.Vector3(...M2.a[j][1]).sub(P).normalize());let res=[];
 if(dirs.length>=2){const s=dirs.reduce((u,d)=>u.add(d.clone()),new T.Vector3()).negate().normalize();if(L===1)res=[s];else{const n=new T.Vector3().crossVectors(dirs[0],dirs[1]).normalize();const a1=.955;res=[s.clone().multiplyScalar(Math.cos(a1)).add(n.clone().multiplyScalar(Math.sin(a1))),s.clone().multiplyScalar(Math.cos(a1)).sub(n.clone().multiplyScalar(Math.sin(a1)))]}}
 else{const b=dirs[0];const back=b.clone().negate();const perp=Math.abs(b.y)<.9?new T.Vector3(0,1,0).cross(b).normalize():new T.Vector3(1,0,0).cross(b).normalize();const perp2=new T.Vector3().crossVectors(b,perp);
  const ang=L===1?0:L===2?Math.PI/3:1.23;for(let k=0;k<L;k++){const ph=k/L*2*Math.PI;res.push(back.clone().multiplyScalar(Math.cos(ang)).add(perp.clone().multiplyScalar(Math.sin(ang)*Math.cos(ph))).add(perp2.clone().multiplyScalar(Math.sin(ang)*Math.sin(ph))).normalize())}}
 res.forEach(d=>out.push({p:P,d}))});return out}
VLab.reg({id:"c10-molecules3d",three:1,icon:"🧬",grade:"الصف العاشر",subject:"الكيمياء",unit:"الوحدة 3: الروابط الكيميائية",src:"كتاب الأنشطة ص16",
 title:"أشكال الجزيئات ثلاثية الأبعاد",question:"كيف تترتّب الذرّات وأزواج الإلكترونات في الفراغ لتعطي الجزيء شكله؟",view:{th:0,ph:1.3,r:3.8,min:1.8,max:6},target:[0,1,0],
 vars:[{k:"m",label:"الجزيء",type:"seg",val:"H2O",c:"#7A1F2E",opts:Object.keys(MO).map(k=>[k,sub(k)])},{k:"v",label:"النموذج",type:"seg",val:"ball",c:"#2b7bd6",opts:[["ball","🔴 كرات وعصي"],["fill","⚪ الحجم الفراغي"],["lp","☁️ أزواج الإلكترونات"]]},
  {k:"spin",label:"دوران تلقائي",type:"seg",val:1,c:"#B8902A",opts:[[1,"تشغيل"],[0,"إيقاف"]]}],
 read(s){const M2=MO[s.m];let sh=0;M2.b.forEach(b=>sh+=b[2]);const lp=lonePairs(s.m).length;const ord=Math.max(...M2.b.map(b=>b[2]));return[{label:"الجزيء",val:M2.n+" "+sub(s.m)},{label:"أزواج الإلكترونات المشتركة",val:sh},{label:"أزواج غير رابطة",val:lp},{label:"أعلى رتبة رابطة",val:["","أحادية","ثنائية","ثلاثية"][ord]},{label:"الشكل",val:M2.shape},{label:"الزاوية",val:M2.ang}]},
 build(c,S){const{scene}=c;const W={key:""};
  const disc=new T.Mesh(new T.CylinderGeometry(.9,.95,.06,64),M.glass({thickness:.3}));disc.position.y=.03;scene.add(disc);
  const ring=new T.Mesh(new T.TorusGeometry(.92,.015,8,80),M.metal("#B8902A"));ring.rotation.x=Math.PI/2;ring.position.y=.06;scene.add(ring);
  const beam=new T.Mesh(new T.CylinderGeometry(.85,.85,1.6,48,1,true),new T.MeshBasicMaterial({color:"#9fd4ff",transparent:true,opacity:.05,side:T.DoubleSide,depthWrite:false,blending:T.AdditiveBlending}));beam.position.y=.85;scene.add(beam);
  W.root=new T.Group();W.root.position.y=.95;scene.add(W.root);W.title=null;W.rot=0;return W},
 tap(name){},
 update(c,W,s,t,dt,S){const key=S.m+S.v;if(key!==W.key){W.key=key;while(W.root.children.length)W.root.remove(W.root.children[0]);const M2=MO[S.m],sc=.62;const G=W.root;
   const fill=S.v==="fill";const pos=M2.a.map(a=>new T.Vector3(...a[1]).multiplyScalar(sc));
   M2.a.forEach((a,i)=>{const E=EL[a[0]];const r=fill?E[2]*.24:E[1]*.75;const m=new T.Mesh(new T.SphereGeometry(r,48,32),new T.MeshPhysicalMaterial({color:E[0],roughness:.18,metalness:0,clearcoat:1,clearcoatRoughness:.08,transparent:S.v==="lp",opacity:S.v==="lp"?.9:1}));m.position.copy(pos[i]);m.castShadow=true;G.add(m);
    const lb=V3.label(a[0],{size:40,bg:"rgba(20,10,14,.7)"});lb.scale.multiplyScalar(.7);lb.position.copy(pos[i]).add(new T.Vector3(0,r+.12,0));G.add(lb)});
   if(!fill)M2.b.forEach(([i,j,o])=>{const A=pos[i],B=pos[j];const d=B.clone().sub(A),L=d.length();const mid=A.clone().add(B).multiplyScalar(.5);const up=new T.Vector3(0,1,0);const q=new T.Quaternion().setFromUnitVectors(up,d.clone().normalize());
    const side=Math.abs(d.clone().normalize().y)<.9?new T.Vector3().crossVectors(d,new T.Vector3(0,1,0)).normalize():new T.Vector3(1,0,0);
    for(let k=0;k<o;k++){const off=(k-(o-1)/2)*.09;const cyl=new T.Mesh(new T.CylinderGeometry(o>1?.035:.05,o>1?.035:.05,L,20),new T.MeshPhysicalMaterial({color:"#d9dde3",roughness:.25,metalness:.3,clearcoat:1}));cyl.quaternion.copy(q);cyl.position.copy(mid).add(side.clone().multiplyScalar(off));G.add(cyl);
     if(S.v==="lp"){[.15,-.15].forEach(f=>{const e=new T.Mesh(new T.SphereGeometry(.035,16,12),new T.MeshBasicMaterial({color:"#ffd34d",toneMapped:false}));e.position.copy(mid).add(side.clone().multiplyScalar(off*1.6+(o>1?0:0))).add(d.clone().multiplyScalar(f/L*.6)).add(new T.Vector3(0,0,0).addScaledVector(new T.Vector3().crossVectors(side,d).normalize(),.07));G.add(e)})}}});
   if(S.v==="lp")lonePairs(S.m).forEach(({p,d})=>{const P=p.clone().multiplyScalar(sc);const lobe=new T.Mesh(new T.SphereGeometry(1,32,24),new T.MeshPhysicalMaterial({color:"#ffd34d",transparent:true,opacity:.28,roughness:.2,depthWrite:false,emissive:new T.Color("#b8902a"),emissiveIntensity:.3}));
    lobe.scale.set(.13,.13,.26);lobe.position.copy(P).add(d.clone().multiplyScalar(.36));lobe.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),d);lobe.renderOrder=6;G.add(lobe);
    const side=new T.Vector3().crossVectors(d,Math.abs(d.y)<.9?new T.Vector3(0,1,0):new T.Vector3(1,0,0)).normalize();[1,-1].forEach(sg=>{const e=new T.Mesh(new T.SphereGeometry(.03,14,10),new T.MeshBasicMaterial({color:"#ffe58a",toneMapped:false}));e.position.copy(P).add(d.clone().multiplyScalar(.4)).add(side.clone().multiplyScalar(.045*sg));G.add(e)})});
   if(W.title)c.scene.remove(W.title);W.title=V3.label(M2.n+" "+sub(S.m)+" · "+M2.shape,{size:44});W.title.position.set(0,1.85,0);c.scene.add(W.title)}
  if(S.spin)W.rot+=dt*.5;W.root.rotation.y=W.rot;W.root.position.y=.95+Math.sin(t*1.2)*.03},
 challenges:[{t:"دوّري جزيء الماء بإصبعك",test:(s,h)=>true},{t:"اعرضي أزواج الإلكترونات غير الرابطة",test:s=>s.v==="lp"&&s.m!=="CH4"},{t:"قارني أشكال 5 جزيئات",test:(s,h)=>h.m.size>=5},{t:"جرّبي النماذج الثلاثة",test:(s,h)=>h.v.size>=3}],
 notebook:{goal:"أستكشف الأشكال الفراغية لبعض الجزيئات وأربطها بأزواج الإلكترونات الرابطة وغير الرابطة.",mats:"مجموعة نماذج الكرات والعصي.",
  steps:["اختاري جزيئًا ودوّريه بإصبعك من كلّ الجهات (أوقفي الدوران التلقائي إن أردتِ).","بدّلي إلى «أزواج الإلكترونات» ولاحظي الأزواج غير الرابطة (السحب الذهبية).","قارني الماء والأمونيا والميثان: كم زوجًا غير رابط على الذرّة المركزية؟ وما الشكل؟","استخدمي «الحجم الفراغي» لتري كيف تتداخل الذرّات فعليًّا."],
  questions:[{q:"لماذا جزيء الماء منحنٍ وليس خطّيًّا؟",a:"لأنّ على ذرّة الأكسجين زوجين غير رابطين يتنافران مع الزوجين الرابطين فيدفعان ذرّتي الهيدروجين إلى الأسفل."},{q:"لماذا زاوية الأمونيا (107°) أصغر من زاوية الميثان (109.5°)؟",a:"لأنّ الزوج غير الرابط على النيتروجين يتنافر بقوّة أكبر مع الأزواج الرابطة فيقرّبها من بعضها."},
   {q:"ما نوع الرابطة بين ذرّتي الكربون في الإيثين والإيثاين؟",a:"ثنائية في الإيثين C₂H₄، وثلاثية في الإيثاين C₂H₂."},{q:"لماذا جزيء CO₂ خطّي؟",a:"لأنّ ذرّة الكربون المركزية ليس عليها أزواج غير رابطة، فتتّجه الرابطتان الثنائيتان في اتّجاهين متعاكسين."}],
  concl:"يتحدّد شكل الجزيء بتنافر أزواج الإلكترونات (الرابطة وغير الرابطة) حول الذرّة المركزية، فتبتعد عن بعضها أكبر مسافة ممكنة."}});
})();
