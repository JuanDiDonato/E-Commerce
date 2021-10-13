import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AdminServices from '../../Services/AdminServices';
//Moment
import moment from 'moment'
import 'moment/locale/es'

export default function Events() {

     const [events, setEvents]= useState([])

     useEffect(() => {
          AdminServices.get_events().then(data => {
               setEvents(data)
          })
     }, [])

     return (
          <div className="container mx-auto text-center col-md-10">
               <div>
                    <h2>Crear nuevo evento</h2>
                    <Link to='/new_event' className="btn btn-primary btn-block">Crear</Link>
               </div>
               <hr />
               <div>
                    <h2>Eventos activos</h2>
               </div>
               <div>
                    {events.map(event => {
                         return(
                              <div key={event.id_event}>
                                   <div className="card">
                                        <li>Nombre: {event.event_name}</li>
                                        <li>Descuento: {event.discount * 100}%</li>
                                        <li>Desde: {moment(event.from_date).fromNow()}</li>
                                        <li>Finaliza: {moment(event.to_date).fromNow()}</li>
                                       
                                   </div>
                                   
                              </div>
                         )
                    })}
               </div>
          </div>
     )
}
