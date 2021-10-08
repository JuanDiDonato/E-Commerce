const pool = require('../database/connection')
const {EncryptPassword} = require('../helpers/bcrypt')
const ctrl = {}



//Crear usuario admin
ctrl.register_admin = async (req, res) => {
    const {email, password} = req.body
    const {id_role} = req.user[0]
    if(id_role === 2){
        if(email == null || email =='' || password == null || password == ''){
            res.status(403).json({message:{'message':'Complete todos los campos', 'error' : true}})
        }else{
            const VerifyUser = await pool.query('SELECT * FROM users WHERE email = ?', email)
            if(VerifyUser.length >= 1){
                res.status(403).json({message:{'message':'Este usuario ya existe', 'error' : true}})
            }else{
                const HashPassword = await EncryptPassword(password)
                await pool.query('INSERT INTO users SET ?', {email,'password': HashPassword, id_role})
                res.status(200).json({message:{'message':'Usuario creado exitosamente', 'error' : false}})
            }
        }
    }else{
        res.json({'message':'Unauthorized'})
    }
}

//Cerrar session
ctrl.logout = (req, res) => {
    res.clearCookie('access_token');
    res.json({user:{name:'', surname:'', username:'', password:'', coin:''},error:false});

};

//Obtener categorias
ctrl.categories = async (req,res) => {
    const categories = await pool.query('SELECT * FROM categories')
    if(categories.length > 0){
        res.status(200).json({categories, error:false})
    }else{
        res.status(403).json({message: 'No se encontraron categorias', error: true})
    }
    
}

//Crear producto
ctrl.create = async (req, res) => {
    const {id_role} = req.user[0]
    if(id_role === 2){
        const {title, categories, description, price, stock, photo} = req.body
        await pool.query('INSERT INTO products SET ?', {title,categories,description, price, stock, photo})
        res.json('Añadido exitosamente.')
    }else{
        res.json({'message':'Unauthorized'})
    }
    
}
//Obtener productos
ctrl.products = async (req, res) => {
    const {id_role} = req.user[0]
    if(id_role === 2){
        const result = await pool.query('SELECT * FROM products')
        res.json(result)
    }else{
        res.json({'message':'Unauthorized'})
    }

}
//Obtener producto por id
ctrl.product_id = async (req, res) => {
    const {id_role} = req.user[0]
    if(id_role === 2){
        const {id_product} = req.params
        const result = await pool.query('SELECT * FROM products WHERE id_product = ?', id_product)
        res.json(result[0])
    }else{
        res.json({'message':'Unauthorized'})
    }
    
}
//Editar producto por id
ctrl.edit = async (req, res) => {
    const {id_role} = req.user[0]
    console.log(id_role);
    console.log(req.body);
    if(id_role === 2){
        const {title,categories, description, price, stock} = req.body
        const {id_product} = req.params 
        const obj = { title, categories, description, price, stock}
        await pool.query('UPDATE products SET ? WHERE id_product = ? ', [obj,id_product]) 
        res.json('Actualizado satifactoriamente.')
    }else{
        res.json({'message':'Unauthorized'})
    }
}

//Borrar producto por id
ctrl.delete_product = async (req, res) => {
    const {id_role} = req.user[0]
    if(id_role === 2){
        const {id} = req.params
        await pool.query('DELETE FROM products WHERE id_product = ?', id)
        res.json('Producto eliminado satifactoriamente.')
    }else{
        res.json({'message':'Unauthorized'})
    }

}

module.exports=ctrl