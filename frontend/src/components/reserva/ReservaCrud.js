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
  //Valores vacíos para crear 
  const emptyValues = { 
    idUsuario: "", 
    idLibro: "", 
    fechaReserva: ""
  };
  const [initialValues, setInitialValues] = useState(emptyValues);

  useEffect(() => { load(); }, []);

  function load() {
    getReservas().then(data => { console.log("RESERVAS RECIBIDAS:", data); setItems(data); }).catch(e => alert('Error al cargar: ' + e.message));
  }

  function handleCreate(data) {
    setLoading(true);
    createReserva(data)
      .then(() => { load(); setShowForm(false); })
      .catch(e => alert('Error al crear: ' + e.message))
      .finally(() => setLoading(false));
  }

  function handleEdit(id) {
    
    const reserva = items.find(r => r.idReserva === id);

    setEditingId(id);

    setInitialValues({
      idReserva: reserva.idReserva,
      fechaReserva: reserva.fechaReserva,
      idUsuario: reserva.idUsuario,
      idLibro: reserva.idLibro
    });

    setShowForm(true);
  }

   // SUBMIT GENERAL → decide si crear o editar
    function handleSubmit(data) {
      setLoading(true);
  
      if (editingId !==null) {
        updateReserva(editingId, data)
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

  function handleDelete(id) {
    if (window.confirm('¿Eliminar esta reserva?')) {
      deleteReserva(id)
        .then(() => load())
        .catch(e => alert('Error al eliminar: ' + e.message));
    }
  }

  const columns = [
    { key: 'idReserva', label: 'ID' },
    { key: 'nombreUsuario', label: 'Usuario', render: (item) => item.nombreUsuario || 'N/A' },
    { key: 'tituloLibro', label: 'Libro', render: (item) => item.tituloLibro || 'N/A' },
    { key: 'fechaReserva', label: 'Fecha Reserva' },
    {
      key: 'actions',
      label: 'Acciones',
      render: (item) => (
        <TableActions
          onEdit={() => handleEdit(item.idReserva)}
          onDelete={() => handleDelete(item.idReserva)}
        />
      )
    }
  ];

  const formFields = [
    { key: 'idUsuario', label: 'ID Usuario', type: 'number', placeholder: 'ID del usuario' },
    { key: 'idLibro', label: 'ID Libro', type: 'number', placeholder: 'ID del libro' },
    { key: 'fechaReserva', label: 'Fecha Reserva', type: 'date' }
  ];

  return (
    <div>
      <CollectionView title="Reservas" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop: 12}}>
          <button className="btn" onClick={() => { 
            setInitialValues(emptyValues); 
            setEditingId(null); 
            setShowForm(true); 
            }}>
            {showForm ? 'Ocultar formulario' : '+ Nueva Reserva'}
          </button>
        </div>

        {showForm && (
          <FormComponent
            key={editingId ?? 'new'}
            title={editingId ? 'Editar Reserva' : 'Crear Reserva'}
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

