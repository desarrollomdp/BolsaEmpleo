import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-300">
            {/* Franja superior azul */}
            <div className="h-1 w-full bg-gradient-to-r from-azulGob via-blue-400 to-azulGob" />

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Col 1 — Identidad */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/logo.png" alt="Logo CFL 401" className="h-10 w-auto opacity-90" />
                            <div>
                                <div className="text-white font-bold text-sm leading-tight">Agencia de Empleo</div>
                                <div className="text-blue-400 text-xs">CFL N° 401 · Cañuelas</div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Capacitación gratuita con certificación oficial de la Provincia de Buenos Aires
                            y salida laboral directa para los vecinos de Cañuelas y la región.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Dependiente del IPFL · Ministerio de Trabajo PBA
                        </div>
                    </div>

                    {/* Col 2 — Contacto y ubicación */}
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contacto y Ubicación</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-azulGob mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <div className="text-white font-medium">Sede Central</div>
                                    <div className="text-gray-400">Saavedra 474 (esq. Acuña)</div>
                                    <div className="text-gray-400">Cañuelas, Buenos Aires</div>
                                    <div className="text-gray-500 text-xs mt-1">+ 5 sedes distribuidas en el distrito</div>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.11 1.527 5.836L.057 23.571a.5.5 0 00.611.64l5.882-1.542A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-4.98-1.354l-.357-.213-3.706.972.988-3.61-.233-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                                </svg>
                                <a
                                    href="https://wa.me/5492226444141"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                                >
                                    +54 9 2226 444141 (WhatsApp)
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-pink-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                                <a
                                    href="https://instagram.com/cfl401.canuelas"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
                                >
                                    @cfl401.canuelas
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3 — Navegación */}
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Navegación</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { to: '/', label: 'Inicio' },
                                { to: '/egresados', label: 'Egresados y Cursos' },
                                { to: '/solicitar-personal', label: 'Solicitar Personal' },
                                { to: '/servicio-empresas', label: 'Servicio a Empresas' },
                                { to: '/quienes-somos', label: 'Quiénes Somos' },
                            ].map(item => (
                                <li key={item.to}>
                                    <Link
                                        to={item.to}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mapa rápido link */}
                        <a
                            href="https://maps.google.com/?q=Saavedra+474,+Cañuelas,+Buenos+Aires"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 bg-blue-900/40 hover:bg-blue-800/50 border border-blue-800/50 text-blue-300 hover:text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-all duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            Ver en el mapa
                        </a>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="border-t border-gray-800 py-4 px-4">
                <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
                    <span>© {new Date().getFullYear()} Centro de Formación Laboral N° 401 · Cañuelas, Pcia. de Buenos Aires</span>
                    <span className="flex items-center gap-1">
                        Dependiente del
                        <span className="text-blue-500 font-medium ml-1">IPFL · Ministerio de Trabajo PBA</span>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
