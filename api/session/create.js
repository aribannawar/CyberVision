import crypto from "crypto";

const sessions = new Map();

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method Not Allowed"
        });
    }

    try {

        const user = req.body;

        if (!user.email) {
            return res.status(400).json({
                error: "Missing user."
            });
        }

        const sessionId =
            crypto.randomBytes(32).toString("hex");

        sessions.set(sessionId, {

            id: user.id,

            name: user.name,

            email: user.email,

            picture: user.picture,

            created: Date.now()

        });

        res.setHeader(

            "Set-Cookie",

            `cv_session=${sessionId}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400`

        );

        return res.status(200).json({

            success: true

        });

    } catch {

        return res.status(500).json({

            error: "Session creation failed."

        });

    }

}
