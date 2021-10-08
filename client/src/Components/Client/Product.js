
//eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import ProductService from '../../Services/ProductService';

export default function Product(props) {
     const { match: { params } } = props;
     const id_product = params.id_product

     const [product, setProduct] = useState({ id_product: "", title: "", categories: "", price: "", description: "", photo: "" })

     useEffect(() => {
          ProductService.product_id(id_product).then(data => {
               setProduct(data)
               console.log(data);


          })

          //eslint-disable-next-line
     }, [])

     const add_to_cart = () => {
          const quantity =document.getElementById('quantity').value
          ProductService.add(id_product,quantity).then(data => {
               console.log(data);
          })
     }



     return (
          <div >

               <div className="col-md-10 mx-auto mt-5"  >
                    <div className="p-5 card ">
                         <div className="row">
                          
                              <div className=" col-md-7">
                                   <img src={product.photo} className="card-img-top col-md-6 mx-auto " alt={product.name} />
                              </div>
                              <div className="col-md-5">
                                   <h1 className="mx-auto mt-3 mb-3">{product.title}</h1>
                                   <div className="card-body">
                                        <h4 className="card-title">$ {product.price}</h4>
                                        <p className="card-text">{product.description}</p>
                                        <input type="number" defaultValue="1" id="quantity"/>
                                        <button className="btn btn-primary btn-block" onClick={() => add_to_cart(product.id_product)}><i className="fa fa-cart-plus fa-3x" aria-hidden="true"></i> <h5>Añadir al Carrito</h5></button>
                                   </div>
                              </div>
                         </div>
                    </div>

               </div>

          </div>
     )
}
