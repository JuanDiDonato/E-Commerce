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
        <Link to="/login" >
          <div className="nav-element">
            <h4><i className="fa fa-sign-in" aria-hidden="true"></i> Iniciar Sesion</h4>
          </div>
        </Link>
        <Link to="/register" >
          <div className="nav-element">
            <h4 ><i className="fa fa-id-card-o" aria-hidden="true"></i> ¡Registrate!</h4>
          </div>
        </Link>
      </>
    )
  }

  const nav_icons = () => {
    return (
      <div>
        <div className="nav-icon"><Link to='/post'><i className="fa fa-plus fa-2x"></i></Link></div>
        <div className="nav-icon"><Link to='/events'><i className="fa fa-calendar fa-2x"></i></Link></div>
        <div className="nav-icon"><Link to='/orders'><i className="fa fa-paper-plane fa-2x"></i></Link></div>
        <div className="nav-icon"><Link to='/list'><i className="fa fa-newspaper-o fa-2x"></i></Link></div>
        <div className="nav-icon"><Link to='/categories'><i className="fa fa-tasks fa-2x"></i></Link></div>
        <div className="nav-icon"><Link to='/statistics'><i className="fa fa-bar-chart fa-2x"></i></Link></div>
        <div className="nav-icon"><Link to='/registeradmin'><i className="fa fa-user fa-2x"></i></Link></div>  
      </div>
    )
  }

  const nav_icons_authenticated = () => {
    return(
      <div>
        <div className="nav-icon"><Link to="/" ><i className="fa fa-home fa-2x"></i></Link></div>
        <div className="nav-icon" onClick={onClickLogoutHandler} style={{ cursor: 'pointer' }}><i className="fa fa-sign-out fa-2x"></i></div>
      </div>
    )
  }

  const authenticatedNavBar = () => {
    return (
      <>
          {show ? 
            <div>
                <div className="nav-element"><Link to="/" ><h4>Inicio</h4></Link></div>
                <div className="nav-element" onClick={onClickLogoutHandler} style={{ cursor: 'pointer' }}><h4>Salir</h4></div>
            </div>
          : nav_icons_authenticated()}

        {user.id_role === 1 ?
          <div className="cart-menu align-items-center d-flex">
            <div className="nav-element" ><Link to="/buys"><h4>Mis Compras</h4></Link></div>
            <div className="sidebar-social">
              <li>
                <Link to="/cart" className="cart"><i className="fa fa-shopping-cart mr-1 text-light" aria-hidden="true"></i>
                  <span id="cart_menu_num" data-action="cart-can" className="text-warning">{itemsToBuy}</span>
                </Link>

              </li>
            </div>

          </div>
          :
          <div>
            {show ? 
            <div>
                <div className="nav-element"><Link to='/post'><h4>Crear nueva publicacion</h4></Link></div>
                <div className="nav-element"><Link to='/events'><h4>Crear evento</h4></Link></div>
                <div className="nav-element"><Link to='/orders'><h4>Envios pendientes</h4></Link></div>
                <div className="nav-element"><Link to='/list'><h4>Productos publicados</h4></Link></div>
                <div className="nav-element"><Link to='/categories'><h4>Categorias</h4></Link></div>
                <div className="nav-element"><Link to='/statistics'><h4>Estadisticas</h4></Link></div>
                <div className="nav-element"><Link to='/registeradmin'><h4>Crear nuevo administrador</h4></Link></div>
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

  return (
    <div>
      <nav className='nav-format' id="navBarLeft" onMouseEnter={() => show_nav()} onMouseLeave={() => show_nav()} >
        <div className="nav-group" >
          {!isAuthenticated ? 
            <Link to="/" ><h4>E-commerce</h4></Link>
            : 
            <div>
                {show ? 
                  
                    <div className="nav-element"><h4 style={{ fontSize: '150%', cursor: 'pointer'}} >{user.fullname}</h4></div> 
                  
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

export default Navbar;