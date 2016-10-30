"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Framework = require('../../framework');
var TableCreatedEvent = (function (_super) {
    __extends(TableCreatedEvent, _super);
    function TableCreatedEvent(aggregateRootID, userName, tableName) {
        _super.call(this, aggregateRootID, "TableCreated", userName);
        this.TableName = tableName;
    }
    return TableCreatedEvent;
}(Framework.Deed));
exports.TableCreatedEvent = TableCreatedEvent;
