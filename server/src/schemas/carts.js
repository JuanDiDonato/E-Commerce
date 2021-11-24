// Esquemas para validar los datos que ingresa en carts
exports.addCartSchema = {
    quantity : {
        in : ['body'], 
        exists : {
            errorMessage : 'Ingrese una cantidad valida'
        }
    },
    unit_price : {
        in : ['body'], 
        exists : {
            errorMessage : 'Ingrese un precio'
        }
    }
}