"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Framework = require('../../framework');
var CreateTableCommand = (function (_super) {
    __extends(CreateTableCommand, _super);
    function CreateTableCommand(userName, tableName) {
        _super.call(this, "migration", userName, "CreateTable");
        this.TableName = tableName;
    }
    return CreateTableCommand;
}(Framework.Command));
exports.CreateTableCommand = CreateTableCommand;
