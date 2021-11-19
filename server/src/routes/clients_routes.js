const {Router} = require('express')
const router = Router()
const clientsControllers = require('../controllers/clients')
const passport = require('passport')
require('../passport')

//POST REQUEST
//Client register
router.post('/register', clientsControllers.register)
//Email
router.post('/email', clientsControllers.email)
//Address Register
router.post('/address', passport.authenticate('jwt',{session:false}), clientsControllers.address)
//Login client
router.post('/login',passport.authenticate('local',{session:false}) ,clientsControllers.login)
//Mercado Pago
router.post('/mercadopago', passport.authenticate('jwt',{session:false}) , clientsControllers.mercadopago)
//Add to cart
router.post('/add/:id_product', passport.authenticate('jwt',{session:false}),clientsControllers.add_cart)
//Add order
router.post('/order', passport.authenticate('jwt',{session:false}), clientsControllers.order)
//Append to history
router.post('/history', passport.authenticate('jwt',{session:false}), clientsControllers.save_history)
//Add statistics
router.post('/statistics', passport.authenticate('jwt', { session: false }), clientsControllers.statistics)

//GET REQUEST
//Logout
router.get('/logout',passport.authenticate('jwt',{session:false}) ,clientsControllers.logout)
//Get categories
router.get('/categories', clientsControllers.categories)
//Get products
router.get('/products', clientsControllers.products)
//Get a product by id
router.get('/product/:id_product',passport.authenticate('jwt',{session:false}), clientsControllers.product_id )
//Show cart
router.get('/cart', passport.authenticate('jwt',{session:false}),clientsControllers.get_cart)
//Get history
router.get('/history', passport.authenticate('jwt',{session:false}), clientsControllers.history)
//Authenticated
router.get('/authenticated', passport.authenticate('jwt', { session: false }), clientsControllers.authenticated )

//DELETE REQUEST
//Delete of cart
router.delete('/add/:id_product', passport.authenticate('jwt',{session:false}),clientsControllers.delete_cart)
//Clear cart
router.delete('/clear',  passport.authenticate('jwt',{session:false}),clientsControllers.clear)

//PUT REQUEST
//Stock
router.put('/edit/stock/:id_product',passport.authenticate('jwt',{session:false}), clientsControllers.stock )

module.exports=router