const trustedIPs = new Set([

    "127.0.0.1",
    "::1"

]);

export function addToWhitelist(ip) {

    trustedIPs.add(ip);

}

export function removeFromWhitelist(ip) {

    trustedIPs.delete(ip);

}

export function isWhitelisted(ip) {

    return trustedIPs.has(ip);

}

export function getWhitelist() {

    return [...trustedIPs];

}
