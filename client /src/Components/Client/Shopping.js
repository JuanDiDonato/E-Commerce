import React, { useState, useEffect } from 'react'
import ProductService from '../../Services/ProductService';

export default function Shoping() {

     // eslint-disable-next-line
     const [history, setHistory] = useState([])
     // eslint-disable-next-line
     const [img, setImg] = useState([])

     useEffect(() => {
          ProductService.history().then(data => {
               console.log(data);
               let images, images_array = [], image_end
               data.forEach(element => {
                    if(element.photo.includes('[') || element.photo.includes(']')){
                         images = element.photo.slice(2,-2).split(',')
                         images.forEach(image => {
                              const regex = /"/g; //g = global
                              image_end = image.replace(regex,'')
                              images_array.push(image_end)
                         })
                         
                    }
               });
               setImg(images_array)
               setHistory(data)
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
               <div className="product_end">
                    {/* eslint-disable-next-line */}
                    {history.map(his => {
                         let imgs, image_end, images = []
                         if (his.photo.includes('[') || his.photo.includes(']')) {
                              imgs = his.photo.slice(2, -2).split(',')
                              imgs.forEach(image => {
                                   const regex = /"/g; //g = global
                                   image_end = image.replace(regex, '')
                                   images.push(image_end)
                              })
                              return(
                                   <div key={his.id_history} className="card">
                                        <div className="grid">
                                             <div>
                                                  <h2>{his.title}</h2>
                                                  <h3>Unidades: {his.quantity}</h3>
                                             </div>
                                             
                                             {img ?
                                             // eslint-disable-next-line
                                             img.map(ph => {
                                                  if(ph === images[0])
                                                  return(
                                                       <img key={ph} src={'http://localhost:5000/images/'+ph} 
                                                       alt={history.name} />
                                                  )     
                                             })
                                             : null}
                                        </div>
                                   </div>
                              )
                         }
                         
                    })}
               </div>
          )
     }

     
}

