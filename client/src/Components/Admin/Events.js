import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import AdminServices from '../../Services/AdminServices';
//Moment
import moment from 'moment'
import 'moment/locale/es'

export default function Events() {
     let history = useHistory();
     const [events, setEvents]= useState([])

     useEffect(() => {
          AdminServices.get_events().then(data => {
               setEvents(data)
          })
          
     }, [])

     const delete_event = (id_event) => {
          AdminServices.delete_event(id_event).then(data => {
               AdminServices.get_events().then(data => {
                    setEvents(data)
               })
          })
     }

     const edit_event = (id_event) => {
          history.push('/edit_event/'+id_event)
     }

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
               {/* eslint-disable-next-line */}
                    {events.map(event => {
                         if(event.id_event !== 0){
                              return(
                                   <div key={event.id_event}>
                                        <div className="card">
                                             <li>Nombre: {event.event_name}</li>
                                             <li>Descuento: {event.discount * 100}%</li>
                                             <li>Desde: {moment(event.from_date).fromNow()}</li>
                                             <li>Finaliza: {moment(event.to_date).fromNow()}</li>
                                             <button className="btn btn-primary m-1" onClick={() => delete_event(event.id_event)}>Borrar</button>
                                             <button className="btn btn-outline-primary m-1"  onClick={() => edit_event(event.id_event)}>Editar</button>
                                        </div>
                                   </div>
                              )
                         }
                         
                    })}
               </div>
          </div>
     )
}
