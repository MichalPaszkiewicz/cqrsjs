var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Migrations;
(function (Migrations) {
    var CreateTableCommand = (function (_super) {
        __extends(CreateTableCommand, _super);
        function CreateTableCommand(userName, tableName) {
            _super.call(this, "migration", userName, "CreateTable");
            this.TableName = tableName;
        }
        return CreateTableCommand;
    }(Framework.Command));
    Migrations.CreateTableCommand = CreateTableCommand;
})(Migrations || (Migrations = {}));
var Migrations;
(function (Migrations) {
    var CreateTableCommandHandler = (function () {
        function CreateTableCommandHandler() {
            this.HandlesCommand = "CreateTable";
        }
        CreateTableCommandHandler.prototype.handle = function (createTableCommand) {
            Domain.AggregateRootService.Instance.getByID(Migrations.MigrationAggregateRoot, createTableCommand.AggregateRootID, function (aggregateRoot) {
                aggregateRoot.addTable(createTableCommand);
            });
        };
        return CreateTableCommandHandler;
    }());
    Migrations.CreateTableCommandHandler = CreateTableCommandHandler;
    ApplicationServices.CommandHandlerService.Instance.register(new CreateTableCommandHandler());
})(Migrations || (Migrations = {}));
var Migrations;
(function (Migrations) {
    var CreateTableCommandValidator = (function (_super) {
        __extends(CreateTableCommandValidator, _super);
        function CreateTableCommandValidator() {
            _super.call(this, "CreateTable");
        }
        CreateTableCommandValidator.prototype.validate = function (command) {
            if (!command.TableName) {
                Framework.ErrorService.throw("When creating a table, you must provide a TableName");
            }
        };
        return CreateTableCommandValidator;
    }(ApplicationServices.CommandValidator));
    Migrations.CreateTableCommandValidator = CreateTableCommandValidator;
    ApplicationServices.CommandHandlerService.Instance.registerValidator(new CreateTableCommandValidator());
})(Migrations || (Migrations = {}));
var Migrations;
(function (Migrations) {
    var MigrationAggregateRoot = (function (_super) {
        __extends(MigrationAggregateRoot, _super);
        function MigrationAggregateRoot(id) {
            var _this = this;
            _super.call(this, id);
            this._tables = [];
            var self = this;
            self.registerEventAction(new Domain.EventAction("TableCreated", function (e) {
                _this._tables.push(e.TableName);
            }));
        }
        MigrationAggregateRoot.prototype.addTable = function (command) {
            var self = this;
            self.ensureTableCanBeAdded(command.TableName);
            self.applyEvent(new Migrations.TableCreatedEvent(self.ID, command.UserName, command.TableName));
        };
        MigrationAggregateRoot.prototype.ensureTableCanBeAdded = function (tableName) {
            if (this._tables.filter(function (t) { return t == tableName; }).length > 0) {
                Framework.ErrorService.throw("this table already exists");
            }
        };
        return MigrationAggregateRoot;
    }(Domain.AggregateRoot));
    Migrations.MigrationAggregateRoot = MigrationAggregateRoot;
})(Migrations || (Migrations = {}));
var Migrations;
(function (Migrations) {
    var TableCreatedEvent = (function (_super) {
        __extends(TableCreatedEvent, _super);
        function TableCreatedEvent(aggregateRootID, userName, tableName) {
            _super.call(this, aggregateRootID, "TableCreated", userName);
            this.TableName = tableName;
        }
        return TableCreatedEvent;
    }(Framework.Event));
    Migrations.TableCreatedEvent = TableCreatedEvent;
})(Migrations || (Migrations = {}));
var Migrations;
(function (Migrations) {
    var TableCreatedEventHandler = (function () {
        function TableCreatedEventHandler() {
            this.HandlesEvent = "TableCreated";
        }
        TableCreatedEventHandler.prototype.handle = function (event) {
            Projections.ProjectionStore.Instance.addTable(event.TableName);
        };
        return TableCreatedEventHandler;
    }());
    Projections.EventHandlerService.Instance.register(new TableCreatedEventHandler());
})(Migrations || (Migrations = {}));
