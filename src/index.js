import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reportWebVitals from './reportWebVitals';
import rootReducer, {rootSaga} from './modules';
import loggerMiddleware from './lib/loggerMiddleware';
import {createLogger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension'; //redux 개발자 도구


const root = ReactDOM.createRoot(document.getElementById('root'));

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(logger, ReduxThunk, sagaMiddleware))
  );

sagaMiddleware.run(rootSaga);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
