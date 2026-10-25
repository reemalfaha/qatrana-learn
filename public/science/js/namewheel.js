/* 🎡 دولاب أسماء الطالبات: زرّ عائم في أقسام المعلّمة (حلّ التدريبات، الكتابة على السبورة، التجارب…) يفتح دولاب الأسماء لتتحكّم المعلّمة في نمط المشاركة */
;(function(){const SRC="../teachers/wheel.html?s=sci,bio,chem,phys,earth";
const VIS=()=>{try{return T_OK&&/^#\/(t|book|books|l)(\/|$)/.test(location.hash||"");}catch(e){return document.body.classList.contains("classmode");}};
function init(){if(document.querySelector(".nwb"))return;const st=document.createElement("style");
st.textContent=".nwb{position:fixed;bottom:16px;left:16px;z-index:80;display:none;align-items:center;gap:6px;font-family:inherit;font-weight:700;font-size:17px;border:0;border-radius:999px;padding:12px 20px;min-height:52px;color:#fff;cursor:pointer;background:linear-gradient(135deg,#B8902A,#7A1F2E);box-shadow:0 8px 22px rgba(60,20,30,.35)}"+
".nwb.on{display:inline-flex}.nwb.mini{padding:10px 14px;font-size:15px;min-height:46px;opacity:.9}.nwov{position:fixed;inset:0;z-index:300;background:rgba(30,10,15,.62);display:none;align-items:center;justify-content:center;padding:10px}"+
".nwov .bx{background:#fffaf3;border-radius:20px;width:min(760px,100%);height:min(96vh,940px);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.4)}"+
".nwov .hd{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 12px;background:#7A1F2E;color:#fff;font-weight:700}.nwov .hd button{font:inherit;font-weight:700;border:0;border-radius:10px;padding:6px 14px;min-height:40px;background:#fff;color:#7A1F2E;cursor:pointer}"+
".nwov iframe{flex:1;border:0;width:100%;background:#FBF7F3}@media print{.nwb,.nwov{display:none!important}}";document.head.append(st);
let ov=null;const close=()=>{if(ov)ov.style.display="none";};
const b=document.createElement("button");b.type="button";b.className="nwb";b.textContent="🎡 مَن تجيب؟";b.title="دولاب أسماء الطالبات";
b.addEventListener("click",()=>{if(!ov){ov=document.createElement("div");ov.className="nwov";ov.setAttribute("role","dialog");ov.setAttribute("aria-label","دولاب الأسماء");
  const bx=document.createElement("div");bx.className="bx";const hd=document.createElement("div");hd.className="hd";const t=document.createElement("span");t.textContent="🎡 دولاب الأسماء: مَن تجيب؟";
  const x=document.createElement("button");x.type="button";x.textContent="✖ رجوع";x.addEventListener("click",close);hd.append(t,x);
  const fr=document.createElement("iframe");fr.src=SRC;fr.title="دولاب الأسماء";bx.append(hd,fr);ov.append(bx);
  ov.addEventListener("click",e=>{if(e.target===ov)close();});document.body.append(ov);}
  ov.style.display="flex";});
document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});document.body.append(b);
const upd=()=>{const v=!!VIS();b.classList.toggle("on",v);if(!v)close();};addEventListener("hashchange",()=>setTimeout(upd,50));document.addEventListener("click",()=>setTimeout(upd,80),true);setInterval(upd,1500);upd();}
if(document.body)init();else document.addEventListener("DOMContentLoaded",init);})();
