import * as Framework from '../framework'

    export class EventAction{
        EventName: string;
        Action: (e: Framework.Deed) => void;

        constructor(eventName: string, action: (e: Framework.Deed) => void){
            this.EventName = eventName;
            this.Action = action;
        }
    }

    export abstract class AggregateRoot{
        ID: string;

        protected _eventActions: EventAction[] = [];

        // event actions must be registered in constructor.
        protected registerEventAction(eventAction: EventAction){
            this._eventActions.push(eventAction);
        }

        applyEvent(event: Framework.Deed, callback: () => void){
            this._eventActions
                .filter((ea: EventAction) => { return ea.EventName == event.EventName })
                .forEach((ea: EventAction) => { ea.Action(event); });
            Framework.EventStoreService.Instance.store(event, callback);
        }

        constructor(id: string){
            this.ID = id;
        }
    }

    // class Bob extends AggregateRoot{
    //     constructor(){
    //         super();

    //         // you must do this to ensure action performs on correct object
    //         var self = this;

    //         this.registerEventAction(new EventAction("lol", (e: Framework.Event) => {
    //             self.ID = e.AggregateRootID;
    //         }));
    //     }
    // }
