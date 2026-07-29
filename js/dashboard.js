/* ===========================
      Live Dashboard Values
=========================== */

const cpu = document.getElementById("cpu-value");
const memory = document.getElementById("memory-value");

function updateDashboard(){

    cpu.innerHTML =
    Math.floor(Math.random()*35+10) + "%";

    memory.innerHTML =
    (6 + Math.random()*2).toFixed(1) + " GB";

}

setInterval(updateDashboard,1500);

/* ===========================
      Terminal
=========================== */

const consoleBox =
document.getElementById("dashboard-console");

const consoleLines=[

"[INFO] Loading CyberVision Kernel...",
"[OK] Firewall Online",
"[OK] IDS Initialized",
"[OK] Threat Intelligence Synced",
"[INFO] Updating Malware Database...",
"[OK] Connection Encrypted",
"[INFO] Monitoring Incoming Packets...",
"[OK] CPU Stable",
"[OK] Memory Stable",
"[READY] CyberVision Dashboard Ready"

];

let terminalIndex=0;

function typeTerminal(){

    if(terminalIndex>=consoleLines.length){

        consoleBox.innerHTML="";

        terminalIndex=0;

    }

    consoleBox.innerHTML +=
    "> " + consoleLines[terminalIndex] + "<br>";

    consoleBox.scrollTop =
    consoleBox.scrollHeight;

    terminalIndex++;

}

setInterval(typeTerminal,1200);

/* ===========================
      Live Activity
=========================== */

const liveLog =
document.getElementById("live-log");

const logs=[

"Firewall scanned all incoming traffic.",

"Threat Intelligence updated.",

"Network packets analyzed.",

"Memory usage optimized.",

"IDS blocked suspicious request.",

"OSINT module synchronized.",

"DNS request verified.",

"Authentication successful.",

"Encrypted tunnel established.",

"System integrity verified."

];

function addLog(){

    const p=document.createElement("p");

    const time=new Date().toLocaleTimeString();

    p.innerHTML=
    "["+time+"] "+logs[Math.floor(Math.random()*logs.length)];

    liveLog.prepend(p);

    while(liveLog.children.length>10){

        liveLog.removeChild(
        liveLog.lastChild
        );

    }

}

setInterval(addLog,1800);

/* ===========================
      Threat Meter
=========================== */

const threatFill =
document.querySelector(".threat-fill");

const threatText =
document.querySelector(".safe");

function updateThreat(){

    const value =
    Math.floor(Math.random()*35)+10;

    threatFill.style.width =
    value + "%";

    if(value<30){

        threatText.innerHTML="LOW";
        threatText.style.color="#00FF99";

    }

    else if(value<60){

        threatText.innerHTML="MEDIUM";
        threatText.style.color="#FFD93D";

    }

    else{

        threatText.innerHTML="HIGH";
        threatText.style.color="#FF4D6D";

    }

}

setInterval(updateThreat,2500);
