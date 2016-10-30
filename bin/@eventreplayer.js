var EventReplayer;
(function (EventReplayer) {
    var EventReplayerService = (function () {
        function EventReplayerService() {
        }
        Object.defineProperty(EventReplayerService, "Instance", {
            get: function () {
                if (EventReplayerService._instance == null) {
                    EventReplayerService._instance = new EventReplayerService();
                }
                return EventReplayerService._instance;
            },
            enumerable: true,
            configurable: true
        });
        EventReplayerService.prototype.clearCurrentState = function () {
            Projections.ProjectionStore.Instance.clear();
        };
        EventReplayerService.prototype.replayAll = function (callback) {
            this.clearCurrentState();
            Framework.EventStoreService.Instance.getEvents(function (eventsStored) {
                eventsStored.forEach(function (c) {
                    Projections.EventHandlerService.Instance.handle(c);
                });
                callback();
            });
        };
        EventReplayerService.prototype.replayTo = function (time, callback) {
            this.clearCurrentState();
            Framework.EventStoreService.Instance.getEvents(function (eventsBeforeTime) {
                eventsBeforeTime
                    .filter(function (c) { return c.Time < time.getTime(); })
                    .forEach(function (c) {
                    Projections.EventHandlerService.Instance.handle(c);
                });
                callback();
            });
        };
        return EventReplayerService;
    }());
    EventReplayer.EventReplayerService = EventReplayerService;
})(EventReplayer || (EventReplayer = {}));
