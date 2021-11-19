import React, {createContext,useState} from 'react';

export const ProductContext = createContext();
// eslint-disable-next-line 
export default ({ children })=>{

     const [itemsToBuy, setItemsToBuy] = useState(0)

     return (
        <div>
            <ProductContext.Provider value={{itemsToBuy, setItemsToBuy}}>
                { children }
            </ProductContext.Provider>
        </div>
    )
}