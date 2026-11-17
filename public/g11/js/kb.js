/* أسئلة الكتاب: بنك ذاتي التصحيح من أمثلة كتاب الطالب وأسئلته وكتاب التمارين */
(function(){
"use strict";
/* ---------- محلّل تعابير رياضية بسيط (x، أعداد، + - * / ^، أقواس، |..|، sqrt، abs، ضرب ضمني) ---------- */
function norm(s){return String(s).replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d))
 .replace(/[×·]/g,"*").replace(/÷/g,"/").replace(/[−–—]/g,"-").replace(/\*\*/g,"^").replace(/²/g,"^2").replace(/³/g,"^3").replace(/√/g,"sqrt")
 .replace(/X/g,"x").replace(/٫/g,".").replace(/\s+/g,"").replace(/\)\(/g,")*(")}
function compile(src){const s=norm(src);if(!s)throw 0;const T=[],re=/(\d+\.?\d*|\.\d+)|(sqrt|abs)|(x)|([-+*/^()|])/y;let i=0;
 while(i<s.length){re.lastIndex=i;const m=re.exec(s);if(!m)throw 0;T.push(m[0]);i=re.lastIndex}
 let p=0,absd=0;const pk=()=>T[p],nx=()=>T[p++];
 const starts=t=>t!==undefined&&(/^[\d.]/.test(t)||t==="x"||t==="("||t==="sqrt"||t==="abs"||(t==="|"&&absd===0));
 function E(){let a=Tm();while(pk()==="+"||pk()==="-"){const o=nx(),b=Tm(),A=a;a=o==="+"?x=>A(x)+b(x):x=>A(x)-b(x)}return a}
 function Tm(){let a=U();for(;;){const t=pk();if(t==="*"||t==="/"){nx();const b=U(),A=a;a=t==="*"?x=>A(x)*b(x):x=>A(x)/b(x)}else if(starts(t)){const b=Pw(),A=a;a=x=>A(x)*b(x)}else return a}}
 function U(){if(pk()==="-"){nx();const a=U();return x=>-a(x)}if(pk()==="+"){nx();return U()}return Pw()}
 function Pw(){const a=At();if(pk()==="^"){nx();const b=U();return x=>Math.pow(a(x),b(x))}return a}
 function At(){const t=nx();if(t===undefined)throw 0;if(/^[\d.]/.test(t)){const v=parseFloat(t);return()=>v}if(t==="x")return x=>x;
  if(t==="("){const a=E();if(nx()!==")")throw 0;return a}
  if(t==="sqrt"||t==="abs"){const f=t==="sqrt"?Math.sqrt:Math.abs;let a;if(pk()==="("){nx();a=E();if(nx()!==")")throw 0}else a=Pw();return x=>f(a(x))}
  if(t==="|"){absd++;const a=E();absd--;if(nx()!=="|")throw 0;return x=>Math.abs(a(x))}throw 0}
 const f=E();if(p!==T.length)throw 0;return f}
const PTS=[-2.7,-1.3,-0.45,0.6,1.9,3.4,5.1,7.3];
const close=(a,b)=>Math.abs(a-b)<=1e-6*Math.max(1,Math.abs(a));
function same(fa,fb){let n=0;for(const x of PTS){const a=fa(x),b=fb(x);if(!isFinite(a))continue;if(!isFinite(b)||!close(a,b))return false;n++}return n>=3}
function val(s){if(/x/i.test(norm(s)))throw 0;const v=compile(s)(0);if(!isFinite(v))throw 0;return v}

