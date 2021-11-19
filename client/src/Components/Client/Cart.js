import React, { useState, useEffect, useContext } from 'react'
import ProductService from '../../Services/ProductService';
import AuthService from '../../Services/AuthService'
import { AuthContext } from '../../Context/AuthContext';
import { ProductContext } from '../../Context/ProductContext';
import Message from '../Message';
import mp from '../../assets/img/mp.png';
//Moment
import moment from 'moment'
import 'moment/locale/es'

export default function Cart() {

     const { setItemsToBuy } = useContext(ProductContext)
     const { user, setUser } = useContext(AuthContext)
     const [cart, setCart] = useState([])
     const [change, setChange] = useState(false)
     const [message, setMessage] = useState(null);
     const [total, setTotal] = useState(0);
     const [date, setDate] = useState()
     const [img, setImg] = useState([])

     let count = 0
     let a = 0

     useEffect(() => {
          ProductService.getcart().then(data => {
               if (data.cart.length > 0) {
                    setCart(data.cart)
                    setItemsToBuy(data.cart.length)
               } else {
                    setCart([])
                    setTotal(0)
               }
               let images, images_array = [], image_end
               data.cart.forEach(element => {
                    console.log(element.photo);
                    if(element.photo.includes('[') || element.photo.includes(']')){
                         images = element.photo.slice(2,-2).split(',')
                         const regex = /"/g; //g = global
                         image_end = images[0].replace(regex,'')
                         images_array.push(image_end)
                         
                    }
                    //eslint-disable-next-line
                    count = count + 1
                    //eslint-disable-next-line
                    a = a + element.unit_price * element.quantity
                    if (count === data.length) {
                         setTotal(new Intl.NumberFormat().format(a))
                    }
               });
               setImg(images_array)
          })
          setDate(moment(new Date()).utc())
          // eslint-disable-next-line
     }, [])



     const delete_product = (id_product) => {
          ProductService.delete_cart(id_product).then(data => {
               ProductService.getcart().then(data => {
                    if (data.length > 0) {
                         setCart(data)
                         setItemsToBuy(data.length)
                         count = 0
                         a = 0
                         data.forEach(element => {
                              count = count + 1
                              a = a + element.unit_price * element.quantity

                              if (count === data.length) {
                                   setTotal(new Intl.NumberFormat().format(a))
                              }
                         });
                    } else {
                         setCart([])
                         setTotal(0)
                    }
               })
               setMessage(data)
               setTimeout(() => {
                    setMessage(null)
               }, 3000);
          })

     }

     const chekout = () => {
          const product_data = []
          cart.forEach(element => {
               product_data.push({ 'title': element.title, 'unit_price': element.unit_price, 'quantity': element.quantity })
               if (product_data.length === cart.length) {
                    ProductService.mercadopago(product_data).then(data => {
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
          <div>
               <div>{message ? <Message message={message} /> : null}</div>
               <h1>Carrito de compras</h1>

               <div className="product_body">
                    <div>
                         {cart.map(product => {
                              let from_date, to_date,images, images_array = [], image_end
                                   from_date =  moment(product.from_date).utc()
                                   to_date =  moment(product.to_date).utc()
                                   if(product.photo.includes('[') || product.photo.includes(']')){
                                        images = product.photo.slice(2,-2).split(',')
                                        const regex = /"/g; //g = global
                                        image_end = images[0].replace(regex,'')
                                        images_array.push(image_end)
                                        
                                   }
                              return (
                                   <div key={product.id_product} className="card">
                                        <div className="card_body">
                                             <div>
                                             {img.length > 0 ?
                                             // eslint-disable-next-line
                                                  img.map(ph=> {
                                                       if(ph === images_array[0]){
                                                            return(
                                                                 <img key={img[0]} src={'http://localhost:5000/images/'+ph} 
                                                                 alt={product.name} />
                                                            )
                                                       }
                                                       
                                                  })
                                                  
                                             
                                             : null}
                                             </div>
                                             <div>
                                                  <h4 > {product.title}</h4>

                                                  <p> Cantidad: {product.quantity}</p>
                                                  {!product.event ?
                                                       <h4>$ {product.unit_price}</h4>
                                                       :
                                                       <div>
                                                            {from_date < date && date < to_date ? 
                                                            <h4 > OFERTA {product.discount * 100}% <hr />${Intl.NumberFormat().format(product.unit_price)}</h4>
                                                                 :
                                                            <h4> ${ Intl.NumberFormat().format(product.unit_price)}</h4> }
                                                       </div>
                                                  }
                                                   
                                                  <button className="btn" onClick={() => delete_product(product.id_product)}> Eliminar</button>
                                             </div>
                                        </div>
                                        <div>

                                        </div>
                                   </div>
                              )
                         })}
                         <div>
                              <h4>Cantidad Total a pagar: $ARS {total}</h4>
                              <div>
                              </div>
                         </div>
                    </div>



                    <div>
                         {user.address === '' ?
                              <div>
                                   <h3>Si desea adquirir estos productos,por favor ingrese la direccion del envio</h3>
                                   <div className="form-group">
                                        <input type="text" id="address" placeholder="Su direccion de envio" />
                                   </div>
                                   <button type="button" onClick={() => change_address()} className="btn btn-primary">Agregar direccion</button>
                              </div>
                              :
                              <div>
                                   <h3>La direccion de envio actual es : {user.address}</h3>
                                   <div>
                                        {change ?
                                             <div className="form-group">
                                                  <input type="text" id="address" placeholder="Su direccion de envio" />
                                                  <button type="button" onClick={() => change_address()} className="btn">Actualizar direccion</button>
                                             </div>
                                             : <button type="button" onClick={() => changed()} className="btn">Cambiar direccion</button>}
                                   </div>
                              </div>}
                    </div>
                    <div>
                         <h2>¿Esta todo correcto?</h2>
                         {user.address ?
                              <div className="col-12  m-5">
                                   {cart.length > 0 ? <button className="btn-mp" onClick={() => chekout()}> <img src={mp} alt="mplogo" /><h3>Proceder al pago</h3></button> : null}
                              </div>
                              : null}
                    </div>

               </div>
          </div>
     )
}
