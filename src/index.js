import React from 'react';
import ReactDOM from 'react-dom';
import App from './Component/App/App';
import './index.css';
import {Provider} from 'mobx-react';
import SnakeGame from './Metier/SnakeGame';

let store = new SnakeGame();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root')
);
