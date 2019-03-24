import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '../Grid/Grid';
import Buttons from '../Buttons/Buttons';
import Score from '../Score/Score';
import Level from '../Level/Level';
import './App.css';

class App extends React.Component {
    render(){
        return (
            <>
                <div className="app">
                    <Grid></Grid>
                    <Buttons></Buttons>
                    <Score></Score>
                    <Level></Level>
                </div>
            </>
        )
    }
    
}

export default App;