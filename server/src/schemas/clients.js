// Esquemas para validar los datos que ingresa el usuario
exports.registerSchema = {
    email : {
        in : ['body'], 
        exists : {
            errorMessage : 'El email no debe estar vacio.'
        }
    },
    fullname : {
        in : ['body'], 
        exists : {
            errorMessage : 'Complete su nombre y apellido'
        }
    },
    password : {
        in : ['body'], 
        exists : {
            errorMessage : 'La contraseña no debe estar vacia.'
        }
    }
}
exports.registerAddressSchema = {
    address : {
        in : ['body'], 
        exists : {
            errorMessage : 'Ingrese una direccion valida.'
        }
    }
}
exports.loginSchmema = {
    email : {
        in : ['body'], 
        exists : {
            errorMessage : 'El email no debe estar vacio.'
        }
    },
    password : {
        in : ['body'], 
        exists : {
            errorMessage : 'La contraseña no debe estar vacia.'
        }
    }
}
exports.editStockSchema = {
    stock : {
        in : ['body'],
        exists : {
            errorMessage : 'Ingrese un stock'
        }
    }
}