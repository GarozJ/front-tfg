import axios from 'axios';

const BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9012';
const api = axios.create({ 
  baseURL: BASE,
  headers: { "Content-Type": "application/json" }
});

// Interceptor para añadir Basic Auth si existe en localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth");
  if (token) {
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
});


// Usuario
export const getUsuarios = () => api.get('/usuario/all').then(r => r.data);
export const getUsuario = (id) => api.get(`/usuario/byId/${id}`).then(r => r.data);
export const createUsuario = (data) => api.post('/usuario/create', data).then(r => r.data);
export const updateUsuario = (id, data) => api.put(`/usuario/update/${id}`, data).then(r => r.data);
export const deleteUsuario = (id) => api.delete(`/usuario/delete/${id}`).then(r => r.data);

// Libro
export const getLibros = () => api.get('/libro/all').then(r => r.data);
export const getLibro = (id) => api.get(`/libro/byId/${id}`).then(r => r.data);
export const createLibro = (data) => api.post('/libro/create', data).then(r => r.data);
export const updateLibro = (id, data) => api.put(`/libro/update/${id}`, data).then(r => r.data);
export const deleteLibro = (id) => api.delete(`/libro/delete/${id}`).then(r => r.data);

// Reserva
export const getReservas = () => api.get('/reserva/all').then(r => r.data);
export const getReserva = (id) => api.get(`/reserva/byId/${id}`).then(r => r.data);
export const createReserva = (data) => api.post('/reserva/create', data).then(r => r.data);
export const updateReserva = (id, data) => api.put(`/reserva/update/${id}`, data).then(r => r.data);
export const deleteReserva = (id) => api.delete(`/reserva/delete/${id}`).then(r => r.data);

// Prestamo
export const getPrestamos = () => api.get('/prestamo/all').then(r => r.data);
export const getPrestamo = (id) => api.get(`/prestamo/byId/${id}`).then(r => r.data);
export const createPrestamo = (data) => api.post('/prestamo/create', data).then(r => r.data);
export const updatePrestamo = (id, data) => api.put(`/prestamo/update/${id}`, data).then(r => r.data);
export const deletePrestamo = (id) => api.delete(`/prestamo/delete/${id}`).then(r => r.data);

// Rol (endpoints in backend use slightly different signatures)
export const getRoles = () => api.get('/rol/all').then(r => r.data);
export const getRol = (id) => api.get(`/rol/findById/${id}`).then(r => r.data);
export const createRol = (data) => api.post(`/rol/create/${encodeURIComponent(data.nombre)}`).then(r => r.data);
export const updateRol = (id, data) => api.put(`/rol/update/${id}`, data).then(r => r.data);
export const deleteRol = (id) => api.delete(`/rol/delete/${id}`).then(r => r.data);

export default api;

