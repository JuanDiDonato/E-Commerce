import React, { useState, useEffect } from 'react'
import AdminServices from '../../Services/AdminServices'

export default function ListProducts(props) {

     const [products, setProducts] = useState([])

     useEffect(() => {
          AdminServices.products().then(data => {
               setProducts(data)
          })

     }, [])

     const delete_product = (id_product) => {
          AdminServices.delete(id_product).then(data => {
               console.log(data);

               AdminServices.products().then(data => {
                    setProducts(data)
               })
          })
     }

     const view = (id_product) => {
          props.history.push("/product/" + id_product);
     }

     return (
          <div>
               <div>
                    <h2>Productos publicados</h2>
               </div>
               <div className="container col-md-10 mx-auto mt-5">
                    <table className="table">
                         <thead>
                              <tr className="text-center">
                                   <th scope="col">Id</th>
                                   <th scope="col">Titulo</th>
                                   <th scope="col">Categoria</th>
                                   <th scope="col">Precio</th>
                                   <th scope="col" className="text-warning">Ver</th>
                                   <th scope="col" className="text-primary">Editar</th>
                                   <th scope="col" className="text-danger">Borrar</th>
                              </tr>
                         </thead>
                         <tbody>
                              {products.map(product => {
                                   return(
                                   <tr key={product.id_product} className="text-center">
                                        <th scope="row">{product.id_product}</th>
                                        <th scope="row">{product.title}</th>
                                        <th scope="row">{product.categories}</th>
                                        <th scope="row">${product.price}</th>
                                        <th scope="row"><i style={{cursor:'pointer'}} onClick={() => view(product.id_product)} className="fa fa-plus"></i></th>
                                        <th scope="row"><i style={{cursor:'pointer'}} className="fa fa-pencil"></i></th>
                                        <th scope="row"><i style={{cursor:'pointer'}} onClick={() => delete_product(product.id_product)} className="fa fa-trash"></i></th>
                                   </tr>
                                   )
                              })}
                              
                         </tbody>
                    </table>
               </div>
          </div>
     )
}
