const bootMessages = [

{ text:"🚀 Initializing CyberVision Core...", color:"cyan" },

{ text:"⚙️ Loading Security Modules...", color:"purple" },

{ text:"🛡️ Checking Firewall...", color:"green" },

{ text:"🌐 Connecting Secured Database...", color:"cyan" },

{ text:"֎ Launching GPT Models...", color:"yellow" },

{ text:"🤖 Launching AI Engine...", color:"purple" },

{ text:"📊 Preparing Dashboard...", color:"blue" },

{ text:"✓ 👤 Authentication Successful", color:"green" },

{ text:"✓ 🔐 System Encrypted & Safe", color:"green" },

{ text:"✓ 🎯 System Ready To Launch", color:"success" }

];

const bootLog = document.getElementById("boot-log");

const bootFill = document.getElementById("boot-fill");

const bootScreen = document.getElementById("boot-screen");

let i = 0;

function bootSequence(){

    if(i >= bootMessages.length){

        setTimeout(()=>{

            bootScreen.style.opacity="0";

            setTimeout(()=>{

                window.location.replace("usage-policy.html");

            },800);

        },600);

        return;

    }

    bootLog.innerHTML = `
<span class="${bootMessages[i].color}">
[>_]... ${bootMessages[i].text}
</span>
`;
    bootFill.style.width=((i+1)/bootMessages.length)*100+"%";

    i++;

    setTimeout(bootSequence,700);

}

window.onload=bootSequence;
