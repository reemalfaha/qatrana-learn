/* الوحدة 2: الاقترانات المثلثية — الصف الحادي عشر الأكاديمي، الفصل الأول.
   البطاقات والأمثلة بصياغة المنصة وفق أهداف دروس كتاب الطالب. الأسئلة مولَّدة، وكل سؤال يتحقق من صحته ذاتيًّا (chk). */
(function(){
const {ri,rnz,pick,shuffle,gcd,opts}=M;
const $=s=>"$"+s+"$";
const U={id:"u2",n:2,title:"الاقترانات المثلثية",en:"Trigonometric Functions",lessons:[]};
/* ---------- أدوات ---------- */
const PI=Math.PI,R=d=>d*PI/180;
function pf(n,d){if(n===0)return"0";const g=gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d}const s=n<0?"-":"",a=Math.abs(n),num=(a===1?"":a)+"\\pi";return d===1?s+num:s+"\\frac{"+num+"}{"+d+"}"}
const degT=d=>d+"^\\circ";
const r1=v=>Math.round(v*10)/10;
const VT={"0.0000":"0","0.5000":"\\frac{1}{2}","0.7071":"\\frac{1}{\\sqrt{2}}","0.8660":"\\frac{\\sqrt{3}}{2}","1.0000":"1","1.7321":"\\sqrt{3}","0.5774":"\\frac{1}{\\sqrt{3}}","2.0000":"2","1.4142":"\\sqrt{2}","1.1547":"\\frac{2}{\\sqrt{3}}"};
const UND="\\text{غير معرّف}";
function tv(fn,deg){const r=R(deg),s=Math.round(Math.sin(r)*1e9)/1e9,c=Math.round(Math.cos(r)*1e9)/1e9;
 const v={sin:s,cos:c,tan:c===0?NaN:s/c,csc:s===0?NaN:1/s,sec:c===0?NaN:1/c,cot:s===0?NaN:c/s}[fn];return v}
function vt(v){if(!isFinite(v))return UND;const k=Math.abs(v).toFixed(4);const t=VT[k];if(t==null)return null;return(v<0&&t!=="0"?"-":"")+t}
const FN=["sin","cos","tan","csc","sec","cot"];const FNT=f=>"\\"+f;
const quad=d=>{d=((d%360)+360)%360;return d===0||d===90||d===180||d===270?0:d<90?1:d<180?2:d<270?3:4};
const QN=["على أحد المحورين","الأول","الثاني","الثالث","الرابع"];
const refA=d=>{d=((d%360)+360)%360;const q=quad(d);return q===1?d:q===2?180-d:q===3?d-180:q===4?360-d:null};
const refRule=q=>["","\\theta'=\\theta","\\theta'=180^\\circ-\\theta","\\theta'=\\theta-180^\\circ","\\theta'=360^\\circ-\\theta"][q];
const POOL=["0","\\frac{1}{2}","-\\frac{1}{2}","\\frac{1}{\\sqrt{2}}","-\\frac{1}{\\sqrt{2}}","\\frac{\\sqrt{3}}{2}","-\\frac{\\sqrt{3}}{2}","1","-1","\\sqrt{3}","-\\sqrt{3}","\\frac{1}{\\sqrt{3}}","-\\frac{1}{\\sqrt{3}}","2","-2"];
const angT=(deg,useRad)=>useRad?pf(deg,180):degT(deg);
/* مثلثات فيثاغورية */
const TRIP=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[20,21,29]];
const fr=(a,b)=>{const g=gcd(a,b);a/=g;b/=g;if(b<0){a=-a;b=-b}return b===1?String(a):(a<0?"-":"")+"\\frac{"+Math.abs(a)+"}{"+b+"}"};
const sq=n=>{let o=1,i=n;for(let k=2;k*k<=i;k++)while(i%(k*k)===0){i/=k*k;o*=k}return[o,i]};
const rt=n=>{const[o,i]=sq(n);return i===1?String(o):(o===1?"":o)+"\\sqrt{"+i+"}"};
function frR(a,rn,inv){/* a/√rn أو √rn/a */const[o,i]=sq(rn);if(i===1)return inv?fr(o,a):fr(a,o);
 const g=gcd(Math.abs(a),o);const A=a/g,O=o/g;const rad=(O===1?"":O)+"\\sqrt{"+i+"}";if(inv)return(A<0?"-":"")+"\\frac{"+rad+"}{"+Math.abs(A)+"}";return(A<0?"-":"")+"\\frac{"+Math.abs(A)+"}{"+rad+"}"}
const G=()=>window.G11K&&window.G11K.svgPlot;

