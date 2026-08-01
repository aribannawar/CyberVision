/*
==========================================
CyberVision Telemetry Engine
Vision 4.0
==========================================
*/

import CONFIG, { featureEnabled } from "./security-config.js";

const telemetry = {

    startedAt: Date.now(),

    sessionDuration: 0,

    pageViews: 1,

    mouse: {
        moves: 0,
        lastX: 0,
        lastY: 0
    },

    keyboard: {
        presses: 0,
        lastKey: null
    },

    clicks: {
        total: 0
    },

    scroll: {
        position: 0,
        max: 0
    },

    visibility: {
        hidden: false,
        changes: 0
    },

    network: {
        online: navigator.onLine,
        changes: 0
    },

    performance: {
        loadTime: 0,
        memory: null
    },

    errors: [],

    page: {

        url: location.href,

        title: document.title,

        referrer: document.referrer

    }

};

/*
==========================================
Initialization
==========================================
*/

export function startTelemetry() {

    if (!featureEnabled("TELEMETRY")) return;

    collectPerformance();

    attachMouse();

    attachKeyboard();

    attachClicks();

    attachScroll();

    attachVisibility();

    attachNetwork();

    attachErrors();

    startTimer();

}

/*
==========================================
Mouse
==========================================
*/

function attachMouse() {

    document.addEventListener("mousemove", e => {

        telemetry.mouse.moves++;

        telemetry.mouse.lastX = e.clientX;

        telemetry.mouse.lastY = e.clientY;

    });

}

/*
==========================================
Keyboard
==========================================
*/

function attachKeyboard() {

    document.addEventListener("keydown", e => {

        telemetry.keyboard.presses++;

        telemetry.keyboard.lastKey = e.key;

    });

}

/*
==========================================
Clicks
==========================================
*/

function attachClicks() {

    document.addEventListener("click", () => {

        telemetry.clicks.total++;

    });

}

/*
==========================================
Scroll
==========================================
*/

function attachScroll() {

    window.addEventListener("scroll", () => {

        telemetry.scroll.position = window.scrollY;

        telemetry.scroll.max = Math.max(

            telemetry.scroll.max,

            window.scrollY

        );

    });

}

/*
==========================================
Visibility
==========================================
*/

function attachVisibility() {

    document.addEventListener(

        "visibilitychange",

        () => {

            telemetry.visibility.hidden =

                document.hidden;

            telemetry.visibility.changes++;

        }

    );

}

/*
==========================================
Network
==========================================
*/

function attachNetwork() {

    window.addEventListener("online", () => {

        telemetry.network.online = true;

        telemetry.network.changes++;

    });

    window.addEventListener("offline", () => {

        telemetry.network.online = false;

        telemetry.network.changes++;

    });

}

/*
==========================================
Performance
==========================================
*/

function collectPerformance() {

    window.addEventListener("load", () => {

        const nav = performance.getEntriesByType("navigation")[0];

        if (nav) {

            telemetry.performance.loadTime =

                Math.round(nav.loadEventEnd);

        }

        if (performance.memory) {

            telemetry.performance.memory = {

                used: performance.memory.usedJSHeapSize,

                total: performance.memory.totalJSHeapSize,

                limit: performance.memory.jsHeapSizeLimit

            };

        }

    });

}

/*
==========================================
Errors
==========================================
*/

function attachErrors() {

    window.addEventListener("error", e => {

        telemetry.errors.push({

            message: e.message,

            file: e.filename,

            line: e.lineno,

            time: Date.now()

        });

    });

}

/*
==========================================
Session Timer
==========================================
*/

function startTimer() {

    setInterval(() => {

        telemetry.sessionDuration =

            Date.now() - telemetry.startedAt;

    }, 1000);

}

/*
==========================================
Helpers
==========================================
*/

export function getTelemetry() {

    return structuredClone(telemetry);

}

export function resetTelemetry() {

    telemetry.mouse.moves = 0;

    telemetry.keyboard.presses = 0;

    telemetry.clicks.total = 0;

    telemetry.scroll.position = 0;

    telemetry.scroll.max = 0;

    telemetry.errors = [];

}

export function exportTelemetry() {

    return JSON.stringify(

        getTelemetry(),

        null,

        2

    );

}

export default {

    startTelemetry,

    getTelemetry,

    resetTelemetry,

    exportTelemetry

};
