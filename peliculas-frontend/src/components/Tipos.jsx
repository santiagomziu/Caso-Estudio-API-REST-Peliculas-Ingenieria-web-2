import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Tipos() {
    const [tipos, setTipos] = useState([]);
    const [form, setForm] = useState({ nombre: '', descripcion: '' });
    const [editId, setEditId] = useState(null);

    const fetchTipos = async () => {
        try {
            const res = await API.get('/tipos');
            setTipos(res.data);
        } catch (err) {
            console.error("Error al obtener tipos", err);
        }
    };

    useEffect(() => { fetchTipos(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
            await API.put(`/tipos/${editId}`, form);
        } else {
            await API.post('/tipos', form);
        }
        setForm({ nombre: '', descripcion: '' });
        setEditId(null);
        fetchTipos();
        } catch (err) {
            alert("Error al guardar tipo");
        }
    };

    const handleEdit = (t) => {
        setEditId(t._id);
        setForm({ nombre: t.nombre, descripcion: t.descripcion || '' });
    };

    return (
        <div className="container">
            <h2>Gestión de Tipos de Multimedia</h2>
            <form onSubmit={handleSubmit} className="mb-4 card p-3 shadow-sm">
                <div className="row g-3">
                    <div className="col-md-5">
                        <input type="text" className="form-control" placeholder="Nombre (Ej: Serie, Película)" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
                    </div>
                    <div className="col-md-5">
                        <input type="text" className="form-control" placeholder="Descripción" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary w-100" type="submit">{editId ? 'Actualizar' : 'Guardar'}</button>
                    </div>
                </div>
            </form>

            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tipos.map(t => (
                        <tr key={t._id}>
                            <td>{t.nombre}</td>
                            <td>{t.descripcion}</td>
                            <td><button className="btn btn-sm btn-warning" onClick={() => handleEdit(t)}>Editar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}