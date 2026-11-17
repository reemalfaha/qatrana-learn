/* مصمّم الامتحانات — تصميم الامتحان حسب جدول المواصفات + تنزيل Word
   يعتمد على دوال الصفحة الرئيسة (h, CAT, loadCat, save, uid, nav, toast, groupsOf, TYPES, ORDER, LET, ORD, R, render) وقت الاستدعاء. */
"use strict";
const LV=["تذكّر","فهم","تطبيق","مهارات عليا"];
const LVC=["#2F6FB0","#1F7A4D","#C9822B","#7A1F2E"];
const KINDS={mcq:"اختيار من متعدد",tf:"صح / خطأ",fill:"إكمال الفراغ",short:"إجابة قصيرة / تعريفات",essay:"مسائل وأسئلة مقالية"};
const KORDER=["mcq","tf","fill","short","essay"];
const strip=s=>String(s||"").replace(/[\u064B-\u0652\u0640]/g,"");
const LVRX=[[3,/استنتج|حلل|قيم |قيمي|اقترح|صمم|أبدي رأي|ابدي رأي|رأيك|برر|توقع|ماذا يحدث لو|ما الذي يحدث لو|وازن|انقد|افترض|ابتكر|اربط بين|الأرجح|كيف يمكن|ما الاستنتاج|أي الاستنتاجات/],
  [2,/احسب|أوجد|أجد|جد |جدي|طبق|ارسم|مثل |مثلي|إذا كان|إذا كانت|إذا علمت|كم يساوي|ما مقدار|ناتج|حل المعادلة|حلي|حل |صنفي|صنف |عيني|استخرجي|أعربي|إعراب|حولي|اكتبي|يكتب|نوع ال|«|﴿|\$|\d+\s*(mL|cm|km|kg|g|N|m|s|°|%|J|W|V)\b|[A-Z][a-z]?[A-Z]/],
  [1,/فسر|علل|لماذا|قارن|وضح|الفرق بين|السبب|بسبب|يعزى|يعود|العبارة الصحيحة|الصحيحة|يدل|تدل|يستدل|ما أهمية|أهمية|وظيفة|تفسير|اشرح|يتأثر|يعتمد|لأن|يزداد|تزداد|يقل|تقل|تختلف|يختلف|الترتيب|فائدة|معنى|بمعنى|الغرض|الهدف|يعد |تعد |يمثل|تمثل|أفضل|الأنسب|نتيجة|يؤدي|تؤدي|يحدث|عند /]];
function lvOf(q,def){const s=strip(q);for(const [l,rx] of LVRX)if(rx.test(s))return l;return def==null?0:def}
const plain=s=>String(s||"").replace(/\$/g,"").trim();
/* تحويل سؤال اختيار من متعدد إلى صح/خطأ أو إكمال (للأسئلة التي ينتهي جذعها بنقطتين) */
function toTF(x,r){if(!/[:：]\s*$/.test(x.q)||x.o.some(o=>String(o).length>45)||/(ليس|عدا|غير صحيح|خطأ)/.test(strip(x.q)))return null;const right=r()<.5;const wrongs=x.o.filter((_,i)=>i!==x.a);const opt=right?x.o[x.a]:wrongs[Math.floor(r()*wrongs.length)];
  return{q:x.q.replace(/[:：]\s*$/,"")+" "+opt+".",a:right}}
function toFill(x){if(!/[:：]\s*$/.test(x.q)||String(x.o[x.a]).length>40||/(ليس|عدا|خطأ|أيّ|أي )/.test(strip(x.q)))return null;return{q:x.q.replace(/[:：]\s*$/,"")+" ________ .",a:x.o[x.a]}}

/* ---------- مخزون كل درس مصنّفًا (الدرس × المستوى × النوع) ---------- */
function poolOf(l){if(l._pool)return l._pool;const P=[];const L=l._l||{};const r=Math.random;
  const addM=(x,lv,src)=>{if(!x||!x.q||!x.o||x.o.length<2)return;P.push({k:"mcq",lv,q:x.q,o:x.o.slice(0,4),a:x.a,shuf:x.shuf,fig:x.fig||""});
    const t=toTF(x,r);if(t)P.push({k:"tf",lv,q:t.q,a:t.a});const f=toFill(x);if(f)P.push({k:"fill",lv,q:f.q,a:f.a})};
  if(l._kind==="sci"){(L.quiz||[]).forEach(x=>addM({q:x.q,o:x.o,a:x.a,shuf:1},lvOf(x.q)));
    (L.points||[]).filter(p=>p[0]&&p[1]).forEach(p=>P.push({k:"short",lv:0,q:"وضّحي المقصود بـ: "+p[0]+".",a:p[1]}));
    const fb=(window.FB&&FB._[L.id])||{};(fb.mcq||[]).forEach(z=>addM({q:z[0],o:[z[1],z[2],z[3],z[4]],a:0,shuf:1},lvOf(z[0])));
    (fb.sa||[]).forEach(z=>P.push({k:/فسر|علل|قارن|وضح|استنتج|اقترح|توقع/.test(strip(z[0]))?"essay":"short",lv:lvOf(z[0],1),q:z[0],a:z[1]}))}
  else if(l._kind==="ar"){(L.mcq||[]).forEach(x=>addM({q:x.q,o:x.o,a:x.a,shuf:1},lvOf(x.q)));(L.defs||[]).forEach(x=>P.push({k:"short",lv:0,q:x.q,a:x.a}));(L.probs||[]).forEach(x=>P.push({k:"essay",lv:lvOf(x.q,1),q:x.q,a:x.a}))}
  else if(l._kind==="math"){((L.recall&&L.recall.qs)||[]).forEach(x=>addM({q:x.q,o:x.o,a:x.a},0));((L.sum&&L.sum.rules)||[]).filter(z=>z[0]&&z[1]).forEach(z=>P.push({k:"short",lv:1,q:"اشرحي باختصار: "+z[0]+".",a:z[1]}));
    if(L.ex&&L.ex.q)P.push({k:"essay",lv:2,q:L.ex.q,a:(L.ex.steps||[]).join("\n")});
    l._gens={};(L.gens||[]).forEach(g=>{const lv=Math.min(3,Math.max(1,+g.lv||2));(l._gens[lv]=l._gens[lv]||[]).push(g)})}
  return l._pool=P}
