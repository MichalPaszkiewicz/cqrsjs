import * as Framework from '../../scripts/framework';
import * as Domain from '../../scripts/domain';
import * as Projections from '../../scripts/projections';
import * as EventReplayer from '../../scripts/eventreplayer/eventreplayerservice';

module CQRSjs.Test{

    var testEventReplayerService = new EventReplayer.EventReplayerService();
    var _aggregateRootID = Framework.IDGenerator.generate();
    var _userName = "testing eventreplayer";
    var num = 0;

    class CreateTableEvent extends Framework.Deed{
        constructor(){
            super(_aggregateRootID, "CreateTableEvent", _userName);
        }
    }

    class CreateTableEventHandler implements Projections.IAmAnEventHandler{
        HandlesEvent = "CreateTableEvent";
        
        handle(event: CreateTableEvent){
            num = 0;
            Projections.ProjectionStore.Instance.addTable("testTable");
        }
    }
    Projections.EventHandlerService.Instance.register(new CreateTableEventHandler());

    class TestEvent extends Framework.Deed{
        constructor(){
            super(_aggregateRootID, "testEvent", _userName);
        }
    }

    class TestEventHandler implements Projections.IAmAnEventHandler{
        HandlesEvent = "testEvent";

        handle(event: TestEvent){
            var row = new Projections.Row({"num":num});
            num++;
            Projections.ProjectionStore.Instance.addRowToTable("testTable", row);
        }
    }
    Projections.EventHandlerService.Instance.register(new TestEventHandler());

    describe("an event replayer service", function(){
        
        var promise = Framework.EventStoreService.Instance.store(new CreateTableEvent(), ()=>{});
        for(var i = 0; i < 10; i++){
            promise = promise.then(() => { Framework.EventStoreService.Instance.store(new TestEvent(),() => {}) });
        }

        Framework.TimeService.Instance.addMinutes(1);
        var intermediateTime = Framework.TimeService.Instance.now();

        promise = promise.then(() => {
            intermediateTime = Framework.TimeService.Instance.now();
            Framework.TimeService.Instance.addMinutes(1);        
        });

        for(var i = 0; i < 10; i++){
            promise = promise.then(() => { Framework.EventStoreService.Instance.store(new TestEvent(), ()=>{}) });
        }
    
        it("should not have replayed the last 10 events if replaying to intermediateTime", function(){
            promise = promise.then(()=> { testEventReplayerService.replayTo(intermediateTime, () => {
                expect(Projections.ProjectionStore.Instance.getTable("testTable").Rows.length).toBe(10);
                expect(num).toBe(10);
            }) });           
        });

        it("should have all the events if replaying to future", function(){
            promise.then(() => {
                testEventReplayerService.replayAll(()=> {
                    expect(Projections.ProjectionStore.Instance.getTable("testTable").Rows.length).toBe(20);
                    expect(num).toBe(20);
                });   
            });
        });

    });

}
