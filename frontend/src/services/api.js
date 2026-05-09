// src/services/api.js

// URL base de tu backend en Django
const API_URL = 'http://127.0.0.1:8000/api/';

// Función para pedir los cursos al backend
export const obtenerCursos = async () => {
    try {
        const respuesta = await fetch(`${API_URL}cursos/`);
        if (!respuesta.ok) throw new Error('Error al conectar con la base de datos');
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Función para enviar una solicitud nueva al backend
export const enviarSolicitud = async (datosFormulario) => {
    try {
        const respuesta = await fetch(`${API_URL}solicitudes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosFormulario)
        });
        return respuesta;
    } catch (error) {
        console.error("Error enviando solicitud:", error);
        throw error;
    }
};