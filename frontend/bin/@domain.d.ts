declare namespace CQRSjs.Domain {
    class EventAction {
        EventName: string;
        Action: (e: Framework.Event) => void;
        constructor(eventName: string, action: (e: Framework.Event) => void);
    }
    abstract class AggregateRoot {
        ID: string;
        protected _eventActions: EventAction[];
        protected registerEventAction(eventAction: EventAction): void;
        applyEvent(event: Framework.Event): void;
        constructor(id: string);
    }
}
declare namespace CQRSjs.Domain {
    class AggregateRootService {
        private static _instance;
        static Instance: AggregateRootService;
        getByID<T extends AggregateRoot>(a: {
            new (id: string): T;
        }, aggregateRootID: string): T;
    }
}
declare namespace CQRSjs.Domain {
    class ValueObject {
        private objectsAreEqual(object1, object2, stackLevel);
        equals(other: ValueObject): any;
    }
}
