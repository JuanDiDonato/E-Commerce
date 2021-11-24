exports.registerOrderSchema = {
    address : {
        in : ['body'], 
        exists : {
            errorMessage : 'La direccion no debe estar vacia.'
        }
    },
    quantity : {
        in : ['body'], 
        exists : {
            errorMessage : 'Complete la cantidad'
        }
    }
}