//eslint-disable-next-line
import React, { useState, useEffect, useContext } from 'react'
import ProductService from '../../Services/ProductService';
import { ProductContext } from '../../Context/ProductContext';
import { AuthContext } from '../../Context/AuthContext'
//Moment
import moment from 'moment'
import 'moment/locale/es'
//CSS
import '../../assets/css/products.css'

import Message from '../Message';
export default function Product(props) {

     const { match: { params } } = props;
     const id_product = params.id_product
     const {itemsToBuy,setItemsToBuy} = useContext(ProductContext)
     const {user} = useContext(AuthContext)
     const [product, setProduct] = useState({ id: "", title: "", categories: "", price: "", description: "", photo: "", Event : {} })
     const [message,setMessage] = useState(null);
     const [value, setValue] = useState()
     const [date, setDate] = useState()
     const [img, setImg] = useState()

     useEffect(() => {
          ProductService.product_id(id_product).then(data => {
               setProduct(data)
               if(data.photo.includes('[') || data.photo.includes(']')){
                    let images, images_array = [], image_end
                    images = data.photo.slice(2,-2).split(',')
                    images.forEach(image => {
                         const regex = /"/g; //g = global
                         image_end = image.replace(regex,'')
                         images_array.push(image_end)
                    })
                    setImg(images_array)
               }
          })
          
          setDate(moment(new Date()).utc())
          //eslint-disable-next-line
     }, [])
     const add_to_cart = () => {
          let stock, unit_price
          const quantity = document.getElementById('quantity').value
          stock = product.stock
          if(product.id_event !== null){
               if(moment(product.Event.from_date).utc() < date && date < moment(product.Event.to_date).utc() ){
                    unit_price = (product.price - (product.price * product.Event.discount))
                    ProductService.add(id_product,quantity,stock,unit_price).then(data => {
                         console.log(data);
                         setMessage(data)
                         setItemsToBuy(itemsToBuy + 1)
                    })
               }else{
                    unit_price = product.price
                    ProductService.add(id_product,quantity,stock,unit_price).then(data => {
                         setMessage(data)
                         setItemsToBuy(itemsToBuy + 1)
                    })
               }
          }else{
               ProductService.add(id_product,quantity,stock,product.price).then(data => {
                    setMessage(data)
                    setItemsToBuy(itemsToBuy + 1)
               })
          }
     }
     const max_value = (value) => {
          setValue(value)
     }
     return (
          <div className="product_body">
               <div className="alert">{message ? <Message message={message}/> : null}</div>
               <div className="card">
                    <div className="card_body" style={{textAlign:'center'}}>
                              <div>
                                   {img ?
                                   img.map(ph => {
                                        return(
                                             <img key={ph} src={'http://localhost:5000/images/'+ph} 
                                             alt={product.title} />
                                        )     
                                   })
                                   : null}
                              </div>
                              
                              <div>
                                   <h1 className="titlep">{product.title}</h1>
                                   <div>
                                   {product.id_event === null ? 
                                        <h2>$ {product.price}</h2> 
                                   : 
                                   <div>
                                        { moment(product.Event.from_date).utc() < date && date < moment(product.Event.to_date).utc() ? 
                                        <h6> OFERTA {product.Event.discount*100}% 
                                        <p>Finaliza {moment(product.Event.to_date).fromNow()}</p> 
                                        <hr />${Intl.NumberFormat().format(product.price - (product.price * product.Event.discount))}
                                        </h6> 
                                        :  
                                        <h2>$ {product.price}</h2> }
                                   </div>}
                                        <p>{product.description}</p>
                                        <h3>Categoria: {product.categories}</h3>
                                        <hr />
                                        <p>Stock disponible: {product.stock}</p>
                                        <div className="form-group">
                                        <label htmlFor="quantity">Unidades</label>
                                        <input  type="number" onChange={(e)=>max_value(e.target.value)}
                                         defaultValue="1" max={product.stock} min='1' id="quantity"/>
                                        </div>
                                        {value > product.stock || value < 1 ? 
                                        <button className="btn">
                                             Añadir al Carrito
                                        </button>
                                        :
                                        <div>
                                             {user.id_role !== 2 ? 
                                        <button className="btn" id="buy" onClick={() => add_to_cart(product.id)}>
                                             Añadir al Carrito
                                        </button>: null}
                                        </div> }
                                   </div>
                              </div>
                    </div>
               </div>

          </div>
     )
}
