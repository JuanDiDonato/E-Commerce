import axios from 'axios';
// eslint-disable-next-line 
export default {
    login : async(user)=>{
        const data = await axios.post('/public/login',user,{validateStatus:false})
        return data
    },

    register : async(user) =>{
        const {data}= await  axios.post('/public/register',user,{validateStatus:false})
        return data
    },

    logout : async()=>{
        const {data}= await axios.get('/general/logout',{validateStatus:false})
        return data        
    },
    
    isAuthenticated : async()=>{
        const {data} = await axios.get('/client/authenticated',{validateStatus:false})
        return data
    },

    address : async(address) => {
        const {data} = await axios.post('/client/address', {address},{validateStatus:false})
        return data
    }

}