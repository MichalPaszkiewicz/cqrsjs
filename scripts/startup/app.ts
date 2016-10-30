import * as MongoEventStore from '../mongoeventstore/mongoeventstore';

module Startup{
    
    function getState(){
                
                
        window.requestAnimationFrame(getState)            
    }
            
    getState();
    
    export function runApp(){

        MongoEventStore.setupMongooseEventStore("test");

        getState();
    }
    
}