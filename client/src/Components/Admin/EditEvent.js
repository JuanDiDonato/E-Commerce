import React, { useState, useEffect } from 'react'
import AdminServices from '../../Services/AdminServices';
import Message from '../../Components/Message';

//Moment
import moment from 'moment'
import 'moment/locale/es'

export default function EditEvent(props) {
     const { match: { params } } = props;
     let id_event = params.id_event
     id_event = Number(id_event)

     const [products, setProducts] = useState([])
     const [event, setEvent] = useState({ event_name: "", discount: "", from_date: "", to_date: "" });
     //eslint-disable-next-line
     const [ids, setIds] = useState([])
     //eslint-disable-next-line
     const [message, setMessage] = useState(null);

     useEffect(() => {
          AdminServices.get_event(id_event).then(data => {
               setEvent({ event_name: data[0].event_name, discount: data[0].discount * 100, from_date: moment(data[0].from_date).format('YYYY-MM-DD'), to_date: moment(data[0].to_date).format('YYYY-MM-DD') })
          })
          AdminServices.products().then(data => {
               setProducts(data)
               data.forEach(product => {
                    if (product.event === id_event) {
                         ids.push(product.id_product)
                    }
               });

          })
          // eslint-disable-next-line
     }, [])

     if (id_event === 0) {
          props.history.push('/events')
     }


     const onChange = e => {
          setEvent({ ...event, [e.target.name]: e.target.value });
     }

     const onSubmit = e => {
          e.preventDefault();
          AdminServices.update_event(event, id_event, ids).then(data => {
               console.log(data);
               if (data.error === false) {
                    props.history.push("/events")
               }

          })

     }
     const add_id = (status, id_product) => {
          if (status === true) {
               ids.push(id_product)
          }
          if (status === false) {
               const index = ids.indexOf(id_product)
               ids.splice(index, 1)
          }
     }

     const view = (id_product) => {
          props.history.push("/product/" + id_product);
     }



     return (
          <div className="form">
               <div >{message ? <Message message={message} /> : null}</div>
               <div >
                    <div>
                         <div>
                              <div>
                                   <h1>Editar evento</h1>
                              </div>
                              <div>
                                   <form onSubmit={onSubmit}>
                                        <div className="form-group">
                                             <label htmlFor="text">Nombre</label>
                                             <input type="text" name="event_name" onChange={onChange} value={event.event_name} className="form-control" placeholder="Nombre del evento" />
                                        </div>
                                        <div className="form-group">
                                             <label htmlFor="discount">Descuento</label>
                                             <input type="number" name="discount" onChange={onChange} value={event.discount} className="form-control" placeholder="% de descuento" />
                                        </div>
                                        <div className="form-group">
                                             <label htmlFor="date" className="mt-4 " >Desde</label>
                                             <input type="date" name="from_date" onChange={onChange} value={event.from_date} className="form-control mb-5" placeholder="Fecha de inicio" />
                                        </div>
                                        <div className="form-group">
                                             <label htmlFor="date" className="mt-4 " >Hasta</label>
                                             <input type="date" name="to_date" onChange={onChange} value={event.to_date} className="form-control mb-5" placeholder="Fecha de finalizacion" />
                                        </div>
                                        <div>
                                             <h2> Selecciona los productos afectados</h2>
                                             <div>
                                                  <div>
                                                       <table className="table">
                                                            <thead>
                                                                 <tr className="table-eve-thead">
                                                                      <th scope="col">Id</th>
                                                                      <th scope="col">Titulo</th>
                                                                      <th scope="col">Categoria</th>
                                                                      <th scope="col">Precio</th>
                                                                      <th scope="col">Stock</th>
                                                                      <th scope="col">Ver</th>
                                                                      <th scope="col">Seleccionar</th>
                                                                 </tr>
                                                            </thead>
                                                            <tbody>

                                                                 {products.map(product => {
                                                                      return (
                                                                           <tr key={product.id_product} className="table-eve-body">
                                                                                <th scope="row">{product.id_product}</th>
                                                                                <th scope="row">{product.title}</th>
                                                                                <th scope="row">{product.categories ? product.categories : 'Sin categoria'}</th>
                                                                                <th scope="row">${product.price}</th>
                                                                                <th scope="row">{product.stock}</th>
                                                                                <th scope="row"><i style={{ cursor: 'pointer' }} onClick={() => view(product.id_product)} className="fa fa-plus"></i></th>
                                                                                {product.event === id_event ?
                                                                                     <th scope="row" ><input type="checkbox" defaultChecked={true}  onClick={(e) => add_id(e.target.checked, product.id_product)} /></th>
                                                                                :
                                                                                <th scope="row" ><input type="checkbox" onClick={(e) => add_id(e.target.checked, product.id_product)} /></th>}
                                                                           </tr>
                                                                      )
                                                                 })}

                                                            </tbody>
                                                       </table>
                                                  </div>
                                             </div>
                                        </div>
                                        <button className="btn" type="submit">Guardar</button>
                                        
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}
