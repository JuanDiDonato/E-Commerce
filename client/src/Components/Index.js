//eslint-disable-next-line
import React,{useContext,useState,useEffect} from 'react';
import { AuthContext } from '../Context/AuthContext';

import Homes from  './Client/Home';
import Dashboard from './Admin/Dashboard';


export default function Index() {

     //eslint-disable-next-line
     const {user} = useContext(AuthContext)
      //eslint-disable-next-line
     const [cart, setCart] = useState([])


if(!user)
return (<Homes/>)
    
else if(user.id_role===2)
return(<Dashboard/>)
else
return(<Homes/>)

}
