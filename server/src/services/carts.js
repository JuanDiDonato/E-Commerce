// Modelos
const {Carts, Products, Events} = require('../models')

// Obtener carro por usuario
exports.getCart = id_user =>
    Carts.findAll({
        where : {id_user},
        include: [
            {   
                model: Products,
                include : Events,
                attributes:['title', 'id_event', 'stock', 'photo'],
            },
        ]
    }).then(cart => cart)
    .catch(error => {
        throw new Error(error)
    })
// Obtener carro por producto
exports.getCartByProduct = (id,id_product) =>
    Carts.findAll({
        where : {id_user : id, id_product}
    }).then(cart => cart)
    .catch(error => {
        throw new Error(error)
    })
// Agregar al carro
exports.addToCart = data => 
    Carts.create(data)
    .then(cart => cart)
    .catch(error => {
        throw new Error(error)
    })
// Borrar del carrito por producto
exports.deleteOfCart = (id, id_product) => 
    Carts.destroy({
        where : {id_user : id, id_product}
    }).then(cart => cart)
    .catch(error => {
        throw new Error(error)
    })
// Borrar todo el carritoexports.deleteOfCart = (id, id_product) => 
exports.deleteAllOfCart = id => 
    Carts.destroy({
        where : {id_user : id}
    }).then(cart => cart)
    .catch(error => {
        throw new Error(error)
    })
