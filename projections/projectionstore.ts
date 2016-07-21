namespace CQRSjs.Projections{
    
    export class ProjectionStore{
        
        private static _instance: ProjectionStore;
        
        static get Instance(){
            if(ProjectionStore._instance == null){
                ProjectionStore._instance = new ProjectionStore();
            }
            return ProjectionStore._instance;            
        }
        
        Tables: Table[] = [];

        clear(){
            this.Tables.forEach((t: Table)=>{
                t.clear();
            });
            this.Tables = [];
        }
        
        addTable(name: string){
            this.Tables.push(new Projections.Table(name));
        }
        
        addRowToTable(tableName: string, row: Row){
            var table = this.getTable(tableName);
            table.Rows.push(row);
        }
        
        addRowsToTable(tableName: string, rows: Row[]){
            var table = this.getTable(tableName);
            table.Rows = table.Rows.concat(rows);
        }
        
        getTable(name: string){
            for(var i = 0; i < this.Tables.length; i++){
                if(this.Tables[i].Name == name){
                    return this.Tables[i];
                }
            }
            Framework.ErrorService.throw(`Table {name} not found`)
        }
        
    }
    
}