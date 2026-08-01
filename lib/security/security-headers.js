export default function applySecurityHeaders(res) {

    // Prevent MIME sniffing
    res.setHeader(
        "X-Content-Type-Options",
        "nosniff"
    );

    // Prevent clickjacking
    res.setHeader(
        "X-Frame-Options",
        "DENY"
    );

    // Control referrer leakage
    res.setHeader(
        "Referrer-Policy",
        "strict-origin-when-cross-origin"
    );

    // Browser permissions
    res.setHeader(
        "Permissions-Policy",
        [
            "camera=()",
            "microphone=()",
            "geolocation=()",
            "payment=()",
            "usb=()"
        ].join(", ")
    );

    // HTTPS only
    res.setHeader(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload"
    );

    // Cross-Origin protections
    res.setHeader(
        "Cross-Origin-Opener-Policy",
        "same-origin"
    );

    res.setHeader(
        "Cross-Origin-Resource-Policy",
        "same-origin"
    );

    res.setHeader(
        "Cross-Origin-Embedder-Policy",
        "require-corp"
    );

    // Disable old browser XSS filter quirks
    res.setHeader(
        "X-XSS-Protection",
        "0"
    );

}
