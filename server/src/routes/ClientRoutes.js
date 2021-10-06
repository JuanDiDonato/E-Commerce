const {Router} = require('express')
const router = Router()
const {register, login, products, authenticated}  = require('../controllers/ClientControllers')
const passport = require('passport')
require('../passport')


router.post('/register', register)

router.post('/login',passport.authenticate('local',{session:false}) ,login)

router.get('/products', passport.authenticate('jwt',{session:false}), products )

//Authenticated
router.get('/authenticated', passport.authenticate('jwt', { session: false }), authenticated )

module.exports=router