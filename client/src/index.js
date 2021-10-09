import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './Context/AuthContext';
import AdminProvider from './Context/AdminContext';
import ProductProvider from './Context/ProductContext';

ReactDOM.render(
<AuthProvider>
<ProductProvider>
     <AdminProvider>
          <App />
     </AdminProvider>
</ProductProvider>
</AuthProvider>

,document.getElementById('root'));
