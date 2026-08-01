import crypto from "crypto";

export default async function handler(req, res) {

    if (req.method !== "GET") {
        return res.status(405).json({
            success: false
        });
    }

    const token = crypto.randomBytes(32).toString("hex");

    res.setHeader(
        "Set-Cookie",
        `csrf_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`
    );

    return res.status(200).json({
        success: true,
        csrfToken: token
    });

}
