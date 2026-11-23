/* تجارب ثلاثية الأبعاد (الدفعة 2) — المختبر الافتراضي — تصميم المنصّة وتنفيذها: نوال بني عطية */
(function(){const T=window.THREE,V3=window.VLab3D||{},M=V3.MAT||{};
const C=c=>new T.Color(c);
const lerpC=(st,p)=>{for(let i=0;i<st.length-1;i++){const[a,c1]=st[i],[b,c2]=st[i+1];if(p<=b){const f=Math.max(0,(p-a)/(b-a));return C(c1).lerp(C(c2),f)}}return C(st[st.length-1][1])};
const UNI=[[1,"#e0201b"],[3,"#f26b1d"],[5,"#f3c21f"],[7,"#3fae3f"],[9,"#2a7fd6"],[11,"#3d3db8"],[13,"#6a2a9a"]];
const lbl=(scene,t,x,y,z,sz=32,k=1)=>{const l=V3.label(t,{size:sz});l.scale.multiplyScalar(k);l.position.set(x,y,z);scene.add(l);return l};
const relabel=(scene,old,t,sz=32,k=1)=>{const p=old.position.clone();scene.remove(old);return lbl(scene,t,p.x,p.y,p.z,sz,k)};
const arrow=(dir,len,col)=>{const a=new T.ArrowHelper(dir.clone().normalize(),new T.Vector3(),len,C(col).getHex(),Math.min(.18,len*.35),.09);a.line.material.linewidth=3;return a};
const tubeLine=(pts,r,mat)=>new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p))),Math.max(8,pts.length*12),r,8),mat);

/* ======================= 1) السقوط الحرّ ومقاومة الهواء ======================= */
const OB={ba:["كرة فلزّية",.1,.0006],fe:["ريشة",.002,.0025],pf:["ورقة مفرودة",.005,.006],pc:["ورقة مكوّرة",.005,.00035],pa:["مظلّة هبوط",.05,0]};
const kOf=(o,A)=>o==="pa"?.5*1.2*1.4*A:OB[o][2];
function fall(o,air,A,tm){const m=OB[o][1],k=air?kOf(o,A):0;let y=0,v=0,t=0,tl=null;const dt=.002;while(t<tm-1e-9){const a=9.8-k/m*v*v;v+=a*dt;y+=v*dt;t+=dt;if(y>=2&&tl==null){tl=t;y=2;break}}
 if(tl==null&&y<2){let yy=y,vv=v,tt=t;while(yy<2&&tt<30){const a=9.8-k/m*vv*vv;vv+=a*dt;yy+=vv*dt;tt+=dt}tl=tt}return{y:Math.min(2,y),v,tl,vt:k?Math.sqrt(m*9.8/k):Infinity}}
VLab.reg({id:"p10-freefall3d",three:1,icon:"🪶",grade:"الصف العاشر",subject:"الفيزياء",unit:"الوحدة 2: الحركة",src:"كتاب الأنشطة ص13",
 title:"السقوط الحرّ ومقاومة الهواء",question:"هل تسقط الأجسام الثقيلة والخفيفة بالتسارع نفسه؟ وما أثر الهواء في سقوطها؟",view:{th:0,ph:1.42,r:4.4,min:2.2,max:8},target:[0,1.25,0],dyn:1,
 vars:[{k:"o",label:"الجسم المقارَن بالكرة الفلزّية",type:"seg",val:"fe",c:"#7A1F2E",opts:Object.keys(OB).filter(k=>k!=="ba").map(k=>[k,OB[k][0]])},
  {k:"air",label:"داخل الأنبوب",type:"seg",val:1,c:"#2b7bd6",opts:[[1,"🌬️ هواء"],[0,"🫙 مفرّغ من الهواء"]]},
  {k:"A",label:"مساحة المظلّة",unit:"m²",min:.01,max:.2,step:.01,val:.08,c:"#B8902A",ticks:[.01,.1,.2],hide:S=>S.o!=="pa"},
  {k:"t",label:"الزمن منذ الإفلات",unit:"s",min:0,max:2.5,step:.05,val:0,c:"#e04848",ticks:[0,.5,1,1.5,2,2.5]}],
 read(s){const a=fall("ba",s.air,s.A,s.t),b=fall(s.o,s.air,s.A,s.t);return[{label:"زمن سقوط الكرة (2 m)",val:a.tl.toFixed(2),unit:"s"},{label:"زمن سقوط "+OB[s.o][0],val:b.tl.toFixed(2),unit:"s"},{label:"سرعة "+OB[s.o][0]+" الآن",val:b.v.toFixed(2),unit:"m/s"},
  {label:"السرعة الحدّية",val:s.air&&isFinite(b.vt)?b.vt.toFixed(2)+" m/s":"لا توجد (لا هواء)"},{label:"الملاحظة",val:!s.air?"يسقطان معًا: التسارع g = 9.8 m/s² للجميع":"مقاومة الهواء تبطّئ الجسم ذا المساحة الكبيرة والكتلة الصغيرة"}]},
 build(c,S){const{scene}=c;const W={};
  const base=new T.Mesh(new T.CylinderGeometry(.55,.6,.12,48),M.metal("#2b2d33",{roughness:.4}));base.position.y=.06;scene.add(base);
  const cap=base.clone();cap.position.y=2.32;scene.add(cap);
  W.tube=new T.Mesh(new T.CylinderGeometry(.45,.45,2.2,48,1,true),M.glass({thickness:.08}));W.tube.position.y=1.21;scene.add(W.tube);
  const rul=V3.canvasTex(64,1024,(x,w,h)=>{x.fillStyle="#f6efd8";x.fillRect(0,0,w,h);x.fillStyle="#222";x.font="700 22px sans-serif";for(let i=0;i<=200;i+=5){const y=h-(i/200)*h*.98-8;x.fillRect(0,y,i%50?14:30,2);if(i%50===0)x.fillText(((200-i)/100).toFixed(1),30,y+8)}});
  const rm=new T.Mesh(new T.PlaneGeometry(.12,2.05),M.std("#fff",{map:rul}));rm.position.set(-.38,1.22,.24);rm.rotation.y=.55;scene.add(rm);
  W.ball=new T.Mesh(new T.SphereGeometry(.09,32,24),M.metal("#c9ccd3"));scene.add(W.ball);
  const mk={};mk.fe=(()=>{const g=new T.Group();const v=new T.Mesh(new T.PlaneGeometry(.09,.32,1,8),M.std("#c9a46a",{side:T.DoubleSide,roughness:.9}));const p=v.geometry.attributes.position;for(let i=0;i<p.count;i++){const yy=p.getY(i);p.setX(i,p.getX(i)*(1-Math.abs(yy)*2.6))}p.needsUpdate=true;g.add(v);const q=new T.Mesh(new T.CylinderGeometry(.004,.003,.36,6),M.std("#e8dcc0"));g.add(q);g.rotation.z=1.2;return g})();
  mk.pf=new T.Mesh(new T.BoxGeometry(.3,.004,.21),M.std("#ffffff",{roughness:.95}));
  mk.pc=(()=>{const g=new T.IcosahedronGeometry(.07,1);const p=g.attributes.position;for(let i=0;i<p.count;i++){const f=.8+Math.random()*.35;p.setXYZ(i,p.getX(i)*f,p.getY(i)*f,p.getZ(i)*f)}g.computeVertexNormals();return new T.Mesh(g,M.std("#f4f4f0",{roughness:.95,flatShading:true}))})();
  mk.pa=(()=>{const g=new T.Group();const can=new T.Mesh(new T.SphereGeometry(.2,24,12,0,6.29,0,1.2),M.std("#e04848",{side:T.DoubleSide,roughness:.7}));can.position.y=.12;g.add(can);g.userData.can=can;
   for(let i=0;i<6;i++){const a=i/6*6.28;g.add(tubeLine([[Math.cos(a)*.18,.08,Math.sin(a)*.18],[0,-.18,0]],.003,M.std("#333")))}const w=new T.Mesh(new T.BoxGeometry(.06,.06,.06),M.metal("#B8902A"));w.position.y=-.2;g.add(w);return g})();
  W.mk=mk;Object.values(mk).forEach(m=>{m.visible=false;m.scale.multiplyScalar(1.35);scene.add(m)});
  W.pump=new T.Group();const pb=new T.Mesh(new T.BoxGeometry(.5,.35,.35),M.std("#3a6fd8",{roughness:.4}));pb.position.y=.18;W.pump.add(pb);W.pump.add(tubeLine([[0,.3,0],[.3,.5,0],[.6,.3,0]],.025,M.std("#222")));W.pump.position.set(-1.2,0,0);scene.add(W.pump);
  W.pl=lbl(scene,"مضخّة تفريغ",-1.2,.6,0,28,.8);W.lb=lbl(scene,"كرة فلزّية",-.2,2.55,0,28,.8);W.lo=lbl(scene,OB[S.o][0],.2,2.7,0,28,.8);W.ko="";return W},
 update(c,W,s,t,dt,S){const a=fall("ba",S.air,S.A,S.t),b=fall(S.o,S.air,S.A,S.t);W.ball.position.set(-.18,2.1-a.y*.98,0);
  Object.entries(W.mk).forEach(([k,m])=>m.visible=k===S.o);const m=W.mk[S.o];const flutter=S.air&&(S.o==="fe"||S.o==="pf")&&b.y<2;
  m.position.set(.18+(flutter?Math.sin(t*5)*.08*Math.min(1,b.y*3):0),2.1-b.y*.98+(S.o==="pa"?.1:0),0);if(S.o==="pa"){const k=Math.sqrt(S.A/.08);m.userData.can.scale.set(k,1,k)}
  if(S.o==="fe")m.rotation.z=1.2+(flutter?Math.sin(t*3)*.6:0);if(S.o==="pf")m.rotation.z=flutter?Math.sin(t*4)*.3:0;
  W.pump.visible=!S.air;W.pl.visible=!S.air;if(W.ko!==S.o){W.ko=S.o;W.lo=relabel(c.scene,W.lo,OB[S.o][0],28,.8)}},
 challenges:[{t:"أسقطي الريشة والكرة في أنبوب مفرّغ",test:s=>!s.air&&s.o==="fe"&&s.t>=.7},{t:"قارني الورقة المفرودة بالمكوّرة في الهواء",test:(s,h)=>h.o.has("pf")&&h.o.has("pc")},{t:"اجعلي زمن هبوط المظلّة أكثر من 1.5 s",test:s=>s.o==="pa"&&s.air&&fall("pa",1,s.A,0).tl>1.5},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أستقصي تسارع السقوط الحرّ وأثر مقاومة الهواء في سقوط الأجسام.",mats:"أنبوب زجاجي طويل، مضخّة تفريغ، كرة فلزّية، ريشة، أوراق، مظلّة صغيرة، ساعة إيقاف، مسطرة مترية.",
  steps:["اختاري الجسم الذي ستقارنينه بالكرة الفلزّية.","حرّكي مؤشّر الزمن ولاحظي موقع الجسمين.","فرّغي الأنبوب من الهواء وكرّري.","قارني الورقة المفرودة بالمكوّرة، ثمّ جرّبي مساحات مختلفة للمظلّة."],
  questions:[{q:"لماذا وصلت الريشة والكرة معًا في الأنبوب المفرّغ؟",a:"لأنّ القوّة الوحيدة المؤثّرة هي الوزن، فيتسارع الجسمان بتسارع السقوط الحرّ نفسه g بغضّ النظر عن كتلتيهما."},
   {q:"لماذا تسقط الورقة المكوّرة أسرع من المفرودة رغم تساوي كتلتيهما؟",a:"لأنّ مساحة سطحها المعرّض للهواء أصغر فتقلّ مقاومة الهواء."},{q:"ما السرعة الحدّية؟",a:"السرعة الثابتة التي يصلها الجسم عندما تتساوى مقاومة الهواء مع وزنه فتصبح محصّلة القوى صفرًا."},
   {q:"كيف تؤثّر مساحة المظلّة في زمن الهبوط؟",a:"كلّما زادت المساحة زادت مقاومة الهواء وقلّت السرعة الحدّية فيزداد زمن الهبوط ويكون أكثر أمانًا."}],
  concl:"تسقط الأجسام جميعها في الفراغ بالتسارع نفسه (9.8 m/s²)، أمّا في الهواء فتقلّل مقاومة الهواء التسارع وتعتمد على مساحة السطح وشكله."}});

/* ======================= 2) طاولة القوى: محصّلة قوّتين ======================= */
VLab.reg({id:"p10-forces3d",three:1,icon:"🎯",grade:"الصف العاشر",subject:"الفيزياء",unit:"الوحدة 1: المتّجهات",src:"كتاب الأنشطة ص6",
 title:"محصّلة قوّتين على طاولة القوى",question:"كيف نجد محصّلة قوّتين عمليًّا؟ وما القوّة التي توازنهما؟",view:{th:0,ph:.75,r:3.6,min:2,max:6},target:[0,.75,0],
 vars:[{k:"F1",label:"القوّة الأولى F₁ (عند 0°)",unit:"N",min:.5,max:3,step:.1,val:2,c:"#e04848",ticks:[.5,1,2,3]},{k:"F2",label:"القوّة الثانية F₂",unit:"N",min:.5,max:3,step:.1,val:1.5,c:"#2b7bd6",ticks:[.5,1,2,3]},
  {k:"a",label:"الزاوية بين القوّتين",unit:"°",min:0,max:180,step:5,val:90,c:"#B8902A",ticks:[0,45,90,135,180]},{k:"eq",label:"القوّة الموازِنة",type:"seg",val:0,c:"#2f8f5b",opts:[[0,"بدونها"],[1,"أضيفيها"]]},{k:"cp",label:"المركّبتان",type:"seg",val:0,c:"#7A1F2E",opts:[[0,"إخفاء"],[1,"إظهار مركّبتي المحصّلة"]]}],
 read(s){const r=s.a*Math.PI/180,Rx=s.F1+s.F2*Math.cos(r),Ry=s.F2*Math.sin(r),R=Math.hypot(Rx,Ry),th=Math.atan2(Ry,Rx)*180/Math.PI;
  return[{label:"مقدار المحصّلة R",val:R.toFixed(2),unit:"N"},{label:"اتّجاه المحصّلة",val:th.toFixed(0),unit:"°"},{label:"المركّبة الأفقية Rx",val:Rx.toFixed(2),unit:"N"},{label:"المركّبة الرأسية Ry",val:Ry.toFixed(2),unit:"N"},{label:"القوّة الموازنة",val:R.toFixed(2)+" N عند "+((th+180)%360).toFixed(0)+"°"},{label:"الحلقة",val:s.eq?"متّزنة في المركز ✔":"تنزاح باتّجاه المحصّلة"}]},
 build(c,S){const{scene}=c;const W={};
  const tex=V3.canvasTex(1024,1024,(x,w,h)=>{x.fillStyle="#f3ead2";x.beginPath();x.arc(512,512,512,0,7);x.fill();x.strokeStyle="#5a4630";x.fillStyle="#5a4630";x.font="700 34px sans-serif";x.textAlign="center";x.textBaseline="middle";
   for(let d=0;d<360;d+=5){const a=-d*Math.PI/180,r1=d%30?480:450;x.lineWidth=d%30?2:4;x.beginPath();x.moveTo(512+Math.cos(a)*r1,512+Math.sin(a)*r1);x.lineTo(512+Math.cos(a)*505,512+Math.sin(a)*505);x.stroke();if(d%30===0)x.fillText(d+"°",512+Math.cos(a)*405,512+Math.sin(a)*405)}
   x.strokeStyle="rgba(90,70,48,.25)";x.lineWidth=2;for(const r of[120,240,360]){x.beginPath();x.arc(512,512,r,0,7);x.stroke()}});
  const top=new T.Mesh(new T.CylinderGeometry(1,1,.05,96),[M.metal("#8a8f99"),M.std("#fff",{map:tex,roughness:.6}),M.metal("#8a8f99")]);top.position.y=.75;scene.add(top);
  const leg=new T.Mesh(new T.CylinderGeometry(.05,.05,.75,16),M.metal());leg.position.y=.37;scene.add(leg);const ft=new T.Mesh(new T.CylinderGeometry(.35,.4,.04,32),M.metal("#2b2d33"));ft.position.y=.02;scene.add(ft);
  W.ring=new T.Mesh(new T.TorusGeometry(.06,.012,12,32),M.metal("#B8902A"));W.ring.rotation.x=Math.PI/2;scene.add(W.ring);
  W.pul=[0,1,2].map(i=>{const g=new T.Group();const w=new T.Mesh(new T.CylinderGeometry(.06,.06,.025,24),M.metal("#c9ccd3"));w.rotation.x=Math.PI/2;w.position.set(1.04,.82,0);g.add(w);const cl=new T.Mesh(new T.BoxGeometry(.12,.08,.1),M.metal("#3a3d44"));cl.position.set(1.0,.76,0);g.add(cl);
   const hang=new T.Group();hang.position.set(1.1,.82,0);g.add(hang);const str=new T.Mesh(new T.CylinderGeometry(.004,.004,1,6),M.std("#222"));hang.add(str);const ms=new T.Mesh(new T.CylinderGeometry(.05,.05,1,24),M.metal(["#e04848","#2b7bd6","#2f8f5b"][i]));hang.add(ms);
   const s2=new T.Mesh(new T.CylinderGeometry(.004,.004,1,6),M.std("#222"));s2.rotation.z=Math.PI/2;g.add(s2);scene.add(g);return{g,hang,str,ms,s2}});
  W.ar=new T.Group();scene.add(W.ar);return W},
 update(c,W,s,t,dt,S){const r=s.a*Math.PI/180,Rx=s.F1+s.F2*Math.cos(r),Ry=s.F2*Math.sin(r),R=Math.hypot(Rx,Ry),th=Math.atan2(Ry,Rx);
  const off=S.eq?0:Math.min(.6,R*.18);const rx=Math.cos(th)*off,rz=-Math.sin(th)*off;W.ring.position.set(rx,.8,rz);
  const F=[[0,s.F1],[r,s.F2],[th+Math.PI,R]];F.forEach(([ang,f],i)=>{const P=W.pul[i];const vis=i<2||S.eq;P.g.visible=!!vis;P.g.rotation.y=ang;
   const L=Math.max(.05,f*.18);P.ms.scale.y=L;const drop=.25;P.str.scale.y=drop;P.str.position.y=-drop/2;P.ms.position.y=-drop-L/2;
   const lr=Math.hypot(1.04-(rx*Math.cos(ang)-rz*Math.sin(ang)),0);P.s2.scale.y=1.04;P.s2.position.set(.52,.82,0)});
  W.ar.clear();const add=(x,z,len,col)=>{if(len<.02)return;const a=arrow(new T.Vector3(x,0,z),len,col);a.position.set(0,.83,0);W.ar.add(a)};const k=.25;
  add(1,0,s.F1*k*1.4,"#e04848");add(Math.cos(r),-Math.sin(r),s.F2*k*1.4,"#2b7bd6");add(Math.cos(th),-Math.sin(th),R*k*1.4,"#B8902A");
  if(S.cp){add(Math.sign(Rx)||1,0,Math.abs(Rx)*k,"#9b59b6");const a=arrow(new T.Vector3(0,0,-Math.sign(Ry)||-1),Math.abs(Ry)*k,"#16a085");a.position.set(Rx*k,.84,0);if(Math.abs(Ry)>.02)W.ar.add(a)}},
 challenges:[{t:"اجعلي المحصّلة تساوي مجموع القوّتين",test:s=>s.a===0},{t:"اجعلي المحصّلة أصغر ما يمكن",test:s=>s.a===180},{t:"وازني الحلقة بالقوّة الموازنة",test:s=>s.eq===1},{t:"أظهري مركّبتي المحصّلة",test:s=>s.cp===1},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أجد محصّلة قوّتين عمليًّا باستخدام طاولة القوى، وأقارنها بالحساب.",mats:"طاولة القوى، بكرات، خيوط، حلقة، أثقال مختلفة، منقلة.",
  steps:["اضبطي مقداري القوّتين والزاوية بينهما.","لاحظي انزياح الحلقة باتّجاه المحصّلة.","أضيفي القوّة الموازنة وتحقّقي أنّ الحلقة اتّزنت في المركز.","أظهري المركّبتين وقارني قيمتيهما بالحساب: Rx = F₁ + F₂cosθ ، Ry = F₂sinθ."],
  questions:[{q:"متى تكون المحصّلة أكبر ما يمكن؟ ومتى تكون أصغر ما يمكن؟",a:"أكبر ما يمكن عندما تكون الزاوية 0° (R = F₁ + F₂)، وأصغر ما يمكن عند 180° (R = |F₁ − F₂|)."},{q:"ما العلاقة بين المحصّلة والقوّة الموازنة؟",a:"متساويتان مقدارًا ومتعاكستان اتّجاهًا."},{q:"احسبي المحصّلة لقوّتين 3 N و4 N متعامدتين.",a:"R = √(3² + 4²) = 5 N."}],
  concl:"محصّلة قوّتين هي قوّة واحدة تُحدث الأثر نفسه، وتعتمد على مقداري القوّتين والزاوية بينهما، وتوازنها قوّة مساوية لها ومعاكسة في الاتّجاه."}});

