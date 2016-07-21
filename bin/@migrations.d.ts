declare namespace CQRSjs.Migrations {
    class CreateTableCommand extends Framework.Command {
        TableName: string;
        constructor(userName: string, tableName: string);
    }
}
declare namespace CQRSjs.Migrations {
    class CreateTableCommandHandler implements ApplicationServices.IAmACommandHandler {
        HandlesCommand: string;
        handle(createTableCommand: CreateTableCommand): void;
    }
}
declare namespace CQRSjs.Migrations {
    class CreateTableCommandValidator extends ApplicationServices.CommandValidator {
        constructor();
        validate(command: CreateTableCommand): void;
    }
}
declare namespace CQRSjs.Migrations {
    class MigrationAggregateRoot extends Domain.AggregateRoot {
        _tables: string[];
        addTable(command: CreateTableCommand): void;
        ensureTableCanBeAdded(tableName: string): void;
        constructor(id: string);
    }
}
declare namespace CQRSjs.Migrations {
    class TableCreatedEvent extends Framework.Event {
        TableName: string;
        constructor(aggregateRootID: string, userName: string, tableName: string);
    }
}
declare namespace CQRSjs.Migrations {
}
