import { Router } from 'express';
import { check } from 'express-validator';

import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/auth';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';


const router = Router();

router.post( 
    '/new',
    [
        check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'email', 'El e-mail es invalido' ).isEmail(),
        check( 'password', 'La contraseña debe tener minimo 6 caracteres' ).isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);
router.post( 
    '/',
    [
        check( 'email', 'El e-mail es invalido' ).isEmail(),
        check( 'password', 'La contraseña debe tener minimo 6 caracteres' ).isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);
router.get( '/renew', validarJWT, revalidarToken );

export default router;