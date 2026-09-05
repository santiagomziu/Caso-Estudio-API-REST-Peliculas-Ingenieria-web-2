import {Link} from 'react-router-dom';

export default function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/medias">🎬 Admin Películas</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to="/medias">Películas/Series</Link>
                    <Link className="nav-link" to="/generos">Géneros</Link>
                    <Link className="nav-link" to="/directores">Directores</Link>
                    <Link className="nav-link" to="/productoras">Productoras</Link>
                    <Link className="nav-link" to="/tipos">Tipos</Link>
                </div>
            </div>
        </nav>
    );
}