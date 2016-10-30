"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Framework = require('../../scripts/framework');
var Domain = require('../../scripts/domain');
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var _aggregateRootID = "123";
        var _userName = "testing aggregate root";
        var _eventName = "test event";
        var TestAggregateRoot = (function (_super) {
            __extends(TestAggregateRoot, _super);
            function TestAggregateRoot(id) {
                _super.call(this, id);
                var self = this;
                self.registerEventAction(new Domain.EventAction(_eventName, function (e) { self.TestProperty = e.EventName; }));
            }
            TestAggregateRoot.prototype.testMethod = function (command, callback) {
                this.applyEvent(new Framework.Deed(_aggregateRootID, _eventName, _userName), callback);
            };
            return TestAggregateRoot;
        }(Domain.AggregateRoot));
        describe("aggregate root service", function () {
            var testAggregateRootService = new Domain.AggregateRootService();
            it("should add an aggregate root correctly", function () {
                testAggregateRootService.getByID(TestAggregateRoot, _aggregateRootID, function (aggregateRoot) {
                    expect(aggregateRoot.ID).toBe(_aggregateRootID);
                });
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
