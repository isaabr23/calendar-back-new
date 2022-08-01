/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

// importamos express
const { Router } = require('express');
// Instalamos el paquete de validacion de formulario ** npm i express-validator **
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-token');
const router = Router();

// Para crear un nuevo usuario usamos POST

// Para el registro de un nuevo usuario
// crearUsuario se ejecuta del auth.js que esta en controllers
// router.post('/new', crearUsuario);
// como vamos a validar varios campos el segundo argumento sera un array de middlewares
router.post(
    '/new',
    [ // middlewares
        // ('nombre del usuario', 'mensaje de error').que no este vacio
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        // ('email del usuario', 'mensaje de error').que sea email
        check('email', 'El email es obligatorio').isEmail(),
        // ('password del usuario', 'mensaje de error').que sea mayor a 6 caracteres
        check('password', 'El password debe ser minimo 6 caracteres').isLength({ min: 6 }),
        // para llamar el middleware y validar campos
        validarCampos
    ], 
    crearUsuario);

// Para el login
router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser minimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    loginUsuario );

// Lo usaremos para renovar el Token 
router.get('/renew', validarToken, revalidarToken );

// Asi se exporta y asi exportamos route (auth)
module.exports = router;