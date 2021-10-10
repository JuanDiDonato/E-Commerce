import React, {useState,useContext} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import {AuthContext} from '../Context/AuthContext';

const Login = props => {
    const [user,setUser] = useState({email: "", password : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const resetForm = ()=>{
        setUser({email : "", password : ""});
    }

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            const {isAuthenticated,user,message} = data.data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/');
            }
            else{
                resetForm();
                setMessage(message);
            }
        });
    }



    return(
        <div>
        <div className="container mt-3">{message ? <Message message={message}/> : null}</div>

        <div className="row mt-5 p-3">
            <div className="col-md-6 mx-auto text-center">
                <div className="card  border-warning">
                    <div className="card-header ">
                    <h2 className=" mt-1"> Ingresar</h2>
                    </div>
                    <div className="card-body">        
            <form onSubmit={onSubmit}>
                
                    <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={onChange} value={user.email} className="form-control" placeholder="Ingresá tu Email"/>
                    </div>
                    <div className="form-group">
                <label htmlFor="password"className="mt-4 " > Contraseña</label>
                <input type="password" name="password" onChange={onChange} value={user.password} className="form-control mb-5" placeholder="Ingresa tu Contraseña"/>
                    </div>
                    <div className="form-group">
                <button className="btn col-12 btn-warning btn-block" type="submit">Iniciar Sesión</button>
                    </div>
            </form>
            </div>
           
                </div>
            </div>
        </div>

     </div>)
}

export default Login;