/* ======================= 3) القصور الذاتي ودمى التصادم ======================= */
VLab.reg({id:"p10-inertia3d",three:1,icon:"🚗",grade:"الصف العاشر",subject:"الفيزياء",unit:"الوحدة 3: القوى",src:"كتاب الأنشطة ص22",
 title:"القصور الذاتي واختبار دمى التصادم",question:"ماذا يحدث للراكب عندما تتوقّف السيّارة فجأة؟ وكيف يحميه حزام الأمان؟",view:{th:-.55,ph:1.2,r:4.2,min:2,max:7},target:[.2,.4,0],
 vars:[{k:"v",label:"سرعة العربة",unit:"m/s",min:1,max:8,step:.5,val:4,c:"#e04848",ticks:[1,4,8]},{k:"b",label:"حزام الأمان",type:"seg",val:0,c:"#2f8f5b",opts:[[0,"بدون حزام"],[1,"🔒 مع حزام"]]},{k:"t",label:"الزمن",unit:"s",min:0,max:3,step:.02,val:0,c:"#2b7bd6",ticks:[0,1,2,3]}],
 read(s){const tImp=2.625/(s.v*.6),stop=s.b?.12:.012,F=60*s.v/stop;return[{label:"حالة العربة",val:s.t<tImp?"تتحرّك بسرعة ثابتة":"اصطدمت وتوقّفت"},{label:"حالة الدمية",val:s.t<tImp?"تتحرّك مع العربة":s.b?"أوقفها الحزام مع العربة":"استمرّت بالحركة واندفعت للأمام"},
  {label:"زمن توقّف الراكب",val:stop.toFixed(3),unit:"s"},{label:"القوّة المؤثّرة في راكب 60 kg",val:Math.round(F).toLocaleString("en"),unit:"N"}]},
 build(c,S){const{scene}=c;const W={};
  const tr=new T.Mesh(new T.BoxGeometry(4.6,.04,.7),M.std("#5a5f6a",{roughness:.6}));tr.position.set(0,.02,0);scene.add(tr);
  for(let i=-2;i<=2;i++){const m=new T.Mesh(new T.BoxGeometry(.3,.005,.05),M.std("#f3c21f"));m.position.set(i*.9,.045,0);scene.add(m)}
  const wall=new T.Mesh(new T.BoxGeometry(.25,.7,.9),M.std("#c0392b",{roughness:.5}));wall.position.set(1.6,.37,0);scene.add(wall);
  const st=V3.canvasTex(256,256,(x,w,h)=>{x.fillStyle="#c0392b";x.fillRect(0,0,w,h);x.fillStyle="#fff";for(let i=-4;i<8;i++){x.save();x.translate(i*48,0);x.transform(1,0,-.6,1,0,0);x.fillRect(0,0,22,h);x.restore()}});wall.material=M.std("#fff",{map:st});
  W.car=new T.Group();scene.add(W.car);const body=new T.Mesh(new T.BoxGeometry(.9,.18,.5),M.std("#2b7bd6",{roughness:.3,metalness:.3}));body.position.y=.17;W.car.add(body);
  const seat=new T.Mesh(new T.BoxGeometry(.08,.3,.32),M.std("#222"));seat.position.set(-.2,.38,0);W.car.add(seat);
  W.wh=[];[[-.3,.22],[.3,.22],[-.3,-.22],[.3,-.22]].forEach(([x,z])=>{const w=new T.Mesh(new T.CylinderGeometry(.08,.08,.06,24),M.std("#1a1a1a"));w.rotation.x=Math.PI/2;w.position.set(x,.08,z);W.car.add(w);W.wh.push(w)});
  W.dum=new T.Group();scene.add(W.dum);const dm=M.std("#f3c21f",{roughness:.4});const bd=new T.Mesh(new T.CapsuleGeometry(.07,.16,6,12),dm);bd.position.y=.14;W.dum.add(bd);const hd=new T.Mesh(new T.SphereGeometry(.065,20,16),dm);hd.position.y=.33;W.dum.add(hd);
  const tg=V3.canvasTex(64,64,(x)=>{x.fillStyle="#f3c21f";x.fillRect(0,0,64,64);x.fillStyle="#111";x.fillRect(0,0,32,32);x.fillRect(32,32,32,32)});const dot=new T.Mesh(new T.CircleGeometry(.03,16),M.std("#fff",{map:tg}));dot.position.set(.066,.34,0);dot.rotation.y=Math.PI/2;W.dum.add(dot);
  const lg=new T.Mesh(new T.CapsuleGeometry(.03,.14,4,8),dm);lg.rotation.z=Math.PI/2;lg.position.set(.1,.03,0);W.dum.add(lg);W.dumBody=[bd,hd];
  W.belt=new T.Mesh(new T.BoxGeometry(.02,.28,.05),M.std("#111"));W.belt.rotation.x=.0;W.belt.rotation.z=-.5;W.car.add(W.belt);W.belt.position.set(-.1,.42,0);return W},
 update(c,W,s,t,dt,S){const tImp=.8,X0=-1.6,xw=1.6-.125-.45;const x=Math.min(xw,X0+S.v*.6*S.t);W.car.position.x=x;const moving=x<xw-1e-3;W.wh.forEach(w=>w.rotation.y=0);
  W.belt.visible=!!S.b;let dx=0,dy=0,rot=0;const tAt=(xw-X0)/(S.v*.6);if(S.t>tAt){const e=S.t-tAt;if(S.b){rot=-Math.min(.35,e*6)*Math.exp(-e*4)*S.v/4;}else{dx=Math.min(.95,S.v*.6*e);dy=dx>0.15?Math.max(-.3,-(dx-.15)*.9):0;rot=-Math.min(1.4,e*S.v*1.2)}}
  const dX=Math.min(.42,dx);W.dum.position.set(x-.1+dX,.33,0);W.dum.rotation.z=rot;if(!S.b&&dX>.2){W.dum.position.y=Math.max(.28,.33-(dX-.2)*.3)}},
 challenges:[{t:"شاهدي التصادم بدون حزام",test:s=>!s.b&&s.t>=1.5},{t:"كرّري التجربة مع الحزام",test:s=>s.b&&s.t>=1.5},{t:"قارني ثلاث سرعات",test:(s,h)=>h.v.size>=3},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أستقصي القصور الذاتي للأجسام وأهمّية حزام الأمان في السيّارات.",mats:"عربة، دمية، مسار، حاجز، شريط لاصق (حزام).",
  steps:["اضبطي سرعة العربة، ثمّ حرّكي مؤشّر الزمن.","لاحظي حركة الدمية عند اصطدام العربة بالحاجز.","كرّري مع حزام الأمان وقارني.","غيّري السرعة وراقبي القوّة المؤثّرة في الراكب."],
  questions:[{q:"لماذا اندفعت الدمية إلى الأمام عند توقّف العربة؟",a:"بسبب القصور الذاتي: يميل الجسم المتحرّك إلى الاستمرار في حركته بالسرعة نفسها ما لم تؤثّر فيه قوّة محصّلة."},
   {q:"كيف يقلّل الحزام القوّة المؤثّرة في الراكب؟",a:"يوقف الراكب مع السيّارة ويزيد زمن توقّفه، فتقلّ القوّة اللازمة لإيقافه (F = m·Δv / Δt)."},{q:"ما أثر زيادة السرعة في خطورة التصادم؟",a:"تزداد القوّة المؤثّرة في الراكب بزيادة السرعة."}],
  concl:"يحافظ الجسم على حالته الحركية (القصور الذاتي) ما لم تؤثّر فيه قوّة محصّلة؛ لذا يحمي حزام الأمان الراكب بإيقافه مع السيّارة وزيادة زمن التوقّف."}});

/* ======================= 4) أنابيب التفريغ الكهربائي وأطياف العناصر ======================= */
const GAS={H:{n:"الهيدروجين",glow:"#d77ad8",L:[[410,.5],[434,.6],[486,.8],[656,1]]},He:{n:"الهيليوم",glow:"#ffd0a8",L:[[447,.5],[471,.3],[492,.4],[501,.6],[587,1],[668,.6],[706,.5]]},
 Ne:{n:"النيون",glow:"#ff5a2a",L:[[540,.3],[585,.9],[588,.7],[594,.8],[603,.5],[607,.6],[614,.8],[617,.5],[626,.6],[633,.8],[640,1],[650,.7],[660,.5],[693,.6],[703,.7]]},
 Na:{n:"بخار الصوديوم",glow:"#ffb020",L:[[589,1],[589.6,1]]},Hg:{n:"بخار الزئبق",glow:"#b7c8ff",L:[[405,.6],[436,.9],[546,1],[577,.7],[579,.7]]},W:{n:"مصباح متوهّج (أبيض)",glow:"#fff4dc",L:null}};
function wl2rgb(l){let r=0,g=0,b=0;if(l<440){r=-(l-440)/60;b=1}else if(l<490){g=(l-440)/50;b=1}else if(l<510){g=1;b=-(l-510)/20}else if(l<580){r=(l-510)/70;g=1}else if(l<645){r=1;g=-(l-645)/65}else r=1;
 const f=l<420?.3+.7*(l-380)/40:l>700?.3+.7*(780-l)/80:1;return`rgb(${Math.round(255*r*f)},${Math.round(255*g*f)},${Math.round(255*b*f)})`}
VLab.reg({id:"c9-discharge3d",three:1,icon:"🌈",grade:"الصف التاسع",subject:"الكيمياء",unit:"الوحدة 1: الذرّة",src:"كتاب الطالب ص9",
 title:"أنابيب التفريغ الكهربائي وأطياف العناصر",question:"لماذا يتوهّج كلّ غاز بلون مميّز عند تفريغ الكهرباء فيه؟ وكيف يبدو طيفه من خلال المطياف؟",view:{th:0,ph:1.35,r:4.3,min:2,max:6.5},target:[0,1.05,0],
 vars:[{k:"g",label:"الغاز داخل الأنبوب",type:"seg",val:"H",c:"#7A1F2E",opts:Object.keys(GAS).map(k=>[k,GAS[k].n])},{k:"V",label:"فرق الجهد",unit:"kV",min:0,max:5,step:.5,val:3,c:"#B8902A",ticks:[0,1,2,3,4,5]},{k:"sp",label:"المطياف",type:"seg",val:1,c:"#2b7bd6",opts:[[1,"🔭 أظهري الطيف"],[0,"إخفاء"]]}],
 read(s){const G=GAS[s.g],on=s.V>=1.5;return[{label:"التوهّج",val:on?"يتوهّج":"لا يتوهّج (الجهد غير كافٍ)"},{label:"نوع الطيف",val:G.L?"طيف خطّي (انبعاث)":"طيف متّصل"},{label:"الخطوط الأبرز",val:G.L?G.L.filter(x=>x[1]>=.8).map(x=>Math.round(x[0])+" nm").join("، "):"جميع الألوان"},{label:"التفسير",val:"تنتقل الإلكترونات المثارة إلى مستويات أدنى فتبعث ضوءًا بأطوال موجية محدّدة"}]},
 build(c,S){const{scene}=c;const W={};
  const ps=new T.Mesh(new T.BoxGeometry(.9,.4,.5),M.std("#30343c",{roughness:.4}));ps.position.set(0,.2,.2);scene.add(ps);
  W.scr=V3.canvasTex(256,96,()=>{});const sc=new T.Mesh(new T.PlaneGeometry(.42,.16),new T.MeshBasicMaterial({map:W.scr,toneMapped:false}));sc.position.set(-.15,.27,.451);scene.add(sc);
  const kn=new T.Mesh(new T.CylinderGeometry(.05,.05,.04,24),M.metal("#B8902A"));kn.rotation.x=Math.PI/2;kn.position.set(.25,.25,.47);scene.add(kn);
  const sd=[-.55,.55].map(x=>{const p=new T.Mesh(new T.CylinderGeometry(.025,.025,.8,12),M.metal());p.position.set(x,.8,0);scene.add(p);return p});
  W.tube=new T.Mesh(new T.CylinderGeometry(.06,.06,1.1,32),M.glass({thickness:.04}));W.tube.rotation.z=Math.PI/2;W.tube.position.set(0,1.2,0);scene.add(W.tube);
  [-1,1].forEach(sg=>{const b=new T.Mesh(new T.SphereGeometry(.1,24,16),M.glass());b.position.set(sg*.6,1.2,0);scene.add(b);const e=new T.Mesh(new T.CylinderGeometry(.012,.012,.15,8),M.metal());e.rotation.z=Math.PI/2;e.position.set(sg*.62,1.2,0);scene.add(e)});
  W.gl=new T.Mesh(new T.CylinderGeometry(.045,.045,1.12,24),M.glow("#fff",.9));W.gl.rotation.z=Math.PI/2;W.gl.position.set(0,1.2,0);scene.add(W.gl);
  W.halo=new T.Mesh(new T.CylinderGeometry(.11,.11,1.1,24,1,true),M.glow("#fff",.25));W.halo.rotation.z=Math.PI/2;W.halo.position.copy(W.gl.position);scene.add(W.halo);
  W.light=new T.PointLight("#fff",0,3);W.light.position.set(0,1.2,.3);scene.add(W.light);
  W.spec=V3.canvasTex(1024,200,()=>{});W.sp=new T.Mesh(new T.PlaneGeometry(1.5,.3),new T.MeshBasicMaterial({map:W.spec,toneMapped:false}));W.sp.position.set(0,1.75,-.1);scene.add(W.sp);
  W.sl=lbl(scene,"الطيف كما يظهر من خلال المطياف",0,2.0,-.1,30,.8);W.key="";return W},
 update(c,W,s,t,dt,S){const G=GAS[S.g],on=S.V>=1.5,inten=on?Math.min(1,(S.V-1)/3):0;const fl=on?.9+Math.sin(t*40)*.05+Math.random()*.05:0;
  W.gl.material.color.set(G.glow);W.gl.material.opacity=inten*fl;W.halo.material.color.set(G.glow);W.halo.material.opacity=.3*inten*fl;W.light.color.set(G.glow);W.light.intensity=2.5*inten;W.gl.visible=W.halo.visible=on;
  W.sp.visible=W.sl.visible=!!S.sp;const key=S.g+"|"+S.V;if(key!==W.key){W.key=key;const x=W.scr._x;x.fillStyle="#0e1a2a";x.fillRect(0,0,256,96);x.fillStyle="#ff7a5a";x.font="800 50px monospace";x.textAlign="right";x.fillText(S.V.toFixed(1)+" kV",240,66);W.scr.needsUpdate=true;
   const y=W.spec._x;y.fillStyle="#05050a";y.fillRect(0,0,1024,200);const X=l=>20+(l-380)/(720-380)*984;
   if(on){if(!G.L){for(let l=380;l<720;l++){y.fillStyle=wl2rgb(l);y.globalAlpha=inten;y.fillRect(X(l),20,3.2,130)}}else G.L.forEach(([l,a])=>{y.globalAlpha=Math.min(1,a*inten*1.2);y.fillStyle=wl2rgb(l);y.shadowColor=wl2rgb(l);y.shadowBlur=14;y.fillRect(X(l)-3,20,6,130)});y.shadowBlur=0;y.globalAlpha=1}
   y.fillStyle="#cfd6e4";y.font="700 22px sans-serif";y.textAlign="center";for(let l=400;l<=700;l+=50){y.fillRect(X(l)-1,152,2,10);y.fillText(l+"",X(l),186)}W.spec.needsUpdate=true}},
 challenges:[{t:"شغّلي أنبوب الهيدروجين",test:s=>s.g==="H"&&s.V>=1.5},{t:"قارني أطياف 4 غازات",test:(s,h)=>h.g.size>=4},{t:"قارني الطيف الخطّي بالمتّصل",test:(s,h)=>h.g.has("W")&&h.g.size>=2},{t:"جدي أقلّ جهد يلزم للتوهّج",test:s=>s.V===1.5},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أستقصي ألوان توهّج الغازات في أنابيب التفريغ الكهربائي وأطيافها الخطّية.",mats:"أنابيب تفريغ (هيدروجين، هيليوم، نيون، صوديوم، زئبق)، مصدر جهد عالٍ، مطياف يدوي.",
  steps:["اختاري الغاز وارفعي الجهد تدريجيًّا حتى يتوهّج الأنبوب.","انظري إلى الطيف من خلال المطياف، وسجّلي ألوان الخطوط وأطوالها الموجية.","كرّري مع غازات أخرى ومع المصباح المتوهّج.","قارني بين الطيف الخطّي والطيف المتّصل."],
  questions:[{q:"لماذا يتوهّج كلّ غاز بلون مختلف؟",a:"لأنّ لكلّ عنصر مستويات طاقة خاصّة به، فتنبعث فوتونات بطاقات (أطوال موجية) محدّدة عند عودة الإلكترونات المثارة إلى مستويات أدنى."},
   {q:"لماذا يُعدّ الطيف الخطّي بصمة للعنصر؟",a:"لأنّه لا يتشابه عنصران في خطوط طيفهما، فيمكن تعرّف العنصر من طيفه."},{q:"ما الفرق بين طيف الهيدروجين وطيف المصباح المتوهّج؟",a:"طيف الهيدروجين خطّي (خطوط منفصلة)، وطيف المصباح متّصل يحتوي جميع الألوان."}],
  concl:"تبعث ذرّات كلّ عنصر عند إثارتها طيفًا خطّيًّا مميّزًا يدلّ على تكميم مستويات الطاقة في الذرّة، ويُستخدم لتعرّف العناصر."}});