/* ---------- رسم بياني SVG ---------- */
const NS="http://www.w3.org/2000/svg";
function nice(r){const c=[1,2,5,10,20,25,50,100,200,250,500];for(const s of c)if(r/s<=12)return s;return 1000}
let MID=0;
function svgPlot(g,w){w=w||300;const [x0,x1]=g.x,[y0,y1]=g.y,pad=22;const ar=(y1-y0)/(x1-x0);const W=w,H=Math.max(170,Math.min(340,w*ar*1.0));
 const sx=v=>pad+(v-x0)/(x1-x0)*(W-2*pad),sy=v=>H-pad-(v-y0)/(y1-y0)*(H-2*pad);const id="ar"+(++MID);
 let o=`<svg xmlns="${NS}" viewBox="0 0 ${W} ${H}" class="gp" role="img" aria-label="تمثيل بياني"><defs><marker id="${id}" viewBox="0 0 10 10" refX="6" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="var(--m)"/></marker><marker id="${id}k" viewBox="0 0 10 10" refX="6" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="var(--ink)"/></marker><clipPath id="${id}c"><rect x="${pad-3}" y="${pad-3}" width="${W-2*pad+6}" height="${H-2*pad+6}"/></clipPath></defs>`;
 const stx=nice(x1-x0),sty=nice(y1-y0);
 for(let v=Math.ceil(x0/stx)*stx;v<=x1;v+=stx)o+=`<line x1="${sx(v)}" y1="${pad}" x2="${sx(v)}" y2="${H-pad}" class="gl"/>`;
 for(let v=Math.ceil(y0/sty)*sty;v<=y1;v+=sty)o+=`<line x1="${pad}" y1="${sy(v)}" x2="${W-pad}" y2="${sy(v)}" class="gl"/>`;
 const ax=Math.min(Math.max(0,y0),y1),ay=Math.min(Math.max(0,x0),x1);
 o+=`<line x1="${pad-8}" y1="${sy(ax)}" x2="${W-pad+8}" y2="${sy(ax)}" class="ax" marker-start="url(#${id}k)" marker-end="url(#${id}k)"/><line x1="${sx(ay)}" y1="${H-pad+8}" x2="${sx(ay)}" y2="${pad-8}" class="ax" marker-start="url(#${id}k)" marker-end="url(#${id}k)"/>`;
 o+=`<text x="${W-pad+4}" y="${sy(ax)-6}" class="al">x</text><text x="${sx(ay)+6}" y="${pad-6}" class="al">y</text>`;
 for(let v=Math.ceil(x0/stx)*stx;v<=x1;v+=stx)if(v!==ay)o+=`<text x="${sx(v)}" y="${sy(ax)+13}" class="tl">${v}</text>`;
 for(let v=Math.ceil(y0/sty)*sty;v<=y1;v+=sty)if(v!==ax)o+=`<text x="${sx(ay)-4}" y="${sy(v)+4}" class="tl" text-anchor="end">${v}</text>`;
 o+=`<text x="${sx(ay)-4}" y="${sy(ax)+13}" class="tl" text-anchor="end">0</text><g clip-path="url(#${id}c)">`;
 const dots=[];
 for(const pc of g.p){if(pc[0]==="p"){dots.push([pc[1],pc[2],pc[3]]);continue}
  const [,e,a,b,ea,eb]=pc;let f;try{f=compile(e)}catch(_){continue}const N=160,runs=[];let cur=[];const ym=(y1-y0)*.04;
  for(let i=0;i<=N;i++){const xv=a+(b-a)*i/N,yv=f(xv);if(isFinite(yv)&&yv>=y0-ym&&yv<=y1+ym)cur.push([xv,yv]);else{if(cur.length>1)runs.push(cur);cur=[]}}
  if(cur.length>1)runs.push(cur);
  runs.forEach((r,k)=>{const ms=k===0&&ea==="a"?` marker-start="url(#${id})"`:"",me=k===runs.length-1&&eb==="a"?` marker-end="url(#${id})"`:"";
   o+=`<polyline points="${r.map(q=>sx(q[0]).toFixed(1)+","+sy(q[1]).toFixed(1)).join(" ")}" class="cv"${ms}${me}/>`});
  if(ea==="c"||ea==="o")dots.push([a,f(a),ea]);if(eb==="c"||eb==="o")dots.push([b,f(b),eb])}
 dots.forEach(([a,b,k])=>{if(isFinite(b))o+=`<circle cx="${sx(a)}" cy="${sy(b)}" r="4.2" class="${k==="o"?"do":"dc"}"/>`});
 return o+"</g></svg>"}
