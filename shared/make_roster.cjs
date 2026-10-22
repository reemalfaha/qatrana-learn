/* إنشاء ملف الأسماء المشفّر: node make_roster.cjs <roster.json> <codes.json> <out>
   roster.json: {"الصف|الشعبة":[أسماء]}  ·  codes.json: [[id,label,[subj],code],...]  (الملفّان خارج المستودع) */
const fs=require('fs'),{webcrypto:c}=require('crypto');
const [,,rf,cf,out]=process.argv;const R=JSON.parse(fs.readFileSync(rf,'utf8')),T=JSON.parse(fs.readFileSync(cf,'utf8'));
const classes={};for(const k in R)classes[k.replace('|الكل','|أ')]=R[k];
const b64=u=>Buffer.from(u).toString('base64'),enc=new TextEncoder(),IT=300000;
(async()=>{const mk=c.getRandomValues(new Uint8Array(32));const key=await c.subtle.importKey('raw',mk,'AES-GCM',false,['encrypt']);
 const teachers={};T.forEach(([id,label,subj])=>teachers[id]={label,subj});
 const iv=c.getRandomValues(new Uint8Array(12));
 const ct=new Uint8Array(await c.subtle.encrypt({name:'AES-GCM',iv},key,enc.encode(JSON.stringify({v:2,updated:new Date().toISOString().slice(0,10),classes,teachers,ppin:process.env.PPIN||""}))));
 const keys={};for(const [id,label,subj,code] of T){const salt=c.getRandomValues(new Uint8Array(16)),kiv=c.getRandomValues(new Uint8Array(12));
  const base=await c.subtle.importKey('raw',enc.encode(code),'PBKDF2',false,['deriveKey']);const kek=await c.subtle.deriveKey({name:'PBKDF2',salt,iterations:IT,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['encrypt']);
  keys[id]={label,subj,salt:b64(salt),iv:b64(kiv),ct:b64(new Uint8Array(await c.subtle.encrypt({name:'AES-GCM',iv:kiv},kek,mk)))};}
 fs.writeFileSync(out,JSON.stringify({v:2,it:IT,keys,data:{iv:b64(iv),ct:b64(ct)}}));console.log('ok',Object.keys(classes).join(' '),Object.keys(keys).join(' '));})();
