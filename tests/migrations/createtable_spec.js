/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));
eval(loadModule("projections"));
eval(loadModule("applicationservices"));
eval(loadModule("migrations"));
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var _userName = "testing migrations";
        var _tableName = "testTable";
        describe("a migration", function () {
            it("should have created a table with the correct name", function () {
                CQRSjs.ApplicationServices.CommandHandlerService.Instance.handle(new CQRSjs.Migrations.CreateTableCommand(_userName, _tableName));
                expect(CQRSjs.Projections.ProjectionStore.Instance.Tables.length).toBe(1);
                expect(CQRSjs.Projections.ProjectionStore.Instance.getTable(_tableName).Name).toBe(_tableName);
            });
        });
        describe("a migration", function () {
            it("should throw an error if the table name already exists", function () {
                expect(function () { return CQRSjs.ApplicationServices.CommandHandlerService.Instance.handle(new CQRSjs.Migrations.CreateTableCommand(_userName, _tableName)); }).toThrowError();
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
