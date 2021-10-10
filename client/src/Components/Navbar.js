//eslint-disable-next-line
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { ProductContext } from '../Context/ProductContext';


const Navbar = () =>{
    const {isAuthenticated,setIsAuthenticated,setUser,user} = useContext(AuthContext);
    const { itemsToBuy } = useContext(ProductContext)
    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(data=>{
            if(data.error === false){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    const unauthenticatedNavBar = ()=>{
        return (
            <> 
                <Link to="/login" className="nodecoracion">
                    <li className="nav-item nav-link">
                    <h5 style={{display: 'inline'}}> <i className="fa fa-sign-in" aria-hidden="true"></i> Iniciar Sesion</h5>
                    </li>
                </Link>  
                <Link to="/register" className="nodecoracion">
                    <li className="nav-item nav-link">
                    <h5 style={{display: 'inline'}}><i className="fa fa-id-card-o" aria-hidden="true"></i> ¡Registrate!</h5>
                    </li>
                </Link>  
            </>
        )
    }

    const authenticatedNavBar = ()=>{
        return(
            <>

                <Link to="/" className="nodecoracion">
                    <div className="nav-item nav-link" ><i className="fa fa-home" aria-hidden="true"></i> Inicio</div>
                </Link>  
                {user.id_role === 1 ?
                <div className='sidebar-social'>
                    <Link to='/cart' className="nav-item nav-link" type="button">{itemsToBuy}<i className="fa fa-shopping-cart mr-1" aria-hidden="true"></i></Link>
                </div>
                    
                : null}
                

                <div className="nav-item nav-link" type="button" onClick={onClickLogoutHandler}><i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar sesión </div>
            </>
        )
    }
    return(
    
        <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
            <div className="container">
           
                <div className="navbar-brand fuente">E-commerce</div>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
      aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav ml-auto">
                    { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
                </ul>
            </div>
            </div>
            
        </nav>
    )
}

export default Navbar;