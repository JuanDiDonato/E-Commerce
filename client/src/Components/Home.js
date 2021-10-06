//eslint-disable-next-line
import React,{useState,useEffect} from 'react'
import AuthService from '../Services/AuthService';
export default function Home() {

     useEffect(() => {
     const objeto = AuthService.isAuthenticated()
          console.log(objeto);
     },[])

     return (
          <div>
               hola
          </div>
     )
}
