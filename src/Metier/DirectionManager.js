import {observable,computed} from 'mobx';

class DirectionManager {
    @observable _direction;
    constructor(){
        this.reset();
        this.startListening();
    }

    startListening(){
        let monHandler = this.captureKeyBoard.bind(this);
        window.addEventListener('keydown', monHandler  , true)
    }
    
    reset(){
        this._direction = 'right';

    }
    
    captureKeyBoard(e){
        if(e.key === 'ArrowUp' && this._direction !== 'down') {
            this._direction = 'up';
        }
        else if(e.key === 'ArrowDown' && this._direction !== 'up'){
            this._direction = 'down';
        }
        else if(e.key === "ArrowLeft" && this._direction !== 'right') {
            this._direction = "left";
        }
        else if(e.key === 'ArrowRight' && this._direction !== 'left') {
            this._direction = 'right';
        }
        e.preventDefault();
    }

    @computed get direction(){
        return this._direction;
    }
}

export default DirectionManager;