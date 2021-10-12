//eslint-disable-next-line
import React, { useState, useEffect,useContext } from 'react'
import ProductService from '../../Services/ProductService';
import { useHistory } from "react-router-dom";
import { AdminContext } from '../../Context/AdminContext';

export default function Home(props) {
     let history = useHistory();
     //eslint-disable-next-line
     const {categories, setCategories} = useContext(AdminContext)
     const [products, setProducts] = useState([])
     //const [categories, setCategories] = useState([])
     const [results, setResults] = useState([])
     useEffect(() => {
          ProductService.products().then(data => {
               console.log(data);
               setProducts(data)
               setResults(data)
          })
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
                         <div className="row mt-5">
                              {/* eslint-disable-next-line */}
                              {results.map(obj => {
                                  
                                   if(obj.disable === 0 && obj.stock !== 0){
                                        return (
                                             <div className="mb-3 col-md-3" onClick={() => view(obj.id_product)} key={obj.id_product}>
                                                  <div className="card">
                                                       <img src={obj.photo} className="card-img-top" alt="..." style={{ height: "250px" }} />
                                                       <div className="card-body">
                                                            <h4 className="card-title">$ {obj.price}</h4>
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
