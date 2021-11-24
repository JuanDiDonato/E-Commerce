exports.categorySchema = {
    category : {
        in : ['body'], 
        exists : {
            errorMessage : 'Ingrese una categoria'
        }
    }
}