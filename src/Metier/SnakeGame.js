import SnakeEngine from './SnakeEngine';
import DirectionManager from './DirectionManager';
import {observable,computed} from 'mobx';

class SnakeGame {
    @observable state =  "NEW_GAME";
    @observable score = 0;
    @observable _level = 1;
    @observable size = 32;
    @observable engine;
    @observable directionManager;
    @observable intervalId = null;

    constructor(){
        this.engine=  new SnakeEngine(this.size);
        this.directionManager =  new DirectionManager();
    }

    start(){
        if(this.state !== "NEW_GAME" && this.state !== 'PAUSED'){
            return;
        }
        this.intervalId = setInterval(
            () =>{this.playATurn()},
            this.computeInterval());
        this.state = 'RUNNING';
    }

    pause(){
        if(this.state !== 'RUNNING')
            return;

        this.stopTurn();
        this.state = 'PAUSED';
    }

    reset(){
        if(this.state === "NEW_GAME")
            return;
        
        if(this.state === "RUNNING")
           this.stopTurn();
        
        this.engine.reset();
        this.directionManager.reset();
        this.score = 0;
        this.state = "NEW_GAME";
    }

    playATurn(){
        if(this.state !== 'RUNNING'){
            return;
        }
        
        switch(this.engine.move(this.directionManager._direction)){
            case 0: //le serpent a bougé et il ne s'est rien passé
                break;
            case -1://le serpent s'est mordu
                this.stopTurn();
                this.state = "GAME_OVER";
                break;
            case 1: //le snake a mangé
                this.incrementScore();
                break;
            default:
                throw "illegal return of SnakeEngine";
        }


    }

    incrementScore(){
        this.score += 5 * (this.level + 1);
    }

    @computed get level(){
        return this._level;
    }

    set level(l){
        if(l < 1 || l > 6)
            throw "Illegal level";
        if(this.state === "RUNNING" || this.state === 'PAUSED')
            return; 
        this._level = parseInt(l);
    }

    computeInterval(){
        return -110 * this.level + 580;
    }

    stopTurn(){
        if(this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

export default SnakeGame;