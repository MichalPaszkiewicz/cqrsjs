"use strict";
var timeservice_1 = require('./timeservice');
var Deed = (function () {
    function Deed(aggregateRootID, eventName, userName) {
        this.AggregateRootID = aggregateRootID;
        this.UserName = userName;
        this.EventName = eventName;
        this.Time = timeservice_1.TimeService.Instance.nowTicks();
    }
    return Deed;
}());
exports.Deed = Deed;
