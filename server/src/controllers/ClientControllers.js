const pool = require('../database/connection')
const ctrl = {}
const {EncryptPassword} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

//Crear token de acceso
ctrl.SignToken = Id_user => {
    return jwt.sign({
        iss: 'm1ch1',
        sub: Id_user
    },'m1ch1', {expiresIn: '1h'})
}
//Registrar usuario
ctrl.register = async (req, res) => {
    const {email, password} = req.body
    const id_rol= '1'
    if(email == null || email =='' || password == null || password == ''){
        res.json({'[-]' : 'Complete todos los campos.'})
    }else{
        const VerifyUser = await pool.query('SELECT * FROM users WHERE email = ?', email)
        if(VerifyUser.length >= 1){
            res.json({'[-]' : 'Este usuario ya existe.'})
        }else{
            const HashPassword = await EncryptPassword(password)
            await pool.query('INSERT INTO users SET ?', {email,'password': HashPassword, id_rol})
            res.json({'[+]':'Usuario creado exitosamente.'})
        }
    }
}
//Loguear usuario
ctrl.login = async (req, res) => {
    if(req.isAuthenticated()){
        const {email, id_user} = req.user
        token = ctrl.SignToken(id_user)
        res.cookie('access_token', token, {httpOnly : true, sameSite : true})
        res.json({'[+]' : 'Logeado con '+email})
    }
}
//Obtener productos
ctrl.products = async (req, res) => {
    const result = await pool.query('SELECT * FROM products')
    res.json(result)
}


module.exports=ctrl