"use strict";
var then_1 = require('./then');
var EventStoreService = (function () {
    function EventStoreService() {
        this._eventsStored = [];
        this._funcsOnAdded = [];
        var self = this;
        self.onAdded(function (event) {
            self._eventsStored.push(event);
        });
    }
    Object.defineProperty(EventStoreService, "Instance", {
        get: function () {
            if (EventStoreService._instance == null) {
                EventStoreService._instance = new EventStoreService();
            }
            return EventStoreService._instance;
        },
        enumerable: true,
        configurable: true
    });
    EventStoreService.prototype._getEvents = function (callback) {
        callback(this._eventsStored);
    };
    EventStoreService.prototype._getEventsWithID = function (id, callback) {
        callback(this._eventsStored.filter(function (e) { return e.AggregateRootID == id; }));
    };
    EventStoreService.prototype.getEvents = function (callback) {
        this._getEvents(callback);
    };
    EventStoreService.prototype.getEventsWithID = function (id, callback) {
        this._getEventsWithID(id, callback);
    };
    EventStoreService.prototype.overrideGetEvents = function (func) {
        this._getEvents = func;
    };
    EventStoreService.prototype.overrideGetEventsWithID = function (func) {
        this.getEventsWithID = func;
    };
    EventStoreService.prototype.store = function (event, callback) {
        var then = new then_1.Then();
        this._funcsOnAdded.forEach(function (func) {
            func(event);
            then.run();
        });
        if (this._store != null) {
            this._store(event, callback);
        }
        return then;
    };
    EventStoreService.prototype.overrideStore = function (func) {
        this._store = func;
    };
    EventStoreService.prototype.onAdded = function (func) {
        this._funcsOnAdded.push(func);
    };
    EventStoreService.prototype.clearOnAdded = function () {
        this._funcsOnAdded = [];
    };
    return EventStoreService;
}());
exports.EventStoreService = EventStoreService;
