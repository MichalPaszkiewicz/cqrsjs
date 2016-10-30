"use strict";
var Framework = require('../framework');
var EventHandlerService = (function () {
    function EventHandlerService() {
        this.EventHandlers = [];
    }
    Object.defineProperty(EventHandlerService, "Instance", {
        get: function () {
            if (EventHandlerService._instance == null) {
                EventHandlerService._instance = new EventHandlerService();
            }
            return EventHandlerService._instance;
        },
        enumerable: true,
        configurable: true
    });
    EventHandlerService.prototype.register = function (eventHandler) {
        this.EventHandlers.push(eventHandler);
    };
    EventHandlerService.prototype.handle = function (event) {
        this.EventHandlers.filter(function (eh) { return eh.HandlesEvent == event.EventName; })
            .forEach(function (eh) { eh.handle(event); });
    };
    return EventHandlerService;
}());
exports.EventHandlerService = EventHandlerService;
Framework.EventStoreService.Instance.onAdded(function (e) { EventHandlerService.Instance.handle(e); });
