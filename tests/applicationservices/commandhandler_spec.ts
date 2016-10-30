
import * as Framework from '../../scripts/framework';
import * as ApplicationServices from '../../scripts/applicationservices';

module CQRSjs.Test{

    var _aggregateRootID = Framework.IDGenerator.generate();
    var _userName = "test command handler";

    class TestCommand extends Framework.Command{
        constructor(){
            super(_aggregateRootID, _userName, "testCommand");
        }
    }

    describe("a command handler", function(){
        var lastLog = "nothing"; 

        class TestCommandHandler implements ApplicationServices.IAmACommandHandler{
            HandlesCommand = "testCommand";

            handle(command: TestCommand){
                lastLog = command.UserName;
            }
        }

        var testCommandHandler2 = new TestCommandHandler();
        var testCommand = new TestCommand();

        it("should handle the command correctly", function(){
            testCommandHandler2.handle(testCommand);

            expect(lastLog).toBe(_userName);
        });

    });
}