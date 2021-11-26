import axios from 'axios';
// eslint-disable-next-line 
export default {
     register_admin : async (user) => {
          const {data} = await axios.post('/admin/admin', user, {validateStatus:false})
          return data
     },
     create : async (formData) => {
          const {data} = await axios.post('/admin/create', formData, {validateStatus:false})
          return data
     },
     products : async () => {
          const {data : {products}} = await axios.get('/general/products', {validateStatus:false})
          return products
     },
     delete: async (id_product) => {
          const {data} = await axios.delete('/admin/delete/'+id_product, {validateStatus:false})
          return data
     },
     categories : async () => {
          const {data :{categories}} = await axios.get('/general/categories' , {validateStatus:false})
          return categories
     },
     new_category : async (category) => {
          console.log(category);
          const {data} = await axios.post('/admin/category', {category},{validateStatus:false})
          return data
     },
     edit_category : async (category,oldCategory) => {
          const {data} = await axios.put('/admin/category/'+oldCategory, {category},{validateStatus:false})
          console.log(data);
          return data
     },
     delete_category : async (category) => {
          const {data} = await axios.delete('/admin/category/'+category,{validateStatus:false})
          return data
     },
     product_id : async (id_product) =>{
          const {data} = await axios.get('/general/product/'+id_product ,{validateStatus:false})
          return data
     },
     edit : async (formData,id_product) => {
          const {data} = await axios.put('/admin/edit/'+id_product,formData,{validateStatus:false})
          return data
     },
     disable : async (disable,id_product) => {
          const {data : {products}} = await axios.put('/admin/disable/'+id_product,{disable},{validateStatus:false})
          return products
     },
     get_orders : async () => {
          const {data : {orders}} = await axios.get('/admin/order' ,{validateStatus:false})
          return orders
     },
     end_order : async (id_order) => {
          const {data} = await axios.delete('/admin/order/delete/'+id_order, {id_order},{validateStatus:false})
          return data
     },
     statistics : async () => {
          const {data : {statistics}} = await axios.get('/admin/statistics',{validateStatus:false})
          return statistics
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
          const {data : {MonthlyStatistics}} = await axios.get('/admin/statistics/monthly', {validateStatus:false})
          return MonthlyStatistics
     }

}