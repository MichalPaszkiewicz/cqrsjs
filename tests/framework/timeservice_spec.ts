import * as Framework from '../../scripts/framework';


module CQRSjs.Test{

    describe("the time service", function(){

        it("should have the correct time for now", function(){
            Framework.TimeService.Instance.reset();
            var beforeTime = new Date();
            var now = Framework.TimeService.Instance.now();
            var afterTime = new Date();

            var beforeTimeIsLess = beforeTime.getTime() <= now.getTime();
                var afterTimeIsMore = afterTime.getTime() >= now.getTime();
                if(!beforeTimeIsLess || !afterTimeIsMore){
                    console.log("before: " + beforeTime.getTime());
                    console.log("now: " + now.getTime());
                    console.log("after: " + afterTime.getTime());
                    expect(beforeTime).toBeTruthy();
                }
                expect(afterTimeIsMore).toBeTruthy();
        });
    });

    describe("the time service", function(){

        it("should have the correct time for nowTicks", function(){
            Framework.TimeService.Instance.reset();
            var beforeTime = new Date();
            var nowTicks = Framework.TimeService.Instance.nowTicks();
            var afterTime = new Date();

            expect(beforeTime.getTime() <= nowTicks).toBeTruthy();
            expect(afterTime.getTime() >= nowTicks).toBeTruthy();
        });

    });

    describe("the time service", function(){

        it("should have the correct time for today", function(){
            Framework.TimeService.Instance.reset();        
            var now = new Date();

            var beforeTime = new Date(now.getTime() - 24*60*60*1000);
            var today = Framework.TimeService.Instance.today();
            var afterTime = new Date();

            expect(beforeTime.getTime()).toBeLessThan(today.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(today.getTime());
        });

    });

    describe("the time service", function(){
        
        it("allows year manipulation", function(){
            Framework.TimeService.Instance.reset();        
            var now = new Date();

            var beforeTime = new Date(now.getTime() + 364*24*60*60*1000);
            Framework.TimeService.Instance.addYears(1);
            var today = Framework.TimeService.Instance.today();
            var afterTime = new Date(now.getTime() + 367*24*60*60*1000);
            expect(beforeTime.getTime()).toBeLessThan(today.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(today.getTime());
        });

    });

    describe("the time service", function(){

        it("allows month manipulation", function(){
            var now = new Date();

            Framework.TimeService.Instance.reset();
            var beforeTime = new Date(now.getTime() + 28*24*60*60*1000);
            Framework.TimeService.Instance.addMonths(1);
            var today = Framework.TimeService.Instance.today();
            var afterTime = new Date(now.getTime() + 32*24*60*60*1000);
            expect(beforeTime.getTime()).toBeLessThan(today.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(today.getTime());
        });

    });

    describe("the time service", function(){

        it("allows day manipulation", function(){
            Framework.TimeService.Instance.reset();

            var beforeTime = new Date();
            Framework.TimeService.Instance.addDays(1);
            var now = Framework.TimeService.Instance.now();
            var afterTime = new Date(beforeTime.getTime() + 24*60*61*1000);

            expect(beforeTime.getTime()).toBeLessThan(now.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(now.getTime());
        });

    });

    describe("the time service", function(){

        it("allows hour manipulation", function(){
            Framework.TimeService.Instance.reset();
            var beforeTime = new Date();
            Framework.TimeService.Instance.addHours(1);
            var now = Framework.TimeService.Instance.now();
            var afterTime = new Date(beforeTime.getTime() + 60*60*1000 + 10);

            expect(beforeTime.getTime()).toBeLessThan(now.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(now.getTime());
        });

    });

    describe("the time service", function(){

        it("allows minute manipulation", function(){
            Framework.TimeService.Instance.reset();
            var beforeTime = new Date();
            Framework.TimeService.Instance.addMinutes(1);
            var now = Framework.TimeService.Instance.now();
            var afterTime = new Date(beforeTime.getTime() + 60*1000 + 10);

            expect(beforeTime.getTime()).toBeLessThan(now.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(now.getTime());
        });

    });

    describe("the time service", function(){
        
        it("allows second manipulation", function(){
            Framework.TimeService.Instance.reset();
            var beforeTime = new Date();
            Framework.TimeService.Instance.addSeconds(10);
            var now = Framework.TimeService.Instance.now();
            var afterTime = new Date(beforeTime.getTime() + 10*1000 + 50);

            expect(beforeTime.getTime()).toBeLessThan(now.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(now.getTime());
        });

    });

    describe("the time service", function(){
        

        it("allows millisecond manipulation", function(){
            Framework.TimeService.Instance.reset();
            Framework.TimeService.Instance.addMilliseconds(100);
            
            var beforeTime = new Date();
            var now = Framework.TimeService.Instance.now();
            var afterTime = new Date(beforeTime.getTime() + 300);
            
            expect(beforeTime.getTime()).toBeLessThan(now.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(now.getTime());
        });

    });

}