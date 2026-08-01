let csrfToken = null;

export function setCsrfToken(token) {
    csrfToken = token;
}

export function getCsrfToken() {
    return csrfToken;
}

export async function secureFetch(url, options = {}) {

    const config = {
        credentials: "include",
        ...options
    };

    config.headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (csrfToken) {
        config.headers["x-csrf-token"] = csrfToken;
    }

    if (window.CV_FINGERPRINT_ID) {
        config.headers["x-device-fingerprint"] =
            window.CV_FINGERPRINT_ID;
    }

    if (window.CV_TELEMETRY_ID) {
        config.headers["x-telemetry-id"] =
            window.CV_TELEMETRY_ID;
    }

    const response =
        await fetch(url, config);

    if (response.status === 401) {

        try {

            const refresh =
                await fetch("/api/auth/refresh-session", {
                    method: "POST",
                    credentials: "include"
                });

            if (refresh.ok) {

                return await fetch(url, config);

            }

        } catch (e) {}

        window.location.href =
            "/authentication.html";

    }

    return response;

}
