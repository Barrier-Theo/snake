import React from 'react';
import ReactDOM from 'react-dom';
import {inject, observer} from 'mobx-react';
import CBrick from '../CBrick/CBrick';

@inject('store')
@observer
class Food extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        var foodBrick;
        const food = this.props.store.engine.food;
        if(food !== null)
             foodBrick =  <CBrick key={"1"} x={food.xPixels} y={food.yPixels} color={food.color} />
        else {
            foodBrick = null;
        }
        return (
            <>
                {foodBrick}
            </>
        )
    }
}

export default Food;