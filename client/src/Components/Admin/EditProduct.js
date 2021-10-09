import React, {useState, useEffect} from 'react'
import AdminServices from '../../Services/AdminServices';

export default function CreatePost(props) {
     const { match: { params } } = props;
     const id_product = params.id_product

     const [categories, setCategories] = useState([])
     const [product, setProduct] = useState([])

     useEffect(() => {
          AdminServices.product_id(id_product).then(data => {
               setProduct(data)
          })
          AdminServices.categories().then(data => {
               setCategories(data)
          })
          // eslint-disable-next-line
     }, [])

     const edit_post = e => {
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
               AdminServices.edit(post,id_product).then(data => {
                    console.log(data);
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

     return (
          <div className="container">
               <div className="card mt-5 p-5 mb-5">
                    <form>
                         <div className="form-group">
                              <label htmlFor="exampleFormControlInput1">Titulo</label>
                              <input type="text" className="form-control" id="title" placeholder="Titulo de la publicacion" defaultValue={product.title} />
                         </div>
                         <div className="form-group">
                              <label htmlFor="exampleFormControlSelect1">Categoria</label>
                              <select className="form-control" id="category" defaultValue={product.categories}>
                                   {categories.map(category => {
                                        return(
                                             <option key={category.category}>{category.category}</option>
                                        )
                                        
                                   })}
                              </select>
                         </div>
                         <div className="form-group">
                              <label htmlFor="exampleFormControlInput1">Precio</label>
                              <input type="number" className="form-control" id="price" placeholder="Precio" defaultValue={product.price} />
                         </div>
                         <div className="form-group">
                              <label htmlFor="exampleFormControlInput1">Stock</label>
                              <input type="number" className="form-control" id="stock" placeholder="Stock" defaultValue={product.stock} />
                         </div>
                         <div className="form-group">
                              <label htmlFor="exampleFormControlTextarea1">Descripcion</label>
                              <textarea className="form-control" id="description" rows="3" defaultValue={product.description}></textarea>
                         </div>
                         <div className="form-group">
                              <label htmlFor="exampleFormControlInput1">URL LINK (development)</label>
                              <input type="text" className="form-control" id="photo" placeholder="url link image" defaultValue={product.photo} />
                         </div>
                         <div>
                              <button type="submit" onClick={edit_post} className="btn btn-warning btn-block">Finalizar</button>
                         </div>
                         
                    </form>
               </div>
          </div>

     )
}
