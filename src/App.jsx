import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AstrologyChart from './components/AstrologyChart.jsx';
import { PlanetList } from "./components/PlanetList";


const App= () => {
return(
 <BrowserRouter>
 <>
 <header style={{padding: '20px', backgroundColor: '#f0f0f0'}}>
  <h1>Astro Iolite</h1>
  <nav>
    <Link to="/" style={{margin: '0 10px'}}>Datos de Nacimiento</Link>
    <Link to="/chart" style={{margin: '0 10px'}}>Carta Astrológica</Link>
    <Link to="/planets" style={{margin: '0 10px'}}>Lista de Planetas</Link>
  </nav>
</header>
<Routes>
          <Route path="/" element={
<div className="lobby">
    <header>
      <h1>🌟 Astro Iolite</h1>
      <p>Tu guía hacia el autoconocimiento a través de la astrología</p>
    </header>
    
    <main>
      <section className="intro">
        <h2>¿Qué es una Carta Astral?</h2>
        <p>Tu carta astral es un mapa del cielo en el momento exacto de tu nacimiento. 
           Muestra la posición de los planetas, el Sol y la Luna en los diferentes signos 
           zodiacales y casas astrológicas.</p>
      </section>

      <section className="zodiac-info">
        <h3>🌙 Los 12 Signos del Zodíaco</h3>
        <div className="signs-grid">
          <div>♈ Aries (21 mar - 19 abr) - Fuego, Cardinal</div>
          <div>♉ Tauro (20 abr - 20 may) - Tierra, Fijo</div>
          <div>♊ Géminis (21 may - 20 jun) - Aire, Mutable</div>
          <div>♋ Cáncer (21 jun - 22 jul) - Agua, Cardinal</div>
          <div>♌ Leo (23 jul - 22 ago) - Fuego, Fijo</div>
          <div>♍ Virgo (23 ago - 22 sep) - Tierra, Mutable</div>
          <div>♎ Libra (23 sep - 22 oct) - Aire, Cardinal</div>
          <div>♏ Escorpio (23 oct - 21 nov) - Agua, Fijo</div>
          <div>♐ Sagitario (22 nov - 21 dic) - Fuego, Mutable</div>
          <div>♑ Capricornio (22 dic - 19 ene) - Tierra, Cardinal</div>
          <div>♒ Acuario (20 ene - 18 feb) - Aire, Fijo</div>
          <div>♓ Piscis (19 feb - 20 mar) - Agua, Mutable</div>
        </div>
      </section>

      <section className="planets-info">
        <h3>🪐 Los Planetas y sus Significados</h3>
        <div className="planets-list">
          <div><strong>☉ Sol:</strong> Identidad, ego, propósito vital</div>
          <div><strong>☽ Luna:</strong> Emociones, intuición, subconsciente</div>
          <div><strong>☿ Mercurio:</strong> Comunicación, pensamiento, aprendizaje</div>
          <div><strong>♀ Venus:</strong> Amor, belleza, valores, relaciones</div>
          <div><strong>♂ Marte:</strong> Energía, acción, impulso, agresión</div>
          <div><strong>♃ Júpiter:</strong> Expansión, sabiduría, suerte, filosofía</div>
          <div><strong>♄ Saturno:</strong> Estructura, disciplina, responsabilidad</div>
        </div>
      </section>

      <section className="houses-info">
        <h3>🏠 Las 12 Casas Astrológicas</h3>
        <p>Las casas representan diferentes áreas de la vida:</p>
        <div className="houses-grid">
          <div><strong>Casa 1:</strong> Personalidad, apariencia</div>
          <div><strong>Casa 2:</strong> Dinero, posesiones</div>
          <div><strong>Casa 3:</strong> Comunicación, hermanos</div>
          <div><strong>Casa 4:</strong> Hogar, familia</div>
          <div><strong>Casa 5:</strong> Creatividad, romance</div>
          <div><strong>Casa 6:</strong> Trabajo, salud</div>
          <div><strong>Casa 7:</strong> Pareja, asociaciones</div>
          <div><strong>Casa 8:</strong> Transformación, misterios</div>
          <div><strong>Casa 9:</strong> Filosofía, viajes</div>
          <div><strong>Casa 10:</strong> Carrera, reputación</div>
          <div><strong>Casa 11:</strong> Amigos, grupos</div>
          <div><strong>Casa 12:</strong> Espiritualidad, subconsciente</div>
        </div>
      </section>

      <section className="cta">
        <h3>✨ Descubre tu Carta Astral</h3>
        <p>Ingresa tus datos de nacimiento y descubre qué dicen los astros sobre ti</p>
        <Link to="/form" className="cta-button">Crear mi Carta Astral</Link>
      </section>
    </main>
  </div>
   } />
  <Route path="/" element={<App />} />
  <Route path="/chart" element={<AstrologyChart />} />
  <Route path="/planets" element={<PlanetList />} />
</Routes>
</>
</BrowserRouter>

)
}

export default App;
