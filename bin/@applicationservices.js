var ApplicationServices;
(function (ApplicationServices) {
    var CommandValidator = (function () {
        function CommandValidator(validatesCommand) {
            this.ValidatesCommand = validatesCommand;
        }
        CommandValidator.prototype.validate = function (command) {
            if (command.CommandName == null) {
                Framework.ErrorService.throw("Commands must have a Name");
            }
            if (command.AggregateRootID == null) {
                Framework.ErrorService.throw("Command " + command.CommandName + " must have an AggregateRootID");
            }
            if (command.UserName == null) {
                Framework.ErrorService.throw("Command " + command.CommandName + " must have a UserName");
            }
            if (command.Time == null) {
                Framework.ErrorService.throw("Command " + command.CommandName + " has no Time");
            }
        };
        return CommandValidator;
    }());
    ApplicationServices.CommandValidator = CommandValidator;
})(ApplicationServices || (ApplicationServices = {}));
var ApplicationServices;
(function (ApplicationServices) {
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
            relevantValidators.unshift(new ApplicationServices.CommandValidator(command.CommandName));
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
    ApplicationServices.CommandHandlerService = CommandHandlerService;
})(ApplicationServices || (ApplicationServices = {}));
