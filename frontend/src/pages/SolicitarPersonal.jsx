import React, { useState, useEffect } from 'react';

const URGENCIAS = [
    { value: 'BAJA', label: '🟢 Baja — Puedo planificar con tiempo' },
    { value: 'MEDIA', label: '🟡 Media — Necesito en los próximos días' },
    { value: 'ALTA', label: '🔴 Alta — Necesidad inmediata' },
];

const TIPOS = [
    { value: 'empresa', label: 'Empresa / Organización' },
    { value: 'particular', label: 'Particular' },
    { value: 'otro', label: 'Otro' },
];

const initialForm = {
    tipo_solicitante: 'empresa',
    nombre_solicitante: '',
    telefono: '',
    es_whatsapp: false,
    email: '',
    curso_requerido: '',
    zona_trabajo: '',
    urgencia: 'MEDIA',
    descripcion_trabajo: '',
};

const SolicitarPersonal = () => {
    const [cursos, setCursos] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [estado, setEstado] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/api/cursos/')
            .then(res => res.json())
            .then(data => setCursos(data))
            .catch(err => console.error('Error cargando cursos:', err));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEstado('loading');
        setErrorMsg('');

        const payload = { ...form };
        // Si no eligió curso, mandamos null
        if (!payload.curso_requerido) payload.curso_requerido = null;

        try {
            const res = await fetch('http://localhost:8000/api/solicitudes/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setEstado('success');
                setForm(initialForm);
            } else {
                const data = await res.json();
                const msgs = Object.values(data).flat().join(' ');
                setErrorMsg(msgs || 'Error al enviar la solicitud.');
                setEstado('error');
            }
        } catch {
            setErrorMsg('No se pudo conectar con el servidor. Intente nuevamente.');
            setEstado('error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ===== HERO ===== */}
            <section className="bg-gradient-to-br from-azulGob via-blue-800 to-blue-950 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 60%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="container mx-auto max-w-3xl text-center relative z-10">
                    <span className="inline-block bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                        Servicio gratuito para empleadores
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
                        Encontrá el profesional<br className="hidden md:block" /> que necesitás
                    </h1>
                    <p className="text-blue-200 text-lg max-w-xl mx-auto leading-relaxed">
                        Conectamos tu empresa con egresados certificados del Centro de Formación Laboral N° 401, listos para incorporarse.
                    </p>
                </div>
            </section>

            {/* ===== FORMULARIO ===== */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-2xl">

                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                        <div className="p-8 md:p-12">
                            <div className="mb-8 border-b border-gray-100 pb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Formulario de Solicitud de Personal</h2>
                                <p className="text-gray-500 text-sm">
                                    Completá los datos de tu empresa y el perfil que estás buscando para que te conectemos con nuestros egresados.
                                </p>
                            </div>

                        {/* ===== ESTADO: ÉXITO ===== */}
                        {estado === 'success' ? (
                            <div className="p-12 text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-black text-gray-800 mb-3">¡Solicitud enviada!</h3>
                                <p className="text-gray-500 max-w-sm mx-auto mb-8">
                                    Recibimos tu solicitud. Un miembro de nuestro equipo se comunicará con vos a la brevedad.
                                </p>
                                <button
                                    onClick={() => setEstado('idle')}
                                    className="bg-azulGob hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-200"
                                >
                                    Enviar otra solicitud
                                </button>
                            </div>
                        ) : (

                        /* ===== FORMULARIO PRINCIPAL ===== */
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">

                            {/* Error banner */}
                            {estado === 'error' && (
                                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start gap-3">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            {/* 1. DATOS DEL SOLICITANTE */}
                            <section>
                                <h3 className="text-lg font-bold text-azulGob mb-5 flex items-center gap-2">
                                    <span className="bg-blue-100 text-azulGob w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">1</span>
                                    Datos del Solicitante
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de solicitante *</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {TIPOS.map(t => (
                                                <label
                                                    key={t.value}
                                                    className={`flex items-center justify-center gap-2 border-2 rounded-xl px-3 py-3 cursor-pointer text-sm font-medium transition-all duration-150 ${
                                                        form.tipo_solicitante === t.value
                                                            ? 'border-azulGob bg-blue-50 text-azulGob'
                                                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="tipo_solicitante"
                                                        value={t.value}
                                                        checked={form.tipo_solicitante === t.value}
                                                        onChange={handleChange}
                                                        className="sr-only"
                                                    />
                                                    {t.label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="nombre_solicitante" className="block text-sm font-semibold text-gray-700 mb-1">
                                            {form.tipo_solicitante === 'empresa' ? 'Razón social / Nombre de la empresa *' : 'Nombre completo *'}
                                        </label>
                                        <input
                                            id="nombre_solicitante"
                                            type="text"
                                            name="nombre_solicitante"
                                            value={form.nombre_solicitante}
                                            onChange={handleChange}
                                            required
                                            placeholder="Ej: Agropecuaria San Martín S.A."
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-1">Teléfono de contacto *</label>
                                        <input
                                            id="telefono"
                                            type="tel"
                                            name="telefono"
                                            value={form.telefono}
                                            onChange={handleChange}
                                            required
                                            placeholder="Ej: 2226 123456"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                        />
                                        <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                name="es_whatsapp"
                                                checked={form.es_whatsapp}
                                                onChange={handleChange}
                                                className="w-4 h-4 accent-green-500 rounded focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-600">Este número tiene WhatsApp</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico *</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="contacto@empresa.com"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* 2. DETALLE DEL REQUERIMIENTO */}
                            <section>
                                <h3 className="text-lg font-bold text-azulGob mb-5 flex items-center gap-2">
                                    <span className="bg-blue-100 text-azulGob w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">2</span>
                                    Detalle del Requerimiento
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <label htmlFor="curso_requerido" className="block text-sm font-semibold text-gray-700 mb-1">
                                            Especialidad requerida (Opcional)
                                        </label>
                                        <select
                                            id="curso_requerido"
                                            name="curso_requerido"
                                            value={form.curso_requerido}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                        >
                                            <option value="">— Seleccione una especialidad —</option>
                                            {cursos.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.familia_nombre ? `${c.familia_nombre} › ` : ''}{c.nombre}
                                                    {c.cantidad_egresados > 0 ? ` (${c.cantidad_egresados} disponibles)` : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="zona_trabajo" className="block text-sm font-semibold text-gray-700 mb-1">Zona / Localidad *</label>
                                        <input
                                            id="zona_trabajo"
                                            type="text"
                                            name="zona_trabajo"
                                            value={form.zona_trabajo}
                                            onChange={handleChange}
                                            required
                                            placeholder="Ej: Cañuelas, San Vicente..."
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Urgencia *</label>
                                        <select
                                            name="urgencia"
                                            value={form.urgencia}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all"
                                        >
                                            {URGENCIAS.map(u => (
                                                <option key={u.value} value={u.value}>{u.label.substring(3)}</option> // Quito el emoji para el select
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="descripcion_trabajo" className="block text-sm font-semibold text-gray-700 mb-1">
                                            Descripción del puesto y tareas *
                                        </label>
                                        <textarea
                                            id="descripcion_trabajo"
                                            name="descripcion_trabajo"
                                            value={form.descripcion_trabajo}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            placeholder="Describí el puesto, las tareas a realizar, condiciones de contratación, etc."
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-azulGob/20 focus:border-azulGob outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-xs text-gray-400">* Campos obligatorios</span>
                                <button
                                    type="submit"
                                    disabled={estado === 'loading'}
                                    className="bg-azulGob text-white font-bold py-3.5 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {estado === 'loading' ? (
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
                        )}
                        </div>
                    </div>

                    {/* Info extra */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { icon: '🆓', title: 'Sin costo', desc: 'El servicio de intermediación laboral es completamente gratuito.' },
                            { icon: '⚡', title: 'Rápido', desc: 'Nos ponemos en contacto dentro de las 48 hs hábiles.' },
                            { icon: '✅', title: 'Certificados', desc: 'Todos nuestros egresados cuentan con certificado oficial.' },
                        ].map(item => (
                            <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4 items-start">
                                <span className="text-2xl">{item.icon}</span>
                                <div>
                                    <div className="font-bold text-gray-800 text-sm">{item.title}</div>
                                    <div className="text-gray-500 text-xs mt-1 leading-relaxed">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SolicitarPersonal;
