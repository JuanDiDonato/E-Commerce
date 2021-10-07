import React, {useState, useEffect} from 'react'
import ProductService from '../../Services/ProductService';

export default function Cart() {

     const [cart, setCart] = useState([])

     useEffect(() => {
          ProductService.getcart().then(data => {
               console.log(data);
               if(data.length > 0){
                    setCart(data)
               }else{
                    setCart([])
               }
          })
     }, [])

     const delete_product = (id_product) =>{
          ProductService.delete_cart(id_product).then(data => {
               console.log(data);
          })
          ProductService.getcart().then(data => {
               console.log(data);
               if(data.length > 0){
                    setCart(data)
               }else{
                    setCart([])
               }
          })
     }

     const chekout = () => {
          const product_data = []
          cart.forEach(element => {
               product_data.push({'title' : element.title, 'unit_price':element.unit_price, 'quantity':element.quantity})
               if(product_data.length === cart.length){
                    ProductService.mercadopago(product_data).then(data => {
                         console.log(data);
                         window.location.href = data.url;
                    })
               }
          });
     }

     

     return (
          <div>
               <h3>Mi Changuito</h3>
               <div>
                    {cart.map(product => {
                         return(
                              <div key={product.id_product} className="border m-1">
                                   <li>{product.title}</li>
                                   <li>{product.unit_price}</li>
                                   <li>{product.quantity}</li>
                                   <li>{product.photo}</li>
                                   <div>
                                        <button className="btn btn-primary m-1 p-1" onClick={() =>delete_product(product.id_product)}>Remover</button>
                                   </div>
                              </div>
                         )
                    })}
                    <div>
                         <h4>¿Esta todo correcto?</h4>
                         <div>
                              <button className="btn btn-primary m-1 p-1" onClick={() =>chekout()}>Proceder al pago</button>
                         </div>
                    </div>
               </div>
          </div>
     )
}
