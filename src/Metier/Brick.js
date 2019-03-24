import Position from './Position';
import {observable,computed} from 'mobx';
const COLORS = ['#E70000','#FF8C00','#FFEF00','#00811F','#0044FF','#760089'];
export class Brick extends Position {
    @observable color;
    constructor(x,y,color){
        super(x,y);
        this.color = color;
    }

    set position (p){
        this.x = p.x;
        this.y = p.y;
    }

    @computed get position(){
        return this;
    }
}

export function createBlackBrick(position){
    return new Brick(position.x, position.y,'#000000');
}

export function createRandomColorBrick(position){
    const i = Math.floor(Math.random() * COLORS.length);
    return new Brick(position.x, position.y, COLORS[i]);
}

export default Brick;