import jwt from 'jsonwebtoken';


export const generarJWT = ( uid, name ) => {
    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name };
        
        jwt.sign( payload, process.env.JWT_SECRET_WORD, {
            expiresIn: '2h'
        }, ( error, token ) => {
            if( error ) {
                console.log( error );
                reject( 'No se pudo generar el token' );
            }
            resolve( token );
        });
    })
}