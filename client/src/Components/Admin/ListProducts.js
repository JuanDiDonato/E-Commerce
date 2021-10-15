import React, { useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import AdminServices from '../../Services/AdminServices'
import ProductService from '../../Services/ProductService'
import { AdminContext } from '../../Context/AdminContext'
//Moment
import moment from 'moment'
import 'moment/locale/es'

export default function ListProducts(props) {
     let history = useHistory();
     //eslint-disable-next-line
     const [products, setProducts] = useState([])
     const [date, setDate] = useState()
     //eslint-disable-next-line
     const { categories, setCategories } = useContext(AdminContext)
     //eslint-disable-next-line
     const [results, setResults] = useState([])

     useEffect(() => {
          ProductService.get_all().then(data => {
               let i = 0
               // eslint-disable-next-line
               data.map(element => {
                    if (element.id_product !== i) {
                         results.push(element)
                         i = element.id_product
                    }
               });
               setProducts(results)
          })
          setDate(moment(new Date()).utc())
          //eslint-disable-next-line
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
          if (status === 0) {
               let disable = 1
               AdminServices.disable(disable, id_product).then(data => {
                    AdminServices.products().then(data => {
                         setProducts(data)
                    })
               })
          } else {
               let disable = 0
               AdminServices.disable(disable, id_product).then(data => {
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
          history.push('/edit/' + id_product)
     }

     const SearchByCategory = (products, category) => {
          const FilterByCategory = products.filter((product) => product.categories.toLowerCase().includes(category.toLowerCase()))
          if (category.length > 0) {
               setResults(FilterByCategory)
          } else {
               setResults(products)
          }
     }

     if (products.length === 0) {
          return (
               <div className="container mx-auto text-center  mt-5">
                    <h2>¡Aun no hay publicaciones!</h2>
               </div>
          )
     } else {
          return (
               <div className="container text-center mt-5">
                    <div>
                         <h2>Productos publicados</h2>
                    </div>
                    <div className="form-group col-md-4 mx-auto mt-4">
                         <label htmlFor="exampleFormControlSelect1">Categoria</label>
                         <select className="form-control" onClick={e => SearchByCategory(products,e.target.value)}  name="categories">
                              <option value=''></option>
                              {categories.map(category => {
                                   return (
                                        <option key={category.category}  value={category.category}>{category.category}</option>
                                   )
                              })}
                         </select>
                    </div>
                    <div className="container col-md-10 mx-auto mt-5">
                         <table className="table">
                              <thead>
                                   <tr className="text-center">
                                        <th scope="col">Id</th>
                                        <th scope="col">Titulo</th>
                                        <th scope="col">Categoria</th>
                                        <th scope="col">Precio Original</th>
                                        <th scope="col">Precio Descuento</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col" className="text-warning">Ver</th>
                                        <th scope="col" className="text-primary">Editar</th>
                                        <th scope="col" className="text-danger">Cambiar estado</th>
                                   </tr>
                              </thead>
                              <tbody>

                                   {results.map(product => {
                                        let from_date = moment(product.from_date).utc()
                                        let to_date = moment(product.to_date).utc()
                                        return (
                                             <tr key={product.id_product} >
                                                  <th scope="row">{product.id_product}</th>
                                                  <th scope="row" className="text-center">{product.title}</th>
                                                  <th scope="row">{product.categories ? product.categories : 'Sin categoria'}</th>
                                                  <th scope="row">${product.price}</th>
                                                  {!product.event ?
                                                       <th scope="row">${product.price}</th>
                                                       :
                                                       <th className="text-primary" >
                                                            {from_date < date && date < to_date ?
                                                                 '$'+Intl.NumberFormat().format(product.price - (product.price * product.discount))
                                                                 :
                                                                 <th scope="row">${product.price}</th>}
                                                       </th>}
                                                  {product.stock === 0 ? <th scope="row" className="text-danger">{product.stock}</th> : <th scope="row">{product.stock}</th>}
                                                  
                                                  <th scope="row">{product.disable === 0 ? 'Activo' : 'Deshabilitado'}</th>
                                                  <th scope="row" className="text-center"><i style={{ cursor: 'pointer' }} onClick={() => view(product.id_product)} className="fa fa-plus"></i></th>
                                                  <th scope="row" className="text-center"><i style={{ cursor: 'pointer' }} onClick={() => edit_product(product.id_product)} className="fa fa-pencil"></i></th>
                                                  <th scope="row" className="text-center">{product.disable === 0 ? <i style={{ cursor: 'pointer' }} onClick={() => change_status(product.id_product, product.disable)} className="fa fa-minus"></i>
                                                       : <i style={{ cursor: 'pointer' }} onClick={() => change_status(product.id_product, product.disable)} className="fa fa-plus"></i>}</th>
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
