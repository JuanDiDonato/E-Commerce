// Modulos
const {getProducts, getProduct, getProductAndEvents} = require('../services/products') // Servicios de Productos
const {getCategories} = require('../services/categories') // Servicios de categorias
const ctrl = {}

//Logout
ctrl.logout = (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json(
        { user: { name: '', surname: '', username: '', password: ''}, 
        error: false });
};

//Get categories
ctrl.categories = (req, res, next) => {
    getCategories().then(categories => res.status(200).json({categories}))
    .catch(next)
}

//Get products
ctrl.products = (req, res, next) => {
    getProducts().then(products => res.status(200).send({products}))
    .catch(next)
}

//Get products by id
ctrl.product_id = (req, res, next) => {
    const { id_product } = req.params
    getProduct(id_product).then(product => res.status(200).send(product))
    .catch(next)
}

module.exports=ctrl