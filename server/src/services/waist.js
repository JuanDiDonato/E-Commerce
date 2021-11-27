// Modelo
const {Waist} = require('../models')


// Agregar Stock
exports.addStock = (stock) =>
    Waist.create(stock).
    then(stock => stock)
    .catch(error => {
        throw new Error(error)
    })

// Editar stock
exports.editStock = (stock, id) =>
    Waist.update(stock, {where : {id}})
    .then(stock => stock)
    .catch(error => {
        throw new Error(error)
    })
