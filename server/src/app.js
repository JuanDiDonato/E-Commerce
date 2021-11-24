const {app} = require('./server')

//Start server
app.listen(app.get('port'), () => {
    console.log('[+] Servidor iniciado')
})
