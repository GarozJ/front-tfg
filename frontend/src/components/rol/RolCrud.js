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
  //Valores vacíos para crear 
  const emptyValues = { 
    nombre: ""
  };
  const [initialValues, setInitialValues] = useState(emptyValues);

  useEffect(() => { load(); }, []);

  function load() {
    getRoles().then(setItems).catch(e => alert('Error al cargar: ' + e.message));
  }


  function handleCreate(data) {
    setLoading(true);
    createRol(data)
      .then(() => { load(); setShowForm(false); })
      .catch(e => alert('Error al crear: ' + e.message))
      .finally(() => setLoading(false));
  }

  function handleEdit(id) {
    const rol = items.find(r => r.idRol === id);
    setEditingId(id);
    setInitialValues({
      idRol: rol.idRol,
      nombre: rol.nombre
    });
    setShowForm(true);
  }

  // SUBMIT GENERAL → decide si crear o editar
      function handleSubmit(data) {
        setLoading(true);
    
        if (editingId !==null) {
          updateRol(editingId, data)
            .then(() => {
              load();
              setShowForm(false);
              setEditingId(null);
              setInitialValues(emptyValues);
            })
            .catch(e => alert("Error al actualizar: " + e.message))
            .finally(() => setLoading(false));
        } else {
          handleCreate(data);
        }
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
          onEdit={() => handleEdit(item.idRol)}
          onDelete={() => handleDelete(item.idRol)}
        />
      )
    }
  ];

  const formFields = [
    { key: 'nombre', label: 'Nombre del Rol', placeholder: 'Ej: ADMIN, USER' }
  ];

  return (
    <div>
      <CollectionView title="Roles" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop: 12}}>
          <button className="btn" onClick={() => { 
            setInitialValues(emptyValues); 
            setEditingId(null); 
            setShowForm(true);
            }}>
            {showForm ? 'Ocultar formulario' : '+ Nuevo Rol'}
          </button>
        </div>

        {showForm && (
          <FormComponent
            title={editingId ? 'Editar Rol' : 'Crear Rol'}
            fields={formFields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditingId(null); }}
            loading={loading}
          />
        )}
      </CollectionView>
    </div>
  );
}

