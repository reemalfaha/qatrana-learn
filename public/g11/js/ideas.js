/* اختبار الأفكار: سؤال واحد على كل فكرة (نوع سؤال) في الدرس، لتغطية كل ما قد يرد في الامتحان */
(function(){
"use strict";
const LVN={1:"سهل",2:"متوسط",3:"صعب"};
function ideas(lid){const U=window.G11U,{el,H,math,LS,go}=U;const app=document.getElementById("app");
 const R=LS.get("g11.ideas",{});
 if(!lid||(!U.LES[lid]&&lid!=="all")){
  app.append(el("section",{class:"hero"},el("div",{},el("h1",{},"🎯 اختبار الأفكار"),el("p",{},"اختبار قصير يضمّ سؤالًا على كل فكرة من أفكار الدرس والكتاب، أي كل نمط من الأسئلة التي يمكن أن ترد في الامتحان الوزاري. صحّحي فورًا، واطّلعي على الحل خطوة بخطوة، وكرّري الاختبار بأرقام جديدة حتى تتقني كل الأفكار."))));
  U.UNITS.forEach(Un=>{const c=el("section",{class:"card unit"},el("h2",{},"الوحدة "+Un.n+": "+Un.title));
   Un.lessons.forEach(L=>{const r=R[L.id];c.append(el("a",{class:"les",href:"#ideas/"+L.id},el("span",{class:"row"},el("span",{class:"n"},String(L.n)),el("span",{},el("b",{},L.title),el("br"),el("span",{class:"mut"},L.gens.length+" فكرة · "+L.gens.length+" سؤالًا"))),el("span",{class:"mut"},r?"آخر نتيجة: "+r.ok+" / "+r.n:"ابدئي ←")))});app.append(c)});
  return}
 const L=U.LES[lid].L;const gens=L.gens.slice().sort((a,b)=>a.lvl-b.lvl);
 const qs=gens.map(g=>{for(let k=0;k<40;k++){const x=g.f();if(x)return{...x,lid,lt:L.title,lvl:g.lvl,gid:g.id,gt:g.t}}return null}).filter(Boolean);
 let n=0,ok=0;const res={};
 const head=el("div",{class:"card"},el("div",{class:"mut"},"اختبار الأفكار · الوحدة "+U.LES[lid].U.n),el("h1",{},L.title),el("p",{class:"mut"},qs.length+" فكرة، لكل فكرة سؤال. أجيبي عن الأسئلة بالترتيب (من السهل إلى الصعب)."),el("div",{class:"row between"},el("span",{class:"chip",id:"isc"},"0 / "+qs.length),el("span",{class:"bar",style:"flex:1;max-width:300px"},el("i",{id:"ibar",style:"width:0%"}))));
 app.append(head);
 qs.forEach((q,i)=>{const w=el("div");w.append(el("div",{class:"mut",style:"margin:14px 4px 0"},"الفكرة "+(i+1)+": "+q.gt));
  w.append(U.qCard(q,{num:i+1,total:qs.length,onAnswer:(k,good)=>{n++;if(good)ok++;res[q.gid]=good;document.getElementById("isc").textContent=ok+" / "+qs.length;document.getElementById("ibar").style.width=Math.round(n/qs.length*100)+"%";if(n===qs.length)done()}}));app.append(w)});
 const tail=el("div");app.append(tail);
 function done(){R[lid]={ok,n:qs.length};LS.set("g11.ideas",R);const weak=qs.filter(q=>!res[q.gid]);
  tail.replaceChildren(el("div",{class:"card"},el("h2",{},"النتيجة: "+ok+" من "+qs.length),
   weak.length?el("div",{},el("p",{},"أفكار تحتاج تدريبًا:"),el("ul",{},...weak.map(q=>el("li",{},q.gt+" ("+LVN[q.lvl]+") ",el("a",{href:"#p/"+lid+"/"+q.lvl},"تدرّبي ←"))))):el("p",{},"أتقنتِ كل أفكار الدرس 🌟"),
   el("div",{class:"row"},el("button",{class:"btn",onclick:()=>go("ideas/"+lid)},"🔄 اختبار جديد بأرقام مختلفة"),el("a",{class:"btn alt",href:"#kb/"+lid},"أسئلة الكتاب لهذا الدرس"),el("a",{class:"btn alt",href:"#ideas"},"دروس أخرى"))));math(tail);tail.scrollIntoView({behavior:"smooth"})}
}
window.G11X=window.G11X||{};window.G11X.ideas=ideas;
})();
