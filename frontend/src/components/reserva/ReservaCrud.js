import React, { useState, useEffect } from 'react';
import { getReservas, getReserva, createReserva, updateReserva, deleteReserva } from '../../api/apiClient';
import CollectionView from '../common/CollectionView';
import FormComponent from '../common/FormComponent';
import TableActions from '../common/TableActions';

export default function ReservaCrud() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { load(); }, []);

  function load() {
    getReservas().then(setItems).catch(e => alert('Error al cargar: ' + e.message));
  }

  function handleCreate(data) {
    setLoading(true);
    createReserva(data)
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
    updateReserva(editingId, data)
      .then(() => { load(); setShowForm(false); setEditingId(null); })
      .catch(e => alert('Error al actualizar: ' + e.message))
      .finally(() => setLoading(false));
  }

  function handleDelete(id) {
    if (window.confirm('¿Eliminar esta reserva?')) {
      deleteReserva(id)
        .then(() => load())
        .catch(e => alert('Error al eliminar: ' + e.message));
    }
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'usuario', label: 'Usuario', render: (item) => item.usuario ? item.usuario.nombre : 'N/A' },
    { key: 'libro', label: 'Libro', render: (item) => item.libro ? item.libro.titulo : 'N/A' },
    { key: 'fechaReserva', label: 'Fecha Reserva' },
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
    { key: 'fechaReserva', label: 'Fecha Reserva', type: 'date' }
  ];

  return (
    <div>
      <CollectionView title="Reservas" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop: 12}}>
          <button className="btn" onClick={() => { setShowForm(!showForm); setEditingId(null); }}>
            {showForm ? 'Ocultar formulario' : '+ Nueva Reserva'}
          </button>
        </div>

        {showForm && (
          <FormComponent
            title={editingId ? 'Editar Reserva' : 'Crear Reserva'}
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