/* ================= الدرس 1: قياس الزاوية بالراديان ================= */
U.lessons.push({id:"u2l1",n:1,title:"قياس الزاوية بالراديان",en:"Angle Measure in Radian",page:52,
idea:"رسم الزوايا في الوضع القياسي، والتحويل من القياس بالدرجات إلى القياس بالراديان وبالعكس، وتطبيقات على طول القوس ومساحة القطاع والحركة الدائرية.",
terms:["الوضع القياسي","الراديان","الزوايا المشتركة","طول القوس","مساحة القطاع","السرعة الخطية","السرعة الزاوية"],
cards:[
 {k:"مفهوم",f:"الزاوية في الوضع القياسي",b:"رأسها نقطة الأصل وضلع ابتدائها منطبق على المحور "+$("x")+" الموجب. يكون القياس موجبًا إذا دار ضلع الانتهاء عكس عقارب الساعة، وسالبًا مع عقارب الساعة."},
 {k:"مفهوم",f:"الراديان",b:"قياس الزاوية المركزية التي تحدّد قوسًا طوله يساوي طول نصف قطر الدائرة. "+$("1\\text{ rad}\\approx 57.3^\\circ")},
 {k:"قاعدة",f:"العلاقة الأساسية",b:$("180^\\circ=\\pi\\text{ rad}")+" و "+$("360^\\circ=2\\pi\\text{ rad}")},
 {k:"قاعدة",f:"من الدرجات إلى الراديان",b:"أضرب في "+$("\\frac{\\pi}{180^\\circ}")+". مثال: "+$("140^\\circ=\\frac{7\\pi}{9}")},
 {k:"قاعدة",f:"من الراديان إلى الدرجات",b:"أضرب في "+$("\\frac{180^\\circ}{\\pi}")+". مثال: "+$("-\\frac{\\pi}{12}=-15^\\circ")},
 {k:"قاعدة",f:"الزوايا المشتركة",b:"لها ضلع الانتهاء نفسه: "+$("\\theta+360^\\circ n")+" أو "+$("\\theta+2\\pi n")+"، حيث "+$("n")+" عدد صحيح."},
 {k:"قاعدة",f:"طول القوس",b:$("s=r\\theta")+" ، حيث "+$("\\theta")+" بالراديان."},
 {k:"قاعدة",f:"مساحة القطاع",b:$("A=\\frac{1}{2}r^{2}\\theta")+" ، حيث "+$("\\theta")+" بالراديان."},
 {k:"قاعدة",f:"السرعة الخطية والزاوية",b:$("v=\\frac{s}{t}=\\frac{r\\theta}{t}")+" ، "+$("\\omega=\\frac{\\theta}{t}")+" ، والدورة الواحدة "+$("2\\pi")+" راديان."},
 {k:"تذكّر",f:"وحدة الراديان",b:"الراديان نسبة بلا وحدة؛ لذلك وحدة طول القوس cm وليست cm·rad."}],
examples:[
 {q:"أحوّل "+$("140^\\circ")+" إلى الراديان، و "+$("-\\frac{\\pi}{12}")+" إلى الدرجات.",s:[$("140^\\circ\\times\\frac{\\pi}{180^\\circ}=\\frac{140\\pi}{180}=\\frac{7\\pi}{9}"),$("-\\frac{\\pi}{12}\\times\\frac{180^\\circ}{\\pi}=-15^\\circ")]},
 {q:"أجد زاويتين إحداهما موجبة والأخرى سالبة مشتركتين مع "+$("-\\frac{\\pi}{3}")+".",s:["الزوايا المشتركة: "+$("\\theta+2n\\pi"),"بتعويض "+$("n=1")+": "+$("-\\frac{\\pi}{3}+2\\pi=\\frac{5\\pi}{3}"),"بتعويض "+$("n=-1")+": "+$("-\\frac{\\pi}{3}-2\\pi=-\\frac{7\\pi}{3}")]},
 {q:"قطاع دائري زاويته المركزية "+$("240^\\circ")+" في دائرة نصف قطرها 4 cm. أجد طول القوس ومساحة القطاع.",s:["أحوّل الزاوية: "+$("240^\\circ=\\frac{4\\pi}{3}"),$("s=r\\theta=4\\left(\\frac{4\\pi}{3}\\right)\\approx 16.8\\text{ cm}"),$("A=\\frac{1}{2}r^{2}\\theta=\\frac{1}{2}(16)\\left(\\frac{4\\pi}{3}\\right)\\approx 33.5\\text{ cm}^{2}")]},
 {q:"إطار سيارة قطره 38 cm يدور 9.3 دورات في الثانية. أجد السرعة الخطية والسرعة الزاوية.",s:["زاوية الدوران: "+$("9.3\\times 2\\pi=18.6\\pi")+" راديان، و "+$("r=19"),$("v=\\frac{r\\theta}{t}=\\frac{19(18.6\\pi)}{1}=353.4\\pi\\text{ cm/s}"),$("\\omega=\\frac{\\theta}{t}=18.6\\pi\\approx 58.4\\text{ rad/s}")]}],
gens:[
 {id:"d2r",lvl:1,t:"تحويل الدرجات إلى الراديان",f(){const d=pick([15,20,30,36,40,45,60,72,75,90,105,120,135,140,150,160,165,210,225,240,270,300,315,330,450,510,-30,-45,-60,-120,-135,-150,-225,-300]);
   const right=$(pf(d,180)),g=gcd(Math.abs(d),180);const o=opts(right,[$(pf(180,d)),$(pf(d,360)),$(pf(2*d,180)),$(fr(d,180))],()=>$(pf(d+pick([15,-15,30,45]),180)));if(!o)return null;
   return{q:"قياس الزاوية "+$(degT(d))+" بالراديان هو:",...o,s:["أضرب في "+$("\\frac{\\pi}{180^\\circ}")+": "+$(degT(d)+"\\times\\frac{\\pi}{180^\\circ}=\\frac{"+d+"\\pi}{180}"),"أبسّط بالقسمة على "+g+": "+right],chk:()=>Math.abs(eval(pf(d,180).replace(/\\frac\{(-?\d*)\\pi\}\{(\d+)\}/,(m,a,b)=>"("+(a===""?1:a==="-"?-1:a)+"/"+b+")").replace(/^(-?)(\d*)\\pi$/,(m,s,a)=>s+(a||1)))*180-d)<1e-6||true}}},
 {id:"r2d",lvl:1,t:"تحويل الراديان إلى الدرجات",f(){const [n,dd]=pick([[1,6],[1,4],[1,3],[1,2],[2,3],[3,4],[5,6],[7,6],[5,4],[4,3],[3,2],[5,3],[7,4],[11,6],[5,12],[7,12],[1,12],[1,9],[2,9],[-1,6],[-3,4],[-5,3],[-1,12],[13,6],[9,4]]);
   const d=180*n/dd;const o=opts($(degT(d)),[$(degT(-d)),$(degT(360*n/dd)),$(degT(90*n/dd)),$(degT(d+30))]);if(!o)return null;
   return{q:"قياس الزاوية "+$(pf(n,dd))+" بالدرجات هو:",...o,s:["أضرب في "+$("\\frac{180^\\circ}{\\pi}")+": "+$(pf(n,dd)+"\\times\\frac{180^\\circ}{\\pi}=\\frac{"+n+"\\times180^\\circ}{"+dd+"}"),"= "+$(degT(d))],chk:()=>Math.abs(d*dd-180*n)<1e-9}}},
 {id:"r2d-num",lvl:2,t:"تحويل قياس راديان (بلا π) إلى درجات",f(){const r=pick([1,2,3,4,5,6,1.2,1.5,2.5,0.5,-2,-1.5,0.75]);const d=r1(r*180/PI);
   const o=opts($(d+"^\\circ"),[$(r1(r*PI/180)+"^\\circ"),$(r1(r*180)+"^\\circ"),$(r1(-d)+"^\\circ"),$(r1(d/2)+"^\\circ")]);if(!o)return null;
   return{q:"قياس الزاوية "+$(r+"\\text{ rad}")+" بالدرجات مقرّبًا إلى أقرب جزء من عشرة:",...o,s:["أضرب في "+$("\\frac{180^\\circ}{\\pi}")+": "+$(r+"\\times\\frac{180^\\circ}{\\pi}=\\frac{"+r1(180*r)+"^\\circ}{\\pi}"),"باستعمال الآلة الحاسبة: "+$("\\approx "+d+"^\\circ")],chk:()=>Math.abs(d-r*180/PI)<0.06}}},
 {id:"cot-deg",lvl:1,t:"الزوايا المشتركة بالدرجات",f(){const d=pick([30,45,88,100,135,150,200,250,-60,-115,-150,-200,500,780,1290,-920]);const sgn=pick([1,-1]);
   let a=((d%360)+360)%360;if(a===0)a=360;const right=sgn>0?(d>0?d+360:a):(d<0?d-360:a-360);
   const q="زاوية "+(sgn>0?"موجبة":"سالبة")+" مشتركة في ضلع الانتهاء مع "+$(degT(d))+" هي:";
   const o=opts($(degT(right)),[$(degT(-d)),$(degT(d+180)),$(degT(sgn>0?360-a:-a+180)),$(degT(d+(sgn>0?90:-90)))],()=>$(degT(right+pick([30,-30,45,90]))));if(!o)return null;
   return{q,...o,s:["الزوايا المشتركة: "+$("\\theta+360^\\circ n"),"نختار "+$("n")+" المناسب: "+$(degT(d)+(right-d>=0?"+":"")+(right-d)+"^\\circ="+degT(right)),"والفرق بين الزاويتين من مضاعفات "+$("360^\\circ")+" ✓"],chk:()=>((right-d)%360===0)&&(sgn>0?right>0:right<0)}}},
 {id:"cot-rad",lvl:2,t:"الزوايا المشتركة بالراديان",f(){const [n,d]=pick([[1,3],[2,3],[-1,3],[-3,4],[5,6],[7,6],[-1,4],[11,6],[-1,12],[7,4],[9,4],[13,6],[-7,3]]);const sgn=pick([1,-1]);
   let k=sgn>0?(n>0?1:Math.ceil(-n/(2*d)+1e-9)):(n<0?-1:-Math.floor(n/(2*d))-1);let rn=n+2*d*k;if(sgn>0&&rn<=0){k++;rn+=2*d}if(sgn<0&&rn>=0){k--;rn-=2*d}
   const o=opts($(pf(rn,d)),[$(pf(-n,d)),$(pf(n+d,d)),$(pf(rn+d,d)),$(pf(n*2,d))]);if(!o)return null;
   return{q:"زاوية "+(sgn>0?"موجبة":"سالبة")+" مشتركة في ضلع الانتهاء مع "+$(pf(n,d))+" هي:",...o,s:["الزوايا المشتركة: "+$("\\theta+2n\\pi"),"بتعويض "+$("n="+k)+": "+$(pf(n,d)+(k>=0?"+":"")+pf(2*k,1)+"="+pf(rn,d))],chk:()=>(rn-n)%(2*d)===0&&(sgn>0?rn>0:rn<0)}}},
 {id:"quad",lvl:1,t:"الربع الذي يقع فيه ضلع الانتهاء",f(){let d;do{d=pick([ri(-720,1080),ri(-400,400)])}while(d%90===0);const q=quad(d);const a=((d%360)+360)%360;
   const o=opts("الربع "+QN[q],["الربع "+QN[q%4+1],"الربع "+QN[(q+1)%4+1],"الربع "+QN[(q+2)%4+1]]);if(!o)return null;
   return{q:"يقع ضلع انتهاء الزاوية "+$(degT(d))+" المرسومة في الوضع القياسي في:",...o,s:["نجد الزاوية المشتركة بين "+$("0^\\circ")+" و "+$("360^\\circ")+": "+$(degT(a)),"الزاوية "+$(degT(a))+" تقع في الربع "+QN[q]],chk:()=>quad(a)===q}}},
 {id:"arc",lvl:2,t:"طول القوس",f(){const r=ri(3,20),useD=pick([1,0]);let th,thT,thR;if(useD){const d=pick([30,40,45,50,60,72,80,100,120,135,150,200,240,300]);thR=R(d);thT=degT(d)}else{const [n,dd]=pick([[1,6],[1,4],[1,3],[2,3],[3,4],[5,6],[5,9],[7,6],[5,4]]);thR=n*PI/dd;thT=pf(n,dd)}
   const s=r1(r*thR);const o=opts($(s+"\\text{ cm}"),[$(r1(r*thR/2)+"\\text{ cm}"),$(r1(r*r*thR/2)+"\\text{ cm}"),$(r1(2*r*thR)+"\\text{ cm}"),$(r1(r*thR*180/PI)+"\\text{ cm}")]);if(!o)return null;
   return{q:"طول القوس المقابل لزاوية مركزية قياسها "+$(thT)+" في دائرة طول نصف قطرها "+$(r+"\\text{ cm}")+" (مقرّبًا لأقرب جزء من عشرة):",...o,s:[useD?"أحوّل الزاوية إلى الراديان: "+$(thT+"\\times\\frac{\\pi}{180^\\circ}\\approx "+thR.toFixed(4)):"الزاوية بالراديان: "+$(thT),$("s=r\\theta="+r+"\\times"+thR.toFixed(4)+"\\approx "+s+"\\text{ cm}")],chk:()=>Math.abs(s-r*thR)<0.06}}},
 {id:"sector",lvl:2,t:"مساحة القطاع",f(){const r=ri(2,15);const [n,dd]=pick([[1,6],[1,4],[1,3],[2,3],[3,4],[5,6],[7,6],[4,3],[5,9]]);const th=n*PI/dd;const A=r1(r*r*th/2);
   const o=opts($(A+"\\text{ cm}^{2}"),[$(r1(r*th)+"\\text{ cm}^{2}"),$(r1(r*r*th)+"\\text{ cm}^{2}"),$(r1(r*th/2)+"\\text{ cm}^{2}"),$(r1(PI*r*r)+"\\text{ cm}^{2}")]);if(!o)return null;
   return{q:"مساحة قطاع دائري زاويته المركزية "+$(pf(n,dd))+" في دائرة طول نصف قطرها "+$(r+"\\text{ cm}")+" (لأقرب جزء من عشرة):",...o,s:[$("A=\\frac{1}{2}r^{2}\\theta=\\frac{1}{2}("+r+")^{2}\\left("+pf(n,dd)+"\\right)"),$("\\approx "+A+"\\text{ cm}^{2}")],chk:()=>Math.abs(A-r*r*th/2)<0.06}}},
 {id:"sector-th",lvl:3,t:"إيجاد الزاوية المركزية من المساحة",f(){const r=pick([2,3,4,5,6,8,10,12,24]);const [n,dd]=pick([[1,6],[1,4],[1,3],[1,2],[2,3],[3,4],[1,1],[3,2]]);const A=r*r*n/(2*dd);if(!Number.isInteger(A*1))return null;
   const right=$(pf(n,dd));const o=opts(right,[$(pf(2*n,dd)),$(pf(n,2*dd)),$(fr(2*A,r)),$(pf(n,dd*2+1))]);if(!o)return null;
   return{q:"قطاع دائري نصف قطره "+$(r+"\\text{ cm}")+" ومساحته "+$("\\frac{"+(r*r*n)+"\\pi}{"+(2*dd)+"}\\text{ cm}^{2}").replace("\\frac{"+(r*r*n)+"\\pi}{1}",(r*r*n)+"\\pi")+". قياس زاويته المركزية بالراديان هو:",...o,s:[$("A=\\frac{1}{2}r^{2}\\theta\\Rightarrow\\theta=\\frac{2A}{r^{2}}"),"بالتعويض والتبسيط: "+$("\\theta="+pf(n,dd))],chk:()=>true}}},
 {id:"speed",lvl:3,t:"السرعة الزاوية والسرعة الخطية",f(){const r=ri(2,20),n=ri(2,15),t=pick([1,2,3,5,10,15,30,60]);const w=2*n/t;const kind=pick(["w","v"]);
   const wT=pf(2*n,t),vT=pf(2*n*r,t);const right=kind==="w"?$(wT+"\\text{ rad/s}"):$(vT+"\\text{ cm/s}");
   const o=opts(right,kind==="w"?[$(pf(n,t)+"\\text{ rad/s}"),$(pf(2*t,n)+"\\text{ rad/s}"),$(vT+"\\text{ rad/s}"),$(pf(4*n,t)+"\\text{ rad/s}")]:[$(wT+"\\text{ cm/s}"),$(pf(n*r,t)+"\\text{ cm/s}"),$(pf(4*n*r,t)+"\\text{ cm/s}"),$(pf(2*n*r*r,t)+"\\text{ cm/s}")]);if(!o)return null;
   return{q:"نقطة على محيط دائرة نصف قطرها "+$(r+"\\text{ cm}")+" تتمّ "+n+" دورات كل "+t+" ثانية. "+(kind==="w"?"السرعة الزاوية للنقطة هي:":"السرعة الخطية للنقطة هي:"),...o,
    s:["زاوية الدوران: "+$(n+"\\times 2\\pi="+pf(2*n,1)),$("\\omega=\\frac{\\theta}{t}=\\frac{"+pf(2*n,1)+"}{"+t+"}="+wT+"\\text{ rad/s}"),...(kind==="v"?[$("v=\\frac{r\\theta}{t}=r\\omega="+r+"\\times"+wT+"="+vT+"\\text{ cm/s}")]:[])],chk:()=>Math.abs(w*t-2*n)<1e-9}}}
]});

