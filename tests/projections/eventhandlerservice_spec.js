"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Framework = require('../../scripts/framework');
var Projections = require('../../scripts/projections');
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var _aggregateRootID = "123";
        var _userName = "testing event handlers";
        var TestEvent = (function (_super) {
            __extends(TestEvent, _super);
            function TestEvent(testProperty) {
                _super.call(this, _aggregateRootID, "testEvent", _userName);
                this.TestProperty = testProperty;
            }
            return TestEvent;
        }(Framework.Deed));
        var lastEventTestProperty = "none";
        var TestEventHandler = (function () {
            function TestEventHandler() {
                this.HandlesEvent = "testEvent";
            }
            TestEventHandler.prototype.handle = function (event) {
                lastEventTestProperty = event.TestProperty;
            };
            return TestEventHandler;
        }());
        var testEventHandler = new TestEventHandler();
        var testEvent = new TestEvent("test 1");
        describe("an event handler service", function () {
            var testEventHandlerService = new Projections.EventHandlerService();
            testEventHandlerService.register(testEventHandler);
            testEventHandlerService.handle(testEvent);
            it("should handle the event with the correct EventHandler", function () {
                expect(lastEventTestProperty).toBe("test 1");
            });
        });
        describe("an event handler service", function () {
            var testEventHandlerService = new Projections.EventHandlerService();
            var SecondEventHandler = (function () {
                function SecondEventHandler() {
                    this.HandlesEvent = "none";
                }
                SecondEventHandler.prototype.handle = function (event) {
                    lastEventTestProperty = "this is now changed";
                };
                return SecondEventHandler;
            }());
            testEventHandlerService.register(testEventHandler);
            testEventHandlerService.register(new SecondEventHandler());
            testEventHandlerService.handle(testEvent);
            it("does not handle with wrong seconds event handler", function () {
                expect(lastEventTestProperty).toBe("test 1");
            });
        });
        describe("an event handler service", function () {
            var testEventHandlerService = new Projections.EventHandlerService();
            var SecondEventHandler = (function () {
                function SecondEventHandler() {
                    this.HandlesEvent = "none";
                }
                SecondEventHandler.prototype.handle = function (event) {
                    lastEventTestProperty = "this is now changed";
                };
                return SecondEventHandler;
            }());
            testEventHandlerService.register(testEventHandler);
            testEventHandlerService.register(new SecondEventHandler());
            it("has registered all the events it should have", function () {
                expect(testEventHandlerService.EventHandlers.length).toBe(2);
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
