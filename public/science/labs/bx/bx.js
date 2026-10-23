/* مختبر تجارب الكتاب التفاعلي — لكل تجربة في الكتاب محاكاة تتبع خطواتها نفسها.
   تصميمُ المنصّة وتنفيذُها: نوال بني عطية */
var SCI={data:{},add(g,k,d){(SCI.data[g]=SCI.data[g]||{})[k]=d;}};
var BX=(function(){
const REG={};const NS="http://www.w3.org/2000/svg";
const FILES={s8:"g8-sci",b9:"g9-bio",c9:"g9-chem",p9:"g9-phys",e9:"g9-earth",b10:"g10-bio",c10:"g10-chem",p10:"g10-phys",e10:"g10-earth"};
const $=s=>document.querySelector(s);
function h(t,a={},...k){const e=document.createElement(t);for(const[x,y]of Object.entries(a)){if(y==null||y===false)continue;if(x==="class")e.className=y;else if(x==="style"&&typeof y==="object")Object.assign(e.style,y);else if(x.startsWith("on"))e.addEventListener(x.slice(2),y);else e.setAttribute(x,y===true?"":y);}for(const c of k.flat())if(c!=null&&c!==false)e.append(c.nodeType?c:document.createTextNode(c));return e;}
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("on"),2600);}
function load(src){return new Promise((ok,no)=>{const s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=no;document.head.append(s);});}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const lerp=(a,b,t)=>a+(b-a)*t;const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;

