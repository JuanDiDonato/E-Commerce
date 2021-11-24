// Paquetes
const {Router} = require('express')
const router = Router()
const passport = require('passport')
require('../passport')

// Modulos
const {register, login, all} = require('../controllers/publics')
const {validateSchemaAndFail} = require('../middlewares/params_validator'); // middlewares
const {registerSchema, loginSchmema, } = require('../schemas/clients') //

//Client register
router.post('/register',validateSchemaAndFail(registerSchema), register)
//Login client
router.post('/login', validateSchemaAndFail(loginSchmema), passport.authenticate('local',{session:false}) , login)
//Get home data
router.get('/all', all)

module.exports=router