function genMath(l,lv,k){const gs=(l._gens||{})[lv]||[];if(!gs.length)return null;for(let i=0;i<20;i++){try{const g=gs[Math.floor(Math.random()*gs.length)];const x=g.f();if(!x)continue;
    let fig="";if(typeof x.fig==="function"){const e=x.fig();fig=e&&e.outerHTML||""}else if(x.fig&&x.fig.outerHTML)fig=x.fig.outerHTML;
    if(k==="mcq"){if(!x.o||x.o.length<2)continue;return{k,lv,q:x.q,o:x.o.slice(0,4),a:x.a,shuf:1,fig}}
    if(k==="essay")return{k,lv,q:x.q,a:(x.steps||[]).join("\n"),fig};
    if((k==="tf"||k==="fill")&&x.o){const z=k==="tf"?toTF(x,Math.random):toFill(x);if(z)return{k,lv,q:z.q,a:z.a,fig}}}catch(e){}}return null}
const avail=(l,lv,ks)=>{const P=poolOf(l);let n=P.filter(x=>x.lv===lv&&ks.includes(x.k)&&(!SP.fig||x.fig)).length;if(l._kind==="math"&&(l._gens||{})[lv]&&ks.some(k=>k!=="short"))return Infinity;return n};
/* ---------- حالة التصميم ---------- */
const SP={grade:"العاشر",key:null,sel:new Set(),w:{},basis:"pages",pct:[30,40,20,10],cnt:{mcq:20,tf:0,fill:0,short:2,essay:2},mk:{mcq:1,tf:1,fill:1,short:2,essay:4},M:null,fig:false};
function pagesOf(l){return l._pages||1}
/* توزيع بأكبر باقٍ */
function LR(N,ws){const W=ws.reduce((a,b)=>a+b,0)||1;const raw=ws.map(w=>N*w/W);const f=raw.map(Math.floor);let d=N-f.reduce((a,b)=>a+b,0);raw.map((v,i)=>[v-f[i],i]).sort((a,b)=>b[0]-a[0]).forEach(([,i])=>{if(d>0){f[i]++;d--}});return f}
function specMatrix(N,ws,pct){const R_=LR(N,ws),C=LR(N,pct);const W=ws.reduce((a,b)=>a+b,0)||1,P=pct.reduce((a,b)=>a+b,0)||1;
  const M=ws.map((w,i)=>pct.map((p,j)=>Math.floor(N*(w/W)*(p/P))));const rs=i=>M[i].reduce((a,b)=>a+b,0),cs=j=>M.reduce((a,r)=>a+r[j],0);
  for(let g=0;g<N*4;g++){let best=null,bv=-1;for(let i=0;i<ws.length;i++)for(let j=0;j<4;j++){if(rs(i)>=R_[i]||cs(j)>=C[j])continue;const fr=N*(ws[i]/W)*(pct[j]/P)-M[i][j];if(fr>bv){bv=fr;best=[i,j]}}if(!best)break;M[best[0]][best[1]]++}
  let left=N-M.flat().reduce((a,b)=>a+b,0);for(let i=0;left>0&&i<ws.length;i++)while(rs(i)<R_[i]&&left>0){let j=C.findIndex((c,j)=>cs(j)<c);if(j<0)j=1;M[i][j]++;left--}
  return M}
