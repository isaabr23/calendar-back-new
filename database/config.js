const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.DB_CNN );
        // await mongoose.connect( process.env.DB_CNN , {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });

        console.log('DB on Line')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar DB')
    }
}

// se exporta y utilizamos en index.js
module.exports = {
    dbConnection
}