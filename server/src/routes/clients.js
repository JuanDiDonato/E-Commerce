// Paquetes
const {Router} = require('express')
const router = Router()
const passport = require('passport')
require('../passport')

// Modulos
const clientsControllers = require('../controllers/clients')
const {validateSchemaAndFail} = require('../middlewares/params_validator'); // middlewares
const {registerSchema, 
    registerAddressSchema,
     loginSchmema, 
     editStockSchema} = require('../schemas/clients')
const {addCartSchema} = require('../schemas/carts')
const {registerOrderSchema} = require('../schemas/orders')
const {historySchema} = require('../schemas/history')
const {staticticsSchema} = require('../schemas/statistics')

//POST REQUEST
//Email
router.post('/email', clientsControllers.email)
//Address Register
router.post('/address', validateSchemaAndFail(registerAddressSchema),passport.authenticate('jwt',{session:false}), clientsControllers.address)
//Mercado Pago
router.post('/mercadopago', passport.authenticate('jwt',{session:false}) , clientsControllers.mercadopago)
//Add to cart
router.post('/add/:id_product', validateSchemaAndFail(addCartSchema) ,passport.authenticate('jwt',{session:false}),clientsControllers.add_cart)
//Add order
router.post('/order', validateSchemaAndFail(registerOrderSchema),passport.authenticate('jwt',{session:false}), clientsControllers.order)
//Append to history
router.post('/history', validateSchemaAndFail(historySchema) ,passport.authenticate('jwt',{session:false}), clientsControllers.save_history)
//Add statistics
router.post('/statistics', validateSchemaAndFail(staticticsSchema),passport.authenticate('jwt', { session: false }), clientsControllers.statistics)

//GET REQUEST
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
router.put('/edit/stock/:id_product', validateSchemaAndFail(editStockSchema),passport.authenticate('jwt',{session:false}), clientsControllers.stock )

module.exports=router