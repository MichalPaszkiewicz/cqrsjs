"use strict";
var Then = (function () {
    function Then() {
    }
    Then.prototype.run = function () {
        if (!!this._func) {
            this._func();
        }
        if (!!this._childProcess) {
            this._childProcess.run();
        }
    };
    Then.prototype.then = function (func) {
        this._func = func;
        this._childProcess = new Then();
        return this._childProcess;
    };
    return Then;
}());
exports.Then = Then;
