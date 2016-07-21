declare namespace CQRSjs.ApplicationServices {
    interface IAmACommandValidator {
        ValidatesCommand: string;
        validate(command: Framework.Command): void;
    }
    class CommandValidator implements IAmACommandValidator {
        ValidatesCommand: string;
        constructor(validatesCommand: string);
        validate(command: Framework.Command): void;
    }
}
declare namespace CQRSjs.ApplicationServices {
    interface IAmACommandHandler {
        HandlesCommand: string;
        handle(command: Framework.Command): void;
    }
}
declare namespace CQRSjs.ApplicationServices {
    class CommandHandlerService {
        private static _instance;
        static Instance: CommandHandlerService;
        CommandHandlers: IAmACommandHandler[];
        CommandValidators: CommandValidator[];
        register(commandHandler: IAmACommandHandler): void;
        registerValidator(commandValidator: CommandValidator): void;
        handle(command: Framework.Command): void;
    }
}
