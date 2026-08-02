const API = "/api/auth";

let humanVerified = false;

// ----------------------------------------------------
// Cloudflare Turnstile
// ----------------------------------------------------

async function turnstileSuccess(token) {

    try {

        const res = await fetch("/api/security/turnstile", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                token
            })

        });

        const data = await res.json();

        if (!data.success) {

            alert("Human verification failed.");

            return;

        }

        humanVerified = true;

        console.log("✔ Human verified");

    } catch (err) {

        console.error(err);

        alert("Unable to verify Turnstile.");

    }

}

window.turnstileSuccess = turnstileSuccess;

// ----------------------------------------------------
// Google OAuth
// ----------------------------------------------------

async function handleCredentialResponse(response) {

    if (!humanVerified) {

        alert("Complete Human Verification first.");

        return;

    }

    try {

        // Step 1
        const verify = await fetch(`${API}/verify`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                credential: response.credential

            })

        });

        const user = await verify.json();

        if (!verify.ok || !user.authenticated) {

            alert("Google verification failed.");

            return;

        }

        // Step 2
        const create = await fetch(`${API}/create-session`, {

            method: "POST",

            credentials: "include",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                user

            })

        });

        const session = await create.json();

        if (!session.success) {

            alert("Unable to create session.");

            return;

        }

        // Optional UI only

        document.getElementById("username").textContent =
            user.name;

        document.getElementById("user-photo").src =
            user.picture;

        // Start CyberVision loading animation

        startAuthentication();

    } catch (err) {

        console.error(err);

        alert("Authentication failed.");

    }

}

window.handleCredentialResponse = handleCredentialResponse;
