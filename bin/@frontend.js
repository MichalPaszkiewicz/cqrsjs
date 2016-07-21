var CQRSjs;
(function (CQRSjs) {
    var FrontEnd;
    (function (FrontEnd) {
        function getState() {
            window.requestAnimationFrame(getState);
        }
        getState();
        function runApp() {
            getState();
        }
        FrontEnd.runApp = runApp;
    })(FrontEnd = CQRSjs.FrontEnd || (CQRSjs.FrontEnd = {}));
})(CQRSjs || (CQRSjs = {}));
