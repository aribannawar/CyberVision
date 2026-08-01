import { getBrowserInfo } from "./browser.js";
import { getDeviceInfo } from "./device.js";
import { getTelemetry } from "./telemetry.js";
import { integrityCheck } from "./integrity.js";
import { calculateRisk } from "./risk-score.js";

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

export async function generateFingerprint() {

    const browser = getBrowserInfo();

    const device = getDeviceInfo();

    const telemetry = getTelemetry();

    const integrity = integrityCheck();

    const fingerprint = {

        browser,

        device,

        telemetry,

        integrity

    };

    fingerprint.risk = calculateRisk(fingerprint);

    fingerprint.hash = await sha256(
        JSON.stringify(fingerprint)
    );

    return fingerprint;

}

export async function sendFingerprint() {

    const fingerprint =
        await generateFingerprint();

    try {

        const res = await fetch(
            "/api/security/fingerprint",
            {

                method: "POST",

                credentials: "include",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(fingerprint)

            }

        );

        return await res.json();

    } catch (err) {

        console.error(
            "Fingerprint Error:",
            err
        );

        return null;

    }

}
