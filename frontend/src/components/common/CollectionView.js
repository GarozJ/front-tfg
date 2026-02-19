import React from 'react';

export default function CollectionView({title, items = [], columns = [], onRefresh, children}) {
  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h3 style={{margin:0}}>{title}</h3>
              <div>
                <button className="btn" onClick={onRefresh}>Refrescar</button>
              </div>
            </div>

            {items && items.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    {columns.map(c => <th key={c.key}>{c.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => (
                    <tr key={it.id ?? idx}>
                      {columns.map(c => <td key={c.key + (it.id ?? idx)}>{c.render ? c.render(it) : (it[c.key] ?? '')}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="small" style={{marginTop:12}}>No hay elementos</div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

