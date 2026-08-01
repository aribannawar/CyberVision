export default async function handler(req, res) {

    if (req.method !== "GET") {
        return res.status(405).json({
            authenticated: false,
            error: "Method Not Allowed"
        });
    }

    try {

        const cookie = req.headers.cookie || "";

        const session = cookie
            .split(";")
            .find(c => c.trim().startsWith("cv_session="));

        if (!session) {

            return res.status(401).json({

                authenticated: false,

                error: "No session found."

            });

        }

        const sessionId = session.split("=")[1];

        // Temporary validation
        // Later this will query Redis / Vercel KV / Database

        return res.status(200).json({

            authenticated: true,

            session: sessionId

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            authenticated: false,

            error: "Session validation failed."

        });

    }

}
