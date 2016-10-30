    import * as Framework from '../framework';
    
    export interface IAmAnEventHandler{
        HandlesEvent: string;
        handle(event: Framework.Deed);
    }