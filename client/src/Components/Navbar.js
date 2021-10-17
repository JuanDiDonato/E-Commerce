//eslint-disable-next-line
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { ProductContext } from '../Context/ProductContext';
import '../assets/css/cart_ico.css';
import '../assets/css/navbar.css'

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

  const authenticatedNavBar = () => {
    return (
      <>

        <div className="nav-element"><Link to="/" ><h4><i className="fa fa-home" aria-hidden="true"></i> Inicio</h4></Link></div>

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
            <div className="nav-element"><Link to='/registeradmin'><h4>Crear nuevo administrador</h4></Link></div>
            <div className="nav-element"><Link to='/post'><h4>Crear nueva publicacion</h4></Link></div>
            <div className="nav-element"><Link to='/list'><h4>Productos publicados</h4></Link></div>
            <div className="nav-element"><Link to='/categories'><h4>Categorias</h4></Link></div>
            <div className="nav-element"><Link to='/orders'><h4>Envios pendientes</h4></Link></div>
            <div className="nav-element"><Link to='/statistics'><h4>Estadisticas</h4></Link></div>
            <div className="nav-element"><Link to='/events'><h4>Crear evento</h4></Link></div>
          </div>}

        <div className="nav-element" onClick={onClickLogoutHandler}><h4><i className="fa fa-sign-out" ></i> Cerrar sesión </h4></div>
      </>
    )
  }

  return (
    <nav className='nav-format'>
      <div className="nav-group">
        {!isAuthenticated ? <Link to="/" ><h4>E-commerce</h4></Link> : <div className="nav-element"><h4 style={{fontSize :'150%'}}>{user.fullname}</h4></div>}
        <div >
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;