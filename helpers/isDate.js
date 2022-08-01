// value, { req, location, path } se extrae de la documentacion de custom() express-validator

// se instala moment para validar que sea una fecha valida **** npm i moment ****
const moment = require('moment');

const isDate = ( value ) => {

    // console.log(value)

    // Si no existe value la fecha no es valida
    if( !value ) {
        return false;
    }

    // Moment me avisa si es una fecha valida
    const fecha = moment( value );
    if( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }

}

module.exports = { isDate }