import * as Framework from '../framework';

    export interface IAmACommandHandler{
        HandlesCommand: string;
        handle(command: Framework.Command): void;
    }