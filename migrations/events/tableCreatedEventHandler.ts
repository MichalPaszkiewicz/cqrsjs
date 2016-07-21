namespace CQRSjs.Migrations{
    
    class TableCreatedEventHandler implements Projections.IAmAnEventHandler{
        
        HandlesEvent = "TableCreated";
        
        handle(event: TableCreatedEvent){
            
            Projections.ProjectionStore.Instance.addTable(event.TableName);
            
        }
        
    }
    
    Projections.EventHandlerService.Instance.register(new TableCreatedEventHandler());
    
}