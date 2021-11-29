exports.registerOrderSchema = {
    quantity : {
        in : ['body'], 
        exists : {
            errorMessage : 'Complete la cantidad'
        }
    }
}
