import React, { useState, useEffect } from 'react';
import { Train, Anchor, AlertTriangle, ShieldCheck, MapPin, Radio, Sparkles } from 'lucide-react';

const STATIONS = [
  { id: "ALUVA", name: "Aluva Terminal", tamil: "ஆலுவா", type: "metro", x: 70, y: 55, alert: null, signal: 'green' },
  { id: "KALAMASSERY", name: "Kalamassery", tamil: "களமசேரி", type: "metro", x: 210, y: 55, alert: "Pier 412 TSR Notice (P1)", signal: 'red' },
  { id: "MUTTOM", name: "Muttom Depot & Yard", tamil: "முட்டம் பணிமனை", type: "depot", x: 350, y: 55, alert: "TS-07 Bogie Warranty", signal: 'amber' },
  { id: "EDAPPALLY", name: "Edappally Junction", tamil: "இடப்பள்ளி", type: "metro", x: 490, y: 55, alert: "Station Cleaning SOP", signal: 'green' },
  { id: "JLN_STADIUM", name: "JLN Stadium (Pink Line)", tamil: "ஜே.எல்.என் அரங்கம்", type: "junction", x: 630, y: 55, alert: "Phase 2 Land Sanction", signal: 'amber' },
  { id: "MAHARAJAS", name: "Maharaja's College", tamil: "மகாராஜாஸ்", type: "metro", x: 770, y: 55, alert: "Farebox AFC Audit", signal: 'green' },
  { id: "TRIPUNITHURA", name: "Tripunithura Terminal", tamil: "திருப்புனித்துறை", type: "metro", x: 910, y: 55, alert: "RTI Tree Audit", signal: 'red' },
];

const WATER_JETTIES = [
  { id: "FORT_KOCHI", name: "Fort Kochi Jetty", tamil: "ஃபோர்ட் கொச்சி", x: 130, y: 135, alert: "Battery Temp Warning" },
  { id: "BOLGATTY", name: "Bolgatty Island", tamil: "போல்ஹட்டி தீவு", x: 370, y: 135, alert: "33kV Feeder Sanction" },
  { id: "VYTTILA", name: "Vyttila Hub Jetty", tamil: "வைட்டிலா முனையம்", x: 610, y: 135, alert: "LTO Battery Tender" },
  { id: "KAKKANAD", name: "Kakkanad Jetty", tamil: "காக்கநாடு", x: 850, y: 135, alert: null },
];

