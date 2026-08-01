import { checkIPReputation } from "./ip-reputation.js";

export async function threatIntelligence(ip) {

    const reputation =

        await checkIPReputation(ip);

    let score = 0;

    if (

        reputation.reputation === "BLACKLISTED"

    ) {

        score += 100;

    }

    if (

        reputation.reputation === "UNKNOWN"

    ) {

        score += 10;

    }

    return {

        score,

        reputation

    };

}
