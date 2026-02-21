import React, { useState, useEffect } from 'react';
import { getLibros, getLibro } from '../../api/apiClient';
import CollectionView from '../common/CollectionView';

export default function LibroList() {
  const [items, setItems] = useState([]);
  const [id, setId] = useState('');
  const [one, setOne] = useState(null);

  useEffect(() => { load(); }, []);
  function load() { getLibros().then(setItems).catch(e => alert('Error: ' + e)); }
  function fetchOne() { if (!id) return alert('Pon un id'); getLibro(id).then(setOne).catch(e => alert('Error: ' + e)); }

  const columns = [
    { key: 'idLibro', label: 'ID' },
    { key: 'titulo', label: 'Título' },
    { key: 'autor', label: 'Autor' },
    { key: 'editorial', label: 'Editorial', placeholder: 'Editorial' },
    { key: 'categoria', label: 'Categoría', placeholder: 'Categoría' },
    { key: 'isbn', label: 'ISBN', placeholder: 'ISBN' },
    { key: 'imagen', label: 'Imagen', placeholder: 'Link de la imagen' },
    { key: 'descripcion', label: 'Descripción', type: 'textarea', placeholder: 'Descripción' }
  ];

  return (
    <div>
      <CollectionView title="Libros" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop:12, display:'flex', gap:8}}>
          <input className="input" placeholder="id" value={id} onChange={e=>setId(e.target.value)} />
          <button className="btn" onClick={fetchOne}>Cargar por id</button>
        </div>

        {one && <div style={{marginTop:12}} className="card small"><strong>Elemento</strong><pre className="pre">{JSON.stringify(one, null, 2)}</pre></div>}
      </CollectionView>
    </div>
  );
}
