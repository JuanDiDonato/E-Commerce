//eslint-disable-next-line
import React,{useState,useEffect} from 'react'
import ProductService from '../../Services/ProductService';
import { useHistory } from "react-router-dom";
export default function Home(props) {
     let history = useHistory();
          //eslint-disable-next-line
          const [products, setProducts] = useState([])
     useEffect(() => {
          ProductService.products().then(data => {
               setProducts(data)
          })
          
     //eslint-disable-next-line
     },[])
     const view = (id_product)=>{
          history.push("/product/"+id_product);
     }
     return (
          <div>
              

      

<div className="col-md-9 mx-auto">
              <div className="row mt-5">
       
              {products.map(obj=>{
                   return(
               
                    <div className="mb-3 col-md-3" onClick={()=>view(obj.id_product)} key={obj.id_product}>
                    <div className="card">
                    <img src={obj.photo} className="card-img-top" alt="..." style={{height: "250px"}}/>
                    <div className="card-body">
                      <h4 className="card-title">$ {obj.price}</h4>
                      <p className="card-text">{obj.title}</p>
                    </div>
                  </div>
                  
                    </div>
                  
              
                  )})}
                 
</div>
</div>






          </div>
     )
}
