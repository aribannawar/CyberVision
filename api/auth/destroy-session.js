import { destroySession, getSession } from "../../lib/auth/session-store.js";
import { logSecurityEvent } from "../../lib/security/logger.js";
export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false
        });

    }

import { protect } from "../security/protect.js";

async function handler(req, res) {

    // Login verification...

}

export default protect(handler);

    try {

        const cookie = req.headers.cookie || "";

        const sessionId = match[1];

// Get session before deleting it
const session = await getSession(sessionId);

// User IP
const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

// Log logout event
if (session) {
    await logSecurityEvent({

        type: "LOGOUT",

        ip,

        user: session.email,

        severity: "INFO",

        message: "User logged out"

    });
}

// Destroy session
await destroySession(sessionId);


        // Clear browser cookie
        res.setHeader(
            "Set-Cookie",
            "cv_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0"
        );

        return res.status(200).json({

            success: true,

            message: "Logged out successfully"

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false

        });

    }

}
