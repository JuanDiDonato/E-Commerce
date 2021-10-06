const {Router} = require('express')
const router = Router()
const {register, login, products, authenticated, add, add_cart, delete_cart}  = require('../controllers/ClientControllers')
const passport = require('passport')
require('../passport')

//Registrar cliente
router.post('/register', register)

//Loguear cliente
router.post('/login',passport.authenticate('local',{session:false}) ,login)

//Obtener productos
router.get('/products', passport.authenticate('jwt',{session:false}), products)

//Agregar al carrito
router.get('/add', passport.authenticate('jwt',{session:false}),add)

//Agregar al carrito
router.post('/add/:id_product', passport.authenticate('jwt',{session:false}),add_cart)

//Sacar al carrito
router.delete('/add/:id_product', passport.authenticate('jwt',{session:false}),delete_cart)

//Authenticated
router.get('/authenticated', passport.authenticate('jwt', { session: false }), authenticated )

module.exports=router