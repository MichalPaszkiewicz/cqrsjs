namespace CQRSjs.FrontEnd{
    
    function getState(){
                
        
                
        window.requestAnimationFrame(getState)            
    }
            
    getState();
    
    export function runApp(){
        getState();
    }
    
}