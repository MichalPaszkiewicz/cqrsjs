"use strict";
var Framework = require('../framework');
var AggregateRootService = (function () {
    function AggregateRootService() {
    }
    Object.defineProperty(AggregateRootService, "Instance", {
        get: function () {
            if (AggregateRootService._instance == null) {
                AggregateRootService._instance = new AggregateRootService();
            }
            return AggregateRootService._instance;
        },
        enumerable: true,
        configurable: true
    });
    AggregateRootService.prototype.getByID = function (a, aggregateRootID, callback) {
        var relevantAggregateRoot = new a(aggregateRootID);
        Framework.EventStoreService.Instance.getEventsWithID(aggregateRootID, function (results) {
            var counter = results.length;
            results.forEach(function (e) {
                relevantAggregateRoot.applyEvent(e, function () {
                    counter--;
                    if (counter === 0) {
                        callback(relevantAggregateRoot);
                    }
                });
            });
        });
    };
    return AggregateRootService;
}());
exports.AggregateRootService = AggregateRootService;
