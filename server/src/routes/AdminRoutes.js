const {Router} = require('express')
const router = Router()
const {create, categories, category, edit_category, delete_category,products, product_id, edit, delete_product,register_admin}  = require('../controllers/AdminControllers')
const passport = require('passport')

//Routes
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

//delete
router.delete('/delete/:id_product',passport.authenticate('jwt',{session:false}), delete_product )

module.exports=router