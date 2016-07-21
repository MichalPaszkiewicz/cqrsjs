namespace CQRSjs.Migrations{
    
    export class CreateTableCommandHandler implements ApplicationServices.IAmACommandHandler{
          
        HandlesCommand = "CreateTable";

        handle(createTableCommand: CreateTableCommand){
            Domain.AggregateRootService.Instance.getByID(MigrationAggregateRoot, createTableCommand.AggregateRootID)
                .addTable(createTableCommand);
        }
        
    }
    
    ApplicationServices.CommandHandlerService.Instance.register(new CreateTableCommandHandler());
    
}