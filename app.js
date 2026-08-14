const result=document.getElementById("result");
const startBtn=document.getElementById("startBtn");
const stopBtn=document.getElementById("stopBtn");
let scanner=null,running=false;

const tickets=JSON.parse(localStorage.getItem("proyectoX_tickets")||JSON.stringify({
 "PX-2026-DEMO01":{name:"Entrada Demo",type:"GENERAL",used:false},
 "PX-2026-DEMO02":{name:"Entrada VIP Demo",type:"VIP",used:false}
}));

function save(){localStorage.setItem("proyectoX_tickets",JSON.stringify(tickets))}
function show(type,title,msg){
 result.className="result "+type;
 result.innerHTML=`<strong>${title}</strong><span>${msg}</span>`;
}
function validate(raw){
 const code=String(raw).trim(), ticket=tickets[code];
 if(!ticket){show("bad","❌ QR no reconocido",`Código: ${code}`);return}
 if(ticket.used){show("bad","🔴 Entrada ya utilizada",`${ticket.name} · ${ticket.type} · ${code}`);return}
 ticket.used=true;ticket.usedAt=new Date().toISOString();save();
 show("ok","🟢 ENTRADA VÁLIDA",`${ticket.name} · ${ticket.type} · ${code}`);
}
async function start(){
 if(running)return;
 scanner=new Html5Qrcode("reader");
 try{
  await scanner.start({facingMode:"environment"},{fps:10,qrbox:{width:250,height:250}},
   decoded=>validate(decoded),()=>{});
  running=true;startBtn.hidden=true;stopBtn.hidden=false;
  show("neutral","📷 Cámara activa","Apunta al código QR del e-ticket.");
 }catch(e){
  show("bad","No se pudo activar la cámara","Comprueba que uses HTTPS y permitas el acceso a la cámara.");
 }
}
async function stop(){
 if(!scanner||!running)return;
 try{await scanner.stop();scanner.clear()}catch(e){}
 running=false;startBtn.hidden=false;stopBtn.hidden=true;
 show("neutral","Cámara detenida","Pulsa Activar cámara para volver a escanear.");
}
startBtn.addEventListener("click",start);
stopBtn.addEventListener("click",stop);
save();
