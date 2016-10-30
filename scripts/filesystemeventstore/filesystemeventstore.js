"use strict";
var fs = require('fs');
var Framework = require('../framework');
var FileSystemEventStore;
(function (FileSystemEventStore) {
    var eventStore = Framework.EventStoreService.Instance;
    function setupFileSystemEventStore(filePath) {
        eventStore.overrideGetEvents(function (callback) {
            var storedEvents = [];
            var text = fs.readFileSync(filePath, "utf-8");
            var rows = text.replace(/\r/g, "").split("\n");
            rows.forEach(function (row) {
                var json = JSON.parse(row);
                storedEvents.push(new Framework.Deed(json.aggregateRootID, json.eventName, json.userName));
            });
            callback(storedEvents);
        });
        eventStore.overrideGetEventsWithID(function (id, callback) {
            var storedEvents = [];
            var text = fs.readFileSync(filePath, "utf-8");
            var rows = text.replace(/\r/g, "").split("\n");
            rows.forEach(function (row) {
                if (row.indexOf(id) != -1) {
                    var json = JSON.parse(row);
                    storedEvents.push(new Framework.Deed(json.aggregateRootID, json.eventName, json.userName));
                }
            });
            callback(storedEvents);
        });
        eventStore.overrideStore(function (theEvent) {
            fs.appendFileSync(filePath, JSON.stringify(theEvent));
        });
        eventStore.clearOnAdded();
    }
    FileSystemEventStore.setupFileSystemEventStore = setupFileSystemEventStore;
})(FileSystemEventStore = exports.FileSystemEventStore || (exports.FileSystemEventStore = {}));
