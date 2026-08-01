import {

    SQLI_PATTERNS,

    XSS_PATTERNS,

    PATH_TRAVERSAL,

    COMMAND_INJECTION

} from "./waf-rules.js";

export function analyzePayload(input) {

    const text =
        JSON.stringify(input || {});

    const threats = [];

    function check(patterns, type) {

        for (const p of patterns) {

            if (p.test(text)) {

                threats.push(type);

                break;

            }

        }

    }

    check(SQLI_PATTERNS, "SQL_INJECTION");

    check(XSS_PATTERNS, "XSS");

    check(PATH_TRAVERSAL, "PATH_TRAVERSAL");

    check(COMMAND_INJECTION, "COMMAND_INJECTION");

    return {

        safe: threats.length === 0,

        threats

    };

}
