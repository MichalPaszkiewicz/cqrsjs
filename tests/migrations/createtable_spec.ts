import * as Framework from '../../scripts/framework';
import * as Domain from '../../scripts/domain';
import * as Projections from '../../scripts/projections';
import * as ApplicationServices from '../../scripts/applicationservices';
import * as Migrations from '../../scripts/migrations';

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
            Framework.ErrorService.Instance.clearOnThrowEvents();
            Framework.ErrorService.Instance.onThrow((message) => {
                throw message;
            });
            ApplicationServices.CommandHandlerService.Instance.handle(new Migrations.CreateTableCommand(_userName, _tableName));   
            expect(() => ApplicationServices.CommandHandlerService.Instance.handle(new Migrations.CreateTableCommand(_userName, _tableName))).toThrow();
        });
    });
}