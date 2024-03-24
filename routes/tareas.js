import { Router } from 'express';
import { check } from 'express-validator';

import { validarJWT } from '../middlewares/validarJWT.js';
import { actualizarTarea, crearTarea, eliminarTarea, recibirTareas } from '../controllers/tareas.js';
import { validarCampos } from '../middlewares/validarCampos.js';


const tareasRouter = Router();

tareasRouter.use( validarJWT );

tareasRouter.get( '/', recibirTareas );
tareasRouter.post( 
    '/',
    [
        check( 'title', 'El titulo es obligatorio' ).not().isEmpty(),
        validarCampos
    ],
    crearTarea
);
tareasRouter.put( 
    '/:id',
    [
        check( 'title', 'El titulo es obligatorio' ).not().isEmpty(),
        validarCampos
    ], 
    actualizarTarea
);
tareasRouter.delete( '/:id', eliminarTarea );

export default tareasRouter;