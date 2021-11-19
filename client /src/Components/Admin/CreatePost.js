import React, { useState,useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AdminServices from '../../Services/AdminServices';
import { AdminContext } from '../../Context/AdminContext'
//CSS
import '../../assets/css/forms.css'

export default function CreatePost(props) {

     const { categories, setCategories } = useContext(AdminContext)
     const [product, setProduct] = useState({title:'',categories:'',price:0, stock:0,description:'',images:[]})

     useEffect(() => {
          AdminServices.categories().then(data => {
               setCategories(data)
               product.categories = data[0].category
          })
          // eslint-disable-next-line
     }, [])

     const onChange = e =>{
          setProduct({...product,[e.target.name] : e.target.value});
     }

     const subirArchivo= e =>{
          setProduct({...product,images: e});
     }
     
     const create_post = async e => {
          e.preventDefault()
          const formData = new FormData();
          for (let i = 0; i < product.images.length; i++) {
               formData.append('images', product.images[i]);
             }
          formData.append('title', product.title) //en una costante body le envio el title
          formData.append('categories', product.categories)
          formData.append('price', product.price)
          formData.append('stock', product.stock)
          formData.append('description', product.description)
          if (product.title === '' ||  product.price === '' ||  
          product.stock === '' ||  product.description === '' ) {
               alert('Complete todos los campos')
          } else {
               AdminServices.create(formData).then(data => {
                    alert(data)
                    props.history.push('/')
               })
          }
          
     }

     if (categories.length === 0) {
          return (
               <div>
                    <h2>¡Antes de crear una publicacion, debe crear al menos una categoria!</h2>
                    <Link to='/categories'>Crear</Link>
               </div>
          )
     } else {
          return (
               <div className="form">
                         <form encType='multipart/form-data'>
                              <div className="form-group">
                                   <label>Titulo</label>
                                   <input type="text" className="form-control" name="title" onChange={onChange} placeholder="Titulo de la publicacion" />
                              </div>
                              <div className="form-group">
                                   <label htmlFor="exampleFormControlSelect1">Categoria</label>
                                   <select className="select" onChange={onChange} defaultValue={categories[0].category} name="categories">
                                        {categories.map(category => {
                                             return (
                                                  <option key={category.category} value={category.category}>{category.category}</option>
                                             )

                                        })}
                                   </select>
                              </div>
                              <div className="exeption">
                                   <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Precio</label>
                                        <input type="number" className="form-control" name="price" onChange={onChange} placeholder="Precio" />
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Stock</label>
                                        <input type="number" className="form-control" name="stock" onChange={onChange} placeholder="Stock" />
                                   </div>
                              </div>
                              <div className="form-group">
                                   <label htmlFor="exampleFormControlTextarea1">Descripcion</label>
                                   <textarea className="text-area" maxLength='500' name="description" onChange={onChange} rows="5"></textarea>
                              </div>
                              <div className="form-group">
                                   <label htmlFor="exampleFormControlInput1">Foto 1(BETA)</label>
                                   <input type="file" multiple={true}  onChange={e=>subirArchivo(e.target.files)} name="images" />
                              </div>
                              <div>
                                   <button type="submit" className="btn" onClick={create_post} >Crear</button>
                              </div>
                         </form>
                    
               </div>

          )
     }

}

