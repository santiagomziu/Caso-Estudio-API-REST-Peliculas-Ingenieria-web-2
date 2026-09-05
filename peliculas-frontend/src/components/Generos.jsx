import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Generos() {
    const [generos, setGeneros] = useState([]);
    const [form, setForm] = useState({ nombre: '', estado: 'Activo', descripcion: '' });
    const [editId, setEditId] = useState(null);

    // Cargar lista de géneros desde el Backend
    const fetchGeneros = async () => {
        try {
        const res = await API.get('/generos');
        setGeneros(res.data);
        } catch (err) {
        console.error("Error al obtener géneros", err);
        }
    };

    useEffect(() => {
        fetchGeneros();
    }, []);

    // Enviar formulario (Crear o Editar)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await API.put(`/generos/${editId}`, form);
            } else {
                await API.post('/generos', form);
            }
            setForm({ nombre: '', estado: 'Activo', descripcion: '' });
            setEditId(null);
            fetchGeneros();
        } catch (err) {
            alert("Error al guardar el género");
        }
    };

    // Cargar datos en el formulario para editar
    const handleEdit = (g) => {
        setEditId(g._id);
        setForm({ nombre: g.nombre, estado: g.estado, descripcion: g.descripcion || '' });
    };

    const handleCancel = () => {
        setEditId(null);
        setForm({ nombre: '', estado: 'Activo', descripcion: '' });
    };

    return (
        <div className="container">
        <h2>Gestión de Géneros</h2>
        
        {/* Formulario de Creación / Edición */}
        <form onSubmit={handleSubmit} className="mb-4 card p-3 shadow-sm">
            <div className="row g-3">
            <div className="col-md-4">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Nombre del Género" 
                value={form.nombre} 
                onChange={e => setForm({...form, nombre: e.target.value})} 
                required 
                />
            </div>
            <div className="col-md-3">
                <select 
                className="form-select" 
                value={form.estado} 
                onChange={e => setForm({...form, estado: e.target.value})}
                >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                </select>
            </div>
            <div className="col-md-3">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Descripción" 
                value={form.descripcion} 
                onChange={e => setForm({...form, descripcion: e.target.value})} 
                />
            </div>
            <div className="col-md-2 d-flex gap-2">
                <button className="btn btn-primary w-100" type="submit">
                {editId ? 'Actualizar' : 'Guardar'}
                </button>
                {editId && (
                <button className="btn btn-secondary" type="button" onClick={handleCancel}>
                    Cancelar
                </button>
                )}
            </div>
            </div>
        </form>

        {/* Tabla de Géneros */}
        <table className="table table-striped table-hover">
            <thead className="table-dark">
            <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Descripción</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {generos.length === 0 ? (
                <tr>
                <td colSpan="4" className="text-center">No hay géneros registrados</td>
                </tr>
            ) : (
                generos.map(g => (
                <tr key={g._id}>
                    <td>{g.nombre}</td>
                    <td>
                    <span className={`badge ${g.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                        {g.estado}
                    </span>
                    </td>
                    <td>{g.descripcion}</td>
                    <td>
                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(g)}>
                        Editar
                    </button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    );
}