/* ---------- الواجهة ---------- */
function vSpec(ex){
  const box=h("div",{class:"stack"});
  box.append(h("div",{class:"card"},h("h2",{style:"margin:0 0 4px"},"📊 تصميم الامتحان حسب جدول المواصفات"),h("p",{class:"muted",style:"margin:0"},"حدّدي الدروس ووزن كل درس ونسب مستويات بلوم وطبيعة الأسئلة، فتحسب المنصة جدول المواصفات وتختار الأسئلة من بنوك المنصة وفقه. كل ضغطة على «اختيار الأسئلة» تعطي نموذجًا جديدًا بالتوزيع نفسه.")));
  const body=h("div",{class:"stack"},h("div",{class:"card muted"},"⏳ جارٍ تحميل بنوك الأسئلة…"));box.append(body);
  loadCat().then(()=>{
    function paint(){body.replaceChildren();
      const gr=["الثامن","التاسع","العاشر"].filter(g=>CAT[g]);if(!CAT[SP.grade])SP.grade=gr[0];const keys=Object.keys(CAT[SP.grade]);if(!SP.key||!keys.includes(SP.key)){SP.key=keys[0];SP.sel=new Set();SP.M=null}
      /* 1) المبحث والدروس */
      const c1=h("div",{class:"card stack"},h("h3",{style:"margin:0"},"١) المبحث والدروس ووزن كل درس"));
      c1.append(h("div",{class:"row"},h("label",{class:"f"},"الصف",h("select",{class:"in",onchange:e=>{SP.grade=e.target.value;SP.key=null;paint()}},gr.map(g=>h("option",{value:g,selected:g===SP.grade},"الصف "+g)))),
        h("label",{class:"f"},"المبحث",h("select",{class:"in",onchange:e=>{SP.key=e.target.value;SP.sel=new Set();SP.M=null;paint()}},keys.map(k=>h("option",{value:k,selected:k===SP.key},CAT[SP.grade][k].name)))),
        h("label",{class:"f"},"الوزن يُحسب بـ",h("select",{class:"in",onchange:e=>{SP.basis=e.target.value;SP.M=null;paint()}},h("option",{value:"pages",selected:SP.basis==="pages"},"عدد الصفحات"),h("option",{value:"periods",selected:SP.basis==="periods"},"عدد الحصص")))));
      lessonsOf(SP.grade,SP.key).forEach(({u,ls})=>{const allOn=ls.every(l=>SP.sel.has(l.id));
        const card=h("div",{class:"card",style:"padding:10px"},h("label",{class:"so",style:"background:var(--soft)"},h("input",{type:"checkbox",checked:allOn,onchange:e=>{ls.forEach(l=>e.target.checked?SP.sel.add(l.id):SP.sel.delete(l.id));SP.M=null;paint()}}),h("b",{},(u.n?(/^\d+$/.test(String(u.n))?"الوحدة "+u.n+": ":u.n+": "):"")+u.title)));
        ls.forEach(l=>{const k=SP.basis+":"+l.id;if(SP.w[k]==null)SP.w[k]=SP.basis==="pages"?pagesOf(l):(l._periods||Math.max(1,Math.round(pagesOf(l)/3)));
          card.append(h("div",{class:"so",style:"cursor:default"},h("input",{type:"checkbox",checked:SP.sel.has(l.id),onchange:e=>{e.target.checked?SP.sel.add(l.id):SP.sel.delete(l.id);SP.M=null;paint()}}),h("span",{style:"flex:1;min-width:0"},l.title),
            SP.sel.has(l.id)?h("label",{class:"small",style:"display:flex;align-items:center;gap:4px"},SP.basis==="pages"?"صفحات":"حصص",h("input",{class:"in",type:"number",min:0,step:1,value:SP.w[k],style:"width:70px;min-height:36px",oninput:e=>{SP.w[k]=+e.target.value||0;SP.M=null}})):null))});
        c1.append(card)});
      c1.append(h("p",{class:"muted small",style:"margin:0"},SP.basis==="pages"?"عدد الصفحات معبّأ من صفحات الكتاب في المنصة (عدّليه إن لزم).":"أرقام الحصص تقديرية؛ عدّليها حسب خطتك."));
      body.append(c1);
      /* 2) طبيعة الأسئلة */
      const c2=h("div",{class:"card stack"},h("h3",{style:"margin:0"},"٢) طبيعة الأسئلة وعددها وعلاماتها"));
      const tot=h("div",{class:"sum"});const updT=()=>{const N=KORDER.reduce((s,k)=>s+(SP.cnt[k]||0),0),Mk=KORDER.reduce((s,k)=>s+(SP.cnt[k]||0)*(SP.mk[k]||0),0);tot.replaceChildren(h("span",{},"عدد الأسئلة: ",h("b",{},N)),h("span",{},"مجموع العلامات: ",h("b",{},Mk)))};
      KORDER.forEach(k=>c2.append(h("div",{class:"row",style:"align-items:end"},h("div",{class:"f",style:"flex:2;font-weight:700;align-self:center"},KINDS[k]),
        h("label",{class:"f"},"العدد",h("input",{class:"in",type:"number",min:0,max:80,value:SP.cnt[k],oninput:e=>{SP.cnt[k]=+e.target.value||0;SP.M=null;updT()}})),
        h("label",{class:"f"},"علامة السؤال",h("input",{class:"in",type:"number",min:0,step:.5,value:SP.mk[k],oninput:e=>{SP.mk[k]=+e.target.value||0;updT()}})))));
      c2.append(tot,h("label",{class:"so"},h("input",{type:"checkbox",checked:SP.fig,onchange:e=>{SP.fig=e.target.checked;paint()}}),"تفضيل الأسئلة التي فيها رسومات وأشكال (إن توفّرت)"),
        h("p",{class:"muted small",style:"margin:0"},"أسئلة «صح / خطأ» و«إكمال الفراغ» تُشتقّ آليًّا من أسئلة الاختيار من متعدد المناسبة. المسائل في الرياضيات متجدّدة لا تنفد."));updT();body.append(c2);
      /* 3) نسب بلوم */
      const c3=h("div",{class:"card stack"},h("h3",{style:"margin:0"},"٣) نسب مستويات الأهداف (بلوم)"));const ps=h("div",{class:"sum"});const updP=()=>{const s=SP.pct.reduce((a,b)=>a+b,0);ps.replaceChildren(h("span",{},"المجموع: ",h("b",{style:s===100?"":"color:#B3261E"},s+"%")),s===100?"":h("span",{style:"color:#B3261E"},"يجب أن يكون المجموع 100%"))};
      c3.append(h("div",{class:"row"},LV.map((n,j)=>h("label",{class:"f"},n+" %",h("input",{class:"in",type:"number",min:0,max:100,value:SP.pct[j],oninput:e=>{SP.pct[j]=+e.target.value||0;SP.M=null;updP()}})))),ps,
        h("p",{class:"muted small",style:"margin:0"},"«مهارات عليا» تشمل التحليل والتركيب والتقويم. تصنيف الأسئلة إلى المستويات آليّ تقريبي يعتمد على صياغة السؤال؛ راجعيه في الجدول المطبوع."));updP();body.append(c3);
      /* 4) الجدول */
      const c4=h("div",{class:"card stack"},h("h3",{style:"margin:0"},"٤) جدول المواصفات"));body.append(c4);
      c4.append(h("button",{class:"btn",onclick:()=>{const ls=selLessons();if(!ls.length)return toast("اختاري درسًا واحدًا على الأقل");if(SP.pct.reduce((a,b)=>a+b,0)!==100)return toast("مجموع النسب يجب أن يكون 100%");const N=nQ();if(!N)return toast("حدّدي عدد الأسئلة");
        SP.M=specMatrix(N,ls.map(l=>SP.w[SP.basis+":"+l.id]||0),SP.pct);paint();setTimeout(()=>c4.scrollIntoView({behavior:"smooth"}),50)}},"🧮 احسبي جدول المواصفات"));
      if(SP.M){const ls=selLessons();if(SP.M.length!==ls.length)SP.M=null;else{c4.append(gridEl(ls));
        c4.append(h("button",{class:"btn gold",onclick:()=>{const r=pickBySpec(ex);if(!r)return;save();toast("تمّ اختيار "+ex.qs.length+" سؤالًا وفق الجدول"+(r.short?" (نقص "+r.short+")":""));nav("prev")}},"🎯 اختيار الأسئلة حسب الجدول"));
        if(ex.qs.length)c4.append(h("p",{class:"muted small",style:"margin:0"},"تنبيه: الاختيار يستبدل أسئلة الامتحان الحالي. لعمل نموذج آخر انسخي الامتحان من «امتحاناتي» ثم اختاري مرة ثانية."))}}
    }
    paint()}).catch(e=>{body.replaceChildren(h("div",{class:"card"},"تعذّر تحميل البنوك. تأكدي من الاتصال وأعيدي المحاولة."))});
  return box}
