const startupTasks = [

{ loading:"🚀 Initializing CyberVision...", success:"✓ 🚀 Initialization complete." },

{ loading:"📊 Loading dashboard modules...", success:"✓ 📊 Dashboard loaded." },

{ loading:"👤 Checking authentication...", success:"✓ 👤 Authentication successful." },

{ loading:"📶 Connecting to analytics...", success:"✓ 📶 Connected to analytics." },

{ loading:"🛜 Checking network...", success:"✓ 🛜 Network status: ONLINE" },

{ loading:"🖥️ Checking threat monitor...", success:"✓ 🖥️ Threat monitor: ACTIVE" },

{ loading:"🛡️ Checking firewall...", success:"✓ 🛡️ Firewall: ENABLED" },

{ loading:"🌐 Connecting database...", success:"✓ 🌐 Database: CONNECTED" },

{ loading:"🤖 Activating AI Assistant...", success:"✓ 🤖 AI Assistant: READY" },

{ loading:"👩🏻‍💻 Verifying system...", success:"✓ 👩🏻‍💻 System protected." }

];

const consoleBox = document.getElementById("console");

let taskIndex = 0;

function runTask(){

    if(taskIndex >= startupTasks.length) return;

    const task = startupTasks[taskIndex];

    const row = document.createElement("div");

    row.className = "terminal-row";

    consoleBox.appendChild(row);

    let progress = 0;

    const timer = setInterval(()=>{

        progress += Math.floor(Math.random()*18)+8;

        if(progress > 100) progress = 100;

        const time = new Date().toLocaleTimeString("en-GB",{hour12:false});

        row.innerHTML = `
            <span class="terminal-time">[${time}]</span>
            <span class="terminal-message">⟳ ${task.loading} ${progress}%</span>
        `;

        consoleBox.scrollTop = consoleBox.scrollHeight;

        if(progress >= 100){

            clearInterval(timer);

            setTimeout(()=>{

                const finishTime = new Date().toLocaleTimeString("en-GB",{hour12:false});

                row.innerHTML = `
                    <span class="terminal-time">[${finishTime}]</span>
                    <span class="terminal-message">${task.success}</span>
                `;

                taskIndex++;

                runTask();

            },400);

        }

    },180);

}

runTask();
