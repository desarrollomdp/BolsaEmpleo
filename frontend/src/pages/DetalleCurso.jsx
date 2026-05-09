import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Divide el perfil profesional en ítems si viene separado por saltos de línea o guiones
const parsePerfil = (texto) => {
    if (!texto) return [];
    return texto
        .split(/\n|•|-(?!\d)/)
        .map(s => s.trim())
        .filter(s => s.length > 2);
};

const DetalleCurso = () => {
    const { id } = useParams();
    const [curso, setCurso] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/api/cursos/${id}/`)
            .then(res => {
                if (!res.ok) throw new Error('No encontrado');
                return res.json();
            })
            .then(data => { setCurso(data); setLoading(false); })
            .catch(() => { setError(true); setLoading(false); });
    }, [id]);

    // ===== LOADING =====
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-azulGob border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Cargando información del curso...</p>
                </div>
            </div>
        );
    }

    // ===== ERROR / NO ENCONTRADO =====
    if (error || !curso) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">📚</div>
                    <h1 className="text-2xl font-black text-gray-800 mb-2">Curso no encontrado</h1>
                    <p className="text-gray-500 mb-6">No pudimos encontrar la información de este curso.</p>
                    <Link to="/" className="bg-azulGob text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    const perfilItems = parsePerfil(curso.perfil_profesional);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ===== HERO con imagen ===== */}
            <section className="relative bg-gray-900 text-white overflow-hidden">
                {/* Imagen de fondo */}
                {curso.imagen && (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${curso.imagen})` }}
                    />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/50" />

                {/* Contenido hero */}
                <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 max-w-5xl">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                        <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <Link to="/egresados" className="hover:text-white transition-colors">Egresados</Link>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-300 truncate max-w-[200px]">{curso.nombre}</span>
                    </nav>

                    {/* Tag familia */}
                    {curso.familia_nombre && (
                        <span className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                            {curso.familia_nombre}
                        </span>
                    )}

                    <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                        {curso.nombre}
                    </h1>

                    {curso.descripcion && (
                        <p className="text-gray-300 text-lg max-w-2xl leading-relaxed mb-8">
                            {curso.descripcion}
                        </p>
                    )}

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse inline-block" />
                            <span className="text-white font-bold">{curso.cantidad_egresados}</span>
                            <span className="text-gray-300 text-sm">
                                egresado{curso.cantidad_egresados !== 1 ? 's' : ''} disponible{curso.cantidad_egresados !== 1 ? 's' : ''}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
                            <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-gray-300 text-sm">Certificación oficial Provincia de Buenos Aires</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
                            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-300 text-sm">Formación 100% gratuita</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CONTENIDO PRINCIPAL ===== */}
            <div className="container mx-auto px-4 py-14 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* ===== Columna principal ===== */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Perfil profesional */}
                        {perfilItems.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-azulGob rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900">¿Qué pueden hacer nuestros egresados?</h2>
                                        <p className="text-gray-500 text-sm">Perfil profesional y competencias adquiridas</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {perfilItems.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200"
                                        >
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Si solo hay descripción larga y no hay perfil en lista */}
                        {perfilItems.length === 0 && curso.perfil_profesional && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-azulGob rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-900">Perfil profesional</h2>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{curso.perfil_profesional}</p>
                                </div>
                            </section>
                        )}

                        {/* Qué ofrecemos — info general siempre presente */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900">Lo que garantizamos</h2>
                                    <p className="text-gray-500 text-sm">Compromiso del CFL N° 401 con cada egresado</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    {
                                        icon: '🎓',
                                        title: 'Certificación provincial',
                                        desc: 'Título oficial avalado por el Ministerio de Trabajo de la Provincia de Buenos Aires.',
                                    },
                                    {
                                        icon: '🆓',
                                        title: 'Formación gratuita',
                                        desc: 'Sin costo para el alumno. El Estado financia la totalidad de la capacitación.',
                                    },
                                    {
                                        icon: '💼',
                                        title: 'Salida laboral',
                                        desc: 'Articulamos con empresas para conectar egresados con oportunidades reales.',
                                    },
                                ].map(item => (
                                    <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center">
                                        <div className="text-3xl mb-3">{item.icon}</div>
                                        <div className="font-bold text-gray-900 text-sm mb-1">{item.title}</div>
                                        <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* ===== Columna lateral ===== */}
                    <aside className="space-y-6">

                        {/* Card de acción principal */}
                        <div className="bg-azulGob text-white rounded-2xl p-6 shadow-lg  top-24">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse inline-block" />
                                <span className="text-blue-200 text-sm font-medium">
                                    {curso.cantidad_egresados} profesional{curso.cantidad_egresados !== 1 ? 'es' : ''} disponible{curso.cantidad_egresados !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <h3 className="text-xl font-black mb-2">¿Necesitás contratar?</h3>
                            <p className="text-blue-200 text-sm mb-5 leading-relaxed">
                                Completá el formulario y te conectamos con nuestros egresados de <strong className="text-white">{curso.nombre}</strong> sin costo.
                            </p>
                            <Link
                                to="/solicitar-personal"
                                className="block text-center bg-white text-azulGob font-black py-3.5 rounded-xl hover:bg-blue-50 transition-colors duration-200 shadow-md"
                            >
                                Solicitar un profesional
                            </Link>
                            <div className="mt-4 text-center text-xs text-blue-300">
                                Servicio gratuito · Respuesta en 48 hs
                            </div>
                        </div>

                        {/* Info adicional */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <h4 className="font-bold text-gray-800 mb-4 text-sm">Información del curso</h4>
                            <ul className="space-y-3 text-sm">
                                {curso.familia_nombre && (
                                    <li className="flex items-start gap-3">
                                        <svg className="w-4 h-4 text-azulGob mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        <div>
                                            <div className="text-gray-400 text-xs">Familia profesional</div>
                                            <div className="text-gray-800 font-medium">{curso.familia_nombre}</div>
                                        </div>
                                    </li>
                                )}
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-azulGob mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <div className="text-gray-400 text-xs">Egresados registrados</div>
                                        <div className="text-gray-800 font-medium">{curso.cantidad_egresados} disponibles</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-azulGob mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <div className="text-gray-400 text-xs">Institución</div>
                                        <div className="text-gray-800 font-medium">CFL N° 401 · Cañuelas, PBA</div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Link volver */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-gray-500 hover:text-azulGob text-sm font-medium transition-colors duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Ver todos los cursos disponibles
                        </Link>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DetalleCurso;
