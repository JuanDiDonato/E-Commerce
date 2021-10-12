import React, { useState, useEffect } from 'react'
import ProductService from '../../Services/ProductService';

export default function Shoping() {

     const [history, setHistory] = useState([])

     useEffect(() => {
          ProductService.history().then(data => {
               console.log(data);
               if(data.length > 0){
                    setHistory(data)
               }else{
                    setHistory([])
               }
          })
          // eslint-disable-next-line
     }, [])

     if(history.length === 0){
          return (
               <div>
                    <h3>No hay nada por aqui! Anda a comprar algo</h3>
               </div>
          )
     }else{
          return (
               <div>
                    {history.map(his => {
                         return(
                              <div key={his.id_history} className="border">
                                   <li>{his.title}</li>
                                   <li>{his.quantity}</li>
                                   <img src={his.photo} alt={his.title} />
                              </div>
                         )
                    })}
               </div>
          )
     }

     
}

