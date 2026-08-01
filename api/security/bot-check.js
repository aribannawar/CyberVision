import { logSecurityEvent } from "../../lib/security/logger.js";
export default async function botCheck(req, res) {

    const ua = (req.headers["user-agent"] || "").toLowerCase();

    const headers = req.headers;

    let score = 0;

    // Suspicious User Agents
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

    // Missing browser headers

    if (!headers["accept-language"])
        score += 20;

    if (!headers["sec-fetch-site"])
        score += 20;

    if (!headers["sec-fetch-mode"])
        score += 20;

    if (!headers["sec-ch-ua"])
        score += 20;

    // Very short User-Agent

    if (ua.length < 20)
        score += 30;

await logSecurityEvent({

    type: "BOT_DETECTED",

    ip,

    severity: "HIGH",

    message: "Headless browser blocked",

    details: {

        score

    }

});

    // Final decision

    if (score >= 50) {

        return res.status(403).json({

            success: false,

            reason: "Bot detected",

            score

        });

    }

    return {

        success: true,

        score

    };

}
