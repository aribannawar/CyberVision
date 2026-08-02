import { getSession } from "../../lib/auth/session-store.js";
import { refreshSession } from "../../lib/auth/session-store.js";
import { protect } from "../../lib/security/protect.js";

async function handler(req, res) {

    if (req.method !== "GET") {

        return res.status(405).json({

            authenticated: false,
            error: "Method Not Allowed"

        });

    }

    try {

        const cookie = req.headers.cookie || "";

        const match = cookie.match(/cv_session=([^;]+)/);

        if (!match) {

            return res.status(401).json({

                authenticated: false,
                error: "No session found."

            });

        }

        const sessionId = match[1];

        const session = await getSession(sessionId);

        if (!session) {

            return res.status(401).json({

                authenticated: false,
                error: "Invalid session."

            });

        }

        await refreshSession(sessionId);

        return res.status(200).json({

            authenticated: true,
            user: session

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            authenticated: false,
            error: "Session validation failed."

        });

    }

}

export default protect(handler);
