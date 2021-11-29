//eslint-disable-next-line
import React, { useState, useEffect, useContext } from 'react'
import ProductService from '../../Services/ProductService';
import { ProductContext } from '../../Context/ProductContext';
import { AuthContext } from '../../Context/AuthContext'
//Moment
import moment from 'moment'
import 'moment/locale/es'
//CSS
import '../../assets/css/products.css'

import Message from '../Message';
export default function Product(props) {

     const { match: { params } } = props;
     const id_product = params.id_product
     const { itemsToBuy, setItemsToBuy } = useContext(ProductContext)
     const { user } = useContext(AuthContext)
     const [product, setProduct] = useState({ id: "", title: "", categories: "", price: "", description: "", photo: "", Event: {} })
     const [message, setMessage] = useState(null);
     const [value, setValue] = useState()
     const [date, setDate] = useState()
     const [img, setImg] = useState()
     const [waist, setWaist] = useState([])

     useEffect(() => {
          ProductService.product_id(id_product).then(data => {
               setProduct(data)
               if (data.photo.includes('[') || data.photo.includes(']')) {
                    let images, images_array = [], image_end
                    images = data.photo.slice(2, -2).split(',')
                    images.forEach(image => {
                         const regex = /"/g; //g = global
                         image_end = image.replace(regex, '')
                         images_array.push(image_end)
                    })
                    setImg(images_array)
               }
          })

          setDate(moment(new Date()).utc())
          //eslint-disable-next-line
     }, [])

     const set_waist = waist => {
          if (waist === "" || waist === null || waist === 'sintalle') {
               alert("Seleccione un talle")
          } else {
               setWaist(waist)
          }
     }
     console.log(product);
     const add_to_cart = () => {
          let unit_price
          const quantity = document.getElementById('quantity').value
          if (waist.length === 0) {
               alert("Seleccione un talle")
          } else {
               if (product.id_event !== null) {
                    if (moment(product.Event.from_date).utc() < date && date < moment(product.Event.to_date).utc()) {
                         unit_price = (product.price - (product.price * product.Event.discount))
                         ProductService.add(id_product, quantity, unit_price, waist).then(data => {
                              setMessage(data)
                              setItemsToBuy(itemsToBuy + 1)
                         })
                    } else {
                         unit_price = product.price
                         ProductService.add(id_product, quantity,unit_price, waist).then(data => {
                              setMessage(data)
                              setItemsToBuy(itemsToBuy + 1)
                         })
                    }
               } else {
                    unit_price = product.price
                    ProductService.add(id_product, quantity, unit_price ,waist).then(data => {
                         setMessage(data)
                         setItemsToBuy(itemsToBuy + 1)
                    })

               }
          }

     }
     const max_value = (value) => {
          setValue(value)
     }
     return (
          <div className="product_body">
               <div className="alert">{message ? <Message message={message} /> : null}</div>
               <div className="card">
                    <div className="card_body" style={{ textAlign: 'center' }}>
                         <div>
                              {img ?
                                   img.map(ph => {
                                        return (
                                             <img key={ph} src={'http://localhost:5000/images/' + ph}
                                                  alt={product.title} />
                                        )
                                   })
                                   : null}
                         </div>

                         <div>
                              <h1 className="titlep">{product.title}</h1>
                              <div>
                                   {product.id_event === null ?
                                        <h2>$ {product.price}</h2>
                                        :
                                        <div>
                                             {moment(product.Event.from_date).utc() < date && date < moment(product.Event.to_date).utc() ?
                                                  <h6> OFERTA {product.Event.discount * 100}%
                                                       <p>Finaliza {moment(product.Event.to_date).fromNow()}</p>
                                                       <hr />${Intl.NumberFormat().format(product.price - (product.price * product.Event.discount))}
                                                  </h6>
                                                  :
                                                  <h2>$ {product.price}</h2>}
                                        </div>}
                                   <p>{product.description}</p>
                                   <h3>Categoria: {product.categories}</h3>
                                   <hr />
                                   <p>Stocks disponibles</p>

                                   {product.Waist ?
                                        <select className="form-control" name="stocks" onChange={e => set_waist(e.target.value)}>
                                             <option value='sintalle'>Seleccione un talle</option>
                                             {product.Waist.S !== 0 ?
                                                  <option key="1" value={product.Waist ? 'S' : 'Cargando'}>Talle "S" ({product.Waist.S})</option>
                                                  : null}
                                             {product.Waist.M !== 0 ?
                                                  <option key="2" value={product.Waist ? 'M' : 'Cargando'}>Talle "M" ({product.Waist.M})</option>
                                                  : null}
                                             {product.Waist.L !== 0 ?
                                                  <option key="3" value={product.Waist ? 'L' : 'Cargando'}>Talle "L" ({product.Waist.L})</option>
                                                  : null}
                                             {product.Waist.XL !== 0 ?
                                                  <option key="4" value={product.Waist ? 'XL' : 'Cargando'}>Talle "XL" ({product.Waist.XL})</option>
                                                  : null}
                                             {product.Waist.XXL !== 0 ?
                                                  <option key="5" value={product.Waist ? 'XXL' : 'Cargando'}>Talle "XXL" ({product.Waist.XXL})</option>
                                                  : null}
                                             {product.Waist.XXXL !== 0 ?
                                                  <option key="6" value={product.Waist ? 'XXXL' : 'Cargando'}>Talle "XXXL" ({product.Waist.XXXL})</option>
                                                  : null}
                                        </select>
                                        : 'Cargando'}



                                   {product.Waist ? 
                                   <div className="form-group">
                                   <label htmlFor="quantity">Unidades</label>
                                   <input type="number" onChange={(e) => max_value(e.target.value)}
                                        defaultValue="1" max={product.Waist[waist]} min='1' id="quantity" />
                                   </div>: 'Cargando'}
                                   
                                   {value > product.stock || value < 1 ?
                                        <button className="btn">
                                             Añadir al Carrito
                                        </button>
                                        :
                                        <div>
                                             {user.id_role !== 2 ?
                                                  <button className="btn" id="buy" onClick={() => add_to_cart(product.id)}>
                                                       Añadir al Carrito
                                                  </button> : null}
                                        </div>}
                              </div>
                         </div>
                    </div>
               </div>

          </div>
     )
}
