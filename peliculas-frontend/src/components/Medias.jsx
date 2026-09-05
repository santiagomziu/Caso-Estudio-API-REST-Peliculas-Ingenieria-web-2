import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Medias() {
    const [medias, setMedias] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);

    // Estado para controlar la edición
    const [editId, setEditId] = useState(null);

    const initialForm = {
        serial: '', titulo: '', sinopsis: '', url: '', imagen: '', 
        anoEstreno: new Date().getFullYear(), genero: '', director: '', productora: '', tipo: ''
    };

    const [form, setForm] = useState(initialForm);

    const loadData = async () => {
        try {
            const [resMedia, resGen, resDir, resProd, resTipo] = await Promise.all([
                API.get('/medias'),
                API.get('/generos'),
                API.get('/directores'),
                API.get('/productoras'),
                API.get('/tipos')
            ]);

            setMedias(resMedia.data);
            setGeneros(resGen.data.filter(g => g.estado === 'Activo'));
            setDirectores(resDir.data.filter(d => d.estado === 'Activo'));
            setProductoras(resProd.data.filter(p => p.estado === 'Activo'));
            setTipos(resTipo.data);
        } catch (err) {
            console.error("Error al cargar datos", err);
        }
    };

    useEffect(() => { loadData(); }, []);

    // Enviar el formulario (Crear o Actualizar)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                // Actualizar registro existente
                await API.put(`/medias/${editId}`, form);
                alert("Producción actualizada exitosamente");
            } else {
                // Crear nuevo registro
                await API.post('/medias', form);
                alert("Producción guardada exitosamente");
            }
            handleCancel();
            loadData();
        } catch (err) {
            alert(err.response?.data?.mensaje || "Error al procesar la producción");
        }
    };

    // Cargar datos del registro en el formulario para editar
    const handleEdit = (m) => {
        setEditId(m._id);
        setForm({
            serial: m.serial || '',
            titulo: m.titulo || '',
            sinopsis: m.sinopsis || '',
            url: m.url || '',
            imagen: m.imagen || '',
            anoEstreno: m.anoEstreno || new Date().getFullYear(),
            genero: m.genero?._id || m.genero || '',
            director: m.director?._id || m.director || '',
            productora: m.productora?._id || m.productora || '',
            tipo: m.tipo?._id || m.tipo || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazar arriba al formulario
    };

    // Cancelar la edición y limpiar el formulario
    const handleCancel = () => {
        setEditId(null);
        setForm(initialForm);
    };

    return (
        <div className="container mt-4">
            <h2>Catálogo de Películas y Series</h2>

            <form onSubmit={handleSubmit} className="card p-3 shadow-sm mb-4">
                <h5>{editId ? 'Editar Producción' : 'Agregar Producción'}</h5>
                <div className="row g-3">
                    <div className="col-md-3">
                        <input type="text" className="form-control" placeholder="Serial Único" value={form.serial} onChange={e => setForm({...form, serial: e.target.value})} required />
                    </div>
                    <div className="col-md-3">
                        <input type="text" className="form-control" placeholder="Título" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} required />
                    </div>
                    <div className="col-md-3">
                        <input type="url" className="form-control" placeholder="URL Película" value={form.url} onChange={e => setForm({...form, url: e.target.value})} required />
                    </div>
                    <div className="col-md-3">
                        <input type="number" className="form-control" placeholder="Año Estreno" value={form.anoEstreno} onChange={e => setForm({...form, anoEstreno: e.target.value})} required />
                    </div>

                    <div className="col-md-3">
                        <select className="form-select" value={form.genero} onChange={e => setForm({...form, genero: e.target.value})} required>
                            <option value="">Seleccione Género...</option>
                            {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <select className="form-select" value={form.director} onChange={e => setForm({...form, director: e.target.value})} required>
                            <option value="">Seleccione Director...</option>
                            {directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <select className="form-select" value={form.productora} onChange={e => setForm({...form, productora: e.target.value})} required>
                            <option value="">Seleccione Productora...</option>
                            {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <select className="form-select" value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})} required>
                            <option value="">Seleccione Tipo...</option>
                            {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <input type="url" className="form-control" placeholder="URL Imagen Portada" value={form.imagen} onChange={e => setForm({...form, imagen: e.target.value})} required />
                    </div>

                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Sinopsis" value={form.sinopsis} onChange={e => setForm({...form, sinopsis: e.target.value})} required />
                    </div>

                    <div className="col-12 text-end d-flex gap-2 justify-content-end">
                        {editId && (
                            <button className="btn btn-secondary" type="button" onClick={handleCancel}>
                                Cancelar
                            </button>
                        )}
                        <button className="btn btn-primary" type="submit">
                            {editId ? 'Actualizar Producción' : 'Guardar Producción'}
                        </button>
                    </div>
                </div>
            </form>

            <div className="row">
                {medias.map(m => (
                    <div key={m._id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img 
                                src={m.imagen} 
                                className="card-img-top" 
                                alt={m.titulo} 
                                style={{ height: '220px', objectFit: 'cover' }} 
                                onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = 'https://picsum.photos/300/400';
                            }} 
                            />
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h5 className="card-title">{m.titulo} ({m.anoEstreno})</h5>
                                    <p className="card-text text-muted small">{m.sinopsis}</p>
                                    <ul className="list-group list-group-flush small mb-3">
                                        <li className="list-group-item"><strong>Género:</strong> {m.genero?.nombre}</li>
                                        <li className="list-group-item"><strong>Director:</strong> {m.director?.nombres}</li>
                                        <li className="list-group-item"><strong>Productora:</strong> {m.productora?.nombre}</li>
                                        <li className="list-group-item"><strong>Tipo:</strong> {m.tipo?.nombre}</li>
                                    </ul>
                                </div>
                                <button className="btn btn-sm btn-warning w-100" onClick={() => handleEdit(m)}>
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}