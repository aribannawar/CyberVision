import { compareFingerprint } from "./fingerprint-compare.js";

import { Redis } from "@upstash/redis";

import { getSession } from "../auth/session-store.js";

import { logSecurityEvent } from "./logger.js";

const redis = new Redis({

    url: process.env.UPSTASH_REDIS_REST_URL,

    token: process.env.UPSTASH_REDIS_REST_TOKEN

});

export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({

            success: false,

            message: "Method Not Allowed"

        });

    }

    try {

        // Session cookie

        const cookie = req.headers.cookie || "";

        const match = cookie.match(/cv_session=([^;]+)/);

        if (!match) {

            return res.status(401).json({

                success: false,

                message: "No Session"

            });

        }

        const sessionId = match[1];

        const session = await getSession(sessionId);

        if (!session) {

            return res.status(401).json({

                success: false,

                message: "Invalid Session"

            });

        }

        // Client fingerprint

        const fingerprint = req.body;

        const key = `fingerprint:${session.email}`;

        const previous = await redis.get(key);

let trusted = true;

let comparison = {

    score: 0,

    changes: []

};

if (previous) {

    comparison = compareFingerprint(

        previous,

        fingerprint

    );

    if (comparison.score >= 40) {

        trusted = false;

    }

}


        }

        await redis.set(

            key,

            fingerprint,

            {

                ex: 60 * 60 * 24 * 30

            }

        );

        const ip =

            req.headers["x-forwarded-for"]?.split(",")[0] ||

            req.socket?.remoteAddress ||

            "unknown";

        await logSecurityEvent({

            type: trusted

                ? "DEVICE_VERIFIED"

                : "DEVICE_CHANGED",

            ip,

            user: session.email,

            severity: trusted

                ? "INFO"

                : "MEDIUM",

            message: trusted

                ? "Trusted device verified"

                : "New browser fingerprint detected",

            details: {

    risk: fingerprint.risk,

    comparisonScore: comparison.score,

    changes: comparison.changes

}

        });

        return res.status(200).json({

            success: true,

            trusted

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false

        });

    }

}
