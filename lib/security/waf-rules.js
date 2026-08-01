export const BLOCKED_METHODS = [

    "TRACE",
    "TRACK",
    "CONNECT"

];

export const SQLI_PATTERNS = [

    /union\s+select/i,
    /or\s+1=1/i,
    /drop\s+table/i,
    /insert\s+into/i,
    /update\s+\w+\s+set/i,
    /delete\s+from/i,
    /sleep\s*\(/i,
    /benchmark\s*\(/i

];

export const XSS_PATTERNS = [

    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
    /alert\s*\(/i,
    /document\.cookie/i,
    /<iframe/i

];

export const PATH_TRAVERSAL = [

    /\.\.\//,
    /\.\.\\/,
    /%2e%2e/i

];

export const COMMAND_INJECTION = [

    /;\s*cat/i,
    /;\s*ls/i,
    /&&/,
    /\|\|/,
    /`/,
    /\$\(/

];
