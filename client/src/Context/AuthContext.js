import React, {createContext,useState,useEffect} from 'react';
// eslint-disable-next-line
import AuthService  from '../Services/AuthService';

export const AuthContext = createContext();
// eslint-disable-next-line 
export default ({ children })=>{
    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
        setIsAuthenticated(false)
       setIsLoaded(true)
    },[]);

    return (
        <div>
            {!isLoaded ? <h1>Cargando Aplicacion...</h1> : 
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
}