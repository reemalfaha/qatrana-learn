/* أدوات رياضية لتوليد الأسئلة بحسابات دقيقة (كسور صحيحة، كثيرات حدود، كتابة LaTeX) */
(function(){
const M={};
M.ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));                 // عدد صحيح في [a,b]
M.rnz=(a,b)=>{let x;do{x=M.ri(a,b)}while(x===0);return x};        // غير صفري
M.pick=a=>a[Math.floor(Math.random()*a.length)];
M.shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
M.gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
/* كسر نسبي */
class F{constructor(n,d=1){if(d===0)throw Error("d=0");if(d<0){n=-n;d=-d}const g=M.gcd(n,d);this.n=n/g;this.d=d/g}
 add(o){o=F.of(o);return new F(this.n*o.d+o.n*this.d,this.d*o.d)}sub(o){o=F.of(o);return this.add(new F(-o.n,o.d))}
 mul(o){o=F.of(o);return new F(this.n*o.n,this.d*o.d)}div(o){o=F.of(o);return new F(this.n*o.d,this.d*o.n)}
 neg(){return new F(-this.n,this.d)}eq(o){o=F.of(o);return this.n===o.n&&this.d===o.d}lt(o){o=F.of(o);return this.n*o.d<o.n*this.d}
 get v(){return this.n/this.d}isInt(){return this.d===1}
 tex(){return this.d===1?String(this.n):(this.n<0?"-":"")+"\\frac{"+Math.abs(this.n)+"}{"+this.d+"}"}
 static of(x){return x instanceof F?x:new F(x,1)}}
M.F=F;M.fr=(n,d)=>new F(n,d);
const T=x=>F.of(x).tex();M.T=T;
/* حدّ بمعامل: c·x^k مع الإشارة (للكتابة داخل مقدار) */
M.term=(c,v,first)=>{c=F.of(c);if(c.n===0)return"";const neg=c.n<0,a=neg?c.neg():c;let s=(a.eq(1)&&v)?"":a.tex();s+=v||"";return (first?(neg?"-":""):(neg?" - ":" + "))+s};
/* كثير حدود من المعاملات [a_n,...,a_0] */
M.poly=(cs,x="x")=>{const n=cs.length-1;let s="";cs.forEach((c,i)=>{const k=n-i;const v=k===0?"":k===1?x:x+"^{"+k+"}";const t=M.term(c,v,s==="");s+=t});return s||"0"};
M.lin=(a,b,x="x")=>M.poly([a,b],x);                                   // ax+b
M.ev=(cs,x)=>cs.reduce((acc,c)=>acc.mul(x).add(c),new F(0));          // تقييم دقيق
M.synth=(cs,r)=>{const q=[];let acc=new F(0);cs.forEach((c,i)=>{acc=acc.mul(r).add(c);q.push(acc)});const R=q.pop();return{q,R}};
M.mulp=(a,b)=>{const r=Array(a.length+b.length-1).fill(0).map(()=>new F(0));a.forEach((x,i)=>b.forEach((y,j)=>{r[i+j]=r[i+j].add(F.of(x).mul(y))}));return r};
M.xm=(r)=>"x"+(F.of(r).n<0?" + "+F.of(r).neg().tex():" - "+F.of(r).tex());   // (x - r)
M.par=s=>"("+s+")";
M.set=a=>"\\{"+a.join(" , ")+"\\}";
M.iv=(l,r,lc,rc)=>(lc?"[":"(")+l+" , "+r+(rc?"]":")");                 // فترة
/* بناء خيارات: الصحيحة + مشتّتات مختلفة (بالنص) */
M.opts=(right,wrongs,fill)=>{const seen=new Set([right]),o=[right];for(const w of wrongs){if(o.length>=4)break;if(w==null||seen.has(w))continue;seen.add(w);o.push(w)}
 let g=0;while(o.length<4&&fill&&g++<60){const w=fill();if(w!=null&&!seen.has(w)){seen.add(w);o.push(w)}}
 if(o.length<4)return null;const idx=M.shuffle([0,1,2,3]);return{o:idx.map(i=>o[i]),a:idx.indexOf(0)}};
M.$=s=>"$"+s+"$";
M.cases=rows=>"\\begin{cases}"+rows.map(([e,c])=>e+" & ,\\ "+c).join("\\\\")+"\\end{cases}";
window.M=M;
})();
