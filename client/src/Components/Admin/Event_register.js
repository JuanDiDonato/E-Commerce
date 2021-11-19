import React, { useState, useEffect, useRef, useContext } from 'react'
import Message from '../../Components/Message';
import AdminServices from '../../Services/AdminServices'
import { AdminContext } from '../../Context/AdminContext'
//Tabla
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'


export default function Event_register(props) {

     const [products, setProducts] = useState([])
     const [event, setEvent] = useState({ event_name: "", discount: "", from_date: "", to_date: "" });
     //eslint-disable-next-line
     const [ids, setIds] = useState([])
     //eslint-disable-next-line
     const [message, setMessage] = useState(null);
     const [results, setResults] = useState([])
     //eslint-disable-next-line
     const { categories, setCategories } = useContext(AdminContext)
     let timerID = useRef(null);

     useEffect(() => {
          AdminServices.products().then(data => {
               setProducts(data)
               setResults(data)
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
          AdminServices.add_event(event, ids).then(data => {
               console.log(data);
               if (data.error === false) {
                    props.history.push("/events")
               }

          })


     }

     const SearchByCategory = (products, category) => {
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
               <div>{message ? <Message message={message} /> : null}</div>
               <div >
                    <div>
                         <div>
                              <div>
                                   <h1>Crear evento</h1>
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
                                        <h2> Selecciona los productos afectados</h2>
                                        <div>
                                             <div className="form-group">
                                                  <label htmlFor="exampleFormControlSelect1">Buscar por categorias</label>
                                                  <select onClick={e => SearchByCategory(products, e.target.value)} name="categories">
                                                       <option value=''></option>
                                                       {categories.map(category => {
                                                            return (
                                                                 <option key={category.category} value={category.category}>{category.category}</option>
                                                            )
                                                       })}
                                                  </select>
                                             </div>
                                             <div>
                                                  <div>
                                                       <Table className="table">
                                                            <Thead>
                                                                 <Tr>
                                                                      <Th scope="col">Id</Th>
                                                                      <Th scope="col">Titulo</Th>
                                                                      <Th scope="col">Categoria</Th>
                                                                      <Th scope="col">Precio</Th>
                                                                      <Th scope="col">Stock</Th>
                                                                      <Th scope="col">Ver</Th>
                                                                      <Th scope="col">Seleccionar</Th>
                                                                 </Tr>
                                                            </Thead>
                                                            <Tbody>

                                                                 {results.map(product => {
                                                                      return (
                                                                           <Tr key={product.id_product} >
                                                                                <Td scope="row">{product.id_product}</Td>
                                                                                <Td scope="row">{product.title}</Td>
                                                                                <Td scope="row">{product.categories ? product.categories : 'Sin categoria'}</Td>
                                                                                <Td scope="row">${product.price}</Td>
                                                                                <Td scope="row">{product.stock}</Td>
                                                                                <Td scope="row"><i style={{ cursor: 'pointer' }} onClick={() => view(product.id_product)} className="fa fa-plus"></i></Td>
                                                                                <Td scope="row"><input type="checkbox" name="select_discount" onClick={(e) => add_id(e.target.checked, product.id_product)} /></Td>
                                                                           </Tr>
                                                                      )
                                                                 })}

                                                            </Tbody>
                                                       </Table>
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
