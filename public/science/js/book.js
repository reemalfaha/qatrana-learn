/* الكتاب على السبّورة — صفحات كتب العلوم مقسّمة فقرات بينها فراغات للشرح، مع قلم وتظليل وكتابة،
   وروابط من كل تجربة إلى موقعها في المختبر التفاعلي. (مطوَّر عن منصّتي لغتي ورياضيّاتي) */
(function(){
const COLORS=[["#1f4fd1","أزرق"],["#c62828","أحمر"],["#1b7a3c","أخضر"],["#111111","أسود"],["#e67e00","برتقالي"]];
const GAPS=[[0,"بلا فراغات"],[110,"فراغ صغير"],[220,"فراغ متوسّط"],[360,"فراغ كبير"]];
const META={};
let K,B,page,tool="move",color=COLORS[0][0],size=4,gap,width,data,blocks,cv,ctx,lv,lx,pageEl,undo=[],redo=[],keyH,resizeH,SUB,KIND;const HIST={};
/* كتب كل مبحث: s = كتاب الطالب، a = كتاب الأنشطة؛ off = الفرق بين رقم صفحة الملف ورقم الصفحة المطبوع */
function booksOf(s){return s.books||[];}
function bookTitle(b){return (b.kind[0]==="a"?"كتاب الأنشطة والتجارب العملية":"كتاب الطالب")+(b.part?" · "+b.part:"");}
const pdfPage=(b,printed)=>printed+(b.off||0);
const firstNum=s=>{const m=String(s||"").match(/\d+/);return m?+m[0]:1;};
function expRef(x){const m=String(x.src||"").match(/كتاب\s*(الطالب|الأنشطة)\D*?(\d+)/);if(!m)return null;return {kind:m[1]==="الأنشطة"?"a":"s",p:+m[2]};}
function findBook(s,kind,printed){return booksOf(s).find(b=>b.kind===kind&&(!b.from||printed>=b.from)&&(!b.to||printed<=b.to))||booksOf(s).find(b=>b.kind===kind);}
window.SCIBOOK={expLink(l,x){const s=subjOf(l),r=expRef(x);if(!r)return null;const b=findBook(s,r.kind,r.p);return b?"#/book/"+b.key+"/"+pdfPage(b,r.p):null;},
 lessonLink(l){const s=subjOf(l),b=findBook(s,"s",firstNum(l.pages));return b?"#/book/"+b.key+"/"+pdfPage(b,firstNum(l.pages)):null;}};
function allBooks(){const out=[];for(const g in SCI.data)for(const k of SUBJ_ORDER){const s=SCI.data[g][k];if(s)booksOf(s).forEach(b=>out.push([b,s]));}return out;}
async function meta(key){if(META[key])return META[key];const r=await fetch("book/"+key+"/s.json");META[key]=await r.json();return META[key];}

/* ---- قائمة الكتب ---- */
route(/^#\/books$/,V=>{V.append(crumbs(["الرئيسية","#/"],"الكتب"));
  V.append(el("div",{class:"hero"},el("div",{class:"orb"}),el("h1",{},"📚 الكتاب على السبّورة"),el("p",{},"صفحات الكتاب مقسّمة فقرات بينها فراغات للشرح وحلّ الأسئلة · قلم وتظليل وكتابة · وروابط التجارب إلى المختبر التفاعلي")));
  const gs=Object.keys(SCI.data);gs.forEach(g=>{const box=el("section",{class:"card",style:{marginTop:"14px"}},el("h3",{style:{marginBottom:"10px"}},"الصف "+g));const gr=el("div",{class:"grid g2"});
    SUBJ_ORDER.forEach(k=>{const s=SCI.data[g][k];if(!s)return;booksOf(s).forEach(b=>gr.append(el("a",{class:"les",href:"#/book/"+b.key,style:{"--c":s.color}},el("span",{class:"st"},b.kind[0]==="a"?"🧪":"📘"),el("div",{},el("b",{},s.name),el("small",{},bookTitle(b))))));});
    box.append(gr);V.append(box);});V.append(credit());});

/* ---- عارض الكتاب ---- */
let EMB=null;
route(/^#\/book\/([\w]+)(?:\/(\d+))?$/,async(V,key,p)=>{
  const found=allBooks().find(([b])=>b.key===key);if(!found){go("#/books");return;}
  V.append(crumbs(["الرئيسية","#/"],["الكتب","#/books"],found[1].name+" · الصف "+found[1].grade+" · "+bookTitle(found[0])));EMB=null;await mountBook(V,key,p);});
