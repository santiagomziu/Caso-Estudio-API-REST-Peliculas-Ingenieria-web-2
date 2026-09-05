import {Schema, model} from "mongoose";

const GeneroSchema = new Schema({
    nombre: {type: String, required: true},
    estado: {type: String, enum: ['Activo', 'Inactivo'], default: 'Activo'},
    fechaCreacion: {type: Date, default: Date.now},
    fechaActualizacion: {type: Date, default: Date.now},
    description: {type:String}
});

export default model('Genero', GeneroSchema);