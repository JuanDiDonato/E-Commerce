const pool = require('../database/connection')
const ctrl = {}
const {EncryptPassword} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

ctrl.SignToken = Id_user => {
    return jwt.sign({
        iss: 'm1ch1',
        sub: Id_user
    },'m1ch1', {expiresIn: '1h'})
}

ctrl.register = async (req, res) => {
    const {username, password} = req.body
    if(username == null || username =='' || password == null || password == ''){
        res.json({'[-]' : 'Complete todos los campos.'})
    }else{
        const VerifyUser = await pool.query('SELECT * FROM users WHERE username = ?', username)
        if(VerifyUser.length >= 1){
            res.json({'[-]' : 'Este usuario ya existe.'})
        }else{
            const HashPassword = await EncryptPassword(password)
            await pool.query('INSERT INTO users SET ?', {username,'password': HashPassword})
            res.json({'[+]':'Usuario creado exitosamente.'})
        }
    }

}

ctrl.login = async (req, res) => {
    if(req.isAuthenticated()){
        const {username, id_user} = req.user
        token = ctrl.SignToken(id_user)
        res.cookie('access_token', token, {httpOnly : true, sameSite : true})
        res.json({'[+]' : 'Logeado como '+username})
    }
}



module.exports=ctrl