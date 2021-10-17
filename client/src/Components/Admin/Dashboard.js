import React,{useContext} from 'react'
import {AuthContext} from '../../Context/AuthContext'
import '../../assets/css/dashboard.css'


export default function Dashboard() {

     //eslint-disable-next-line
     const {user} = useContext(AuthContext)

     return (
          <div>
               <div className="home">
                    <h1>Bienvenid@ al panel de administracion de ECommerce</h1>
                    <h3>¡Desde aca podes gestionar completamente tu tienda online!</h3>
                    <li>Crear otros usuarios para que gestionen tu tienda</li>
                    <li>Crear publicaciones para tus productos</li>
                    <li>Ver y editar todos tus productos</li>
                    <li>Crear eventos como ofertas, ¡cuando vos quieras!</li>
                    <li>Crear categorias personalizadas para tus articulos</li>
                    <li>Gestionar los envios</li>
                    <li>Ver estadisticas de tus ventas y su recaudacion</li>
               </div>
               {/* <div className="col-md-3 mr-auto row card ">
                    <div className="col-md-12 m-1"><Link to='/registeradmin'>Crear nuevo administrador</Link></div>
                    <div className="col-md-12 m-1"><Link to='/post'>Crear nueva publicacion</Link></div>
                    <div className="col-md-12 m-1"><Link to='/list'>Productos publicados</Link></div>
                    <div className="col-md-12 m-1"><Link to='/categories'>Categorias</Link></div>
                    <div className="col-md-12 m-1"><Link to='/orders'>Envios pendientes</Link></div>
                    <div className="col-md-12 m-1"><Link to='/statistics'>Estadisticas</Link></div>
                    <div className="col-md-12 m-1"><Link to='/events'>Crear evento</Link></div>
               </div> */}
          </div>
     )
}
