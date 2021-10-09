import React, {createContext,useState,useEffect} from 'react';
// eslint-disable-next-line
import AdminServices  from '../Services/AdminServices';

export const AdminContext = createContext();
// eslint-disable-next-line 
export default ({ children })=>{
    const [categories,setCategories] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
          AdminServices.categories().then(data => {
               setCategories(data)
               setIsLoaded(true)
          })
    },[]);

    return (
        <div>
            {!isLoaded ? <h1>Cargando Categorias...</h1> : 
            <AdminContext.Provider value={{categories,setCategories}}>
                { children }
            </AdminContext.Provider>}
        </div>
    )
}