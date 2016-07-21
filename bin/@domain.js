var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var EventAction = (function () {
            function EventAction(eventName, action) {
                this.EventName = eventName;
                this.Action = action;
            }
            return EventAction;
        }());
        Domain.EventAction = EventAction;
        var AggregateRoot = (function () {
            function AggregateRoot(id) {
                this._eventActions = [];
                this.ID = id;
            }
            // event actions must be registered in constructor.
            AggregateRoot.prototype.registerEventAction = function (eventAction) {
                this._eventActions.push(eventAction);
            };
            AggregateRoot.prototype.applyEvent = function (event) {
                this._eventActions
                    .filter(function (ea) { return ea.EventName == event.EventName; })
                    .forEach(function (ea) { ea.Action(event); });
                CQRSjs.Framework.EventStoreService.Instance.store(event);
            };
            return AggregateRoot;
        }());
        Domain.AggregateRoot = AggregateRoot;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
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
            AggregateRootService.prototype.getByID = function (a, aggregateRootID) {
                var relevantAggregateRoot = new a(aggregateRootID);
                CQRSjs.Framework.EventStoreService.Instance.getEventsWithID(aggregateRootID).forEach(function (e) {
                    relevantAggregateRoot.applyEvent(e);
                });
                return relevantAggregateRoot;
            };
            return AggregateRootService;
        }());
        Domain.AggregateRootService = AggregateRootService;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var ValueObject = (function () {
            function ValueObject() {
            }
            ValueObject.prototype.objectsAreEqual = function (object1, object2, stackLevel) {
                if (stackLevel > 3) {
                    CQRSjs.Framework.ErrorService.throw("stack overflow in value object comparison. avoid circular references in value objects");
                    return false;
                }
                var self = this;
                for (var prop in object1) {
                    if (object1.hasOwnProperty(prop)) {
                        if (object1[prop] == null && object2[prop] != null) {
                            return false;
                        }
                        else if (object1[prop].length && object1[prop].length != 0) {
                            if (object1[prop].length != object2[prop].length) {
                                return false;
                            }
                            for (var i = 0; i < object1[prop].length; i++) {
                                if (object1[prop][i] != object2[prop][i]) {
                                    return false;
                                }
                            }
                        }
                        else if (typeof (object1[prop].equals) === "function") {
                            return object1[prop].equals(object2[prop]);
                        }
                        else if (typeof (object1[prop]) === "object") {
                            return self.objectsAreEqual(object1[prop], object2[prop], stackLevel + 1);
                        }
                        else if (object1[prop] != object2[prop]) {
                            return false;
                        }
                    }
                }
                return true;
            };
            ValueObject.prototype.equals = function (other) {
                var me = this;
                return me.objectsAreEqual(me, other, 0);
            };
            return ValueObject;
        }());
        Domain.ValueObject = ValueObject;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
