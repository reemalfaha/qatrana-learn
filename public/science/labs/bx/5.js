await T.btn("خطّي");for(let k=0;k<8;k++){await T.btn("اضغطي الإبهام");await T.btn("ألصقي الشريط");await T.btn("امسحي");}
const T8=["arch","loop","loop","whorl","loop","whorl","arch","loop"],N={arch:"قوس",loop:"حلقة (عروة)",whorl:"دوّامة"};
for(let k=0;k<8;k++){await T.tap(140+(k%4)*150,120+Math.floor(k/4)*120);await T.btn(N[T8[k]]);}
await T.shot(1);
