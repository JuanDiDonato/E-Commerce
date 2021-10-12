const {Router} = require('express')
const router = Router()
const {register, address, login, logout, products, product_id, categories, authenticated, get_cart, add_cart, delete_cart, clear,order, mercadopago, history, save_history, statistics}  = require('../controllers/ClientControllers')
const passport = require('passport')
require('../passport')

//Registrar cliente
router.post('/register', register)

//Registrar Domicilio
router.post('/address', passport.authenticate('jwt',{session:false}), address)

//Loguear cliente
router.post('/login',passport.authenticate('local',{session:false}) ,login)

//Cerrar session
router.get('/logout',passport.authenticate('jwt',{session:false}) ,logout)

//Mercado Pago
router.post('/mercadopago', passport.authenticate('jwt',{session:false}) , mercadopago)

//Obtener categorias
router.get('/categories', categories)

//Obtener productos
router.get('/products', products)

//Obtener productos por id
router.get('/product/:id_product',passport.authenticate('jwt',{session:false}), product_id )

//Ver carrito
router.get('/getcart', passport.authenticate('jwt',{session:false}),get_cart)

//Agregar al carrito
router.post('/add/:id_product', passport.authenticate('jwt',{session:false}),add_cart)

//Sacar al carrito
router.delete('/add/:id_product', passport.authenticate('jwt',{session:false}),delete_cart)

//Vaciar carrito
router.delete('/clear',  passport.authenticate('jwt',{session:false}), clear)

//Agregar orden
router.post('/order', passport.authenticate('jwt',{session:false}), order)

//Obtener Histoial
router.get('/history', passport.authenticate('jwt',{session:false}), history)

//Agregar al historial
router.post('/history', passport.authenticate('jwt',{session:false}), save_history)

//Authenticated
router.get('/authenticated', passport.authenticate('jwt', { session: false }), authenticated )

//Agregar estadisticas
router.post('/statistics', passport.authenticate('jwt', { session: false }), statistics)

module.exports=router