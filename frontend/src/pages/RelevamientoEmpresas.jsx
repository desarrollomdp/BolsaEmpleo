import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RelevamientoEmpresas = () => {
    const [formData, setFormData] = useState({
        nombre_empresa: '',
        rubro: 'otro',
        localidad: '',
        nombre_contacto: '',
        telefono: '',
        email: '',
        perfil_buscado: '',
        descripcion_tareas: '',
        cantidad_personas: '1',
        urgencia: 'proximos_meses',
        modalidad: '',
        condiciones_adicionales: ''
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:8000/administrador/interes-empresas/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || 'Ocurrió un error al enviar el formulario.');
            }

            setStatus('success');
            setFormData({
                nombre_empresa: '', rubro: 'otro', localidad: '',
                nombre_contacto: '', telefono: '', email: '',
                perfil_buscado: '', descripcion_tareas: '',
                cantidad_personas: '1', urgencia: 'proximos_meses',
                modalidad: '', condiciones_adicionales: ''
            });
        } catch (error) {
            setStatus('error');
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* ===== HERO ===== */}
            <section className="bg-gradient-to-br from-azulGob via-blue-800 to-blue-950 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 60%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        Programa de Articulación Laboral
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black mb-4">Servicio a Empresas</h1>
                    <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
                        ¿Necesita un perfil profesional que no encuentra en nuestra nómina actual? Cuéntenos sus necesidades para 
                        contemplarlas en nuestros futuros planes de capacitación.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-8 max-w-4xl relative z-10">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    
                    {/* ===== ESTADOS DE ENVÍO ===== */}
                    {status === 'success' ? (
                        <div className="p-12 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-4">¡Muchas gracias por su interés!</h2>
                            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                                Hemos recibido su solicitud. Nuestro equipo analizará el perfil requerido para 
                                evaluar su inclusión en la oferta de cursos del próximo ciclo lectivo.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <button 
                                    onClick={() => setStatus('idle')}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors"
                                >
                                    Enviar otra solicitud
                                </button>
                                <Link 
                                    to="/"
                                    className="bg-azulGob hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                                >
                                    Volver al inicio
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 md:p-12">
                            <div className="mb-8 border-b border-gray-100 pb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Formulario de Relevamiento de Perfiles</h2>
                                <p className="text-gray-500 text-sm">
                                    Complete los siguientes datos para ayudarnos a entender qué profesionales requiere su empresa o sector.
                                </p>
                            </div>

                            {status === 'error' && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <div className="font-bold">Ocurrió un error</div>
                                        <div className="text-sm">{errorMessage}</div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-10">
                                
                                {/* 1. DATOS DE LA EMPRESA */}
                                <section>
                                    <h3 className="text-lg font-bold text-azulGob mb-5 flex items-center gap-2">
                                        <span className="bg-blue-100 text-azulGob w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">1</span>
                                        Datos de la Empresa
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre de la empresa u organización *</label>
                                            <input required type="text" name="nombre_empresa" value={formData.nombre_empresa} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all" placeholder="Ej: Industrias Cañuelas S.A." />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Rubro o sector *</label>
                                            <select required name="rubro" value={formData.rubro} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all">
                                                <option value="agropecuario">Agropecuario / Rural</option>
                                                <option value="construccion">Construcción / Obra</option>
                                                <option value="gastronomia">Gastronomía / Hotelería</option>
                                                <option value="industria">Industria / Manufactura</option>
                                                <option value="comercio">Comercio / Ventas</option>
                                                <option value="tecnologia">Tecnología / Sistemas</option>
                                                <option value="salud">Salud / Cuidado personal</option>
                                                <option value="educacion">Educación / Capacitación</option>
                                                <option value="logistica">Logística / Transporte</option>
                                                <option value="otro">Otro</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Localidad / Zona *</label>
                                            <input required type="text" name="localidad" value={formData.localidad} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all" placeholder="Ej: Parque Industrial Cañuelas" />
                                        </div>
                                    </div>
                                </section>

                                {/* 2. DATOS DE CONTACTO */}
                                <section>
                                    <h3 className="text-lg font-bold text-azulGob mb-5 flex items-center gap-2">
                                        <span className="bg-blue-100 text-azulGob w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">2</span>
                                        Persona de Contacto
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre y apellido del responsable *</label>
                                            <input required type="text" name="nombre_contacto" value={formData.nombre_contacto} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono / WhatsApp *</label>
                                            <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico *</label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all" />
                                        </div>
                                    </div>
                                </section>

                                {/* 3. PERFIL BUSCADO */}
                                <section>
                                    <h3 className="text-lg font-bold text-azulGob mb-5 flex items-center gap-2">
                                        <span className="bg-blue-100 text-azulGob w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">3</span>
                                        Detalle del Perfil Profesional
                                    </h3>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">¿Qué perfil profesional necesita? *</label>
                                            <input required type="text" name="perfil_buscado" value={formData.perfil_buscado} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all" placeholder="Ej: Soldador especializado, Programador Python, etc." />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción de tareas y responsabilidades *</label>
                                            <textarea required name="descripcion_tareas" rows={4} value={formData.descripcion_tareas} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all resize-none" placeholder="Describa brevemente qué tareas realizaría esta persona..."></textarea>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Cantidad de personas requeridas *</label>
                                                <select required name="cantidad_personas" value={formData.cantidad_personas} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all">
                                                    <option value="1">1 persona</option>
                                                    <option value="2-5">2 a 5 personas</option>
                                                    <option value="6-10">6 a 10 personas</option>
                                                    <option value="mas10">Más de 10 personas</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nivel de urgencia *</label>
                                                <select required name="urgencia" value={formData.urgencia} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all">
                                                    <option value="inmediata">Inmediata (ya lo necesito)</option>
                                                    <option value="proximos_meses">En los próximos 3 a 6 meses</option>
                                                    <option value="planificacion">Es una planificación a largo plazo</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Modalidad de contratación</label>
                                                <input type="text" name="modalidad" value={formData.modalidad} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all" placeholder="Ej: Relación de dependencia, por hora..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Condiciones adicionales (Opcional)</label>
                                                <input type="text" name="condiciones_adicionales" value={formData.condiciones_adicionales} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all" placeholder="Licencia de conducir, herramientas propias, etc." />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-xs text-gray-400">* Campos obligatorios</span>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="bg-azulGob text-white font-bold py-3.5 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                Enviar solicitud
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RelevamientoEmpresas;
