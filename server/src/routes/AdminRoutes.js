const {Router} = require('express')
const router = Router()
const {create, categories, category,edit_category, disable,delete_category,products, product_id,
     edit, delete_product,register_admin, get_orders, delete_order, statistics, events,add_event,
     delete_event,all}  = require('../controllers/AdminControllers')
const passport = require('passport')

//Routes

//get products and events
router.get('/all', all)

//register admin
router.post('/registerAdmin', passport.authenticate('jwt',{session:false}),register_admin )

//create
router.post('/create', passport.authenticate('jwt',{session:false}),create )

//get category
router.get('/categories' ,categories)

//create category
router.post('/category', passport.authenticate('jwt',{session:false}), category)

//edit category
router.put('/category/:category', passport.authenticate('jwt',{session:false}), edit_category)

//delete category
router.delete('/category/:category', passport.authenticate('jwt',{session:false}), delete_category)

//get_all_products
router.get('/products', passport.authenticate('jwt',{session:false}), products )

//get_id
router.get('/product/:id_product',passport.authenticate('jwt',{session:false}), product_id )

//edit
router.put('/edit/:id_product',passport.authenticate('jwt',{session:false}), edit )

//disable
router.put('/disable/:id_product',passport.authenticate('jwt',{session:false}), disable )

//delete
router.delete('/delete/:id_product',passport.authenticate('jwt',{session:false}), delete_product )

//delete a order
router.post('/order/delete',  passport.authenticate('jwt',{session:false}), delete_order)

//get orders
router.get('/order', passport.authenticate('jwt',{session:false}), get_orders)

//get statistics
router.get('/statistics' ,passport.authenticate('jwt',{session:false}), statistics)

//get events
router.get('/events', passport.authenticate('jwt',{session:false}), events)

//add event
router.post('/events', passport.authenticate('jwt',{session:false}), add_event)

//delete event
router.delete('/events/:id_event', passport.authenticate('jwt',{session:false}), delete_event)


module.exports=router