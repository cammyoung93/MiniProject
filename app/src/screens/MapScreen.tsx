import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { Menu, Plus, Minus, Navigation, HelpCircle, QrCode, X, MapPin, Clock } from "lucide-react";
import Logo from "../components/Logo";
import { api } from "../api/client";
import type { Station } from "../api/types";

const LONDON: [number, number] = [51.507, -0.09];

/** Pink lightning pin (available) or dark pin (sold out) as a Leaflet divIcon. */
function pinIcon(available: boolean) {
  const fill = available ? "#f5459e" : "#3a3a3f";
  const html = `
    <div class="cc-pin">
      <svg width="34" height="44" viewBox="0 0 34 44">
        <path d="M17 0C7.6 0 0 7.5 0 16.8 0 29 17 44 17 44s17-15 17-27.2C34 7.5 26.4 0 17 0z" fill="${fill}"/>
        <path d="M19 8l-8 12h5l-2 9 8-12h-5z" fill="#fff"/>
      </svg>
    </div>`;
  return L.divIcon({
    html,
    className: "cc-pin-wrap",
    iconSize: [34, 44],
    iconAnchor: [17, 44],
  });
}

/** Small controller so custom buttons can drive the Leaflet instance. */
function MapControls() {
  const map = useMap();
  return (
    <div className="cc-map-controls">
      <button aria-label="Zoom in" onClick={() => map.zoomIn()}><Plus size={22} strokeWidth={3} /></button>
      <button aria-label="Zoom out" onClick={() => map.zoomOut()}><Minus size={22} strokeWidth={3} /></button>
      <button
        className="cc-map-controls__locate"
        aria-label="My location"
        onClick={() => map.locate({ setView: true, maxZoom: 15 })}
      >
        <Navigation size={22} fill="currentColor" />
      </button>
    </div>
  );
}

export default function MapScreen() {
  const navigate = useNavigate();
  const [stations, setStations] = useState<Station[]>([]);
  const [selected, setSelected] = useState<Station | null>(null);

  useEffect(() => {
    api.getStations().then(setStations);
  }, []);

  const markers = useMemo(
    () =>
      stations.map((s) => (
        <Marker
          key={s.id}
          position={[s.lat, s.lng]}
          icon={pinIcon(s.available > 0)}
          eventHandlers={{ click: () => setSelected(s) }}
        />
      )),
    [stations]
  );

  return (
    <div className="cc-screen cc-map">
      {/* Floating header over the map */}
      <header className="cc-map__header">
        <button className="cc-iconbtn" aria-label="Menu" onClick={() => navigate("/menu")}>
          <Menu size={26} strokeWidth={3} color="#f5459e" />
        </button>
        <Logo size={74} />
        <span style={{ width: 44 }} />
      </header>

      <MapContainer center={LONDON} zoom={12} zoomControl={false} className="cc-map__canvas">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />
        {markers}
        <MapControls />
      </MapContainer>

      {/* Station detail sheet */}
      {selected && <StationSheet station={selected} onClose={() => setSelected(null)} />}

      {/* Bottom action bar */}
      <button className="cc-help-fab" aria-label="Help" onClick={() => navigate("/chat")}>
        <HelpCircle size={26} />
      </button>
      <button className="cc-scan-btn" onClick={() => navigate("/scan")}>
        <QrCode size={24} />
        <span>Scan QR code</span>
      </button>
    </div>
  );
}

function StationSheet({ station, onClose }: { station: Station; onClose: () => void }) {
  return (
    <div className="cc-sheet">
      <button className="cc-sheet__close" aria-label="Close" onClick={onClose}>
        <X size={22} />
      </button>
      <div className="cc-sheet__head">
        <div>
          <h3 className="cc-sheet__name">{station.name}</h3>
          <p className="cc-sheet__row"><MapPin size={16} /> {station.shortName}</p>
          <p className="cc-sheet__row"><Clock size={16} /> {station.hours}</p>
        </div>
        <div className="cc-sheet__logo">{station.name.slice(0, 2).toUpperCase()}</div>
      </div>
      <div className="cc-sheet__foot">
        <div className="cc-sheet__stat">
          Available <b className="cc-green">{station.available}</b>
        </div>
        <div className="cc-sheet__stat">
          Empty <b className="cc-pinktext">{station.empty}</b>
        </div>
        <button className="cc-sheet__dir">Get Direction</button>
      </div>
    </div>
  );
}
