/* Este archivo es para controlar las funciones y que nuestro archivo auth que esta en Routes no tenga tanto codigo
    solo exportaremos las funciones al router
*/

/* REQ = es lo que el usuario solicita (User)
   RES = es lo que nosotros respondemos (Dev)
*/

/* Para encriptan la contraseña en la DB instalamos ** npm i bcryptjs ** */

/* Para tener el tipado de express (la ayuda al escribir) y se debe tener "res = response" para la ayuda */
const { response } = require('express');
// importamos el model Usuario.js
const Usuario = require('../models/Usuario');
// Importamos para encriptar las contraseña en la base de datos VIDEO 378
const bcryptjs = require('bcryptjs');
const { generarToken } = require('../helpers/Token');

/* Para utilizar nestro middleware "validarCampos" ahorrando codigo poder mandar esto a validar-campos.js en la carpeta de middleware
    // Manejo de errores en caso de que el check se active en auth routes
    // const errors = validationResult( req );
    // if( !errors.isEmpty() ) {
    //     return res.status(400).json({
    //         ok: false,
    //                     // es de express-validator (mapped())
    //         errors: errors.mapped()
    //     });
    // }

*/

const crearUsuario = async(req, res = response) => {
    
    // console.log(req.body) y destructuramos para mas facilidad
    const { email, password } = req.body;

    try {
        
        // Para saber si el correo que se ingresa ya existe en la base de datos
        let usuario = await Usuario.findOne({ email });

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya existe'
            });
        }
    
        /* Para crear un usuario nuevo en la base de datos */
        usuario = new Usuario( req.body )

        // Pra Encriptar la contraseña antes de mandarlo a la DB
        const salt = bcryptjs.genSaltSync();
                                        // a password lo encriptamos con salt
        usuario.password = bcryptjs.hashSync( password, salt )
    
        // Para guardar el usuario en la BD y como es promesa ponemos el await y el async en la funcion
        await usuario.save();

        // Generar Token
        // mandamos id y name de usuario a Token.js
        const token = await generarToken( usuario.id, usuario.name )
    
        // res.status(201).json, Asi mandamos el estatu status(xxx) podemos ver los ESTATUS aqui https://www.restapitutorial.com/httpstatuscodes.html
        // status(201) significa create
        res.status(201).json({
            ok: true,
            msg: 'register',
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error)
        // status(500) significa create Internal Server Error
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Para saber si el usario existe
        const usuario = await Usuario.findOne({ email });

        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe este email'
            });
        }

        // Comparacion de las contraseñas ingresada y encriptada en la BD ** Regresa un true o un false
                                            // password = ingresado , usuario.password = la que esta guardada en la BD
        const validPassword = bcryptjs.compareSync( password, usuario.password ) 

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar Token
        // mandamos id y name de usuario a Token.js
        const token = await generarToken( usuario.id, usuario.name )

        res.json({
            ok: true,
            msg: 'login',
            uid: usuario.id, 
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        // status(500) significa create Internal Server Error
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

// Configuracion VIDEO 381
const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;

        // Generar Token
        // mandamos id y name de usuario a Token.js
        const token = await generarToken( uid, name )

        res.json({
            ok: true,
            msg: 'nuevo token creado',
            uid,
            name,
            token
        });
}

// Exportamos todas las constantes creadas
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}