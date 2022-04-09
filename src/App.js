/* eslint-disable */
import React from 'react';
import { Navbar,Container,Nav } from 'react-bootstrap';
import {useState , lazy, Suspense} from 'react';
import {Link,Route,Switch} from 'react-router-dom';
import axios from 'axios';

import Product from './Product';
//import Detail from './Detail';
let Detail = lazy(()=>{return import('./Detail.js')});
import Cart from './Cart';
import './App.css';
import Data from './data.js';

export let stockContext = React.createContext();//같은 변수값을 공융할 범위발생

function App() {

  let [shoes, setShoes] = useState(Data);
  let [stock, setStock] = useState([10,11,12,13,14,15]);

  return (
    <div className="App">
      <Switch>

        <Route exact path="/">
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">shoeShop</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
                  <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="background">
            <h1>20% Season Off</h1>
            <Button variant="primary">Primary</Button>
          </div>

          <div className="container">
            <stockContext.Provider value={stock}>
              <div className="row">
                {
                  shoes.map((data,i)=>{
                    return <Product shoes={data} i={i} key={i} />
                  })
                }
              </div>
            </stockContext.Provider>
            <Button variant="primary" onClick={()=>{
              
              
              
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                // json 을 object형으로 자동으로 만들어줌
                // fetch는 안바꿔줌.
                console.log(result.data);
                
                setShoes([...shoes, ...result.data]);

              })
              .catch(()=>{
                console.log('실패')
              })

            }}>더보기</Button>
          </div>
        </Route>
        
        <Route path="/detail/:id">
          <stockContext.Provider value={stock}>
            <Suspense fallback={<div>로딩중이에요</div>}>
              <Detail shoes={shoes} stock={stock} setStock={setStock}/>
            </Suspense>
          </stockContext.Provider>
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>
        
      </Switch>        
    </div>
  );
}

export default App;
