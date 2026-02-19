import React, { useState, useEffect } from 'react';
import { getPrestamos, getPrestamo, createPrestamo, updatePrestamo, deletePrestamo } from '../../api/apiClient';
import CollectionView from '../common/CollectionView';
import FormComponent from '../common/FormComponent';
import TableActions from '../common/TableActions';

export default function PrestamoCrud() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { load(); }, []);

  function load() {
    getPrestamos().then(setItems).catch(e => alert('Error al cargar: ' + e.message));
  }

  function handleCreate(data) {
    setLoading(true);
    createPrestamo(data)
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
    updatePrestamo(editingId, data)
      .then(() => { load(); setShowForm(false); setEditingId(null); })
      .catch(e => alert('Error al actualizar: ' + e.message))
      .finally(() => setLoading(false));
  }

  function handleDelete(id) {
    if (window.confirm('¿Eliminar este préstamo?')) {
      deletePrestamo(id)
        .then(() => load())
        .catch(e => alert('Error al eliminar: ' + e.message));
    }
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'usuario', label: 'Usuario', render: (item) => item.usuario ? item.usuario.nombre : 'N/A' },
    { key: 'libro', label: 'Libro', render: (item) => item.libro ? item.libro.titulo : 'N/A' },
    { key: 'fechaInicio', label: 'Desde' },
    { key: 'fechaFin', label: 'Hasta' },
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
    { key: 'usuarioId', label: 'ID Usuario', type: 'number', placeholder: 'ID del usuario' },
    { key: 'libroId', label: 'ID Libro', type: 'number', placeholder: 'ID del libro' },
    { key: 'fechaInicio', label: 'Fecha Inicio', type: 'date' },
    { key: 'fechaFin', label: 'Fecha Fin', type: 'date' }
  ];

  return (
    <div>
      <CollectionView title="Préstamos" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop: 12}}>
          <button className="btn" onClick={() => { setShowForm(!showForm); setEditingId(null); }}>
            {showForm ? 'Ocultar formulario' : '+ Nuevo Préstamo'}
          </button>
        </div>

        {showForm && (
          <FormComponent
            title={editingId ? 'Editar Préstamo' : 'Crear Préstamo'}
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

