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

    describe("a new aggregate root", function(){
    
        var testAggregateRoot = new TestAggregateRoot(_aggregateRootID);

        it("has the correct ID", function(){
            expect(testAggregateRoot.ID).toBe(_aggregateRootID);
        });
        
    });

    describe("a new aggregate root", function(){
    
        var testEvent = new Framework.Deed(_aggregateRootID, _eventName, _userName);
        var testAggregateRoot = new TestAggregateRoot(_aggregateRootID);

        

        it("performs desired event actions", function(){
            testAggregateRoot.applyEvent(testEvent,() => {
                expect(testAggregateRoot.TestProperty).toBe(_eventName);
            });
        });
        
    });

    describe("a new aggregate root", function(){
        var testCommand = new Framework.Command(_aggregateRootID, _userName, "test command");
        var testAggregateRoot = new TestAggregateRoot(_aggregateRootID);

        it("sets an event off correctly after a command is applied to it", function(){
            testAggregateRoot.testMethod(testCommand,() => {
                expect(testAggregateRoot.TestProperty).toBe(_eventName);
            });
            
        })
    });

}