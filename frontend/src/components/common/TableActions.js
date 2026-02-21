import React from 'react';

export default function TableActions({id, onEdit, onDelete}) {
  return (
    <div style={{display: 'flex', gap: 6}}>
      <button className="btn" style={{padding: '6px 10px', fontSize: 12}} onClick={() => {onEdit(id);}}>Editar</button>
      <button className="btn secondary" style={{padding: '6px 10px', fontSize: 12}} onClick={onDelete}>Eliminar</button>
    </div>
  );
}

