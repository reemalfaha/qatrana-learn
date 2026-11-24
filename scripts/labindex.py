# يولّد public/science/data/labindex.js: فهرس تجارب الكتب ومختبراتها الافتراضية (يستخدمه تطبيق حجز المختبرات)
import re,json,os
d=os.path.dirname(os.path.abspath(__file__))+'/../public/science/'
B=open(d+'data/bookexps.js',encoding='utf8').read();X=open(d+'data/expsims.js',encoding='utf8').read()
vx=dict(re.findall(r'"([a-z0-9-]+)":"([^"]+)"',re.search(r'const VX=\{(.*?)\};',X,re.S).group(1)))
G={"8":"الثامن","9":"التاسع","10":"العاشر"};SB={"s":"العلوم","b":"العلوم الحياتية","c":"الكيمياء","p":"الفيزياء","e":"علوم الأرض"}
VT={}
import glob
for f in glob.glob(d+'vlab/exps*.js'):
  for m in re.finditer(r'VLab\.reg\(\{id:"([^"]+)".*?title:"([^"]+)"',open(f,encoding='utf8').read(),re.S):VT[m.group(1)]=m.group(2)
BASE="https://qatrana-learn.reemalfahad-an.workers.dev/science/vlab/lab.html?e="
KW={"b9-2-1-2":"الخاصية الأسموزية البطاطا","b9-2-1-1":"الانتشار","c9-2-2-0":"المعايرة السحاحة","b9-2-1-0":"المجهر شريحة البصل بطانة الخد","c9-2-1-0":"الكواشف تباع الشمس","c10-1-1-1":"كشف اللهب","s8-3-2-0":"الكثافة","s8-3-2-1":"الكثافة الطفو","b9-2-2-0":"التنفس الخلوي الخميرة ماء الجير","b9-1-2-0":"الانتحاء الضوئي","p10-2-1-1":"السقوط الحر","p9-1-3-0":"الميكرومتر"}
out=[]
for k,t in re.findall(r'^"([a-z0-9-]+)":\{t:"([^"]+)"',B,re.M):
  m=re.match(r'([a-z])(\d+)-',k)
  if k in vx: out.append({"k":k,"g":G[m.group(2)],"s":SB[m.group(1)],"t":t,"a":(VT.get(vx[k].split("&")[0],"")+" "+KW.get(k,"")).strip(),"u":BASE+vx[k]})
out+= [{"k":"x-bond","g":"العاشر","s":"الكيمياء","t":"بناء الروابط الأيونية والتساهمية بالتجريب","u":BASE+"c10-bondlab"},
       {"k":"x-eq","g":"التاسع","s":"الكيمياء","t":"كتابة المعادلات الكيميائية وموازنتها","u":BASE+"c9-eqlab"}]
open(d+'data/labindex.js','w',encoding='utf8').write("/* مولَّد تلقائيًّا من scripts/labindex.py — لا تعدّليه يدويًّا */\nwindow.QL_LABS="+json.dumps(out,ensure_ascii=False,separators=(',',':'))+";\n")
print(len(out))
