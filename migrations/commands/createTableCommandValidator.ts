namespace CQRSjs.Migrations{
    
    export class CreateTableCommandValidator extends ApplicationServices.CommandValidator{
        
        constructor(){
            super("CreateTable");
        }
        
        validate(command: CreateTableCommand){
            if(!command.TableName){
                Framework.ErrorService.throw("When creating a table, you must provide a TableName");
            }
        }
        
    }
    
    ApplicationServices.CommandHandlerService.Instance.registerValidator(new CreateTableCommandValidator());
    
}