"use strict";
var Framework = require('../../scripts/framework');
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var _logMessage = "testing logger";
        describe("the logService", function () {
            var lastLog = "";
            Framework.LogService.Instance.clearLogEvents();
            Framework.LogService.Instance.onLog(function (message) { lastLog = message; });
            Framework.LogService.Instance.log(_logMessage);
            it("should perform onLogEvents correctly", function () {
                expect(lastLog).toBe(_logMessage);
            });
        });
        describe("the logService", function () {
            var lastLog = "no message";
            Framework.LogService.Instance.onLog(function (message) { lastLog = message; });
            Framework.LogService.Instance.clearLogEvents();
            Framework.LogService.Instance.log(_logMessage);
            it("should clear log events correctly", function () {
                expect(lastLog).toBe("no message");
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
