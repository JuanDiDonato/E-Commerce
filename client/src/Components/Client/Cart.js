import React, {useState, useEffect, useContext} from 'react'
import ProductService from '../../Services/ProductService';
import AuthService from '../../Services/AuthService'
import {AuthContext} from '../../Context/AuthContext';

export default function Cart() {

     const {user, setUser} = useContext(AuthContext) 
     const [cart, setCart] = useState([])
     const [change, setChange] = useState(false)

     console.log(user);

     useEffect(() => {
          ProductService.getcart().then(data => {
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
     const changed = () => {
          setChange(true)
     }

     const change_address = () => {
          const address = document.getElementById('address').value
          AuthService.address(address).then(data => {
               alert(data.message)
               AuthService.isAuthenticated().then(data => {
                    setUser(data.user)
               })
          })
          document.getElementById('address').value = ''
          setChange(false)
     }

     return (
          <div className="container mx-auto mt-5">
               <h3>Mi Changuito</h3>
               <div>
                    {cart.map(product => {
                         return(
                              <div key={product.id_product} className="border m-1">
                                   <li>{product.title}</li>
                                   <li>{product.unit_price}</li>
                                   <li>{product.quantity}</li>
                                   <img src={product.photo} alt="" />
                                   <div>
                                        <button className="btn btn-primary m-1 p-1" onClick={() =>delete_product(product.id_product)}>Remover</button>
                                   </div>
                              </div>
                         )
                    })}
                    <div>
                         {user.address === '' ? 
                              <div>
                                   <h3>Si desea adquirir estos productos,por favor ingrese la direccion del envio</h3>
                                   <input type="text"  id="address" placeholder="Su direccion de envio"/>
                                   <button type="button" onClick={() => change_address()} className="btn btn-primary">Agregar direccion</button>
                              </div>
                              :
                              <div>
                                   <h3>La direccion de envio actual es : {user.address}</h3>
                                   <div>
                                        
                                        
                                        {change ? 
                                             <div>
                                                  <input type="text"  id="address" placeholder="Su direccion de envio"/> 
                                                  <button type="button" onClick={() => change_address()} className="btn btn-primary">Actualizar direccion</button>
                                             </div>
                                             : <button type="button" onClick={() => changed()} className="btn btn-primary">Cambiar direccion</button>}
                                   </div>
                                   
                              </div>}
                    </div>
                    <div>
                         <h4>¿Esta todo correcto?</h4>
                         <div>
                              {cart.length > 0 ? <button className="btn btn-primary m-1 p-1" onClick={() =>chekout()}>Proceder al pago</button> : null}
                              
                         </div>
                    </div>
               </div>
          </div>
     )
}
