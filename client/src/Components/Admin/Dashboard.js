import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'



export default function Dashboard() {

     //eslint-disable-next-line
     const {user} = useContext(AuthContext)

     return (
          <div className="col-md-10 container text-center mt-5">
               <div className="m-3" >
                    <h2>Bienvenid@ al panel de administracion de ECommerce</h2>
               </div>
               <div className="col-md-12 row mx-auto">
                    <div className="card col-md-4 p-1 "><Link to='/registeradmin'>Crear nuevo administrador</Link></div>
                    <div className="card col-md-4 p-1  "><Link to='/post'>Crear nueva publicacion</Link></div>
                    <div className="card col-md-4 p-1  "><Link to='/list'>Productos publicados</Link></div>
                    <div className="card col-md-4 p-1  "><Link to='/categories'>Categorias</Link></div>
                    <div className="card col-md-4 p-1  "><Link to='/orders'>Envios pendientes</Link></div>
                    <div className="card col-md-4 p-1  "><Link to='/statistics'>Estadisticas</Link></div>
               </div>
          </div>
     )
}
