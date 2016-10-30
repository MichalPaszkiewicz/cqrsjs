"use strict";
var TimeService_1 = require('./TimeService');
var Command = (function () {
    function Command(aggregateRootID, userName, commandName) {
        this.AggregateRootID = aggregateRootID;
        this.UserName = userName;
        this.Time = TimeService_1.TimeService.Instance.nowTicks();
        this.CommandName = commandName;
    }
    return Command;
}());
exports.Command = Command;
