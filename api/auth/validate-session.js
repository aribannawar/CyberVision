import { getSession, refreshSession } from "../../lib/auth/session-store.js";

export default async function handler(req, res) {

    if (req.method !== "GET") {
        return res.status(405).json({
            authenticated: false
        });
    }

import { protect } from "../security/protect.js";

async function handler(req, res) {

    // Login verification...

}

export default protect(handler);

    try {

        const cookie = req.headers.cookie || "";

        const match = cookie.match(/cv_session=([^;]+)/);

        if (!match) {

            return res.status(401).json({
                authenticated: false
            });

        }

        const sessionId = match[1];

        const session = await getSession(sessionId);

        if (!session) {

            return res.status(401).json({
                authenticated: false
            });

        }

        await refreshSession(sessionId);

        return res.status(200).json({

            authenticated: true,

            user: session

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            authenticated: false

        });

    }

}
