import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ProductProvider from './Context/ProductContext';
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
import Endpage from './Components/Client/Endpage'

//Admin components
import RegisterAdmin from './Components/Admin/RegisterAdmin'
import CreatePost from './Components/Admin/CreatePost'
import ListProducts from './Components/Admin/ListProducts';
import EditProduct from './Components/Admin/EditProduct'
import Categories from './Components/Admin/Categories'
import Orders from './Components/Admin/Orders'



function App() {
  return (
    <Router>
        <ProductProvider>
          <Navbar/>
          <PrivateRoute exact path="/product/:id_product" id_role={[1,2]} component={Product}/>
          <PrivateRoute exact path="/cart" id_role={[1]} component={Cart}/>
        </ProductProvider>
        
        <Route exact path="/" component={Index} />
        <UnPrivateRoute exact path="/login" component={Login} />
        <UnPrivateRoute exact path="/register" component={Register} />
        
        
        <PrivateRoute exact path="/endpage" id_role={[1]} component={Endpage}/>

        <PrivateRoute exact path="/registeradmin" id_role={[2]} component={RegisterAdmin}/>
        <PrivateRoute exact path="/post" id_role={[2]} component={CreatePost}/>
        <PrivateRoute exact path="/list" id_role={[2]} component={ListProducts}/>
        <PrivateRoute exact path="/edit/:id_product" id_role={[2]} component={EditProduct}/>
        <PrivateRoute exact path="/categories" id_role={[2]} component={Categories}/>
        <PrivateRoute exact path="/orders" id_role={[2]} component={Orders}/>
    </Router>
    )
}

export default App;
