//eslint-disable-next-line
import React, { useState, useEffect,useContext } from 'react'
import ProductService from '../../Services/ProductService';
import { useHistory } from "react-router-dom";
import { AdminContext } from '../../Context/AdminContext';
//Moment
import moment from 'moment'
import 'moment/locale/es'

export default function Home() {

     let history = useHistory();

     //eslint-disable-next-line
     const {categories, setCategories} = useContext(AdminContext)
     const [products, setProducts] = useState([])
     const [date, setDate] = useState()
     const [results, setResults] = useState([])
     const [order, setOrder] = useState(false)

     useEffect(() => {
          ProductService.get_all().then(data => {
               console.log(data);
               let i = 0
               // eslint-disable-next-line
               data.map(element => {
                    if(element.id_product !== i){
                         results.push(element)
                         i = element.id_product
                    }
               });
               setProducts(results)
               
               // if(data.length > 0){
               //      setProducts(data)
               //      setResults(data)
               // }else{
               //       ProductService.products().then(data => {
               //            setResults(data)
               //            setProducts(data)
               //       })
               // }
               
          })
     
          setDate(moment(new Date()).utc())
          //eslint-disable-next-line
     }, [])

     const view = (id_product) => {
          history.push("/product/" + id_product);
     }
     
     const SearchByCategory = (products,category) => {
          const FilterByCategory = products.filter((product) => product.categories.toLowerCase().includes(category.toLowerCase()))
          if(category.length > 0){
              setResults(FilterByCategory)
          }else{
              setResults(products)
          }
     }

     const PriceOrder = () => {
          if(order === false){
              setOrder(true)
              const ProductsOrder = results.sort(((a, b) => b.price - a.price));
              setResults(ProductsOrder)
          }else{
              setOrder(false)
              const ProductsOrder = results.sort(((a, b) => a.price - b.price));
              setResults(ProductsOrder)
          }
      }


     if(products.length === 0){
          return(
               <div className="container mx-auto text-center mt-5">
                    <h2>¡Aun no hay publicaciones!</h2>
               </div>
          )
     }else{
          return (
               <div>
                    <div className="col-md-10 container mx-auto">
                         <div className="row mt-5">
                         
                              {categories.map(category => {
                                   return(
                                        <div key={category.category} className="col-md-3 text-center">
                                             <h3 className="card-body" style={{cursor: 'pointer'}} onClick={() =>SearchByCategory(products,category.category)}>{category.category}</h3>
                                        </div>
                                   )
                              })}
                         </div>
                         <div className="p-3">
                            <input type="radio" className="m-1" name="orden" id="orden" onClick={() => PriceOrder()} />Descendente
                        </div>
                         <div className="row mt-5">
                              {/* eslint-disable-next-line */}
                              {results.map(obj => {
                                   if(obj.disable === 0 && obj.stock !== 0){
                                        let from_date =  moment(obj.from_date).utc()
                                        let to_date =  moment(obj.to_date).utc()
                                        return (
                                             <div className="mb-3 col-md-3" onClick={() => view(obj.id_product)} key={obj.id_product}>
                                                  <div className="card" style={{ cursor: 'pointer' }}>
                                                       <img src={'http://localhost:5000/images/'+obj.photo} className="card-img-top" alt="..." style={{ height: "250px" }} />
                                                       <div className="card-body">
                                                            {!obj.event ? 
                                                            <h4 className="card-title">$ {obj.price}</h4> 
                                                            : 
                                                            <div>
                                                                 { from_date < date && date < to_date ? 
                                                                 <div>
                                                                      <h4> OFERTA </h4>
                                                                      <hr />
                                                                      <h6 className="card-title text-secondary" style={{textDecoration : 'line-through',fontSize : '95%'}}>$ {obj.price}</h6>
                                                                      <h4 className="card-title" style={{display:'flex'}}>${Intl.NumberFormat().format(obj.price - (obj.price * obj.discount))}<p className="text-success mt-3 ml-1" style={{fontSize : '60%'}}>{obj.discount*100}% OFF</p></h4> 
                                                                 </div>
                                                                 
                                                                 :
                                                                 <h4 className="card-title">$ {obj.price}</h4> }
                                                            </div>}
                                                            
                                                            <p className="card-text">{obj.title}</p>
                                                       </div>
                                                  </div>
                                             </div>
                                        )
                                   }
                                   
                              })}
                         </div>
                    </div>
               </div>
          )
     }
}
