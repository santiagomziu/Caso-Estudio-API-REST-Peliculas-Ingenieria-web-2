import { useEffect, useState } from "react";
import API from '../services/api'

export default function Directores(){
    const [Directores, setDirectores] = useState ([]);
    const [form, setForm] = useState({nombres:'', estado:'Activo'});
    const [editId, setEditId] = useState(null);

    const fetchDirectores = async () => {
        try{
            const res= await API.get('/directores');
            setDirectores(res.data);
        } catch (err){
            console.error("Error al obtener directores", err);
        }
    };

    useEffect(() => {fetchDirectores(); }, []);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if(editId){
                await API.put('/directores/${editId}', form);
            } else {
                await API.post('/directores', form);
            }
            setForm({nombres: '', estado:'Activo'});
            setEditId(null);
            fetchDirectores();
        } catch (err) {
            alert("Error al guardar director");
        }
    };

    const handleEdit = (d) => {
        setEditId(d._id);
        setForm({nombres: d.nombres, estado: d.estado});
    };

    return (
        <div className="container">
            <h2>Gestion de Directores</h2>
            <form onSubmit={handleSubmit} className="mb-4 card p-3 shadow-sm">
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Nombres del Director" value={form.nombres} onChange={e => setForm({...form,nombres: e.target.value})} required />
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" value={form.estado} onChange={e => setForm({...form,estado: e.target.value})}>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary w-100" type="submit">{editId ? 'Actualizar' : 'Guardar'}</button>
                    </div>
                </div>
            </form>

            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Nombres</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Directores.map(d =>(
                        <tr key={d._id}>
                            <td>{d.nombres}</td>
                            <td><span className={`badge ${d.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>{d.estado}</span></td>
                            <td><button className="btn btn-sm btn-warning" onClick={() => handleEdit(d)}>Editar</button></td>
                        </tr>
                ))}
                </tbody>
            </table>
        </div>
    )


}