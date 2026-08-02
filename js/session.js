const API = "/api/auth";

export async function requireSession() {
    try {
        const response = await fetch(`${API}/validate-session`, {
            method: "GET",
            credentials: "include",
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Unauthorized");
        }

        const data = await response.json();

        if (!data.authenticated) {
    throw new Error("Invalid session");
}

window.CyberVisionSession = data.user;

return data.user;

    } catch (err) {

        console.warn("[CyberVision] Session invalid.");

        // Prevent redirect loop
        if (!location.pathname.includes("authentication.html")) {
            location.replace("/authentication.html");
        }

        return null;
    }
}

export async function logout() {

    await fetch(`${API}/destroy-session`, {
        method: "POST",
        credentials: "include"
    });

    localStorage.clear();
    sessionStorage.clear();

    location.replace("/authentication.html");
}
