/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("projections"));

module CQRSjs.Test{

    describe("a default projection store", function(){

        var testProjectionStore = new Projections.ProjectionStore();

        it("should have no entries to start with", function(){
            expect(testProjectionStore.Tables.length).toBe(0);
        });

    });

    describe("a projection store", function(){

        var testProjectionStore = new Projections.ProjectionStore();
        testProjectionStore.addTable("testTable");

        it("should allow addition of tables", function(){
            expect(testProjectionStore.Tables.length).toBe(1);
            expect(testProjectionStore.Tables[0].Name).toBe("testTable");
            expect(testProjectionStore.Tables[0].Rows.length).toBe(0);
        });
    });

    describe("a projection store", function(){

        var testProjectionStore = new Projections.ProjectionStore();
        testProjectionStore.addTable("testTable");
        var testRow = new Projections.Row({"one":1,"two":2});
        testProjectionStore.addRowToTable("testTable", testRow);

        it("should allow addition of rows to a table", function(){
            expect(testProjectionStore.Tables.length).toBe(1);
            expect(testProjectionStore.Tables[0].Name).toBe("testTable");
            expect(testProjectionStore.Tables[0].Rows.length).toBe(1);
            expect(testProjectionStore.Tables[0].Rows[0]).toBe(testRow);
        });
    });

    describe("a projection store", function(){

        var testProjectionStore = new Projections.ProjectionStore();
        testProjectionStore.addTable("testTable");
        var testRow = new Projections.Row({"one":1,"two":2});
        testProjectionStore.addRowsToTable("testTable", [testRow, testRow, testRow]);

        it("should allow addition of multiple rows to a table", function(){
            expect(testProjectionStore.Tables.length).toBe(1);
            expect(testProjectionStore.Tables[0].Name).toBe("testTable");
            expect(testProjectionStore.Tables[0].Rows.length).toBe(3);
            expect(testProjectionStore.Tables[0].Rows[0]).toBe(testRow);
        });
    });

    describe("a projection store", function(){

        var testProjectionStore = new Projections.ProjectionStore();
        testProjectionStore.addTable("badTable1");
        testProjectionStore.addTable("testTable");
        testProjectionStore.addTable("badTable2");
        var testRow = new Projections.Row({"one":1,"two":2});
        testProjectionStore.addRowsToTable("testTable", [testRow, testRow, testRow]);

        it("should get the correct table", function(){
            expect(testProjectionStore.Tables.length).toBe(3);
            expect(testProjectionStore.getTable("testTable").Name).toBe("testTable");
            expect(testProjectionStore.getTable("testTable").Rows.length).toBe(3);
            expect(testProjectionStore.getTable("testTable").Rows[0]).toBe(testRow);
        });
    });

    describe("a projection store", function(){

        var testProjectionStore = new Projections.ProjectionStore();
        testProjectionStore.addTable("testTable");
        var testRow = new Projections.Row({"one":1,"two":2});
        testProjectionStore.addRowsToTable("testTable", [testRow, testRow, testRow]);
        testProjectionStore.clear();

        it("should allow clearing of the tables", function(){
            expect(testProjectionStore.Tables.length).toBe(0);
        });
    });

}