import Tarea from "../../models/Tarea.js";

export const encontrarTarea = async ( res, tareaId, uid, pendienteDeEliminar ) => {
    try {
        const tarea = await Tarea.findById( tareaId );
        if( !tarea ) {
            res.status( 404 ).json({
                ok: false,
                message: 'No se encontro ningun tarea con ese id'
            });
            return false;
        }
        if( tarea.uid != uid ) {
            res.status( 401 ).json({
                ok: false,
                message: 'No tiene permisos para operar con esta tarea'
            });
            return false;
        }
        if( tarea.status == 'completed' && !pendienteDeEliminar ) {
            res.status( 401 ).json({
                ok: false,
                message: 'No se puede modificar/completar una tarea que ya esta completada'
            });
            return false;
        }
        return tarea;
    } catch ( error ) {
        res.status( 401 ).json({
            ok: false,
            message: 'Ocurrio un error inesperado!'
        })
        return false;
    }
}