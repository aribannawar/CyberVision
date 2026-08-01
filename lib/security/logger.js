import { Redis } from "@upstash/redis";

const redis = new Redis({

    url: process.env.UPSTASH_REDIS_REST_URL,

    token: process.env.UPSTASH_REDIS_REST_TOKEN

});

export async function logSecurityEvent({

    type,

    ip,

    user = "anonymous",

    severity = "INFO",

    message,

    details = {}

}) {

    const event = {

        timestamp: new Date().toISOString(),

        type,

        ip,

        user,

        severity,

        message,

        details

    };

    await redis.lpush(

        "security_logs",

        JSON.stringify(event)

    );

    // Keep only latest 1000 logs

    await redis.ltrim(

        "security_logs",

        0,

        999

    );

}
