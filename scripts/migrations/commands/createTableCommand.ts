import * as Framework from '../../framework';

    export class CreateTableCommand extends Framework.Command{
        
        TableName: string;
        
        constructor(userName: string, tableName: string){
            super("migration", userName, "CreateTable");
            
            this.TableName = tableName;
        }
        
    }
    