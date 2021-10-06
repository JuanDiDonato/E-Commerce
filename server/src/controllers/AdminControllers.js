const pool = require('../database/connection')
const {EncryptPassword} = require('../helpers/bcrypt')
const ctrl = {}



//Crear usuario admin
ctrl.register_admin = async (req, res) => {
    const {email, password} = req.body
    const {id_rol} = req.user[0]
    if(id_rol === 2){
        if(email == null || email =='' || password == null || password == ''){
            res.json({'[-]' : 'Complete todos los campos.'})
        }else{
            const VerifyUser = await pool.query('SELECT * FROM users WHERE email = ?', email)
            if(VerifyUser.length >= 1){
                res.json({'[-]' : 'Este usuario ya existe.'})
            }else{
                const HashPassword = await EncryptPassword(password)
                await pool.query('INSERT INTO users SET ?', {email,'password': HashPassword, id_rol})
                res.json({'[+]':'Administrador creado exitosamente.'})
            }
        }
    }else{
        res.json({'message':'Unauthorized'})
    }
}

//Crear producto
ctrl.create = async (req, res) => {
    const {id_rol} = req.user[0]
    if(id_rol === 2){
        const {categories, description, price, stock, photo} = req.body
        await pool.query('INSERT INTO products SET ?', {categories,description, price, stock, photo})
        res.json('Añadido exitosamente.')
    }else{
        res.json({'message':'Unauthorized'})
    }
    
}
//Obtener productos
ctrl.products = async (req, res) => {
    const {id_rol} = req.user[0]
    if(id_rol === 2){
        const result = await pool.query('SELECT * FROM products')
        res.json(result)
    }else{
        res.json({'message':'Unauthorized'})
    }

}
//Obtener producto por id
ctrl.product_id = async (req, res) => {
    const {id_rol} = req.user[0]
    if(id_rol === 2){
        const {id} = req.params
        const result = await pool.query('SELECT * FROM products WHERE id_product = ?', id)
        res.json(result[0])
    }else{
        res.json({'message':'Unauthorized'})
    }
    
}
//Editar producto por id
ctrl.edit = async (req, res) => {
    const {id_rol} = req.user[0]
    if(id_rol === 2){
        const {categories, description, price, stock} = req.body
        const {id} = req.params 
        const obj = { categories, description, price, stock}
        await pool.query('UPDATE products SET ? WHERE id_product = ? ', [obj,id]) 
        res.json('Actualizado satifactoriamente.')
    }else{
        res.json({'message':'Unauthorized'})
    }
}

//Borrar producto por id
ctrl.delete_product = async (req, res) => {
    if(id_rol === 2){
        const {id} = req.params
        await pool.query('DELETE FROM products WHERE id_product = ?', id)
        res.json('Producto eliminado satifactoriamente.')
    }else{
        res.json({'message':'Unauthorized'})
    }

}

module.exports=ctrl