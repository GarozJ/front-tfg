/*import React, { useState, useEffect } from 'react';
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

  //modificación de editar
  function handleEdit(id) {
    const usuario = items.find(u => u.idUsuario === id);

    setEditingId(id);

    setFormData({
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      email: usuario.email,
      password: "", // nunca mostrar la contraseña
      rol: usuario.rol.idRol
    });

    setShowForm(true);
  }


  /*
  function handleEdit(id) {
    setEditingId(id);
    setShowForm(true);
  }*/

  //SUBMIT GENERAL → decide si crear o editar 
  /*function handleSubmit(data) { 
    setLoading(true); 
    if (editingId) { 
      // MODO EDITAR 
      updateUsuario(editingId, data) 
        .then(() => { 
          load(); 
          setShowForm(false); 
          setEditingId(null); 
          setInitialValues({});
        }) 
        .catch(e => alert("Error al actualizar: " + e.message)) 
        .finally(() => setLoading(false)); 
      } else { 
        // MODO CREAR 
        handleCreate(data); 
      } 
  }

  /*function handleUpdate(data) {
    setLoading(true);
    updateUsuario(editingId, data)
      .then(() => { load(); setShowForm(false); setEditingId(null); })
      .catch(e => alert('Error al actualizar: ' + e.message))
      .finally(() => setLoading(false));
  }*/

  /*function handleDelete(id) {
    if (window.confirm('¿Eliminar este usuario?')) {
      deleteUsuario(id)
        .then(() => load())
        .catch(e => alert('Error al eliminar: ' + e.message));
    }
  }

  const columns = [
    { key: 'idUsuario', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    { key: 'rol', label: 'Rol' },
    {
      key: 'actions',
      label: 'Acciones',
      render: (item) => (
        <TableActions
          onEdit={() => handleEdit(item.idUsuario)}
          onDelete={() => handleDelete(item.idUsuario)}
        />
      )
    }
  ];

  const formFields = [
    { key: 'nombre', label: 'Nombre', placeholder: 'Nombre del usuario' },
    { key: 'apellidos', label: 'Apellidos', placeholder: 'Apellidos del usuario' },
    { key: 'email', label: 'Email', placeholder: 'email@example.com' },
    { key: 'password', label: 'Contraseña', placeholder: 'Contraseña' },
    { key: 'rol', label: 'Rol', placeholder: 'Rol' }
  ];

  return (
    <div>
      <CollectionView title="Usuarios" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop: 12}}>
          <button className="btn" onClick={() => { 
            setShowForm(!showForm); 
            setEditingId(null);
            setInitialValues({});
          }}>
            {showForm ? 'Ocultar formulario' : '+ Nuevo Usuario'}
          </button>
        </div>

        {showForm && (
          <FormComponent
            title={editingId ? 'Editar Usuario' : 'Crear Usuario'}
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
}*/

import React, { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../../api/apiClient';
import CollectionView from '../common/CollectionView';
import FormComponent from '../common/FormComponent';
import { getRoles } from '../../api/apiClient';


import TableActions from '../common/TableActions';

export default function UsuarioCrud() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  //Valores vacíos para crear 
  const emptyValues = { 
    nombre: "",
    apellidos:"",
    email:"",
    password:""
  };
  const [initialValues, setInitialValues] = useState(emptyValues); 

  useEffect(() => { load(); getRoles().then(setRoles)}, []);

  function load() {
    getUsuarios().then(setItems).catch(e => alert('Error al cargar: ' + e.message));
  }

  // CREAR
  function handleCreate(data) {
    setLoading(true);
    createUsuario(data)
      .then(() => { load(); setShowForm(false); })
      .catch(e => alert('Error al crear: ' + e.message))
      .finally(() => setLoading(false));
  }

  // EDITAR → carga datos en el formulario
  function handleEdit(id) { 
    const usuario = items.find(u => u.idUsuario === id);

    setEditingId(id);

    setInitialValues({
      idUsuario: usuario.idUsuario,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      email: usuario.email,
      password:usuario.password
    });

    setShowForm(true);
  }

  // SUBMIT GENERAL → decide si crear o editar
  function handleSubmit(data) {
    setLoading(true);

    if (editingId !==null) {
      updateUsuario(editingId, data)
        .then(() => {
          load();
          setShowForm(false);
          setEditingId(null);
          setInitialValues({});
        })
        .catch(e => alert("Error al actualizar: " + e.message))
        .finally(() => setLoading(false));
    } else {
      handleCreate(data);
    }
  }

  // ELIMINAR
  function handleDelete(id) {
    if (window.confirm('¿Eliminar este usuario?')) {
      deleteUsuario(id)
        .then(() => load())
        .catch(e => alert('Error al eliminar: ' + e.message));
    }
  }

  const columns = [
    { key: 'idUsuario', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    { key: 'rol', label: 'Rol' },
    {
      key: 'actions',
      label: 'Acciones',
      render: (item) => { 
        console.log("ITEM EN COLUMNAS:", item); 
        return ( <TableActions 
          onEdit={() => handleEdit(item.idUsuario)}
          onDelete={() => handleDelete(item.idUsuario)} 
          /> 
        ); 
      }
    }
  ];

  const formFields = [
    { key: 'nombre', label: 'Nombre', placeholder: 'Nombre del usuario' },
    { key: 'apellidos', label: 'Apellidos', placeholder: 'Apellidos del usuario' },
    { key: 'email', label: 'Email', placeholder: 'email@example.com' },
    { key: 'password', label: 'Contraseña', type: 'password', placeholder: 'Nueva contraseña (opcional)' }
  ];

  return (
    <div>
      <CollectionView title="Usuarios" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop: 12}}>
          <button className="btn" onClick={() => { 
            setInitialValues(emptyValues); 
            setEditingId(null); 
            setShowForm(true);
          }}>
            {showForm ? 'Ocultar formulario' : '+ Nuevo Usuario'}
          </button>
        </div>

        {showForm && (
          <FormComponent 
            key={editingId ?? 'new'} 
            title={editingId !==null ? "Editar Usuario" : "Crear Usuario"} 
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


