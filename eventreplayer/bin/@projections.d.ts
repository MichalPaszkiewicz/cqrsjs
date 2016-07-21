declare namespace CQRSjs.Projections {
    interface IAmAnEventHandler {
        HandlesEvent: string;
        handle(event: Framework.Event): any;
    }
}
declare namespace CQRSjs.Projections {
    class EventHandlerService {
        private static _instance;
        static Instance: EventHandlerService;
        EventHandlers: IAmAnEventHandler[];
        register(eventHandler: IAmAnEventHandler): void;
        handle(event: Framework.Event): void;
    }
}
declare namespace CQRSjs.Projections {
    class ProjectionStore {
        private static _instance;
        static Instance: ProjectionStore;
        Tables: Table[];
        clear(): void;
        addTable(name: string): void;
        addRowToTable(tableName: string, row: Row): void;
        addRowsToTable(tableName: string, rows: Row[]): void;
        getTable(name: string): Table;
    }
}
declare namespace CQRSjs.Projections {
    class Row {
        Data: string;
        constructor(data: Object);
    }
}
declare namespace CQRSjs.Projections {
    class Table {
        Name: string;
        Rows: Row[];
        getData(): any[];
        clear(): void;
        constructor(tableName: string);
    }
}