/* ======================= 5) قوّة الحموض والقواعد ======================= */
const SA={a:[["HCl","حمض الهيدروكلوريك (قويّ)",1],["CH₃COOH","حمض الإيثانويك (ضعيف)",1.8e-5]],b:[["NaOH","هيدروكسيد الصوديوم (قويّة)",1],["NH₃","الأمونيا (ضعيفة)",1.8e-5]]};
const ionC=(K,c)=>K>=1?c:(-K+Math.sqrt(K*K+4*K*c))/2;
const phS=(type,K,c)=>{const x=ionC(K,c);return type==="a"?-Math.log10(x):14+Math.log10(x)};
VLab.reg({id:"c9-strength3d",three:1,icon:"⚡",grade:"الصف التاسع",subject:"الكيمياء",unit:"الوحدة 2: الحموض والقواعد",src:"كتاب الطالب ص50",
 title:"قوّة الحموض والقواعد",question:"كيف نميّز الحمض القويّ من الضعيف إذا تساوى تركيزهما؟",view:{th:0,ph:1.25,r:3.9,min:2,max:6},target:[0,.65,0],
 vars:[{k:"ty",label:"المقارنة بين",type:"seg",val:"a",c:"#7A1F2E",opts:[["a","حمضين"],["b","قاعدتين"]]},{k:"c",label:"التركيز",unit:"M",min:.01,max:1,step:.01,val:.1,c:"#2b7bd6",ticks:[.01,.5,1]},{k:"mg",label:"شريط مغنيسيوم",type:"seg",val:1,c:"#B8902A",opts:[[1,"أضيفيه"],[0,"بدونه"]]}],
 read(s){const P=SA[s.ty];return P.map(([f,n,K])=>{const p=phS(s.ty,K,s.c),x=ionC(K,s.c);return{label:n+" "+f,val:"pH = "+p.toFixed(1)+" · تأيّن "+(x/s.c*100).toFixed(x/s.c>.1?0:1)+"%"}}).concat([{label:"التوصيل الكهربائي",val:"القويّ يُضيء المصباح بشدّة، والضعيف خافت"},{label:"التفسير",val:"القويّ يتأيّن كلّيًّا في الماء، والضعيف يتأيّن جزئيًّا"}])},
 build(c,S){const{scene}=c;const W={cells:[]};
  [-.65,.65].forEach((x,i)=>{const b=V3.beaker({r:.32,h:.6,level:.6,color:"#e6f2fa"});b.g.position.set(x,0,0);scene.add(b.g);
   const el=[-.1,.1].map(dx=>{const e=new T.Mesh(new T.BoxGeometry(.03,.75,.06),M.std("#2b2b30"));e.position.set(x+dx,.55,0);scene.add(e);return e});
   const bulb=new T.Mesh(new T.SphereGeometry(.09,24,16),new T.MeshPhysicalMaterial({color:"#fff",transmission:.6,roughness:.1,transparent:true,depthWrite:false}));bulb.position.set(x,1.25,0);scene.add(bulb);
   const fil=new T.Mesh(new T.SphereGeometry(.045,16,12),M.glow("#ffd27a",1));fil.position.copy(bulb.position);scene.add(fil);const L=new T.PointLight("#ffd27a",0,2);L.position.copy(bulb.position);scene.add(L);
   const bs=new T.Mesh(new T.CylinderGeometry(.05,.05,.08,16),M.metal());bs.position.set(x,1.13,0);scene.add(bs);
   scene.add(tubeLine([[x-.1,.93,0],[x-.12,1.05,0],[x-.04,1.12,0]],.008,M.std("#d84a3a")));scene.add(tubeLine([[x+.1,.93,0],[x+.12,1.05,0],[x+.04,1.12,0]],.008,M.std("#3a6fd8")));
   const mt=new T.Mesh(new T.BoxGeometry(.28,.4,.06),M.std("#e8e8ea",{roughness:.4}));mt.position.set(x+(i?.5:-.5),.25,.25);scene.add(mt);const sc=V3.canvasTex(256,128,()=>{});const sm=new T.Mesh(new T.PlaneGeometry(.22,.11),new T.MeshBasicMaterial({map:sc,toneMapped:false}));sm.position.set(x+(i?.5:-.5),.36,.281);scene.add(sm);
   const mg=new T.Mesh(new T.BoxGeometry(.015,.25,.04),M.metal("#d8dade"));mg.position.set(x,.14,.12);mg.rotation.z=.25;scene.add(mg);const bub=V3.bubbles(b.g,30,.05,.55);bub.im.position.set(0,.04,.12);
   const tl=lbl(scene,"",x,1.5,0,30,.8);W.cells.push({b,fil,L,sc,mg,bub,tl,x})});W.key="";return W},
 update(c,W,s,t,dt,S){const P=SA[S.ty];W.cells.forEach((E,i)=>{const[f,n,K]=P[i];const x=ionC(K,s.c),cond=Math.min(1,x/.3+(x>1e-4?.05:0));E.fil.material.opacity=Math.min(1,cond*1.3);E.L.intensity=3*cond;
   E.fil.material.color.set(cond>.3?"#fff1b8":"#ff9a40");const p=phS(S.ty,K,s.c);E.b.set(.6,lerpC(UNI,p));E.b.liq.material.opacity=.6;
   const acid=S.ty==="a";E.mg.visible=acid&&!!S.mg;E.bub.on=acid&&!!S.mg;E.bub.update(dt*Math.min(3,.2+x*12),.55);E.mg.scale.y=1;
   if(W.key!==S.ty+"|"+S.c){const y=E.sc._x;y.fillStyle="#0e1a2a";y.fillRect(0,0,256,128);y.fillStyle="#8affc1";y.font="800 54px monospace";y.textAlign="center";y.fillText(p.toFixed(1),128,72);y.font="700 24px sans-serif";y.fillText("pH",128,110);E.sc.needsUpdate=true}
   if(E.tl.userData.t!==f){E.tl=relabel(c.scene,E.tl,f,34,.8);E.tl.userData.t=f}});W.key=S.ty+"|"+S.c},
 challenges:[{t:"قارني حمضين بالتركيز نفسه",test:s=>s.ty==="a"},{t:"قارني قاعدتين بالتركيز نفسه",test:s=>s.ty==="b"},{t:"جرّبي 3 تراكيز",test:(s,h)=>h.c.size>=3},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أميّز بين الحموض والقواعد القويّة والضعيفة بقياس الرقم الهيدروجيني والتوصيل الكهربائي.",mats:"محاليل HCl وCH₃COOH وNaOH وNH₃ بتراكيز متساوية، جهاز pH، دارة توصيل بمصباح، شريط مغنيسيوم.",
  steps:["اختاري حمضين، وحدّدي التركيز.","قارني إضاءة المصباحين وقراءتي جهاز pH.","أضيفي شريط المغنيسيوم وقارني سرعة تصاعد الفقاعات.","كرّري مع القاعدتين."],
  questions:[{q:"لماذا أضاء المصباح بشدّة في HCl وخفت في CH₃COOH؟",a:"لأنّ HCl يتأيّن كلّيًّا فيعطي تركيزًا عاليًا من الأيونات، أمّا CH₃COOH فيتأيّن جزئيًّا."},{q:"لماذا كان الرقم الهيدروجيني لحمض الإيثانويك أعلى؟",a:"لأنّ تركيز أيونات H⁺ فيه أقلّ لضعف تأيّنه."},{q:"هل يعني الحمض الضعيف أنّه مخفّف؟",a:"لا؛ القوّة تتعلّق بدرجة التأيّن، والتخفيف يتعلّق بالتركيز."}],
  concl:"الحموض والقواعد القويّة تتأيّن كلّيًّا في الماء فتوصل التيار بشدّة ولها pH بعيد عن 7، أمّا الضعيفة فتتأيّن جزئيًّا."}});

/* ======================= 6) الرقم الهيدروجيني لمحاليل الأملاح ======================= */
const SALT={nacl:["NaCl","كلوريد الصوديوم",7,"حمض قويّ + قاعدة قويّة"],kno3:["KNO₃","نترات البوتاسيوم",7,"حمض قويّ + قاعدة قويّة"],nh4cl:["NH₄Cl","كلوريد الأمونيوم",5.1,"حمض قويّ + قاعدة ضعيفة"],
 na2co3:["Na₂CO₃","كربونات الصوديوم",11.3,"حمض ضعيف + قاعدة قويّة"],ch3coona:["CH₃COONa","إيثانوات الصوديوم",8.9,"حمض ضعيف + قاعدة قويّة"],nahco3:["NaHCO₃","كربونات الصوديوم الهيدروجينية",8.3,"حمض ضعيف + قاعدة قويّة"]};
VLab.reg({id:"c9-salts3d",three:1,icon:"🧂",grade:"الصف التاسع",subject:"الكيمياء",unit:"الوحدة 2: الحموض والقواعد",src:"كتاب الطالب ص64",
 title:"قياس الرقم الهيدروجيني لمحاليل الأملاح",question:"هل جميع محاليل الأملاح متعادلة؟",view:{th:0,ph:1.3,r:3.4,min:2,max:6},target:[0,.55,0],
 vars:[{k:"s",label:"الملح (أو انقري الأنبوب)",type:"seg",val:"nacl",c:"#7A1F2E",opts:Object.keys(SALT).map(k=>[k,SALT[k][0]])},{k:"i",label:"الكاشف العامّ",type:"seg",val:1,c:"#2b7bd6",opts:[[0,"قبل الإضافة"],[1,"بعد إضافة الكاشف"]]}],
 read(s){const X=SALT[s.s];return[{label:"الملح",val:X[1]+" "+X[0]},{label:"الرقم الهيدروجيني",val:s.i?X[2].toFixed(1):"أضيفي الكاشف"},{label:"نوع المحلول",val:!s.i?"—":X[2]<6.5?"حمضي":X[2]>7.5?"قاعدي":"متعادل"},{label:"مصدر الملح",val:X[3]}]},
 build(c,S){const{scene}=c;const W={tubes:{}};const rack=new T.Mesh(new T.BoxGeometry(2.2,.06,.4),M.std("#8a5a36"));rack.position.y=.45;scene.add(rack);const rb=rack.clone();rb.position.y=.05;scene.add(rb);
  [[-1.05],[1.05]].forEach(([x])=>{const p=new T.Mesh(new T.BoxGeometry(.06,.45,.4),M.std("#8a5a36"));p.position.set(x,.25,0);scene.add(p)});
  Object.keys(SALT).forEach((k,i)=>{const x=-.85+i*.34;const tb=V3.tube({r:.09,h:.85,level:.55,color:"#eef3f6"});tb.g.position.set(x,.08,0);tb.g.userData.tap=k;scene.add(tb.g);c.taps.push(tb.g);
   const l=lbl(scene,SALT[k][0],x,1.12,0,30,.7);W.tubes[k]={tb,l,x}});
  W.drop=V3.drops(scene,"#3fae3f",4);W.pip=new T.Mesh(new T.CylinderGeometry(.02,.008,.35,12),M.glass());scene.add(W.pip);W.last="";return W},
 tap(k){VLab.cur.set("s",k)},
 update(c,W,s,t,dt,S){Object.entries(W.tubes).forEach(([k,E])=>{const done=S.i&&(k===S.s||W.done&&W.done.has(k));const col=done?lerpC(UNI,SALT[k][2]):C("#eef3f6");E.tb.mat.color.lerp(col,Math.min(1,dt*3));E.tb.g.position.y=.08+(k===S.s?.06:0)});
  if(S.i){W.done=W.done||new Set();W.done.add(S.s)}const E=W.tubes[S.s];W.pip.position.set(E.x,1.35,0);if(S.i&&W.last!==S.s){W.last=S.s;W.drop.emit(E.x,1.15,0)}W.drop.update(dt,.6)},
 challenges:[{t:"اختبري الملحين المتعادلين",test:(s,h)=>h.s.has("nacl")&&h.s.has("kno3")&&s.i},{t:"جدي ملحًا حمضيًّا",test:s=>s.s==="nh4cl"&&s.i},{t:"جدي ملحًا قاعديًّا",test:s=>["na2co3","ch3coona","nahco3"].includes(s.s)&&s.i},{t:"اختبري الأملاح الستّة",test:(s,h)=>h.s.size>=6},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أقيس الرقم الهيدروجيني لمحاليل بعض الأملاح وأفسّر نتائجي.",mats:"محاليل أملاح بتراكيز متساوية، أنابيب اختبار، حامل أنابيب، كاشف عامّ وورق الكاشف العامّ.",
  steps:["اختاري الملح (أو انقري أنبوبه).","أضيفي الكاشف العامّ وقارني اللون بمخطّط الألوان.","سجّلي الرقم الهيدروجيني ونوع المحلول.","صنّفي الأملاح وفق الحمض والقاعدة اللذين تكوّنت منهما."],
  questions:[{q:"لماذا محلول كلوريد الأمونيوم حمضي؟",a:"لأنّه ناتج من حمض قويّ (HCl) وقاعدة ضعيفة (NH₃)؛ فيتفاعل أيون الأمونيوم مع الماء منتجًا أيونات H₃O⁺."},{q:"لماذا محلول كربونات الصوديوم قاعدي؟",a:"لأنّه ناتج من حمض ضعيف وقاعدة قويّة؛ فيتفاعل أيون الكربونات مع الماء منتجًا أيونات OH⁻."},{q:"متى يكون محلول الملح متعادلًا؟",a:"عندما يتكوّن من حمض قويّ وقاعدة قويّة."}],
  concl:"ليست جميع محاليل الأملاح متعادلة؛ فتأثير الملح يعتمد على قوّة الحمض والقاعدة اللذين تكوّن منهما."}});

