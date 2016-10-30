import * as Framework from '../framework';  
import * as Projections from '../projections';
    
    export class EventReplayerService{
        
        private static _instance: EventReplayerService;
        
        static get Instance(): EventReplayerService{
            if(EventReplayerService._instance == null){
                EventReplayerService._instance = new EventReplayerService();
            }
            return EventReplayerService._instance;
        }
        
        clearCurrentState(){
            Projections.ProjectionStore.Instance.clear();
        }
        
        replayAll(callback: () => void){
            this.clearCurrentState();
            
            Framework.EventStoreService.Instance.getEvents((eventsStored) => {
                eventsStored.forEach((c: Framework.Deed)=>{  
                    Projections.EventHandlerService.Instance.handle(c);                
                });     
                callback();
            });    
            
        }
        
        replayTo(time: Date, callback: () => void){
            this.clearCurrentState();
            
            Framework.EventStoreService.Instance.getEvents((eventsBeforeTime) => {
                eventsBeforeTime
                    .filter((c: Framework.Deed)=>{ return c.Time < time.getTime() })
                    .forEach((c: Framework.Deed)=>{
                        Projections.EventHandlerService.Instance.handle(c); 
                    });                
                callback();
            });  
            
        }
        
    }