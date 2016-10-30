"use strict";
var errorservice_1 = require('./errorservice');
var TimeService = (function () {
    function TimeService() {
        this._yearsAdded = 0;
        this._monthsAdded = 0;
        this._daysAdded = 0;
        this._hoursAdded = 0;
        this._minutesAdded = 0;
        this._secondsAdded = 0;
        this._millisecondsAdded = 0;
    }
    Object.defineProperty(TimeService, "Instance", {
        get: function () {
            if (TimeService._instance == null) {
                TimeService._instance = new TimeService();
            }
            return TimeService._instance;
        },
        enumerable: true,
        configurable: true
    });
    TimeService.prototype.getTime = function () {
        var realTime = new Date();
        realTime.setFullYear(realTime.getFullYear() + this._yearsAdded);
        realTime.setMonth(realTime.getMonth() + this._monthsAdded);
        realTime.setDate(realTime.getDate() + this._daysAdded);
        realTime.setHours(realTime.getHours() + this._hoursAdded);
        realTime.setMinutes(realTime.getMinutes() + this._minutesAdded);
        realTime.setSeconds(realTime.getSeconds() + this._secondsAdded);
        realTime.setMilliseconds(realTime.getMilliseconds() + this._millisecondsAdded);
        return realTime;
    };
    TimeService.prototype.reset = function () {
        this._yearsAdded = 0;
        this._monthsAdded = 0;
        this._daysAdded = 0;
        this._hoursAdded = 0;
        this._minutesAdded = 0;
        this._secondsAdded = 0;
        this._millisecondsAdded = 0;
    };
    TimeService.prototype.addYears = function (years) {
        if (Math.round(years) != years) {
            errorservice_1.ErrorService.throw("addYears only accepts integer values for years in the timeService");
        }
        this._yearsAdded += years;
    };
    TimeService.prototype.addMonths = function (months) {
        if (Math.round(months) != months) {
            errorservice_1.ErrorService.throw("addMonths only accepts integer values for months in the timeService");
        }
        this._monthsAdded += months;
    };
    TimeService.prototype.addDays = function (days) {
        if (Math.round(days) != days) {
            errorservice_1.ErrorService.throw("addDays only accepts integer values for days in the timeService");
        }
        this._daysAdded += days;
    };
    TimeService.prototype.addHours = function (hours) {
        if (Math.round(hours) != hours) {
            errorservice_1.ErrorService.throw("addHours only accepts integer values for hours in the timeService");
        }
        this._hoursAdded += hours;
    };
    TimeService.prototype.addMinutes = function (minutes) {
        if (Math.round(minutes) != minutes) {
            errorservice_1.ErrorService.throw("addMinutes only accepts integer values for minutes in the timeService");
        }
        this._minutesAdded += minutes;
    };
    TimeService.prototype.addSeconds = function (seconds) {
        if (Math.round(seconds) != seconds) {
            errorservice_1.ErrorService.throw("addSeconds only accepts integer values for seconds in the timeService");
        }
        this._secondsAdded += seconds;
    };
    TimeService.prototype.addMilliseconds = function (milliseconds) {
        if (Math.round(milliseconds) != milliseconds) {
            errorservice_1.ErrorService.throw("addMilliseconds only accepts integer values for milliseconds in the timeService");
        }
        this._millisecondsAdded += milliseconds;
    };
    TimeService.prototype.now = function () {
        return this.getTime();
    };
    TimeService.prototype.nowTicks = function () {
        return this.getTime().getTime();
    };
    TimeService.prototype.today = function () {
        var localTime = this.getTime();
        localTime.setHours(0);
        localTime.setMinutes(0);
        localTime.setSeconds(0);
        localTime.setMilliseconds(0);
        return localTime;
    };
    return TimeService;
}());
exports.TimeService = TimeService;
