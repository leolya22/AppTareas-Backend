import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.DB_CONNECTION );
        console.log( 'Succesfully connection :)' );
    } catch ( error ) {
        console.log( error );
        throw new Error( 'Error en la conexion a la base de datos' )
    }
}