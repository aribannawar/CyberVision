import { secureFetch } from "./secure-fetch.js";

async function sha256(text) {

    const encoder = new TextEncoder();

    const data = encoder.encode(text);

    const hash = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

}

function collectFingerprint() {

    return {

        browser: {

            userAgent: navigator.userAgent,

            language: navigator.language,

            platform: navigator.platform,

            languages: navigator.languages

        },

        device: {

            screenWidth: screen.width,

            screenHeight: screen.height,

            colorDepth: screen.colorDepth,

            pixelRatio: window.devicePixelRatio,

            timezone:

                Intl.DateTimeFormat().resolvedOptions().timeZone,

            touch:

                navigator.maxTouchPoints > 0,

            hardware:

                navigator.hardwareConcurrency || 0,

            memory:

                navigator.deviceMemory || 0

        },

        telemetry: {

            webdriver:

                navigator.webdriver || false

        }

    };

}

export async function initFingerprint() {

    const fingerprint =
        collectFingerprint();

    const raw =
        JSON.stringify(fingerprint);

    const id =
        await sha256(raw);

    fingerprint.id = id;

    window.CV_FINGERPRINT_ID = id;

    window.CV_FINGERPRINT = fingerprint;

    try {

        await secureFetch(
            "/api/security/fingerprint",
            {
                method: "POST",
                body: JSON.stringify(fingerprint)
            }
        );

    }

    catch (e) {

        console.error(
            "Fingerprint upload failed",
            e
        );

    }

    return fingerprint;

}
