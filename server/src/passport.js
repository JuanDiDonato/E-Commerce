//Paquetes
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy

// Modulos
const {MatchPassword} = require('./helpers/bcrypt')
const {Users} = require('./models')

const CookiExtractor = req => {
    let token = null
    if(req && req.cookies){
        token = req.cookies['access_token'];
    }
    return token
}

// Passport local strategy
passport.use(new LocalStrategy({
    'usernameField' : 'email',
    'passwordField' : 'password',

},async (email, password, done) => {
    const user = await Users.findOne({where : {email:email}})
    let message = '[-] Error'
    if(!user) return done(null, false, message)
    else{
        MatchPassword(password,user.password).then(data => {
            let message = '[-] User not found'
            if(data) return done(false,user,null)
            else return done(null, false, message)
        }).catch(error => console.log(error))
    }
}))

passport.use(new JwtStrategy({
    jwtFromRequest: CookiExtractor,
    secretOrKey: process.env.TOKENKEY
},(payload, done) => {
    Users.findOne({where : {id : [payload.sub]}}).then(user => done(null,user))
    .catch(error => done(error,false))
}))

