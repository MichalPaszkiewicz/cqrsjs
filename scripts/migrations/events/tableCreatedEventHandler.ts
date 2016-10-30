import {TableCreatedEvent} from '../events/tableCreatedEvent';   
import * as Projections from '../../projections';


    export class TableCreatedEventHandler implements Projections.IAmAnEventHandler{
        
        HandlesEvent = "TableCreated";
        
        handle(event: TableCreatedEvent){
            
            Projections.ProjectionStore.Instance.addTable(event.TableName);
            
        }
        
    }
    
    Projections.EventHandlerService.Instance.register(new TableCreatedEventHandler());