"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Framework = require('../../framework');
var Domain = require('../../domain');
var tableCreatedEvent_1 = require('../events/tableCreatedEvent');
var MigrationAggregateRoot = (function (_super) {
    __extends(MigrationAggregateRoot, _super);
    function MigrationAggregateRoot(id) {
        _super.call(this, id);
        this._tables = [];
        var self = this;
        self.registerEventAction(new Domain.EventAction("TableCreated", function (e) {
            self._tables.push(e.TableName);
        }));
    }
    MigrationAggregateRoot.prototype.addTable = function (command, callback) {
        var self = this;
        self.ensureTableCanBeAdded(command.TableName);
        self.applyEvent(new tableCreatedEvent_1.TableCreatedEvent(self.ID, command.UserName, command.TableName), callback);
    };
    MigrationAggregateRoot.prototype.ensureTableCanBeAdded = function (tableName) {
        var self = this;
        if (self._tables.filter(function (t) { return t == tableName; }).length > 0) {
            Framework.ErrorService.throw("this table already exists");
        }
    };
    return MigrationAggregateRoot;
}(Domain.AggregateRoot));
exports.MigrationAggregateRoot = MigrationAggregateRoot;
