import React, { useState, useEffect } from 'react';
import { getLibros, getLibro, createLibro, updateLibro, deleteLibro } from '../../api/apiClient';
import CollectionView from '../common/CollectionView';
import FormComponent from '../common/FormComponent';
import TableActions from '../common/TableActions';

export default function LibroCrud() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { load(); }, []);

  function load() {
    getLibros().then(setItems).catch(e => alert('Error al cargar: ' + e.message));
  }

  function handleCreate(data) {
    setLoading(true);
    createLibro(data)
      .then(() => { load(); setShowForm(false); })
      .catch(e => alert('Error al crear: ' + e.message))
      .finally(() => setLoading(false));
  }

  function handleEdit(id) {
    setEditingId(id);
    setShowForm(true);
  }

  function handleUpdate(data) {
    setLoading(true);
    updateLibro(editingId, data)
      .then(() => { load(); setShowForm(false); setEditingId(null); })
      .catch(e => alert('Error al actualizar: ' + e.message))
      .finally(() => setLoading(false));
  }

  function handleDelete(id) {
    if (window.confirm('¿Eliminar este libro?')) {
      deleteLibro(id)
        .then(() => load())
        .catch(e => alert('Error al eliminar: ' + e.message));
    }
  }

  const columns = [
    { key: 'idLibro', label: 'ID' },
    { key: 'titulo', label: 'Título' },
    { key: 'autor', label: 'Autor' },
    {
      key: 'actions',
      label: 'Acciones',
      render: (item) => (
        <TableActions
          onEdit={() => handleEdit(item.id)}
          onDelete={() => handleDelete(item.id)}
        />
      )
    }
  ];

  const formFields = [
    { key: 'titulo', label: 'Título', placeholder: 'Título del libro' },
    { key: 'autor', label: 'Autor', placeholder: 'Autor' },
    { key: 'isbn', label: 'ISBN', placeholder: 'ISBN' },
    { key: 'descripcion', label: 'Descripción', type: 'textarea', placeholder: 'Descripción' }
  ];

  return (
    <div>
      <CollectionView title="Libros" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop: 12}}>
          <button className="btn" onClick={() => { setShowForm(!showForm); setEditingId(null); }}>
            {showForm ? 'Ocultar formulario' : '+ Nuevo Libro'}
          </button>
        </div>

        {showForm && (
          <FormComponent
            title={editingId ? 'Editar Libro' : 'Crear Libro'}
            fields={formFields}
            onSubmit={editingId ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditingId(null); }}
            loading={loading}
          />
        )}
      </CollectionView>
    </div>
  );
}

