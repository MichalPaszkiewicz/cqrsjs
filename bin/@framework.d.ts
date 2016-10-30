declare module Framework {
    class Command {
        AggregateRootID: string;
        UserName: string;
        Time: number;
        CommandName: string;
        constructor(aggregateRootID: string, userName: string, commandName: string);
    }
}
declare module Framework {
    class ErrorService {
        private static _instance;
        private _onThrowEvents;
        onThrow(onThrowEvent: (message: string) => void): void;
        clearOnThrowEvents(): void;
        static Instance: ErrorService;
        static throw(message: string): void;
        throw(message: string): void;
    }
}
declare module Framework {
    class Event {
        AggregateRootID: string;
        UserName: string;
        EventName: string;
        Time: number;
        constructor(aggregateRootID: string, eventName: string, userName: string);
    }
}
declare module Framework {
    class EventStoreService {
        private static _instance;
        static Instance: EventStoreService;
        constructor();
        private _eventsStored;
        private _funcsOnAdded;
        private _store;
        private _getEvents(callback);
        private _getEventsWithID(id, callback);
        getEvents(callback: (events: Event[]) => void): void;
        getEventsWithID(id: string, callback: (events: Event[]) => void): void;
        overrideGetEvents(func: (callback: (events: Event[]) => void) => void): void;
        overrideGetEventsWithID(func: (id: string, callback: (events: Event[]) => void) => void): void;
        store(event: Event, callback: () => void): Then;
        overrideStore(func: (event: Event, callback: () => void) => void): void;
        onAdded(func: (event: Event) => void): void;
        clearOnAdded(): void;
    }
}
declare module IDGenerator {
    function generate(): string;
}
declare module Framework {
    class LogService {
        private static _instance;
        onLog(onLogEvent: (message: string) => void): void;
        static Instance: LogService;
        private _onLogEvents;
        log(message: string): void;
        clearLogEvents(): void;
    }
}
declare module Framework {
    class Then {
        private _func;
        private _childProcess;
        run(): void;
        then(func: () => void): Then;
    }
}
declare module Framework {
    class TimeService {
        private static _instance;
        static Instance: TimeService;
        private _yearsAdded;
        private _monthsAdded;
        private _daysAdded;
        private _hoursAdded;
        private _minutesAdded;
        private _secondsAdded;
        private _millisecondsAdded;
        private getTime();
        reset(): void;
        addYears(years: number): void;
        addMonths(months: number): void;
        addDays(days: number): void;
        addHours(hours: number): void;
        addMinutes(minutes: number): void;
        addSeconds(seconds: number): void;
        addMilliseconds(milliseconds: number): void;
        now(): Date;
        nowTicks(): number;
        today(): Date;
    }
}
