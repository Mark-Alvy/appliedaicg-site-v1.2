// Original illustration: four stacked operating layers (people, workflows, data, models)
// joined by agent nodes. Replace with the brand illustration when the source file arrives.
export default function HeroArt() {
  const layers = [
    { y: 40, label: "People and decisions", fill: "#0b1f3a" },
    { y: 120, label: "Workflows", fill: "#143a6b" },
    { y: 200, label: "Data and systems", fill: "#1e6fe8" },
    { y: 280, label: "Models and agents", fill: "#5aa2ff" },
  ];
  return (
    <svg viewBox="0 0 640 420" className="w-full h-auto" role="img" aria-label="Diagram of four connected operating layers: people and decisions, workflows, data and systems, models and agents">
      <defs>
        <linearGradient id="glow" x1="0" x2="1">
          <stop offset="0" stopColor="#1e6fe8" stopOpacity="0" />
          <stop offset="0.5" stopColor="#1e6fe8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#1e6fe8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {layers.map((l, i) => (
        <g key={l.label} transform={`translate(0 ${l.y})`}>
          <polygon points="140,0 500,0 600,60 240,60" fill={l.fill} opacity={0.95 - i * 0.08} />
          <polygon points="140,0 500,0 500,6 140,6" fill="#ffffff" opacity="0.12" />
          <text x="300" y="40" fill="#ffffff" fontSize="16" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">{l.label}</text>
        </g>
      ))}
      {/* agent spine connecting the layers */}
      <rect x="228" y="30" width="4" height="320" fill="url(#glow)" />
      {[70, 150, 230, 310].map((y, i) => (
        <g key={y}>
          <circle cx="230" cy={y} r="9" fill="#ffffff" />
          <circle cx="230" cy={y} r="5" fill={i % 2 ? "#1e6fe8" : "#0b1f3a"} />
        </g>
      ))}
      {/* measurement ticks on the right */}
      {[90, 170, 250, 330].map((y) => (
        <g key={y}>
          <line x1="560" y1={y} x2="600" y2={y} stroke="#1e6fe8" strokeWidth="2" />
          <circle cx="606" cy={y} r="4" fill="#1e6fe8" />
        </g>
      ))}
      <text x="548" y="385" fill="#4b5872" fontSize="12" fontFamily="Inter, system-ui, sans-serif" textAnchor="end">baseline and measure at every gate</text>
    </svg>
  );
}
