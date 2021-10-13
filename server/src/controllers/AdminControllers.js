const { json } = require('express')
const pool = require('../database/connection')
const { EncryptPassword } = require('../helpers/bcrypt')
const ctrl = {}

//obtener productos y Eventos
ctrl.all = async (req, res) => {
    const all_data = await pool.query('SELECT events.event_name, events.discount,events.from_date,events.to_date,products.id_product,products.title,products.categories,products.price,products.description,products.stock,products.photo,products.disable,products.event FROM events INNER JOIN products ')
    res.status(200).json({all_data})
}

//Crear usuario admin
ctrl.register_admin = async (req, res) => {
    const { email, fullname, password } = req.body
    const { id_role } = req.user[0]
    if (id_role === 2) {
        if (email == null || email == '' || password == null || password == '' || fullname == '' || fullname == null) {
            res.status(403).json({ message: { 'message': 'Complete todos los campos', 'error': true } })
        } else {
            const VerifyUser = await pool.query('SELECT * FROM users WHERE email = ?', email)
            if (VerifyUser.length >= 1) {
                res.status(403).json({ message: { 'message': 'Este usuario ya existe', 'error': true } })
            } else {
                const HashPassword = await EncryptPassword(password)
                await pool.query('INSERT INTO users SET ?', { email, fullname, 'password': HashPassword, id_role })
                res.status(200).json({ message: { 'message': 'Usuario creado exitosamente', 'error': false } })
            }
        }
    } else {
        res.json({ 'message': 'Unauthorized' })
    }
}

//Cerrar session
ctrl.logout = (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { name: '', surname: '', username: '', password: '', coin: '' }, error: false });

};

//Obtener categorias
ctrl.categories = async (req, res) => {
    const categories = await pool.query('SELECT * FROM categories')
    res.status(200).json({ categories })
}

//Crear categorias
ctrl.category = async (req, res) => {
    const { category } = req.body
    if (category === null || category === '') {
        res.status(403).json({ message: 'Complete el nombre de la categoria', error: true })
    } else {
        const results = await pool.query('SELECT * FROM categories WHERE category = ?', category)
        if (results.length > 0) {
            res.status(403).json({ message: 'Esta categoria ya existe', error: true })
        } else {
            await pool.query('INSERT INTO categories SET ?', { 'category': category })
            res.status(200).json({ message: 'Categoria creada satifactoriamente', error: false })
        }
    }
}

//Editar categoria
ctrl.edit_category = async (req, res) => {
    const { category } = req.body
    const oldCategory = req.params
    if (category === null || category === '') {
        res.status(403).json({ message: 'Complete el nombre de la categoria', error: true })
    } else {
        const results = await pool.query('SELECT * FROM categories WHERE category = ?', category)
        if (results.length > 0) {
            res.status(403).json({ message: 'Esta categoria ya existe', error: true })
        } else {
            await pool.query('UPDATE categories SET category = ? WHERE categories.category = ? ', [category, oldCategory.category])
            res.status(200).json({ message: 'Categoria creada satifactoriamente', error: false })
        }
    }
}

//Borrar categoria
ctrl.delete_category = async (req, res) => {
    const { category } = req.params
    const results = await pool.query('SELECT * FROM categories WHERE category = ?', category)
    console.log(results);
    if (results.length > 0) {
        await pool.query('DELETE FROM categories WHERE category = ?', category)
        res.status(200).json({ message: 'Categoria borrada satifactoriamente', error: false })
    } else {
        res.status(200).json({ message: 'La categoria solicitada no existe', error: true })
    }
}

//Crear producto
ctrl.create = async (req, res) => {
    const { id_role } = req.user[0]
    const disable = 0
    if (id_role === 2) {

        const photo = req.file.filename
        const ObjetProduct = req.body.body
        const title = ObjetProduct[0]
        const categories = ObjetProduct[1]
        const price = ObjetProduct[2]
        const stock = ObjetProduct[3]
        const description = ObjetProduct[4]

        await pool.query('INSERT INTO products SET ?', { title, categories, description, price, stock, photo, disable })
        res.json('Añadido exitosamente.')
    } else {
        res.json({ 'message': 'Unauthorized' })
    }

}
//Obtener productos
ctrl.products = async (req, res) => {
    const { id_role } = req.user[0]
    if (id_role === 2) {
        const products = await pool.query('SELECT * FROM products')
        res.json({ products })
    } else {
        res.json({ 'message': 'Unauthorized' })
    }

}
//Obtener producto por id
ctrl.product_id = async (req, res) => {
    const { id_role } = req.user[0]
    if (id_role === 2) {
        const { id_product } = req.params
        const result = await pool.query('SELECT * FROM products WHERE id_product = ?', id_product)
        res.json(result[0])
    } else {
        res.json({ 'message': 'Unauthorized' })
    }

}

