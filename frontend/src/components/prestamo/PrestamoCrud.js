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
  const [initialValues, setInitialValues] = useState({});

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
     const prestamo = items.find(p => p.idPrestamo === id);
    
        setEditingId(id);
    
        setInitialValues({
          idPrestamo: prestamo.idPrestamo,
          fechaInicio: prestamo.fechaInicio,
          fechaFin: prestamo.fechaFin,
          fechaDevolucion: prestamo.fechaDevolucion,
          diasRetraso: prestamo.diasRetraso,
          importeSancion: prestamo.importeSancion,
          idUsuario: prestamo.idUsuario,
          idLibro: prestamo.idLibro
        });
    
        setShowForm(true);
      }
    
       // SUBMIT GENERAL → decide si crear o editar
        function handleSubmit(data) {
          setLoading(true);
      
          if (editingId !==null) {
            updatePrestamo(editingId, data)
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
    if (window.confirm('¿Eliminar este préstamo?')) {
      deletePrestamo(id)
        .then(() => load())
        .catch(e => alert('Error al eliminar: ' + e.message));
    }
  }

  const columns = [
    { key: 'idPrestamo', label: 'ID' },
    { key: 'usuario', label: 'Usuario', render:  (item) => item.nombreUsuario || 'N/A'},
    { key: 'libro', label: 'Libro', render: (item) => item.tituloLibro || 'N/A' },
    { key: 'fechaInicio', label: 'Desde' },
    { key: 'fechaFin', label: 'Hasta' },
    {
      key: 'actions',
      label: 'Acciones',
      render: (item) => (
        <TableActions
          onEdit={() => handleEdit(item.idPrestamo)}
          onDelete={() => handleDelete(item.idPrestamo)}
        />
      )
    }
  ];

  const formFields = [
    { key: 'idUsuario', label: 'ID Usuario', type: 'number', placeholder: 'ID del usuario' },
    { key: 'idLibro', label: 'ID Libro', type: 'number', placeholder: 'ID del libro' },
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
            key={editingId ?? 'new'}
            title={editingId ? 'Editar Préstamo' : 'Crear Préstamo'}
            initialValues={initialValues} 
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditingId(null); }}
            fields={formFields}
            loading={loading}
          />
        )}
      </CollectionView>
    </div>
  );
}

