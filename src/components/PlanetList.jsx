import { useState } from "react";

const PlanetList = () => {
  
  return (
    <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <h2>🌌 Lista Completa de Astros y Puntos Astrológicos</h2>
      
      <section>
        <h3>🌟 Luminarias</h3>
        <div style={{marginBottom: '20px'}}>
          <div><strong>☉ Sol:</strong> Identidad, ego, propósito vital, conciencia</div>
          <div><strong>☽ Luna:</strong> Emociones, intuición, subconsciente, madre</div>
        </div>
      </section>

      <section>
        <h3>🪐 Planetas Personales</h3>
        <div style={{marginBottom: '20px'}}>
          <div><strong>☿ Mercurio:</strong> Comunicación, pensamiento, aprendizaje, hermanos</div>
          <div><strong>♀ Venus:</strong> Amor, belleza, valores, relaciones, arte</div>
          <div><strong>♂ Marte:</strong> Energía, acción, impulso, agresión, deseo</div>
        </div>
      </section>

      <section>
        <h3>🌍 Planetas Sociales</h3>
        <div style={{marginBottom: '20px'}}>
          <div><strong>♃ Júpiter:</strong> Expansión, sabiduría, suerte, filosofía, crecimiento</div>
          <div><strong>♄ Saturno:</strong> Estructura, disciplina, responsabilidad, límites</div>
        </div>
      </section>

      <section>
        <h3>🌌 Planetas Transpersonales</h3>
        <div style={{marginBottom: '20px'}}>
          <div><strong>♅ Urano:</strong> Innovación, cambio, rebelión, tecnología</div>
          <div><strong>♆ Neptuno:</strong> Espiritualidad, ilusión, arte, compasión</div>
          <div><strong>♇ Plutón:</strong> Transformación, poder, regeneración, muerte/renacimiento</div>
        </div>
      </section>

      <section>
        <h3>🌙 Puntos Lunares</h3>
        <div style={{marginBottom: '20px'}}>
          <div><strong>☊ Nodo Norte:</strong> Propósito kármico, hacia dónde evolucionar</div>
          <div><strong>☋ Nodo Sur:</strong> Talentos pasados, karma a superar</div>
          <div><strong>⚸ Lilith (Luna Negra):</strong> Lado oscuro, rebeldía, sexualidad reprimida</div>
          <div><strong>🌙 Selena (Luna Blanca):</strong> Luz interior, protección angelical</div>
        </div>
      </section>

      <section>
        <h3>🔥 Asteroides Principales</h3>
        <div style={{marginBottom: '20px'}}>
          <div><strong>⚵ Ceres:</strong> Nutrición, maternidad, cuidado, alimentación</div>
          <div><strong>⚴ Pallas:</strong> Sabiduría, estrategia, creatividad, justicia</div>
          <div><strong>⚶ Juno:</strong> Matrimonio, compromiso, pareja, lealtad</div>
          <div><strong>⚷ Vesta:</strong> Devoción, servicio, virginidad, fuego sagrado</div>
        </div>
      </section>

      <section>
        <h3>🌟 Otros Asteroides Importantes</h3>
        <div style={{marginBottom: '20px'}}>
          <div><strong>⚸ Chiron:</strong> Sanador herido, trauma, curación, maestro</div>
          <div><strong>⚹ Hygiea:</strong> Salud, higiene, prevención, bienestar</div>
          <div><strong>⚹ Hygiea:</strong> Salud, higiene, prevención, bienestar</div>
        </div>
      </section>
    </div>
  );
};

export { PlanetList };