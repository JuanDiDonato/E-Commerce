//Express
const express = require('express')
const app = express()
//Morgan
const morgan = require('morgan')
//Cookie Parser
const CookieParser = require('cookie-parser')
//Multer
const multer = require('multer')
//path
const path = require('path')

//Server setting
app.set('port', 5000)
app.use(express.json())
app.use(CookieParser())

//Midlewares config
//Morgan
app.use(morgan('dev'))
//Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/images'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({
    storage,
    fileFilter(req, file, cb) {
        cb(null, true);
    },
}).array("images"))

//Helpers
require('./helpers/cron')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//Routes
app.use('/client', require('./routes/clients_routes'));
app.use('/admin', require('./routes/admins_routes'));

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Start server
app.listen(app.get('port'), () => {
    console.log('[+] Servidor iniciado en: http://localhost:' + app.get('port'))
})

module.exports=app