// Modelos
const {Monthly_statistics} = require('../models')

// Obtener estadisticas mensuales
exports.getMonthlyStatistics = () =>
    Monthly_statistics.findAll()
    .then(statistics => statistics)
    .catch(error => {
        throw new Error(error)
    })