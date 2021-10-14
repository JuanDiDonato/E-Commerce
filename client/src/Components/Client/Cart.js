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

     let count = 0
     let a = 0

     useEffect(() => {
          ProductService.getcart().then(data => {
               
               if (data.length > 0) {
                    setCart(data)
                    console.log(data);
                    setItemsToBuy(data.length)
               } else {
                    setCart([])
                    setTotal(0)
               }
               data.forEach(element => {
                    //eslint-disable-next-line
                    count = count + 1
                    //eslint-disable-next-line
                    a = a + element.unit_price * element.quantity
                    if (count === data.length) {
                         setTotal(new Intl.NumberFormat().format(a))
                    }
               });
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
          <div className="container mx-auto mt-5">
               <div className="container mt-3">{message ? <Message message={message} /> : null}</div>
               <h3 className="text-center mb-4">Carrito de compras</h3>

               <div className="col-md-12 mx-auto mt-5"  >
                    <div className="p-5 card ">
                         {cart.map(product => {
                                  let from_date =  moment(product.from_date).utc()
                                  let to_date =  moment(product.to_date).utc()
                              return (
                                   <div key={product.id_product} className=" m-1 ">
                                        <div className="row sb">
                                             <div className="col-2"></div>
                                             <div className="col-2">
                                                  <img src={'http://localhost:5000/images/' + product.photo} className="card-img-top col-md-6 mx-auto " alt={product.name} />
                                             </div>
                                             <div className="col-8 mt-5 ">
                                                  <h4 className="text-center"> {product.title}</h4>

                                                  <p> Cantidad: {product.quantity}</p>
                                                  {!product.event ?
                                                       <h4 className="card-title">$ {product.unit_price}</h4>
                                                       :
                                                       <div>
                                                            {from_date < date && date < to_date ? <h4 className="card-title"> OFERTA {product.discount * 100}% <hr />${Intl.NumberFormat().format(product.unit_price)}</h4>
                                                                 :
                                                                 <h4 className="card-title">$ {product.price}</h4>}
                                                       </div>}
                                                  {/* <h2 className="mr-auto"> ${ Intl.NumberFormat().format(product.unit_price)}</h2> */}
                                                  <button className="btn btn-outline-warning col-12" onClick={() => delete_product(product.id_product)}><i className="fa fa-times" aria-hidden="true"></i> Eliminar</button>
                                             </div>
                                        </div>
                                        <div>

                                        </div>
                                   </div>
                              )
                         })}
                         <div className=" m-1 ">
                              <h4 className="text-center">Cantidad Total a pagar: $ARS {total}</h4>
                              <div>
                              </div>
                         </div>
                    </div>



                    <div>
                         {user.address === '' ?
                              <div>
                                   <h3>Si desea adquirir estos productos,por favor ingrese la direccion del envio</h3>
                                   <input type="text" id="address" placeholder="Su direccion de envio" />
                                   <button type="button" onClick={() => change_address()} className="btn btn-primary">Agregar direccion</button>
                              </div>
                              :
                              <div>
                                   <h3>La direccion de envio actual es : {user.address}</h3>
                                   <div>
                                        {change ?
                                             <div>
                                                  <input type="text" id="address" placeholder="Su direccion de envio" />
                                                  <button type="button" onClick={() => change_address()} className="btn btn-primary">Actualizar direccion</button>
                                             </div>
                                             : <button type="button" onClick={() => changed()} className="btn btn-primary">Cambiar direccion</button>}
                                   </div>
                              </div>}
                    </div>
                    <div>
                         <h4>¿Esta todo correcto?</h4>
                         {user.address ?
                              <div className="col-12  m-5">
                                   {cart.length > 0 ? <button className="btn btn-outline-primary col-12  p-1 mx-auto" onClick={() => chekout()}> <img src={mp} alt="mplogo" />  <h3 className="m-3">PROCEDER AL PAGO</h3></button> : null}
                              </div>
                              : null}
                    </div>

               </div>
          </div>
     )
}
