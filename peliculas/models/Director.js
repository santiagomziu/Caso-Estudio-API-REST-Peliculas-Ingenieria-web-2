import {Schema, model} from "mongoose";

const DirectorSchema = new Schema({
    nombres: {type: String, required: true},
    estado: {type: String, enum:['Activo', 'Inactivo'], default: 'Activo'},
    fechaCreacion: {type: Date, default: Date.now},
    fechaActualizacion: {type: Date, default: Date.now}
});

export default model('Director', DirectorSchema);