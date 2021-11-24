// Modelos
const {Categories} = require('../models')

// Obtener categorias
exports.getCategories = () => 
    Categories.findAll()
    .then(categories => categories)
    .catch(error => {
        throw new Error(error)
    })

// Obtener categorias por nombre
exports.getCategoriesByName = category => 
    Categories.findOne({where : {category}})
    .then(categories => categories)
    .catch(error => {
        throw new Error(error)
    })

// Crear categorias
exports.createCategories = category =>
    Categories.create(category)
    .then(category => category)
    .catch(error => {
        throw new Error(error)
    })

// Editar categorias
exports.editCategory = (category, oldCategory) =>
    Categories.update(category, {where : {category : oldCategory}})
    .then(category => category)
    .catch(error => {
        throw new Error(error)
    })

//Eliminar una categoria
exports.deleteCategory = category =>
    Categories.destroy({where : {category}})
    .then(category => category)
    .catch(error => {
        throw new Error(error)
    })
