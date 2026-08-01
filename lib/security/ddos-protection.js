import { Redis } from "@upstash/redis";

import { logSecurityEvent } from "./logger.js";

const redis = new Redis({

    url: process.env.UPSTASH_REDIS_REST_URL,

    token: process.env.UPSTASH_REDIS_REST_TOKEN

});

const WINDOW = 60;          // seconds

const MAX_REQUESTS = 120;   // per minute

const BLOCK_TIME = 300;     // 5 minutes

export async function checkDDoS(req) {

    const ip =

        req.headers["x-forwarded-for"]?.split(",")[0] ||

        req.socket?.remoteAddress ||

        "unknown";

    const blockKey = `block:${ip}`;

    const blocked = await redis.get(blockKey);

    if (blocked) {

        return {

            allowed: false,

            reason: "IP_BLOCKED"

        };

    }

    const counterKey = `rate:${ip}`;

    let requests =

        await redis.incr(counterKey);

    if (requests === 1) {

        await redis.expire(counterKey, WINDOW);

    }

    if (requests > MAX_REQUESTS) {

        await redis.set(

            blockKey,

            "1",

            {

                ex: BLOCK_TIME

            }

        );

        await logSecurityEvent({

            type: "DDOS_BLOCK",

            severity: "HIGH",

            ip,

            message: "Request flood detected",

            details: {

                requests

            }

        });

        return {

            allowed: false,

            reason: "RATE_LIMIT_EXCEEDED"

        };

    }

    return {

        allowed: true,

        requests

    };

}
