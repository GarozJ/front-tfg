import React, { useState, useEffect } from 'react';
import { getPrestamos, getPrestamo } from '../../api/apiClient';
import CollectionView from '../common/CollectionView';

export default function PrestamoList() {
  const [items, setItems] = useState([]);
  const [id, setId] = useState('');
  const [one, setOne] = useState(null);

  useEffect(() => { load(); }, []);
  function load() { getPrestamos().then(setItems).catch(e => alert('Error: ' + e)); }
  function fetchOne() { if (!id) return alert('Pon un id'); getPrestamo(id).then(setOne).catch(e => alert('Error: ' + e)); }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'usuario', label: 'Usuario' , render: it => it.usuario ? it.usuario.nombre : ''},
    { key: 'libro', label: 'Libro', render: it => it.libro ? it.libro.titulo : ''},
    { key: 'fechaInicio', label: 'Desde' },
    { key: 'fechaFin', label: 'Hasta' }
  ];

  return (
    <div>
      <CollectionView title="Préstamos" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop:12, display:'flex', gap:8}}>
          <input className="input" placeholder="id" value={id} onChange={e=>setId(e.target.value)} />
          <button className="btn" onClick={fetchOne}>Cargar por id</button>
        </div>

        {one && <div style={{marginTop:12}} className="card small"><strong>Elemento</strong><pre className="pre">{JSON.stringify(one, null, 2)}</pre></div>}
      </CollectionView>
    </div>
  );
}
