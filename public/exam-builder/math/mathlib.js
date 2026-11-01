/* رياضياتي — مكتبة الرياضيات: عرض الرموز، الرسوم (خطّ الأعداد، المستوى الإحداثي)، والأعداد العشوائيّة */
(function(){
const WORDS=new Set(["sin","cos","tan","or","and","km","cm","min","kg","lb","mile","in","of","ft"]);
const ESC={"&":"&amp;","<":"&lt;",">":"&gt;"};
const SYM={"\\in":"∈","\\notin":"∉","\\U":"∪","\\N":"∩","\\pm":"±","\\D":"Δ","\\ne":"≠","\\cong":"≅","\\deg":"°","\\x":"×","\\to":"→","\\phi":"∅","\\pi":"π","\\.":"·"};
// يحوّل صيغة رياضيّة مختصرة إلى HTML
function parse(s){
  let out="",i=0;
  const group=()=>{ // يقرأ {…} أو رمزًا واحدًا
    if(s[i]==="{"){let d=1,j=i+1;for(;j<s.length;j++){if(s[j]==="{")d++;else if(s[j]==="}"){d--;if(!d)break;}}const g=s.slice(i+1,j);i=j+1;return parse(g);}
    if(/[0-9]/.test(s[i])){let j=i;while(j<s.length&&/[0-9.]/.test(s[j]))j++;const g=s.slice(i,j);i=j;return g;}
    const c=s[i++];return /[a-zA-Z]/.test(c)?"<i>"+c+"</i>":(ESC[c]||c);
  };
  while(i<s.length){
    const c=s[i];
    if(c==="\\"){
      if(s.startsWith("\\f",i)&&s[i+2]==="{"){i+=2;const a=group(),b=group();out+='<span class="fr"><span>'+a+'</span><span>'+b+'</span></span>';continue;}
      if(s.startsWith("\\r",i)&&s[i+2]==="{"){i+=2;const a=group();out+='<span class="sq">√<span>'+a+'</span></span>';continue;}
      if(s.startsWith("\\v",i)&&s[i+2]==="{"){i+=2;const a=group();out+='<span class="ov">'+a+'</span>';continue;}
      const k=Object.keys(SYM).sort((a,b)=>b.length-a.length).find(k=>s.startsWith(k,i));
      if(k){out+=SYM[k];i+=k.length;continue;}
      out+="\\";i++;continue;
    }
    if(c==="^"){i++;out+="<sup>"+group()+"</sup>";continue;}
    if(c==="_"){i++;out+="<sub>"+group()+"</sub>";continue;}
    if(s.startsWith("<=",i)){out+=" ≤ ";i+=2;continue;}
    if(s.startsWith(">=",i)){out+=" ≥ ";i+=2;continue;}
    if(s.startsWith("!=",i)){out+=" ≠ ";i+=2;continue;}
    if(s.startsWith("inf",i)){out+="∞";i+=3;continue;}
    if(c==="<"||c===">"){out+=" "+ESC[c]+" ";i++;continue;}
    if(c==="-"){out+="−";i++;continue;}
    if(c==="*"){out+="×";i++;continue;}
    if(c==="&"){out+="&amp;";i++;continue;}
    if(/[a-zA-Z]/.test(c)){ // كلمات متّصلة مثل or/and/km تبقى عاديّة
      let j=i;while(j<s.length&&/[a-zA-Z]/.test(s[j]))j++;const w=s.slice(i,j);
      if(WORDS.has(w))out+='<span class="mw">'+w+'</span>';else out+=w.split("").map(ch=>"<i>"+ch+"</i>").join("");i=j;continue;}
    out+=c;i++;
  }
  return out;
}
// النصّ: العربيّة كما هي، وما بين $…$ رياضيّات
function T(s){
  if(s==null) return "";
  return String(s).split("$").map((p,k)=>k%2?'<bdi class="m" dir="ltr">'+parse(p)+'</bdi>':p.replace(/[&<>]/g,c=>ESC[c])).join("");
}
function H(html,tag,cls){const e=document.createElement(tag||"span");if(cls)e.className=cls;e.innerHTML=html;return e;}

/* ===== أعداد ===== */
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const nz=(a,b)=>{let v;do v=ri(a,b);while(v===0);return v;};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a||1;};
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
// كسر مبسّط بصيغة العرض
function fr(n,d){if(d===undefined)d=1;if(d<0){n=-n;d=-d;}const g=gcd(n,d);n/=g;d/=g;if(d===1)return String(n);return (n<0?"-":"")+"\\f{"+Math.abs(n)+"}{"+d+"}";}
const num=n=>String(n); // الإشارة السالبة تتحوّل إلى − عند العرض
const par=n=>n<0?"("+n+")":String(n); // عدد سالب بين قوسين عند التعويض
// حدّ جبريّ: معامل مع متغيّر (لا يكتب 1)
function term(c,v,first){ if(c===0) return ""; const s=c<0?"-":(first?"":"+"); const a=Math.abs(c); return (first?s:" "+s+" ")+(a===1&&v?"":a)+(v||""); }
// كثير حدود: [[معامل,متغيّر],…]
function poly(parts){let out="",first=true;parts.forEach(([c,v])=>{if(c===0)return;out+=term(c,v,first);first=false;});return out||"0";}
// تبسيط الجذر: √n = k√m
function simpSqrt(n){let k=1,m=n;for(let f=2;f*f<=m;f++){while(m%(f*f)===0){m/=f*f;k*=f;}}return [k,m];}
function sqrtStr(n){if(n<0)return null;const[k,m]=simpSqrt(n);if(m===1)return String(k);return (k===1?"":k)+"\\r{"+m+"}";}

/* ===== بناء سؤال اختيارٍ من متعدّد ===== */
// q: نصّ السّؤال، ok: الإجابة، wrong: مشتّتات (أخطاء شائعة)، steps: الحلّ خطوةً خطوة
function MC(q,ok,wrong,steps,extra){
  const seen=new Set([ok]);const o=[ok];
  (wrong||[]).forEach(w=>{if(w!=null&&!seen.has(w)&&o.length<4){seen.add(w);o.push(w);}});
  return Object.assign({q,o,a:0,steps:steps||[]},extra||{});
}

/* ===== رسوم SVG ===== */
const NS="http://www.w3.org/2000/svg";
function svgEl(t,a){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e;}
const C={ink:"#2B1218",axis:"#4A3A40",grid:"#E7DCDC",blue:"#1565C0",red:"#C62828",green:"#2E7D32",gold:"#B8902A",shade:"rgba(21,101,192,.18)"};

// خطّ الأعداد: {min,max,step, segs:[[a,b]] (يمكن ±Infinity), dots:[{x,open,col}], labels:{x:"A"}}
function numberLine(o){
  const W=340,H=o.labels?70:56,pad=22,min=o.min,max=o.max,step=o.step||1;
  const X=v=>pad+(v-min)/(max-min)*(W-2*pad);
  const s=svgEl("svg",{viewBox:`0 0 ${W} ${H}`,class:"plot nl",role:"img","aria-label":o.alt||"خطّ الأعداد"});
  const y=o.labels?36:22;
  s.append(svgEl("line",{x1:6,y1:y,x2:W-6,y2:y,stroke:C.axis,"stroke-width":1.6}));
  s.append(svgEl("path",{d:`M6 ${y} l8 -5 v10z M${W-6} ${y} l-8 -5 v10z`,fill:C.axis}));
  const n=Math.round((max-min)/step);const every=n>16?Math.ceil(n/12):1;
  for(let k=0;k<=n;k++){const v=+(min+k*step).toFixed(6),x=X(v);s.append(svgEl("line",{x1:x,y1:y-5,x2:x,y2:y+5,stroke:C.axis,"stroke-width":1}));
    if(k%every===0){const t=svgEl("text",{direction:"ltr",x,y:y+19,"text-anchor":"middle","font-size":11,fill:C.ink,"font-family":"Cairo,sans-serif"});t.textContent=v<0?"−"+Math.abs(v):v;s.append(t);}}
  (o.segs||[]).forEach(([a,b],i)=>{const col=(o.cols&&o.cols[i])||C.blue;const x1=a===-Infinity?8:X(a),x2=b===Infinity?W-8:X(b);
    s.append(svgEl("line",{x1,y1:y,x2,y2:y,stroke:col,"stroke-width":5,"stroke-linecap":"round"}));
    if(a===-Infinity)s.append(svgEl("path",{d:`M4 ${y} l10 -7 v14z`,fill:col}));
    if(b===Infinity)s.append(svgEl("path",{d:`M${W-4} ${y} l-10 -7 v14z`,fill:col}));});
  (o.dots||[]).forEach(d=>{const col=d.col||C.blue;s.append(svgEl("circle",{cx:X(d.x),cy:y,r:6,fill:d.open?"#fff":col,stroke:col,"stroke-width":2.4}));});
  if(o.labels)Object.entries(o.labels).forEach(([x,l])=>{const t=svgEl("text",{direction:"ltr",x:X(+x),y:y-12,"text-anchor":"middle","font-size":13,"font-weight":700,fill:C.blue,"font-family":"serif","font-style":"italic"});t.textContent=l;s.append(t);});
  return s;
}

// المستوى الإحداثيّ: {x:[a,b], y:[c,d], step, fns:[{f,col,dash}], lines:[{A,B,C,col,dash}] (Ax+By=C), shade:{A,B,C,op}, pts:[{x,y,l,open,col}], path:[[x,y],…], xl, yl}
function plane(o){
  const [x0,x1]=o.x,[y0,y1]=o.y;const W=o.w||300,H=o.h||Math.round(W*(y1-y0)/(x1-x0)),pad=o.pad||18;
  const X=v=>pad+(v-x0)/(x1-x0)*(W-2*pad),Y=v=>H-pad-(v-y0)/(y1-y0)*(H-2*pad);
  const s=svgEl("svg",{viewBox:`0 0 ${W} ${H}`,class:"plot pl",role:"img","aria-label":o.alt||"تمثيلٌ بيانيّ"});
  const sx=o.sx||o.step||1,sy=o.sy||o.step||1;
  if(o.grid!==false){for(let v=Math.ceil(x0/sx)*sx;v<=x1;v+=sx)s.append(svgEl("line",{x1:X(v),y1:Y(y0),x2:X(v),y2:Y(y1),stroke:C.grid,"stroke-width":1}));
    for(let v=Math.ceil(y0/sy)*sy;v<=y1;v+=sy)s.append(svgEl("line",{x1:X(x0),y1:Y(v),x2:X(x1),y2:Y(v),stroke:C.grid,"stroke-width":1}));}
  // التظليل (نصف مستوى)
  if(o.shade){const {A,B,C:c,op}=o.shade;const test=(x,y)=>{const v=A*x+B*y-c;return op.includes(">")?v>=0:v<=0;};
    let poly=[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];const out=[];
    for(let i=0;i<poly.length;i++){const P=poly[i],Q=poly[(i+1)%poly.length];const pi=test(...P),qi=test(...Q);
      if(pi)out.push(P);if(pi!==qi){const fp=A*P[0]+B*P[1]-c,fq=A*Q[0]+B*Q[1]-c,t=fp/(fp-fq);out.push([P[0]+t*(Q[0]-P[0]),P[1]+t*(Q[1]-P[1])]);}}
    if(out.length)s.append(svgEl("polygon",{points:out.map(([a,b])=>X(a)+","+Y(b)).join(" "),fill:o.shade.col||C.shade}));}
  // المحاور
  const ax=Math.min(Math.max(0,x0),x1),ay=Math.min(Math.max(0,y0),y1);
  s.append(svgEl("line",{x1:X(x0),y1:Y(ay),x2:X(x1),y2:Y(ay),stroke:C.axis,"stroke-width":1.5}));
  s.append(svgEl("line",{x1:X(ax),y1:Y(y0),x2:X(ax),y2:Y(y1),stroke:C.axis,"stroke-width":1.5}));
  s.append(svgEl("path",{d:`M${X(x1)} ${Y(ay)} l-7 -4 v8z M${X(ax)} ${Y(y1)} l-4 7 h8z`,fill:C.axis}));
  const lab=(t,x,y,anc,sz,col)=>{const e=svgEl("text",{direction:"ltr",x,y,"text-anchor":anc||"middle","font-size":sz||10,fill:col||C.ink,"font-family":"Cairo,sans-serif"});e.textContent=t;s.append(e);};
  const lx=o.lx||sx*(x1-x0>14?2:1),ly=o.ly||sy*(y1-y0>14?2:1);
  if(o.ticks!==false){for(let v=Math.ceil(x0/lx)*lx;v<=x1;v+=lx)if(Math.abs(v)>1e-9)lab(v<0?"−"+Math.abs(v):String(+v.toFixed(2)),X(v),Y(ay)+13);
    for(let v=Math.ceil(y0/ly)*ly;v<=y1;v+=ly)if(Math.abs(v)>1e-9)lab(v<0?"−"+Math.abs(v):String(+v.toFixed(2)),X(ax)-4,Y(v)+4,"end");}
  lab(o.xl||"x",X(x1)-4,Y(ay)-6,"end",12,C.ink);lab(o.yl||"y",X(ax)+6,Y(y1)+10,"start",12,C.ink);
  // المستقيمات Ax+By=C
  (o.lines||[]).forEach(L=>{let P;if(Math.abs(L.B)<1e-9){const xv=L.C/L.A;P=[[xv,y0],[xv,y1]];}else{P=[[x0,(L.C-L.A*x0)/L.B],[x1,(L.C-L.A*x1)/L.B]];}
    s.append(svgEl("line",{x1:X(P[0][0]),y1:Y(P[0][1]),x2:X(P[1][0]),y2:Y(P[1][1]),stroke:L.col||C.blue,"stroke-width":2.4,"stroke-dasharray":L.dash?"7 5":""}));});
  // المنحنيات
  (o.fns||[]).forEach(F=>{let d="",pen=false;const a=F.from??x0,b=F.to??x1;for(let k=0;k<=240;k++){const x=a+(b-a)*k/240,y=F.f(x);if(!isFinite(y)||y<y0-(y1-y0)||y>y1+(y1-y0)){pen=false;continue;}d+=(pen?"L":"M")+X(x).toFixed(1)+" "+Y(Math.max(y0-.5,Math.min(y1+.5,y))).toFixed(1);pen=true;}
    const g=svgEl("g",{});const cp=svgEl("clipPath",{id:"c"+Math.random().toString(36).slice(2)});cp.append(svgEl("rect",{x:X(x0),y:Y(y1),width:X(x1)-X(x0),height:Y(y0)-Y(y1)}));s.append(cp);
    g.setAttribute("clip-path",`url(#${cp.id})`);g.append(svgEl("path",{d,fill:"none",stroke:F.col||C.blue,"stroke-width":2.4,"stroke-dasharray":F.dash?"6 5":""}));s.append(g);});
  if(o.path){s.append(svgEl("polyline",{points:o.path.map(([a,b])=>X(a)+","+Y(b)).join(" "),fill:"none",stroke:o.pathCol||C.red,"stroke-width":2.6,"stroke-linejoin":"round"}));}
  if(o.vline!=null)s.append(svgEl("line",{x1:X(o.vline),y1:Y(y0),x2:X(o.vline),y2:Y(y1),stroke:C.red,"stroke-width":1.8,"stroke-dasharray":"5 4"}));
  (o.pts||[]).forEach(p=>{s.append(svgEl("circle",{cx:X(p.x),cy:Y(p.y),r:4.5,fill:p.open?"#fff":(p.col||C.red),stroke:p.col||C.red,"stroke-width":2}));if(p.l)lab(p.l,X(p.x)+7,Y(p.y)-7,"start",11,p.col||C.red);});
  return s;
}

window.ML={T,H,parse,ri,pick,nz,gcd,shuffle,fr,num,par,term,poly,simpSqrt,sqrtStr,MC,numberLine,plane,C};
})();
