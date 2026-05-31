import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix pour les icônes Leaflet dans React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ chantiers }) => {
  // Centre de la carte (Lyon, France par défaut)
  const center = [45.75, 4.85];

  // Fonction pour obtenir des coordonnées approximatives (à améliorer avec un vrai service de géocodage)
  const getCoordinates = (address) => {
    // Pour l'instant, on retourne des coordonnées aléatoires autour de Lyon
    // TODO: Intégrer un service de géocodage (Nominatim, Google Maps, etc.)
    const baseLat = 45.75;
    const baseLng = 4.85;
    const randomLat = baseLat + (Math.random() - 0.5) * 0.2;
    const randomLng = baseLng + (Math.random() - 0.5) * 0.2;
    return [randomLat, randomLng];
  };

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {chantiers && chantiers.map((chantier) => {
          const coords = getCoordinates(chantier.address);
          return (
            <Marker key={chantier.id} position={coords}>
              <Popup>
                <div>
                  <h3>{chantier.client}</h3>
                  <p><strong>📍</strong> {chantier.address}</p>
                  <p><strong>Type:</strong> {chantier.type}</p>
                  <p><strong>Statut:</strong> {chantier.status}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
