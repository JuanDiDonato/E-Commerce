import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './Context/AuthContext';
import AdminProvider from './Context/AdminContext';



ReactDOM.render(
<AuthProvider>

     <AdminProvider>
          <App />
     </AdminProvider>

</AuthProvider>

,document.getElementById('root'));
