declare module Migrations {
    class CreateTableCommand extends Framework.Command {
        TableName: string;
        constructor(userName: string, tableName: string);
    }
}
declare module Migrations {
    class CreateTableCommandHandler implements ApplicationServices.IAmACommandHandler {
        HandlesCommand: string;
        handle(createTableCommand: CreateTableCommand): void;
    }
}
declare module Migrations {
    class CreateTableCommandValidator extends ApplicationServices.CommandValidator {
        constructor();
        validate(command: CreateTableCommand): void;
    }
}
declare module Migrations {
    class MigrationAggregateRoot extends Domain.AggregateRoot {
        _tables: string[];
        addTable(command: CreateTableCommand): void;
        ensureTableCanBeAdded(tableName: string): void;
        constructor(id: string);
    }
}
declare module Migrations {
    class TableCreatedEvent extends Framework.Event {
        TableName: string;
        constructor(aggregateRootID: string, userName: string, tableName: string);
    }
}
declare module Migrations {
}
