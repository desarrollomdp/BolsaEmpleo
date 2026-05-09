import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
    const [sliders, setSliders] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [cursosConEgresados, setCursosConEgresados] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Detecta si el usuario está en mobile o desktop y reacciona al cambio de tamaño
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/administrador/sliders/')
            .then(res => res.json())
            .then(data => setSliders(data))
            .catch(err => console.error("Error cargando sliders:", err));

        fetch('http://localhost:8000/administrador/empresas/')
            .then(res => res.json())
            .then(data => setEmpresas(data))
            .catch(err => console.error("Error cargando empresas:", err));

        fetch('http://localhost:8000/api/cursos/')
            .then(res => res.json())
            .then(data => {
                // Solo cursos que tienen al menos 1 egresado registrado
                const conEgresados = data.filter(c => c.cantidad_egresados > 0);
                setCursosConEgresados(conEgresados);
            })
            .catch(err => console.error("Error cargando cursos:", err));
    }, []);

    // Lógica para auto-reproducción del slider
    useEffect(() => {
        if (sliders.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [sliders]);

    const prevSlide = () => setCurrentIndex((i) => (i - 1 + sliders.length) % sliders.length);
    const nextSlide = () => setCurrentIndex((i) => (i + 1) % sliders.length);

    // --- Contadores animados ---
    const [counts, setCounts] = useState({ years: 0, egresados: 0, cursos: 0 });
    const statsRef = useRef(null);
    const animatedRef = useRef(false);

    useEffect(() => {
        const targets = { years: 20, egresados: 400, cursos: 10 };
        const duration = 2000; // ms
        const steps = 60;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animatedRef.current) {
                    animatedRef.current = true;
                    const increment = (key) => {
                        let step = 0;
                        const interval = setInterval(() => {
                            step++;
                            setCounts(prev => ({
                                ...prev,
                                [key]: Math.round((targets[key] / steps) * step)
                            }));
                            if (step >= steps) clearInterval(interval);
                        }, duration / steps);
                    };
                    Object.keys(targets).forEach(increment);
                }
            },
            { threshold: 0.3 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full">
            {/* Hero Slider Section */}
            {sliders.length > 0 ? (
                <div className="w-full bg-gray-900">
                    {/* Imagen principal */}
                    <div className="relative w-full h-[420px] md:h-[600px] overflow-hidden">
                        {sliders.map((slider, index) => (
                            <div
                                key={slider.id}
                                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                style={{
                                    backgroundImage: `url(${isMobile ? slider.imagen_mobile : slider.imagen_desktop})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            >
                                {/* Texto sobre la imagen */}
                                <div className="absolute inset-0 flex items-center p-8 md:p-16">
                                    <h2 className="text-white font-bold text-left leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-xl text-3xl md:text-5xl">
                                        {slider.texto}
                                    </h2>
                                </div>
                            </div>
                        ))}

                        {/* Botones Anterior / Siguiente */}
                        {sliders.length > 1 && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    aria-label="Anterior"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full w-11 h-11 flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    aria-label="Siguiente"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full w-11 h-11 flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Tira de miniaturas */}
                    {sliders.length > 1 && (
                        <div className="flex gap-2 p-3 overflow-x-auto bg-gray-950 justify-center">
                            {sliders.map((slider, index) => (
                                <button
                                    key={slider.id}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded overflow-hidden border-2 transition-all duration-200 focus:outline-none ${
                                        index === currentIndex
                                            ? 'border-blue-400 scale-105 opacity-100'
                                            : 'border-transparent opacity-50 hover:opacity-80 hover:border-gray-400'
                                    }`}
                                    aria-label={`Ver imagen ${index + 1}`}
                                >
                                    <div
                                        className="w-full h-full"
                                        style={{
                                            backgroundImage: `url(${isMobile ? slider.imagen_mobile : slider.imagen_desktop})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-full h-[400px] md:h-[650px] bg-gray-200 flex flex-col items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-64 bg-gray-300 rounded mb-4"></div>
                        <p className="text-gray-500">Cargando portadas...</p>
                    </div>
                </div>
            )}

            {/* ===== SECCIÓN EMPRESAS ===== */}
            {empresas.length > 0 && (
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 mb-8 text-center">
                    <h2 className="text-2xl font-bold text-azulGob">Empresas que confían en nosotros</h2>
                    <p className="text-gray-500 mt-2 text-sm">Conectamos profesionales con las mejores organizaciones de la región</p>
                </div>

                {/* Carrusel de logos con auto-scroll */}
                <div className="overflow-hidden relative w-full">
                    {/* Gradientes en los bordes */}
                    <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to right, white, transparent)' }} />
                    <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to left, white, transparent)' }} />

                    <div className="animate-marquee">
                        {/* Duplicamos las empresas para el loop infinito seamless */}
                        {[...Array(2)].map((_, setIdx) => (
                            <div key={setIdx} className="flex items-center gap-8 px-4">
                                {empresas.map((empresa) => (
                                    <div
                                        key={`${setIdx}-${empresa.id}`}
                                        className="flex-shrink-0 w-36 h-20 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center p-2 hover:bg-gray-100 hover:border-blue-200 transition-colors duration-200"
                                    >
                                        {empresa.logo ? (
                                            <img
                                                src={empresa.logo}
                                                alt={empresa.nombre}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        ) : (
                                            <span className="text-gray-600 text-xs font-semibold text-center leading-tight px-1">{empresa.nombre}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            )}

            {/* ===== SECCIÓN CONTADORES ===== */}
            <section
                ref={statsRef}
                className="py-20 bg-azulGob text-white relative overflow-hidden"
            >
                {/* Decoración de fondo */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Título */}
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">20 años formando el futuro laboral</h2>
                        <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
                            El Centro de Formación Laboral N° 401 lleva dos décadas transformando vidas a través de la educación y la capacitación profesional en Cañuelas.
                        </p>
                    </div>

                    {/* Tarjetas de estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Tarjeta 1 — Años */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-colors duration-300">
                            <div className="flex justify-center mb-4">
                                <svg className="w-16 h-16 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-6xl font-black text-yellow-300 mb-2">{counts.years}+</div>
                            <div className="text-xl font-bold mb-2">Años de trayectoria</div>
                            <div className="text-blue-200 text-sm">Formando profesionales desde 2004 con compromiso y excelencia educativa.</div>
                        </div>

                        {/* Tarjeta 2 — Egresados */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-colors duration-300">
                            <div className="flex justify-center mb-4">
                                <svg className="w-16 h-16 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="text-6xl font-black text-green-300 mb-2">{counts.egresados}+</div>
                            <div className="text-xl font-bold mb-2">Egresados anuales</div>
                            <div className="text-blue-200 text-sm">Más de 400 profesionales se insertan al mercado laboral cada año gracias a nuestra formación.</div>
                        </div>

                        {/* Tarjeta 3 — Cursos */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-colors duration-300">
                            <div className="flex justify-center mb-4">
                                <svg className="w-16 h-16 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="text-6xl font-black text-orange-300 mb-2">{counts.cursos}+</div>
                            <div className="text-xl font-bold mb-2">Cursos por año</div>
                            <div className="text-blue-200 text-sm">Oferta académica diversa con más de 10 especialidades activas por ciclo lectivo.</div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ===== SECCIÓN EGRESADOS DISPONIBLES (debajo de contadores) ===== */}
            {cursosConEgresados.length > 0 && (
            <section className="py-14 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 25% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 60%, #1d4ed8 0%, transparent 50%)' }} />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-green-500/30 mb-4">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
                            Profesionales disponibles ahora
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                            Egresados listos para incorporarse
                        </h2>
                        <p className="text-blue-200 text-base max-w-2xl mx-auto">
                            Contamos con profesionales certificados por el CFL N° 401 en las siguientes especialidades,
                            disponibles para cubrir sus necesidades laborales.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {cursosConEgresados.map((curso) => (
                            <Link
                                key={curso.id}
                                to={`/cursos/${curso.id}`}
                                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Imagen del curso */}
                                <div className="w-full h-40 bg-blue-900/40 overflow-hidden relative">
                                    {curso.imagen ? (
                                        <img
                                            src={curso.imagen}
                                            alt={curso.nombre}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg className="w-14 h-14 text-blue-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            </svg>
                                        </div>
                                    )}
                                    {/* Gradiente inferior sobre la imagen */}
                                    <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-slate-900/80 to-transparent" />
                                    {/* Badge cantidad */}
                                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
                                        {curso.cantidad_egresados} egresado{curso.cantidad_egresados !== 1 ? 's' : ''}
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div className="p-5">
                                    {curso.familia_nombre && (
                                        <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">{curso.familia_nombre}</span>
                                    )}
                                    <h3 className="text-white font-bold text-base mt-1 mb-3 leading-snug">{curso.nombre}</h3>
                                    <div className="flex items-center gap-2 text-green-400 text-xs font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block"></span>
                                        Disponibles para empleo
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-blue-200 text-sm mb-4">¿Necesita contratar a un profesional certificado?</p>
                        <a
                            href="/solicitar-personal"
                            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-0.5"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            Solicitar un profesional
                        </a>
                    </div>
                </div>
            </section>
            )}

            {/* ===== BIENVENIDA INSTITUCIONAL ===== */}
            <section className="py-16 px-4 bg-white border-t border-gray-100">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-3xl md:text-4xl font-black text-azulGob mb-4">Agencia de Empleo · CFL N° 401 Cañuelas</h1>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
                        El Centro de Formación Laboral N° 401 conecta el talento local con las mejores oportunidades laborales.
                        Capacitación <strong>gratuita</strong>, certificación provincial y salida laboral directa para los vecinos de Cañuelas y la región.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/solicitar-personal" className="bg-azulGob hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200">
                            Solicitar personal
                        </a>
                        <a href="/quienes-somos" className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-8 py-3.5 rounded-xl transition-all duration-200">
                            Conocé el CFL 401
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Inicio;
