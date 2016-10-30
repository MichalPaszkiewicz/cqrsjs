"use strict";
var Framework = require('../framework');
var table_1 = require('./table');
var ProjectionStore = (function () {
    function ProjectionStore() {
        var _this = this;
        this._tables = [];
        this._getTables = function () {
            return _this._tables;
        };
        this._clear = function () {
            _this._tables.forEach(function (t) {
                t.clear();
            });
            _this._tables = [];
        };
        this._addTable = function (name) {
            _this._tables.push(new table_1.Table(name));
        };
        this._addRowToTable = function (tableName, row) {
            var table = _this.getTable(tableName);
            table.Rows.push(row);
        };
        this._addRowsToTable = function (tableName, rows) {
            var table = _this.getTable(tableName);
            table.Rows = table.Rows.concat(rows);
        };
        this._getTable = function (name) {
            var tables = _this.Tables;
            for (var i = 0; i < tables.length; i++) {
                if (tables[i].Name == name) {
                    return tables[i];
                }
            }
            Framework.ErrorService.throw("Table {name} not found");
        };
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
    Object.defineProperty(ProjectionStore.prototype, "Tables", {
        get: function () {
            return this._getTables();
        },
        enumerable: true,
        configurable: true
    });
    ProjectionStore.prototype.overrideGetTables = function (func) {
        this._getTables = func;
    };
    ProjectionStore.prototype.clear = function () {
        this._clear();
    };
    ProjectionStore.prototype.overrideClear = function (clearFunc) {
        this._clear = clearFunc;
    };
    ProjectionStore.prototype.addTable = function (name) {
        this._addTable(name);
    };
    ProjectionStore.prototype.overrideAddTable = function (func) {
        this._addTable = func;
    };
    ProjectionStore.prototype.addRowToTable = function (tableName, row) {
        this._addRowToTable(tableName, row);
    };
    ProjectionStore.prototype.overrideAddRowToTable = function (func) {
        this._addRowToTable = func;
    };
    ProjectionStore.prototype.addRowsToTable = function (tableName, rows) {
        this._addRowsToTable(tableName, rows);
    };
    ProjectionStore.prototype.overrideAddRowsToTable = function (func) {
        this._addRowsToTable = func;
    };
    ProjectionStore.prototype.getTable = function (name) {
        return this._getTable(name);
    };
    ProjectionStore.prototype.overrideGetTable = function (func) {
        this._getTable = func;
    };
    return ProjectionStore;
}());
exports.ProjectionStore = ProjectionStore;
