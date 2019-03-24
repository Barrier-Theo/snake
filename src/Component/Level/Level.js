import React from 'react';
import ReactDOM from 'react-dom';
import {inject, observer} from 'mobx-react';
import './Level.css';

@inject('store')
@observer
class Level extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:this.props.store.level
        }
    }
    
    handleChange(e){
        this.setState({value:e.target.value});
        
        this.props.store.level = e.target.value;
        console.log(e.target.value);
    }
    
    render(){
        return (
            <>  
                <div className="level">
                    <label> Niveau </label>
                    <div className="custom-dropdown">
                        <select id= "niveau" value={this.state.value} onChange={(e) => this.handleChange(e)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
            </>
        )
    }
}
export default Level; 