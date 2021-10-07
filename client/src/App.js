import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//import hocs
//eslint-disable-next-line
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';


//import of CSS
import './assets/css/bootstrap.min.css';
import './assets/css/font-awesome.css'
import './assets/css/font-awesome.min.css'

//import of JS
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';


//General components
import Navbar from './Components/Navbar';
import Index from  './Components/Index';
import Login from './Components/Login';
import Register from './Components/Register';

//Client components
import Cart from './Components/Client/Cart'
import Product from './Components/Client/Product'



function App() {
  return (
    <Router>
        <Navbar/>
        <Route exact path="/" component={Index} />
        <UnPrivateRoute exact path="/login" component={Login} />
        <UnPrivateRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/cart" id_role={[1]} component={Cart}/>
        <PrivateRoute exact path="/product/:id_product" id_role={[1]} component={Product}/>
    </Router>
    )
}

export default App;