async function mountBook(V,key,p,opt){
  const found=allBooks().find(([b])=>b.key===key);if(!found)return;
  const[b,s]=found;K=key;SUB=s;KIND=b;
  const wait=el("div",{class:"card empty"},"جارٍ تحميل الكتاب…");V.append(wait);
  try{B=await meta(key);}catch(e){wait.textContent="تعذّر تحميل الكتاب. تأكّدي من الاتصال.";return;}
  wait.remove();B.dir="book/"+key+"/";
  page=+p||lsGet("sbk:last:"+key,0)||pdfPage(b,firstNum(s.units[0]&&s.units[0].lessons[0]&&s.units[0].lessons[0].pages));
  gap=lsGet("sbk:gap",220);width=lsGet("sbk:w",100);
  document.body.classList.add("bookmode");
  V.append(toolbar());pageEl=el("div",{class:"bk-page"});
  V.append(el("div",{class:"bk-stage",style:{"--bw":width+"%"}},pageEl),el("div",{class:"bk-foot row",style:{justifyContent:"space-between"}},navBtn("→ السابقة",-1),el("span",{class:"muted",id:"bkLbl2"}),navBtn("التالية ←",1)));
  if(keyH)document.removeEventListener("keydown",keyH);
  keyH=e=>{if(!document.body.contains(pageEl)){document.removeEventListener("keydown",keyH);return;}if(e.target.isContentEditable||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;
    if((e.ctrlKey||e.metaKey)&&(e.key==="z"||e.key==="Z"||e.key==="ز")){e.preventDefault();e.shiftKey?doRedo():doUndo();return;}if((e.ctrlKey||e.metaKey)&&(e.key==="y"||e.key==="Y")){e.preventDefault();doRedo();return;}
    if(e.key==="ArrowLeft"||e.key==="PageDown")go2(1);else if(e.key==="ArrowRight"||e.key==="PageUp")go2(-1);};
  document.addEventListener("keydown",keyH);
  if(resizeH)removeEventListener("resize",resizeH);resizeH=()=>{if(cv&&document.body.contains(cv))fit();};addEventListener("resize",resizeH);
  if(EMB&&(page<EMB.lo||page>EMB.hi))page=EMB.lo;
  draw();
}
window.SCIBOOK.mount=(V,key,p,range)=>{EMB=range||null;return mountBook(V,key,p);};
addEventListener("hashchange",()=>{if(!location.hash.startsWith("#/book/")&&!location.hash.startsWith("#/t/m/"))document.body.classList.remove("bookmode","bkfull");});

function navBtn(t,d){return el("button",{class:"btn ghost sm",onclick:()=>go2(d)},t);}
function go2(d){setPage(page+d);}
function setPage(p){p=Math.max(EMB?EMB.lo:1,Math.min(EMB?EMB.hi:B.n,p));if(p===page&&pageEl.childElementCount)return;page=p;if(!EMB)history.replaceState(null,"","#/book/"+K+"/"+page);draw();if(!EMB)scrollTo({top:0});else pageEl.scrollIntoView({block:"start"});}
function lessonAt(p){/* أي درس تقع فيه الصفحة */let cur=null;SUB.units.forEach(u=>u.lessons.forEach(l=>{const st=pdfPage(KIND,firstNum(l.pages));if(KIND.kind==="s"&&p>=st)cur=l;}));return cur;}
function expsOn(p){const out=[];SUB.units.forEach(u=>u.lessons.forEach(l=>l.exps.forEach((x,i)=>{const r=expRef(x);if(!r||r.kind!==KIND.kind)return;const b=findBook(SUB,r.kind,r.p);if(b!==KIND)return;const st=pdfPage(b,r.p);if(p>=st&&p<=st+2)out.push({l,x,i});})));return out;}
function toolbar(){
  const sel=el("select",{class:"bk-sel nav","aria-label":"انتقلي إلى",onchange:e=>setPage(+e.target.value)});
  sel.append(el("option",{value:1},"الغلاف والمقدّمة"));
  SUB.units.forEach(u=>{const og=el("optgroup",{label:"الوحدة "+u.n+": "+u.title});
    if(KIND.kind==="s"){if(u.pages)og.append(el("option",{value:pdfPage(KIND,firstNum(u.pages))},"مدخل الوحدة (ص "+firstNum(u.pages)+")"));
      u.lessons.forEach((l,j)=>og.append(el("option",{value:pdfPage(KIND,firstNum(l.pages))},"الدرس "+(j+1)+": "+l.title+" (ص "+firstNum(l.pages)+")")));}
    else u.lessons.forEach(l=>l.exps.forEach(x=>{const r=expRef(x);if(r&&r.kind==="a"){const bb=findBook(SUB,"a",r.p);if(bb===KIND)og.append(el("option",{value:pdfPage(KIND,r.p)},x.kind+": "+x.t+" (ص "+r.p+")"));}}));
    if(og.children.length)sel.append(og);});
  const num=el("input",{type:"number",min:1,max:B.n,class:"bk-num","aria-label":"رقم الصفحة",onchange:e=>setPage(+e.target.value||1)});
  const T=(id,ic,t)=>el("button",{class:"bk-tool","data-t":id,title:t,"aria-label":t,onclick:()=>setTool(id)},el("span",{},ic),el("small",{},t));
  const colors=el("div",{class:"bk-colors"},...COLORS.map(([c,n])=>el("button",{class:"bk-c",style:{background:c},title:n,"aria-label":n,"data-c":c,onclick:()=>{color=c;if(tool==="move"||tool==="erase"||tool==="type")setTool("pen");mark();}})));
  const sz=el("select",{class:"bk-sel sm","aria-label":"سماكة القلم",onchange:e=>{size=+e.target.value;}},...[[2,"رفيع"],[4,"وسط"],[7,"عريض"]].map(([v,t])=>el("option",{value:v,selected:v===size},t)));
  const gp=el("select",{class:"bk-sel sm","aria-label":"حجم الفراغات",onchange:e=>{gap=+e.target.value;lsSet("sbk:gap",gap);draw();}},...GAPS.map(([v,t])=>el("option",{value:v,selected:v===gap},t)));
  const wd=el("select",{class:"bk-sel sm","aria-label":"حجم الصفحة",onchange:e=>{width=+e.target.value;lsSet("sbk:w",width);document.querySelector(".bk-stage").style.setProperty("--bw",width+"%");fit();}},...[[60,"صفحة صغيرة"],[80,"صفحة متوسّطة"],[100,"صفحة كاملة"]].map(([v,t])=>el("option",{value:v,selected:v===width},t)));
  const other=booksOf(SUB).filter(x=>x!==KIND);
  const bar=el("div",{class:"bk-bar"},
    el("div",{class:"bk-row"},el("button",{class:"btn ghost sm",onclick:()=>go2(-1),"aria-label":"السابقة"},"→"),sel,num,el("button",{class:"btn ghost sm",onclick:()=>go2(1),"aria-label":"التالية"},"←"),el("span",{class:"bk-lbl",id:"bkLbl"}),
      ...other.map(x=>el("a",{class:"btn ghost sm",href:"#/book/"+x.key},(x.kind[0]==="a"?"🧪 ":"📘 ")+bookTitle(x)))),
    el("div",{class:"bk-row tools"},T("move","✋","تصفّح"),T("pen","✏️","قلم"),T("hl","🖍️","تظليل"),T("type","🔤","كتابة"),T("erase","🧽","ممحاة"),el("span",{class:"bk-sep"}),colors,sz,el("span",{class:"bk-sep"}),
      el("button",{class:"bk-tool bk-undo",onclick:doUndo,title:"تراجع (Ctrl+Z)","aria-label":"تراجع"},el("span",{},"↶"),el("small",{},"تراجع")),
      el("button",{class:"bk-tool",onclick:doRedo,title:"إعادة (Ctrl+Y)","aria-label":"إعادة"},el("span",{},"↷"),el("small",{},"إعادة")),
      el("button",{class:"bk-tool",onclick:wipe,title:"مسح الصفحة"},el("span",{},"🗑️"),el("small",{},"مسح")),
      el("span",{class:"bk-sep"}),gp,wd,
      el("button",{class:"bk-tool",onclick:lab,title:"المختبر التفاعلي لهذه الصفحة"},el("span",{},"⚗️"),el("small",{},"المختبر")),
      el("button",{class:"bk-tool",onclick:guide,title:"دليل الدرس"},el("span",{},"📘"),el("small",{},"دليل الدرس")),
      el("button",{class:"bk-tool",onclick:full,title:"ملء الشاشة"},el("span",{},"⛶"),el("small",{},"شاشة كاملة"))),
    el("div",{class:"bk-row",id:"bkExp"}));
  bar._sel=sel;bar._num=num;return bar;}
function mark(){document.querySelectorAll(".bk-tool[data-t]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.t===tool)));
  document.querySelectorAll(".bk-c").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.c===color&&(tool==="pen"||tool==="hl"))));
  if(cv)cv.style.pointerEvents=(tool==="pen"||tool==="hl"||tool==="erase")?"auto":"none";if(pageEl)pageEl.classList.toggle("typing",tool==="type");}