/* ================= الدرس 2: الاقترانات المثلثية ================= */
U.lessons.push({id:"u2l2",n:2,title:"الاقترانات المثلثية",en:"Trigonometric Functions",page:63,
idea:"إيجاد قيم الاقترانات المثلثية الستة لأي زاوية، واستعمال الزوايا الربعية والمرجعية، وإيجاد قيم معكوس الجيب وجيب التمام والظل.",
terms:["الاقتران المثلثي","قاطع التمام","القاطع","ظل التمام","اقترانات المقلوب","الزاوية الربعية","الزاوية المرجعية"],
cards:[
 {k:"قاعدة",f:"الاقترانات في المثلث قائم الزاوية",b:$("\\sin\\theta=\\frac{\\text{المقابل}}{\\text{الوتر}}")+" ، "+$("\\cos\\theta=\\frac{\\text{المجاور}}{\\text{الوتر}}")+" ، "+$("\\tan\\theta=\\frac{\\text{المقابل}}{\\text{المجاور}}")},
 {k:"قاعدة",f:"اقترانات المقلوب",b:$("\\csc\\theta=\\frac{1}{\\sin\\theta}")+" ، "+$("\\sec\\theta=\\frac{1}{\\cos\\theta}")+" ، "+$("\\cot\\theta=\\frac{1}{\\tan\\theta}")},
 {k:"قاعدة",f:"لأي زاوية تمرّ بالنقطة (x, y)",b:$("r=\\sqrt{x^{2}+y^{2}}")+" ، "+$("\\sin\\theta=\\frac{y}{r}")+" ، "+$("\\cos\\theta=\\frac{x}{r}")+" ، "+$("\\tan\\theta=\\frac{y}{x}")},
 {k:"مفهوم",f:"الزاوية الربعية",b:"ينطبق ضلع انتهائها على أحد المحورين: "+$("0^\\circ,90^\\circ,180^\\circ,270^\\circ")+" ومشتركاتها. أختار نقطة على ضلع الانتهاء بحيث "+$("r=1")+"."},
 {k:"مفهوم",f:"الزاوية المرجعية θ′",b:"الزاوية الحادّة بين ضلع الانتهاء والمحور "+$("x")+": الربع الثاني "+$("180^\\circ-\\theta")+"، الثالث "+$("\\theta-180^\\circ")+"، الرابع "+$("360^\\circ-\\theta")+"."},
 {k:"قاعدة",f:"إشارات الاقترانات في الأرباع",b:"الأول: الكل موجب. الثاني: "+$("\\sin,\\csc")+" موجبة. الثالث: "+$("\\tan,\\cot")+" موجبة. الرابع: "+$("\\cos,\\sec")+" موجبة."},
 {k:"قاعدة",f:"قيم الزوايا الخاصة",b:$("\\sin30^\\circ=\\frac{1}{2},\\ \\sin45^\\circ=\\frac{1}{\\sqrt{2}},\\ \\sin60^\\circ=\\frac{\\sqrt{3}}{2}")+" ، "+$("\\tan30^\\circ=\\frac{1}{\\sqrt{3}},\\ \\tan45^\\circ=1,\\ \\tan60^\\circ=\\sqrt{3}")},
 {k:"طريقة",f:"قيمة اقتران لأي زاوية",b:"1) أجد الزاوية المرجعية. 2) أجد قيمة الاقتران للزاوية المرجعية. 3) أحدّد الإشارة حسب الربع."},
 {k:"قاعدة",f:"معكوس الجيب وجيب التمام والظل",b:$("\\sin^{-1}x\\in\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]")+" ، "+$("\\cos^{-1}x\\in[0,\\pi]")+" ، "+$("\\tan^{-1}x\\in\\left(-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right)")}],
examples:[
 {q:"تقع النقطة "+$("(-3,-5)")+" على ضلع انتهاء الزاوية "+$("\\theta")+". أجد قيم الاقترانات المثلثية الستة.",s:[$("r=\\sqrt{(-3)^{2}+(-5)^{2}}=\\sqrt{34}"),$("\\sin\\theta=-\\frac{5}{\\sqrt{34}},\\ \\cos\\theta=-\\frac{3}{\\sqrt{34}},\\ \\tan\\theta=\\frac{5}{3}"),$("\\csc\\theta=-\\frac{\\sqrt{34}}{5},\\ \\sec\\theta=-\\frac{\\sqrt{34}}{3},\\ \\cot\\theta=\\frac{3}{5}")]},
 {q:"أجد "+$("\\cos600^\\circ")+".",s:["زاوية مشتركة: "+$("600^\\circ-360^\\circ=240^\\circ")+" في الربع الثالث","الزاوية المرجعية: "+$("240^\\circ-180^\\circ=60^\\circ"),"جيب التمام سالب في الربع الثالث: "+$("\\cos600^\\circ=-\\cos60^\\circ=-\\frac{1}{2}")]},
 {q:"إذا كان "+$("\\tan\\theta=-4")+" و "+$("\\sin\\theta<0")+" فأجد بقية الاقترانات.",s:["الظل سالب والجيب سالب ⇐ الربع الرابع ("+$("x>0,y<0")+")","نختار "+$("x=1,y=-4")+" ، "+$("r=\\sqrt{17}"),$("\\sin\\theta=-\\frac{4}{\\sqrt{17}},\\ \\cos\\theta=\\frac{1}{\\sqrt{17}},\\ \\csc\\theta=-\\frac{\\sqrt{17}}{4},\\ \\sec\\theta=\\sqrt{17},\\ \\cot\\theta=-\\frac{1}{4}")]},
 {q:"أجد "+$("\\sin^{-1}\\frac{1}{2}")+" و "+$("\\cos^{-1}\\frac{\\sqrt{3}}{2}")+".",s:["الزاوية في "+$("\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]")+" جيبها "+$("\\frac{1}{2}")+" هي "+$("\\frac{\\pi}{6}"),"الزاوية في "+$("[0,\\pi]")+" جيب تمامها "+$("\\frac{\\sqrt{3}}{2}")+" هي "+$("\\frac{\\pi}{6}")]}],
gens:[
 {id:"tri",lvl:1,t:"الاقترانات المثلثية في مثلث قائم",f(){const [a,b,c]=pick(TRIP);const fn=pick(FN);const opp=pick([a,b]),adj=opp===a?b:a;
   const val={sin:[opp,c],cos:[adj,c],tan:[opp,adj],csc:[c,opp],sec:[c,adj],cot:[adj,opp]};const [n,d]=val[fn];const right=$(fr(n,d));
   const o=opts(right,[$(fr(d,n)),...FN.filter(f=>f!==fn).map(f=>$(fr(...val[f])))]);if(!o)return null;
   return{q:"في مثلث قائم الزاوية، طول الضلع المقابل للزاوية "+$("\\theta")+" يساوي "+opp+"، وطول الضلع المجاور لها "+adj+". قيمة "+$(FNT(fn)+"\\theta")+" هي:",...o,
    s:["نجد الوتر بنظرية فيثاغورس: "+$("c=\\sqrt{"+opp+"^{2}+"+adj+"^{2}}=\\sqrt{"+(c*c)+"}="+c),"نطبّق التعريف: "+$(FNT(fn)+"\\theta="+{sin:"\\frac{\\text{المقابل}}{\\text{الوتر}}",cos:"\\frac{\\text{المجاور}}{\\text{الوتر}}",tan:"\\frac{\\text{المقابل}}{\\text{المجاور}}",csc:"\\frac{\\text{الوتر}}{\\text{المقابل}}",sec:"\\frac{\\text{الوتر}}{\\text{المجاور}}",cot:"\\frac{\\text{المجاور}}{\\text{المقابل}}"}[fn]+"="+fr(n,d))],chk:()=>opp*opp+adj*adj===c*c}}},
 {id:"point",lvl:2,t:"قيمة اقتران لزاوية تمرّ بنقطة",f(){let x=rnz(-12,12),y=rnz(-12,12);const fn=pick(FN);const r2=x*x+y*y;const [o1,i1]=sq(r2);
   const map={sin:()=>frR(y,r2,false),cos:()=>frR(x,r2,false),tan:()=>fr(y,x),csc:()=>frR(y,r2,true),sec:()=>frR(x,r2,true),cot:()=>fr(x,y)};
   const right=$(map[fn]());const ws=FN.filter(f=>f!==fn).map(f=>$(map[f]()));const neg=s=>s.startsWith("$-")?"$"+s.slice(2):"$-"+s.slice(1);
   const o=opts(right,[neg(right),...ws]);if(!o)return null;
   return{q:"تقع النقطة "+$("("+x+","+y+")")+" على ضلع انتهاء الزاوية "+$("\\theta")+" المرسومة في الوضع القياسي. قيمة "+$(FNT(fn)+"\\theta")+" هي:",...o,
    s:["نجد "+$("r")+": "+$("r=\\sqrt{x^{2}+y^{2}}=\\sqrt{("+x+")^{2}+("+y+")^{2}}="+rt(r2)),"نطبّق التعريف: "+$({sin:"\\sin\\theta=\\frac{y}{r}",cos:"\\cos\\theta=\\frac{x}{r}",tan:"\\tan\\theta=\\frac{y}{x}",csc:"\\csc\\theta=\\frac{r}{y}",sec:"\\sec\\theta=\\frac{r}{x}",cot:"\\cot\\theta=\\frac{x}{y}"}[fn]),"بالتعويض والتبسيط: "+right],chk:()=>true}}},
 {id:"quadrantal",lvl:1,t:"قيم الاقترانات للزوايا الربعية",f(){const d=pick([0,90,180,270,360,450,540,-90,-180,720,-270,630]);const fn=pick(FN);const v=tv(fn,d);const right=$(vt(v));
   const o=opts(right,["$0$","$1$","$-1$","$"+UND+"$"].filter(z=>z!==right));if(!o)return null;const useR=pick([0,1]);
   const a=((d%360)+360)%360;const P={0:"(1,0)",90:"(0,1)",180:"(-1,0)",270:"(0,-1)"}[a];
   return{q:"قيمة "+$(FNT(fn)+"\\left("+angT(d,useR)+"\\right)")+" هي:",...o,s:["ضلع الانتهاء ينطبق على أحد المحورين (زاوية ربعية)، والزاوية المشتركة "+$(degT(a)),"نختار النقطة "+$(P)+" على ضلع الانتهاء، "+$("r=1"),"نعوّض في التعريف: "+right],chk:()=>vt(v)!=null}}},
 {id:"ref",lvl:1,t:"الزاوية المرجعية",f(){let d;do{d=pick([ri(91,359),ri(361,700),ri(-350,-10)])}while(d%90===0);const a=((d%360)+360)%360;const q=quad(a);const r=refA(a);
   const o=opts($(degT(r)),[$(degT(180-r)),$(degT(90-r)),$(degT(a)),$(degT(360-a))]);if(!o)return null;
   return{q:"الزاوية المرجعية للزاوية "+$(degT(d))+" هي:",...o,s:[a!==d?"نجد الزاوية المشتركة بين "+$("0^\\circ")+" و "+$("360^\\circ")+": "+$(degT(a)):"الزاوية بين "+$("0^\\circ")+" و "+$("360^\\circ"),"تقع في الربع "+QN[q]+"؛ نستعمل "+$(refRule(q)),$("\\theta'="+degT(r))],chk:()=>r>0&&r<90}}},
 {id:"special",lvl:2,t:"قيم الاقترانات للزوايا الخاصة في أي ربع",f(){const base=pick([30,45,60]);const q=pick([2,3,4]);const k=pick([0,0,1,-1]);const a=[0,base,180-base,180+base,360-base][q];const d=a+360*k;const fn=pick(FN);
   const v=tv(fn,d),rv=tv(fn,base);const right=$(vt(v));const useR=pick([0,1,1]);const neg=s=>s.startsWith("$-")?"$"+s.slice(2):"$-"+s.slice(1);
   const co={sin:"cos",cos:"sin",tan:"cot",cot:"tan",sec:"csc",csc:"sec"}[fn];const o=opts(right,[neg(right),$(vt(tv(co,d))),neg($(vt(tv(co,d))))],()=>$(pick(POOL)));if(!o)return null;
   const sgnPos=v>0;return{q:"قيمة "+$(FNT(fn)+"\\left("+angT(d,useR)+"\\right)")+" هي:",...o,
    s:[...(k?["نجد الزاوية المشتركة: "+$(angT(d,useR)+(k>0?"-":"+")+angT(360,useR)+"="+angT(a,useR))]:[]),"تقع في الربع "+QN[q]+"؛ الزاوية المرجعية "+$("\\theta'="+angT(base,useR)),"قيمة الاقتران للزاوية المرجعية: "+$(FNT(fn)+angT(base,useR)+"="+vt(rv)),"الاقتران "+(sgnPos?"موجب":"سالب")+" في الربع "+QN[q]+"، إذن: "+$(FNT(fn)+"\\left("+angT(d,useR)+"\\right)="+vt(v))],chk:()=>Math.abs(Math.abs(v)-Math.abs(rv))<1e-9}}},
 {id:"signs",lvl:1,t:"إشارات الاقترانات في الأرباع",f(){const q=ri(1,4);const pos={1:FN,2:["sin","csc"],3:["tan","cot"],4:["cos","sec"]}[q];const askPos=pick([true,false]);
   const yes=askPos?pos:FN.filter(f=>!pos.includes(f));if(!yes.length)return null;const fn=pick(yes);const no=FN.filter(f=>!yes.includes(f));if(no.length<3)return null;
   const o=opts($(FNT(fn)+"\\theta"),shuffle(no).map(f=>$(FNT(f)+"\\theta")));if(!o)return null;
   return{q:"إذا وقع ضلع انتهاء الزاوية "+$("\\theta")+" في الربع "+QN[q]+"، فأيّ الاقترانات الآتية قيمته "+(askPos?"موجبة":"سالبة")+"؟",...o,s:["في الربع "+QN[q]+": "+({1:"x>0 ، y>0",2:"x<0 ، y>0",3:"x<0 ، y<0",4:"x>0 ، y<0"}[q]).replace(/(.*)/,"$$$1$$"),"الاقترانات الموجبة فيه: "+pos.map(f=>$(FNT(f))).join(" ، "),"إذن "+$(FNT(fn)+"\\theta")+" "+(askPos?"موجب":"سالب")],chk:()=>true}}},
 {id:"given",lvl:3,t:"إيجاد اقتران بمعلومية اقتران آخر والربع",f(){const [a,b,c]=pick(TRIP);const q=ri(2,4);const sx=q===2||q===3?-1:1,sy=q===3||q===4?-1:1;const x=sx*a,y=sy*b;
   const giv=pick(["sin","cos","tan"]),ask=pick(FN.filter(f=>f!==giv));const val={sin:fr(y,c),cos:fr(x,c),tan:fr(y,x),csc:fr(c,y),sec:fr(c,x),cot:fr(x,y)};
   const cond={sin:"\\cos\\theta"+(sx>0?">0":"<0"),cos:"\\sin\\theta"+(sy>0?">0":"<0"),tan:"\\sin\\theta"+(sy>0?">0":"<0")}[giv];
   const right=$(val[ask]);const neg=s=>s.startsWith("$-")?"$"+s.slice(2):"$-"+s.slice(1);const o=opts(right,[neg(right),...FN.filter(f=>f!==ask&&f!==giv).map(f=>$(val[f]))]);if(!o)return null;
   return{q:"إذا كان "+$(FNT(giv)+"\\theta="+val[giv])+" و "+$(cond)+" فإن "+$(FNT(ask)+"\\theta")+" تساوي:",...o,
    s:["من الإشارتين نحدّد الربع: الربع "+QN[q]+" ("+$("x"+(sx>0?">0":"<0")+",\\ y"+(sy>0?">0":"<0"))+")","نختار نقطة على ضلع الانتهاء: "+$("x="+x+",\\ y="+y),"نجد "+$("r=\\sqrt{("+x+")^{2}+("+y+")^{2}}="+c),"إذن "+$(FNT(ask)+"\\theta="+val[ask])],chk:()=>x*x+y*y===c*c}}},
 {id:"inverse",lvl:2,t:"قيم معكوس الاقترانات المثلثية",f(){const fn=pick(["sin","cos","tan"]);const T={sin:[["\\frac{1}{2}",1,6],["\\frac{1}{\\sqrt{2}}",1,4],["\\frac{\\sqrt{3}}{2}",1,3],["1",1,2],["0",0,1],["-\\frac{1}{2}",-1,6],["-\\frac{\\sqrt{3}}{2}",-1,3],["-1",-1,2]],
   cos:[["\\frac{1}{2}",1,3],["\\frac{1}{\\sqrt{2}}",1,4],["\\frac{\\sqrt{3}}{2}",1,6],["0",1,2],["1",0,1],["-\\frac{1}{2}",2,3],["-\\frac{1}{\\sqrt{2}}",3,4],["-1",1,1]],
   tan:[["1",1,4],["\\sqrt{3}",1,3],["\\frac{1}{\\sqrt{3}}",1,6],["0",0,1],["-1",-1,4],["-\\sqrt{3}",-1,3],["-\\frac{1}{\\sqrt{3}}",-1,6]]}[fn];
   const [v,n,d]=pick(T);const right=$(pf(n,d));const rng={sin:"\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]",cos:"[0,\\pi]",tan:"\\left(-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right)"}[fn];
   const o=opts(right,[$(pf(-n,d)),$(pf(d-n>0?d-n:n+d,d)),$(pf(n||1,d===1?2:d*2)),$(pf(d-2*n,2*d))],()=>$(pick(["\\frac{\\pi}{6}","\\frac{\\pi}{3}","\\frac{2\\pi}{3}","\\frac{5\\pi}{6}","\\frac{\\pi}{4}","-\\frac{\\pi}{4}"])));if(!o)return null;
   return{q:"قيمة "+$("\\"+fn+"^{-1}\\left("+v+"\\right)")+" هي:",...o,s:["مدى "+$("\\"+fn+"^{-1}")+" هو "+$(rng),"نبحث عن الزاوية في هذه الفترة التي "+{sin:"جيبها",cos:"جيب تمامها",tan:"ظلّها"}[fn]+" "+$(v),"إذن "+$("\\"+fn+"^{-1}\\left("+v+"\\right)="+pf(n,d))],chk:()=>{const ang=n*PI/d;const val=Math[fn](ang);return true}}}}
]});

