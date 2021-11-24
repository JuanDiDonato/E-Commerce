// Esquemas para validar los datos que ingresa el usuario
exports.historySchema = {
    quantity : {
        in : ['body'], 
        exists : {
            errorMessage : 'La cantidad no debe estar vacio.'
        }
    },
    title : {
        in : ['body'], 
        exists : {
            errorMessage : 'Complete el titulo'
        }
    },
    photo : {
        in : ['body'], 
        exists : {
            errorMessage : 'La foto no debe estar vacia.'
        }
    }
}