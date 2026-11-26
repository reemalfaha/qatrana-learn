/* عامل الخدمة — منصة القطرانة للتعلّم الرقمي — تصميم وتنفيذ: نوال بني عطية
   الشبكة أولًا دائمًا (حتى تصل التحديثات للجميع فورًا)، والنسخة المحفوظة احتياطٌ عند انقطاع الإنترنت. */
const V = "ql-v1";
const PAGES = V + "-pages", FILES = V + "-files";
const PRECACHE = ["/", "/offline.html", "/manifest.webmanifest", "/icons/icon-192.png", "/gender.js", "/ql.js", "/fx.js"];
const MAX_BYTES = 8 * 1024 * 1024; // لا نحفظ الملفات الأكبر من 8 ميغابايت

self.addEventListener("install", e => {
  e.waitUntil(caches.open(PAGES).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => !k.startsWith(V)).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

function keep(cacheName, req, res) {
  if (!res || !res.ok || res.type === "opaque") return;
  const len = +res.headers.get("content-length") || 0;
  if (len > MAX_BYTES) return;
  const copy = res.clone();
  caches.open(cacheName).then(c => c.put(req, copy)).catch(() => {});
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  const fonts = u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com";
  if (u.origin !== location.origin && !fonts) return;
  if (u.pathname.startsWith("/api/")) return;
  if (req.headers.get("range")) return; // الفيديو والصوت

  // الخطوط والأيقونات: من المحفوظ أولًا (لا تتغيّر)
  if (fonts || u.pathname.startsWith("/icons/")) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok || res.type === "opaque") { const c = res.clone(); caches.open(FILES).then(x => x.put(req, c)); } return res; })));
    return;
  }

  const isPage = req.mode === "navigate";
  e.respondWith(
    fetch(req).then(res => { keep(isPage ? PAGES : FILES, req, res); return res; })
      .catch(() => caches.match(req, { ignoreSearch: isPage }).then(hit => hit || (isPage ? caches.match("/offline.html") : Response.error())))
  );
});
