// Modelos
const {Orders} = require('../models')

// Agregar Ordenes
exports.addOrder = data => 
    Orders.create(data)
    .then(order => order)
    .catch(error => {
        throw new Error(error)
    })

// Borrar una orden
exports.deleteOrder = id =>
    Orders.destroy({where : {id_order : id}})
    .then(order => order)
    .catch(error => {
        throw new Error(error)
    })

// Obtener Ordenes
exports.getOrders = () =>
    Orders.findAll()
    .then(orders => orders)
    .catch(error => {
        throw new Error(error)
    })