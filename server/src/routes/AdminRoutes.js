const {Router} = require('express')
const router = Router()
const {create, logout, products, product_id, edit, delete_product,register_admin}  = require('../controllers/AdminControllers')
const passport = require('passport')

//Routes
//register admin
router.post('/registerAdmin', passport.authenticate('jwt',{session:false}),register_admin )

//create
router.post('/create', passport.authenticate('jwt',{session:false}),create )

//get_all_products
router.get('/products', passport.authenticate('jwt',{session:false}), products )

//get_id
router.get('/product/:id',passport.authenticate('jwt',{session:false}), product_id )

//edit
router.put('/edit/:id',passport.authenticate('jwt',{session:false}), edit )

//delete
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}), delete_product )

module.exports=router