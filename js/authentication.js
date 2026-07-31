const steps = [
"✓ Establishing Secure Channel",
"✓ Verifying User Identity",
"✓ Loading Operator Profile",
"✓ Synchronizing Session",
"✓ Access Granted"
];

const logs = [
"[00.41] Initializing secure environment...",
"[00.92] Secure tunnel established",
"[01.48] User identity verified",
"[02.13] Operator profile loaded",
"[02.86] Session synchronized",
"[03.55] Dashboard ready",
"[04.00] ACCESS GRANTED"
];

const progress = document.getElementById("progress-fill");
const percent = document.getElementById("percent");
const stepsBox = document.getElementById("steps");
const consoleBox = document.getElementById("console-log");

let p = 0;

// Console Animation
let line = 0;

function typeConsole() {

    if (line >= logs.length) {

        setTimeout(() => {

            document.body.style.transition = "opacity .7s ease";
            document.body.style.opacity = "0";

            setTimeout(() => {

    window.location.replace("home.html");

            }, 700);

        }, 1000);

        return;

    }

    const div = document.createElement("div");

    consoleBox.appendChild(div);

    let i = 0;

    function type() {

        if (i < logs[line].length) {

            div.textContent += logs[line].charAt(i);

            i++;

            setTimeout(type, 25);

        } else {

            line++;

            setTimeout(typeConsole, 350);

        }

    }

    type();

}

window.onload = () => {

    console.log("Waiting for Google Sign-In...");

};

function startAuthentication(){

    let p = 0;

    const progressTimer = setInterval(() => {

        p++;

        progress.style.width = p + "%";
        percent.textContent = p + "%";

        if (p >= 100){

            clearInterval(progressTimer);

        }

    },40);

    steps.forEach((text,index)=>{

        setTimeout(()=>{

            const item=document.createElement("div");

            item.className="step";

            item.textContent=text;

            stepsBox.appendChild(item);

            setTimeout(()=>{

                item.classList.add("show");

            },50);

        },index*700);

    });

    typeConsole();

}
