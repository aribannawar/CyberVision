import { createSession } from "../../lib/auth/session-store.js";

export default async function handler(req,res){

    if(req.method !== "POST"){

await logSecurityEvent({

    type: "LOGIN_SUCCESS",

    ip,

    user: payload.email,

    severity: "INFO",

    message: "Google authentication successful"

});

import { protect } from "../security/protect.js";

async function handler(req, res) {

    // Login verification...

}

export default protect(handler);

        return res.status(405).end();

    }

    const { user } = req.body;

    const sessionId = createSession(user);

    res.setHeader(
        "Set-Cookie",
        `cv_session=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=2592000`
    );

    return res.status(200).json({

        success:true

    });

}
