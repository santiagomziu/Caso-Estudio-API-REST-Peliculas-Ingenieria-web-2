import Tipo from "../models/Tipo.js";

export const getTipos = async (req, res) =>{
    try{
        const tipos = await Tipo.find();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({mensaje: "Error al obtener tipos", error: error.message});
    }
};

export const createTipo = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevoTipo = new Tipo({ nombre, descripcion });
        await nuevoTipo.save();
        res.status(201).json(nuevoTipo);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear tipo", error: error.message });
    }
};

export const updateTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const tipoActualizado = await Tipo.findByIdAndUpdate(
            id,
            { nombre, descripcion, fechaActualizacion: new Date() },
            { new: true }
        );
        res.json(tipoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar tipo", error: error.message });
    }
};