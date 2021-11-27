exports.registerOrderSchema = {
    quantity : {
        in : ['body'], 
        exists : {
            errorMessage : 'Complete la cantidad'
        }
    }
}

exports.status = {
    status : {
        in : ['body'],
        exists : {
            errorMessage : 'Ingrese un estado valido'
        }
    }
}