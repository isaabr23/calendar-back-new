// Apartir del video 386 Seccion 24

/*
    Rutas de Usuarios / Events
    host + /api/events
*/
// con events.js controllers

// importamos express
const { Router } = require('express');
const { validarToken } = require('../middlewares/validar-token');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = Router();

 
// Significa que todas las rutas abajo de la funcion seran privadas (no publicas) y podriamos poner las sig sitaxis
router.use( validarToken );

// Obtener eventos y validarlos con Token
router.get( '/', getEventos );

// Crear Evento y validarlos con Token
router.post( 
        '/',
        [   // Video 389 explica el custom() y crea en helpers - "isDate"
            // Se obliga al usuario a mandar titulo, hora de inicio y finalizacion
            check('title', 'El titulo es obligatorio').not().isEmpty(),
            check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
            check('end', 'La fecha de finalizacion es obligatoria').custom( isDate ),
            validarCampos
        ], 
        crearEvento 
    );

// Actualizar Evento y validarlos con Token
router.put( '/:id', actualizarEvento );

// Eliminar Evento y validarlos con Token
router.delete( '/:id', borrarEvento );


// Asi se exporta y asi exportamos route (events)
module.exports = router;