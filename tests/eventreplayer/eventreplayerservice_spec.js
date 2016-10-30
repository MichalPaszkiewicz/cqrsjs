"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Framework = require('../../scripts/framework');
var Projections = require('../../scripts/projections');
var EventReplayer = require('../../scripts/eventreplayer/eventreplayerservice');
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var testEventReplayerService = new EventReplayer.EventReplayerService();
        var _aggregateRootID = Framework.IDGenerator.generate();
        var _userName = "testing eventreplayer";
        var num = 0;
        var CreateTableEvent = (function (_super) {
            __extends(CreateTableEvent, _super);
            function CreateTableEvent() {
                _super.call(this, _aggregateRootID, "CreateTableEvent", _userName);
            }
            return CreateTableEvent;
        }(Framework.Deed));
        var CreateTableEventHandler = (function () {
            function CreateTableEventHandler() {
                this.HandlesEvent = "CreateTableEvent";
            }
            CreateTableEventHandler.prototype.handle = function (event) {
                num = 0;
                Projections.ProjectionStore.Instance.addTable("testTable");
            };
            return CreateTableEventHandler;
        }());
        Projections.EventHandlerService.Instance.register(new CreateTableEventHandler());
        var TestEvent = (function (_super) {
            __extends(TestEvent, _super);
            function TestEvent() {
                _super.call(this, _aggregateRootID, "testEvent", _userName);
            }
            return TestEvent;
        }(Framework.Deed));
        var TestEventHandler = (function () {
            function TestEventHandler() {
                this.HandlesEvent = "testEvent";
            }
            TestEventHandler.prototype.handle = function (event) {
                var row = new Projections.Row({ "num": num });
                num++;
                Projections.ProjectionStore.Instance.addRowToTable("testTable", row);
            };
            return TestEventHandler;
        }());
        Projections.EventHandlerService.Instance.register(new TestEventHandler());
        describe("an event replayer service", function () {
            var promise = Framework.EventStoreService.Instance.store(new CreateTableEvent(), function () { });
            for (var i = 0; i < 10; i++) {
                promise = promise.then(function () { Framework.EventStoreService.Instance.store(new TestEvent(), function () { }); });
            }
            Framework.TimeService.Instance.addMinutes(1);
            var intermediateTime = Framework.TimeService.Instance.now();
            promise = promise.then(function () {
                intermediateTime = Framework.TimeService.Instance.now();
                Framework.TimeService.Instance.addMinutes(1);
            });
            for (var i = 0; i < 10; i++) {
                promise = promise.then(function () { Framework.EventStoreService.Instance.store(new TestEvent(), function () { }); });
            }
            it("should not have replayed the last 10 events if replaying to intermediateTime", function () {
                promise = promise.then(function () {
                    testEventReplayerService.replayTo(intermediateTime, function () {
                        expect(Projections.ProjectionStore.Instance.getTable("testTable").Rows.length).toBe(10);
                        expect(num).toBe(10);
                    });
                });
            });
            it("should have all the events if replaying to future", function () {
                promise.then(function () {
                    testEventReplayerService.replayAll(function () {
                        expect(Projections.ProjectionStore.Instance.getTable("testTable").Rows.length).toBe(20);
                        expect(num).toBe(20);
                    });
                });
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
