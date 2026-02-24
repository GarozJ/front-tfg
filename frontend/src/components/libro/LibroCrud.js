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
  //Valores vacíos para crear 
  const emptyValues = { 
    titulo: "", 
    autor: "", 
    editorial: "", 
    categoria: "", 
    isbn: "", 
    imagen: ""
  };
  const [initialValues, setInitialValues] = useState(emptyValues);

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
    const libro = items.find(l => l.idLibro === id);
    setEditingId(id);
    setInitialValues({
      idLibro: libro.idLibro,
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      categoria: libro.categoria,
      isbn: libro.isbn,
      imagen: libro.imagen
    });
    setShowForm(true);
  }

  // SUBMIT GENERAL → decide si crear o editar
    function handleSubmit(data) {
      setLoading(true);
  
      if (editingId !==null) {
        updateLibro(editingId, data)
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
    { key: 'editorial', label: 'Editorial' }, 
    { key: 'categoria', label: 'Categoría' }, 
    { key: 'isbn', label: 'ISBN' },
    { 
      key: 'imagen', 
      label: 'Imagen', 
      render: (item) => ( 
        <img src={item.imagen} alt={item.titulo} 
        style={{ width: 60, height: 'auto', borderRadius: 4 }} 
        /> 
      ) 
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (item) => {
        return(
        <TableActions
          onEdit={() => handleEdit(item.idLibro)}
          onDelete={() => handleDelete(item.idLibro)}
        />  
      );
      }
    }
  ];

  const formFields = [
    { key: 'titulo', label: 'Título', placeholder: 'Título del libro' },
    { key: 'autor', label: 'Autor', placeholder: 'Autor' },
    { key: 'editorial', label: 'Editorial', placeholder: 'Editorial' },
    { key: 'categoria', label: 'Categoría', placeholder: 'Categoría' },
    { key: 'isbn', label: 'ISBN', placeholder: 'ISBN' },
    { key: 'imagen', label: 'Imagen', placeholder: 'Link de la imagen' }
  ];

  return (
    <div>
      <CollectionView title="Libros" items={items} columns={columns} onRefresh={load}>
        <div style={{marginTop: 12}}>
          <button className="btn" onClick={() => { 
            setInitialValues(emptyValues); 
            setEditingId(null); 
            setShowForm(true);
            }}>
            {showForm ? 'Ocultar formulario' : '+ Nuevo Libro'}
          </button>
        </div>

        {showForm && (
          <FormComponent
            key={editingId ?? 'new'} 
            title={editingId ? 'Editar Libro' : 'Crear Libro'}
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

