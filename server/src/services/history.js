const {History_shoppings} = require('../models')

// Obtener Historial
exports.getHistory = id => 
    History_shoppings.findAll({where : {id_user : id}})
    .then(history => history)
    .catch(error => {
        throw new Error(error)
    })

// Agregar al historial
exports.addHistory = data =>
    History_shoppings.create(data)
    .then(history => history)
    .catch(error => {
        throw new Error(error)
    })