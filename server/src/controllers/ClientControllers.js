const pool = require('../database/connection')
const ctrl = {}
const {EncryptPassword} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
//Mercado Pago
const mercadopago = require('mercadopago')
mercadopago.configure({
    access_token : process.env.ACCESS_TOKEN_MP
})

//Crear token de acceso
ctrl.SignToken = Id_user => {
    return jwt.sign({
        iss: 'm1ch1',
        sub: Id_user
    },'m1ch1', {expiresIn: '1h'})
}

//Authenticated
ctrl.authenticated = (req,res) => {
    const { id_user, email, id_role, address, fullname } = req.user[0];
    res.status(200).json({ isAuthenticated: true, user: { id_user, email, id_role, address, fullname}});
}


//Registrar usuario
ctrl.register = async (req, res) => {
    const {email, fullname,password} = req.body
    const id_role= '1'
    if(email === null || email ==='' || password === null || password === '' || fullname === '' ||fullname === null){
        res.status(403).json({message:{'message':'Complete todos los campos', 'error' : true}})
    }else{
        const VerifyUser = await pool.query('SELECT * FROM users WHERE email = ?', email)
        if(VerifyUser.length >= 1){
            res.status(403).json({message:{'message':'Este usuario ya existe', 'error' : true}})
        }else{
            const HashPassword = await EncryptPassword(password)
            await pool.query('INSERT INTO users SET ?', {fullname,email,'password': HashPassword, id_role})
            res.status(200).json({message:{'message':'Usuario creado exitosamente', 'error' : false}})
        }
    }
}

//Registrar Domicilio
ctrl.address = async (req, res) => {
    const {address} = req.body
    console.log(req.body);
    const {id_user} = req.user[0]
    if(address === '' || address === null){
        res.status(403).json({'message' : 'Ingrese una direccion.', error : true})
    }else{
        await pool.query('UPDATE users SET address = ? WHERE users.id_user = ?', [address, id_user])
        res.status(200).json({'message' : 'Direccion actualizada', error : false})

    }
}

//Loguear usuario
ctrl.login = async (req, res) => {
    if(req.isAuthenticated()){
        const {fullname,email, id_user, id_role, address} = req.user
        token = ctrl.SignToken(id_user)
        res.cookie('access_token', token, {httpOnly : true, sameSite : true})
        res.status(200).json({isAuthenticated : true, user: {fullname, email,id_user,id_role, address}})
    }
}

//Cerrar session
ctrl.logout = (req, res) => {
    res.clearCookie('access_token');
    res.json({user:{name:'', surname:'', username:'', password:'', coin:''},error:false});

};

//MercadoPago
ctrl.mercadopago = (req, res) => {
    const {product_data} = req.body
    let preferences = {items: product_data,   
    'back_urls':{
        'success': 'http://localhost:3000/endpage', //la ruta al que quiero redirigir
        'failure': 'http://localhost:3000/cart', //la ruta al que quiero redirigir
    }, 'auto_return': 'approved', //para que se redirija solo
        'binary_mode' : true}

    mercadopago.preferences.create(preferences).then(function(response){
        const url = response.body.init_point
        console.log(url);
        res.status(200).json({url, error:false}) //Retorna un link, que lleva al pago.
    }).catch(function(error){
        console.log('[-] '+error);
        res.status(401).json({error: true})
    })
}

//edit stock
ctrl.stock = async (req, res) => {
    const {id_product} = req.params
    const {stock} = req.body
    await pool.query('UPDATE products SET stock = ? WHERE id_product = ?', [stock, id_product])
    res.status(200).json({error:false})
}


//Obtener productos
ctrl.products = async (req, res) => {
    const result = await pool.query('SELECT * FROM products')
    res.status(200).json(result)
}

//Obtener productos por id
ctrl.product_id = async (req, res) => {
    const {id_product} = req.params
    const result = await pool.query('SELECT events.event_name, events.discount,events.from_date,events.to_date,products.id_product,products.title,products.categories,products.price,products.description,products.stock,products.photo,products.disable,products.event FROM events INNER JOIN products WHERE products.id_product = ?', id_product)
    res.json(result[0])
}

//Obtener categorias
ctrl.categories = async (req,res) => {
    const categories = await pool.query('SELECT * FROM categories')
    if(categories.length > 0){
        res.status(200).json({categories, error:false})
    }else{
        res.status(403).json({message: 'No se encontraron categorias', error: true})
    }
    
}

//Ver carrito
ctrl.get_cart = async (req, res) => {
    const {id_user} = req.user[0]
    const result = await pool.query('SELECT products.id_product, products.event,products.title, products.stock ,products.photo, cart.quantity, cart.unit_price, events.event_name, events.discount,events.from_date,events.to_date FROM (products,events) INNER JOIN cart ON cart.id_product = products.id_product WHERE cart.id_user = ? AND products.event = events.id_event',id_user)
    res.status(200).json(result)
}

//Agregar al carrito 
ctrl.add_cart = async (req, res) => {
    const {id_product} = req.params
    const {id_user} = req.user[0]
    const {quantity, stock, unit_price} = req.body
    const product_in_cart = await pool.query('SELECT * FROM cart WHERE id_product = ? AND id_user = ?', [id_product,id_user])
    if(product_in_cart.length > 0){
        res.status(403).json({messages:{'message' : 'Este producto ya esta en el carrito', 'error' : true}})
    }else{
        await pool.query('INSERT INTO cart SET ?', {id_product, id_user, quantity, stock, unit_price})
        res.status(200).json({messages:{'message' : 'Producto agregado al carrito', 'error' : false}})
    }
}

//Borrar del carrito
ctrl.delete_cart = async (req, res) => {
    const {id_product} = req.params
    const {id_user} = req.user[0]
    const product_in_cart = await pool.query('SELECT * FROM cart WHERE id_product = ? AND id_user = ?', [id_product,id_user])
    if(product_in_cart.length > 0){
        await pool.query('DELETE FROM cart WHERE id_product = ? AND id_user = ?', [id_product,id_user])
        res.status(200).json({'messages':{'message' : 'Producto removido satifactoriamente', 'error' : false}})
    }else{
        res.status(403).json({'messages':{'message' : 'Este producto no esta en el carrito', 'error' : true}})
    }
}

//Limpiar carrito
ctrl.clear = async (req, res) => {
    const {id_user} = req.user[0]
    console.log(id_user);
    await pool.query('DELETE FROM cart WHERE cart.id_user = ?', id_user)
    res.status(200).json({error : false})
}

//Agregar order
ctrl.order = async (req, res) => {
    const {id_user, fullname} = req.user[0]
    const {id_product, address, quantity} = req.body
    console.log(req.body);
    await pool.query('INSERT INTO orders SET ?', {id_user, fullname,address,id_product,quantity})
    res.status(200).json({error : false})
}

ctrl.history = async (req, res) => {
    const {id_user} = req.user[0]
    const history = await pool.query('SELECT * FROM history_shopping WHERE id_user = ?', id_user)
    res.status(200).json({history})
}

ctrl.save_history= async (req, res) => {
    const {id_user} = req.user[0]
    const {quantity,title,photo} = req.body
    await pool.query('INSERT INTO history_shopping SET ?', {id_user,quantity,title,photo})
    res.status(200).json({error: false})
}

ctrl.statistics = async (req, res) => {
    const {income, sales} = req.body
    await pool.query('INSERT INTO statistics SET ?', {income, sales})
    res.status(200).json({error : false})
}

module.exports=ctrl