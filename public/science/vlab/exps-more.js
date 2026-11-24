/* تجارب الكتب (الدفعة 2، ثنائية الأبعاد) — المختبر الافتراضي — تصميم المنصّة وتنفيذها: نوال بني عطية */
(function(){const {W,H,g}=VLab;const {rr,card,label}=g;const GY=468;
const ltr=(c,f)=>{c.save();c.direction="ltr";f();c.restore()};
const rng=s=>()=>{s=(s*9301+49297)%233280;return s/233280};
const panel=(c,x,y,w,h,col="rgba(255,255,255,.06)")=>{c.fillStyle=col;rr(c,x,y,w,h,16);c.fill();c.strokeStyle="rgba(243,223,168,.25)";c.lineWidth=2;c.stroke()};
const txt=(c,x,y,t,col="#fff",sz=20,al="center",w=700)=>{c.save();if(/^[\d.\-+(]/.test(t))c.direction="ltr";c.font="700 "+sz+"px Cairo, sans-serif";c.textAlign=al;c.textBaseline="middle";c.fillStyle=col;c.fillText(t,x,y,w);c.restore()};
function graph(c,x,y,w,h,series,xmax,ymax,xl,yl){panel(c,x,y,w,h,"rgba(10,8,20,.55)");c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=2;c.beginPath();c.moveTo(x+40,y+12);c.lineTo(x+40,y+h-30);c.lineTo(x+w-12,y+h-30);c.stroke();
 txt(c,x+w/2,y+h-12,xl,"#cfd6e4",15);c.save();c.translate(x+14,y+h/2);c.rotate(-Math.PI/2);txt(c,0,0,yl,"#cfd6e4",15);c.restore();
 series.forEach(([pts,col])=>{c.strokeStyle=col;c.lineWidth=3;c.beginPath();pts.forEach(([a,b],i)=>{const X=x+40+a/xmax*(w-56),Y=y+h-30-Math.min(1,b/ymax)*(h-46);i?c.lineTo(X,Y):c.moveTo(X,Y)});c.stroke()})}

/* ======================= 1) أدوات القياس الدقيق ======================= */
const OBJ9={wire:["سلك فلزّي (القطر)",1.24],coin:["قطعة نقد (القطر)",24.3],ball:["كرة زجاجية",15.9],pen:["قلم رصاص (القطر)",7.6],sheet:["رزمة ورق (السمك)",4.37]};
const INS={ru:["المسطرة المترية",.5],ca:["الورنية (القدمة ذات الورنية)",.1],mi:["الميكرومتر",.01]};
VLab.reg({id:"p9-measure",icon:"📏",preview:{i:"ca",o:"coin",sh:1},grade:"الصف التاسع",subject:"الفيزياء",unit:"الوحدة 1: القياس",src:"كتاب الأنشطة ص6",
 title:"أدوات القياس وقياس قطر سلك فلزّي",question:"كيف نختار أداة القياس المناسبة؟ وكيف نقرأ الورنية والميكرومتر بدقّة؟",
 vars:[{k:"i",label:"أداة القياس",type:"seg",val:"ca",c:"#7A1F2E",opts:Object.keys(INS).map(k=>[k,INS[k][0]])},{k:"o",label:"الجسم",type:"seg",val:"coin",c:"#2b7bd6",opts:Object.keys(OBJ9).map(k=>[k,OBJ9[k][0]])},{k:"sh",label:"القراءة",type:"seg",val:0,c:"#B8902A",opts:[[0,"أخفيها (اقرئي بنفسك)"],[1,"أظهري القراءة"]]}],
 read(s){const v=OBJ9[s.o][1],d=INS[s.i][1],r=Math.round(v/d)*d;const dec=d<.1?2:d<1?1:1;return[{label:"دقّة الأداة",val:d+" mm"},{label:"القراءة",val:s.sh?r.toFixed(dec)+" mm":"اقرئي التدريج ثمّ أظهري القراءة"},{label:"بوحدة cm",val:s.sh?(r/10).toFixed(dec+1)+" cm":"؟"},{label:"بوحدة m (النظام الدولي)",val:s.sh?(r/1000).toFixed(dec+3)+" m":"؟"},{label:"الأداة الأنسب",val:v<5?"الميكرومتر":v<100?"الورنية":"المسطرة"}]},
 draw(c,s,t,dt,S){const v=OBJ9[S.o][1],d=INS[S.i][1],r=Math.round(v/d)*d;
  if(S.i==="mi"){const sy=300,x0=220,k=36,L=Math.min(r,25);// الميكرومتر
   c.fillStyle="#3a3d44";rr(c,80,170,60,260,14);c.fill();c.fillStyle="#7a8090";c.fillRect(140,286,x0-140-k*L*0+0,28);
   c.fillStyle="#cfd3da";c.fillRect(140,290,40,20);// السندان
   const ob=OBJ9[S.o];c.fillStyle=S.o==="wire"?"#c07a3a":"#d9c9a0";const ow=Math.max(6,v*k*.5);c.fillRect(180,300-Math.min(70,ow*2)/2,Math.min(ow,40),Math.min(70,ow*2));
   const xs=180+Math.min(ow,40);c.fillStyle="#cfd3da";c.fillRect(xs,290,60,20);// المغزل
   const sx=xs+60;c.fillStyle="#e9e4d4";c.fillRect(sx,272,420,56);c.strokeStyle="#222";c.lineWidth=2;c.beginPath();c.moveTo(sx,sy);c.lineTo(sx+420,sy);c.stroke();
   const te=sx+40+((r%5))*k*2.2;// حافة الكُشتبان
   const mmw=k*1.6;const base=Math.floor(r);for(let m=0;m<=Math.ceil(r)+0;m++){const X=te-(r-m)*mmw;if(X<sx+4)continue;c.fillStyle="#111";c.fillRect(X-1,sy-22,2,22);txt(c,X,sy-34,String(m),"#111",17);const Xh=X+mmw/2;if(m+.5<=r)c.fillRect(Xh-1,sy,2,16)}
   c.fillStyle="#b9bec8";rr(c,te,236,160,128,10);c.fill();c.fillStyle="#9aa0aa";c.fillRect(te+120,236,40,128);
   const fr=Math.round((r-Math.floor(r*2)/2)*100);for(let j=-6;j<=6;j++){const val=(fr+j+50)%50;const Y=sy-j*9;if(Y<240||Y>360)continue;c.fillStyle="#111";c.fillRect(te,Y-1,val%5?12:22,2);if(val%5===0)txt(c,te+40,Y,String(val),"#111",15)}
   c.strokeStyle="#e04848";c.lineWidth=2;c.beginPath();c.moveTo(te-4,sy);c.lineTo(te+30,sy);c.stroke();
   label(c,480,180,"الميكرومتر: تدريج رئيسي (0.5 mm) + الكُشتبان (50 قسمًا = 0.01 mm)","#f3dfa8",19);
  }else if(S.i==="ca"){const x0=130,k=20,L=Math.min(r,36);const sy=300;
   c.fillStyle="#d8dbe2";rr(c,x0-40,sy-50,780,50,6);c.fill();c.fillRect(x0-40,sy-180,30,180);// الفكّ الثابت
   for(let m=0;m<=37;m++){const X=x0+m*k;c.fillStyle="#111";const h=m%10===0?26:m%5===0?20:12;c.fillRect(X-1,sy-h,2,h);if(m%10===0)txt(c,X,sy-36,String(m/10),"#111",16)}txt(c,x0+37*k+20,sy-36,"cm","#111",15);
   const vx=x0+L*k;c.fillStyle="#c3c7cf";rr(c,vx-30,sy,250,56,6);c.fill();c.fillRect(vx-30,sy-180,30,180);
   for(let j=0;j<=10;j++){const X=vx+j*k*.9;c.fillStyle="#111";const h=j%5===0?22:14;c.fillRect(X-1,sy,2,h);if(j%5===0)txt(c,X,sy+36,String(j),"#111",15)}
   const ob=OBJ9[S.o];c.fillStyle=S.o==="coin"?"#c9a44a":S.o==="ball"?"rgba(120,200,255,.8)":S.o==="pen"?"#f3c21f":S.o==="sheet"?"#f4f4f0":"#c07a3a";
   const ow=v*k;if(S.o==="ball"){c.beginPath();c.arc(x0+ow/2,sy-110,ow/2,0,7);c.fill()}else c.fillRect(x0,sy-150,ow,90);
   const j0=Math.round((r-Math.floor(r))*10);const X=vx+j0*k*.9;c.strokeStyle="#e04848";c.lineWidth=3;c.beginPath();c.arc(X,sy+2,8,0,7);c.stroke();
   label(c,480,395,"الورنية: 10 أقسام تساوي 9 mm ← الدقّة 0.1 mm","#f3dfa8",19);
  }else{const x0=110,k=24,sy=330;c.fillStyle="#f3e2a8";rr(c,x0-20,sy-10,760,70,6);c.fill();for(let m=0;m<=30;m++){const X=x0+m*k;c.fillStyle="#111";const h=m%10===0?34:m%5===0?24:14;c.fillRect(X-1,sy-10,2,h);if(m%10===0)txt(c,X,sy+44,String(m/10)+" cm","#111",15)}
   const ow=v*k;c.fillStyle=S.o==="coin"?"#c9a44a":S.o==="wire"?"#c07a3a":"#9fd4ff";if(S.o==="ball"){c.beginPath();c.arc(x0+ow/2,sy-10-ow/2,ow/2,0,7);c.fill()}else c.fillRect(x0,sy-60,ow,50);
   label(c,480,170,"المسطرة: أصغر تدريج 1 mm ← لا تصلح لقياس الأجسام الصغيرة جدًّا","#f3dfa8",19)}
  ltr(c,()=>card(c,W-280,420,240,100,"القراءة",S.sh?(r.toFixed(d<.1?2:1)+" mm"):"؟",null));card(c,40,420,260,100,"دقّة الأداة",d+" mm",null)},
 challenges:[{t:"قيسي قطر السلك بالميكرومتر",test:s=>s.i==="mi"&&s.o==="wire"},{t:"قيسي قطعة النقد بالورنية",test:s=>s.i==="ca"&&s.o==="coin"},{t:"قارني دقّة الأدوات الثلاث",test:(s,h)=>h.i.size>=3},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أستخدم أدوات القياس المناسبة (المسطرة، الورنية، الميكرومتر)، وأقيس قطر سلك فلزّي.",mats:"مسطرة مترية، قدمة ذات ورنية، ميكرومتر، سلك فلزّي، قطعة نقد، كرة زجاجية.",
  steps:["اختاري الأداة والجسم، واقرئي التدريج بنفسك أوّلًا.","في الورنية: اقرئي التدريج الرئيسي قبل صفر الورنية، ثمّ ابحثي عن خطّ الورنية المنطبق.","في الميكرومتر: اقرئي التدريج الرئيسي ثمّ أضيفي قراءة الكُشتبان × 0.01 mm.","أظهري القراءة لتتحقّقي، وحوّليها إلى cm وm."],
  questions:[{q:"ما دقّة كلّ من المسطرة والورنية والميكرومتر؟",a:"المسطرة 1 mm (تُقدّر 0.5 mm)، والورنية 0.1 mm، والميكرومتر 0.01 mm."},{q:"لماذا نستخدم الميكرومتر لقياس قطر السلك؟",a:"لأنّ قطر السلك صغير جدًّا ويحتاج أداة دقّتها عالية."},{q:"حوّلي 24.3 mm إلى المتر.",a:"0.0243 m."},{q:"ما وحدة الطول في النظام الدولي للوحدات؟",a:"المتر (m)."}],
  concl:"نختار أداة القياس وفق حجم الجسم والدقّة المطلوبة، وكلّما صغرت أصغر قراءة للأداة زادت دقّة القياس."}});

/* ======================= 2) الخلايا الكهروضوئية ======================= */
const MET={cs:["السيزيوم",2.1],na:["الصوديوم",2.3],zn:["الخارصين",4.3],cu:["النحاس",4.7]};
const wlc=l=>{let r=0,g2=0,b=0;if(l<380)return"#b07cff";if(l<440){r=-(l-440)/60;b=1}else if(l<490){g2=(l-440)/50;b=1}else if(l<510){g2=1;b=-(l-510)/20}else if(l<580){r=(l-510)/70;g2=1}else if(l<645){r=1;g2=-(l-645)/65}else r=1;return`rgb(${r*255|0},${g2*255|0},${b*255|0})`};
VLab.reg({id:"c10-photo",icon:"☀️",preview:{l:300},grade:"الصف العاشر",subject:"الكيمياء",unit:"الوحدة 1: الذرّة",src:"كتاب الطالب ص26",
 title:"الظاهرة الكهروضوئية والخلايا الكهروضوئية",question:"لماذا تنبعث الإلكترونات من سطح الفلزّ عند سقوط ضوء بتردّد معيّن فقط؟",
 vars:[{k:"l",label:"الطول الموجي للضوء",unit:"nm",min:200,max:700,step:10,val:500,c:"#7A1F2E",ticks:[200,400,550,700]},{k:"I",label:"شدّة الضوء",unit:"%",min:0,max:100,step:10,val:60,c:"#B8902A",ticks:[0,50,100]},{k:"m",label:"الفلزّ",type:"seg",val:"na",c:"#2b7bd6",opts:Object.keys(MET).map(k=>[k,MET[k][0]])}],
 read(s){const E=1240/s.l,phi=MET[s.m][1],K=E-phi;return[{label:"طاقة الفوتون",val:E.toFixed(2),unit:"eV"},{label:"اقتران الشغل للفلزّ",val:phi.toFixed(1),unit:"eV"},{label:"انبعاث إلكترونات",val:K>0&&s.I>0?"نعم ✔":"لا ✘"},{label:"أقصى طاقة حركية",val:K>0?K.toFixed(2)+" eV":"0"},{label:"التيار (يتناسب مع الشدّة)",val:K>0?(s.I*.05).toFixed(1)+" mA":"0 mA"}]},
 draw(c,s,t,dt,S){const E=1240/s.l,phi=MET[S.m][1],K=E-phi,col=wlc(s.l);
  c.fillStyle="#2a2d34";rr(c,90,170,120,160,12);c.fill();c.fillStyle=col;c.globalAlpha=.3+.7*s.I/100;c.beginPath();c.arc(150,250,40,0,7);c.fill();c.globalAlpha=1;label(c,150,350,"مصدر ضوء","#f3dfa8",18);
  c.fillStyle="rgba(180,220,255,.12)";rr(c,330,140,440,240,120);c.fill();c.strokeStyle="rgba(200,230,255,.5)";c.lineWidth=3;c.stroke();
  const gr=c.createLinearGradient(380,0,410,0);gr.addColorStop(0,"#8a8f99");gr.addColorStop(1,"#d8dbe2");c.fillStyle=gr;c.fillRect(380,170,30,180);label(c,395,390,MET[S.m][0],"#fff",18);c.fillStyle="#c9a44a";c.fillRect(700,190,14,140);label(c,707,390,"المجمِّع","#fff",16);
  const n=Math.round(s.I/10);for(let i=0;i<n;i++){const f=((t*1.2+i/n)%1);const x=210+f*170,y=210+((i*37)%100);c.strokeStyle=col;c.lineWidth=2.5;c.beginPath();for(let k=0;k<30;k++){const xx=x-k*2;c.lineTo(xx,y+Math.sin((xx)/(s.l/60))*6)}c.stroke()}
  if(K>0)for(let i=0;i<n*2;i++){const f=((t*(.4+K*.35)+i/(n*2))%1);const x=412+f*286,y=190+((i*53)%140);c.fillStyle="#5ab0ff";c.beginPath();c.arc(x,y,5,0,7);c.fill();txt(c,x,y,"−","#fff",12)}
  c.strokeStyle="#d9a441";c.lineWidth=4;c.beginPath();c.moveTo(395,350);c.lineTo(395,440);c.lineTo(520,440);c.moveTo(600,440);c.lineTo(707,440);c.lineTo(707,330);c.stroke();
  c.fillStyle="#1e2228";c.beginPath();c.arc(560,440,40,0,7);c.fill();c.strokeStyle="#fff";c.lineWidth=2;c.stroke();const I=K>0?s.I*.05:0;const a=Math.PI*(1.2+.6*Math.min(1,I/5));c.strokeStyle="#e04848";c.lineWidth=3;c.beginPath();c.moveTo(560,450);c.lineTo(560+Math.cos(a)*30,450+Math.sin(a)*30);c.stroke();txt(c,560,470,"mA","#fff",13);
  ltr(c,()=>card(c,40,96,230,100,"طاقة الفوتون",E.toFixed(2)+" eV",null));card(c,W-270,96,230,100,"أقصى طاقة حركية",K>0?K.toFixed(2)+" eV":"لا انبعاث",null)},
 challenges:[{t:"اجعلي الصوديوم يبعث إلكترونات",test:s=>s.m==="na"&&1240/s.l>2.3&&s.I>0},{t:"جدي ضوءًا لا يحرّر إلكترونات من النحاس",test:s=>s.m==="cu"&&1240/s.l<4.7},{t:"زيدي الشدّة دون تغيير الطول الموجي",test:(s,h)=>h.I.size>=3},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أستقصي الظاهرة الكهروضوئية وعلاقتها بتردّد الضوء ونوع الفلزّ.",mats:"خليّة كهروضوئية، مصادر ضوء بألوان مختلفة، مرشّحات، ميكروأميتر.",
  steps:["اختاري الفلزّ والطول الموجي.","لاحظي هل تنبعث إلكترونات، وقراءة الأميتر.","زيدي شدّة الضوء ولاحظي أثرها في التيار وفي طاقة الإلكترونات.","غيّري الفلزّ وقارني."],
  questions:[{q:"لماذا لم تنبعث إلكترونات من النحاس بالضوء الأحمر مهما زادت شدّته؟",a:"لأنّ طاقة الفوتون الواحد (المعتمدة على التردّد) أقلّ من اقتران الشغل للنحاس."},{q:"ما أثر زيادة شدّة الضوء؟",a:"يزداد عدد الفوتونات فيزداد عدد الإلكترونات المنبعثة والتيار، ولا تتغيّر طاقتها الحركية."},{q:"ما فكرة عمل الخليّة الشمسية؟",a:"تحويل طاقة الضوء إلى طاقة كهربائية بتحرير الإلكترونات."}],
  concl:"تنبعث الإلكترونات من الفلزّ فقط عندما تكون طاقة الفوتون (hf) أكبر من اقتران الشغل، وهذا دليل على الطبيعة الجسيمية (المكمّاة) للضوء."}});

/* ======================= 3) الصندوق المغلق: كيف نعرف ما في الداخل؟ ======================= */
const SHP={c:"دائرة",s:"مربّع",tr:"مثلّث"};
function boxShot(sh,y){const cx=480,cy=290;let x=150,yy=y,dx=1,dy=0;const pts=[[x,yy]];for(let k=0;k<700;k++){x+=dx*1.2;yy+=dy*1.2;let hit=false,nx=0,ny=0;
  if(sh==="c"){const rx=x-cx,ry=yy-cy;if(rx*rx+ry*ry<70*70){hit=true;const L=Math.hypot(rx,ry);nx=rx/L;ny=ry/L}}else if(sh==="s"){if(Math.abs(x-cx)<65&&Math.abs(yy-cy)<65){hit=true;if(65-Math.abs(x-cx)<65-Math.abs(yy-cy)){nx=Math.sign(x-cx)}else ny=Math.sign(yy-cy)}}
  else{const ax=cx-75,bx=cx+75,ty=cy-75,by=cy+65;if(yy>ty&&yy<by){const half=(yy-ty)/(by-ty)*75;if(Math.abs(x-cx)<half){hit=true;const dl=half-Math.abs(x-cx),db=by-yy;if(db<dl*.6)ny=1;else{nx=Math.sign(x-cx)*.89;ny=-.45}}}}
  if(hit){const d=dx*nx+dy*ny;if(d<0){dx-=2*d*nx;dy-=2*d*ny;const L=Math.hypot(dx,dy);dx/=L;dy/=L}pts.push([x,yy])}if(x<150||x>810||yy<130||yy>450){pts.push([x,yy]);break}}return pts}
VLab.reg({id:"s8-mystery",icon:"📦",preview:{n:20},grade:"الصف الثامن",subject:"العلوم",unit:"الوحدة 2: الذرّة",src:"كتاب الأنشطة ص14",
 title:"كيف نعرف ماذا يوجد داخل الأشياء؟",question:"كيف نستنتج شكل جسم مخفيّ داخل صندوق دون أن نراه؟ وكيف استنتج العلماء تركيب الذرّة بالطريقة نفسها؟",
 vars:[{k:"sh",label:"الصندوق",type:"seg",val:"tr",c:"#7A1F2E",opts:[["c","الصندوق أ"],["s","الصندوق ب"],["tr","الصندوق ج"]]},{k:"n",label:"عدد الكرات المدحرجة",unit:"",min:0,max:40,step:1,val:0,c:"#2b7bd6",ticks:[0,10,20,40]},{k:"rv",label:"الغطاء",type:"seg",val:0,c:"#B8902A",opts:[[0,"مغلق"],[1,"افتحي الصندوق"]]}],
 read(s){const n=Math.round(s.n);let hit=0;for(let i=0;i<n;i++){const p=boxShot(s.sh,140+(i*137%300));if(p.length>2)hit++}return[{label:"عدد الكرات",val:String(n)},{label:"ارتدّت أو انحرفت",val:String(hit)},{label:"مرّت مستقيمة",val:String(n-hit)},{label:"الشكل المخفي",val:s.rv?SHP[s.sh]:"استنتجيه من المسارات"},{label:"الربط بالذرّة",val:"رذرفورد استنتج وجود النواة من ارتداد قلّة من جسيمات ألفا"}]},
 draw(c,s,t,dt,S){const n=Math.round(s.n);c.fillStyle="#6b4a2e";rr(c,150,130,660,320,10);c.fill();c.strokeStyle="#3d2a1a";c.lineWidth=6;c.stroke();
  if(S.rv){c.fillStyle="#d9a441";const cx=480,cy=290;c.beginPath();if(S.sh==="c")c.arc(cx,cy,70,0,7);else if(S.sh==="s")c.rect(cx-65,cy-65,130,130);else{c.moveTo(cx,cy-75);c.lineTo(cx+75,cy+65);c.lineTo(cx-75,cy+65);c.closePath()}c.fill()}
  else{c.fillStyle="rgba(0,0,0,.25)";for(let i=0;i<8;i++)c.fillRect(150,130+i*40,660,2)}
  for(let i=0;i<n;i++){const p=boxShot(S.sh,140+(i*137%300));c.strokeStyle=p.length>2?"rgba(255,120,90,.9)":"rgba(140,220,255,.6)";c.lineWidth=2.5;c.beginPath();p.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.stroke();const e=p[p.length-1];c.fillStyle="#fff";c.beginPath();c.arc(e[0],e[1],5,0,7);c.fill()}
  for(let y=150;y<=440;y+=30){VLab.arrow(c,95,y,140,y,"rgba(255,255,255,.35)",2)}label(c,480,480,"🔵 مسار مستقيم   🔴 كرة ارتطمت بالجسم المخفي","#f3dfa8",18)},
 challenges:[{t:"دحرجي 30 كرة على الأقلّ",test:s=>s.n>=30},{t:"استنتجي الشكل ثمّ افتحي الصندوق",test:s=>s.rv&&s.n>=15},{t:"افحصي الصناديق الثلاثة",test:(s,h)=>h.sh.size>=3},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أستنتج شكل جسم مخفيّ بطريقة غير مباشرة، وأربط ذلك بطريقة اكتشاف تركيب الذرّة.",mats:"صندوق مغلق فيه جسم مجهول الشكل، كرات زجاجية صغيرة، ورقة وقلم.",
  steps:["اختاري صندوقًا ودحرجي الكرات تدريجيًّا.","ارسمي مسارات الكرات التي ارتدّت أو انحرفت.","استنتجي شكل الجسم المخفي وارسميه.","افتحي الصندوق وقارني استنتاجك بالشكل الحقيقي."],
  questions:[{q:"كيف استنتجتِ شكل الجسم دون رؤيته؟",a:"من مسارات الكرات المرتدّة واتّجاهات انحرافها."},{q:"لماذا يزداد دقّة الاستنتاج بزيادة عدد الكرات؟",a:"لأنّ عددًا أكبر من المسارات يعطي معلومات أكثر عن حدود الجسم."},{q:"ما العلاقة بين النشاط وتجربة رذرفورد؟",a:"استنتج رذرفورد وجود نواة صغيرة موجبة كثيفة في الذرّة من ارتداد عدد قليل من جسيمات ألفا عن صفيحة الذهب، دون أن يرى الذرّة."}],
  concl:"يستنتج العلماء تركيب ما لا يستطيعون رؤيته (كالذرّة) بطرق غير مباشرة من خلال ملاحظة آثاره."}});

/* ======================= 4) بصمة DNA (الفصل الكهربائي الهلامي) ======================= */
const FRAG={sc:[900,620,410,250,130],s1:[1000,700,350,250,90],s2:[900,620,410,250,130],s3:[800,620,500,300,160]};
VLab.reg({id:"s8-gel",icon:"🧬",preview:{t:80},grade:"الصف الثامن",subject:"العلوم",unit:"الوحدة 1: الوراثة",src:"كتاب الأنشطة ص12",
 title:"بصمة DNA والفصل الكهربائي الهلامي",question:"كيف تُستخدم بصمة DNA لمعرفة صاحب عيّنة وُجدت في مكان ما؟",
 vars:[{k:"V",label:"فرق الجهد",unit:"V",min:0,max:120,step:10,val:100,c:"#B8902A",ticks:[0,60,120]},{k:"t",label:"زمن الفصل",unit:"دقيقة",min:0,max:100,step:5,val:0,c:"#2b7bd6",ticks:[0,50,100]},{k:"rv",label:"النتيجة",type:"seg",val:0,c:"#7A1F2E",opts:[[0,"أخفيها"],[1,"أظهري المطابقة"]]}],
 read(s){const p=Math.min(1,s.V*s.t/8000);return[{label:"تقدّم الفصل",val:Math.round(p*100)+"%"},{label:"اتّجاه حركة DNA",val:"نحو القطب الموجب (+) لأنّ DNA سالب الشحنة"},{label:"القطع الأسرع",val:"القطع الأصغر حجمًا"},{label:"العيّنة المطابقة",val:s.rv?(p>.6?"المشتبه به 2 ✔":"أكملي الفصل أوّلًا"):"قارني الحزم بنفسك"}]},
 draw(c,s,t,dt,S){const p=Math.min(1,s.V*s.t/8000);const gx=220,gy=165,gw=520,gh=290;c.fillStyle="#1a2a3a";rr(c,gx-30,gy-30,gw+60,gh+60,14);c.fill();
  const gg=c.createLinearGradient(0,gy,0,gy+gh);gg.addColorStop(0,"rgba(120,160,200,.55)");gg.addColorStop(1,"rgba(90,130,180,.55)");c.fillStyle=gg;c.fillRect(gx,gy,gw,gh);
  c.fillStyle="#2a2a30";c.fillRect(gx,gy-28,gw,18);c.fillStyle="#e04848";c.fillRect(gx,gy+gh+10,gw,18);txt(c,gx-14,gy-19,"−","#fff",24);txt(c,gx-14,gy+gh+19,"+","#fff",24);
  const lanes=[["sc","مسرح الجريمة"],["s1","المشتبه 1"],["s2","المشتبه 2"],["s3","المشتبه 3"]];lanes.forEach(([k,n],i)=>{const x=gx+60+i*130;c.fillStyle="#0e1620";c.fillRect(x-30,gy+6,60,10);txt(c,x,gy-48,n,"#f3dfa8",16);
   FRAG[k].forEach(bp=>{const d=(1-Math.log10(bp)/3.2)*p*(gh-40)*1.6;const y=gy+16+Math.min(gh-30,d);c.fillStyle="rgba(140,255,170,"+(S.V>0&&s.t>0?.95:.4)+")";c.shadowColor="#6fff9a";c.shadowBlur=10;c.fillRect(x-28,y,56,7);c.shadowBlur=0});
   if(S.rv&&k==="s2"&&p>.6){c.strokeStyle="#ffd34d";c.lineWidth=3;c.strokeRect(x-36,gy,72,gh)}});
  if(S.V>0&&s.t>0&&s.t<100)for(let i=0;i<10;i++){c.fillStyle="rgba(255,255,255,.4)";c.beginPath();c.arc(gx+30+((t*40+i*53)%gw),gy+gh+4-((t*30+i*20)%14),2,0,7);c.fill()}
  ltr(c,()=>card(c,40,96,150,100,"الجهد",s.V.toFixed(0)+" V",null));ltr(c,()=>card(c,W-190,96,150,100,"الزمن",s.t.toFixed(0)+" min",null))},
 challenges:[{t:"أكملي فصل العيّنات",test:s=>s.V*s.t>=6000},{t:"حدّدي العيّنة المطابقة",test:s=>s.rv&&s.V*s.t>=5000},{t:"جرّبي جهدين مختلفين",test:(s,h)=>h.V.size>=3},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أتعرّف فكرة بصمة DNA وطريقة مقارنة العيّنات بالفصل الكهربائي الهلامي.",mats:"جهاز فصل كهربائي، هلام الأغاروز، عيّنات DNA مقطّعة بإنزيمات، صبغة، مصدر جهد.",
  steps:["شغّلي الجهد وحرّكي زمن الفصل.","لاحظي حركة قطع DNA نحو القطب الموجب.","قارني حزم عيّنة مسرح الجريمة بحزم المشتبه بهم.","أظهري النتيجة لتتحقّقي من استنتاجك."],
  questions:[{q:"لماذا تتحرّك قطع DNA نحو القطب الموجب؟",a:"لأنّ DNA يحمل شحنة سالبة بسبب مجموعات الفوسفات."},{q:"لماذا تتحرّك القطع الصغيرة أبعد من الكبيرة؟",a:"لأنّها تمرّ عبر مسامات الهلام بسهولة أكبر."},{q:"لماذا تختلف بصمة DNA من شخص إلى آخر؟",a:"لأنّ تسلسل DNA يختلف بين الأفراد (عدا التوائم المتطابقة)، فتنتج قطع بأطوال مختلفة."}],
  concl:"لكلّ شخص بصمة DNA مميّزة تظهر نمطًا خاصًّا من الحزم في الفصل الكهربائي، وتُستخدم في الطبّ الشرعي وإثبات النسب."}});

/* ======================= 5) ملوّثات الهواء ======================= */
const LOC={gar:["حديقة المدرسة",3],yard:["ساحة المدرسة",8],road:["جانب الشارع",22],fac:["قرب منطقة صناعية",35]};
VLab.reg({id:"s8-pollution",icon:"🏭",preview:{d:5},grade:"الصف الثامن",subject:"العلوم",unit:"الوحدة 4: الموارد",src:"كتاب الأنشطة ص48",
 title:"ملوّثات الهواء (البطاقات اللاصقة)",question:"أين يكون الهواء أكثر تلوّثًا بالجسيمات العالقة في منطقتنا؟",
 vars:[{k:"l",label:"موقع البطاقة",type:"seg",val:"yard",c:"#7A1F2E",opts:Object.keys(LOC).map(k=>[k,LOC[k][0]])},{k:"d",label:"عدد الأيام",unit:"يوم",min:0,max:7,step:1,val:0,c:"#2b7bd6",ticks:[0,3,7]}],
 read(s){const r=LOC[s.l][1]*s.d;return[{label:"الموقع",val:LOC[s.l][0]},{label:"عدد الجسيمات في 1 cm²",val:String(Math.round(r))},{label:"درجة التلوّث",val:r<20?"منخفضة":r<80?"متوسّطة":"عالية"},{label:"مصادر محتملة",val:s.l==="fac"?"دخان المصانع والغبار":s.l==="road"?"عوادم السيّارات وغبار الطريق":"غبار طبيعي وحبوب لقاح"}]},
 draw(c,s,t,dt,S){const L=Object.keys(LOC);L.forEach((k,i)=>{const x=110+i*190,y=150;panel(c,x,y,160,120,k===S.l?"rgba(184,144,42,.35)":"rgba(255,255,255,.06)");txt(c,x+80,y+22,LOC[k][0],"#f3dfa8",17);
   c.fillStyle="#fffbe8";c.fillRect(x+30,y+40,100,64);const R=rng(i*99+7);const n=Math.round(LOC[k][1]*s.d*.6);for(let j=0;j<n;j++){c.fillStyle="rgba(40,30,30,.8)";c.beginPath();c.arc(x+32+R()*96,y+42+R()*60,1+R()*1.5,0,7);c.fill()}});
  const R=rng(L.indexOf(S.l)*99+7);const n=Math.round(LOC[S.l][1]*s.d*.6);g.lens(c,480,380,95,(cc,x,y,r)=>{cc.fillStyle="#fffbe8";cc.fillRect(x-r,y-r,2*r,2*r);const RR=rng(L.indexOf(S.l)*7+1);for(let j=0;j<n*3;j++){cc.fillStyle=["#3a2a2a","#6a5040","#222","#8a7a60"][j%4];cc.beginPath();cc.ellipse(x-r+RR()*2*r,y-r+RR()*2*r,2+RR()*5,1.5+RR()*3,RR()*3,0,7);cc.fill()}},"البطاقة تحت العدسة المكبّرة");
  ltr(c,()=>card(c,W-270,330,230,100,"جسيمات / cm²",String(Math.round(LOC[S.l][1]*s.d)),null))},
 challenges:[{t:"اتركي البطاقة 7 أيام",test:s=>s.d>=7},{t:"قارني المواقع الأربعة",test:(s,h)=>h.l.size>=4},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أقارن تلوّث الهواء بالجسيمات العالقة في مواقع مختلفة.",mats:"بطاقات كرتونية، فازلين، شريط لاصق، عدسة مكبّرة، ورق مربّعات.",steps:["ادهني البطاقات بالفازلين وضعيها في المواقع الأربعة.","حرّكي عدد الأيام.","افحصي البطاقة بالعدسة واحسبي الجسيمات في 1 cm².","رتّبي المواقع حسب درجة التلوّث."],
  questions:[{q:"أيّ المواقع أكثر تلوّثًا؟ ولماذا؟",a:"قرب المنطقة الصناعية وجانب الشارع؛ بسبب دخان المصانع وعوادم السيّارات."},{q:"ما أثر الجسيمات العالقة في صحّة الإنسان؟",a:"تسبّب أمراض الجهاز التنفّسي كالربو والتهاب القصبات."},{q:"اقترحي طريقتين لتقليل تلوّث الهواء.",a:"زراعة الأشجار، واستخدام وسائل النقل العامّ، وتركيب مرشّحات في المصانع."}],
  concl:"يزداد تلوّث الهواء بالجسيمات العالقة قرب مصادر التلوّث كالشوارع المزدحمة والمصانع."}});

/* ======================= 6) استدامة الموارد الطبيعية ======================= */
function pond(h,yrs){let N=500;const P=[[0,N]];for(let y=1;y<=yrs;y++){N=Math.max(0,N+.5*N*(1-N/1000)-h);P.push([y,N])}return P}
VLab.reg({id:"s8-sustain",icon:"🐟",preview:{y:20},grade:"الصف الثامن",subject:"العلوم",unit:"الوحدة 4: الموارد",src:"كتاب الأنشطة ص50",
 title:"استدامة الموارد الطبيعية (بحيرة الأسماك)",question:"كم سمكة يمكن صيدها كلّ سنة دون أن تنفد الأسماك من البحيرة؟",
 vars:[{k:"h",label:"عدد الأسماك المصطادة سنويًّا",unit:"سمكة",min:0,max:250,step:10,val:150,c:"#e04848",ticks:[0,125,250]},{k:"y",label:"عدد السنوات",unit:"سنة",min:0,max:20,step:1,val:0,c:"#2b7bd6",ticks:[0,10,20]}],
 read(s){const P=pond(s.h,Math.round(s.y)),N=P[P.length-1][1];return[{label:"عدد الأسماك الآن",val:String(Math.round(N))},{label:"الصيد المستدام الأقصى",val:"125 سمكة/سنة"},{label:"الحكم",val:s.h<=125?"استخدام مستدام ✔":"استنزاف للمورد ✘"},{label:"مجموع ما صيد",val:String(Math.round(P.filter(p=>p[1]>0).length*s.h))}]},
 draw(c,s,t,dt,S){const yrs=Math.round(s.y);const P=pond(S.h,yrs),N=P[P.length-1][1];c.fillStyle="#2a6aa8";c.beginPath();c.ellipse(260,300,200,130,0,0,7);c.fill();c.strokeStyle="#6a8a4a";c.lineWidth=14;c.stroke();
  const R=rng(5);const nf=Math.round(N/15);for(let i=0;i<nf;i++){const a=R()*6.28,r=R(),x=260+Math.cos(a)*170*r+Math.sin(t+i)*6,y=300+Math.sin(a)*100*r;c.fillStyle="#ffb04d";c.beginPath();c.ellipse(x,y,9,4,0,0,7);c.fill();c.beginPath();c.moveTo(x-9,y);c.lineTo(x-15,y-5);c.lineTo(x-15,y+5);c.fill()}
  graph(c,500,120,420,300,[[pond(S.h,20).slice(0,yrs+1),"#ffb04d"],[[[0,1000],[20,1000]],"rgba(255,255,255,.25)"]],20,1100,"السنوات","عدد الأسماك");
  ltr(c,()=>card(c,60,460,220,100,"الأسماك",String(Math.round(N)),N/1000,"#ffb04d"))},
 challenges:[{t:"استنزفي البحيرة (لا تفعلي ذلك في الواقع!)",test:s=>pond(s.h,Math.round(s.y)).slice(-1)[0][1]<1},{t:"جدي صيدًا مستدامًا مدّة 20 سنة",test:s=>s.y>=20&&s.h>=100&&s.h<=125},{t:"قارني 3 كمّيات صيد",test:(s,h)=>h.h.size>=3},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أستقصي مفهوم الاستخدام المستدام للموارد الطبيعية المتجدّدة.",mats:"وعاء فيه حبوب أو قطع حلوى تمثّل الأسماك، ملعقة للصيد، جدول لتسجيل النتائج.",steps:["حدّدي عدد الأسماك المصطادة سنويًّا.","حرّكي السنوات وراقبي عدد الأسماك والرسم البياني.","ابحثي عن أكبر كمّية صيد لا تؤدّي إلى نفاد الأسماك."],
  questions:[{q:"ماذا حدث عندما كان الصيد أكبر من قدرة الأسماك على التكاثر؟",a:"تناقص عدد الأسماك حتى نفدت."},{q:"ما المقصود بالاستخدام المستدام للموارد؟",a:"استخدامها لتلبية حاجاتنا دون الإضرار بقدرة الأجيال القادمة على تلبية حاجاتها."},{q:"اقترحي إجراءات لحماية الثروة السمكية.",a:"تحديد مواسم وكمّيات الصيد، ومنع صيد الأسماك الصغيرة، وإنشاء محميّات."}],
  concl:"يبقى المورد المتجدّد مستدامًا عندما لا يتجاوز الاستهلاك قدرته على التجدّد."}});

/* ======================= 7) دراسة أشكال الحياة في نظام بيئي (المربّعات) ======================= */
const SPC=[["🌼","الأقحوان",140],["🍀","النفل",260],["🌿","العشب البرّي",420],["🐌","الحلزون",40]];
VLab.reg({id:"b9-quadrat",icon:"🌼",preview:{q:6},grade:"الصف التاسع",subject:"العلوم الحياتية",unit:"الوحدة 1: الأنظمة البيئية",src:"كتاب الأنشطة ص14",
 title:"دراسة أشكال الحياة في نظام بيئي بطريقة المربّعات",question:"كيف نقدّر أعداد الكائنات الحيّة في حقل كبير دون عدّها جميعًا؟",
 vars:[{k:"q",label:"عدد المربّعات العشوائية",unit:"",min:1,max:12,step:1,val:3,c:"#2f8f5b",ticks:[1,4,8,12]},{k:"sp",label:"الكائن المدروس",type:"seg",val:0,c:"#7A1F2E",opts:SPC.map((x,i)=>[i,x[0]+" "+x[1]])}],
 read(s){const q=Math.round(s.q);const R=rng(42);const items=field();let cnt=0;for(let i=0;i<q;i++){const[x,y]=qpos(i);cnt+=items.filter(it=>it.s===s.sp&&it.x>=x&&it.x<x+60&&it.y>=y&&it.y<y+60).length}const est=Math.round(cnt/q*(640*300)/(60*60));
  return[{label:"عدد الأفراد في المربّعات",val:String(cnt)},{label:"المتوسّط لكلّ مربّع",val:(cnt/q).toFixed(1)},{label:"التقدير للحقل كاملًا",val:String(est)},{label:"العدد الحقيقي",val:String(SPC[s.sp][2])},{label:"دقّة التقدير",val:Math.round(100-Math.abs(est-SPC[s.sp][2])/SPC[s.sp][2]*100)+"%"}]},
 draw(c,s,t,dt,S){const q=Math.round(s.q);c.drawImage(fieldImg(S.sp),160,140);
  for(let i=0;i<q;i++){const[x,y]=qpos(i);c.strokeStyle="#fff";c.lineWidth=3;c.strokeRect(160+x,140+y,60,60);c.fillStyle="rgba(255,255,255,.12)";c.fillRect(160+x,140+y,60,60);txt(c,160+x+10,140+y+10,String(i+1),"#fff",13)}
  label(c,480,470,"الحقل: 32 m × 15 m · المربّع: 3 m × 3 m","#f3dfa8",18)},
 challenges:[{t:"استخدمي 10 مربّعات على الأقلّ",test:s=>s.q>=10},{t:"قدّري أعداد الكائنات الأربعة",test:(s,h)=>h.sp.size>=4},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أقدّر أعداد الكائنات الحيّة في نظام بيئي باستخدام طريقة المربّعات.",mats:"إطار مربّع (1 m × 1 m)، شريط قياس، دفتر، عدسة مكبّرة.",steps:["اختاري الكائن المدروس وعدد المربّعات.","احسبي عدد الأفراد داخل المربّعات.","احسبي المتوسّط ثمّ قدّري العدد في الحقل كاملًا: المتوسّط × (مساحة الحقل ÷ مساحة المربّع).","قارني دقّة التقدير بزيادة عدد المربّعات."],
  questions:[{q:"لماذا نضع المربّعات عشوائيًّا؟",a:"لتكون العيّنة ممثّلة للحقل وتقلّ الأخطاء والتحيّز."},{q:"ما أثر زيادة عدد المربّعات في دقّة التقدير؟",a:"تزداد الدقّة غالبًا لأنّ العيّنة تصبح أكبر وأكثر تمثيلًا."},{q:"لماذا لا تناسب هذه الطريقة الحيوانات سريعة الحركة؟",a:"لأنّها تتنقّل بين المربّعات وقد تهرب أثناء العدّ."}],
  concl:"تُستخدم طريقة المربّعات العشوائية لتقدير أعداد الكائنات الثابتة أو بطيئة الحركة في النظام البيئي، وتزداد دقّتها بزيادة عدد العيّنات."}});
let _F=null;function field(){if(_F)return _F;const R=rng(77);_F=[];SPC.forEach(([e,n,N],si)=>{for(let i=0;i<N;i++){let x=R()*630+5,y=R()*290+5;if(si===0&&R()<.5){x=380+R()*240;y=150+R()*140}_F.push({s:si,x,y})}});return _F}
const _FI={};function fieldImg(sp){if(_FI[sp])return _FI[sp];const cv=document.createElement("canvas");cv.width=640;cv.height=300;const c=cv.getContext("2d");c.fillStyle="#6a9a40";rr(c,0,0,640,300,10);c.fill();c.font="16px sans-serif";c.textAlign="center";c.textBaseline="middle";
 field().forEach(it=>{c.globalAlpha=it.s===sp?1:.4;c.fillText(SPC[it.s][0],it.x,it.y)});return _FI[sp]=cv}
function qpos(i){const R=rng(1000+i*17);return[Math.floor(R()*580),Math.floor(R()*240)]}

/* ======================= 8) التصنيف بالمفتاح الثنائي ======================= */
const ORGS={mu:["🍄","فطر عيش الغراب","الفطريات",[0,0]],tr:["🌳","شجرة البلّوط","النباتات",[0,1]],ba:["🦠","بكتيريا","البدائيات (البكتيريا)",[1,0]],am:["🧫","أميبا","الطلائعيات",[1,1]],ea:["🦅","نسر","الحيوانات: فقاريات (طيور)",[2,0]],fr:["🐸","ضفدع","الحيوانات: فقاريات (برمائيات)",[2,1]],bu:["🦋","فراشة","الحيوانات: لافقاريات (حشرات)",[2,2]]};
VLab.reg({id:"b10-classify",icon:"🗂️",preview:{o:"fr"},grade:"الصف العاشر",subject:"العلوم الحياتية",unit:"الوحدة 3: التصنيف",src:"كتاب الأنشطة ص20",
 title:"تصنيف الكائنات الحيّة بالمفتاح الثنائي",question:"كيف نصنّف الكائنات الحيّة في مجموعات وفق صفاتها المشتركة؟",
 vars:[{k:"o",label:"الكائن الحيّ",type:"seg",val:"fr",c:"#7A1F2E",opts:Object.keys(ORGS).map(k=>[k,ORGS[k][0]+" "+ORGS[k][1]])}],
 read(s){const O=ORGS[s.o];const Q=keyPath(s.o);return[{label:"الكائن",val:O[1]},...Q.map((q,i)=>({label:"س"+(i+1)+": "+q[0],val:q[1]})),{label:"المجموعة",val:O[2]}]},
 draw(c,s,t,dt,S){const nodes=[[480,140,"هل خلاياه بدائية النواة؟"],[330,240,"لا ← كيف يتغذّى؟ كم خليّة له؟"],[720,240,"نعم ← بكتيريا"],[125,350,"يمتصّ ← فطريات"],[355,350,"وحيد الخليّة ← طلائعيات"],[585,350,"يصنع غذاءه ← نباتات"],[815,350,"يتغذّى على غيره ← حيوانات"]];
  const path=keyPath(S.o).map(q=>q[2]);const on=i=>path.includes(i);const edges=[[0,1],[0,2],[1,3],[1,4],[1,5],[1,6]];
  edges.forEach(([a,b])=>{c.strokeStyle=on(a)&&on(b)?"#ffd34d":"rgba(255,255,255,.2)";c.lineWidth=on(a)&&on(b)?5:2;c.beginPath();c.moveTo(nodes[a][0],nodes[a][1]+20);c.lineTo(nodes[b][0],nodes[b][1]-20);c.stroke()});
  nodes.forEach(([x,y,tx],i)=>{panel(c,x-108,y-24,216,48,on(i)?"rgba(184,144,42,.55)":"rgba(255,255,255,.07)");txt(c,x,y,tx,on(i)?"#fff":"#cfd6e4",16,"center",204)});
  const O=ORGS[S.o];c.font="90px sans-serif";c.textAlign="center";c.fillText(O[0],480+Math.sin(t*2)*4,470);label(c,480,535,O[1]+" ← "+O[2],"#f3dfa8",22)},
 challenges:[{t:"صنّفي كائنًا من كلّ مملكة",test:(s,h)=>["mu","tr","ba","am"].every(k=>h.o.has(k))&&[...h.o].some(k=>["ea","fr","bu"].includes(k))},{t:"صنّفي الكائنات السبعة",test:(s,h)=>h.o.size>=7},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أصنّف الكائنات الحيّة باستخدام مفتاح ثنائي يعتمد على صفاتها.",mats:"بطاقات صور لكائنات حيّة، مفتاح تصنيف ثنائي.",steps:["اختاري الكائن وتتبّعي مساره في المفتاح.","أجيبي عن كلّ سؤال بنعم أو لا للانتقال إلى الخطوة التالية.","سجّلي المجموعة التي ينتمي إليها كلّ كائن."],
  questions:[{q:"ما فائدة التصنيف؟",a:"تنظيم الكائنات الحيّة الكثيرة في مجموعات لتسهيل دراستها وتعرّف العلاقات بينها."},{q:"ما الصفة التي تميّز البكتيريا عن بقيّة الكائنات في المفتاح؟",a:"خلاياها بدائية النواة (لا تحتوي نواة محاطة بغشاء)."},{q:"لماذا لا تُصنّف الفطريات مع النباتات؟",a:"لأنّها لا تحتوي كلوروفيل ولا تصنع غذاءها، بل تتغذّى بالامتصاص، وجدرانها من الكايتين."}],
  concl:"يعتمد التصنيف على الصفات المشتركة بين الكائنات، ويساعد المفتاح الثنائي على تحديد مجموعة الكائن خطوة بخطوة."}});
function keyPath(o){const P=[["خلايا بدائية النواة؟",o==="ba"?"نعم":"لا",0]];if(o==="ba"){P.push(["النتيجة","بكتيريا",2]);return P}P.push(["طريقة التغذّي / عدد الخلايا",{mu:"يمتصّ غذاءه",am:"وحيد الخليّة",tr:"يصنع غذاءه",ea:"يتغذّى على غيره",fr:"يتغذّى على غيره",bu:"يتغذّى على غيره"}[o],1]);P.push(["المجموعة",ORGS[o][2],{mu:3,am:4,tr:5,ea:6,fr:6,bu:6}[o]]);return P}

/* ======================= 9) طيور داروين ======================= */
const BK={th:["منقار سميك قويّ (كمّاشة)","🥜"],sl:["منقار رفيع طويل (ملقط)","🌸"],sh:["منقار حادّ متوسّط (مقصّ)","🐛"]};const FD={se:["بذور صلبة","th"],ne:["رحيق داخل الأزهار","sl"],in:["حشرات","sh"]};
VLab.reg({id:"b10-finches",icon:"🐦",preview:{g:10},grade:"الصف العاشر",subject:"العلوم الحياتية",unit:"الوحدة 1: التطوّر",src:"كتاب الأنشطة ص4",
 title:"طيور داروين والانتخاب الطبيعي",question:"لماذا اختلفت أشكال مناقير طيور الحسّون في جزر غالاباغوس؟",
 vars:[{k:"f",label:"الغذاء المتوافر في الجزيرة",type:"seg",val:"se",c:"#7A1F2E",opts:Object.keys(FD).map(k=>[k,FD[k][0]])},{k:"g",label:"عدد الأجيال",unit:"جيل",min:0,max:30,step:1,val:0,c:"#2f8f5b",ticks:[0,10,20,30]}],
 read(s){const P=pop(s.f,Math.round(s.g));const best=FD[s.f][1];return[{label:"المنقار الأنسب للغذاء",val:BK[best][0]},...Object.keys(BK).map(k=>({label:BK[k][0],val:Math.round(P[k]*100)+"%"})),{label:"التفسير",val:"الطيور ذات المنقار المناسب تحصل على غذاء أكثر فتعيش وتتكاثر"}]},
 draw(c,s,t,dt,S){const P=pop(S.f,Math.round(s.g));const cols={th:"#c0392b",sl:"#2b7bd6",sh:"#2f8f5b"};c.fillStyle="#d8c08a";c.beginPath();c.ellipse(300,330,250,120,0,0,7);c.fill();c.fillStyle="#5a8a3a";c.beginPath();c.ellipse(300,320,230,100,0,0,7);c.fill();
  const R=rng(3);let k0=0;const ks=Object.keys(BK);for(let i=0;i<40;i++){const r=R();let k=ks[0];let acc=0;for(const kk of ks){acc+=P[kk];if(r<acc){k=kk;break}}const x=110+R()*380,y=260+R()*130+Math.sin(t*3+i)*3;c.fillStyle=cols[k];c.beginPath();c.ellipse(x,y,12,9,0,0,7);c.fill();c.fillStyle="#f3c21f";c.beginPath();if(k==="th"){c.moveTo(x+10,y-5);c.lineTo(x+20,y);c.lineTo(x+10,y+5)}else if(k==="sl"){c.moveTo(x+10,y-2);c.lineTo(x+28,y);c.lineTo(x+10,y+2)}else{c.moveTo(x+10,y-3);c.lineTo(x+21,y+2);c.lineTo(x+10,y+3)}c.fill()}
  c.font="34px sans-serif";c.textAlign="center";for(let i=0;i<6;i++)c.fillText(BK[FD[S.f][1]][1],140+i*65,200+((i%2)*14));
  ks.forEach((k,i)=>{const x=620,y=150+i*95;panel(c,x,y,300,80);c.fillStyle=cols[k];rr(c,x+16,y+46,268*P[k],20,10);c.fill();txt(c,x+150,y+24,BK[k][0],"#fff",15);ltr(c,()=>txt(c,x+260,y+56,Math.round(P[k]*100)+"%","#fff",15))});
  label(c,300,470,"الجزيرة: "+FD[S.f][0]+" · الجيل "+Math.round(s.g),"#f3dfa8",20)},
 challenges:[{t:"راقبي 30 جيلًا",test:s=>s.g>=30},{t:"جرّبي الأغذية الثلاثة",test:(s,h)=>h.f.size>=3},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أنمذج كيف يؤدّي الانتخاب الطبيعي إلى تكيّف مناقير الطيور مع نوع الغذاء.",mats:"أدوات تمثّل المناقير (كمّاشة، ملقط، مقصّ)، بذور، ماء في أنبوب، حبّات تمثّل الحشرات، ساعة إيقاف.",
  steps:["اختاري نوع الغذاء المتوافر في الجزيرة.","حرّكي عدد الأجيال وراقبي نسب أنواع المناقير.","كرّري مع غذاء آخر وقارني."],
  questions:[{q:"لماذا ازدادت نسبة المنقار السميك في جزيرة البذور الصلبة؟",a:"لأنّه يكسر البذور بكفاءة فتحصل الطيور على غذاء أكثر وتعيش وتتكاثر وتنقل صفاتها لأبنائها."},{q:"ما المقصود بالانتخاب الطبيعي؟",a:"بقاء الأفراد الأكثر تكيّفًا مع بيئتهم وتكاثرها بنسبة أكبر."},{q:"ما دور التنوّع داخل النوع في الانتخاب الطبيعي؟",a:"يوفّر صفات مختلفة يعمل عليها الانتخاب؛ فبدون تنوّع لا يحدث انتخاب."}],
  concl:"تكيّفت مناقير طيور داروين مع نوع الغذاء المتوافر في كلّ جزيرة عبر الانتخاب الطبيعي على مدى أجيال كثيرة."}});
function pop(f,gn){const best=FD[f][1];let P={th:1/3,sl:1/3,sh:1/3};for(let i=0;i<gn;i++){const fit={th:.5,sl:.5,sh:.5};fit[best]=1;let s=0;for(const k in P){P[k]*=fit[k];s+=P[k]}for(const k in P)P[k]/=s}return P}

/* ======================= 10) انتشار الفيروسات ======================= */
function sir(b,d){let S=99,I=1,R=0;const P=[[0,I]];for(let t=1;t<=d;t++){const ni=b*S*I/100,nr=I/5;S-=ni;I+=ni-nr;R+=nr;P.push([t,I])}return{S,I,R,P}}
const PREV={no:["بلا وقاية",.9],wash:["غسل اليدين",.55],mask:["غسل اليدين + الكمّامة",.35],stay:["+ البقاء في البيت عند المرض",.2]};
VLab.reg({id:"b10-virus",icon:"🦠",preview:{d:15},grade:"الصف العاشر",subject:"العلوم الحياتية",unit:"الوحدة 2: الفيروسات",src:"كتاب الأنشطة ص12",
 title:"نمذجة انتشار الفيروسات",question:"كيف تنتشر العدوى الفيروسية بين الطلبة؟ وما أثر إجراءات الوقاية؟",
 vars:[{k:"p",label:"إجراءات الوقاية",type:"seg",val:"no",c:"#2f8f5b",opts:Object.keys(PREV).map(k=>[k,PREV[k][0]])},{k:"d",label:"الأيام",unit:"يوم",min:0,max:40,step:1,val:0,c:"#e04848",ticks:[0,10,20,40]}],
 read(s){const r=sir(PREV[s.p][1],Math.round(s.d));const pk=sir(PREV[s.p][1],40).P.reduce((a,b)=>b[1]>a[1]?b:a);return[{label:"مصابون حاليًّا",val:String(Math.round(r.I))},{label:"تعافوا",val:String(Math.round(r.R))},{label:"لم يُصابوا",val:String(Math.round(r.S))},{label:"ذروة الإصابات",val:Math.round(pk[1])+" في اليوم "+pk[0]}]},
 draw(c,s,t,dt,S){const d=Math.round(s.d),r=sir(PREV[S.p][1],d);const R=rng(9);const nI=Math.round(r.I),nR=Math.round(r.R);for(let i=0;i<100;i++){const x=70+(i%10)*44+R()*10,y=130+((i/10)|0)*36+R()*8;const st=i<nI?"I":i<nI+nR?"R":"S";
   c.fillStyle=st==="I"?"#e04848":st==="R"?"#7f8c8d":"#5ab0ff";c.beginPath();c.arc(x+Math.sin(t*2+i)*2,y,11,0,7);c.fill();if(st==="I"){c.strokeStyle="rgba(224,72,72,.4)";c.lineWidth=2;c.beginPath();c.arc(x,y,16+Math.sin(t*4+i)*3,0,7);c.stroke()}}
  graph(c,540,120,390,300,Object.keys(PREV).map((k,i)=>[sir(PREV[k][1],40).P.slice(0,k===S.p?d+1:41),k===S.p?"#e04848":"rgba(255,255,255,.18)"]),40,60,"الأيام","المصابون");
  label(c,290,520,"🔵 سليم   🔴 مصاب   ⚪ متعافٍ","#f3dfa8",19)},
 challenges:[{t:"راقبي انتشار العدوى 40 يومًا بلا وقاية",test:s=>s.p==="no"&&s.d>=40},{t:"اخفضي ذروة الإصابات إلى أقلّ من 10",test:s=>sir(PREV[s.p][1],40).P.every(p=>p[1]<10)},{t:"قارني إجراءات الوقاية الأربعة",test:(s,h)=>h.p.size>=4},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أنمذج انتشار العدوى الفيروسية وأثر إجراءات الوقاية في الحدّ منها.",mats:"أكواب ماء (أحدها فيه مادّة تمثّل الفيروس)، كاشف، أوراق لتسجيل التبادلات.",steps:["اختاري إجراءات الوقاية، ثمّ حرّكي الأيام.","راقبي عدد المصابين والرسم البياني.","قارني ذروة الإصابات في الحالات المختلفة."],
  questions:[{q:"لماذا يزداد عدد المصابين بسرعة في البداية؟",a:"لأنّ كلّ مصاب ينقل العدوى لعدّة أشخاص، فيتضاعف عدد المصابين."},{q:"كيف تقلّل الكمّامة وغسل اليدين الانتشار؟",a:"تقلّل فرصة انتقال الفيروس من شخص إلى آخر فيقلّ معدّل العدوى."},{q:"لماذا لا تُعالج الأمراض الفيروسية بالمضادّات الحيوية؟",a:"لأنّ المضادّات الحيوية تؤثّر في البكتيريا لا في الفيروسات."}],
  concl:"تنتشر الفيروسات بسرعة عبر المخالطة، وتقلّل إجراءات الوقاية معدّل العدوى وذروة الإصابات."}});

/* ======================= 11) البريونات ======================= */
VLab.reg({id:"b10-prion",icon:"🧩",preview:{t:20},grade:"الصف العاشر",subject:"العلوم الحياتية",unit:"الوحدة 2: الفيروسات",src:"كتاب الأنشطة ص14",
 title:"تركيب البريونات وطريقة عملها",question:"كيف يحوّل البريون البروتينات الطبيعية إلى بروتينات مشوّهة؟",
 vars:[{k:"n",label:"عدد البريونات الأولى",unit:"",min:0,max:3,step:1,val:1,c:"#e04848",ticks:[0,1,2,3]},{k:"t",label:"الزمن",unit:"أسبوع",min:0,max:30,step:1,val:0,c:"#B8902A",ticks:[0,10,20,30]}],
 read(s){const k=Math.round(s.n)?Math.min(40,Math.round(s.n*Math.pow(1.25,s.t))):0;return[{label:"بروتينات مشوّهة",val:String(k)+" من 40"},{label:"بروتينات طبيعية",val:String(40-k)},{label:"الحالة",val:k>=30?"تكوّن تجمّعات تُتلف الخلايا العصبية":k>0?"انتشار التشوّه":"لا يوجد بريون"},{label:"طبيعة البريون",val:"بروتين مشوّه الطيّ بلا مادّة وراثية"}]},
 draw(c,s,t,dt,S){const k=Math.round(s.n)?Math.min(40,Math.round(s.n*Math.pow(1.25,s.t))):0;for(let i=0;i<40;i++){const x=110+(i%10)*76,y=150+((i/10)|0)*80;const bad=i<k;
   if(!bad){c.strokeStyle="#3fae3f";c.lineWidth=4;c.beginPath();for(let a=0;a<=14;a+=.3){const xx=x-20+a*3,yy=y+Math.sin(a*1.6+t)*10;a?c.lineTo(xx,yy):c.moveTo(xx,yy)}c.stroke()}
   else{c.strokeStyle="#e04848";c.lineWidth=4;c.beginPath();for(let j=0;j<4;j++){c.moveTo(x-20,y-12+j*8);c.lineTo(x+20,y-12+j*8)}c.stroke();if(k>=30){c.fillStyle="rgba(224,72,72,.15)";c.fillRect(x-30,y-28,60,56)}}}
  label(c,480,500,"🟢 بروتين طبيعي (لولبي ألفا)   🔴 بريون (صفائح بيتا مشوّهة)","#f3dfa8",19)},
 challenges:[{t:"راقبي الانتشار حتى تتشوّه معظم البروتينات",test:s=>s.n>0&&Math.round(s.n*Math.pow(1.25,s.t))>=30},{t:"جرّبي بدون بريون",test:s=>Math.round(s.n)===0&&s.t>=10},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أنمذج تركيب البريونات وطريقة تحويلها للبروتينات الطبيعية.",mats:"منظّفات أنابيب أو أسلاك ملوّنة تمثّل البروتينات.",steps:["ابدئي ببريون واحد وحرّكي الزمن.","لاحظي تحوّل البروتينات الطبيعية عند ملامستها البريون.","قارني ذلك بعدم وجود بريون."],
  questions:[{q:"ما الفرق بين البريون والفيروس؟",a:"البريون بروتين فقط بلا مادّة وراثية، أمّا الفيروس فيحتوي مادّة وراثية داخل غلاف بروتيني."},{q:"كيف يتكاثر البريون؟",a:"يحوّل البروتين الطبيعي المماثل له إلى شكله المشوّه عند التلامس."},{q:"اذكري مرضًا تسبّبه البريونات.",a:"مرض جنون البقر (اعتلال الدماغ الإسفنجي البقري)، ومرض كروتزفيلد-جاكوب في الإنسان."}],
  concl:"البريونات بروتينات مشوّهة الطيّ تُحدث أمراضًا بتحويل البروتينات الطبيعية إلى شكلها المشوّه فتتجمّع وتتلف أنسجة الدماغ."}});

/* ======================= 12) إنتاج العالم من بعض المعادن ======================= */
const PROD={ph:["صخر الفوسفات","مليون طن",[["الصين",90],["المغرب",35],["الولايات المتّحدة",20],["روسيا",14],["الأردن",11]]],po:["البوتاس","مليون طن",[["كندا",14],["روسيا",7],["بيلاروسيا",6],["الصين",6],["الأردن",1.7]]],
 fe:["خام الحديد","مليون طن",[["أستراليا",950],["البرازيل",430],["الصين",280],["الهند",280],["روسيا",90]]],cu:["النحاس","مليون طن",[["تشيلي",5],["البيرو",2.6],["الكونغو الديمقراطية",2.5],["الصين",1.7],["الولايات المتّحدة",1.1]]]};
VLab.reg({id:"e9-production",icon:"📊",preview:{m:"ph"},grade:"الصف التاسع",subject:"علوم الأرض",unit:"الوحدة 1: المعادن",src:"كتاب الأنشطة ص14",
 title:"إنتاج العالم من بعض المعادن",question:"ما الدول الأكثر إنتاجًا لبعض المعادن المهمّة؟ وما مكانة الأردن بينها؟",
 vars:[{k:"m",label:"المعدن",type:"seg",val:"ph",c:"#7A1F2E",opts:Object.keys(PROD).map(k=>[k,PROD[k][0]])}],
 read(s){const P=PROD[s.m];const tot=P[2].reduce((a,b)=>a+b[1],0);return[{label:"المعدن",val:P[0]},{label:"الدولة الأولى",val:P[2][0][0]+" ("+P[2][0][1]+" "+P[1]+")"},{label:"الأردن",val:P[2].find(x=>x[0]==="الأردن")?"من أكبر المنتجين عالميًّا":"ليس بين الخمسة الأوائل"},{label:"ملاحظة",val:"أرقام تقريبية سنوية لأغراض النشاط"}]},
 draw(c,s,t,dt,S){const P=PROD[S.m];const mx=P[2][0][1];P[2].forEach(([n,v],i)=>{const y=150+i*62,w=Math.max(4,v/mx*520);const jo=n==="الأردن";c.fillStyle=jo?"#B8902A":"#7A1F2E";rr(c,W-140-w,y,w,44,8);c.fill();
   txt(c,W-120,y+22,n,jo?"#ffd34d":"#fff",19,"left");ltr(c,()=>txt(c,W-150-w,y+22,String(v),"#fff",17,"right"))});label(c,480,475,P[0]+" ("+P[1]+" سنويًّا، تقريبي)","#f3dfa8",20)},
 challenges:[{t:"قارني المعادن الأربعة",test:(s,h)=>h.m.size>=4},{t:"جدي معدنين يُعدّ الأردن من كبار منتجيهما",test:(s,h)=>h.m.has("ph")&&h.m.has("po")},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أقرأ بيانات إنتاج العالم من بعض المعادن وأمثّلها بيانيًّا، وأتعرّف مكانة الأردن.",mats:"جدول بيانات الإنتاج، ورق رسم بياني.",steps:["اختاري المعدن واقرئي الرسم البياني.","حدّدي الدولة الأولى في الإنتاج.","ابحثي عن مكانة الأردن في إنتاج الفوسفات والبوتاس."],
  questions:[{q:"ما المعدنان اللذان يُعدّ الأردن من كبار منتجيهما؟",a:"الفوسفات والبوتاس."},{q:"فيمَ يُستخدم الفوسفات والبوتاس؟",a:"في صناعة الأسمدة الزراعية بشكل رئيس."},{q:"أين يُستخرج البوتاس في الأردن؟",a:"من مياه البحر الميّت."}],
  concl:"تتوزّع المعادن في العالم توزيعًا غير متساوٍ، ويُعدّ الأردن من كبار منتجي الفوسفات والبوتاس."}});

/* ======================= 13) الموازنة المائية لمسطّح مائي ======================= */
VLab.reg({id:"e9-budget",icon:"💧",preview:{r:6},grade:"الصف التاسع",subject:"علوم الأرض",unit:"الوحدة 2: المياه",src:"كتاب الأنشطة ص22",
 title:"حساب الموازنة المائية لمسطّح مائي",question:"متى يرتفع منسوب البحيرة ومتى ينخفض؟",
 vars:[{k:"r",label:"الأمطار + الجريان السطحي الداخل",unit:"مليون m³",min:0,max:20,step:1,val:8,c:"#2b7bd6",ticks:[0,10,20]},{k:"ev",label:"التبخّر",unit:"مليون m³",min:0,max:20,step:1,val:10,c:"#e04848",ticks:[0,10,20]},{k:"p",label:"الضخّ والاستهلاك",unit:"مليون m³",min:0,max:10,step:1,val:2,c:"#B8902A",ticks:[0,5,10]}],
 read(s){const b=s.r-s.ev-s.p;return[{label:"المدخلات",val:s.r.toFixed(0)+" مليون m³"},{label:"المخرجات",val:(s.ev+s.p).toFixed(0)+" مليون m³"},{label:"الموازنة المائية",val:(b>0?"+":"")+b.toFixed(0)+" مليون m³"},{label:"المنسوب",val:b>0?"يرتفع (فائض)":b<0?"ينخفض (عجز)":"ثابت (متوازن)"}]},
 draw(c,s,t,dt,S){const b=s.r-s.ev-s.p;const lv=330-b*6;c.fillStyle="#8a6a4a";c.beginPath();c.moveTo(120,250);c.quadraticCurveTo(480,560,840,250);c.lineTo(840,470);c.lineTo(120,470);c.fill();
  c.save();c.beginPath();c.moveTo(120,250);c.quadraticCurveTo(480,560,840,250);c.lineTo(840,120);c.lineTo(120,120);c.clip();c.fillStyle="rgba(50,120,200,.8)";c.fillRect(0,lv,W,400);c.restore();
  c.strokeStyle="#fff";c.setLineDash([8,6]);c.beginPath();c.moveTo(150,330);c.lineTo(810,330);c.stroke();c.setLineDash([]);txt(c,160,318,"المنسوب السابق","#fff",14,"left");
  for(let i=0;i<Math.round(s.r);i++){const x=200+((i*67)%500),y=130+((t*200+i*40)%(lv-140));c.strokeStyle="#bfe2ff";c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.lineTo(x-3,y+12);c.stroke()}
  for(let i=0;i<Math.round(s.ev);i++){const x=300+((i*53)%360),y=lv-((t*60+i*25)%120);c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+6,y-8,x,y-16);c.stroke()}
  c.fillStyle="#555";c.fillRect(790,lv-60,16,80);label(c,798,lv-74,"مضخّة","#fff",15);
  ltr(c,()=>card(c,40,96,240,100,"الموازنة",(b>0?"+":"")+b.toFixed(0)+" مليون m³",null))},
 challenges:[{t:"اجعلي البحيرة في حالة عجز",test:s=>s.r-s.ev-s.p<0},{t:"حقّقي التوازن المائي",test:s=>s.r-s.ev-s.p===0},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أحسب الموازنة المائية لمسطّح مائي وأفسّر تغيّر منسوبه.",mats:"بيانات المدخلات والمخرجات لبحيرة أو سدّ.",steps:["حدّدي كمّيات المدخلات (أمطار، جريان) والمخرجات (تبخّر، ضخّ).","احسبي الموازنة = المدخلات − المخرجات.","لاحظي أثرها في المنسوب."],
  questions:[{q:"ما المقصود بالموازنة المائية؟",a:"الفرق بين كمّية المياه الداخلة إلى المسطّح المائي والخارجة منه خلال مدّة زمنية."},{q:"لماذا ينخفض منسوب البحر الميّت؟",a:"لأنّ التبخّر وتحويل مياه نهر الأردن والاستهلاك أكبر من المياه الداخلة إليه."},{q:"احسبي الموازنة إذا كانت المدخلات 12 والمخرجات 15 مليون m³.",a:"−3 مليون m³ (عجز)."}],
  concl:"يرتفع منسوب المسطّح المائي عندما تزيد المدخلات على المخرجات، وينخفض عند العجز."}});

/* ======================= 14) الصوف الصخري والعزل الحراري ======================= */
const INSU={none:["بلا عازل",.06],cot:["قطن",.03],rw:["صوف صخري",.012],fo:["رقائق ألمنيوم",.045]};
VLab.reg({id:"e10-rockwool",icon:"🧱",preview:{t:20},grade:"الصف العاشر",subject:"علوم الأرض",unit:"الوحدة 1: الصخور",src:"كتاب الأنشطة ص12",
 title:"الصوف الصخري Rockwool والعزل الحراري",question:"لماذا يُستخدم الصوف الصخري المصنوع من صخر البازلت عازلًا حراريًّا في المباني؟",
 vars:[{k:"t",label:"الزمن",unit:"دقيقة",min:0,max:30,step:1,val:0,c:"#e04848",ticks:[0,10,20,30]}],
 read(s){return Object.keys(INSU).map(k=>({label:INSU[k][0],val:(25+55*Math.exp(-INSU[k][1]*s.t)).toFixed(1)+" °C"})).concat([{label:"أفضل عازل",val:"الصوف الصخري"}])},
 draw(c,s,t,dt,S){Object.keys(INSU).forEach((k,i)=>{const x=110+i*120,T2=25+55*Math.exp(-INSU[k][1]*s.t);c.fillStyle=k==="rw"?"#c8b89a":k==="cot"?"#fbfbf5":k==="fo"?"#c9ccd3":"rgba(0,0,0,0)";rr(c,x-42,240,84,150,10);c.fill();
   c.fillStyle="rgba(180,220,255,.35)";rr(c,x-30,250,60,130,6);c.fill();c.fillStyle="rgba(230,120,90,"+(.2+.6*(T2-25)/55)+")";c.fillRect(x-28,280,56,98);c.fillStyle="#fff";c.fillRect(x-3,170,6,160);c.fillStyle="#e04848";c.fillRect(x-3,330-(T2-20)*2.4,6,(T2-20)*2.4);c.beginPath();c.arc(x,334,8,0,7);c.fill();
   txt(c,x,420,INSU[k][0],"#f3dfa8",16);ltr(c,()=>txt(c,x,150,T2.toFixed(1)+"°C","#fff",16));if(T2>45)for(let j=0;j<3;j++){c.strokeStyle="rgba(255,255,255,.3)";c.beginPath();const yy=240-((t*30+j*15)%40);c.moveTo(x-10+j*10,yy);c.quadraticCurveTo(x-4+j*10,yy-8,x-10+j*10,yy-16);c.stroke()}});
  graph(c,590,120,340,300,Object.keys(INSU).map((k,i)=>[[...Array(Math.round(s.t)+1)].map((_,m)=>[m,25+55*Math.exp(-INSU[k][1]*m)]),["#e04848","#f3f3f3","#c8b89a","#7fb3ff"][i]]),30,85,"الزمن (دقيقة)","°C")},
 challenges:[{t:"راقبي التبريد 30 دقيقة",test:s=>s.t>=30},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أقارن كفاءة الصوف الصخري في العزل الحراري بموادّ أخرى.",mats:"4 كؤوس ماء ساخن، صوف صخري، قطن، رقائق ألمنيوم، موازين حرارة، ساعة إيقاف.",steps:["لُفّي الكؤوس بالمواد المختلفة واتركي أحدها بلا عازل.","حرّكي الزمن وسجّلي درجات الحرارة كلّ 5 دقائق.","ارسمي منحنيات التبريد وقارني."],
  questions:[{q:"أيّ الكؤوس بردت أبطأ؟ ولماذا؟",a:"المغلّف بالصوف الصخري؛ لأنّ أليافه تحبس الهواء فتقلّل انتقال الحرارة."},{q:"من أيّ صخر يُصنع الصوف الصخري؟",a:"من صهر صخر البازلت (صخر ناري) ونفخه على شكل ألياف."},{q:"اذكري ميزتين للصوف الصخري.",a:"عازل جيّد للحرارة والصوت، ومقاوم للحريق."}],
  concl:"الصوف الصخري المصنوع من البازلت عازل حراري ممتاز، لذا يُستخدم في عزل المباني لتوفير الطاقة."}});


/* ======================= 15) مختبر بناء الروابط (تجريب حرّ) ======================= */
const BE={H:[1,0,2.20,"#eef2f7","الهيدروجين"],Li:[1,1,.98,"#c9a0ff","الليثيوم"],Na:[1,1,.93,"#b58cff","الصوديوم"],K:[1,1,.82,"#9a6ae0","البوتاسيوم"],Mg:[2,1,1.31,"#7fd0a8","المغنيسيوم"],Ca:[2,1,1.00,"#5fbf8f","الكالسيوم"],Al:[3,1,1.61,"#b8c2cc","الألمنيوم"],
 C:[4,0,2.55,"#55555e","الكربون"],N:[5,0,3.04,"#3b6fe0","النيتروجين"],O:[6,0,3.44,"#e04848","الأكسجين"],F:[7,0,3.98,"#8fd14f","الفلور"],Cl:[7,0,3.16,"#3fbf5f","الكلور"],S:[6,0,2.58,"#e8c42a","الكبريت"]};
const BMIS={NaCl:["Na","Cl"],MgO:["Mg","O"],MgCl2:["Mg","Cl"],CaF2:["Ca","F"],Al2O3:["Al","O"],H2:["H"],HCl:["H","Cl"],H2O:["H","O"],NH3:["N","H"],CH4:["C","H"],CO2:["C","O"],N2:["N"],O2:["O"],free:Object.keys(BE)};
const BNAME={NaCl:"كلوريد الصوديوم",MgO:"أكسيد المغنيسيوم",MgCl2:"كلوريد المغنيسيوم",CaF2:"فلوريد الكالسيوم",Al2O3:"أكسيد الألمنيوم",H2:"جزيء الهيدروجين",HCl:"كلوريد الهيدروجين",H2O:"الماء",NH3:"الأمونيا",CH4:"الميثان",CO2:"ثاني أكسيد الكربون",N2:"جزيء النيتروجين",O2:"جزيء الأكسجين",F2:"جزيء الفلور",Cl2:"جزيء الكلور",LiF:"فلوريد الليثيوم",LiCl:"كلوريد الليثيوم",KCl:"كلوريد البوتاسيوم",KF:"فلوريد البوتاسيوم",NaF:"فلوريد الصوديوم",Na2O:"أكسيد الصوديوم",K2O:"أكسيد البوتاسيوم",Li2O:"أكسيد الليثيوم",CaO:"أكسيد الكالسيوم",CaCl2:"كلوريد الكالسيوم",MgF2:"فلوريد المغنيسيوم",Na2S:"كبريتيد الصوديوم",MgS:"كبريتيد المغنيسيوم",CaS:"كبريتيد الكالسيوم",AlCl3:"كلوريد الألمنيوم",AlF3:"فلوريد الألمنيوم",HF:"فلوريد الهيدروجين",H2S:"كبريتيد الهيدروجين",CCl4:"رباعي كلوريد الكربون",CF4:"رباعي فلوريد الكربون",NCl3:"ثلاثي كلوريد النيتروجين",OF2:"ثنائي فلوريد الأكسجين",CS2:"ثنائي كبريتيد الكربون",SCl2:"ثنائي كلوريد الكبريت",ClF:"فلوريد الكلور",NF3:"ثلاثي فلوريد النيتروجين",SO2:"—",HCN:"سيانيد الهيدروجين",C2H6:"الإيثان",C2H4:"الإيثين",C2H2:"الإيثاين",N2H4:"الهيدرازين",H2O2:"فوق أكسيد الهيدروجين"};
const SUBD=s=>s.replace(/\d/g,d=>"₀₁₂₃₄₅₆₇₈₉"[d]);
const BB={atoms:[],bonds:[],ion:[],msg:"اضغطي على عنصر من الصندوق في الأسفل لتضيفي ذرّة إلى طاولة العمل",mc:"#f3dfa8",res:null,made:new Set(),types:new Set(),wrong:0,orders:new Set(),drag:null,cnt:0};
const BR=40,BTOP=190,BBOT=440;
const bVal=s=>BE[s][0],bMet=s=>!!BE[s][1],bTgt=s=>s==="H"?2:8;
const bOrd=(i)=>BB.bonds.reduce((a,b)=>a+((b.i===i||b.j===i)?b.o:0),0);
const bNeed=i=>{const A=BB.atoms[i];return bMet(A.s)?A.e:bTgt(A.s)-(A.e+2*bOrd(i))};
const bChg=i=>{const A=BB.atoms[i];return bVal(A.s)-A.e-bOrd(i)};
const bStable=i=>{const A=BB.atoms[i];return bMet(A.s)?A.e===0:bNeed(i)===0};
function bSay(m,c){BB.msg=m;BB.mc=c||"#f3dfa8";BB.cnt++;if(VLab.cur&&VLab.cur.def&&VLab.cur.def.id==="c10-bondlab")VLab.cur.set("n",BB.cnt%1000)}
function bReset(){BB.atoms=[];BB.bonds=[];BB.ion=[];BB.res=null;bSay("طاولة العمل فارغة: أضيفي الذرّات من الصندوق في الأسفل")}
function bAdd(s){if(BB.atoms.length>=8){bSay("الطاولة ممتلئة (8 ذرّات). اسحبي ذرّة غير مرتبطة إلى سلّة المهملات 🗑","#ffb3a0");return}
 const slots=[];for(let r=0;r<2;r++)for(let k=0;k<5;k++)slots.push([170+k*155,BTOP+55+r*160]);const free=slots.find(([x,y])=>BB.atoms.every(a=>Math.hypot(a.x-x,a.y-y)>110))||[480,300];
 BB.atoms.push({s,x:free[0],y:free[1],e:bVal(s)});bSay("أُضيفت ذرّة "+BE[s][4]+" ("+s+"): لها "+bVal(s)+" إلكترون تكافؤ. "+(bMet(s)?"فلزّ":"لافلزّ")+" · الكهرسلبية "+BE[s][2]);bEval()}
function bPlace(i,j,d){const A=BB.atoms[i],B=BB.atoms[j];const a0=Math.atan2(B.y-A.y,B.x-A.x);for(const k of [0,1,-1,2,-2,3,-3,4]){const a=a0+k*Math.PI/4,x=A.x+Math.cos(a)*d,y=A.y+Math.sin(a)*d;if(x<70||x>890||y<BTOP+10||y>BBOT)continue;if(BB.atoms.every((o,q)=>q===i||q===j||Math.hypot(o.x-x,o.y-y)>160)){B.x=x;B.y=y;return}}bPull(i,j,d)}
function bPull(i,j,d){const A=BB.atoms[i],B=BB.atoms[j];const dx=B.x-A.x,dy=B.y-A.y,L=Math.hypot(dx,dy)||1;B.x=A.x+dx/L*d;B.y=A.y+dy/L*d;B.x=Math.max(70,Math.min(890,B.x));B.y=Math.max(BTOP+20,Math.min(BBOT-10,B.y))}
function bAct(tool,i,j){const A=BB.atoms[i],B=BB.atoms[j],dEN=Math.abs(BE[A.s][2]-BE[B.s][2]).toFixed(2);
 if(tool==="tr"){if(!bMet(A.s)&&!bMet(B.s)){BB.wrong|=1;return bSay("❌ لم ينتقل الإلكترون! "+A.s+" و"+B.s+" لافلزّان، وفرق الكهرسلبية بينهما "+dEN+" فقط، فلا تفقد أيّ ذرّة إلكترونها للأخرى. جرّبي «🤝 المشاركة»","#ffb3a0")}
  if(bMet(A.s)&&bMet(B.s)){BB.wrong|=1;return bSay("❌ "+A.s+" و"+B.s+" فلزّان، وكلاهما يميل إلى فقد الإلكترونات لا كسبها","#ffb3a0")}
  if(!bMet(A.s)&&bMet(B.s)){BB.wrong|=1;return bSay("❌ الاتّجاه معكوس: الفلزّ ("+B.s+") هو الذي يفقد الإلكترونات لأنّ كهرسلبيته أقلّ. اسحبي من "+B.s+" إلى "+A.s,"#ffb3a0")}
  if(A.e===0)return bSay("✋ "+A.s+" فقد جميع إلكترونات تكافئه وأصبح أيونًا موجبًا مستقرًّا "+A.s+bChgTxt(i)+". أضيفي ذرّة لافلزّ أخرى إن احتاج غيره","#ffd27a");
  if(bNeed(j)<=0)return bSay("✋ "+B.s+" اكتمل مستواه الخارجي (8 إلكترونات) ولا يستقبل المزيد. أضيفي ذرّة "+B.s+" أخرى لتستقبل بقيّة إلكترونات "+A.s,"#ffd27a");
  A.e--;B.e++;if(!BB.ion.some(p=>p[0]===i&&p[1]===j))BB.ion.push([i,j]);bPlace(i,j,185);bSay("✔ انتقل إلكترون من "+A.s+" إلى "+B.s+" (فرق الكهرسلبية "+dEN+" كبير). "+A.s+" → "+A.s+bChgTxt(i)+" ، "+B.s+" → "+B.s+bChgTxt(j),"#9dffb8")}
 else{if(bMet(A.s)||bMet(B.s)){BB.wrong|=2;const m=bMet(A.s)?A.s:B.s;return bSay("❌ لم تتكوّن رابطة تساهمية! "+m+" فلزّ يميل إلى فقد إلكتروناته لا مشاركتها (فرق الكهرسلبية "+dEN+"). جرّبي «🔀 نقل إلكترون»","#ffb3a0")}
  if(bNeed(i)<=0||bNeed(j)<=0){const f=bNeed(i)<=0?A.s:B.s;return bSay("✋ "+f+" مستواه الخارجي مكتمل، ولا يحتاج مشاركة إلكترونات أخرى","#ffd27a")}
  let b=BB.bonds.find(b=>(b.i===i&&b.j===j)||(b.i===j&&b.j===i));if(b&&b.o>=3)return bSay("✋ الرابطة الثلاثية أقصى ما يمكن بين ذرّتين","#ffd27a");
  if(!b){b={i,j,o:0};BB.bonds.push(b)}b.o++;A.e--;B.e--;bPlace(i,j,b.o>1?135:140);BB.orders.add(b.o);bSay("✔ تشاركت "+A.s+" و"+B.s+" في زوج إلكترونات: رابطة تساهمية "+["","أحادية","ثنائية","ثلاثية"][b.o]+" (فرق الكهرسلبية "+dEN+")","#9dffb8")}
 bEval()}
const bChgTxt=i=>{const q=bChg(i);return q===0?"":(Math.abs(q)>1?Math.abs(q):"")+(q>0?"⁺":"⁻")};
function bEval(){BB.res=null;const n=BB.atoms.length;if(n<2)return;if(!BB.atoms.every((a,i)=>bStable(i)))return;
 const tot=BB.atoms.reduce((s,a,i)=>s+bChg(i),0);if(tot!==0)return;
 const par=[...Array(n).keys()];const f=x=>par[x]===x?x:(par[x]=f(par[x]));BB.bonds.forEach(b=>par[f(b.i)]=f(b.j));BB.ion.forEach(([a,b])=>par[f(a)]=f(b));if(new Set(BB.atoms.map((a,i)=>f(i))).size>1)return;
 const cnt={};BB.atoms.forEach(a=>cnt[a.s]=(cnt[a.s]||0)+1);let els=Object.keys(cnt).sort((a,b)=>BE[a][2]-BE[b][2]);if(cnt.H&&(cnt.C||cnt.N)){els=els.filter(e=>e!=="H");els.splice(1,0,"H")}
 const fm=els.map(e=>e+(cnt[e]>1?cnt[e]:"")).join("");const ionic=BB.ion.length>0;BB.res={fm,ionic,name:BNAME[fm]&&BNAME[fm]!=="—"?BNAME[fm]:"مركّب "+fm};
 if(!BB.made.has(fm)){BB.made.add(fm);BB.types.add(ionic?"i":"c")}
 bSay("🎉 أحسنتِ! كوّنتِ "+SUBD(fm)+" ("+BB.res.name+"): "+(ionic?"مركّب أيوني تربط أيوناته قوى تجاذب كهربائية":"مركّب تساهمي، وكلّ ذرّاته حقّقت قاعدة "+(fm==="H2"?"الثنائية":"الثمانية")),"#ffd34d")}
function bHit(x,y){let best=-1,bd=1e9;BB.atoms.forEach((a,i)=>{const d=Math.hypot(a.x-x,a.y-y);if(d<bd){bd=d;best=i}});return[best,bd]}
function bTray(S){const L=BMIS[S.m];const w=Math.min(96,860/L.length);return L.map((s,k)=>({s,x:480-(L.length*w)/2+k*w,y:470,w:w-8,h:80}))}
function bInstall(cv,S){if(cv._bl||!VLab.cur||VLab.cur.def.id!=="c10-bondlab")return;cv._bl=1;cv.style.touchAction="none";const P=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height]};
 cv.addEventListener("pointerdown",e=>{const S2=VLab.cur?VLab.cur.S:S;const[x,y]=P(e);cv.setPointerCapture(e.pointerId);
  const tb=bTray(S2).find(b=>x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h);if(tb){bAdd(tb.s);return}
  if(x>40&&x<190&&y>96&&y<154){bReset();return}
  const[i,d]=bHit(x,y);if(i<0)return;if(d<BR*.72)BB.drag={k:"m",i,x,y,ox:BB.atoms[i].x-x,oy:BB.atoms[i].y-y};else if(d<BR*1.9){if(BB.atoms[i].e<=0&&(S2.tool==="tr")){bSay("✋ لا توجد إلكترونات تكافؤ متاحة على "+BB.atoms[i].s,"#ffd27a");return}BB.drag={k:"e",i,x,y}}});
 cv.addEventListener("pointermove",e=>{if(!BB.drag)return;const[x,y]=P(e);BB.drag.x=x;BB.drag.y=y;if(BB.drag.k==="m"){const A=BB.atoms[BB.drag.i];A.x=Math.max(60,Math.min(900,x+BB.drag.ox));A.y=Math.max(BTOP,Math.min(BBOT+40,y+BB.drag.oy))}});
 const up=e=>{const D=BB.drag;BB.drag=null;if(!D)return;const S2=VLab.cur?VLab.cur.S:S;
  if(D.k==="m"){const A=BB.atoms[D.i];if(D.x>820&&D.y<165){if(bOrd(D.i)||BB.ion.some(p=>p.includes(D.i))){A.y=BTOP+40;return bSay("✋ هذه الذرّة مرتبطة بغيرها. اضغطي «↺ من جديد» لتبدئي من البداية","#ffd27a")}
    BB.atoms.splice(D.i,1);BB.bonds.forEach(b=>{b.i-=b.i>D.i;b.j-=b.j>D.i});BB.ion=BB.ion.map(p=>p.map(q=>q-(q>D.i)));bSay("🗑 حُذفت الذرّة");bEval()}return}
  const[j,d]=bHit(D.x,D.y);if(j<0||j===D.i||d>BR*1.6){bSay("أفلتي الإلكترون فوق ذرّة أخرى لتجرّبي "+(S2.tool==="tr"?"نقله إليها":"المشاركة معها"));return}bAct(S2.tool,D.i,j)};
 cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",()=>BB.drag=null)}
function bDrawAtom(c,i,t){const A=BB.atoms[i],col=BE[A.s][3],q=bChg(i),st=bStable(i);
 const g2=c.createRadialGradient(A.x-12,A.y-14,4,A.x,A.y,BR);g2.addColorStop(0,"#fff");g2.addColorStop(.25,col);g2.addColorStop(1,"rgba(0,0,0,.55)");c.fillStyle=g2;c.beginPath();c.arc(A.x,A.y,BR*(bMet(A.s)&&A.e===0&&q>0?.82:1),0,7);c.fill();
 if(st){c.strokeStyle="rgba(157,255,184,.9)";c.lineWidth=3;c.beginPath();c.arc(A.x,A.y,BR+20,0,7);c.stroke()}
 txt(c,A.x,A.y,A.s,A.s==="H"||A.s==="Al"||A.s==="S"||A.s==="F"?"#1a1a1a":"#fff",30);
 if(q!==0){c.strokeStyle="#ffd34d";c.lineWidth=3;const r=BR+24;c.beginPath();c.moveTo(A.x-r+12,A.y-r);c.lineTo(A.x-r,A.y-r);c.lineTo(A.x-r,A.y+r);c.lineTo(A.x-r+12,A.y+r);c.moveTo(A.x+r-12,A.y-r);c.lineTo(A.x+r,A.y-r);c.lineTo(A.x+r,A.y+r);c.lineTo(A.x+r-12,A.y+r);c.stroke();ltr(c,()=>txt(c,A.x+r+16,A.y-r+4,(Math.abs(q)>1?Math.abs(q):"")+(q>0?"+":"−"),"#ffd34d",24))}
 const dirs=[];BB.bonds.forEach(b=>{if(b.i===i||b.j===i){const O=BB.atoms[b.i===i?b.j:b.i];dirs.push(Math.atan2(O.y-A.y,O.x-A.x))}});
 let slots=[-Math.PI/2,0,Math.PI/2,Math.PI].map(a=>({a,n:0}));dirs.forEach(d=>{let best=null,bd=9;slots.forEach(s=>{const dd=Math.abs(Math.atan2(Math.sin(s.a-d),Math.cos(s.a-d)));if(!s.u&&dd<bd){bd=dd;best=s}});if(best)best.u=1});
 const free=slots.filter(s=>!s.u);let e=A.e;if(BB.drag&&BB.drag.k==="e"&&BB.drag.i===i&&e>0)e--;if(free.length){for(let k=0;k<e;k++)free[k%free.length].n++}
 free.forEach(s=>{const R=BR+13;for(let k=0;k<s.n;k++){const off=s.n>1?(k?7:-7):0;const px=A.x+Math.cos(s.a)*R-Math.sin(s.a)*off,py=A.y+Math.sin(s.a)*R+Math.cos(s.a)*off;c.fillStyle=BB.ion.some(p=>p[1]===i)&&k===s.n-1&&s.a===free[0].a?"#ffd34d":"#ffe9a0";c.beginPath();c.arc(px,py,6.5,0,7);c.fill();c.strokeStyle="#5a3a00";c.lineWidth=1.5;c.stroke()}})}
VLab.reg({id:"c10-bondlab",icon:"🧪",preview:{m:"NaCl"},grade:"الصف العاشر",subject:"الكيمياء",unit:"الوحدة 3: الروابط الكيميائية",src:"كتاب الطالب: الروابط الكيميائية",
 title:"مختبر بناء الروابط: جرّبي بنفسك",question:"إذا توافرت لديكِ ذرّات عناصر معيّنة، كيف تبنين منها مركّبًا مستقرًّا؟ ومتى تنتقل الإلكترونات (رابطة أيونية) ومتى تُشارَك (رابطة تساهمية)؟",
 vars:[{k:"m",label:"العناصر المتوافرة (المهمّة)",type:"seg",val:"NaCl",c:"#7A1F2E",opts:Object.keys(BMIS).map(k=>[k,k==="free"?"🧰 كلّ العناصر (حرّ)":BMIS[k].join(" + ")])},
  {k:"tool",label:"طريقة التجريب: اسحبي من حافّة ذرّة إلى ذرّة أخرى",type:"seg",val:"tr",c:"#2b7bd6",opts:[["tr","🔀 نقل إلكترون"],["sh","🤝 مشاركة زوج إلكترونات"]]},
  {k:"n",label:"",min:0,max:1000,step:1,val:0,hide:()=>true}],
 onSeg(S,k){if(k==="m")bReset()},
 read(s){const r=[{label:"آخر نتيجة",val:BB.msg.replace(/[🎉✔❌✋🗑]/g,"").trim()}];BB.atoms.forEach((a,i)=>{const nd=bNeed(i);r.push({label:a.s+bChgTxt(i)+" ("+(bMet(a.s)?"فلزّ":"لافلزّ")+")",val:bStable(i)?"مستقرّ ✔":bMet(a.s)?"يحتاج أن يفقد "+nd+" إلكترون":"يحتاج "+nd+" إلكترون"})});
  if(BB.res)r.push({label:"المركّب",val:BB.res.fm+" · "+BB.res.name},{label:"نوع الرابطة",val:BB.res.ionic?"أيونية":"تساهمية"});r.push({label:"مركّبات كوّنتِها",val:BB.made.size?[...BB.made].join("، "):"لا يوجد بعد"});return r},
 draw(c,s,t,dt,S){bInstall(c.canvas,S);
  c.fillStyle="rgba(255,255,255,.05)";rr(c,30,BTOP-10,900,BBOT-BTOP+70,22);c.fill();c.strokeStyle="rgba(243,223,168,.2)";c.setLineDash([10,8]);c.lineWidth=2;c.stroke();c.setLineDash([]);
  panel(c,40,100,150,50,"rgba(122,31,46,.85)");txt(c,115,125,"↺ من جديد","#fff",22);txt(c,875,125,"🗑","#fff",38);
  c.fillStyle="rgba(10,8,20,.72)";rr(c,200,84,620,96,14);c.fill();{c.save();c.font="700 21px Cairo, sans-serif";const ws=BB.msg.split(" ");const L=[""];ws.forEach(w=>{const tt=(L[L.length-1]+" "+w).trim();if(c.measureText(tt).width>600&&L[L.length-1])L.push(w);else L[L.length-1]=tt});c.restore();const ls=L.slice(0,3);if(L.length>3)ls[2]+="…";ls.forEach((l,k)=>txt(c,510,132+(k-(ls.length-1)/2)*29,l,BB.mc,21,"center",604))}
  BB.ion.forEach(([a,b])=>{const A=BB.atoms[a],B=BB.atoms[b];if(!A||!B||bChg(a)<=0)return;c.strokeStyle="rgba(255,211,77,.55)";c.lineWidth=3;c.setLineDash([6,8]);c.lineDashOffset=-t*20;c.beginPath();c.moveTo(A.x,A.y);c.lineTo(B.x,B.y);c.stroke();c.setLineDash([]);txt(c,(A.x+B.x)/2,(A.y+B.y)/2+BR+22,"تجاذب","#ffd34d",16)});
  BB.bonds.forEach(b=>{const A=BB.atoms[b.i],B=BB.atoms[b.j];const dx=B.x-A.x,dy=B.y-A.y,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L;for(let k=0;k<b.o;k++){const o=(k-(b.o-1)/2)*16;c.strokeStyle="rgba(255,255,255,.85)";c.lineWidth=5;c.beginPath();c.moveTo(A.x+nx*o,A.y+ny*o);c.lineTo(B.x+nx*o,B.y+ny*o);c.stroke();
   const mx=(A.x+B.x)/2+nx*o,my=(A.y+B.y)/2+ny*o;[-1,1].forEach(sg=>{c.fillStyle="#ffe9a0";c.beginPath();c.arc(mx+dx/L*sg*8,my+dy/L*sg*8,6,0,7);c.fill();c.strokeStyle="#5a3a00";c.lineWidth=1.5;c.stroke()})}});
  BB.atoms.forEach((a,i)=>bDrawAtom(c,i,t));
  if(BB.drag&&BB.drag.k==="e"){const A=BB.atoms[BB.drag.i];c.strokeStyle=S.tool==="tr"?"#ffd34d":"#7fd0ff";c.lineWidth=3;c.setLineDash([8,6]);c.beginPath();c.moveTo(A.x,A.y);c.lineTo(BB.drag.x,BB.drag.y);c.stroke();c.setLineDash([]);c.fillStyle="#ffd34d";c.beginPath();c.arc(BB.drag.x,BB.drag.y,9,0,7);c.fill();
   const[j,d]=bHit(BB.drag.x,BB.drag.y);if(j>=0&&j!==BB.drag.i&&d<BR*1.6){const B=BB.atoms[j];c.strokeStyle="#fff";c.lineWidth=3;c.beginPath();c.arc(B.x,B.y,BR+26,0,7);c.stroke()}}
  if(!BB.atoms.length){txt(c,480,280,"👇 اضغطي على العناصر لإضافة ذرّات، ثمّ اسحبي من حافّة ذرّة (عند الإلكترونات) إلى ذرّة أخرى","#cfd6e4",19,"center",820);txt(c,480,320,"جرّبي النقل والمشاركة، ولاحظي متى ينجح كلّ منهما","#cfd6e4",17)}
  if(BB.res){txt(c,480,BBOT+32,SUBD(BB.res.fm)+" · "+BB.res.name+" · "+(BB.res.ionic?"رابطة أيونية":"روابط تساهمية"),"#ffd34d",24)}
  bTray(S).forEach(b=>{const met=bMet(b.s);c.fillStyle=met?"rgba(122,31,46,.9)":"rgba(43,123,214,.85)";rr(c,b.x,b.y+40,b.w,b.h-6,14);c.fill();c.strokeStyle="#B8902A";c.lineWidth=2;c.stroke();txt(c,b.x+b.w/2,b.y+70,b.s,"#fff",b.w>70?28:22);txt(c,b.x+b.w/2,b.y+100,met?"فلزّ":"لافلزّ","#f3dfa8",12)})},
 challenges:[{t:"كوّني مركّبًا أيونيًّا",test:()=>BB.types.has("i")},{t:"كوّني مركّبًا تساهميًّا",test:()=>BB.types.has("c")},{t:"كوّني رابطة ثنائية أو ثلاثية",test:()=>BB.orders.has(2)||BB.orders.has(3)},{t:"اكتشفي متى يفشل نقل الإلكترون أو المشاركة",test:()=>BB.wrong>0},{t:"كوّني 5 مركّبات مختلفة",test:()=>BB.made.size>=5}],
 notebook:{goal:"أبني روابط أيونية وتساهمية بالتجريب، وأستنتج متى تنتقل الإلكترونات ومتى تُشارَك.",mats:"نماذج ذرّات (كرات) وخرز يمثّل إلكترونات التكافؤ، بطاقات العناصر، جدول الكهرسلبية.",
  steps:["اختاري العناصر المتوافرة (المهمّة)، ثمّ اضغطي على العناصر في الصندوق لإضافة ذرّاتها إلى الطاولة.","اختاري طريقة التجريب: «نقل إلكترون» أو «مشاركة زوج إلكترونات».","اسحبي من حافّة ذرّة (عند الإلكترونات) وأفلتي فوق ذرّة أخرى، واقرئي النتيجة في الشريط العلوي.","إذا لم تستقرّ كلّ الذرّات، فكّري: هل تحتاجين ذرّة إضافية؟ أضيفيها وكرّري.","عندما تستقرّ كلّ الذرّات يظهر اسم المركّب ونوع الرابطة. سجّلي القراءة ثمّ جرّبي مهمّة أخرى."],
  questions:[{q:"متى نجح نقل الإلكترون؟ ومتى فشل؟",a:"نجح من ذرّة فلزّ (كهرسلبيتها منخفضة) إلى ذرّة لافلزّ (كهرسلبيتها مرتفعة)، وفشل بين لافلزّين أو فلزّين أو في الاتّجاه المعكوس."},
   {q:"لماذا احتجتِ ذرّتي كلور لتكوين كلوريد المغنيسيوم؟",a:"لأنّ المغنيسيوم يفقد إلكترونين ليستقرّ، وكلّ ذرّة كلور تستقبل إلكترونًا واحدًا فقط لتكمل ثمانيّتها، فيلزم ذرّتا كلور: MgCl₂."},
   {q:"كم رابطة كوّنت ذرّة الكربون في الميثان؟ ولماذا؟",a:"أربع روابط تساهمية أحادية؛ لأنّ للكربون 4 إلكترونات تكافؤ ويحتاج 4 إلكترونات أخرى ليكمل ثمانيّته."},
   {q:"لماذا تكوّنت رابطة ثلاثية في جزيء النيتروجين N₂؟",a:"لأنّ كلّ ذرّة نيتروجين تحتاج 3 إلكترونات، فتشارك كلّ منهما بثلاثة إلكترونات فتتكوّن ثلاثة أزواج مشتركة."},
   {q:"ما الذي يربط الأيونات في المركّب الأيوني؟",a:"قوى التجاذب الكهربائي بين الأيونات الموجبة والسالبة."}],
  concl:"تتكوّن الرابطة الأيونية بانتقال الإلكترونات من الفلزّ إلى اللافلزّ عندما يكون فرق الكهرسلبية كبيرًا، وتتكوّن الرابطة التساهمية بمشاركة أزواج الإلكترونات بين اللافلزّات، وفي الحالتين تصل الذرّات إلى التركيب الإلكتروني المستقرّ (قاعدة الثمانية أو الثنائية للهيدروجين)."}});

})();
