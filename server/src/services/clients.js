// Paquetes
const jwt = require('jsonwebtoken')
// Modelos
const {Users} = require('../models')

//Crear access token
exports.signToken = id_user => {
    return jwt.sign({
        iss: process.env.JWT,
        sub: id_user
    },process.env.JWT, {expiresIn: '10h'})
}
// Registrar usuario
exports.newUser = data => 
    Users.create(data)
    .then(user => user) // Retorno el usuario
    .catch(error => {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw 'User´s email already exists';  // throw es como un return, pero especifico para errores
        }
        throw new Error(error)
    })

// Obtener usuario
exports.getUser = (id) =>
    Users.findOne({where : {id}})
    .then(user => user)
    .catch(error => {
        throw new Error(error)
    }) 

// Registrar direccion
exports.registerAddress = (address, id) => 
    Users.update(address, {where: {id}})
    .then(user => user) 
    .catch(error => {
        throw new Error(error)
    })


