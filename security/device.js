export function getDeviceInfo() {

    return {

        screenWidth: screen.width,

        screenHeight: screen.height,

        availWidth: screen.availWidth,

        availHeight: screen.availHeight,

        colorDepth: screen.colorDepth,

        pixelDepth: screen.pixelDepth,

        timezone:

            Intl.DateTimeFormat().resolvedOptions().timeZone,

        touch:

            navigator.maxTouchPoints || 0

    };

}
