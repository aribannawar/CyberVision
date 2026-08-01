import { validateRequest } from "./request-validator.js";
import { analyzePayload } from "./payload-analyzer.js";
import { logSecurityEvent } from "./logger.js";

export async function inspectRequest(req) {

    const requestCheck =
        validateRequest(req);

    if (!requestCheck.valid) {

        await logSecurityEvent({

            type: "REQUEST_BLOCKED",

            severity: "MEDIUM",

            message: "Request validation failed",

            details: requestCheck.issues

        });

        return {

            allowed: false,

            status: 400,

            reason: "INVALID_REQUEST",

            details: requestCheck.issues

        };

    }

    const payloadCheck =
        analyzePayload(req.body);

    if (!payloadCheck.safe) {

        await logSecurityEvent({

            type: "WAF_BLOCK",

            severity: "HIGH",

            message: "Malicious payload detected",

            details: payloadCheck.threats

        });

        return {

            allowed: false,

            status: 403,

            reason: "MALICIOUS_PAYLOAD",

            details: payloadCheck.threats

        };

    }

    return {

        allowed: true,

        status: 200,

        reason: "OK"

    };

}
