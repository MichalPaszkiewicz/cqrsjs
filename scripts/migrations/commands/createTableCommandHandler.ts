import * as Framework from '../../framework';
import * as Domain from '../../domain';
import * as ApplicationServices from '../../applicationservices';
import {MigrationAggregateRoot} from '../domain/migrationAggregateRoot';
import {CreateTableCommand} from './createTableCommand';

    export class CreateTableCommandHandler implements ApplicationServices.IAmACommandHandler{
          
        HandlesCommand = "CreateTable";

        handle(createTableCommand: CreateTableCommand){
            var then = new Framework.Then();

            Domain.AggregateRootService.Instance.getByID(MigrationAggregateRoot, createTableCommand.AggregateRootID,
                function(aggregateRoot){
                    aggregateRoot.addTable(createTableCommand, then.run);
                });                
        }
        
    }
    
    ApplicationServices.CommandHandlerService.Instance.register(new CreateTableCommandHandler());
    