import React, { useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import AdminServices from '../../Services/AdminServices'
import ProductService from '../../Services/ProductService'
import { AdminContext } from '../../Context/AdminContext'
import '../../assets/css/table.css'
//Moment
import moment from 'moment'
import 'moment/locale/es'
//Tabla
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

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
               setProducts(data)
               setResults(data)
               // let i = 0
               // data.forEach(element => {
               //      if (element.id !== i) {
               //           results.push(element)
               //           i = element.id_product
               //      }
               // });
               // setProducts(results)
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
          let disable;
          if(status === 0) disable = 1; else{disable = 0};
          AdminServices.disable(disable, id_product)
          ProductService.get_all().then(data => {
               setProducts(data)
               setResults(data)
          })
     }
     const view = (id_product) => {
          props.history.push("/product/" + id_product);
     }

     const edit_product = (id_product) => {
          history.push('/edit/' + id_product)
     }

     const SearchByCategory = (category,products) => {
          let products_not_null = []
          // eslint-disable-next-line
          products.map(product => {
               if(product.categories){
                    products_not_null.push(product)
               }
          })
          const FilterByCategory = products_not_null.filter(product =>  product.categories.toLowerCase().includes(category.toLowerCase()))
          
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
                         <select className="form-control" onClick={e => SearchByCategory(e.target.value,products)}  name="categories">
                              <option value=''></option>
                              {categories.map(category => {
                                   return (
                                        <option key={category.category}  value={category.category}>{category.category}</option>
                                   )
                              })}
                         </select>
                    </div>
                    <div>
                         <Table className="table">
                              <Thead>
                                   <Tr >
                                        <Th scope="col" data-label='Id'>Id</Th>
                                        <Th scope="col" data-label='Titulo'>Titulo</Th>
                                        <Th scope="col" data-label='Categoria'>Categoria</Th>
                                        <Th scope="col" data-label='Precio'>Precio Original</Th>
                                        <Th scope="col" data-label='Precio con descuento'>Precio Descuento</Th>
                                        <Th scope="col" data-label='Stock'>S</Th>
                                        <Th scope="col" data-label='Stock'>M</Th>
                                        <Th scope="col" data-label='Stock'>L</Th>
                                        <Th scope="col" data-label='Stock'>XL</Th>
                                        <Th scope="col" data-label='Stock'>XXL</Th>
                                        <Th scope="col" data-label='Stock'>XXXL</Th>
                                        <Th scope="col" data-label='Estado'>Estado</Th>
                                        <Th scope="col" data-label='Ver' className="text-warning">Ver</Th>
                                        <Th scope="col" data-label='Editar' className="text-primary">Editar</Th>
                                        <Th scope="col" data-label='Cambiar estado' className="text-danger">Cambiar estado</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {results.map(product => {
                                        console.log(product);
                                        return (
                                             <Tr key={product.id} >
                                                  <Td >{product.id}</Td>
                                                  <Td>{product.title}</Td>
                                                  <Td>{product.categories ? product.categories : 'Sin categoria'}</Td>
                                                  <Td>${product.price}</Td>
                                                  {product.id_event == null ?
                                                       <Td>${product.price}</Td>
                                                       :
                                                       <Td>
                                                            {moment(product.Event.from_date).utc() < date && date < moment(product.Event.to_date).utc() ?
                                                                 '$'+Intl.NumberFormat().format(product.price - (product.price * product.Event.discount))
                                                                 :
                                                                 '$'+product.price
                                                            }
                                                       </Td>
                                                  }
                                                  <Td>{product.Waist.S}</Td>
                                                  <Td>{product.Waist.M}</Td>
                                                  <Td>{product.Waist.L}</Td>
                                                  <Td>{product.Waist.XL}</Td>
                                                  <Td>{product.Waist.XXL}</Td>
                                                  <Td>{product.Waist.XXXL}</Td>
                                                  
                                                  <Td>{product.disable === 0 ? 'Activo' : 'Oculto'}</Td>
                                                  
                                                  <Td  ><i style={{ cursor: 'pointer' }} onClick={() => view(product.id)} className="fa fa-plus"></i></Td>
                                                  <Td ><i style={{ cursor: 'pointer' }} onClick={() => edit_product(product.id)} className="fa fa-pencil"></i></Td>
                                                  <Td>{product.disable === 0 ? <i style={{ cursor: 'pointer' }} onClick={() => change_status(product.id, product.disable)} className="fa fa-minus"></i>
                                                       : <i style={{ cursor: 'pointer' }} onClick={() => change_status(product.id, product.disable)} className="fa fa-plus"></i>}</Td>
                                             </Tr>
                                        )
                                   })}

                              </Tbody>
                         </Table>
                    </div>
               </div>
          )
     }


}
