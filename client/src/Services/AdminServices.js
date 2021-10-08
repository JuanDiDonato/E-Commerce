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
     } 

}