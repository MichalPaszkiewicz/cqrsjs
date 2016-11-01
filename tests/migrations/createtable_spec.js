"use strict";
var Framework = require('../../scripts/framework');
var Projections = require('../../scripts/projections');
var ApplicationServices = require('../../scripts/applicationservices');
var Migrations = require('../../scripts/migrations');
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var _userName = "testing migrations";
        var _tableName = "testTable";
        describe("a migration", function () {
            it("should have created a table with the correct name", function () {
                ApplicationServices.CommandHandlerService.Instance.handle(new Migrations.CreateTableCommand(_userName, _tableName));
                expect(Projections.ProjectionStore.Instance.Tables.length).toBe(1);
                expect(Projections.ProjectionStore.Instance.getTable(_tableName).Name).toBe(_tableName);
            });
        });
        describe("a migration", function () {
            it("should throw an error if the table name already exists", function () {
                Framework.ErrorService.Instance.clearOnThrowEvents();
                Framework.ErrorService.Instance.onThrow(function (message) {
                    throw message;
                });
                ApplicationServices.CommandHandlerService.Instance.handle(new Migrations.CreateTableCommand(_userName, _tableName));
                expect(function () { return ApplicationServices.CommandHandlerService.Instance.handle(new Migrations.CreateTableCommand(_userName, _tableName)); }).toThrow();
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
