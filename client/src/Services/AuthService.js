import axios from 'axios';
// eslint-disable-next-line 
export default {
  login : async(user)=>{
       const data = await axios.post('/login',user,{validateStatus:false})
   
        return data
    },
    register : async(user) =>{
    const {data}= await  axios.post('/register',user,{validateStatus:false})
    return data
    },
     logout : async()=>{
        const {data}= await axios.get('/logout',{validateStatus:false})
        return data        
    },
    isAuthenticated : async()=>{
        const {data} = await axios.get('/authenticated',{validateStatus:false})
        return data
    }

}