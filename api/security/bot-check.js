import { logSecurityEvent } from "../../lib/security/logger.js";

export async function checkBot(req) {

    const ua = (req.headers["user-agent"] || "").toLowerCase();
    const headers = req.headers;

    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket?.remoteAddress ||
        "unknown";

    let score = 0;

    const badAgents = [

        "headless",
        "selenium",
        "puppeteer",
        "playwright",
        "phantom",
        "curl",
        "wget",
        "python",
        "scrapy",
        "httpclient"

    ];

    for (const bot of badAgents) {

        if (ua.includes(bot)) {

            score += 50;

        }

    }

    if (!headers["accept-language"])
        score += 20;

    if (!headers["sec-fetch-site"])
        score += 20;

    if (!headers["sec-fetch-mode"])
        score += 20;

    if (!headers["sec-ch-ua"])
        score += 20;

    if (ua.length < 20)
        score += 30;

    if (score >= 50) {

        await logSecurityEvent({

            type: "BOT_DETECTED",

            ip,

            severity: "HIGH",

            message: "Headless browser blocked",

            details: { score }

        });

        return {

            allowed: false,

            reason: "BOT_DETECTED",

            score

        };

    }

    return {

        allowed: true,

        score

    };

}
