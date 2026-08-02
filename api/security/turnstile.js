export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({

            success: false,

            message: "Method not allowed"

        });

    }

    try {

        const { token } = req.body;

        if (!token) {

            return res.status(400).json({

                success: false,

                message: "Missing Turnstile token"

            });

        }

        const response = await fetch(

            "https://challenges.cloudflare.com/turnstile/v0/siteverify",

            {

                method: "POST",

                headers: {

                    "Content-Type":

                        "application/x-www-form-urlencoded"

                },

                body: new URLSearchParams({

                    secret: process.env.TURNSTILE_SECRET,

                    response: token

                })

            }

        );

        const result = await response.json();

        if (!result.success) {

            return res.status(403).json({

                success: false,

                message: "Turnstile verification failed",

                errors:

                    result["error-codes"] || []

            });

        }

        return res.status(200).json({

            success: true

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: "Internal server error"

        });

    }

}
