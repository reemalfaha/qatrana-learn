/* رياضياتي — إضافات: رسوم هندسيّة عامّة (دوائر، مثلّثات، اتّجاهات) وأدوات حساب المثلّثات */
(function(){
const {C}=ML;
const NS="http://www.w3.org/2000/svg";
function E(t,a){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e;}
const rad=d=>d*Math.PI/180;
const onC=(deg,r,c)=>{c=c||[0,0];r=r==null?1:r;return [c[0]+r*Math.cos(rad(deg)),c[1]+r*Math.sin(rad(deg))];};

/* شكلٌ هندسيّ عامّ:
 {P:{A:[x,y],…}, circles:[{c:[x,y],r,col}], segs:[["A","B",{col,dash,ext}]], dots:["A",…], hide:["O"] (بلا اسم),
  angs:[{at,from,to,l,col,r}], rights:[{at,from,to}], texts:[[x,y,"نص",col]], side:[["A","B","نص"]], north:["A"], w} */
function fig(o){
  const P=o.P||{};const pts=Object.values(P);
  (o.circles||[]).forEach(c=>{pts.push([c.c[0]-c.r,c.c[1]-c.r],[c.c[0]+c.r,c.c[1]+c.r]);});
  (o.texts||[]).forEach(t=>pts.push([t[0],t[1]]));
  (o.north||[]).forEach(n=>{const p=P[n];pts.push([p[0],p[1]+(o.nl||1)]);});
  let x0=Math.min(...pts.map(p=>p[0])),x1=Math.max(...pts.map(p=>p[0])),y0=Math.min(...pts.map(p=>p[1])),y1=Math.max(...pts.map(p=>p[1]));
  const span=Math.max(x1-x0,y1-y0)||1,m=span*.16;x0-=m;x1+=m;y0-=m;y1+=m;
  const s=Math.min((o.w||280)/(x1-x0),(o.maxH||300)/(y1-y0)),W=Math.round((x1-x0)*s),H=Math.round((y1-y0)*s);
  const X=v=>(v-x0)*s,Y=v=>(y1-v)*s;
  const g=p=>typeof p==="string"?P[p]:p;
  const svg=E("svg",{viewBox:`0 0 ${W} ${H}`,width:W,height:H,class:"plot gf",role:"img","aria-label":o.alt||"شكلٌ هندسيّ"});
  const txt=(t,x,y,col,sz,it)=>{const e=E("text",{x,y,direction:"ltr","unicode-bidi":"plaintext","text-anchor":"middle","dominant-baseline":"middle","font-size":sz||13,fill:col||C.ink,"font-family":it?"serif":"Cairo,sans-serif","font-style":it?"italic":"normal","font-weight":it?700:400});e.textContent=t;svg.append(e);};
  (o.circles||[]).forEach(c=>svg.append(E("circle",{cx:X(c.c[0]),cy:Y(c.c[1]),r:c.r*s,fill:c.fill||"none",stroke:c.col||C.blue,"stroke-width":2})));
  (o.arcs||[]).forEach(a=>{const [cx,cy]=a.c,r=a.r;const p1=onC(a.a0,r,a.c),p2=onC(a.a1,r,a.c);const big=((a.a1-a.a0+360)%360)>180?1:0;
    svg.append(E("path",{d:`M${X(p1[0])} ${Y(p1[1])} A${r*s} ${r*s} 0 ${big} 0 ${X(p2[0])} ${Y(p2[1])}`,fill:"none",stroke:a.col||C.red,"stroke-width":a.w||4,"stroke-linecap":"round"}));});
  (o.sectors||[]).forEach(a=>{const r=a.r,p1=onC(a.a0,r,a.c),p2=onC(a.a1,r,a.c);const big=((a.a1-a.a0+360)%360)>180?1:0;
    svg.append(E("path",{d:`M${X(a.c[0])} ${Y(a.c[1])} L${X(p1[0])} ${Y(p1[1])} A${r*s} ${r*s} 0 ${big} 0 ${X(p2[0])} ${Y(p2[1])}Z`,fill:a.fill||C.shade,stroke:a.col||C.blue,"stroke-width":2}));});
  if(o.poly)svg.append(E("polygon",{points:o.poly.map(p=>{p=g(p);return X(p[0])+","+Y(p[1]);}).join(" "),fill:o.polyFill||"rgba(21,101,192,.08)",stroke:"none"}));
  (o.segs||[]).forEach(([a,b,st])=>{st=st||{};let p=g(a),q=g(b);if(st.ext){const dx=q[0]-p[0],dy=q[1]-p[1];p=[p[0]-dx*st.ext,p[1]-dy*st.ext];q=[q[0]+dx*st.ext,q[1]+dy*st.ext];}
    svg.append(E("line",{x1:X(p[0]),y1:Y(p[1]),x2:X(q[0]),y2:Y(q[1]),stroke:st.col||C.ink,"stroke-width":st.w||2,"stroke-dasharray":st.dash?"6 4":""}));
    if(st.arrow){const ang=Math.atan2(-(q[1]-p[1]),q[0]-p[0]);const hx=X(q[0]),hy=Y(q[1]);svg.append(E("path",{d:`M${hx} ${hy} L${hx-10*Math.cos(ang-0.4)} ${hy-10*Math.sin(ang-0.4)} L${hx-10*Math.cos(ang+0.4)} ${hy-10*Math.sin(ang+0.4)}Z`,fill:st.col||C.ink}));}});
  (o.north||[]).forEach(n=>{const p=P[n],L=o.nl||1;svg.append(E("line",{x1:X(p[0]),y1:Y(p[1]),x2:X(p[0]),y2:Y(p[1]+L),stroke:C.axis,"stroke-width":1.6}));
    svg.append(E("path",{d:`M${X(p[0])} ${Y(p[1]+L)-2} l-5 9 h10z`,fill:C.axis}));txt("N",X(p[0]),Y(p[1]+L)-10,C.axis,11,true);});
  (o.rights||[]).forEach(r=>{const v=g(r.at),a=g(r.from),b=g(r.to);const u=(p)=>{const dx=p[0]-v[0],dy=p[1]-v[1],l=Math.hypot(dx,dy);return [dx/l,dy/l];};const k=span*.07,ua=u(a),ub=u(b);
    const p1=[v[0]+ua[0]*k,v[1]+ua[1]*k],p2=[p1[0]+ub[0]*k,p1[1]+ub[1]*k],p3=[v[0]+ub[0]*k,v[1]+ub[1]*k];
    svg.append(E("polyline",{points:[p1,p2,p3].map(p=>X(p[0])+","+Y(p[1])).join(" "),fill:"none",stroke:C.red,"stroke-width":1.5}));});
  (o.angs||[]).forEach(a=>{const v=g(a.at),A=g(a.from),B=g(a.to);let t1=Math.atan2(A[1]-v[1],A[0]-v[0]),t2=Math.atan2(B[1]-v[1],B[0]-v[0]);
    let d=t2-t1;while(d<=-Math.PI)d+=2*Math.PI;while(d>Math.PI)d-=2*Math.PI;if(a.reflex){d=d>0?d-2*Math.PI:d+2*Math.PI;}
    const r=(a.r||.13)*span,steps=24;let path="";for(let i=0;i<=steps;i++){const t=t1+d*i/steps;path+=(i?"L":"M")+X(v[0]+r*Math.cos(t)).toFixed(1)+" "+Y(v[1]+r*Math.sin(t)).toFixed(1);}
    svg.append(E("path",{d:path,fill:"none",stroke:a.col||C.red,"stroke-width":1.8}));
    if(a.l){const tm=t1+d/2,R=r+span*(a.lr||.09);txt(a.l,X(v[0]+R*Math.cos(tm)),Y(v[1]+R*Math.sin(tm)),a.col||C.red,12);}});
  (o.side||[]).forEach(([a,b,t,col,off])=>{const p=g(a),q=g(b);const mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2;let nx=-(q[1]-p[1]),ny=q[0]-p[0];const l=Math.hypot(nx,ny)||1;nx/=l;ny/=l;
    const cx=o.ctr?o.ctr[0]:(x0+x1)/2,cy=o.ctr?o.ctr[1]:(y0+y1)/2;if((mx-cx)*nx+(my-cy)*ny<0){nx=-nx;ny=-ny;}const k=span*(off||.075);
    txt(t,X(mx+nx*k),Y(my+ny*k),col||C.blue,12);});
  const cx=o.ctr?o.ctr[0]:(x0+x1)/2,cy=o.ctr?o.ctr[1]:(y0+y1)/2;
  Object.entries(P).forEach(([n,p])=>{const dot=(o.dots||Object.keys(P)).includes(n);if(dot)svg.append(E("circle",{cx:X(p[0]),cy:Y(p[1]),r:3.2,fill:C.ink}));
    if((o.hide||[]).includes(n))return;let dx=p[0]-cx,dy=p[1]-cy;const l=Math.hypot(dx,dy)||1;const k=span*.07;const lp=(o.lpos||{})[n];
    if(lp){dx=Math.cos(rad(lp));dy=Math.sin(rad(lp));txt(n,X(p[0]+dx*k),Y(p[1]+dy*k),C.ink,13,true);}else txt(n,X(p[0]+dx/l*k),Y(p[1]+dy/l*k),C.ink,13,true);});
  (o.texts||[]).forEach(([x,y,t,col,sz])=>txt(t,X(x),Y(y),col||C.ink,sz||12));
  return svg;
}

/* مثلّث منْ أطوالٍ وزوايا: يرجعُ رؤوسًا A,B,C بحيثُ BC أفقيّ */
function triPts(a,b,c){ // a=BC, b=CA, c=AB
  const B=[0,0],Cc=[a,0];const x=(a*a+c*c-b*b)/(2*a);const y=Math.sqrt(Math.max(0,c*c-x*x));return {A:[x,y],B,C:Cc};}

/* ===== حساب المثلّثات ===== */
const sd=d=>Math.sin(rad(d)),cd=d=>Math.cos(rad(d)),td=d=>Math.tan(rad(d));
const asd=v=>Math.asin(v)*180/Math.PI,acd=v=>Math.acos(v)*180/Math.PI,atd=v=>Math.atan(v)*180/Math.PI;
const r1=v=>+(Math.round(v*10)/10).toFixed(1),r3=v=>+(Math.round(v*1000)/1000).toFixed(3);
const norm=a=>((a%360)+360)%360;
const quad=a=>{a=norm(a);if(a%90===0)return 0;return Math.floor(a/90)+1;};
const QN=["","الأوّل","الثّاني","الثّالث","الرّابع"];
function refAng(a){a=norm(a);if(a<=90)return a;if(a<=180)return 180-a;if(a<=270)return a-180;return 360-a;}
const REFV={0:{sin:"0",cos:"1",tan:"0"},30:{sin:"\\f{1}{2}",cos:"\\f{\\r{3}}{2}",tan:"\\f{1}{\\r{3}}"},45:{sin:"\\f{1}{\\r{2}}",cos:"\\f{1}{\\r{2}}",tan:"1"},60:{sin:"\\f{\\r{3}}{2}",cos:"\\f{1}{2}",tan:"\\r{3}"},90:{sin:"1",cos:"0",tan:null}};
// قيمة دقيقة لنسبةٍ مثلّثيّة لزاويةٍ خاصّة (مضاعفات 30 أو 45)
function exact(fn,a){const r=refAng(a);const base=REFV[r][fn];if(base===null)return null;if(base==="0")return "0";
  const v={sin:sd,cos:cd,tan:td}[fn](a);return (v<0?"-":"")+base;}
const SPECIAL=[0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330,360];
const dg=v=>v+"°";

ML.fig=fig;ML.triPts=triPts;ML.onC=onC;
Object.assign(ML,{sd,cd,td,asd,acd,atd,r1,r3,norm,quad,QN,refAng,exact,SPECIAL,dg});
})();
