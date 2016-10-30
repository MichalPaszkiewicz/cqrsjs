"use strict";
var LogService = (function () {
    function LogService() {
        this._onLogEvents = [];
    }
    LogService.prototype.onLog = function (onLogEvent) {
        this._onLogEvents.push(onLogEvent);
    };
    Object.defineProperty(LogService, "Instance", {
        get: function () {
            if (LogService._instance == null) {
                LogService._instance = new LogService();
                LogService._instance.onLog(function (message) {
                    console.log(message);
                });
            }
            return LogService._instance;
        },
        enumerable: true,
        configurable: true
    });
    LogService.prototype.log = function (message) {
        this._onLogEvents.forEach(function (onLogEvent) {
            onLogEvent(message);
        });
    };
    LogService.prototype.clearLogEvents = function () {
        this._onLogEvents = [];
    };
    return LogService;
}());
exports.LogService = LogService;
