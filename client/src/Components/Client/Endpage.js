import React, {useState,useEffect,useContext} from 'react'
import ProductService from '../../Services/ProductService';
import {AuthContext} from '../../Context/AuthContext';


export default function Endpage(props) {
     // const { location : {search}} = props;
     const [cart, setCart] = useState([])
     const {user} = useContext(AuthContext)


     useEffect(() => {
          ProductService.getcart().then(data => {
               setCart(data)
          })
          
     }, [])

     const push_order = () => {
          cart.forEach(product => {
               console.log(product);
               let id_product = product.id_product
               let quantity = product.quantity
               ProductService.add_order(id_product, user.address, quantity ).then(data => {
                    console.log(data);
               })
               ProductService.save_in_history(id_product, quantity).then(data => {
                    console.log(data);
               })
          });
     }
     

     const Back = () => {
          push_order()
          setCart([])
          ProductService.clear_cart().then(data => {
               console.log(data);
          })
          props.history.push('/')
     }

     return (
          <div className="container mt-5 mx-auto">
               <div>
                    <h1>¡Gracias por su compra!</h1>
                    <div>
                    <h2>Usted a comprado:</h2>
                         {cart.map(product => {
                              return(
                                   <div key={product.id_product} className="border mx-auto p-3">
                                        <li>{product.title}</li>
                                        <li>{product.quantity}</li>
                                        <img src={product.photo} alt={product.title} />
                                   </div>
                              )
                         })}
                    </div>
                    
                    <h3>Rebice su correo electronico</h3>
                    <h4>El vendedor enviara estos producto a {user.address}</h4>
               </div>
               <div>
                    <button type="button" className="btn btn-primary" onClick={() =>{Back()}}>Volver al inicio</button>
               </div>
          </div>
     )
}
