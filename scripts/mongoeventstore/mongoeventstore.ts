import * as mongoose from 'mongoose';
import * as Framework from '../framework';

var eventStore = Framework.EventStoreService.Instance;
export function setupMongooseEventStore(connectionString: string){

    mongoose.connect(connectionString);

    var cqrsEvent = mongoose.model("Deed");

    eventStore.overrideGetEvents((callback) => {

        var storedEvents: Framework.Deed[] = [];
        var events = cqrsEvent.find({}, (dbEvents) => {
            dbEvents.array.forEach(element => {
                storedEvents.push(new Framework.Deed(element.aggregateRootID, element.eventName, element.userName));
            });
            callback(storedEvents);
        });
        return storedEvents;

    });

    eventStore.overrideGetEventsWithID((id: string, callback) => {

        var storedEvents: Framework.Deed[] = [];
        var events = cqrsEvent.find({aggregateRootID: id}, (dbEvents) => {
            dbEvents.array.forEach(element => {
                storedEvents.push(new Framework.Deed(element.aggregateRootID, element.eventName, element.userName));
            });
            callback(storedEvents);
        });
        return storedEvents;

    });

    eventStore.overrideStore((theEvent: Framework.Deed) => {
        new cqrsEvent(theEvent);
    });
    
    eventStore.clearOnAdded();
}