function svgLine(n,w){w=w||300;const a=n.a,b=n.b,H=54,pad=18,sx=v=>pad+(v-a)/(b-a)*(w-2*pad),y=24;const id="nl"+(++MID);const st=b-a>24?5:b-a>12?2:1;
 let o=`<svg xmlns="${NS}" viewBox="0 0 ${w} ${H}" class="gp nl" role="img" aria-label="خط الأعداد"><defs><marker id="${id}" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="var(--ink)"/></marker><marker id="${id}m" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="var(--m)"/></marker></defs>`;
 o+=`<line x1="${pad-10}" y1="${y}" x2="${w-pad+10}" y2="${y}" class="ax" marker-start="url(#${id})" marker-end="url(#${id})"/>`;
 for(let v=Math.ceil(a);v<=b;v++){o+=`<line x1="${sx(v)}" y1="${y-4}" x2="${sx(v)}" y2="${y+4}" class="ax"/>`;if(v%st===0)o+=`<text x="${sx(v)}" y="${y+18}" class="tl">${v}</text>`}
 const dots=[];for(const [lo,hi,lk,hk] of n.s){const L=lo==null?a-.6:lo,R=hi==null?b+.6:hi;
  o+=`<line x1="${sx(L)}" y1="${y}" x2="${sx(R)}" y2="${y}" class="sg"${lo==null?` marker-start="url(#${id}m)"`:""}${hi==null?` marker-end="url(#${id}m)"`:""}/>`;
  if(lo!=null)dots.push([lo,lk]);if(hi!=null&&hi!==lo)dots.push([hi,hk])}
 dots.forEach(([v,k])=>o+=`<circle cx="${sx(v)}" cy="${y}" r="5" class="${k==="o"?"do":"dc"}"/>`);return o+"</svg>"}

