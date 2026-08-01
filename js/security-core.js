/*
==========================================
CyberVision Security Core
Vision 4.0
==========================================
*/

/*
-----------------------------
Configuration
-----------------------------
*/

const SecurityCore = {

    started: false,

    visibility: {

        hidden: false,

        hiddenCount: 0

    },

    network: {

        online: navigator.onLine,

        reconnects: 0

    },

    idle: {

        timeout: 5 * 60 * 1000,

        lastActivity: Date.now(),

        idle: false

    },

    bot: {

        webdriver: false,

        headless: false,

        suspicious: false

    },

    integrity: {

        passed: true,

        issues: []

    },

    trust: {

        score: 100

    }

};

/*
==========================================
Visibility Monitor
==========================================
*/

function startVisibilityMonitor() {

    document.addEventListener(

        "visibilitychange",

        () => {

            SecurityCore.visibility.hidden =
                document.hidden;

            if (document.hidden) {

                SecurityCore.visibility.hiddenCount++;

            }

        }

    );

}

/*
==========================================
Network Monitor
==========================================
*/

function startNetworkMonitor() {

    window.addEventListener(

        "offline",

        () => {

            SecurityCore.network.online = false;

        }

    );

    window.addEventListener(

        "online",

        () => {

            SecurityCore.network.online = true;

            SecurityCore.network.reconnects++;

        }

    );

}

/*
==========================================
Idle Monitor
==========================================
*/

function updateActivity() {

    SecurityCore.idle.lastActivity = Date.now();

    SecurityCore.idle.idle = false;

}

function startIdleMonitor() {

    [

        "mousemove",

        "keydown",

        "touchstart",

        "click",

        "scroll"

    ].forEach(event => {

        window.addEventListener(

            event,

            updateActivity,

            {

                passive: true

            }

        );

    });

    setInterval(() => {

        const diff =

            Date.now()

            -

            SecurityCore.idle.lastActivity;

        SecurityCore.idle.idle =

            diff >

            SecurityCore.idle.timeout;

    }, 1000);

}

/*
==========================================
Bot Detection
==========================================
*/

function startBotDetection() {

    SecurityCore.bot.webdriver =

        navigator.webdriver === true;

    SecurityCore.bot.headless =

        navigator.userAgent.includes(

            "Headless"

        );

    SecurityCore.bot.suspicious =

        SecurityCore.bot.webdriver ||

        SecurityCore.bot.headless;

}

/*
==========================================
Integrity Check
==========================================
*/

function checkIntegrity() {

    if (!window.fetch) {

        SecurityCore.integrity.passed = false;

        SecurityCore.integrity.issues.push(

            "Fetch Missing"

        );

    }

    if (!window.crypto) {

        SecurityCore.integrity.passed = false;

        SecurityCore.integrity.issues.push(

            "Crypto Missing"

        );

    }

}

/*
==========================================
Device Trust
==========================================
*/

function calculateTrust() {

    let score = 100;

    if (SecurityCore.bot.webdriver)

        score -= 50;

    if (SecurityCore.bot.headless)

        score -= 40;

    if (!SecurityCore.network.online)

        score -= 5;

    if (!SecurityCore.integrity.passed)

        score -= 20;

    if (

        SecurityCore.visibility.hiddenCount > 10

    )

        score -= 10;

    SecurityCore.trust.score =

        Math.max(score, 0);

}

/*
==========================================
Initialization
==========================================
*/

export function startSecurityCore() {

    if (SecurityCore.started)

        return SecurityCore;

    SecurityCore.started = true;

    startVisibilityMonitor();

    startNetworkMonitor();

    startIdleMonitor();

    startBotDetection();

    checkIntegrity();

    calculateTrust();

    return SecurityCore;

}

/*
==========================================
Public API
==========================================
*/

export function getSecurityState() {

    calculateTrust();

    return SecurityCore;

}

export function getTrustScore() {

    calculateTrust();

    return SecurityCore.trust.score;

}

export function isSuspicious() {

    calculateTrust();

    return SecurityCore.trust.score < 60;

}
