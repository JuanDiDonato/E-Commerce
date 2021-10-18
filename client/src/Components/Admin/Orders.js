//eslint-disable-next-line
import React, { useState, useEffect, useContext } from 'react'
import AdminServices from '../../Services/AdminServices'


export default function Orders(props) {

     const [orders, setOrders] = useState([])

     useEffect(() => {
          AdminServices.get_orders().then(data => {
               setOrders(data)
          })
     }, [])

     const end_order = (id_order) => {
          AdminServices.end_order(id_order).then(data => {
               if(data.error === false){
                    AdminServices.get_orders().then(data => {
                         setOrders(data)
                    })
               }
          })
     }

     const view = (id_product) => {
          props.history.push("/product/" + id_product);
     }

     return (
          <div className="form">
               <div>
                    <div>
                         <h1>Envios pendientes</h1>
                    </div>

                    <div >
                         <table className="table-orders">
                              <thead>
                                   <tr>
                                        <th scope="col">ID del pedido</th>
                                        <th scope="col" className="text-primary">Cliente</th>
                                        <th scope="col" className="text-primary">Direccion de envio</th>
                                        <th scope="col" className="text-danger">ID del producto</th>
                                        <th scope="col" className="text-danger">Cantidad</th>
                                        <th scope="col" className="text-danger">Finalizar Pedido</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        orders.map(order => {
                                             console.log(orders);
                                             return (
                                                  <tr key={order.id_order}>
                                                       <th scope="col">{order.id_order}</th>
                                                       <th scope="col" className="text-primary">{order.fullname}</th>
                                                       <th scope="col" className="text-primary">{order.address}</th>
                                                       <th scope="col" className="text-primary" style={{cursor:'pointer', color : 'rgba(255, 0, 55, 1)', fontStyle : 'italic'}} onClick={() => view(order.id_product)}>Ver {order.id_product}</th>
                                                       <th scope="col" className="text-primary">{order.quantity} Unidad/es</th>
                                                       <th scope="col" className="btn-order" style={{cursor:'pointer'}} onClick={() => end_order(order.id_order)}>Finalizar Pedido</th>
                                                  </tr>
                                             )
                                        })
                                   }
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     )
}
