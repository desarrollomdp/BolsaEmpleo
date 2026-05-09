import React, { useState, useEffect } from 'react';
// Importamos la función mensajera que creamos antes
import { obtenerCursos } from '../services/api';

const ListaCursos = () => {
    // 1. Definimos los estados (la memoria del componente)
    // 'cursos' empieza como un array vacío []
    const [cursos, setCursos] = useState([]);
    // 'cargando' empieza en true para mostrar un aviso mientras llegan los datos
    const [cargando, setCargando] = useState(true);

    // 2. Ejecutamos la petición a Django al cargar la pantalla
    useEffect(() => {
        const cargarDatos = async () => {
            const datos = await obtenerCursos(); // Llama a la API
            setCursos(datos);                    // Guarda el JSON en la memoria
            setCargando(false);                  // Quita el aviso de carga
        };

        cargarDatos();
    }, []); // Los corchetes vacíos significan: "Ejecuta esto solo 1 vez al iniciar"

    // 3. Renderizado Condicional: Qué mostrar mientras esperamos a Django
    if (cargando) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azulGob"></div>
                <span className="ml-4 text-azulGob font-bold">Cargando catálogo...</span>
            </div>
        );
    }

    // 4. Renderizado Final: Mostrar los datos en pantalla
    return (
        <section className="py-8">
            <h2 className="text-3xl font-bold text-center text-azulGob mb-12">
                Nuestros Egresados se capacitan en:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Si el array está vacío, mostramos un aviso */}
                {cursos.length === 0 ? (
                    <p className="text-center col-span-3 text-gray-500">No hay cursos cargados en el sistema.</p>
                ) : (
                    /* Iteramos sobre el array de cursos usando .map() */
                    cursos.map((curso) => (
                        <div key={curso.id} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-azulGob hover:shadow-xl transition-shadow">

                            {/* Si el curso tiene imagen, la mostramos */}
                            {curso.imagen && (
                                <img
                                    src={curso.imagen}
                                    alt={curso.nombre}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                            )}

                            <span className="text-xs text-verdeAccion font-bold uppercase tracking-wider bg-green-100 px-2 py-1 rounded">
                                {curso.familia_nombre}
                            </span>

                            <h3 className="text-xl font-bold mt-3 mb-2 text-gray-800">{curso.nombre}</h3>

                            <p className="text-gray-600 text-sm mb-4">
                                {/* Mostramos el perfil profesional, si no existe, la descripción normal */}
                                {curso.perfil_profesional || curso.descripcion}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default ListaCursos;