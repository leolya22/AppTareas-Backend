import express from 'express';
import cors from 'cors';
import "dotenv/config.js";

import router from './routes/auth';
import { dbConnection } from './database/config';

/*
const calendarRouter = require('./routes/events');
*/

const app = express();
dbConnection();
app.use( cors() );

//app.use( express.static( 'public' ) );
app.use( express.json() );
app.use( '/api/auth', router );
app.use( '/api/calendar', calendarRouter );

app.listen( process.env.PORT, () => {
    console.log( `Servidor corriendo en el puerto ${ process.env.PORT }` );
});