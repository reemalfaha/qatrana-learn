await T.btn("رقّمي");await T.btn("أذيبي");await T.btn("املئي بقيّة");
const me=await T.p.evaluate(()=>{const g=[...document.querySelectorAll('svg.sc g.drag')].find(x=>x.querySelector('path[stroke="#7A1F2E"]'));return g.getAttribute('transform').match(/[\d.]+/g).map(Number);});
const others=[[70,180],[125,180],[180,180],[235,180],[70,310],[125,310]].filter(([x,y])=>Math.abs(x-me[0])+Math.abs(y-me[1])>5).slice(0,3);
for(const [x,y] of others)await T.drag(me[0],me[1]-20,x,y-20);
await T.drag(740,400,me[0],me[1]-20);await T.btn("قارني");await T.shot(1);
