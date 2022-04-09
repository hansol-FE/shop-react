import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore , combineReducers} from 'redux';

let alertState = true;

function reducer2(state = alertState ,action){
  if(action.type === 'alertClose'){
    state = false;
    return state
  }else{
    return state
  }
}





let defaultState = [
  { id:0,name:'멋진신발',quan:2},
  { id:1,name:'멋진신발2',quan:2}
]

function reducer(state = defaultState, action ){
  let copyState = [...state];
  if(action.type === 'cartAdd'){
    let findIndex = state.findIndex((data)=>{return data.id === action.payload.id})

    if(findIndex >= 0){
      copyState[findIndex].quan++;
    }else{
      copyState.push(action.payload);
    }
    return copyState

  }else if(action.type === 'quanAdd'){
    copyState[action.payload].quan++;
    return copyState   
  }else if(action.type === 'quanMinus'){
    copyState[action.payload].quan--;
    if(copyState[action.payload].quan < 0){
      copyState[action.payload].quan = 0;
    } 
    return copyState   
  } else{
    return state
  }
}
let store = createStore(combineReducers({reducer,reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store = {store}>
      <App />
    </Provider>  
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
