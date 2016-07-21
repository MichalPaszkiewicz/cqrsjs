namespace CQRSjs.Migrations{
        
    export class TableCreatedEvent extends Framework.Event{
        
        TableName: string;
        
        constructor(aggregateRootID: string, userName: string, tableName: string){
            super(aggregateRootID, "TableCreated", userName);
            this.TableName = tableName;
        }
    }    
}