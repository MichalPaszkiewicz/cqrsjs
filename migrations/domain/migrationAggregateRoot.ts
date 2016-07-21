namespace CQRSjs.Migrations{

    export class MigrationAggregateRoot extends Domain.AggregateRoot{
        _tables: string[] = [];

        addTable(command: CreateTableCommand){
            var self = this;
            
            self.ensureTableCanBeAdded(command.TableName);  

            self.applyEvent(new TableCreatedEvent(self.ID, command.UserName, command.TableName));
        }

        ensureTableCanBeAdded(tableName: string){
            if(this._tables.filter((t) => t == tableName).length > 0){
                Framework.ErrorService.throw("this table already exists");
            }
        }

        constructor(id: string){
            super(id);

            var self = this;

            self.registerEventAction(new Domain.EventAction("TableCreated", (e: TableCreatedEvent) =>{
                this._tables.push(e.TableName);
            }));
        }

    }

}