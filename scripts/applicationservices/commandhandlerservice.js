"use strict";
var commandValidator_1 = require('./commandValidator');
var CommandHandlerService = (function () {
    function CommandHandlerService() {
        this.CommandHandlers = [];
        this.CommandValidators = [];
    }
    Object.defineProperty(CommandHandlerService, "Instance", {
        get: function () {
            if (CommandHandlerService._instance == null) {
                CommandHandlerService._instance = new CommandHandlerService();
            }
            return CommandHandlerService._instance;
        },
        enumerable: true,
        configurable: true
    });
    CommandHandlerService.prototype.register = function (commandHandler) {
        this.CommandHandlers.push(commandHandler);
    };
    CommandHandlerService.prototype.registerValidator = function (commandValidator) {
        this.CommandValidators.push(commandValidator);
    };
    CommandHandlerService.prototype.handle = function (command) {
        var relevantValidators = this.CommandValidators
            .filter(function (cv) { return cv.ValidatesCommand == command.CommandName; });
        relevantValidators.unshift(new commandValidator_1.CommandValidator(command.CommandName));
        relevantValidators.forEach(function (cv) {
            cv.validate(command);
        });
        this.CommandHandlers
            .filter(function (ch) { return ch.HandlesCommand == command.CommandName; })
            .forEach(function (ch) {
            ch.handle(command);
        });
    };
    return CommandHandlerService;
}());
exports.CommandHandlerService = CommandHandlerService;
