// Paquetes
const {Router} = require('express')
const router = Router()
const passport = require('passport')
require('../passport')

// Modulos
const {register, login} = require('../controllers/publics')
const {validateSchemaAndFail} = require('../middlewares/params_validator'); // middlewares
const {registerSchema, loginSchmema, } = require('../schemas/clients')

//Client register
router.post('/register',validateSchemaAndFail(registerSchema), register)
//Login client
router.post('/login', validateSchemaAndFail(loginSchmema), passport.authenticate('local',{session:false}) , login)

module.exports=router