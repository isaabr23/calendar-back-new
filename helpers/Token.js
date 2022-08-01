// Instalamos la libreria para el token ** npm i jsonwebtoken **
const token = require('jsonwebtoken');

const generarToken = ( uid, name ) => {

    return new Promise( ( resolve, reject ) => {
        const payload = { uid, name }

        token.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, ( err, tokenNew ) => {
            
            if (err) {
                console.log(err)
                reject('No se pudo generar el Token')
            }

            // Si todo sale ok genera el token
            resolve( tokenNew );
        })
    } )
}

module.exports = {
    generarToken
}