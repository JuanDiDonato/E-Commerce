// Modelos
const {Products, Events, Waist} = require('../models')

// Obtener productos
exports.getProducts = () =>
    Products.findAll().then(products => products)
    .catch(error => {
        throw new Error(error)
    })

// Obtener productos y eventos
exports.getProductAndEvents = () =>
    Products.findAll({
        include: [{
            model: Events,
            attributes:['event_name', 'discount', 'from_date', 'to_date']
        },
        {
            model: Waist,
            attributes:['S','M','L','XL','XXL','XXXL']
        }]
    }).then(products => products)
    .catch(error => {
        throw new Error(error)
    })

// Obtener un producto
exports.getProduct = id =>
    Products.findOne({
        where : {id},
        include: [{
            model: Events,
            attributes:['event_name', 'discount', 'from_date', 'to_date']
        },
        {
            model: Waist,
            attributes:['S','M','L','XL','XXL','XXXL']
        }]
    }).then(product => product)
    .catch(error => {
        throw new Error(error)
    })

// Crear un producto
exports.createProducts = data =>
    Products.create(data)
    .then(product => product)
    .catch(error => {
        throw new Error(error)
    })

// Deshabilitar producto
exports.disableProduct = (disable,id) => 
    Products.update(disable, {where : {id}})
    .then(product => product)
    .catch(error => {
        throw new Error(error)
    })

// Editar un Producto
exports.editProduct = (data, id) =>
    Products.update(data, {where : {id}})
    .then(product => product)
    .catch(error => {
        throw new Error(error)
    })

// Editar producto por evento
exports.editProductByEvent = (data, id_event) =>
    Products.update(data, {where : {id_event}})
    .then(product => product)
    .catch(error => {
        throw new Error(error)
    })

// Borrar un producto
exports.deleteProduct = id => 
    Products.destroy({where : {id}})
    .then(product => product)
    .catch(error => {
        throw new Error(error)
    })

