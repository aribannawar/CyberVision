import { logSecurityEvent } from "./logger.js";
import { Redis } from "@upstash/redis";

const redis = new Redis({

    url: process.env.UPSTASH_REDIS_REST_URL,

    token: process.env.UPSTASH_REDIS_REST_TOKEN

});

const WINDOW = 60;
const LIMIT = 60;

export default async function rateLimit(req, res) {

    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket?.remoteAddress ||
        "unknown";

    const key = `rate:${ip}`;

    const current = await redis.incr(key);

    if (current === 1) {

        await redis.expire(key, WINDOW);

    }

    res.setHeader(
        "X-RateLimit-Limit",
        LIMIT
    );

    res.setHeader(
        "X-RateLimit-Remaining",
        Math.max(LIMIT - current, 0)
    );

    if (current > LIMIT) {

await logSecurityEvent({

    type: "RATE_LIMIT",

    ip,

    severity: "MEDIUM",

    message: "Too many requests"

});

        return res.status(429).json({

            success: false,

            error: "Too Many Requests"

        });

    }

    return true;

}
