/* Archivo para mongoose */
// Video 388 Seccion 24


const { Schema, model } = require('mongoose');

// Schema (esquema) es la informacion que grabaremos en la BD (como queremos que luzca nuestra informacion)

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        // Referencia para mongoose para obtener al usuario
        type: Schema.Types.ObjectId,
        // 'Usuario' es el nombre del otro Schema (auth)
        ref: 'Usuario',
        required: true
    },
});

// Video 390
// Para eliminar el "__v": 0 y "__id" => a solo "id"
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    // le doy el nombre id al _id
    object.id = _id;
    return object;
})

// exportamos el model llamado 'Evento' y con la informacion EventoSchema
// Lo utilizaremos en auth.js de controllers
module.exports = model('Evento', EventoSchema)