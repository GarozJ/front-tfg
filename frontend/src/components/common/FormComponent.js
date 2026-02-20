/*import React from 'react';

export default function FormComponent({title, onSubmit, onCancel, fields = [], loading = false}) {
  const [data, setData] = React.useState({});

  const handleChange = (key, value) => {
    setData({...data, [key]: value});
  };

  const handleSubmit = () => {
    onSubmit(data);
    setData({});
  };

  return (
    <div className="card" style={{marginTop: 16}}>
      <h4>{title}</h4>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12}}>
        {fields.map(f => (
          <div key={f.key}>
            <label style={{display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600}}>{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea
                className="input"
                style={{width: '100%', height: 80}}
                value={data[f.key] || ''}
                onChange={e => handleChange(f.key, e.target.value)}
                placeholder={f.placeholder || ''}
              />
            ) : f.type === 'number' ? (
              <input
                type="number"
                className="input"
                style={{width: '100%'}}
                value={data[f.key] || ''}
                onChange={e => handleChange(f.key, e.target.value)}
                placeholder={f.placeholder || ''}
              />
            ) : f.type === 'date' ? (
              <input
                type="date"
                className="input"
                style={{width: '100%'}}
                value={data[f.key] || ''}
                onChange={e => handleChange(f.key, e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="input"
                style={{width: '100%'}}
                value={data[f.key] || ''}
                onChange={e => handleChange(f.key, e.target.value)}
                placeholder={f.placeholder || ''}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{marginTop: 12, display: 'flex', gap: 8}}>
        <button className="btn" onClick={handleSubmit} disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
        <button className="btn secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}*/

import React from 'react';

export default function FormComponent({
  title,
  onSubmit,
  onCancel,
  fields = [],
  loading = false,
  initialValues = {}
}) {

  const [data, setData] = React.useState(initialValues);

  React.useEffect(() => {
    setData(initialValues);
  }, [initialValues]);

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = () => {
    onSubmit(data);
    setData({});
  };

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <h4>{title}</h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12
      }}>
        {fields.map(f => (
          <div key={f.key}>
            <label style={{
              display: 'block',
              marginBottom: 4,
              fontSize: 13,
              fontWeight: 600
            }}>
              {f.label}
            </label>

            <input
              type={f.type || 'text'}
              className="input"
              style={{ width: '100%' }}
              value={data[f.key] || ''}
              onChange={e => handleChange(f.key, e.target.value)}
              placeholder={f.placeholder || ''}
              autoComplete="off"
              name={`no-autofill-${f.key}`}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button className="btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        <button className="btn secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}




