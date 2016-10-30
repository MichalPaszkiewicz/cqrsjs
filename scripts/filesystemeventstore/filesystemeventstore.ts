import * as fs from 'fs';
import * as Framework from '../framework';

export module FileSystemEventStore{
    var eventStore = Framework.EventStoreService.Instance;

    export function setupFileSystemEventStore(filePath){

        eventStore.overrideGetEvents((callback) => {
            var storedEvents: Framework.Deed[] = [];
            var text = fs.readFileSync(filePath, "utf-8");
            var rows = text.replace(/\r/g,"").split("\n");
            rows.forEach(row => {
                let json = JSON.parse(row);
                storedEvents.push(new Framework.Deed(json.aggregateRootID, json.eventName, json.userName));
            });
            callback(storedEvents);
        });

        eventStore.overrideGetEventsWithID((id: string, callback) => {
            var storedEvents: Framework.Deed[] = [];
            var text = fs.readFileSync(filePath, "utf-8");
            var rows = text.replace(/\r/g,"").split("\n");
            rows.forEach(row => {
                if(row.indexOf(id) != -1){
                    let json = JSON.parse(row);
                    storedEvents.push(new Framework.Deed(json.aggregateRootID, json.eventName, json.userName));
                }
            });
            callback(storedEvents);
        });

        eventStore.overrideStore((theEvent: Framework.Deed) => {
            fs.appendFileSync(filePath, JSON.stringify(theEvent));
        });

        eventStore.clearOnAdded();

    }
}