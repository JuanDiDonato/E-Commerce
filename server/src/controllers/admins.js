// Modulos
const { EncryptPassword } = require('../helpers/bcrypt')

// Servicios
const {newUser} = require('../services/clients')  // Clientes
const {getCategoriesByName, createCategories,
     editCategory, deleteCategory} = require('../services/categories')  // Categorias
const {createProducts, disableProduct, editProduct, deleteProduct, editProductByEvent} = require('../services/products')  // Productos
const {deleteOrder, getOrders, editStatus} = require('../services/orders')  // Ordenes
const {getStatistics} = require('../services/statistics')  // Estadisticas
const {getEvents, getEvent, getEventById, 
    createEvent, deleteEvent, editEvent} = require('../services/events') // Eventos
const {getMonthlyStatistics} = require('../services/monthly_statistics')  // Estadisticas Mensuales
const {editStock, addStock} = require('../services/waist') // Stock
const ctrl = {}


//Create admin user
ctrl.register_admin = (req, res, next) => {
    const { email, fullname, password } = req.body
    const {id_role} = req.user
    newUser({email, fullname, password, id_role}).then(admin => 
        res.status(201).json({message: 'Usuario creado exitosamente', error: false }))  
        .catch(next)
}
//Create categories
ctrl.category = (req, res, next) => {
    const {category} = req.body
        getCategoriesByName(category).then(data => {
            if (data)
                res.status(422).send({ message: 'Esta categoria ya existe', error: true })
            else{
                createCategories({category}).then(category => 
                    res.status(201).send({ message: 'Operacion completada', error: false }))
                    .catch(next)
            }
        }).catch(next)
}
//Edit category
ctrl.edit_category = (req, res, next) => {
    const {category} = req.body
    const oldCategory = req.params
    getCategoriesByName(category).then(data => {
        if(data) 
            res.status(422).send({ message: 'Esta categoria ya existe', error: true })
        else{
            editCategory({category}, oldCategory.category).then(
                res.status(201).send({ message: 'Operacion completada', error: false }))
                .catch(next)
        }
    }).catch(next)

}
//Delete category
ctrl.delete_category = (req, res, next) => {
    const {category} = req.params
    getCategoriesByName(category).then(data => {
        if (data) {
            deleteCategory(category).then(res.status(204).send()).cath(next)
        } else{
            res.status(400).send({ message: 'La categoria solicitada no existe', error: true })
        }
    }).catch(next)
    
}
//Create a product
ctrl.create = (req, res, next) => {
    let disable = 0, photo = [], event = 1
    const title = req.body.title
    const categories = req.body.categories
    const price = req.body.price
    const description = req.body.description
    const stock = req.body.stock
    const Photos = req.files
    console.log(req.body);
    Photos.forEach(element => {
        photo.push(element.filename)
    });
    photo = JSON.stringify(photo)
    createProducts({ title, categories, description, price, photo, disable, event }).then(
        product => {
            let object = JSON.parse(stock)
            object.id_product = product.id 
            addStock(object).then(res.status(201).send({message : 'Operacion completada', error:false}))
        }
    ).catch(next)
}
//Disable product
ctrl.disable = (req, res, next) => {
    const {disable} = req.body
    const {id_product} = req.params
    disableProduct({disable},id_product).then(
        res.status(200).end()).catch(next)
}
//Edit a product
ctrl.edit = (req, res, next) => {
    let photo = []
    const { title, categories, description, price, stock} = req.body
    let object = JSON.parse(stock)
    const { id_product } = req.params
    const Photos = req.files
    Photos.forEach(element => {
        photo.push(element.filename)
    });
    photo = JSON.stringify(photo)
    editProduct({ title, categories, description, price,photo},id_product).then(
        editStock(object, id_product).then(res.status(200).send({message : 'Operacion completada', error:false}))
    ).catch(next)    
}
//Delete a product
ctrl.delete_product = (req, res) => {
    const { id_product } = req.params
    deleteProduct(id_product).then(res.status(204).send())
}
//Delete a order
ctrl.delete_order = (req, res, next) => {
    const { id_order } = req.params
    deleteOrder(id_order).then(res.status(204).send())
    .catch(next)
}
//Get orders
ctrl.get_orders = (req, res, next) => {
    getOrders().then(orders => res.status(200).send({orders}))
    .catch(next)
}
//Get statistics
ctrl.statistics =  (req, res, next) => {
    getStatistics().then(statistics => res.status(200).send({statistics}))
    .catch(next)
}
// Edit status orders
ctrl.edit_status = (req, res, next) => {
    const {id_order} = req.params
    const {status} = req.body
    editStatus({status}, id_order).then(
        res.status(204).end()
    ).catch(next)
}
//Get events
ctrl.events = (req, res, next) => {
    getEvents().then(events => res.status(200).send({events}))
    .catch(next)
}
//Add events
ctrl.add_event = (req, res, next) => {
    let {event, id_products} = req.body
    const event_name = event.event_name
    const event_data = { event_name, 
        'discount': event.discount / 100, 
        from_date: event.from_date, 
        to_date: event.to_date }
    getEvent(event_name).then(events => {
        if (events.length > 0)
            res.status(422).send({ message:'Este nombre esta en uso', error: true })
        else{
            createEvent(event_data).then(newEvent => {
                editProduct({id_event : newEvent.null}, id_products)
                .then(res.status(201).send({message : 'Operacion completada', error : false}))
                .catch(next)
            }).catch(next)         
        }
    }).catch(next)

}
//Delete event
ctrl.delete_event = (req, res, next) => {
    const {id_event} = req.params
    getEventById(id_event).then(event => {
        if(event.length > 0) {
            deleteEvent(id_event).then(
                editProductByEvent({id_event : '1'}, id_event).then(
                    res.status(204).send()
                ).catch(next)
            ).catch(next)
        }else{
            res.status(400).json({ message: 'Evento no encontrado', error: true })
        }
    }).catch(next)
    
}
//Get event by id
ctrl.event = (req, res, next) => {
    const {id_event} = req.params
    getEventById(id_event).then(event => res.status(200).send(event))
    .catch(next)
}
//Update event
ctrl.update_event = (req, res, next) => {
    const {event} = req.body
    const {id_event} = req.params
    const event_data = { event_name: event.event_name, 'discount': event.discount / 100, from_date: event.from_date, to_date: event.to_date }
    editEvent(event_data, id_event).then(res.status(204).send())
    .catch(next)
}
//Get monthly statistics
ctrl.Mstatistics = async (req, res, next) => {
    getMonthlyStatistics().then(MonthlyStatistics => res.status(200).json({MonthlyStatistics}))
    .catch(next)
}
//Edit stock
ctrl.stock = (req, res, next) => {
    const {id_product} = req.params
    const {stock} = req.body
    console.log(stock);
    if(stock.S === 0 && stock.M === 0 && stock.L === 0 && stock.XL === 0 && stock.XXL === 0 && stock.XXXL === 0){
        const disable = '1'
        editStock(stock,id_product)
        disableProduct({disable},id_product).then(
            res.status(204).end()).catch(next)
    }else{
        editStock(stock,id_product).then(res.status(204).end())
        .catch(next)
    }
}

module.exports = ctrl