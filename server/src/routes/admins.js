const {Router} = require('express')
const router = Router()
const adminsControllers = require('../controllers/admins')
const passport = require('passport')

const {validateSchemaAndFail} = require('../middlewares/params_validator'); // middlewares
const {registerSchema, editStockSchema} = require('../schemas/clients')  // Esquema clientes
const {categorySchema} = require('../schemas/categories')  // Esquema de Categorias
const {productSchema} = require('../schemas/products')  // Esquema de Productos
const {eventSchema} = require('../schemas/events')  // Esquema de Eventos

//POST REQUEST
//Register admin
router.post('/admin', validateSchemaAndFail(registerSchema),passport.authenticate('jwt',{session:false}), adminsControllers.register_admin )
//Create product
router.post('/create', validateSchemaAndFail(productSchema),passport.authenticate('jwt',{session:false}), adminsControllers.create)
//Create category
router.post('/category', validateSchemaAndFail(categorySchema),passport.authenticate('jwt',{session:false}), adminsControllers.category)
//Add event
router.post('/events', validateSchemaAndFail(eventSchema),passport.authenticate('jwt',{session:false}), adminsControllers.add_event)

//GET REQUEST
//Get orders
router.get('/order', passport.authenticate('jwt',{session:false}), adminsControllers.get_orders)
//Get statistics
router.get('/statistics' ,passport.authenticate('jwt',{session:false}), adminsControllers.statistics)
//Get monthly statistics
router.get('/statistics/monthly' ,passport.authenticate('jwt',{session:false}), adminsControllers.Mstatistics)
//Get events
router.get('/events', passport.authenticate('jwt',{session:false}), adminsControllers.events)
//Get event by id
router.get('/event/:id_event', passport.authenticate('jwt',{session:false}), adminsControllers.event)

//DELETE REQUEST
//Delete category
router.delete('/category/:category', passport.authenticate('jwt',{session:false}), adminsControllers.delete_category)
//Delete a product
router.delete('/delete/:id_product',passport.authenticate('jwt',{session:false}), adminsControllers.delete_product )
//Delete a order
router.delete('/order/delete/:id_order',  passport.authenticate('jwt',{session:false}), adminsControllers.delete_order)
//Delete event
router.delete('/events/:id_event', passport.authenticate('jwt',{session:false}), adminsControllers.delete_event)

//PUT REQUEST
//Edit category
router.put('/category/:category', validateSchemaAndFail(categorySchema),passport.authenticate('jwt',{session:false}), adminsControllers.edit_category)
//Edit product
router.put('/edit/:id_product',validateSchemaAndFail(productSchema), passport.authenticate('jwt',{session:false}), adminsControllers.edit)
//Disable product
router.put('/disable/:id_product',passport.authenticate('jwt',{session:false}), adminsControllers.disable )
//Update event
router.put('/event/:id_event', passport.authenticate('jwt',{session:false}), adminsControllers.update_event)
//Stock
router.put('/edit/stock/:id_product', validateSchemaAndFail(editStockSchema),passport.authenticate('jwt',{session:false}), adminsControllers.stock )
//Edit status
router.put('/edit/status/:id_order',passport.authenticate('jwt',{session:false}), adminsControllers.edit_status )
module.exports=router