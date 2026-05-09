import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // Estado para controlar si el menú de celulares está abierto o cerrado
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Estados para Familias y Cursos
    const [familias, setFamilias] = useState([]);
    const [cursos, setCursos] = useState([]);

    // Estados para el dropdown de Egresados
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hoveredFamilia, setHoveredFamilia] = useState(null);

    useEffect(() => {
        // Cargar familias profesionales
        fetch('http://localhost:8000/api/familias/')
            .then(res => res.json())
            .then(data => setFamilias(data))
            .catch(err => console.error(err));

        // Cargar cursos
        fetch('http://localhost:8000/api/cursos/')
            .then(res => res.json())
            .then(data => setCursos(data))
            .catch(err => console.error(err));
    }, []);

    // Función que invierte el estado actual
    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
        <header className="bg-azulGob text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo — lleva al inicio */}
                <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
                    <img src="/logo.png" alt="Logo Agencia de Empleo" className="h-10 w-auto" />
                    <span className="font-bold hidden sm:block tracking-wide">Agencia de Empleo CFL 401</span>
                </Link>

                {/* Navegación Desktop (Oculta en móviles con 'hidden md:flex') */}
                <nav className="hidden md:flex space-x-6 items-center" style={{ fontFamily: "'Montserrat', Arial, sans-serif", fontWeight: 700 }}>
                    {/* Egresados Dropdown */}
                    <div
                        className="relative group py-2"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => {
                            setDropdownOpen(false);
                            setHoveredFamilia(null);
                        }}
                    >
                        <Link to="/egresados" className="hover:text-gray-300 transition duration-200 flex items-center">
                            Egresados
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </Link>

                        {dropdownOpen && (
                            <div className="absolute top-full left-0 mt-0 w-64 bg-white text-gray-800 shadow-xl rounded-md py-2 border border-gray-100 z-50">
                                {familias.map(familia => (
                                    <div
                                        key={familia.id}
                                        className="relative px-4 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                                        onMouseEnter={() => setHoveredFamilia(familia.id)}
                                    >
                                        <span className="font-medium text-sm">{familia.nombre}</span>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>

                                        {/* Cursos Sub-menu */}
                                        {hoveredFamilia === familia.id && (
                                            <div className="absolute top-0 left-full ml-0 w-64 bg-white text-gray-800 shadow-xl rounded-md py-2 border border-gray-100">
                                                {cursos.filter(c => c.familia === familia.id || c.familia_nombre === familia.nombre).length > 0 ? (
                                                    cursos.filter(c => c.familia === familia.id || c.familia_nombre === familia.nombre).map(curso => (
                                                        <Link
                                                            key={curso.id}
                                                            to={`/cursos/${curso.id}`}
                                                            className="block px-4 py-2 hover:bg-blue-50 hover:text-azulGob text-sm transition-colors duration-150"
                                                            onClick={() => setDropdownOpen(false)}
                                                        >
                                                            {curso.nombre}
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-2 text-sm text-gray-500 italic">No hay cursos</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link to="/quienes-somos" className="hover:text-gray-300 transition duration-200">Quiénes Somos</Link>
                    <Link to="/profesionales-independientes" className="hover:text-gray-300 transition duration-200">Autónomos</Link>
                    <Link to="/solicitar-personal" className="hover:text-gray-300 transition duration-200">Solicitar Personal</Link>
                    <Link to="/servicio-empresas" className="hover:text-gray-300 transition duration-200">Servicio a Empresas</Link>
                </nav>

                {/* Botón Hamburguesa para Móviles (Oculto en desktop con 'md:hidden') */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Alternar menú"
                >
                    {/* SVG que cambia entre tres líneas (hamburguesa) y una "X" (cerrar) según el estado */}
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {menuAbierto ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Menú Móvil (Desplegable) */}
            {/* Solo se renderiza si menuAbierto es 'true' */}
            {menuAbierto && (
                <div className="md:hidden bg-blue-900 pb-4 px-4 shadow-inner border-t border-blue-800">
                    <nav className="flex flex-col space-y-4 pt-4 font-semibold text-center">
                        <div className="text-center">
                            <Link to="/egresados" className="hover:text-gray-300 inline-block mb-2 text-lg" onClick={toggleMenu}>Egresados</Link>
                            <div className="pl-4 border-l border-blue-700 flex flex-col space-y-3 mt-2 text-sm text-gray-200 text-left mx-auto max-w-[250px]">
                                {familias.map(familia => (
                                    <div key={familia.id} className="mb-2">
                                        <div className="font-bold text-white mb-1 border-b border-blue-800 pb-1">{familia.nombre}</div>
                                        <div className="pl-2 flex flex-col space-y-2 mt-2">
                                            {cursos.filter(c => c.familia === familia.id || c.familia_nombre === familia.nombre).map(curso => (
                                                <Link
                                                    key={curso.id}
                                                    to={`/cursos/${curso.id}`}
                                                    className="text-gray-300 text-xs hover:text-white transition-colors duration-150"
                                                    onClick={toggleMenu}
                                                >
                                                    — {curso.nombre}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link to="/quienes-somos" className="hover:text-gray-300 block" onClick={toggleMenu}>Quiénes Somos</Link>
                        <Link to="/profesionales-independientes" className="hover:text-verdeAccion block mt-2" onClick={toggleMenu}>Autónomos</Link>
                        <Link to="/solicitar-personal" className="hover:text-verdeAccion block mt-2" onClick={toggleMenu}>Solicitar Personal</Link>
                        <Link to="/servicio-empresas" className="hover:text-verdeAccion block mt-2" onClick={toggleMenu}>Servicio a Empresas</Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;