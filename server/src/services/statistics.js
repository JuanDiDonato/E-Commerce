// Modelos
const {Statistics} = require('../models')

// Añadir estadisticas
exports.addStatistics = data => 
    Statistics.create(data).then(data => data)
    .catch(error => {
        throw new Error(error)
    }) 

// Obtener estadisticas
exports.getStatistics = () =>
    Statistics.findAll()
    .then(statistics => statistics)
    .catch(error => {
        throw new Error(error)
    }) 

// Borrar estadiscticas
exports.deleteStatistics = () =>
    Statistics.destroy()
    .then(statistics => statistics)
    .catch(error => {
        throw new Error(error)
    }) 