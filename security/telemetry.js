export function getTelemetry() {

    return {

        online: navigator.onLine,

        webdriver: navigator.webdriver || false,

        pdfViewer: navigator.pdfViewerEnabled || false,

        javaEnabled:

            navigator.javaEnabled
                ? navigator.javaEnabled()
                : false

    };

}
