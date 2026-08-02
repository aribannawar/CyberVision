import { Redis } from "@upstash/redis";
import crypto from "crypto";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
});

const SESSION_TTL = 60 * 60 * 24 * 30; // 30 Days

export async function createSession(user) {

    const sessionId = crypto.randomBytes(64).toString("hex");

    await redis.set(
        `session:${sessionId}`,
        {
            id: user.id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            created: Date.now(),
            lastSeen: Date.now()
        },
        {
            ex: SESSION_TTL
        }
    );

    return sessionId;
}

export async function getSession(sessionId) {

    return await redis.get(
        `session:${sessionId}`
    );

}

export async function refreshSession(sessionId) {

    await redis.expire(
        `session:${sessionId}`,
        SESSION_TTL
    );

}

export async function destroySession(sessionId) {

    await redis.del(
        `session:${sessionId}`
    );

}
