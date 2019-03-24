import React from 'react';
import {inject, observer} from 'mobx-react';
import "./Buttons.css";

@inject('store')
@observer


//Bouton nouvelle partie, quand on click , ce bouton se transforme en reset. Autre bouton pour arrêter/reprendre la partie.

class Buttons extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            valueBtn1 : 'Nouvelle Partie',
            valueBtn2 : '',
        }
    }
    
    start(){
   
        if(this.state.valueBtn1 === 'Nouvelle Partie'){
            this.props.store.start();
            this.setState({valueBtn1 : 'Recommencer', valueBtn2: 'Stop'});
        }else if(this.state.valueBtn1 === 'Recommencer'){
            this.props.store.reset();
            this.setState({valueBtn1 : 'Nouvelle Partie', valueBtn2 : ''})
            document.getElementById('niveau').disabled = false;
        }
        
        if(this.props.store.state !== "NEW_GAME"){
            document.getElementById('niveau').disabled = true; 
        }
            
    }
    
    stop(){
        if(this.state.valueBtn2 === "Stop"){
            this.props.store.pause();
            this.setState({valueBtn1:'Recommencer',valueBtn2:'Reprendre'});
        }else if (this.state.valueBtn2 === 'Reprendre'){
            this.props.store.start();
            this.setState({valueBtn1:'Recommencer', valueBtn2: 'Stop'})
        }
            
    }
    
    render(){
        let render = null;
        if(this.props.store.state === "GAME_OVER"){
             render = 
                 <>
                    <div className="gameOver">GAME OVER</div><button onClick={() => this.start()}>{this.state.valueBtn1}</button>
                 </>    
                     ;
        }else{
               render = 
                   
                <div className="buttons">
                    <button onClick={() => this.start()}>{this.state.valueBtn1}</button>
                    <button onClick={() => this.stop()}>{this.state.valueBtn2}</button>
                </div>
            }
        return (
            <>
                {render}
            </>
        )
    }
}

export default Buttons;

