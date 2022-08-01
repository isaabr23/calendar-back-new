// Video 381
const { response } = require('express');
const jwtoken = require('jsonwebtoken');

const validarToken = ( req, res= response, next ) => {

    // x-token en headers (POSTMAN)
    const token = req.header('x-token');
    // console.log(token)

    if( !token ) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const payload = jwtoken.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        // console.log(payload)

        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    next();

}

module.exports = {
    validarToken
}