import * as Framework from '../../framework';

    export class TableCreatedEvent extends Framework.Deed{
        
        TableName: string;
        
        constructor(aggregateRootID: string, userName: string, tableName: string){
            super(aggregateRootID, "TableCreated", userName);
            this.TableName = tableName;
        }
    }    