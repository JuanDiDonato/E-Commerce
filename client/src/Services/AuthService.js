// eslint-disable-next-line 
import axios from 'axios';

    export const login = async( user)=>{

       const result = await  axios.post('login',user)

        return result

    }


    export const register = async(user) =>{

        return fetch('/user/register',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    }

    export const logout = async()=>{
        return fetch('/user/logout')
                .then(res => res.json())
                .then(data => data);
                
    }


    export const isAuthenticated = ()=>{
        return fetch('/user/authenticated')
                .then(res=>{
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else{
                        return { isAuthenticated : false, user : {_id : "",data: "",role : "",name:"",surname:"",photo:""}};
                    }
   
                });
    }

