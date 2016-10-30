import * as Framework from '../../framework';
import * as Domain from '../../domain';
import * as ApplicationServices from '../../applicationservices';
import {CreateTableCommand} from '../commands/createTableCommand';
import {TableCreatedEvent} from '../events/tableCreatedEvent';

    export class MigrationAggregateRoot extends Domain.AggregateRoot{
        _tables: string[] = [];

        addTable(command: CreateTableCommand, callback: () => void){
            var self = this;
            
            self.ensureTableCanBeAdded(command.TableName);  

            self.applyEvent(new TableCreatedEvent(self.ID, command.UserName, command.TableName), callback);
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
