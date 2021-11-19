import React, { useState, useContext } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import { AuthContext } from '../Context/AuthContext';

const Login = props => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const resetForm = () => {
        setUser({ email: "", password: "" });
    }

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const { isAuthenticated, user, message } = data.data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/');
            }
            else {
                resetForm();
                setMessage(message);
            }
        });
    }



    return (
        <div className="form">
            <div>{message ? <Message message={message} /> : null}</div>

            <div>
                <div className="card">
                    <div >
                        <h2> Ingresar</h2>
                    </div>
                    <div>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" onChange={onChange} value={user.email} className="form-control" placeholder="Ingresá tu Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="mt-4 " > Contraseña</label>
                                <input type="password" name="password" onChange={onChange} value={user.password} className="form-control mb-5" placeholder="Ingresa tu Contraseña" />
                            </div>
                            <div className="form-group">
                                <button className="btn " type="submit"><h5>Iniciar Sesión</h5></button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>)
}

export default Login;
