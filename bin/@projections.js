var CQRSjs;
(function (CQRSjs) {
    var Projections;
    (function (Projections) {
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
        Projections.EventHandlerService = EventHandlerService;
        CQRSjs.Framework.EventStoreService.Instance.onAdded(function (e) { EventHandlerService.Instance.handle(e); });
    })(Projections = CQRSjs.Projections || (CQRSjs.Projections = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Projections;
    (function (Projections) {
        var ProjectionStore = (function () {
            function ProjectionStore() {
                this.Tables = [];
            }
            Object.defineProperty(ProjectionStore, "Instance", {
                get: function () {
                    if (ProjectionStore._instance == null) {
                        ProjectionStore._instance = new ProjectionStore();
                    }
                    return ProjectionStore._instance;
                },
                enumerable: true,
                configurable: true
            });
            ProjectionStore.prototype.clear = function () {
                this.Tables.forEach(function (t) {
                    t.clear();
                });
                this.Tables = [];
            };
            ProjectionStore.prototype.addTable = function (name) {
                this.Tables.push(new Projections.Table(name));
            };
            ProjectionStore.prototype.addRowToTable = function (tableName, row) {
                var table = this.getTable(tableName);
                table.Rows.push(row);
            };
            ProjectionStore.prototype.addRowsToTable = function (tableName, rows) {
                var table = this.getTable(tableName);
                table.Rows = table.Rows.concat(rows);
            };
            ProjectionStore.prototype.getTable = function (name) {
                for (var i = 0; i < this.Tables.length; i++) {
                    if (this.Tables[i].Name == name) {
                        return this.Tables[i];
                    }
                }
                CQRSjs.Framework.ErrorService.throw("Table {name} not found");
            };
            return ProjectionStore;
        }());
        Projections.ProjectionStore = ProjectionStore;
    })(Projections = CQRSjs.Projections || (CQRSjs.Projections = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Projections;
    (function (Projections) {
        var Row = (function () {
            function Row(data) {
                this.Data = JSON.stringify(data);
            }
            return Row;
        }());
        Projections.Row = Row;
    })(Projections = CQRSjs.Projections || (CQRSjs.Projections = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Projections;
    (function (Projections) {
        var Table = (function () {
            function Table(tableName) {
                this.Rows = [];
                this.Name = tableName;
            }
            Table.prototype.getData = function () {
                return this.Rows.map(function (row) {
                    return JSON.parse(row.Data);
                });
            };
            Table.prototype.clear = function () {
                this.Rows = [];
            };
            return Table;
        }());
        Projections.Table = Table;
    })(Projections = CQRSjs.Projections || (CQRSjs.Projections = {}));
})(CQRSjs || (CQRSjs = {}));
