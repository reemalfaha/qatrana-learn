/* منصة رياضيات الأول الثانوي الأكاديمي — الواجهة */
(function(){
"use strict";
const app=document.getElementById("app");
const el=(t,a={},...k)=>{const e=document.createElement(t);for(const x in a){const v=a[x];if(v==null||v===false)continue;if(x==="class")e.className=v;else if(x==="html")e.innerHTML=v;else if(x.startsWith("on"))e.addEventListener(x.slice(2),v);else e.setAttribute(x,v===true?"":v)}k.flat().forEach(c=>{if(c==null||c===false)return;e.append(c.nodeType?c:document.createTextNode(c))});return e};
const H=(t,cls,html)=>el(t,{class:cls,html});
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const math=n=>{try{renderMathInElement(n,{delimiters:[{left:"$",right:"$",display:false}],throwOnError:false})}catch(e){}return n};
const LT=["أ","ب","ج","د"],LVN={1:"سهل",2:"متوسط",3:"صعب"};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
const mulberry=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const seeded=(seed,fn)=>{const r=Math.random;Math.random=mulberry(seed);try{return fn()}finally{Math.random=r}};

/* ===== المحتوى ===== */
const UNITS=G11.units;
const SOON=[{n:2,title:"الاقترانات المثلثية",lessons:["قياس الزاوية بالراديان","الاقترانات المثلثية","تمثيل الاقترانات الجيبية بيانيًّا"]},
 {n:3,title:"النهايات والمشتقّات",lessons:["النهايات والاتّصال","الاشتقاق","القيم العظمى والصغرى","المشتقّة الثانية وتطبيقاتها","تطبيقات القيم القصوى","قاعدة السلسلة"]}];
const LES={};UNITS.forEach(U=>U.lessons.forEach(L=>{LES[L.id]={U,L}}));
const ALL=Object.keys(LES);
const nGens=()=>ALL.reduce((a,k)=>a+LES[k].L.gens.length,0);
function gen(lid,lvl,seed){const L=LES[lid].L;let gs=L.gens.filter(g=>!lvl||g.lvl===lvl);if(!gs.length)gs=L.gens;
 for(let k=0;k<80;k++){const run=()=>{const g=gs[Math.floor(Math.random()*gs.length)];const x=g.f();return x?{...x,lid,lt:L.title,lvl:g.lvl,gid:g.id,gt:g.t}:null};
  const x=seed!=null?seeded(seed+k*7919,run):run();if(x)return x}return null}
function mix(lids,n,dist){/* توزيع على الدروس والمستويات بلا تكرار نص */const out=[],seen=new Set();const lv=[];const d=dist||[.3,.45,.25];
 for(let i=0;i<n;i++){const r=i/n;lv.push(r<d[0]?1:r<d[0]+d[1]?2:3)}
 const ls=[];for(let i=0;i<n;i++)ls.push(lids[i%lids.length]);const L2=shuffle(ls);
 lv.forEach((v,i)=>{for(let g=0;g<20;g++){const x=gen(L2[i],v);if(x&&!seen.has(x.q)){seen.add(x.q);out.push(x);break}}});return shuffle(out)}

/* ===== الإحصاءات ===== */
let ST=LS.get("g11.st",{});
function rec(q,ok){const s=ST[q.lid]=ST[q.lid]||{ok:0,t:0,l:{}};s.t++;if(ok)s.ok++;const l=s.l[q.lvl]=s.l[q.lvl]||[0,0];l[1]++;if(ok)l[0]++;LS.set("g11.st",ST)}
const pct=s=>s&&s.t?Math.round(s.ok/s.t*100):null;

/* ===== التنقّل ===== */
const nav=document.getElementById("nav");document.getElementById("burger").onclick=()=>nav.classList.toggle("open");
let cleanup=null;
function route(){if(cleanup){cleanup();cleanup=null}nav.classList.remove("open");document.body.classList.remove("full");
 const [r,...p]=(location.hash.slice(1)||"home").split("/");
 nav.querySelectorAll("a").forEach(a=>a.setAttribute("aria-current",a.dataset.r===r||(r==="l"&&a.dataset.r==="lessons")||(r==="p"&&a.dataset.r==="bank")?"page":"false"));
 app.replaceChildren();scrollTo({top:0});
 ({home,lessons,l:lesson,bank,p:practice,quick,mock,builder,board,me}[r]||home)(...p);math(app)}
addEventListener("hashchange",route);
const go=h=>{if(location.hash==="#"+h)route();else location.hash=h};

/* ===== الرئيسية ===== */
function home(){const nEx=ALL.reduce((a,k)=>a+LES[k].L.examples.length,0),nCards=ALL.reduce((a,k)=>a+LES[k].L.cards.length,0);
 app.append(el("section",{class:"hero"},el("div",{},el("h1",{},"رياضيات الأول الثانوي الأكاديمي"),
   el("p",{},"دروس مختصرة وبطاقات مراجعة، وبنك أسئلة متجدّد بثلاثة مستويات وحلول خطوة بخطوة، وامتحانات تجريبية بوقت، ومنشئ اختبارات للطباعة، وسبورة للحل بالقلم."),
   el("div",{class:"row"},el("a",{class:"btn",href:"#lessons"},"📘 ابدئي من الدروس"),el("a",{class:"btn gold",href:"#mock"},"⏱ امتحان تجريبي"),el("a",{class:"btn alt",href:"#builder"},"🖨 اكتبي اختبارًا واطبعيه"))),
  el("div",{class:"stats"},...[[UNITS.length+" من 3","وحدات متاحة"],[ALL.length,"دروس متاحة"],[nGens(),"نوعًا من الأسئلة المتجدّدة"],[nCards+nEx,"بطاقة ومثالًا محلولًا"]].map(([b,s])=>el("div",{class:"stat"},el("b",{},String(b)),el("span",{},s))))));
 const tools=[["#bank","🗂","بنك الأسئلة","كل درس بثلاثة مستويات، مع الحل خطوة بخطوة"],["#quick","⚡","اختبار سريع","10 أسئلة منوّعة ونتيجة فورية"],["#mock","⏱","امتحان تجريبي","20 سؤالًا في 40 دقيقة يحاكي الامتحان"],["#builder","🖨","منشئ الاختبارات","اختبار مطبوع A4 بنموذجين وورقة إجابة ومفتاح"],["#board","✏️","السبورة","سؤال في كل صفحة وفراغ للحل بالقلم"],["#me","📊","ملفّي","مستواك في كل درس وسجل امتحاناتك"]];
 app.append(el("div",{class:"grid g3"},...tools.map(([h,ic,t,d])=>el("a",{class:"tool",href:h},el("span",{class:"ic"},ic),el("b",{},t),el("span",{class:"mut"},d)))),el("div",{style:"height:16px"}));
 lessonsList(app)}
function lessonsList(root){UNITS.forEach(U=>{const c=el("section",{class:"card unit"},el("h2",{},"الوحدة "+U.n+": "+U.title),el("p",{class:"mut"},U.en));
  U.lessons.forEach(L=>{const p=pct(ST[L.id]);c.append(el("a",{class:"les",href:"#l/"+L.id},el("span",{class:"row"},el("span",{class:"n"},String(L.n)),el("span",{},el("b",{},L.title),el("br"),el("span",{class:"mut"},L.gens.length+" نوعًا من الأسئلة · "+L.examples.length+" أمثلة محلولة · ص "+L.page))),
   el("span",{class:"row"},p==null?el("span",{class:"mut"},"لم تبدئي"):el("span",{class:"mut"},"إتقان "+p+"%"),el("span",{class:"bar"},el("i",{style:"width:"+(p||0)+"%"})))))});root.append(c)});
 SOON.forEach(S=>root.append(el("section",{class:"card unit soon"},el("h2",{},"الوحدة "+S.n+": "+S.title),el("p",{class:"mut"},"قيد الإعداد: "+S.lessons.join("، ")))))}
function lessons(){app.append(el("h1",{},"الدروس"));lessonsList(app)}

/* ===== صفحة الدرس ===== */
function lesson(id,tab){const o=LES[id];if(!o)return home();const {U,L}=o;tab=tab||"cards";
 app.append(el("div",{class:"card"},el("div",{class:"mut"},"الوحدة "+U.n+" · "+U.title+" · كتاب الطالب ص "+L.page),el("h1",{},"الدرس "+L.n+": "+L.title),el("p",{class:"mut",style:"direction:ltr;text-align:right"},L.en),
  el("p",{},el("b",{},"فكرة الدرس: "),L.idea),el("div",{},el("b",{},"المصطلحات: "),...L.terms.map(t=>el("span",{class:"chip"},t)))));
 const T=[["cards","🃏 البطاقات"],["ex","📝 أمثلة محلولة"],["train","🎯 تدرّبي"]];
 app.append(el("div",{class:"tabs"},...T.map(([k,t])=>el("button",{"aria-pressed":k===tab?"true":"false",onclick:()=>go("l/"+id+"/"+k)},t))));
 if(tab==="cards"){app.append(el("p",{class:"mut"},"اضغطي على البطاقة لقلبها."),el("div",{class:"grid g3"},...L.cards.map(c=>{const f=el("div",{class:"flip",onclick:()=>f.classList.toggle("on")},el("div",{class:"in"},el("div",{class:"f"},el("small",{},c.k),H("b","",c.f)),el("div",{class:"b"},el("small",{},c.k),H("div","",c.b))));return f})))}
 if(tab==="ex"){L.examples.forEach((x,i)=>{const box=el("div",{class:"ex"},el("b",{style:"color:var(--g)"},"مثال "+(i+1)),H("div","q",x.q));let k=0;const steps=el("div");const b=el("button",{class:"btn sm alt",onclick:()=>{if(k<x.s.length){steps.append(math(H("div","st",x.s[k++])));if(k===x.s.length){b.disabled=true;b.textContent="✔ اكتمل الحل"}}}},"الخطوة التالية ▸");
   const all=el("button",{class:"btn sm alt",onclick:()=>{while(k<x.s.length)steps.append(math(H("div","st",x.s[k++])));b.disabled=true;b.textContent="✔ اكتمل الحل"}},"الحل كاملًا");box.append(steps,el("div",{class:"row"},b,all));app.append(box)})}
 if(tab==="train"){const s=ST[L.id];app.append(el("div",{class:"grid g3"},...[1,2,3].map(v=>{const l=s&&s.l[v];return el("a",{class:"tool",href:"#p/"+L.id+"/"+v},el("span",{class:"chip lv"+v},LVN[v]),el("b",{},"تدريب "+LVN[v]),el("span",{class:"mut"},L.gens.filter(g=>g.lvl===v).map(g=>g.t).join("، ")),l?el("div",{class:"mut"},"نتيجتك: "+l[0]+" من "+l[1]):"")})),
   el("div",{class:"row",style:"margin-top:12px"},el("a",{class:"btn",href:"#p/"+L.id+"/0"},"🎲 كل المستويات"),el("a",{class:"btn alt",href:"#board/"+L.id},"✏️ افتحي الدرس على السبورة")))}}

/* ===== عرض سؤال ===== */
function qCard(q,{onAnswer,feedback=true,chosen=null,num,total}={}){const c=el("div",{class:"card"});
 c.append(el("div",{class:"row between"},el("span",{},el("span",{class:"chip"},q.lt),el("span",{class:"chip lv"+q.lvl},LVN[q.lvl])),num?el("span",{class:"mut"},"السؤال "+num+(total?" من "+total:"")):""));
 if(total)c.append(el("div",{class:"prog"},el("i",{style:"width:"+Math.round((num-1)/total*100)+"%"})));
 c.append(H("div","q",q.q));let done=false;const sol=el("div");
 const bs=q.o.map((o,k)=>{const b=el("button",{class:"opt","aria-pressed":chosen===k?"true":"false",onclick:()=>{if(done&&feedback)return;
   if(!feedback){bs.forEach(x=>x.setAttribute("aria-pressed","false"));b.setAttribute("aria-pressed","true");onAnswer&&onAnswer(k);return}
   done=true;const ok=k===q.a;bs.forEach((x,j)=>{if(j===q.a)x.classList.add("ok");else if(j===k)x.classList.add("no")});rec(q,ok);
   sol.append(math(el("div",{class:"sol"},el("div",{class:"fb "+(ok?"ok":"no")},ok?"✔ إجابة صحيحة":"✘ إجابة غير صحيحة، والصحيحة: "+LT[q.a]),el("b",{},"الحل:"),...(q.s||[]).map(s=>H("div","st",s)))));onAnswer&&onAnswer(k,ok)}},
  el("span",{class:"l"},LT[k]),H("span","",o));return b});
 c.append(...bs,sol);return c}

/* ===== بنك الأسئلة ===== */
function bank(){app.append(el("h1",{},"بنك الأسئلة"),el("p",{class:"mut"},"اختاري الدرس والمستوى. الأسئلة تتجدّد في كل مرة، ولكل سؤال حل خطوة بخطوة."));
 UNITS.forEach(U=>{const c=el("section",{class:"card unit"},el("h2",{},"الوحدة "+U.n+": "+U.title));U.lessons.forEach(L=>{const s=ST[L.id];
  c.append(el("div",{class:"les"},el("span",{class:"row"},el("span",{class:"n"},String(L.n)),el("b",{},L.title)),el("span",{class:"row"},...[1,2,3].map(v=>el("a",{class:"btn sm "+(v===2?"gold":v===3?"":"alt"),href:"#p/"+L.id+"/"+v},LVN[v])),el("a",{class:"btn sm alt",href:"#p/"+L.id+"/0"},"الكل"))))});app.append(c)});
 app.append(el("a",{class:"btn",href:"#p/all/0"},"🎲 أسئلة من كل الدروس"))}
function practice(lid,lvl){lvl=+lvl||0;const lids=lid==="all"?ALL:[lid];if(lid!=="all"&&!LES[lid])return bank();let n=0,ok=0;
 const head=el("div",{class:"card row between"},el("div",{},el("h2",{style:"margin:0"},lid==="all"?"أسئلة من كل الدروس":LES[lid].L.title),el("span",{class:"mut"},lvl?"المستوى: "+LVN[lvl]:"كل المستويات")),el("span",{class:"chip",id:"sc"},"0 / 0"));
 const box=el("div");app.append(head,box);
 const next=()=>{const q=gen(lids[Math.floor(Math.random()*lids.length)],lvl);box.replaceChildren(qCard(q,{num:n+1,onAnswer:(k,good)=>{n++;if(good)ok++;document.getElementById("sc").textContent=ok+" / "+n;box.append(el("div",{class:"row"},el("button",{class:"btn",onclick:()=>{next();scrollTo({top:0})}},"السؤال التالي ←"),lid!=="all"?el("a",{class:"btn alt",href:"#l/"+lid+"/cards"},"راجعي البطاقات"):""))}}));math(box)};next()}

/* ===== اختبار سريع ===== */
function pickLessons(root,key){const sel=new Set(LS.get(key,ALL).filter(x=>LES[x]));const w=el("div",{class:"grid g2"});
 UNITS.forEach(U=>U.lessons.forEach(L=>{const cb=el("input",{type:"checkbox",checked:sel.has(L.id)});cb.onchange=()=>{cb.checked?sel.add(L.id):sel.delete(L.id);LS.set(key,[...sel])};w.append(el("label",{class:"ck"},cb,"الدرس "+L.n+": "+L.title))}));root.append(w);return()=>[...sel]}
function quick(){const c=el("div",{class:"card"},el("h1",{},"⚡ اختبار سريع"),el("p",{class:"mut"},"10 أسئلة منوّعة من الدروس المختارة، مع تصحيح فوري وحل لكل سؤال."));const get=pickLessons(c,"g11.qsel");
 c.append(el("button",{class:"btn",onclick:()=>{const l=get();if(!l.length)return;runQuick(mix(l,10))}},"ابدئي الاختبار"));app.append(c)}
function runQuick(list){let i=0,ok=0;const box=el("div");app.replaceChildren(box);
 const show=()=>{if(i>=list.length){const p=Math.round(ok/list.length*100);box.replaceChildren(el("div",{class:"card"},el("h2",{},"النتيجة"),el("div",{class:"big"},p+"%"),el("p",{style:"text-align:center"},ok+" إجابة صحيحة من "+list.length),el("p",{class:"mut",style:"text-align:center"},p>=85?"ممتاز! استمرّي.":p>=60?"جيد، راجعي الأسئلة التي أخطأتِ فيها.":"راجعي بطاقات الدروس ثم أعيدي المحاولة."),el("div",{class:"row",style:"justify-content:center"},el("button",{class:"btn",onclick:()=>go("quick")},"اختبار جديد"),el("a",{class:"btn alt",href:"#me"},"ملفّي"))));return}
  box.replaceChildren(qCard(list[i],{num:i+1,total:list.length,onAnswer:(k,good)=>{if(good)ok++;box.append(el("button",{class:"btn",onclick:()=>{i++;show();scrollTo({top:0})}},i<list.length-1?"التالي ←":"عرض النتيجة"))}}));math(box)};show()}

/* ===== امتحان تجريبي ===== */
function mock(){const c=el("div",{class:"card"},el("h1",{},"⏱ امتحان تجريبي"),el("p",{class:"mut"},"يحاكي الامتحان: أسئلة من الدروس المختارة موزّعة على المستويات (30% سهل، 45% متوسط، 25% صعب)، بلا تصحيح حتى النهاية، ثم نتيجة مفصّلة ومراجعة بالحلول."));
 const get=pickLessons(c,"g11.msel");const n=el("select",{},...[[10,20],[20,40],[30,60]].map(([q,m])=>el("option",{value:q+","+m,selected:q===20},q+" سؤالًا · "+m+" دقيقة")));
 c.append(el("div",{class:"row"},n,el("button",{class:"btn gold",onclick:()=>{const l=get();if(!l.length)return;const [q,m]=n.value.split(",").map(Number);runMock(mix(l,q),m)}},"ابدئي الامتحان")));app.append(c);
 const h=LS.get("g11.hist",[]);if(h.length){const t=el("table",{class:"t"},el("tr",{},...["التاريخ","الأسئلة","النتيجة"].map(x=>el("th",{},x))));h.slice(-8).reverse().forEach(r=>t.append(el("tr",{},el("td",{},r.d),el("td",{},String(r.n)),el("td",{},r.p+"%"))));app.append(el("div",{class:"card"},el("h2",{},"امتحاناتي السابقة"),el("div",{class:"scroll"},t)))}}
function runMock(list,mins){const ans=Array(list.length).fill(null);let i=0;const end=Date.now()+mins*6e4;const box=el("div");app.replaceChildren(box);
 const tm=el("span",{class:"timer"});const iv=setInterval(()=>{const l=end-Date.now();if(l<=0){finish();return}tm.textContent="⏱ "+Math.floor(l/6e4)+":"+String(Math.floor(l%6e4/1000)).padStart(2,"0");tm.classList.toggle("low",l<5*6e4)},500);cleanup=()=>clearInterval(iv);
 const grid=()=>el("div",{class:"row",style:"gap:4px"},...list.map((_,k)=>el("button",{class:"btn sm "+(k===i?"":ans[k]!=null?"gold":"alt"),style:"min-width:40px",onclick:()=>{i=k;show()}},String(k+1))));
 const show=()=>{box.replaceChildren(el("div",{class:"card row between"},el("b",{},"امتحان تجريبي"),tm,el("button",{class:"btn sm",onclick:function(){const left=ans.filter(a=>a==null).length;if(left&&!this.dataset.ok){this.dataset.ok=1;this.textContent="بقي "+left+" — اضغطي للتسليم";return}finish()}},"تسليم")),
   qCard(list[i],{feedback:false,chosen:ans[i],num:i+1,total:list.length,onAnswer:k=>{ans[i]=k;setTimeout(()=>{if(i<list.length-1){i++;show()}else show()},250)}}),
   el("div",{class:"row between"},el("button",{class:"btn alt",disabled:i===0,onclick:()=>{i--;show()}},"→ السابق"),el("button",{class:"btn alt",disabled:i===list.length-1,onclick:()=>{i++;show()}},"التالي ←")),el("div",{class:"card"},el("div",{class:"mut"},"انتقلي لأي سؤال:"),grid()));math(box)};
 const finish=()=>{clearInterval(iv);cleanup=null;let ok=0;const by={};list.forEach((q,k)=>{const g=ans[k]===q.a;if(g)ok++;rec(q,g);const b=by[q.lid]=by[q.lid]||{t:q.lt,ok:0,n:0};b.n++;if(g)b.ok++});
  const p=Math.round(ok/list.length*100),d=new Date();const h=LS.get("g11.hist",[]);h.push({d:d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear(),n:list.length,p});LS.set("g11.hist",h.slice(-30));
  const t=el("table",{class:"t"},el("tr",{},...["الدرس","الصحيح","من","النسبة"].map(x=>el("th",{},x))));Object.values(by).forEach(b=>t.append(el("tr",{},el("td",{},b.t),el("td",{},String(b.ok)),el("td",{},String(b.n)),el("td",{},Math.round(b.ok/b.n*100)+"%"))));
  box.replaceChildren(el("div",{class:"card"},el("h2",{},"نتيجة الامتحان التجريبي"),el("div",{class:"big"},p+"%"),el("p",{style:"text-align:center"},ok+" من "+list.length),el("div",{class:"scroll"},t),el("div",{class:"row",style:"margin-top:10px"},el("button",{class:"btn",onclick:()=>go("mock")},"امتحان جديد"),el("a",{class:"btn alt",href:"#me"},"ملفّي"))),el("h2",{},"مراجعة الإجابات"));
  list.forEach((q,k)=>{const c=el("div",{class:"card"},el("div",{class:"row between"},el("span",{class:"chip"},q.lt),el("b",{class:ans[k]===q.a?"fb ok":"fb no"},ans[k]===q.a?"✔":"✘")),H("div","q",(k+1)+") "+q.q));
   q.o.forEach((o,j)=>{if(j!==q.a&&j!==ans[k])return;c.append(el("div",{class:"opt "+(j===q.a?"ok":"no")},el("span",{class:"l"},LT[j]),H("span","",o)))});if(ans[k]==null)c.append(el("p",{class:"mut"},"لم تُجيبي."));
   c.append(el("div",{class:"sol"},el("b",{},"الحل:"),...(q.s||[]).map(s=>H("div","st",s))));box.append(c)});math(box);scrollTo({top:0})};show()}

/* ===== منشئ الاختبارات ===== */
function builder(){const P=LS.get("g11.bld",{school:"مدرسة القطرانة الثانوية للبنات",dir:"مديرية التربية والتعليم",title:"اختبار قصير",teacher:"",date:"",time:"40 دقيقة",mode:"mcq",ver:2,cnt:{}});const save=()=>LS.set("g11.bld",P);
 const c=el("div",{class:"card"},el("h1",{},"🖨 منشئ الاختبارات"),el("p",{class:"mut"},"اختاري الدروس وعدد الأسئلة من كل مستوى، ثم «ولّدي الاختبار». تستطيعين تبديل أي سؤال قبل الطباعة. يُطبع على A4 مع ورقة إجابة ومفتاح بالحلول."));
 const inp=(k,ph)=>{const i=el("input",{type:"text",placeholder:ph,value:P[k]||""});i.oninput=()=>{P[k]=i.value;save()};return el("label",{},el("span",{class:"mut"},ph),el("br"),i)};
 c.append(el("div",{class:"grid g3"},inp("dir","المديرية"),inp("school","المدرسة"),inp("title","عنوان الاختبار"),inp("teacher","اسم المعلمة"),inp("date","التاريخ"),inp("time","مدة الاختبار")));
 const mode=el("select",{},el("option",{value:"mcq"},"اختيار من متعدد"),el("option",{value:"open"},"أسئلة مقالية (بلا خيارات) مع فراغ للحل"));mode.value=P.mode;mode.onchange=()=>{P.mode=mode.value;save()};
 const ver=el("select",{},el("option",{value:1},"نموذج واحد"),el("option",{value:2},"نموذجان (أ، ب) بترتيب مختلف"));ver.value=P.ver;ver.onchange=()=>{P.ver=+ver.value;save()};
 c.append(el("div",{class:"row",style:"margin:10px 0"},mode,ver));
 const t=el("table",{class:"t"},el("tr",{},el("th",{},"الدرس"),...[1,2,3].map(v=>el("th",{},LVN[v]))));
 UNITS.forEach(U=>U.lessons.forEach(L=>{const tr=el("tr",{},el("td",{},"الوحدة "+U.n+" · "+L.title));[1,2,3].forEach(v=>{const k=L.id+":"+v;const i=el("input",{type:"number",min:0,max:15,value:P.cnt[k]??(v===2?2:1),style:"width:70px"});i.oninput=()=>{P.cnt[k]=Math.max(0,Math.min(15,+i.value||0));save()};tr.append(el("td",{},i))});t.append(tr)}));
 c.append(el("div",{class:"scroll"},t),el("div",{class:"row",style:"margin-top:12px"},el("button",{class:"btn gold",onclick:()=>{build();out.scrollIntoView({behavior:"smooth"})}},"✨ ولّدي الاختبار")));
 const out=el("div");app.append(c,out);let Q=[];
 const build=()=>{Q=[];const seen=new Set();UNITS.forEach(U=>U.lessons.forEach(L=>[1,2,3].forEach(v=>{const n=P.cnt[L.id+":"+v]??(v===2?2:1);for(let i=0;i<n;i++){for(let g=0;g<20;g++){const q=gen(L.id,v);if(q&&!seen.has(q.q)){seen.add(q.q);Q.push(q);break}}}})));draw()};
 const draw=()=>{out.replaceChildren();if(!Q.length){out.append(el("p",{class:"card"},"اختاري عدد أسئلة أكبر من صفر."));return}
  out.append(el("div",{class:"card row between"},el("b",{},"الاختبار: "+Q.length+" سؤالًا"),el("div",{class:"row"},el("button",{class:"btn",onclick:()=>printExam(Q,P)},"🖨 طباعة"),el("button",{class:"btn alt",onclick:build},"🔄 توليد من جديد"))));
  Q.forEach((q,k)=>{const cc=el("div",{class:"card"},el("div",{class:"row between"},el("span",{},el("b",{},"السؤال "+(k+1)+" "),el("span",{class:"chip"},q.lt),el("span",{class:"chip lv"+q.lvl},LVN[q.lvl])),el("button",{class:"btn sm alt",onclick:()=>{for(let g=0;g<20;g++){const n=gen(q.lid,q.lvl);if(n&&n.q!==q.q){Q[k]=n;break}}draw()}},"🔄 بدّلي السؤال")),H("div","q",q.q));
   if(P.mode==="mcq")cc.append(el("div",{class:"grid g2"},...q.o.map((o,j)=>el("div",{class:j===q.a?"opt ok":"opt"},el("span",{class:"l"},LT[j]),H("span","",o)))));else cc.append(el("div",{class:"sol"},el("b",{},"الإجابة: "),H("span","",q.o[q.a])));out.append(cc)});math(out)};
 if(Object.keys(P.cnt).length===0){}}
function printExam(Q,P){const root=document.getElementById("prt");root.replaceChildren();const vers=P.ver===2?[["أ",Q],["ب",shuffle(Q).map(q=>{const idx=shuffle([0,1,2,3]);return{...q,o:idx.map(i=>q.o[i]),a:idx.indexOf(q.a)}})]]:[["",Q]];
 const head=(v,sub)=>el("div",{class:"sh"},el("div",{class:"l"},"المملكة الأردنية الهاشمية",el("br"),"وزارة التربية والتعليم",el("br"),P.dir||""),el("div",{class:"c"},el("h1",{},P.title||"اختبار"),el("div",{},"الرياضيات · الصف الحادي عشر الأكاديمي"+(v?" · نموذج ("+v+")":"")),sub?el("b",{},sub):""),el("div",{class:"l",style:"text-align:left"},P.school||"",el("br"),"التاريخ: "+(P.date||"……/……/……"),el("br"),"المدة: "+(P.time||"")));
 const foot=()=>el("div",{class:"pfoot"},"المعلمة: "+(P.teacher||"……………")+" · منصة رياضيات الأول الثانوي");
 vers.forEach(([v,L])=>{const s=el("div",{class:"sheet"},head(v),el("div",{class:"info"},el("span",{},"اسم الطالبة: ……………………………………"),el("span",{},"الشعبة: ………"),el("span",{},"العلامة: ……… / "+L.length)));
  if(P.mode==="mcq")s.append(el("p",{style:"margin:0 0 6px"},el("b",{},"اختاري رمز الإجابة الصحيحة في كل مما يأتي، ثم ظلّليه في ورقة الإجابة:")));
  L.forEach((q,k)=>{const long=q.o.some(o=>o.replace(/\$[^$]*\$/g,"xxxxxx").length>26||/cases|frac/.test(o));const d=el("div",{class:"pq"},H("div","",el("b",{},(k+1)+") ").outerHTML+q.q));
   if(P.mode==="mcq")d.append(el("div",{class:"ops"+(long?(q.o.some(o=>/cases/.test(o))?" two":" two"):"")},...q.o.map((o,j)=>H("div","","<b>"+LT[j]+")</b> "+o))));else d.append(el("div",{class:"wsp"}));s.append(d)});
  s.append(foot());root.append(s);
  if(P.mode==="mcq"){const b=el("div",{class:"sheet"},head(v,"ورقة الإجابة"),el("div",{class:"info"},el("span",{},"اسم الطالبة: ……………………………………"),el("span",{},"الشعبة: ………")),el("div",{class:"bub"},...L.map((q,k)=>el("div",{},el("b",{},(k+1)+") "),...LT.map(x=>el("i",{},x))))),foot());root.append(b)}
  const key=el("div",{class:"sheet"},head(v,"مفتاح الإجابة والحلول (للمعلمة)"));const t=el("table",{class:"key"},el("tr",{},el("th",{},"رقم"),el("th",{},"الإجابة"),el("th",{},"الدرس"),el("th",{},"الحل المختصر")));
  L.forEach((q,k)=>t.append(el("tr",{},el("td",{},String(k+1)),H("td","",P.mode==="mcq"?"<b>"+LT[q.a]+"</b>":q.o[q.a]),el("td",{},q.lt),H("td","",(q.s||[]).slice(-2).join(" ")))));key.append(t,foot());root.append(key)});
 math(root);setTimeout(()=>window.print(),300)}

/* ===== السبورة: كتاب الأسئلة بالقلم ===== */
function board(lid,mode){lid=LES[lid]?lid:ALL[0];mode=mode||"1";const B=LS.get("g11.brd",{gap:8,fs:24,pw:100});
 const {L}=LES[lid];const N=mode==="ex"?L.examples.length:30;let p=Math.min(LS.get("g11.bp:"+lid+mode,0),N-1);
 const COL=[["#1f4fd1","أزرق"],["#c62828","أحمر"],["#1b7a3c","أخضر"],["#111","أسود"],["#e67e00","برتقالي"]];let tool="move",color=COL[0][0],size=4,data,cv,ctx,undo=[];
 const ls=el("select",{"aria-label":"الدرس",onchange:e=>go("board/"+e.target.value+"/"+mode)},...ALL.map(k=>el("option",{value:k,selected:k===lid},"الدرس "+LES[k].L.n+": "+LES[k].L.title)));
 const ms=el("select",{"aria-label":"المحتوى",onchange:e=>go("board/"+lid+"/"+e.target.value)},...[["ex","أمثلة محلولة"],["1","أسئلة سهلة"],["2","أسئلة متوسطة"],["3","أسئلة صعبة"]].map(([v,t])=>el("option",{value:v,selected:v===mode},t)));
 const TB=(id,ic,t)=>el("button",{class:"tb","data-t":id,title:t,onclick:()=>{tool=id;mark()}},ic,el("small",{},t));const BT=(ic,t,f)=>el("button",{class:"tb",title:t,onclick:f},ic,el("small",{},t));
 const lbl=el("b",{style:"color:var(--m)"});const page=el("div",{class:"page"});const stage=el("div",{class:"stage",style:"--pw:"+B.pw+"%"},page);
 const sv=()=>LS.set("g11.brd",B);
 const bar=el("div",{class:"bbar"},el("div",{class:"row"},ls,ms,el("button",{class:"btn sm alt",onclick:()=>to(p-1)},"▶"),lbl,el("button",{class:"btn sm alt",onclick:()=>to(p+1)},"◀")),
  el("div",{class:"row"},TB("move","✋","تصفّح"),TB("pen","✏️","قلم"),TB("hl","🖍️","تظليل"),TB("erase","🧽","ممحاة"),...COL.map(([c,n])=>el("button",{class:"sw",style:"background:"+c,title:n,"data-c":c,onclick:()=>{color=c;if(tool!=="pen"&&tool!=="hl")tool="pen";mark()}})),
   el("select",{"aria-label":"السماكة",onchange:e=>size=+e.target.value},...[[2,"رفيع"],[4,"وسط"],[7,"عريض"]].map(([v,t])=>el("option",{value:v,selected:v===4},t))),
   BT("↶","تراجع",()=>{const u=undo.pop();if(!u)return;if(u.add)data.s=data.s.filter(s=>s!==u.add);if(u.del)data.s.push(u.del);redraw();save()}),BT("🗑️","مسح",function(){if(!this.dataset.ok){this.dataset.ok=1;this.lastChild.textContent="مرة ثانية";setTimeout(()=>{delete this.dataset.ok;this.lastChild.textContent="مسح"},2500);return}data={s:[]};save();redraw()}),
   BT("💡","الإجابة",()=>{const on=page.classList.toggle("show");page.querySelectorAll(".o.rk").forEach(o=>o.classList.toggle("right",on))}),
   BT("أ+","تكبير",()=>{B.fs=Math.min(48,B.fs+2);sv();render()}),BT("أ−","تصغير",()=>{B.fs=Math.max(14,B.fs-2);sv();render()}),
   el("select",{"aria-label":"الفراغ",onchange:e=>{B.gap=+e.target.value;sv();render()}},...[[4,"فراغ صغير"],[8,"فراغ متوسط"],[13,"فراغ كبير"]].map(([v,t])=>el("option",{value:v,selected:v===B.gap},t))),
   el("select",{"aria-label":"حجم الصفحة",onchange:e=>{B.pw=+e.target.value;sv();stage.style.setProperty("--pw",B.pw+"%");fit()}},...[[60,"صفحة صغيرة"],[80,"متوسطة"],[100,"كاملة"]].map(([v,t])=>el("option",{value:v,selected:v===B.pw},t))),
   BT("⛶","شاشة كاملة",()=>{const on=document.body.classList.toggle("full");try{on?document.documentElement.requestFullscreen():document.fullscreenElement&&document.exitFullscreen()}catch(e){}setTimeout(fit,250)})));
 app.append(bar,stage,el("div",{class:"row between"},el("button",{class:"btn alt",onclick:()=>to(p-1)},"▶ السابقة"),el("button",{class:"btn alt",onclick:()=>to(p+1)},"التالية ◀")));
 const key=()=>"g11.ink:"+lid+":"+mode+":"+p;
 function mark(){bar.querySelectorAll(".tb[data-t]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.t===tool));bar.querySelectorAll(".sw").forEach(b=>b.setAttribute("aria-pressed",b.dataset.c===color&&tool!=="move"&&tool!=="erase"));if(cv)cv.style.pointerEvents=tool==="move"?"none":"auto"}
 function to(n){n=Math.max(0,Math.min(N-1,n));if(n===p)return;p=n;render();scrollTo({top:0})}
 const gap=t=>el("div",{class:"gap",style:"height:"+(B.gap*1.6)+"em"},el("span",{},t||"مساحة الحل"));
 function render(){LS.set("g11.bp:"+lid+mode,p);data=LS.get(key(),{s:[]});undo=[];page.className="page";page.style.setProperty("--fs",B.fs+"px");page.replaceChildren();
  lbl.textContent=(mode==="ex"?"مثال ":"سؤال ")+(p+1)+" من "+N;
  page.append(el("div",{class:"ph"},el("span",{},"الرياضيات · الأول الثانوي · "+L.title),el("span",{},mode==="ex"?"مثال محلول":"مستوى "+LVN[mode])));
  if(mode==="ex"){const x=L.examples[p];page.append(H("div","qt","<span style='color:var(--g)'>مثال "+(p+1)+":</span> "+x.q),gap("مساحة الحل"),el("div",{class:"ans"},el("b",{},"الحل:"),...x.s.map(s=>H("div","",s))))}
  else{const q=gen(lid,+mode,hash(lid+":"+mode+":"+p));page.append(H("div","qt","<span style='color:var(--g)'>"+(p+1)+")</span> "+q.q));
   const long=q.o.some(o=>/cases|frac/.test(o)||o.length>40);page.append(el("div",{class:"ops"+(long?" one":"")},...q.o.map((o,j)=>el("div",{class:"o"+(j===q.a?" rk":"")},el("b",{style:"color:var(--m)"},LT[j]+") "),H("span","",o)))),gap(),el("div",{class:"ans"},el("b",{},"الإجابة: "+LT[q.a]+" · الحل: "),...(q.s||[]).map(s=>H("div","",s))))}
  math(page);cv=el("canvas",{class:"ink"});page.append(cv);ctx=cv.getContext("2d");bind();mark();requestAnimationFrame(fit)}
 const W=()=>page.clientWidth||1;
 function fit(){if(!cv)return;const r=page.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);cv.width=Math.round(r.width*dpr);cv.height=Math.round(page.scrollHeight*dpr);cv.style.width=r.width+"px";cv.style.height=page.scrollHeight+"px";ctx.setTransform(dpr,0,0,dpr,0,0);redraw()}
 function sty(s){const k=W()/1000;if(s.t==="h"){ctx.globalAlpha=.3;ctx.lineWidth=s.w*5*k;ctx.lineCap="butt"}else{ctx.globalAlpha=1;ctx.lineWidth=Math.max(1.5,s.w*k*1.8);ctx.lineCap="round"}ctx.lineJoin="round";ctx.strokeStyle=s.c}
 function stroke(s){const w=W();ctx.save();sty(s);ctx.beginPath();s.p.forEach((q,i)=>i?ctx.lineTo(q[0]*w,q[1]*w):ctx.moveTo(q[0]*w,q[1]*w));if(s.p.length===1)ctx.lineTo(s.p[0][0]*w+.1,s.p[0][1]*w);ctx.stroke();ctx.restore()}
 function redraw(){if(!ctx)return;ctx.clearRect(0,0,cv.width,cv.height);data.s.forEach(stroke)}
 function save(){LS.set(key(),data)}
 function bind(){let cur=null;const pos=e=>{const r=cv.getBoundingClientRect(),w=W();return[+((e.clientX-r.left)/w).toFixed(4),+((e.clientY-r.top)/w).toFixed(4)]};
  const er=q=>{let hit=false;const keep=[];data.s.forEach(s=>{if(s.p.some(a=>Math.hypot(a[0]-q[0],a[1]-q[1])<.014)){hit=true;undo.push({del:s})}else keep.push(s)});if(hit){data.s=keep;redraw();save()}};
  cv.addEventListener("pointerdown",e=>{if(tool==="move")return;e.preventDefault();cv.setPointerCapture(e.pointerId);const q=pos(e);if(tool==="erase"){er(q);cur={erase:1};return}cur={t:tool==="hl"?"h":"p",c:color,w:size,p:[q]};data.s.push(cur);stroke(cur)});
  cv.addEventListener("pointermove",e=>{if(!cur)return;if(cur.erase){er(pos(e));return}((e.getCoalescedEvents&&e.getCoalescedEvents())||[e]).forEach(ev=>{const m=pos(ev),l=cur.p[cur.p.length-1];if(Math.abs(m[0]-l[0])+Math.abs(m[1]-l[1])>.0015)cur.p.push(m)});redraw()});
  const end=()=>{if(!cur)return;if(!cur.erase)undo.push({add:cur});cur=null;save()};cv.addEventListener("pointerup",end);cv.addEventListener("pointercancel",end)}
 const kh=e=>{if(/INPUT|SELECT/.test(e.target.tagName))return;if(e.key==="ArrowLeft")to(p+1);if(e.key==="ArrowRight")to(p-1)};document.addEventListener("keydown",kh);addEventListener("resize",fit);
 cleanup=()=>{document.removeEventListener("keydown",kh);removeEventListener("resize",fit)};render()}

/* ===== ملفّي ===== */
function me(){app.append(el("h1",{},"📊 ملفّي"),el("p",{class:"mut"},"تُحفظ نتائجك على هذا الجهاز فقط."));
 const t=el("table",{class:"t"},el("tr",{},...["الدرس","أسئلة","الإتقان","سهل","متوسط","صعب","الحكم"].map(x=>el("th",{},x))));
 ALL.forEach(k=>{const s=ST[k],L=LES[k].L;const p=pct(s);const lv=v=>{const l=s&&s.l[v];return l?l[0]+"/"+l[1]:"—"};t.append(el("tr",{},el("td",{},el("a",{href:"#l/"+k},L.title)),el("td",{},s?String(s.t):"0"),el("td",{},p==null?"—":p+"%"),el("td",{},lv(1)),el("td",{},lv(2)),el("td",{},lv(3)),el("td",{style:"font-weight:700;color:"+(p==null?"var(--mut)":p>=80?"var(--ok)":p>=55?"#8a6100":"var(--no)")},p==null?"لم تبدئي":p>=80?"متقَن":p>=55?"يحتاج تدريبًا":"يحتاج مراجعة")))});
 app.append(el("div",{class:"card scroll"},t));
 const weak=ALL.filter(k=>{const p=pct(ST[k]);return p!=null&&p<55});if(weak.length)app.append(el("div",{class:"card"},el("h2",{},"اقتراح"),el("p",{},"ابدئي بمراجعة: "),...weak.map(k=>el("a",{class:"btn sm alt",href:"#l/"+k+"/cards",style:"margin:3px"},LES[k].L.title))));
 const h=LS.get("g11.hist",[]);if(h.length){const tt=el("table",{class:"t"},el("tr",{},...["التاريخ","الأسئلة","النتيجة"].map(x=>el("th",{},x))));h.slice().reverse().forEach(r=>tt.append(el("tr",{},el("td",{},r.d),el("td",{},String(r.n)),el("td",{},r.p+"%"))));app.append(el("div",{class:"card"},el("h2",{},"الامتحانات التجريبية"),el("div",{class:"scroll"},tt)))}
 app.append(el("button",{class:"btn alt",onclick:function(){if(!this.dataset.ok){this.dataset.ok=1;this.textContent="اضغطي مرة ثانية لمسح كل النتائج";return}ST={};LS.set("g11.st",{});LS.set("g11.hist",[]);route()}},"مسح نتائجي"))}

route();
})();
