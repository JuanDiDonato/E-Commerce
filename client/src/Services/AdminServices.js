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
     disable : async (disable,id_product) => {
          const {data} = await axios.put('/admin/disable/'+id_product,{disable},{validateStatus:false})
          return data
     },
     get_orders : async () => {
          const {data : {orders}} = await axios.get('/admin/order' ,{validateStatus:false})
          return orders
     },
     end_order : async (id_order) => {
          const {data} = await axios.post('/admin/order/delete', {id_order},{validateStatus:false})
          return data
     },
     statistics : async () => {
          const {data : {data}} = await axios.get('/admin/statistics',{validateStatus:false})
          return data
     },
     get_events : async () => {
          const {data:{events}} = await axios.get('/admin/events',{validateStatus:false})
          return events
     },
     add_event : async (event,id_products) => {
          const {data} = await axios.post('/admin/events', {event,id_products},{validateStatus:false})
          return data
     },
     delete_event : async (id_event) => {
          const {data} = await axios.delete('/admin/events/'+id_event, {validateStatus:false})
          return data
     },
     get_event : async (id_event) => {
          const {data} = await axios.get('/admin/event/'+id_event, {validateStatus:false})
          return data
     },
     update_event : async (event,id_event,id_products) => {
          const {data} = await axios.put('/admin/event/'+id_event, {event,id_products}, {validateStatus:false})
          return data
     },
     Mstatistics : async () => {
          const {data } = await axios.get('/admin/Mstatistics', {validateStatus:false})
          return data
     }

}