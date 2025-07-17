import React from 'react';

const AstrologyChart = ({ birthData }) => {
  // birthData debería contener: { lugar, fecha, hora, minutos, conoceHorario }
  
  return (
    <div className="astrology-chart-container">
      <h2 className="text-2xl font-bold mb-4">Carta Astral</h2>
      
      {birthData ? (
        <div className="birth-info bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Datos de Nacimiento:</h3>
          <ul className="space-y-1">
            <li><strong>Lugar:</strong> {birthData.lugar?.nombre || 'No especificado'}</li>
            <li><strong>Fecha:</strong> {birthData.fecha || 'No especificada'}</li>
            <li><strong>Hora:</strong> {
              birthData.conoceHorario 
                ? `${birthData.hora}:${birthData.minutos}` 
                : '12:00 (aproximado)'
            }</li>
            {birthData.lugar && (
              <>
                <li><strong>Latitud:</strong> {birthData.lugar.lat}</li>
                <li><strong>Longitud:</strong> {birthData.lugar.lon}</li>
              </>
            )}
          </ul>
        </div>
      ) : (
        <div className="text-gray-500">
          <p>Complete los datos de nacimiento para generar la carta astral.</p>
        </div>
      )}
      
      {/* Aquí irá la lógica para generar la carta astral */}
      <div className="chart-placeholder mt-6 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
        <p className="text-gray-500">Carta astral se generará aquí</p>
      </div>
    </div>
  );
};

export default AstrologyChart;