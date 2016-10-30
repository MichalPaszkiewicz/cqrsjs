"use strict";
var ErrorService = (function () {
    function ErrorService() {
        this._onThrowEvents = [];
    }
    ErrorService.prototype.onThrow = function (onThrowEvent) {
        this._onThrowEvents.push(onThrowEvent);
    };
    ErrorService.prototype.clearOnThrowEvents = function () {
        this._onThrowEvents = [];
    };
    Object.defineProperty(ErrorService, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new ErrorService();
                this._instance.onThrow(function (message) { throw new Error(message); });
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ErrorService.throw = function (message) {
        ErrorService.Instance.throw(message);
    };
    ErrorService.prototype.throw = function (message) {
        this._onThrowEvents.forEach(function (onThrowEvent) {
            onThrowEvent(message);
        });
    };
    return ErrorService;
}());
exports.ErrorService = ErrorService;