const nQ=()=>KORDER.reduce((s,k)=>s+(SP.cnt[k]||0),0);
function selLessons(){return lessonsOf(SP.grade,SP.key).flatMap(x=>x.ls).filter(l=>SP.sel.has(l.id))}
function gridEl(ls){const ks=KORDER.filter(k=>SP.cnt[k]>0);const ws=ls.map(l=>SP.w[SP.basis+":"+l.id]||0),W=ws.reduce((a,b)=>a+b,0)||1;
  const t=h("table",{class:"spt"});t.append(h("tr",{},h("th",{},"الدرس"),h("th",{},"الوزن"),LV.map((n,j)=>h("th",{style:"background:"+LVC[j]},n)),h("th",{},"المجموع")));
  const foot=()=>{};ls.forEach((l,i)=>{const tr=h("tr",{},h("td",{style:"text-align:right"},l.title),h("td",{},Math.round(100*ws[i]/W)+"%"));
    LV.forEach((_,j)=>{const av=avail(l,j,ks);const inp=h("input",{type:"number",min:0,value:SP.M[i][j],oninput:e=>{SP.M[i][j]=Math.max(0,+e.target.value||0);chk();sums()}});const note=h("div",{class:"av"});
      const chk=()=>{note.textContent=av===Infinity?"متجدّد":"متوفّر "+av;note.style.color=SP.M[i][j]>av?"#B3261E":"";inp.style.borderColor=SP.M[i][j]>av?"#B3261E":""};chk();tr.append(h("td",{},inp,note))});
    tr.append(h("td",{class:"rs"}));t.append(tr)});
  const ft=h("tr",{class:"ft"},h("td",{},"المجموع"),h("td",{},"100%"),LV.map(()=>h("td",{})),h("td",{}));t.append(ft);
  function sums(){t.querySelectorAll(".rs").forEach((c,i)=>c.textContent=SP.M[i].reduce((a,b)=>a+b,0));const N=SP.M.flat().reduce((a,b)=>a+b,0);
    [...ft.children].slice(2,6).forEach((c,j)=>{const s=SP.M.reduce((a,r)=>a+r[j],0);c.textContent=s+" ("+(N?Math.round(100*s/N):0)+"%)"});ft.lastChild.textContent=N;ft.lastChild.style.color=N!==nQ()?"#B3261E":""}
  setTimeout(sums);const w=h("div",{style:"overflow-x:auto"},t);
  return h("div",{class:"stack"},w,h("p",{class:"muted small",style:"margin:0"},"عدّلي أي خانة بيدك. الرقم الأحمر يعني أن الأسئلة المتوفّرة في هذا المستوى أقلّ من المطلوب، فتُكمَل من مستوى قريب في الدرس نفسه."))}
