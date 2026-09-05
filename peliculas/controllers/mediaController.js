import Media from "../models/Media.js";
import Genero from "../models/Genero.js";
import Director from "../models/Director.js";
import Productora from "../models/Productora.js";
import Tipo from "../models/Tipo.js";

//obtener todas las producciones
export const getMedias =async (req, res) => {
    try{
        const medias = await Media.find()
        .populate('genero')
        .populate('director')
        .populate('productora')
        .populate('tipo');
        res.json(medias);
    } catch (error){
        res.status(500).json({mensaje: "Error al obtener producciones", error: error.message});
    }
};

//crear una pelicula o serie
export const createMedia = async (req,res) =>{
    try{
        const {serial, titulo, sinopsis, url, imagen, anoEstreno, genero, director, productora, tipo} = req.body;

        //validar unicidad de serial y URL
        const existeSerial = await Media.findOne({ serial});
        if (existeSerial){
            return res.status(400).json({mensaje: "El serial ya existe en el sistema."});
        }

        const existeUrl = await Media.findOne({url});
        if(existeUrl){
            return res.status(400).json({mensaje: "La URL de la pelicula ya existe."});
        }

        const generoDb = await Genero.findById(genero);
        if(!generoDb || generoDb.estado !== 'Activo'){
            return res.status(400).json({mensaje: "El genero seleccionado no existe o está inactivo"});
        }

        const directorDb = await Director.findById(director);
        if(!directorDb || directorDb.estado !== 'Activo'){
            return res.status(400).json({mensaje: "El director seleccionado no existe o está inactivo"});
        }

        const productoraDb = await Productora.findById(productora);
        if(!productoraDb || productoraDb.estado !== 'Activo'){
            return res.status(400).json({mensaje: "La productora seleccionada no existe o está inactiva"});
        }

        const tipoDb = await Tipo.findById(tipo);
        if(!tipoDb){
            return res.status(400).json({mensaje: "El tipo seleccionado no existe"});
        }

        //si todo esta valido
        const nuevaMedia = new Media({
            serial,
            titulo,
            sinopsis,
            url,
            imagen,
            anoEstreno,
            genero,
            director,
            productora,
            tipo
        });

        await nuevaMedia.save();
        res.status(201).json(nuevaMedia);
    } catch (error){
        res.status(400).json({mensaje: "Error al crear la produccion", error: error.message});
    }
};

//actualizar una pelicula o serie
export const updateMedia = async (req,res) => {
    try{
        const {id} = req.params;
        const {serial, titulo, sinopsis, url, imagen, anoEstreno, genero, director, productora, tipo} = req.body;

        //validaciones

        if (genero){
            const generoDb = await Genero.findById(genero);
            if(!generoDb || generoDb.estado !== 'Activo'){
                return res.status(400).json({mensaje: "El genero seleccionado no esta inactivo"});
            }
        }

        if (director){
            const directorDb = await Director.findById(director);
            if(!directorDb || directorDb.estado !== 'Activo'){
                return res.status(400).json({ mensaje: "El director seleccionado no esta activo"});
            }
        }

        if (productora){
            const productoraDb = await Productora.findById(productora);
            if(!productoraDb || productoraDb.estado !== 'Activo'){
                return res.status(400).json({
                    mensaje: "La producta seleccionada no esta activa"
                });
            }
        }

        const mediaActualizada = await Media.findByIdAndUpdate(
            id,
            {
                serial,
                titulo,
                sinopsis,
                url,
                imagen,
                anoEstreno,
                genero,
                director,
                productora,
                tipo,
                fechaActualizacion: new Date()
            },
            {new : true}
        );

        res.json(mediaActualizada);
    
    } catch (error){
        res.status(400).json({mensaje: "Error al actualizar la produccion", error: error.message});
    }
};

//Eliminar produccion
export const deleteMedia = async (req, res) =>{
    try{
        const {id} = req.params;
        await Media.findByIdAndDelete(id);
        res.json({mensaje: "Produccion eliminada correctamente"});
    } catch (error){
        res.status(500).json({mensaje:"Error al eliminar la produccion", error: error.message});
    }
};