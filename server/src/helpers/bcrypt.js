//Configuracion de Bcrypt
const bcrypt = require('bcrypt')
const helpers = {}

helpers.EncryptPassword = async data =>{
    const Salt = await bcrypt.genSalt(12)
    data.password = await bcrypt.hash(data.password, Salt)
    return data
}
helpers.MatchPassword = async (password, SavedPassword) => {
    return await bcrypt.compare(password, SavedPassword)
}
module.exports=helpers;