const {getProductAndEvents} = require('../services/products') // Servicios de Productos
const {signToken, newUser} = require('../services/clients')
const ctrl = {}

// Regtister user
ctrl.register = (req, res, next) => {
    const {email, fullname, password} = req.body
    const id_role = '1'
    newUser({email, fullname, password, id_role}).then(user => 
        res.status(201).json({message:'Usuario creado exitosamente', 
        error : false}))
    .catch(error => res.status(400).send(error), next)
}

// Login
ctrl.login = (req, res) => {
    if(req.isAuthenticated()){
        const {fullname,email, id, id_role, address} = req.user
        const token = signToken(id)
        res.cookie('access_token', token, {httpOnly : true, sameSite : true})
        res.status(200).send({isAuthenticated : true, user: {fullname, email,id,id_role, address}})
    }
}

//Get products and events
ctrl.all = (req, res, next) => {
    getProductAndEvents().then(products => res.status(200).send({products}))
    .catch(next)
}

module.exports=ctrl