import React,{useContext} from 'react';
import {stockContext} from './App.js'
import {useHistory} from 'react-router-dom'

export default function Product(props) {
  let history = useHistory();
  let stock = useContext(stockContext);

  return (
    <div className="col-md-4" onClick={()=>{history.push('/detail/'+props.i)}} style={{cursor:'pointer'}}>
      <img src={"https://codingapple1.github.io/shop/shoes"+(props.i+1)+".jpg"} alt="shoes" width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
      <p>재고 : {stock[props.i]}</p>
    </div>
  )
}