/* ======================= 7) بناء الذرّة والجدول الدوري ======================= */
const ELS=[["H","الهيدروجين",0,"وقود صديق للبيئة وصناعة الأمونيا"],["He","الهيليوم",2,"تعبئة المناطيد والبالونات"],["Li","الليثيوم",4,"بطّاريات الهواتف"],["Be","البيريليوم",5,"سبائك خفيفة للطائرات"],["B","البورون",6,"الزجاج المقاوم للحرارة"],["C","الكربون",6,"الوقود وأقلام الرصاص (الجرافيت)"],
 ["N","النيتروجين",7,"صناعة الأسمدة وحفظ الأغذية"],["O","الأكسجين",8,"التنفّس واللحام والمستشفيات"],["F","الفلور",10,"معجون الأسنان (الفلوريد)"],["Ne","النيون",10,"لوحات الإعلانات المضيئة"],["Na","الصوديوم",12,"ملح الطعام ومصابيح الشوارع"],["Mg","المغنيسيوم",12,"الألعاب النارية والسبائك الخفيفة"],
 ["Al","الألمنيوم",14,"علب المشروبات وأسلاك الكهرباء"],["Si","السيليكون",14,"رقائق الحاسوب والخلايا الشمسية"],["P","الفسفور",16,"رؤوس أعواد الثقاب والأسمدة"],["S","الكبريت",16,"صناعة حمض الكبريتيك"],["Cl","الكلور",18,"تعقيم مياه الشرب"],["Ar","الأرغون",22,"تعبئة المصابيح الكهربائية"],["K","البوتاسيوم",20,"الأسمدة"],["Ca","الكالسيوم",20,"الإسمنت وبناء العظام"]];
const cfg=n=>{const s=[];let r=n;for(const cap of[2,8,8,2]){if(r<=0)break;const k=Math.min(cap,r);s.push(k);r-=k}return s};
const posOf=Z=>{if(Z===1)return[1,1];if(Z===2)return[1,18];const sh=cfg(Z),p=sh.length,v=sh[p-1];if(p===4)return[4,v];return[p,v<=2?v:v+10]};
const ionQ=Z=>{const sh=cfg(Z),v=sh[sh.length-1];if([2,10,18].includes(Z)||Z===6||Z===14)return 0;if(v<=3)return v;return-(8-v)};
VLab.reg({id:"s8-atom3d",three:1,icon:"⚛️",grade:"الصف الثامن",subject:"العلوم",unit:"الوحدة 2: الذرّة والجدول الدوري",src:"كتاب الأنشطة ص16",
 title:"بناء الذرّة وموقعها في الجدول الدوري",question:"كيف يحدّد عدد البروتونات هويّة العنصر؟ وكيف يحدّد التوزيع الإلكتروني موقعه في الجدول الدوري؟",view:{th:0,ph:1.35,r:4.6,min:2,max:7.5},target:[0,.95,0],dyn:1,
 vars:[{k:"Z",label:"عدد البروتونات (العدد الذرّي)",unit:"",min:1,max:20,step:1,val:6,c:"#e04848",ticks:[1,5,10,15,20]},{k:"ion",label:"الحالة",type:"seg",val:0,c:"#2b7bd6",opts:[[0,"ذرّة متعادلة"],[1,"أيون (يكسب/يفقد إلكترونات)"]]}],
 read(s){const Z=s.Z,E=ELS[Z-1],q=s.ion?ionQ(Z):0,ne=Z-q,[p,g]=posOf(Z);return[{label:"العنصر",val:E[1]+" ("+E[0]+")"},{label:"البروتونات / النيوترونات / الإلكترونات",val:Z+" / "+E[2]+" / "+ne},{label:"العدد الكتلي",val:String(Z+E[2])},
  {label:"التوزيع الإلكتروني",val:cfg(ne).join(" , ")},{label:"الموقع في الجدول",val:"الدورة "+p+" ، المجموعة "+g},{label:"الشحنة",val:q===0?"متعادلة":(q>0?q+"+":(-q)+"−")+(q>0?" (يصغر الحجم)":" (يكبر الحجم)")},{label:"من استخداماته",val:E[3]}]},
 build(c,S){const{scene}=c;const W={};W.atom=new T.Group();W.atom.position.y=1.3;scene.add(W.atom);W.nuc=new T.Group();W.atom.add(W.nuc);W.sh=new T.Group();W.atom.add(W.sh);
  W.pt=V3.canvasTex(1024,300,()=>{});const pm=new T.Mesh(new T.PlaneGeometry(2.6,.76),new T.MeshBasicMaterial({map:W.pt,toneMapped:false,transparent:true}));pm.position.set(0,.36,-.35);pm.scale.set(.8,.8,1);scene.add(pm);
  W.big=lbl(scene,"C",1.3,1.5,0,80,1);W.key="";return W},
 update(c,W,s,t,dt,S){const Z=S.Z,E=ELS[Z-1],q=S.ion?ionQ(Z):0,ne=Z-q,key=Z+"|"+S.ion;
  if(key!==W.key){W.key=key;W.nuc.clear();W.sh.clear();const N=E[2],tot=Z+N;const pm=M.std("#e04848",{roughness:.35}),nm=M.std("#9aa0a8",{roughness:.4});const gs=new T.SphereGeometry(.055,16,12);
   for(let i=0;i<tot;i++){const m=new T.Mesh(gs,i%2===0&&i/2<Z||i>=2*N&&i-N<Z?pm:nm);const r=.05*Math.cbrt(tot)*Math.cbrt(Math.random()),a=Math.random()*6.28,b=Math.acos(2*Math.random()-1);m.position.set(r*Math.sin(b)*Math.cos(a),r*Math.cos(b),r*Math.sin(b)*Math.sin(a));W.nuc.add(m)}
   let pc=0,nc=0;W.nuc.children.forEach(m=>{if(pc<Z&&(nc>=N||Math.random()<Z/tot)){m.material=pm;pc++}else{m.material=nm;nc++}});
   const sh=cfg(ne);const scl=q>0?.9:q<0?1.08:1;W.shells=sh.map((n,i)=>{const R=(.38+i*.3)*scl*(Z>10&&!q?1:1);const ring=new T.Mesh(new T.TorusGeometry(R,.006,8,96),M.std("#7fb3ff",{transparent:true,opacity:.55}));ring.rotation.x=Math.PI/2;W.sh.add(ring);
    const g=new T.Group();W.sh.add(g);for(let k=0;k<n;k++){const e=new T.Mesh(new T.SphereGeometry(.035,14,10),M.glow(i===sh.length-1?"#ffd34d":"#5ab0ff",1));const a=k/n*6.28;e.position.set(Math.cos(a)*R,0,Math.sin(a)*R);g.add(e)}g.userData.sp=.6/(i+1);return g});
   const x=W.pt._x;x.clearRect(0,0,1024,300);const [P,G]=posOf(Z);const cw=1024/18,chh=300/4;
   for(let z=1;z<=20;z++){const[pp,gg]=posOf(z);const X=1024-gg*cw,Y=(pp-1)*chh;x.fillStyle=z===Z?"#B8902A":"rgba(30,22,36,.85)";x.fillRect(X+2,Y+2,cw-4,chh-4);x.fillStyle=z===Z?"#fff":"#e9dfc8";x.font="700 22px sans-serif";x.textAlign="center";x.fillText(ELS[z-1][0],X+cw/2,Y+chh/2+4);x.font="14px sans-serif";x.fillText(z,X+cw/2,Y+18)}W.pt.needsUpdate=true;
   W.big=relabel(c.scene,W.big,E[0]+(q===0?"":(q>0?(q>1?q:"")+"+":(-q>1?-q:"")+"−")),80,1)}
  if(W.shells)W.shells.forEach(g=>g.rotation.y+=dt*g.userData.sp);W.atom.rotation.x=.35;W.nuc.rotation.y+=dt*.3},
 challenges:[{t:"ابني ذرّة الأكسجين",test:s=>s.Z===8&&!s.ion},{t:"جدي عنصرًا في المجموعة 18",test:s=>[2,10,18].includes(s.Z)},{t:"كوّني أيونًا موجبًا",test:s=>s.ion&&ionQ(s.Z)>0},{t:"كوّني أيونًا سالبًا",test:s=>s.ion&&ionQ(s.Z)<0},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أبني نموذجًا للذرّة، وأحدّد هويّة العنصر وموقعه في الجدول الدوري من توزيعه الإلكتروني.",mats:"نموذج ذرّة (كرات ملوّنة للبروتونات والنيوترونات والإلكترونات)، جدول دوري.",
  steps:["غيّري عدد البروتونات ولاحظي تغيّر اسم العنصر.","لاحظي التوزيع الإلكتروني على المستويات.","حدّدي الدورة (عدد المستويات) والمجموعة (إلكترونات المستوى الأخير).","حوّلي الذرّة إلى أيون وقارني حجمه بحجم الذرّة."],
  questions:[{q:"ما الذي يحدّد هويّة العنصر؟",a:"عدد البروتونات (العدد الذرّي)."},{q:"كيف نحدّد رقم الدورة ورقم المجموعة؟",a:"رقم الدورة = عدد مستويات الطاقة المشغولة، والمجموعة تُحدّد من عدد إلكترونات المستوى الأخير."},
   {q:"لماذا يصغر حجم الأيون الموجب ويكبر حجم الأيون السالب؟",a:"الموجب يفقد إلكترونات (وقد يفقد مستوى كاملًا) فيزداد جذب النواة للإلكترونات المتبقّية، والسالب يكسب إلكترونات فيزداد التنافر بينها."}],
  concl:"يحدّد عدد البروتونات نوع العنصر، ويحدّد التوزيع الإلكتروني موقعه في الجدول الدوري وسلوكه الكيميائي."}});

/* ======================= 8) نموذج الغوّاص (الغوّاص الديكارتي) ======================= */
VLab.reg({id:"s8-diver3d",three:1,icon:"🤿",grade:"الصف الثامن",subject:"العلوم",unit:"الوحدة 3: الضغط",src:"كتاب الأنشطة ص30",
 title:"نموذج الغوّاص",question:"لماذا يغوص القطّارة داخل الزجاجة عند الضغط عليها ويطفو عند إفلاتها؟",view:{th:.2,ph:1.4,r:3.4,min:2,max:6},target:[0,.75,0],
 vars:[{k:"p",label:"قوّة الضغط على الزجاجة",unit:"%",min:0,max:100,step:5,val:0,c:"#e04848",ticks:[0,50,100]},{k:"w",label:"كمّية الماء داخل القطّارة",type:"seg",val:1,c:"#2b7bd6",opts:[[0,"قليلة"],[1,"متوسّطة"],[2,"كثيرة"]]}],
 read(s){const air=[.6,.45,.35][s.w]*(1-s.p/100*.45);const rho=1.08-air*.25;const sink=rho>1.0;return[{label:"حجم فقاعة الهواء في القطّارة",val:(air*100).toFixed(0)+"%"},{label:"كثافة الغوّاص مقارنة بالماء",val:rho>1?"أكبر":"أقلّ"},{label:"حالة الغوّاص",val:sink?"يغوص ⬇":"يطفو ⬆"},{label:"التفسير",val:"الضغط ينتقل في الماء بالتساوي فينضغط الهواء ويدخل ماء إلى القطّارة"}]},
 build(c,S){const{scene}=c;const W={};const prof=[[0,0],[.3,0],[.32,.04],[.32,1.2],[.26,1.38],[.12,1.5],[.11,1.62],[.12,1.64]];
  W.bot=new T.Group();scene.add(W.bot);W.bot.add(new T.Mesh(new T.LatheGeometry(prof.map(p=>new T.Vector2(p[0],p[1])),48),new T.MeshPhysicalMaterial({color:"#e8f4ff",transmission:.95,roughness:.05,thickness:.03,transparent:true,depthWrite:false,side:T.DoubleSide})));
  const cap=new T.Mesh(new T.CylinderGeometry(.13,.13,.08,24),M.std("#2b7bd6"));cap.position.y=1.66;W.bot.add(cap);
  const wat=new T.Mesh(new T.LatheGeometry([[0,.02],[.3,.02],[.3,1.2],[.25,1.36],[.11,1.48],[0,1.48]].map(p=>new T.Vector2(p[0],p[1])),48),M.liquid("#8fc8f0",{opacity:.35}));wat.renderOrder=3;W.bot.add(wat);
  W.dv=new T.Group();scene.add(W.dv);const gl=new T.Mesh(new T.CylinderGeometry(.04,.025,.28,24,1,true),M.glass());W.dv.add(gl);const bulb=new T.Mesh(new T.SphereGeometry(.06,20,14,0,6.29,0,1.8),M.std("#e04848",{roughness:.5}));bulb.position.y=.17;W.dv.add(bulb);
  W.air=new T.Mesh(new T.CylinderGeometry(.036,.036,1,16),M.std("#ffffff",{transparent:true,opacity:.6}));W.dv.add(W.air);W.wIn=new T.Mesh(new T.CylinderGeometry(.034,.024,1,16),M.liquid("#5aa8e0",{opacity:.7}));W.dv.add(W.wIn);
  W.hand=new T.Group();scene.add(W.hand);[-1,1].forEach(sg=>{const h=new T.Mesh(new T.CapsuleGeometry(.08,.3,6,12),M.std("#e8b896",{roughness:.6}));h.rotation.x=Math.PI/2;h.position.set(sg*.42,.7,0);W.hand.add(h)});W.y=1.1;return W},
 update(c,W,s,t,dt,S){const air=[.6,.45,.35][S.w]*(1-s.p/100*.45);const rho=1.08-air*.25;const sink=rho>1.0;const k=1-s.p/100*.08;W.bot.scale.set(k,1,k);
  W.hand.children.forEach((h,i)=>h.position.x=(i?1:-1)*(.42-s.p/100*.05));W.hand.visible=s.p>2;
  const tgt=sink?.2:1.12;W.y+=(tgt-W.y)*Math.min(1,dt*1.2);W.dv.position.set(0,W.y+Math.sin(t*2)*.008,0);
  const L=.26,ah=air*L;W.air.scale.y=ah;W.air.position.y=.13-ah/2;W.wIn.scale.y=L-ah;W.wIn.position.y=-.13+(L-ah)/2},
 challenges:[{t:"اجعلي الغوّاص يغوص",test:s=>{const air=[.6,.45,.35][s.w]*(1-s.p/100*.45);return 1.08-air*.25>1}},{t:"اجعليه يطفو مرّة أخرى",test:(s,h)=>h.p.size>=3&&s.p===0},{t:"قارني كمّيات الماء الثلاث",test:(s,h)=>h.w.size>=3},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أستقصي انتقال الضغط في السوائل باستخدام نموذج الغوّاص.",mats:"زجاجة بلاستيكية بغطاء، ماء، قطّارة، كأس.",steps:["املئي الزجاجة بالماء وضعي القطّارة بحيث تطفو.","اضغطي على الزجاجة تدريجيًّا وراقبي فقاعة الهواء داخل القطّارة.","أفلتي الزجاجة ولاحظي ما يحدث.","غيّري كمّية الماء في القطّارة وكرّري."],
  questions:[{q:"ماذا حدث لفقاعة الهواء داخل القطّارة عند الضغط؟",a:"قلّ حجمها لأنّ الضغط انتقل عبر الماء فانضغط الهواء ودخل ماء إلى القطّارة."},{q:"لماذا غاص الغوّاص؟",a:"لأنّ كتلته زادت بدخول الماء مع بقاء حجمه، فزادت كثافته على كثافة الماء."},{q:"ما المبدأ العلمي الذي يفسّر التجربة؟",a:"مبدأ باسكال: الضغط المؤثّر في سائل محصور ينتقل بالتساوي إلى جميع أجزائه."}],
  concl:"ينتقل الضغط في السائل المحصور بالتساوي (مبدأ باسكال)؛ فيضغط هواء الغوّاص فتزداد كثافته ويغوص، ويطفو عند زوال الضغط، وهو مبدأ عمل الغوّاصات."}});


/* ======================= 9) الخصائص الفيزيائية للمعادن ======================= */
const MIN={qz:{n:"الكوارتز",col:"#eef4f8",tr:1,H:7,st:"لا يترك مخدشًا (أبيض)",stc:null,lu:"زجاجي",f:"hex",acid:0,fo:"منشور سداسي ينتهي بهرم"},ca:{n:"الكالسيت",col:"#f4ead8",tr:.7,H:3,st:"أبيض",stc:"#f4f4f0",lu:"زجاجي",f:"rhomb",acid:1,fo:"معيّني الأوجه (رومبوهيدرون)"},
 ha:{n:"الهاليت",col:"#f6f2ee",tr:.8,H:2.5,st:"أبيض",stc:"#f4f4f0",lu:"زجاجي",f:"cube",acid:0,fo:"مكعّب"},py:{n:"البايرايت",col:"#c9a44a",tr:0,H:6.5,st:"أسود مخضرّ",stc:"#2c3326",lu:"فلزّي",f:"cube",acid:0,fo:"مكعّب (ذهب الحمقى)"},
 gy:{n:"الجبس",col:"#efe9dc",tr:.5,H:2,st:"أبيض",stc:"#f4f4f0",lu:"لؤلؤي/حريري",f:"tab",acid:0,fo:"صفائح منشورية"},ga:{n:"الجالينا",col:"#7d838c",tr:0,H:2.5,st:"رمادي رصاصي",stc:"#55595e",lu:"فلزّي",f:"cube",acid:0,fo:"مكعّب، ثقيل جدًّا"},
 he:{n:"الهيماتيت",col:"#4a3a3a",tr:0,H:6,st:"بنّي محمرّ",stc:"#8a2e1e",lu:"فلزّي إلى ترابي",f:"blob",acid:0,fo:"كتلي غالبًا"},fl:{n:"الفلوريت",col:"#9b6fd0",tr:.8,H:4,st:"أبيض",stc:"#f4f4f0",lu:"زجاجي",f:"oct",acid:0,fo:"ثماني الأوجه أو مكعّب"}};
