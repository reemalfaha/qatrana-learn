/* تجارب الأحياء وعلوم الأرض — المختبر الافتراضي — تصميم وتنفيذ: نوال بني عطية */
(function(){const {W,H,g}=VLab;const {rr,card,label,lens}=g;const GY=468;
const ltr=(c,f)=>{c.save();c.direction="ltr";f();c.restore()};
const rnd=s=>{let x=Math.sin(s*999.7)*43758.5453;return x-Math.floor(x)};
const mix=(a,b,f)=>a.map((v,i)=>Math.round(v+(b[i]-v)*f));const rgb=a=>"rgb("+a.join(",")+")";

/* ===== 1) الخاصّية الأسموزية في البطاطا ===== */
const dPct=(c,t)=>{const k=c<=.25?72:30;return k*(.25-c)*(1-Math.exp(-t/18))};
VLab.reg({id:"b9-potato",icon:"🥔",preview:{c:.8,t:60},grade:"الصف التاسع",subject:"العلوم الحياتية",unit:"الوحدة 2: الخلية",src:"كتاب الأنشطة ص32",
 title:"أثر تراكيز محلول الغلوكوز في كتلة البطاطا",question:"كيف تتغيّر كتلة أسطوانة البطاطا عند وضعها في محاليل غلوكوز مختلفة التركيز؟ ولماذا؟",
 vars:[{k:"c",label:"تركيز محلول الغلوكوز",unit:"M",min:0,max:1,step:.1,val:0,c:"#B8902A",ticks:[0,.25,.5,.75,1]},{k:"t",label:"زمن النقع",unit:"دقيقة",min:0,max:60,step:5,val:30,c:"#2b7bd6",ticks:[0,30,60]}],
 read(s){const d=dPct(s.c,s.t);return[{label:"الكتلة الابتدائية",val:"5.00",unit:"g"},{label:"الكتلة النهائية",val:(5*(1+d/100)).toFixed(2),unit:"g"},{label:"نسبة التغيّر في الكتلة",val:(d>0?"+":"")+d.toFixed(1),unit:"%"},
  {label:"اتّجاه حركة الماء",val:Math.abs(d)<.5?"لا يوجد صافٍ (متساوي التركيز)":d>0?"من المحلول إلى خلايا البطاطا":"من خلايا البطاطا إلى المحلول"},{label:"حالة الخلايا",val:Math.abs(d)<.5?"طبيعية":d>0?"منتفخة (ممتلئة)":"منكمشة (بلزمة)"}]},
 draw(c,s,t){const d=dPct(s.c,s.t);const bx=180,by=230,bw=230,bh=230;
  const sol=mix([210,232,250],[235,200,120],s.c);c.fillStyle="rgba("+sol.join(",")+",.55)";c.fillRect(bx+4,by+50,bw-8,bh-54);
  c.strokeStyle="rgba(230,240,255,.8)";c.lineWidth=4;c.beginPath();c.moveTo(bx,by);c.lineTo(bx,by+bh);c.lineTo(bx+bw,by+bh);c.lineTo(bx+bw,by);c.stroke();
  const sc=1+d/100;const pw=150*sc,ph=46*Math.sqrt(sc);c.save();c.translate(bx+bw/2,by+bh-60);c.rotate(-.08);c.fillStyle="#efd9a0";rr(c,-pw/2,-ph/2,pw,ph,ph/2);c.fill();c.strokeStyle="#c9a95f";c.lineWidth=3;c.stroke();c.restore();
  for(let i=0;i<10;i++){const f=(t*.25+i/10)%1;const into=d>0;c.fillStyle="rgba(60,130,230,"+(.8*(1-f))+")";const a=i*.63;const r0=into?90-f*60:30+f*60;c.beginPath();c.arc(bx+bw/2+Math.cos(a)*r0,by+bh-60+Math.sin(a)*r0*.5,3.5,0,7);if(Math.abs(d)>.5)c.fill()}
  ltr(c,()=>label(c,bx+bw/2,by-20,s.c.toFixed(1)+" M","#f3dfa8",22));label(c,bx+bw/2,GY+24,"أسطوانة بطاطا في محلول غلوكوز","#f3dfa8",19);
  lens(c,560,230,100,(c,x,y,r)=>{c.fillStyle="rgba("+sol.join(",")+",1)";c.fillRect(x-r,y-r,2*r,2*r);const k=Math.max(-.4,Math.min(.15,d/40));
   c.strokeStyle="#7a9a3a";c.lineWidth=5;rr(c,x-62,y-48,124,96,12);c.stroke();const sx=124*(1+Math.min(0,k)),sy=96*(1+Math.min(0,k));c.fillStyle="rgba(140,190,90,.6)";rr(c,x-sx/2+5,y-sy/2+5,sx-10,sy-10,16);c.fill();
   c.fillStyle="rgba(90,160,230,.55)";c.beginPath();c.ellipse(x+5,y,sx*.32*(1+Math.max(0,k)),sy*.3*(1+Math.max(0,k)),0,0,7);c.fill()},"خلية من البطاطا");
  // منحنى
  const gx=700,gy=330,gw=220,gh=120;c.fillStyle="rgba(20,10,14,.82)";rr(c,gx-20,gy-30,gw+30,gh+56,12);c.fill();label(c,gx+gw/2,gy-14,"نسبة تغيّر الكتلة مقابل التركيز","#f3dfa8",15);
  const Y=v=>gy+gh/2-v/20*(gh/2);c.strokeStyle="rgba(255,255,255,.3)";c.beginPath();c.moveTo(gx,Y(0));c.lineTo(gx+gw,Y(0));c.stroke();
  c.strokeStyle="#ffd34d";c.lineWidth=2.5;c.beginPath();for(let x=0;x<=1;x+=.05){const X=gx+x*gw,v=dPct(x,s.t);x?c.lineTo(X,Y(v)):c.moveTo(X,Y(v))}c.stroke();c.fillStyle="#ff8a65";c.beginPath();c.arc(gx+s.c*gw,Y(d),6,0,7);c.fill();
  ltr(c,()=>{label(c,gx,gy+gh+12,"0","#cfd5de",13);label(c,gx+gw,gy+gh+12,"1 M","#cfd5de",13)});
  card(c,700,96,220,100,"تغيّر الكتلة",(d>0?"+":"")+d.toFixed(1)+"%",null)},
 challenges:[{t:"اجعلي كتلة البطاطا تزداد",test:s=>dPct(s.c,s.t)>3},{t:"جدي التركيز الذي لا تتغيّر عنده الكتلة",test:s=>Math.abs(s.c-.2)<.06||Math.abs(s.c-.3)<.06},{t:"جرّبي 5 تراكيز",test:(s,h)=>h.c.size>=5},{t:"سجّلي 5 قراءات",test:(s,h,r)=>r.length>=5}],
 notebook:{goal:"أدرس أثر تراكيز مختلفة من محلول الغلوكوز في كتلة البطاطا، وأفسّر النتائج بالخاصّية الأسموزية.",mats:"بطاطا، ثاقب فلّين، محاليل غلوكوز (0، 0.2، 0.4، 0.6، 0.8، 1 M)، ميزان، كؤوس، ورق تجفيف.",
  steps:["ثبّتي زمن النقع 30 دقيقة.","غيّري التركيز من 0 إلى 1 M، وسجّلي الكتلة النهائية ونسبة التغيّر لكلّ تركيز.","راقبي خلية البطاطا في العدسة واتّجاه حركة جزيئات الماء.","حدّدي من المنحنى التركيز الذي لا تتغيّر عنده الكتلة."],
  questions:[{q:"لماذا زادت كتلة البطاطا في الماء المقطّر؟",a:"لأنّ تركيز الماء خارج الخلايا أعلى، فيدخل الماء إلى خلايا البطاطا بالخاصّية الأسموزية."},
   {q:"لماذا قلّت كتلة البطاطا في محلول الغلوكوز 1 M؟",a:"لأنّ المحلول أعلى تركيزًا من محتوى الخلايا، فيخرج الماء منها بالخاصّية الأسموزية وتنكمش."},
   {q:"ماذا يعني التركيز الذي لا تتغيّر عنده الكتلة؟",a:"أنّ المحلول متساوي التركيز مع محتوى خلايا البطاطا، فلا توجد حركة صافية للماء."},{q:"لماذا نحسب نسبة التغيّر لا مقدار التغيّر فقط؟",a:"لأنّ الأسطوانات قد تختلف قليلًا في كتلتها الابتدائية، والنسبة تجعل المقارنة عادلة."}],
  concl:"ينتقل الماء عبر الغشاء البلازمي من المنطقة الأقلّ تركيزًا بالمذاب إلى الأعلى تركيزًا (الخاصّية الأسموزية)، فتزداد كتلة البطاطا في المحاليل المخفّفة وتقلّ في المركّزة."}});

/* ===== 2) المجهر الضوئي: شرائح حقيقية ===== */
const SL={
 onion:["بشرة البصل","نباتية","التاسع","خلايا مستطيلة متراصّة، لكلّ منها جدار خلوي ونواة واضحة.",50],
 leaf:["ورقة نبات","نباتية","التاسع","خلايا نباتية مليئة بالبلاستيدات الخضراء التي تقوم بالبناء الضوئي.",50],
 cheek:["خلايا بطانة الخدّ","حيوانية","التاسع","خلايا مسطّحة غير منتظمة الشكل، لكلّ منها نواة مركزية وغشاء بلازمي، ولا جدار خلوي.",50],
 liver:["خلايا الكبد","حيوانية","التاسع","خلايا متعدّدة الأوجه، في وسط كلّ منها نواة واضحة.",50],
 neuron:["خلية عصبية","حيوانية","التاسع","جسم خلية فيه النواة، تتفرّع منه زوائد طويلة تنقل السيالات العصبية.",50],
 blood:["خلايا الدم","حيوانية","التاسع","خلايا دم حمراء قرصية بلا نواة، وخلايا دم بيضاء نواتها مفصّصة.",20],
 m1:["قمّة جذر البصل: الطور البيني","انقسام","الثامن","النواة كبيرة والمادّة الوراثية منتشرة غير ظاهرة على شكل كروموسومات.",20],
 m2:["قمّة جذر البصل: الطور التمهيدي","انقسام","الثامن","تتكثّف الكروموسومات وتصبح مرئية، ويبدأ الغلاف النووي بالاختفاء.",20],
 m3:["قمّة جذر البصل: الطور الاستوائي","انقسام","الثامن","تصطفّ الكروموسومات في وسط الخلية (خطّ الاستواء).",20],
 m4:["قمّة جذر البصل: الطور الانفصالي","انقسام","الثامن","تنفصل الكروماتيدات الشقيقة وتتّجه نحو قطبي الخلية.",20],
 m5:["قمّة جذر البصل: الطور النهائي","انقسام","الثامن","تتكوّن نواتان جديدتان ويبدأ تكوّن الجدار الفاصل بين الخليتين.",20],
 bacilli:["بكتيريا عصوية","كائنات دقيقة","العاشر","خلايا بكتيرية على شكل عصيّ، بلا نواة حقيقية.",10],
 lacto:["بكتيريا حمض اللاكتيك (في اللبن)","كائنات دقيقة","العاشر","بكتيريا عصوية تحوّل الحليب إلى لبن بإنتاج حمض اللاكتيك.",10],
 strep:["بكتيريا عقدية (في اللبن)","كائنات دقيقة","العاشر","بكتيريا كروية مرتّبة في سلاسل.",10],
 yeast:["خلايا الخميرة","كائنات دقيقة","العاشر","فطر وحيد الخلية؛ يظهر التبرعم (خلية صغيرة تنمو من خلية أمّ).",20],
 amoeba:["الأميبا","كائنات دقيقة","العاشر","طلائعي يتحرّك ويتغذّى بالأقدام الكاذبة.",100],
 param:["البراميسيوم","كائنات دقيقة","العاشر","طلائعي يغطّيه أهداب يتحرّك بها.",100],
 eugl:["اليوغلينا","كائنات دقيقة","العاشر","طلائعي فيه بلاستيدات خضراء، ويتحرّك بالسوط.",50],
 mold:["عفن الخبز","كائنات دقيقة","العاشر","خيوط فطرية تحمل أكياسًا بوغية في أطرافها.",100],
 granite:["الغرانيت (مجهر مستقطب)","صخور","العاشر","صخر ناري جوفي: بلّورات كبيرة متداخلة بألوان تداخل مختلفة.",500],
 basalt:["البازلت (مجهر مستقطب)","صخور","العاشر","صخر ناري بركاني: بلّورات صغيرة دقيقة.",500],
 marble:["الرخام (مجهر مستقطب)","صخور","العاشر","صخر متحوّل: بلّورات كالسيت متشابكة.",500]};
const GRP={cells:["🧫 خلايا نباتية وحيوانية",["onion","leaf","cheek","liver","neuron","blood"]],mit:["🧬 الانقسام المتساوي",["m1","m2","m3","m4","m5"]],mic:["🦠 الكائنات الدقيقة",["bacilli","lacto","strep","yeast","amoeba","param","eugl","mold"]],rock:["🪨 الصخور",["granite","basalt","marble"]]};
const IMG={};const img=k=>{if(!IMG[k]){IMG[k]=new Image();IMG[k].src="slides/"+k+".jpg"}return IMG[k]};
let PAN={x:0,y:0},OFF=null;
VLab.reg({id:"b9-microscope",icon:"🔬",preview:{s:"onion",f:60},grade:"الصف التاسع",subject:"العلوم الحياتية",unit:"الوحدة 2: الخلية",src:"كتاب الأنشطة ص24",
 title:"المجهر الضوئي: شرائح حقيقية",question:"ما الذي نراه تحت المجهر الضوئي؟ وكيف نضبط المجهر لنحصل على صورة واضحة؟",dyn:1,
 vars:[{k:"g",label:"صندوق الشرائح",type:"seg",val:"cells",c:"#7A1F2E",opts:Object.keys(GRP).map(k=>[k,GRP[k][0]])},
  {k:"s",label:"الشريحة",type:"seg",val:"onion",c:"#B8902A",opts:S=>GRP[S.g][1].map(k=>[k,SL[k][0].replace("قمّة جذر البصل: ","")])},
  {k:"o",label:"العدسة الشيئية",type:"seg",val:10,c:"#2b7bd6",opts:[[4,"4×"],[10,"10×"],[40,"40×"]]},
  {k:"f",label:"الضابط الدقيق (التركيز)",unit:"",min:0,max:100,step:1,val:30,c:"#2f8f5b",ticks:[0,50,100]},
  {k:"L",label:"شدّة الإضاءة",unit:"%",min:10,max:100,step:5,val:70,c:"#e8a33b",ticks:[10,50,100]}],
 onSeg(S,k){if(k==="g")S.s=GRP[S.g][1][0];PAN={x:0,y:0}},
 drag(dx,dy){PAN.x+=dx;PAN.y+=dy},
 read(s){const X=SL[s.s],cl=Math.abs(s.f-60)<8;return[{label:"العيّنة",val:X[0]},{label:"قوّة التكبير الكلية",val:10*s.o+"×"},{label:"وضوح الصورة",val:cl?"واضحة ✔":"غير واضحة: حرّكي الضابط الدقيق"},{label:"الإضاءة",val:s.L<35?"معتمة: زيدي الإضاءة":s.L>92?"ساطعة جدًّا":"مناسبة"},{label:"ماذا نرى؟",val:cl?X[3]:"اضبطي الوضوح أوّلًا"}]},
 draw(c,s,t,dt,S){const X=SL[S.s];
  // المجهر
  const mx=150;c.fillStyle="#2c2f38";rr(c,mx-70,GY-24,170,24,8);c.fill();c.fillStyle="#3b3f4a";c.beginPath();c.moveTo(mx+60,GY-24);c.quadraticCurveTo(mx+80,GY-200,mx+20,GY-300);c.lineTo(mx,GY-286);c.quadraticCurveTo(mx+50,GY-190,mx+30,GY-24);c.fill();
  c.save();c.translate(mx-10,GY-250);c.rotate(-.35);c.fillStyle="#e8e8ee";rr(c,-16,-110,32,140,8);c.fill();c.fillStyle="#7A1F2E";rr(c,-18,-118,36,16,4);c.fill();c.restore();
  c.fillStyle="#555";rr(c,mx-60,GY-140,140,10,3);c.fill();c.fillStyle="rgba(200,230,255,.7)";rr(c,mx-40,GY-147,90,7,2);c.fill();c.fillStyle="#d9a441";c.beginPath();c.arc(mx+50,GY-100,14,0,7);c.fill();
  c.fillStyle="rgba(255,231,160,"+(s.L/100)+")";c.beginPath();c.arc(mx-10,GY-60,10,0,7);c.fill();
  label(c,mx,GY+24,"المجهر الضوئي المركّب","#f3dfa8",18);
  // مجال الرؤية
  const fx=600,fy=322,R=212,im=img(S.s);c.save();c.beginPath();c.arc(fx,fy,R,0,7);c.clip();c.fillStyle="#eef0f2";c.fillRect(fx-R,fy-R,2*R,2*R);
  if(im.complete&&im.naturalWidth){const z={4:.6,10:1.05,40:1.9}[S.o];const sc=2*R/Math.min(im.naturalWidth,im.naturalHeight)*z;const w=im.naturalWidth*sc,h=im.naturalHeight*sc;
   const mxp=Math.max(0,(w-2*R)/2+40),myp=Math.max(0,(h-2*R)/2+40);PAN.x=Math.max(-mxp,Math.min(mxp,PAN.x));PAN.y=Math.max(-myp,Math.min(myp,PAN.y));
   const blur=Math.min(1,Math.abs(s.f-60)/40);const q=Math.max(.06,1-blur*.94);
   if(!OFF)OFF=document.createElement("canvas");OFF.width=Math.max(8,Math.round(w*q));OFF.height=Math.max(8,Math.round(h*q));const o=OFF.getContext("2d");o.imageSmoothingQuality="high";o.drawImage(im,0,0,OFF.width,OFF.height);
   c.imageSmoothingEnabled=true;c.imageSmoothingQuality="high";c.drawImage(OFF,fx-w/2+PAN.x,fy-h/2+PAN.y,w,h);
   const um=X[4]*{4:2.5,10:1,40:.25}[S.o]*2;ltr(c,()=>{c.fillStyle="rgba(0,0,0,.65)";rr(c,fx-70,fy+R-64,140,30,8);c.fill();c.fillStyle="#fff";c.fillRect(fx-50,fy+R-46,100,4);label(c,fx,fy+R-56,"≈ "+um+" µm","#fff",14)})}
  else label(c,fx,fy,"⏳ جارٍ تحميل الشريحة…","#555",22);
  const dark=1-s.L/100;c.fillStyle="rgba(0,0,0,"+(dark*.85)+")";c.fillRect(fx-R,fy-R,2*R,2*R);if(s.L>92){c.fillStyle="rgba(255,255,255,"+((s.L-92)/8*.35)+")";c.fillRect(fx-R,fy-R,2*R,2*R)}
  const vg=c.createRadialGradient(fx,fy,R*.7,fx,fy,R);vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(0,0,0,.55)");c.fillStyle=vg;c.fillRect(fx-R,fy-R,2*R,2*R);
  c.restore();c.strokeStyle="#0d0d0f";c.lineWidth=20;c.beginPath();c.arc(fx,fy,R+10,0,7);c.stroke();c.strokeStyle="#B8902A";c.lineWidth=3;c.beginPath();c.arc(fx,fy,R+21,0,7);c.stroke();
  c.fillStyle="rgba(122,31,46,.92)";rr(c,fx-R-30,fy+R-40,90,40,12);c.fill();ltr(c,()=>label(c,fx-R+15,fy+R-20,10*S.o+"×","#fff",22));
  c.fillStyle="rgba(20,10,14,.85)";rr(c,24,96,250,70,12);c.fill();label(c,149,118,X[1]+" · "+X[2],"#f3dfa8",17);label(c,149,146,"👆 اسحبي الشريحة لتحريكها","#cfd5de",15)},
 challenges:[{t:"اضبطي التركيز حتى تتّضح الصورة",test:s=>Math.abs(s.f-60)<8},{t:"رتّبي أطوار الانقسام الخمسة",test:(s,h)=>["m1","m2","m3","m4","m5"].every(k=>h.s.has(k))},{t:"قارني خلية نباتية بحيوانية بتكبير 400×",test:(s,h)=>s.o===40&&h.s.has("onion")&&h.s.has("cheek")},{t:"افحصي 10 شرائح مختلفة",test:(s,h)=>h.s.size>=10}],
 notebook:{goal:"أفحص شرائح مجهرية حقيقية لخلايا نباتية وحيوانية وكائنات دقيقة، وأتدرّب على استخدام المجهر الضوئي.",mats:"مجهر ضوئي مركّب، شرائح جاهزة، شرائح زجاجية وأغطيتها، صبغة اليود وأزرق الميثيلين.",
  steps:["اختاري صندوق الشرائح ثمّ الشريحة.","ابدئي بالعدسة الشيئية 4×، وحرّكي الضابط الدقيق حتى تتّضح الصورة، واضبطي الإضاءة.","اسحبي الشريحة بإصبعك لتتنقّلي فيها، ثمّ انتقلي إلى 10× و40× وأعيدي ضبط الوضوح.","سجّلي ما تشاهدينه في كلّ شريحة، وارسمي خلية واحدة في دفترك."],
  questions:[{q:"احسبي قوّة التكبير الكلية بعدسة عينية 10× وعدسة شيئية 40×.",a:"10 × 40 = 400×"},{q:"اذكري تركيبين يظهران في الخلية النباتية ولا يظهران في الحيوانية.",a:"الجدار الخلوي والبلاستيدات الخضراء."},
   {q:"لماذا لا تظهر نواة في خلايا الدم الحمراء؟",a:"لأنّ خلايا الدم الحمراء الناضجة في الإنسان تفقد نواتها لتتّسع لكمّية أكبر من الهيموغلوبين."},{q:"رتّبي أطوار الانقسام المتساوي كما شاهدتِها في قمّة جذر البصل.",a:"الطور التمهيدي ← الاستوائي ← الانفصالي ← النهائي (ويسبقها الطور البيني)."},
   {q:"ما الفرق بين الخلية البكتيرية وخلية الخميرة؟",a:"الخلية البكتيرية بدائية النواة (لا نواة حقيقية)، أمّا الخميرة فحقيقية النواة."}],
  concl:"المجهر الضوئي يكشف تركيب الخلايا والكائنات الدقيقة؛ وتختلف الخلايا النباتية عن الحيوانية بالجدار الخلوي والبلاستيدات، والبكتيريا خلايا بدائية النواة."}});

/* ===== 3) الكشف عن النشا ===== */
const FD={bread:["الخبز",1,"#e8c88a"],pot:["البطاطا",1,"#f0dfa8"],rice:["الأرز",1,"#f5f2e8"],apple:["التفّاح",0,"#f3e6b8"],milk:["الحليب",0,"#fbfbf6"],sug:["السكّر",0,"#ffffff"],egg:["بياض البيض",0,"#f6f2dc"]};
VLab.reg({id:"b9-starch",icon:"🍞",preview:{d:3},grade:"الصف التاسع",subject:"العلوم الحياتية",unit:"الوحدة 2",src:"كتاب الأنشطة ص38",
 title:"الكشف عن النشا",question:"أيّ الأغذية تحتوي على النشا؟ وكيف نكشف عنه بمحلول اليود؟",
 vars:[{k:"f",label:"الغذاء",type:"seg",val:"bread",c:"#7A1F2E",opts:Object.keys(FD).map(k=>[k,FD[k][0]])},{k:"d",label:"قطرات محلول اليود",unit:"قطرة",min:0,max:5,step:1,val:0,c:"#B8902A",ticks:[0,1,2,3,4,5]}],
 read(s){const F=FD[s.f];return[{label:"اللون بعد إضافة اليود",val:s.d?F[1]?"أزرق مسودّ":"بنّي محمرّ (لون اليود)":"—"},{label:"النتيجة",val:s.d?F[1]?"يحتوي على النشا ✔":"لا يحتوي على النشا ✘":"أضيفي قطرات اليود"}]},
 draw(c,s,t,dt,S){const F=FD[S.f];const k=Math.min(1,s.d/2.5);
  c.fillStyle="#f2f2f4";rr(c,250,320,460,140,20);c.fill();c.strokeStyle="#c9ccd3";c.lineWidth=3;c.stroke();
  Object.keys(FD).forEach((key,i)=>{const x=290+i*64,y=390;c.fillStyle="#e1e3e8";c.beginPath();c.arc(x,y,26,0,7);c.fill();
   const sel=key===S.f;const done=sel?k:0;const base=FD[key][2].match(/\w\w/g).map(h=>parseInt(h,16));const tgt=FD[key][1]?[25,20,60]:[170,90,30];c.fillStyle=rgb(mix(base,tgt,done));c.beginPath();c.arc(x,y,18,0,7);c.fill();
   if(sel){c.strokeStyle="#B8902A";c.lineWidth=3;c.beginPath();c.arc(x,y,30,0,7);c.stroke()}});
  const sx=290+Object.keys(FD).indexOf(S.f)*64;c.fillStyle="#7a4a1a";rr(c,sx-12,140,24,70,6);c.fill();c.fillStyle="#333";rr(c,sx-16,120,32,26,8);c.fill();
  if(Math.abs(s.d-S.d)>.05){const y=220+((t*300)%140);c.fillStyle="#a0521a";c.beginPath();c.ellipse(sx,y,5,8,0,0,7);c.fill()}
  label(c,sx,104,"محلول اليود","#f3dfa8",18);label(c,480,GY+24,"طبق الاختبار الخزفي: "+F[0],"#f3dfa8",20);
  card(c,W-250,96,220,100,"اللون",s.d?F[1]?"أزرق مسودّ":"بنّي محمرّ":"—",null)},
 challenges:[{t:"اكشفي النشا في البطاطا",test:s=>s.f==="pot"&&s.d>0},{t:"اختبري الأغذية السبعة",test:(s,h)=>h.f.size>=7},{t:"جدي غذاءً لا يحتوي على النشا",test:s=>s.d>0&&!FD[s.f][1]},{t:"سجّلي 5 قراءات",test:(s,h,r)=>r.length>=5}],
 notebook:{goal:"أكشف عن وجود النشا في بعض الأغذية باستخدام محلول اليود.",mats:"عيّنات أغذية، محلول اليود، طبق خزفي، قطّارة.",
  steps:["اختاري غذاءً، ثمّ أضيفي قطرات اليود.","سجّلي اللون الناتج.","كرّري مع الأغذية السبعة، وصنّفيها إلى أغذية تحتوي على النشا وأخرى لا تحتوي عليه."],
  questions:[{q:"ما اللون الذي يدلّ على وجود النشا عند إضافة اليود؟",a:"الأزرق المسودّ."},{q:"صنّفي: الخبز، الحليب، الأرز، السكّر.",a:"تحتوي على النشا: الخبز والأرز. لا تحتوي: الحليب والسكّر."},
   {q:"لماذا يبقى لون اليود بنّيًّا محمرًّا مع السكّر؟",a:"لأنّ السكّر (السكروز) سكّر بسيط ليس نشا، فلا يتفاعل مع اليود."},{q:"إلى أيّ مجموعة غذائية ينتمي النشا؟ وما وظيفته في الجسم؟",a:"إلى الكربوهيدرات المعقّدة، ووظيفته تزويد الجسم بالطاقة."}],
  concl:"يتحوّل لون محلول اليود من البنّي المحمرّ إلى الأزرق المسودّ عند وجود النشا، وهو كربوهيدرات معقّدة في الحبوب والبطاطا."}});

/* ===== 4) أثر درجة الحرارة في الانتشار ===== */
let dT0=0,dTemp=null;
VLab.reg({id:"b9-diffusion",icon:"🫖",grade:"الصف التاسع",subject:"العلوم الحياتية",unit:"الوحدة 2: الخلية",src:"كتاب الأنشطة ص30",
 title:"أثر درجة الحرارة في عملية الانتشار",question:"كيف تؤثّر درجة الحرارة في سرعة انتشار جزيئات الصبغة في الماء؟",
 vars:[{k:"T",label:"درجة حرارة الماء",unit:"°C",min:5,max:80,step:5,val:20,c:"#e04848",ticks:[5,20,40,60,80]}],
 reset(){dTemp=null},
 read(s){const D=.4+s.T/20;const tu=Math.round(120/D);return[{label:"درجة الحرارة",val:s.T,unit:"°C"},{label:"الزمن التقريبي لتجانس اللون",val:tu,unit:"ثانية"},{label:"سرعة حركة الجزيئات",val:s.T<20?"بطيئة":s.T<50?"متوسّطة":"سريعة"}]},
 draw(c,s,t,dt,S){if(dTemp!==S.T){dTemp=S.T;dT0=t}const el=t-dT0;const D=.4+S.T/20;const r=Math.min(1,Math.sqrt(el*D/120))*1;
  const bx=300,by=200,bw=360,bh=260;const wcol=mix([180,215,245],[245,200,190],(S.T-5)/75);c.fillStyle=rgb(wcol);c.globalAlpha=.45;c.fillRect(bx+4,by+30,bw-8,bh-34);c.globalAlpha=1;
  for(let i=0;i<260;i++){const a=rnd(i)*6.283,rad=Math.sqrt(-2*Math.log(rnd(i+7)+1e-6))*.45;const sp=r;const jx=Math.sin(t*D*2+i)*3,jy=Math.cos(t*D*1.7+i)*3;
   let x=bx+bw/2+Math.cos(a)*rad*sp*bw*.8+jx,y=by+bh-40-Math.abs(Math.sin(a))*rad*sp*(bh-60)*1.1+jy;x=Math.max(bx+8,Math.min(bx+bw-8,x));y=Math.max(by+34,Math.min(by+bh-8,y));c.fillStyle="rgba(140,30,150,.55)";c.beginPath();c.arc(x,y,4,0,7);c.fill()}
  c.strokeStyle="rgba(230,240,255,.8)";c.lineWidth=4;c.beginPath();c.moveTo(bx,by);c.lineTo(bx,by+bh);c.lineTo(bx+bw,by+bh);c.lineTo(bx+bw,by);c.stroke();
  // ميزان حرارة
  const tx=bx+bw-40;c.fillStyle="#eee";rr(c,tx-7,by-60,14,200,7);c.fill();c.fillStyle="#e04848";c.beginPath();c.arc(tx,by+148,13,0,7);c.fill();c.fillRect(tx-4,by+140-(S.T/80)*190,8,(S.T/80)*190);
  ltr(c,()=>label(c,tx+40,by-60,s.T.toFixed(0)+"°C","#ff8a65",22));if(S.T>55)for(let i=0;i<5;i++){const f=(t*.5+i/5)%1;c.strokeStyle="rgba(255,255,255,"+(.4*(1-f))+")";c.lineWidth=3;c.beginPath();c.moveTo(bx+60+i*60,by+20-f*60);c.quadraticCurveTo(bx+70+i*60,by-f*60,bx+60+i*60,by-20-f*60);c.stroke()}
  card(c,40,96,220,100,"الزمن المنقضي",el.toFixed(0)+" s",null);card(c,40,212,220,110,"درجة التجانس",Math.round(r*100)+"%",r,"#c070d0");
  label(c,bx+bw/2,GY+24,"قطرة صبغة في كأس ماء","#f3dfa8",20)},
 challenges:[{t:"قارني الماء البارد بالساخن",test:(s,h)=>[...h.T].some(v=>v<=10)&&[...h.T].some(v=>v>=60)},{t:"جرّبي 4 درجات حرارة",test:(s,h)=>h.T.size>=4},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أدرس أثر درجة الحرارة في سرعة انتشار جزيئات الصبغة في الماء.",mats:"كؤوس زجاجية، ماء بدرجات حرارة مختلفة، صبغة طعام أو برمنغنات البوتاسيوم، ميزان حرارة، ساعة توقيت.",
  steps:["اختاري درجة حرارة، وراقبي انتشار الصبغة (يبدأ العدّ عند تغيير الحرارة).","سجّلي الزمن التقريبي لتجانس اللون.","كرّري بدرجات حرارة مختلفة، وقارني."],
  questions:[{q:"ما العلاقة بين درجة الحرارة وسرعة الانتشار؟",a:"علاقة طردية: كلّما ارتفعت درجة الحرارة زادت سرعة الانتشار."},{q:"فسّري هذه العلاقة بالنظرية الحركية الجزيئية.",a:"ارتفاع الحرارة يزيد الطاقة الحركية للجزيئات فتتحرّك أسرع وتنتشر أسرع من المنطقة الأعلى تركيزًا إلى الأقلّ."},
   {q:"عرّفي الانتشار.",a:"انتقال جزيئات المادّة من المنطقة الأعلى تركيزًا إلى المنطقة الأقلّ تركيزًا."},{q:"اذكري مثالًا على الانتشار في جسم الإنسان.",a:"انتشار الأكسجين من الحويصلات الهوائية إلى الدم في الرئتين."}],
  concl:"تزداد سرعة الانتشار بارتفاع درجة الحرارة لزيادة الطاقة الحركية للجزيئات."}});

/* ===== 5) معدّل التبريد وحجم البلّورات ===== */
VLab.reg({id:"e10-crystals",icon:"💎",preview:{r:20,t:100},grade:"الصف العاشر",subject:"علوم الأرض",unit:"الوحدة 1: الصخور",src:"كتاب الأنشطة ص7",
 title:"علاقة معدّل التبريد بحجم البلّورات",question:"كيف يؤثّر معدّل تبريد الصهارة في حجم البلّورات المتكوّنة؟",
 vars:[{k:"r",label:"معدّل التبريد",unit:"",min:1,max:100,step:1,val:50,c:"#2b7bd6",ticks:[1,50,100]},{k:"t",label:"زمن التبلور",unit:"%",min:0,max:100,step:1,val:100,c:"#B8902A",ticks:[0,50,100]}],
 read(s){const n=Math.round(6+s.r*1.6),sz=(60/Math.sqrt(n)).toFixed(1);return[{label:"عدد البلّورات",val:s.r>95?"لا تتكوّن بلّورات":n},{label:"متوسّط حجم البلّورة",val:s.r>95?"—":sz,unit:s.r>95?"":"mm"},
  {label:"النسيج",val:s.r<25?"خشن الحبيبات":s.r<=95?"ناعم الحبيبات":"زجاجي"},{label:"صخر مشابه",val:s.r<25?"الجرانيت (جوفي)":s.r<=95?"البازلت (بركاني)":"الأوبسيديان (زجاج بركاني)"}]},
 draw(c,s,t,dt,S){const cx=480,cy=300,R=170;const n=Math.round(6+S.r*1.6);const f=s.t/100;
  c.fillStyle="#2a2d35";c.beginPath();c.ellipse(cx,cy+R+10,R+30,26,0,0,7);c.fill();c.save();c.beginPath();c.arc(cx,cy,R,0,7);c.clip();
  const melt=mix([255,140,40],[60,40,45],Math.min(1,f*1.2));c.fillStyle=rgb(melt);c.fillRect(cx-R,cy-R,2*R,2*R);
  if(S.r>95){c.fillStyle="rgba(20,15,20,"+f+")";c.fillRect(cx-R,cy-R,2*R,2*R);c.fillStyle="rgba(255,255,255,"+.25*f+")";c.beginPath();c.ellipse(cx-50,cy-60,90,30,-.5,0,7);c.fill()}
  else{const seeds=[...Array(n)].map((_,i)=>[cx+(rnd(i)-.5)*2*R,cy+(rnd(i+300)-.5)*2*R,rnd(i+600)*3]);const maxR=R*2/Math.sqrt(n)*.85;
   seeds.forEach(([x,y,a],i)=>{const rr2=maxR*Math.min(1,f*1.15)*(.7+rnd(i+900)*.5);if(rr2<1)return;const col=["#e8e2d8","#3a3a42","#d8b8a8","#f4f4f0","#7a6a5a"][i%5];
    c.fillStyle=col;c.strokeStyle="rgba(0,0,0,.35)";c.lineWidth=1;c.beginPath();for(let k=0;k<6;k++){const an=a+k*Math.PI/3;const q=rr2*(k%2?1:.8);k?c.lineTo(x+Math.cos(an)*q,y+Math.sin(an)*q):c.moveTo(x+Math.cos(an)*q,y+Math.sin(an)*q)}c.closePath();c.fill();c.stroke()})}
  c.restore();c.strokeStyle="#B8902A";c.lineWidth=5;c.beginPath();c.arc(cx,cy,R,0,7);c.stroke();
  label(c,cx,GY+28,S.r<25?"تبريد بطيء في باطن الأرض":S.r<=95?"تبريد سريع على سطح الأرض":"تبريد مفاجئ جدًّا","#f3dfa8",20);
  card(c,40,96,230,100,"عدد البلّورات",S.r>95?"0":String(n),null);card(c,W-270,96,230,100,"النسيج",S.r<25?"خشن":S.r<=95?"ناعم":"زجاجي",null)},
 challenges:[{t:"كوّني بلّورات كبيرة (مثل الجرانيت)",test:s=>s.r<25&&s.t>=95},{t:"كوّني نسيجًا زجاجيًّا",test:s=>s.r>95&&s.t>=95},{t:"قارني 3 معدّلات تبريد",test:(s,h)=>h.r.size>=4},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أستنتج العلاقة بين معدّل تبريد الصهارة وحجم البلّورات المتكوّنة.",mats:"مادّة السالول أو الشبّة، شرائح زجاجية، ماء ساخن وبارد، عدسة مكبّرة.",
  steps:["اختاري معدّل تبريد بطيئًا، وحرّكي زمن التبلور من 0 إلى 100.","سجّلي عدد البلّورات وحجمها.","كرّري بمعدّل تبريد سريع ثمّ سريع جدًّا."],
  questions:[{q:"ما العلاقة بين معدّل التبريد وحجم البلّورات؟",a:"عكسية: كلّما كان التبريد أبطأ كانت البلّورات أكبر وأقلّ عددًا."},{q:"لماذا يتكوّن الجرانيت ببلّورات كبيرة؟",a:"لأنّ صهارته بردت ببطء في باطن الأرض، فتوفّر وقت كافٍ لنموّ البلّورات."},
   {q:"لماذا لا تتكوّن بلّورات في الأوبسيديان؟",a:"لأنّ الحمم بردت بسرعة كبيرة جدًّا فلم يتوفّر وقت لترتيب الذرّات في بلّورات."}],
  concl:"كلّما قلّ معدّل تبريد الصهارة زاد حجم البلّورات؛ فالصخور الجوفية خشنة الحبيبات، والبركانية ناعمة أو زجاجية."}});

/* ===== 6) المسامية والنفاذية ===== */
const SED={gr:["حصى",.30,1,22,"#9a8f80"],sa:["رمل",.35,.35,8,"#d9bf7a"],cl:["طين",.45,.02,3,"#8a5a40"],mx:["رمل وطين",.22,.08,5,"#b08a5a"]};
VLab.reg({id:"e9-porosity",icon:"🪨",preview:{m:"sa",t:60},grade:"الصف التاسع",subject:"علوم الأرض",unit:"الوحدة 2: المياه",src:"كتاب الأنشطة ص24",
 title:"نمذجة المسامية والنفاذية",question:"أيّ أنواع الرواسب تحتفظ بالماء أكثر؟ وأيّها يسمح بمروره أسرع؟",
 vars:[{k:"m",label:"نوع الرواسب",type:"seg",val:"gr",c:"#7A1F2E",opts:Object.keys(SED).map(k=>[k,SED[k][0]])},{k:"t",label:"الزمن",unit:"s",min:0,max:120,step:5,val:0,c:"#2b7bd6",ticks:[0,60,120]}],
 read(s){const S2=SED[s.m];const out=Math.min(100*(1-S2[1]),100*(1-S2[1])*Math.min(1,s.t*S2[2]/40));return[{label:"الماء المسكوب",val:100,unit:"mL"},{label:"الماء النافذ إلى الكأس",val:out.toFixed(0),unit:"mL"},{label:"المسامية (الماء المحتجز)",val:Math.round(S2[1]*100),unit:"%"},{label:"النفاذية",val:S2[2]>.5?"عالية":S2[2]>.2?"متوسّطة":S2[2]>.05?"منخفضة":"ضعيفة جدًّا"}]},
 draw(c,s,t,dt,S){const S2=SED[S.m];const cx=480,top=110,hh=230,w=170;const fr=Math.min(1,s.t*S2[2]/40);const wet=Math.min(1,s.t*Math.max(S2[2],.06)/12);
  c.fillStyle="rgba(230,240,255,.12)";c.fillRect(cx-w/2,top,w,hh);
  const gs=S2[3];for(let i=0;i<Math.min(900,(w*hh)/(gs*gs*1.6));i++){const x=cx-w/2+gs/2+rnd(i)*(w-gs),y=top+40+rnd(i+77)*(hh-46);c.fillStyle=S.m==="mx"&&i%3===0?"#8a5a40":S2[4];c.beginPath();c.arc(x,y,gs/2*(.75+rnd(i+5)*.4),0,7);c.fill()}
  c.fillStyle="rgba(60,140,230,.35)";c.fillRect(cx-w/2,top+40,w,(hh-46)*wet);
  if(s.t<20){c.fillStyle="rgba(60,140,230,.6)";c.fillRect(cx-w/2+2,top+6,w-4,34*(1-s.t/20))}
  c.strokeStyle="rgba(230,240,255,.8)";c.lineWidth=4;c.strokeRect(cx-w/2,top,w,hh);c.fillStyle="#ddd";c.fillRect(cx-w/2,top+hh,w,8);c.beginPath();c.moveTo(cx-20,top+hh+8);c.lineTo(cx,top+hh+30);c.lineTo(cx+20,top+hh+8);c.fill();
  const flow=S2[2]*(fr<1&&wet>=1?1:0);if(flow>0&&s.t>0){for(let i=0;i<4;i++){const y=top+hh+34+((t*200*Math.max(.2,flow)+i*25)%60);c.fillStyle="rgba(60,140,230,.9)";c.beginPath();c.ellipse(cx,y,4,7,0,0,7);c.fill()}}
  const by=GY-100;c.strokeStyle="rgba(230,240,255,.8)";c.lineWidth=3;c.strokeRect(cx-60,by,120,100);const out=(1-S2[1])*fr;c.fillStyle="rgba(60,140,230,.55)";c.fillRect(cx-58,by+100-out*96,116,out*96);
  label(c,cx+170,top+hh/2,SED[S.m][0],"#f3dfa8",24);card(c,40,96,230,100,"المسامية",Math.round(S2[1]*100)+"%",null);card(c,W-270,96,230,110,"الماء النافذ",Math.round(out*100)+" mL",out,"#5aa0ff")},
 challenges:[{t:"جدي الرواسب الأعلى نفاذية",test:s=>s.m==="gr"&&s.t>=30},{t:"جدي الرواسب الأعلى مسامية",test:s=>s.m==="cl"&&s.t>=30},{t:"قارني الأنواع الأربعة",test:(s,h)=>h.m.size>=4},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أنمذج المسامية والنفاذية لأنواع مختلفة من الرواسب، وأقارن بينها.",mats:"أسطوانات بلاستيكية، حصى، رمل، طين، ماء، كؤوس مدرّجة، ساعة توقيت.",
  steps:["اختاري نوع الرواسب، ثمّ حرّكي الزمن تدريجيًّا.","سجّلي حجم الماء النافذ بعد 60 s والمسامية.","كرّري مع الأنواع الأربعة، وقارني."],
  questions:[{q:"عرّفي المسامية والنفاذية.",a:"المسامية: نسبة حجم الفراغات إلى الحجم الكلّي للصخر. النفاذية: قدرة الصخر على السماح للماء بالمرور عبر فراغاته المتّصلة."},
   {q:"لماذا للطين مسامية عالية ونفاذية ضعيفة؟",a:"لأنّ فراغاته كثيرة لكنّها صغيرة جدًّا وغير متّصلة جيّدًا، فيحتجز الماء ولا يسمح بمروره."},{q:"لماذا قلّت مسامية خليط الرمل والطين؟",a:"لأنّ حبيبات الطين الصغيرة ملأت الفراغات بين حبيبات الرمل."},
   {q:"أيّ الرواسب أنسب لتكوين خزّان مياه جوفية؟",a:"الحصى والرمل؛ لأنّ مساميتها ونفاذيتها مناسبتان لتخزين الماء ومروره."}],
  concl:"تعتمد المسامية على حجم الفراغات، وتعتمد النفاذية على حجمها واتّصالها؛ فالحصى عالي النفاذية والطين عالي المسامية ضعيف النفاذية."}});

/* ===== 7) ألوان النجوم ===== */
function bb(T){const t=T/100;let r,g2,b;if(t<=66){r=255;g2=99.47*Math.log(t)-161.1;b=t<=19?0:138.5*Math.log(t-10)-305}else{r=329.7*Math.pow(t-60,-.1332);g2=288.1*Math.pow(t-60,-.0755);b=255}return[r,g2,b].map(v=>Math.round(Math.max(0,Math.min(255,v))))}
const cls=T=>T>=30000?"O":T>=10000?"B":T>=7500?"A":T>=6000?"F":T>=5200?"G":T>=3700?"K":"M";
VLab.reg({id:"e10-stars",icon:"⭐",preview:{T:9000},grade:"الصف العاشر",subject:"علوم الأرض",unit:"الوحدة 2: النجوم",src:"كتاب الأنشطة ص20",
 title:"الكشف عن ألوان النجوم",question:"ما العلاقة بين لون النجم ودرجة حرارة سطحه؟",
 vars:[{k:"T",label:"درجة حرارة سطح النجم",unit:"K",min:3000,max:30000,step:500,val:5500,c:"#e86a2a",ticks:[3000,10000,20000,30000]}],
 read(s){const lp=2.898e6/s.T;return[{label:"اللون الظاهري",val:s.T<3700?"أحمر":s.T<5200?"برتقالي":s.T<6000?"أصفر":s.T<7500?"أبيض مصفرّ":s.T<10000?"أبيض":"أزرق"},{label:"الصنف الطيفي",val:cls(s.T)},
  {label:"الطول الموجي للإشعاع الأعظم",val:Math.round(lp),unit:"nm"},{label:"مثال",val:s.T<3700?"منكب الجوزاء":s.T<5200?"الدبران":s.T<6000?"الشمس":s.T<10000?"الشعرى اليمانية":"رجل الجبّار"}]},
 draw(c,s,t){const col=bb(s.T);const cx=260,cy=290,R=90+Math.sin(t*2)*3;const gl=c.createRadialGradient(cx,cy,10,cx,cy,R*2.4);gl.addColorStop(0,"rgba("+col.join(",")+",1)");gl.addColorStop(.4,"rgba("+col.join(",")+",.6)");gl.addColorStop(1,"rgba("+col.join(",")+",0)");
  c.fillStyle=gl;c.beginPath();c.arc(cx,cy,R*2.4,0,7);c.fill();c.fillStyle=rgb(mix(col,[255,255,255],.35));c.beginPath();c.arc(cx,cy,R*.8,0,7);c.fill();
  for(let i=0;i<40;i++){c.fillStyle="rgba(255,255,255,"+(.3+.5*rnd(i))+")";c.fillRect(rnd(i+3)*W,rnd(i+9)*360+60,2,2)}
  label(c,cx,GY+24,"الصنف الطيفي: "+cls(s.T),"#f3dfa8",22);
  // منحنى بلانك
  const gx=480,gy=110,gw=430,gh=280;c.fillStyle="rgba(20,10,14,.85)";rr(c,gx-30,gy-30,gw+50,gh+80,14);c.fill();label(c,gx+gw/2,gy-12,"شدّة الإشعاع مقابل الطول الموجي","#f3dfa8",17);
  for(let l=380;l<=750;l+=5){const X=gx+(l-100)/(2000-100)*gw;c.fillStyle="hsl("+(270-(l-380)/370*270)+",90%,55%)";c.globalAlpha=.35;c.fillRect(X,gy,gw/(1900/5)+1,gh);c.globalAlpha=1}
  const P=(l,T)=>{const x=l*1e-9;return 1/(x**5*(Math.exp(1.4388e-2/(x*T))-1))};const mx=P(2.898e6/30000,30000);
  c.strokeStyle=rgb(col);c.lineWidth=3;c.beginPath();for(let l=100;l<=2000;l+=10){const X=gx+(l-100)/1900*gw,Y=gy+gh-Math.pow(P(l,s.T)/mx,.3)*gh;l>100?c.lineTo(X,Y):c.moveTo(X,Y)}c.stroke();
  const lp=2.898e6/s.T;if(lp<=2000){const X=gx+(lp-100)/1900*gw;c.strokeStyle="#fff";c.setLineDash([4,4]);c.beginPath();c.moveTo(X,gy);c.lineTo(X,gy+gh);c.stroke();c.setLineDash([])}
  ltr(c,()=>{label(c,gx,gy+gh+16,"100","#cfd5de",14);label(c,gx+gw,gy+gh+16,"2000 nm","#cfd5de",14);label(c,gx+(560-100)/1900*gw,gy+gh+16,"الضوء المرئي","#fff",13)});
  ltr(c,()=>card(c,40,96,170,96,"الحرارة",s.T.toFixed(0)+" K",null))},
 challenges:[{t:"اجعلي النجم أحمر",test:s=>s.T<3700},{t:"اجعلي النجم أزرق",test:s=>s.T>=10000},{t:"جدي درجة حرارة الشمس",test:s=>s.T>=5500&&s.T<=6000},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أستنتج العلاقة بين لون النجم ودرجة حرارة سطحه.",mats:"مصباح بمنظّم شدّة (ديمر)، سلك تنغستن، منشور أو محزوز حيود.",
  steps:["حرّكي درجة الحرارة من 3000 K إلى 30000 K وراقبي لون النجم.","سجّلي اللون والصنف الطيفي والطول الموجي للإشعاع الأعظم.","لاحظي كيف تنتقل قمّة المنحنى نحو الأطوال الموجية القصيرة بارتفاع الحرارة."],
  questions:[{q:"رتّبي ألوان النجوم من الأبرد إلى الأسخن.",a:"أحمر، برتقالي، أصفر، أبيض، أزرق."},{q:"ما العلاقة بين درجة الحرارة والطول الموجي للإشعاع الأعظم؟",a:"عكسية: كلّما ارتفعت الحرارة قصر الطول الموجي للإشعاع الأعظم."},
   {q:"ما الصنف الطيفي للشمس؟ وما لونها؟",a:"الصنف G، ولونها أصفر (حرارة سطحها نحو 5800 K)."},{q:"لماذا يبدو النجم الساخن جدًّا أزرق؟",a:"لأنّ أعلى شدّة لإشعاعه تقع في الأطوال الموجية القصيرة (الأزرق والبنفسجي وفوق البنفسجي)."}],
  concl:"لون النجم يدلّ على درجة حرارة سطحه: النجوم الحمراء أبرد، والزرقاء أسخن، وتتّبع أصنافًا طيفية O B A F G K M."}});

/* ===== 8) الحدود المتباعدة ===== */
VLab.reg({id:"s8-divergent",icon:"🌋",preview:{t:70},grade:"الصف الثامن",subject:"العلوم",unit:"الوحدة 4: الأرض",src:"كتاب الأنشطة ص42",
 title:"آليّة حركة الصفائح عند الحدود المتباعدة",question:"ماذا يحدث عندما تتباعد صفيحتان؟ وكيف يتكوّن قاع محيط جديد؟",
 vars:[{k:"t",label:"الزمن",unit:"مليون سنة",min:0,max:10,step:.5,val:0,c:"#B8902A",ticks:[0,5,10]},{k:"v",label:"سرعة التباعد",unit:"cm/سنة",min:1,max:10,step:1,val:4,c:"#e04848",ticks:[1,5,10]}],
 read(s){const km=s.v*s.t*10;return[{label:"المسافة التي ابتعدتها كلّ صفيحة",val:(km/2).toFixed(0),unit:"km"},{label:"عرض القاع الجديد",val:km.toFixed(0),unit:"km"},{label:"الأشرطة المغناطيسية",val:Math.floor(s.t)*2+" شريطًا متماثلًا"},{label:"المعلم المتكوّن",val:s.t<1?"صدع (أخدود)":s.t<4?"بحر ضيّق":"محيط وحيد وسط محيطي"}]},
 draw(c,s,t){const cx=480,sea=270,crust=330;const w=Math.min(380,s.v*s.t*7);const half=w/2;
  c.fillStyle="#c8743b";c.fillRect(0,crust+40,W,GY-crust-40);for(let i=0;i<5;i++){const f=(t*.15+i/5)%1;c.strokeStyle="rgba(255,190,90,.35)";c.lineWidth=3;c.beginPath();c.arc(cx-200,GY+40,80+f*160,Math.PI*1.1,Math.PI*1.9);c.stroke();c.beginPath();c.arc(cx+200,GY+40,80+f*160,Math.PI*1.1,Math.PI*1.9);c.stroke()}
  if(half>5){c.fillStyle="rgba(40,110,200,.7)";c.fillRect(cx-half-20,sea,2*half+40,crust-sea)}
  const n=Math.floor(s.t*2);for(let k=0;k<n;k++){const x=half*(k+1)/Math.max(n,1);const ww=half/Math.max(n,1);c.fillStyle=k%2?"#2a2a30":"#e8e8ea";c.fillRect(cx+x-ww,crust,ww,40);c.fillRect(cx-x,crust,ww,40)}
  c.fillStyle="#7a6a5a";c.fillRect(0,crust,cx-half,40);c.fillRect(cx+half,crust,W-cx-half,40);c.fillStyle="#6a8a4a";c.fillRect(0,crust-40,cx-half-20,40);c.fillRect(cx+half+20,crust-40,W-cx-half-20,40);
  c.fillStyle="#ff6a1a";c.beginPath();c.moveTo(cx-14,GY);c.quadraticCurveTo(cx,crust+60,cx-6,crust+4);c.lineTo(cx+6,crust+4);c.quadraticCurveTo(cx,crust+60,cx+14,GY);c.fill();
  for(let i=0;i<5;i++){const f=(t*.6+i/5)%1;c.fillStyle="rgba(255,220,120,"+(1-f)+")";c.beginPath();c.arc(cx+Math.sin(i*2+t)*6,GY-f*(GY-crust),4,0,7);c.fill()}
  VLab.arrow(c,cx-half-40,crust-60,cx-half-130,crust-60,"#fff",4);VLab.arrow(c,cx+half+40,crust-60,cx+half+130,crust-60,"#fff",4);
  label(c,180,crust-70,"صفيحة","#f3dfa8",20);label(c,W-180,crust-70,"صفيحة","#f3dfa8",20);label(c,cx,GY+24,"صهارة صاعدة تكوّن قشرة محيطية جديدة","#ffb199",19);
  ltr(c,()=>card(c,40,96,230,100,"الزمن",s.t.toFixed(1)+" Myr",null));card(c,W-270,96,230,100,"عرض القاع الجديد",(s.v*s.t*10).toFixed(0)+" km",null)},
 challenges:[{t:"كوّني محيطًا جديدًا",test:s=>s.t>=4},{t:"لاحظي تماثل الأشرطة على جانبي الحيد",test:s=>s.t>=3},{t:"قارني سرعتين مختلفتين",test:(s,h)=>h.v.size>=3},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أنمذج آليّة حركة الصفائح عند الحدود المتباعدة، وتكوّن قاع المحيط الجديد.",mats:"ورق، مقصّ، أقلام ملوّنة، صندوق كرتوني بفتحة.",
  steps:["حرّكي الزمن تدريجيًّا وراقبي تباعد الصفيحتين.","لاحظي صعود الصهارة وتكوّن أشرطة متماثلة على جانبي الحيد.","غيّري سرعة التباعد، وسجّلي عرض القاع الجديد بعد 10 ملايين سنة."],
  questions:[{q:"ما مصدر القشرة المحيطية الجديدة عند الحدود المتباعدة؟",a:"الصهارة الصاعدة من الستار التي تبرد وتتصلّب بين الصفيحتين."},{q:"لماذا تتماثل الأشرطة المغناطيسية على جانبي الحيد؟",a:"لأنّ القشرة الجديدة تتكوّن في المركز ثمّ تتحرّك بالتساوي نحو الجانبين، فتسجّل الصخور على الجانبين اتّجاه المجال المغناطيسي نفسه."},
   {q:"احسبي عرض القاع الجديد إذا كانت سرعة التباعد 5 cm/سنة لمدة 10 ملايين سنة.",a:"5 × 10,000,000 = 50,000,000 cm = 500 km."},{q:"اذكري مثالًا على حدود متباعدة.",a:"حيد وسط المحيط الأطلسي، والبحر الأحمر."}],
  concl:"عند الحدود المتباعدة تبتعد الصفيحتان وتصعد الصهارة لتكوّن قشرة محيطية جديدة، فيتّسع قاع المحيط وتتكوّن أشرطة مغناطيسية متماثلة."}});
})();
