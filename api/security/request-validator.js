export function validateRequest(req) {

    const issues = [];

    // Allowed HTTP methods
    const allowedMethods = [

        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"

    ];

    if (!allowedMethods.includes(req.method)) {

        issues.push("INVALID_HTTP_METHOD");

    }

    // Request URL

    if (!req.url || req.url.length > 2048) {

        issues.push("INVALID_URL");

    }

    // Content-Type

    const contentType =
        req.headers["content-type"] || "";

    if (

        req.method === "POST" &&

        !contentType.includes("application/json")

    ) {

        issues.push("INVALID_CONTENT_TYPE");

    }

    // User-Agent

    const ua =
        req.headers["user-agent"] || "";

    if (!ua) {

        issues.push("MISSING_USER_AGENT");

    }

    // Host Header

    if (!req.headers.host) {

        issues.push("MISSING_HOST");

    }

    return {

        valid: issues.length === 0,

        issues

    };

}
