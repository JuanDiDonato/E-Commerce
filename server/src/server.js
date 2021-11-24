// Paquetes
const express = require('express')
const app = express()
const morgan = require('morgan')
const CookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const passport = require('passport')

//Server setting
app.set('port', process.env.PORT)
app.use(express.json())
app.use(CookieParser())
app.use(morgan('dev'))
app.use(passport.initialize())

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

/*f (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}*/

//Routes
app.use('/client', require('./routes/clients'));
app.use('/admin', require('./routes/admins'));
app.use('/public', require('./routes/public'));
app.use('/general', require('./routes/generals'));

//Public
app.use(express.static(path.join(__dirname, 'public')))

module.exports=app