# منصة القطرانة للتعلّم الرقمي

منصة مدرسة القطرانة الثانوية للبنات: الطالبة تختار صفّها ثم شعبتها ثم المبحث.

- `public/index.html`: الصفحة الرئيسية (الصف ← الشعبة ← المبحث).
- `public/science/`: منصة العلوم (قيد البناء). `science/chem3d/`: مختبر الكيمياء ثلاثي الأبعاد.
- لغتي ورياضيّاتي منصتان مستقلتان، تُفتحان بالرابط مع `?g=الصف&s=الشعبة`.
- النشر: Cloudflare Workers (Static Assets) من مجلد `public` (ملف `wrangler.jsonc`).

تصميمُ المنصّة وتنفيذُها: نوال بني عطية

## مشاريع الطالبات (`public/projects/`)
نسخة مبنية من مستودع `student-projects` (الخلفية على Convex كما هي). لإعادة البناء:
`SP_BASE=/projects/ npx vite build --outDir <مؤقت>` ثم نسخ `assets` و`index.html` و`favicon.svg` و`manifest.json` إلى `public/projects/`، ونسخ `index.html` إلى `public/projects/display/` (صفحة الشاشة).
