import { checkDDoS } from "./ddos-protection.js";
import { inspectRequest } from "./waf.js";
import { verifyCsrfToken } from "../../api/security/csrf-verify.js";
import { checkBot } from "../../api/security/bot-check.js";
import { logSecurityEvent } from "./logger.js";

const PUBLIC_ROUTES = [
    "/api/auth/verify",
    "/api/auth/create-session",
    "/api/security/turnstile",
    "/api/security/csrf-token"
];

export function protect(handler) {

    return async function (req, res) {

        try {

            const path = req.url?.split("?")[0] || "";

            // ----------------------------------
            // Public authentication endpoints
            // ----------------------------------

            if (PUBLIC_ROUTES.includes(path)) {

                return await handler(req, res);

            }

            // ----------------------------------
            // DDoS Protection
            // ----------------------------------

            const ddos = await checkDDoS(req);

            if (!ddos.allowed) {

                return res.status(429).json({
                    success: false,
                    reason: ddos.reason
                });

            }

            // ----------------------------------
            // WAF
            // ----------------------------------

            const waf = await inspectRequest(req);

            if (!waf.allowed) {

                return res.status(waf.status).json({
                    success: false,
                    reason: waf.reason,
                    details: waf.details
                });

            }

            // ----------------------------------
            // CSRF
            // ----------------------------------

            if (
                req.method !== "GET" &&
                req.method !== "HEAD"
            ) {

                const csrf = await verifyCsrfToken(req);

                if (!csrf.valid) {

                    return res.status(403).json({
                        success: false,
                        reason: "INVALID_CSRF"
                    });

                }

            }

            // ----------------------------------
            // Bot Detection
            // ----------------------------------

            const bot = await checkBot(req);

            if (!bot.allowed) {

                return res.status(403).json({
                    success: false,
                    reason: bot.reason
                });

            }

            // ----------------------------------
            // Security Headers
            // ----------------------------------

            res.setHeader("X-Frame-Options", "DENY");
            res.setHeader("X-Content-Type-Options", "nosniff");
            res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
            res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

            return await handler(req, res);

        } catch (err) {

            console.error(err);

            await logSecurityEvent({

                type: "SERVER_EXCEPTION",

                severity: "CRITICAL",

                message: err.message

            });

            return res.status(500).json({

                success: false,

                reason: "SERVER_ERROR"

            });

        }

    };

}
