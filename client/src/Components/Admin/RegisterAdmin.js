import React, { useState, useRef, useEffect } from 'react'
import AdminServices from '../../Services/AdminServices'
import Message from '../../Components/Message';

export default function RegisterAdmin(props) {

     const [user,setUser] = useState({email: "", password : ""});
     // eslint-disable-next-line
     const [message,setMessage] = useState(null);

     useEffect(() => {
          return () => {
               clearTimeout(timerID);
          }
     }, []);

     let timerID =useRef(null)

     const onChange = e => {
          setUser({ ...user, [e.target.name]: e.target.value });
     }

     const resetForm = () => {
          setUser({ email: "", password: "" });
     }

     const onSubmit = e => {
          e.preventDefault();
          AdminServices.register_admin(user).then(data => {
               if (data.message.error === false) {
                    alert(data.message.message)
                    props.history.push('/login')
               }
               if (data.message.error === true) {
                    alert(data.message.message)
                    resetForm()
               }
          })
     }

     return (
          <div className="ml-1 mr-1 z-1">
               <div className="container mt-3">{message ? <Message message={message} /> : null}</div>
               <div className="row mt-5 p-3">
                    <div className="col-md-6 mx-auto text-center">
                         <div className="card  border-warning">
                              <div className="card-header ">
                                   <h2 className=" mt-1"> Registrar nuevo administrador</h2>
                              </div>
                              <div className="card-body">
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
                                             <button className="btn col-12 btn-warning btn-block" type="submit">Registrar</button>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}