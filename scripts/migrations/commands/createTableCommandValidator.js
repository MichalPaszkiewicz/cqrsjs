"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Framework = require('../../framework');
var ApplicationServices = require('../../applicationservices');
var CreateTableCommandValidator = (function (_super) {
    __extends(CreateTableCommandValidator, _super);
    function CreateTableCommandValidator() {
        _super.call(this, "CreateTable");
    }
    CreateTableCommandValidator.prototype.validate = function (command) {
        if (!command.TableName) {
            Framework.ErrorService.throw("When creating a table, you must provide a TableName");
        }
    };
    return CreateTableCommandValidator;
}(ApplicationServices.CommandValidator));
exports.CreateTableCommandValidator = CreateTableCommandValidator;
ApplicationServices.CommandHandlerService.Instance.registerValidator(new CreateTableCommandValidator());
