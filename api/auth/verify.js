import { OAuth2Client } from "google-auth-library";
import { protect } from "../../lib/security/protect.js";

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            authenticated: false,
            error: "Method Not Allowed"
        });
    }

    try {

        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                authenticated: false,
                error: "Missing Google credential."
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        return res.status(200).json({

            authenticated: true,

            id: payload.sub,
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            email_verified: payload.email_verified

        });

    } catch (err) {

        console.error(err);

        return res.status(401).json({

            authenticated: false,
            error: "Invalid Google ID Token."

        });

    }

}

export default protect(handler);
