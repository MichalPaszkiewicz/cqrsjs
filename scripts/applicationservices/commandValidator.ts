    import {Command} from '../framework/command';
    import {ErrorService} from '../framework/errorservice';

    export interface IAmACommandValidator{
        ValidatesCommand: string;
        validate(command: Command): void     
    }
    
    export class CommandValidator implements IAmACommandValidator{
        
        ValidatesCommand: string;
        
        constructor(validatesCommand: string){
            this.ValidatesCommand = validatesCommand;
        }
        
        validate(command: Command): void{
            
            if(command.CommandName == null){
               ErrorService.throw(`Commands must have a Name`);
            }

            if(command.AggregateRootID == null){
                ErrorService.throw(`Command ${command.CommandName} must have an AggregateRootID`)
            }

            if(command.UserName == null){
                ErrorService.throw(`Command ${command.CommandName} must have a UserName`)
            }

            if(command.Time == null){
                ErrorService.throw(`Command ${command.CommandName} has no Time`);
            }
        }
        
    }
    