function setTool(t){tool=t;mark();if(t==="type"&&gap===0){gap=220;lsSet("sbk:gap",gap);draw();toast("أضفتُ فراغات للكتابة");}}
function pkey(){return "sbk:"+K+":"+page;}
function draw(){lsSet("sbk:last:"+K,page);const hk=pkey();if(HIST[hk]&&HIST[hk].d)data=HIST[hk].d;else{data=lsGet(hk,{s:[],t:{}});HIST[hk]={u:[],r:[],d:data};}undo=HIST[hk].u;redo=HIST[hk].r;
  const bar=document.querySelector(".bk-bar");if(bar){let best=0,bi=0;[...bar._sel.options].forEach((o,i)=>{const v=+o.value;if(v<=page&&v>=best){best=v;bi=i;}});bar._sel.selectedIndex=bi;bar._num.value=page;}
  const L=lessonAt(page),lb=(L?"الوحدة "+L.unit.n+" · "+L.title+" · ":"")+"صفحة الملف "+page+" (ص "+(page-(KIND.off||0))+")";["bkLbl","bkLbl2"].forEach(i=>{const e=document.getElementById(i);if(e)e.textContent=lb;});
  const ex=document.getElementById("bkExp");if(ex){ex.innerHTML="";expsOn(page).forEach(({l,x,i})=>{const sim=x.sim||l.sims[0];
    ex.append(el("span",{class:"tag",style:{fontSize:"13px"}},"🧪 "+x.t),sim?el("a",{class:"btn sm",href:simHref(sim),target:"_blank",rel:"noopener"},"⚗️ افتحيها في المختبر التفاعلي"):null,el("a",{class:"btn ghost sm",href:"#/ws/"+l.id+"/"+i},"🖨️ ورقة العمل"));});}
  const sl=B.s[page]||[[0,B.H]],W=B.W,src=B.dir+"p"+String(page).padStart(3,"0")+".webp";
  pageEl.innerHTML="";blocks=[];_T=null;_k=0;
  sl.forEach(([a,b2],i)=>{const sv=el("div",{class:"bk-slice",style:{aspectRatio:W+"/"+(b2-a)}},el("img",{src,alt:i===0?"صفحة "+page+" من الكتاب":"",draggable:"false",style:{marginTop:"-"+(a/W*100)+"%"}}));
    pageEl.append(sv);blocks.push({el:sv,h:b2-a});
    const gi=i,txt=data.t[gi]||"";const g=el("div",{class:"bk-gap",style:gap?{aspectRatio:W+"/"+gap}:{height:"0"}});
    if(gap){const ed=el("div",{class:"bk-text",contenteditable:"true","aria-label":"مساحة الشرح "+(gi+1),"data-ph":"اكتبي الشرح أو الحلّ هنا…"});ed.textContent=txt;ed.addEventListener("input",()=>{data.t[gi]=ed.innerText;savep();});ed.style.color=color;g.append(ed);}
    pageEl.append(g);blocks.push({el:g,h:gap});});
  cv=el("canvas",{class:"bk-ink","aria-hidden":"true"});lv=el("canvas",{class:"bk-ink bk-live","aria-hidden":"true"});pageEl.append(cv,lv);ctx=cv.getContext("2d");try{lx=lv.getContext("2d",{desynchronized:true})||lv.getContext("2d");}catch(e){lx=lv.getContext("2d");}bindInk();mark();
  const im=pageEl.querySelector("img");if(im.complete)fit();else im.addEventListener("load",fit,{once:true});requestAnimationFrame(fit);
  if(page<B.n){const pre=new Image();pre.src=B.dir+"p"+String(page+1).padStart(3,"0")+".webp";}}
