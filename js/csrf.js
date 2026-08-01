import {
    setCsrfToken
} from "./secure-fetch.js";

export async function initCsrf() {

    const response =
        await fetch("/api/security/csrf-token", {
            credentials: "include"
        });

    if (!response.ok)
        return;

    const data =
        await response.json();

    setCsrfToken(data.token);

}
