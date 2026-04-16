import { useEffect, useState } from "react";

const RAYS_OUTER = [
  { angle: 0,   color: "#FF6B35", w: 14, h: 110, delay: 0 },
  { angle: 45,  color: "#FFD700", w: 10, h: 90,  delay: 0.1 },
  { angle: 90,  color: "#FF3CAC", w: 14, h: 110, delay: 0.2 },
  { angle: 135, color: "#2AF598", w: 10, h: 90,  delay: 0.3 },
  { angle: 180, color: "#FF6B35", w: 14, h: 110, delay: 0.4 },
  { angle: 225, color: "#FFD700", w: 10, h: 90,  delay: 0.5 },
  { angle: 270, color: "#FF3CAC", w: 14, h: 110, delay: 0.6 },
  { angle: 315, color: "#2AF598", w: 10, h: 90,  delay: 0.7 },
];

const RAYS_MID = [
  { angle: 22.5,  color: "#FFA500", w: 8, h: 72, delay: 0 },
  { angle: 67.5,  color: "#00C9FF", w: 8, h: 72, delay: 0.15 },
  { angle: 112.5, color: "#FFA500", w: 8, h: 72, delay: 0.3 },
  { angle: 157.5, color: "#00C9FF", w: 8, h: 72, delay: 0.45 },
  { angle: 202.5, color: "#FFA500", w: 8, h: 72, delay: 0.6 },
  { angle: 247.5, color: "#00C9FF", w: 8, h: 72, delay: 0.75 },
  { angle: 292.5, color: "#FFA500", w: 8, h: 72, delay: 0.9 },
  { angle: 337.5, color: "#00C9FF", w: 8, h: 72, delay: 1.05 },
];

const SPARKLES = [
  { x: "18%", y: "12%", size: 18, color: "#FFD700", delay: 0 },
  { x: "82%", y: "18%", size: 14, color: "#FF3CAC", delay: 0.5 },
  { x: "10%", y: "78%", size: 12, color: "#00C9FF", delay: 1 },
  { x: "88%", y: "72%", size: 16, color: "#2AF598", delay: 0.3 },
  { x: "50%", y: "5%",  size: 10, color: "#FF6B35", delay: 0.8 },
  { x: "5%",  y: "45%", size: 12, color: "#FFD700", delay: 1.2 },
  { x: "95%", y: "50%", size: 14, color: "#FF3CAC", delay: 0.6 },
  { x: "70%", y: "92%", size: 10, color: "#2AF598", delay: 1.5 },
  { x: "28%", y: "90%", size: 13, color: "#00C9FF", delay: 0.2 },
];

function SparkleIcon({ size, color, delay }: { size: number; color: string; delay: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{
        animation: `sparkle 2.5s ease-in-out ${delay}s infinite`,
        filter: `drop-shadow(0 0 4px ${color})`,
      }}
    >
      <path d="M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z" />
    </svg>
  );
}

function Ray({ angle, color, w, h, delay }: { angle: number; color: string; w: number; h: number; delay: number }) {
  const rad = (angle * Math.PI) / 180;
  const cx = 200;
  const cy = 200;
  const gap = 72;
  const x1 = cx + Math.cos(rad) * gap;
  const y1 = cy + Math.sin(rad) * gap;
  const x2 = cx + Math.cos(rad) * (gap + h);
  const y2 = cy + Math.sin(rad) * (gap + h);

  const perpX = -Math.sin(rad) * (w / 2);
  const perpY = Math.cos(rad) * (w / 2);

  const tipX = x2 + Math.cos(rad) * 20;
  const tipY = y2 + Math.sin(rad) * 20;

  return (
    <polygon
      points={`
        ${x1 + perpX},${y1 + perpY}
        ${x1 - perpX},${y1 - perpY}
        ${tipX},${tipY}
      `}
      fill={color}
      opacity="0.92"
      style={{
        transformOrigin: `${cx}px ${cy}px`,
        animation: `ray-pulse 2.2s ease-in-out ${delay}s infinite`,
        filter: `drop-shadow(0 0 6px ${color}88)`,
      }}
    />
  );
}

