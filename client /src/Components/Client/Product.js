//eslint-disable-next-line
import React, { useState, useEffect, useContext } from 'react'
import ProductService from '../../Services/ProductService';
import { ProductContext } from '../../Context/ProductContext';
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
     const [product, setProduct] = useState({ id_product: "", title: "", categories: "", price: "", description: "", photo: "" })
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
          const quantity =document.getElementById('quantity').value
          stock = product.stock
          if(product.event !== null){
               if(from_date < date && date < to_date){
                    unit_price = (product.price - (product.price * product.discount))
                    ProductService.add(id_product,quantity,stock,unit_price).then(data => {
                         console.log(data);
                         setMessage(data)
                         setItemsToBuy(itemsToBuy + 1)
                         
                    })
               }else{
                    unit_price = product.price
                    ProductService.add(id_product,quantity,stock,unit_price).then(data => {
                         setMessage(data)
                         console.log(data);
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

     let from_date, to_date
     from_date =  moment(product.from_date).utc()
     to_date =  moment(product.to_date).utc()
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
                                             alt={product.name} />
                                        )     
                                   })
                                   : null}
                              </div>
                              
                              <div>
                                   <h1 className="titlep">{product.title}</h1>
                                   <div>
     
                                   {!product.event ? 
                                        <h2>$ {product.price}</h2> 
                                   : 
                                   <div>
                                        { from_date < date && date < to_date ? 
                                        <h6> OFERTA {product.discount*100}% 
                                        <p>Finaliza {moment(product.to_date).fromNow()}</p> 
                                        <hr />${Intl.NumberFormat().format(product.price - (product.price * product.discount))}
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
                                        <button className="btn" id="buy" onClick={() => add_to_cart(product.id_product)}>
                                             Añadir al Carrito
                                        </button>}
                                        
                                   </div>
                              </div>
                    </div>
               </div>

          </div>
     )
}
