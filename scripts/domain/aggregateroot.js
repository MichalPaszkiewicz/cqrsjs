"use strict";
var Framework = require('../framework');
var EventAction = (function () {
    function EventAction(eventName, action) {
        this.EventName = eventName;
        this.Action = action;
    }
    return EventAction;
}());
exports.EventAction = EventAction;
var AggregateRoot = (function () {
    function AggregateRoot(id) {
        this._eventActions = [];
        this.ID = id;
    }
    // event actions must be registered in constructor.
    AggregateRoot.prototype.registerEventAction = function (eventAction) {
        this._eventActions.push(eventAction);
    };
    AggregateRoot.prototype.applyEvent = function (event, callback) {
        this._eventActions
            .filter(function (ea) { return ea.EventName == event.EventName; })
            .forEach(function (ea) { ea.Action(event); });
        Framework.EventStoreService.Instance.store(event, callback);
    };
    return AggregateRoot;
}());
exports.AggregateRoot = AggregateRoot;
// class Bob extends AggregateRoot{
//     constructor(){
//         super();
//         // you must do this to ensure action performs on correct object
//         var self = this;
//         this.registerEventAction(new EventAction("lol", (e: Framework.Event) => {
//             self.ID = e.AggregateRootID;
//         }));
//     }
// }
