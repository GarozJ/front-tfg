import React, { useState } from 'react'; 
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import UsuarioCrud from './components/usuario/UsuarioCrud';
import LibroCrud from './components/libro/LibroCrud';
import ReservaCrud from './components/reserva/ReservaCrud';
import PrestamoCrud from './components/prestamo/PrestamoCrud';
import RolCrud from './components/rol/RolCrud';
import Login from './components/login/Login';

export default function App() {

  //Estado que indica si el usuario está logueado 
  const [logged, setLogged] = useState(!!localStorage.getItem('auth')); 
  
  function handleLogin() { 
    setLogged(true); 
  } 
  
  function handleLogout() { 
    localStorage.removeItem('auth'); 
    setLogged(false); 
  } 
  
  // Si NO está logueado → mostrar login 
  if (!logged) { 
    return <Login onLogin={handleLogin} />; 
  }

  //Si está logueado → mostrar la app completa
  return (
    <BrowserRouter>
      <header className="app-header">
        <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h1>Proyecto — API Explorer</h1>
          <div style={{fontSize:13, opacity:0.9}}>Frontend de prueba</div>
        </div>
      </header>

      <div className="container">
        <nav className="nav">
          <NavLink to="/usuario" className={({isActive}) => isActive ? 'active' : ''}>Usuarios</NavLink>
          <NavLink to="/libro" className={({isActive}) => isActive ? 'active' : ''}>Libros</NavLink>
          <NavLink to="/reserva" className={({isActive}) => isActive ? 'active' : ''}>Reservas</NavLink>
          <NavLink to="/prestamo" className={({isActive}) => isActive ? 'active' : ''}>Préstamos</NavLink>
          <NavLink to="/rol" className={({isActive}) => isActive ? 'active' : ''}>Roles</NavLink>
        </nav>

        <Routes>
          <Route path="/usuario" element={<UsuarioCrud />} />
          <Route path="/libro" element={<LibroCrud />} />
          <Route path="/reserva" element={<ReservaCrud />} />
          <Route path="/prestamo" element={<PrestamoCrud />} />
          <Route path="/rol" element={<RolCrud />} />
          <Route path="/" element={<div className="card">Selecciona un recurso arriba para ver datos.</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