/* اختيار الأسئلة */
function pickBySpec(ex){const ls=selLessons();const M=SP.M;const ks=KORDER.filter(k=>SP.cnt[k]>0);if(!ks.length){toast("حدّدي نوع أسئلة واحدًا على الأقل");return null}
  const quota={};ks.forEach(k=>quota[k]=SP.cnt[k]);const used=new Set();const out=[];let short=0;const r=Math.random;
  const take=(l,lv)=>{const P=shuffle(poolOf(l).filter(x=>x.lv===lv&&!used.has(x.q+x.k)&&quota[x.k]>0),r);if(SP.fig)P.sort((a,b)=>(b.fig?1:0)-(a.fig?1:0));
    const order=ks.filter(k=>quota[k]>0).sort((a,b)=>quota[b]/SP.cnt[b]-quota[a]/SP.cnt[a]);
    for(const k of order){const x=P.find(z=>z.k===k);if(x)return x;if(l._kind==="math"){const g=genMath(l,lv,k);if(g&&!used.has(g.q+g.k))return g}}return null};
  const cells=[];ls.forEach((l,i)=>LV.forEach((_,j)=>{for(let c=0;c<M[i][j];c++)cells.push([l,j])}));
  shuffle(cells,r).forEach(([l,j])=>{let x=take(l,j);if(!x)for(const d of [1,-1,2,-2,3,-3]){const jj=j+d;if(jj<0||jj>3)continue;x=take(l,jj);if(x)break}
    if(!x){short++;return}used.add(x.q+x.k);quota[x.k]--;out.push({x,l})});
  ex.qs=out.map(({x,l})=>{let o=x.o?x.o.slice(0,4):[],a=x.a;if(x.k==="mcq"&&x.shuf){const idx=shuffle(o.map((_,i)=>i),r);o=idx.map(i=>o[i]);a=idx.indexOf(a)}
    return{id:uid(),t:x.k,q:x.q,opts:x.k==="mcq"?o:[],a:x.k==="fill"?String(a):a,m:SP.mk[x.k],lines:x.k==="essay"?5:3,fig:x.fig||"",lv:x.lv,ls:l.title,lsid:l.id}});
  ex.spec={basis:SP.basis,rows:ls.map(l=>({id:l.id,title:l.title,w:SP.w[SP.basis+":"+l.id]||0})),pct:SP.pct.slice()};
  const m=ex.meta;m.subject=CAT[SP.grade][SP.key].name;m.grade="الصف "+SP.grade;if(!m.title||m.title==="اختبار قصير")m.title="امتحان "+m.subject;
  return{short}}
/* ---------- جدول المواصفات للطباعة (من أسئلة الامتحان الفعلية) ---------- */
function specData(ex,ver){const gs=groupsOf(ex,ver||"A");const num={};let n=0;gs.forEach(g=>g.qs.forEach(q=>{num[q.id]=++n}));
  const rows=[];const idx={};(ex.spec&&ex.spec.rows||[]).forEach(r=>{idx[r.id]=rows.length;rows.push({title:r.title,w:r.w,c:[[],[],[],[]],m:0})});
  ex.qs.filter(q=>q.q.trim()).forEach(q=>{const lv=q.lv!=null?q.lv:lvOf(q.q,q.t==="essay"?1:0);let k=q.lsid&&idx[q.lsid]!=null?idx[q.lsid]:null;
    if(k==null){const key="_"+(q.ls||"أسئلة مضافة");if(idx[key]==null){idx[key]=rows.length;rows.push({title:q.ls||"أسئلة مضافة من المعلمة",w:0,c:[[],[],[],[]],m:0})}k=idx[key]}
    rows[k].c[lv].push(num[q.id]);rows[k].m+=+q.m||0});
  rows.forEach(r=>r.c.forEach(a=>a.sort((x,y)=>x-y)));const used=rows.filter(r=>r.c.some(a=>a.length)||r.w);const W=used.reduce((s,r)=>s+r.w,0);const N=n;const Mk=used.reduce((s,r)=>s+r.m,0);
  return{rows:used,W,N,Mk,basis:(ex.spec&&ex.spec.basis)||"pages"}}
