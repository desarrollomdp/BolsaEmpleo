import React from 'react';
import { Link } from 'react-router-dom';

const pilares = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
        ),
        color: 'text-blue-500 bg-blue-50 border-blue-100',
        title: 'Formación Gratuita',
        desc: 'Todos nuestros cursos y capacitaciones son completamente gratuitos para los vecinos de Cañuelas y el distrito.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        color: 'text-green-600 bg-green-50 border-green-100',
        title: 'Certificación Oficial',
        desc: 'Los egresados obtienen certificado oficial de la Provincia de Buenos Aires, avalado por el Ministerio de Trabajo.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: 'text-orange-500 bg-orange-50 border-orange-100',
        title: 'Salida Laboral Directa',
        desc: 'Articulamos con empresas e instituciones para conectar a nuestros egresados con oportunidades de empleo reales.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        color: 'text-purple-500 bg-purple-50 border-purple-100',
        title: 'Emprendedurismo',
        desc: 'Fomentamos el desarrollo de proyectos propios y el trabajo independiente para potenciar la economía local.',
    },
];

const QuienesSomos = () => {
    return (
        <div className="min-h-screen bg-white">

            {/* ===== HERO ===== */}
            <section className="bg-gradient-to-br from-azulGob via-blue-800 to-blue-950 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 60%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                        Desde 2004 en Cañuelas
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        Centro de Formación<br className="hidden md:block" /> Laboral N° 401
                    </h1>
                    <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Más de 20 años transformando vidas a través de la educación, la capacitación profesional
                        y la inserción laboral en nuestra comunidad.
                    </p>
                </div>
            </section>

            {/* ===== IDENTIDAD INSTITUCIONAL ===== */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-azulGob text-xs font-bold uppercase tracking-widest">Quiénes somos</span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-6 leading-tight">
                                Una institución comprometida con el trabajo y la educación
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    El <strong className="text-gray-900">Centro de Formación Laboral N° 401</strong> de Cañuelas es una institución
                                    educativa pública dependiente del <strong className="text-gray-900">Instituto Provincial de Formación Laboral (IPFL)</strong>,
                                    organismo del Ministerio de Trabajo de la Provincia de Buenos Aires, en articulación
                                    con el Gobierno Municipal de Cañuelas.
                                </p>
                                <p>
                                    Nuestra misión es brindar <strong className="text-gray-900">capacitación gratuita y de calidad</strong> a los
                                    trabajadores y trabajadoras de Cañuelas y la región, orientada a mejorar su empleabilidad,
                                    aprender oficios tradicionales y digitales, y fomentar el emprendedurismo local.
                                </p>
                                <p>
                                    Operamos en <strong className="text-gray-900">más de 5 sedes</strong> distribuidas en el distrito,
                                    acercando la formación a cada rincón de nuestra comunidad.
                                </p>
                            </div>
                        </div>

                        {/* Ficha datos */}
                        <div className="bg-gray-50 rounded-3xl border border-gray-100 p-8 space-y-5">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Datos institucionales</h3>
                            {[
                                { label: 'Nombre oficial', value: 'Centro de Formación Laboral N° 401 de Cañuelas' },
                                { label: 'Dependencia', value: 'IPFL · Ministerio de Trabajo, Provincia de Buenos Aires' },
                                { label: 'Articulación', value: 'Gobierno Municipal de Cañuelas' },
                                { label: 'Sede central', value: 'Saavedra 474 (esq. Acuña), Cañuelas, PBA' },
                                { label: 'Teléfono / WhatsApp', value: '+54 9 2226 444141' },
                                { label: 'Instagram', value: '@cfl401.canuelas' },
                                { label: 'Sedes', value: 'Más de 5 distribuidas en el distrito' },
                                { label: 'Formación', value: 'Completamente gratuita · Certificación provincial' },
                            ].map(item => (
                                <div key={item.label} className="flex flex-col sm:flex-row sm:items-start gap-1 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider min-w-[140px]">{item.label}</span>
                                    <span className="text-gray-800 text-sm font-medium">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PILARES ===== */}
            <section className="py-16 px-4 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-gray-900 mb-3">Nuestra propuesta de valor</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">Lo que nos hace únicos y el compromiso que tenemos con cada alumno y empresa de nuestra comunidad.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pilares.map(p => (
                            <div key={p.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-4 ${p.color}`}>
                                    {p.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== UBICACIÓN ===== */}
            <section className="py-20 px-4 bg-white border-t border-gray-100">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div>
                            <span className="text-azulGob text-xs font-bold uppercase tracking-widest">Dónde encontrarnos</span>
                            <h2 className="text-3xl font-black text-gray-900 mt-2 mb-6">Sede central y operatoria</h2>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-azulGob/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-5 h-5 text-azulGob" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Sede Central</div>
                                        <div className="text-gray-600 text-sm">Saavedra 474 (casi esquina Acuña)</div>
                                        <div className="text-gray-600 text-sm">Cañuelas, Provincia de Buenos Aires</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Más de 5 sedes en el distrito</div>
                                        <div className="text-gray-600 text-sm">Las clases no se dictan exclusivamente en la sede central. Operamos en múltiples puntos del distrito para acercar la formación a cada vecino.</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.11 1.527 5.836L.057 23.571a.5.5 0 00.611.64l5.882-1.542A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-4.98-1.354l-.357-.213-3.706.972.988-3.61-.233-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">+54 9 2226 444141</div>
                                        <div className="text-gray-500 text-xs">WhatsApp y llamadas</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mapa embed */}
                        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md h-72 md:h-full min-h-[280px]">
                            <iframe
                                title="Mapa sede CFL 401 Cañuelas"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.0!2d-58.7433!3d-35.0537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSaavedra%20474%2C%20Ca%C3%B1uelas%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '280px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA FINAL ===== */}
            <section className="py-16 px-4 bg-azulGob text-white">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-black mb-4">¿Necesitás un profesional certificado?</h2>
                    <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
                        Contamos con egresados listos para incorporarse en distintas especialidades. El servicio es gratuito para empresas y particulares.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/solicitar-personal"
                            className="bg-white text-azulGob hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg"
                        >
                            Solicitar personal
                        </Link>
                        <Link
                            to="/egresados"
                            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200"
                        >
                            Ver egresados disponibles
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default QuienesSomos;
