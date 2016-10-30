import * as Framework from '../../scripts/framework';
import * as Domain from '../../scripts/domain';

module CQRSjs.Test{

    var _aggregateRootID = "123";
    var _userName = "testing aggregate root";
    var _eventName = "test event";

    class TestAggregateRoot extends Domain.AggregateRoot{
        TestProperty: string;

        testMethod(command: Framework.Command, callback: () => void){
            this.applyEvent(new Framework.Deed(_aggregateRootID, _eventName, _userName), callback);
        }

        constructor(id: string){
            super(id);
            var self = this;
            self.registerEventAction(new Domain.EventAction(_eventName, (e) => { self.TestProperty = e.EventName }));
        }
    }

    describe("aggregate root service", function(){
        var testAggregateRootService = new Domain.AggregateRootService();
        it("should add an aggregate root correctly", function(){
            testAggregateRootService.getByID(TestAggregateRoot, _aggregateRootID, function(aggregateRoot){
                expect(aggregateRoot.ID).toBe(_aggregateRootID);
            });
        })
    });
}