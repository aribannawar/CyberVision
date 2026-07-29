const terminal = document.getElementById("contact-terminal");

const logs=[

"> Initializing Secure Channel...",

"✓ TLS Handshake Completed",

"✓ AES-256 Encryption Enabled",

"✓ Identity Verified",

"✓ Firewall Active",

"✓ Communication Ready",

"> Waiting for Incoming Connection..."

];

let i=0;

function typeLog(){

if(i<logs.length){

terminal.innerHTML+=logs[i]+"<br>";

terminal.scrollTop=terminal.scrollHeight;

i++;

setTimeout(typeLog,700);

}

}

window.onload=typeLog;
