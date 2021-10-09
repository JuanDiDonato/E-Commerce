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
          const {data} = await axios.post('/client/add/'+id_product, {quantity}, {validateStatus:false})
          return data
     },
     //Get cart
     getcart : async () =>{
          const {data} = await axios.get('/client/getcart' , {validateStatus:false})
          return data
     },
     //Delete of cart
     delete_cart : async (id_product) =>{
          const {data} = await axios.delete('/client/add/'+id_product , {validateStatus:false})
          return data
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
     clear_cart : async () => {
          const {data} = await axios.delete('/client/clear' ,{validateStatus:false})
          return data
     }

    

}