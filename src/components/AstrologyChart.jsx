import { useState } from "react";

const NominatimSearch = ({onSeleccionarLugar, onCambiarHorario, onCambiarFecha}) => {
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState({
    hora: "",
    minutos: "",
    conoceHorario: true  
  });

  const buscarLugares = async (query) => {
    if (query.length < 3) {
      setSugerencias([]);
      setMostrarSugerencias(false);
      return;
    }
    setCargando(true);
    try {
      const proxyUrl = "https://corsproxy.io/?";
      const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`;

      const response = await fetch(proxyUrl + apiUrl);
      const data = await response.json();

      const LugaresFormateados = data.map(item => ({
        nombre: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        id: item.place_id
      }));

      setSugerencias(LugaresFormateados);
      setMostrarSugerencias(true);
    } catch (error) {
      console.error("Error buscando lugares:", error);
      setSugerencias([]);
      setMostrarSugerencias(false); 
    } finally {
      setCargando(false);
    }
  };

  const handleInputChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    setTimeout(() => {
      buscarLugares(valor);
    }, 300);
  };

  const seleccionarLugar = (lugar) => {
    setBusqueda(lugar.nombre);
    setMostrarSugerencias(false);
    if (onSeleccionarLugar) {
      onSeleccionarLugar(lugar);
    }
  };

  const handleFechaChange = (e) => {
    const nuevaFecha = e.target.value;
    setFecha(nuevaFecha);
    if (onCambiarFecha) {
      onCambiarFecha(nuevaFecha);
    }
  };

  const handleHorarioChange = (campo, valor) => {
    const nuevoHorario = {...horario, [campo]: valor};
    setHorario(nuevoHorario);

    if (onCambiarHorario) {
      onCambiarHorario(nuevoHorario);
    }
  };
 
  const toggleConoceHorario = () => {
    const nuevoEstado = !horario.conoceHorario;
    const nuevoHorario = {
      ...horario,
      conoceHorario: nuevoEstado,
      hora: nuevoEstado ? horario.hora : "12",
      minutos: nuevoEstado ? horario.minutos: "00"
    };
    setHorario(nuevoHorario);
    if (onCambiarHorario) {
      onCambiarHorario(nuevoHorario);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar Lugar de Nacimiento..."
          value={busqueda}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        
        {cargando && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
          </div>
        )}
        
        {mostrarSugerencias && sugerencias.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {sugerencias.map((lugar) => (
              <div
                key={lugar.id}
                onClick={() => seleccionarLugar(lugar)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
              >
                {lugar.nombre}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          id="fechaNacimiento"
          value={fecha}
          onChange={handleFechaChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="conoceHorario"
            checked={horario.conoceHorario}
            onChange={toggleConoceHorario}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="conoceHorario" className="text-sm font-medium text-gray-700">
            Conozco la hora exacta de nacimiento
          </label>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Hora:</label>
            <select
              value={horario.hora}
              onChange={(e) => handleHorarioChange('hora', e.target.value)}
              disabled={!horario.conoceHorario}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">--</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i.toString().padStart(2, '0')}>
                  {i.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Minutos:</label>
            <select
              value={horario.minutos}
              onChange={(e) => handleHorarioChange('minutos', e.target.value)}
              disabled={!horario.conoceHorario}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">--</option>
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i.toString().padStart(2, '0')}>
                  {i.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!horario.conoceHorario && (
          <div className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-md border border-yellow-200">
            <p className="font-medium text-yellow-800">⚠️ Horario aproximado</p>
            <p>Se usará 12:00 como horario predeterminado. La carta astral será menos precisa sin la hora exacta.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente para mostrar la carta astral
const CartaAstralVisual = ({ planetas }) => {
  if (!planetas || planetas.length === 0) {
    return null;
  }

  const radius = 180;
  const centerX = 200;
  const centerY = 200;

  return (
    <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Carta Astral</h3>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Círculo zodiacal */}
        <div className="flex-1">
          <svg width="400" height="400" viewBox="0 0 400 400" className="border rounded-lg">
            {/* Círculo exterior */}
            <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#e5e7eb" strokeWidth="2"/>
            
            {/* Líneas de los signos zodiacales */}
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i * 30) - 90; // -90 para empezar en Aries (arriba)
              const x1 = centerX + (radius - 20) * Math.cos(angle * Math.PI / 180);
              const y1 = centerY + (radius - 20) * Math.sin(angle * Math.PI / 180);
              const x2 = centerX + radius * Math.cos(angle * Math.PI / 180);
              const y2 = centerY + radius * Math.sin(angle * Math.PI / 180);
              
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d1d5db" strokeWidth="1"/>
              );
            })}
            
            {/* Nombres de los signos */}
            {['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 
              'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'].map((signo, i) => {
              const angle = (i * 30 + 15) - 90; // Centro de cada signo
              const x = centerX + (radius - 10) * Math.cos(angle * Math.PI / 180);
              const y = centerY + (radius - 10) * Math.sin(angle * Math.PI / 180);
              
              return (
                <text key={signo} x={x} y={y} textAnchor="middle" dominantBaseline="middle" 
                      className="text-xs font-medium fill-gray-600">
                  {signo}
                </text>
              );
            })}
            
            {/* Planetas */}
            {planetas.map((planeta, i) => {
              const angle = planeta.longitudEclitica - 90; // Convertir a posición visual
              const x = centerX + (radius - 40) * Math.cos(angle * Math.PI / 180);
              const y = centerY + (radius - 40) * Math.sin(angle * Math.PI / 180);
              
              return (
                <g key={planeta.nombre}>
                  <circle cx={x} cy={y} r="6" fill={planeta.color} stroke="white" strokeWidth="2"/>
                  <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" 
                        className="text-xs font-bold fill-white">
                    {planeta.simbolo}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Tabla de posiciones */}
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Posiciones Planetarias</h4>
            <div className="space-y-2">
              {planetas.map((planeta) => (
                <div key={planeta.nombre} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" style={{ color: planeta.color }}>
                      {planeta.simbolo}
                    </span>
                    <span className="font-medium">{planeta.nombre}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{planeta.signo}</div>
                    <div className="text-xs text-gray-500">
                      {planeta.gradosEnSigno.toFixed(1)}°
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const AstrologyChart = () => {
  const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [planetasCalculados, setPlanetasCalculados] = useState([]);

  const obtenerSignoZodiacal = (longitudEclitica) => {
    const signos = [
      'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo',
      'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'
    ];
    
    // Normalizar la longitud eclíptica a 0-360 grados
    let longitud = longitudEclitica;
    while (longitud < 0) longitud += 360;
    while (longitud >= 360) longitud -= 360;
    
    // Cada signo ocupa 30 grados
    const indiceSigno = Math.floor(longitud / 30);
    const gradosEnSigno = longitud % 30;
    
    return {
      signo: signos[indiceSigno],
      gradosEnSigno: gradosEnSigno
    };
  };

  // Función simulada para calcular posiciones planetarias
  const calcularPosicionesPlanetarias = (fecha, hora, minutos) => {
    // Esta es una simulación - en una aplicación real usarías una biblioteca astronómica
    const planetas = [
      { nombre: 'Sol', simbolo: '☉', color: '#FFA500' },
      { nombre: 'Luna', simbolo: '☽', color: '#C0C0C0' },
      { nombre: 'Mercurio', simbolo: '☿', color: '#87CEEB' },
      { nombre: 'Venus', simbolo: '♀', color: '#FFC0CB' },
      { nombre: 'Marte', simbolo: '♂', color: '#FF4500' },
      { nombre: 'Júpiter', simbolo: '♃', color: '#DAA520' },
      { nombre: 'Saturno', simbolo: '♄', color: '#808080' },
      { nombre: 'Urano', simbolo: '♅', color: '#4FD0E3' },
      { nombre: 'Neptuno', simbolo: '♆', color: '#4169E1' },
      { nombre: 'Plutón', simbolo: '♇', color: '#8B4513' }
    ];

    return planetas.map((planeta, index) => {
      // Simulación de posiciones basada en la fecha y hora
      const baseAngle = (index * 36) + (new Date(fecha).getTime() % 360);
      const longitudEclitica = (baseAngle + (parseInt(hora) || 12) * 15 + (parseInt(minutos) || 0) * 0.25) % 360;
      
      const { signo, gradosEnSigno } = obtenerSignoZodiacal(longitudEclitica);
      
      return {
        ...planeta,
        signo,
        gradosEnSigno,
        longitudEclitica
      };
    });
  };

  const calcularCartaAstral = () => {
    if (!fechaSeleccionada || !lugarSeleccionado) {
      alert('Por favor, selecciona una fecha y un lugar de nacimiento');
      return;
    }

    const hora = horarioSeleccionado?.hora || '12';
    const minutos = horarioSeleccionado?.minutos || '00';

    try {
      const posicionesPlanetas = calcularPosicionesPlanetarias(fechaSeleccionada, hora, minutos);
      setPlanetasCalculados(posicionesPlanetas);
    } catch (error) {
      console.error('Error calculando carta astral:', error);
      alert('Error al calcular la carta astral. Por favor, verifica los datos.');
    }
  };

  const handleSeleccionarLugar = (lugar) => {
    setLugarSeleccionado(lugar);
  };

  const handleCambiarHorario = (horario) => {
    setHorarioSeleccionado(horario);
  };

  const handleCambiarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        🌟 Carta Astrológica Completa
      </h1>
      <h2>Los Datos Astrologicos de este calculo son INCORRECTOS.</h2>
<h3> la utilice para practicar un proyecto a perfeccionar en el futuro</h3>      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Datos de Nacimiento
        </h2>
        
        <NominatimSearch 
          onSeleccionarLugar={handleSeleccionarLugar}
          onCambiarHorario={handleCambiarHorario}
          onCambiarFecha={handleCambiarFecha}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {fechaSeleccionada && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-800">📅 Fecha</h3>
              <p className="text-purple-700">{fechaSeleccionada}</p>
            </div>
          )}
          
          {lugarSeleccionado && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800">📍 Lugar</h3>
              <p className="text-green-700 text-sm">{lugarSeleccionado.nombre}</p>
              <p className="text-xs text-green-600">
                {lugarSeleccionado.lat.toFixed(2)}°, {lugarSeleccionado.lon.toFixed(2)}°
              </p>
            </div>
          )}
          
          {horarioSeleccionado && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800">🕐 Horario</h3>
              <p className="text-blue-700">
                {horarioSeleccionado.conoceHorario 
                  ? `${horarioSeleccionado.hora}:${horarioSeleccionado.minutos}` 
                  : "12:00 (aproximado)"}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={calcularCartaAstral}
          className="mt-6 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          ✨ Calcular Carta Astral Completa
        </button>
      </div>

      <CartaAstralVisual planetas={planetasCalculados} />

      {planetasCalculados.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Interpretación Básica</h3>
          <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
            <p className="font-medium text-blue-800 mb-2">ℹ️ Nota importante:</p>
            <p>Esta es una versión simplificada de cálculo astrológico. Para una carta astral precisa y completa, se recomienda consultar con un astrólogo profesional o usar software astronómico especializado que tenga en cuenta factores como:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Cálculos astronómicos precisos</li>
              <li>Casas astrológicas</li>
              <li>Aspectos planetarios</li>
              <li>Correcciones de zona horaria</li>
              <li>Nodos lunares y otros puntos astrológicos</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AstrologyChart;