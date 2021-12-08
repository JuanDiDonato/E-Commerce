// Modelos
const {Monthly_statistics} = require('../models')

// Obtener estadisticas mensuales
exports.getMonthlyStatistics = () =>
    Monthly_statistics.findAll()
    .then(statistics => statistics)
    .catch(error => {
        throw new Error(error)
    })

// Agregar estadisticas mensuales
exports.addMonthlyStatistics = (statistics) =>
    Monthly_statistics.create(statistics)
    .then(statistics => statistics)
    .catch(error => {
        throw new Error(error)
    })
