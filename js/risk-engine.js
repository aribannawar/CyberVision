/*
==========================================
CyberVision Risk Engine
Vision 4.0
==========================================
*/

import CONFIG from "./security-config.js";

let state = {

    score: 0,

    level: "LOW",

    checks: {

        session: false,

        csrf: false,

        network: true,

        integrity: true

    },

    lastUpdate: null

};

/*
==========================================
Update Individual Checks
==========================================
*/

export function updateCheck(name, passed) {

    if (name in state.checks) {

        state.checks[name] = !!passed;

    }

}

/*
==========================================
Calculate Overall Risk
==========================================
*/

export function calculateRisk() {

    let score = 0;

    if (!state.checks.session) score += 40;

    if (!state.checks.csrf) score += 25;

    if (!state.checks.network) score += 15;

    if (!state.checks.integrity) score += 20;

    state.score = Math.min(score, 100);

    if (score < 30) {

        state.level = "LOW";

    } else if (score < 60) {

        state.level = "MEDIUM";

    } else {

        state.level = "HIGH";

    }

    state.lastUpdate = Date.now();

    return getRisk();

}

/*
==========================================
Get Current Risk
==========================================
*/

export function getRisk() {

    return structuredClone(state);

}

/*
==========================================
Convenience Helpers
==========================================
*/

export function isTrusted() {

    return state.level === "LOW";

}

export function requiresReauthentication() {

    return state.level === "HIGH";

}

export function resetRisk() {

    state.score = 0;

    state.level = "LOW";

    state.lastUpdate = null;

    Object.keys(state.checks).forEach(key => {

        state.checks[key] = true;

    });

}

export default {

    updateCheck,

    calculateRisk,

    getRisk,

    isTrusted,

    requiresReauthentication,

    resetRisk

};