export default function Index() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center font-nunito relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b4b 70%, #0a2744 100%)",
      }}
    >
      {/* Фоновое свечение */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,180,0,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Искры по углам */}
      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: s.x, top: s.y, transform: "translate(-50%, -50%)" }}
        >
          <SparkleIcon size={s.size} color={s.color} delay={s.delay} />
        </div>
      ))}

      {/* Основной логотип */}
      <div
        className="flex flex-col items-center gap-0"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* SVG эмблема */}
        <div className="relative" style={{ width: 400, height: 400 }}>
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            style={{ overflow: "visible" }}
          >
            <defs>
              <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#FFE566" />
                <stop offset="65%" stopColor="#FFB800" />
                <stop offset="100%" stopColor="#FF7A00" />
              </radialGradient>
              <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFB800" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Внешнее свечение */}
            <circle cx="200" cy="200" r="155" fill="url(#outerGlow)" />

            {/* Группа медленного вращения (длинные лучи) */}
            <g style={{ animation: "ray-spin 28s linear infinite", transformOrigin: "200px 200px" }}>
              {RAYS_OUTER.map((r, i) => (
                <Ray key={i} {...r} />
              ))}
            </g>

            {/* Группа среднего обратного вращения (короткие лучи) */}
            <g style={{ animation: "ray-spin-reverse 18s linear infinite", transformOrigin: "200px 200px" }}>
              {RAYS_MID.map((r, i) => (
                <Ray key={i} {...r} />
              ))}
            </g>

            {/* Декоративное кольцо */}
            <circle
              cx="200" cy="200" r="70"
              fill="none"
              stroke="rgba(255,215,0,0.3)"
              strokeWidth="2"
              strokeDasharray="8 6"
              style={{ animation: "ray-spin 12s linear infinite", transformOrigin: "200px 200px" }}
            />

            {/* Ядро — основной круг */}
            <circle
              cx="200" cy="200" r="64"
              fill="url(#coreGrad)"
              filter="url(#glow)"
              style={{ animation: "core-glow 3s ease-in-out infinite" }}
            />

            {/* Блик на ядре */}
            <ellipse
              cx="184" cy="180" rx="22" ry="14"
              fill="rgba(255,255,255,0.55)"
              style={{ transform: "rotate(-20deg)", transformOrigin: "184px 180px" }}
            />
          </svg>
        </div>

        {/* Название */}
        <div
          className="text-center -mt-8"
          style={{
            animation: visible ? "float-up 0.9s ease-out 0.3s both" : "none",
          }}
        >
          <h1
            className="font-nunito font-black tracking-widest uppercase"
            style={{
              fontSize: "clamp(56px, 12vw, 96px)",
              letterSpacing: "0.18em",
              background: "linear-gradient(90deg, #FFD700 0%, #FF9500 25%, #FF3CAC 50%, #00C9FF 75%, #2AF598 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3s linear infinite",
              filter: "drop-shadow(0 2px 16px rgba(255,180,0,0.4))",
              lineHeight: 1,
            }}
          >
            ЛУЧИК
          </h1>
          <p
            className="font-nunito-sans font-semibold mt-3 tracking-[0.35em] uppercase"
            style={{
              fontSize: "clamp(12px, 2.5vw, 16px)",
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.35em",
            }}
          >
            Летний лагерь
          </p>
        </div>

        {/* Цветные точки-декор */}
        <div
          className="flex gap-3 mt-6"
          style={{
            animation: visible ? "float-up 0.9s ease-out 0.55s both" : "none",
          }}
        >
          {["#FF6B35", "#FFD700", "#FF3CAC", "#00C9FF", "#2AF598"].map((c, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 10,
                height: 10,
                background: c,
                boxShadow: `0 0 8px ${c}`,
                animation: `sparkle 2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