function savep(){lsSet(pkey(),data);const h=HIST[pkey()];if(h)h.d=data;}
let _T=null,_k=0;
function scale(){return _k||(_k=pageEl.clientWidth/B.W);}
function tops(){if(_T&&_T.length===blocks.length)return _T;let y=0;return(_T=blocks.map(b=>{const t=y;y+=b.h;return t;}));}
function toModel(px,py){const k=scale(),x=px/k,y=py/k,T=tops();let i=blocks.length-1;for(let j=0;j<T.length;j++){if(y<T[j]+blocks[j].h){i=j;break;}}const r=v=>Math.round(v*10)/10;return[i,r(x),r(y-T[i])];}
function toScreen(p){const k=scale(),T=tops();const i=Math.min(p[0],blocks.length-1);const yy=Math.min(p[2],Math.max(blocks[i].h,0));return[p[1]*k,(T[i]+yy)*k];}
function fit(){if(!cv)return;_k=0;_T=null;const r=pageEl.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
  [cv,lv].forEach(c=>{if(!c)return;c.width=Math.round(r.width*dpr);c.height=Math.round(pageEl.scrollHeight*dpr);c.style.width=r.width+"px";c.style.height=pageEl.scrollHeight+"px";});ctx.setTransform(dpr,0,0,dpr,0,0);if(lx)lx.setTransform(dpr,0,0,dpr,0,0);redraw();}
