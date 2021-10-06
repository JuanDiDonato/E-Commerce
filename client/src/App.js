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


//general components
import Navbar from './Components/Navbar';
import Home from  './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <Router>
        <Navbar/>
        <Route exact path="/" component={Home} />
        <UnPrivateRoute exact path="/login" component={Login} />
        <UnPrivateRoute exact path="/register" component={Register} />
    </Router>
    )
}

export default App;
