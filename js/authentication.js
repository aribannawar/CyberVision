const steps = [

    "✓ Establishing Secure Channel",

    "✓ Verifying User Identity",

    "✓ Loading User Profile",

    "✓ Synchronizing Session",

    "✓ Access Granted"

];

const logs = [

    "[00.41] Initializing secure environment...",

    "[00.92] Secure tunnel established",

    "[01.48] Google identity verified",

    "[02.13] Session cookie received",

    "[02.86] Synchronizing profile",

    "[03.55] Dashboard ready",

    "[04.00] ACCESS GRANTED"

];

const progress =
document.getElementById("progress-fill");

const percent =
document.getElementById("percent");

const stepsBox =
document.getElementById("steps");

const consoleBox =
document.getElementById("console-log");

let consoleLine = 0;

// ----------------------------------------------------

function typeConsole() {

    if (consoleLine >= logs.length) {

        setTimeout(() => {

            document.body.style.transition =
                "opacity .7s ease";

            document.body.style.opacity = "0";

            setTimeout(() => {

                window.location.replace("/usage-policy.html");

            }, 700);

        }, 1000);

        return;

    }

    const div =
        document.createElement("div");

    consoleBox.appendChild(div);

    let i = 0;

    function type() {

        if (i < logs[consoleLine].length) {

            div.textContent +=
                logs[consoleLine][i];

            i++;

            setTimeout(type, 25);

        }

        else {

            consoleLine++;

            setTimeout(typeConsole, 300);

        }

    }

    type();

}

// ----------------------------------------------------

window.startAuthentication = function () {

    let p = 0;

    const timer = setInterval(() => {

        p++;

        progress.style.width = p + "%";

        percent.textContent = p + "%";

        if (p >= 100) {

            clearInterval(timer);

        }

    }, 40);

    steps.forEach((step, index) => {

        setTimeout(() => {

            const item =
                document.createElement("div");

            item.className = "step";

            item.textContent = step;

            stepsBox.appendChild(item);

            requestAnimationFrame(() => {

                item.classList.add("show");

            });

        }, index * 700);

    });

    typeConsole();

};

// ----------------------------------------------------

window.onload = () => {

    console.log("Waiting for Google authentication...");

};
