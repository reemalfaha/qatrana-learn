/* مخاطبة الطالب أو الطالبة — منصّة القطرانة للتعلّم الرقمي — تصميم وتنفيذ: نوال بني عطية
   يقرأ الاختيار من localStorage("qatrana.gender"): "m" للطالب، و"f" (الافتراضي) للطالبة.
   عند اختيار «طالب» يحوّل صيغ المؤنث في النصوص الظاهرة والرسوم إلى صيغ المذكّر. */
(function(){
let G="f";try{G=localStorage.getItem("qatrana.gender")||"f"}catch(e){}
window.QG={get:()=>G,set(v){try{localStorage.setItem("qatrana.gender",v)}catch(e){}location.reload()}};
if(G!=="m")return;
// أفعال أمر تُحذف ياؤها فقط
const STRIP="اضغطي ضعي اسحبي سجّلي سجلي قارني لاحظي اكتبي كرّري كرري احسبي توقّعي توقعي أضيفي جرّبي جربي راقبي غيّري ثبّتي حدّدي حددي ارسمي حرّكي حركي دوّني افتحي احذري اذكري استنتجي اختبري صِلي صلي ارفعي استخدمي امسحي علّلي عللي اجعلي شغّلي شاهدي راجعي صنّفي ألصقي قرّبي تعاملي افحصي أسقطي ابحثي اغمسي اربطي صمّمي تفحّصي اضبطي عرّفي عُدّي عدّي اعرضي اكتشفي نظّفي مثّلي حاولي احذفي حضّري قصّي أخرجي رقّمي انتقلي رتّبي اتّبعي اصعدي اغسلي غطّي أغلقي طابقي بدّلي أظهري سخّني انظري انقلي صفّي تحقّقي تحققي حلّلي تأكدي تأكّدي اكشفي كوّني استعملي استعمِلي أذيبي اصنعي اسكبي نظّمي اعملي قيّمي اقترحي أطلقي احفظي انزعي ناقشي دوّري أفلتي تدرّبي قدّري كبّري انتظري ازرعي علّقي شاركي اطلبي تذكّري خذي لفّي تابعي أشعلي تأمّلي جفّفي ادرسي لوّني اتركي أحضري افصلي اجمعي أدخلي ضاعفي أبعدي أرسلي اسمحي صغّري كوّري ابسطي شكّلي اغرسي مرّري ركّبي قسّمي تواصلي تتبّعي احصلي استكشفي نفّذي تخلّصي اثقبي ادفعي بلّلي اغمري طبّقي أعدّي اقطعي زاوجي جهّزي أنجزي أنزلي ادخلي خصّصي دحرجي تجنّبي استبدلي سلّطي ادعمي بيّني لخّصي قفي شدّي رشّي توقّفي عرّضي عدّلي اعجني هزّي اضربي اقلبي انسخي حدّثي اسألي صوّري علّمي اخفضي استمرّي اقتربي ميّزي اصهري صبّي فكّكي اقسمي أنقصي أفرغي اهرسي ادهني افردي بخّري أحكمي استخلصي أخبري تخيّلي ارصدي توجّهي احككي انزلي اعبري قللي قلّلي قفزي فسّري حلّي أكملي اكملي ابحثي انتبهي تعرّفي تعرفي اقرأي ادخلي ارجعي عودي تفضّلي استمعي اسمعي اكتشفي تدربي ابدأي انطلقي اربحي أجيبي اشرحي ابني لاحظي صحّحي صححي قرّري قرري اختصري أعطي اشتري ابقي"
 .split(/\s+/);
const MAP={اختاري:"اختر",أجيبي:"أجب",ابدئي:"ابدأ",ابدأي:"ابدأ",اقرئي:"اقرأ",اقرأي:"اقرأ",املئي:"املأ",أعيدي:"أعد",قيسي:"قِس",زني:"زِن","زِني":"زِن",زيدي:"زِد",جدي:"جِد",أجدي:"أجد",
 أنشئي:"أنشئ",عبّئي:"عبّئ",صوغي:"صُغ",أديري:"أدر",استعيني:"استعن",أزيلي:"أزل",أعطي:"أعطِ",اطوي:"اطوِ",اسقي:"اسقِ",اروي:"اروِ",أجري:"أجرِ",أضيئي:"أضئ",اثني:"اثنِ",اجتازي:"اجتز",أوجدي:"أوجد",
 ارتدي:"ارتدِ",ابني:"ابنِ",أصيبي:"أصب",اشتري:"اشترِ",ابقي:"ابقَ",انتبهي:"انتبه",
 تريدين:"تريد",تتوقّعين:"تتوقّع",تتوقعين:"تتوقّع",تحتاجين:"تحتاج",تستنتجين:"تستنتج",تعرضين:"تعرض",تحكمين:"تحكم",تدفعين:"تدفع",تحصلين:"تحصل",ستحصلين:"ستحصل",ستعملين:"ستعمل",تثبتين:"تثبت",تشعرين:"تشعر",تكونين:"تكون",تستطيعين:"تستطيع",تعرفين:"تعرف",تختارين:"تختار",تجيبين:"تجيب",تحتاجينه:"تحتاجه",تريدينه:"تريده",
 تسجّلي:"تسجّل",تتذوّقي:"تتذوّق",تلمسي:"تلمس",تجرّبي:"تجرّب",تستنشقي:"تستنشق",تشدّي:"تشدّ",تسمعي:"تسمع",تركضي:"تركض",تأكلي:"تأكل",تفتحي:"تفتح",تتركي:"تترك",تستعملي:"تستعمل",تسخّني:"تسخّن",تنظري:"تنظر",تكثري:"تكثر",تسيري:"تسير",تغيّري:"تغيّر",
 لتضعي:"لتضع",لتستنتجي:"لتستنتج",لتعرفي:"لتعرف",لتري:"لترى",لتحصلي:"لتحصل",لتبدئي:"لتبدأ",لتختبري:"لتختبر",لتصبّي:"لتصبّ",لتصنعي:"لتصنع",لتجمعي:"لتجمع",لتنقلي:"لتنقل",لترسمي:"لترسم",
 طالبة:"طالب",الطالبة:"الطالب",طالبات:"طلبة",الطالبات:"الطلبة",طالبتي:"طالبي",عزيزتي:"عزيزي",زميلاتي:"زملائي",زميلاتك:"زملائك","زميلاتكِ":"زملائك",زميلتي:"زميلي",
 معلّمتي:"معلّمي",لمعلّمتي:"لمعلّمي","معلّمتكِ":"معلّمك",معلّمتك:"معلّمك","لمعلّمتكِ":"لمعلّمك",بطلة:"بطل",عودي:"عُد",
 "أنتِ":"أنتَ","لكِ":"لكَ","بكِ":"بكَ","عليكِ":"عليكَ"};
STRIP.forEach(w=>{if(w&&!MAP[w])MAP[w]=w.slice(0,-1)});
const keys=Object.keys(MAP).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));
const AR="ء-يً-ْٰ";
const RE=new RegExp("(^|[^"+AR+"])([وف]?)("+keys.join("|")+")(?=$|[^"+AR+"])","g");
const RE_T=new RegExp("([\u0621-\u064A][\u0621-\u064A\u064B-\u0651]+ت)\u0650(?=$|[^"+AR+"])","g"); // أحسنتِ ← أحسنتَ
const RE_K=new RegExp("([\u0621-\u064A][\u0621-\u064A\u064B-\u0651]+ك)\u0650(?=$|[^"+AR+"])","g"); // إجابتكِ ← إجابتكَ
function conv(s){if(!s||!/[ء-ي]/.test(s))return s;return s.replace(RE,(m,a,p,w)=>a+p+MAP[w]).replace(RE_T,"$1َ").replace(RE_K,"$1")}
window.QG.conv=conv;
const SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,CODE:1,PRE:1,NOSCRIPT:1};
function fix(root){if(!root)return;if(root.nodeType===3){const v=conv(root.nodeValue);if(v!==root.nodeValue)root.nodeValue=v;return}
 if(root.nodeType!==1||SKIP[root.tagName]||root.isContentEditable)return;
 ["placeholder","title","aria-label","alt"].forEach(a=>{const v=root.getAttribute&&root.getAttribute(a);if(v){const n=conv(v);if(n!==v)root.setAttribute(a,n)}});
 if(root.tagName==="INPUT"&&/^(button|submit)$/i.test(root.type)&&root.value)root.value=conv(root.value);
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,{acceptNode:n=>n.nodeType===1&&(SKIP[n.tagName]||n.isContentEditable)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
 let n;while((n=w.nextNode())){if(n.nodeType===3){const v=conv(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v}else["placeholder","title","aria-label","alt"].forEach(a=>{const v=n.getAttribute(a);if(v){const x=conv(v);if(x!==v)n.setAttribute(a,x)}})}}
// الرسوم على اللوحات (المختبر الافتراضي وغيره)
const P=window.CanvasRenderingContext2D&&CanvasRenderingContext2D.prototype;
if(P){const f=P.fillText,s=P.strokeText,m=P.measureText;P.fillText=function(t,...a){return f.call(this,conv(String(t)),...a)};P.strokeText=function(t,...a){return s.call(this,conv(String(t)),...a)};P.measureText=function(t){return m.call(this,conv(String(t)))}}
const _alert=window.alert;window.alert=t=>_alert(conv(String(t)));
function start(){fix(document.body);document.title=conv(document.title);
 new MutationObserver(ms=>{for(const m of ms){if(m.type==="characterData")fix(m.target);else m.addedNodes.forEach(fix)}}).observe(document.body,{childList:true,subtree:true,characterData:true})}
if(document.body)start();else document.addEventListener("DOMContentLoaded",start);
})();
