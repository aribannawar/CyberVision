export default function verifyCSRF(req) {

    const clientToken = req.headers["x-csrf-token"];

    const cookie = req.headers.cookie || "";

    const match = cookie.match(/csrf_token=([^;]+)/);

    if (!match) {

        return false;

    }

    const serverToken = match[1];

    return clientToken === serverToken;

}