/* ================= مكتبة الرسم ================= */
function Scene(svg){
  const S={svg,W:800,H:500};let gid=0;const defs=mk("defs",{},svg);
  function mk(tag,at={},par){const e=document.createElementNS(NS,tag);for(const k in at)if(at[k]!=null)e.setAttribute(k,at[k]);if(par)par.append(e);return e;}
  S.mk=mk;
  S.g=(par,at)=>mk("g",at||{},par||S.layer);
  S.lg=(stops,vert,x1)=>{const id="g"+(++gid);const g=mk("linearGradient",vert?{id,x1:0,y1:0,x2:0,y2:1}:{id,x1:x1||0,y1:0,x2:1,y2:0},defs);stops.forEach((c,i)=>mk("stop",{offset:(Array.isArray(c)?c[1]:i/(stops.length-1)),"stop-color":Array.isArray(c)?c[0]:c,...(Array.isArray(c)&&c[2]!=null?{"stop-opacity":c[2]}:{})},g));return "url(#"+id+")";};
  S.rg=(stops,cx,cy,r)=>{const id="g"+(++gid);const g=mk("radialGradient",{id,cx:cx??.5,cy:cy??.5,r:r??.5},defs);stops.forEach((c,i)=>mk("stop",{offset:(Array.isArray(c)?c[1]:i/(stops.length-1)),"stop-color":Array.isArray(c)?c[0]:c,...(Array.isArray(c)&&c[2]!=null?{"stop-opacity":c[2]}:{})},g));return "url(#"+id+")";};
  S.clip=(shape)=>{const id="c"+(++gid);const c=mk("clipPath",{id},defs);c.append(shape);return "url(#"+id+")";};
  S.filt=(()=>{const f=mk("filter",{id:"sh",x:"-20%",y:"-20%",width:"140%",height:"150%"},defs);mk("feDropShadow",{dx:0,dy:4,stdDeviation:4,"flood-opacity":.25},f);
    const f2=mk("filter",{id:"bl"},defs);mk("feGaussianBlur",{stdDeviation:3},f2);return 1;})();
  S.rect=(x,y,w,h,at,par)=>mk("rect",{x,y,width:w,height:h,...at},par||S.layer);
  S.circ=(cx,cy,r,at,par)=>mk("circle",{cx,cy,r,...at},par||S.layer);
  S.ell=(cx,cy,rx,ry,at,par)=>mk("ellipse",{cx,cy,rx,ry,...at},par||S.layer);
  S.path=(d,at,par)=>mk("path",{d,...at},par||S.layer);
  S.line=(x1,y1,x2,y2,at,par)=>mk("line",{x1,y1,x2,y2,stroke:"#333","stroke-width":2,...at},par||S.layer);
  S.text=(x,y,s,at,par)=>{const t=mk("text",{x,y,"text-anchor":"middle","font-size":16,"font-weight":700,fill:"#2B1218","font-family":"Noto Naskh Arabic,Tahoma,sans-serif",...(/[\u0600-\u06FF]/.test(s)?{}:{direction:"ltr","unicode-bidi":"plaintext"}),...at},par||S.layer);t.textContent=s;return t;};
  S.emo=(x,y,ch,size,par)=>{const t=mk("text",{x,y,"text-anchor":"middle","dominant-baseline":"central","font-size":size||40},par||S.layer);t.textContent=ch;return t;};
  S.tr=(g,x,y,r,s)=>{g._x=x;g._y=y;g._r=r||0;g._s=s??1;g.setAttribute("transform","translate("+x+" "+y+")"+(r?" rotate("+r+")":"")+(s!=null&&s!==1?" scale("+s+")":""));return g;};
  S.label=(x,y,s,par,col)=>{const g=S.g(par);const t=S.text(0,0,s,{"font-size":14,fill:"#fff"},g);g.set=v=>{t.textContent=v;t.setAttribute("direction",/[\u0600-\u06FF]/.test(v)?"rtl":"ltr");};const w=Math.max(40,s.length*8+18);const r=S.rect(-w/2,-17,w,24,{rx:12,fill:col||"#7A1F2E",opacity:.92},g);g.insertBefore(r,t);S.tr(g,x,y);return g;};
  /* المسرح: جدار ومنضدة */
  S.room=(opt={})=>{const b=S.g(S.bg);S.rect(0,0,800,500,{fill:S.lg([opt.wall1||"#e8f1f6",opt.wall2||"#d4e3ec"],1)},b);
    for(let i=0;i<6;i++)S.rect(40+i*130,30,90,4,{fill:"#c8d9e3",rx:2},b);
    if(opt.table!==false){S.rect(0,392,800,108,{fill:S.lg(["#c9945c","#a8743f"],1)},b);S.rect(0,388,800,10,{fill:"#e0b47c"},b);for(let i=0;i<9;i++)S.path("M"+(i*100+20)+" 400 q 30 40 10 100",{stroke:"#9d6a37","stroke-width":1.5,fill:"none",opacity:.35},b);}
    return b;};
  /* ---------- أدوات المختبر ---------- */
  S.beaker=(x,y,w,h,o={})=>{const g=S.g(o.par);S.tr(g,x,y);const L={g,w,h,lvl:o.lvl||0,col:o.col||"#7cc4f2"};
    const cl=S.clip(mk("rect",{x:-w/2+4,y:-h,width:w-8,height:h-4,rx:6}));
    L.cl=cl;L.liq=S.rect(-w/2+4,0,w-8,0,{fill:L.col,"clip-path":cl,opacity:.85},g);L.top=S.ell(0,0,w/2-4,4,{fill:"#fff",opacity:.35},g);
    S.path("M"+(-w/2)+" "+(-h)+" L"+(-w/2)+" -6 Q"+(-w/2)+" 0 "+(-w/2+6)+" 0 L"+(w/2-6)+" 0 Q"+(w/2)+" 0 "+(w/2)+" -6 L"+(w/2)+" "+(-h)+" M"+(-w/2)+" "+(-h)+" l -6 -5",{fill:S.lg([["#fff",0,.35],["#cfe6f5",.5,.15],["#fff",1,.4]]),stroke:"#7f9fb3","stroke-width":2.5},g);
    for(let i=1;i<5;i++)S.line(w/2-14,-i*h/5,w/2-4,-i*h/5,{stroke:"#7f9fb3","stroke-width":1.5},g);
    S.rect(-w/2+7,-h+8,6,h-20,{fill:"#fff",opacity:.5,rx:3},g);
    if(o.label)S.text(0,18,o.label,{"font-size":13,fill:"#3b4a55"},g);
    L.set=(lv,col)=>{if(lv!=null)L.lvl=lv;if(col)L.col=col;const hh=(h-6)*clamp(L.lvl,0,1);L.liq.setAttribute("y",-hh-2);L.liq.setAttribute("height",hh);L.liq.setAttribute("fill",L.col);L.top.setAttribute("cy",-hh-2);L.top.style.display=L.lvl>0?"":"none";};
    L.to=(lv,ms,col)=>{const a=L.lvl;if(col)L.set(null,col);return S.tween(ms||700,t=>L.set(lerp(a,lv,t)));};L.set();return L;};
  S.tube=(x,y,h,o={})=>{const g=S.g(o.par);S.tr(g,x,y,o.rot||0);const w=o.w||30;const T={g,h,w,lvl:o.lvl||0,col:o.col||"#7cc4f2"};
    const shape="M"+(-w/2)+" "+(-h)+" L"+(-w/2)+" "+(-w/2)+" A"+(w/2)+" "+(w/2)+" 0 0 0 "+(w/2)+" "+(-w/2)+" L"+(w/2)+" "+(-h);
    const cl=S.clip(mk("path",{d:shape+"Z"}));T.liq=S.rect(-w/2,0,w,0,{fill:T.col,"clip-path":cl,opacity:.88},g);T.inner=S.g(g);T.inner.setAttribute("clip-path",cl);
    S.path(shape,{fill:S.lg([["#fff",0,.3],["#dff0fb",.5,.08],["#fff",1,.35]]),stroke:"#7f9fb3","stroke-width":2.5},g);S.rect(-w/2+4,-h+8,4,h-w,{fill:"#fff",opacity:.55,rx:2},g);
    S.ell(0,-h,w/2+3,4,{fill:"none",stroke:"#7f9fb3","stroke-width":2.5},g);if(o.label)S.text(0,22,o.label,{"font-size":13,fill:"#3b4a55"},g);
    T.set=(lv,col)=>{if(lv!=null)T.lvl=lv;if(col)T.col=col;const hh=h*clamp(T.lvl,0,1);T.liq.setAttribute("y",-hh);T.liq.setAttribute("height",hh);T.liq.setAttribute("fill",T.col);};
    T.to=(lv,ms,col)=>{const a=T.lvl;if(col)T.set(null,col);return S.tween(ms||700,t=>T.set(lerp(a,lv,t)));};T.set();return T;};
  S.flask=(x,y,s,o={})=>{const g=S.g(o.par);S.tr(g,x,y);s=s||1;const F={g,lvl:o.lvl||0,col:o.col||"#7cc4f2"};const d="M-14 -120 L-14 -70 L-55 -8 Q-60 0 -50 0 L50 0 Q60 0 55 -8 L14 -70 L14 -120";
    const cl=S.clip(mk("path",{d:d+"Z"}));F.liq=S.rect(-60,0,120,0,{fill:F.col,"clip-path":cl,opacity:.85},g);F.inner=S.g(g);F.inner.setAttribute("clip-path",cl);S.path(d,{fill:S.lg([["#fff",0,.3],["#dff0fb",.5,.1],["#fff",1,.35]]),stroke:"#7f9fb3","stroke-width":2.5},g);
    if(o.label)S.text(0,20,o.label,{"font-size":13,fill:"#3b4a55"},g);
    F.set=(lv,col)=>{if(lv!=null)F.lvl=lv;if(col)F.col=col;const hh=110*clamp(F.lvl,0,1);F.liq.setAttribute("y",-hh);F.liq.setAttribute("height",hh);F.liq.setAttribute("fill",F.col);};
    F.to=(lv,ms,col)=>{const a=F.lvl;if(col)F.set(null,col);return S.tween(ms||700,t=>F.set(lerp(a,lv,t)));};F.set();if(s!==1)g.setAttribute("transform",g.getAttribute("transform")+" scale("+s+")");return F;};
  S.dish=(x,y,r,o={})=>{const g=S.g(o.par);S.tr(g,x,y);S.ell(0,6,r+6,(r+6)*.32,{fill:"#000",opacity:.12},g);S.ell(0,0,r,r*.35,{fill:o.fill||"#f4efe2",stroke:"#9fb7c6","stroke-width":2},g);const inner=S.g(g);S.ell(0,-4,r,r*.35,{fill:"#fff",opacity:.2,stroke:"#b9cfdc","stroke-width":2},g);if(o.label)S.text(0,r*.35+22,o.label,{"font-size":13,fill:"#3b4a55"},g);return {g,inner};};
  S.burner=(x,y,o={})=>{const g=S.g(o.par);S.tr(g,x,y);S.rect(-30,-12,60,12,{rx:4,fill:"#5c6770"},g);S.rect(-9,-80,18,70,{fill:S.lg(["#8a99a4","#cfd8de","#7d8b95"]),rx:3},g);S.rect(-12,-40,24,10,{fill:"#4d5961",rx:2},g);
    const fl=S.g(g);S.path("M0 -82 C -18 -110 -6 -140 0 -170 C 6 -140 18 -110 0 -82Z",{fill:S.lg([["#ffe27a",0],["#ff8a1f",.6],["#ff4d00",1]],1)},fl);S.path("M0 -84 C -8 -100 -3 -115 0 -128 C 3 -115 8 -100 0 -84Z",{fill:"#5aa9ff",opacity:.9},fl);
    fl.style.transformOrigin="0px -82px";fl.style.transformBox="view-box";const B={g,fl,lit:false};B.on=(v)=>{B.lit=v;fl.style.display=v?"":"none";};B.on(!!o.on);
    let t0=0;const fk=ts=>{if(B.lit){const s=1+Math.sin(ts/90)*.05+Math.sin(ts/37)*.03;fl.setAttribute("transform","translate(0 -82) scale("+(1/s)+" "+s+") translate(0 82)");}requestAnimationFrame(fk);};requestAnimationFrame(fk);return B;};
  S.lamp=(x,y,o={})=>{const g=S.g(o.par);S.tr(g,x,y,o.rot||0);const beam=S.path("M-10 30 L-120 300 L120 300 L10 30Z",{fill:S.lg([["#fff6b0",0,.75],["#fff6b0",1,0]],1),opacity:0},g);
    S.rect(-6,-60,12,60,{fill:"#666"},g);S.path("M-40 0 L40 0 L22 -38 L-22 -38Z",{fill:S.lg(["#c62828","#ef5350"]),stroke:"#8e1d1d","stroke-width":2},g);const bulb=S.circ(0,6,14,{fill:"#ddd"},g);
    const L={g,beam,bulb,on(v,k){beam.setAttribute("opacity",v?(k??1)*.9:0);bulb.setAttribute("fill",v?"#fff59d":"#ddd");}};L.on(!!o.on);return L;};
  S.thermo=(x,y,h,o={})=>{const g=S.g(o.par);S.tr(g,x,y);const mn=o.min??0,mx=o.max??100;S.rect(-9,-h,18,h,{rx:9,fill:"#fff",stroke:"#8aa",["stroke-width"]:2},g);S.circ(0,10,14,{fill:"#e53935",stroke:"#8aa","stroke-width":2},g);
    const col=S.rect(-4,0,8,0,{fill:"#e53935"},g);for(let i=0;i<=5;i++){const yy=-12-(h-24)*i/5;S.line(9,yy,16,yy,{stroke:"#556","stroke-width":1.5},g);S.text(30,yy+5,String(Math.round(mn+(mx-mn)*i/5)),{"font-size":11,fill:"#334"},g);}
    const lab=S.label(0,-h-18,"",g,"#c62828");const T={g,v:o.val??20,set(v){T.v=v;const hh=12+(h-24)*clamp((v-mn)/(mx-mn),0,1);col.setAttribute("y",-hh);col.setAttribute("height",hh+6);const tx=lab.querySelector("text");tx.textContent=Math.round(v*10)/10+" °C";tx.setAttribute("direction","ltr");}};T.set(T.v);return T;};
  S.screen=(x,y,w,txt,o={})=>{const g=S.g(o.par);S.tr(g,x,y);S.rect(-w/2,-22,w,40,{rx:8,fill:"#1d2a22",stroke:o.frame||"#556","stroke-width":3},g);const t=S.text(0,6,txt,{"font-size":20,fill:"#7dfc9a","font-family":"ui-monospace,monospace",direction:"ltr"},g);return {g,set(s){t.textContent=s;}};};
  S.balance=(x,y,o={})=>{const g=S.g(o.par);S.tr(g,x,y);S.path("M-80 0 L80 0 L70 -36 L-70 -36Z",{fill:S.lg(["#e8edf1","#b8c4cc"],1),stroke:"#7d8b95","stroke-width":2},g);S.rect(-60,-46,120,10,{rx:4,fill:"#9aa8b1"},g);S.ell(0,-48,70,8,{fill:"#dfe6eb",stroke:"#7d8b95","stroke-width":2},g);
    const sc=S.screen(0,-12,90,"0.00 g",{par:g});sc.g.setAttribute("transform","translate(0 -12) scale(.7)");return {g,set(v){sc.set(v.toFixed(o.dp??2)+" g");}};};
  S.watch=(x,y,o={})=>{const g=S.g(o.par);S.tr(g,x,y);S.rect(-6,-46,12,10,{fill:"#555",rx:2},g);S.circ(0,0,38,{fill:"#fff",stroke:"#455a64","stroke-width":5},g);for(let i=0;i<12;i++){const a=i*Math.PI/6;S.line(Math.sin(a)*30,-Math.cos(a)*30,Math.sin(a)*35,-Math.cos(a)*35,{stroke:"#455a64","stroke-width":2},g);}
    const hand=S.line(0,0,0,-30,{stroke:"#c62828","stroke-width":3},g);S.circ(0,0,4,{fill:"#c62828"},g);const lab=S.text(0,60,"0.0 s",{"font-size":15,direction:"ltr"},g);return {g,set(s,unit){hand.setAttribute("transform","rotate("+(s%60*6)+")");lab.textContent=(unit?s:s.toFixed(1)+" s");}};};
  S.dropper=(x,y,col,o={})=>{const g=S.g(o.par);S.tr(g,x,y,o.rot||0);S.rect(-7,-70,14,60,{fill:S.lg([["#fff",0,.5],["#dff0fb",1,.3]]),stroke:"#7f9fb3","stroke-width":2,rx:3},g);S.rect(-6,-40,12,28,{fill:col||"#888",opacity:.8},g);S.path("M-4 -10 L0 8 L4 -10Z",{fill:"#cfe",stroke:"#7f9fb3","stroke-width":1.5},g);S.rect(-10,-100,20,32,{rx:9,fill:o.bulb||"#e53935"},g);if(o.label)S.text(0,-108,o.label,{"font-size":12,fill:"#334"},g);return g;};
  S.bottle=(x,y,col,label,o={})=>{const g=S.g(o.par);S.tr(g,x,y);S.rect(-24,-80,48,80,{rx:8,fill:S.lg([[col,0,.9],["#fff",.45,.6],[col,1,.9]]),stroke:"#5d4037","stroke-width":2},g);S.rect(-10,-100,20,22,{fill:o.cap||"#37474f",rx:3},g);S.rect(-20,-58,40,30,{fill:"#fff",rx:4,opacity:.95},g);
    S.text(0,-38,label||"",{"font-size":label&&label.length>6?9:12,fill:"#333"},g);return g;};
  S.pot=(x,y,o={})=>{const g=S.g(o.par);S.tr(g,x,y);S.path("M-45 -55 L45 -55 L35 0 L-35 0Z",{fill:S.lg(["#c76b3c","#e08a52","#b85b2e"])},g);S.rect(-50,-62,100,12,{rx:4,fill:"#a8532b"},g);S.ell(0,-60,44,7,{fill:"#5b3a22"},g);
    const plant=S.g(g);plant.setAttribute("transform","translate(0 -60)");if(o.label)S.text(0,22,o.label,{"font-size":13,fill:"#3b4a55"},g);
    const P={g,plant,h:0,bend:0,n:o.n||3,col:o.col||"#43a047",draw(){plant.innerHTML="";const n=P.n;for(let i=0;i<n;i++){const ox=(i-(n-1)/2)*18,hh=P.h*(0.85+0.15*Math.sin(i*2.1));if(hh<2)continue;const b=P.bend*hh*.7;
      S.path("M"+ox+" 0 Q"+(ox+b*.2)+" "+(-hh*.6)+" "+(ox+b)+" "+(-hh),{stroke:P.col==="#43a047"?"#2e7d32":P.col,"stroke-width":3,fill:"none","stroke-linecap":"round"},plant);
      if(hh>12){S.ell(ox+b-8,-hh,9,4.5,{fill:P.col,transform:"rotate(-25 "+(ox+b-8)+" "+(-hh)+")"},plant);S.ell(ox+b+8,-hh,9,4.5,{fill:P.col,transform:"rotate(25 "+(ox+b+8)+" "+(-hh)+")"},plant);}}}};P.draw();return P;};
  S.bulb=(x,y,o={})=>{const g=S.g(o.par);S.tr(g,x,y);const glow=S.circ(0,-30,50,{fill:S.rg([["#fff59d",0,.9],["#fff59d",1,0]]),opacity:0},g);const gl=S.circ(0,-30,22,{fill:"#eee",stroke:"#999","stroke-width":2},g);S.rect(-11,-10,22,16,{fill:"#9e9e9e",rx:3},g);S.path("M-6 -22 l4 -10 l4 10 l4 -10",{stroke:"#666","stroke-width":1.5,fill:"none"},g);
    return {g,on(k){glow.setAttribute("opacity",k?Math.min(1,k):0);gl.setAttribute("fill",k?"#fff59d":"#eee");}};};
  S.battery=(x,y,o={})=>{const g=S.g(o.par);S.tr(g,x,y);S.rect(-40,-22,80,44,{rx:6,fill:S.lg(["#263238","#455a64"],1)},g);S.rect(-40,-22,26,44,{rx:6,fill:"#f9a825"},g);S.rect(40,-8,6,16,{fill:"#90a4ae"},g);S.text(-2,6,o.v||"6 V",{"font-size":14,fill:"#fff",direction:"ltr"},g);S.text(52,-12,"+",{"font-size":16,fill:"#c62828"},g);S.text(-52,-12,"−",{"font-size":16,fill:"#1565c0"},g);return g;};
  S.wire=(pts,col,par)=>S.path("M"+pts.map(p=>p.join(" ")).join(" L"),{stroke:col||"#d32f2f","stroke-width":4,fill:"none","stroke-linejoin":"round","stroke-linecap":"round"},par||S.layer);
  S.ruler=(x,y,len,o={})=>{const g=S.g(o.par);S.tr(g,x,y,o.rot||0);const n=o.n||10,pp=len/n;S.rect(0,-26,len,26,{fill:S.lg(["#fff3b0","#ffe082"],1),stroke:"#b08b2a","stroke-width":1.5,rx:3},g);for(let i=0;i<=n;i++){S.line(i*pp,-26,i*pp,-14,{stroke:"#333","stroke-width":1.5},g);if(o.sub)for(let j=1;j<o.sub&&i<n;j++)S.line(i*pp+j*pp/o.sub,-26,i*pp+j*pp/o.sub,-20,{stroke:"#333","stroke-width":.8},g);S.text(i*pp,-2,String(i*(o.step||1)),{"font-size":10,fill:"#333",direction:"ltr"},g);}return g;};
  S.arrow=(x1,y1,x2,y2,col,par,w)=>{const g=S.g(par);const a=Math.atan2(y2-y1,x2-x1);S.line(x1,y1,x2-Math.cos(a)*10,y2-Math.sin(a)*10,{stroke:col||"#c62828","stroke-width":w||4,"stroke-linecap":"round"},g);S.path("M"+x2+" "+y2+" L"+(x2-Math.cos(a-0.45)*16)+" "+(y2-Math.sin(a-0.45)*16)+" L"+(x2-Math.cos(a+0.45)*16)+" "+(y2-Math.sin(a+0.45)*16)+"Z",{fill:col||"#c62828"},g);return g;};
  S.bag=(x,y,o={})=>{const g=S.g(o.par);S.tr(g,x,y);S.path("M-50 -110 L50 -110 L56 0 Q0 10 -56 0Z",{fill:S.lg([["#fff",0,.55],["#e3f2fd",1,.35]]),stroke:"#90a4ae","stroke-width":2},g);S.rect(-52,-118,104,8,{fill:"#42a5f5",rx:3},g);const inner=S.g(g);return {g,inner};};
  S.spring=(x,y,o={})=>{const g=S.g(o.par);S.tr(g,x,y);S.rect(-16,0,32,150,{rx:8,fill:S.lg(["#eceff1","#cfd8dc"]),stroke:"#78909c","stroke-width":2},g);for(let i=0;i<=10;i++){S.line(-16,12+i*12,-6,12+i*12,{stroke:"#455a64"},g);if(i%2===0)S.text(-28,16+i*12,String(i/2),{"font-size":10,direction:"ltr"},g);}
    const ptr=S.rect(-12,10,24,4,{fill:"#c62828"},g);const rod=S.line(0,150,0,170,{stroke:"#555","stroke-width":3},g);const hook=S.path("M0 170 q 8 4 0 12 q -8 4 -4 -4",{stroke:"#555","stroke-width":3,fill:"none"},g);
    return {g,set(N){const d=clamp(N,0,5)*24;ptr.setAttribute("y",10+d);rod.setAttribute("y2",170+d);hook.setAttribute("transform","translate(0 "+d+")");},hookY:()=>170};};
  S.cylinder=(x,y,h,o={})=>{const w=o.w||40;const B=S.beaker(x,y,w,h,{...o,label:o.label});for(let i=1;i<10;i++)S.line(-w/2+3,-i*h/10,-w/2+12,-i*h/10,{stroke:"#7f9fb3","stroke-width":1.2},B.g);S.rect(-w/2-14,-2,w+28,8,{rx:3,fill:"#7f9fb3"},B.g);return B;};
  S.star=(x,y,r,col,par)=>S.path(Array.from({length:10},(_,i)=>{const a=i*Math.PI/5-Math.PI/2,rr=i%2?r*.45:r;return (i?"L":"M")+(x+Math.cos(a)*rr)+" "+(y+Math.sin(a)*rr);}).join("")+"Z",{fill:col||"#ffd54f"},par||S.layer);
  S.bubbles=(x,y,w,n,o={})=>{const g=S.g(o.par);for(let i=0;i<n;i++){const b=S.circ(x+(Math.random()-.5)*w,y,2+Math.random()*3,{fill:o.col||"#fff",opacity:.8},g);const sp=.4+Math.random()*.8,d=Math.random()*1000,H=o.h||80;let t0=null;const st=ts=>{if(!b.isConnected)return;if(t0==null)t0=ts;const p=((ts-t0)/1000*sp+d/1000)%1;b.setAttribute("cy",y-p*H);b.setAttribute("opacity",.85*(1-p));requestAnimationFrame(st);};requestAnimationFrame(st);}return g;};
  S.tween=(ms,fn)=>new Promise(res=>{const t0=performance.now()*1;const f=now=>{const t=clamp((now-t0)/ms/(S.speed||1),0,1);fn(ease(t),t);if(t<1)requestAnimationFrame(f);else res();};requestAnimationFrame(f);});
  S.moveTo=(g,x,y,ms,r)=>{const x0=g._x||0,y0=g._y||0,r0=g._r||0,s=g._s??1;return S.tween(ms||600,t=>S.tr(g,lerp(x0,x,t),lerp(y0,y,t),r!=null?lerp(r0,r,t):r0,s));};
  S.pour=async(g,x,y,ang,fn,ms)=>{const ox=g._x,oy=g._y;await S.moveTo(g,x,y,500);await S.moveTo(g,x,y,350,ang);if(fn)await fn();await S.moveTo(g,x,y,300,0);await S.moveTo(g,ox,oy,450,0);};
  S.stream=(x1,y1,y2,col,ms)=>{const l=S.line(x1,y1,x1,y1,{stroke:col,"stroke-width":6,"stroke-linecap":"round",opacity:.8},S.fx);return S.tween(300,t=>l.setAttribute("y2",lerp(y1,y2,t))).then(()=>sleep(ms||600)).then(()=>S.tween(250,t=>l.setAttribute("y1",lerp(y1,y2,t)))).then(()=>l.remove());};
  /* ---------- التفاعل ---------- */
  function pt(e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
  S.pt=pt;
  S.glow=(g,on,r)=>{if(g._glow){g._glow.remove();g._glow=null;}if(!on)return;const b=g.getBBox();const m=g.getCTM&&g.getCTM();const ring=S.mk("rect",{x:b.x-8,y:b.y-8,width:b.width+16,height:b.height+16,rx:14,fill:"none",stroke:"#B8902A","stroke-width":4,"stroke-dasharray":"8 6",class:"glow","pointer-events":"none"});g.insertBefore(ring,g.firstChild);g._glow=ring;};
  S.tap=(g,fn,o={})=>{g.classList.add("hit");g.addEventListener("pointerdown",e=>{e.stopPropagation();});g.addEventListener("click",e=>{e.stopPropagation();if(g._off||S.busy||Date.now()-(g._nc||0)<500)return;fn(e);});if(o.glow)S.glow(g,true);return g;};
  /* drag: targets=[{g|box:[x,y,w,h], fn}] */
  S.drag=(g,o={})=>{g.classList.add("drag");let st=null;try{const b=g.getBBox();const p=o.hitPad??12;g.insertBefore(S.mk("rect",{x:b.x-p,y:b.y-p,width:b.width+2*p,height:b.height+2*p,fill:"#fff","fill-opacity":0,rx:10}),g.firstChild);}catch(e){}
    const tgBox=t=>{if(t.box)return t.box;const b=t.g.getBBox(),inv=svg.getScreenCTM().inverse().multiply(t.g.getScreenCTM());const p1=svg.createSVGPoint();p1.x=b.x;p1.y=b.y;const q1=p1.matrixTransform(inv);const p2=svg.createSVGPoint();p2.x=b.x+b.width;p2.y=b.y+b.height;const q2=p2.matrixTransform(inv);return [q1.x,q1.y,q2.x-q1.x,q2.y-q1.y];};
    g.addEventListener("pointerdown",e=>{if(g._off||st||S.busy)return;e.preventDefault();const p=pt(e);st={dx:p.x-(g._x||0),dy:p.y-(g._y||0),x0:g._x||0,y0:g._y||0,id:e.pointerId};(o.targets?o.targets():[]).forEach(t=>t.g&&S.glow(t.g,true));if(o.start)o.start();
      addEventListener("pointermove",mv);addEventListener("pointerup",up);addEventListener("pointercancel",up);});
    const mv=e=>{if(!st||e.pointerId!==st.id)return;e.preventDefault();const p=pt(e);st.px=p.x;st.py=p.y;st.m=(st.m||0)+1;if(st.m===2)g.parentNode.append(g);S.tr(g,clamp(p.x-st.dx,0,800),clamp(p.y-st.dy,0,500),g._r,g._s);if(o.move)o.move(g._x,g._y);};
    const T0=()=>o.targets?o.targets():[];const up=async e=>{if(!st||e.pointerId!==st.id)return;removeEventListener("pointermove",mv);removeEventListener("pointerup",up);removeEventListener("pointercancel",up);const s0=st;st=null;if(s0.m>2)g._nc=Date.now();else{T0().forEach(t=>t.g&&S.glow(t.g,false));return;}const T=o.targets?o.targets():[];T.forEach(t=>t.g&&S.glow(t.g,false));
      const P2=[[g._x+(o.ox||0),g._y+(o.oy||0)]];if(s0.px!=null)P2.push([s0.px,s0.py]);let hit=null;for(const t of T){const [x,y,w,hh]=tgBox(t);const pad=t.pad??30;if(P2.some(([cx,cy])=>cx>x-pad&&cx<x+w+pad&&cy>y-pad&&cy<y+hh+pad)){hit=t;break;}}
      if(hit){S.busy=window.__busy=1;let r;try{r=await hit.fn(g);}finally{S.busy=window.__busy=0;}if(r===false||(o.back&&r!=="stay"))await S.moveTo(g,s0.x0,s0.y0,300);}else{if(o.miss)o.miss();if(o.free!==true)await S.moveTo(g,s0.x0,s0.y0,300);}};
    return g;};
  S.off=(g,v)=>{g._off=v;g.style.opacity=v?.45:"";};
  S.clear=()=>{S.layer.innerHTML="";S.fx.innerHTML="";S.bg.innerHTML="";};
  S.bg=mk("g",{},svg);S.layer=mk("g",{},svg);S.fx=mk("g",{"pointer-events":"none"},svg);
  return S;}

/* ================= الرسم البياني ================= */
function chart(box,rows,c){box.innerHTML="";if(!rows.length)return;const xs=rows.map(r=>r[c.x]);const ys=(Array.isArray(c.y)?c.y:[c.y]);const W=640,H=300,P=[60,20,20,50];
  const vals=rows.flatMap(r=>ys.map(k=>+r[k])).filter(v=>!isNaN(v));let mn=Math.min(0,...vals),mx=Math.max(...vals,1e-9);if(c.min!=null)mn=c.min;if(c.max!=null)mx=c.max;const sp=(mx-mn)||1;
  const num=c.type!=="bar"&&rows.every(r=>!isNaN(+r[c.x]));let xmn=0,xmx=1;if(num){xmn=Math.min(...xs.map(Number));xmx=Math.max(...xs.map(Number));if(xmx===xmn)xmx=xmn+1;}
  const X=i=>num?P[0]+(W-P[0]-P[1])*(+xs[i]-xmn)/(xmx-xmn):P[0]+(W-P[0]-P[1])*(i+.5)/rows.length;const Y=v=>H-P[3]-(H-P[2]-P[3])*(v-mn)/sp;
  const COL=["#7A1F2E","#1d7f8c","#B8902A","#2f8f5b","#2563c9","#c2297a"];let s=`<svg viewBox="0 0 ${W} ${H}" font-family="Noto Naskh Arabic,Tahoma" direction="rtl">`;
  for(let i=0;i<=4;i++){const v=mn+sp*i/4,y=Y(v);s+=`<line x1="${P[0]}" x2="${W-P[1]}" y1="${y}" y2="${y}" stroke="#ddd"/><text x="${P[0]-6}" y="${y+4}" font-size="12" text-anchor="end" direction="ltr">${Math.round(v*100)/100}</text>`;}
  s+=`<line x1="${P[0]}" y1="${H-P[3]}" x2="${W-P[1]}" y2="${H-P[3]}" stroke="#555" stroke-width="2"/><line x1="${P[0]}" y1="${P[2]}" x2="${P[0]}" y2="${H-P[3]}" stroke="#555" stroke-width="2"/>`;
  const ordered=rows.map((r,i)=>i);if(num)ordered.sort((a,b)=>+xs[a]-+xs[b]);
  ys.forEach((k,j)=>{const col=COL[j%6];if(c.type==="bar"){const bw=(W-P[0]-P[1])/rows.length/(ys.length+1);rows.forEach((r,i)=>{const v=+r[k];if(isNaN(v))return;const x=X(i)-bw*ys.length/2+j*bw;s+=`<rect x="${x}" y="${Y(Math.max(v,0))}" width="${bw*.9}" height="${Math.abs(Y(v)-Y(0))}" fill="${col}" rx="3"/>`;});}
    else{const pts=ordered.filter(i=>!isNaN(+rows[i][k])).map(i=>X(i)+","+Y(+rows[i][k]));s+=`<polyline points="${pts.join(" ")}" fill="none" stroke="${col}" stroke-width="3"/>`;pts.forEach(p=>{const[a,b]=p.split(",");s+=`<circle cx="${a}" cy="${b}" r="5" fill="${col}"/>`;});}});
  rows.forEach((r,i)=>{if(!num||rows.length<=12)s+=`<text x="${X(i)}" y="${H-P[3]+18}" font-size="12" text-anchor="middle">${r[c.x]}</text>`;});
  s+=`<text x="${(W+P[0])/2}" y="${H-6}" font-size="14" font-weight="700" text-anchor="middle">${c.xl||""}</text><text x="14" y="${H/2}" font-size="14" font-weight="700" text-anchor="middle" transform="rotate(-90 14 ${H/2})">${c.yl||""}</text>`;
  if(ys.length>1)ys.forEach((k,j)=>{s+=`<rect x="${W-P[1]-120}" y="${P[2]+j*18}" width="12" height="12" fill="${COL[j%6]}"/><text x="${W-P[1]-126}" y="${P[2]+j*18+11}" font-size="12" text-anchor="end">${(c.names||{})[k]||k}</text>`;});
  box.innerHTML=s+"</svg>";}

/* ================= تشغيل التجربة ================= */
async function boot(){const key=(location.hash||"").slice(1);const m=key.match(/^((s8|b9|c9|p9|e9|b10|c10|p10|e10)-\d+-\d+)-(\d+)$/);const app=$("#app");
  if(!m){app.innerHTML='<div class="card">لم تُحدَّد التجربة.</div>';return;}
  const [_,lid,pre,idx]=m;try{await load("../../data/"+FILES[pre]+".js");await load("m-"+pre+".js?v=1");}catch(e){}
  let L=null;for(const g in SCI.data)for(const k in SCI.data[g])SCI.data[g][k].units.forEach(u=>u.lessons.forEach(l=>{if(l.id===lid){L=l;L._s=SCI.data[g][k];L._u=u;L._g=g;}}));
  const X=L&&L.exps[+idx];if(!X){app.innerHTML='<div class="card">التجربة غير موجودة.</div>';return;}
  run(app,key,L,X,REG[key]);}
function run(app,key,L,X,M){app.innerHTML="";document.title=X.t+" · تجارب الكتاب";
  const sub=L._s;app.append(h("div",{class:"top noprint"},h("a",{href:"../../#/l/"+L.id+"/exp",class:"btn g"},"→ الدرس"),h("span",{class:"credit"},"🔬 مختبر تجارب الكتاب")));
  app.append(h("header",{class:"hd"},h("div",{class:"meta"},h("span",{class:"tag"},X.kind||"تجربة")," ",sub.name+" · الصف "+L._g+" · "+L.title+" · "+(X.src||"")),h("h1",{},X.t),h("div",{class:"goal"},"🎯 "+X.goal)));
  const mats=h("div",{class:"card noprint"},h("h2",{},"🧰 المواد والأدوات"),h("div",{class:"mats"},...String(X.mats||"").replace(/\.$/,"").split(/،|,/).map(s=>s.trim()).filter(Boolean).map(s=>h("span",{},s))),X.safety?h("div",{class:"safe"},"⚠️ "+X.safety):null);
  const say=h("div",{class:"say","aria-live":"polite"},h("span",{class:"n"},"1"),h("span",{class:"t"},""));
  const svg=document.createElementNS(NS,"svg");svg.setAttribute("viewBox","0 0 800 500");svg.setAttribute("class","sc");svg.setAttribute("role","img");svg.setAttribute("aria-label",X.t);
  const ctl=h("div",{class:"ctl"});const stage=h("div",{class:"card stage"},say,svg,ctl);
  const ol=h("ol",{class:"steps"});const steps=(M&&M.steps)||X.steps||[];steps.forEach(s=>ol.append(h("li",{},s)));
  const side=h("div",{class:"card"},h("h2",{},"📋 خطوات التجربة (من الكتاب)"),ol,h("div",{class:"row noprint",style:{marginTop:"8px",display:"flex",gap:"6px",flexWrap:"wrap"}},h("button",{class:"btn g",onclick:()=>run(app,key,L,X,M)},"↺ إعادة التجربة"),h("button",{class:"btn g",onclick:()=>print()},"🖨️ طباعة التقرير")));
  app.append(h("div",{class:"bench"},stage,side),mats);
  const rows=[];let dcard=null,tb=null,cbox=null;
  if(M&&M.cols){tb=h("tbody");cbox=h("div",{class:"chart"});dcard=h("div",{class:"card"},h("h2",{},"📊 جدول البيانات"),h("div",{style:{overflowX:"auto"}},h("table",{class:"dt"},h("thead",{},h("tr",{},...M.cols.map(c=>h("th",{},c[1])))),tb)),M.chart?cbox:null);app.append(dcard);}
  const obs=h("ol",{class:"obs"});const ocard=h("div",{class:"card",style:{display:"none"}},h("h2",{},"📝 ملاحظاتي"),obs);app.append(ocard);
  const fin=h("div");app.append(fin);
  const qs=X.qs||[];const ans=(M&&M.ans)||[];let qa={};try{qa=JSON.parse(localStorage.getItem("bx.qa."+key))||{};}catch(e){}
  if(qs.length){const qc=h("div",{class:"card"},h("h2",{},"❓ أسئلة التحليل والاستنتاج (من الكتاب)"));qs.forEach((q,i)=>{const ta=h("textarea",{placeholder:"اكتبي إجابتكِ…"});ta.value=qa[i]||"";ta.oninput=()=>{qa[i]=ta.value;try{localStorage.setItem("bx.qa."+key,JSON.stringify(qa));}catch(e){}};
      qc.append(h("div",{class:"q"},h("b",{},(i+1)+") "+q),ta,ans[i]?h("details",{class:"noprint"},h("summary",{},"💡 الإجابة النموذجية"),h("div",{},ans[i])):null));});app.append(qc);}
  app.append(h("div",{class:"credit"},"منصّة العلوم · مدرسة القطرانة الثانوية للبنات · تصميمُ المنصّة وتنفيذُها: نوال بني عطية"));
  /* الحالة */
  const done=new Set();let cur=0,hint=null;
  const paint=()=>{[...ol.children].forEach((li,i)=>{li.className=done.has(i)?"ok":i===cur?"cur":"";});say.querySelector(".n").textContent=cur<steps.length?String(cur+1):"✓";say.querySelector(".t").textContent=hint||(cur<steps.length?steps[cur]:"أحسنتِ! أكملتِ خطوات التجربة. سجّلي ملاحظاتكِ وأجيبي عن الأسئلة.");};
  const A={key,L,X,rows,
    step(i){if(i==null)i=cur;done.add(i);while(done.has(cur))cur++;hint=null;paint();const li=ol.children[i];if(li&&innerWidth>900)li.scrollIntoView({block:"nearest",behavior:"smooth"});if(cur>=steps.length&&!A._fin)A.finish();},
    get cur(){return cur;},is:i=>done.has(i),
    say(t){hint=t;paint();},
    toast,sleep,
    rec(r){rows.push(r);if(!tb)return;tb.querySelectorAll("tr.new").forEach(x=>x.classList.remove("new"));tb.append(h("tr",{class:"new"},...M.cols.map(c=>h("td",{},r[c[0]]??""))));if(M.chart)chart(cbox,rows,M.chart);},
    setRows(rs){rows.length=0;tb.innerHTML="";rs.forEach(r=>A.rec(r));},
    obs(t){ocard.style.display="";obs.append(h("li",{},t));},
    finish(msg){if(A._fin)return;A._fin=1;try{localStorage.setItem("bx.done."+key,"1");}catch(e){}fin.innerHTML="";fin.append(h("div",{class:"done"},"🎉 "+(msg||"أكملتِ التجربة! انتقلي إلى الأسئلة في الأسفل."),M&&M.conclude?h("div",{style:{fontWeight:400,marginTop:"6px"}},"📌 الاستنتاج: "+M.conclude):null));confetti(svg);},
    ui:{clear:()=>{ctl.innerHTML="";},
      group(label,...kids){const g=h("div",{class:"grp"},label?h("b",{},label):null,...kids);ctl.append(g);return g;},
      btn(t,fn,cls){const b=h("button",{class:"btn "+(cls||""),onclick:()=>fn(b)},t);return b;},
      add(...k){ctl.append(...k);},
      choice(label,opts,fn,sel){const bs=[];const g=A.ui.group(label,...opts.map(([v,t])=>{const b=h("button",{class:"btn g"+(v===sel?" on":""),onclick:()=>{bs.forEach(x=>x.classList.remove("on"));b.classList.add("on");fn(v);}},t);bs.push(b);return b;}));g._bs=bs;return g;},
      slider(label,mn,mx,st,v,fn,unit){const val=h("span",{class:"val"},v+(unit?" "+unit:""));const r=h("input",{type:"range",min:mn,max:mx,step:st,value:v,"aria-label":label,oninput:()=>{val.textContent=r.value+(unit?" "+unit:"");fn(+r.value);}});A.ui.group(label,r,val);return r;}}};
  const S=Scene(svg);S.room(M&&M.room);paint();
  if(!M){S.text(400,240,"المحاكاة قيد التحضير…",{"font-size":26});return;}
  try{M.build(S,A);}catch(e){console.error(e);S.text(400,250,"حدث خطأ في تحميل المحاكاة",{"font-size":22,fill:"#c62828"});}}
function confetti(svg){const g=document.createElementNS(NS,"g");svg.append(g);const C=["#7A1F2E","#B8902A","#1d7f8c","#2f8f5b","#c2297a","#f9a825"];const ps=[];for(let i=0;i<60;i++){const r=document.createElementNS(NS,"rect");r.setAttribute("width",8);r.setAttribute("height",12);r.setAttribute("fill",C[i%6]);g.append(r);ps.push({r,x:400+(Math.random()-.5)*200,y:-20-Math.random()*100,vx:(Math.random()-.5)*6,vy:2+Math.random()*3,a:Math.random()*360});}
  let n=0;const f=()=>{n++;ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.06;p.a+=6;p.r.setAttribute("transform","translate("+p.x+" "+p.y+") rotate("+p.a+")");});if(n<180)requestAnimationFrame(f);else g.remove();};requestAnimationFrame(f);}
addEventListener("hashchange",()=>location.reload());
addEventListener("DOMContentLoaded",boot);
function mix(a,b,t){const p=c=>{c=c.replace("#","");if(c.length===3)c=c.split("").map(x=>x+x).join("");return [0,2,4].map(i=>parseInt(c.slice(i,i+2),16));};const A=p(a),B=p(b);t=clamp(t,0,1);return "rgb("+A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join(",")+")";}
return {reg:(k,m)=>{REG[k]=m;},sleep,lerp,clamp,mix};})();