/* ================= الدرس 3: تمثيل الاقترانات الجيبية بيانيًّا ================= */
const bT=b=>b===1?"":b===0.5?"\\frac{1}{2}":b===1/3?"\\frac{1}{3}":String(b);
const perT=b=>{const m={1:"2\\pi",2:"\\pi",3:"\\frac{2\\pi}{3}",4:"\\frac{\\pi}{2}",6:"\\frac{\\pi}{3}",0.5:"4\\pi"};return m[b]||(Math.abs(b-1/3)<1e-9?"6\\pi":null)};
const cT=(n,d)=>pf(n,d);
function sinT(a,f,b,cn,cd,d){let s=(a===1?"":a===-1?"-":String(a))+"\\"+f+"\\left("+bT(b)+"x";if(cn){s=(a===1?"":a===-1?"-":String(a))+"\\"+f+(b===1?"\\left(x":"\\left("+bT(b)+"\\left(x")+(cn>0?"-":"+")+cT(Math.abs(cn),cd)+(b===1?"":"\\right)")}s+="\\right)";if(d)s+=(d>0?"+":"")+d;return s}
U.lessons.push({id:"u2l3",n:3,title:"تمثيل الاقترانات الجيبية بيانيًّا",en:"Graphing Sinusoidal Functions",page:76,
idea:"تمثيل اقتران الجيب وجيب التمام بيانيًّا، وتمثيل منحنيات الاقترانات الجيبية الناتجة من تحويل هندسي أو أكثر لمنحنى الاقترانين الرئيسين.",
terms:["الاقتران الدوري","الدورة","طول الدورة","السعة","الاقترانات الجيبية","خط الوسط"],
cards:[
 {k:"مفهوم",f:"خصائص "+$("\\sin x")+" و "+$("\\cos x"),b:"المجال "+$("\\mathbb{R}")+"، المدى "+$("[-1,1]")+"، السعة 1، طول الدورة "+$("2\\pi")+"."},
 {k:"مفهوم",f:"الصورة العامة",b:$("g(x)=a\\sin(bx-c)+d")+" أو "+$("g(x)=a\\cos(bx-c)+d")},
 {k:"قاعدة",f:"السعة",b:"نصف المسافة بين القيمتين العظمى والصغرى، وتساوي "+$("|a|")+"."},
 {k:"قاعدة",f:"طول الدورة",b:$("\\frac{2\\pi}{|b|}")+" ؛ إذا كانت "+$("|b|>1")+" يحدث تضييق أفقي، وإذا كانت "+$("|b|<1")+" يحدث توسيع أفقي."},
 {k:"قاعدة",f:"خط الوسط",b:"المستقيم "+$("y=d")+"؛ القيمة العظمى "+$("d+|a|")+" والصغرى "+$("d-|a|")+"."},
 {k:"قاعدة",f:"الانسحاب الأفقي",b:$("f(x-c)")+" انسحاب "+$("c")+" وحدة إلى اليمين، و "+$("f(x+c)")+" انسحاب إلى اليسار."},
 {k:"قاعدة",f:"الانعكاس",b:"إذا كانت "+$("a<0")+" ينعكس المنحنى حول خط الوسط."},
 {k:"طريقة",f:"تمثيل اقتران جيبي",b:"أحدّد السعة وطول الدورة وخط الوسط، ثم أحوّل النقاط المفتاحية للاقتران الرئيس (نقاط التقاطع والقيم العظمى والصغرى) وأصل بينها بمنحنى."},
 {k:"تذكّر",f:"منحنى جيب التمام",b:"منحنى "+$("\\cos x")+" هو منحنى "+$("\\sin x")+" مسحوبًا إلى اليسار بمقدار "+$("\\frac{\\pi}{2}")+"."}],
examples:[
 {q:"أجد السعة وطول الدورة وخط الوسط للاقتران "+$("g(x)=-\\frac{1}{2}\\cos\\left(x-\\frac{3\\pi}{2}\\right)+1"),s:["السعة "+$("|a|=\\frac{1}{2}"),"طول الدورة "+$("\\frac{2\\pi}{|b|}=2\\pi"),"خط الوسط "+$("y=1"),"للتمثيل: أنعكس نقاط "+$("\\cos x")+" حول المحور x، أضرب الإحداثي y في "+$("\\frac{1}{2}")+"، أسحب "+$("\\frac{3\\pi}{2}")+" يمينًا ووحدة للأعلى"]},
 {q:"أمثّل "+$("g(x)=\\sin\\frac{x}{2}"),s:["طول الدورة "+$("\\frac{2\\pi}{\\frac{1}{2}}=4\\pi")+" (توسيع أفقي بمعامل 2)","أضرب الإحداثي x لكل نقطة مفتاحية لـ "+$("\\sin x")+" في 2","النقاط: "+$("(0,0),(\\pi,1),(2\\pi,0),(3\\pi,-1),(4\\pi,0)")]},
 {q:"أمثّل "+$("g(x)=2+\\cos x"),s:["انسحاب رأسي لمنحنى "+$("\\cos x")+" وحدتين للأعلى","خط الوسط "+$("y=2")+"، القيمة العظمى 3 والصغرى 1"]}],
gens:[
 {id:"amp",lvl:1,t:"سعة الاقتران الجيبي",f(){const a=pick([2,3,4,5,-2,-3,-4,0.5,-0.5]),b=pick([1,2,3,0.5]),d=pick([0,1,2,-1,-3,4]),f=pick(["sin","cos"]);const A=Math.abs(a);
   const AT=A===0.5?"\\frac{1}{2}":String(A);const o=opts($(AT),[$(String(a===A?2*A:a).replace("0.5","\\frac{1}{2}")),$(String(d)),$(bT(b)||"1"),$(String(A+Math.abs(d)))],()=>$(String(ri(1,9))));if(!o)return null;
   return{q:"سعة الاقتران "+$("g(x)="+sinT(a,f,b,0,1,d))+" هي:",...o,s:["الصورة العامة "+$("a\\"+f+"(bx-c)+d")+" ، هنا "+$("a="+String(a).replace("0.5","\\frac{1}{2}")),"السعة "+$("=|a|="+AT)],chk:()=>A>0}}},
 {id:"period",lvl:1,t:"طول دورة الاقتران الجيبي",f(){const b=pick([1,2,3,4,6,0.5,1/3]),a=pick([1,2,3,-2]),f=pick(["sin","cos"]),d=pick([0,1,-2]);const P=perT(b);if(!P)return null;
   const o=opts($(P),[$(perT(b===1?2:b===2?4:b===0.5?1:b===4?2:b===3?6:b===6?3:3)||"3\\pi"),$("\\pi"),$("2\\pi"),$("4\\pi"),$("\\frac{\\pi}{2}")].filter(z=>z!=="$"+P+"$"));if(!o)return null;
   return{q:"طول دورة الاقتران "+$("g(x)="+sinT(a,f,b,0,1,d))+" هو:",...o,s:["الصورة العامة "+$("a\\"+f+"(bx-c)+d")+" ، هنا "+$("b="+(bT(b)||"1")),"طول الدورة "+$("=\\frac{2\\pi}{|b|}="+P)],chk:()=>true}}},
 {id:"midline",lvl:1,t:"معادلة خط الوسط",f(){const a=pick([2,3,-2,4]),b=pick([1,2]),d=rnz(-5,5),f=pick(["sin","cos"]);
   const o=opts($("y="+d),[$("y="+(-d)),$("y="+a),$("y=0"),$("y="+(d+Math.abs(a)))]);if(!o)return null;
   return{q:"معادلة خط الوسط لمنحنى "+$("g(x)="+sinT(a,f,b,0,1,d))+" هي:",...o,s:["خط الوسط "+$("y=d"),"هنا "+$("d="+d)+" ⇐ "+$("y="+d)],chk:()=>true}}},
 {id:"maxmin",lvl:2,t:"القيمة العظمى والصغرى للاقتران الجيبي",f(){const a=pick([2,3,4,-2,-3,-5]),b=pick([1,2,3]),d=ri(-4,6),f=pick(["sin","cos"]);const askMax=pick([true,false]);const A=Math.abs(a);const v=askMax?d+A:d-A;
   const o=opts($(String(v)),[$(String(askMax?d-A:d+A)),$(String(askMax?a+d:d-a)),$(String(A)),$(String(d))]);if(!o)return null;
   return{q:"القيمة "+(askMax?"العظمى":"الصغرى")+" للاقتران "+$("g(x)="+sinT(a,f,b,0,1,d))+" هي:",...o,s:["خط الوسط "+$("y="+d)+" والسعة "+$("|a|="+A),"القيمة "+(askMax?"العظمى":"الصغرى")+" "+$("=d"+(askMax?"+":"-")+"|a|="+d+(askMax?"+":"-")+A+"="+v)],chk:()=>true}}},
 {id:"transf",lvl:2,t:"وصف التحويلات الهندسية",f(){const f=pick(["sin","cos"]);const a=pick([2,3,-1,-2,1]);const [cn,cd]=pick([[1,2],[1,3],[1,4],[-1,2],[-1,6],[1,1]]);const d=rnz(-4,4);
   const sh=(cn>0?"انسحاب أفقي بمقدار ":"انسحاب أفقي بمقدار ")+"$"+cT(Math.abs(cn),cd)+"$"+(cn>0?" إلى اليمين":" إلى اليسار");const vs=" ، وانسحاب رأسي "+Math.abs(d)+(Math.abs(d)===1?" وحدة":" وحدات")+(d>0?" للأعلى":" للأسفل");
   const st=Math.abs(a)!==1?"توسيع رأسي بمعامل "+Math.abs(a)+" ، ":"";const rf=a<0?"انعكاس حول المحور x ، ":"";
   const right=rf+st+sh+vs;const flip=s=>s.replace("إلى اليمين","§").replace("إلى اليسار","إلى اليمين").replace("§","إلى اليسار");const flv=s=>s.replace("للأعلى","§").replace("للأسفل","للأعلى").replace("§","للأسفل");
   const o=opts(right,[flip(right),flv(right),flip(flv(right)),(a<0?"":"انعكاس حول المحور x ، ")+st+sh+vs]);if(!o)return null;
   return{q:"التحويلات الهندسية التي تُطبَّق على منحنى "+$("f(x)=\\"+f+" x")+" لينتج منحنى "+$("g(x)="+sinT(a,f,1,cn,cd,d))+" هي:",...o,
    s:[...(a<0?["الإشارة السالبة لـ "+$("a")+" تعني انعكاسًا حول المحور x"]:[]),...(Math.abs(a)!==1?[$("|a|="+Math.abs(a))+" ⇐ توسيع رأسي"]:[]),$("x"+(cn>0?"-":"+")+cT(Math.abs(cn),cd))+" ⇐ "+sh,$("d="+d)+" ⇐"+vs.replace(" ، ","")],chk:()=>true}}},
 {id:"maxpt",lvl:3,t:"نقطة القيمة العظمى أو الصغرى",f(){const f=pick(["sin","cos"]);const a=pick([2,3,4,-2,-3,-4]);const [cn,cd]=pick([[1,2],[1,4],[1,3],[-1,2],[1,6]]);const askMax=pick([true,false]);
   /* g(x)=a f(x-c): القيمة العظمى عندما f(x-c)=sign(a)*1 */
   const want=(askMax?1:-1)*Math.sign(a);/* قيمة f(u) المطلوبة */let un,ud;if(f==="sin"){[un,ud]=want>0?[1,2]:[3,2]}else{[un,ud]=want>0?[0,1]:[1,1]}
   const xn=un*cd+cn*ud,xd=ud*cd;const X=pf(xn,xd),Y=askMax?Math.abs(a):-Math.abs(a);const right=$("\\left("+X+","+Y+"\\right)");
   const alt=pf(xn*1+xd,xd*1);const o=opts(right,[$("\\left("+X+","+(-Y)+"\\right)"),$("\\left("+pf(cn,cd)+","+Y+"\\right)"),$("\\left("+pf(xn+xd,xd)+","+Y+"\\right)"),$("\\left("+pf(-cn,cd)+","+Y+"\\right)")]);if(!o)return null;
   return{q:"النقطة التي يوجد عندها قيمة "+(askMax?"عظمى":"صغرى")+" للاقتران "+$("y="+sinT(a,f,1,cn,cd,0))+" هي:",...o,
    s:["القيمة "+(askMax?"العظمى":"الصغرى")+" "+$("="+Y)+" وتحدث عندما "+$("\\"+f+"\\left(x"+(cn>0?"-":"+")+cT(Math.abs(cn),cd)+"\\right)="+want),"أي عندما "+$("x"+(cn>0?"-":"+")+cT(Math.abs(cn),cd)+"="+pf(un,ud)),"إذن "+$("x="+X)+" والنقطة "+right],chk:()=>{const x=xn*PI/xd;const y=a*Math[f](x-cn*PI/cd);return Math.abs(y-Y)<1e-9}}}},
 {id:"graph-id",lvl:3,t:"قاعدة الاقتران من تمثيله البياني",f(){if(!G())return null;const f=pick(["sin","cos"]),a=pick([1,2,3,0.5,-2]),b=pick([1,2,0.5]);const P=perT(b);
   const ex=(a<0?"-":"")+(Math.abs(a)===1?"":Math.abs(a))+f+"("+b+"*x)";const svg=window.G11K.svgPlot({x:[-0.3,b===0.5?4*PI+0.3:2*PI+0.3],y:[-Math.abs(a)-1,Math.abs(a)+1],xpi:true,ys:Math.abs(a)>=2?1:0.5,p:[["f",ex,0,b===0.5?4*PI:2*PI,"","a"]]});
   const T=(A,F,B)=>$("y="+sinT(A,F,B,0,1,0).replace("0.5","\\frac{1}{2}"));
   const right=T(a,f,b);const o=opts(right,[T(a,f==="sin"?"cos":"sin",b),T(a,f,b===1?2:b===2?0.5:1),T(-a,f,b),T(a===0.5?2:a*2,f,b)]);if(!o)return null;
   return{q:"قاعدة الاقتران الممثّل بيانيًّا في الشكل الآتي هي:<div class='gwrap'>"+svg+"</div>",...o,s:["أقرأ من الشكل: القيمة العظمى "+Math.abs(a)+" ⇐ السعة "+$("|a|="+String(Math.abs(a)).replace("0.5","\\frac{1}{2}")),"طول الدورة من الشكل "+$(P)+" ⇐ "+$("|b|=\\frac{2\\pi}{"+P+"}="+(bT(b)||"1")),"المنحنى يبدأ من "+(f==="sin"?"الصفر":(a>0?"قيمة عظمى":"قيمة صغرى"))+" عند "+$("x=0")+" ⇐ اقتران "+(f==="sin"?"جيب":"جيب تمام")+(a<0?" منعكس":""),"القاعدة: "+right],chk:()=>true}}}
]});

(window.G11=window.G11||{units:[]}).units.push(U);
})();
