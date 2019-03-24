import React from 'react';
import ReactDOM from 'react-dom';
import {inject, observer} from 'mobx-react';
import {PIXEL_UNIT} from '../../Metier/Position';
import Snake from '../Snake/Snake';
import Food from '../Food/Food';
import './Grid.css';


@inject('store')
@observer
class Grid extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        let style = {
            width: this.props.store.engine.gridSize * PIXEL_UNIT,
            height: this.props.store.engine.gridSize * PIXEL_UNIT,
            borderWidth: PIXEL_UNIT / 2
        };
        
        return (
            <>
                <div style={style} className="grid">
                    <div>
                        <Snake></Snake>  
                        <Food></Food>
                    </div>
                </div>
            </>
        );
    }
}

export default Grid