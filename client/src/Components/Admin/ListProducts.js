import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import AdminServices from '../../Services/AdminServices'

export default function ListProducts(props) {
     let history = useHistory();
     //eslint-disable-next-line
     const [products, setProducts] = useState([])

     useEffect(() => {
          AdminServices.products().then(data => {
               setProducts(data)
               console.log(data);
          })
     }, [])

     // const delete_product = (id_product) => {
     //      AdminServices.delete(id_product).then(data => {
     //           console.log(data);
     //           AdminServices.products().then(data => {
     //                setProducts(data)
     //           })
     //      })
     // }

     const change_status = (id_product, status) => {
          if(status === 0){
               let disable = 1
               AdminServices.disable(disable,id_product).then(data => {
                    console.log(data);
                    AdminServices.products().then(data => {
                         setProducts(data)
                    })
               })
          }else{
               let disable = 0
               AdminServices.disable(disable,id_product).then(data => {
                    console.log(data);
                    AdminServices.products().then(data => {
                         setProducts(data)
                    })
               })
          }
     }

     const view = (id_product) => {
          props.history.push("/product/" + id_product);
     }

     const edit_product = (id_product) => {
          history.push('/edit/'+id_product)
     }
     if(products.length === 0){
          return(
               <div className="container mx-auto text-center  mt-5">
                    <h2>¡Aun no hay publicaciones!</h2>
               </div>
          )
     }else{
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
                                        <th scope="col">Stock</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col" className="text-warning">Ver</th>
                                        <th scope="col" className="text-primary">Editar</th>
                                        <th scope="col" className="text-danger">Cambiar estado</th>
                                   </tr>
                              </thead>
                               <tbody>
                                   
                                   {products.map(product => {
                                        return(
                                        <tr key={product.id_product} className="text-center">
                                             <th scope="row">{product.id_product}</th>
                                             <th scope="row">{product.title}</th>
                                             <th scope="row">{product.categories ? product.categories : 'Sin categoria'}</th>
                                             <th scope="row">${product.price}</th>
                                             <th scope="row">{product.stock}</th>
                                             <th scope="row">{product.disable === 0 ? 'Activo' : 'Deshabilitado'}</th>
                                             <th scope="row"><i style={{cursor:'pointer'}} onClick={() => view(product.id_product)} className="fa fa-plus"></i></th>
                                             <th scope="row"><i style={{cursor:'pointer'}} onClick={() => edit_product(product.id_product)} className="fa fa-pencil"></i></th>
                                             <th scope="row">{product.disable === 0 ? <i style={{cursor:'pointer'}} onClick={() => change_status(product.id_product, product.disable)} className="fa fa-minus"></i> 
                                             : <i style={{cursor:'pointer'}} onClick={() => change_status(product.id_product, product.disable)} className="fa fa-plus"></i>}</th>
                                        </tr>
                                        ) 
                                   })}
                                   
                              </tbody> 
                         </table>
                    </div>
               </div>
          )
     }

     
}
