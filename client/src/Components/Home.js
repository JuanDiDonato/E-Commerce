//eslint-disable-next-line
import React,{useState,useEffect,useContext} from 'react';
import ProductService from '../Services/ProductService';
import { AuthContext } from '../Context/AuthContext';


export default function Home(props) {
     const {user} = useContext(AuthContext)
     const [products, setProducts] = useState([])
     //Client
     const [cart, setCart] = useState([])

     useEffect(() => {
     
          ProductService.products().then(data => {
               setProducts(data)
          })
     //eslint-disable-next-line
     },[])
     
     if(user.id_role === 2){
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

          return(

               <div>
                    <h1>PRODUCTOS</h1>
                    <div>
                         {products.map(product => {
                              return(
                                   <div key={product.id_product} className="p-2 card" onClick={()=>alert('Wenasss')}>
                                        <h3 >{product.title}</h3>
                                        <li>{product.description}</li>
                                        <li>${product.price}</li>
                                        <li>{product.stock}</li>
                                        {/* <input type="number" id="quantity" placeholder="quantity" defaultValue='1' /> */}
                                        {/* <button type="button" onClick={() => add_to_cart(product.id_product)}>Añadir al changuito</button> */}
                                        
                                   </div>
                              )
                         })}
                    </div>
               </div>
          ) 
     }
     
          
     
      
     

     
     
     
}
