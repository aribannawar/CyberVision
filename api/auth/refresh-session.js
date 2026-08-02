import {
    getSession,
    refreshSession
} from "../../lib/auth/session-store.js";

import { Redis } from "@upstash/redis";

import { protect } from "../security/protect.js";

const redis = new Redis({

    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN

});

async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false
        });

    }

    try {

        const cookie = req.headers.cookie || "";

        const match = cookie.match(/cv_session=([^;]+)/);

        if (!match) {

            return res.status(401).json({

                success: false

            });

        }

        const sessionId = match[1];

        const session = await getSession(sessionId);

        if (!session) {

            return res.status(401).json({

                success: false

            });

        }

        session.lastSeen = Date.now();

        await redis.set(

            `session:${sessionId}`,

            session,

            {

                ex: 60 * 60 * 24 * 30

            }

        );

        await refreshSession(sessionId);

        return res.status(200).json({

            success: true,

            refreshed: true

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false

        });

    }

}

export default protect(handler);
