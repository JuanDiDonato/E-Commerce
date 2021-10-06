//Express
const express = require('express')
const app = express()
//Morgan
const morgan = require('morgan')
//Cookie Parser
const CookieParser = require('cookie-parser')


//Server setting
app.set('port', 5000)
app.use(express.json()) 
app.use(CookieParser()) 
//Morgan
app.use(morgan('dev'))

//Routes
app.use(require('./routes/AdminRoutes'),require('./routes/ClientRoutes'))


//Start Server
app.listen(app.get('port'),()=>{
    console.log('[+] Servidor iniciado en: http://localhost:'+app.get('port'))
})