import Tarea from "../../models/Tarea";

export const encontrarTarea = async ( tareaId, uid, pendienteDeEliminar ) => {
    const tarea = await Tarea.findById( tareaId );

    if( !tarea ) {
        return res.status( 404 ).json({
            ok: false,
            message: 'No se encontro ningun tarea con ese id'
        })
    }
    if( tarea.uid != uid ) {
        return res.status( 401 ).json({
            ok: false,
            message: 'No tiene permisos para operar con esta tarea'
        })
    }
    if( tarea.status == 'completada' && !pendienteDeEliminar ) {
        return res.status( 401 ).json({
            ok: false,
            message: 'No se puede modificar/completar una tarea que ya esta completada'
        })
    }
    return tarea
}