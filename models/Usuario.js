/* Archivo para mongoose */
const { Schema, model } = require('mongoose');

// Schema (esquema) es la informacion que grabaremos en la BD (como queremos que luzca nuestra informacion)

const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        // tipo de valor
        type: String,
        // Si es requerido
        required: true,
        // Si debe ser unico en la DB
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// exportamos el model llamado 'Usuario' y con la informacion UsuarioSchema
// Lo utilizaremos en auth.js de controllers
module.exports = model('Usuario', UsuarioSchema)