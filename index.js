// Configuracion de express (1)
const express = require('express');
const { dbConnection } = require('./database/config');

// configuracion .env (6)
require('dotenv').config();

// Seguridad de la api
const cors = require('cors');

// console.log(process.env)


// Crear el servidor de express (2)
const app = express();

// Conexion a la Base de Datos (9)
dbConnection();

// Rutas (4)
// app.get('/', (req, res) => {
//     res.json({
//         ok: true
//     })
// })

// Para seguridad instalamos el CORS ** npm i cors **
app.use( cors() );

// Lectura y parseo del body (leer datos que nos envia el front (datos del usuario login o registro) y cambiarlo (parse) JSON) (8)
// se utiliza en controllers auth
app.use( express.json() );

///////// Rutas (7) ///////////

// todo lo que el require exporte lo va a habilitar en la ruta '/api/auth'
app.use('/api/auth', require('./routes/auth'));

// Seccion 24 video 386 (1.1)
app.use('/api/events/', require('./routes/events'))

// Para que al actualizar la pagina de heroku no se pierda la app por que no se encuentra la ruta
// ULTIMO PASO DEL CURSO 
/* Si no encuentra alguna ruta tomara esta por default y evitar el " cannot GET xxx/xxx/ " */
app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html' );
})

// Directorio publico (5)
// direccionamos a la carpeta public y se muestra en el navegador nuestra pagina (front end)
app.use( express.static('public') );

// Escuchar peticiones (3)
// app.listen( 4000, () => {
//     console.log(`Servidor corriendo en puerto ${ 4000 }`)
// } )

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});