const TST={nail:["الظفر",2.5],coin:["قطعة نقد نحاسية",3.5],iron:["مسمار فولاذي",5.5],glass:["لوح زجاج",5.5]};
VLab.reg({id:"e9-minerals3d",three:1,icon:"💎",grade:"الصف التاسع",subject:"علوم الأرض",unit:"الوحدة 1: المعادن",src:"كتاب الأنشطة ص8",
 title:"الخصائص الفيزيائية للمعادن وأشكال بلّوراتها",question:"كيف نتعرّف المعادن من خصائصها الفيزيائية: القساوة، والمخدش، والبريق، والشكل البلّوري؟",view:{th:.15,ph:1.05,r:2.1,min:1.2,max:5},target:[-.25,.25,0],dyn:1,
 vars:[{k:"m",label:"العيّنة",type:"seg",val:"qz",c:"#7A1F2E",opts:Object.keys(MIN).map(k=>[k,MIN[k].n])},{k:"t",label:"الاختبار",type:"seg",val:"none",c:"#2b7bd6",opts:[["none","فحص الشكل والبريق"],["streak","لوح المخدش"],["nail","خدش بالظفر"],["coin","خدش بقطعة نقد"],["iron","خدش بمسمار"],["acid","قطرة حمض HCl مخفّف"]]}],
 read(s){const X=MIN[s.m];const r=[{label:"المعدن",val:X.n},{label:"الشكل البلّوري",val:X.fo},{label:"البريق",val:X.lu}];
  if(s.t==="streak")r.push({label:"لون المخدش",val:X.st});else if(TST[s.t]){const tl=TST[s.t];r.push({label:"نتيجة الخدش بـ"+tl[0]+" ("+tl[1]+")",val:X.H<tl[1]?"انخدش المعدن ✔ (أقلّ قساوة)":"لم ينخدش ✘ (أقسى)"})}else if(s.t==="acid")r.push({label:"مع الحمض",val:X.acid?"فوران وتصاعد CO₂ ✔":"لا يحدث فوران"});
  r.push({label:"القساوة (مقياس موس)",val:String(X.H)});return r},
 build(c,S){const{scene}=c;const W={};const tb=new T.Mesh(new T.BoxGeometry(1.9,.04,1.0),M.std("#f0ece4",{roughness:.8}));tb.position.y=.02;scene.add(tb);
  W.plate=new T.Mesh(new T.BoxGeometry(.7,.03,.45),M.std("#f8f8f6",{roughness:.95}));W.plate.position.set(-.75,.055,.2);scene.add(W.plate);W.stk=new T.Mesh(new T.PlaneGeometry(.45,.09),M.std("#fff",{roughness:1}));W.stk.rotation.x=-Math.PI/2;W.stk.position.set(-.75,.072,.2);scene.add(W.stk);
  lbl(scene,"لوح المخدش",-.75,.3,.2,26,.6);
  W.sp=new T.Group();W.sp.position.set(.15,.05,0);scene.add(W.sp);W.tool=new T.Group();scene.add(W.tool);W.bub=V3.bubbles(scene,40,.08,.15);W.bub.im.position.set(.15,.12,0);
  W.scr=new T.Mesh(new T.PlaneGeometry(.18,.012),new T.MeshBasicMaterial({color:"#ffffff",transparent:true,opacity:.8}));scene.add(W.scr);W.key="";return W},
 update(c,W,s,t,dt,S){const X=MIN[S.m];if(W.key!==S.m+"|"+S.t){W.key=S.m+"|"+S.t;W.sp.clear();
   const mat=X.tr?new T.MeshPhysicalMaterial({color:X.col,transmission:X.tr,roughness:X.lu==="لؤلؤي/حريري"?.35:.05,thickness:.3,ior:1.55,clearcoat:1,transparent:true}):M.std(X.col,{metalness:X.lu.startsWith("فلزّي")?.65:.1,roughness:X.lu.startsWith("فلزّي")?.35:.8,emissive:X.col,emissiveIntensity:.12});
   const add=(g,x,y,z,ry=0,rz=0)=>{const m=new T.Mesh(g,mat);m.position.set(x,y,z);m.rotation.set(0,ry,rz);W.sp.add(m);return m};
   if(X.f==="hex"){[[0,0,0,0],[.12,0,.08,.3],[-.1,0,.1,-.25]].forEach(([x,y,z,r],i)=>{const h=.4-i*.1;const p=add(new T.CylinderGeometry(.07,.07,h,6),x,h/2,z,0,r);const tp=new T.Mesh(new T.ConeGeometry(.07,.12,6),mat);tp.position.y=h/2+.06;p.add(tp)})}
   else if(X.f==="cube"){const n=S.m==="py"?4:S.m==="ga"?3:5;for(let i=0;i<n;i++){const s=.08+Math.random()*.08;add(new T.BoxGeometry(s,s,s),(Math.random()-.5)*.3,s/2,(Math.random()-.5)*.25,Math.random(),0)}}
   else if(X.f==="rhomb"){const g=new T.BoxGeometry(.25,.18,.2);g.applyMatrix4(new T.Matrix4().makeShear(.35,0,.25,0,0,0));add(g,0,.1,0,.4)}
   else if(X.f==="tab"){for(let i=0;i<3;i++)add(new T.BoxGeometry(.06,.35,.18),i*.07-.07,.17,0,0,(i-1)*.15)}
   else if(X.f==="oct"){add(new T.OctahedronGeometry(.16),0,.16,0,.3);add(new T.OctahedronGeometry(.09),.18,.09,.05,.7)}
   else{const g=new T.IcosahedronGeometry(.18,2);const p=g.attributes.position;for(let i=0;i<p.count;i++){const f=.8+Math.random()*.3;p.setXYZ(i,p.getX(i)*f,p.getY(i)*f*.7,p.getZ(i)*f)}g.computeVertexNormals();add(g,0,.12,0)}
   W.tool.clear();const tl=S.t;if(tl==="nail"){const f=new T.Mesh(new T.CapsuleGeometry(.05,.25,6,12),M.std("#e8b896"));f.rotation.z=1.1;f.position.set(.45,.25,0);W.tool.add(f)}
   else if(tl==="coin"){const co=new T.Mesh(new T.CylinderGeometry(.07,.07,.012,32),M.metal("#c07a3a"));co.rotation.z=1.2;co.position.set(.35,.22,0);W.tool.add(co)}
   else if(tl==="iron"){const n=new T.Mesh(new T.CylinderGeometry(.008,.003,.35,12),M.metal());n.rotation.z=1.1;n.position.set(.4,.25,0);W.tool.add(n)}
   else if(tl==="acid"){const d=new T.Mesh(new T.CylinderGeometry(.025,.008,.3,12),M.glass());d.position.set(.15,.55,0);W.tool.add(d);const b=new T.Mesh(new T.SphereGeometry(.035,16,12),M.std("#222"));b.position.set(.15,.72,0);W.tool.add(b)}
   W.stk.material.color.set(X.stc||"#f8f8f6");W.stk.visible=S.t==="streak";
   const sc=TST[S.t]&&X.H<TST[S.t][1];W.scr.visible=!!sc;W.scr.position.set(.15,.3,.1);W.scr.material.color.set(X.tr?"#ffffff":"#cfcfcf")}
  if(S.t==="streak"){W.sp.position.set(-.75+Math.sin(t*2)*.1,.12,.2);W.sp.scale.setScalar(.6)}else{W.sp.position.set(.15,.05,0);W.sp.scale.setScalar(1)}
  W.tool.position.x=TST[S.t]?Math.sin(t*3)*.04:0;W.bub.on=S.t==="acid"&&!!X.acid;W.bub.update(dt,.18);W.sp.rotation.y+=S.t==="none"?dt*.4:0},
 challenges:[{t:"افحصي لون مخدش البايرايت",test:s=>s.m==="py"&&s.t==="streak"},{t:"جدي معدنًا يفور مع الحمض",test:s=>s.m==="ca"&&s.t==="acid"},{t:"جدي معدنًا يخدشه الظفر",test:s=>s.t==="nail"&&MIN[s.m].H<2.5},{t:"افحصي 5 معادن",test:(s,h)=>h.m.size>=5},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أتعرّف بعض المعادن من خصائصها الفيزيائية وأشكال بلّوراتها.",mats:"عيّنات معادن، لوح مخدش (بورسلان)، قطعة نقد نحاسية، مسمار فولاذي، لوح زجاج، حمض الهيدروكلوريك المخفّف، عدسة مكبّرة.",
  steps:["اختاري العيّنة، ودوّريها لتفحصي شكل بلّوراتها وبريقها.","احتكّي العيّنة بلوح المخدش وسجّلي لون المخدش.","اختبري القساوة بالظفر ثمّ قطعة النقد ثمّ المسمار.","ضعي قطرة حمض مخفّف ولاحظي الفوران."],
  questions:[{q:"لماذا يُعدّ لون المخدش أدقّ من لون المعدن في تعرّفه؟",a:"لأنّ لون المعدن قد يتغيّر بالشوائب، أمّا لون مسحوقه (المخدش) فثابت غالبًا."},{q:"ما المعدن الذي فار مع الحمض؟ ولماذا؟",a:"الكالسيت؛ لأنّه كربونات الكالسيوم فيتفاعل مع الحمض ويطلق غاز CO₂."},{q:"كيف نميّز البايرايت من الذهب؟",a:"مخدش البايرايت أسود مخضرّ، ومخدش الذهب أصفر، والبايرايت أقسى."},{q:"ما الذي يحدّد الشكل الخارجي للبلّورة؟",a:"الترتيب المنتظم الداخلي للذرّات في المعدن."}],
  concl:"لكلّ معدن خصائص فيزيائية مميّزة (الشكل البلّوري، القساوة، المخدش، البريق، التفاعل مع الحمض) نستخدمها مجتمعةً في تعرّفه."}});

/* ======================= 10) السيليكا رباعية الأوجه ======================= */
const SIL={single:["رباعي أوجه منفرد (الأوليفين)","SiO₄",.25],chain:["سلسلة مفردة (البيروكسين)","SiO₃",.333],sheet:["صفائح (الميكا)","Si₂O₅",.4],frame:["هيكل ثلاثي الأبعاد (الكوارتز)","SiO₂",.5]};
VLab.reg({id:"e9-silica3d",three:1,icon:"🔺",grade:"الصف التاسع",subject:"علوم الأرض",unit:"الوحدة 1: المعادن",src:"كتاب الأنشطة ص12",
 title:"السيليكا رباعية الأوجه (هرم السيليكا)",question:"كيف تترابط وحدات السيليكا رباعية الأوجه لتكوّن معادن السيليكات المختلفة؟",view:{th:.4,ph:1.15,r:3.4,min:1.5,max:6},target:[0,.9,0],
 vars:[{k:"a",label:"طريقة الترابط",type:"seg",val:"single",c:"#7A1F2E",opts:Object.keys(SIL).map(k=>[k,SIL[k][0]])},{k:"sh",label:"الشكل",type:"seg",val:1,c:"#2b7bd6",opts:[[1,"كرات وأهرام"],[0,"كرات فقط"]]}],
 read(s){const X=SIL[s.a];return[{label:"البنية",val:X[0]},{label:"الصيغة الأساسية",val:X[1]},{label:"نسبة Si : O",val:"1 : "+(1/X[2]).toFixed(1).replace(".0","")},{label:"ذرّات الأكسجين المشتركة لكلّ هرم",val:{single:"0",chain:"2",sheet:"3",frame:"4"}[s.a]}]},
 build(c,S){const{scene}=c;const W={g:new T.Group()};W.g.position.y=.9;scene.add(W.g);W.key="";
  const R=.22,vs=[[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]].map(v=>new T.Vector3(...v).normalize().multiplyScalar(R));
  W.tet=(p,q)=>{const g=new T.Group();g.position.copy(p);if(q)g.quaternion.copy(q);const si=new T.Mesh(new T.SphereGeometry(.06,20,14),M.std("#3a6fd8",{roughness:.3}));g.add(si);
   vs.forEach(v=>{const o=new T.Mesh(new T.SphereGeometry(.085,20,14),M.std("#e04848",{roughness:.35}));o.position.copy(v);g.add(o)});const th=new T.Mesh(new T.TetrahedronGeometry(R*1.0),new T.MeshPhysicalMaterial({color:"#B8902A",transparent:true,opacity:.35,roughness:.2,depthWrite:false,side:T.DoubleSide}));
   th.geometry=new T.BufferGeometry().setFromPoints([0,1,2,0,1,3,0,2,3,1,2,3].map(i=>vs[i]));th.geometry.computeVertexNormals();th.userData.th=1;g.add(th);return g};return W},
 update(c,W,s,t,dt,S){const key=S.a;if(W.key!==key){W.key=key;W.g.clear();const d=.36;const P=[];
   if(S.a==="single")P.push([0,0,0]);else if(S.a==="chain")for(let i=-3;i<=3;i++)P.push([i*d,0,(i%2)*.06]);else if(S.a==="sheet")for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++)P.push([i*d+(j%2)*d/2,0,j*d*.87]);else for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++)for(let k=-1;k<=1;k++)P.push([i*d*1.1,j*d*1.1,k*d*1.1]);
   P.forEach((p,i)=>{const q=new T.Quaternion();if(S.a==="frame")q.setFromEuler(new T.Euler((i%2)*Math.PI/2,(i%3)*Math.PI/3,0));W.g.add(W.tet(new T.Vector3(...p),q))})}
  W.g.traverse(o=>{if(o.userData.th)o.visible=!!S.sh});W.g.rotation.y+=dt*.25},
 challenges:[{t:"افحصي رباعي الأوجه المنفرد",test:s=>s.a==="single"},{t:"ابني سلسلة",test:s=>s.a==="chain"},{t:"ابني صفيحة الميكا",test:s=>s.a==="sheet"},{t:"ابني هيكل الكوارتز",test:s=>s.a==="frame"},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أعمل نموذجًا لوحدة السيليكا رباعية الأوجه، وأتعرّف طرق ترابطها في معادن السيليكات.",mats:"كرات صلصال بلونين (4 حمراء للأكسجين وواحدة زرقاء للسيليكون)، أعواد خشبية.",
  steps:["افحصي الهرم المنفرد: ذرّة سيليكون في المركز تحيط بها 4 ذرّات أكسجين.","اختاري السلسلة ثمّ الصفائح ثمّ الهيكل.","لاحظي عدد ذرّات الأكسجين التي يشترك فيها كلّ هرم مع جيرانه.","قارني نسبة Si : O في كلّ بنية."],
  questions:[{q:"ما مكوّنات وحدة السيليكا رباعية الأوجه؟",a:"ذرّة سيليكون واحدة مرتبطة بأربع ذرّات أكسجين في رؤوس هرم رباعي الأوجه."},{q:"لماذا يتشقّق الميكا إلى صفائح رقيقة؟",a:"لأنّ أهرام السيليكا فيه مرتبطة على شكل صفائح، والروابط بين الصفائح ضعيفة."},{q:"لماذا الكوارتز قاسٍ وليس له مستويات انفصام؟",a:"لأنّ كلّ هرم يشترك بأكسجيناته الأربعة في هيكل ثلاثي الأبعاد قويّ في جميع الاتّجاهات."}],
  concl:"وحدة البناء الأساسية لمعادن السيليكات هي رباعي أوجه السيليكا (SiO₄)، وطريقة ترابط الوحدات تحدّد خصائص المعدن."}});

