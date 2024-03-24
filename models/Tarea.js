import { Schema, model } from "mongoose";


const TareaSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    }
});

export default model( 'Tarea', TareaSchema );