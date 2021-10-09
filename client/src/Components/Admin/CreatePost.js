import React, { useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import AdminServices from '../../Services/AdminServices';
import { AdminContext } from '../../Context/AdminContext'

export default function CreatePost(props) {

     const {categories, setCategories} = useContext(AdminContext)

     useEffect(() => {
          AdminServices.categories().then(data => {
               setCategories(data)
          })
          // eslint-disable-next-line
     }, [])

     const create_post = e => {
          e.preventDefault()
          const title = document.getElementById('title').value
          const categories = document.getElementById('category').value
          const price = document.getElementById('price').value
          const stock = document.getElementById('stock').value
          const description = document.getElementById('description').value
          const photo = document.getElementById('photo').value
          const post = {title, categories, price, stock, description, photo}
          if(title === '' || categories === '' || price === '' || stock === '' || description === ''){
               alert('Complete todos los campos')
          }else{
               AdminServices.create(post).then(data => {
                    alert(data)
               })
          }
          document.getElementById('title').value = ''
          document.getElementById('price').value = ''
          document.getElementById('stock').value = ''
          document.getElementById('description').value = ''
          document.getElementById('photo').value = ''
          props.history.push('/')
     }
     
     if(categories.length === 0){
          return(
               <div className="container mx-auto text-center mt-5">
                    <h2>¡Antes de crear una publicacion, debe crear al menos una categoria!</h2>
                    <Link to='/categories' className="btn btn-primary">Crear</Link>
               </div>
          )
     }else{
          return (
               <div className="container">
                    <div className="card mt-5 p-5 mb-5">
                         <form>
                              <div className="form-group">
                                   <label htmlFor="exampleFormControlInput1">Titulo</label>
                                   <input type="text" className="form-control" id="title" placeholder="Titulo de la publicacion" />
                              </div>
                              <div className="form-group">
                                   <label htmlFor="exampleFormControlSelect1">Categoria</label>
                                   <select className="form-control" id="category">
                                        {categories.map(category => {
                                             return(
                                                  <option key={category.category}>{category.category}</option>
                                             )
                                             
                                        })}
                                   </select>
                              </div>
                              <div className="form-group">
                                   <label htmlFor="exampleFormControlInput1">Precio</label>
                                   <input type="number" className="form-control" id="price" placeholder="Precio" />
                              </div>
                              <div className="form-group">
                                   <label htmlFor="exampleFormControlInput1">Stock</label>
                                   <input type="number" className="form-control" id="stock" placeholder="Stock" />
                              </div>
                              <div className="form-group">
                                   <label htmlFor="exampleFormControlTextarea1">Descripcion</label>
                                   <textarea className="form-control" id="description" rows="3"></textarea>
                              </div>
                              <div className="form-group">
                                   <label htmlFor="exampleFormControlInput1">URL LINK (development)</label>
                                   <input type="text" className="form-control" id="photo" placeholder="url link image" />
                              </div>
                              <div>
                                   <button type="submit" onClick={create_post} className="btn btn-warning btn-block">Crear</button>
                              </div>
                              
                         </form>
                    </div>
               </div>
     
          )
     }
     
     }

     