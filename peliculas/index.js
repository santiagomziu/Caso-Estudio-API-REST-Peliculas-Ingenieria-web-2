import express from "express";
import cors from "cors";
import dbconnect from "./config.js";

import generoRoutes from "./routes/generoRoute.js";
import directorRoutes from "./routes/directorRoute.js";
import productoraRoutes from "./routes/productoraRoute.js";
import tipoRoutes from "./routes/tipoRoute.js";
import mediaRoutes from "./routes/mediaRoute.js";
const app = express();


app.use(cors());
app.use(express.json());

dbconnect();

app.use("/generos", generoRoutes);
app.use("/directores", directorRoutes);
app.use("/productoras", productoraRoutes);
app.use("/tipos", tipoRoutes);
app.use("/medias", mediaRoutes);

app.get("/", (req, res) => {
    res.send("API de Gestión de Películas");
});

app.listen(3000, ()=>{
    console.log("Server en el puerto 3000")
})