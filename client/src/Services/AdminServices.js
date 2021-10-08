import axios from 'axios';
// eslint-disable-next-line 
export default {
     register_admin : async (user) => {
          const {data} = await axios.post('/admin/registerAdmin', user, {validateStatus:false})
          return data
     },
     create : async (post) => {
          const {data} = await axios.post('/admin/create', post, {validateStatus:false})
          return data
     },
     products : async () => {
          const {data} = await axios.get('/admin/products', {validateStatus:false})
          return data
     },
     delete: async (id_product) => {
          const {data} = await axios.delete('/admin/delete/'+id_product, {validateStatus:false})
          return data
     },
     categories : async () => {
          const {data : {categories}} = await axios.get('/admin/categories' , {validateStatus:false})
          return categories
     },
     product_id : async (id_product) =>{
          const {data} = await axios.get('/admin/product/'+id_product ,{validateStatus:false})
          return data
     },
     edit : async (post,id_product) => {
          const {data} = await axios.put('/admin/edit/'+id_product,post,{validateStatus:false})
          return data
     }


}