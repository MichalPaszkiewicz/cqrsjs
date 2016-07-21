/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));
eval(loadModule("projections"));
eval(loadModule("applicationservices"));
eval(loadModule("migrations"));

module CQRSjs.Test{

    var _userName = "testing migrations";
    var _tableName = "testTable";

    describe("a migration", function(){
        it("should have created a table with the correct name", function(){
            ApplicationServices.CommandHandlerService.Instance.handle(new Migrations.CreateTableCommand(_userName, _tableName));            
            expect(Projections.ProjectionStore.Instance.Tables.length).toBe(1);
            expect(Projections.ProjectionStore.Instance.getTable(_tableName).Name).toBe(_tableName);
        });
    });

    describe("a migration", function(){
        it("should throw an error if the table name already exists", function(){
            expect(() => ApplicationServices.CommandHandlerService.Instance.handle(new Migrations.CreateTableCommand(_userName, _tableName))).toThrowError();
        });
    });
}