function specPaper(ex,ver){const D=specData(ex,ver),m=ex.meta;const P=h("div",{class:"paper land"});
  P.append(h("div",{class:"ph"},h("div",{},"المملكة الأردنية الهاشمية",h("br"),"وزارة التربية والتعليم",h("br"),m.school),h("div",{class:"c"},h("b",{},"جدول المواصفات"),m.title||""),h("div",{class:"l"},"المبحث: "+(m.subject||"…"),h("br"),"الصف: "+(m.grade||"…"),h("br"),"عدد الأسئلة: "+D.N+" · العلامة: "+D.Mk)));
  const t=h("table",{class:"spp"});t.append(h("tr",{},h("th",{rowspan:2},"الدرس"),h("th",{rowspan:2},D.basis==="pages"?"عدد الصفحات":"عدد الحصص"),h("th",{rowspan:2},"الوزن النسبي"),LV.map(n=>h("th",{colspan:2},n)),h("th",{rowspan:2},"مجموع الأسئلة"),h("th",{rowspan:2},"العلامات")),
    h("tr",{},LV.map(()=>[h("th",{},"العدد"),h("th",{},"أرقام الأسئلة")])));
  D.rows.forEach(r=>t.append(h("tr",{},h("td",{class:"tl"},r.title),h("td",{},r.w||"—"),h("td",{},D.W?Math.round(100*r.w/D.W)+"%":"—"),r.c.map(a=>[h("td",{},a.length),h("td",{class:"qn"},a.join("، ")||"—")]),h("td",{},r.c.reduce((s,a)=>s+a.length,0)),h("td",{},r.m))));
  const cs=j=>D.rows.reduce((s,r)=>s+r.c[j].length,0);
  t.append(h("tr",{class:"ft"},h("td",{},"المجموع"),h("td",{},D.W||"—"),h("td",{},"100%"),LV.map((_,j)=>[h("td",{},cs(j)),h("td",{},"")]),h("td",{},D.N),h("td",{},D.Mk)));
  t.append(h("tr",{class:"ft"},h("td",{colspan:3},"النسبة المئوية"),LV.map((_,j)=>h("td",{colspan:2},(D.N?Math.round(100*cs(j)/D.N):0)+"%")),h("td",{},"100%"),h("td",{},"")));
  P.append(h("div",{style:"overflow-x:auto"},t));
  P.append(h("div",{class:"sig"},["المعلمة","منسّقة المبحث","المشرف التربوي","مديرة المدرسة"].map(s=>h("div",{},s+": "+(s==="المعلمة"&&m.teacher?m.teacher:""),h("br"),"التوقيع: ………………"))));
  P.append(h("div",{class:"pf"},h("span",{},"«مهارات عليا» تشمل التحليل والتركيب والتقويم"),h("span",{},"تصميمُ المنصّة وتنفيذُها: نوال بني عطية")));
  return P}

/* ---------- تنزيل Word ---------- */
let DX=null;function loadDocx(){return DX?Promise.resolve(DX):loadScript("lib/docx.umd.js").then(()=>DX=window.docx)}
const FONT="Sakkal Majalla",WINE="7A1F2E",GOLD="B8902A";
function runsOf(str,o){const D=DX;o=o||{};const out=[];const base={font:FONT,size:o.size||28,bold:o.bold,color:o.color};
  const s=String(str==null?"":str);if(!s.includes("$")){s.split("\n").forEach((ln,i)=>{if(i)out.push(new D.TextRun({...base,break:1,text:""}));out.push(new D.TextRun({...base,text:ln,rightToLeft:true}))});return out}
  const el=document.createElement("span");el.innerHTML=s.split("\n").map(l=>window.ML&&ML.T?ML.T(l):l).join("<br>");
  const walk=(n,st)=>{if(n.nodeType===3){if(n.nodeValue)out.push(new D.TextRun({...base,text:n.nodeValue,rightToLeft:!st.ltr,italics:st.i,superScript:st.sup,subScript:st.sub}));return}
    if(n.nodeType!==1)return;const tg=n.tagName,c=n.className||"";if(tg==="BR"){out.push(new D.TextRun({...base,break:1,text:""}));return}
    const ns={...st};if(c.includes("m")&&tg==="BDI"&&!st.ltr){ns.ltr=true;out.push(new D.TextRun({...base,text:"\u2066"}));[...n.childNodes].forEach(ch=>walk(ch,ns));out.push(new D.TextRun({...base,text:"\u2069"}));return}if(tg==="I")ns.i=true;if(tg==="SUP")ns.sup=true;if(tg==="SUB")ns.sub=true;
    if(c.split(" ").includes("fr")){const [a,b]=n.children;const wrap=x=>x&&x.textContent.length>1;out.push(new D.TextRun({...base,text:wrap(a)?"(":"",rightToLeft:false}));walk(a,ns);out.push(new D.TextRun({...base,text:(wrap(a)?")":"")+"/"+(wrap(b)?"(":""),rightToLeft:false}));walk(b,ns);if(wrap(b))out.push(new D.TextRun({...base,text:")",rightToLeft:false}));return}
    if(c.split(" ").includes("sq")){[...n.childNodes].forEach(ch=>{if(ch.nodeType===3)out.push(new D.TextRun({...base,text:"√(",rightToLeft:false}));else walk(ch,ns)});out.push(new D.TextRun({...base,text:")",rightToLeft:false}));return}
    [...n.childNodes].forEach(ch=>walk(ch,ns))};walk(el,{});return out}
const P_=(children,o)=>new DX.Paragraph({bidirectional:true,alignment:o&&o.center?DX.AlignmentType.CENTER:undefined,spacing:{after:o&&o.after!=null?o.after:60},children,keepNext:o&&o.keepNext,shading:o&&o.fill?{type:DX.ShadingType.CLEAR,fill:o.fill,color:"auto"}:undefined,border:o&&o.border});
function svgPng(svg){return new Promise(res=>{try{const d=new DOMParser().parseFromString(svg,"image/svg+xml").documentElement;if(!d.getAttribute("xmlns"))d.setAttribute("xmlns","http://www.w3.org/2000/svg");
  let vb=(d.getAttribute("viewBox")||"").split(/[ ,]+/).map(Number);let w=+d.getAttribute("width")||vb[2]||300,hh=+d.getAttribute("height")||vb[3]||200;const sc=900/w;d.setAttribute("width",w*sc);d.setAttribute("height",hh*sc);
  const img=new Image();img.onload=()=>{const c=document.createElement("canvas");c.width=w*sc;c.height=hh*sc;const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(img,0,0,c.width,c.height);
    c.toBlob(b=>b.arrayBuffer().then(a=>res({data:new Uint8Array(a),w:Math.min(230,w*1.1),h:Math.min(230,w*1.1)*hh/w})),"image/png")};img.onerror=()=>res(null);
  img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(d))}catch(e){res(null)}})}