export function MetroRouteMap({ onSelectDoc, selectedDocId, documents = [] }) {
  const [trainPos, setTrainPos] = useState(70);

  // Train automatic patrol animation along rail track
  useEffect(() => {
    const interval = setInterval(() => {
      setTrainPos(prev => (prev >= 910 ? 70 : prev + 3));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate Sleeper Crossties along the 960px rail track
  const sleepers = [];
  for (let sx = 40; sx <= 940; sx += 14) {
    sleepers.push(sx);
  }

  // Generate Depot branch sleepers
  const depotSleepers = [];
  for (let dsx = 310; dsx <= 420; dsx += 12) {
    depotSleepers.push(dsx);
  }

  return (
    <div className="railway-track-card">
      {/* Top Bar: Title & Signal Legend */}
      <div className="track-card-header">
        <div className="track-header-left">
          <div className="track-icon-badge">
            <Train size={18} color="#0f172a" />
          </div>
          <div>
            <h3 className="track-card-title">
              KMRL Live Rail Operations & Document Alert Network
            </h3>
            <p className="track-card-subtitle">
              Authentic Line 1 Track Layout (Aluva ⇄ Tripunithura) & Integrated Water Metro Channel
            </p>
          </div>
        </div>

        <div className="track-legend-wrap">
          <div className="legend-item">
            <span className="signal-led signal-led-green"></span>
            <span>Line Clear</span>
          </div>
          <div className="legend-item">
            <span className="signal-led signal-led-amber"></span>
            <span>Speed Caution</span>
          </div>
          <div className="legend-item">
            <span className="signal-led signal-led-red"></span>
            <span>P1 Safety Alert</span>
          </div>
          <div className="legend-divider"></div>
          <div className="legend-item">
            <span className="water-line-sample"></span>
            <span>Water Metro (15 Jetties)</span>
          </div>
        </div>
      </div>

      {/* Realistic Rail Track Canvas (SVG) with Responsive Overflow Handling */}
      <div className="track-canvas-container">
        <div className="track-svg-scroll-wrapper">
          <svg viewBox="0 0 1000 170" className="railway-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Realistic Steel Rail Gradients */}
              <linearGradient id="steelRailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="35%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              <linearGradient id="sleeperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>

              <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* ================= 1. BALLAST GRAVEL BED ================= */}
            <path
              d="M 30,55 L 950,55"
              stroke="#cbd5e1"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M 30,55 L 950,55"
              stroke="#e2e8f0"
              strokeWidth="20"
              strokeDasharray="2,3"
              strokeLinecap="round"
            />

            {/* ================= 2. CROSS SLEEPERS (TIES) ================= */}
            {sleepers.map((sx) => (
              <g key={`sleeper-${sx}`}>
                <rect
                  x={sx - 3.5}
                  y="45"
                  width="7"
                  height="20"
                  rx="1.5"
                  fill="url(#sleeperGrad)"
                  stroke="#0f172a"
                  strokeWidth="0.5"
                />
                <circle cx={sx} cy="49" r="1" fill="#cbd5e1" />
                <circle cx={sx} cy="61" r="1" fill="#cbd5e1" />
              </g>
            ))}

            {/* ================= 3. MUTTOM DEPOT TURNOUT SIDING ================= */}
            <path
              d="M 310,55 Q 350,55 365,72 L 420,72"
              stroke="#cbd5e1"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            {depotSleepers.map((dsx) => (
              <rect
                key={`depot-sl-${dsx}`}
                x={dsx - 3}
                y="65"
                width="6"
                height="14"
                rx="1"
                fill="url(#sleeperGrad)"
                stroke="#0f172a"
                strokeWidth="0.5"
              />
            ))}
            <path
              d="M 310,51 Q 350,51 365,68 L 420,68"
              stroke="url(#steelRailGrad)"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 310,59 Q 350,59 365,76 L 420,76"
              stroke="url(#steelRailGrad)"
              strokeWidth="2.5"
              fill="none"
            />

            {/* ================= 4. DUAL CONTINUOUS STEEL RAILS ================= */}
            <line x1="30" y1="49" x2="950" y2="49" stroke="url(#steelRailGrad)" strokeWidth="3" strokeLinecap="round" />
            <line x1="30" y1="61" x2="950" y2="61" stroke="url(#steelRailGrad)" strokeWidth="3" strokeLinecap="round" />

            {/* ================= 5. WATER METRO CHANNEL ================= */}
            <rect x="30" y="125" width="920" height="20" rx="10" fill="#f0f9ff" />
            <path
              d="M 40,135 L 940,135"
              stroke="url(#waterGrad)"
              strokeWidth="3.5"
              strokeDasharray="6,4"
            />

            {/* ================= 6. LIVE MOVING KOCHI METRO TRAIN ================= */}
            <g transform={`translate(${trainPos}, 42)`}>
              <rect
                x="-24"
                y="2"
                width="48"
                height="18"
                rx="4"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
              <rect x="-18" y="5" width="8" height="6" rx="1" fill="#e0f2fe" />
              <rect x="-6" y="5" width="8" height="6" rx="1" fill="#e0f2fe" />
              <rect x="6" y="5" width="8" height="6" rx="1" fill="#e0f2fe" />
              <circle cx="21" cy="8" r="2.5" fill="#fef08a" filter="url(#glowGreen)" />
              <circle cx="21" cy="14" r="2.5" fill="#fef08a" filter="url(#glowGreen)" />
              <path d="M 0,2 L -4,-3 L 4,-3 L 0,2" stroke="#94a3b8" strokeWidth="1" fill="none" />
            </g>

            {/* ================= 7. STATIONS, SIGNALS & TAMIL LABELS ================= */}
            {STATIONS.map((stn) => {
              const hasAlert = Boolean(stn.alert);
              const isP1 = stn.signal === 'red';

              return (
                <g key={stn.id} className="station-group" style={{ cursor: 'pointer' }}>
                  {/* Railway Signal Post */}
                  <line x1={stn.x + 12} y1="36" x2={stn.x + 12} y2="48" stroke="#334155" strokeWidth="1.5" />
                  <rect x={stn.x + 8} y="26" width="8" height="12" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="0.5" />
                  <circle
                    cx={stn.x + 12}
                    cy="32"
                    r="2.5"
                    fill={stn.signal === 'green' ? '#16a34a' : stn.signal === 'amber' ? '#d97706' : '#dc2626'}
                    filter={stn.signal === 'green' ? "url(#glowGreen)" : "url(#glowRed)"}
                  />

                  {/* Station Platform Marker */}
                  <rect
                    x={stn.x - 10}
                    y="48"
                    width="20"
                    height="14"
                    rx="3"
                    fill="#ffffff"
                    stroke={hasAlert ? '#dc2626' : '#0f172a'}
                    strokeWidth="2"
                  />
                  <circle
                    cx={stn.x}
                    cy="55"
                    r="3.5"
                    fill={hasAlert ? '#dc2626' : stn.type === 'depot' ? '#d97706' : '#059669'}
                  />

                  {/* Station English & Tamil Names */}
                  <text
                    x={stn.x}
                    y="13"
                    fill="#0f172a"
                    fontSize="11"
                    fontWeight="800"
                    textAnchor="middle"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                  >
                    {stn.name}
                  </text>
                  <text
                    x={stn.x}
                    y="23"
                    fill="#475569"
                    fontSize="8.5"
                    fontWeight="700"
                    textAnchor="middle"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                  >
                    {stn.tamil}
                  </text>

                  {/* Urgent Document Alert Tag */}
                  {hasAlert && (
                    <g transform={`translate(${stn.x}, 78)`}>
                      <rect
                        x="-65"
                        y="0"
                        width="130"
                        height="17"
                        rx="4"
                        fill={isP1 ? "#fef2f2" : "#fffbeb"}
                        stroke={isP1 ? "#fca5a5" : "#fde68a"}
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="11.5"
                        fill={isP1 ? "#991b1b" : "#92400e"}
                        fontSize="8.5"
                        fontWeight="700"
                        textAnchor="middle"
                        fontFamily="'JetBrains Mono', monospace"
                      >
                        ⚠ {stn.alert}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* ================= 8. WATER METRO JETTIES WITH TAMIL ================= */}
            {WATER_JETTIES.map((jty) => {
              const hasAlert = Boolean(jty.alert);
              return (
                <g key={jty.id} className="jetty-group" style={{ cursor: 'pointer' }}>
                  {/* Jetty Pier Post */}
                  <rect x={jty.x - 6} y="130" width="12" height="10" rx="2" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
                  <circle cx={jty.x} cy={135} r="2.5" fill="#ffffff" />
                  
                  {/* Jetty Title (English + Tamil) */}
                  <text
                    x={jty.x}
                    y="154"
                    fill="#0369a1"
                    fontSize="9.5"
                    fontWeight="700"
                    textAnchor="middle"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                  >
                    ⚓ {jty.name} ({jty.tamil})
                  </text>

                  {hasAlert && (
                    <text
                      x={jty.x}
                      y="164"
                      fill="#b45309"
                      fontSize="8"
                      fontWeight="700"
                      textAnchor="middle"
                      fontFamily="'JetBrains Mono', monospace"
                    >
                      • {jty.alert}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
