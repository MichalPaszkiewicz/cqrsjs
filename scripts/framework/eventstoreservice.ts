  import * as Framework from './deed'
  import {Then} from './then';
  
    export class EventStoreService{
        
        private static _instance: EventStoreService;
        
        static get Instance(): EventStoreService{
            if(EventStoreService._instance == null){
                EventStoreService._instance = new EventStoreService();
            }
            return EventStoreService._instance;
        }

        constructor(){
            var self = this;
            self.onAdded((event)=>{
                self._eventsStored.push(event)
            });
        }
        
        private _eventsStored: Framework.Deed[] = [];
        private _funcsOnAdded: ((event: Framework.Deed) => void)[] = [];
        private _store: (event: Framework.Deed, callback: () => void) => void;
        private _getEvents(callback: (events: Framework.Deed[]) => void): void{
            callback(this._eventsStored);
        }
        private _getEventsWithID(id: string, callback: (events: Framework.Deed[]) => void): void{
            callback(this._eventsStored.filter((e: Framework.Deed) => e.AggregateRootID == id));
        }
        
        getEvents(callback: (events: Framework.Deed[]) => void): void{
            this._getEvents(callback);
        }

        getEventsWithID(id: string, callback: (events: Framework.Deed[]) => void): void{
            this._getEventsWithID(id, callback);
        }

        overrideGetEvents(func: (callback: (events: Framework.Deed[]) => void)=>void){
            this._getEvents = func;
        }

        overrideGetEventsWithID(func: (id:string, callback: (events: Framework.Deed[]) => void)=>void){
            this.getEventsWithID = func;
        }
        
        store(event: Framework.Deed, callback: () => void): Then{
            var then = new Then();

            this._funcsOnAdded.forEach((func) => {
                func(event);
                then.run();
            })
            if(this._store != null){
                this._store(event, callback);
            }

            return then;
        }

        overrideStore(func: (event: Framework.Deed, callback: () => void) => void){
            this._store = func;
        }
        
        onAdded(func: (event: Framework.Deed) => void){
            this._funcsOnAdded.push(func);
        }
        
        clearOnAdded(){
            this._funcsOnAdded = [];
        }
        
    }