const noB={top:{style:"none",size:0,color:"FFFFFF"},bottom:{style:"none",size:0,color:"FFFFFF"},left:{style:"none",size:0,color:"FFFFFF"},right:{style:"none",size:0,color:"FFFFFF"}};
function cell(children,o){o=o||{};return new DX.TableCell({children:Array.isArray(children)?children:[children],width:o.w?{size:o.w,type:DX.WidthType.DXA}:undefined,columnSpan:o.cs,rowSpan:o.rs,shading:o.fill?{type:DX.ShadingType.CLEAR,fill:o.fill,color:"auto"}:undefined,borders:o.nob?noB:undefined,verticalAlign:DX.VerticalAlign.CENTER,margins:{top:40,bottom:40,left:80,right:80}})}
function headTable(ex,title,sub,wTot){const m=ex.meta,w3=Math.floor(wTot/3);const p=(t,o)=>P_(runsOf(t,{size:22,...o}),{after:0,...o});
  return new DX.Table({visuallyRightToLeft:true,width:{size:wTot,type:DX.WidthType.DXA},columnWidths:[w3,w3,w3],rows:[new DX.TableRow({children:[
    cell([p("المملكة الأردنية الهاشمية"),p("وزارة التربية والتعليم"),p(m.school||"")],{w:w3,nob:1}),
    cell([P_(runsOf(title,{size:32,bold:1,color:WINE}),{center:1,after:0}),...(sub?[P_(runsOf(sub,{size:22}),{center:1,after:0})]:[])],{w:w3,nob:1}),
    cell([p("المبحث: "+(m.subject||"…")),p("الصف: "+(m.grade||"…")),p([m.term,m.date].filter(Boolean).join(" · "))],{w:w3,nob:1})]})]})}
const rule=()=>P_([],{after:80,border:{bottom:{style:DX.BorderStyle.DOUBLE,size:6,color:WINE,space:1}}});
async function examChildren(ex,ver,key){const m=ex.meta,gs=groupsOf(ex,ver);const total=gs.reduce((s,g)=>s+g.qs.reduce((x,q)=>x+(+q.m||0),0),0);let n=0;const W=10200;const ch=[];
  ch.push(headTable(ex,m.title||"اختبار",(key?"الإجابة النموذجية":"")+(ver==="B"?(key?" · ":"")+"النموذج (ب)":""),W),rule());
  if(!key)ch.push(P_(runsOf("اسم الطالبة: ………………………………    الشعبة: ………    "+(m.time?"الزمن: "+m.time+"    ":"")+"العلامة: ……… / "+total,{size:24,bold:1})));else ch.push(P_(runsOf("العلامة الكلية: "+total,{size:24,bold:1})));
  if(m.instr&&!key)ch.push(P_(runsOf(m.instr,{size:22}),{fill:"FBF4DE"}));
  for(let gi=0;gi<gs.length;gi++){const g=gs[gi],T=TYPES[g.t],sub=g.qs.reduce((x,q)=>x+(+q.m||0),0);
    ch.push(P_(runsOf("السؤال "+ORD[gi]+": "+T.inst+"   ("+sub+" علامة)",{size:28,bold:1,color:WINE}),{fill:"F3E6E8",keepNext:1,after:80}));
    for(const q of g.qs){n++;const qt=g.t==="fill"?String(q.q).replace(/_{2,}|\.{4,}|…+/g,"________"):q.q;
      ch.push(P_([new DX.TextRun({font:FONT,size:28,bold:1,text:(g.t==="tf"?"(   ) ":"")+n+") ",rightToLeft:true}),...runsOf(qt),new DX.TextRun({font:FONT,size:22,color:"555555",text:"   ["+q.m+"]",rightToLeft:true})],{keepNext:g.t==="mcq"||!!q.fig}));
      if(q.fig){const im=await svgPng(q.fig);if(im)ch.push(P_([new DX.ImageRun({data:im.data,transformation:{width:Math.round(im.w),height:Math.round(im.h)}})],{center:1}))}
      if(g.t==="mcq"){const os=q.opts.map((o,i)=>({o,i})).filter(x=>String(x.o).trim());const one=os.some(x=>plain(x.o).length>28);const opt=(x,k)=>P_([...runsOf(LET[k]+") "),...runsOf(x.o,key&&x.i===q.a?{bold:1,color:WINE}:{}),...(key&&x.i===q.a?[new DX.TextRun({font:FONT,size:28,text:" ✓",color:WINE,bold:1})]:[])],{after:0});
        if(one)os.forEach((x,k)=>ch.push(opt(x,k)));else{const rows=[];for(let k=0;k<os.length;k+=2)rows.push(new DX.TableRow({children:[cell(opt(os[k],k),{w:4900,nob:1}),cell(os[k+1]?opt(os[k+1],k+1):P_([]),{w:4900,nob:1})]}));ch.push(new DX.Table({visuallyRightToLeft:true,width:{size:9800,type:DX.WidthType.DXA},columnWidths:[4900,4900],rows}))}}
      else if(key){const ans=g.t==="tf"?(q.a?"✓ صح":"✗ خطأ"):String(q.a||"—").split(g.t==="fill"?"|":"\u0000")[0];ch.push(P_(runsOf("الإجابة: "+ans,{color:WINE,bold:g.t!=="essay"&&g.t!=="short"}),{fill:"FBF4DE"}))}
      else if(g.t==="short"||g.t==="essay")for(let i=0;i<(q.lines||3);i++)ch.push(P_(runsOf("……………………………………………………………………………………………………………",{color:"999999"}),{after:0}))}}
  ch.push(P_(runsOf("انتهت الأسئلة، مع أطيب التمنيات بالتوفيق",{bold:1,color:WINE}),{center:1}));
  ch.push(P_(runsOf((m.teacher?"معلمة المبحث: "+m.teacher+"      ":"")+"تصميمُ المنصّة وتنفيذُها: نوال بني عطية",{size:20,color:"555555"}),{center:1}));
  return ch}
