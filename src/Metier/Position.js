import {observable,computed} from 'mobx';
export const PIXEL_UNIT = 9;

export class Position {
    @observable x = 0;
    @observable y = 0;
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    @computed get xPixels() {
        return this.x * PIXEL_UNIT;
    }

    @computed get yPixels() {
        return this.y * PIXEL_UNIT;
    }

    equals(position){
        return position && position instanceof Position && this.x ===  position.x && this.y ===  position.y;
    }
}

export default Position;

