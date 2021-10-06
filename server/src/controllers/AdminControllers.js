const pool = require('../database/connection')
const ctrl = {}

//Crear producto
ctrl.create = async (req, res) => {
    const {categories, description, price, stock} = req.body
    await pool.query('INSERT INTO products SET ?', {categories,description, price, stock})
   res.json('Añadido exitosamente.')
}
//Obtener productos
ctrl.products = async (req, res) => {
    const result = await pool.query('SELECT * FROM products')
    res.json(result)
}
//Obtener producto por id
ctrl.product_id = async (req, res) => {
    const {id} = req.params
    const result = await pool.query('SELECT * FROM products WHERE id_product = ?', id)
    res.json(result[0])
}
//Editar producto por id
ctrl.edit = async (req, res) => {
    const {categories, description, price, stock} = req.body
    const {id} = req.params 
    const obj = { categories, description, price, stock}
    await pool.query('UPDATE products SET ? WHERE id_product = ? ', [obj,id]) 
    res.json('Actualizado satifactoriamente.')
}
//Borrar producto por id
ctrl.delete_product = async (req, res) => {
    const {id} = req.params
    await pool.query('DELETE FROM products WHERE id_product = ?', id)
    res.json('Producto eliminado satifactoriamente.')
}

module.exports=ctrl