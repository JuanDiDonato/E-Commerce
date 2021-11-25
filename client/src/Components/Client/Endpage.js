import React, {useState,useEffect,useContext} from 'react'
import ProductService from '../../Services/ProductService';

import {AuthContext} from '../../Context/AuthContext';


export default function Endpage(props) {
     const [cart, setCart] = useState([])
     const [sales, setSales] = useState()
     const [img, setImg] = useState([])
     const {user} = useContext(AuthContext)

     useEffect(() => {
          ProductService.getcart().then(data => {
               console.log(data);
               setCart(data)
               setSales(data.length)
               let images, images_array = [], image_end
               data.forEach(element => {
                    if(element.Product.photo.includes('[') || element.Product.photo.includes(']')){             
                         images = element.Product.photo.slice(2,-2).split(',')
                         images.forEach(image => {
                              const regex = /"/g; //g = global
                              image_end = image.replace(regex,'')
                              images_array.push(image_end)
                         })
                         
                    }
                    
               });
               setImg(images_array)
               
          })
          ProductService.send_email(user.email)
          
          // eslint-disable-next-line
     }, [])


     const push_order = () => {
          const incomes = []
          let income = 0         
          cart.forEach(product => {
               incomes.push(product.unit_price * product.quantity)
               const ProductData = {'id_product': product.id_product, quantity : product.quantity, 'photo' : product.Product.Event.photo, 'title' : product.Product.title, 'address' : user.address}
               ProductService.add_order(ProductData).then(data => {
                    console.log(data);
               })
               ProductService.save_in_history(ProductData).then(data => {
                    console.log(data);
               })
               let stock = product.stock - product.quantity
               ProductService.stock(product.id_product, stock)
          });
          incomes.forEach(element => {
               income += element 
          });
          ProductService.statistics(sales,income).then(data => {
               console.log(data);
          })
     }

     const Back = () => {
          push_order()
          setCart([])
          setSales()
          ProductService.clear_cart().then(data => {
               console.log(data);
          })
          props.history.push('/')
     }

     return (
          <div>
               <h1>¡Gracias por su compra!</h1>
               <h2>Usted a comprado:</h2>
               <div className="product_end">
               {cart.map(product => {
                    console.log(product);
                              let images, images_array = [], image_end
                              if(product.Product.photo.includes('[') || product.Product.photo.includes(']')){
                                   images = product.Product.photo.slice(2,-2).split(',')
                                   const regex = /"/g; //g = global
                                   image_end = images[0].replace(regex,'')
                                   images_array.push(image_end)
                                   
                              }
                              return(
                                   <div key={product.id_product} className="card">
                                        <div className="grid">
                                             <div>
                                                  <h2>{product.title}</h2>
                                                  <h3>Unidades: {product.quantity}</h3>
                                             </div>
                                        {img.length > 0 ?
                                        // eslint-disable-next-line
                                             img.map(ph=> {
                                                  if(ph === images_array[0]){
                                                       return(
                                                            <img key={img[0]} src={'http://localhost:5000/images/'+ph} 
                                                            alt={product.name}  />
                                                       )
                                                  }  
                                             })
                                        : null}
                                        </div>
                                        
                                   </div>
                              )
                         })}
               </div>
                         
                    
                    
                    <h3>Rebice su correo electronico</h3>
                    <h4>El vendedor enviara estos producto a {user.address}</h4>
               
               <div>
                    <button type="button" className="btn btn-primary" onClick={() =>{Back()}}>Volver al inicio</button>
               </div>
          </div>
     )
}