/* ---------- الصفحة ---------- */
const LT=["أ","ب","ج","د"];
const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
function perm(id,n){const a=[...Array(n).keys()];let h=hash(id);for(let i=n-1;i>0;i--){h=Math.imul(h^h>>>13,1103515245)+12345>>>0;const j=h%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}

function kb(gid,src){const {el,H,math,LS,go}=window.G11U;const app=document.getElementById("app");
 const B=(G11.book||[])[0];if(!B){app.append(el("p",{},"لا توجد أسئلة بعد."));return}
 const PR=LS.get("g11.kb",{});const save=()=>LS.set("g11.kb",PR);
 const groups=B.meta.groups;gid=groups.some(g=>g[0]===gid)?gid:LS.get("g11.kbg",groups[0][0]);LS.set("g11.kbg",gid);src=src||"all";
 const all=B.items.filter(i=>i.lid===gid);const SRC=[["all","الكل"],["ex","أمثلة الكتاب"],["chk","أتحقق من فهمي"],["pr","أتدرّب وأحلّ المسائل"],["wb","كتاب التمارين"]].filter(([k])=>k==="all"||all.some(i=>i.src===k));
 const list=src==="all"?all:all.filter(i=>i.src===src);
 const ok=B.items.filter(i=>PR[i.id]===1).length;
 app.append(el("div",{class:"card"},el("h1",{},"📖 أسئلة الكتاب — الوحدة 1"),
  el("p",{class:"mut"},"أمثلة كتاب الطالب وأسئلة «أتحقق من فهمي» و«أتدرّب وأحلّ المسائل» وكتاب التمارين، تحلّينها هنا وتُصحَّح فورًا. اكتبي الإجابة ثم اضغطي «تحقّقي»، وتستطيعين عرض الحل في أي وقت."),
  el("div",{class:"row between"},el("span",{class:"chip"},"أنجزتِ "+ok+" من "+B.items.length),el("span",{class:"bar",style:"flex:1;max-width:340px"},el("i",{style:"width:"+Math.round(ok/B.items.length*100)+"%"})))));
 app.append(el("div",{class:"tabs kbg"},...groups.map(([k,t])=>{const n=B.items.filter(i=>i.lid===k),d=n.filter(i=>PR[i.id]===1).length;return el("button",{"aria-pressed":k===gid?"true":"false",onclick:()=>go("kb/"+k)},t,el("small",{}," ("+d+"/"+n.length+")"))})));
 if(SRC.length>2)app.append(el("div",{class:"tabs sm"},...SRC.map(([k,t])=>el("button",{"aria-pressed":k===src?"true":"false",onclick:()=>go("kb/"+gid+"/"+k)},t))));
 let last=null;
 const KEYS=["x","^","(",")","|","/","sqrt(",","];
 list.forEach((it,idx)=>{const c=el("div",{class:"card kq",id:"q-"+it.id});const st=()=>PR[it.id]===1?"✔":PR[it.id]===0?"✘":"";
  const badge=el("b",{class:"kst "+(PR[it.id]===1?"ok":PR[it.id]===0?"no":"")},st());
  c.append(el("div",{class:"row between"},el("span",{},el("span",{class:"chip"},it.lab),el("span",{class:"mut"}," "+B.meta.src[it.src]+" · ص "+it.pg)),badge));
  c.append(H("div","q",it.q));
  if(it.g)c.append(H("div","gwrap",svgPlot(it.g)));if(it.nl)c.append(H("div","gwrap",svgLine(it.nl)));
  const fb=el("div",{class:"fbk"}),sol=el("div",{class:"sol",hidden:true});
  sol.append(el("b",{},"الحل:"),...(it.sol||[]).map(s=>H("div","st",s)));
  if(it.t==="self"&&it.a)sol.append(H("div","st",it.a));
  if(it.ag)sol.append(el("div",{class:"mut"},"التمثيل البياني:"),H("div","gwrap",svgPlot(it.ag)));
  const mark=v=>{PR[it.id]=v;save();badge.className="kst "+(v===1?"ok":"no");badge.textContent=v===1?"✔":"✘"};
  const showSol=()=>{sol.hidden=false;math(sol)};
  const inputs=[];
  const inp=(ph)=>{const i=el("input",{type:"text",dir:"ltr",autocomplete:"off",autocapitalize:"off",spellcheck:"false",placeholder:ph,class:"kin"});i.addEventListener("focus",()=>last=i);i.addEventListener("keydown",e=>{if(e.key==="Enter")check()});inputs.push(i);return i};
  let check=()=>{};
  if(it.t==="mcq"){const opts=it.o||it.og||it.onl,P=perm(it.id,opts.length);const bs=P.map((j,k)=>{const content=it.og?H("span","gwrap",svgPlot(it.og[j],220)):it.onl?H("span","gwrap",svgLine(it.onl[j],260)):H("span","",opts[j]);
    const b=el("button",{class:"opt"},el("span",{class:"l"},LT[k]),content);b.onclick=()=>{bs.forEach(x=>x.classList.remove("ok","no"));const good=j===0;b.classList.add(good?"ok":"no");if(good)bs.forEach((x,q)=>{});mark(good?1:0);fb.replaceChildren(el("span",{class:good?"fb ok":"fb no"},good?"✔ أحسنتِ! إجابة صحيحة":"✘ ليست الإجابة الصحيحة، حاولي مرة أخرى أو اعرضي الحل"))};return b});
   c.append(el("div",{class:it.og?"grid g2":""},...bs))}
  else if(it.t==="num"||it.t==="expr"){const rows=it.f.map(f=>{const i=inp(f.k==="n"?"-3/4":f.k==="f"?"(x-1)(x+2)":"3x^2-2x+1");return [f,i,el("label",{class:"kf"},H("span","kl",f.lb),i)]});
   c.append(el("div",{class:"kfs"},...rows.map(r=>r[2])));
   check=()=>{let all=true,any=false;rows.forEach(([f,i])=>{i.classList.remove("ok","no");const s=i.value.trim();if(!s){all=false;return}any=true;let good=false;
     try{if(f.k==="n")good=close(val(f.a),val(s));else{good=same(compile(f.a),compile(s));if(good&&f.k==="f"){const cnt=t=>(norm(t).match(/\(/g)||[]).length;good=cnt(s)>=Math.max(1,cnt(f.a)-(/^-?\(/.test(norm(f.a))?0:0))}}}catch(_){good=false}
     i.classList.add(good?"ok":"no");if(!good)all=false});
    if(!any){fb.replaceChildren(el("span",{class:"mut"},"اكتبي إجابتك أولًا."));return}
    mark(all?1:0);fb.replaceChildren(el("span",{class:all?"fb ok":"fb no"},all?"✔ أحسنتِ! كل الإجابات صحيحة":"✘ المربّع الأحمر يحتاج مراجعة"+(rows.some(r=>r[0].k==="f")?" (اكتبي التحليل في صورة حاصل ضرب عوامل)":"")))}}
  else if(it.t==="set"){const i=inp("-2 , 3/4");const none=el("button",{class:"btn sm alt",onclick:()=>{i.value="لا يوجد حل";check()}},"∅ لا يوجد حل");
   c.append(el("div",{class:"kfs"},el("label",{class:"kf"},el("span",{class:"kl"},"مجموعة الحل (افصلي بين الحلول بفاصلة):"),i),none));
   check=()=>{i.classList.remove("ok","no");const s=i.value.trim();if(!s){fb.replaceChildren(el("span",{class:"mut"},"اكتبي الحلول أولًا."));return}
    let good=false;try{if(/لا|∅/.test(s)||s==="{}")good=it.a.length===0;else{const v=norm(s).replace(/[{}]/g,"").split(/[,;،]|و/).filter(Boolean).map(val).sort((a,b)=>a-b);const w=it.a.map(val).sort((a,b)=>a-b);
      const u=v.filter((q,k)=>k===0||!close(q,v[k-1]));good=u.length===w.length&&u.every((q,k)=>close(q,w[k]))}}catch(_){good=false}
    i.classList.add(good?"ok":"no");mark(good?1:0);fb.replaceChildren(el("span",{class:good?"fb ok":"fb no"},good?"✔ أحسنتِ! مجموعة الحل صحيحة":"✘ مجموعة الحل غير صحيحة، راجعي الحلول (وتذكّري إمكانية عدم وجود حل)"))}}
  else if(it.t==="self"){c.append(el("p",{class:"mut"},"حلّي في دفترك، ثم اعرضي الحل وقيّمي إجابتك:"));
   const y=el("button",{class:"btn sm",hidden:true,onclick:()=>{mark(1);fb.replaceChildren(el("span",{class:"fb ok"},"✔ رائع!"))}},"✔ حلّي صحيح"),n=el("button",{class:"btn sm alt",hidden:true,onclick:()=>{mark(0);fb.replaceChildren(el("span",{class:"fb no"},"راجعي الحل وأعيدي المحاولة لاحقًا"))}},"✘ أحتاج مراجعة");
   c.append(el("div",{class:"row"},el("button",{class:"btn sm gold",onclick:()=>{showSol();y.hidden=false;n.hidden=false}},"👁 اعرضي الحل"),y,n))}
  if(inputs.length){c.append(el("div",{class:"keys"},...KEYS.map(k=>el("button",{type:"button",class:"key",onmousedown:e=>e.preventDefault(),onclick:()=>{const t=last&&c.contains(last)?last:inputs[0];const a=t.selectionStart??t.value.length,b=t.selectionEnd??a;t.value=t.value.slice(0,a)+k+t.value.slice(b);t.focus();t.setSelectionRange(a+k.length,a+k.length)}},k==="sqrt("?"√":k))))}
  if(it.t!=="self")c.append(el("div",{class:"row"},it.t!=="mcq"?el("button",{class:"btn sm",onclick:()=>check()},"تحقّقي ✓"):"",el("button",{class:"btn sm alt",onclick:()=>sol.hidden?showSol():sol.hidden=true},"💡 الحل")));
  c.append(fb,sol);app.append(c)});
 if(!list.length)app.append(el("p",{class:"card"},"لا أسئلة في هذا القسم."));
 const i=groups.findIndex(g=>g[0]===gid);
 app.append(el("div",{class:"row between"},i>0?el("button",{class:"btn alt",onclick:()=>go("kb/"+groups[i-1][0])},"→ "+groups[i-1][1]):el("span"),i<groups.length-1?el("button",{class:"btn",onclick:()=>go("kb/"+groups[i+1][0])},groups[i+1][1]+" ←"):el("span")));
}
window.G11X=window.G11X||{};window.G11X.kb=kb;window.G11K={compile,same,val,svgPlot,svgLine};
})();
