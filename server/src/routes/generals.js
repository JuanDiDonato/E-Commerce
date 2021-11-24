// Paquetes
const {Router} = require('express')
const router = Router()
const passport = require('passport')
require('../passport')

// Modulos
const {logout, products, categories, product_id} = require('../controllers/generals')

//Logout
router.get('/logout',passport.authenticate('jwt',{session:false}),logout)

//Get categories
router.get('/categories',categories)

//Get all products
router.get('/products', passport.authenticate('jwt',{session:false}),products)

//Get products by id
router.get('/product/:id_product',passport.authenticate('jwt',{session:false}),product_id)

module.exports=router