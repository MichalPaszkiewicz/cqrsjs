"use strict";
var Projections = require('../../projections');
var TableCreatedEventHandler = (function () {
    function TableCreatedEventHandler() {
        this.HandlesEvent = "TableCreated";
    }
    TableCreatedEventHandler.prototype.handle = function (event) {
        Projections.ProjectionStore.Instance.addTable(event.TableName);
    };
    return TableCreatedEventHandler;
}());
exports.TableCreatedEventHandler = TableCreatedEventHandler;
Projections.EventHandlerService.Instance.register(new TableCreatedEventHandler());
