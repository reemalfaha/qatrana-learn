/* تجارب الكيمياء — المختبر الافتراضي — تصميم وتنفيذ: نوال بني عطية */
(function(){const {W,H,g}=VLab;const {rr,card,label}=g;
const EL={H:{n:1,sh:[1],c:"#eef2f7",t:"#333"},C:{n:6,sh:[2,4],c:"#4a4a52"},N:{n:7,sh:[2,5],c:"#3b6fe0"},O:{n:8,sh:[2,6],c:"#e04848"},F:{n:9,sh:[2,7],c:"#8fd14f",t:"#1d3b0a"},
 Na:{n:11,sh:[2,8,1],c:"#a66bd6"},Mg:{n:12,sh:[2,8,2],c:"#2fae6a"},Al:{n:13,sh:[2,8,3],c:"#9aa3b5"},S:{n:16,sh:[2,8,6],c:"#e8cf2e",t:"#3b3205"},Cl:{n:17,sh:[2,8,7],c:"#36c46a",t:"#0d3b1c"},
 K:{n:19,sh:[2,8,8,1],c:"#c084fc"},Ca:{n:20,sh:[2,8,8,2],c:"#e0a33b"},Fe:{n:26,sh:[2,8,14,2],c:"#b5643a"}};
const SUB={"0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉"};
const sub=f=>f.replace(/\d/g,d=>SUB[d]);
const sup=q=>q.replace(/\d/g,d=>"⁰¹²³⁴⁵⁶⁷⁸⁹"[d]).replace("+","⁺").replace("-","⁻");
function ball(c,x,y,r,col,txt,tc){const gr=c.createRadialGradient(x-r*.35,y-r*.35,r*.15,x,y,r);gr.addColorStop(0,"#fff");gr.addColorStop(.25,col);gr.addColorStop(1,shade(col,-.45));
 c.fillStyle=gr;c.beginPath();c.arc(x,y,r,0,7);c.fill();if(txt){c.save();c.direction="ltr";c.fillStyle=tc||"#fff";c.font="800 "+Math.round(r*.9)+"px Cairo, sans-serif";c.textAlign="center";c.textBaseline="middle";c.fillText(txt,x,y+1);c.restore()}}
function shade(h,k){const n=parseInt(h.slice(1),16);let r=n>>16,g2=n>>8&255,b=n&255;const f=v=>Math.max(0,Math.min(255,Math.round(k<0?v*(1+k):v+(255-v)*k)));return"rgb("+f(r)+","+f(g2)+","+f(b)+")"}
const RING=i=>30+i*22;
/* نموذج بور: يرسم النواة والمستويات؛ outer: مصفوفة زوايا إلكترونات المستوى الخارجي (اختياري) */
function bohr(c,x,y,s,sh,o={}){const E=EL[s];const n=sh.length;
 for(let i=0;i<n;i++){const r=RING(i);c.strokeStyle=i===n-1?"rgba(243,223,168,.55)":"rgba(255,255,255,.22)";c.lineWidth=i===n-1?2.5:1.5;c.setLineDash(i===n-1?[]:[4,5]);c.beginPath();c.arc(x,y,r,0,7);c.stroke()}c.setLineDash([]);
 for(let i=0;i<n;i++){const r=RING(i),k=sh[i];if(i===n-1&&o.skipOuter)continue;const rot=(o.t||0)*(.3/(i+1))+i;
  for(let j=0;j<k;j++){const a=rot+j/k*2*Math.PI;ball(c,x+Math.cos(a)*r,y+Math.sin(a)*r,i===n-1?7:5,i===n-1?(o.ec||"#ffd34d"):"#9fc5ff")}}
 ball(c,x,y,22,E.c,s,E.t)}

/* ===== 1) الرابطة الأيونية ===== */
const IONIC={NaCl:{m:"Na",x:"Cl",nm:1,nx:1},KCl:{m:"K",x:"Cl",nm:1,nx:1},MgO:{m:"Mg",x:"O",nm:1,nx:1},CaO:{m:"Ca",x:"O",nm:1,nx:1},MgCl2:{m:"Mg",x:"Cl",nm:1,nx:2},Na2O:{m:"Na",x:"O",nm:2,nx:1}};
function ionicLayout(P){const L=[];if(P.nm===1&&P.nx===1){L.push({s:P.m,x:300,m:1},{s:P.x,x:660,m:0})}
 else if(P.nx===2){L.push({s:P.x,x:200,m:0},{s:P.m,x:480,m:1},{s:P.x,x:760,m:0})}else{L.push({s:P.m,x:200,m:1},{s:P.x,x:480,m:0},{s:P.m,x:760,m:1})}return L}
const val=s=>EL[s].sh[EL[s].sh.length-1];
VLab.reg({id:"c10-ionic",preview:{st:85},icon:"⚡",grade:"الصف العاشر",subject:"الكيمياء",unit:"الوحدة 3: الروابط الكيميائية",src:"كتاب الطالب: الرابطة الأيونية",
 title:"كيف تتكوّن الرابطة الأيونية؟",question:"كيف تنتقل الإلكترونات من ذرّة الفلزّ إلى ذرّة اللافلزّ؟ وما الذي يربط الأيونات معًا؟",dyn:1,
 vars:[{k:"p",label:"المركّب",type:"seg",val:"NaCl",c:"#7A1F2E",opts:Object.keys(IONIC).map(k=>[k,sub(k)])},
  {k:"st",label:"مراحل تكوّن الرابطة",unit:"%",min:0,max:100,step:1,val:0,c:"#B8902A",ticks:[0,25,50,75,100]}],
 read(s){const P=IONIC[s.p],vm=val(P.m),vx=val(P.x),q=vm;const dn=s.st>=45;
  return[{label:"إلكترونات تكافؤ الفلزّ ("+P.m+")",val:vm},{label:"إلكترونات تكافؤ اللافلزّ ("+P.x+")",val:vx},{label:"عدد الإلكترونات المنتقلة",val:vm*P.nm},
   {label:"أيون الفلزّ",val:dn?P.m+sup(q+"+"):"لم يتكوّن بعد"},{label:"أيون اللافلزّ",val:dn?P.x+sup((8-vx)+"-"):"لم يتكوّن بعد"},{label:"الصيغة الكيميائية",val:s.st>=75?sub(s.p):"…"}]},
 onSeg(S){S.st=0},
 draw(c,s,t,dt,S){const P=IONIC[S.p],L=ionicLayout(P),st=s.st;const vm=val(P.m),vx=val(P.x);const per=vm; // كل ذرّة فلزّ تعطي vm
  const pT=Math.min(1,st/40),pI=Math.max(0,Math.min(1,(st-40)/30)),pA=Math.max(0,(st-70)/30);
  const cx=480,y=300;L.forEach(a=>{a.dx=a.x+(cx-a.x)*.22*pA});
  // ربط كل ذرّة فلزّ باللافلزّ الذي تعطيه
  const pairs=[];L.forEach((a,i)=>{if(!a.m)return;L.forEach((b,j)=>{if(b.m)return;pairs.push([i,j])})});
  const give={},take={};pairs.forEach(([i,j])=>{const k=P.nm===1&&P.nx===2?1:per/(P.nx===1?1:1);give[i]=(give[i]||0)+(P.nx===2?1:per);take[j]=(take[j]||0)+(P.nx===2?1:per)});
  // التجاذب
  if(pA>0){pairs.forEach(([i,j])=>{const a=L[i],b=L[j];c.strokeStyle="rgba(255,138,101,"+(.4+.4*Math.sin(t*5))+")";c.lineWidth=5;c.setLineDash([10,8]);c.lineDashOffset=-t*30;c.beginPath();c.moveTo(a.dx,y);c.lineTo(b.dx,y);c.stroke();c.setLineDash([])});
   label(c,cx,y+168,"قوّة تجاذب كهربائية بين الأيونات الموجبة والسالبة","#ffb199",22)}
  L.forEach((a,i)=>{const sh=EL[a.s].sh.slice();const sc=a.m?1-.18*pI:1+.1*pI;c.save();c.translate(a.dx,y);c.scale(sc,sc);
   if(a.m){const outer=sh[sh.length-1];const left=Math.round(outer*(1-pT));const sh2=sh.slice();sh2[sh2.length-1]=left;c.globalAlpha=1;
    if(pI>0&&left===0){const s3=sh.slice(0,-1);c.globalAlpha=pI;bohr(c,0,0,a.s,s3,{t});c.globalAlpha=1-pI;bohr(c,0,0,a.s,sh2,{t,skipOuter:true});c.globalAlpha=1}else bohr(c,0,0,a.s,sh2,{t})}
   else{const add=Math.round((take[i]||0)*pT);const sh2=sh.slice();sh2[sh2.length-1]+=add;bohr(c,0,0,a.s,sh2,{t,ec:"#ffd34d"})}
   c.restore();
   if(pI>0){const r=RING(EL[a.s].sh.length-(a.m?2:1))*sc+12;c.save();c.globalAlpha=pI;c.strokeStyle="#f3dfa8";c.lineWidth=3;
    c.beginPath();c.moveTo(a.dx-r+10,y-r);c.lineTo(a.dx-r,y-r);c.lineTo(a.dx-r,y+r);c.lineTo(a.dx-r+10,y+r);c.moveTo(a.dx+r-10,y-r);c.lineTo(a.dx+r,y-r);c.lineTo(a.dx+r,y+r);c.lineTo(a.dx+r-10,y+r);c.stroke();
    label(c,a.dx+r+16,y-r,a.m?sup(vm+"+"):sup((8-vx)+"-"),a.m?"#ff9a7a":"#7ad0ff",30);c.restore()}
   label(c,a.dx,y+(a.m?110:120),a.m?(pI>.5?"أيون موجب":"ذرّة فلزّ "+a.s):(pI>.5?"أيون سالب":"ذرّة لافلزّ "+a.s),"#fff",22)});
  // إلكترونات منتقلة
  if(pT>0&&pT<1){pairs.forEach(([i,j],pi)=>{const a=L[i],b=L[j];const n=P.nx===2||P.nm===2?1:per;for(let k=0;k<n;k++){const f=Math.min(1,Math.max(0,pT*1.2-k*.15));
    const x0=a.dx+(b.dx>a.dx?1:-1)*RING(EL[a.s].sh.length-1),x1=b.dx-(b.dx>a.dx?1:-1)*RING(EL[b.s].sh.length-1);const xx=x0+(x1-x0)*f,yy=y-Math.sin(f*Math.PI)*(60+k*25);
    c.strokeStyle="rgba(255,211,77,.35)";c.lineWidth=2;c.beginPath();c.moveTo(x0,y);c.quadraticCurveTo((x0+x1)/2,y-(120+k*50),xx,yy);c.stroke();ball(c,xx,yy,8,"#ffd34d")}})}
  // المرحلة
  const ph=st<5?"الذرّات منفصلة: حرّكي المؤشّر":st<40?"① انتقال الإلكترونات من الفلزّ إلى اللافلزّ":st<70?"② تكوّن الأيونات: كلّ أيون وصل إلى التوزيع الثُّماني":"③ التجاذب الكهربائي يكوّن المركّب الأيوني";
  c.fillStyle="rgba(20,10,14,.82)";rr(c,40,100,560,50,12);c.fill();label(c,320,126,ph,"#f3dfa8",22);
  if(pA>.3){c.save();c.globalAlpha=Math.min(1,(pA-.3)*2);c.fillStyle="rgba(122,31,46,.9)";rr(c,cx-100,500,200,64,16);c.fill();c.strokeStyle="#B8902A";c.lineWidth=3;c.stroke();label(c,cx,533,sub(S.p),"#fff",42);c.restore()}},
 challenges:[{t:"كوّني رابطة NaCl كاملة",test:s=>s.p==="NaCl"&&s.st>=95},{t:"جرّبي 3 مركّبات مختلفة",test:(s,h)=>h.p.size>=3},{t:"كوّني MgCl₂ وراقبي انتقال إلكترونين",test:s=>s.p==="MgCl2"&&s.st>=95},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أوضّح كيف تتكوّن الرابطة الأيونية بانتقال الإلكترونات من ذرّة فلزّ إلى ذرّة لافلزّ.",
  steps:["اختاري المركّب NaCl، وحرّكي «مراحل تكوّن الرابطة» ببطء من 0 إلى 100.","راقبي: كم إلكترونًا انتقل؟ ومن أيّ ذرّة إلى أيّ ذرّة؟","افتحي «القراءات» وسجّلي شحنة كلّ أيون والصيغة الكيميائية.","كرّري مع MgO و MgCl₂ و Na₂O، وقارني عدد الإلكترونات المنتقلة."],
  questions:[{q:"لماذا تفقد ذرّة الصوديوم إلكترونًا واحدًا بينما تكسب ذرّة الكلور إلكترونًا واحدًا؟",a:"لأنّ في المستوى الخارجي للصوديوم إلكترونًا واحدًا وللكلور 7 إلكترونات، فبانتقال إلكترون واحد يصل كلٌّ منهما إلى التوزيع الثُّماني المستقرّ."},
   {q:"ما شحنة أيون المغنيسيوم في MgO؟ ولماذا؟",a:"+2؛ لأنّ ذرّة المغنيسيوم تفقد إلكتروني تكافؤها لذرّة الأكسجين."},
   {q:"لماذا تحتاج ذرّة المغنيسيوم إلى ذرّتي كلور في MgCl₂؟",a:"لأنّها تفقد إلكترونين، وكلّ ذرّة كلور تحتاج إلى إلكترون واحد فقط، فيلزم ذرّتا كلور."},
   {q:"ماذا يحدث لحجم الذرّة عندما تصبح أيونًا موجبًا؟ وأيونًا سالبًا؟",a:"الأيون الموجب أصغر من ذرّته لفقده مستواه الخارجي، والأيون السالب أكبر من ذرّته لزيادة التنافر بين الإلكترونات."},
   {q:"عرّفي الرابطة الأيونية.",a:"قوّة تجاذب كهربائية بين أيونات موجبة وأيونات سالبة تنتج من انتقال إلكترون أو أكثر من ذرّة فلزّ إلى ذرّة لافلزّ."}],
  concl:"تتكوّن الرابطة الأيونية عندما تفقد ذرّة الفلزّ إلكترونات تكافؤها فتصبح أيونًا موجبًا، وتكسبها ذرّة اللافلزّ فتصبح أيونًا سالبًا، ثمّ تتجاذب الأيونات كهربائيًّا."}});

/* ===== 2) الرابطة التساهمية ===== */
const MOL={
 H2:{n:"الهيدروجين",a:[["H",[-1,0,0]],["H",[1,0,0]]],b:[[0,1,1]],shape:"خطّي",ang:"180°"},
 Cl2:{n:"الكلور",a:[["Cl",[-1,0,0]],["Cl",[1,0,0]]],b:[[0,1,1]],shape:"خطّي",ang:"180°"},
 HCl:{n:"كلوريد الهيدروجين",a:[["H",[-1,0,0]],["Cl",[1,0,0]]],b:[[0,1,1]],shape:"خطّي",ang:"180°"},
 O2:{n:"الأكسجين",a:[["O",[-1,0,0]],["O",[1,0,0]]],b:[[0,1,2]],shape:"خطّي",ang:"180°"},
 N2:{n:"النيتروجين",a:[["N",[-1,0,0]],["N",[1,0,0]]],b:[[0,1,3]],shape:"خطّي",ang:"180°"},
 H2O:{n:"الماء",a:[["O",[0,0,0]],["H",[-.79,.61,0]],["H",[.79,.61,0]]],b:[[0,1,1],[0,2,1]],shape:"منحنٍ",ang:"104.5°"},
 NH3:{n:"الأمونيا",a:[["N",[0,-.15,0]],["H",[-.94,.33,-.3]],["H",[.47,.33,-.82]],["H",[.47,.33,.82]]],b:[[0,1,1],[0,2,1],[0,3,1]],shape:"هرم ثلاثي",ang:"107°"},
 CH4:{n:"الميثان",a:[["C",[0,0,0]],["H",[0,-1,0]],["H",[-.94,.33,0]],["H",[.47,.33,-.82]],["H",[.47,.33,.82]]],b:[[0,1,1],[0,2,1],[0,3,1],[0,4,1]],shape:"رباعي الأوجه",ang:"109.5°"},
 CO2:{n:"ثاني أكسيد الكربون",a:[["C",[0,0,0]],["O",[-1,0,0]],["O",[1,0,0]]],b:[[0,1,2],[0,2,2]],shape:"خطّي",ang:"180°"}};
const L2D={H2O:[0,[-1,.75],[1,.75]],NH3:[0,[-1,.5],[1,.5],[0,-1.1]],CH4:[0,[-1,0],[1,0],[0,-1],[0,1]]};
function molInfo(m){const M=MOL[m];const bs=M.a.map(()=>0);let sh=0;M.b.forEach(([i,j,o])=>{bs[i]+=o;bs[j]+=o;sh+=o});
 const lp=M.a.map((x,i)=>(val(x[0])-bs[i])/2);return{bs,sh,lp,lpt:lp.reduce((a,b)=>a+b,0)}}
function pos2D(m,dist){const M=MOL[m];if(M.a.length===2)return[[-dist/2,0],[dist/2,0]];
 const d2=L2D[m];if(d2)return M.a.map((x,i)=>{if(!i)return[0,0];const v=d2[i],l=Math.hypot(v[0],v[1]);return[v[0]/l*dist,v[1]/l*dist]});
 return M.a.map(x=>[x[1][0]*dist,x[1][1]*dist])}
function gapAngles(bonds,n){if(!n)return[];if(!bonds.length)return[...Array(n)].map((_,k)=>-Math.PI/2+k/n*2*Math.PI);
 const s=bonds.slice().sort((a,b)=>a-b);let best=0,st=s[0];for(let i=0;i<s.length;i++){const a=s[i],b=i+1<s.length?s[i+1]:s[0]+2*Math.PI;if(b-a>best){best=b-a;st=a}}
 return[...Array(n)].map((_,k)=>st+best*(k+1)/(n+1))}
VLab.reg({id:"c10-covalent",icon:"🔗",grade:"الصف العاشر",subject:"الكيمياء",unit:"الوحدة 3: الروابط الكيميائية",src:"كتاب الأنشطة ص16",
 title:"الروابط في المركّبات التساهمية",question:"كيف تشترك الذرّات في الإلكترونات لتكوين روابط أحادية وثنائية وثلاثية؟",dyn:1,
 vars:[{k:"m",label:"الجزيء",type:"seg",val:"H2O",c:"#7A1F2E",opts:Object.keys(MOL).map(k=>[k,sub(k)])},
  {k:"v",label:"طريقة العرض",type:"seg",val:"bohr",c:"#2b7bd6",opts:[["bohr","⚛️ بور"],["lewis","✏️ لويس"],["ball","🔴 كرات وعصي"]]},
  {k:"a",label:"اقتراب الذرّات",unit:"%",min:0,max:100,step:1,val:100,c:"#B8902A",ticks:[0,50,100]}],
 read(s){const M=MOL[s.m],I=molInfo(s.m);const ord=Math.max(...M.b.map(b=>b[2]));
  return[{label:"الجزيء",val:M.n+" "+sub(s.m)},{label:"أزواج الإلكترونات المشتركة",val:I.sh},{label:"نوع الرابطة",val:["","أحادية","ثنائية","ثلاثية"][ord]},
   {label:"أزواج غير رابطة (في الجزيء)",val:I.lpt},{label:"الشكل",val:M.shape},{label:"الزاوية بين الروابط",val:M.ang}]},
 draw(c,s,t,dt,S){const M=MOL[S.m],I=molInfo(S.m),ap=s.a/100,cx=480,cy=300;const bonded=ap>.85;
  if(S.v==="ball"){const rot=t*.6;const pr=M.a.map(x=>{const[X,Y,Z]=x[1];const xr=X*Math.cos(rot)+Z*Math.sin(rot),zr=-X*Math.sin(rot)+Z*Math.cos(rot);const k=150*(1+(1-ap)*1.4);return{x:cx+xr*k,y:cy+Y*k,z:zr,s:x[0]}});
   M.b.forEach(([i,j,o])=>{const A=pr[i],B=pr[j];const nx=-(B.y-A.y),ny=B.x-A.x,l=Math.hypot(nx,ny)||1;for(let k=0;k<o;k++){const off=(k-(o-1)/2)*12;c.strokeStyle="#cfd5de";c.lineWidth=7;c.beginPath();c.moveTo(A.x+nx/l*off,A.y+ny/l*off);c.lineTo(B.x+nx/l*off,B.y+ny/l*off);c.stroke()}});
   pr.map((p,i)=>[p,i]).sort((a,b)=>a[0].z-b[0].z).forEach(([p])=>{const r=(p.s==="H"?26:40)*(1+p.z*.12);ball(c,p.x,p.y,r,EL[p.s].c,p.s,EL[p.s].t)});
   label(c,cx,520,"الشكل: "+M.shape+" · الزاوية "+M.ang,"#f3dfa8",24)}
  else{const lew=S.v==="lewis";const oute=M.a.map(x=>lew?40:RING(EL[x[0]].sh.length-1));const bl=lew?150:Math.max(oute[0]+oute[1]-10,50);c.save();const Z=lew?1:(M.a.length>3?1.35:1.6);c.translate(cx,cy);c.scale(Z,Z);c.translate(-cx,-cy);
   const dist=bl*(1+(1-ap)*1.3);const P=pos2D(S.m,dist).map(p=>[cx+p[0],cy+p[1]]);
   if(M.a.length===2){P[0][0]=cx-dist/2;P[1][0]=cx+dist/2}
   const bdir=M.a.map(()=>[]);M.b.forEach(([i,j])=>{bdir[i].push(Math.atan2(P[j][1]-P[i][1],P[j][0]-P[i][0]));bdir[j].push(Math.atan2(P[i][1]-P[j][1],P[i][0]-P[j][0]))});
   M.a.forEach((x,i)=>{const sym=x[0],E=EL[sym],sh=E.sh,R=oute[i];
    if(lew){c.save();c.direction="ltr";c.font="800 54px Cairo, sans-serif";c.textAlign="center";c.textBaseline="middle";c.fillStyle=E.c==="#eef2f7"?"#fff":shade(E.c,.35);c.fillText(sym,P[i][0],P[i][1]+3);c.restore()}
    else bohr(c,P[i][0],P[i][1],sym,sh,{t,skipOuter:true});
    // الإلكترونات الخارجية
    if(!bonded){const v=val(sym);for(let k=0;k<v;k++){const a=-Math.PI/2+k/v*2*Math.PI+(lew?0:t*.3);ball(c,P[i][0]+Math.cos(a)*R,P[i][1]+Math.sin(a)*R,lew?6:7,"#ffd34d")}}
    else{gapAngles(bdir[i],I.lp[i]).forEach(a=>{const px=-Math.sin(a)*8,py=Math.cos(a)*8;[1,-1].forEach(sg=>ball(c,P[i][0]+Math.cos(a)*R+px*sg,P[i][1]+Math.sin(a)*R+py*sg,lew?6:7,"#ffd34d"))})}});
   if(bonded){M.b.forEach(([i,j,o])=>{const A=P[i],B=P[j];const mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2;const dx=B[0]-A[0],dy=B[1]-A[1],l=Math.hypot(dx,dy);const nx=-dy/l,ny=dx/l;
     if(lew){for(let k=0;k<o;k++){const off=(k-(o-1)/2)*12;c.strokeStyle="#f3dfa8";c.lineWidth=5;c.beginPath();c.moveTo(A[0]+dx/l*34+nx*off,A[1]+dy/l*34+ny*off);c.lineTo(B[0]-dx/l*34+nx*off,B[1]-dy/l*34+ny*off);c.stroke()}}
     else{c.fillStyle="rgba(255,211,77,"+(.12+.06*Math.sin(t*4))+")";c.beginPath();c.ellipse(mx,my,14,14+o*9,Math.atan2(dy,dx),0,7);c.fill();
      for(let k=0;k<o;k++){const off=(k-(o-1)/2)*15;ball(c,mx+nx*off-dx/l*8,my+ny*off-dy/l*8,7,shade(EL[M.a[i][0]].c,.2));ball(c,mx+nx*off+dx/l*8,my+ny*off+dy/l*8,7,shade(EL[M.a[j][0]].c,.2))}}});
    c.restore();label(c,cx,520,["","رابطة تساهمية أحادية: زوج مشترك","رابطة تساهمية ثنائية: زوجان مشتركان","رابطة تساهمية ثلاثية: ثلاثة أزواج مشتركة"][Math.max(...M.b.map(b=>b[2]))],"#f3dfa8",24)}
   else{c.restore();label(c,cx,520,"قرّبي الذرّات حتى تتداخل مستوياتها الخارجية","#f3dfa8",24)}
   if(!lew&&bonded)label(c,cx,120,"لون الإلكترون المشترك يدلّ على الذرّة التي جاء منها","#cfd5de",19)}
  label(c,cx,566,MOL[S.m].n+" "+sub(S.m),"#fff",26)},
 challenges:[{t:"كوّني رابطة ثلاثية",test:s=>s.m==="N2"&&s.a>85},{t:"جرّبي طرق العرض الثلاث",test:(s,h)=>h.v.size>=3},{t:"استكشفي 5 جزيئات",test:(s,h)=>h.m.size>=5},{t:"سجّلي 3 قراءات",test:(s,h,r)=>r.length>=3}],
 notebook:{goal:"أستقصي الروابط في المركّبات التساهمية، وأميّز الرابطة الأحادية والثنائية والثلاثية.",mats:"مجموعة نماذج الذرّات والجزيئات (كرات وعصي).",
  steps:["اختاري H₂ واجعلي «اقتراب الذرّات» صفرًا، ثمّ قرّبيهما تدريجيًّا.","راقبي الإلكترونين المشتركين بين الذرّتين، ثمّ بدّلي العرض إلى «لويس».","كرّري مع O₂ و N₂ وقارني عدد الأزواج المشتركة.","استكشفي H₂O و NH₃ و CH₄ بعرض «كرات وعصي» وسجّلي الشكل والزاوية."],
  questions:[{q:"كم زوجًا من الإلكترونات تشترك فيه ذرّتا النيتروجين؟ وما نوع الرابطة؟",a:"ثلاثة أزواج؛ رابطة تساهمية ثلاثية."},
   {q:"لماذا تكوّن ذرّة الأكسجين رابطتين بينما تكوّن ذرّة الكلور رابطة واحدة؟",a:"لأنّ الأكسجين يحتاج إلكترونين ليكمل ثمانيته (6 إلكترونات تكافؤ)، والكلور يحتاج إلكترونًا واحدًا (7 إلكترونات تكافؤ)."},
   {q:"كم زوجًا غير رابط على ذرّة الأكسجين في جزيء الماء؟",a:"زوجان غير رابطين، وهما سبب الشكل المنحني لجزيء الماء."},
   {q:"قارني بين الرابطة الأيونية والرابطة التساهمية.",a:"الأيونية: انتقال إلكترونات بين فلزّ ولافلزّ وتكوّن أيونات. التساهمية: مشاركة أزواج من الإلكترونات بين ذرّات لافلزّات."}],
  concl:"تتكوّن الرابطة التساهمية بمشاركة الذرّات في زوج أو أكثر من الإلكترونات؛ زوج واحد رابطة أحادية، وزوجان رابطة ثنائية، وثلاثة أزواج رابطة ثلاثية."}});

/* ===== 3) موازنة المعادلات ===== */
const EQ={
 w:{n:"تكوين الماء",sp:["H2","O2"],pr:["H2O"],ans:[2,1,2]},
 nh:{n:"تحضير الأمونيا",sp:["N2","H2"],pr:["NH3"],ans:[1,3,2]},
 na:{n:"تكوين ملح الطعام",sp:["Na","Cl2"],pr:["NaCl"],ans:[2,1,2]},
 mg:{n:"المغنيسيوم وحمض HCl",sp:["Mg","HCl"],pr:["MgCl2","H2"],ans:[1,2,1,1]},
 ch:{n:"احتراق الميثان",sp:["CH4","O2"],pr:["CO2","H2O"],ans:[1,2,1,2]},
 fe:{n:"صدأ الحديد",sp:["Fe","O2"],pr:["Fe2O3"],ans:[4,3,2]},
 al:{n:"أكسدة الألمنيوم",sp:["Al","O2"],pr:["Al2O3"],ans:[4,3,2]},
 c3:{n:"احتراق البروبان",sp:["C3H8","O2"],pr:["CO2","H2O"],ans:[1,5,3,4]}};
const parse=f=>{const o={};f.replace(/([A-Z][a-z]?)(\d*)/g,(m,e,n)=>{o[e]=(o[e]||0)+(+n||1)});return o};
const species=e=>EQ[e].sp.concat(EQ[e].pr);
function counts(S){const E=EQ[S.e],L={},R={};species(S.e).forEach((f,i)=>{const k=S["c"+i]||1,o=parse(f),T=i<E.sp.length?L:R;for(const x in o)T[x]=(T[x]||0)+o[x]*k});return{L,R,els:[...new Set(Object.keys(L).concat(Object.keys(R)))]}}
const gcd=(a,b)=>b?gcd(b,a%b):a;
function isBal(S){const{L,R,els}=counts(S);return els.every(e=>L[e]===R[e])}
function molAtoms(f){const o=parse(f);const list=[];const keys=Object.keys(o).sort((a,b)=>(a==="H")-(b==="H")||o[a]-o[b]);keys.forEach(k=>{for(let i=0;i<o[k];i++)list.push(k)});return list}
function drawMol(c,x,y,f,sc,maxW){const at=molAtoms(f);const n=at.length;let R=k=>(k==="H"?10:k==="Fe"||k==="Al"||k==="Na"||k==="Mg"?15:13)*sc;
 const pts=n===1?[[0,0]]:n===2?[[-.6,0],[.6,0]]:at.map((_,i)=>i===0?[0,0]:[Math.cos((i-1)/(n-1)*2*Math.PI)*1.05,Math.sin((i-1)/(n-1)*2*Math.PI)*1.05]);
 if(n>5){pts.length=0;const cols=Math.ceil(n/2);at.forEach((_,i)=>pts.push([(i%cols-(cols-1)/2)*.95,(Math.floor(i/cols)-.5)*.95]))}
 let u=22*sc;const ext=Math.max(...pts.map(p=>Math.abs(p[0])))*2+1.4;if(maxW&&ext*u>maxW){const k=maxW/(ext*u);u*=k;sc*=k}
 at.map((k,i)=>[k,i]).forEach(([k,i])=>ball(c,x+pts[i][0]*u,y+pts[i][1]*u,R(k),EL[k].c,k.length>1||sc>.9?k:"",EL[k].t))}
VLab.reg({id:"c9-balance",preview:{c0:2,c1:1,c2:2},icon:"⚖️",grade:"الصف التاسع",subject:"الكيمياء",unit:"المعادلات الكيميائية",src:"مهارة موازنة المعادلات الكيميائية",
 title:"موازنة المعادلات الكيميائية",question:"كيف نوازن المعادلة الكيميائية لتحقّق قانون حفظ الكتلة؟",dyn:1,
 vars:[{k:"e",label:"المعادلة",type:"seg",val:"w",c:"#7A1F2E",opts:Object.keys(EQ).map(k=>[k,EQ[k].n])},
  ...[0,1,2,3].map(i=>({k:"c"+i,label:S=>"معامل "+sub(species(S.e)[i]||""),min:1,max:6,step:1,val:1,c:["#2b7bd6","#e04848","#2fae6a","#B8902A"][i],ticks:[1,2,3,4,5,6],hide:S=>!species(S.e)[i]}))],
 onSeg(S,k){if(k==="e")[0,1,2,3].forEach(i=>S["c"+i]=1)},
 read(s){const{L,R,els}=counts(s);const b=els.every(e=>L[e]===R[e]);const cs=species(s.e).map((f,i)=>s["c"+i]);const g0=cs.reduce(gcd);
  return els.map(e=>({label:"ذرّات "+e,val:"متفاعلات "+L[e]+" · نواتج "+R[e]+(L[e]===R[e]?" ✔":" ✘")})).concat([{label:"حالة المعادلة",val:b?(g0>1?"موزونة لكن ليست بأبسط نسبة":"موزونة ✔"):"غير موزونة"}])},
 draw(c,s,t,dt,S){const E=EQ[S.e],sp=species(S.e);const{L,R,els}=counts(S);const b=els.every(e=>L[e]===R[e]);
  // المعادلة
  const parts=sp.map((f,i)=>(S["c"+i]>1?S["c"+i]+" ":"")+sub(f));const txt=parts.slice(0,E.sp.length).join(" + ")+"  →  "+parts.slice(E.sp.length).join(" + ");
  c.save();c.direction="ltr";c.font="800 36px Cairo, sans-serif";const w=Math.min(c.measureText(txt).width+60,W-80);c.fillStyle=b?"rgba(31,143,91,.92)":"rgba(20,10,14,.85)";rr(c,W/2-w/2,96,w,62,16);c.fill();c.strokeStyle=b?"#7dffb5":"#B8902A";c.lineWidth=3;c.stroke();
  c.fillStyle="#fff";c.textAlign="center";c.textBaseline="middle";c.fillText(txt,W/2,129,w-30);c.restore();
  // لوحتا المتفاعلات والنواتج (من اليسار إلى اليمين كما تُكتب المعادلة)
  const pan=[[40,430,"المتفاعلات",0,E.sp.length],[530,390,"النواتج",E.sp.length,sp.length]];
  pan.forEach(([x0,w0,ttl,a,z])=>{c.fillStyle="rgba(255,255,255,.05)";c.strokeStyle="rgba(243,223,168,.35)";c.lineWidth=2;rr(c,x0,172,w0,236,16);c.fill();c.stroke();label(c,x0+w0/2,192,ttl,"#f3dfa8",20);
   const items=[];for(let i=a;i<z;i++)for(let k=0;k<S["c"+i];k++)items.push(sp[i]);const n=items.length;const cols=Math.min(n,n>8?5:4),rows=Math.ceil(n/cols);const sc=n>12?.8:n>8?1:n>4?1.25:1.55;
   items.forEach((f,j)=>{const cl=j%cols,rw=Math.floor(j/cols);drawMol(c,x0+w0*(cl+.5)/cols,212+(rw+.5)*(192/rows)+Math.sin(t*2+j)*2,f,sc,w0/cols*.86)})});
  c.save();c.direction="ltr";c.fillStyle="#f3dfa8";c.font="900 44px Cairo";c.textAlign="center";c.fillText("→",495,300);c.restore();
  // جدول عدّ الذرّات
  const cw=Math.min(150,(W-80)/els.length);const x1=W/2-cw*els.length/2;
  els.forEach((e,i)=>{const ok=L[e]===R[e];const x=x1+i*cw;c.fillStyle=ok?"rgba(31,143,91,.85)":"rgba(179,38,30,.8)";rr(c,x+6,424,cw-12,84,12);c.fill();
   ball(c,x+28,446,13,EL[e].c,e,EL[e].t);c.save();c.direction="ltr";c.fillStyle="#fff";c.font="800 24px Cairo";c.textAlign="center";c.textBaseline="middle";c.fillText(L[e]+" | "+R[e],x+cw/2+12,446);c.font="700 18px Cairo";c.fillText(ok?"✔ متساوية":"✘ غير متساوية",x+cw/2,486);c.restore()});
  if(b){for(let k=0;k<10;k++){const a=t*2+k*.63;c.fillStyle="rgba(125,255,181,"+(.5+.5*Math.sin(t*6+k))+")";c.beginPath();c.arc(W/2+Math.cos(a)*(260+k*6),127+Math.sin(a)*40,3,0,7);c.fill()}
   label(c,W/2,548,"🎉 المعادلة موزونة: عدد ذرّات كلّ عنصر متساوٍ في الطرفين","#7dffb5",24)}
  else label(c,W/2,548,"غيّري المعاملات (لا تغيّري الصيغ) حتى تتساوى الذرّات","#f3dfa8",22)},
 challenges:(()=>{const done=new Set();const tr=s=>{if(isBal(s))done.add(s.e);return done};return[
  {t:"وازني معادلة تكوين الماء",test:s=>tr(s).has("w")},{t:"وازني 4 معادلات مختلفة",test:s=>tr(s).size>=4},{t:"وازني احتراق البروبان",test:s=>tr(s).has("c3")},{t:"سجّلي معادلة موزونة في الدفتر",test:(s,h,r)=>r.some(x=>Object.values(x).some(v=>String(v).startsWith("موزونة ✔")))}]})(),
 notebook:{goal:"أوازن المعادلات الكيميائية بتغيير المعاملات بحيث يتساوى عدد ذرّات كلّ عنصر في طرفي المعادلة.",
  steps:["اختاري معادلة «تكوين الماء».","عدّي ذرّات كلّ عنصر في الطرفين من الجدول أسفل المشهد.","غيّري معامل المادّة التي ينقصها ذرّات، ثمّ أعيدي العدّ.","استمرّي حتى تصبح كلّ الخانات خضراء، ثمّ سجّلي القراءة.","انتقلي إلى معادلات أصعب: صدأ الحديد واحتراق البروبان."],
  questions:[{q:"لماذا لا يجوز تغيير الرقم الصغير (الدليل) في الصيغة عند الموازنة؟",a:"لأنّ تغييره يغيّر المادّة نفسها (مثل H₂O إلى H₂O₂)، أمّا المعامل فيغيّر عدد الجزيئات فقط."},
   {q:"اكتبي معادلة صدأ الحديد موزونة.",a:"4Fe + 3O₂ → 2Fe₂O₃"},
   {q:"ما القانون الذي تحقّقه المعادلة الموزونة؟",a:"قانون حفظ الكتلة: الذرّات لا تفنى ولا تُستحدث في التفاعل الكيميائي، بل يُعاد ترتيبها."},
   {q:"المعاملات 4، 2، 4 توازن معادلة تكوين الماء. هل هي الإجابة الأفضل؟",a:"المعادلة موزونة، لكنّنا نكتب المعاملات بأبسط نسبة صحيحة: 2H₂ + O₂ → 2H₂O."}],
  concl:"المعادلة الموزونة يتساوى فيها عدد ذرّات كلّ عنصر في المتفاعلات والنواتج، ونوازنها بتغيير المعاملات فقط وبأبسط نسبة."}});

/* ===== 4) التوصيل الكهربائي ===== */
const CND={nacl_s:{n:"ملح طعام صلب",sol:0,ion:1,k:0,ty:"أيوني"},nacl_aq:{n:"محلول ملح الطعام",sol:1,ion:1,k:1,ty:"أيوني"},cuso4:{n:"محلول كبريتات النحاس",sol:1,ion:1,k:.85,ty:"أيوني",col:"rgba(60,140,230,"},
 sug_s:{n:"سكّر صلب",sol:0,ion:0,k:0,ty:"تساهمي"},sug_aq:{n:"محلول السكّر",sol:1,ion:0,k:0,ty:"تساهمي"},dw:{n:"ماء مقطّر",sol:1,ion:0,k:.02,ty:"تساهمي"}};
VLab.reg({id:"c10-conduct",preview:{m:"nacl_aq"},icon:"💡",grade:"الصف العاشر",subject:"الكيمياء",unit:"الوحدة 3: الروابط الكيميائية",src:"كتاب الأنشطة ص18–20",
 title:"التوصيل الكهربائي للمركّبات الأيونية والتساهمية",question:"أيّ المواد توصل التيار الكهربائي؟ ولماذا؟",dyn:1,
 vars:[{k:"m",label:"المادّة",type:"seg",val:"nacl_s",c:"#7A1F2E",opts:Object.keys(CND).map(k=>[k,CND[k].n])},
  {k:"V",label:"جهد البطّارية",unit:"V",min:0,max:12,step:1,val:6,c:"#B8902A",ticks:[0,3,6,9,12]},
  {k:"cn",label:"تركيز المحلول",unit:"%",min:5,max:100,step:5,val:50,c:"#2b7bd6",ticks:[5,50,100],hide:S=>!CND[S.m].sol||!CND[S.m].ion}],
 read(s){const M=CND[s.m],I=cur(s);return[{label:"شدّة التيار",val:I.toFixed(0),unit:"mA"},{label:"المصباح",val:I>40?"يضيء ✔":I>5?"يضيء ضعيفًا":"لا يضيء ✘"},{label:"نوع المركّب",val:M.ty},
  {label:"التفسير",val:M.ion&&M.sol?"أيونات حرّة الحركة":M.ion?"الأيونات مقيّدة في الشبكة البلّورية":"جزيئات متعادلة بلا أيونات"}]},
 draw(c,s,t,dt,S){const M=CND[S.m],I=cur(s);const bx=250,by=250,bw=420,bh=210;
  // البطارية والأسلاك والمصباح
  c.strokeStyle="#d9a441";c.lineWidth=5;c.beginPath();c.moveTo(bx+60,by+40);c.lineTo(bx+60,130);c.lineTo(400,130);c.moveTo(470,130);c.lineTo(496,130);c.moveTo(544,130);c.lineTo(bx+bw-60,130);c.lineTo(bx+bw-60,by+40);c.stroke();
  // بطارية
  c.fillStyle="#2a2a30";rr(c,400,112,70,36,6);c.fill();c.fillStyle="#d9a441";rr(c,400,112,22,36,4);c.fill();label(c,446,130,s.V.toFixed(0)+"V","#fff",18);label(c,392,104,"+","#ff8a65",22);label(c,478,104,"−","#7ad0ff",22);
  // مصباح
  const gl=Math.min(1,I/120);if(gl>0){const gr=c.createRadialGradient(520,120,4,520,120,90*gl+10);gr.addColorStop(0,"rgba(255,240,170,"+(.9*gl)+")");gr.addColorStop(1,"rgba(255,220,120,0)");c.fillStyle=gr;c.beginPath();c.arc(520,120,100,0,7);c.fill()}
  c.fillStyle=gl>0?"rgba(255,245,190,"+(.35+.65*gl)+")":"rgba(220,225,235,.25)";c.strokeStyle="#e8e8ee";c.lineWidth=2.5;c.beginPath();c.arc(520,112,24,0,7);c.fill();c.stroke();c.fillStyle="#888";rr(c,508,134,24,14,3);c.fill();
  c.strokeStyle=gl>0?"#ffb02e":"#777";c.lineWidth=2;c.beginPath();c.moveTo(512,128);c.lineTo(516,104);c.lineTo(524,116);c.lineTo(528,104);c.stroke();
  // الكأس
  if(M.sol){const lg=c.createLinearGradient(0,by+40,0,by+bh);const base=M.col||"rgba(150,200,240,";lg.addColorStop(0,base+".25)");lg.addColorStop(1,base+".5)");c.fillStyle=lg;c.fillRect(bx+6,by+40,bw-12,bh-46)}
  else{c.fillStyle=M.ion?"#f5f5f7":"#fffbe8";for(let i=0;i<20;i++){const x=bx+40+(i%10)*34,y=by+bh-30-Math.floor(i/10)*26;rr(c,x,y,30,24,4);c.fill()}}
  c.strokeStyle="rgba(230,240,255,.75)";c.lineWidth=4;c.beginPath();c.moveTo(bx,by);c.lineTo(bx,by+bh);c.lineTo(bx+bw,by+bh);c.lineTo(bx+bw,by);c.stroke();
  // الأقطاب
  [[bx+60,"#ff8a65","+"],[bx+bw-60,"#7ad0ff","−"]].forEach(([x,col,sg])=>{c.fillStyle="#3b3b42";rr(c,x-9,by+20,18,bh-40,4);c.fill();label(c,x,by+bh+20,sg,col,26)});
  // الجسيمات
  const n=M.sol?Math.round(10+(M.ion?s.cn/100*18:12)):0;const F=Math.min(1,s.V/12);
  for(let i=0;i<n;i++){const ph=(i*0.618)%1,yy=by+60+((i*37+i*i*13)%(bh-90));
   if(M.ion){const pos=i%2===0;const drift=F*((t*.25+ph)%1);const span=bw-150;let xx=bx+75+((ph*span+(pos?1:-1)*drift*span)%span+span)%span;
    if(M.k){ball(c,xx,yy+Math.sin(t*3+i)*3,pos?11:13,pos?(S.m==="cuso4"?"#5aa0ff":"#a66bd6"):(S.m==="cuso4"?"#e8cf2e":"#36c46a"),pos?"+":"−","#fff")}}
   else{const xx=bx+80+((i*61)%(bw-160))+Math.sin(t+i)*6;ball(c,xx,yy+Math.cos(t*1.3+i)*5,10,"#f2e6c9","","#000")}}
  if(!M.sol&&M.ion){label(c,bx+bw/2,by+bh-70,"الأيونات مقيّدة في البلّورة","#fff",20)}
  // الأميتر
  card(c,W-250,180,220,120,"الأميتر",I.toFixed(0)+" mA",I/200,"#ffd34d");
  label(c,bx+bw/2,by+bh+56,M.n,"#f3dfa8",26)},
 challenges:[{t:"اجعلي المصباح يضيء",test:s=>cur(s)>40},{t:"قارني الملح الصلب بمحلوله",test:(s,h)=>h.m.has("nacl_s")&&h.m.has("nacl_aq")},{t:"اختبري المواد الستّ",test:(s,h)=>h.m.size>=6},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أستقصي خصيصة التوصيل الكهربائي للمركّبات الأيونية والتساهمية في الحالة الصلبة وفي المحلول.",mats:"ملح الطعام، سكّر، كبريتات النحاس، ماء مقطّر، كؤوس زجاجية، أقطاب جرافيت، أسلاك، مصباح، بطّارية.",
  steps:["اختاري «ملح طعام صلب» وراقبي المصباح والأميتر.","اختاري «محلول ملح الطعام»، ثمّ غيّري التركيز والجهد وراقبي حركة الأيونات.","اختبري السكّر الصلب ومحلوله والماء المقطّر.","سجّلي شدّة التيار لكلّ مادّة في الدفتر."],
  questions:[{q:"لماذا لا يوصل ملح الطعام الصلب التيار الكهربائي بينما يوصله محلوله؟",a:"لأنّ الأيونات في الحالة الصلبة مقيّدة في الشبكة البلّورية، أمّا في المحلول فتصبح حرّة الحركة فتنقل الشحنات."},
   {q:"لماذا لا يوصل محلول السكّر التيار الكهربائي؟",a:"لأنّ السكّر مركّب تساهمي يذوب على شكل جزيئات متعادلة، لا أيونات."},
   {q:"إلى أيّ قطب تتّجه الأيونات الموجبة؟ ولماذا؟",a:"إلى القطب السالب، لأنّ الشحنات المختلفة تتجاذب."},
   {q:"ما أثر زيادة تركيز محلول الملح في شدّة التيار؟",a:"تزداد شدّة التيار لزيادة عدد الأيونات الحرّة التي تنقل الشحنة."}],
  concl:"المركّبات الأيونية توصل التيار الكهربائي في المحلول (والمصهور) لوجود أيونات حرّة الحركة، ولا توصله في الحالة الصلبة، أمّا المركّبات التساهمية فلا توصله غالبًا."}});
function cur(s){const M=CND[s.m];return M.k*(M.sol&&M.ion?s.cn/100:1)*s.V*16}

/* ===== 5) الكواشف: حمض أم قاعدة؟ ===== */
const SBS={lem:["عصير الليمون",2.2],vin:["الخلّ",2.8],cola:["مشروب غازي",3.2],milk:["الحليب",6.6],dw:["ماء مقطّر",7],bs:["صودا الخبز",8.4],soap:["ماء الصابون",10],amm:["الأمونيا (منظّف)",11.6]};
const IND={cab:"الملفوف الأحمر",lit:"تبّاع الشمس",php:"الفينولفثالين",uni:"الكاشف العامّ"};
const lerp=(st,p)=>{for(let i=0;i<st.length-1;i++){const[a,c1]=st[i],[b,c2]=st[i+1];if(p<=b){const f=Math.max(0,(p-a)/(b-a));const A=c1.match(/\w\w/g).map(h=>parseInt(h,16)),B=c2.match(/\w\w/g).map(h=>parseInt(h,16));return A.map((v,k)=>Math.round(v+(B[k]-v)*f))}}return st[st.length-1][1].match(/\w\w/g).map(h=>parseInt(h,16))};
const ICOL={cab:[[1,"d0213a"],[3,"e04f8a"],[5,"8e4fb0"],[7,"5b55c7"],[9,"2f8f9f"],[11,"3aa04a"],[13,"d8c22a"]],lit:[[0,"d63a3a"],[4.5,"d63a3a"],[8.3,"3a5fd6"],[14,"3a5fd6"]],
 php:[[0,"f2f0ea"],[8.2,"f2f0ea"],[10,"e0368f"],[14,"e0368f"]],uni:[[1,"e0201b"],[3,"f26b1d"],[5,"f3c21f"],[7,"3fae3f"],[9,"2a7fd6"],[11,"3d3db8"],[13,"6a2a9a"]]};
const CNAME=(i,p)=>({cab:p<3?"أحمر":p<5?"وردي":p<6.5?"بنفسجي":p<8?"أزرق بنفسجي":p<10?"أزرق مخضرّ":p<12?"أخضر":"أصفر",lit:p<5?"أحمر":p<8?"بنفسجي":"أزرق",php:p<8.2?"عديم اللون":"زهري",uni:p<2.5?"أحمر":p<4?"برتقالي":p<6?"أصفر":p<8?"أخضر":p<10?"أزرق":p<12?"نيلي":"بنفسجي"})[i];
VLab.reg({id:"c9-indicator",preview:{d:3,s:"cola"},icon:"🧪",grade:"الصف التاسع",subject:"الكيمياء",unit:"الوحدة 2: الحموض والقواعد",src:"كتاب الطالب ص45",
 title:"الخصائص الحمضية والقاعدية لبعض المواد",question:"كيف نستخدم الكواشف لتصنيف المواد المنزلية إلى حمضية وقاعدية ومتعادلة؟",
 vars:[{k:"s",label:"المادّة",type:"seg",val:"lem",c:"#7A1F2E",opts:Object.keys(SBS).map(k=>[k,SBS[k][0]])},
  {k:"i",label:"الكاشف",type:"seg",val:"cab",c:"#2b7bd6",opts:Object.keys(IND).map(k=>[k,IND[k]])},
  {k:"d",label:"عدد قطرات الكاشف",unit:"قطرة",min:0,max:5,step:1,val:0,c:"#B8902A",ticks:[0,1,2,3,4,5]}],
 read(s){const p=SBS[s.s][1];return[{label:"لون المحلول بعد الكاشف",val:s.d?CNAME(s.i,p):"أضيفي قطرات"},{label:"تصنيف المادّة",val:s.d?(p<6.5?"حمضية":p<=7.5?"متعادلة":"قاعدية"):"—"},{label:"الرقم الهيدروجيني pH",val:s.d&&s.i==="uni"?p.toFixed(1):"يظهر مع الكاشف العامّ"}]},
 draw(c,s,t,dt,S){const p=SBS[S.s][1];const col=lerp(ICOL[S.i],p);const k=Math.min(1,s.d/3);
  const base=[235,235,225];const mix=base.map((v,j)=>Math.round(v+(col[j]-v)*k));
  // قطّارة
  const dropping=Math.abs(s.d-S.d)>.05;c.fillStyle="#e9edf3";rr(c,465,60,30,90,10);c.fill();c.fillStyle="rgb("+col.join(",")+")";rr(c,470,96,20,46,6);c.fill();c.fillStyle="#333";rr(c,458,46,44,26,10);c.fill();
  if(dropping||s.d<S.d){const y=160+((t*300)%120);c.fillStyle="rgb("+col.join(",")+")";c.beginPath();c.ellipse(480,y,6,9,0,0,7);c.fill()}
  // أنبوب
  c.fillStyle="rgba("+mix.join(",")+",.92)";c.beginPath();c.moveTo(440,300);c.lineTo(440,430);c.arc(480,430,40,Math.PI,0,true);c.lineTo(520,300);c.closePath();c.fill();
  c.fillStyle="rgba(255,255,255,.35)";c.fillRect(448,300,8,120);
  c.strokeStyle="rgba(230,240,255,.8)";c.lineWidth=4;c.beginPath();c.moveTo(436,180);c.lineTo(436,430);c.arc(480,430,44,Math.PI,0,true);c.lineTo(524,180);c.stroke();
  for(let i=0;i<6;i++){const f=(t*.4+i/6)%1;c.fillStyle="rgba(255,255,255,"+(.5*(1-f))+")";c.beginPath();c.arc(450+((i*23)%60),440-f*140,3,0,7);c.fill()}
  label(c,480,494,SBS[S.s][0],"#fff",24);
  // حامل أنابيب
  
  // شريط pH
  const x0=60,w0=W-120,y0=530;for(let i=0;i<14;i++){const cc=lerp(ICOL.uni,i+.5);c.fillStyle="rgb("+cc.join(",")+")";c.fillRect(x0+w0-((i+1)/14)*w0,y0,w0/14+1,26)}
  c.save();c.direction="ltr";for(let i=0;i<=14;i+=7)label(c,x0+w0-(i/14)*w0-(i===0?10:i===14?-10:0),y0+42,String(i),"#fff",18);c.restore();
  label(c,x0+w0-150,y0+42,"حمضي","#ff9a7a",18);label(c,x0+150,y0+42,"قاعدي","#7ad0ff",18);label(c,x0+w0/2+60,y0+42,"متعادل","#9fe0a0",18);
  if(s.d>0&&S.i==="uni"){const mx=x0+w0-(p/14)*w0;c.fillStyle="#fff";c.beginPath();c.moveTo(mx,y0-2);c.lineTo(mx-10,y0-18);c.lineTo(mx+10,y0-18);c.fill()}
  card(c,W-300,200,260,104,"لون الكاشف",s.d?CNAME(S.i,p):"—",null);
  c.fillStyle="rgb("+mix.join(",")+")";c.beginPath();c.arc(W-170,350,26,0,7);c.fill();c.strokeStyle="#fff";c.lineWidth=2;c.stroke();
  label(c,170,250,IND[S.i],"#f3dfa8",24)},
 challenges:[{t:"صنّفي 4 مواد مختلفة",test:(s,h)=>h.s.size>=5},{t:"جرّبي الكواشف الأربعة",test:(s,h)=>h.i.size>=4},{t:"اكتشفي pH الصابون بالكاشف العامّ",test:s=>s.s==="soap"&&s.i==="uni"&&s.d>0},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أصنّف بعض المواد المنزلية إلى حمضية وقاعدية ومتعادلة باستخدام الكواشف.",mats:"عصير ليمون، خلّ، حليب، ماء مقطّر، صودا الخبز، صابون، كاشف الملفوف الأحمر، ورق تبّاع الشمس، فينولفثالين، كاشف عامّ، أنابيب اختبار.",
  steps:["اختاري مادّة وكاشفًا، ثمّ أضيفي القطرات تدريجيًّا.","سجّلي لون المحلول وتصنيف المادّة.","كرّري لكلّ المواد بكاشف الملفوف الأحمر.","استخدمي الكاشف العامّ لتقدير الرقم الهيدروجيني pH."],
  questions:[{q:"ما لون كاشف الفينولفثالين في المحلول الحمضي؟ وفي القاعدي؟",a:"عديم اللون في الحمضي والمتعادل، وزهري في القاعدي."},
   {q:"أيّ الكواشف أفضل لتقدير قيمة pH؟ ولماذا؟",a:"الكاشف العامّ؛ لأنّه يعطي لونًا مختلفًا لكلّ مدى من قيم pH."},
   {q:"صنّفي: الخلّ، الماء المقطّر، ماء الصابون.",a:"الخلّ حمضي، الماء المقطّر متعادل، ماء الصابون قاعدي."},
   {q:"لماذا يُعدّ الملفوف الأحمر كاشفًا طبيعيًّا؟",a:"لأنّه يحتوي صبغة يتغيّر لونها بتغيّر الوسط الحمضي أو القاعدي."}],
  concl:"الكاشف مادّة يتغيّر لونها بتغيّر حمضية الوسط؛ الحموض pH أقلّ من 7، والمتعادل 7، والقواعد أكبر من 7."}});

/* ===== 6) تفاعل التعادل (المعايرة) ===== */
const phOf=v=>{const na=2.5,nb=.1*v,V=25+v;if(Math.abs(nb-na)<1e-9)return 7;if(nb<na)return -Math.log10((na-nb)/V);return 14+Math.log10((nb-na)/V)};
VLab.reg({id:"c9-titration",preview:{v:30},icon:"⚗️",grade:"الصف التاسع",subject:"الكيمياء",unit:"الوحدة 2: الحموض والقواعد",src:"كتاب الطالب ص61",
 title:"تفاعل تعادل حمض وقاعدة",question:"ماذا يحدث للرقم الهيدروجيني عند إضافة قاعدة إلى حمض تدريجيًّا؟ ومتى يحدث التعادل؟",
 vars:[{k:"v",label:"حجم NaOH المضاف",unit:"mL",min:0,max:50,step:.5,val:0,c:"#2b7bd6",ticks:[0,10,20,30,40,50]},
  {k:"i",label:"الكاشف",type:"seg",val:"php",c:"#7A1F2E",opts:[["php","الفينولفثالين"],["uni","الكاشف العامّ"],["none","بلا كاشف"]]}],
 read(s){const p=phOf(s.v);return[{label:"الرقم الهيدروجيني pH",val:p.toFixed(2)},{label:"حالة المحلول",val:p<6.8?"حمضي":p<=7.2?"متعادل":"قاعدي"},{label:"حجم HCl في الدورق",val:25,unit:"mL"},{label:"نقطة التكافؤ",val:Math.abs(s.v-25)<.3?"وصلتِ إليها ✔":"عند 25 mL"}]},
 draw(c,s,t,dt,S){const v=s.v,p=phOf(v);
  // سحاحة
  const bx=250;c.fillStyle="rgba(230,240,255,.15)";c.strokeStyle="rgba(230,240,255,.8)";c.lineWidth=3;rr(c,bx-14,40,28,250,6);c.fill();c.stroke();
  const lvl=60+(v/50)*200;c.fillStyle="rgba(120,180,255,.6)";c.fillRect(bx-11,lvl,22,286-lvl);
  for(let k=0;k<=50;k+=10){const y=60+k/50*200;c.strokeStyle="#fff";c.lineWidth=1.5;c.beginPath();c.moveTo(bx-14,y);c.lineTo(bx-4,y);c.stroke();c.save();c.direction="ltr";label(c,bx-34,y,String(k),"#f3dfa8",15);c.restore()}
  c.fillStyle="#555";rr(c,bx-20,290,40,12,4);c.fill();c.fillRect(bx-3,302,6,24);label(c,bx,30,"NaOH 0.1M","#cfe3ff",18);
  if(Math.abs(S.v-s.v)>.05){const y=330+((t*260)%70);c.fillStyle="rgba(120,180,255,.9)";c.beginPath();c.ellipse(bx,y,4,7,0,0,7);c.fill()}
  // دورق مخروطي
  let col=[235,238,240];if(S.i==="php"){const f=Math.max(0,Math.min(1,(p-8.2)/1.8));col=[235+(224-235)*f,238+(54-238)*f*.75,240+(143-240)*f*.6].map(Math.round)}else if(S.i==="uni")col=lerp(ICOL.uni,p);
  c.fillStyle="rgba("+col.join(",")+",.92)";c.beginPath();c.moveTo(bx-18,400);c.lineTo(bx-85,470);c.quadraticCurveTo(bx-90,480,bx-78,480);c.lineTo(bx+78,480);c.quadraticCurveTo(bx+90,480,bx+85,470);c.lineTo(bx+18,400);c.closePath();c.fill();
  c.strokeStyle="rgba(230,240,255,.85)";c.lineWidth=4;c.beginPath();c.moveTo(bx-16,340);c.lineTo(bx-16,395);c.lineTo(bx-88,470);c.quadraticCurveTo(bx-94,484,bx-78,484);c.lineTo(bx+78,484);c.quadraticCurveTo(bx+94,484,bx+88,470);c.lineTo(bx+16,395);c.lineTo(bx+16,340);c.stroke();
  label(c,bx,520,"HCl 0.1M (25 mL)","#fff",20);
  // منحنى المعايرة
  const gx=500,gy=110,gw=410,gh=300;c.fillStyle="rgba(20,10,14,.82)";rr(c,gx-46,gy-30,gw+70,gh+80,14);c.fill();
  c.strokeStyle="rgba(255,255,255,.25)";c.lineWidth=1;for(let k=0;k<=14;k+=7){const y=gy+gh-k/14*gh;c.beginPath();c.moveTo(gx,y);c.lineTo(gx+gw,y);c.stroke();c.save();c.direction="ltr";label(c,gx-18,y,String(k),"#f3dfa8",15);c.restore()}
  for(let k=0;k<=50;k+=25){const x=gx+k/50*gw;c.save();c.direction="ltr";label(c,x,gy+gh+18,String(k),"#f3dfa8",15);c.restore()}
  label(c,gx+gw/2,gy+gh+44,"حجم NaOH (mL)","#cfd5de",17);label(c,gx+gw/2,gy-12,"منحنى المعايرة: pH مقابل الحجم","#f3dfa8",18);
  c.strokeStyle="rgba(255,211,77,.18)";c.lineWidth=2;c.setLineDash([5,6]);c.beginPath();for(let x=0;x<=50;x+=.25){const X=gx+x/50*gw,Y=gy+gh-phOf(x)/14*gh;x?c.lineTo(X,Y):c.moveTo(X,Y)}c.stroke();c.setLineDash([]);
  c.strokeStyle="#ffd34d";c.lineWidth=4;c.beginPath();for(let x=0;x<=v;x+=.25){const X=gx+x/50*gw,Y=gy+gh-phOf(x)/14*gh;x?c.lineTo(X,Y):c.moveTo(X,Y)}c.stroke();
  const X=gx+v/50*gw,Y=gy+gh-p/14*gh;ball(c,X,Y,9,"#ff8a65");
  card(c,30,96,170,96,"pH",p.toFixed(2),null);
  if(Math.abs(v-25)<.3)label(c,gx+gw/2,gy+gh/2,"⚖️ نقطة التكافؤ","#7dffb5",26)},
 challenges:[{t:"صلي إلى نقطة التكافؤ (25 mL)",test:s=>Math.abs(s.v-25)<.3},{t:"اجعلي المحلول قاعديًّا",test:s=>phOf(s.v)>11},{t:"ارسمي المنحنى كاملًا حتى 50 mL",test:s=>s.v>=50},{t:"سجّلي 5 قراءات لرسم المنحنى",test:(s,h,r)=>r.length>=5}],
 notebook:{goal:"أدرس تفاعل التعادل بين حمض قويّ وقاعدة قويّة، وأحدّد نقطة التكافؤ.",mats:"محلول HCl تركيزه 0.1M، محلول NaOH تركيزه 0.1M، سحّاحة، دورق مخروطي، فينولفثالين، جهاز pH.",
  steps:["اختاري كاشف الفينولفثالين، وأضيفي NaOH تدريجيًّا (5 mL كلّ مرّة) وسجّلي pH.","اقتربي من 25 mL بخطوات صغيرة (0.5 mL) وراقبي تغيّر اللون.","تابعي الإضافة حتى 50 mL.","لاحظي شكل منحنى المعايرة والقفزة الحادّة عند نقطة التكافؤ."],
  questions:[{q:"اكتبي معادلة تفاعل التعادل.",a:"HCl + NaOH → NaCl + H₂O"},{q:"عند أيّ حجم حدث التعادل؟ ولماذا؟",a:"عند 25 mL؛ لأنّ عدد مولات NaOH المضافة يساوي عدد مولات HCl (التركيز والحجم متساويان)."},
   {q:"ما قيمة pH عند نقطة التكافؤ لتفاعل حمض قويّ مع قاعدة قويّة؟",a:"7 تقريبًا، لأنّ الناتج ملح متعادل وماء."},{q:"لماذا يتغيّر pH ببطء في البداية ثمّ بسرعة كبيرة قرب 25 mL؟",a:"لأنّ الحمض المتبقّي في البداية كثير فتُستهلك القاعدة المضافة، وقرب التكافؤ تكفي قطرة واحدة لتغيير كبير في تركيز أيونات H⁺."}],
  concl:"في تفاعل التعادل يتفاعل الحمض مع القاعدة فيتكوّن ملح وماء، ويحدث تغيّر حادّ في pH عند نقطة التكافؤ التي يتساوى فيها عدد مولات الحمض والقاعدة."}});
/* ===== 7) كشف اللهب ===== */
const FL={Li:{n:"الليثيوم",salt:"LiCl",c:[230,40,60],cn:"أحمر قرمزي",l:[670.8,610.4]},Na:{n:"الصوديوم",salt:"NaCl",c:[255,170,20],cn:"أصفر برتقالي",l:[589.0,589.6]},
 K:{n:"البوتاسيوم",salt:"KCl",c:[190,120,230],cn:"بنفسجي فاتح (ليلكي)",l:[766.5,404.4]},Ca:{n:"الكالسيوم",salt:"CaCl₂",c:[255,90,30],cn:"أحمر برتقالي",l:[622,554,445]},
 Cu:{n:"النحاس",salt:"CuCl₂",c:[40,200,150],cn:"أخضر مزرقّ",l:[510.5,521.8,578.2]},Sr:{n:"السترونشيوم",salt:"SrCl₂",c:[220,20,40],cn:"أحمر",l:[640.8,606,460.7]},Ba:{n:"الباريوم",salt:"BaCl₂",c:[150,220,80],cn:"أخضر مصفرّ",l:[553.5,524.2,577.8]}};
function wl(l){let r=0,g2=0,b=0;if(l<440){r=-(l-440)/60;b=1}else if(l<490){g2=(l-440)/50;b=1}else if(l<510){g2=1;b=-(l-510)/20}else if(l<580){r=(l-510)/70;g2=1}else if(l<645){r=1;g2=-(l-645)/65}else r=1;return"rgb("+[r,g2,b].map(v=>Math.round(255*Math.max(0,Math.min(1,v)))).join(",")+")"}
VLab.reg({id:"c10-flame",icon:"🔥",preview:{e:"Cu",d:100},grade:"الصف العاشر",subject:"الكيمياء",unit:"الوحدة 1: تركيب الذرّة",src:"كتاب الأنشطة ص6",
 title:"اختلاف لون اللهب الصادر عن ذرّات العناصر",question:"لماذا يختلف لون اللهب باختلاف العنصر؟ وكيف نستخدمه في الكشف عن العناصر؟",
 vars:[{k:"e",label:"الملح المستخدم",type:"seg",val:"Na",c:"#7A1F2E",opts:Object.keys(FL).map(k=>[k,FL[k].salt])},
  {k:"d",label:"إدخال السلك في اللهب",unit:"%",min:0,max:100,step:1,val:0,c:"#e86a2a",ticks:[0,50,100]},
  {k:"sp",label:"المطياف",type:"seg",val:1,c:"#2b7bd6",opts:[[1,"🌈 إظهار الطيف"],[0,"إخفاء"]]}],
 read(s){const F=FL[s.e];const on=s.d>60;return[{label:"العنصر",val:F.n+" ("+s.e+")"},{label:"لون اللهب",val:on?F.cn:"أزرق (لهب الموقد)"},
  {label:"خطوط الطيف (nm)",val:on?F.l.join("، "):"—"},{label:"التفسير",val:on?"إلكترونات مُثارة تعود إلى مستويات أدنى وتطلق ضوءًا":"أدخلي السلك في اللهب"}]},
 draw(c,s,t,dt,S){const F=FL[S.e];const k=Math.max(0,Math.min(1,(s.d-40)/50));const bx=420,by=440;
  // الموقد
  c.fillStyle="#555b66";rr(c,bx-60,by+10,120,18,5);c.fill();c.fillStyle="#8a909b";rr(c,bx-14,by-70,28,84,4);c.fill();c.fillStyle="#6a707b";c.fillRect(bx-16,by-30,32,8);
  // اللهب
  for(let L=0;L<3;L++){const hgt=150+L*12+Math.sin(t*9+L)*8,wd=34-L*8;const gr=c.createLinearGradient(0,by-70-hgt,0,by-70);
   const col=F.c.map((v,j)=>Math.round([90,140,255][j]*(1-k)+v*k));gr.addColorStop(0,"rgba("+col.join(",")+",0)");gr.addColorStop(.35,"rgba("+col.join(",")+","+(.35+.4*k)+")");gr.addColorStop(1,"rgba(80,140,255,.85)");
   c.fillStyle=gr;c.beginPath();c.moveTo(bx-wd,by-70);c.quadraticCurveTo(bx-wd*1.2,by-70-hgt*.5,bx+Math.sin(t*7+L)*6,by-70-hgt);c.quadraticCurveTo(bx+wd*1.2,by-70-hgt*.5,bx+wd,by-70);c.fill()}
  c.fillStyle="rgba(150,200,255,.9)";c.beginPath();c.ellipse(bx,by-82,12,22,0,0,7);c.fill();
  if(k>0){const gl=c.createRadialGradient(bx,by-150,10,bx,by-150,200);gl.addColorStop(0,"rgba("+F.c.join(",")+","+(.35*k)+")");gl.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=gl;c.fillRect(bx-220,by-360,440,360)}
  // السلك
  const tip=bx-180+s.d/100*170;c.strokeStyle="#c9ccd3";c.lineWidth=3;c.beginPath();c.moveTo(tip-200,by-60);c.lineTo(tip,by-140);c.stroke();c.strokeStyle="#7a5a2e";c.lineWidth=10;c.beginPath();c.moveTo(tip-200,by-60);c.lineTo(tip-150,by-80);c.stroke();
  c.strokeStyle=k>0?"rgb("+F.c.join(",")+")":"#e6e6e6";c.lineWidth=3;c.beginPath();c.arc(tip+4,by-142,7,0,7);c.stroke();
  for(let i=0;i<10*k;i++){const f=(t*1.4+i/10)%1;c.fillStyle="rgba("+F.c.join(",")+","+(1-f)+")";c.beginPath();c.arc(bx+Math.sin(i*2.3+t)*20,by-140-f*120,2.5,0,7);c.fill()}
  label(c,bx,by+52,"ملح "+F.salt+" على سلك نيكروم","#f3dfa8",22);
  // الطيف
  if(S.sp){const x0=W-330,y0=124,w0=290;c.fillStyle="rgba(10,6,8,.9)";rr(c,x0-10,y0-30,w0+20,130,12);c.fill();label(c,x0+w0/2,y0-12,"طيف الانبعاث الخطّي","#f3dfa8",19);
   c.fillStyle="#000";c.fillRect(x0,y0+4,w0,46);const X=l=>x0+w0-(l-400)/(780-400)*w0;
   if(k>.3)F.l.forEach(l=>{c.fillStyle=wl(l);c.globalAlpha=Math.min(1,(k-.3)*1.6);c.fillRect(X(l)-2,y0+4,4,46);c.globalAlpha=1});
   for(let l=400;l<=780;l+=4){c.fillStyle=wl(l);c.globalAlpha=.9;c.fillRect(X(l)-2,y0+58,4,10)}c.globalAlpha=1;
   c.save();c.direction="ltr";label(c,x0+w0-6,y0+84,"400","#cfd5de",15);label(c,x0+8,y0+84,"780 nm","#cfd5de",15);c.restore()}
  card(c,W-290,270,250,100,"لون اللهب",k>.6?F.cn:"أزرق",null)},
 challenges:[{t:"اكشفي لون لهب الصوديوم",test:s=>s.e==="Na"&&s.d>60},{t:"قارني 5 عناصر",test:(s,h)=>h.e.size>=6},{t:"ميّزي الليثيوم من السترونشيوم بالطيف",test:(s,h)=>h.e.has("Li")&&h.e.has("Sr")&&s.sp},{t:"سجّلي 4 قراءات",test:(s,h,r)=>r.length>=4}],
 notebook:{goal:"أميّز لون اللهب الصادر عن ذرّات العناصر المختلفة، وأفسّر سببه.",mats:"أملاح كلوريدات (Li، Na، K، Ca، Cu، Sr، Ba)، سلك نيكروم، موقد بنسن، حمض HCl مخفّف لتنظيف السلك.",
  steps:["اختاري ملحًا، ثمّ أدخلي السلك في اللهب تدريجيًّا.","سجّلي لون اللهب وخطوط الطيف.","كرّري مع بقيّة الأملاح (في المختبر الحقيقي نظّفي السلك بالحمض بين كلّ تجربتين).","قارني طيفي الليثيوم والسترونشيوم وهما متقاربان في اللون."],
  questions:[{q:"فسّري ظهور اللون عند تسخين ذرّات العنصر.",a:"تمتصّ الإلكترونات الطاقة فتنتقل إلى مستويات أعلى (حالة الإثارة)، وعند عودتها إلى مستويات أدنى تطلق الطاقة على شكل ضوء بطول موجي محدّد."},
   {q:"لماذا يختلف لون اللهب من عنصر إلى آخر؟",a:"لأنّ فروق الطاقة بين المستويات تختلف من عنصر لآخر، فتختلف الأطوال الموجية للضوء المنبعث."},
   {q:"لماذا يُعدّ الطيف الخطّي أدقّ من لون اللهب في التعرّف إلى العنصر؟",a:"لأنّ عناصر مختلفة قد تعطي ألوانًا متقاربة (مثل Li و Sr)، أمّا خطوط الطيف فهي مميّزة لكلّ عنصر كالبصمة."},
   {q:"اذكري تطبيقًا عمليًّا لكشف اللهب.",a:"الألعاب النارية، والكشف عن العناصر في المختبرات، ومعرفة مكوّنات النجوم من أطيافها."}],
  concl:"لكلّ عنصر لون لهب وطيف انبعاث خطّي مميّز؛ لأنّ إلكترونات ذرّاته المُثارة تطلق ضوءًا بأطوال موجية محدّدة عند عودتها إلى مستويات أدنى."}});

})();
