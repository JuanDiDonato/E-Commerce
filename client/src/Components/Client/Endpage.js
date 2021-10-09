import React, {useState,useEffect} from 'react'
import ProductService from '../../Services/ProductService';


export default function Endpage(props) {
     // const { location : {search}} = props;
     const [cart, setCart] = useState([])


     useEffect(() => {
          ProductService.getcart().then(data => {
               setCart(data)
          })
     }, [])
 
     const Back = () => {
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
                    <h2>Usted a comprado: 
                         {cart.map(product => {
                              return(
                                   <div key={product.id_product} className="border mx-auto p-3">
                                        <li>{product.title}</li>
                                        <img src={product.photo} alt={product.title} />
                                   </div>
                              )
                         })}
                    </h2>
                    <h3>Rebice su correo electronico</h3>
                    <h4>El vendedor enviara este producto a la direccion adjuntada</h4>
               </div>
               <div>
                    <button type="button" className="btn btn-primary" onClick={() =>{Back()}}>Volver al inicio</button>
               </div>
          </div>
     )
}
