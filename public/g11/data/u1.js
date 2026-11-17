/* الوحدة 1: الاقترانات والمقادير الجبرية — الصف الحادي عشر الأكاديمي، الفصل الأول.
   البطاقات والأمثلة المحلولة بصياغة المنصة وفق أهداف الدروس في كتاب الطالب. الأسئلة مولَّدة بحساب دقيق، وكل سؤال يتحقق من صحته ذاتيًّا (chk). */
(function(){
const {ri,rnz,pick,shuffle,F,fr,T,term,poly,lin,ev,synth,mulp,xm,set,iv,opts,cases}=M;
const $=s=>"$"+s+"$";
const U={id:"u1",n:1,title:"الاقترانات والمقادير الجبرية",en:"Functions and Algebraic Expressions",lessons:[]};

/* ================= الدرس 1: الاقترانات المتشعّبة ================= */
U.lessons.push({id:"u1l1",n:1,title:"الاقترانات المتشعّبة",en:"Piecewise Functions",page:8,
idea:"تعرّف الاقتران المتشعّب واقتران القيمة المطلقة وتمثيلهما بيانيًّا، وتحديد مجال كلٍّ منهما ومداه.",
terms:["الاقتران المتشعّب","نقطة التشعّب","اقتران القيمة المطلقة","إعادة تعريف اقتران القيمة المطلقة","رأس الاقتران"],
cards:[
 {k:"مفهوم",f:"ما الاقتران المتشعّب؟",b:"اقتران يُعرَّف بقواعد مختلفة عند أجزاء مختلفة من مجاله، مثل: "+$("f(x)="+cases([["-2x+1","-3\\le x<1"],["x^2","x\\ge 1"]]))},
 {k:"مفهوم",f:"نقطة التشعّب",b:"النقطة التي تتغيّر عندها قاعدة الاقتران المتشعّب. في المثال السابق نقطة التشعّب هي "+$("x=1")+"."},
 {k:"طريقة",f:"كيف أجد قيمة اقتران متشعّب عند عدد؟",b:"أحدّد الفترة التي يقع فيها العدد، ثم أعوّض في القاعدة الخاصة بتلك الفترة فقط."},
 {k:"طريقة",f:"كيف أحدّد مجال الاقتران المتشعّب؟",b:"المجال هو اتحاد الفترات المكتوبة بجانب القواعد جميعها."},
 {k:"قاعدة",f:"تعريف القيمة المطلقة",b:$("|x|="+cases([["-x","x<0"],["x","x\\ge 0"]]))},
 {k:"طريقة",f:"إعادة تعريف "+$("|ax+b|"),b:"أساوي ما داخل رمز القيمة المطلقة بالصفر وأحلّ، فأحصل على نقطة التشعّب، ثم أكتب: المقدار نفسه عندما يكون موجبًا أو صفرًا، وسالبه عندما يكون سالبًا."},
 {k:"قاعدة",f:"رأس "+$("f(x)=a|x-h|+k"),b:"الرأس هو النقطة "+$("(h,k)")+"، ومحور التماثل "+$("x=h")+". الشكل مفتوح للأعلى إذا كانت "+$("a>0")+" وللأسفل إذا كانت "+$("a<0")+"."},
 {k:"قاعدة",f:"مدى "+$("f(x)=a|x-h|+k"),b:"إذا كانت "+$("a>0")+" فالمدى "+$("[k,\\infty)")+"، وإذا كانت "+$("a<0")+" فالمدى "+$("(-\\infty,k]")+"."},
 {k:"تذكّر",f:"الدائرة المظلّلة وغير المظلّلة في التمثيل",b:"الدائرة المظلّلة تعني أن النقطة ضمن التمثيل (≤ أو ≥)، وغير المظلّلة تعني أنها ليست ضمنه (< أو >)."}],
examples:[
 {q:"إذا كان "+$("f(x)="+cases([["-2x+1","-3\\le x<1"],["x^2","x\\ge 1"]]))+" فأجد "+$("f(-2)")+" و "+$("f(1)")+"، وأحدّد المجال.",
  s:["العدد "+$("-2")+" يحقّق "+$("-3\\le x<1")+"، إذن أستعمل القاعدة الأولى: "+$("f(-2)=-2(-2)+1=5"),"العدد "+$("1")+" يحقّق "+$("x\\ge1")+"، إذن أستعمل القاعدة الثانية: "+$("f(1)=1^2=1"),"المجال اتحاد الفترتين: "+$("[-3,\\infty)")]},
 {q:"أعيد تعريف الاقتران "+$("f(x)=|2x+4|")+".",
  s:["أساوي ما داخل القيمة المطلقة بالصفر: "+$("2x+4=0\\Rightarrow x=-2"),"عندما "+$("x\\ge -2")+" يكون المقدار موجبًا أو صفرًا فيبقى كما هو، وعندما "+$("x<-2")+" يكون سالبًا فأضربه في "+$("-1"),$("f(x)="+cases([["-2x-4","x<-2"],["2x+4","x\\ge -2"]]))]},
 {q:"أجرة ساعة العمل 4 دنانير لأول 40 ساعة في الأسبوع، وكل ساعة إضافية بأجرة ساعة ونصف. أكتب اقتران الأجرة الأسبوعية لعامل اشتغل "+$("x")+" ساعة.",
  s:["أجرة الساعة الإضافية "+$("4\\times1.5=6")+" دنانير.","عندما "+$("0\\le x\\le40")+": الأجرة "+$("4x"),"عندما "+$("x>40")+": الأجرة "+$("4(40)+6(x-40)=6x-80"),$("f(x)="+cases([["4x","0\\le x\\le 40"],["6x-80","x>40"]]))]},
 {q:"أجد رأس الاقتران "+$("f(x)=-|x+2|+3")+" ومداه.",
  s:["أكتبه بالصورة "+$("a|x-h|+k")+": "+$("a=-1,\\ h=-2,\\ k=3"),"الرأس "+$("(-2,3)")+" ومحور التماثل "+$("x=-2"),"بما أن "+$("a<0")+" فالشكل مفتوح للأسفل، والمدى "+$("(-\\infty,3]")]}],
gens:[
 {id:"pw-eval",lvl:1,t:"قيمة اقتران متشعّب",f(){const c=ri(-2,3),a1=rnz(-4,4),b1=ri(-6,6),k=ri(-5,5),side=pick([0,1]);
   const v=side?ri(c,c+3):ri(c-4,c-1);const r1=a1*v+b1,r2=v*v+k;const right=side?r2:r1,other=side?r1:r2;
   const q="إذا كان "+$("f(x)="+cases([[lin(a1,b1),"x<"+c],["x^2"+term(k,"",false),"x\\ge "+c]]))+" فإن "+$("f("+v+")")+" تساوي:";
   const o=opts($(right),[$(other),$(-right),$(right+1),$(a1*v-b1)],()=>$(right+ri(-6,6)));if(!o)return null;
   return{q,...o,s:["العدد "+$(v)+" يحقّق "+$(side?"x\\ge "+c:"x<"+c)+"، فأستعمل القاعدة "+(side?"الثانية":"الأولى")+".",$("f("+v+")="+(side?"("+v+")^2"+term(k,"",false):M.term(a1,"("+v+")",true)+term(b1,"",false))+"="+right)],chk:()=>right===(v<c?a1*v+b1:v*v+k)}}},
 {id:"pw-boundary",lvl:2,t:"قيمة الاقتران عند نقطة التشعّب",f(){const c=ri(-2,4),a=rnz(-3,3),b=ri(-5,5),m=ri(-6,8),d=rnz(-3,3),e=ri(-4,4);
   const q="إذا كان "+$("f(x)="+cases([[lin(a,b),"x<"+c],[String(m),"x="+c],[lin(d,e),"x>"+c]]))+" فإن "+$("f("+c+")")+" تساوي:";
   const o=opts($(m),[$(a*c+b),$(d*c+e),$(m+a*c+b)],()=>$(m+ri(-5,5)));if(!o)return null;return{q,...o,s:["عند "+$("x="+c)+" تنطبق القاعدة الوسطى فقط: "+$("f("+c+")="+m)],chk:()=>true}}},
 {id:"pw-domain",lvl:1,t:"مجال اقتران متشعّب",f(){const p=ri(-6,-1),q2=ri(0,4),lc=pick([true,false]);
   const q="مجال الاقتران "+$("f(x)="+cases([["x+"+ri(1,5),(lc?p+"\\le":p+"<")+" x<"+q2],["x^2","x\\ge "+q2]]))+" هو:";
   const right=$(iv(p,"\\infty",lc,false));const o=opts(right,[$(iv(p,q2,lc,false)),$(iv(q2,"\\infty",true,false)),$(iv(p,"\\infty",!lc,false)),$("\\mathbb{R}")]);if(!o)return null;
   return{q,...o,s:["المجال هو اتحاد الفترتين: "+$(iv(p,q2,lc,false)+"\\cup[ "+q2+",\\infty)="+iv(p,"\\infty",lc,false))],chk:()=>true}}},
 {id:"abs-redef",lvl:1,t:"إعادة تعريف اقتران القيمة المطلقة",f(){const a=ri(1,4),r=ri(-4,4),b=-a*r;const e=lin(a,b),ne=lin(-a,-b);
   const right=$(cases([[ne,"x<"+r],[e,"x\\ge "+r]]));const w1=$(cases([[e,"x<"+r],[ne,"x\\ge "+r]])),w2=$(cases([[ne,"x<"+(-r)],[e,"x\\ge "+(-r)]])),w3=$(cases([[lin(-a,b),"x<"+r],[e,"x\\ge "+r]]));
   const o=opts(right,[w1,w2,w3]);if(!o)return null;
   return{q:"إعادة تعريف الاقتران "+$("f(x)=|"+e+"|")+" هي:",...o,s:["أساوي ما داخل القيمة المطلقة بالصفر: "+$(e+"=0\\Rightarrow x="+r),"عندما "+$("x\\ge "+r)+" يبقى المقدار كما هو، وعندما "+$("x<"+r)+" أضربه في "+$("-1")+"."],chk:()=>a*(r+1)+b>0}}},
 {id:"abs-vertex",lvl:1,t:"رأس اقتران القيمة المطلقة",f(){const a=pick([1,2,3,-1,-2]),h=rnz(-5,5),k=rnz(-5,5);
   const fx=(a===1?"":a===-1?"-":a)+"|"+xm(h)+"|"+term(k,"",false);const o=opts($("("+h+","+k+")"),[$("("+(-h)+","+k+")"),$("("+h+","+(-k)+")"),$("("+k+","+h+")"),$("("+(-h)+","+(-k)+")")]);if(!o)return null;
   return{q:"رأس الاقتران "+$("f(x)="+fx)+" هو:",...o,s:["بالمقارنة مع "+$("a|x-h|+k")+": "+$("h="+h+",\\ k="+k),"الرأس "+$("(h,k)=("+h+","+k+")")],chk:()=>true}}},
 {id:"abs-range",lvl:2,t:"مدى اقتران القيمة المطلقة",f(){const a=pick([2,1,3,-1,-2,-3]),h=rnz(-4,4),k=rnz(-6,6);const fx=(a===1?"":a===-1?"-":a)+"|"+xm(h)+"|"+term(k,"",false);
   const up=a>0,right=$(up?"[ "+k+",\\infty)":"(-\\infty,"+k+"]");const o=opts(right,[$(up?"(-\\infty,"+k+"]":"[ "+k+",\\infty)"),$(up?"[ "+h+",\\infty)":"(-\\infty,"+h+"]"),$("\\mathbb{R}"),$(up?"( "+k+",\\infty)":"(-\\infty,"+k+")")]);if(!o)return null;
   return{q:"مدى الاقتران "+$("f(x)="+fx)+" هو:",...o,s:["الرأس "+$("("+h+","+k+")")+" و "+$("a="+a)+(up?" > 0 فالشكل مفتوح للأعلى":" < 0 فالشكل مفتوح للأسفل")+".","المدى "+right],chk:()=>true}}},
 {id:"abs-eval",lvl:2,t:"قيمة اقتران قيمة مطلقة",f(){const a=pick([2,3,-2,-1,4]),b=rnz(-5,5),c=ri(-6,6),d=ri(-4,4),x=ri(-5,5);const inner=b*x+c,val=a*Math.abs(inner)+d;
   const o=opts($(val),[$(a*inner+d),$(-val),$(a*Math.abs(inner)-d),$(Math.abs(a*inner+d))],()=>$(val+ri(-7,7)));if(!o)return null;
   const A=a===1?"":a===-1?"-":String(a);return{q:"إذا كان "+$("f(x)="+A+"|"+lin(b,c)+"|"+term(d,"",false))+" فإن "+$("f("+x+")")+" تساوي:",...o,s:[$("f("+x+")="+a+"|"+inner+"|"+term(d,"",false)+"="+a+"("+Math.abs(inner)+")"+term(d,"",false)+"="+val)],chk:()=>true}}},
 {id:"pw-wage",lvl:2,t:"مسألة حياتية: الأجرة",f(){const r=pick([3,4,5,6]),H=pick([35,40,45]),x=H+ri(2,12),ot=r*1.5,pay=r*H+ot*(x-H);
   const o=opts($(pay),[$(r*x),$(ot*x),$(r*H+r*(x-H)*2),$(r*H+ot*x)]);if(!o)return null;
   return{q:"أجرة ساعة العمل "+r+" دنانير لأول "+H+" ساعة في الأسبوع، وأجرة الساعة الإضافية ساعة ونصف. أجرة عامل اشتغل "+x+" ساعة في أسبوع بالدينار:",...o,s:["أجرة الساعة الإضافية "+$(r+"\\times1.5="+ot),"الأجرة "+$(r+"("+H+")+"+ot+"("+x+"-"+H+")="+pay)],chk:()=>true}}},
 {id:"abs-axis",lvl:1,t:"محور التماثل واتجاه الفتحة",f(){const a=pick([2,-3,1,-1,4]),h=rnz(-6,6),k=ri(-5,5);const fx=(a===1?"":a===-1?"-":a)+"|"+xm(h)+"|"+term(k,"",false);const up=a>0?"للأعلى":"للأسفل",dn=a>0?"للأسفل":"للأعلى";
   const o=opts("محوره "+$("x="+h)+" ومفتوح "+up,["محوره "+$("x="+(-h))+" ومفتوح "+up,"محوره "+$("x="+h)+" ومفتوح "+dn,"محوره "+$("y="+k)+" ومفتوح "+up]);if(!o)return null;
   return{q:"أيّ العبارات الآتية صحيحة عن منحنى "+$("f(x)="+fx)+"؟",...o,s:["محور التماثل "+$("x=h="+h)+"، و "+$("a="+a)+" لذا الشكل مفتوح "+up+"."],chk:()=>true}}},
 {id:"pw-rule-graph",lvl:3,t:"قاعدة الجزء الخطي من اقتران متشعّب",f(){const x1=ri(-4,0),y1=ri(-3,5),m=pick([1,2,-1,-2,fr(1,2),fr(-1,2)]),mF=F.of(m);const b=F.of(y1).sub(mF.mul(x1));
   const rule=M.poly([mF,b]);const o=opts($("f(x)="+rule),[$("f(x)="+M.poly([mF.neg(),b])),$("f(x)="+M.poly([mF,b.neg()])),$("f(x)="+M.poly([mF,F.of(y1)])),$("f(x)="+M.poly([new F(mF.d,mF.n),b]))]);if(!o)return null;
   const x2=x1+mF.d*2,y2=F.of(y1).add(mF.mul(x2-x1));
   return{q:"جزء من تمثيل اقتران متشعّب هو قطعة مستقيمة تمرّ بالنقطتين "+$("("+x1+","+y1+")")+" و "+$("("+x2+","+T(y2)+")")+". قاعدة هذا الجزء:",...o,s:["الميل "+$("m=\\frac{"+T(y2)+"-("+y1+")}{"+x2+"-("+x1+")}="+T(mF)),"بصيغة الميل ونقطة: "+$("y-("+y1+")="+T(mF)+"(x-("+x1+"))")+" ومنها "+$("f(x)="+rule)],chk:()=>mF.mul(x2).add(b).eq(y2)}}}
]});

/* ================= الدرس 2: معادلات القيمة المطلقة ومتبايناتها ================= */
U.lessons.push({id:"u1l2",n:2,title:"حل معادلات القيمة المطلقة ومتبايناتها",en:"Absolute-Value Equations and Inequalities",page:19,
idea:"حل معادلات القيمة المطلقة ومتبايناتها، وتمثيل مجموعة الحل على خط الأعداد.",terms:["معادلة القيمة المطلقة","متباينة القيمة المطلقة","المتباينة المركّبة","مجموعة الحل"],
cards:[
 {k:"مفهوم أساسي",f:"حل "+$("|ax+b|=c")+" حيث "+$("c\\ge0"),b:"أحلّ المعادلتين: "+$("ax+b=c")+" أو "+$("ax+b=-c")},
 {k:"تنبيه",f:"إذا كان "+$("|ax+b|=c")+" و "+$("c<0"),b:"لا يوجد حل، لأن القيمة المطلقة لا تكون سالبة: مجموعة الحل "+$("\\varnothing")},
 {k:"طريقة",f:"قبل الحل",b:"أعزل القيمة المطلقة في أحد طرفي المعادلة أو المتباينة أولًا."},
 {k:"مفهوم أساسي",f:"حل "+$("|ax+b|<c")+" حيث "+$("c>0"),b:"تتحوّل إلى متباينة مركّبة بالربط «و»: "+$("-c<ax+b<c")},
 {k:"مفهوم أساسي",f:"حل "+$("|ax+b|>c")+" حيث "+$("c>0"),b:"تتحوّل إلى متباينتين بالربط «أو»: "+$("ax+b<-c")+" أو "+$("ax+b>c")},
 {k:"طريقة",f:"حل "+$("|ax+b|=|cx+d|"),b:"أحلّ المعادلتين: "+$("ax+b=cx+d")+" أو "+$("ax+b=-(cx+d)")+"، ثم أتحقق من الحلول."},
 {k:"تذكّر",f:"القسمة على عدد سالب في المتباينة",b:"عند ضرب طرفي المتباينة أو قسمتهما على عدد سالب يُعكس رمز المتباينة."},
 {k:"تذكّر",f:"معنى "+$("|x-a|"),b:"المسافة بين "+$("x")+" والعدد "+$("a")+" على خط الأعداد."}],
examples:[
 {q:"أحلّ المعادلة "+$("|x-8|=2")+".",s:["أكتب المعادلتين: "+$("x-8=2")+" أو "+$("x-8=-2"),"إذن "+$("x=10")+" أو "+$("x=6")+"، ومجموعة الحل "+$("\\{6,10\\}")]},
 {q:"أحلّ المتباينة "+$("-4|x+3|-2\\ge6")+".",s:["أعزل القيمة المطلقة: "+$("-4|x+3|\\ge8"),"أقسم على "+$("-4")+" وأعكس الرمز: "+$("|x+3|\\le-2"),"القيمة المطلقة لا تكون سالبة، إذن لا يوجد حل: "+$("\\varnothing")]},
 {q:"أحلّ المتباينة "+$("|2x-1|<5")+".",s:[$("-5<2x-1<5"),"أجمع 1: "+$("-4<2x<6"),"أقسم على 2: "+$("-2<x<3")+"، أي الفترة "+$("(-2,3)")]},
 {q:"أحلّ المعادلة "+$("|x+1|=|2x-4|")+".",s:[$("x+1=2x-4\\Rightarrow x=5"),$("x+1=-(2x-4)\\Rightarrow 3x=3\\Rightarrow x=1"),"مجموعة الحل "+$("\\{1,5\\}")]}],
gens:[
 {id:"ae-basic",lvl:1,t:"معادلة قيمة مطلقة بسيطة",f(){const a=rnz(-7,7),b=ri(1,9);const o=opts($(set([a-b,a+b].sort((x,y)=>x-y))),[$(set([a+b])),$(set([-a-b,b-a].sort((x,y)=>x-y))),$(set([a-b])),$("\\varnothing")]);if(!o)return null;
   return{q:"مجموعة حل المعادلة "+$("|"+xm(a)+"|="+b)+" هي:",...o,s:[$(xm(a)+"="+b)+" أو "+$(xm(a)+"=-"+b),"إذن "+$("x="+(a+b))+" أو "+$("x="+(a-b))],chk:()=>Math.abs(a+b-a)===b}}},
 {id:"ae-ax",lvl:1,t:"حل |ax+b|=c",f(){const a=pick([2,3,4,5]),s1=ri(-6,6),s2=ri(-6,6);if(s1===s2)return null;const b=-a*(s1+s2)/2;if(!Number.isInteger(b))return null;const c=Math.abs(a*s1+b);if(c===0)return null;
   const sol=[s1,s2].sort((x,y)=>x-y);const o=opts($(set(sol)),[$(set(sol.map(x=>-x).sort((x,y)=>x-y))),$(set([sol[1]])),$(set([(c-b),(-c-b)].sort((x,y)=>x-y))),$("\\varnothing")]);if(!o)return null;
   return{q:"مجموعة حل المعادلة "+$("|"+lin(a,b)+"|="+c)+" هي:",...o,s:[$(lin(a,b)+"="+c)+" أو "+$(lin(a,b)+"=-"+c),"بالحل: "+$("x="+((c-b)/a))+" أو "+$("x="+((-c-b)/a))],chk:()=>sol.every(x=>Math.abs(a*x+b)===c)}}},
 {id:"ae-isolate",lvl:2,t:"عزل القيمة المطلقة ثم الحل",f(){const k=pick([2,3,-2]),d=ri(-6,6),a=rnz(-5,5),r=ri(1,6);const e=k*r+d;
   const sol=[a-r,a+r].sort((x,y)=>x-y);const o=opts($(set(sol)),[$(set([a-r-d,a+r+d].sort((x,y)=>x-y))),$(set(sol.map(x=>-x).sort((x,y)=>x-y))),$(set([a+e,a-e].sort((x,y)=>x-y))),$("\\varnothing")]);if(!o)return null;
   return{q:"مجموعة حل المعادلة "+$(k+"|"+xm(a)+"|"+term(d,"",false)+"="+e)+" هي:",...o,s:["أعزل القيمة المطلقة: "+$(k+"|"+xm(a)+"|="+(e-d))+" ومنها "+$("|"+xm(a)+"|="+r),"إذن "+$("x="+(a+r))+" أو "+$("x="+(a-r))],chk:()=>(e-d)/k===r}}},
 {id:"ae-none",lvl:2,t:"معادلة بلا حل",f(){const a=rnz(-5,5),k=pick([2,3]),d=ri(2,8),e=d-k*ri(1,4);
   const o=opts($("\\varnothing"),[$(set([a-1,a+1])),$(set([a])),$("\\mathbb{R}"),$(set([-a]))]);if(!o)return null;
   return{q:"مجموعة حل المعادلة "+$(k+"|"+xm(a)+"|+"+d+"="+e)+" هي:",...o,s:["أعزل القيمة المطلقة: "+$("|"+xm(a)+"|="+T(fr(e-d,k))),"القيمة المطلقة لا تساوي عددًا سالبًا، إذن "+$("\\varnothing")],chk:()=>e-d<0}}},
 {id:"ai-less",lvl:2,t:"متباينة |x-a|≤b",f(){const a=rnz(-6,6),b=ri(1,7),strict=pick([true,false]);const r=$(iv(a-b,a+b,!strict,!strict));
   const o=opts(r,[$("(-\\infty,"+(a-b)+(strict?")":"]")+"\\cup"+(strict?"(":"[")+(a+b)+",\\infty)"),$(iv(-a-b,b-a,!strict,!strict)),$(iv(a-b,a+b,strict,strict)),$(iv(-b,b,!strict,!strict))]);if(!o)return null;
   return{q:"مجموعة حل المتباينة "+$("|"+xm(a)+"|"+(strict?"<":"\\le")+b)+" هي:",...o,s:[$("-"+b+(strict?"<":"\\le ")+xm(a)+(strict?"<":"\\le")+b),"أضيف "+$(a)+": "+$((a-b)+(strict?"<":"\\le ")+"x"+(strict?"<":"\\le")+(a+b))],chk:()=>true}}},
 {id:"ai-greater",lvl:2,t:"متباينة |ax+b|>c",f(){const a=pick([1,2,3]),p=ri(-6,2),q=p+a*ri(1,4)*2/a;if(!Number.isInteger(q)||q<=p)return null;const b=-a*(p+q)/2;if(!Number.isInteger(b))return null;const c=a*(q-p)/2;const strict=pick([true,false]);
   const L=strict?")":"]",R=strict?"(":"[";const right=$("(-\\infty,"+p+L+"\\cup"+R+q+",\\infty)");
   const o=opts(right,[$(iv(p,q,!strict,!strict)),$("(-\\infty,"+(-q)+L+"\\cup"+R+(-p)+",\\infty)"),$("(-\\infty,"+p+(strict?"]":")")+"\\cup"+(strict?"[":"(")+q+",\\infty)"),$("\\varnothing")]);if(!o)return null;
   return{q:"مجموعة حل المتباينة "+$("|"+lin(a,b)+"|"+(strict?">":"\\ge")+c)+" هي:",...o,s:[$(lin(a,b)+(strict?"<":"\\le")+"-"+c)+" أو "+$(lin(a,b)+(strict?">":"\\ge")+c),"إذن "+$("x"+(strict?"<":"\\le")+p)+" أو "+$("x"+(strict?">":"\\ge")+q)],chk:()=>Math.abs(a*p+b)===c&&Math.abs(a*q+b)===c}}},
 {id:"ae-two",lvl:3,t:"معادلة |ax+b|=|cx+d|",f(){const a=ri(1,3),c=ri(1,3);if(a===c)return null;const b=ri(-6,6),d=ri(-6,6);const x1=fr(d-b,a-c),x2=fr(-(b+d),a+c);if(x1.eq(x2))return null;
   const sol=[x1,x2].sort((u,v)=>u.v-v.v).map(T);const o=opts($(set(sol)),[$(set([T(x1)])),$(set([T(x2)])),$(set([T(x1.neg()),T(x2.neg())])),$(set([T(fr(d+b,a-c)),T(x2)]))]);if(!o)return null;
   return{q:"مجموعة حل المعادلة "+$("|"+lin(a,b)+"|=|"+lin(c,d)+"|")+" هي:",...o,s:[$(lin(a,b)+"="+lin(c,d)+"\\Rightarrow x="+T(x1)),$(lin(a,b)+"=-("+lin(c,d)+")\\Rightarrow x="+T(x2))],chk:()=>[x1,x2].every(x=>Math.abs(Math.abs(a*x.v+b)-Math.abs(c*x.v+d))<1e-9)}}},
 {id:"ai-negall",lvl:3,t:"متباينة بمعامل سالب",f(){const k=pick([2,3,4]),a=rnz(-5,5),d=ri(1,6),rhs=ri(2,8);const allR=pick([true,false]);
   // -k|x-a| - d >= rhs → |x-a| <= -(rhs+d)/k <0 → ∅ ;  -k|x-a| - d <= rhs → |x-a| >= negative → R
   const op=allR?"\\le":"\\ge";const right=allR?$("\\mathbb{R}"):$("\\varnothing");const o=opts(right,[allR?$("\\varnothing"):$("\\mathbb{R}"),$(iv(a-1,a+1,true,true)),$(set([a])),$("(-\\infty,"+a+"]")]);if(!o)return null;
   return{q:"مجموعة حل المتباينة "+$("-"+k+"|"+xm(a)+"|-"+d+op+rhs)+" هي:",...o,s:["أعزل القيمة المطلقة وأقسم على "+$("-"+k)+" مع عكس الرمز: "+$("|"+xm(a)+"|"+(allR?"\\ge":"\\le")+T(fr(-(rhs+d),k))),allR?"القيمة المطلقة دائمًا أكبر من عدد سالب، إذن الحل جميع الأعداد الحقيقية.":"القيمة المطلقة لا تكون أقل من عدد سالب، إذن لا يوجد حل."],chk:()=>true}}},
 {id:"ai-model",lvl:2,t:"مسألة حياتية: هامش الخطأ",f(){const m=pick([250,500,8,12,75,30]),t=pick([0.1,0.5,2,5,1]);
   const o=opts($("|x-"+m+"|\\le"+t),[$("|x+"+m+"|\\le"+t),$("|x-"+t+"|\\le"+m),$("|x-"+m+"|\\ge"+t),$("x-"+m+"\\le"+t)]);if(!o)return null;
   return{q:"يزن جهاز كتلة مقدارها "+m+" غرامًا بهامش خطأ لا يتجاوز "+t+" غرام. المتباينة التي تحدّد الكتلة الحقيقية "+$("x")+":",...o,s:["البعد بين الكتلة الحقيقية و "+m+" لا يتجاوز "+t+": "+$("|x-"+m+"|\\le"+t)],chk:()=>true}}},
 {id:"ai-count",lvl:3,t:"عدد الحلول الصحيحة لمتباينة",f(){const a=rnz(-5,5),b=ri(1,6),strict=pick([true,false]);const n=strict?2*b-1:2*b+1;
   const o=opts($(n),[$(strict?2*b+1:2*b-1),$(2*b),$(b),$(n+2)]);if(!o)return null;
   return{q:"عدد الأعداد الصحيحة التي تحقّق المتباينة "+$("|"+xm(a)+"|"+(strict?"<":"\\le")+b)+" هو:",...o,s:["الحل "+$((a-b)+(strict?"<":"\\le ")+"x"+(strict?"<":"\\le")+(a+b)),"عدد الأعداد الصحيحة "+$(n)],chk:()=>true}}}
]});

/* ================= الدرس 3: نظريتا الباقي والعوامل ================= */
const cub=()=>{const r=[rnz(-4,4),rnz(-4,4),ri(-4,4)],lead=pick([1,1,1,2]);let p=[lead];r.forEach(x=>{p=mulp(p,[1,-x])});return{r,p:p.map(F.of)}};
U.lessons.push({id:"u1l3",n:3,title:"نظريتا الباقي والعوامل",en:"The Remainder and Factor Theorems",page:26,
idea:"تعرّف نظريتي الباقي والعوامل واستعمالهما في تحليل كثيرات الحدود وإيجاد أصفارها، وحل معادلات كثيرات الحدود.",
terms:["القسمة التركيبية (طريقة الجدول)","نظرية الباقي","نظرية العوامل","أصفار الاقتران","نظرية الأصفار النسبية"],
cards:[
 {k:"مفهوم أساسي",f:"نظرية الباقي",b:"باقي قسمة كثير الحدود "+$("P(x)")+" على "+$("(x-c)")+" هو "+$("P(c)")+". وباقي قسمته على "+$("(ax-b)")+" هو "+$("P\\left(\\frac{b}{a}\\right)")},
 {k:"مفهوم أساسي",f:"نظرية العوامل",b:$("(x-c)")+" عامل من عوامل "+$("P(x)")+" إذا وفقط إذا كان "+$("P(c)=0")},
 {k:"علاقة",f:"المقسوم والمقسوم عليه والناتج والباقي",b:$("P(x)=Q(x)\\cdot h(x)+R(x)")+" حيث درجة "+$("R")+" أقل من درجة "+$("h")},
 {k:"طريقة",f:"القسمة التركيبية على "+$("(x-c)"),b:"أكتب المعاملات مرتّبة (مع صفر للحد الناقص)، أنزل الأول، أضرب في "+$("c")+" وأجمع مع التالي… آخر عدد هو الباقي."},
 {k:"مفهوم أساسي",f:"نظرية الأصفار النسبية",b:"إذا كان "+$("\\frac{p}{q}")+" صفرًا نسبيًّا لكثير حدود معاملاته صحيحة، فإن "+$("p")+" عامل للحد الثابت و "+$("q")+" عامل للمعامل الرئيس."},
 {k:"طريقة",f:"تحليل كثير حدود من الدرجة الثالثة",b:"أجد صفرًا "+$("c")+" بالتجريب، فيكون "+$("(x-c)")+" عاملًا، ثم أقسم وأحلّل ناتج القسمة التربيعي."},
 {k:"تذكّر",f:"أصفار الاقتران",b:"قيم "+$("x")+" التي تجعل "+$("P(x)=0")+"، وهي الإحداثيات x لنقاط تقاطع المنحنى مع محور x."}],
examples:[
 {q:"أجد باقي قسمة "+$("P(x)=2x^3-7x^2+5")+" على "+$("(x-3)")+".",s:["حسب نظرية الباقي: الباقي "+$("P(3)"),$("P(3)=2(27)-7(9)+5=54-63+5=-4")]},
 {q:"أثبت أن "+$("(x+2)")+" عامل من عوامل "+$("P(x)=x^3+x^2-4x-4")+" ثم أحلّله.",s:[$("P(-2)=-8+4+8-4=0")+" إذن "+$("(x+2)")+" عامل.","بالقسمة: "+$("P(x)=(x+2)(x^2-x-2)"),"أحلّل التربيعي: "+$("P(x)=(x+2)(x-2)(x+1)")]},
 {q:"أجد قيمة "+$("k")+" التي تجعل "+$("(x-1)")+" عاملًا من عوامل "+$("x^3+kx^2-5x+2")+".",s:["أساوي "+$("P(1)")+" بالصفر: "+$("1+k-5+2=0"),$("k=2")]}],
gens:[
 {id:"rt-basic",lvl:1,t:"باقي القسمة على (x−c)",f(){const p=[ri(1,3),ri(-6,6),ri(-6,6),ri(-9,9)].map(F.of),c=rnz(-3,3);const R=ev(p,c),Rm=ev(p,-c);
   const o=opts($(T(R)),[$(T(Rm)),$(T(R.neg())),$(T(p[3])),$(T(R.add(c)))],()=>$(T(R.add(ri(-9,9)))));if(!o)return null;
   return{q:"باقي قسمة "+$("P(x)="+poly(p))+" على "+$(M.par(xm(c)))+" هو:",...o,s:["حسب نظرية الباقي: الباقي "+$("P("+c+")"),$("P("+c+")="+T(R))],chk:()=>synth(p,F.of(c)).R.eq(R)}}},
 {id:"rt-frac",lvl:2,t:"باقي القسمة على (ax−b)",f(){const a=pick([2,3]),b=pick([1,-1,2,-2,1,3].filter(x=>M.gcd(x,a)===1));const p=[ri(1,4)*a,ri(-5,5),ri(-5,5),ri(-6,6)].map(F.of);const c=fr(b,a);const R=ev(p,c);
   const o=opts($(T(R)),[$(T(ev(p,F.of(b)))),$(T(ev(p,fr(-b,a)))),$(T(ev(p,fr(a,b))))],()=>$(T(R.add(ri(-6,6)))));if(!o)return null;
   return{q:"باقي قسمة "+$("P(x)="+poly(p))+" على "+$(M.par(lin(a,-b)))+" هو:",...o,s:["الباقي "+$("P\\left("+T(c)+"\\right)"),$("="+T(R))],chk:()=>true}}},
 {id:"ft-k",lvl:2,t:"إيجاد k ليكون (x−c) عاملًا",f(){const c=rnz(-3,3),a=ri(1,2),b=ri(-5,5),d=ri(-8,8),pos=pick([1,2]);
   // P(x)=a x^3 + (pos==1? k : b) x^2 + (pos==2? k : b) x + d ; P(c)=0
   const kc=pos===1?c*c:c;const rest=a*c**3+(pos===1?b*c:b*c*c)+d;const k=fr(-rest,kc);if(!k.isInt()||Math.abs(k.n)>30)return null;
   const ps=pos===1?[a,"k",b,d]:[a,b,"k",d];const tx=ps.map((x,i)=>{const kk=3-i,v=kk===0?"":kk===1?"x":"x^{"+kk+"}";return x==="k"?(i===0?"":" + ")+"k"+v:term(x,v,i===0)}).join("");
   const o=opts($("k="+T(k)),[$("k="+T(k.neg())),$("k="+T(k.add(1))),$("k="+T(fr(rest,1))),$("k="+T(k.sub(2)))]);if(!o)return null;
   return{q:"قيمة "+$("k")+" التي تجعل "+$(M.par(xm(c)))+" عاملًا من عوامل "+$("P(x)="+tx)+" هي:",...o,s:["حسب نظرية العوامل: "+$("P("+c+")=0"),"بالتعويض والحل: "+$("k="+T(k))],chk:()=>{const pp=ps.map(x=>x==="k"?k:F.of(x));return ev(pp,c).n===0}}}},
 {id:"syn-q",lvl:2,t:"ناتج القسمة التركيبية",f(){const {r,p}=cub();const c=r[0];const {q,R}=synth(p,F.of(c));if(R.n!==0)return null;const right=$(poly(q));
   const w1=$(poly(synth(p,F.of(-c)).q)),w2=$(poly([q[0],q[1].neg(),q[2]])),w3=$(poly([q[0],q[1],q[2].neg()]));const o=opts(right,[w1,w2,w3,$(poly([q[0],q[2],q[1]]))]);if(!o)return null;
   return{q:"ناتج قسمة "+$("P(x)="+poly(p))+" على "+$(M.par(xm(c)))+" هو:",...o,s:["أستعمل القسمة التركيبية بالمعاملات "+$(p.map(T).join(",\\ "))+" والعدد "+$(c),"الناتج "+right+" والباقي 0"],chk:()=>mulp(q,[1,-c]).every((x,i)=>x.eq(p[i]))}}},
 {id:"ft-factor",lvl:3,t:"تحليل كثير حدود من الدرجة الثالثة",f(){const r=[rnz(-4,4),rnz(-4,4),rnz(-4,4)];if(new Set(r).size<3)return null;let p=[1];r.forEach(x=>{p=mulp(p,[1,-x])});p=p.map(F.of);
   const f=rs=>rs.slice().sort((a,b)=>a-b).map(x=>M.par(xm(x))).join("");const o=opts($(f(r)),[$(f(r.map(x=>-x))),$(f([r[0],-r[1],r[2]])),$(f([-r[0],r[1],r[2]])),$(f([r[0],r[1],-r[2]]))]);if(!o)return null;
   return{q:"تحليل "+$("P(x)="+poly(p))+" تحليلًا كاملًا:",...o,s:["أجرّب عوامل الحد الثابت: "+$("P("+r[0]+")=0")+" فيكون "+$(M.par(xm(r[0])))+" عاملًا.","أقسم وأحلّل ناتج القسمة التربيعي: "+$("P(x)="+f(r))],chk:()=>r.every(x=>ev(p,x).n===0)}}},
 {id:"ft-solve",lvl:3,t:"حل معادلة كثير حدود",f(){const {r,p}=cub();if(new Set(r).size<3)return null;const s=r.slice().sort((a,b)=>a-b);
   const ss=a=>$(set([...new Set(a)].sort((x,y)=>x-y)));const o=opts(ss(s),[ss(s.map(x=>-x)),ss(s.slice(0,2)),ss([s[0],-s[1],s[2]]),ss([-s[0],s[1],s[2]])]);if(!o)return null;
   return{q:"مجموعة حل المعادلة "+$(poly(p)+"=0")+" هي:",...o,s:["أجد صفرًا بالتجريب من عوامل الحد الثابت، ثم أقسم وأحلّل.","الأصفار: "+$(set(s))],chk:()=>r.every(x=>ev(p,x).n===0)}}},
 {id:"rz-cand",lvl:2,t:"نظرية الأصفار النسبية",f(){const a=pick([2,3,4]),d=pick([3,5,6,4,9]);const pf=n=>{const s=[];for(let i=1;i<=n;i++)if(n%i===0)s.push(i);return s};
   const cand=new Set();pf(d).forEach(p=>pf(a).forEach(q=>{const v=fr(p,q);cand.add(T(v));cand.add(T(v.neg()))}));
   let bad=null;for(let g=0;g<60&&!bad;g++){const v=fr(ri(1,9),ri(1,6))[pick(["neg","add"])===`neg`?"neg":"add"](0);if(!cand.has(T(v)))bad=v}if(!bad)return null;
   const good=M.shuffle([...cand]).slice(0,3);if(good.length<3)return null;const o=opts($(T(bad)),good.map(x=>$(x)));if(!o)return null;
   return{q:"أيّ الأعداد الآتية لا يمكن أن يكون صفرًا نسبيًّا للاقتران "+$("P(x)="+poly([a,ri(-5,5),ri(-5,5),d]))+"؟",...o,s:["الأصفار النسبية المحتملة "+$("\\pm\\frac{p}{q}")+" حيث "+$("p")+" من عوامل "+d+" و "+$("q")+" من عوامل "+a+".",$(T(bad))+" ليس من هذه الصورة."],chk:()=>true}}},
 {id:"rt-findk",lvl:3,t:"إيجاد k من الباقي",f(){const c=rnz(-3,3),a=ri(1,2),b=ri(-4,4),Rv=ri(-8,8);const k=fr(Rv-(a*c**3+b*c*c),c);if(!k.isInt())return null;
   const o=opts($("k="+T(k)),[$("k="+T(k.neg())),$("k="+T(k.add(Rv))),$("k="+T(k.sub(1)))]);if(!o)return null;
   return{q:"إذا كان باقي قسمة "+$("P(x)="+poly([a,b,0,0]).replace(/ \+ 0.*$/,"")+" + kx")+" على "+$(M.par(xm(c)))+" يساوي "+$(Rv)+" فإن:",...o,s:[$("P("+c+")="+Rv),"بالحل: "+$("k="+T(k))],chk:()=>a*c**3+b*c*c+k.v*c===Rv}}}
]});

/* ================= الدرس 4: الكسور الجزئية ================= */
U.lessons.push({id:"u1l4",n:4,title:"الكسور الجزئية",en:"Partial Fractions",page:39,
idea:"كتابة المقدار الجبري النسبي الذي يمكن تحليل مقامه في صورة مجموع مقادير جبرية نسبية أبسط.",terms:["تجزئة المقادير النسبية","كسر جزئي","عامل خطي مكرّر","عامل تربيعي غير قابل للتحليل"],
cards:[
 {k:"مفهوم",f:"تجزئة المقادير النسبية",b:"عكس عملية الجمع: كتابة المقدار النسبي "+$("\\frac{P(x)}{Q(x)}")+" في صورة مجموع كسور مقاماتها عوامل "+$("Q(x)")+"."},
 {k:"شرط",f:"متى أجزّئ مباشرة؟",b:"عندما تكون درجة البسط أقل من درجة المقام. وإلا أقسم أولًا (قسمة طويلة)."},
 {k:"مفهوم أساسي",f:"عوامل خطية مختلفة",b:$("\\frac{P(x)}{(x-a)(x-b)}=\\frac{A}{x-a}+\\frac{B}{x-b}")},
 {k:"مفهوم أساسي",f:"عامل خطي مكرّر",b:$("\\frac{P(x)}{(x-a)^2}=\\frac{A}{x-a}+\\frac{B}{(x-a)^2}")},
 {k:"مفهوم أساسي",f:"عامل تربيعي غير قابل للتحليل",b:$("\\frac{P(x)}{(x-a)(x^2+c)}=\\frac{A}{x-a}+\\frac{Bx+C}{x^2+c}")},
 {k:"طريقة",f:"إيجاد الثوابت بالتعويض",b:"أضرب الطرفين في المقام، ثم أعوّض أصفار العوامل الخطية واحدًا واحدًا لأجد كل ثابت."},
 {k:"طريقة",f:"إيجاد الثوابت بمقارنة المعاملات",b:"أفكّ الطرف الأيمن وأساوي معاملات القوى المتشابهة في الطرفين، ثم أحلّ النظام."}],
examples:[
 {q:"أجزّئ "+$("\\frac{2x-13}{(x-2)(x+1)}")+".",s:[$("\\frac{2x-13}{(x-2)(x+1)}=\\frac{A}{x-2}+\\frac{B}{x+1}")+" ومنها "+$("2x-13=A(x+1)+B(x-2)"),"أعوّض "+$("x=2")+": "+$("-9=3A\\Rightarrow A=-3"),"أعوّض "+$("x=-1")+": "+$("-15=-3B\\Rightarrow B=5"),$("=\\frac{-3}{x-2}+\\frac{5}{x+1}")]},
 {q:"أجزّئ "+$("\\frac{3x+5}{(x+1)^2}")+".",s:[$("\\frac{3x+5}{(x+1)^2}=\\frac{A}{x+1}+\\frac{B}{(x+1)^2}")+" ومنها "+$("3x+5=A(x+1)+B"),"أعوّض "+$("x=-1")+": "+$("B=2")+"، وبمقارنة معامل "+$("x")+": "+$("A=3"),$("=\\frac{3}{x+1}+\\frac{2}{(x+1)^2}")]}],
gens:[
 {id:"pf-A",lvl:1,t:"إيجاد ثابت في كسرين جزئيين",f(){const a=rnz(-4,4),b=rnz(-4,4);if(a===b)return null;const A=rnz(-5,5),B=rnz(-5,5);const num=[A+B,-A*b-B*a];
   const den=M.par(xm(a))+M.par(xm(b));const o=opts($("A="+A),[$("A="+B),$("A="+(-A)),$("A="+(A+B)),$("A="+(num[1]))]);if(!o)return null;
   return{q:"إذا كان "+$("\\frac{"+poly(num)+"}{"+den+"}=\\frac{A}{"+xm(a)+"}+\\frac{B}{"+xm(b)+"}")+" فإن:",...o,s:[$(poly(num)+"=A("+xm(b)+")+B("+xm(a)+")"),"أعوّض "+$("x="+a)+": "+$(T(ev(num,a))+"=A("+(a-b)+")\\Rightarrow A="+A)],chk:()=>ev(num,a).eq(A*(a-b))}}},
 {id:"pf-full",lvl:2,t:"تجزئة كاملة لعاملين خطيين",f(){const a=rnz(-4,4),b=rnz(-4,4);if(a===b)return null;const A=rnz(-5,5),B=rnz(-5,5);const num=[A+B,-A*b-B*a];
   const fx=(n,x)=>"\\frac{"+n+"}{"+xm(x)+"}";const S=(p,q)=>fx(p,a)+(q<0?"-":"+")+fx(Math.abs(q),b);const den=M.par(xm(a))+M.par(xm(b));
   const o=opts($(S(A,B)),[$(S(B,A)),$(S(-A,-B)),$(S(A,-B)),$(S(-A,B))]);if(!o)return null;
   return{q:"تجزئة "+$("\\frac{"+poly(num)+"}{"+den+"}")+" إلى كسور جزئية:",...o,s:["أكتب "+$("\\frac{A}{"+xm(a)+"}+\\frac{B}{"+xm(b)+"}")+" وأعوّض أصفار المقام.",$("A="+A+",\\ B="+B)],chk:()=>[0.37,2.9].every(x=>Math.abs(ev(num,x).v/((x-a)*(x-b))-(A/(x-a)+B/(x-b)))<1e-9)}}},
 {id:"pf-factor",lvl:2,t:"تجزئة بعد تحليل المقام",f(){const a=rnz(-4,4),b=rnz(-4,4);if(a===b)return null;const A=rnz(-4,4),B=rnz(-4,4);const num=[A+B,-A*b-B*a];const den=[1,-(a+b),a*b];
   const fx=(n,x)=>"\\frac{"+n+"}{"+xm(x)+"}";const S=(p,q)=>fx(p,a)+(q<0?"-":"+")+fx(Math.abs(q),b);
   const o=opts($(S(A,B)),[$(S(B,A)),$(S(-A,-B)),$(fx(A,-a)+(B<0?"-":"+")+fx(Math.abs(B),-b))]);if(!o)return null;
   return{q:"تجزئة "+$("\\frac{"+poly(num)+"}{"+poly(den)+"}")+" إلى كسور جزئية:",...o,s:["أحلّل المقام: "+$(poly(den)+"="+M.par(xm(a))+M.par(xm(b))),"ثم أجد "+$("A="+A+",\\ B="+B)],chk:()=>true}}},
 {id:"pf-rep",lvl:2,t:"عامل خطي مكرّر",f(){const a=rnz(-4,4),A=rnz(-5,5),B=rnz(-6,6);const num=[A,B-A*a];
   const o=opts($("A="+A+",\\ B="+B),[$("A="+B+",\\ B="+A),$("A="+A+",\\ B="+(num[1])),$("A="+(-A)+",\\ B="+B),$("A="+A+",\\ B="+(-B))]);if(!o)return null;
   return{q:"إذا كان "+$("\\frac{"+poly(num)+"}{("+xm(a)+")^2}=\\frac{A}{"+xm(a)+"}+\\frac{B}{("+xm(a)+")^2}")+" فإن:",...o,s:[$(poly(num)+"=A("+xm(a)+")+B"),"أعوّض "+$("x="+a)+": "+$("B="+B)+"، وأقارن معامل "+$("x")+": "+$("A="+A)],chk:()=>ev(num,a).eq(B)}}},
 {id:"pf-form",lvl:1,t:"الصورة الصحيحة للتجزئة",f(){const a=rnz(-4,4),b=rnz(-4,4);if(a===b)return null;const c=pick([1,4,9,2]);const kind=pick(["rep","quad"]);
   const fx=(n,d)=>"\\frac{"+n+"}{"+d+"}";let den,right,w;
   if(kind==="rep"){den=M.par(xm(a))+M.par(xm(b))+"^2";right=fx("A",xm(a))+"+"+fx("B",xm(b))+"+"+fx("C","("+xm(b)+")^2");w=[fx("A",xm(a))+"+"+fx("B","("+xm(b)+")^2"),fx("A",xm(a))+"+"+fx("Bx+C","("+xm(b)+")^2"),fx("A",xm(a))+"+"+fx("B",xm(b))]}
   else{den=M.par(xm(a))+"(x^2+"+c+")";right=fx("A",xm(a))+"+"+fx("Bx+C","x^2+"+c);w=[fx("A",xm(a))+"+"+fx("B","x^2+"+c),fx("A",xm(a))+"+"+fx("B","x+"+c),fx("Ax+B",xm(a))+"+"+fx("C","x^2+"+c)]}
   const o=opts($(right),w.map($));if(!o)return null;
   return{q:"الصورة الصحيحة لتجزئة "+$("\\frac{2x+1}{"+den+"}")+" هي:",...o,s:[kind==="rep"?"العامل المكرّر "+$("("+xm(b)+")^2")+" يعطي كسرين: مقام "+$(xm(b))+" ومقام "+$("("+xm(b)+")^2"):"العامل التربيعي غير القابل للتحليل يكون بسطه خطيًّا "+$("Bx+C")],chk:()=>true}}},
 {id:"pf-quad",lvl:3,t:"عامل تربيعي غير قابل للتحليل",f(){const a=rnz(-3,3),c=pick([1,2,3,4]),A=rnz(-3,3),B=ri(-3,3),C=ri(-4,4);
   // A(x^2+c)+(Bx+C)(x-a) = (A+B)x^2 + (C-Ba)x + (Ac - Ca)
   const num=[A+B,C-B*a,A*c-C*a];const o=opts($("A="+A+",\\ B="+B+",\\ C="+C),[$("A="+A+",\\ B="+C+",\\ C="+B),$("A="+(-A)+",\\ B="+B+",\\ C="+C),$("A="+A+",\\ B="+B+",\\ C="+(-C)),$("A="+(A+B)+",\\ B="+B+",\\ C="+C)]);if(!o)return null;
   return{q:"إذا كان "+$("\\frac{"+poly(num)+"}{("+xm(a)+")(x^2+"+c+")}=\\frac{A}{"+xm(a)+"}+\\frac{Bx+C}{x^2+"+c+"}")+" فإن:",...o,s:[$(poly(num)+"=A(x^2+"+c+")+(Bx+C)("+xm(a)+")"),"أعوّض "+$("x="+a)+" فأجد "+$("A="+A)+"، ثم أقارن المعاملات فأجد "+$("B="+B+",\\ C="+C)],chk:()=>ev(num,a).eq(A*(a*a+c))}}},
 {id:"pf-improper",lvl:3,t:"مقدار نسبي غير فعلي",f(){const a=rnz(-3,3),b=rnz(-3,3);if(a===b)return null;const A=rnz(-4,4),B=rnz(-4,4);const den=[1,-(a+b),a*b];
   // 1 + A/(x-a) + B/(x-b) = [den + A(x-b)+B(x-a)]/den
   const num=[1,-(a+b)+A+B,a*b-A*b-B*a];const fx=(n,x)=>"\\frac{"+Math.abs(n)+"}{"+xm(x)+"}";const S=(k,p,q)=>k+(p<0?"-":"+")+fx(p,a)+(q<0?"-":"+")+fx(q,b);
   const o=opts($(S(1,A,B)),[$(fx(A,a).replace(/^/,A<0?"-":"")+(B<0?"-":"+")+fx(B,b)),$(S(1,B,A)),$(S(1,-A,-B)),$(S(-1,A,B))]);if(!o)return null;
   return{q:"تجزئة "+$("\\frac{"+poly(num)+"}{"+M.par(xm(a))+M.par(xm(b))+"}")+" هي:",...o,s:["درجة البسط تساوي درجة المقام، فأقسم أولًا: الناتج 1 والباقي "+$(poly([A+B,-A*b-B*a])),"ثم أجزّئ الباقي: "+$("A="+A+",\\ B="+B)],chk:()=>[0.41,3.3].every(x=>Math.abs(ev(num,x).v/((x-a)*(x-b))-(1+A/(x-a)+B/(x-b)))<1e-9)}}}
]});

/* ===== أسئلة إضافية على المجال والمدى (من التمثيلات البيانية) ===== */
(function(){const L1=U.lessons[0];const SV=(spec)=>window.G11K&&window.G11K.svgPlot?"<div class='gwrap'>"+window.G11K.svgPlot(spec)+"</div>":null;
 const nf=v=>v===Infinity?"\\infty":v===-Infinity?"-\\infty":Number.isInteger(v)?String(v):(v<0?"-":"")+"\\frac{"+Math.round(Math.abs(v)*2)+"}{2}";
 function uni(list){list=list.map(o=>({...o})).sort((p,q)=>p.lo-q.lo||(q.lc-p.lc));const out=[];
  for(const iv of list){const l=out[out.length-1];
   if(l&&(iv.lo<l.hi||(iv.lo===l.hi&&(l.hc||iv.lc)))){if(iv.hi>l.hi){l.hi=iv.hi;l.hc=iv.hc}else if(iv.hi===l.hi)l.hc=l.hc||iv.hc;if(iv.lo===l.lo)l.lc=l.lc||iv.lc}
   else if(l&&iv.lo===l.hi&&iv.lo===iv.hi&&!l.hc){out.push(iv)}else out.push(iv)}
  return out}
 function tex(list){if(!list.length)return"\\varnothing";if(list.length===1&&list[0].lo===-Infinity&&list[0].hi===Infinity)return"\\mathbb{R}";
  /* اتحاد فترتين مفتوحتين عند نقطة واحدة = R - {p} */
  if(list.length===2&&list[0].lo===-Infinity&&list[1].hi===Infinity&&list[0].hi===list[1].lo&&!list[0].hc&&!list[1].lc)return"\\mathbb{R}-\\{"+nf(list[0].hi)+"\\}";
  const pts=list.filter(i=>i.lo===i.hi),ivs=list.filter(i=>i.lo!==i.hi);const parts=ivs.map(i=>(i.lc&&i.lo>-Infinity?"[":"(")+nf(i.lo)+" , "+nf(i.hi)+(i.hc&&i.hi<Infinity?"]":")"));
  if(pts.length)parts.push("\\{"+pts.map(p=>nf(p.lo)).join(" , ")+"\\}");return parts.join(" \\cup ")}
 const tog=list=>list.map(i=>({...i,lc:i.lo===-Infinity?false:!i.lc,hc:i.hi===Infinity?false:!i.hc}));
 const hull=list=>[{lo:list[0].lo,hi:list[list.length-1].hi,lc:list[0].lc,hc:list[list.length-1].hc}];
 const ex=(m,k)=>(m===0?"":m===1?"x":m===-1?"-x":m===0.5?"x/2":m===-0.5?"-x/2":m+"*x")+(k===0?(m===0?"0":""):(k>0&&m!==0?"+":"")+k);
 const lt=(m,k)=>M.lin(m===0.5?M.fr(1,2):m===-0.5?M.fr(-1,2):m,k);
 /* بناء اقتران متشعّب من قطعتين مستقيمتين مع نهايات (سهم / دائرة مظلّلة / مفرّغة) */
 function build(){for(let g=0;g<60;g++){const b=ri(-2,2);const a=pick([-Infinity,b-ri(2,4)]),c=pick([Infinity,b+ri(2,4)]);const gap=pick([0,0,1]);const b2=gap?b+ri(1,2):b;if(c!==Infinity&&c<=b2)continue;
   const P=[];const mk=(lo,hi)=>{const m=pick([-2,-1,0,1,2,0.5,-0.5]);const ref=Number.isFinite(lo)?lo:hi;let k=ri(-3,3)-Math.round(m*ref);if(Math.abs(m)===0.5&&((Number.isFinite(lo)&&lo%2)||(Number.isFinite(hi)&&hi%2)))return null;return{m,k,lo,hi}};
   const p1=mk(a,b),p2=mk(b2,c);if(!p1||!p2)continue;
   const t1=Number.isFinite(a)?pick(["c","o"]):"a",j=pick(["c","o"]),t3=Number.isFinite(c)?pick(["c","o"]):"a";
   p1.ta=t1;p1.tb=gap?pick(["c","o"]):j;p2.ta=gap?pick(["c","o"]):(j==="c"?"o":"c");p2.tb=t3;
   const y=(p,x)=>p.m*x+p.k;let okY=true;for(const p of[p1,p2])for(const x of[p.lo,p.hi])if(Number.isFinite(x)&&Math.abs(y(p,x))>5)okY=false;if(!okY)continue;
   if(!gap&&y(p1,b)===y(p2,b)&&p1.m===p2.m)continue;
   const dom=uni([{lo:a,hi:b,lc:t1==="c",hc:p1.tb==="c"},{lo:b2,hi:c,lc:p2.ta==="c",hc:t3==="c"}]);
   const yr=p=>{if(p.m===0)return{lo:p.k,hi:p.k,lc:true,hc:true};const A=Number.isFinite(p.lo)?y(p,p.lo):(p.m>0?-Infinity:Infinity),B=Number.isFinite(p.hi)?y(p,p.hi):(p.m>0?Infinity:-Infinity);
    const ia=p.ta==="c",ib=p.tb==="c";return A<B?{lo:A,hi:B,lc:ia,hc:ib}:{lo:B,hi:A,lc:ib,hc:ia}};
   const rng=uni([yr(p1),yr(p2)]);const X0=Number.isFinite(a)?Math.min(a-1,-5):-6,X1=Number.isFinite(c)?Math.max(c+1,5):6;
   const spec={x:[X0,X1],y:[-6,6],p:[["f",ex(p1.m,p1.k),Number.isFinite(a)?a:X0,b,t1,p1.tb],["f",ex(p2.m,p2.k),b2,Number.isFinite(c)?c:X1,p2.ta,t3]]};
   return{p1,p2,dom,rng,spec,a,b,b2,c}}return null}
 const endW=t=>t==="c"?"دائرة مظلّلة (ضمن المجموعة)":t==="o"?"دائرة مفرّغة (ليست ضمن المجموعة)":"سهم (يستمر بلا نهاية)";
 L1.gens.push(
 {id:"dom-graph",lvl:2,t:"المجال من التمثيل البياني",f(){const G=build();if(!G)return null;const svg=SV(G.spec);if(!svg)return null;const R=tex(G.dom);
   const o=opts($(R),[$(tex(tog(G.dom))),$(tex(G.rng)),$(tex(hull(G.dom))),$("\\mathbb{R}"),$(tex(uni(G.dom.map(i=>({...i,lc:true,hc:true})))))],()=>null);if(!o)return null;
   return{q:"مجال الاقتران الممثّل بيانيًّا في الشكل هو:"+svg,...o,s:["المجال: قيم "+$("x")+" التي يغطّيها التمثيل؛ نقرأ من اليسار إلى اليمين على المحور "+$("x"),"القطعة الأولى تبدأ بـ"+endW(G.p1.ta)+(Number.isFinite(G.a)?" عند "+$("x="+G.a):"")+" وتنتهي بـ"+endW(G.p1.tb)+" عند "+$("x="+G.b),"القطعة الثانية تبدأ بـ"+endW(G.p2.ta)+" عند "+$("x="+G.b2)+" وتنتهي بـ"+endW(G.p2.tb)+(Number.isFinite(G.c)?" عند "+$("x="+G.c):""),"نجمع الفترتين: المجال "+$(R)],chk:()=>true}}},
 {id:"rng-graph",lvl:3,t:"المدى من التمثيل البياني",f(){const G=build();if(!G)return null;const svg=SV(G.spec);if(!svg)return null;const R=tex(G.rng);
   const o=opts($(R),[$(tex(tog(G.rng))),$(tex(G.dom)),$(tex(hull(G.rng))),$("\\mathbb{R}"),$(tex(uni(G.rng.map(i=>({...i,lc:true,hc:true})))))],()=>null);if(!o)return null;
   const yd=p=>p.m===0?"قطعة أفقية تعطي القيمة "+$("y="+p.k)+" فقط":"قيم "+$("y")+" عليها من "+$(nf(Number.isFinite(p.lo)?p.m*p.lo+p.k:(p.m>0?-Infinity:Infinity)))+" إلى "+$(nf(Number.isFinite(p.hi)?p.m*p.hi+p.k:(p.m>0?Infinity:-Infinity)));
   return{q:"مدى الاقتران الممثّل بيانيًّا في الشكل هو:"+svg,...o,s:["المدى: قيم "+$("y")+" التي يغطّيها التمثيل؛ نقرأ من الأسفل إلى الأعلى على المحور "+$("y"),"القطعة الأولى: "+yd(G.p1)+" (مع مراعاة الدوائر المظلّلة والمفرّغة)","القطعة الثانية: "+yd(G.p2),"نجمع القيم (ونحذف المكرّر): المدى "+$(R)],chk:()=>true}}},
 {id:"rng-abs-graph",lvl:1,t:"مدى اقتران القيمة المطلقة من تمثيله",f(){const a=pick([1,2,-1,-2,0.5,-0.5]),h=ri(-3,3),k=ri(-3,3);const svg=SV({x:[-6,6],y:[-6,6],p:[["f",(a===0.5?"0.5":a===-0.5?"-0.5":a)+"*abs(x"+(h>=0?"-"+h:"+"+(-h))+")+"+k,-6,6,"a","a"]]});if(!svg)return null;
   const R=a>0?"[ "+k+" , \\infty)":"(-\\infty , "+k+"]";const o=opts($(R),[$(a>0?"("+k+" , \\infty)":"(-\\infty , "+k+")"),$(a>0?"(-\\infty , "+k+"]":"[ "+k+" , \\infty)"),$("\\mathbb{R}"),$(a>0?"[ "+h+" , \\infty)":"(-\\infty , "+h+"]")]);if(!o)return null;
   return{q:"مدى الاقتران الممثّل بيانيًّا في الشكل هو:"+svg,...o,s:["نحدّد الرأس من الشكل: "+$("("+h+","+k+")"),"الشكل مفتوح "+(a>0?"للأعلى ⇐ أصغر قيمة لـ "+$("y")+" هي "+k:"للأسفل ⇐ أكبر قيمة لـ "+$("y")+" هي "+k),"الرأس نقطة على المنحنى فالقيمة "+k+" ضمن المدى (قوس مغلق)","المدى "+$(R)+"، والمجال "+$("\\mathbb{R}")],chk:()=>true}}},
 {id:"rng-pw-alg",lvl:3,t:"مدى اقتران متشعّب من قاعدته",f(){for(let g=0;g<40;g++){const c=ri(-2,3);const m1=pick([1,2,-1,-2,0]),m2=pick([1,2,-1,-2,0]);const k1=ri(-4,4),k2=ri(-4,4);const lc=pick([true,false]);
   const y1=m1*c+k1,y2=m2*c+k2;const p1={m:m1,k:k1,lo:-Infinity,hi:c,ta:"a",tb:lc?"o":"c"},p2={m:m2,k:k2,lo:c,hi:Infinity,ta:lc?"c":"o",tb:"a"};
   const yr=p=>{if(p.m===0)return{lo:p.k,hi:p.k,lc:true,hc:true};const A=Number.isFinite(p.lo)?p.m*p.lo+p.k:(p.m>0?-Infinity:Infinity),B=Number.isFinite(p.hi)?p.m*p.hi+p.k:(p.m>0?Infinity:-Infinity);const ia=p.ta==="c",ib=p.tb==="c";return A<B?{lo:A,hi:B,lc:ia,hc:ib}:{lo:B,hi:A,lc:ib,hc:ia}};
   const r=uni([yr(p1),yr(p2)]);const R=tex(r);if(R==="\\mathbb{R}"&&Math.random()<.6)continue;
   const q="مدى الاقتران "+$("f(x)="+M.cases([[lt(m1,k1),lc?"x<"+c:"x\\le "+c],[lt(m2,k2),lc?"x\\ge "+c:"x>"+c]]))+" هو:";
   const o=opts($(R),[$(tex(tog(r))),$(tex(hull(r))),$("\\mathbb{R}"),$(tex(uni([yr(p1)]))),$(tex(uni([yr(p2)])))],()=>null);if(!o)continue;
   const d=(p,i,cond)=>p.m===0?"القاعدة "+i+" ثابتة: القيمة "+$(String(p.k)):"القاعدة "+i+": عندما "+$(cond)+" يكون "+$(lt(p.m,p.k))+" "+(((p.m>0)===(i===1))?"أقل":"أكبر")+" من "+$(String(i===1?y1:y2))+(((i===1&&!lc)||(i===2&&lc))?" أو يساويه":"")+" ⇐ "+$(tex(uni([yr(p)])));
   return{q,...o,s:["نجد قيم كل قاعدة على فترتها، بدءًا من قيمتها عند نقطة التشعّب "+$("x="+c),d(p1,1,lc?"x<"+c:"x\\le "+c),d(p2,2,lc?"x\\ge "+c:"x>"+c),"المدى اتحاد المجموعتين: "+$(R)],chk:()=>true}}return null}},
 {id:"dom-pw-alg",lvl:2,t:"مجال اقتران متشعّب بثلاث قواعد",f(){const a=ri(-6,-2),b=ri(-1,1),c=ri(2,5);const t=[pick([true,false]),pick([true,false])];const openL=pick([true,false]);
   const c1=(openL?a+"<":a+"\\le ")+" x"+(t[0]?"<":"\\le ")+b,c2=b+(t[0]?"\\le ":"<")+" x"+(t[1]?"<":"\\le ")+c,c3="x"+(t[1]?"\\ge ":">")+c;
   const R=(openL?"(":"[")+a+" , \\infty)";const o=opts($(R),[$((openL?"[":"(")+a+" , \\infty)"),$("\\mathbb{R}"),$((openL?"(":"[")+a+" , "+c+"]"),$("["+c+" , \\infty)")]);if(!o)return null;
   return{q:"مجال الاقتران "+$("f(x)="+M.cases([["x^{2}",c1],["3",c2],["2x-1",c3]]))+" هو:",...o,s:["المجال هو اتحاد الفترات المكتوبة بجانب القواعد","الفترات متتالية بلا فجوات: من "+$(String(a))+" ("+(openL?"غير مشمول":"مشمول")+") إلى ما لا نهاية","المجال "+$(R)],chk:()=>true}}}
 );})();

(window.G11=window.G11||{units:[]}).units.push(U);
})();
