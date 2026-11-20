/* تجارب الفيزياء — المختبر الافتراضي — تصميم وتنفيذ: نوال بني عطية */
(function(){const {W,H,g}=VLab;const {rr,card,label}=g;const GY=468;
const ball=(c,x,y,r,col)=>{const gr=c.createRadialGradient(x-r*.35,y-r*.35,r*.1,x,y,r);gr.addColorStop(0,"#fff");gr.addColorStop(.3,col);gr.addColorStop(1,"#222");c.fillStyle=gr;c.beginPath();c.arc(x,y,r,0,7);c.fill()};
const ltr=(c,f)=>{c.save();c.direction="ltr";f();c.restore()};
function arrow(c,x1,y1,x2,y2,col,w=4){const a=Math.atan2(y2-y1,x2-x1);c.strokeStyle=col;c.fillStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.beginPath();c.moveTo(x2,y2);c.lineTo(x2-14*Math.cos(a-.4),y2-14*Math.sin(a-.4));c.lineTo(x2-14*Math.cos(a+.4),y2-14*Math.sin(a+.4));c.fill()}
VLab.arrow=arrow;

/* ===== 1) المقذوف الأفقي ===== */
const GR={e:[9.8,"الأرض"],m:[1.6,"القمر"],r:[3.7,"المريخ"]};
VLab.reg({id:"p10-projectile",icon:"🎯",preview:{v:3},grade:"الصف العاشر",subject:"الفيزياء",unit:"الوحدة 2: الحركة",src:"كتاب الأنشطة ص17",
 title:"وصف حركة المقذوف الأفقي",question:"كيف يعتمد المدى الأفقي للمقذوف على سرعته الابتدائية وارتفاع نقطة الإطلاق؟",
 vars:[{k:"v",label:"السرعة الأفقية الابتدائية",unit:"m/s",min:.5,max:6,step:.5,val:2,c:"#2b7bd6",ticks:[.5,2,4,6]},
  {k:"h",label:"ارتفاع الطاولة",unit:"m",min:.2,max:1.5,step:.1,val:1,c:"#7A1F2E",ticks:[.2,.5,1,1.5]},
  {k:"g",label:"المكان",type:"seg",val:"e",c:"#B8902A",opts:Object.keys(GR).map(k=>[k,GR[k][1]])}],
 read(s){const G=GR[s.g][0],T=Math.sqrt(2*s.h/G),R=s.v*T,vy=G*T;return[{label:"زمن التحليق",val:T.toFixed(2),unit:"s"},{label:"المدى الأفقي",val:R.toFixed(2),unit:"m"},
  {label:"السرعة الرأسية عند الاصطدام",val:vy.toFixed(2),unit:"m/s"},{label:"مقدار السرعة عند الاصطدام",val:Math.hypot(s.v,vy).toFixed(2),unit:"m/s"}]},
 draw(c,s,t,dt,S){const G=GR[S.g][0],T=Math.sqrt(2*s.h/G),R=s.v*T;const px=Math.min(280/Math.max(s.h,.4),640/Math.max(R,.6),260);const x0=150,y0=GY-s.h*px;
  // الطاولة
  c.fillStyle="#7a5236";c.fillRect(x0-120,y0,120,10);c.fillStyle="#5a3a24";c.fillRect(x0-110,y0+10,10,GY-y0-10);c.fillRect(x0-20,y0+10,10,GY-y0-10);
  // مسطرة أرضية
  c.fillStyle="#e9d9a8";c.fillRect(x0,GY,Math.min(W-x0-20,(Math.ceil(R*1.25*2)/2)*px),12);ltr(c,()=>{for(let m=0;m*px<W-x0-30;m+=R>3?1:.5){c.fillStyle="#3b2a1a";c.fillRect(x0+m*px,GY,2,12);label(c,x0+m*px,GY+26,m+"","#f3dfa8",16)}label(c,W-40,GY+26,"m","#f3dfa8",16)});
  // المسار
  c.strokeStyle="rgba(255,211,77,.35)";c.setLineDash([6,6]);c.lineWidth=2;c.beginPath();for(let k=0;k<=40;k++){const tt=k/40*T;const x=x0+s.v*tt*px,y=y0+.5*G*tt*tt*px;k?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();c.setLineDash([]);
  // صور متتابعة (ومضات)
  const n=8;for(let k=0;k<=n;k++){const tt=k/n*T;const x=x0+s.v*tt*px,y=y0+.5*G*tt*tt*px;c.globalAlpha=.35;ball(c,x,y,9,"#ff8a65");c.globalAlpha=1;
   c.strokeStyle="rgba(122,208,255,.35)";c.lineWidth=1;c.beginPath();c.moveTo(x,y0);c.lineTo(x,y);c.stroke();c.strokeStyle="rgba(255,138,101,.35)";c.beginPath();c.moveTo(x0-4,y);c.lineTo(x,y);c.stroke()}
  // الكرة المتحرّكة
  const cyc=T+1;const tt=Math.min(T,(t%cyc));const bx=x0+s.v*tt*px,by=y0+.5*G*tt*tt*px;ball(c,bx,by-10,12,"#e04848");
  if(tt<T){arrow(c,bx,by-10,bx+s.v*16,by-10,"#7ad0ff",3);arrow(c,bx,by-10,bx,by-10+G*tt*8+2,"#ff8a65",3)}
  ltr(c,()=>label(c,x0+R*px,GY-24,"▼ "+R.toFixed(2)+" m","#ffd34d",20));
  card(c,W-290,100,250,100,"زمن التحليق",T.toFixed(2)+" s",null);label(c,W-165,236,"الأفقية ثابتة · الرأسية تتسارع","#cfd5de",18);
  ltr(c,()=>label(c,x0-60,y0-24,"h = "+s.h.toFixed(1)+" m","#f3dfa8",18))},
 challenges:[{t:"اجعلي المدى أكبر من 2 m",test:s=>{const T=Math.sqrt(2*s.h/GR[s.g][0]);return s.v*T>2}},{t:"اكتشفي أنّ زمن السقوط لا يعتمد على السرعة",test:(s,h)=>h.v.size>=4},
  {t:"أطلقي الكرة على سطح القمر",test:s=>s.g==="m"},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أقيس المدى الأفقي للمقذوف، وأحسبه باستعمال معادلات الحركة، وأقارن بينهما.",mats:"كرة فلزّية، مستوى مائل قصير، طاولة، شريط قياس، ورق كربون.",
  steps:["ثبّتي ارتفاع الطاولة 1 m، وغيّري السرعة الأفقية، وسجّلي زمن التحليق والمدى.","ثبّتي السرعة، وغيّري ارتفاع الطاولة، وسجّلي القراءات.","لاحظي الصور المتتابعة: المسافات الأفقية متساوية والرأسية تتزايد.","جرّبي الإطلاق على القمر والمريخ."],
  questions:[{q:"هل يتغيّر زمن التحليق عند زيادة السرعة الأفقية؟ فسّري.",a:"لا؛ لأنّ زمن السقوط يعتمد على الارتفاع وتسارع الجاذبية فقط: t = √(2h/g)."},
   {q:"لماذا تكون المسافات الأفقية بين الصور المتتابعة متساوية؟",a:"لأنّ السرعة الأفقية ثابتة (لا توجد قوّة أفقية بإهمال مقاومة الهواء)."},
   {q:"احسبي المدى عندما v = 3 m/s و h = 1.25 m على الأرض.",a:"t = √(2×1.25/9.8) ≈ 0.51 s، والمدى = 3 × 0.51 ≈ 1.52 m."},
   {q:"لماذا يكون المدى على سطح القمر أكبر؟",a:"لأنّ تسارع الجاذبية على القمر أصغر، فيزداد زمن التحليق ويزداد المدى."}],
  concl:"المقذوف الأفقي يتحرّك بسرعة أفقية ثابتة وبتسارع رأسي منتظم (g)، فالمدى = v × √(2h/g)."}});

/* ===== 2) القوّة والكتلة والتسارع ===== */
const MU=.1;
VLab.reg({id:"p10-newton2",icon:"🛒",preview:{F:6},grade:"الصف العاشر",subject:"الفيزياء",unit:"الوحدة 3: القوّة والحركة",src:"كتاب الأنشطة ص30",
 title:"القوّة والكتلة والتسارع",question:"كيف يتغيّر تسارع الجسم بتغيّر القوّة المحصّلة المؤثّرة فيه وكتلته؟",
 vars:[{k:"F",label:"القوّة المؤثّرة",unit:"N",min:0,max:10,step:.5,val:4,c:"#e04848",ticks:[0,5,10]},
  {k:"m",label:"كتلة العربة",unit:"kg",min:.5,max:5,step:.5,val:1,c:"#2b7bd6",ticks:[.5,2.5,5]},
  {k:"f",label:"سطح المسار",type:"seg",val:0,c:"#B8902A",opts:[[0,"أملس (بلا احتكاك)"],[1,"خشن (احتكاك)"]]}],
 read(s){const fr=s.f?Math.min(s.F,MU*s.m*9.8):0,Fn=s.F-fr,a=Fn/s.m,tt=a>0?Math.sqrt(2*1.5/a):Infinity;return[{label:"القوّة المحصّلة",val:Fn.toFixed(2),unit:"N"},{label:"التسارع",val:a.toFixed(2),unit:"m/s²"},
  {label:"زمن قطع المسار (1.5 m)",val:isFinite(tt)?tt.toFixed(2):"لا تتحرّك",unit:isFinite(tt)?"s":""},{label:"قوّة الاحتكاك",val:fr.toFixed(2),unit:"N"}]},
 draw(c,s,t,dt,S){const fr=S.f?Math.min(s.F,MU*s.m*9.8):0,a=(s.F-fr)/s.m;const L=1.5,px=480,x0=150,ty=360;
  c.fillStyle=S.f?"#8a6a4a":"#9aa3b5";rr(c,x0-40,ty,px+120,14,4);c.fill();c.fillStyle="#555";c.fillRect(x0-40,ty+14,8,GY-ty-14);c.fillRect(x0+px+70,ty+14,8,GY-ty-14);
  ltr(c,()=>{for(let k=0;k<=1.5;k+=.5){c.fillStyle="#fff";c.fillRect(x0+k/L*px,ty+14,2,10);label(c,x0+k/L*px,ty+38,k+" m","#f3dfa8",15)}});
  const T=a>0?Math.sqrt(2*L/a):0;const cyc=T+1;const tt=a>0?Math.min(T,t%cyc):0;const x=a>0?.5*a*tt*tt:0;const cx=x0+x/L*px;
  // شريط المؤقّت (نقاط كل 0.1 s)
  if(a>0)for(let k=0;k*.1<=tt;k++){const xx=x0+.5*a*(k*.1)**2/L*px;c.fillStyle="#ffd34d";c.beginPath();c.arc(xx,ty-6,3,0,7);c.fill()}
  const cw=60+s.m*10,ch=34+s.m*4;c.fillStyle="#7A1F2E";rr(c,cx-cw/2,ty-ch-10,cw,ch,8);c.fill();c.fillStyle="#B8902A";c.fillRect(cx-cw/2+6,ty-ch-4,cw-12,6);
  c.fillStyle="#222";[cx-cw/3,cx+cw/3].forEach(w=>{c.beginPath();c.arc(w,ty-8,9,0,7);c.fill()});ltr(c,()=>label(c,cx,ty-ch/2-8,s.m.toFixed(1)+" kg","#fff",17));
  if(s.F>0)arrow(c,cx+cw/2,ty-ch/2-10,cx+cw/2+s.F*12,ty-ch/2-10,"#ff5c5c",5);if(fr>0)arrow(c,cx-cw/2,ty-14,cx-cw/2-fr*12,ty-14,"#7ad0ff",4);
  card(c,W-290,96,250,100,"التسارع",a.toFixed(2)+" m/s²",null);
  // منحنى السرعة-الزمن
  const gx=120,gy=110,gw=330,gh=150;c.fillStyle="rgba(20,10,14,.8)";rr(c,gx-30,gy-24,gw+50,gh+50,12);c.fill();label(c,gx+gw/2,gy-8,"منحنى السرعة–الزمن","#f3dfa8",17);
  c.strokeStyle="rgba(255,255,255,.3)";c.lineWidth=1.5;c.beginPath();c.moveTo(gx,gy+6);c.lineTo(gx,gy+gh);c.lineTo(gx+gw,gy+gh);c.stroke();
  if(a>0){const vm=a*T;c.strokeStyle="#ffd34d";c.lineWidth=3;c.beginPath();c.moveTo(gx,gy+gh);c.lineTo(gx+tt/Math.max(T,.01)*gw,gy+gh-(a*tt)/Math.max(vm,.01)*(gh-14));c.stroke();ltr(c,()=>label(c,gx+gw/2,gy+gh+16,"الميل = التسارع","#cfd5de",15))}},
 challenges:[{t:"ضاعفي القوّة ولاحظي التسارع",test:(s,h)=>h.F.size>=3},{t:"ضاعفي الكتلة بالقوّة نفسها",test:(s,h)=>h.m.size>=3},{t:"اجعلي العربة لا تتحرّك على السطح الخشن",test:s=>s.f&&s.F>0&&s.F<=MU*s.m*9.8},{t:"سجّلي 5 قراءات",test:(s,h,r)=>r.length>=5}],
 notebook:{goal:"أستقصي العلاقة بين القوّة المحصّلة وكتلة الجسم وتسارعه (القانون الثاني لنيوتن).",mats:"عربة، مسار، بكرة، أثقال، مؤقّت شريطي أو مجسّ حركة.",
  steps:["على السطح الأملس ثبّتي الكتلة 1 kg، وغيّري القوّة (2، 4، 6، 8 N) وسجّلي التسارع.","ثبّتي القوّة 6 N، وغيّري الكتلة (1، 2، 3 kg) وسجّلي التسارع.","لاحظي نقاط المؤقّت الشريطي: تتباعد لأنّ السرعة تزداد.","جرّبي السطح الخشن وقارني."],
  questions:[{q:"ماذا يحدث للتسارع عند مضاعفة القوّة المحصّلة مع ثبات الكتلة؟",a:"يتضاعف التسارع؛ فالتسارع يتناسب طرديًّا مع القوّة المحصّلة."},
   {q:"ماذا يحدث للتسارع عند مضاعفة الكتلة مع ثبات القوّة؟",a:"يقلّ التسارع إلى النصف؛ فالتسارع يتناسب عكسيًّا مع الكتلة."},
   {q:"احسبي تسارع عربة كتلتها 2 kg تؤثّر فيها قوّة محصّلة 6 N.",a:"a = F/m = 6/2 = 3 m/s²"},
   {q:"لماذا لم تتحرّك العربة على السطح الخشن عند قوّة صغيرة؟",a:"لأنّ قوّة الاحتكاك ساوت القوّة المؤثّرة فكانت القوّة المحصّلة صفرًا."}],
  concl:"تسارع الجسم يتناسب طرديًّا مع القوّة المحصّلة وعكسيًّا مع كتلته: F = m a."}});

/* ===== 3) كفاءة المستوى المائل ===== */
VLab.reg({id:"p9-incline",icon:"📐",preview:{th:30},grade:"الصف التاسع",subject:"الفيزياء",unit:"الوحدة 3: الشغل والطاقة",src:"كتاب الطالب ص86",
 title:"الكفاءة للمستوى المائل",question:"كيف تتغيّر كفاءة المستوى المائل بتغيّر زاوية ميله وخشونة سطحه؟",
 vars:[{k:"th",label:"زاوية الميل",unit:"°",min:10,max:60,step:5,val:20,c:"#7A1F2E",ticks:[10,30,45,60]},
  {k:"m",label:"كتلة الصندوق",unit:"kg",min:1,max:5,step:.5,val:2,c:"#2b7bd6",ticks:[1,3,5]},
  {k:"mu",label:"معامل الاحتكاك",unit:"",min:0,max:.5,step:.05,val:.2,c:"#B8902A",ticks:[0,.25,.5]}],
 read(s){const r=s.th*Math.PI/180,L=1,F=s.m*9.8*(Math.sin(r)+s.mu*Math.cos(r)),Wi=F*L,Wo=s.m*9.8*L*Math.sin(r);return[{label:"الارتفاع",val:(L*Math.sin(r)).toFixed(2),unit:"m"},{label:"قراءة الميزان النابضي",val:F.toFixed(1),unit:"N"},
  {label:"الشغل المبذول (الداخل)",val:Wi.toFixed(1),unit:"J"},{label:"الشغل الناتج (رفع الجسم)",val:Wo.toFixed(1),unit:"J"},{label:"الكفاءة",val:(Wo/Wi*100).toFixed(0),unit:"%"}]},
 draw(c,s,t){const r=s.th*Math.PI/180,L=420,x0=200,y0=GY;const x1=x0+L*Math.cos(r),y1=y0-L*Math.sin(r);
  c.fillStyle=s.mu>.25?"#8a6a4a":s.mu>0?"#9c8a6a":"#b8c0cc";c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y0);c.lineTo(x1,y1);c.closePath();c.fill();c.strokeStyle="#f3dfa8";c.lineWidth=3;c.stroke();
  c.strokeStyle="#ffd34d";c.lineWidth=2;c.beginPath();c.arc(x0,y0,60,-r,0);c.stroke();ltr(c,()=>label(c,x0+84,y0-16,s.th.toFixed(0)+"°","#ffd34d",18));
  ltr(c,()=>label(c,x1+40,(y0+y1)/2,"h="+(Math.sin(r)).toFixed(2)+"m","#7ad0ff",17));
  const f=(Math.sin(t*.7)+1)/2*.75+.05;const bx=x0+L*f*Math.cos(r),by=y0-L*f*Math.sin(r);c.save();c.translate(bx,by);c.rotate(-r);const sz=40+s.m*5;
  c.fillStyle="#b5643a";rr(c,-sz/2,-sz,sz,sz,5);c.fill();c.strokeStyle="#7a3f20";c.lineWidth=2;c.stroke();ltr(c,()=>label(c,0,-sz/2,s.m+"kg","#fff",15));
  c.strokeStyle="#ddd";c.lineWidth=2;c.beginPath();c.moveTo(sz/2,-sz/2);c.lineTo(sz/2+70,-sz/2);c.stroke();c.fillStyle="#9aa3b5";rr(c,sz/2+70,-sz/2-10,60,20,6);c.fill();c.restore();
  const F=s.m*9.8*(Math.sin(r)+s.mu*Math.cos(r)),eff=Math.sin(r)/(Math.sin(r)+s.mu*Math.cos(r));
  card(c,W-290,96,250,100,"الكفاءة",(eff*100).toFixed(0)+"%",null);card(c,W-290,212,250,110,"الميزان النابضي",F.toFixed(1)+" N",F/80,"#7ad0ff");
  label(c,330,130,"الكفاءة = الشغل الناتج ÷ الشغل المبذول × 100%","#f3dfa8",19)},
 challenges:[{t:"اجعلي الكفاءة 100%",test:s=>s.mu===0},{t:"قارني 3 زوايا مختلفة",test:(s,h)=>h.th.size>=4},{t:"اجعلي الكفاءة أقلّ من 50%",test:s=>{const r=s.th*Math.PI/180;return Math.sin(r)/(Math.sin(r)+s.mu*Math.cos(r))<.5}},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أحسب كفاءة المستوى المائل وأستقصي العوامل المؤثّرة فيها.",mats:"لوح خشبي، صندوق، ميزان نابضي، مسطرة، منقلة.",
  steps:["ثبّتي الكتلة والاحتكاك، وغيّري زاوية الميل، وسجّلي قراءة الميزان والكفاءة.","ثبّتي الزاوية، وغيّري معامل الاحتكاك، وسجّلي الكفاءة.","احسبي الشغل المبذول = القوّة × طول المستوى، والشغل الناتج = الوزن × الارتفاع."],
  questions:[{q:"لماذا تكون كفاءة المستوى المائل الحقيقي أقلّ من 100%؟",a:"لأنّ جزءًا من الشغل المبذول يُستهلك في التغلّب على الاحتكاك ويتحوّل إلى طاقة حرارية."},
   {q:"كيف تتغيّر الكفاءة بزيادة زاوية الميل؟",a:"تزداد الكفاءة؛ لأنّ قوّة الاحتكاك (μmg cosθ) تقلّ نسبيًّا مقارنة بالشغل الناتج."},
   {q:"ما فائدة المستوى المائل رغم أنّ الكفاءة أقلّ من 100%؟",a:"يقلّل القوّة اللازمة لرفع الجسم مقابل زيادة المسافة."}],
  concl:"كفاءة المستوى المائل = (الشغل الناتج ÷ الشغل المبذول) × 100%، وتقلّ بزيادة الاحتكاك وتزداد بزيادة زاوية الميل."}});

/* ===== 4) الكثافة ===== */
const OBJ={wood:["خشب",.6,"#b07a45"],wax:["شمع",.9,"#f1e3b0"],rub:["مطّاط",1.1,"#333a40"],al:["ألمنيوم",2.7,"#c4cad4"],fe:["حديد",7.9,"#6b6f78"],cu:["نحاس",8.9,"#c8743b"]};
const LQ={w:["ماء",1,"rgba(80,160,235,"],o:["زيت",.9,"rgba(230,190,60,"],s:["ماء مالح",1.2,"rgba(60,200,190,"]};
VLab.reg({id:"s8-density",icon:"🧊",preview:{d:100,o:"wood"},grade:"الصف الثامن",subject:"العلوم",unit:"الوحدة 3: الموائع",src:"كتاب الأنشطة ص33–35",
 title:"حساب كثافة أجسام مختلفة",question:"كيف نحسب كثافة جسم صلب؟ ولماذا تطفو بعض الأجسام وتغوص أخرى؟",
 vars:[{k:"o",label:"الجسم",type:"seg",val:"al",c:"#7A1F2E",opts:Object.keys(OBJ).map(k=>[k,OBJ[k][0]])},
  {k:"V",label:"حجم الجسم",unit:"cm³",min:10,max:40,step:5,val:20,c:"#2b7bd6",ticks:[10,20,30,40]},
  {k:"l",label:"السائل في المخبار",type:"seg",val:"w",c:"#0e8f8f",opts:Object.keys(LQ).map(k=>[k,LQ[k][0]])},
  {k:"d",label:"إنزال الجسم في المخبار",unit:"%",min:0,max:100,step:1,val:0,c:"#B8902A",ticks:[0,50,100]}],
 read(s){const O=OBJ[s.o],Lq=LQ[s.l];const m=O[1]*s.V;const fl=O[1]<Lq[1];const sub=s.d<100?0:fl?s.V*O[1]/Lq[1]:s.V;
  return[{label:"الكتلة (الميزان)",val:m.toFixed(1),unit:"g"},{label:"حجم السائل قبل",val:50,unit:"mL"},{label:"حجم السائل بعد",val:(50+sub).toFixed(1),unit:"mL"},
   {label:"الحجم المزاح",val:sub.toFixed(1),unit:"cm³"},{label:"الكثافة = الكتلة ÷ الحجم",val:s.d<100?"—":fl?"يطفو: اغمريه كلّيًّا لقياس حجمه":(m/sub).toFixed(2),unit:s.d<100||fl?"":"g/cm³"},{label:"الجسم في السائل",val:s.d<100?"—":fl?"يطفو":"يغوص"}]},
 draw(c,s,t,dt,S){const O=OBJ[S.o],Lq=LQ[S.l];const m=O[1]*s.V;
  // الميزان
  c.fillStyle="#2a2d35";rr(c,90,GY-40,220,40,8);c.fill();c.fillStyle="#9aa3b5";rr(c,110,GY-52,180,12,4);c.fill();c.fillStyle="#bfe7c0";rr(c,150,GY-32,100,24,4);c.fill();ltr(c,()=>label(c,200,GY-20,(s.d<5?m:0).toFixed(1)+" g","#1d3b0a",18));
  // المخبار
  const cx=600,cb=GY-10,cw=110,ch=330,pxml=ch/120;const fl=O[1]<Lq[1];
  const p=S.d>=100?1:s.d/100;const side=Math.cbrt(s.V)*14;
  const top=cb-ch,lvl0=cb-50*pxml,frac=fl?O[1]/Lq[1]:1,subF=s.V*frac,lvlF=cb-(50+subF)*pxml;
  const ox=200+(cx-200)*Math.min(1,p*2);let oyy,sub=0;
  if(p<.5){const f=p*2;const y0=GY-52-side,y1=top-side-20;oyy=y0+(y1-y0)*f-Math.sin(f*Math.PI)*60}
  else{const f=(p-.5)*2;const y1=top-side-20,dest=fl?lvlF-side*(1-frac):cb-side-4;oyy=y1+(dest-y1)*f;const depth=Math.max(0,Math.min(side,oyy+side-lvl0));sub=Math.min(subF,depth/side*s.V);if(f>=1)sub=subF}
  const lvl=cb-(50+sub)*pxml;
  c.fillStyle=Lq[2]+".55)";c.fillRect(cx-cw/2+4,lvl,cw-8,cb-lvl);c.strokeStyle="rgba(255,255,255,.6)";c.lineWidth=2;c.beginPath();c.moveTo(cx-cw/2+4,lvl);c.lineTo(cx+cw/2-4,lvl);c.stroke();
  c.fillStyle=O[2];c.fillRect(ox-side/2,oyy,side,side);c.strokeStyle="rgba(0,0,0,.4)";c.strokeRect(ox-side/2,oyy,side,side);
  c.strokeStyle="rgba(230,240,255,.8)";c.lineWidth=4;c.beginPath();c.moveTo(cx-cw/2,top);c.lineTo(cx-cw/2,cb);c.lineTo(cx+cw/2,cb);c.lineTo(cx+cw/2,top);c.stroke();c.fillStyle="rgba(230,240,255,.6)";rr(c,cx-cw/2-20,cb,cw+40,10,4);c.fill();
  ltr(c,()=>{for(let ml=0;ml<=120;ml+=10){const y=cb-ml*pxml;c.fillStyle="#fff";c.fillRect(cx+cw/2-16,y,ml%50===0?16:9,2);if(ml%20===0)label(c,cx+cw/2+24,y,String(ml),"#f3dfa8",14)}label(c,cx+cw/2+26,top-14,"mL","#f3dfa8",14)});
  ltr(c,()=>label(c,cx-cw/2-60,lvl,(50+sub).toFixed(1),"#7ad0ff",18));
  card(c,W-240,96,210,100,"الكثافة",p>=1&&!fl?(m/s.V).toFixed(2)+" g/cm³":"؟",null);
  label(c,200,GY+24,"ميزان رقمي","#f3dfa8",18);label(c,cx,GY+24,"مخبار مدرّج فيه "+Lq[0],"#f3dfa8",18);
  if(p>=1)label(c,220,220,fl?"يطفو: كثافته أقلّ من كثافة السائل":"يغوص: كثافته أكبر من كثافة السائل",fl?"#9fe0a0":"#ffb199",20)},
 challenges:[{t:"احسبي كثافة الألمنيوم",test:s=>s.o==="al"&&s.d>=100},{t:"اكتشفي جسمًا يطفو على الماء",test:s=>s.d>=100&&OBJ[s.o][1]<LQ[s.l][1]},{t:"اجعلي المطّاط يطفو بتغيير السائل",test:s=>s.o==="rub"&&s.d>=100&&s.l==="s"},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أحسب كثافة أجسام صلبة بقياس كتلتها وحجمها بطريقة الإزاحة، وأستنتج أنّ الكثافة خاصّية مميّزة للمادّة.",mats:"ميزان رقمي، مخبار مدرّج، ماء، أجسام صلبة مختلفة.",
  steps:["اختاري جسمًا وسجّلي كتلته من الميزان.","أنزلي الجسم في المخبار (حرّكي المؤشّر إلى 100) وسجّلي حجم الماء بعد.","احسبي الحجم المزاح = الحجم بعد − الحجم قبل، ثمّ الكثافة = الكتلة ÷ الحجم.","غيّري حجم الجسم من المادّة نفسها: هل تتغيّر الكثافة؟"],
  questions:[{q:"هل تتغيّر كثافة الألمنيوم عند مضاعفة حجم القطعة؟ فسّري.",a:"لا؛ لأنّ الكتلة تتضاعف أيضًا، فالكثافة خاصّية مميّزة للمادّة لا تعتمد على كمّيتها."},
   {q:"لماذا يطفو الخشب على الماء؟",a:"لأنّ كثافته (0.6 g/cm³) أقلّ من كثافة الماء (1 g/cm³)."},{q:"جسم كتلته 54 g وأزاح 20 mL من الماء. ما كثافته؟ وما مادّته المحتملة؟",a:"الكثافة = 54 ÷ 20 = 2.7 g/cm³، فهو على الأغلب ألمنيوم."},
   {q:"لماذا يطفو المطّاط في الماء المالح ويغوص في الماء العذب؟",a:"لأنّ كثافة الماء المالح (1.2 g/cm³) أكبر من كثافة المطّاط (1.1 g/cm³)، بينما كثافة الماء العذب (1 g/cm³) أقلّ منها."}],
  concl:"الكثافة = الكتلة ÷ الحجم، وهي خاصّية مميّزة للمادّة؛ يطفو الجسم إذا كانت كثافته أقلّ من كثافة السائل ويغوص إذا كانت أكبر."}});
})();
