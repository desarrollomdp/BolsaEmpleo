import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Inicio from './pages/Inicio';
import QuienesSomos from './pages/QuienesSomos';
import Egresados from './pages/Egresados';
import ProfesionalesIndependientes from './pages/ProfesionalesIndependientes';
import SolicitarPersonal from './pages/SolicitarPersonal';
import DetalleCurso from './pages/DetalleCurso';
import RelevamientoEmpresas from './pages/RelevamientoEmpresas';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">

        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/egresados" element={<Egresados />} />
            <Route path="/profesionales-independientes" element={<ProfesionalesIndependientes />} />
            <Route path="/solicitar-personal" element={<SolicitarPersonal />} />
            <Route path="/servicio-empresas" element={<RelevamientoEmpresas />} />
            <Route path="/cursos/:id" element={<DetalleCurso />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;