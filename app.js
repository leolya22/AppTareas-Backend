import express from 'express';
import "dotenv/config.js";

import router from './routes/auth.js';
import { dbConnection } from './database/config.js';
import tareasRouter from './routes/tareas.js';


const app = express();
dbConnection();

//app.use( express.static( 'public' ) );
app.use( express.json() );
app.use( '/api/auth', router );
app.use( '/api/tareas', tareasRouter );

app.listen( process.env.PORT, () => {
    console.log( `Servidor corriendo en el puerto ${ process.env.PORT }` );
});