import * as Framework from '../framework';
import {AggregateRoot} from './AggregateRoot';

    export class AggregateRootService{
        
        private static _instance: AggregateRootService;
        
        static get Instance(): AggregateRootService{
            if(AggregateRootService._instance == null){
                AggregateRootService._instance = new AggregateRootService();   
            }            
            return AggregateRootService._instance;
        }
        
        getByID<T extends AggregateRoot>(a: {new(id: string): T;}, aggregateRootID: string, callback: (aggregateRoot: T) => void): void{
            var relevantAggregateRoot = new a(aggregateRootID);

            Framework.EventStoreService.Instance.getEventsWithID(aggregateRootID, (results: Framework.Deed[]) => {
                var counter = results.length;
                results.forEach((e: Framework.Deed) => {
                    relevantAggregateRoot.applyEvent(e, () => {
                        counter--;
                        if(counter === 0){
                            callback(relevantAggregateRoot);
                        }
                    });
                });
            });
        }
    }