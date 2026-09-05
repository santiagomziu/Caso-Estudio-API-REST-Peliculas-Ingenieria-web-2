import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Productoras() {
    const [productoras, setProductoras] = useState([]);
    const [form, setForm] = useState({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
    const [editId, setEditId] = useState(null);

    const fetchProductoras = async () => {
        try {
            const res = await API.get('/productoras');
            setProductoras(res.data);
        } catch (err) {
            console.error("Error al obtener productoras", err);
        }
    };

    useEffect(() => { fetchProductoras(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await API.put(`/productoras/${editId}`, form);
            } else {
                await API.post('/productoras', form);
            }
            setForm({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
            setEditId(null);
            fetchProductoras();
        } catch (err) {
            alert("Error al guardar productora");
        }
    };

    const handleEdit = (p) => {
        setEditId(p._id);
        setForm({ nombre: p.nombre, estado: p.estado, slogan: p.slogan || '', descripcion: p.descripcion || '' });
    };

    return (
        <div className="container">
            <h2>Gestión de Productoras</h2>
            <form onSubmit={handleSubmit} className="mb-4 card p-3 shadow-sm">
                <div className="row g-3">
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
                    </div>
                <div className="col-md-2">
                    <select className="form-select" value={form.estado} onChange={e => setForm({...form, estado: e.target.value})}>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Slogan" value={form.slogan} onChange={e => setForm({...form, slogan: e.target.value})} />
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Descripción" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
                </div>
                <div className="col-12 text-end">
                    <button className="btn btn-primary" type="submit">{editId ? 'Actualizar' : 'Guardar'}</button>
                </div>
                </div>
            </form>

        <table className="table table-striped">
            <thead className="table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Slogan</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productoras.map(p => (
                    <tr key={p._id}>
                        <td>{p.nombre}</td>
                        <td><span className={`badge ${p.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>{p.estado}</span></td>
                        <td>{p.slogan}</td>
                        <td>{p.descripcion}</td>
                        <td><button className="btn btn-sm btn-warning" onClick={() => handleEdit(p)}>Editar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}