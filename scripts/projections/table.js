"use strict";
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
exports.Table = Table;
