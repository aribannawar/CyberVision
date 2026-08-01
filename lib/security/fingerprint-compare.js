export function compareFingerprint(previous, current) {

    let score = 0;

    const changes = [];

    function changed(name, oldValue, newValue, weight) {

        if (oldValue !== newValue) {

            score += weight;

            changes.push({

                field: name,

                previous: oldValue,

                current: newValue

            });

        }

    }

    // Browser

    changed(
        "userAgent",
        previous.browser.userAgent,
        current.browser.userAgent,
        35
    );

    changed(
        "language",
        previous.browser.language,
        current.browser.language,
        5
    );

    changed(
        "platform",
        previous.browser.platform,
        current.browser.platform,
        20
    );

    // Device

    changed(
        "screenWidth",
        previous.device.screenWidth,
        current.device.screenWidth,
        3
    );

    changed(
        "screenHeight",
        previous.device.screenHeight,
        current.device.screenHeight,
        3
    );

    changed(
        "timezone",
        previous.device.timezone,
        current.device.timezone,
        15
    );

    changed(
        "touch",
        previous.device.touch,
        current.device.touch,
        10
    );

    // Telemetry

    changed(
        "webdriver",
        previous.telemetry.webdriver,
        current.telemetry.webdriver,
        40
    );

    return {

        score,

        changes

    };

}
