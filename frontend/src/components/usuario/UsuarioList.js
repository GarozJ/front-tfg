import React, { useState, useEffect } from 'react';
import { getUsuarios, getUsuario } from '../../api/apiClient';
import CollectionView from '../common/CollectionView';

export default function UsuarioList() {
  const [items, setItems] = useState([]);
  const [id, setId] = useState('');
  const [one, setOne] = useState(null);

  useEffect(() => { load(); }, []);
  function load() { getUsuarios().then(setItems).catch(e => alert('Error: ' + e)); }
  function fetchOne() { if (!id) return alert('Pon un id'); getUsuario(id).then(setOne).catch(e => alert('Error: ' + e)); }

  const columns = [
    { key: 'usuarioId', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'email', label: 'Email' }
  ];

  return (
    <div>
      <CollectionView title="Usuarios" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop:12, display:'flex', gap:8}}>
          <input className="input" placeholder="id" value={id} onChange={e=>setId(e.target.value)} />
          <button className="btn" onClick={fetchOne}>Cargar por id</button>
        </div>

        {one && <div style={{marginTop:12}} className="card small"><strong>Elemento</strong><pre className="pre">{JSON.stringify(one, null, 2)}</pre></div>}
      </CollectionView>
    </div>
  );
}
