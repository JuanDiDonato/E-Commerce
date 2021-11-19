import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';

const Register = props=>{
    const [user,setUser] = useState({email: "", fullname : "",password : ""});
    //eslint-disable-next-line
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({email : "",  fullname : "", password : ""});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            if(data.error === false){
                alert(data.message)
                props.history.push('/login')
            }
            if(data.error === true){
                alert(data.message)
                resetForm()
            }
        })
    }



    return(
        <div className="form">
            <div>{message ? <Message message={message}/> : null}</div>  
            <div>
                <div>
                <div className="card">
                    <div>
                    <h2> Registrar Cuenta</h2>
                    </div>
                    <div>        
                        <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" onChange={onChange} value={user.email} className="form-control" placeholder="Ingresá tu Email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="text">Nombre completo</label>
                                    <input type="text" name="fullname" onChange={onChange} value={user.fullname} className="form-control" placeholder="Ingrese su nombre y apellido"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password"className="mt-4 " > Contraseña</label>
                                    <input type="password" name="password" onChange={onChange} value={user.password} className="form-control mb-5" placeholder="Ingresa tu Contraseña"/>
                                </div>
                                <div className="form-group">
                            <button className="btn " type="submit"><h5>Registrar</h5></button>
                                </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Register;