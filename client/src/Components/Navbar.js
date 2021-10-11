//eslint-disable-next-line
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { ProductContext } from '../Context/ProductContext';
import '../assets/css/css.css';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(AuthContext);
  const { itemsToBuy } = useContext(ProductContext)
  const onClickLogoutHandler = () => {
    AuthService.logout().then(data => {
      if (data.error === false) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  }
  console.log(user);
  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link to="/login" className="nav-link">
          <h5 className="text-light" style={{ display: 'inline' }}> <i className="fa fa-sign-in" aria-hidden="true"></i> Iniciar Sesion</h5>
        </Link>
        <Link to="/register" className="nav-link">
          <h5 className="text-light" style={{ display: 'inline' }}><i className="fa fa-id-card-o" aria-hidden="true"></i> ¡Registrate!</h5>
        </Link>
      </>
    )
  }

  const authenticatedNavBar = () => {
    return (
      <>

        <Link to="/" className="nav-link">
          <div className="text-light" ><h5><i className="fa fa-home" aria-hidden="true"></i> Inicio</h5></div>
        </Link>
        <Link to="/buys" className="nav-link">
          <div className="text-light" ><h5>Mis Compras</h5></div>
        </Link>
        {user.id_role === 1 ?
          <div className="cart-menu align-items-center d-flex">
            <div className="sidebar-social">
              <li>
                <Link to="/cart" className="cart"><i className="fa fa-shopping-cart mr-1 text-light" aria-hidden="true"></i>
                  <span id="cart_menu_num" data-action="cart-can" className="text-warning">{itemsToBuy}</span>
                </Link>
              </li>
            </div>
          </div>
          : null}

        <div className="nav-link text-light cerrar" onClick={onClickLogoutHandler}><h5><i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar sesión </h5></div>
      </>
    )
  }

  return (
    <nav className=" navbar navbar-expand-lg navbar-dark bg-warning">
      <div className="container container-fluid">

        {!isAuthenticated ? <Link to="/" className="navbar-brand fuente"><h4>E-commerce</h4></Link> : <div className="navbar-brand fuente"><h4>{user.fullname}</h4></div>}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}

        </div>
      </div>
    </nav>
  )
}

export default Navbar;