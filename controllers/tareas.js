import { response } from  'express';

import Tarea from '../models/Tarea.js';


export const recibirTareas = async ( req, res = response ) => {
    const tareas = await Tarea.find({ uid: req.uid });

    res.status( 201 ).json({
        ok: true,
        tareas
    })
}

export const crearTarea = async ( req, res = response ) => {
    const tarea = new Tarea( req.body );

    try {
        tarea.uid = req.uid;
        tarea.status = 'pending';
        const tareaDB = await tarea.save();

        res.json({
            ok: true,
            tareaDB
        })
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({
            ok: true,
            message: 'Ocurrio un error inesperado'
        })
    }
}

export const actualizarTarea = async ( req, res = response ) => {
    const tareaId = req.params.id;
    const uid = req.uid;

    try {
        encontrarTarea( tareaId, uid, false );

        const nuevaTarea = {
            ...req.body,
            status: 'pending',
            uid
        }
        const tareaActualizada = await Tarea.findByIdAndUpdate( tareaId, nuevaTarea, { new: true } );
        return res.json({
            ok: true,
            tareaActualizada
        })

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            message: 'Ocurrio un error inesperado'
        })
    }
}

export const completarTarea = async ( req, res = response ) => {
    const tareaId = req.params.id;
    const uid = req.uid;
    try {
        const tarea = encontrarTarea( tareaId, uid, false );
        tarea.status = 'completada'

        const tareaCompletada = await Tarea.findByIdAndUpdate( tareaId, tarea, { new: true } );
        return res.json({
            ok: true,
            tareaCompletada
        })
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            message: 'No se pudo completar la tarea'
        })
    }
}

export const eliminarTarea = async ( req, res = response ) => {
    const tareaId = req.params.id;
    const uid = req.uid;

    try {
        encontrarTarea( tareaId, uid, true );

        await Tarea.findByIdAndDelete( tareaId );
        return res.json({
            ok: true
        })

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            message: 'No se pudo borrar la tarea'
        })
    }
}