"use strict";
var Framework = require('../../scripts/framework');
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        describe("framework id generator", function () {
            it("always generates a unique ID", function () {
                var testDictionary = {};
                for (var i = 0; i < 100; i++) {
                    var generatedID = Framework.IDGenerator.generate();
                    expect(testDictionary[generatedID]).toBeUndefined();
                    testDictionary[generatedID] = true;
                }
            });
            it("provides a sufficiently complex ID", function () {
                var generatedID = Framework.IDGenerator.generate();
                expect(generatedID.length).toBeGreaterThan(35);
            });
            it("does not provide a ridiculously complex ID", function () {
                var generatedID = Framework.IDGenerator.generate();
                expect(generatedID.length).toBeLessThan(37);
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
