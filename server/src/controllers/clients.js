// Paquetes
const nodemailer = require('nodemailer');

// Modulos
const {getUser, registerAddress} = require('../services/clients') // Servicios de Usuario
const {getCart, getCartByProduct, addToCart, deleteOfCart, deleteAllOfCart} = require('../services/carts') // Servicios de Carro
const {addOrder} = require('../services/orders')
const {getHistory,addHistory} = require('../services/history')
const {addStatistics} = require('../services/statistics')
const ctrl = {}

// Mercado Pago settings
const mercadopago = require('mercadopago')
mercadopago.configure({
    access_token : process.env.TOKENMP
})
// Authenticated
ctrl.authenticated = (req,res) => {
    const { id, email, id_role, address, fullname } = req.user;
    res.status(200).json({ isAuthenticated: true, 
        user: { id, email, id_role, address, fullname}});
}
// Send a email
ctrl.email = async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });
    const mailOption = {
        from: "didonatojuan7@gmail.com",
        to: req.body.email,
        subject: "Email reenviado de ECommerce",
        text: "¡Muchas gracias por comprar en ECommerce! Vas a recibir tu compra en los proximos dias, segun disponibilidad. Ante cualquier duda no dudes en consultarnos, podes escribirnos por: **REDES SOCIALES** "
    }
    await transporter.sendMail(mailOption, (error, info)=>{
        if(error){
            console.log('[-]'+error);
            res.status(500).json({error : true})
        }else{
            console.log(info);
            res.status(200).json({error : false})
        }
    })
}
// Register address
ctrl.address = (req, res, next) => {
    const {id} = req.user
    getUser(id).then(user => {
        if(!user) res.status(400).send({'message' : 'El usuario no existe.', error : true})
        else{
            const {address} = req.body
            registerAddress({address},id)
            .then(res.status(201).send({message : 'Direccion actualizada', error : false}))
            .catch(next)
        }
    }).catch(next)
}
// MercadoPago
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

//Show cart
ctrl.get_cart = (req, res, next) => {
    const {id} = req.user
    getCart(id).then(cart => res.status(200).send(cart))
    .catch(next)
}
//Add to cart
ctrl.add_cart = (req, res,next) => {
    const {id_product} = req.params
    const {id} = req.user
    const {quantity, stock, unit_price} = req.body
    getCartByProduct(id,id_product).then(cart => {
        if(cart.length > 0) res.status(422).send({message : 'Este producto ya esta en el carrito', error : true})
        else{
            addToCart({'id_user':id, id_product, quantity, stock, unit_price}).then(cart => 
                res.status(201).send({message : 'Producto agregado al carrito', error : false}))
                .catch(next)
        }
    })
    
}
//Delete of cart
ctrl.delete_cart = (req, res,next) => {
    const {id_product} = req.params
    const {id} = req.user
    getCartByProduct(id,id_product).then(cart => {
        if(cart.length > 0){
            deleteOfCart(id, id_product).then(cart => res.status(204).send())
            .catch(next)
        }else{
            res.status(400).send({message : 'Este producto no esta en el carrito', 'error' : true})
        }
    })
}
//Clear cart
ctrl.clear = (req, res,next) => {
    const {id} = req.user
    deleteAllOfCart(id).then(cart => res.status(204).end())
    .catch(next)
}
//Add order
ctrl.order = (req, res,next) => {
    const {id, fullname, address} = req.user
        const {id_product, quantity} = req.body
        addOrder({'id_user' : id, fullname,address,id_product,quantity, 'status' : 1}).then( 
        res.status(201).send({message: 'Operacion completada', error : false}))
        .catch(next)
    
}
//Get history
ctrl.history = (req, res, next) => {
    const {id} = req.user
    getHistory(id).then(history => res.status(200).send({history})).catch(next)
}
//Save history
ctrl.save_history= (req, res, next) => {
    const {id} = req.user
    const {quantity,title,photo} = req.body
    addHistory({'id_user':id,quantity,title,photo,'status':1,'create_at': new Date()}).then(
        res.status(201).send({message:'Operacion completada', error : false})
    ).catch(next)
    
}
//Save statistics
ctrl.statistics = (req, res, next) => {
    const {income, sales} = req.body
    addStatistics({income, sales, 'last_updated' : new Date()}).then(data => 
        res.status(201).json({message: 'Operacion completada', error : false}))
        .catch(next)
}

module.exports=ctrl