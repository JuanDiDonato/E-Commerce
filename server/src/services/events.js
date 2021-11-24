// Modelos
const {Events} = require('../models')

// Obtener eventos
exports.getEvents = () =>
    Events.findAll()
    .then(events => events)
    .catch(error => {
        throw new Error(error)
    })

// Obtener evento por nombre
exports.getEvent = event_name =>
    Events.findAll({where : {event_name}})
    .then(events => events)
    .catch(error => {
        throw new Error(error)
    })

// Obtener evento por id
exports.getEventById = id_event =>
    Events.findAll({where : {id_event}})
    .then(events => events)
    .catch(error => {
        throw new Error(error)
    })

// Crear evento
exports.createEvent = data => 
    Events.create(data)
    .then(event => event)
    .catch(error => {
        throw new Error(error)
    })

// Borrar Eventos
exports.deleteEvent = id_event =>
    Events.destroy({where : {id_event}})
    .then(event => event)
    .catch(error => {
        throw new Error(error)
    })

// Editar eventos
exports.editEvent = (data, id_event) =>
    Events.update(data, {where : {id_event}})
    .then(event => event)
    .catch(error => {
        throw new Error(error)
    })