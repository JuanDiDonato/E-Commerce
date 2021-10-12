
//eslint-disable-next-line
import React, { useState, useEffect, useContext } from 'react'
import ProductService from '../../Services/ProductService';
import { ProductContext } from '../../Context/ProductContext';

import Message from '../Message';
export default function Product(props) {

     const { match: { params } } = props;
     const id_product = params.id_product

     const {itemsToBuy,setItemsToBuy} = useContext(ProductContext)
     const [product, setProduct] = useState({ id_product: "", title: "", categories: "", price: "", description: "", photo: "" })
     const [message,setMessage] = useState(null);
     const [value, setValue] = useState()

     useEffect(() => {
          ProductService.product_id(id_product).then(data => {
               setProduct(data)
               console.log(data);
          })

          //eslint-disable-next-line
     }, [])

     const add_to_cart = () => {
          const quantity =document.getElementById('quantity').value
          let stock = product.stock
          ProductService.add(id_product,quantity,stock).then(data => {
               setMessage(data)
               if(data.error === false){
                    setItemsToBuy(itemsToBuy + 1)
               }
          })
     }

     const max_value = (value) => {
          setValue(value)
     }


     return (
          <div >
                <div className="container mt-3">{message ? <Message message={message}/> : null}</div>
               <div className="col-md-10 mx-auto mt-5"  >
                    <div className="p-5 card ">
                         <div className="row">
                          
                              <div className=" col-md-7">
                                   <img src={'http://localhost:5000/images/'+product.photo} className="card-img-top col-md-6 mx-auto " alt={product.name} />
                              </div>
                              <div className="col-md-5 mt-5 separacion">
                                   <p className="text-center mt-5 mb-3 titlep">{product.title}</p>
                                   <div className="card-body">
                                        <h3 className="card-title text-center mb-5 text-primary">${product.price} </h3>
                                        <p className="card-text">{product.description}</p>
                                        <hr />
                                        <p className="card-text">Stock disponible: {product.stock}</p>
                                        <input type="number" className="form-control mb-3 text-center" onChange={(e)=>max_value(e.target.value)} defaultValue="1" max={product.stock} min='1' id="quantity"/>
                                        {value > product.stock || value < 1 ? 
                                        <button className="btn btn-primary btn-block col-12 disabled "><i className="fa fa-cart-plus fa-3x" aria-hidden="true"></i> <h5>Añadir al Carrito</h5></button>
                                        :
                                        <button className="btn btn-primary btn-block col-12 " id="buy" onClick={() => add_to_cart(product.id_product)}><i className="fa fa-cart-plus fa-3x" aria-hidden="true"></i> <h5>Añadir al Carrito</h5></button>}
                                        
                                   </div>
                              </div>
                         </div>
                    </div>

               </div>

          </div>
     )
}
