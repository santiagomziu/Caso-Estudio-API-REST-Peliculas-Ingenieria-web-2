import mongoose from "mongoose";

const dbconnect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/peliculas_app_db");
        console.log("Conexion Correcta");
    } catch (err){
        console.log("Error de conexion", err);
    }
};

export default dbconnect;