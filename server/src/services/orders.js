// Modelos
const {Orders, Status} = require('../models')

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
    Orders.findAll({
        include: ['Status']})
    .then(orders => orders)
    .catch(error => {
        throw new Error(error)
    })

// Editar estado de una orden
exports.editStatus = (status,id_order) =>
    Orders.update(status, {where: {id_order}})
    .then(status => status)
    .catch(error => {
        throw new Error(error)
    })