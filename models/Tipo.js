import {Schema, model} from "mongoose";

const TipoSchema = new Schema({
    nombre: {type: String, required: true},
    fechaCreacion: {type: Date, default: Date.now},
    fechaActualizacion: {type: Date, default: Date.now},
    description: {type: String}
});

export default model('Tipo', TipoSchema);

