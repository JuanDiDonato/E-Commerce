exports.staticticsSchema = {
    income : {
        in : ['body'], 
        exists : {
            errorMessage : 'Ingresos no debe estar vacio.'
        }
    },
    sales : {
        in : ['body'], 
        exists : {
            errorMessage : 'Complete las ventas'
        }
    }
}