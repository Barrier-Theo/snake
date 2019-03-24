import React from 'react';
import ReactDOM from 'react-dom';
import {inject, observer} from 'mobx-react';
import './Score.css';

@inject('store')
@observer
class Score extends React.Component {
    constructor(props){
        super(props)
    }
    
    render(){
        let score = this.props.store.score;
        return (
            <>
                <div className="score">{'Score : ' + score}</div>
            </>
        )
    }
}
export default Score;