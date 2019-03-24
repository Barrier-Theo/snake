import React from 'react';
import {PIXEL_UNIT} from '../../Metier/Position';
import './CBrick.css';

class CBrick extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        let brick = {
            left: this.props.x,
            top: this.props.y,
            width:PIXEL_UNIT,
            height:PIXEL_UNIT,
            backgroundColor: this.props.color 
        }
                
        return (
            <div style={brick} className="brick"></div>
        )
    }
}

export default CBrick;