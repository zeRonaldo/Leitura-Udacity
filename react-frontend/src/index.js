import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/css/index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import middleware from './Middlewares';
import  reducer from './Reducers'

export const store = createStore(reducer,{}, middleware)

ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>, document.getElementById('root'));
