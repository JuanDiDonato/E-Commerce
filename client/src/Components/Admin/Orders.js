//eslint-disable-next-line
import React, { useState, useEffect, useContext } from 'react'
import AdminServices from '../../Services/AdminServices'
//Tabla
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


export default function Orders(props) {

     const [orders, setOrders] = useState([])

     useEffect(() => {
          AdminServices.get_orders().then(data => {
               setOrders(data)
          })
     }, [])

     const end_order = (id_order) => {
          AdminServices.end_order(id_order).then(
                    AdminServices.get_orders().then(data => {
                         setOrders(data)
                    })
          )
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
                         <Table className="table">
                              <Thead>
                                   <Tr>
                                        <Th scope="col">ID del pedido</Th>
                                        <Th scope="col" >Cliente</Th>
                                        <Th scope="col" >Direccion de envio</Th>
                                        <Th scope="col" >ID del producto</Th>
                                        <Th scope="col" >Cantidad</Th>
                                        <Th scope="col" >Acciones</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {
                                        orders.map(order => {
                                             console.log(orders);
                                             return (
                                                  <Tr key={order.id_order}>
                                                       <Td scope="col">{order.id_order}</Td>
                                                       <Td scope="col">{order.fullname}</Td>
                                                       <Td scope="col">{order.address}</Td>
                                                       <Td scope="col"  style={{cursor:'pointer', color : 'rgba(255, 0, 55, 1)', fontStyle : 'italic'}} onClick={() => view(order.id_product)}>Ver {order.id_product}</Td>
                                                       <Td scope="col">{order.quantity} Unidad/es</Td>
                                                       <Td scope="col" className="btn-order" style={{cursor:'pointer'}} onClick={() => end_order(order.id_order)}>Finalizar Pedido</Td>
                                                  </Tr>
                                             )
                                        })
                                   }
                              </Tbody>
                         </Table>
                    </div>
               </div>
          </div>
     )
}
