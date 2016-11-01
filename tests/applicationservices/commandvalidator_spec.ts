import * as Framework from '../../scripts/framework';
import * as ApplicationServices from '../../scripts/applicationservices';

module CQRSjs.Test{

    var _aggregateRootID = Framework.IDGenerator.generate();
    var _userName = "test command handler";
    var _errorMessage = "the test property is bad!";
    var validated = false;

    class TestCommand extends Framework.Command{
        constructor(public TestProperty: string){
            super(_aggregateRootID, _userName, "testCommand");
        }
    }

    class TestCommandValidator extends ApplicationServices.CommandValidator{
        constructor(){
            super("testCommand");
        }

        validate(command: TestCommand){
            validated = true;
            if(command.TestProperty == "bad"){
                Framework.ErrorService.throw(_errorMessage);
            }   
        }
    }

    describe("a command validator", function(){
        it("correctly validates a good command", function(){
            var testCommandValidator = new TestCommandValidator();
            var testCommand = new TestCommand("good");

            testCommandValidator.validate(testCommand);
            expect(validated).toBe(true);
        })
    });

    describe("a command validator", function(){
        it("correctly rejects a bad command", function(){
            var testCommandValidator = new TestCommandValidator();
            var testCommand = new TestCommand("bad");
            Framework.ErrorService.Instance.clearOnThrowEvents();
            Framework.ErrorService.Instance.onThrow((message) => {
                throw message;
            });
            expect(() => testCommandValidator.validate(testCommand)).toThrow(_errorMessage);
        });
    }); 

}