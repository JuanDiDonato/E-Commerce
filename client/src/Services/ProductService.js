import axios from 'axios';
// eslint-disable-next-line 
export default {
     //Get products
     products : async () => {
        const data = await axios.get('/client/products' ,{validateStatus:false})
        return data
     },
     //Get produc by id
     product_id : async (id_product) =>{
          const data = await axios.get('/client/product/'+id_product ,{validateStatus:false})
          return data
     },
     //Add product to cart
     add : async (id_product,quantity) => {
          const data = await axios.post('/client/add/'+id_product, {quantity}, {validateStatus:false})
          return data
     },
     //Get cart
     getcart : async () =>{
          const data = await axios.get('/client/getcart' , {validateStatus:false})
          return data
     },

    

}