/* ======================= 11) آليّة تكوّن معدن الهاليت (التبخّر) ======================= */
VLab.reg({id:"s8-halite3d",three:1,icon:"🧂",grade:"الصف الثامن",subject:"العلوم",unit:"الوحدة 4: الصخور والمعادن",src:"كتاب الأنشطة ص46",
 title:"آليّة تكوّن معدن الهاليت بالتبخّر",question:"كيف تتكوّن بلّورات الهاليت من مياه البحر؟ وما أثر سرعة التبخّر في حجمها؟",view:{th:.3,ph:.62,r:1.9,min:1.1,max:5},target:[0,.5,0],
 vars:[{k:"h",label:"مصدر الحرارة",type:"seg",val:0,c:"#e04848",opts:[[0,"☀️ أشعّة الشمس (بطيء)"],[1,"🔥 لهب الموقد (سريع)"]]},{k:"c",label:"تركيز الملح",unit:"g/100mL",min:10,max:35,step:5,val:30,c:"#2b7bd6",ticks:[10,20,35]},{k:"t",label:"نسبة الماء المتبخّر",unit:"%",min:0,max:100,step:2,val:0,c:"#B8902A",ticks:[0,50,100]}],
 read(s){const sat=100*(1-s.c/36);const cry=s.t>sat;return[{label:"حالة المحلول",val:cry?"فوق مشبع: تترسّب البلّورات":"غير مشبع"},{label:"بداية التبلور عند تبخّر",val:Math.max(0,sat).toFixed(0)+"%"},{label:"حجم البلّورات",val:!cry?"—":s.h?"صغيرة كثيرة":"كبيرة مكعّبة"},{label:"الصخر الناتج",val:"صخر رسوبي كيميائي (ملح صخري)"}]},
 build(c,S){const{scene}=c;const W={};const tri=new T.Group();scene.add(tri);for(let i=0;i<3;i++){const a=i/3*6.28;const l=new T.Mesh(new T.CylinderGeometry(.012,.012,.42,8),M.metal("#3a3d44"));l.position.set(Math.cos(a)*.18,.21,Math.sin(a)*.18);l.rotation.set(Math.sin(a)*.15,0,-Math.cos(a)*.15);tri.add(l)}
  const gz=new T.Mesh(new T.CylinderGeometry(.24,.24,.01,32),M.metal("#9aa0a8",{roughness:.6}));gz.position.y=.42;tri.add(gz);
  const dish=new T.Mesh(new T.SphereGeometry(.3,48,16,0,6.29,Math.PI*.62,Math.PI*.38),M.std("#f6f4f0",{side:T.DoubleSide,roughness:.4}));dish.position.y=.66;scene.add(dish);
  W.liq=new T.Mesh(new T.CircleGeometry(.26,48),M.liquid("#bfe2f5",{opacity:.7}));W.liq.rotation.x=-Math.PI/2;scene.add(W.liq);
  W.burn=new T.Group();scene.add(W.burn);const bb=new T.Mesh(new T.CylinderGeometry(.02,.05,.25,16),M.metal());bb.position.y=.13;W.burn.add(bb);W.fl=new T.Mesh(new T.ConeGeometry(.04,.16,16),M.glow("#3a7bff",.8));W.fl.position.y=.33;W.burn.add(W.fl);
  W.sun=new T.Mesh(new T.SphereGeometry(.15,24,16),M.glow("#ffd34d",1));W.sun.position.set(-.8,1.6,-.4);scene.add(W.sun);W.sl=new T.DirectionalLight("#fff1c8",0);W.sl.position.copy(W.sun.position);scene.add(W.sl);
  W.cr=new T.Group();scene.add(W.cr);W.seed=Math.random();return W},
 update(c,W,s,t,dt,S){const sat=100*(1-S.c/36);const lv=1-s.t/100;const y=.38+.6*.66*0+.38*0;const depth=.12*lv;W.liq.position.y=.66-.3+.02+depth*.9+(.3-.3);
  const hy=.66-.3*Math.cos(Math.PI*.38)*0;W.liq.position.y=.41+depth;const rr=Math.sqrt(Math.max(0,.3*.3-(.66-(.41+depth))**2));W.liq.scale.setScalar(Math.max(.01,rr/.26));W.liq.visible=lv>.02;
  W.burn.visible=!!S.h;W.fl.scale.y=1+Math.sin(t*20)*.1;W.sun.visible=!S.h;W.sl.intensity=S.h?0:1.2;
  const amt=Math.max(0,(s.t-sat)/(100-sat+1e-6));const key=S.h+"|"+Math.round(amt*30);if(W.key!==key){W.key=key;W.cr.clear();let seed=W.seed*1e4;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};
   const n=S.h?Math.round(amt*120):Math.round(amt*14),mat=new T.MeshPhysicalMaterial({color:"#ffffff",transmission:.5,roughness:.15,thickness:.1,transparent:true});
   for(let i=0;i<n;i++){const sz=S.h?.016+rnd()*.014:.04+rnd()*.04*amt;const r=rnd()*.2,a=rnd()*6.28;const m=new T.Mesh(new T.BoxGeometry(sz,sz,sz),mat);const x=Math.cos(a)*r,z=Math.sin(a)*r;m.position.set(x,.37+(.3-Math.sqrt(Math.max(0,.09-x*x-z*z)))+sz/2,z);m.rotation.y=rnd()*3;W.cr.add(m)}}},
 challenges:[{t:"كوّني بلّورات كبيرة",test:s=>!s.h&&s.t>=95},{t:"كوّني بلّورات صغيرة كثيرة",test:s=>s.h&&s.t>=95},{t:"جرّبي تركيزين مختلفين",test:(s,h)=>h.c.size>=2},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أستقصي آليّة تكوّن معدن الهاليت بتبخّر الماء المالح.",mats:"ملح طعام، ماء، طبق تبخير، حامل ثلاثي وشبكة، موقد أو أشعّة الشمس، عدسة مكبّرة.",
  steps:["اختاري مصدر الحرارة وتركيز الملح.","حرّكي نسبة الماء المتبخّر وراقبي متى تبدأ البلّورات بالظهور.","قارني حجم البلّورات وعددها في التبخّر البطيء والسريع."],
  questions:[{q:"متى بدأت بلّورات الهاليت بالتكوّن؟",a:"عندما أصبح المحلول مشبعًا بعد تبخّر جزء من الماء فلم يعد يستطيع إذابة مزيد من الملح."},{q:"لماذا كانت البلّورات أكبر عند التبخّر البطيء؟",a:"لأنّ الأيونات تجد وقتًا كافيًا لتنتظم وتنمو على عدد قليل من البلّورات."},{q:"ما شكل بلّورة الهاليت؟ وما نوع الصخر الذي يكوّنه؟",a:"مكعّب، ويكوّن الملح الصخري وهو صخر رسوبي كيميائي."}],
  concl:"يتكوّن الهاليت بترسّبه من المحاليل المشبعة عند تبخّر الماء، وكلّما كان التبخّر أبطأ كانت البلّورات أكبر."}});

/* ======================= 12) قياس كمّية الأمطار الهاطلة ======================= */
VLab.reg({id:"e9-raingauge3d",three:1,icon:"🌧️",grade:"الصف التاسع",subject:"علوم الأرض",unit:"الوحدة 2: المياه",src:"كتاب الأنشطة ص20",
 title:"قياس كمّية الأمطار بمقياس المطر",question:"كيف نقيس كمّية الأمطار الهاطلة؟ ولماذا تُقاس بالمليمتر؟",view:{th:.2,ph:1.3,r:3,min:1.6,max:5},target:[0,.55,0],
 vars:[{k:"I",label:"شدّة الهطول",unit:"mm/ساعة",min:0,max:20,step:1,val:6,c:"#2b7bd6",ticks:[0,5,10,20]},{k:"h",label:"مدّة الهطول",unit:"ساعة",min:0,max:10,step:.5,val:0,c:"#B8902A",ticks:[0,5,10]},{k:"d",label:"قطر فوهة القمع",unit:"cm",min:10,max:30,step:5,val:20,c:"#7A1F2E",ticks:[10,20,30]}],
 read(s){const mm=s.I*s.h,A=Math.PI*(s.d/2)**2,V=A*mm/10;return[{label:"كمّية المطر",val:mm.toFixed(1),unit:"mm"},{label:"حجم الماء المجمّع",val:V.toFixed(0),unit:"cm³"},{label:"مساحة الفوهة",val:A.toFixed(0),unit:"cm²"},{label:"تصنيف الهطول",val:s.I===0?"لا مطر":s.I<3?"خفيف":s.I<8?"معتدل":"غزير"}]},
 build(c,S){const{scene}=c;const W={};const grass=new T.Mesh(new T.CircleGeometry(1.4,48),M.std("#5d8a3a",{roughness:.95}));grass.rotation.x=-Math.PI/2;grass.position.y=.005;scene.add(grass);
  W.cyl=V3.tube({r:.1,h:.85,level:0,color:"#7fc3f0"});W.cyl.g.position.set(0,.05,0);scene.add(W.cyl.g);
  for(let i=1;i<=10;i++){const m=new T.Mesh(new T.BoxGeometry(i%5?.04:.07,.004,.004),M.std("#1a3a60"));m.position.set(-.06,.05+i*.08,.1);scene.add(m)}
  W.fun=new T.Mesh(new T.CylinderGeometry(.2,.03,.22,48,1,true),M.std("#c9ccd3",{metalness:.6,roughness:.3,side:T.DoubleSide}));W.fun.position.y=1.03;scene.add(W.fun);
  W.rain=new T.InstancedMesh(new T.CylinderGeometry(.003,.003,.08,4),M.std("#bfe2ff",{transparent:true,opacity:.7}),300);scene.add(W.rain);W.R=[...Array(300)].map(()=>[(Math.random()-.5)*2.6,Math.random()*2.5,(Math.random()-.5)*2.6]);W.dm=new T.Object3D();
  W.l=lbl(scene,"0 mm",.45,.7,0,34,.8);W.lk="";return W},
 update(c,W,s,t,dt,S){const mm=S.I*s.h;W.cyl.set(Math.min(1,mm*(S.d/20)**2/100*.95)+.0001);const k=S.d/20;W.fun.scale.set(k,1,k);
  const n=Math.round(S.I/20*300);W.R.forEach((p,i)=>{p[1]-=dt*4;if(p[1]<0)p[1]=2.5;W.dm.position.set(p[0],i<n&&S.h>0?p[1]:-5,p[2]);W.dm.updateMatrix();W.rain.setMatrixAt(i,W.dm.matrix)});W.rain.instanceMatrix.needsUpdate=true;
  const tx=mm.toFixed(1)+" mm";if(tx!==W.lk){W.lk=tx;W.l=relabel(c.scene,W.l,tx,34,.8)}},
 challenges:[{t:"اجمعي 30 mm من المطر",test:s=>s.I*s.h>=30},{t:"غيّري قطر القمع وقارني القراءة",test:(s,h)=>h.d.size>=2},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أقيس كمّية الأمطار الهاطلة باستخدام مقياس المطر، وأفسّر قياسها بالمليمتر.",mats:"مقياس مطر (قمع وأسطوانة مدرّجة) أو قارورة بلاستيكية مقصوصة، مسطرة.",
  steps:["اضبطي شدّة الهطول ومدّته.","اقرئي ارتفاع الماء في المقياس بالمليمتر.","غيّري قطر فوهة القمع ولاحظي أنّ كمّية المطر بالمليمتر لا تتغيّر بينما يتغيّر الحجم."],
  questions:[{q:"لماذا تُقاس الأمطار بالمليمتر لا باللتر؟",a:"لأنّ الارتفاع لا يعتمد على مساحة فوهة المقياس، فيمكن مقارنة قراءات مقاييس مختلفة."},{q:"أين يوضع مقياس المطر؟",a:"في مكان مكشوف بعيد عن الأشجار والمباني، وفوهته أفقية على ارتفاع مناسب عن الأرض."},{q:"هطل مطر بشدّة 5 mm/ساعة مدّة 4 ساعات، فكم كمّية المطر؟",a:"20 mm."}],
  concl:"تُقاس كمّية الأمطار بارتفاع الماء المتجمّع في مقياس المطر بالمليمتر، وهي قيمة لا تعتمد على حجم المقياس."}});

/* ======================= 13) تأثير درجة الحرارة في نموّ عفن الخبز ======================= */
const moldR=(T2,m)=>Math.max(0,Math.exp(-((T2-27)**2)/180))*(m?1:.25);
VLab.reg({id:"b9-mold3d",three:1,icon:"🍞",grade:"الصف التاسع",subject:"العلوم الحياتية",unit:"الوحدة 1: الكائنات الحيّة الدقيقة",src:"كتاب الأنشطة ص4",
 title:"تأثير درجة الحرارة في نموّ عفن الخبز",question:"في أيّ الظروف ينمو عفن الخبز أسرع؟",view:{th:0,ph:.85,r:2.8,min:1.5,max:5},target:[0,.2,0],
 vars:[{k:"m",label:"الرطوبة",type:"seg",val:1,c:"#2b7bd6",opts:[[1,"💧 خبز مرطّب"],[0,"خبز جافّ"]]},{k:"d",label:"عدد الأيام",unit:"يوم",min:0,max:7,step:.5,val:0,c:"#2f8f5b",ticks:[0,2,4,7]}],
 read(s){const P=[["الثلّاجة 5 °C",5],["الغرفة 25 °C",25],["الحاضنة 35 °C",35]];return P.map(([n,T2])=>({label:n,val:Math.min(100,Math.round(moldR(T2,s.m)*s.d*16*(s.d>1?1:s.d)))+"% مغطّى بالعفن"})).concat([{label:"أفضل ظروف للنموّ",val:"دفء معتدل + رطوبة"}])},
 build(c,S){const{scene}=c;const W={d:[]};
  [["الثلّاجة 5°C",5,"#bfe0ff"],["الغرفة 25°C",25,"#f0e6d0"],["الحاضنة 35°C",35,"#ffd0b0"]].forEach(([n,T2,col],i)=>{const x=(i-1)*.85;
   const mat=new T.Mesh(new T.BoxGeometry(.75,.02,.7),M.std(col,{roughness:.8}));mat.position.set(x,.01,0);scene.add(mat);
   const dish=new T.Mesh(new T.CylinderGeometry(.33,.33,.06,48,1,true),M.glass());dish.position.set(x,.05,0);scene.add(dish);const db=new T.Mesh(new T.CylinderGeometry(.33,.33,.01,48),M.glass({thickness:.1}));db.position.set(x,.025,0);scene.add(db);
   const tex=V3.canvasTex(512,512,()=>{});const br=new T.Mesh(new T.BoxGeometry(.42,.06,.4,1,1,1),[M.std("#a8693a"),M.std("#a8693a"),M.std("#fff",{map:tex,roughness:.9,bumpMap:tex,bumpScale:.02}),M.std("#a8693a"),M.std("#a8693a"),M.std("#a8693a")]);br.position.set(x,.065,0);scene.add(br);
   lbl(scene,n,x,.32,.45,28,.7);W.d.push({tex,T2,seed:i*97+13})});W.key="";return W},
 update(c,W,s,t,dt,S){const key=S.m+"|"+S.d;if(key===W.key)return;W.key=key;W.d.forEach(D=>{const x=D.tex._x;let seed=D.seed;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};
   x.fillStyle="#e9d3a6";x.fillRect(0,0,512,512);for(let i=0;i<1600;i++){x.fillStyle=`rgba(${150+rnd()*60},${110+rnd()*40},${60+rnd()*30},.35)`;x.beginPath();x.arc(rnd()*512,rnd()*512,1+rnd()*3,0,7);x.fill()}
   const g=Math.min(1.2,moldR(D.T2,S.m)*S.d*.16*(S.d>1?1:S.d));const nc=6;for(let k=0;k<nc;k++){const cx=60+rnd()*392,cy=60+rnd()*392,R=g*(90+rnd()*80)*(k<2||g>.3?1:0);if(R<2)continue;
    const gr=x.createRadialGradient(cx,cy,0,cx,cy,R);gr.addColorStop(0,"rgba(25,30,25,.95)");gr.addColorStop(.35,"rgba(60,110,70,.9)");gr.addColorStop(.75,"rgba(170,200,170,.75)");gr.addColorStop(1,"rgba(240,245,235,0)");x.fillStyle=gr;x.beginPath();x.arc(cx,cy,R,0,7);x.fill();
    for(let j=0;j<R*2;j++){const a=rnd()*6.28,r=rnd()*R;x.fillStyle="rgba(10,10,10,.8)";x.beginPath();x.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,1.2,0,7);x.fill()}}D.tex.needsUpdate=true})},
 challenges:[{t:"راقبي العفن 7 أيام",test:s=>s.d>=7},{t:"قارني الخبز الرطب بالجافّ",test:(s,h)=>h.m.size>=2&&s.d>=4},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أتعرّف أثر درجة الحرارة والرطوبة في نموّ عفن الخبز.",mats:"3 قطع خبز، أطباق بتري أو أكياس بلاستيكية، ماء، ثلّاجة، حاضنة، عدسة مكبّرة، قفّازات وكمّامة.",
  steps:["رطّبي قطع الخبز وضعيها في الثلّاجة والغرفة والحاضنة.","حرّكي عدد الأيام وراقبي نسبة تغطية العفن.","كرّري بخبز جافّ وقارني.","لا تفتحي الأكياس ولا تستنشقي الأبواغ."],
  questions:[{q:"أين نما العفن أسرع؟ ولماذا؟",a:"في درجة حرارة الغرفة الدافئة مع الرطوبة؛ لأنّها تناسب نشاط الفطر ونموّه."},{q:"لماذا نحفظ الخبز في الثلّاجة؟",a:"لأنّ البرودة تبطئ نموّ العفن فتطول مدّة صلاحيته."},{q:"ما المتغيّر المستقلّ والتابع في التجربة؟",a:"المستقلّ: درجة الحرارة، والتابع: نسبة نموّ العفن."}],
  concl:"ينمو عفن الخبز أسرع في الدفء المعتدل والرطوبة، ويبطؤ نموّه في البرودة والجفاف."}});

