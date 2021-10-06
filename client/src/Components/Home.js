//eslint-disable-next-line
import React,{useState,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import ProductService from '../Services/ProductService';


export default function Home() {

     const [clientData, setClientData] = useState([])
     const [products, setProducts] = useState([])
     //Client
     const [cart, setCart] = useState([])

     useEffect(() => {
     AuthService.isAuthenticated().then(data => {
          if(data === 'Unauthorized'){
               setClientData({id_role : null}); 
          }else{
               setClientData(data.user); 
          }})
          ProductService.products().then(data => {
               setProducts(data.data)
          })
     //eslint-disable-next-line
     },[])
     
     if(clientData.id_role === 2){
          return(
               <div>
                    <h1>ADMINISTRADOR</h1>
               </div>
          )
     }else{

          
          const add_to_cart = (id_product) => {
               const quantity = document.getElementById('quantity').value
               ProductService.add(id_product,quantity).then(data => {
                    console.log(data);
               })
          }

          const get_cart = () => {
               ProductService.getcart().then(data => {
                    const products = data.data
                    
                    products.map(product=> {
                         ProductService.product_id(product.id_product).then(data => {
                             setCart(cart => [...cart, data.data])
                        })
                   })
               })
               
          }

          return(

               <div>
                    <h1>CLIENTE</h1>
                    <div>
                         <div> 
                              <button type="button" onClick={() => get_cart()}>
                                   Ver changuito
                              </button>
                              {cart.length === 0 ?
                              <div>
                                   <h3>no hay productos</h3>
                              </div> : 
                              <div>
                                   {cart.map(product=> {
                                        return(
                                             <div key={product.id_product}>
                                                  <li>{product.title}</li>
                                                  <button type="button">borrar</button>
                                             </div>
                                        )
                                   })}
                              </div>}
                         </div>
                         {products.map(product => {
                              return(
                                   <div key={product.id_product} className="p-2">
                                        <li >{product.title}</li>
                                        <input type="number" id="quantity" placeholder="quantity" defaultValue='1' />
                                        <button type="button" onClick={() => add_to_cart(product.id_product)}>Añadir al changuito</button>
                                        
                                   </div>
                                   
                              )
                         })}
                    </div>
               </div>
          ) 
     }
     
          
     
      
     

     
     
     
}
