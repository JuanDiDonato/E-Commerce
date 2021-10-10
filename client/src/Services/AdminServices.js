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
          const {data : {products}} = await axios.get('/admin/products', {validateStatus:false})
          return products
     },
     delete: async (id_product) => {
          const {data} = await axios.delete('/admin/delete/'+id_product, {validateStatus:false})
          return data
     },
     categories : async () => {
          const {data :{categories}} = await axios.get('/admin/categories' , {validateStatus:false})
          return categories
     },
     new_category : async (category) => {
          console.log(category);
          const {data} = await axios.post('/admin/category', {category},{validateStatus:false})
          return data
     },
     edit_category : async (category,oldCategory) => {
          const {data} = await axios.put('/admin/category/'+oldCategory, {category},{validateStatus:false})
          return data
     },
     delete_category : async (category) => {
          const {data} = await axios.delete('/admin/category/'+category,{validateStatus:false})
          return data
     },
     product_id : async (id_product) =>{
          const {data} = await axios.get('/admin/product/'+id_product ,{validateStatus:false})
          return data
     },
     edit : async (post,id_product) => {
          const {data} = await axios.put('/admin/edit/'+id_product,post,{validateStatus:false})
          return data
     },
     get_orders : async () => {
          const {data : {orders}} = await axios.get('/admin/order' ,{validateStatus:false})
          return orders
     }


}