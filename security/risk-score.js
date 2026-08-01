export function calculateRisk(fp) {

    let score = 0;

    if (fp.telemetry.webdriver)
        score += 50;

    if (!fp.browser.cookieEnabled)
        score += 20;

    if (!fp.integrity.secureContext)
        score += 30;

    if (fp.device.touch === 0)
        score += 5;

    return score;

}
