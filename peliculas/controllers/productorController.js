import Productora from "../models/Productora.js";

export const getProductoras = async (req, res) => {
    try{
        const productoras = await Productora.find();
        res.json(productoras);
    } catch (error){
        res.status(500).json({mensaje: "Error al obtener productoras", error: error.message});
    }
};

export const createProductora = async (req, res) => {
    try{
        const {nombre, estado, slogan, descripcion} = req.body;
        const nuevaProductora = new Productora({nombre, estado, slogan, descripcion});
        await nuevaProductora.save();
        res.status(201).json(nuevaProductora);
    } catch (error) {
        res.status(400).json({mensaje:"Error al crear productora", error: error.message});
    }
};

export const updateProductora = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, estado, slogan, descripcion} = req.body;
        const productoraActualizada = await Productora.findByIdAndUpdate(
            id,
            {nombre, estado, slogan, descripcion, fechaActualizacion: new Date()},
            {new: true}
        );
        res.json(productoraActualizada);
    } catch (error){
        res.status(400).json({mensaje: "Error al actualizar productora", error: error.message});
    }
};