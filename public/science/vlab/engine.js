/* محرّك المختبر الافتراضي — منصّة مدرسة القطرانة الثانوية للبنات — تصميم وتنفيذ: نوال بني عطية */
(function(){
const EXPS=[];const W=960,H=600;
const VLab=window.VLab={W,H,EXPS,reg(d){EXPS.push(d)},get(id){return EXPS.find(e=>e.id===id)}};
const el=(t,a={},...k)=>{const e=document.createElement(t);for(const x in a){if(x==="class")e.className=a[x];else if(x.startsWith("on"))e.addEventListener(x.slice(2),a[x]);else if(x==="style"){for(const k in a[x])k.startsWith("--")?e.style.setProperty(k,a[x][k]):e.style[k]=a[x][k]}else e.setAttribute(x,a[x])}k.flat().forEach(c=>c!=null&&e.append(c.nodeType?c:document.createTextNode(c)));return e};
VLab.el=el;
const LS={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ===== أدوات الرسم المشتركة ===== */
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function flask(c,x,y,s,col){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle="rgba(255,255,255,.55)";c.lineWidth=2;
 c.beginPath();c.moveTo(-6,-40);c.lineTo(-6,-14);c.lineTo(-22,14);c.quadraticCurveTo(-24,20,-16,20);c.lineTo(16,20);c.quadraticCurveTo(24,20,22,14);c.lineTo(6,-14);c.lineTo(6,-40);c.stroke();
 c.fillStyle=col;c.globalAlpha=.75;c.beginPath();c.moveTo(-14,2);c.lineTo(-22,14);c.quadraticCurveTo(-24,20,-16,20);c.lineTo(16,20);c.quadraticCurveTo(24,20,22,14);c.lineTo(14,2);c.closePath();c.fill();c.restore()}
function tube(c,x,y,col){c.save();c.strokeStyle="rgba(255,255,255,.5)";c.lineWidth=2;rr(c,x-6,y-44,12,46,6);c.stroke();c.fillStyle=col;c.globalAlpha=.8;rr(c,x-4,y-20,8,20,4);c.fill();c.restore()}
function bottle(c,x,y,col){c.save();c.fillStyle="#6b3b1e";c.globalAlpha=.85;rr(c,x-16,y-40,32,42,6);c.fill();c.fillRect(x-7,y-52,14,14);c.globalAlpha=1;c.fillStyle="#f3dfa8";c.fillRect(x-11,y-28,22,12);c.restore()}
function bg(c){
 const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,"#3a2a2e");g.addColorStop(1,"#22171a");c.fillStyle=g;c.fillRect(0,0,W,H);
 c.strokeStyle="rgba(0,0,0,.28)";c.lineWidth=2;
 for(let r=0,y=0;y<H*.78;r++,y+=34){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();for(let x=(r%2?-40:0);x<W;x+=80){c.beginPath();c.moveTo(x,y);c.lineTo(x,y+34);c.stroke()}}
 c.fillStyle="rgba(255,255,255,.025)";for(let r=0,y=0;y<H*.78;r++,y+=34)for(let x=(r%2?-40:0);x<W;x+=80)if((x*7+y*3)%5===0)c.fillRect(x+3,y+3,74,28);
 // رفّان
 [[30,250,230],[W-260,250,230]].forEach(([x,y,w])=>{c.fillStyle="#5a3a24";c.fillRect(x,y,w,10);c.fillStyle="rgba(0,0,0,.3)";c.fillRect(x,y+10,w,6)});
 bottle(c,62,250,"#6b3b1e");flask(c,120,230,.9,"#3fb37a");tube(c,180,250,"#e05d5d");tube(c,200,250,"#5d9be0");
 flask(c,W-70,230,.9,"#4aa3df");tube(c,W-130,250,"#c84b6a");bottle(c,W-200,250);
 // الطاولة
 const t=c.createLinearGradient(0,H*.78,0,H);t.addColorStop(0,"#4b3a3e");t.addColorStop(1,"#2a1d20");c.fillStyle=t;c.fillRect(0,H*.78,W,H*.22);
 c.fillStyle="rgba(243,223,168,.12)";c.fillRect(0,H*.78,W,3);
 // ضوء علوي
 const l=c.createRadialGradient(W/2,0,20,W/2,0,H*.9);l.addColorStop(0,"rgba(255,240,210,.16)");l.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=l;c.fillRect(0,0,W,H);
 const v=c.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,H*.85);v.addColorStop(0,"rgba(0,0,0,0)");v.addColorStop(1,"rgba(0,0,0,.45)");c.fillStyle=v;c.fillRect(0,0,W,H);
 c.fillStyle="rgba(255,255,255,.2)";rr(c,W/2-130,12,260,8,4);c.fill();
}
function frame(c){c.strokeStyle="#B8902A";c.lineWidth=7;c.lineCap="round";const m=18,L=60;
 [[W-m,m,-1,1],[m,H-m,1,-1]].forEach(([x,y,dx,dy])=>{c.beginPath();c.moveTo(x+dx*L,y);c.lineTo(x,y);c.lineTo(x,y+dy*L);c.stroke()})}
function chip(c,txt){c.save();c.font="700 30px Cairo, sans-serif";const w=Math.min(c.measureText(txt).width+60,W-140);c.fillStyle="rgba(20,10,14,.85)";c.strokeStyle="rgba(243,223,168,.5)";c.lineWidth=2;rr(c,W-34-w,30,w,54,14);c.fill();c.stroke();
 c.fillStyle="#3fd0ff";c.beginPath();c.arc(W-56,57,7,0,7);c.fill();c.fillStyle="#fff";c.textAlign="right";c.textBaseline="middle";c.fillText(txt,W-72,58,w-50);c.restore()}
function card(c,x,y,w,h,label,val,pct,col="#e9b949"){c.save();c.fillStyle="rgba(18,12,30,.85)";c.strokeStyle="rgba(150,170,255,.35)";c.lineWidth=2;rr(c,x,y,w,h,14);c.fill();c.stroke();
 c.fillStyle="#f3dfa8";c.font="700 25px Cairo, sans-serif";c.textAlign="center";c.textBaseline="middle";c.fillText(label,x+w/2,y+26,w-16);
 c.strokeStyle="rgba(255,255,255,.12)";c.beginPath();c.moveTo(x+16,y+50);c.lineTo(x+w-16,y+50);c.stroke();
 if(pct!=null){c.fillStyle="rgba(255,255,255,.12)";rr(c,x+20,y+64,w-40,18,9);c.fill();const p=Math.max(0,Math.min(1,pct));c.fillStyle=col;rr(c,x+w-20-(w-40)*p,y+64,Math.max(18,(w-40)*p),18,9);c.fill()}
 if(/^[\d.\-+]/.test(val))c.direction="ltr";c.fillStyle="#fff";c.font="800 "+(pct!=null?28:34)+"px Cairo, sans-serif";c.fillText(val,x+w/2,pct!=null?y+h-22:y+h/2+22,w-12);c.restore()}
function lens(c,x,y,r,inside,cap){c.save();c.strokeStyle="#8a8f99";c.lineWidth=16;c.lineCap="round";c.beginPath();c.moveTo(x+r*.7,y+r*.7);c.lineTo(x+r*1.25,y+r*1.25);c.stroke();
 c.beginPath();c.arc(x,y,r,0,7);c.save();c.clip();inside(c,x,y,r);c.restore();c.lineWidth=10;c.strokeStyle="#c9ccd3";c.stroke();
 c.fillStyle="rgba(255,255,255,.18)";c.beginPath();c.ellipse(x-r*.4,y-r*.45,r*.35,r*.14,-.6,0,7);c.fill();
 if(cap){c.fillStyle="#a3e635";c.font="700 24px Cairo, sans-serif";c.textAlign="center";c.fillText(cap,x,y+r+36)}c.restore()}
function label(c,x,y,t,col="#fff",sz=24,al="center"){c.save();if(/^[\d.\-+]/.test(t))c.direction="ltr";c.font="700 "+sz+"px Cairo, sans-serif";c.textAlign=al;c.textBaseline="middle";c.lineWidth=4;c.strokeStyle="rgba(0,0,0,.6)";c.strokeText(t,x,y);c.fillStyle=col;c.fillText(t,x,y);c.restore()}
function wm(c){c.save();c.globalAlpha=.07;c.fillStyle="#fff";c.font="700 30px El Messiri, serif";c.translate(W/2,H/2);c.rotate(-.35);c.textAlign="center";c.fillText("منصّة القطرانة · المختبر الافتراضي",0,0);c.restore()}
VLab.g={rr,flask,tube,bottle,bg,frame,chip,card,lens,label,wm};

/* ===== تشغيل تجربة ===== */
let AC=null;function beep(f=660,d=.12){if(!VLab.snd)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.value=.08;o.connect(g);g.connect(AC.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+d);o.stop(AC.currentTime+d)}catch(e){}}
VLab.snd=LS.get("vlab.snd",true);
VLab.run=function(def,root){
 const S={};def.vars.forEach(v=>S[v.k]=v.val);
 const hist={};def.vars.forEach(v=>hist[v.k]=new Set([v.val]));
 const NBK="vlab.nb."+def.id;const nb=LS.get(NBK,{a:{},recs:[]});const recs=nb.recs;
 const done=new Set();
 const cv=el("canvas",{width:W,height:H});const ctx=cv.getContext("2d");
 const toast=el("div",{class:"toast"});
 const starsEl=el("span",{class:"stars"});const chs=def.challenges.map(c=>el("span",{class:"cq"},c.t));
 const ttl=def.title;
 const tb=el("div",{class:"tb"},
  el("button",{title:"رجوع",onclick:()=>location.href="./"},"→"),
  el("button",{title:"إعادة",onclick:()=>{def.vars.forEach(v=>S[v.k]=v.val);drawVars();if(def.reset)def.reset(S)}},"↺"),
  el("button",{title:"الدفتر",onclick:()=>{nbx.open=true;nbx.scrollIntoView({behavior:"smooth"})}},"📝"),
  el("button",{title:"طباعة",onclick:()=>{nbx.open=true;window.print()}},"🖨"),
  (()=>{const b=el("button",{title:"الصوت",onclick:()=>{VLab.snd=!VLab.snd;LS.set("vlab.snd",VLab.snd);b.textContent=VLab.snd?"🔊":"🔇"}},VLab.snd?"🔊":"🔇");return b})(),
  el("span",{class:"ttl"},ttl));
 const chbar=el("div",{class:"ch"},starsEl,...chs);
 const stage=el("div",{class:"stage"},cv,toast);
 const tabV=el("button",{class:"on"},"🎛️ المتغيّرات"),tabR=el("button",{},"📊 القراءات");
 const body=el("div");
 const panel=el("div",{class:"panel"},el("div",{class:"tabs"},tabV,tabR),body);
 let tab="v";tabV.onclick=()=>{tab="v";tabV.className="on";tabR.className="";drawVars()};tabR.onclick=()=>{tab="r";tabR.className="on";tabV.className="";drawReads()};
 function pctOf(v){return ((S[v.k]-v.min)/(v.max-v.min)*100)+"%"}
 function drawVars(){if(tab!=="v")return;body.replaceChildren(el("p",{class:"hint"},"🎛️ حرّكي المؤشّر وراقبي ما يحدث في التجربة"));
  def.vars.forEach(v=>{const vv=el("span",{class:"vv"},fmt(v));const box=el("div",{class:"var",style:{"--c":v.c||"#7A1F2E"}},el("div",{class:"hd"},el("span",{class:"lb",style:{color:v.c}},v.label+(v.unit?" ("+v.unit+")":"")),vv));
   if(v.type==="seg"){const sg=el("div",{class:"seg"});v.opts.forEach(([val,t])=>{const b=el("button",{class:S[v.k]===val?"on":"",onclick:()=>{S[v.k]=val;hist[v.k].add(val);[...sg.children].forEach(x=>x.className="");b.className="on";vv.textContent=fmt(v);check()}},t);sg.append(b)});box.append(sg)}
   else{const r=el("input",{type:"range",min:v.min,max:v.max,step:v.step||1,value:S[v.k]});r.style.setProperty("--p",pctOf(v));
    r.oninput=()=>{S[v.k]=+r.value;r.style.setProperty("--p",pctOf(v));vv.textContent=fmt(v)};r.onchange=()=>{hist[v.k].add(S[v.k]);check()};
    const tk=el("div",{class:"ticks"});(v.ticks||[v.min,(v.min+v.max)/2,v.max]).slice().sort((a,b)=>a-b).forEach(t=>tk.append(el("span",{},String(t))));box.append(r,tk)}
   body.append(box)})}
 function fmt(v){if(v.type==="seg")return(v.opts.find(o=>o[0]===S[v.k])||[0,""])[1];return String(S[v.k])}
 let rdBox=null;
 function drawReads(){if(tab!=="r")return;rdBox=el("div",{class:"rd"});body.replaceChildren(el("p",{class:"hint"},"📊 القراءات تتغيّر مباشرة مع المتغيّرات"),rdBox,el("button",{class:"rec",onclick:record},"✍️ سجّلي القراءة في الدفتر"));fillReads()}
 function fillReads(){if(!rdBox)return;rdBox.replaceChildren(...def.read(S).map(r=>el("div",{},el("small",{},r.label),el("b",{},r.val),r.unit?el("small",{},r.unit):null)))}
 function record(){const row={};def.vars.forEach(v=>row[v.k]=fmt(v));def.read(S).forEach(r=>row["r:"+r.label]=r.val+(r.unit?" "+r.unit:""));recs.push(row);if(recs.length>30)recs.shift();LS.set(NBK,nb);drawTable();show("✔️ سُجّلت القراءة رقم "+recs.length);check()}
 function show(t){toast.textContent=t;toast.classList.add("show");clearTimeout(show.t);show.t=setTimeout(()=>toast.classList.remove("show"),2200)}
 function check(){def.challenges.forEach((c,i)=>{if(!done.has(i)&&c.test(S,hist,recs)){done.add(i);chs[i].classList.add("done");beep(880);show("🌟 أحسنتِ! "+c.t)}});
  const st=Math.round(done.size/def.challenges.length*3);if(st===3&&!check.c3&&check.ready&&window.FX){check.c3=1;FX.confetti();show("🏆 ثلاث نجوم! أنجزتِ كلّ التحدّيات")}check.ready=1;starsEl.innerHTML="<b>"+"★".repeat(st)+"</b>"+"★".repeat(3-st)}
 // الدفتر
 const tblBox=el("div",{class:"tbl"});
 function drawTable(){if(!recs.length){tblBox.replaceChildren(el("p",{style:{color:"var(--muted)"}},"لم تُسجَّل قراءات بعد. افتحي «القراءات» واضغطي «سجّلي القراءة»."));return}
  const keys=Object.keys(recs[0]);const lab=k=>k.startsWith("r:")?k.slice(2):(def.vars.find(v=>v.k===k)||{}).label||k;
  tblBox.replaceChildren(el("table",{},el("tr",{},el("th",{},"#"),...keys.map(k=>el("th",{},lab(k)))),...recs.map((r,i)=>el("tr",{},el("td",{},String(i+1)),...keys.map(k=>el("td",{},r[k]??"—"))))),
   el("button",{class:"qq",style:{border:0,color:"var(--wine)",fontWeight:800},onclick:()=>{recs.length=0;LS.set(NBK,nb);drawTable()}},"🗑 مسح الجدول"))}
 const N=def.notebook;
 const nbx=el("details",{class:"nb"},el("summary",{},"📒 دفتر القياسات والاستقصاء"),el("div",{class:"nbin"},
  el("h3",{},"سؤال الاستقصاء"),el("p",{},def.question),
  N.goal?[el("h3",{},"الهدف"),el("p",{},N.goal)]:null,
  N.mats?[el("h3",{},"الموادّ والأدوات (في المختبر الحقيقي)"),el("p",{},N.mats)]:null,
  el("h3",{},"خطوات العمل الافتراضي"),el("ol",{},...N.steps.map(s=>el("li",{},s))),
  el("h3",{},"جدول القراءات"),tblBox,
  el("h3",{},"التحليل والاستنتاج"),...N.questions.map((q,i)=>{const ta=el("textarea",{placeholder:"اكتبي إجابتك هنا…"});ta.value=nb.a[i]||"";ta.oninput=()=>{nb.a[i]=ta.value;LS.set(NBK,nb)};
   const box=el("div",{class:"qq"},el("b",{},(i+1)+") "+q.q),ta,el("button",{onclick:()=>box.classList.toggle("show")},"👁 إظهار الإجابة النموذجية"),el("div",{class:"ans"},q.a));return box}),
  N.concl?[el("h3",{},"الخلاصة العلمية"),el("p",{},N.concl)]:null,
  el("p",{style:{color:"var(--muted)",fontSize:"13px"}},"المصدر: "+def.src+" · "+def.grade+" · "+def.unit)));
 root.replaceChildren(el("div",{class:"labbox"},tb,chbar,stage,panel),nbx,el("p",{class:"foot"},"المختبر الافتراضي · منصّة مدرسة القطرانة الثانوية للبنات للتعلّم الرقمي",el("br"),"تصميمُ المنصّة وتنفيذُها: نوال بني عطية"));
 drawVars();drawTable();check();
 // الحلقة
 const Sm={};def.vars.forEach(v=>Sm[v.k]=S[v.k]);
 let last=performance.now(),t=0,rt=0;
 function loop(now){const dt=Math.max(0,Math.min(.05,(now-last)/1000));last=now;t+=dt;
  def.vars.forEach(v=>{if(typeof S[v.k]==="number"&&v.type!=="seg")Sm[v.k]+=(S[v.k]-Sm[v.k])*Math.min(1,dt*6);else Sm[v.k]=S[v.k]});
  ctx.setTransform(1,0,0,1,0,0);bg(ctx);def.draw(ctx,Sm,t,dt,S);wm(ctx);frame(ctx);chip(ctx,def.title);
  if((rt+=dt)>.25){rt=0;if(tab==="r")fillReads()}
  requestAnimationFrame(loop)}
 requestAnimationFrame(loop);
};
})();
