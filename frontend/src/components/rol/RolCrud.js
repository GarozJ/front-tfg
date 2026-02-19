import React, { useState, useEffect } from 'react';
import { getRoles, getRol, createRol, updateRol, deleteRol } from '../../api/apiClient';
import CollectionView from '../common/CollectionView';
import FormComponent from '../common/FormComponent';
import TableActions from '../common/TableActions';

export default function RolCrud() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { load(); }, []);

  function load() {
    getRoles().then(setItems).catch(e => alert('Error al cargar: ' + e.message));
  }

  function handleCreate(data) {
    setLoading(true);
    // Para crear rol, solo necesitamos el nombre (string)
    createRol(data.rol)
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
    updateRol(editingId, data)
      .then(() => { load(); setShowForm(false); setEditingId(null); })
      .catch(e => alert('Error al actualizar: ' + e.message))
      .finally(() => setLoading(false));
  }

  function handleDelete(id) {
    if (window.confirm('¿Eliminar este rol?')) {
      deleteRol(id)
        .then(() => load())
        .catch(e => alert('Error al eliminar: ' + e.message));
    }
  }

  const columns = [
    { key: 'idRol', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
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
    { key: 'rol', label: 'Nombre del Rol', placeholder: 'Ej: ADMIN, USER' }
  ];

  return (
    <div>
      <CollectionView title="Roles" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop: 12}}>
          <button className="btn" onClick={() => { setShowForm(!showForm); setEditingId(null); }}>
            {showForm ? 'Ocultar formulario' : '+ Nuevo Rol'}
          </button>
        </div>

        {showForm && (
          <FormComponent
            title={editingId ? 'Editar Rol' : 'Crear Rol'}
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

