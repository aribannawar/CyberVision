const blockedIPs = new Set();

export function addToBlacklist(ip) {

    blockedIPs.add(ip);

}

export function removeFromBlacklist(ip) {

    blockedIPs.delete(ip);

}

export function isBlacklisted(ip) {

    return blockedIPs.has(ip);

}

export function getBlacklist() {

    return [...blockedIPs];

}
