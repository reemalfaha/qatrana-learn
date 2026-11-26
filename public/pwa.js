/* تثبيت المنصة كتطبيق على الجوال — منصة القطرانة للتعلّم الرقمي — تصميم وتنفيذ: نوال بني عطية */
(function(){
if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
if (standalone) return;
const SHOW_ON = ["/", "/index.html", "/teachers/", "/imtihani/"];
if (!SHOW_ON.includes(location.pathname)) return;
let dismissed = false; try { dismissed = localStorage.getItem("qatrana.pwa.hide") === "1"; } catch (e) {}
if (dismissed) return;

const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
let deferred = null;

function css() {
  const s = document.createElement("style");
  s.textContent = `.qpwa{position:fixed;inset:auto 12px 12px 12px;z-index:9999;max-width:520px;margin:0 auto;display:flex;align-items:center;gap:10px;background:#fff;color:#2B1218;border:2px solid #B8902A;border-radius:18px;padding:10px 12px;box-shadow:0 10px 30px rgba(92,22,34,.25);font-family:'Cairo',system-ui,sans-serif;direction:rtl}
@media (prefers-color-scheme:dark){.qpwa{background:#251a1e;color:#f5e9ec}}
.qpwa img{width:44px;height:44px;border-radius:11px;flex:none}.qpwa .t{flex:1;font-size:14px;line-height:1.5}.qpwa .t b{display:block;font-size:15px;color:#7A1F2E}
@media (prefers-color-scheme:dark){.qpwa .t b{color:#F3DFA8}}
.qpwa .go{font:inherit;font-weight:700;background:#7A1F2E;color:#fff;border:0;border-radius:24px;padding:8px 16px;cursor:pointer;flex:none}
.qpwa .x{font:inherit;background:none;border:0;color:inherit;opacity:.6;font-size:20px;cursor:pointer;padding:0 4px;flex:none}`;
  document.head.append(s);
}
function bar(text, action) {
  if (document.querySelector(".qpwa")) return;
  css();
  const d = document.createElement("div"); d.className = "qpwa"; d.setAttribute("role", "dialog");
  d.innerHTML = '<img src="/icons/icon-192.png" alt=""><div class="t"><b>📲 تطبيق منصة القطرانة</b>' + text + '</div>';
  if (action) { const b = document.createElement("button"); b.className = "go"; b.textContent = "تثبيت"; b.onclick = action; d.append(b); }
  const x = document.createElement("button"); x.className = "x"; x.setAttribute("aria-label", "إغلاق"); x.textContent = "×";
  x.onclick = () => { d.remove(); try { localStorage.setItem("qatrana.pwa.hide", "1"); } catch (e) {} };
  d.append(x); document.body.append(d);
}

addEventListener("beforeinstallprompt", e => {
  e.preventDefault(); deferred = e;
  bar("أيقونة على الشاشة الرئيسية وفتح أسرع بدون متصفح.", async () => {
    deferred.prompt(); const r = await deferred.userChoice; deferred = null;
    document.querySelector(".qpwa")?.remove();
  });
});
addEventListener("appinstalled", () => document.querySelector(".qpwa")?.remove());
if (ios) addEventListener("load", () => setTimeout(() => bar("على الآيفون: زر المشاركة ⬆️ ثم «إضافة إلى الشاشة الرئيسية»."), 1500));
})();
