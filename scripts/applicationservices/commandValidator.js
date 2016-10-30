"use strict";
var errorservice_1 = require('../framework/errorservice');
var CommandValidator = (function () {
    function CommandValidator(validatesCommand) {
        this.ValidatesCommand = validatesCommand;
    }
    CommandValidator.prototype.validate = function (command) {
        if (command.CommandName == null) {
            errorservice_1.ErrorService.throw("Commands must have a Name");
        }
        if (command.AggregateRootID == null) {
            errorservice_1.ErrorService.throw("Command " + command.CommandName + " must have an AggregateRootID");
        }
        if (command.UserName == null) {
            errorservice_1.ErrorService.throw("Command " + command.CommandName + " must have a UserName");
        }
        if (command.Time == null) {
            errorservice_1.ErrorService.throw("Command " + command.CommandName + " has no Time");
        }
    };
    return CommandValidator;
}());
exports.CommandValidator = CommandValidator;
