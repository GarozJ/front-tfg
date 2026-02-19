import React, { useState, useEffect } from 'react';
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from '../../api/apiClient';
import CollectionView from '../common/CollectionView';
import FormComponent from '../common/FormComponent';
import TableActions from '../common/TableActions';

export default function UsuarioCrud() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { load(); }, []);

  function load() {
    getUsuarios().then(setItems).catch(e => alert('Error al cargar: ' + e.message));
  }

  function handleCreate(data) {
    setLoading(true);
    createUsuario(data)
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
    updateUsuario(editingId, data)
      .then(() => { load(); setShowForm(false); setEditingId(null); })
      .catch(e => alert('Error al actualizar: ' + e.message))
      .finally(() => setLoading(false));
  }

  function handleDelete(id) {
    if (window.confirm('¿Eliminar este usuario?')) {
      deleteUsuario(id)
        .then(() => load())
        .catch(e => alert('Error al eliminar: ' + e.message));
    }
  }

  const columns = [
    { key: 'usuarioId', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    { key: 'rol', label: 'Rol' },
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
    { key: 'nombre', label: 'Nombre', placeholder: 'Nombre del usuario' },
    { key: 'apellidos', label: 'Nombre', placeholder: 'Apellidos del usuario' },
    { key: 'email', label: 'Email', placeholder: 'email@example.com' },
    { key: 'password', label: 'Contraseña', placeholder: 'Contraseña' },
    { key: 'rol', label: 'Rol', placeholder: 'Rol' }
  ];

  return (
    <div>
      <CollectionView title="Usuarios" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop: 12}}>
          <button className="btn" onClick={() => { setShowForm(!showForm); setEditingId(null); }}>
            {showForm ? 'Ocultar formulario' : '+ Nuevo Usuario'}
          </button>
        </div>

        {showForm && (
          <FormComponent
            title={editingId ? 'Editar Usuario' : 'Crear Usuario'}
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

