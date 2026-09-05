import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Generos from "./components/Generos";
import Directores from "./components/Directores";
import Productoras from "./components/Productoras";
import Tipos from "./components/Tipos";
import Medias from "./components/Medias";

export default function App(){
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Medias/>}/>
        <Route path="/medias" element={<Medias/>}/>
        <Route path="/generos" element={<Generos/>}/>
        <Route path="/directores" element={<Directores />}/>
        <Route path="/productoras" element={<Productoras />}/>
        <Route path="/tipos" element={<Tipos />} />
      </Routes>
    </Router>
  );
}