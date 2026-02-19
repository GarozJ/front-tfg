import React, { useState } from 'react';
import api from '../api/apiClient';

//Recibe una llamada onLogin que se ejecutará cuando el login sea correcto
export default function Login({ onLogin }) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault(); 
  //Hacemos login 
  api.post("/login", { email, password }) 
    .then(() => { 
      // Guardamos que el usuario está autenticado 
      localStorage.setItem("auth", "true");
      //Obtenemos email + roles del usuario autenticado 
      api.get("/usuario/me") 
        .then((res) => { 
          const user = { 
            email: res.data.email, 
            roles: res.data.roles.map((r) => r.authority) 
          }; 
          //Enviamos el usuario a App.js 
          onLogin(user); 
        }) 
        .catch(() => { 
          alert("Error obteniendo datos del usuario"); 
          localStorage.removeItem("auth"); 
        }); 
      }) 
      .catch(() => { 
        alert("Credenciales incorrectas"); 
      }); 
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
