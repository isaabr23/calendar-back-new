// Apartir del video 386 Seccion 24

/* Este archivo es para controlar las funciones y que nuestro archivo events.js que esta en Routes no tenga tanto codigo
    solo exportaremos las funciones al router
*/

/* 
   REQ = es lo que el usuario solicita (User)
   RES = es lo que nosotros respondemos (Dev)
*/

/* Para tener el tipado de express (la ayuda al escribir) y se debe tener "res = response" para la ayuda */
const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async(req, res = response) => {

    /* 
        Encuentra todos los eventos que hay en Evento (DB), *populate* nos trae la informacion del usuario y lo coloca en el arbol
        y colocando un segundo argumento ponemos los campos que queremos en este caso solo sera "name"
        si quisieramos mas especificos seria "name password"
    */
    const eventos = await Evento.find()
                                .populate('user', 'name');

    res.json({
        ok: true,
        msg: 'getEvento',
        eventos
    });

}

const crearEvento = async(req, res = response) => {

    // Verifico que tenga el evento
    // console.log( req.body );

    // Crear un nuevo evento
    const evento = new Evento( req.body );

    try {

        // Agregamos el uid del user por que tambien es requerido
        evento.user = req.uid;

        // Guardamos el evento en la BD
        const eventoSave = await evento.save();

        // Mensaje de respuesta
        res.json({
            ok: true,
            evento: eventoSave
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    }
}


const actualizarEvento = async(req, res = response) => {

    // obtenemos el id del evento que nos da el moongose
    const eventoId = req.params.id;
    // obtenemos el uid (id del usuario)
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId )

        if( !evento ) {
            // status 404 = No existe
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id',
            });
        }

        // Si si existe el evento con el id correcto continuamos
        
        // Si es un usuario diferente al que creo el evento no podra actualizarlo
        if ( evento.user.toString() !== uid ) {
            // status 401 no tiene permisos
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de editar este evento'
            });
        }

        // si llega aqui significa que es la misma persona que creo el evento
        // Se crea nuevo evento = evento actualizado
        const nuevoEvento = {
            // destructuracion del evento 
            ...req.body,
            // y se agrega el uid
            user: uid
        }

        // Finalmente actualizamos                       (evento que quiero actualizar, lo que actualice, para que retorne lo que se cambio)
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } )

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    }
}

const borrarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId )

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id',
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete( eventoId )

        res.json({
            ok: true,
            msg: 'Evento eliminado',
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    }
}

// Exportamos todas las constantes creadas
module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}