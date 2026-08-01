let csrfToken = null;

export async function loadCSRF(){

    const res = await fetch(
        "/api/security/csrf-token",
        {
            credentials:"include"
        }
    );

    const data = await res.json();

    csrfToken = data.csrfToken;

}

export function getCSRF(){

    return csrfToken;

}
