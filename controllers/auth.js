import { response } from 'express';
import bcryptjs from 'bcryptjs';

import Usuario from '../models/Usuario.js';
import { generarJWT } from '../helpers/jwt.js';


export const crearUsuario = async ( req, res = response ) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if( usuario ) {
            return res.status( 400 ).json({
                ok: false,
                errors: {
                    email: {
                        message: 'Este email ya esta registrado!',
                        value: email
                    }
                }
            })
        }
        usuario = new Usuario( req.body );
        
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        await usuario.save();
        const token = await generarJWT( usuario.id, usuario.name );

        res.status( 201 ).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        })
    } catch (error) {
        res.status( 500 ).json({
            ok: false,
            errors: {
                message: 'Error inesperado del server al registrar el usuario. Contactese con nuestra mesa de ayuda!',
                value: email
            }
        })
    }
}


export const loginUsuario = async ( req, res = response ) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if( !usuario ) {
            return res.status( 400 ).json({
                ok: false,
                errors: {
                    email: {
                        msg: 'Este email aun no esta registrado!',
                        value: email
                    }
                }
            })
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ) {
            return res.status( 400 ).json({
                ok: false,
                errors: {
                    password: {
                        msg: 'La contraseña es incorrecta!',
                        value: password
                    }
                }
            })
        }

        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            message: 'Usted se logueo correctamente',
            name: usuario.name,
            uid: usuario.id,
            token,
        })
    } catch (error) {
        res.status( 500 ).json({
            ok: false,
            message: 'Error inesperado del server al iniciar sesion. Contactese con nuestra mesa de ayuda!',
        })
    }
}


export const revalidarToken = async ( req, res = response ) => {
    const token = await generarJWT( req.uid, req.name );

    res.json({
        ok: true,
        uid: req.uid,
        name: req.name,
        token
    })
}
