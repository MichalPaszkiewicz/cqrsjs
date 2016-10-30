    export class Then{
        private _func: () => void;
        private _childProcess: Then;

        run(){
            if(!!this._func){
                this._func();
            }

            if(!!this._childProcess){
                this._childProcess.run();
            }
        }

        then(func: ()=>void): Then{

            this._func = func;
            this._childProcess = new Then();

            return this._childProcess;
        }
    }