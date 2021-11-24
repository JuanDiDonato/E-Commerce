exports.productSchema = {
    title : {
        in : ['body'], 
        exists : {
            errorMessage : 'Complete todos los campos'
        }
    },
    description : {
        in : ['body'], 
        exists : {
            errorMessage : 'Complete todos los campos'
        }
    },
    photo : {
        in : ['body'], 
        exists : {
            errorMessage : 'Complete todos los campos.'
        }
    },
    stock : {
        in : ['body'], 
        exists : {
            errorMessage : 'Complete todos los campos.'
        }
    },
    price : {
        in : ['body'], 
        exists : {
            errorMessage : 'Complete todos los campos.'
        }
    }
}