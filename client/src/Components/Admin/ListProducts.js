import React, { useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import AdminServices from '../../Services/AdminServices'
import ProductService from '../../Services/ProductService'
import { AdminContext } from '../../Context/AdminContext'
import '../../assets/css/table.css'
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
               <div className="form">
                    <div>
                         <h1>Productos publicados</h1>
                    </div>
                    <div >
                         <h2>Categorias</h2>
                         <select className="form-control" onClick={e => SearchByCategory(products,e.target.value)}  name="categories">
                              <option value=''></option>
                              {categories.map(category => {
                                   return (
                                        <option key={category.category}  value={category.category}>{category.category}</option>
                                   )
                              })}
                         </select>
                    </div>
                    <div>
                         <table className="table ">
                              <thead>
                                   <tr className="" >
                                        <th scope="col" data-label='Id'>Id</th>
                                        <th scope="col" data-label='Titulo'>Titulo</th>
                                        <th scope="col" data-label='Categoria'>Categoria</th>
                                        <th scope="col" data-label='Precio'>Precio Original</th>
                                        <th scope="col" data-label='Precio con descuento'>Precio Descuento</th>
                                        <th scope="col" data-label='Stock'>Stock</th>
                                        <th scope="col" data-label='Estado'>Estado</th>
                                        <th scope="col" data-label='Ver' className="text-warning">Ver</th>
                                        <th scope="col" data-label='Editar' className="text-primary">Editar</th>
                                        <th scope="col" data-label='Cambiar estado' className="text-danger">Cambiar estado</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {results.map(product => {
                                        let from_date = moment(product.from_date).utc()
                                        let to_date = moment(product.to_date).utc()
                                        return (
                                             <tr key={product.id_product} className="table-grid" >
                                                  <td >{product.id_product}</td>
                                                  <td  className="text-center">{product.title}</td>
                                                  <td>{product.categories ? product.categories : 'Sin categoria'}</td>
                                                  <td>${product.price}</td>
                                                  {!product.event ?
                                                       <td>${product.price}</td>
                                                       :
                                                       <td style={{textAlign: 'center'}} >
                                                            {from_date < date && date < to_date ?
                                                                 '$'+Intl.NumberFormat().format(product.price - (product.price * product.discount))
                                                                 :
                                                                 '$'+product.price
                                                            }
                                                       </td>
                                                  }
                                                  {product.stock === 0 ? <td  className="text-danger">{product.stock}</td> : <td >{product.stock}</td>}
                                                  
                                                  <td>{product.disable === 0 ? 'Activo' : 'Oculto'}</td>
                                                  
                                                  <td  className="icons btn-actions "><i style={{ cursor: 'pointer' }} onClick={() => view(product.id_product)} className="fa fa-plus"></i></td>
                                                  <td  className="icons btn-actions"><i style={{ cursor: 'pointer' }} onClick={() => edit_product(product.id_product)} className="fa fa-pencil"></i></td>
                                                  <td  className="icons btn-actions">{product.disable === 0 ? <i style={{ cursor: 'pointer' }} onClick={() => change_status(product.id_product, product.disable)} className="fa fa-minus"></i>
                                                       : <i style={{ cursor: 'pointer' }} onClick={() => change_status(product.id_product, product.disable)} className="fa fa-plus"></i>}</td>
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
