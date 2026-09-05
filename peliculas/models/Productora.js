import {Schema, model} from "mongoose";

const ProductoraSchema = new Schema({
    nombre: {type: String, required: true},
    estado: {type: String, enum: ['Activo', 'Inactivo'], default: 'Activo'},
    fechaCreacion: {type: Date, default: Date.now},
    fechaActualizacion: {type: Date, default: Date.now},
    slogan: {type: String},
    descripcion: {type: String}
});

export default model('Productora', ProductoraSchema);
