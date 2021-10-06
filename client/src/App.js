import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
        <Navbar/>
        <Route exact path="/" component={Navbar} />
    </Router>
    )
}

export default App;
