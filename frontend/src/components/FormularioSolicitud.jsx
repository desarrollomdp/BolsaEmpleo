import React, { useState, useEffect } from 'react';
import { obtenerCursos, enviarSolicitud } from '../services/api';

const FormularioSolicitud = () => {
    // 1. Estado para almacenar los cursos del menú desplegable
    const [cursosDisponibles, setCursosDisponibles] = useState([]);

    // 2. Estado para gestionar la interfaz (cargando, éxito, error)
    const [estadoEnvio, setEstadoEnvio] = useState('inactivo'); // inactivo, enviando, exito, error

    // 3. Estado central: El paquete de datos que enviaremos a Django
    // Los nombres de estas propiedades DEBEN coincidir exactamente con tu modelo en Django
    const [formData, setFormData] = useState({
        tipo_solicitante: 'particular',
        nombre_solicitante: '',
        telefono: '',
        es_whatsapp: false,
        email: '',
        curso_requerido: '',
        zona_trabajo: '',
        urgencia: 'MEDIA',
        descripcion_trabajo: ''
    });

    // 4. Traemos los cursos al cargar el componente para armar el <select>
    useEffect(() => {
        const cargarCursos = async () => {
            const datos = await obtenerCursos();
            setCursosDisponibles(datos);
        };
        cargarCursos();
    }, []);

    // 5. Función que actualiza el estado cada vez que el usuario teclea algo
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData, // Mantenemos lo que ya estaba escrito
            // Si es un checkbox (es_whatsapp), usamos 'checked', sino usamos 'value'
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // 6. Función que se ejecuta al presionar "Enviar"
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue (comportamiento web antiguo)
        setEstadoEnvio('enviando');

        try {
            const respuesta = await enviarSolicitud(formData);
            if (respuesta.ok) {
                setEstadoEnvio('exito');
                // Limpiamos el formulario
                setFormData({
                    tipo_solicitante: 'particular',
                    nombre_solicitante: '',
                    telefono: '',
                    es_whatsapp: false,
                    email: '',
                    curso_requerido: '',
                    zona_trabajo: '',
                    urgencia: 'MEDIA',
                    descripcion_trabajo: ''
                });
            } else {
                setEstadoEnvio('error');
            }
        } catch (error) {
            setEstadoEnvio('error');
        }
    };

    // 7. Renderizado: Si se envió con éxito, mostramos un mensaje de agradecimiento
    if (estadoEnvio === 'exito') {
        return (
            <div className="max-w-2xl mx-auto bg-green-50 p-8 rounded-xl shadow border border-green-200 text-center my-12">
                <h3 className="text-2xl font-bold text-verdeAccion mb-4">¡Solicitud Enviada Correctamente!</h3>
                <p className="text-gray-700">El equipo del CFL 401 ha recibido su requerimiento. Analizaremos nuestra base de profesionales y nos pondremos en contacto a la brevedad.</p>
                <button
                    onClick={() => setEstadoEnvio('inactivo')}
                    className="mt-6 bg-azulGob text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                >
                    Enviar otra solicitud
                </button>
            </div>
        );
    }

    // 8. Renderizado del Formulario
    return (
        <section id="formulario" className="py-12 bg-gray-100">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border-t-4 border-azulGob">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-azulGob">Solicitar un Profesional</h2>
                    <p className="text-gray-600 mt-2">Completá el requerimiento para que el Centro te contacte con el perfil ideal.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Fila 1: Tipo y Nombre */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Soy un/a</label>
                            <select name="tipo_solicitante" value={formData.tipo_solicitante} onChange={handleChange} className="w-full px-4 py-2 border rounded bg-white" required>
                                <option value="particular">Vecino Particular</option>
                                <option value="empresa">Empresa / Pyme</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-bold mb-2">Nombre o Razón Social</label>
                            <input type="text" name="nombre_solicitante" value={formData.nombre_solicitante} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-azulGob outline-none" required />
                        </div>
                    </div>

                    {/* Fila 2: Contacto */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Teléfono</label>
                            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-azulGob outline-none" required />
                            <div className="mt-2 flex items-center">
                                <input type="checkbox" name="es_whatsapp" checked={formData.es_whatsapp} onChange={handleChange} className="w-4 h-4 text-verdeAccion" />
                                <label className="ml-2 text-sm text-gray-600">Este número tiene WhatsApp</label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Correo Electrónico</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-azulGob outline-none" required />
                        </div>
                    </div>

                    {/* Fila 3: Requerimiento */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-bold mb-2">Especialidad Requerida</label>
                            <select name="curso_requerido" value={formData.curso_requerido} onChange={handleChange} className="w-full px-4 py-2 border rounded bg-white" required>
                                <option value="" disabled>Seleccione una especialidad...</option>
                                {cursosDisponibles.map(curso => (
                                    <option key={curso.id} value={curso.id}>{curso.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Urgencia</label>
                            <select name="urgencia" value={formData.urgencia} onChange={handleChange} className="w-full px-4 py-2 border rounded bg-white" required>
                                <option value="BAJA">Baja (Planificable)</option>
                                <option value="MEDIA">Media (Próximos días)</option>
                                <option value="ALTA">Alta (Inmediata)</option>
                            </select>
                        </div>
                    </div>

                    {/* Fila 4: Zona y Descripción */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Zona del Trabajo (Ej. Centro, Ruta 3...)</label>
                        <input type="text" name="zona_trabajo" value={formData.zona_trabajo} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-azulGob outline-none" required />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Descripción del trabajo a realizar</label>
                        <textarea name="descripcion_trabajo" value={formData.descripcion_trabajo} onChange={handleChange} rows="4" className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-azulGob outline-none" required placeholder="Detalle lo mejor posible el problema o trabajo a realizar..."></textarea>
                    </div>

                    {estadoEnvio === 'error' && (
                        <p className="text-red-500 font-bold">Ocurrió un error al enviar la solicitud. Por favor, intente nuevamente.</p>
                    )}

                    <button
                        type="submit"
                        disabled={estadoEnvio === 'enviando'}
                        className={`w-full text-white font-bold py-3 px-4 rounded transition text-lg ${estadoEnvio === 'enviando' ? 'bg-gray-400' : 'bg-verdeAccion hover:bg-green-700'}`}
                    >
                        {estadoEnvio === 'enviando' ? 'Enviando...' : 'Enviar Solicitud al Centro'}
                    </button>

                </form>
            </div>
        </section>
    );
};

export default FormularioSolicitud;