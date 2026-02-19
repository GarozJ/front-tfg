import React, { useState, useEffect } from 'react';
import { getRoles, getRol, createRol } from '../../api/apiClient';
import CollectionView from '../common/CollectionView';

export default function RolList() {
  const [items, setItems] = useState([]);
  const [id, setId] = useState('');
  const [one, setOne] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => { load(); }, []);
  function load() { getRoles().then(setItems).catch(e => alert('Error: ' + e)); }
  function fetchOne() { if (!id) return alert('Pon un id'); getRol(id).then(setOne).catch(e => alert('Error: ' + e)); }
  function doCreate() { if (!newName) return alert('Pon un nombre'); createRol(newName).then(()=>{ setNewName(''); load(); }).catch(e=>alert('Error: '+e)); }

  const columns = [
    { key: 'idRol', label: 'ID' },
    { key: 'nombre', label: 'Nombre' }
  ];

  return (
    <div>
      <CollectionView title="Roles" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop:12, display:'flex', gap:8}}>
          <input className="input" placeholder="id" value={id} onChange={e=>setId(e.target.value)} />
          <button className="btn" onClick={fetchOne}>Cargar por id</button>
        </div>
        <div style={{marginTop:12, display:'flex', gap:8}}>
          <input className="input" placeholder="nuevo rol" value={newName} onChange={e=>setNewName(e.target.value)} />
          <button className="btn" onClick={doCreate}>Crear rol</button>
        </div>

        {one && <div style={{marginTop:12}} className="card small"><strong>Elemento</strong><pre className="pre">{JSON.stringify(one, null, 2)}</pre></div>}
      </CollectionView>
    </div>
  );
}
