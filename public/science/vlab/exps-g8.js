/* تجارب الصف الثامن — المختبر الافتراضي — تصميم وتنفيذ: نوال بني عطية */
(function(){const {W,H,g}=VLab;const {rr,card,lens,label}=g;

/* ===== 1) ضغط السائل والعمق ===== */
const LIQ={oil:{rho:0.92,c:"rgba(232,190,60,",n:"زيت"},water:{rho:1,c:"rgba(70,160,235,",n:"ماء"},salt:{rho:1.2,c:"rgba(60,200,190,",n:"ماء مالح"}};
const HOLES=[5,12,19],BX=250,BW=110,BB=330,PX=8,GROUND=462;
VLab.reg({id:"s8-pressure",icon:"💧",grade:"الصف الثامن",subject:"العلوم",unit:"الوحدة 3: الموائع",src:"كتاب الأنشطة والتجارب العملية ص32",
 title:"كيف يتغيّر ضغط السائل مع تغيّر العمق؟",
 question:"ما العلاقة بين ضغط السائل وعمقه؟ وهل يؤثّر نوع السائل في ضغطه؟",
 vars:[{k:"h",label:"ارتفاع السائل في القارورة",unit:"cm",min:0,max:30,step:1,val:26,c:"#2b7bd6",ticks:[30,20,10,0]},
  {k:"liq",label:"نوع السائل",type:"seg",val:"water",c:"#7A1F2E",opts:[["oil","🛢 زيت"],["water","💧 ماء"],["salt","🧂 ماء مالح"]]},
  {k:"open",label:"الثقوب",type:"seg",val:1,c:"#B8902A",opts:[[0,"🔒 مغلقة"],[1,"🔓 مفتوحة"]]}],
 read(s){const L=LIQ[s.liq],nm=["السفلي","الأوسط","العلوي"];const o=[];
  HOLES.forEach((y,i)=>{const d=Math.max(0,s.h-y);o.push({label:"ضغط السائل عند الثقب "+nm[i],val:Math.round(L.rho*1000*9.8*d/100),unit:"Pa"})});
  HOLES.forEach((y,i)=>{const d=Math.max(0,s.h-y),hf=(GROUND-(BB-y*PX))/PX;o.push({label:"مدى اندفاع السائل من الثقب "+nm[i],val:s.open?Math.round(2*Math.sqrt(d*hf)):0,unit:"cm"})});return o},
 draw(c,s,t){const L=LIQ[s.liq];
  // الحامل
  c.fillStyle="#6b4a2f";rr(c,BX-20,BB,BW+40,GROUND-BB+6,6);c.fill();c.fillStyle="rgba(0,0,0,.25)";c.fillRect(BX-20,BB,BW+40,6);
  // الوعاء
  c.fillStyle="rgba(200,215,230,.18)";c.strokeStyle="rgba(220,235,255,.5)";c.lineWidth=3;rr(c,BX+BW+20,GROUND-30,560,40,10);c.fill();c.stroke();
  c.fillStyle=L.c+".35)";rr(c,BX+BW+24,GROUND-12,552,18,8);c.fill();
  // السائل داخل القارورة
  const top=BB-30*PX;const lv=BB-s.h*PX;
  const lg=c.createLinearGradient(0,lv,0,BB);lg.addColorStop(0,L.c+".55)");lg.addColorStop(1,L.c+".9)");c.fillStyle=lg;c.fillRect(BX+4,lv,BW-8,BB-lv-4);
  c.strokeStyle="rgba(255,255,255,.6)";c.lineWidth=2;c.beginPath();for(let x=BX+4;x<=BX+BW-4;x+=4)c.lineTo(x,lv+Math.sin(x/9+t*4)*1.6);c.stroke();
  // القارورة
  c.strokeStyle="rgba(230,240,255,.75)";c.lineWidth=4;c.beginPath();c.moveTo(BX,top+30);c.lineTo(BX,BB);c.lineTo(BX+BW,BB);c.lineTo(BX+BW,top+30);c.quadraticCurveTo(BX+BW,top,BX+BW*.68,top-10);c.lineTo(BX+BW*.68,top-34);c.moveTo(BX+BW*.32,top-34);c.lineTo(BX+BW*.32,top-10);c.quadraticCurveTo(BX,top,BX,top+30);c.stroke();
  c.fillStyle="rgba(255,255,255,.12)";c.fillRect(BX+10,top+30,12,BB-top-40);
  // تدريج
  for(let k=0;k<=30;k+=5){const y=BB-k*PX;c.strokeStyle="rgba(255,255,255,.55)";c.lineWidth=2;c.beginPath();c.moveTo(BX-14,y);c.lineTo(BX-2,y);c.stroke();label(c,BX-38,y,String(k),"#f3dfa8",20)}
  label(c,BX-38,top-22,"cm","#f3dfa8",20);
  // صنبور يحافظ على المستوى
  if(s.h>0&&s.open){c.fillStyle="#9aa3ad";rr(c,BX+BW*.5-50,top-80,70,16,6);c.fill();c.fillRect(BX+BW*.5+6,top-80,10,30);
   for(let i=0;i<3;i++){const yy=top-46+((t*260+i*40)%Math.max(20,lv-top+40));c.fillStyle=L.c+".9)";c.beginPath();c.ellipse(BX+BW*.5+11,yy,3,6,0,0,7);c.fill()}}
  // الثقوب والاندفاع
  HOLES.forEach((hy,i)=>{const y=BB-hy*PX,x=BX+BW;const d=Math.max(0,s.h-hy);
   c.fillStyle="#111";c.beginPath();c.arc(x,y,6,0,7);c.fill();c.strokeStyle="#f3dfa8";c.lineWidth=2;c.stroke();
   if(!s.open){c.fillStyle="#d8d0b8";rr(c,x-4,y-10,14,20,3);c.fill()}
   else if(d>0.2){const v=Math.sqrt(2*9.8*d/100);const hf=(GROUND-y);
    const pts=[];for(let k=0;k<=40;k++){const tt=k/40*Math.sqrt(2*hf/PX/100/9.8);const px=x+v*tt*100*PX,py=y+.5*9.8*tt*tt*100*PX;pts.push([px,Math.min(py,GROUND)])}
    c.strokeStyle=L.c+".55)";c.lineWidth=3+d*.35;c.lineCap="round";c.beginPath();pts.forEach((p,j)=>j?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();
    c.fillStyle=L.c+".95)";for(let j=0;j<8;j++){const f=((t*1.6+j/8)%1+1)%1;const p=pts[Math.min(40,Math.floor(f*40))];c.beginPath();c.arc(p[0],p[1],2.5+d*.08,0,7);c.fill()}
    const e=pts[40];c.fillStyle="rgba(255,255,255,.5)";for(let j=0;j<4;j++){const a=t*8+j*1.7;c.beginPath();c.arc(e[0]+Math.cos(a)*8,e[1]-Math.abs(Math.sin(a))*8,2,0,7);c.fill()}}
   label(c,x-BW/2,y-16,["السفلي","الأوسط","العلوي"][i],"#fff",20);
   // سهم الضغط
   if(d>0){c.strokeStyle="#ff8a65";c.lineWidth=4;const al=10+d*2.2;c.beginPath();c.moveTo(BX+16,y);c.lineTo(BX+16+Math.min(al,BW-30),y);c.stroke()}});
  // البطاقات
  const P=Math.round(L.rho*1000*9.8*Math.max(0,s.h-5)/100);
  card(c,W-330,100,300,124,"ضغط الثقب السفلي",P+" Pa",P/3600,"#ff8a65");
  card(c,W-330,236,300,104,"كثافة السائل",L.rho.toFixed(2)+" g/cm³",null);
 },
 challenges:[{t:"جرّبي 3 ارتفاعات للسائل",test:(s,h)=>h.h.size>=4},
  {t:"قارني بين أنواع السوائل",test:(s,h)=>h.liq.size>=3},
  {t:"اجعلي الثقب العلوي يتوقّف والسفلي يندفع",test:s=>s.open&&s.h<=19&&s.h>=7},
  {t:"سجّلي 3 قراءات في الدفتر",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أستنتج العلاقة بين ضغط السائل وعمقه.",mats:"قارورة بلاستيكية فيها ثلاثة ثقوب على ارتفاعات مختلفة، شريط لاصق، ماء، وعاء بلاستيكي عميق.",
  steps:["افتحي الثقوب والقارورة مملوءة، وراقبي مسافة اندفاع السائل من كل ثقب.","افتحي «القراءات» وقارني الضغط عند الثقوب الثلاثة، ثم سجّلي القراءة.","اخفضي ارتفاع السائل تدريجيًّا، وراقبي ما يحدث للاندفاع وللضغط.","غيّري نوع السائل (زيت، ماء، ماء مالح) عند الارتفاع نفسه، وقارني الضغط.","أجيبي عن أسئلة التحليل."],
  questions:[{q:"من أيّ الثقوب يندفع السائل إلى أبعد مسافة؟ ولماذا؟",a:"من الثقب السفلي؛ لأنّ عمق السائل فوقه أكبر، فيكون ضغط السائل عنده أكبر."},
   {q:"ماذا يحدث لضغط السائل عند الثقب السفلي عندما ينخفض مستوى السائل في القارورة؟",a:"يقلّ الضغط؛ لأنّ العمق فوق الثقب يقلّ."},
   {q:"قارني ضغط الماء المالح وضغط الزيت عند العمق نفسه. ماذا تستنتجين؟",a:"ضغط الماء المالح أكبر؛ لأنّ كثافته أكبر، فالضغط يزداد بزيادة كثافة السائل. (لاحظي أنّ مدى الاندفاع يكاد لا يتغيّر بتغيّر نوع السائل، لذلك نقارن بقراءة الضغط نفسها.)"},
   {q:"لماذا تُبنى قاعدة السدّ أعرض من قمّته؟",a:"لأنّ ضغط الماء يزداد بزيادة العمق، فتتحمّل القاعدة ضغطًا أكبر من القمّة."}],
  concl:"يزداد ضغط السائل بزيادة العمق، ويزداد بزيادة كثافة السائل: الضغط = الكثافة × تسارع الجاذبية × العمق."}
});

/* ===== 2) أثر ملوحة مياه الريّ في النبات ===== */
function model(s){const salt=Math.max(0,1-s.s/18),wf=s.w===0?.05:Math.min(1,s.w/20)*(s.w>35?.85:1);
 const germ=s.d<2?0:Math.round(95*Math.pow(Math.max(0,1-s.s/22),.8)*(s.w===0?.2:1));const germ0=s.d<2?0:Math.round(95*(s.w===0?.2:1));
 const gr=d=>d<2?0:6*(1-Math.exp(-(d-1.5)/4));return{germ,germ0,h:+(gr(s.d)*salt*wf).toFixed(1),h0:+(gr(s.d)*wf).toFixed(1)}}
function pot(c,x,yb,hcm,germ,salt,dry,lab,t,seed){c.save();c.translate(x,yb);c.scale(1.3,1.3);c.translate(-x,-yb);
 c.fillStyle="rgba(0,0,0,.3)";c.beginPath();c.ellipse(x,yb+6,96,12,0,0,7);c.fill();
 const n=Math.round(germ/100*12);
 for(let i=0;i<12;i++){const px=x-66+i*12+((i*37+seed)%7)-3;if(i>=n){c.fillStyle="#d9c08a";c.beginPath();c.ellipse(px,yb-118,3,2,0,0,7);c.fill();continue}
  const hh=Math.max(4,hcm*24*(0.8+((i*53+seed)%5)/12));const sw=Math.sin(t*1.5+i)*2*(1-dry);const tilt=dry*14*(i%2?1:-1);
  c.strokeStyle=dry>.5?"#a3a35a":"#7cc36a";c.lineWidth=2.4;c.beginPath();c.moveTo(px,yb-118);c.quadraticCurveTo(px+sw,yb-118-hh/2,px+sw+tilt,yb-118-hh);c.stroke();
  if(hh>10){const yel=Math.min(1,salt+dry*.6);const col=`rgb(${Math.round(80+150*yel)},${Math.round(180-40*yel)},${Math.round(70-30*yel)})`;c.fillStyle=col;const tx=px+sw+tilt,ty=yb-118-hh;
   c.save();c.translate(tx,ty);c.rotate(-.5-dry*.6);c.beginPath();c.ellipse(-6,0,7,3.5,0,0,7);c.fill();c.restore();c.save();c.translate(tx,ty);c.rotate(.5+dry*.6);c.beginPath();c.ellipse(6,0,7,3.5,0,0,7);c.fill();c.restore()}}
 // الأصيص
 const g2=c.createLinearGradient(x-90,0,x+90,0);g2.addColorStop(0,"#9c4a26");g2.addColorStop(.5,"#c8683a");g2.addColorStop(1,"#8a3f20");
 c.fillStyle=g2;c.beginPath();c.moveTo(x-90,yb-120);c.lineTo(x+90,yb-120);c.lineTo(x+68,yb);c.lineTo(x-68,yb);c.closePath();c.fill();
 c.fillStyle="#b45a30";rr(c,x-98,yb-136,196,22,6);c.fill();
 c.fillStyle=dry>.5?"#8a6a4a":"#4a3222";c.beginPath();c.ellipse(x,yb-124,84,9,0,0,7);c.fill();
 if(salt>.4){c.fillStyle="rgba(255,255,255,.85)";for(let i=0;i<Math.round(salt*24);i++){c.fillRect(x-70+((i*41+seed)%140),yb-128+((i*13)%8),2.5,2.5)}}
 label(c,x,yb-60,lab,"#fff3d6",22);c.restore()}
VLab.reg({id:"s8-salinity",icon:"🌱",grade:"الصف الثامن",subject:"العلوم",unit:"الوحدة 4: الأرض والبيئة",src:"كتاب الأنشطة والتجارب العملية ص47 (استقصاء علمي)",
 title:"أثر ملوحة مياه الريّ في نموّ النبات",
 question:"كيف تؤثّر ملوحة مياه الريّ في إنبات بذور الرشاد ونموّها؟",
 vars:[{k:"s",label:"ملوحة مياه الريّ",unit:"g/L",min:0,max:20,step:1,val:6,c:"#0e8f8f",ticks:[20,15,10,5,0]},
  {k:"d",label:"عدد الأيام",unit:"يوم",min:0,max:10,step:1,val:5,c:"#2f8f5b",ticks:[10,8,6,4,2,0]},
  {k:"w",label:"كمية الماء اليومية",unit:"mL",min:0,max:40,step:5,val:20,c:"#2b7bd6",ticks:[40,30,20,10,0]}],
 read(s){const m=model(s);return[{label:"طول النبات في الأصيص الضابط",val:m.h0,unit:"cm"},{label:"طول النبات في الأصيص التجريبي",val:m.h,unit:"cm"},
  {label:"نسبة الإنبات (الضابط)",val:m.germ0,unit:"%"},{label:"نسبة الإنبات (التجريبي)",val:m.germ,unit:"%"},
  {label:"لون الأوراق (التجريبي)",val:s.d<3?"—":s.s>=12?"مصفرّة ذابلة":s.s>=6?"خضراء باهتة":"خضراء"}]},
 draw(c,s,t){const m=model(s);const dry=s.w<5?1-s.w/5:0;const sd=Math.round(s.d);
  pot(c,190,456,m.h0,m.germ0,0,dry,"ماء عذب",t,3);pot(c,480,456,m.h,m.germ,Math.min(1,s.s/16),dry,Math.round(s.s)+" g/L",t,11);
  label(c,190,500,"الأصيص الضابط","#f3dfa8",26);label(c,480,500,"الأصيص التجريبي","#f3dfa8",26);
  // تقويم الأيام
  c.fillStyle="rgba(20,10,14,.85)";rr(c,34,30,170,96,14);c.fill();label(c,119,58,"اليوم","#f3dfa8",24);label(c,119,98,String(sd),"#fff",38);
  // العدسة: خلية من جذر النبات التجريبي
  const k=Math.min(.42,s.s/40);
  lens(c,770,230,118,(c,x,y,r)=>{c.fillStyle="#efe6c8";c.fillRect(x-r,y-r,2*r,2*r);
   [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{c.strokeStyle="#9ab36a";c.lineWidth=3;rr(c,x+a*60-55,y+b*44-40,110,80,10);c.stroke()});
   c.strokeStyle="#5f8a2e";c.lineWidth=5;rr(c,x-62,y-48,124,96,14);c.stroke();
   const sx=124*(1-k),sy=96*(1-k);c.fillStyle="rgba(130,190,90,.5)";rr(c,x-sx/2+4,y-sy/2+4,sx-8,sy-8,18);c.fill();
   c.fillStyle="rgba(90,160,230,.55)";c.beginPath();c.ellipse(x+6,y,sx*.32,sy*.3,0,0,7);c.fill();
   c.fillStyle="#7a5a2e";c.beginPath();c.arc(x-sx*.28,y-sy*.18,7,0,7);c.fill();
   if(s.s>2){c.fillStyle="#2b7bd6";for(let i=0;i<6;i++){const f=(t*.5+i/6)%1,a=i*1.05;c.globalAlpha=1-f;c.beginPath();c.arc(x+Math.cos(a)*(30+f*50),y+Math.sin(a)*(24+f*40),3.5,0,7);c.fill()}c.globalAlpha=1;
    label(c,x,y+r-26,"الماء يخرج","#fff",20)}},"خلية من جذر النبات التجريبي");
  card(c,W-300,404,260,108,"نسبة الإنبات",m.germ+"%",m.germ/100,"#7cc36a")},
 challenges:[{t:"قارني 3 تراكيز للملوحة",test:(s,h)=>h.s.size>=4},
  {t:"تابعي النموّ حتى اليوم العاشر",test:s=>s.d>=10},
  {t:"اكتشفي الملوحة التي تُوقف الإنبات تقريبًا",test:s=>s.s>=19&&s.d>=3},
  {t:"سجّلي 3 قراءات في الدفتر",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أصمّم تجربة لتحديد أثر ملوحة مياه الريّ في النباتات، وألاحظ اختلاف نموّ النبات باختلاف ملوحة مياه الريّ.",mats:"(3) أُصص لزراعة النباتات، تربة، حبّ الرشاد، ماء، ملح.",
  steps:["ثبّتي كمية الماء اليومية (20 mL) وغيّري الملوحة فقط.","حرّكي «عدد الأيام» من 0 إلى 10 وراقبي الإنبات والنموّ في الأصيصين.","افتحي «القراءات» وسجّلي طول النبات ونسبة الإنبات لثلاثة تراكيز مختلفة على الأقل في اليوم نفسه.","راقبي خلية الجذر في العدسة عند زيادة الملوحة.","أجيبي عن أسئلة التحليل."],
  questions:[{q:"حدّدي المتغيّر المستقلّ والمتغيّر التابع وثلاثة متغيّرات ثابتة في التجربة.",a:"المستقلّ: ملوحة مياه الريّ. التابع: طول النبات ونسبة الإنبات. الثوابت: نوع البذور، كمية الماء، نوع التربة، الإضاءة، عدد الأيام."},
   {q:"ما فائدة الأصيص الذي يُروى بالماء العذب؟",a:"هو المجموعة الضابطة التي نقارن بها النتائج، لنتأكّد أنّ الفرق سببه الملوحة فقط."},
   {q:"صفي أثر زيادة الملوحة في نموّ النبات.",a:"كلّما زادت الملوحة قلّ طول النبات ونسبة الإنبات، واصفرّت الأوراق وذبلت، وعند ملوحة عالية جدًّا يكاد الإنبات يتوقّف."},
   {q:"فسّري ما يحدث لخلية الجذر عند ريّها بماء مالح.",a:"يكون تركيز الأملاح خارج الخلية أعلى منه داخلها، فيخرج الماء منها بالخاصية الأسموزية، فتنكمش الخلية ويذبل النبات."},
   {q:"اقترحي حلًّا لمزارع مياه بئره مالحة.",a:"مثل: زراعة نباتات تتحمّل الملوحة، أو خلط مياه البئر بمياه عذبة، أو تحلية المياه، أو غسل التربة من الأملاح."}],
  concl:"ملوحة مياه الريّ عامل غير حيّ يؤثّر في النبات: كلّما زادت قلّ الإنبات والنموّ؛ لأنّ الماء يخرج من خلايا الجذر بالخاصية الأسموزية."}
});
})();
