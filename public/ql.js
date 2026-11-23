/* ربط الطالب برمزه وإرسال نتائجه إلى معلّمه — منصّة القطرانة للتعلّم الرقمي — تصميم وتنفيذ: نوال بني عطية */
(function(){
const K="qatrana.code";const get=()=>{try{return JSON.parse(localStorage.getItem(K)||"null")}catch(e){return null}};
window.QL={info:get,
 async link(code){code=String(code||"").replace(/\D/g,"");if(code.length<6)throw new Error("الرمز غير صحيح");
  const r=await fetch("/api/ql/student?code="+code);const j=await r.json();if(!r.ok)throw new Error(j.error||"الرمز غير صحيح");
  const o={code,school:j.school,grade:j.grade,sec:j.sec};try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}return o},
 unlink(){try{localStorage.removeItem(K)}catch(e){}},
 report(r){const o=get();if(!o||!r||!r.total)return;try{fetch("/api/ql/attempt",{method:"POST",keepalive:true,headers:{"content-type":"application/json"},body:JSON.stringify({code:o.code,title:r.title,subject:r.subject,right:r.right,total:r.total})}).catch(()=>{})}catch(e){}}};
})();
