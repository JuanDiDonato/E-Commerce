//eslint-disable-next-line
import React, { useState, useEffect, useContext } from 'react'
import ProductService from '../../Services/ProductService';
import { useHistory } from "react-router-dom";
import { AdminContext } from '../../Context/AdminContext';
//Moment
import moment from 'moment'
import 'moment/locale/es'
//CSS
import '../../assets/css/home.css'

export default function Home() {

     let history = useHistory();

     //eslint-disable-next-line
     const { categories, setCategories } = useContext(AdminContext)
     const [products, setProducts] = useState([])
     const [date, setDate] = useState()
     const [results, setResults] = useState([])
     const [order, setOrder] = useState(false)

     useEffect(() => {
          ProductService.get_all().then(data => {
               console.log(data);
               let i = 0
               data.forEach(element => {
                    if (element.id !== i) {
                         results.push(element)
                         i = element.id
                    }
               });
               setProducts(results)
          })
          setDate(moment(new Date()).utc())
          //eslint-disable-next-line
     }, [])

     const view = (id_product) => {
          history.push("/product/" + id_product);
     }

     const SearchByCategory = (products, category) => {
          let products_not_null = []
          // eslint-disable-next-line
          products.map(product => {
               if (product.categories) {
                    products_not_null.push(product)
               }
          })
          const FilterByCategory = products_not_null.filter(product =>
               product.categories.toLowerCase().includes(category.toLowerCase()))
          if (category.length > 0) {
               setResults(FilterByCategory)
          } else {
               setResults(products)
          }
     }

     const PriceOrder = () => {
          if (order === false) {
               setOrder(true)
               const ProductsOrder = results.sort(((a, b) => b.price - a.price));
               setResults(ProductsOrder)
          } else {
               setOrder(false)
               const ProductsOrder = results.sort(((a, b) => a.price - b.price));
               setResults(ProductsOrder)
          }
     }

     if (products.length === 0) {
          return (
               <div>
                    <h2>¡Aun no hay publicaciones!</h2>
               </div>
          )
     } else {
          return (
               <div className="home_body">
                    <div className="categories_1">
                         {categories.map(category => {
                              return (
                                   <div key={category.category}>
                                        <h3 className="card" style={{ cursor: 'pointer' }}
                                             onClick={() => SearchByCategory(products, category.category)}>
                                             {category.category}
                                        </h3>
                                   </div>)
                         })}
                    </div>
                    <div>
                         <input type="radio" name="orden" id="orden"
                              onClick={() => PriceOrder()} />Descendente
                    </div>
                    <div className="products_grid">
                         {/* eslint-disable-next-line */}
                         {results.map(obj => {
                              if (obj.disable === 0 && obj.stock !== 0) {
                                   let from_date, to_date, img, image_end, images = []
                                   from_date = moment(obj.Event.from_date).utc()
                                   to_date = moment(obj.Event.to_date).utc()
                                   if (obj.photo.includes('[') || obj.photo.includes(']')) {
                                        img = obj.photo.slice(2, -2).split(',')
                                        img.forEach(image => {
                                             const regex = /"/g; //g = global
                                             image_end = image.replace(regex, '')
                                             images.push(image_end)
                                        })
                                        return (
                                             <div onClick={() => view(obj.id)} key={obj.id}>
                                                  <div className="card" style={{ cursor: 'pointer' }}>
                                                       <img src={'http://localhost:5000/images/' + images[0]} alt="..." />
                                                       <div >
                                                            {obj.id_event === null ?
                                                                 <div>
                                                                      <h4>$ {obj.price}</h4>
                                                                      <p>{obj.title}</p>
                                                                 </div>
                                                                 :
                                                                 <div>
                                                                      {from_date < date && date < to_date ?
                                                                           <div className="oferta">
                                                                                <h4> ¡OFERTA! </h4>
                                                                                <h6>
                                                                                     $ {obj.price}
                                                                                </h6>
                                                                                <h5>
                                                                                     ${Intl.NumberFormat().format(obj.price - (obj.price * obj.Event.discount))}
                                                                                     <p>
                                                                                          {obj.Event.discount * 100}% OFF
                                                                                     </p>
                                                                                </h5>
                                                                           </div>
                                                                           :
                                                                           <h4 className="card-title">$ {obj.price}</h4>}
                                                                 </div>}
                                                            
                                                       </div>
                                                  </div>
                                             </div>
                                        )

                                   }

                              }
                         })}
                    </div>
               </div>

          )
     }
}
