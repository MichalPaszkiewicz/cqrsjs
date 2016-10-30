"use strict";
var Projections = require('../../scripts/projections');
var ApplicationServices = require('../../scripts/applicationservices');
var createtablecommand_1 = require('../../scripts/migrations/commands/createtablecommand');
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var _userName = "testing migrations";
        var _tableName = "testTable";
        describe("a migration", function () {
            it("should have created a table with the correct name", function () {
                ApplicationServices.CommandHandlerService.Instance.handle(new createtablecommand_1.CreateTableCommand(_userName, _tableName));
                expect(Projections.ProjectionStore.Instance.Tables.length).toBe(1);
                expect(Projections.ProjectionStore.Instance.getTable(_tableName).Name).toBe(_tableName);
            });
        });
        describe("a migration", function () {
            it("should throw an error if the table name already exists", function () {
                expect(function () { return ApplicationServices.CommandHandlerService.Instance.handle(new createtablecommand_1.CreateTableCommand(_userName, _tableName)); }).toThrowError();
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
