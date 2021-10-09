import React, {createContext,useEffect,useState} from 'react';
import ProductService from '../Services/ProductService';

export const ProductContext = createContext();
// eslint-disable-next-line 
export default ({ children })=>{

     const [itemsToBuy, setItemsToBuy] = useState([])
     useEffect(() => {
          ProductService.getcart().then(data => {
               setItemsToBuy(data)
          })
     }, [])
     return (
        <div>
            <ProductContext.Provider value={{itemsToBuy, setItemsToBuy}}>
                { children }
            </ProductContext.Provider>
        </div>
    )
}