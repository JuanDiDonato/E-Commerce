import React, {useState, useEffect} from 'react'
import AdminServices from '../../Services/AdminServices';

export default function CreatePost(props) {
     const { match: { params } } = props;
     const id_product = params.id_product
     const [categories, setCategories] = useState([])
     const [product, setProduct] = useState({title:'',categories:'',price:'',description:'',images:[]})
     const [stock, setStock] = useState({S:'', M : '', L: '', XL : '', XXL :'', XXXL : ''})

     useEffect(() => {
          AdminServices.product_id(id_product).then(data => {
               setProduct({...product,
                    title : data.title,
                    categories : data.categories, 
                    price : data.price,
                    stock : data.stock,
                    description : data.description,
               })
               setStock({...stock,
                    S : data.Waist.S,
                    M : data.Waist.M,
                    L : data.Waist.L,
                    XL : data.Waist.XL,
                    XXL : data.Waist.XXL,
                    XXXL : data.Waist.XXXL,
               })
          })
          AdminServices.categories().then(data => {
               setCategories(data)
          })
          // eslint-disable-next-line
     }, [])

     const onChange = e =>{
          setProduct({...product,[e.target.name] : e.target.value});
     }
     const onChangeStock = e => {
          setStock({...stock, [e.target.name] : e.target.value})
     }
     const subirArchivo= e =>{
          setProduct({...product,images: e});
     }

     const edit_post = e => {
          e.preventDefault()
          if(product.images.length === 0){
               alert('Por favor, agregue al menos una foto')
          }else{
               const formData = new FormData();
               for (let i = 0; i < product.images.length; i++) {
                    formData.append('images', product.images[i]);
               }
               formData.append('title', product.title) //en una costante body le envio el title
               formData.append('categories', product.categories)
               formData.append('price', product.price)
               formData.append('stock', JSON.stringify(stock))
               formData.append('description', product.description)
               if (product.title === '' ||  product.price === '' ||  
               product.stock === '' ||  product.description === '' ) {
                    alert('Complete todos los campos')
               } else {
                    AdminServices.edit(formData,id_product).then(data => {
                         props.history.push('/list')
                    })
               }
          }
     }
     if(product){
          return (
               <div className="form">
                              <form encType='multipart/form-data'>
                                   <div className="form-group">
                                        <label>Titulo</label>
                                        <input type="text" className="form-control" name="title" onChange={onChange} defaultValue={product.title} placeholder="Titulo de la publicacion" />
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Categoria</label>
                                        <select className="select" onChange={onChange} name="categories">
                                             <option value={product.categories}>{product.categories}</option>
                                             {/* eslint-disable-next-line */}
                                             {categories.map(category => {
                                                  return(
                                                       <option key={category.category} value={category.category}>{category.category}</option>
                                                  )
                                                  
                                             })}
                                        </select>
                                   </div>
                                   <div className="exeption">
                                        <div className="form-group">
                                             <label htmlFor="exampleFormControlInput1">Precio</label>
                                             <input type="number" className="form-control" name="price" onChange={onChange} defaultValue={product.price} placeholder="Precio" />
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">S</label>
                                        <input type="number" className="form-control" name="S" onChange={onChangeStock} defaultValue={stock.S} placeholder="Stock" />
                                        <label htmlFor="exampleFormControlInput1">M</label>
                                        <input type="number" className="form-control" name="M" onChange={onChangeStock} defaultValue={stock.M} placeholder="Stock" />
                                        <label htmlFor="exampleFormControlInput1">L</label>
                                        <input type="number" className="form-control" name="L" onChange={onChangeStock} defaultValue={stock.L} placeholder="Stock" />
                                        <label htmlFor="exampleFormControlInput1">XL</label>
                                        <input type="number" className="form-control" name="XL" onChange={onChangeStock} defaultValue={stock.XL} placeholder="Stock" />
                                        <label htmlFor="exampleFormControlInput1">XXL</label>
                                        <input type="number" className="form-control" name="XXL" onChange={onChangeStock} defaultValue={stock.XXL} placeholder="Stock" />
                                        <label htmlFor="exampleFormControlInput1">XXXL</label>
                                        <input type="number" className="form-control" name="XXXL" onChange={onChangeStock} defaultValue={stock.XXXL} placeholder="Stock" />
                                   </div>
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Descripcion</label>
                                        <textarea className="text-area"  maxLength='500' name="description" onChange={onChange} defaultValue={product.description} rows="5"></textarea>
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Foto</label>
                                        <input type="file" multiple={true}  onChange={e=>subirArchivo(e.target.files)} name="images" />
                                   </div>
                                   <div>
                                        <button type="submit" className="btn" onClick={edit_post}>Guardar</button>
                                   </div>
                              </form>
                         
                    </div>
     
          )
     }else{
          return(
               <div>
                    <h2>Cargando datos..</h2>
               </div>
          )
     }
     
}
