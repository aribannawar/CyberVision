/*
==========================================
CyberVision Security Configuration
Vision 4.0
==========================================
*/

export const CONFIG = {

    APP_NAME: "CyberVision",

    VERSION: "4.0",

    DEBUG: false,

    ENVIRONMENT:
        location.hostname === "localhost"
            ? "development"
            : "production",

    FEATURES: {

        SESSION: true,

        CSRF: true,

        FINGERPRINT: true,

        TELEMETRY: true,

        SECURITY_CORE: true,

        RISK_ENGINE: true,

        SECURITY_UI: true,

        SECURE_FETCH: true

    },

    API: {

        VERIFY: "/api/auth/verify",

        SESSION_CREATE: "/api/auth/create-session",

        SESSION_VALIDATE: "/api/auth/validate-session",

        SESSION_REFRESH: "/api/auth/refresh-session",

        SESSION_DESTROY: "/api/auth/destroy-session",

        FINGERPRINT: "/api/security/fingerprint",

        FINGERPRINT_COMPARE: "/api/security/fingerprint-compare",

        CSRF_TOKEN: "/api/security/csrf-token",

        CSRF_VERIFY: "/api/security/csrf-verify"

    },

    SESSION: {

        COOKIE: "cv_session",

        REFRESH_INTERVAL: 5 * 60 * 1000,

        IDLE_TIMEOUT: 5 * 60 * 1000

    },

    TELEMETRY: {

        SEND_INTERVAL: 30000,

        MAX_EVENTS: 500

    },

    SECURITY: {

        RISK_THRESHOLD: 60,

        WARNING_THRESHOLD: 40,

        TRUST_THRESHOLD: 80

    },

    UI: {

        TOAST_DURATION: 4000,

        WARNING_DURATION: 6000,

        LOADER_FADE: 300

    }

};

/*
==========================================
Utility Functions
==========================================
*/

export function isProduction() {

    return CONFIG.ENVIRONMENT === "production";

}

export function isDevelopment() {

    return CONFIG.ENVIRONMENT === "development";

}

export function featureEnabled(name) {

    return CONFIG.FEATURES[name] === true;

}

export function api(name) {

    return CONFIG.API[name];

}

export default CONFIG;
