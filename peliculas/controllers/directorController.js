import Director from "../models/Director.js";

export const getDirectores = async (req, res) => {
    try{
        const directores = await Director.find();
        res.json(directores)
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener directores", error: error.message
        });
    }
};

export const createDirector = async (req,res) => {
    try{
        const {nombres,estado} = req.body;
        const nuevoDirector = new Director({nombres, estado});
        await nuevoDirector.save();
        res.status(201).json(nuevoDirector);
    } catch (error){
        res.status(400).json({mensaje:"Error al crear director", mensaje: error.message});
    }
};

export const updateDirector = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombres,estado} = req.body;
        const directorActualizado = await Director.findByIdAndUpdate(
            id,
            {nombre, estado, fechaActualizacion: new Date()},
            {new: true}
        );
        res.json(directorActualizado);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar director", error: error.message
        })
    }
};

