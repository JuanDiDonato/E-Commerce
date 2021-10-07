//eslint-disable-next-line
import React,{useState,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import ProductService from '../Services/ProductService';


export default function Home(props) {

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
               setProducts(data)
          })
          ProductService.getcart().then(data => {
               console.log(data);
               setCart(data)
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
               ProductService.getcart().then(data => {
                    console.log(data);
                    setCart(data)
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

          const delete_product = (id_product,index) =>{
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

          return(

               <div>
                    <h1>CLIENTE</h1>
                    <div>
                         <div> 
                             
                              {cart.length === 0 ?
                              <div>
                                   <h3>no hay productos</h3>
                              </div> : 
                              <div>
                                   {cart.map(product=> {
                                        const index = cart.indexOf(product)
                                        return(
                                             <div key={product.id_product}>
                                                       <li>{product.title}</li>
                                                       <li>${product.unit_price}</li>
                                                       <li>{product.quantity}</li>
                                                       <button type="button" onClick={() => delete_product(product.id_product, index)}>borrar</button>
                                             </div>
                                        )
                                   })}
                                   <button type="button" className="btn btn-primary m-1 p-1" onClick={chekout}>pagar</button>
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
