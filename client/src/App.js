import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//import of CSS
import './assets/css/bootstrap.min.css';
import './assets/css/font-awesome.css'
import './assets/css/font-awesome.min.css'

//import of JS
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';



import Navbar from './Components/Navbar';
import Home from  './Components/Home';

function App() {
  return (
    <Router>
        <Navbar/>
        <Route exact path="/" component={Home} />
    </Router>
    )
}

export default App;
