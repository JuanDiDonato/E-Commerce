import axios from 'axios';
// eslint-disable-next-line 
export default {
     //Get products
     products : async () => {
        const {data} = await axios.get('/client/products' ,{validateStatus:false})
        return data
     },
     //Get produc by id
     product_id : async (id_product) =>{
          const {data} = await axios.get('/client/product/'+id_product ,{validateStatus:false})
          return data
     },
     //Add product to cart
     add : async (id_product,quantity) => {
          const {data : {messages}} = await axios.post('/client/add/'+id_product, {quantity}, {validateStatus:false})
          return messages
     },
     //Get cart
     getcart : async () =>{
          const {data} = await axios.get('/client/getcart' , {validateStatus:false})
          return data
     },
     //Delete of cart
     delete_cart : async (id_product) =>{
          const {data : {messages}} = await axios.delete('/client/add/'+id_product , {validateStatus:false})
          return messages
     },
     //Mercado pago
     mercadopago : async (product_data) => {
          const {data} = await axios.post('/client/mercadopago', {product_data}, {validateStatus:false})
          return data
     },
     //Get categories
     categories : async () => {
          const {data : {categories}} = await axios.get('/client/categories' , {validateStatus:false})
          return categories
     },
     //Clear cart
     clear_cart : async () => {
          const {data} = await axios.delete('/client/clear' ,{validateStatus:false})
          return data
     },
     //add order
     add_order : async (id_product, address, quantity) => {
          const {data} = await axios.post('/client/order', {id_product, address, quantity},{validateStatus:false})
          return data
     },
     //get history
     history : async() => {
          const {data : {history}} = await axios.get('/client/history',{validateStatus:false})
          return history
     },
     //save in history
     save_in_history : async(id_product, quantity) => {
          const {data} = await axios.post('/client/history', {id_product, quantity},{validateStatus:false})
          return data
     },
     


    

}