function segStyle(s,k,c){c=c||ctx;if(s.t==="h"){c.globalAlpha=.32;c.lineWidth=s.w*4*k;c.lineCap="butt";}else{c.globalAlpha=1;c.lineWidth=Math.max(1.2,s.w*k*1.6);c.lineCap="round";}c.lineJoin="round";c.strokeStyle=s.c;}
/* مسار ناعم عبر منتصفات النقاط (منحنيات تربيعية) */
function path(c,P){c.beginPath();if(!P.length)return;c.moveTo(P[0][0],P[0][1]);if(P.length===1){c.lineTo(P[0][0]+.1,P[0][1]);return;}for(let i=1;i<P.length-1;i++){const mx=(P[i][0]+P[i+1][0])/2,my=(P[i][1]+P[i+1][1])/2;c.quadraticCurveTo(P[i][0],P[i][1],mx,my);}const L=P[P.length-1];c.lineTo(L[0],L[1]);}
function drawStroke(s){const k=scale();ctx.save();segStyle(s,k);path(ctx,s.p.map(toScreen));ctx.stroke();ctx.restore();}
function redraw(){if(!ctx)return;ctx.clearRect(0,0,cv.width,cv.height);data.s.forEach(drawStroke);}
function bindInk(){let cur=null,sp=[],pid=null,raf=0;const pos=e=>{const r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];};
  /* الرسم الحيّ على طبقة منفصلة منخفضة التأخير: يُرسم الخطّ فور حركة القلم مع توقّع موضعه التالي */
  const live=(pred)=>{const k=scale();lx.clearRect(0,0,lv.width,lv.height);lx.save();segStyle(cur,k,lx);if(cur.t==="h"){lx.globalAlpha=1;lv.style.opacity=".32";}else lv.style.opacity="1";path(lx,pred&&pred.length?sp.concat(pred):sp);lx.stroke();lx.restore();};
  cv.addEventListener("pointerdown",e=>{if(tool==="move"||tool==="type")return;if(cur&&pid!==e.pointerId)return;e.preventDefault();try{cv.setPointerCapture(e.pointerId);}catch(_){}pid=e.pointerId;const[x,y]=pos(e);
    if(tool==="erase"){cur={erase:true,del:[]};eraseAt(x,y,cur.del);return;}cur={t:tool==="hl"?"h":"p",c:color,w:size,p:[toModel(x,y)]};sp=[[x,y]];live();},{passive:false});
  cv.addEventListener("pointermove",e=>{if(!cur||e.pointerId!==pid)return;e.preventDefault();if(cur.erase){const[x,y]=pos(e);eraseAt(x,y,cur.del);return;}
    const evs=(e.getCoalescedEvents&&e.getCoalescedEvents())||[];(evs.length?evs:[e]).forEach(ev=>{const[x,y]=pos(ev);const l=sp[sp.length-1];if(Math.abs(x-l[0])+Math.abs(y-l[1])<.75)return;sp.push([x,y]);cur.p.push(toModel(x,y));});
    let pr=null;try{const pe=e.getPredictedEvents&&e.getPredictedEvents();if(pe&&pe.length)pr=pe.slice(0,2).map(pos);}catch(_){}live(pr);},{passive:false});
  const end=e=>{if(!cur||(e&&e.pointerId!==pid))return;pid=null;if(cur.erase){if(cur.del.length){undo.push({del:cur.del});redo.length=0;}}else{data.s.push(cur);drawStroke(cur);undo.push({add:cur});redo.length=0;}
    lx.clearRect(0,0,lv.width,lv.height);cur=null;sp=[];savep();};
  cv.addEventListener("pointerup",end);cv.addEventListener("pointercancel",end);cv.addEventListener("lostpointercapture",end);}
