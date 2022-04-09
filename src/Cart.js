import React from 'react'
import {Table,Alert} from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';

function Cart(props) {
  
  let state = useSelector((state)=> state ) ;// store에 담긴 state 더 쉽게 꺼내쓰는 방법
  console.log(state);

  let dispatch = useDispatch();
  return (
      <div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>상품명</th>
              <th>수량</th>
              <th>변경</th>
            </tr>
          </thead>
          <tbody>
            {
              state.reducer.map((item,i)=>{
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.quan}</td>
                    <td>
                      <button onClick={()=>{dispatch({type:'quanAdd',payload:item.id})}}>+</button>
                      <button onClick={()=>{dispatch({type:'quanMinus',payload:item.id})}}>-</button>
                    </td>
                  </tr>
                  
                )
              })
            }
           
            
          </tbody>
        </Table>
        {
          state.reducer2 &&
          <Alert variant="success">
            <Alert.Heading>지금 구매하시면 신규할인 20%</Alert.Heading>
            <p>
              기회를 놓치지 마세요!
            </p>
            <button onClick={()=>{dispatch({type:'alertClose'})}}>닫기</button>
          </Alert>
        }

      </div>

  )
}


// function stateToprops(state){ // redux store 데이터를 가져와서 props로 변환해주는 함수
//   return{
//     state : state.reducer,
//     alertState : state.reducer2
//   }
// }

//export default connect(stateToprops)(Cart)
export default connect()(Cart)