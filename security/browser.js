export function getBrowserInfo() {

    return {

        userAgent: navigator.userAgent,

        language: navigator.language,

        languages: navigator.languages,

        platform: navigator.platform,

        vendor: navigator.vendor,

        cookieEnabled: navigator.cookieEnabled,

        doNotTrack: navigator.doNotTrack,

        hardwareConcurrency:

            navigator.hardwareConcurrency || 0,

        deviceMemory:

            navigator.deviceMemory || 0

    };

}
