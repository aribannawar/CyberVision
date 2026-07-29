const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars =
"0123456789";

const fontSize = 22;

const columns = Math.floor(canvas.width / fontSize);

const drops = [];

for(let i=0;i<columns;i++){

    drops[i]=Math.random()*canvas.height;

}

function draw(){

    ctx.fillStyle = "rgba(5,8,22,0.15)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = "bold " + fontSize + "px monospace";

    for(let i=0;i<drops.length;i++){

        const text=
        chars[Math.floor(Math.random()*chars.length)];

// Character color
ctx.fillStyle = "#00F5FF";

// Strong glow
ctx.shadowColor = "#00F5FF";
ctx.shadowBlur = 30;
ctx.shadowColor = "#00F5FF";
const colors = [
    "#00FF99",   // green
    "#00E5FF",   // cyan
    "#55AAFF",   // blue
    "#FF4D6D"    // red (rare)
];

const color =
Math.random() < 0.05
? "#FF4D6D"
: colors[Math.floor(Math.random()*3)];

ctx.fillStyle = color;

ctx.shadowColor = color;
ctx.shadowBlur = 8;

ctx.fillText(text, i * fontSize, drops[i]);

ctx.shadowBlur = 0;

      if(
            drops[i]>canvas.height &&
            Math.random()>0.975
        ){

            drops[i]=0;

        }

        drops[i] += fontSize * (0.7 + Math.random() * 0.8);

    }

}

setInterval(draw,45);

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

});
