import * as Framework from '../../scripts/framework';
import * as Domain from '../../scripts/domain';
import * as Projections from '../../scripts/projections';
import * as ApplicationServices from '../../scripts/applicationservices';
import * as Migrations from '../../scripts/migrations';

module CQRSjs.Test{

    var _userName = "testing migrations";
    var _tableName = "testTable";

    describe("a migration", () => {
        it("should have created a table with the correct name", () => {
            ApplicationServices.CommandHandlerService.Instance.handle(new Migrations.CreateTableCommand(_userName, _tableName));            
            expect(Projections.ProjectionStore.Instance.Tables.length).toBe(1);
            expect(Projections.ProjectionStore.Instance.getTable(_tableName).Name).toBe(_tableName);
        });
    });

    describe("a migration aggregate root", () => {
        it("should add tables correctly", () => {
            var migrationAggregateRoot = new Migrations.MigrationAggregateRoot("test123");
            migrationAggregateRoot.addTable(new Migrations.CreateTableCommand("test runner", "table1"), () => {});
            migrationAggregateRoot.addTable(new Migrations.CreateTableCommand("test runner", "table2"), () => {});

            expect(migrationAggregateRoot._tables.length).toBe(2);
            expect(migrationAggregateRoot.ID).toBe("test123");
        });
    });

    describe("a migration aggregate root", () => {
        it("should add tables to projection store", () => {
            var migrationAggregateRoot = new Migrations.MigrationAggregateRoot("test456");
            migrationAggregateRoot.addTable(new Migrations.CreateTableCommand("test runner", "table1"), () => {});

            expect(Projections.ProjectionStore.Instance.Tables.length).toBe(1);
            console.log(Projections.ProjectionStore.Instance.Tables);
            expect(Projections.ProjectionStore.Instance.getTable("table1")).toBeTruthy();
        });
    });

    // describe("an aggregate root service with a migration aggregate root", () => {
    //     it("should store the tables correctly in the aggregate root", () => {
    //         var migrationAggregateRoot = new Migrations.MigrationAggregateRoot("test789");
    //         var aggregateRootService = new Domain.AggregateRootService();
            
    //     });
    // });

    describe("a migration", () => {
        it("should throw an error if the table name already exists", () => {
            Framework.ErrorService.Instance.clearOnThrowEvents();
            Framework.ErrorService.Instance.onThrow((message) => {
                throw message;
            });
            ApplicationServices.CommandHandlerService.Instance.handle(new Migrations.CreateTableCommand(_userName, _tableName));   
            expect(() => ApplicationServices.CommandHandlerService.Instance.handle(new Migrations.CreateTableCommand(_userName, _tableName))).toThrow();
        });
    });
}