function eraseAt(x,y,bag){const k=scale(),R=14;const keep=[];let hit=false;data.s.forEach((s,i)=>{const near=s.p.some(p=>{const[a,b]=toScreen(p);return Math.hypot(a-x,b-y)<R+(s.t==="h"?s.w*2*k:0);});if(near){hit=true;bag.push({s,i});}else keep.push(s);});if(hit){data.s=keep;redraw();}}
/* تراجع / إعادة: كل حركة (خطّ، أو مسحة ممحاة كاملة، أو مسح الصفحة) خطوة واحدة */
function apply(u,back){if(u.add){if(back)data.s=data.s.filter(s=>s!==u.add);else data.s.push(u.add);}
  if(u.del){if(back){[...u.del].sort((a,b)=>a.i-b.i).forEach(({s,i})=>data.s.splice(Math.min(i,data.s.length),0,s));}else{const set=new Set(u.del.map(d=>d.s));data.s=data.s.filter(s=>!set.has(s));}}
  if(u.wipe){data=back?{s:u.wipe.s.slice(),t:Object.assign({},u.wipe.t)}:{s:[],t:{}};savep();draw();return;}redraw();savep();}
function doUndo(){const u=undo.pop();if(!u){toast("لا شيء للتراجع");return;}apply(u,true);redo.push(u);}
function doRedo(){const u=redo.pop();if(!u){toast("لا شيء للإعادة");return;}apply(u,false);undo.push(u);}
function wipe(){if(!data.s.length&&!Object.values(data.t).some(Boolean)){toast("الصفحة نظيفة");return;}if(!confirm("مسح كل ما كُتب على هذه الصفحة؟"))return;undo.push({wipe:{s:data.s.slice(),t:Object.assign({},data.t)}});redo.length=0;data={s:[],t:{}};savep();draw();toast("مُسحت الصفحة — يمكنكِ التراجع ↶");}
function full(){const on=!document.body.classList.contains("bkfull");document.body.classList.toggle("bkfull",on);try{if(on&&document.documentElement.requestFullscreen)document.documentElement.requestFullscreen();else if(!on&&document.fullscreenElement)document.exitFullscreen();}catch(e){}setTimeout(fit,250);}
function lab(){const L=lessonAt(page)||SUB.units[0].lessons[0];const ex=expsOn(page);const sim=(ex[0]&&(ex[0].x.sim||ex[0].l.sims[0]))||L.sims[0];
  if(sim)window.open(simHref(sim),"_blank");else go("#/l/"+L.id+"/lab");}
function guide(){let d=document.getElementById("bkDrawer");if(d){d.remove();return;}const L=lessonAt(page);
  d=el("aside",{id:"bkDrawer",class:"bk-drawer"},el("div",{class:"row",style:{justifyContent:"space-between"}},el("b",{},"📘 دليل الدرس"),el("button",{class:"btn ghost sm",onclick:()=>d.remove()},"إغلاق")));
  if(!L)d.append(el("p",{class:"muted"},"اختاري صفحة داخل أحد الدروس."));
  else d.append(el("h3",{},L.title),el("p",{},"💡 "+L.idea),el("h4",{},"النتاجات"),el("ul",{},...L.outcomes.map(o=>el("li",{},o))),el("h4",{},"أفكار رئيسة"),el("ul",{},...L.points.map(p=>el("li",{},el("b",{},p[0]+": "),p[1]))),
    el("h4",{},"أسئلة صفّية سريعة"),el("ol",{},...L.quiz.slice(0,5).map(q=>el("li",{},q.q,el("div",{class:"small muted"},"✔ "+q.o[q.a])))),
    el("h4",{},"المصطلحات"),el("p",{},L.terms.map(t=>t[0]+" ("+t[1]+")").join("، ")),
    el("div",{class:"row"},el("a",{class:"btn sm",href:"#/l/"+L.id+"/lab"},"⚗️ المختبر"),el("a",{class:"btn sm ghost",href:"#/t/plan/"+L.id},"📝 خطة الدرس"),el("a",{class:"btn sm ghost",href:"#/t/contest/"+L.unit.id},"🏆 مسابقة")));
  document.body.append(d);}
})();
function simHref(x){return x.lab==="bx"?"labs/bx/#"+x.id:x.lab==="chem3d"?"chem3d/#"+x.id:x.lab==="lab3d"?"lab3d/#"+x.id:"labs/"+x.lab+".html#"+x.id;}