/* ======================= 14) المطر الحمضي ونموّ نبات الرشاد ======================= */
const arG=pH=>pH>=6.5?1:pH>=5?.75:pH>=4?.45:.18;
VLab.reg({id:"b9-acidrain3d",three:1,icon:"🌧️",grade:"الصف التاسع",subject:"العلوم الحياتية",unit:"الوحدة 1",src:"كتاب الأنشطة ص10",
 title:"تأثير المطر الحمضي في نموّ نبات الرشاد",question:"كيف يؤثّر سقي النبات بماء حمضي في إنباته ونموّه؟",view:{th:0,ph:1.15,r:2.6,min:1.4,max:5},target:[0,.2,0],
 vars:[{k:"p",label:"الرقم الهيدروجيني لماء الأصيص الثالث",unit:"",min:2,max:7,step:.5,val:3,c:"#e04848",ticks:[2,3,4,5,6,7]},{k:"d",label:"عدد الأيام",unit:"يوم",min:0,max:10,step:1,val:0,c:"#2f8f5b",ticks:[0,5,10]}],
 read(s){const P=[7,5,s.p];return P.map((p,i)=>{const g=arG(p),gr=Math.max(0,s.d-1)/9;return{label:"أصيص "+(i+1)+" (pH "+p+")",val:s.d<2?"لم تنبت بعد":"إنبات "+Math.round(g*100)+"% · طول "+(gr*g*6).toFixed(1)+" cm"}}).concat([{label:"الاستنتاج",val:"كلّما زادت الحموضة قلّ الإنبات والنموّ واصفرّت الأوراق"}])},
 build(c,S){const{scene}=c;const W={pots:[]};[-.6,0,.6].forEach((x,i)=>{const tray=new T.Mesh(new T.BoxGeometry(.5,.08,.5),M.std("#f4f4f4",{roughness:.4}));tray.position.set(x,.04,0);scene.add(tray);
   const cot=new T.Mesh(new T.BoxGeometry(.46,.02,.46),M.std("#fbfbf5",{roughness:1}));cot.position.set(x,.085,0);scene.add(cot);const sd=[];for(let k=0;k<36;k++)sd.push([x+((k%6)-2.5)*.07+(Math.random()-.5)*.02,((k/6|0)-2.5)*.07+(Math.random()-.5)*.02,Math.random()]);
   const g=new T.Group();scene.add(g);const l=lbl(scene,"",x,.55,.2,28,.7);W.pots.push({x,sd,g,l})});W.key="";return W},
 update(c,W,s,t,dt,S){const key=S.p+"|"+S.d;if(W.key===key)return;W.key=key;const P=[7,5,S.p];W.pots.forEach((E,i)=>{E.g.clear();const g=arG(P[i]),gr=Math.max(0,S.d-1)/9;E.l=relabel(c.scene,E.l,"pH "+P[i],28,.7);
   const ph=P[i];const col=ph>=6?"#5aa83a":ph>=4.5?"#8ab040":"#c8c060";E.sd.forEach(([x,z,r])=>{const seed=new T.Mesh(new T.SphereGeometry(.008,8,6),M.std("#8a4a2a"));seed.position.set(x,.1,z);E.g.add(seed);if(r>g||S.d<2)return;
    const h=(.04+gr*.22)*g*(.8+r*.3);const st=new T.Mesh(new T.CylinderGeometry(.0035,.004,h,6),M.std(ph>=5?"#a8d890":"#d8d8a0"));st.position.set(x,.1+h/2,z);E.g.add(st);
    [1,-1].forEach(sg=>{const lf=new T.Mesh(new T.SphereGeometry(.016*(.5+gr),10,8),M.std(col,{roughness:.5}));lf.scale.set(1,.25,.6);lf.position.set(x+sg*.014*(.5+gr),.1+h,z);E.g.add(lf)})})})},
 challenges:[{t:"راقبي النموّ 10 أيام",test:s=>s.d>=10},{t:"اسقي الأصيص الثالث بماء شديد الحموضة (pH 2)",test:s=>s.p<=2&&s.d>=6},{t:"قارني 3 قيم للحموضة",test:(s,h)=>h.p.size>=3},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أتحقّق من تأثير المطر الحمضي في إنبات بذور الرشاد ونموّها.",mats:"بذور رشاد، قطن، 3 أطباق، ماء مقطّر، خلّ (لتحضير ماء حمضي)، ورق الكاشف العامّ، مسطرة.",
  steps:["اسقي الأصيص الأوّل بماء متعادل (pH 7) والثاني (pH 5)، واختاري حموضة الثالث.","حرّكي عدد الأيام وراقبي الإنبات والطول ولون الأوراق.","سجّلي النتائج في جدول، وارسمي رسمًا بيانيًّا."],
  questions:[{q:"ما أثر زيادة الحموضة في إنبات البذور؟",a:"يقلّ عدد البذور النابتة ويقلّ طول البادرات وتصفرّ أوراقها."},{q:"ما مصادر المطر الحمضي؟",a:"غازات أكاسيد الكبريت والنيتروجين الناتجة من احتراق الوقود في المصانع والسيّارات، تذوب في مياه الأمطار."},{q:"ما الأصيص الضابط في التجربة؟",a:"الأصيص المسقي بماء متعادل pH 7."}],
  concl:"يؤثّر المطر الحمضي سلبًا في إنبات النباتات ونموّها، ويزداد الضرر بزيادة الحموضة."}});

/* ======================= 15) صنع عجينة الخبز (التخمّر) ======================= */
const dR=(T2,su)=>Math.max(0,Math.exp(-((T2-35)**2)/200)*(T2>55?.05:1))*(su?1:.45);
VLab.reg({id:"b10-dough3d",three:1,icon:"🥖",grade:"الصف العاشر",subject:"العلوم الحياتية",unit:"الوحدة 3: الفطريات",src:"كتاب الأنشطة ص30",
 title:"صنع عجينة الخبز وتخمّرها",question:"لماذا تنتفخ العجينة عند إضافة الخميرة؟ وما الظروف المناسبة لذلك؟",view:{th:.2,ph:1.1,r:2.6,min:1.4,max:5},target:[0,.3,0],
 vars:[{k:"T",label:"درجة حرارة المكان",unit:"°C",min:5,max:65,step:5,val:30,c:"#e04848",ticks:[5,35,65]},{k:"su",label:"السكّر",type:"seg",val:1,c:"#B8902A",opts:[[1,"مع سكّر"],[0,"بدون سكّر"]]},{k:"tm",label:"الزمن",unit:"دقيقة",min:0,max:60,step:5,val:0,c:"#2b7bd6",ticks:[0,30,60]}],
 read(s){const r=dR(s.T,s.su),v=1+Math.min(1.2,r*s.tm/40);return[{label:"حجم العجينة",val:"×"+v.toFixed(2)},{label:"الغاز المسؤول عن الانتفاخ",val:"ثاني أكسيد الكربون CO₂"},{label:"التفسير",val:s.T>55?"الحرارة العالية قتلت الخميرة":s.T<15?"البرودة أبطأت نشاط الخميرة":"الخميرة تحلّل السكّر وتطلق CO₂"}]},
 build(c,S){const{scene}=c;const W={};const bowl=new T.Mesh(new T.SphereGeometry(.42,48,24,0,6.29,Math.PI/2,Math.PI/2),new T.MeshPhysicalMaterial({color:"#ffffff",transmission:.85,roughness:.05,thickness:.05,transparent:true,side:T.DoubleSide,depthWrite:false}));bowl.position.y=.43;scene.add(bowl);
  const tex=V3.canvasTex(256,256,(x,w,h)=>{x.fillStyle="#efd9a8";x.fillRect(0,0,w,h);for(let i=0;i<500;i++){x.fillStyle=`rgba(255,255,255,${Math.random()*.25})`;x.beginPath();x.arc(Math.random()*w,Math.random()*h,1+Math.random()*4,0,7);x.fill()}});
  W.dough=new T.Mesh(new T.SphereGeometry(.24,48,32),M.std("#fff",{map:tex,roughness:.85,bumpMap:tex,bumpScale:.01}));scene.add(W.dough);
  W.th=lbl(scene,"30 °C",.65,.75,0,34,.8);W.lk="";return W},
 update(c,W,s,t,dt,S){const r=dR(s.T,S.su),v=1+Math.min(1.2,r*s.tm/40);const k=Math.cbrt(v);W.dough.scale.set(k*1.15,k*.75,k*1.15);W.dough.position.y=.07+.24*.75*k*.85;
  if(W.lk!==S.T){W.lk=S.T;W.th=relabel(c.scene,W.th,S.T+" °C",34,.8)}},
 challenges:[{t:"اجعلي العجينة تتضاعف",test:s=>1+Math.min(1.2,dR(s.T,s.su)*s.tm/40)>=2},{t:"جرّبي حرارة الثلّاجة",test:s=>s.T<=10&&s.tm>=30},{t:"قارني مع السكّر وبدونه",test:(s,h)=>h.su.size>=2},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أستقصي دور الخميرة في تخمّر عجينة الخبز وأثر الحرارة والسكّر.",mats:"طحين، خميرة، سكّر، ماء دافئ، أوعية، ميزان حرارة.",steps:["اختاري درجة الحرارة وأضيفي السكّر أو لا.","حرّكي الزمن وراقبي حجم العجينة.","قارني النتائج في درجات حرارة مختلفة."],
  questions:[{q:"لماذا انتفخت العجينة؟",a:"لأنّ الخميرة (فطر) تحلّل السكّر في عملية التخمّر وتطلق غاز CO₂ الذي يُحبس في العجينة."},{q:"لماذا لم تنتفخ العجينة عند 65 °C؟",a:"لأنّ الحرارة العالية تقتل خلايا الخميرة وتتلف إنزيماتها."},{q:"ما فائدة السكّر؟",a:"غذاء سريع للخميرة يزيد معدّل التخمّر."}],
  concl:"تنتفخ العجينة بفعل غاز CO₂ الناتج من تخمّر الخميرة للسكّر، وأنسب حرارة لذلك هي الدفء المعتدل (نحو 35 °C)."}});


/* ======================= 16) نمذجة مبدأ عمل الثقب الأسود ======================= */
VLab.reg({id:"e10-blackhole3d",three:1,icon:"🕳️",grade:"الصف العاشر",subject:"علوم الأرض",unit:"الوحدة 2: النجوم",src:"كتاب الأنشطة ص28",
 title:"نمذجة مبدأ عمل الثقب الأسود",question:"كيف تؤثّر كتلة الجسم في انحناء الفضاء من حوله؟ ولماذا لا يفلت شيء من الثقب الأسود؟",view:{th:0,ph:.95,r:3.6,min:2,max:6},target:[0,.3,0],
 vars:[{k:"m",label:"كتلة الجسم المركزي",unit:"كتلة شمسية",min:1,max:20,step:1,val:4,c:"#7A1F2E",ticks:[1,5,10,20]},{k:"v",label:"سرعة الكرة الصغيرة",unit:"",min:.4,max:2,step:.1,val:1,c:"#2b7bd6",ticks:[.4,1,1.5,2]},{k:"t",label:"الزمن",unit:"s",min:0,max:12,step:.1,val:0,c:"#B8902A",ticks:[0,4,8,12]}],
 read(s){const rs=.04*s.m,res=sim(s.m,s.v,s.t);return[{label:"نصف قطر أفق الحدث (نموذج)",val:(rs*100).toFixed(0)+" cm"},{label:"مصير الكرة",val:res.cap?"ابتلعها الثقب ⬤":res.esc?"أفلتت بعيدًا":"تدور حول الجسم"},{label:"الانحناء عند المركز",val:s.m>=15?"شديد جدًّا (ثقب أسود)":s.m>=8?"كبير (نجم نيوتروني)":"معتدل (نجم)"}]},
 build(c,S){const{scene}=c;const W={};const g=new T.PlaneGeometry(3.2,3.2,64,64);g.rotateX(-Math.PI/2);W.base=g.attributes.position.array.slice();
  W.sheet=new T.Mesh(g,M.std("#1b2a4a",{roughness:.6,metalness:.2,side:T.DoubleSide}));W.sheet.position.y=.55;scene.add(W.sheet);W.wire=new T.Mesh(g,new T.MeshBasicMaterial({color:"#6fd0ff",wireframe:true,transparent:true,opacity:.35}));W.wire.position.y=.551;scene.add(W.wire);
  W.core=new T.Mesh(new T.SphereGeometry(.1,32,24),M.std("#000",{roughness:.2}));scene.add(W.core);W.disk=new T.Mesh(new T.RingGeometry(.12,.35,64),M.glow("#ff9a3a",.6));W.disk.rotation.x=-Math.PI/2;scene.add(W.disk);
  W.ball=new T.Mesh(new T.SphereGeometry(.05,24,16),M.metal("#e8c46a"));scene.add(W.ball);W.trail=new T.Line(new T.BufferGeometry(),new T.LineBasicMaterial({color:"#ffd34d"}));scene.add(W.trail);W.key="";return W},
 update(c,W,s,t,dt,S){const depth=r=>-.06*S.m/Math.sqrt(r*r+.02);const key=S.m;if(W.key!==key){W.key=key;const p=W.sheet.geometry.attributes.position;for(let i=0;i<p.count;i++){const x=W.base[i*3],z=W.base[i*3+2];p.setY(i,Math.max(-1.2,depth(Math.hypot(x,z))+.06*S.m/1.6*.0))}p.needsUpdate=true;W.sheet.geometry.computeVertexNormals()}
  const yc=.55+Math.max(-1.2,depth(0));W.core.position.y=yc;W.core.scale.setScalar(.6+S.m*.03);W.disk.position.y=yc+.02;W.disk.visible=S.m>=10;W.disk.rotation.z+=dt*2;
  const R=sim(S.m,S.v,S.t);W.ball.position.set(R.x,.55+Math.max(-1.2,depth(Math.hypot(R.x,R.z)))+.05,R.z);W.ball.visible=!R.cap;
  W.trail.geometry.setFromPoints(R.path.map(([x,z])=>new T.Vector3(x,.56+Math.max(-1.2,depth(Math.hypot(x,z)))+.02,z)))},
 challenges:[{t:"اجعلي الكرة تدور حول الجسم",test:s=>{const r=sim(s.m,s.v,12);return!r.cap&&!r.esc}},{t:"اجعلي الثقب يبتلع الكرة",test:s=>sim(s.m,s.v,12).cap},{t:"اجعلي الكرة تفلت",test:s=>sim(s.m,s.v,12).esc},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أنمذج مبدأ عمل الثقب الأسود بنموذج انحناء الفضاء.",mats:"قطعة قماش مرنة (ليكرا) مشدودة على إطار، كرات بكتل مختلفة، كرة زجاجية صغيرة.",
  steps:["ضعي كرة ثقيلة في مركز القماش ولاحظي الانحناء.","دحرجي الكرة الصغيرة بسرعات مختلفة وراقبي مسارها.","زيدي كتلة الجسم المركزي حتى يصبح ثقبًا أسود، وكرّري."],
  questions:[{q:"ماذا يمثّل انحناء القماش؟",a:"انحناء الزمكان (الفضاء) حول الأجسام الضخمة بسبب جاذبيتها."},{q:"لماذا ابتُلعت الكرة عندما كانت سرعتها صغيرة؟",a:"لأنّ سرعتها أقلّ من السرعة اللازمة للإفلات من جاذبية الجسم فاقتربت حتى تجاوزت أفق الحدث."},{q:"لماذا لا يفلت الضوء من الثقب الأسود؟",a:"لأنّ سرعة الإفلات داخل أفق الحدث أكبر من سرعة الضوء."}],
  concl:"تُحني الأجسام الضخمة الفضاء من حولها، والثقب الأسود جسم كثيف جدًّا انحناؤه شديد لدرجة أنّ لا شيء حتى الضوء يفلت من داخل أفق الحدث."}});
function sim(m,v,tm){let x=1.4,z=0,vx=0,vz=-v*.55;const GM=.05*m,rs=.04*m+.06;const path=[[x,z]];let cap=false,esc=false;const dt=.01;for(let t=0;t<tm;t+=dt){const r=Math.hypot(x,z);if(r<rs){cap=true;break}if(r>1.75){esc=true;break}const a=GM/(r*r);vx-=a*x/r*dt;vz-=a*z/r*dt;x+=vx*dt;z+=vz*dt;if(((t/dt)|0)%3===0)path.push([x,z])}
 if(!cap&&!esc&&tm>=12-1e-6){}return{x,z,cap,esc,path:path.slice(-400)}}

