import React, { useState, useEffect } from 'react';

const ProfesionalesIndependientes = () => {
    const [profesionales, setProfesionales] = useState([]);
    const [estadoCarga, setEstadoCarga] = useState('cargando'); // cargando | error | exito

    const [form, setForm] = useState({
        nombre_completo: '',
        dni: '',
        telefono: '',
        email: '',
        matricula: '',
        redes_sociales: '',
        descripcion_perfil: '',
        cursos_realizados: '',
        cv_archivo: null,
        foto_certificado: null,
    });
    const [estadoForm, setEstadoForm] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    // Cargar profesionales aprobados
    useEffect(() => {
        fetch('http://localhost:8000/api/registro-profesionales/')
            .then(res => res.json())
            .then(data => {
                setProfesionales(data);
                setEstadoCarga('exito');
            })
            .catch(err => {
                console.error('Error cargando profesionales:', err);
                setEstadoCarga('error');
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setForm(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEstadoForm('loading');
        setErrorMsg('');

        // Usamos FormData porque hay un archivo (CV)
        const formData = new FormData();
        Object.keys(form).forEach(key => {
            if (form[key]) {
                formData.append(key, form[key]);
            }
        });

        try {
            const res = await fetch('http://localhost:8000/api/registro-profesionales/', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                setEstadoForm('success');
                setForm({
                    nombre_completo: '', dni: '', telefono: '', email: '',
                    matricula: '', redes_sociales: '', descripcion_perfil: '', 
                    cursos_realizados: '', cv_archivo: null, foto_certificado: null
                });
                // Limpiar el input de archivo manualmente si es necesario
                const fileInputCV = document.getElementById('cv_archivo');
                if (fileInputCV) fileInputCV.value = '';
                const fileInputCert = document.getElementById('foto_certificado');
                if (fileInputCert) fileInputCert.value = '';
            } else {
                const data = await res.json();
                const msgs = Object.values(data).flat().join(' ');
                setErrorMsg(msgs || 'Error al enviar la solicitud.');
                setEstadoForm('error');
            }
        } catch {
            setErrorMsg('No se pudo conectar con el servidor. Intente nuevamente.');
            setEstadoForm('error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* ===== HERO ===== */}
            <section className="bg-gradient-to-br from-azulGob via-blue-800 to-blue-950 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 60%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        Comunidad CFL 401
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Profesionales Independientes</h1>
                    <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
                        Conocé a los egresados de nuestra institución que ofrecen servicios de forma autónoma.
                    </p>
                </div>
            </section>

            {/* ===== SPLIT LAYOUT: INFO Y FORMULARIO ===== */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        
                        {/* Lado Izquierdo: Información */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 sticky top-8">
                            <div className="w-16 h-16 bg-blue-50 text-azulGob rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-4">¿Sos egresado y brindás servicios?</h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Este espacio está diseñado exclusivamente para que los <strong>estudiantes egresados del CFL N° 401</strong> puedan ofrecer sus servicios profesionales a la comunidad de Cañuelas y alrededores.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-azulGob flex items-center justify-center font-bold text-sm">1</div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Completá tus datos</h4>
                                        <p className="text-sm text-gray-500 mt-1">Llená el formulario con tu información de contacto, especialidad y adjuntá tu CV.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-azulGob flex items-center justify-center font-bold text-sm">2</div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Validación de identidad</h4>
                                        <p className="text-sm text-gray-500 mt-1">La administración verificará que hayas egresado efectivamente de nuestra institución mediante tu DNI.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-azulGob flex items-center justify-center font-bold text-sm">3</div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Publicación en el directorio</h4>
                                        <p className="text-sm text-gray-500 mt-1">Una vez aprobado, tu perfil será visible para cualquier persona u empresa que busque tus servicios.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lado Derecho: Formulario */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="p-8 md:p-12">
                                <div className="mb-8 border-b border-gray-100 pb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Registro de Profesional</h2>
                                    <p className="text-gray-500 text-sm">Completá todos los campos para enviar tu solicitud.</p>
                                </div>

                                {estadoForm === 'success' ? (
                                    <div className="py-8 text-center">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-800 mb-3">¡Solicitud recibida!</h3>
                                        <p className="text-gray-500 max-w-sm mx-auto mb-8">
                                            Tu perfil ha sido enviado y está pendiente de aprobación. Nos pondremos en contacto si necesitamos más información.
                                        </p>
                                        <button
                                            onClick={() => setEstadoForm('idle')}
                                            className="bg-azulGob hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-200"
                                        >
                                            Volver al formulario
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {estadoForm === 'error' && (
                                            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start gap-3">
                                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{errorMsg}</span>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre y Apellido *</label>
                                                <input
                                                    type="text" name="nombre_completo" value={form.nombre_completo} onChange={handleChange} required
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">DNI (Para validación) *</label>
                                                <input
                                                    type="text" name="dni" value={form.dni} onChange={handleChange} required
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono Público *</label>
                                                <input
                                                    type="tel" name="telefono" value={form.telefono} onChange={handleChange} required
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico *</label>
                                                <input
                                                    type="email" name="email" value={form.email} onChange={handleChange} required
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Matrícula (Opcional)</label>
                                                <input
                                                    type="text" name="matricula" value={form.matricula} onChange={handleChange}
                                                    placeholder="Ej: MN 12345"
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Redes Sociales / Portfolio (Opcional)</label>
                                                <input
                                                    type="text" name="redes_sociales" value={form.redes_sociales} onChange={handleChange}
                                                    placeholder="Instagram, LinkedIn, Sitio Web..."
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Cursos Realizados (CFL 401) *</label>
                                                <input
                                                    type="text" name="cursos_realizados" value={form.cursos_realizados} onChange={handleChange} required
                                                    placeholder="Ej: Electricista Industrial, Herrero..."
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción de tus Servicios *</label>
                                                <textarea
                                                    name="descripcion_perfil" value={form.descripcion_perfil} onChange={handleChange} required rows={4}
                                                    placeholder="Contanos qué hacés, tu experiencia y los servicios que ofrecés..."
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all resize-none"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Currículum Vitae (Opcional)</label>
                                                <input
                                                    type="file" id="cv_archivo" name="cv_archivo" onChange={handleChange} accept=".pdf,.doc,.docx"
                                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-azulGob hover:file:bg-blue-100 transition-all cursor-pointer"
                                                />
                                                <p className="text-xs text-gray-400 mt-1">Formatos permitidos: PDF, Word.</p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Foto del Certificado Oficial (Opcional)</label>
                                                <input
                                                    type="file" id="foto_certificado" name="foto_certificado" onChange={handleChange} accept="image/*,.pdf"
                                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-all cursor-pointer"
                                                />
                                                <p className="text-xs text-gray-400 mt-1">Sube una foto o PDF de tu certificado para acelerar la validación.</p>
                                            </div>
                                        </div>

                                        <div className="pt-4 flex items-center justify-between">
                                            <span className="text-xs text-gray-400">* Campos obligatorios</span>
                                            <button
                                                type="submit"
                                                disabled={estadoForm === 'loading'}
                                                className="bg-azulGob text-white font-bold py-3.5 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {estadoForm === 'loading' ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        Enviando...
                                                    </>
                                                ) : (
                                                    <>
                                                        Enviar Registro
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== DIRECTORIO DE PROFESIONALES ===== */}
            <section className="py-16 px-4 bg-white border-t border-gray-100">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">Directorio de Profesionales</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Contactá directamente a los egresados que brindan servicios de manera autónoma.
                        </p>
                    </div>

                    {estadoCarga === 'cargando' ? (
                        <div className="flex justify-center py-12">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-azulGob rounded-full animate-spin"></div>
                        </div>
                    ) : estadoCarga === 'error' ? (
                        <div className="text-center py-12 text-gray-500">
                            No se pudieron cargar los profesionales en este momento.
                        </div>
                    ) : profesionales.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-200">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <h3 className="text-lg font-bold text-gray-700">Aún no hay profesionales registrados</h3>
                            <p className="text-gray-500 text-sm mt-2">¡Sé el primero en publicar tus servicios!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {profesionales.map(prof => (
                                <div key={prof.id} className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                                    
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{prof.nombre_completo}</h3>
                                            {prof.matricula && (
                                                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mt-2 mr-2">
                                                    Matrícula: {prof.matricula}
                                                </span>
                                            )}
                                            {prof.cursos_realizados && (
                                                <span className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 text-azulGob text-xs font-medium rounded-full mt-2">
                                                    Especialidad: {prof.cursos_realizados}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                        {prof.descripcion_perfil}
                                    </p>
                                    
                                    <div className="space-y-3 pt-4 border-t border-gray-100">
                                        <a href={`tel:${prof.telefono}`} className="flex items-center gap-3 text-sm text-gray-700 hover:text-azulGob transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-azulGob">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            </div>
                                            <span className="font-medium">{prof.telefono}</span>
                                        </a>
                                        
                                        <a href={`mailto:${prof.email}`} className="flex items-center gap-3 text-sm text-gray-700 hover:text-azulGob transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-azulGob">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            </div>
                                            <span className="font-medium">{prof.email}</span>
                                        </a>

                                        {prof.redes_sociales && (
                                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-azulGob">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                                </div>
                                                <span className="font-medium truncate">{prof.redes_sociales}</span>
                                            </div>
                                        )}
                                        
                                        {prof.cv_archivo && (
                                            <a 
                                                href={prof.cv_archivo} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="mt-4 w-full block text-center py-2.5 rounded-lg border border-azulGob text-azulGob font-bold text-sm hover:bg-blue-50 transition-colors"
                                            >
                                                Descargar CV
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
};

export default ProfesionalesIndependientes;
