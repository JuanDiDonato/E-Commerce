import React, { useState, useEffect, useRef } from 'react'
import Message from '../../Components/Message';
import AdminServices from '../../Services/AdminServices'

export default function Event_register(props) {

     const [products, setProducts] = useState([])
     const [event, setEvent] = useState({ event_name: "", discount: "", from_date: "", to_date: "" });
     //eslint-disable-next-line
     const [ids, setIds] = useState([])
     //eslint-disable-next-line
     const [message, setMessage] = useState(null);
     let timerID = useRef(null);

     useEffect(() => {
          AdminServices.products().then(data => {
               setProducts(data)
          })
          return () => {
               clearTimeout(timerID);
          }
     }, []);

     const onChange = e => {
          setEvent({ ...event, [e.target.name]: e.target.value });
     }

     const onSubmit = e => {
          e.preventDefault();
          AdminServices.add_event(event,ids).then(data => {
               console.log(data);
               
          })
     }

     const add_id = (status, id_product) => {
          if(status === true){
               ids.push(id_product)
          }
          if(status === false){
               const index = ids.indexOf(id_product)
               ids.splice(index, 1)
          }
     }

     const view = (id_product) => {
          props.history.push("/product/" + id_product);
     }

     return (
          <div className="ml-1 mr-1 z-1">
               <div className="container mt-3">{message ? <Message message={message} /> : null}</div>
               <div className="row mt-5 p-3">
                    <div className="col-md-8 mx-auto text-center">
                         <div className="card  border-warning">
                              <div className="card-header ">
                                   <h2 className=" mt-1">Crear evento</h2>
                              </div>
                              <div className="card-body">
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
                                             <h4> Selecciona los productos afectados</h4>
                                             <div>
                                                  <div className="col-md-12 mx-auto mt-3">
                                                       <table className="table">
                                                            <thead>
                                                                 <tr className="text-center">
                                                                      <th scope="col">Id</th>
                                                                      <th scope="col">Titulo</th>
                                                                      <th scope="col">Categoria</th>
                                                                      <th scope="col">Precio</th>
                                                                      <th scope="col">Stock</th>
                                                                      <th scope="col">Ver</th>
                                                                      <th scope="col" className="text-danger">Seleccionar</th>
                                                                 </tr>
                                                            </thead>
                                                            <tbody>

                                                                 {products.map(product => {
                                                                      return (
                                                                           <tr key={product.id_product} className="text-center">
                                                                                <th scope="row">{product.id_product}</th>
                                                                                <th scope="row">{product.title}</th>
                                                                                <th scope="row">{product.categories ? product.categories : 'Sin categoria'}</th>
                                                                                <th scope="row">${product.price}</th>
                                                                                <th scope="row">{product.stock}</th>
                                                                                <th scope="row"><i style={{ cursor: 'pointer' }} onClick={() => view(product.id_product)} className="fa fa-plus"></i></th>
                                                                                <th scope="row"><input type="checkbox" name="select_discount"  onClick={(e) => add_id(e.target.checked, product.id_product)}/></th>
                                                                           </tr>
                                                                      )
                                                                 })}

                                                            </tbody>
                                                       </table>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="form-group">
                                             <button className="btn col-12 btn-outline-warning btn-block" type="submit"><h5>Guardar</h5></button>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}