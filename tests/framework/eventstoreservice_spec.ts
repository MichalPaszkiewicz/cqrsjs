import * as Framework from '../../scripts/framework';


module CQRSjs.Test{

    var _eventName = "test event";
    var _aggregateRootID = "123";
    var _userName = "eventstoreservice test";

    describe("the event store service", function(){
        var event = new Framework.Deed(_aggregateRootID, _eventName, _userName);
        var lastLog = "no message";

        Framework.EventStoreService.Instance.clearOnAdded();
        Framework.EventStoreService.Instance.onAdded((event)=>{ lastLog = event.EventName });
        var promise = Framework.EventStoreService.Instance.store(event, ()=>{});

        it("should perform onAdded events correctly", function(){
            promise.then(() => expect(lastLog).toBe(_eventName));
        });
    });

    describe("the event store service", function(){
        var event = new Framework.Deed(_aggregateRootID, _eventName, _userName);
        var lastLog = "no message";

        Framework.EventStoreService.Instance.onAdded((event)=>{ lastLog = event.EventName });
        Framework.EventStoreService.Instance.clearOnAdded();
        var promise = Framework.EventStoreService.Instance.store(event, ()=>{});

        it("should clear onAdded events correctly", function(){
            promise.then(() => { expect(lastLog).toBe("no message") });
        });
    });

    describe("the event store service", function(){
        var event = new Framework.Deed(_aggregateRootID, _eventName, _userName);
        var lastLog = "no message";

        var testEventStore = new Framework.EventStoreService();
        var promise = testEventStore.store(event, ()=>{});

        it("should as default add items to the event store correctly", function(){
            promise.then(() => {
                testEventStore.getEvents((storedEvents)=>{
                    expect(storedEvents[0].EventName).toBe(_eventName);
                });
            });
        });
    });

    describe("the event store service", function(){
        var testEventStore = new Framework.EventStoreService();
        var event1 = new Framework.Deed(Framework.IDGenerator.generate(), "event 1", _userName);
        var event2 = new Framework.Deed(Framework.IDGenerator.generate(), "event 2", _userName);
        testEventStore.overrideGetEvents(() => {return [event1, event2]});

        it("allows overriding of getEvents", function(){
            testEventStore.getEvents((storedEvents)=>{
                expect(storedEvents.length).toBe(2);
                expect(storedEvents[0]).toBe(event1);
                expect(storedEvents[1]).toBe(event2);
            });            
        });
    });

    describe("the event store service", function(){
        var testEventStore = new Framework.EventStoreService();
        var event1 = new Framework.Deed(Framework.IDGenerator.generate(), "event 1", _userName);
        var event2 = new Framework.Deed(Framework.IDGenerator.generate(), "event 2", _userName);
        testEventStore.overrideGetEventsWithID((id: string) => {return [event2]});

        it("allows overriding of getEventsWithID", function(){
            testEventStore.getEventsWithID("asdfasdfasdf", (storedEvents)=>{
                expect(storedEvents.length).toBe(1);
                expect(storedEvents[0]).toBe(event2);
            });            
        });
    });

}