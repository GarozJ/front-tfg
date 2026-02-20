import React, { useState } from 'react';
import api from '../../api/apiClient';

//Recibe una llamada onLogin que se ejecutará cuando el login sea correcto
export default function Login({ onLogin }) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault(); 
  
    //Llamamos a un endpoint protegido usando Basic Auth 
    api.get("/usuario/me", { 
      auth: { 
        username: email, 
        password: password 
      } 
    }) 
      .then((res) => { 
        //Guardamos las credenciales en localStorage (codificadas en base64) 
        const token = btoa(`${email}:${password}`); 
        localStorage.setItem("auth", token); 
        
        const user = { 
          email: res.data.email, 
          roles: res.data.roles.map((r) => r.authority) 
        }; 
        
        onLogin(user); 
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
