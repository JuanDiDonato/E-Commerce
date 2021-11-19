const pool = require('../database/connection')
const { EncryptPassword } = require('../helpers/bcrypt')
const ctrl = {}

//Get products and events
ctrl.all = async (req, res) => {
    const all_data = await pool.query('SELECT events.event_name, events.discount,events.from_date,events.to_date,products.id_product,products.title,products.categories,products.price,products.description,products.stock,products.photo,products.disable,products.event FROM events INNER JOIN products WHERE products.event = events.id_event OR products.event IS NULL')
    res.status(200).json({all_data})
}
//Create admin user
ctrl.register_admin = async (req, res) => {
    const { email, fullname, password } = req.body
    const { id_role } = req.user[0]
    if (email == null || email == '' || password == null || password == '' || 
        fullname == '' || fullname == null){
            res.status(400).json({ message: 'Complete todos los campos', error: true })
        }else{
            const verifyUser = await pool.query('SELECT * FROM users WHERE email = ?', email)
            if(verifyUser.length >= 1) {
                res.status(422).json( {message: 'Este usuario ya existe', error: true })
            }else{
                const HashPassword = await EncryptPassword(password)
                await pool.query('INSERT INTO users SET ?', { email, fullname, 'password': HashPassword, id_role })
                res.status(201).json({message: 'Usuario creado exitosamente', error: false })
            }
        } 
}
//Logout
ctrl.logout = (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json(
        { user: { name: '', surname: '', username: '', password: ''}, 
        error: false });
};
//Get categories
ctrl.categories = async (req, res) => {
    const categories = await pool.query('SELECT * FROM categories')
    res.status(200).json({categories})
}
//Create categories
ctrl.category = async (req, res) => {
    const {category} = req.body
    if(category === null || category === ''){
        res.status(400).json({ message: 'Complete el nombre de la categoria', error: true })
    }else{
        const categoryDB = await pool.query('SELECT * FROM categories WHERE category = ?', category)
        if (categoryDB.length > 0) {
            res.status(422).json({ message: 'Esta categoria ya existe', error: true })
        } else {
            await pool.query('INSERT INTO categories SET ?', {'category': category})
            res.status(201).json({ message: 'Operacion completada', error: false })
        }
    }
}
//Edit category
ctrl.edit_category = async (req, res) => {
    const {category} = req.body
    const oldCategory = req.params
    if (category === null || category === '') {
        res.status(400).json({ message: 'Complete el nombre de la categoria', error: true })
    }else{
        const results = await pool.query('SELECT * FROM categories WHERE category = ?', category)
        if (results.length > 0) {
            res.status(422).json({ message: 'Esta categoria ya existe', error: true })
        } else {
            await pool.query('UPDATE categories SET category = ? WHERE categories.category = ? ', [category, oldCategory.category])
            res.status(201).json({ message: 'Operacion completada', error: false })
        }
    }
}
//Delete category
ctrl.delete_category = async (req, res) => {
    const {category} = req.params
    const results = await pool.query('SELECT * FROM categories WHERE category = ?', category)
    if (results.length > 0) {
        await pool.query('DELETE FROM categories WHERE category = ?', category)
        res.status(204).json()
    } else {
        res.status(400).json({ message: 'La categoria solicitada no existe', error: true })
    }
}
//Create a product
ctrl.create = async (req, res) => {
    let disable = 0, photo = [], event = 0
    const title = req.body.title
    const categories = req.body.categories
    const price = req.body.price
    const description = req.body.description
    const stock = req.body.stock
    const Photos = req.files
    Photos.forEach(element => {
        photo.push(element.filename)
    });
    photo = JSON.stringify(photo)
    await pool.query('INSERT INTO products SET ?', { title, categories, description, price, stock, photo, disable, event })
    res.status(201).json({message : 'Operacion completada', error : false})
}
//Get products
ctrl.products = async (req, res) => {
    const products = await pool.query('SELECT * FROM products')
    res.status(200).json({products})
}
//Get products by id
ctrl.product_id = async (req, res) => {
    const { id_product } = req.params
    const product = await pool.query('SELECT events.event_name, events.discount,events.from_date,events.to_date,products.id_product,products.title,products.categories,products.price,products.description,products.stock,products.photo,products.disable,products.event FROM events INNER JOIN products WHERE products.id_product = ? AND products.event = events.id_event', id_product)
    res.status(200).json(product[0])
}
//Disable product
ctrl.disable = async (req, res) => {
    const {disable} = req.body
    const { id_product } = req.params
    await pool.query('UPDATE products SET disable = ? WHERE id_product = ? ', [disable, id_product])
    res.status(200).json({message : 'Operacion completada', error : false})
}
//Edit a product
ctrl.edit = async (req, res) => {
    let photo = []
    const { title, categories, description, price, stock } = req.body
    const { id_product } = req.params
    const Photos = req.files
    Photos.forEach(element => {
        photo.push(element.filename)
    });
    photo = JSON.stringify(photo)
    const obj = { title, categories, description, price, stock, photo }
    await pool.query('UPDATE products SET ? WHERE id_product = ? ', [obj, id_product])
    res.status(200).json({message : 'Operacion completada', error:false})
}
//Delete a product
ctrl.delete_product = async (req, res) => {
    const { id_product } = req.params
    await pool.query('DELETE FROM products WHERE id_product = ?', id_product)
    res.status(204).json()
}
//Delete a order
ctrl.delete_order = async (req, res) => {
    const { id_order } = req.params
    if (id_order === '' || id_order === null) {
        res.status(400).json({ message:'Orden no valida', error: true })
    } else {
        await pool.query('DELETE FROM orders WHERE id_order = ?', id_order)
        res.status(204).json()
    }
}
//Get orders
ctrl.get_orders = async (req, res) => {
    const orders = await pool.query('SELECT * FROM orders')
    res.status(200).json({orders})
}
//Get statistics
ctrl.statistics = async (req, res) => {
    const data = await pool.query('SELECT * FROM statistics')
    res.status(200).json({data})
}
//Get events
ctrl.events = async (req, res) => {
    const events = await pool.query('SELECT * FROM events')
    res.status(200).json({events})
}
//Add events
ctrl.add_event = async (req, res) => {
    let {event, id_products} = req.body
    const event_name = event.event_name
    const event_data = { event_name, 'discount': event.discount / 100, from_date: event.from_date, to_date: event.to_date }
    const result = await pool.query('SELECT * FROM events WHERE event_name = ?', event_name)
    if (result.length > 0) {
        res.status(422).json({ message:'Este nombre esta en uso', error: true })
    } else {
        await pool.query('INSERT INTO events SET ?', event_data)
        const event1 = await pool.query('SELECT * FROM events WHERE event_name = ?', event_name)
        const id_event = event1[0].id_event
        await pool.query('UPDATE products SET products.event = ?  WHERE id_product IN (?)', [id_event,id_products])
        res.status(201).json({message : 'Operacion completada', error : false})
    }
}
//Delete event
ctrl.delete_event = async (req, res) => {
    const {id_event} = req.params
    const results = await pool.query('SELECT * FROM events WHERE id_event = ?', id_event)
    if (results.length > 0) {
        await pool.query('UPDATE products SET event = 0 WHERE event = ? ', id_event)
        await pool.query('DELETE FROM events WHERE id_event = ?', id_event)
        res.status(204).json()
    } else {
        res.status(400).json({ message: 'Evento no encontrado', error: true })
    }
}
//Get event by id
ctrl.event = async (req, res) => {
    const {id_event} = req.params
    const event = await pool.query('SELECT * FROM events WHERE events.id_event = ?', id_event)
    res.status(200).json(event)
}
//Update event
ctrl.update_event = async (req, res) => {
    const {event,id_products} = req.body
    const {id_event} = req.params
    const event_data = { event_name: event.event_name, 'discount': event.discount / 100, from_date: event.from_date, to_date: event.to_date }
    await pool.query('UPDATE events SET ? WHERE id_event = ?', [event_data, id_event])
    await pool.query('UPDATE products SET products.event = ? WHERE id_product IN (?)', [id_event,id_products])
    res.status(204).json()
}
//Get monthly statistics
ctrl.Mstatistics = async (req, res) => {
    const MonthlyStatistics = await pool.query('SELECT * FROM monthly_statistics')
    res.status(200).json({MonthlyStatistics})
}

module.exports = ctrl