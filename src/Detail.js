import React,{useEffect,useState,useContext} from 'react' 
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import {stockContext} from './App.js'

// let box = styled.div`
//   padding : 20px;
// `;
// let title = styled.h4`
//   font-size : 25px;
//   color : ${ props => props.색상 }
// `;

export default function Detail(props) {
  let history = useHistory();
  let { id } = useParams();
  let findShose = props.shoes.find(x => x.id == id);
  let stock = useContext(stockContext);


  let [alert, setAlert] = useState(true);
  let [text,setText] = useState("");
  
  useEffect(()=>{
    console.log("useEffect"); //mount됐을때, update됐을때
    let timer = setTimeout(()=>{setAlert(false)},2000);

    return () => {clearTimeout(timer)} // unmount할때 
  },[alert]);//alert라는 state가 변경될때만 useEffect실행
  
  return (
    <div className="container">

      {/* <input onChange={(e)=>{setText(e.target.value)}}/> */}
      {/* <box>
        <title 색상='red' className='red'>상세 페이지</title>
        <title 색상='blue'>상세 페이지</title>
      </box> */}
      
      {
        alert &&
        <div className="red">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      }
      
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes"+(parseInt(id)+1)+".jpg"} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5 red">{findShose.title}</h4>
          <p>{findShose.content}</p>
          <p>{findShose.price}</p>
          <Info stock={props.stock} />


          <button className="btn btn-danger" onClick={()=>{props.setStock([9,11,12])}}>주문하기</button> 
          <button className="btn btn-danger" onClick={()=>{history.push('/')}}>메인으로</button> 
        </div>
      </div>
    </div> 
  )
}


function Info(props){
  return(
    <p>재고 : {props.stock[0]}</p>
  )
}