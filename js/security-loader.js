import { requireSession } from "./session.js";
import { initFingerprint } from "./fingerprint.js";
import { initTelemetry } from "./telemetry.js";
import { initCsrf } from "./csrf.js";
import "./secure-fetch.js";

(async () => {

    document.documentElement.style.visibility = "hidden";

    await requireSession();

    await initFingerprint();

    initTelemetry();

    await initCsrf();

console.log(
    "Fingerprint:",
    window.CV_FINGERPRINT_ID
);

document.documentElement.style.visibility = "visible";

})();
