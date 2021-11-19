//eslint-disable-next-line
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { ProductContext } from '../Context/ProductContext';
import '../assets/css/cart_ico.css';
import '../assets/css/navbar.css'

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(AuthContext);
  const { itemsToBuy } = useContext(ProductContext)
  const [show, setShow] = useState(false)
  const onClickLogoutHandler = () => {
    AuthService.logout().then(data => {
      if (data.error === false) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  }


  const unauthenticatedNavBar = () => {
    return (
      <>
        {show ?
        <div>
          <div className="nav-element" >
            <Link to="/login"><h4>Iniciar sesion</h4></Link>
          </div>
          <div className="nav-element">
            <Link to="/register"><h4>¡Registrate!</h4></Link>
          </div>
        </div>
        :
        <div>
          <div className="nav-icon">
            <Link to="/login"><i className="fa fa-sign-in fa-2x"></i></Link>
          </div>
          <div className="nav-icon">
            <Link to="/register"><i className="fa fa-id-card-o fa-2x"></i></Link>
          </div>
        </div>}
      </>
    )
  }

  const nav_icons = () => {
    return (
      <div>
        <div className="nav-icon">
          <Link to='/post'><i className="fa fa-plus fa-2x"></i></Link>
        </div>
        <div className="nav-icon">
          <Link to='/events'><i className="fa fa-calendar fa-2x"></i></Link>
        </div>
        <div className="nav-icon">
          <Link to='/orders'><i className="fa fa-paper-plane fa-2x"></i></Link>
        </div>
        <div className="nav-icon">
          <Link to='/list'><i className="fa fa-newspaper-o fa-2x"></i></Link>
        </div>
        <div className="nav-icon">
          <Link to='/categories'><i className="fa fa-tasks fa-2x"></i></Link>
        </div>
        <div className="nav-icon">
          <Link to='/statistics'><i className="fa fa-bar-chart fa-2x"></i></Link>
        </div>
        <div className="nav-icon">
          <Link to='/registeradmin'><i className="fa fa-user fa-2x"></i></Link>
        </div>
      </div>
    )
  }

  const nav_icons_authenticated = () => {
    return (
      <div>
        <div className="nav-icon"><Link to="/" ><i className="fa fa-home fa-2x"></i></Link></div>
        <div className="nav-icon" onClick={onClickLogoutHandler} style={{ cursor: 'pointer' }}>
          <i className="fa fa-sign-out fa-2x"></i>
        </div>
      </div>
    )
  }

  const authenticatedNavBar = () => {
    return (
      <>
        {show ?
          <div>
            <div className="nav-element"><Link to="/" ><h4>Inicio</h4></Link></div>
            <div className="nav-element" 
              onClick={onClickLogoutHandler} style={{ cursor: 'pointer' }}>
                <h4>Salir</h4>
            </div>
          </div>
          : nav_icons_authenticated()}

        {user.id_role === 1 ?
        <div>
          {show ?
          <div>
          <div className="nav-element" >
            <Link to="/buys"><h4>Mis compras</h4></Link>
          </div>
          <div className="nav-element" >
            <Link to="/cart"><h4>Carrito</h4></Link>
          </div>
        </div>
        : 
        <div>
          <div className="nav-icon" >
            <Link to="/buys"><i className="fa fa-history fa-2x"></i></Link>
        </div>
          <div className="sidebar-social">
            <li className="nav-icon">
              <Link to="/cart" className="cart">
                <i className="fa fa-shopping-cart"></i>
                <span id="cart_menu_num" data-action="cart-can">
                  {itemsToBuy}
                </span>
              </Link>
            </li>
          </div>
        </div>
        }
        </div>
          :
          <div>

            {show ?
              <div>
                <div className="nav-element">
                  <Link to='/post'><h4>Crear nueva publicacion</h4></Link>
                </div>
                <div className="nav-element">
                  <Link to='/events'><h4>Crear evento</h4></Link>
                </div>
                <div className="nav-element">
                  <Link to='/orders'><h4>Envios pendientes</h4></Link>
                </div>
                <div className="nav-element">
                  <Link to='/list'><h4>Productos publicados</h4></Link>
                </div>
                <div className="nav-element">
                  <Link to='/categories'><h4>Categorias</h4></Link>
                </div>
                <div className="nav-element">
                  <Link to='/statistics'><h4>Estadisticas</h4></Link>
                </div>
                <div className="nav-element">
                  <Link to='/registeradmin'><h4>Crear nuevo administrador</h4></Link>
                </div>
              </div>
              : nav_icons()}
          </div>}


      </>
    )
  }

  const show_nav = () => {
    if (show === false) {
      setShow(true);
      const nav = document.getElementById('navBarLeft');
      nav.classList.remove('move-reverse');
      nav.classList.add('move');
    } else {
      setShow(false);
      const nav = document.getElementById('navBarLeft');
      nav.classList.add('move-reverse')
      nav.classList.remove('move');
    }
  }
  //eslint-disable-next-line no-restricted-globals 
  if (screen.width < 600) {
    return (
      <div>
        <nav className='nav-format' id="navBarLeft">
          <div className="nav-group" >
            {!isAuthenticated ?
              <div className="nav-icon">
                <Link to="/" ><i className="fa fa-shopping-bag"> TIENDA</i></Link>
              </div>
              
              :
              <div>
                {show ?
                  <div className="nav-element">
                    <Link to="/">
                      <h4 style={{ fontSize: '150%', cursor: 'pointer' }}>{user.fullname}</h4>
                    </Link>
                  </div>
                  : null}
              </div>
            }
            <div >
              {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
            </div>
          </div>
        </nav>
        <div>
          {/* eslint-disable-next-line no-restricted-globals */}
          {screen.width < 600 ?
            <div>
              {show ?
                <div className="exp exp-color-show">
                  <i className="fa fa-times fa-2x" onTouchStart={show_nav}></i>
                </div>
                :
                <div className="exp exp-color-hidden">
                  <i className="fa fa-bars fa-2x" onTouchStart={show_nav}></i>
                </div>}
            </div>
            : null}
        </div>
      </div>
    )

  } else {
    return (

      <div>
        <nav className='nav-format' id="navBarLeft" 
          onMouseEnter={() => show_nav()} onMouseLeave={() => show_nav()}>

          <div className="nav-group" >
            {!isAuthenticated ?
            <div className="nav-icon">
                <Link to="/" ><i className="fa fa-shopping-bag fa-2x"></i></Link>
            </div>
              
              :
              <div>
                {show ?

                  <div className="nav-element"><h4 style={{ fontSize: '150%', cursor: 'pointer' }}>
                    {user.fullname}</h4>
                  </div>
                  : null}
              </div>
            }
            <div >
              {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
            </div>
          </div>
        </nav>
      </div>

    )

  }

}

export default Navbar;
