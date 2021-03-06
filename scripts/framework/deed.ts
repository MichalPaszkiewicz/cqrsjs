import {TimeService} from './timeservice';

    export class Deed{
        AggregateRootID: string;
        UserName: string;
        EventName: string;
        Time: number;
        
        constructor(aggregateRootID: string, eventName: string, userName: string){
            this.AggregateRootID = aggregateRootID;
            this.UserName = userName;
            this.EventName = eventName;
            this.Time = TimeService.Instance.nowTicks();
        }
        
    }