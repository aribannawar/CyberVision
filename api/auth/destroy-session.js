import {
    destroySession,
    getSession
} from "../../lib/auth/session-store.js";

import { logSecurityEvent } from "../../lib/security/logger.js";

import { protect } from "../../lib/security/protect.js";

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

        const ip =
            req.headers["x-forwarded-for"]?.split(",")[0] ||
            req.socket?.remoteAddress ||
            "unknown";

        if (session) {

            await logSecurityEvent({

                type: "LOGOUT",
                ip,
                user: session.email,
                severity: "INFO",
                message: "User logged out"

            });

        }

        await destroySession(sessionId);

        res.setHeader(

            "Set-Cookie",

            "cv_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0"

        );

        return res.status(200).json({

            success: true

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
