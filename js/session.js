async function validateSession() {
    try {
        const res = await fetch("/api/session/validate", {
            credentials: "include"
        });

        const data = await res.json();

        if (!data.authenticated) {
            window.location.replace("authentication.html");
            return;
        }

        console.log("✔ Session Valid");

    } catch (err) {
        console.error(err);
        window.location.replace("authentication.html");
    }
}

validateSession();
