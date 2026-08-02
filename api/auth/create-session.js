import { createSession } from "../../lib/auth/session-store.js";
import { logSecurityEvent } from "../../lib/security/logger.js";
import { protect } from "../security/protect.js";

async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false
        });
    }

    try {

        const { user } = req.body;

        if (!user || !user.email) {
            return res.status(400).json({
                success: false,
                error: "Missing user."
            });
        }

        const sessionId = await createSession(user);

        const ip =
            req.headers["x-forwarded-for"]?.split(",")[0] ||
            req.socket?.remoteAddress ||
            "unknown";

        await logSecurityEvent({

            type: "LOGIN_SUCCESS",
            ip,
            user: user.email,
            severity: "INFO",
            message: "Google authentication successful"

        });

        res.setHeader(

            "Set-Cookie",

            `cv_session=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 30}`

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
