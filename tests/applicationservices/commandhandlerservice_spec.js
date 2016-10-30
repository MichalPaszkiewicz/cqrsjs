"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Framework = require('../../scripts/framework');
var ApplicationServices = require('../../scripts/applicationservices');
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var _aggregateRootID = Framework.IDGenerator.generate();
        var _userName = "test command handler";
        var _errorMessage = "the test property is bad!";
        var _handled = false;
        var TestCommand = (function (_super) {
            __extends(TestCommand, _super);
            function TestCommand(TestProperty) {
                _super.call(this, _aggregateRootID, _userName, "testCommand");
                this.TestProperty = TestProperty;
            }
            return TestCommand;
        }(Framework.Command));
        var TestCommandHandler = (function () {
            function TestCommandHandler() {
                this.HandlesCommand = "testCommand";
            }
            TestCommandHandler.prototype.handle = function (command) {
                _handled = true;
            };
            return TestCommandHandler;
        }());
        var TestCommandValidator = (function (_super) {
            __extends(TestCommandValidator, _super);
            function TestCommandValidator() {
                _super.call(this, "testCommand");
            }
            TestCommandValidator.prototype.validate = function (command) {
                if (command.TestProperty == "bad") {
                    Framework.ErrorService.throw(_errorMessage);
                }
            };
            return TestCommandValidator;
        }(ApplicationServices.CommandValidator));
        describe("a command handler service", function () {
            _handled = false;
            var commandHandlerService = new ApplicationServices.CommandHandlerService();
            commandHandlerService.register(new TestCommandHandler());
            commandHandlerService.registerValidator(new TestCommandValidator());
            it("handles correct commands correctly", function () {
                commandHandlerService.handle(new TestCommand("good"));
                expect(_handled).toBeTruthy();
            });
        });
        describe("a command handler service", function () {
            var commandHandlerService = new ApplicationServices.CommandHandlerService();
            commandHandlerService.register(new TestCommandHandler());
            commandHandlerService.registerValidator(new TestCommandValidator());
            it("will reject bad commands", function () {
                _handled = false;
                expect(function () { return commandHandlerService.handle(new TestCommand("bad")); }).toThrowError();
                expect(_handled).toBeFalsy();
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
