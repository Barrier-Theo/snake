import Position from './Position';
import {createBlackBrick, createRandomColorBrick} from "./Brick";
import {observable,computed} from 'mobx';

class SnakeEngine {
    @observable isBlocked = false;
    @observable snake; //ArrayOfBrick
    @observable food = null; //a brick
    @observable gridSize;
    initialSnakeSize = 5;

    constructor(gridSize){
        this.gridSize = gridSize;
        this.reset();
    }

    reset(){
        this.snake = new Array(this.initialSnakeSize);
        const y = Math.ceil(this.gridSize / 2);
        //PE
        //const xBase =  Math.ceil((this.gridSize - this.initialSnakeSize) / 2);
        const xBase =  Math.ceil((this.gridSize/2) - this.initialSnakeSize);
        for(let i = 0; i < this.initialSnakeSize; i++){
            let p = new Position(xBase + i, y);
            this.snake[i] = createBlackBrick(p);
        }
        this.food = null;
        this.isBlocked = false;
    }

    move(direction){
        if(this.isBlocked){
            return -1;
        }

        if(this.food === null){
            this.createNewFood();
        }

        //position future of the snake head
        let futurHead = this.computeFuturHead(direction);
        //check if snake is going to grow
        if(futurHead.equals(this.food.position)){
            //Grow Snake
            this.growSnakeWithFood();
            //create a new food
            this.createNewFood();
            return 1;
        }

        //check if snake is going to bite itself
        if(this.snakeIsOn(futurHead)){
            this.isBlocked = true;
            return -1;
        }

        this.moveSnake(futurHead);
        // PE
        return 0;
    }
    // create a new food randomly that is not on the snake
    createNewFood(){
        //verifier si y'a encore de la place
        const T = this.gridSize * this.gridSize;
        if(this.snake.length === T){
            return;
        }

        let i = Math.floor(Math.random() *  (T - this.snake.length));
        //créer un tableau tié des indices du serpent à une dimension
        const t2 =  this.snake.map(pos => pos.y * this.gridSize + pos.x).sort();
        for(let j=0; j < t2.length && t2[j] <= i; j++){
            i++;
        }
        //ici i est l'indice d'unee case libre dans la grille en version unidimensionnel
        const p  = new Position(i % this.gridSize, Math.floor(i/ this.gridSize));
        this.food = createRandomColorBrick(p);
       /* const availablePositions = [];
        for(let x = 0 ; x < this.gridSize; x++){
            for(let y = 0; y < this.gridSize; y++){
                let pos =  new Position(x,y);
                if(!this.snakeIsOn(pos)){
                    availablePositions.push(pos);
                }
            }
        }
        const i = Math.floor(Math.random() * availablePositions.length);
        return  availablePositions[i];  */
    }
    //Compute and return the position of the future snake's head
    computeFuturHead(direction){
        const  currentHeadPos = this.snake[this.snake.length-1].position;
        switch(direction){
            case "up":
                //currentHeadPos
                return new Position(currentHeadPos.x, currentHeadPos.y === 0 ? this.gridSize - 1 : currentHeadPos.y - 1);
            case "down":
                return new Position(currentHeadPos.x, currentHeadPos.y === this.gridSize - 1  ? 0 : currentHeadPos.y + 1);
            case "left":
                return new Position(currentHeadPos.x === 0 ? this.gridSize - 1 : currentHeadPos.x - 1, currentHeadPos.y);
            case "right":
                return new Position(currentHeadPos.x === this.gridSize - 1 ?  0 : currentHeadPos.x + 1, currentHeadPos.y);
            default:
                throw `Illegal direction ${direction}`;

        }
    }

    growSnakeWithFood(){
        if(this.food === null){
            return;
        }
        this.snake.push(this.food);
        this.food = null;
    }
    // Return true or false
    snakeIsOn(position){
        return this.snake.some((brick) => brick.position.equals(position))
    }

    moveSnake(newHead){
        let i;
        for(i=0; i < this.snake.length -1; i++){
            this.snake[i].position = this.snake[i+1].position;
        }
        this.snake[i].position = newHead;

    }
}

export default SnakeEngine;