/* تجارب العلوم الحياتية ثلاثية الأبعاد */
Lab3D.register("osmosis",{title:"أثر تراكيز مختلفة من محلول الغلوكوز في كتلة البطاطا",subject:"العلوم الحياتية",grade:"التاسع",book:"كتاب الأنشطة",icon:"🥔",desc:"الخاصية الأسموزية: قياس كتلة أسطوانات البطاطا قبل وبعد النقع",
 question:"كيف يؤثّر تركيز محلول الغلوكوز في كتلة أسطوانات البطاطا المنقوعة فيه؟",
 goal:"استقصاء الخاصية الأسموزية، وتقدير تركيز المحلول المتساوي التوتّر مع خلايا البطاطا.",
 mats:"بطاطا، ثاقب فلّين، مشرط، ميزان رقمي، خمس كؤوس فيها محاليل غلوكوز بتراكيز 0% و5% و10% و20% و30%، ورق نشّاف، ساعة توقيت.",
 safety:"استخدمي المشرط بحذر، ولا تتذوّقي المحاليل.",
 predict:{q:"ماذا يحدث لكتلة أسطوانة البطاطا في المحلول الأكثر تركيزًا (30%)؟",o:["تزداد","تقلّ","لا تتغيّر"],right:1},
 steps:[{k:"w0",t:"زِني كل أسطوانة بطاطا بالضغط عليها (تنتقل إلى الميزان)."},{k:"put",t:"اضغطي «ضعي الأسطوانات في الكؤوس»."},{k:"time",t:"اضغطي «⏩ انتظري 30 دقيقة» وراقبي الأسطوانات."},{k:"w1",t:"زِني الأسطوانات مرّة أخرى بالضغط على كل كأس."},{k:"graph",t:"افتحي «البيانات» وادرسي الرسم البياني."}],
 cols:[["c","تركيز الغلوكوز %"],["m0","الكتلة الابتدائية (g)"],["m1","الكتلة النهائية (g)"],["pc","نسبة التغيّر %"]],
 chart:{x:"c",y:"pc",title:"نسبة التغيّر في الكتلة مقابل التركيز",xl:"تركيز الغلوكوز %",yl:"نسبة التغيّر في الكتلة %",color:"#2f8f5b"},
 analysis:D=>{const s=D.filter(d=>d.pc!=null).sort((a,b)=>a.c-b.c);let iso="—";for(let i=1;i<s.length;i++){if(s[i-1].pc>0&&s[i].pc<=0){const a=s[i-1],b=s[i];iso=(a.c+(0-a.pc)*(b.c-a.c)/(b.pc-a.pc)).toFixed(1);}}
   const e=document.createElement("div");e.innerHTML="📍 يقطع الخطُّ محورَ الصفر تقريبًا عند تركيز <b>"+iso+"%</b>؛ وهو التركيز المتساوي التوتّر الذي لا تتغيّر عنده الكتلة.";return e;},
 conclude:[{q:"لماذا ازدادت كتلة البطاطا في الماء المقطّر (0%)؟",o:["لأن الغلوكوز دخل إليها","لأن الماء انتقل إلى داخل الخلايا من الوسط الأقل تركيزًا إلى الأعلى تركيزًا (الخاصية الأسموزية)","لأن الخلايا انقسمت","بسبب الحرارة"],a:1,why:"الماء ينتقل عبر الغشاء شبه المنفذ من المحلول الأقل تركيزًا بالمذاب إلى الأعلى تركيزًا."},
  {q:"في المحلول 30% قلّت الكتلة لأن:",o:["الماء خرج من خلايا البطاطا إلى المحلول الأعلى تركيزًا","الغلوكوز خرج من البطاطا","البطاطا تنفّست","الخلايا امتصّت الغلوكوز"],a:0,why:"المحلول الخارجي مفرط التوتّر، فيخرج الماء من الخلايا فتنكمش."},
  {q:"المحلول الذي لا تتغيّر فيه كتلة البطاطا يُسمّى:",o:["مفرط التوتّر","منخفض التوتّر","متساوي التوتّر","مشبع"],a:2,why:"تركيزه يساوي تركيز محتوى الخلايا فلا يحدث صافي انتقال للماء."},
  {q:"لماذا نحسب نسبة التغيّر بدل فرق الكتلة فقط؟",o:["لأنها أسهل","لأن الكتل الابتدائية للأسطوانات غير متساوية تمامًا، فالنسبة تسمح بالمقارنة العادلة","لا فرق بينهما","لزيادة الدقّة في الميزان"],a:1,why:"النسبة المئوية تلغي أثر اختلاف الكتلة الابتدائية."}],
 scene:{yaw:.15,pitch:.42,dist:8.6,ty:.7,sky1:"#eefaf0",sky2:"#e3ecff"},
 setup(L,A){const T=L.T;const C=[0,5,10,20,30];const m0=C.map(()=>+(4.6+Math.random()*.6).toFixed(2));const pcOf=c=>Math.max(-24,11.5-1.35*c+(Math.random()-.5)*1.2);const pc=C.map(pcOf);
  const bal=L.balance();bal.g.position.set(3.6,0,1.4);L.add(bal);
  const potMat=new T.MeshStandardMaterial({color:0xf3dfa2,roughness:.75});const skin=new T.MeshStandardMaterial({color:0xe8cf8a,roughness:.8});
  const cyl=C.map((c,i)=>{const g=new T.Group();const m=new T.Mesh(new T.CylinderGeometry(.16,.16,.9,24),[potMat,skin,skin]);m.rotation.z=Math.PI/2;m.castShadow=true;g.add(m);g.position.set(-3.4+i*1.25,.17,2.2);L.root.add(g);return g;});
  const tray=new T.Mesh(new T.BoxGeometry(6.6,.06,.9),L.M.std("#ffffff"));tray.position.set(-.9,.03,2.2);tray.receiveShadow=true;L.root.add(tray);
  const bk=C.map((c,i)=>{const b=L.beaker({r:.5,h:1.05,color:c?new T.Color("#fff6d0").lerp(new T.Color("#ffd66b"),c/30).getStyle():"#dff2ff",level:.62,op:.5});b.g.position.set(-3.4+i*1.25,0,.4);L.add(b);
    const lb=L.sprite(c+"% غلوكوز",{scale:.24,border:"#2f8f5b"});lb.position.y=1.45;b.g.add(lb);return b;});
  const R=cyl.map(c=>L.ring(c,.6));const RB=bk.map(b=>{const r=L.ring(b.g,1.9);r.off();return r;});
  const st={w0:new Set(),w1:new Set(),placed:false,timed:false,busy:false};
  const clk=L.sprite("⏱ 0 دقيقة",{scale:.32,border:"#7A1F2E"});clk.position.set(0,2.7,-.6);clk.visible=false;L.root.add(clk);
  cyl.forEach((g,i)=>L.click(g,async()=>{if(st.busy||st.placed||!A.can())return;if(st.w0.has(i))return;st.busy=true;const home=g.position.clone();
    await L.arc(g,new T.Vector3(bal.g.position.x,bal.top+.17,bal.g.position.z-.1),.8,.5);bal.set(m0[i].toFixed(2));await L.wait(.9);
    st.w0.add(i);R[i].off();await L.arc(g,home,.7,.4);bal.set("0.00");A.toast("⚖️ كتلة الأسطوانة "+(i+1)+" = "+m0[i].toFixed(2)+" g");if(st.w0.size===5){A.step("w0");A.toast("✅ وُزنت الأسطوانات. اضغطي «ضعي الأسطوانات في الكؤوس» من اللوحة",3200);}st.busy=false;},"cyl"+i));
  bk.forEach((b,i)=>L.click(b.g,async()=>{if(st.busy||!st.timed||st.w1.has(i))return;st.busy=true;const g=cyl[i];
    await L.arc(g,new T.Vector3(bal.g.position.x,bal.top+.17,bal.g.position.z-.1),1,.9);g.rotation.set(0,0,0);const m1=+(m0[i]*(1+pc[i]/100)).toFixed(2);bal.set(m1.toFixed(2));await L.wait(.9);
    st.w1.add(i);RB[i].off();A.record({c:C[i],m0:m0[i].toFixed(2),m1:m1.toFixed(2),pc:+(((m1-m0[i])/m0[i])*100).toFixed(1)});
    await L.arc(g,new T.Vector3(-3.4+i*1.25,.17,2.2),.8,.4);bal.set("0.00");A.toast("⚖️ "+C[i]+"%: "+m0[i].toFixed(2)+" ← "+m1.toFixed(2)+" g");if(st.w1.size===5){A.step("w1");A.toast("📈 اكتملت البيانات! افتحي «البيانات» لتري الرسم البياني",3500);}st.busy=false;},"bk"+i));
  Lab3D._osmo={put:async()=>{if(st.busy||st.placed)return;if(st.w0.size<5){A.toast("زِني الأسطوانات الخمس أولًا");return;}st.busy=true;
      await Promise.all(cyl.map((g,i)=>L.arc(g,new T.Vector3(-3.4+i*1.25,.35,.4),1.1,1.3).then(()=>L.anim(.4,v=>g.rotation.z=v*Math.PI/2))));st.placed=true;A.step("put");st.busy=false;A.go(2);},
    time:async()=>{if(!st.placed||st.timed||st.busy)return;st.busy=true;clk.visible=true;L.focus(-.9,.8,.4,7,.8);
      await L.anim(3.5,v=>{const mn=Math.round(v*30);if(!clk._m||clk._m!==mn){clk._m=mn;const n=L.sprite("⏱ "+mn+" دقيقة",{scale:.32,border:"#7A1F2E"});clk.material.map=n.material.map;clk.scale.copy(n.scale);clk.material.needsUpdate=true;}
        cyl.forEach((g,i)=>{const k=1+pc[i]/100*v*1.6;g.scale.set(1,Math.cbrt(k),Math.cbrt(k));});});
      st.timed=true;L.home(.8);A.step("time");RB.forEach(r=>r.on());st.busy=false;A.toast("⏱ مرّت 30 دقيقة. لاحظي الأسطوانات المنتفخة والمنكمشة، ثم زِنيها",3500);A.go(2);}};
  L.tick(()=>{if(A.state.stage===3&&A.state.data.length===5)A.step("graph");});}
 ,tools:API=>{const d=document.createElement("div");d.className="row";const b1=document.createElement("button");b1.className="lbtn";b1.textContent="🫙 ضعي الأسطوانات في الكؤوس";b1.onclick=()=>Lab3D._osmo&&Lab3D._osmo.put();
   const b2=document.createElement("button");b2.className="lbtn gold";b2.textContent="⏩ انتظري 30 دقيقة";b2.onclick=()=>Lab3D._osmo&&Lab3D._osmo.time();d.append(b1,b2);return d;}});