/* ======================= 17) كوكبات البروج ======================= */
const ZOD=["الحمل","الثور","الجوزاء","السرطان","الأسد","العذراء","الميزان","العقرب","القوس","الجدي","الدلو","الحوت"];
const MON=["كانون الثاني","شباط","آذار","نيسان","أيّار","حزيران","تمّوز","آب","أيلول","تشرين الأوّل","تشرين الثاني","كانون الأوّل"];
VLab.reg({id:"e10-zodiac3d",three:1,icon:"♈",grade:"الصف العاشر",subject:"علوم الأرض",unit:"الوحدة 2: النجوم",src:"كتاب الأنشطة ص24",
 title:"كوكبات البروج وحركة الأرض حول الشمس",question:"لماذا تبدو الشمس في كوكبة بروج مختلفة كلّ شهر؟ ولماذا تتغيّر الكوكبات التي نراها ليلًا؟",view:{th:0,ph:.8,r:8.2,min:3,max:12},target:[0,.4,0],
 vars:[{k:"mo",label:"الشهر",unit:"",min:1,max:12,step:1,val:4,c:"#B8902A",ticks:[1,3,6,9,12]}],
 read(s){const m=Math.round(s.mo),i=(m+8)%12;return[{label:"الشهر",val:MON[m-1]},{label:"تظهر الشمس أمام كوكبة",val:ZOD[i]+" (لا تُرى نهارًا)"},{label:"الكوكبة الظاهرة منتصف الليل",val:ZOD[(i+6)%12]},{label:"التفسير",val:"دوران الأرض حول الشمس يغيّر اتّجاه رؤيتنا للنجوم البعيدة"}]},
 build(c,S){const{scene}=c;const W={};scene.children.forEach(o=>{if(!o.isLight)o.visible=false});const sky=new T.Mesh(new T.SphereGeometry(30,32,16),new T.MeshBasicMaterial({color:"#05060f",side:T.BackSide}));scene.add(sky);
  const st=new T.BufferGeometry();const P=[];for(let i=0;i<600;i++){const a=Math.random()*6.28,b=Math.acos(2*Math.random()-1);P.push(25*Math.sin(b)*Math.cos(a),25*Math.cos(b),25*Math.sin(b)*Math.sin(a))}st.setAttribute("position",new T.Float32BufferAttribute(P,3));scene.add(new T.Points(st,new T.PointsMaterial({color:"#fff",size:.09})));
  W.sun=new T.Mesh(new T.SphereGeometry(.3,32,24),M.glow("#ffcf4d",1));W.sun.position.y=.4;scene.add(W.sun);const sl=new T.PointLight("#fff2d0",3,10);sl.position.copy(W.sun.position);scene.add(sl);
  const orb=new T.Mesh(new T.RingGeometry(1.48,1.5,128),new T.MeshBasicMaterial({color:"#7fb3ff",transparent:true,opacity:.5,side:T.DoubleSide}));orb.rotation.x=-Math.PI/2;orb.position.y=.4;scene.add(orb);
  const et=V3.canvasTex(256,128,(x,w,h)=>{x.fillStyle="#1f5fb0";x.fillRect(0,0,w,h);x.fillStyle="#3e9a48";for(let i=0;i<14;i++){x.beginPath();x.ellipse(Math.random()*w,Math.random()*h,10+Math.random()*25,6+Math.random()*14,Math.random(),0,7);x.fill()}});
  W.earth=new T.Mesh(new T.SphereGeometry(.12,32,24),M.std("#fff",{map:et,roughness:.6}));scene.add(W.earth);
  W.cons=ZOD.map((n,i)=>{const a=i/12*6.28,R=3.4;const g=new T.Group();g.position.set(Math.cos(a)*R,.4,-Math.sin(a)*R);scene.add(g);let seed=i*31+7;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};const pts=[];
   for(let k=0;k<5;k++){const p=new T.Vector3((rnd()-.5)*.6,(rnd()-.5)*.5,0);pts.push(p);const s=new T.Mesh(new T.SphereGeometry(.025,8,6),M.glow("#fff",1));s.position.copy(p);g.add(s)}g.add(new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:"#8ab4ff",transparent:true,opacity:.6})));
   g.lookAt(0,.4,0);const l=V3.label(n,{size:40});l.scale.multiplyScalar(1.7);l.position.set(Math.cos(a)*R,1.15,-Math.sin(a)*R);scene.add(l);return{g,l}});
  W.ray=new T.Line(new T.BufferGeometry(),new T.LineDashedMaterial({color:"#ffd34d",dashSize:.1,gapSize:.06}));scene.add(W.ray);W.ray2=new T.Line(new T.BufferGeometry(),new T.LineBasicMaterial({color:"#8affc1"}));scene.add(W.ray2);return W},
 update(c,W,s,t,dt,S){const m=s.mo;const i=((m+8)%12+12)%12;const a=(i+6)/12*6.28;const E=new T.Vector3(Math.cos(a)*1.5,.4,-Math.sin(a)*1.5);W.earth.position.copy(E);W.earth.rotation.y+=dt*2;
  const ai=i/12*6.28,Z=new T.Vector3(Math.cos(ai)*3.4,.4,-Math.sin(ai)*3.4);W.ray.geometry.setFromPoints([E,Z]);W.ray.computeLineDistances();const ao=(i+6)/12*6.28;W.ray2.geometry.setFromPoints([E,new T.Vector3(Math.cos(ao)*3.4,.4,-Math.sin(ao)*3.4)]);
  const si=Math.round((S.mo+8)%12);W.cons.forEach((C2,k)=>{const on=k===si,nt=k===(si+6)%12;C2.g.scale.setScalar(on||nt?1.3:1);C2.l.material.opacity=on||nt?1:.45})},
 challenges:[{t:"جدي الشهر الذي تكون فيه الشمس في برج الأسد",test:s=>Math.round(s.mo)===8},{t:"تتبّعي الأرض 6 أشهر",test:(s,h)=>h.mo.size>=6},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أنمذج سبب ظهور الشمس أمام كوكبات البروج المختلفة خلال السنة.",mats:"مصباح (الشمس)، كرة (الأرض)، 12 بطاقة لكوكبات البروج توزّع في دائرة حول المصباح.",
  steps:["حرّكي الشهر لتدور الأرض حول الشمس.","تتبّعي الخطّ الأصفر من الأرض عبر الشمس إلى الكوكبة التي تقع خلفها.","تتبّعي الخطّ الأخضر إلى الكوكبة التي تظهر في سماء الليل."],
  questions:[{q:"لماذا لا نرى الكوكبة التي تقع الشمس أمامها؟",a:"لأنّها تكون في سماء النهار ويطغى عليها ضوء الشمس."},{q:"كم شهرًا تحتاج الشمس للعودة إلى الكوكبة نفسها؟",a:"12 شهرًا (سنة كاملة)، وهي مدّة دوران الأرض حول الشمس."},{q:"ما المقصود بدائرة البروج؟",a:"المسار الظاهري للشمس بين النجوم خلال السنة، وتقع على امتداده 12 كوكبة."}],
  concl:"يؤدّي دوران الأرض حول الشمس إلى ظهور الشمس أمام كوكبة بروج مختلفة كلّ شهر، وإلى تغيّر الكوكبات التي نراها ليلًا بتغيّر الفصول."}});

/* ======================= 18) نمذجة الأحافير ======================= */
const ORG={sh:["صدفة (محارة)"],lf:["ورقة نبات"],fe:["ريشة طائر"]};
function orgTex(o,x){x.fillStyle="#808080";x.fillRect(0,0,512,512);x.save();x.translate(256,256);
 if(o==="sh"){x.fillStyle="#e6e6e6";x.beginPath();x.moveTo(0,150);x.arc(0,150,210,-Math.PI+.45,-.45);x.closePath();x.fill();x.fillStyle="#d0d0d0";x.fillRect(-50,140,100,40);for(let i=-7;i<=7;i++){const a=-Math.PI/2+i*.15;x.strokeStyle="#a8a8a8";x.lineWidth=7;x.beginPath();x.moveTo(0,150);x.lineTo(Math.cos(a)*205,150+Math.sin(a)*205);x.stroke()}} else if(o==="lf"){x.fillStyle="#d8d8d8";x.beginPath();x.ellipse(0,0,90,200,0,0,7);x.fill();x.strokeStyle="#fff";x.lineWidth=9;x.beginPath();x.moveTo(0,230);x.lineTo(0,-200);x.stroke();x.lineWidth=5;for(let i=-4;i<=4;i++){x.beginPath();x.moveTo(0,i*40);x.lineTo(75,i*40-45);x.moveTo(0,i*40);x.lineTo(-75,i*40-45);x.stroke()}}
 else{x.strokeStyle="#fff";x.lineWidth=8;x.beginPath();x.moveTo(0,230);x.lineTo(0,-220);x.stroke();x.lineWidth=3;for(let i=-60;i<200;i+=6){const w=60*Math.sin((i+60)/280*Math.PI);x.beginPath();x.moveTo(0,-i);x.lineTo(w,-i-30);x.moveTo(0,-i);x.lineTo(-w,-i-30);x.stroke()}}x.restore()}
VLab.reg({id:"b10-fossil3d",three:1,icon:"🐚",grade:"الصف العاشر",subject:"العلوم الحياتية",unit:"الوحدة 1: التطوّر",src:"كتاب الأنشطة ص7",
 title:"نمذجة تكوّن الأحافير",question:"كيف تتكوّن أحافير القالب والطابع (المصبوبة)؟",view:{th:.2,ph:.95,r:2.4,min:1.3,max:4.5},target:[0,.25,0],
 vars:[{k:"o",label:"الكائن الحيّ",type:"seg",val:"sh",c:"#7A1F2E",opts:Object.keys(ORG).map(k=>[k,ORG[k][0]])},{k:"st",label:"الخطوة",unit:"",min:0,max:3,step:1,val:0,c:"#B8902A",ticks:[0,1,2,3]}],
 read(s){const L=["ضغط الكائن في الصلصال (يمثّل الرسوبيات الطرية)","إزالة الكائن: تكوّن القالب (أثر مجوّف)","صبّ الجبس في القالب وتركه يتصلّب","فصل الجبس: تكوّن الطابع (المصبوبة) بشكل الكائن"];return[{label:"الخطوة",val:(s.st+1)+") "+L[s.st]},{label:"نوع الأحفورة",val:s.st<1?"—":s.st<3?"أحفورة قالب":"أحفورة طابع (مصبوبة)"}]},
 build(c,S){const{scene}=c;const W={};W.tex=V3.canvasTex(512,512,()=>{});
  W.cm=V3.canvasTex(512,512,()=>{});W.pm=V3.canvasTex(512,512,()=>{});W.clay=new T.Mesh(new T.BoxGeometry(1,.16,1),[M.std("#b5835a"),M.std("#b5835a"),M.std("#fff",{map:W.cm,roughness:.9,bumpMap:W.tex,bumpScale:-.2}),M.std("#b5835a"),M.std("#b5835a"),M.std("#b5835a")]);W.clay.position.y=.08;scene.add(W.clay);
  W.cast=new T.Mesh(new T.BoxGeometry(.9,.1,.9),[M.std("#f2f0ea"),M.std("#f2f0ea"),M.std("#fff",{map:W.pm,roughness:.85,bumpMap:W.tex,bumpScale:.2}),M.std("#f2f0ea"),M.std("#f2f0ea"),M.std("#f2f0ea")]);scene.add(W.cast);
  W.plaster=new T.Mesh(new T.BoxGeometry(.98,.08,.98),M.std("#f4f2ec",{roughness:.6}));W.plaster.position.y=.2;scene.add(W.plaster);
  W.org=new T.Mesh(new T.PlaneGeometry(.6,.6),new T.MeshStandardMaterial({color:"#e8dcc0",alphaTest:.5,transparent:true,side:T.DoubleSide}));W.org.rotation.x=-Math.PI/2;scene.add(W.org);W.otex=V3.canvasTex(512,512,()=>{});W.org.material.map=W.otex;W.key="";return W},
 update(c,W,s,t,dt,S){if(W.key!==S.o){W.key=S.o;orgTex(S.o,W.tex._x);W.tex.needsUpdate=true;const src=W.tex._x.getImageData(0,0,512,512);[[W.cm,[201,154,110],[120,80,52]],[W.pm,[246,244,238],[200,192,176]]].forEach(([tx,b0,b1])=>{const im=tx._x.createImageData(512,512);for(let i=0;i<im.data.length;i+=4){const f=Math.max(0,Math.min(1,(src.data[i]-128)/110));for(let j=0;j<3;j++)im.data[i+j]=b0[j]+(b1[j]-b0[j])*f;im.data[i+3]=255}tx._x.putImageData(im,0,0);tx.needsUpdate=true});const x=W.otex._x;x.clearRect(0,0,512,512);orgTex(S.o,x);const d=x.getImageData(0,0,512,512);for(let i=0;i<d.data.length;i+=4){const v=d.data[i];d.data[i+3]=v>140?255:0;const cc=S.o==="lf"?[90,150,60]:S.o==="fe"?[120,100,80]:[230,210,180];d.data[i]=cc[0]*(v/255);d.data[i+1]=cc[1]*(v/255);d.data[i+2]=cc[2]*(v/255)}x.putImageData(d,0,0);W.otex.needsUpdate=true}
  const st=s.st;W.org.visible=st<.7;W.org.position.y=.17+Math.max(0,.3-st*.6);const im=st>=.5;if(W.im!==im){W.im=im;const m=W.clay.material[2];m.bumpScale=im?-.2:0;m.map=im?W.cm:null;m.color.set(im?"#fff":"#c99a6e");m.needsUpdate=true}
  W.plaster.visible=st>1.5&&st<2.6;W.plaster.position.y=.2+(st>2?0:.4*(2-st));W.cast.visible=st>2.4;W.cast.position.set(st>2.4?.6:0,.05+(st>2.4?.0:.2),st>2.4?.2:0);W.clay.position.x=st>2.4?-.45:0},
 challenges:[{t:"كوّني أحفورة قالب",test:s=>s.st===1},{t:"كوّني أحفورة طابع",test:s=>s.st===3},{t:"نمذجي أحافير لثلاثة كائنات",test:(s,h)=>h.o.size>=3},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أنمذج طريقة تكوّن أحافير القالب والطابع.",mats:"صلصال، صدفة أو ورقة نبات، جبس (بودرة الجبس) وماء، فازلين، كأس بلاستيكي.",steps:["اضغطي الكائن في الصلصال ثمّ أزيليه برفق.","لاحظي الأثر المجوّف (القالب).","صبّي الجبس في القالب واتركيه يتصلّب.","افصلي الجبس ولاحظي الطابع."],
  questions:[{q:"ما الفرق بين أحفورة القالب وأحفورة الطابع؟",a:"القالب أثر مجوّف يتركه الكائن في الرسوبيات، والطابع (المصبوبة) يتكوّن بامتلاء القالب بمعادن تأخذ شكل الكائن."},{q:"ماذا يمثّل الصلصال والجبس في النموذج؟",a:"الصلصال يمثّل الرسوبيات الطرية، والجبس يمثّل المعادن التي تملأ القالب."},{q:"لماذا تُعدّ الأحافير دليلًا على التطوّر؟",a:"لأنّها تسجّل أشكال الكائنات التي عاشت في الماضي وتبيّن تغيّرها عبر الزمن."}],
  concl:"تتكوّن أحفورة القالب عندما يترك الكائن أثره في الرسوبيات، وتتكوّن أحفورة الطابع عندما تملأ المعادن ذلك القالب."}});

/* ======================= 19) نمذجة DNA ======================= */
const SEQ={a:"ATGCGTAC",b:"GGCATTAG",c:"TACCGGAT",d:"CATGATCG"};const BC={A:"#e04848",T:"#f3c21f",C:"#2b7bd6",G:"#2f8f5b"};const CMP={A:"T",T:"A",C:"G",G:"C"};
VLab.reg({id:"s8-dnamodel3d",three:1,icon:"🧬",grade:"الصف الثامن",subject:"العلوم",unit:"الوحدة 1: الوراثة",src:"كتاب الأنشطة ص6",
 title:"نمذجة جزيء DNA",question:"كيف تترتّب القواعد النيتروجينية في جزيء DNA؟ وما قاعدة التزاوج بينها؟",view:{th:.5,ph:1.3,r:3.4,min:1.6,max:6},target:[0,1,0],
 vars:[{k:"q",label:"تسلسل السلسلة الأولى",type:"seg",val:"a",c:"#7A1F2E",opts:Object.keys(SEQ).map(k=>[k,SEQ[k]])},{k:"tw",label:"الالتفاف",type:"seg",val:1,c:"#2b7bd6",opts:[[0,"سلّم مستقيم"],[1,"حلزون مزدوج"]]},{k:"u",label:"فكّ السلسلتين (التضاعف)",unit:"%",min:0,max:100,step:5,val:0,c:"#B8902A",ticks:[0,50,100]}],
 read(s){const q=SEQ[s.q],c2=[...q].map(b=>CMP[b]).join("");const n=b=>[...q+c2].filter(x=>x===b).length;return[{label:"السلسلة الأولى",val:q},{label:"السلسلة المتمّمة",val:c2},{label:"عدد A = T",val:n("A")+" = "+n("T")},{label:"عدد C = G",val:n("C")+" = "+n("G")},{label:"قاعدة التزاوج",val:"A مع T ، C مع G"}]},
 build(c,S){const{scene}=c;const W={g:new T.Group()};W.g.position.y=.2;scene.add(W.g);W.key="";const lg=V3.label("A  T  C  G",{size:30});lg.position.set(0,2.15,0);scene.add(lg);return W},
 update(c,W,s,t,dt,S){const key=S.q+"|"+S.tw+"|"+Math.round(s.u);if(W.key!==key){W.key=key;W.g.clear();const q=SEQ[S.q];const n=q.length*2,dy=.11;const back=M.std("#d8d8e0",{roughness:.4}),sug=M.std("#9b59b6",{roughness:.4});
   for(let i=0;i<n;i++){const b=q[i%q.length],b2=CMP[b];const a=S.tw?i*.6:0,y=i*dy;const open=(i/n)>1-s.u/100?1:0;const sep=open?.35:0;
    const p1=new T.Vector3(Math.cos(a)*(.45+sep),y,Math.sin(a)*(.45+sep)),p2=new T.Vector3(-Math.cos(a)*(.45+sep),y,-Math.sin(a)*(.45+sep));
    [p1,p2].forEach(p=>{const m=new T.Mesh(new T.SphereGeometry(.045,14,10),i%2?back:sug);m.position.copy(p);W.g.add(m)});
    const mk=(from,to,col)=>{const d=to.clone().sub(from);const L=d.length();const m=new T.Mesh(new T.CylinderGeometry(.03,.03,L,10),M.std(col,{roughness:.35}));m.position.copy(from).add(d.multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),to.clone().sub(from).normalize());W.g.add(m)};
    const mid=p1.clone().lerp(p2,.5);const g1=open?p1.clone().lerp(p2,.3):mid,g2=open?p2.clone().lerp(p1,.3):mid;mk(p1,g1,BC[b]);mk(p2,g2,BC[b2]);
    if(i<n-1){const a2=S.tw?(i+1)*.6:0,y2=(i+1)*dy;const op2=((i+1)/n)>1-s.u/100?.35:0;const q1=new T.Vector3(Math.cos(a2)*(.45+op2),y2,Math.sin(a2)*(.45+op2)),q2=new T.Vector3(-Math.cos(a2)*(.45+op2),y2,-Math.sin(a2)*(.45+op2));mk(p1,q1,"#c8c8d0");mk(p2,q2,"#c8c8d0")}}}
  W.g.rotation.y+=dt*.3},
 challenges:[{t:"ابني الحلزون المزدوج",test:s=>s.tw===1},{t:"افتحي السلسلتين بالكامل",test:s=>s.u>=100},{t:"جرّبي 3 تسلسلات",test:(s,h)=>h.q.size>=3},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أعمل نموذجًا لجزيء DNA وأتعرّف قاعدة تزاوج القواعد النيتروجينية.",mats:"خرز بأربعة ألوان (القواعد)، خرز للسكّر والفوسفات، أسلاك مرنة أو منظّفات أنابيب.",
  steps:["اختاري تسلسل السلسلة الأولى.","اكتبي تسلسل السلسلة المتمّمة وتحقّقي منه.","حوّلي السلّم إلى حلزون مزدوج.","افتحي السلسلتين لتمثيل بداية التضاعف."],
  questions:[{q:"ما قاعدة تزاوج القواعد في DNA؟",a:"الأدينين (A) يرتبط مع الثايمين (T)، والسايتوسين (C) يرتبط مع الجوانين (G)."},{q:"ممّ يتكوّن جانبا السلّم؟",a:"من جزيئات سكّر رايبوز منقوص الأكسجين وفوسفات متبادلة."},{q:"إذا كان تسلسل سلسلة ATTGC فما تسلسل المتمّمة؟",a:"TAACG."}],
  concl:"يتكوّن DNA من سلسلتين ملتفّتين على شكل حلزون مزدوج، ترتبطان بقواعد نيتروجينية متزاوجة (A–T و C–G)."}});

})();
