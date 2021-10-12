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



//Midlewares
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
}).single('photo'))

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


//Routes
app.use('/client', require('./routes/ClientRoutes'));
app.use('/admin', require('./routes/AdminRoutes'));

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Start Server
app.listen(app.get('port'), () => {
    console.log('[+] Servidor iniciado en: http://localhost:' + app.get('port'))
})