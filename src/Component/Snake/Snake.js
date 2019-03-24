import React from 'react';
import ReactDOM from 'react-dom';
import CBrick from '../CBrick/CBrick';
import {inject,observer} from 'mobx-react';

@inject('store')
@observer

class Snake extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        let lengthOfSnake = this.props.store.engine.snake.length;
        let engine = this.props.store.engine;   
        var snake = [];
        for(let i = 0; i < lengthOfSnake; i++){
            snake.push(<CBrick key={i} x={engine.snake[i].xPixels} y={engine.snake[i].yPixels} color={engine.snake[i].color} />);
        }
        
        return (
            <>
                {snake}
            </>
        )   
    }
}
export default Snake;