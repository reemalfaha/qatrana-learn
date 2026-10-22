/* تجارب الصف الثامن ثلاثية الأبعاد */
Lab3D.register("density",{title:"حساب كثافة أجسام مختلفة",subject:"العلوم",grade:"الثامن",book:"كتاب الأنشطة",icon:"⚖️",desc:"قياس الكتلة بالميزان والحجم بالإزاحة في المخبار المدرّج، ثم حساب الكثافة",
 question:"كيف نحسب كثافة جسم صلب غير منتظم الشكل؟ وهل يمكن معرفة نوع المادة من كثافتها؟",
 goal:"قياس الكتلة والحجم بالإزاحة وحساب الكثافة ρ = m / V، والتنبّؤ بطفو الأجسام أو غوصها.",
 mats:"ميزان رقمي، مخبار مدرّج فيه 50 mL من الماء، حجر، قطعة ألمنيوم، مكعّب خشب، قطعة نحاس، خيط.",safety:"أنزلي الأجسام في المخبار ببطء بالخيط حتى لا ينكسر، وجفّفي الماء المنسكب.",
 predict:{q:"أيّ الأجسام الآتية تتوقّعين أن يطفو على الماء؟",o:["الحجر","قطعة الألمنيوم","مكعّب الخشب","قطعة النحاس"],right:2},
 steps:[{k:"m",t:"اضغطي على جسم ليوضع على الميزان وتُقرأ كتلته."},{k:"v",t:"اضغطي على المخبار ليُنزَل الجسم فيه، واقرئي ارتفاع الماء الجديد."},{k:"all",t:"كرّري مع الأجسام الأربعة."},{k:"calc",t:"افتحي «البيانات» وقارني الكثافات بجدول كثافات المواد."}],
 cols:[["obj","الجسم"],["m","الكتلة (g)"],["v1","قراءة المخبار (mL)"],["v","الحجم (cm³)"],["d","الكثافة (g/cm³)"],["fl","في الماء"]],
 chart:{x:"v",y:"m",title:"الكتلة مقابل الحجم (الميل = الكثافة)",xl:"الحجم cm³",yl:"الكتلة g",color:"#1d7f8c"},
 analysis:()=>{const e=document.createElement("div");e.innerHTML="📚 كثافات مواد معروفة (g/cm³): خشب ≈ 0.6 · ماء = 1.0 · حجر ≈ 2.6 · ألمنيوم = 2.7 · نحاس = 8.9<br>الجسم الذي كثافته أقل من 1 يطفو على الماء.";return e;},
 conclude:[{q:"حجم الجسم غير المنتظم يساوي:",o:["القراءة الجديدة للمخبار","الفرق بين قراءة المخبار بعد إنزال الجسم وقبله","كتلة الجسم","نصف القراءة"],a:1,why:"الجسم يزيح حجمًا من الماء يساوي حجمه."},
  {q:"طفا مكعّب الخشب لأن:",o:["كتلته كبيرة","كثافته أقل من كثافة الماء","حجمه صغير","الماء ساخن"],a:1,why:"الجسم الأقل كثافة من السائل يطفو عليه."},
  {q:"قطعتان من النحاس كتلة الأولى ضعف الثانية، فكثافة الأولى:",o:["ضعف الثانية","تساوي كثافة الثانية","نصفها","لا يمكن معرفتها"],a:1,why:"الكثافة خاصية مميّزة للمادة لا تعتمد على كميّتها."}],
 scene:{yaw:-.15,pitch:.4,dist:8,ty:.9,sky1:"#e8fbfb",sky2:"#fff1e6"},
 setup(L,A){const T=L.T;const OB=[["حجر",2.6,10.5,"#8d8d8d","rock"],["ألمنيوم",2.7,7.2,"#cfd8dc","box"],["خشب",.6,12,"#c49a6c","box"],["نحاس",8.9,4.4,"#c47a3a","cyl"]];
  const bal=L.balance();bal.g.position.set(-2.4,0,.6);L.add(bal);
  // مخبار مدرّج
  const cylG=new T.Group();cylG.position.set(1.6,0,.4);L.root.add(cylG);const R=.32,H=2.6;
  const base=new T.Mesh(new T.CylinderGeometry(.55,.6,.1,6),L.M.glass());base.position.y=.05;cylG.add(base);const wall=new T.Mesh(new T.CylinderGeometry(R,R,H,36,1,true),L.M.glass());wall.position.y=.1+H/2;cylG.add(wall);
  const sc=L.canvasTex(128,1024,(x,w,hh)=>{x.clearRect(0,0,w,hh);x.fillStyle="#1b2b3a";for(let ml=0;ml<=100;ml+=2){const y=hh-ml/100*hh;const big=ml%10===0;x.fillRect(0,y-1,big?60:30,big?4:2);if(big){x.font="bold 34px sans-serif";x.fillText(ml,66,y+12);}}});
  const scale=new T.Mesh(new T.PlaneGeometry(.38,H),new T.MeshBasicMaterial({map:sc.tex,transparent:true}));scale.position.set(0,.1+H/2,R+.01);cylG.add(scale);
  const water=new T.Mesh(new T.CylinderGeometry(R*.95,R*.95,1,32),L.M.liquid("#4fb3e8",.6));cylG.add(water);
  const men=new T.Mesh(new T.TorusGeometry(R*.93,.02,8,36),L.M.liquid("#2a8fc8",.8));men.rotation.x=Math.PI/2;cylG.add(men);
  let ml=50;const setML=v=>{ml=v;const hh=H*v/100;water.scale.y=hh;water.position.y=.1+hh/2;men.position.y=.1+hh;};setML(50);
  const lb=L.sprite("مخبار مدرّج 100 mL",{scale:.22,border:"#1d7f8c"});lb.position.y=H+.5;cylG.add(lb);const cr=L.ring(cylG,H+.9);cr.off();
  const objs=OB.map((o,i)=>{const sz=Math.cbrt(o[2])*.11;let m;if(o[4]==="rock"){m=new T.Mesh(new T.DodecahedronGeometry(sz*.75,1),L.M.std(o[3],{roughness:.9,flatShading:true}));}
    else if(o[4]==="cyl")m=new T.Mesh(new T.CylinderGeometry(sz*.5,sz*.5,sz*1.3,24),L.M.std(o[3],{metalness:.8,roughness:.3}));else m=new T.Mesh(new T.BoxGeometry(sz,sz,sz),L.M.std(o[3],{metalness:o[0]==="ألمنيوم"?.8:.0,roughness:o[0]==="خشب"?.8:.3}));
    m.castShadow=true;const g=new T.Group();g.add(m);g.position.set(-3.3+i*.75,sz/2+.02,2.1);L.root.add(g);const t=L.sprite(o[0],{scale:.18});t.position.y=.45;g.add(t);return {g,o,sz,home:g.position.clone(),m:null,ring:L.ring(g,.8)};});
  let sel=null,busy=false;const rows={};
  objs.forEach((ob,i)=>L.click(ob.g,async()=>{if(busy||!A.can())return;if(rows[i]&&rows[i].v){A.toast("قِستِ هذا الجسم");return;}busy=true;sel=i;objs.forEach(x=>x.ring.off());
    const mass=+(ob.o[1]*ob.o[2]*(.98+Math.random()*.04)).toFixed(1);await L.arc(ob.g,new T.Vector3(bal.g.position.x,bal.top+ob.sz/2,bal.g.position.z-.1),.8,.6);bal.set(mass.toFixed(1));
    rows[i]={m:mass};A.step("m");A.hud("<b>"+ob.o[0]+"</b> · الكتلة = <b>"+mass+" g</b><br>اضغطي على المخبار لإنزاله في الماء");cr.on();busy=false;},"obj"+i));
  L.click(cylG,async()=>{if(busy||sel==null)return;busy=true;cr.off();const ob=objs[sel],i=sel;bal.set("0.0");
    const top=new T.Vector3(cylG.position.x,.1+H+.4,cylG.position.z);await L.arc(ob.g,top,.8,.4);const floats=ob.o[1]<1;const sub=floats?ob.o[1]:1;const dv=ob.o[2]*sub;
    const yEnd=floats?.1+H*(50+dv)/100-ob.sz*(sub-.5):.1+ob.sz/2+.02;await L.move(ob.g,new T.Vector3(top.x,yEnd,top.z),1.2);const v0=ml;await L.anim(.8,v=>setML(v0+dv*v));
    L.focus(cylG.position.x,.1+H*ml/100,cylG.position.z,4.2,.8);const read=Math.round(ml*2)/2;const vol=floats?+(ob.o[2]).toFixed(1):+(read-50).toFixed(1);
    A.hud("<b>"+ob.o[0]+"</b>: ارتفع الماء من 50 إلى <b>"+read+" mL</b>"+(floats?"<br>🎈 طفا الجسم! نغمره بإبرة رفيعة لقياس حجمه كاملًا: "+vol+" cm³":"<br>الحجم = "+read+" − 50 = <b>"+vol+" cm³</b>"));
    await L.wait(2.4);const d=+(rows[i].m/vol).toFixed(2);Object.assign(rows[i],{v:vol});A.record({obj:ob.o[0],m:rows[i].m,v1:read,v:vol,d,fl:floats?"🎈 يطفو":"⬇️ يغوص"});A.step("v");
    await L.move(ob.g,ob.home,1);setML(50);await L.home(.7);sel=null;busy=false;objs.forEach((x,k)=>{if(!rows[k]||!rows[k].v)x.ring.on();});if(Object.values(rows).filter(r=>r.v).length===4)A.step("all");A.hud("");},"cyl");
  L.tick(()=>{if(A.state.stage===3&&A.state.data.length===4)A.step("calc");});}});
