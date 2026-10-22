/* تجارب الفيزياء ثلاثية الأبعاد */
Lab3D.register("surface",{title:"القوّة والحركة: أثر نوع السطح في حركة جسم",subject:"الفيزياء",grade:"التاسع",book:"كتاب الطالب",icon:"🚗",desc:"سيارة تنزل عن مستوى مائل وتسير على أسطح مختلفة: خشب، كرتون، رمل",
 question:"كيف يؤثّر نوع السطح (قوّة الاحتكاك) في المسافة التي تقطعها سيارة قبل أن تتوقّف؟",
 goal:"استقصاء أثر قوّة الاحتكاك في حركة الأجسام، وأثر ارتفاع المستوى المائل في سرعة السيارة.",
 mats:"لوح خشب أملس، لوح كرتون، رمل، سيارة صغيرة، مجموعة كتب، شريط قياس.",safety:"احذري سقوط الكتب والأجسام على القدمين، وتخلّصي من الرمل بطريقة مناسبة.",
 predict:{q:"على أيّ سطح تتوقّعين أن تقطع السيارة أكبر مسافة؟",o:["الرمل","الكرتون","الخشب الأملس","المسافة متساوية"],right:2},
 steps:[{k:"s",t:"اختاري نوع السطح من اللوحة."},{k:"h",t:"اختاري ارتفاع المستوى المائل (عدد الكتب)."},{k:"go",t:"اضغطي على السيارة لتنطلق، وراقبي أين تتوقّف."},{k:"three",t:"جرّبي الأسطح الثلاثة على الارتفاع نفسه."},{k:"hh",t:"غيّري ارتفاع المستوى على سطح واحد ولاحظي الفرق."}],
 cols:[["surf","السطح"],["books","عدد الكتب"],["v","السرعة أسفل المنحدر (m/s)"],["d","المسافة المقطوعة (cm)"]],
 analysis:D=>{const g={};D.forEach(r=>{(g[r.surf]=g[r.surf]||[]).push(+r.d);});const e=document.createElement("div");e.innerHTML="📊 متوسّط المسافة: "+Object.entries(g).map(([k,v])=>"<b>"+k+"</b> "+(v.reduce((a,b)=>a+b,0)/v.length).toFixed(0)+" cm").join(" · ")+"<br>كلما زادت قوّة الاحتكاك قلّت المسافة التي تقطعها السيارة قبل أن تتوقّف.";return e;},
 conclude:[{q:"قطعت السيارة أقصر مسافة على الرمل لأن:",o:["الرمل يقلّل الوزن","قوّة الاحتكاك على الرمل أكبر فتُبطئ السيارة أسرع","الرمل يزيد السرعة","لا علاقة للسطح"],a:1,why:"الاحتكاك قوّة تعاكس الحركة، وكلما زادت توقّف الجسم في مسافة أقصر."},
  {q:"عند زيادة عدد الكتب (ارتفاع المنحدر):",o:["تقلّ سرعة السيارة","تزداد سرعتها أسفل المنحدر فتقطع مسافة أكبر","لا يتغيّر شيء","تتوقّف فورًا"],a:1,why:"يزداد فرق الارتفاع فتزداد طاقة الوضع المتحوّلة إلى طاقة حركية."},
  {q:"لو لم توجد قوّة احتكاك إطلاقًا على سطح أفقي، فإن السيارة:",o:["تتوقّف فورًا","تستمر في الحركة بسرعة ثابتة","تتسارع","ترجع للخلف"],a:1,why:"وفق القانون الأول لنيوتن يستمر الجسم في حركته ما لم تؤثّر فيه قوّة محصّلة."},
  {q:"المتغيّر المستقل في التجربة عند مقارنة الأسطح هو:",o:["المسافة","نوع السطح","السيارة","الزمن"],a:1,why:"نغيّر نوع السطح عمدًا ونقيس أثره في المسافة (المتغيّر التابع)."}],
 scene:{yaw:-.55,pitch:.32,dist:10,ty:.5,tx:0,sky1:"#fff4e0",sky2:"#e0f0ff"},
 setup(L,A){const T=L.T;const SURF={wood:["خشب أملس","#c8a46b",.12],card:["كرتون","#b98d5a",.22],sand:["رمل","#e6c98a",.5]};let surf=null,books=2,busy=false;const triedH={};
  const bookCols=["#7A1F2E","#1d7f8c","#B8902A","#2f8f5b"];const stack=new T.Group();stack.position.set(-5.2,0,0);L.root.add(stack);
  const ramp=new T.Group();L.root.add(ramp);const rampLen=3.2;
  const board=new T.Mesh(new T.BoxGeometry(rampLen,.06,1),L.M.std("#d7b98e"));board.castShadow=true;board.receiveShadow=true;ramp.add(board);
  const track=new T.Mesh(new T.BoxGeometry(8.5,.04,1.1),L.M.std("#c8a46b"));track.position.set(.9,.02,0);track.receiveShadow=true;L.root.add(track);
  const sandBumps=new T.Group();for(let i=0;i<260;i++){const m=new T.Mesh(new T.SphereGeometry(.03+Math.random()*.03,6,4),L.M.std("#d9b874"));m.position.set(-3.2+Math.random()*8.4,.05,(Math.random()-.5)*1);sandBumps.add(m);}sandBumps.visible=false;L.root.add(sandBumps);
  // شريط قياس
  const tape=L.canvasTex(2048,64,(x,w,hh)=>{x.fillStyle="#ffe066";x.fillRect(0,0,w,hh);x.fillStyle="#222";for(let c=0;c<=400;c+=5){const X=c/400*w;x.fillRect(X,0,2,c%50===0?40:c%10===0?26:14);if(c%50===0){x.font="bold 22px sans-serif";x.fillText(c+"",X+4,58);}}});
  const tm=new T.Mesh(new T.PlaneGeometry(8,.18),new T.MeshBasicMaterial({map:tape.tex}));tm.rotation.x=-Math.PI/2;tm.position.set(-3.2+4,.05,.68);L.root.add(tm);
  const tl=L.sprite("شريط القياس (cm)",{scale:.22});tl.position.set(0,.3,1.05);L.root.add(tl);
  // السيارة
  const car=new T.Group();const body=new T.Mesh(new T.BoxGeometry(.7,.2,.42),L.M.std("#e53935",{metalness:.3,roughness:.35}));body.position.y=.2;body.castShadow=true;car.add(body);
  const cab=new T.Mesh(new T.BoxGeometry(.36,.16,.38),L.M.std("#90caf9",{metalness:.2,roughness:.1}));cab.position.set(-.04,.37,0);car.add(cab);
  const wheels=[];[[.22,.2],[-.22,.2],[.22,-.2],[-.22,-.2]].forEach(([x,z])=>{const w=new T.Mesh(new T.CylinderGeometry(.09,.09,.07,18),L.M.std("#212121"));w.rotation.x=Math.PI/2;w.position.set(x,.09,z);car.add(w);wheels.push(w);});
  L.root.add(car);const ring=L.ring(car,.8);
  const marker=new T.Mesh(new T.ConeGeometry(.08,.25,12),new T.MeshBasicMaterial({color:0x7A1F2E}));marker.rotation.x=Math.PI;marker.visible=false;L.root.add(marker);
  const marks=new T.Group();L.root.add(marks);
  const H=()=>books*.32;function layout(){while(stack.children.length)stack.remove(stack.children[0]);for(let i=0;i<books;i++){const b=new T.Mesh(new T.BoxGeometry(1.2,.3,1.5),L.M.std(bookCols[i%4]));b.position.y=.15+i*.32;b.castShadow=true;stack.add(b);}
    const h=H(),ang=Math.asin(h/rampLen),dx=rampLen*Math.cos(ang);ramp.position.set(-3.2-dx/2,h/2+.03,0);ramp.rotation.z=-ang;ramp.userData={ang,dx,h};
    if(!busy){car.position.set(-3.2-dx+.35*Math.cos(ang),h-.35*Math.sin(ang)+.05,0);car.rotation.z=-ang;}}
  layout();
  function setSurf(k){surf=k;const s=SURF[k];track.material.color.set(s[1]);board.material.color.set(k==="wood"?"#d7b98e":s[1]);sandBumps.visible=k==="sand";A.step("s");}
  L.click(car,async()=>{if(busy||!A.can())return;if(!surf){A.toast("اختاري نوع السطح من اللوحة أولًا");return;}busy=true;ring.off();const {ang,dx,h}=ramp.userData;const mu=SURF[surf][2],g=9.8,hm=books*.05;
    const vb=Math.sqrt(Math.max(.05,2*g*hm*(1-mu*.35/Math.tan(ang))));const d=Math.min(3.9,vb*vb/(2*mu*g));const dcm=Math.round(d*100*(.97+Math.random()*.06));
    const p0=car.position.clone(),pb=new T.Vector3(-3.2+.3,.05,0);await L.anim(Math.max(.6,1.4-books*.15),v=>{car.position.lerpVectors(p0,pb,v*v);wheels.forEach(w=>w.rotation.y-=.4);});car.rotation.z=0;
    const sc=8/4;const pe=new T.Vector3(-3.2+.3+dcm/100*sc,.05,0);await L.anim(Math.max(.7,dcm/90),v=>{const k=1-(1-v)*(1-v);car.position.lerpVectors(pb,pe,k);wheels.forEach(w=>w.rotation.y-=.3*(1-v));});
    marker.position.set(pe.x-.3,.3,.68);marker.visible=true;const mk=new T.Mesh(new T.CylinderGeometry(.04,.04,.02,12),new T.MeshBasicMaterial({color:new T.Color(SURF[surf][1]).offsetHSL(0,0,-.3)}));mk.position.set(pe.x-.3,.07,.68);marks.add(mk);
    A.hud("<b>"+SURF[surf][0]+" · "+books+" كتب</b><br>توقّفت السيارة عند <b>"+dcm+" cm</b>");A.step("go");
    A.record({surf:SURF[surf][0],books,v:vb.toFixed(2),d:dcm});(triedH[books]=triedH[books]||new Set()).add(surf);if(triedH[books].size>=3)A.step("three");
    const hs=new Set(A.state.data.filter(r=>r.surf===SURF[surf][0]).map(r=>r.books));if(hs.size>=2)A.step("hh");
    await L.wait(1.2);busy=false;layout();ring.on();},"car");
  Lab3D._surf={setSurf,setBooks:n=>{books=n;layout();A.step("h");},get:()=>({surf,books})};}
 ,tools:API=>{const S=Lab3D._surf;const cur=S?S.get():{};const d=document.createElement("div");d.innerHTML="<b>🛣️ نوع السطح:</b>";const r=document.createElement("div");r.className="row";
   [["wood","🪵 خشب أملس"],["card","📦 كرتون"],["sand","🏖️ رمل"]].forEach(([k,t])=>{const b=document.createElement("button");b.className="lbtn"+(cur.surf===k?" gold":"");b.textContent=t;b.onclick=()=>{S.setSurf(k);API.go(2);};r.append(b);});
   const r2=document.createElement("div");r2.className="row";r2.innerHTML="<b style='width:100%;margin-top:8px'>📚 ارتفاع المنحدر (عدد الكتب):</b>";[1,2,3,4].forEach(n=>{const b=document.createElement("button");b.className="lbtn"+(cur.books===n?" gold":"");b.textContent=n+" 📕";b.onclick=()=>{S.setBooks(n);API.go(2);};r2.append(b);});
   d.append(r,r2);return d;}});
