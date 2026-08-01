import { isBlacklisted } from "./blacklist.js";

import { isWhitelisted } from "./whitelist.js";

export async function checkIPReputation(ip) {

    if (isWhitelisted(ip)) {

        return {

            allowed: true,

            reputation: "TRUSTED"

        };

    }

    if (isBlacklisted(ip)) {

        return {

            allowed: false,

            reputation: "BLACKLISTED"

        };

    }

    return {

        allowed: true,

        reputation: "UNKNOWN"

    };

}
