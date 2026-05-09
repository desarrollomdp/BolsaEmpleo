import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Egresados = () => {
    const [familias, setFamilias] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:8000/api/familias/').then(res => res.json()),
            fetch('http://localhost:8000/api/cursos/').then(res => res.json())
        ])
        .then(([familiasData, cursosData]) => {
            setFamilias(familiasData);
            // Filtramos solo los cursos que tienen egresados
            setCursos(cursosData.filter(curso => curso.cantidad_egresados > 0));
            setLoading(false);
        })
        .catch(err => {
            console.error('Error cargando datos:', err);
            setLoading(false);
        });
    }, []);

    // Filtrar cursos por término de búsqueda
    const filteredCursos = cursos.filter(curso => 
        curso.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (curso.familia_nombre && curso.familia_nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Agrupar cursos filtrados por familia
    const cursosPorFamilia = familias.map(familia => {
        return {
            ...familia,
            cursos: filteredCursos.filter(curso => curso.familia === familia.id || curso.familia_nombre === familia.nombre)
        };
    }).filter(familia => familia.cursos.length > 0);

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* ===== HERO ===== */}
            <section className="bg-gradient-to-br from-azulGob via-blue-800 to-blue-950 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 60%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        Perfiles Certificados
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black mb-4">Nuestros Egresados</h1>
                    <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
                        Explorá los diferentes perfiles profesionales que formamos en el CFL N° 401. 
                        Nuestros egresados están certificados por la Provincia de Buenos Aires y listos para incorporarse al mercado laboral.
                    </p>
                </div>
            </section>

            {/* ===== BUSCADOR ===== */}
            <div className="container mx-auto px-4 -mt-8 relative z-10 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 flex items-center gap-4">
                    <div className="flex-grow relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por curso o familia profesional..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* ===== CONTENIDO ===== */}
            <div className="container mx-auto px-4 mt-12 max-w-6xl">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-azulGob border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : cursosPorFamilia.length > 0 ? (
                    <div className="space-y-16">
                        {cursosPorFamilia.map(familia => (
                            <section key={familia.id}>
                                <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                                        📁
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900">{familia.nombre}</h2>
                                        <p className="text-gray-500 text-sm">{familia.cursos.length} especialidad{familia.cursos.length !== 1 ? 'es' : ''} con egresados disponibles</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {familia.cursos.map(curso => (
                                        <Link
                                            key={curso.id}
                                            to={`/cursos/${curso.id}`}
                                            className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-400/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                        >
                                            {/* Imagen del curso */}
                                            <div className="w-full h-40 bg-blue-50 overflow-hidden relative">
                                                {curso.imagen ? (
                                                    <img
                                                        src={curso.imagen}
                                                        alt={curso.nombre}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <svg className="w-14 h-14 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                {/* Gradiente inferior sobre la imagen */}
                                                <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-gray-900/60 to-transparent" />
                                                
                                                {/* Badge cantidad */}
                                                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
                                                    {curso.cantidad_egresados} egresado{curso.cantidad_egresados !== 1 ? 's' : ''}
                                                </div>
                                            </div>

                                            {/* Contenido */}
                                            <div className="p-5">
                                                <h3 className="text-gray-900 font-bold text-lg mt-1 mb-3 leading-snug group-hover:text-azulGob transition-colors">{curso.nombre}</h3>
                                                <div className="flex items-center gap-2 text-green-600 text-xs font-medium">
                                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
                                                    Disponibles para empleo
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No se encontraron resultados</h2>
                        <p className="text-gray-500">Intenta buscar con otros términos.</p>
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="mt-6 text-azulGob font-bold hover:underline"
                        >
                            Limpiar búsqueda
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Egresados;
