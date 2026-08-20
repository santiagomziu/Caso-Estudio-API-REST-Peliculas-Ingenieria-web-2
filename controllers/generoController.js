import Genero from "../models/Genero.js";

//obtener todos los generos
export const getGeneros = async (req, res) => {
    try{
        const generos = await Genero.find();
        res.json(generos);
    } catch (error){
        res.status(500).json({mensaje: "Error al obtener los generos", error: error.message});
    }
};

//crear genero
export const createGenero = async (req, res) => {
    try{
        const{nombre, estado, descripcion} = req.body;
        const nuevoGenero = new Genero({
            nombre,
            estado,
            descripcion
        });
        await nuevoGenero.save();
        res.status(201).json(nuevoGenero);
    
    } catch (error){
        res.status(400).json({mensaje:"Error al crear genero", error: error.message});
    }
};

//actualizar genero
export const updateGenero = async (req, res) => {
    try{
        const {id} = req.params;
        const {nombre,estado, descripcion} = req.body;

        const generoActualizado = await Genero.findByIdAndUpdate(
            id,
            {nombre, estado, descripcion, fechaActualizacion: new Date()},
            {new: true}
        );
        
        res.json(generoActualizado);
    } catch (error){
        res.status(400).json({
            mensaje: "Error al actualizar el genero", error: error.message
        });
    }
};