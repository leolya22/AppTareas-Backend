import { Router } from 'express';
import { check } from 'express-validator';

import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from '../middlewares/validarJWT.js';


const router = Router();

router.post( 
    '/new',
    [
        check( 'name', 'El nombre debe tener 3 digitos minimo' ).isLength({ min: 3 }),
        check( 'email', 'El e-mail es invalido' ).isEmail(),
        check( 'password', 'La contraseña debe tener minimo 6 digitos' ).isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);
router.post( 
    '/',
    [
        check( 'email', 'El e-mail es invalido' ).isEmail(),
        check( 'password', 'La contraseña debe tener minimo 6 digitos' ).isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);
router.get( '/renew', validarJWT, revalidarToken );

export default router;