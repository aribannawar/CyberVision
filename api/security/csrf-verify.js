export async function verifyCsrfToken(req) {

    const clientToken =
        req.headers["x-csrf-token"];

    const cookie =
        req.headers.cookie || "";

    const match =
        cookie.match(/csrf_token=([^;]+)/);

    if (!match) {

        return {

            valid: false

        };

    }

    const serverToken =
        match[1];

    return {

        valid:

            clientToken === serverToken

    };

}