//Deshabilitar un producto
ctrl.disable = async (req, res) => {
    const { id_role } = req.user[0]
    const { disable } = req.body
    console.log(disable);
    if (id_role === 2) {
        const { id_product } = req.params
        await pool.query('UPDATE products SET disable = ? WHERE id_product = ? ', [disable, id_product])
        res.json('Actualizado satifactoriamente.')
    } else {
        res.json({ 'message': 'Unauthorized' })
    }
}
//Editar producto por id
ctrl.edit = async (req, res) => {
    const { id_role } = req.user[0]
    if (id_role === 2) {
        const { title, categories, description, price, stock } = req.body
        const { id_product } = req.params
        const obj = { title, categories, description, price, stock }
        await pool.query('UPDATE products SET ? WHERE id_product = ? ', [obj, id_product])
        res.json('Actualizado satifactoriamente.')
    } else {
        res.json({ 'message': 'Unauthorized' })
    }
}


//Borrar producto por id
ctrl.delete_product = async (req, res) => {
    const { id_role } = req.user[0]
    if (id_role === 2) {
        const { id_product } = req.params
        await pool.query('DELETE FROM products WHERE id_product = ?', id_product)
        res.json('Producto eliminado satifactoriamente.')
    } else {
        res.json({ 'message': 'Unauthorized' })
    }

}

//Borrar una orden
ctrl.delete_order = async (req, res) => {
    const { id_order } = req.body
    if (id_order === '' || id_order === null) {
        res.status(403).json({ error: true })
    } else {
        await pool.query('DELETE FROM orders WHERE id_order = ?', id_order)
        res.status(200).json({ error: false })
    }
}

//Obtener ordenes
ctrl.get_orders = async (req, res) => {
    const orders = await pool.query('SELECT * FROM orders')
    res.status(200).json({ orders })
}

//Obtener Estadisticas
ctrl.statistics = async (req, res) => {
    const data = await pool.query('SELECT * FROM statistics')
    res.status(200).json({ data })
}

//get events
ctrl.events = async (req, res) => {
    const events = await pool.query('SELECT * FROM events')
    res.status(200).json({ events })
}

//add events
ctrl.add_event = async (req, res) => {
    let { event, id_products } = req.body
    const event_name = event.event_name
    const event_data = { event_name, 'discount': event.discount / 100, from_date: event.from_date, to_date: event.to_date }
    const result = await pool.query('SELECT * FROM events WHERE event_name = ?', event_name)
    if (result.length > 0) {
        res.status(403).json({ message: 'Este nombre esta en uso', error: true })
    } else {
        console.log(id_products);
        await pool.query('INSERT INTO events SET ?', event_data)
        const event1 = await pool.query('SELECT * FROM events WHERE event_name = ?', event_name)
        const id_event = event1[0].id_event
        await pool.query('UPDATE products SET products.event = ? WHERE id_product IN (?)', [id_event,id_products])
        res.status(200).json({ error: false })
    }
}

//delete event
ctrl.delete_event = async (req, res) => {
    const { id_event } = req.params
    const results = await pool.query('SELECT * FROM events WHERE id_event = ?', id_event)
    if (results.length > 0) {
        await pool.query('DELETE FROM events WHERE id_event = ?', id_event)
        res.status(200).json({ error: false })
    } else {
        res.status(403).json({ message: 'Evento no encontrado', error: true })
    }
}

//edit product event status
ctrl.product_event = async (req, res) => {
    const { id_product } = req.params
    const { id_event } = req.body
    await pool.query('UPDATE products SET event = ? WHERE id_product IN (?)', [id_event, id_product])
    res.status(200).json({ error: false })
}

module.exports = ctrl