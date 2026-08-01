export function integrityCheck() {

    return {

        secureContext:

            window.isSecureContext,

        crossOriginIsolated:

            window.crossOriginIsolated || false,

        visibility:

            document.visibilityState

    };

}
