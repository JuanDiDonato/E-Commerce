//Passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const {MatchPassword} = require('./helpers/bcrypt')
const pool = require('./database/connection')

//Obtebes token desde la cookies (extraes el token de la cookie)
const CookiExtractor = req => {
    let token = null
    if(req && req.cookies){
        token = req.cookies['access_token'];
    }
    return token
}


passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',

},async (email, password, done) =>{
    const row = await pool.query('SELECT * FROM users WHERE email = ?', email)
    if(row.length === 0){
        let message = '[-] User not found!'
        return done(null,false,message)
    }else{
        const user = row[0]
        const SavedPassword = user.password
        const ValidPassword = await MatchPassword(password, SavedPassword)
        if(ValidPassword){
            let message = '[+] Welcome '+ user.username
            return done(null,user,message)
        }else{
            let message = '[-] Invalid credentials'
            return done(null,false,message)
        }
    }
})) 


passport.use(new JwtStrategy({
    jwtFromRequest: CookiExtractor,
    secretOrKey: 'm1ch1'
},(payload, done) => {
    pool.query('SELECT * FROM users WHERE id_user = ?', [payload.sub],(error,user) => {
        if(error)
            return done(error,false)
        if(user)
            return done(null,user)
        else
            return done(null,false)
    }) 
}))

