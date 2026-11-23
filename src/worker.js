/* واجهة «سجّل مدرستك» لمنصّة القطرانة للتعلّم الرقمي — Cloudflare Worker + D1
   كل مدرسة تسجّل نفسها ويحصل معلّموها على حساباتهم ورموز طلبتهم؛ لا ترى مدرسة بيانات أخرى.
   أسماء الطلبة تصل مشفّرة من متصفّح المعلّم؛ الخادم لا يرى إلا نصًّا مشفّرًا.
   الجداول تبدأ بـ ql_ وسرّ الجلسات يُولَّد تلقائيًّا ويُحفظ في قاعدة البيانات (لا في المستودع).
   تصميمُ المنصّة وتنفيذُها: نوال بني عطية */
const te=new TextEncoder();
const b64=u=>btoa(String.fromCharCode(...new Uint8Array(u))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const unb=s=>Uint8Array.from(atob(s.replace(/-/g,"+").replace(/_/g,"/")),c=>c.charCodeAt(0));
const json=(o,st=200)=>new Response(JSON.stringify(o),{status:st,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
const err=(m,st=400)=>json({error:m},st);
const clip=(s,n)=>String(s==null?"":s).slice(0,n);
let ready=false,SECRET=null;
async function schema(db){if(ready)return;
 await db.batch([
  db.prepare("CREATE TABLE IF NOT EXISTS ql_meta(k TEXT PRIMARY KEY,v TEXT)"),
  db.prepare("CREATE TABLE IF NOT EXISTS ql_schools(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,dir TEXT,code TEXT UNIQUE,created INTEGER)"),
  db.prepare("CREATE TABLE IF NOT EXISTS ql_teachers(id INTEGER PRIMARY KEY AUTOINCREMENT,school_id INTEGER,username TEXT UNIQUE,name TEXT,subject TEXT,is_admin INTEGER DEFAULT 0,salt TEXT,hash TEXT,created INTEGER)"),
  db.prepare("CREATE TABLE IF NOT EXISTS ql_students(id INTEGER PRIMARY KEY AUTOINCREMENT,school_id INTEGER,teacher_id INTEGER,code TEXT UNIQUE,enc_name TEXT,grade TEXT,sec TEXT,gender TEXT,created INTEGER)"),
  db.prepare("CREATE TABLE IF NOT EXISTS ql_attempts(id INTEGER PRIMARY KEY AUTOINCREMENT,student_id INTEGER,ts INTEGER,title TEXT,subject TEXT,right INTEGER,total INTEGER)"),
  db.prepare("CREATE INDEX IF NOT EXISTS ix_qlt ON ql_teachers(school_id)"),
  db.prepare("CREATE INDEX IF NOT EXISTS ix_qls ON ql_students(teacher_id)"),
  db.prepare("CREATE INDEX IF NOT EXISTS ix_qla ON ql_attempts(student_id,ts)")]);
 let r=await db.prepare("SELECT v FROM ql_meta WHERE k='secret'").first();
 if(!r){const v=b64(crypto.getRandomValues(new Uint8Array(32)));await db.prepare("INSERT OR IGNORE INTO ql_meta(k,v) VALUES('secret',?)").bind(v).run();r=await db.prepare("SELECT v FROM ql_meta WHERE k='secret'").first()}
 SECRET=r.v;ready=true}
async function hmac(data){const k=await crypto.subtle.importKey("raw",te.encode(SECRET),{name:"HMAC",hash:"SHA-256"},false,["sign"]);return b64(await crypto.subtle.sign("HMAC",k,te.encode(data)))}
async function mint(id,days=30){const p=b64(te.encode(JSON.stringify({t:"QT",id,exp:Date.now()+days*864e5})));return p+"."+await hmac(p)}
async function auth(req){const a=(req.headers.get("authorization")||"").replace(/^Bearer /,"");const [p,s]=a.split(".");if(!p||!s)return null;
 if(await hmac(p)!==s)return null;try{const o=JSON.parse(new TextDecoder().decode(unb(p)));return o.t==="QT"&&o.exp>Date.now()?o.id:null}catch(e){return null}}
async function pw(password,salt){const k=await crypto.subtle.importKey("raw",te.encode(password),"PBKDF2",false,["deriveBits"]);return b64(await crypto.subtle.deriveBits({name:"PBKDF2",salt:unb(salt),iterations:100000,hash:"SHA-256"},k,256))}
const eq=(a,b)=>{if(a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a.charCodeAt(i)^b.charCodeAt(i);return d===0};
const ALPHA="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const scode=()=>[...crypto.getRandomValues(new Uint8Array(6))].map(x=>ALPHA[x%ALPHA.length]).join("");
const stcode=()=>{const r=crypto.getRandomValues(new Uint32Array(1))[0];return String(10000000+r%90000000)};
const SUBJ=["ar","en","math","sci","soc","isl","voc","other"];
async function teacherOut(db,id){const t=await db.prepare("SELECT t.id,t.username,t.name,t.subject,t.is_admin,s.name school,s.dir,s.code,s.id sid FROM ql_teachers t JOIN ql_schools s ON s.id=t.school_id WHERE t.id=?").bind(id).first();
 if(!t)return null;return{username:t.username,name:t.name,subject:t.subject,admin:!!t.is_admin,school:t.school,dir:t.dir,schoolCode:t.code}}
async function newTeacher(db,sid,body,admin){const un=clip(body.username,40).trim().toLowerCase(),ps=String(body.password||"");
 if(!/^[a-z0-9._-]{3,40}$/.test(un))return{e:"اسم المستخدم: 3 أحرف على الأقل، بالإنجليزية أو الأرقام"};
 if(ps.length<6)return{e:"كلمة السر قصيرة (6 أحرف على الأقل)"};
 const salt=b64(crypto.getRandomValues(new Uint8Array(16)));const sj=SUBJ.includes(body.subject)?body.subject:"other";
 try{const r=await db.prepare("INSERT INTO ql_teachers(school_id,username,name,subject,is_admin,salt,hash,created) VALUES(?,?,?,?,?,?,?,?)").bind(sid,un,clip(body.name,60),sj,admin?1:0,salt,await pw(ps,salt),Date.now()).run();return{id:r.meta.last_row_id}}
 catch(e){return{e:"اسم المستخدم مستخدم، اختر اسمًا آخر",st:409}}}
export default{async fetch(req,env){
 const u=new URL(req.url);
 if(!u.pathname.startsWith("/api/"))return env.ASSETS.fetch(req);
 if(!env.DB)return err("الحسابات غير مفعّلة بعد",503);
 try{await schema(env.DB)}catch(e){return err("تعذّر تجهيز قاعدة البيانات",503)}
 const db=env.DB,m=req.method,p=u.pathname.replace(/^\/api\/ql/,"/api");let body={};
 if(m==="POST"){try{body=await req.json()}catch(e){return err("طلب غير صالح")}}
 // ---- تسجيل مدرسة جديدة (مع حساب المسؤول)
 if(p==="/api/school/register"&&m==="POST"){
  const name=clip(body.school,80).trim(),dir=clip(body.dir,80).trim();if(name.length<4)return err("اكتبي اسم المدرسة كاملًا");
  let code,sid;for(let i=0;i<5&&!sid;i++){code=scode();try{const r=await db.prepare("INSERT INTO ql_schools(name,dir,code,created) VALUES(?,?,?,?)").bind(name,dir,code,Date.now()).run();sid=r.meta.last_row_id}catch(e){}}
  if(!sid)return err("تعذّر إنشاء المدرسة، حاولي مرّة أخرى",500);
  const t=await newTeacher(db,sid,body,true);if(t.e){await db.prepare("DELETE FROM ql_schools WHERE id=?").bind(sid).run();return err(t.e,t.st||400)}
  return json({token:await mint(t.id),me:await teacherOut(db,t.id)})}
 // ---- انضمام معلّم إلى مدرسة برمزها
 if(p==="/api/teacher/join"&&m==="POST"){
  const s=await db.prepare("SELECT id FROM ql_schools WHERE code=?").bind(clip(body.code,10).trim().toUpperCase()).first();if(!s)return err("رمز المدرسة غير صحيح",404);
  const t=await newTeacher(db,s.id,body,false);if(t.e)return err(t.e,t.st||400);return json({token:await mint(t.id),me:await teacherOut(db,t.id)})}
 if(p==="/api/teacher/login"&&m==="POST"){
  const r=await db.prepare("SELECT id,salt,hash FROM ql_teachers WHERE username=?").bind(clip(body.username,40).trim().toLowerCase()).first();
  if(!r||!eq(await pw(String(body.password||""),r.salt),r.hash))return err("اسم المستخدم أو كلمة السر غير صحيحة",401);
  return json({token:await mint(r.id),me:await teacherOut(db,r.id)})}
 // ---- رمز الطالب (عام): يتحقّق من الرمز دون كشف الاسم
 if(p==="/api/student"&&m==="GET"){const c=clip(u.searchParams.get("code"),12).trim();
  const r=await db.prepare("SELECT st.grade,st.sec,s.name school FROM ql_students st JOIN ql_schools s ON s.id=st.school_id WHERE st.code=?").bind(c).first();
  return r?json({ok:true,school:r.school,grade:r.grade,sec:r.sec}):err("الرمز غير صحيح",404)}
 if(p==="/api/attempt"&&m==="POST"){const c=clip(body.code,12).trim();const st=await db.prepare("SELECT id FROM ql_students WHERE code=?").bind(c).first();if(!st)return err("الرمز غير صحيح",404);
  const day=Date.now()-864e5;const n=await db.prepare("SELECT COUNT(*) n FROM ql_attempts WHERE student_id=? AND ts>?").bind(st.id,day).first();if(n.n>200)return err("تجاوزت الحدّ اليومي",429);
  const tot=Math.max(0,Math.min(500,parseInt(body.total)||0)),rt=Math.max(0,Math.min(tot,parseInt(body.right)||0));if(!tot)return err("لا توجد نتيجة");
  await db.prepare("INSERT INTO ql_attempts(student_id,ts,title,subject,right,total) VALUES(?,?,?,?,?,?)").bind(st.id,Date.now(),clip(body.title,120),clip(body.subject,80),rt,tot).run();return json({ok:true})}
 // ---- ما يلي يحتاج دخول المعلّم
 const tid=await auth(req);if(!tid)return err("سجّلي الدخول من جديد",401);
 const me=await db.prepare("SELECT id,school_id,is_admin FROM ql_teachers WHERE id=?").bind(tid).first();if(!me)return err("الحساب غير موجود",401);
 if(p==="/api/me")return json({me:await teacherOut(db,tid)});
 if(p==="/api/students/add"&&m==="POST"){
  const g=clip(body.grade,20),sc=clip(body.sec,10),names=Array.isArray(body.names)?body.names.slice(0,60):[];if(!names.length)return err("أضيفي اسمًا واحدًا على الأقل");
  const out=[];for(const n of names){const enc=clip(n.enc,600),gd=n.g==="m"?"m":n.g==="f"?"f":"";for(let i=0;i<6;i++){const code=stcode();try{const r=await db.prepare("INSERT INTO ql_students(school_id,teacher_id,code,enc_name,grade,sec,gender,created) VALUES(?,?,?,?,?,?,?,?)").bind(me.school_id,tid,code,enc,g,sc,gd,Date.now()).run();out.push({id:r.meta.last_row_id,code});break}catch(e){}}}
  return json({added:out})}
 if(p==="/api/students"&&m==="GET"){
  const r=await db.prepare("SELECT st.id,st.code,st.enc_name enc,st.grade,st.sec,st.gender,COUNT(a.id) n,ROUND(AVG(100.0*a.right/a.total)) avg,MAX(a.ts) last FROM ql_students st LEFT JOIN ql_attempts a ON a.student_id=st.id WHERE st.teacher_id=? GROUP BY st.id ORDER BY st.grade,st.sec,st.id").bind(tid).all();
  return json({students:r.results})}
 if(p==="/api/students/del"&&m==="POST"){const ids=(body.ids||[]).map(x=>parseInt(x)).filter(Boolean).slice(0,200);for(const id of ids){await db.prepare("DELETE FROM ql_attempts WHERE student_id IN (SELECT id FROM ql_students WHERE id=? AND teacher_id=?)").bind(id,tid).run();await db.prepare("DELETE FROM ql_students WHERE id=? AND teacher_id=?").bind(id,tid).run()}return json({ok:true})}
 if(p==="/api/attempts"&&m==="GET"){const sid=parseInt(u.searchParams.get("sid"));const own=await db.prepare("SELECT id FROM ql_students WHERE id=? AND teacher_id=?").bind(sid,tid).first();if(!own)return err("غير مسموح",403);
  const r=await db.prepare("SELECT ts,title,subject,right,total FROM ql_attempts WHERE student_id=? ORDER BY ts DESC LIMIT 200").bind(sid).all();return json({attempts:r.results})}
 if(p==="/api/school/teachers"&&m==="GET"){if(!me.is_admin)return err("للمسؤول فقط",403);
  const r=await db.prepare("SELECT t.username,t.name,t.subject,t.is_admin admin,(SELECT COUNT(*) FROM ql_students s WHERE s.teacher_id=t.id) students FROM ql_teachers t WHERE t.school_id=? ORDER BY t.id").bind(me.school_id).all();return json({teachers:r.results})}
 // تغيير كلمة السر: تُعاد أسماء الطلبة مشفّرة بالمفتاح الجديد من المتصفّح
 if(p==="/api/teacher/password"&&m==="POST"){const r=await db.prepare("SELECT salt,hash FROM ql_teachers WHERE id=?").bind(tid).first();
  if(!eq(await pw(String(body.old||""),r.salt),r.hash))return err("كلمة السر الحالية غير صحيحة",403);const ps=String(body.password||"");if(ps.length<6)return err("كلمة السر الجديدة قصيرة");
  const salt=b64(crypto.getRandomValues(new Uint8Array(16)));const st=[db.prepare("UPDATE ql_teachers SET salt=?,hash=? WHERE id=?").bind(salt,await pw(ps,salt),tid)];
  for(const x of (body.reenc||[]).slice(0,2000))st.push(db.prepare("UPDATE ql_students SET enc_name=? WHERE id=? AND teacher_id=?").bind(clip(x.enc,600),parseInt(x.id),tid));
  await db.batch(st);return json({ok:true})}
 return err("غير موجود",404);
}};