function specChildren(ex,ver){const D=specData(ex,ver),m=ex.meta;const W=14800;const ch=[headTable(ex,"جدول المواصفات",m.title||"",W),rule()];
  const th=(t,o)=>cell(P_(runsOf(t,{size:20,bold:1,color:"FFFFFF"}),{center:1,after:0}),{fill:WINE,...o});const td=(t,o)=>cell(P_(runsOf(String(t),{size:20,...(o&&o.b?{bold:1}:{})}),{center:1,after:0}),o);
  const cw=[2400,900,900,...[0,1,2,3].flatMap(()=>[650,1650]),1000,1000];
  const rows=[new DX.TableRow({tableHeader:true,children:[th("الدرس",{rs:2}),th(D.basis==="pages"?"الصفحات":"الحصص",{rs:2}),th("الوزن النسبي",{rs:2}),...LV.map(n=>th(n,{cs:2})),th("مجموع الأسئلة",{rs:2}),th("العلامات",{rs:2})]}),
    new DX.TableRow({tableHeader:true,children:LV.flatMap(()=>[th("العدد"),th("أرقام الأسئلة")])})];
  D.rows.forEach(r=>rows.push(new DX.TableRow({children:[cell(P_(runsOf(r.title,{size:20}),{after:0})),td(r.w||"—"),td(D.W?Math.round(100*r.w/D.W)+"%":"—"),...r.c.flatMap(a=>[td(a.length),td(a.join("، ")||"—")]),td(r.c.reduce((s,a)=>s+a.length,0)),td(r.m)]})));
  const cs=j=>D.rows.reduce((s,r)=>s+r.c[j].length,0);
  rows.push(new DX.TableRow({children:[td("المجموع",{fill:"FBF4DE",b:1}),td(D.W||"—",{fill:"FBF4DE"}),td("100%",{fill:"FBF4DE"}),...LV.flatMap((_,j)=>[td(cs(j),{fill:"FBF4DE",b:1}),td(D.N?Math.round(100*cs(j)/D.N)+"%":"0%",{fill:"FBF4DE"})]),td(D.N,{fill:"FBF4DE",b:1}),td(D.Mk,{fill:"FBF4DE",b:1})]}));
  ch.push(new DX.Table({visuallyRightToLeft:true,width:{size:W,type:DX.WidthType.DXA},columnWidths:cw,rows}));
  ch.push(P_([],{after:200}));
  const sw=Math.floor(W/4);ch.push(new DX.Table({visuallyRightToLeft:true,width:{size:W,type:DX.WidthType.DXA},columnWidths:[sw,sw,sw,sw],rows:[new DX.TableRow({children:["المعلمة","منسّقة المبحث","المشرف التربوي","مديرة المدرسة"].map(s=>cell([P_(runsOf(s+": "+(s==="المعلمة"&&m.teacher?m.teacher:""),{size:22,bold:1}),{center:1,after:0}),P_(runsOf("التوقيع: ……………",{size:22}),{center:1,after:0})],{w:sw,nob:1}))})]}));
  ch.push(P_(runsOf("«مهارات عليا» تشمل التحليل والتركيب والتقويم · تصميمُ المنصّة وتنفيذُها: نوال بني عطية",{size:18,color:"555555"}),{center:1}));return ch}
async function wordDownload(ex,ver,what){toast("⏳ جارٍ تجهيز ملف الوورد…");try{await loadDocx();const D=DX;const mg={top:700,bottom:700,left:800,right:800};
  const portrait=ch=>({properties:{page:{size:{width:11906,height:16838},margin:mg}},children:ch});
  const land=ch=>({properties:{page:{size:{width:11906,height:16838,orientation:D.PageOrientation.LANDSCAPE},margin:mg}},children:ch});
  const secs=what==="spec"?[land(specChildren(ex,ver))]:what==="key"?[portrait(await examChildren(ex,ver,true)),land(specChildren(ex,ver))]:[portrait(await examChildren(ex,ver,false))];
  const doc=new D.Document({styles:{default:{document:{run:{font:FONT,size:28,rightToLeft:true}}}},sections:secs});const blob=await D.Packer.toBlob(doc);
  const nm=(ex.meta.title||"امتحان").replace(/[\\/:*?"<>|]/g,"")+(what==="key"?" - الإجابة النموذجية":what==="spec"?" - جدول المواصفات":"")+(ver==="B"?" (ب)":"")+".docx";
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=nm;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000);toast("✓ نُزّل الملف")}catch(e){console.error(e);toast("تعذّر تجهيز ملف الوورد")}}
