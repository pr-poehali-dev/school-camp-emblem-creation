import { useEffect, useState, useRef } from "react";

const RAYS_OUTER = [
  { angle: 0,   color: "#FF6B35", w: 15, h: 120, burstDelay: 0 },
  { angle: 45,  color: "#FFD700", w: 11, h: 95,  burstDelay: 0.5 },
  { angle: 90,  color: "#FF3CAC", w: 15, h: 120, burstDelay: 1.0 },
  { angle: 135, color: "#2AF598", w: 11, h: 95,  burstDelay: 1.5 },
  { angle: 180, color: "#FF6B35", w: 15, h: 120, burstDelay: 2.0 },
  { angle: 225, color: "#FFD700", w: 11, h: 95,  burstDelay: 2.5 },
  { angle: 270, color: "#FF3CAC", w: 15, h: 120, burstDelay: 3.0 },
  { angle: 315, color: "#2AF598", w: 11, h: 95,  burstDelay: 3.5 },
];

const RAYS_MID = [
  { angle: 22.5,  color: "#FFA500", w: 9, h: 78, flickerDelay: 0 },
  { angle: 67.5,  color: "#00C9FF", w: 9, h: 78, flickerDelay: 0.4 },
  { angle: 112.5, color: "#FFA500", w: 9, h: 78, flickerDelay: 0.8 },
  { angle: 157.5, color: "#00C9FF", w: 9, h: 78, flickerDelay: 1.2 },
  { angle: 202.5, color: "#FFA500", w: 9, h: 78, flickerDelay: 1.6 },
  { angle: 247.5, color: "#00C9FF", w: 9, h: 78, flickerDelay: 2.0 },
  { angle: 292.5, color: "#FFA500", w: 9, h: 78, flickerDelay: 2.4 },
  { angle: 337.5, color: "#00C9FF", w: 9, h: 78, flickerDelay: 2.8 },
];

const RAYS_INNER = [
  { angle: 11,   color: "#FF6B35", w: 5, h: 50, delay: 0 },
  { angle: 56,   color: "#FFD700", w: 5, h: 50, delay: 0.3 },
  { angle: 101,  color: "#FF3CAC", w: 5, h: 50, delay: 0.6 },
  { angle: 146,  color: "#2AF598", w: 5, h: 50, delay: 0.9 },
  { angle: 191,  color: "#00C9FF", w: 5, h: 50, delay: 1.2 },
  { angle: 236,  color: "#FF6B35", w: 5, h: 50, delay: 1.5 },
  { angle: 281,  color: "#FFD700", w: 5, h: 50, delay: 1.8 },
  { angle: 326,  color: "#FF3CAC", w: 5, h: 50, delay: 2.1 },
  { angle: 33,   color: "#2AF598", w: 4, h: 40, delay: 0.15 },
  { angle: 78,   color: "#FFA500", w: 4, h: 40, delay: 0.45 },
  { angle: 123,  color: "#00C9FF", w: 4, h: 40, delay: 0.75 },
  { angle: 168,  color: "#FF6B35", w: 4, h: 40, delay: 1.05 },
  { angle: 213,  color: "#FFD700", w: 4, h: 40, delay: 1.35 },
  { angle: 258,  color: "#FF3CAC", w: 4, h: 40, delay: 1.65 },
  { angle: 303,  color: "#2AF598", w: 4, h: 40, delay: 1.95 },
  { angle: 348,  color: "#FFA500", w: 4, h: 40, delay: 2.25 },
];

const SPARKLES = [
  { x: "15%", y: "10%", size: 20, color: "#FFD700", delay: 0,   dur: 2.2 },
  { x: "85%", y: "15%", size: 15, color: "#FF3CAC", delay: 0.5, dur: 2.8 },
  { x: "8%",  y: "75%", size: 13, color: "#00C9FF", delay: 1.0, dur: 2.0 },
  { x: "90%", y: "70%", size: 17, color: "#2AF598", delay: 0.3, dur: 3.0 },
  { x: "50%", y: "4%",  size: 11, color: "#FF6B35", delay: 0.8, dur: 2.5 },
  { x: "4%",  y: "42%", size: 13, color: "#FFD700", delay: 1.3, dur: 2.1 },
  { x: "96%", y: "48%", size: 15, color: "#FF3CAC", delay: 0.6, dur: 2.7 },
  { x: "72%", y: "94%", size: 11, color: "#2AF598", delay: 1.6, dur: 2.3 },
  { x: "25%", y: "92%", size: 14, color: "#00C9FF", delay: 0.2, dur: 2.9 },
  { x: "60%", y: "7%",  size: 10, color: "#FFA500", delay: 1.1, dur: 2.4 },
  { x: "35%", y: "6%",  size: 9,  color: "#FF6B35", delay: 0.7, dur: 2.6 },
  { x: "92%", y: "30%", size: 12, color: "#FFD700", delay: 1.4, dur: 2.0 },
];

const TITLE_LETTERS = ["Л", "У", "Ч", "И", "К"];
const LETTER_COLORS = ["#FFD700", "#FF9500", "#FF3CAC", "#00C9FF", "#2AF598"];

function SparkleIcon({ size, color, delay, dur }: { size: number; color: string; delay: number; dur: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{
        animation: `sparkle ${dur}s ease-in-out ${delay}s infinite`,
        filter: `drop-shadow(0 0 5px ${color})`,
      }}
    >
      <path d="M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z" />
    </svg>
  );
}

function RayShape({
  angle, color, w, h, animStyle,
}: {
  angle: number; color: string; w: number; h: number;
  animStyle: React.CSSProperties;
}) {
  const rad = (angle * Math.PI) / 180;
  const cx = 200, cy = 200, gap = 72;
  const x1 = cx + Math.cos(rad) * gap;
  const y1 = cy + Math.sin(rad) * gap;
  const tipX = cx + Math.cos(rad) * (gap + h + 22);
  const tipY = cy + Math.sin(rad) * (gap + h + 22);
  const perpX = -Math.sin(rad) * (w / 2);
  const perpY = Math.cos(rad) * (w / 2);

  return (
    <polygon
      points={`${x1 + perpX},${y1 + perpY} ${x1 - perpX},${y1 - perpY} ${tipX},${tipY}`}
      fill={color}
      style={{
        transformOrigin: `${cx}px ${cy}px`,
        filter: `drop-shadow(0 0 8px ${color}99)`,
        ...animStyle,
      }}
    />
  );
}

function RippleRing({ r, color, delay }: { r: number; color: string; delay: number }) {
  return (
    <circle
      cx="200" cy="200" r={r}
      fill="none"
      stroke={color}
      strokeWidth="3"
      style={{
        animation: `wave-ripple 2.8s ease-out ${delay}s infinite`,
        transformOrigin: "200px 200px",
      }}
    />
  );
}

export default function Index() {
  const [visible, setVisible] = useState(false);
  const [burst, setBurst] = useState(false);
  const burstRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);

    // Периодический взрыв каждые 5 сек
    burstRef.current = setInterval(() => {
      setBurst(true);
      setTimeout(() => setBurst(false), 600);
    }, 5000);

    return () => {
      clearTimeout(t);
      if (burstRef.current) clearInterval(burstRef.current);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center font-nunito relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b4b 70%, #0a2744 100%)",
      }}
    >
      {/* Пульсирующее фоновое свечение */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,180,0,0.18) 0%, transparent 70%)",
          animation: "bg-pulse 3s ease-in-out infinite",
        }}
      />

      {/* Второй слой фонового свечения (смещённый) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,60,172,0.08) 0%, transparent 65%)",
          animation: "bg-pulse 4s ease-in-out 1.5s infinite",
        }}
      />

      {/* Искры по периметру */}
      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: s.x, top: s.y, transform: "translate(-50%, -50%)" }}
        >
          <SparkleIcon size={s.size} color={s.color} delay={s.delay} dur={s.dur} />
        </div>
      ))}

      {/* Основной логотип */}
      <div
        className="flex flex-col items-center"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease" }}
      >
        <div className="relative" style={{ width: 420, height: 420 }}>
          <svg width="420" height="420" viewBox="0 0 400 400" style={{ overflow: "visible" }}>
            <defs>
              <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#FFF5CC" />
                <stop offset="55%" stopColor="#FFB800" />
                <stop offset="100%" stopColor="#FF6B00" />
              </radialGradient>
              <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFB800" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
              </radialGradient>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="rayGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Внешнее свечение ореол */}
            <circle cx="200" cy="200" r="165"
              fill="url(#outerGlow)"
              style={{ animation: "core-glow 4s ease-in-out infinite" }}
            />

            {/* Волновые кольца — расходящиеся */}
            <RippleRing r={80}  color="#FFD700" delay={0} />
            <RippleRing r={80}  color="#FF3CAC" delay={0.9} />
            <RippleRing r={80}  color="#00C9FF" delay={1.8} />

            {/* Внутренние мелкие лучи — быстрое обратное вращение */}
            <g style={{ animation: "ray-spin-reverse 8s linear infinite", transformOrigin: "200px 200px" }}>
              {RAYS_INNER.map((r, i) => (
                <RayShape
                  key={i}
                  angle={r.angle}
                  color={r.color}
                  w={r.w}
                  h={r.h}
                  animStyle={{
                    animation: `ray-flicker 3.5s ease-in-out ${r.delay}s infinite`,
                    opacity: 0.75,
                  }}
                />
              ))}
            </g>

            {/* Средние лучи — мерцание + медленное вращение */}
            <g style={{ animation: "ray-spin 18s linear infinite", transformOrigin: "200px 200px" }}>
              {RAYS_MID.map((r, i) => (
                <RayShape
                  key={i}
                  angle={r.angle}
                  color={r.color}
                  w={r.w}
                  h={r.h}
                  animStyle={{
                    animation: `ray-flicker 3.5s ease-in-out ${r.flickerDelay}s infinite`,
                    opacity: 0.88,
                  }}
                />
              ))}
            </g>

            {/* Длинные лучи — взрыв + обратное медленное вращение */}
            <g style={{ animation: "ray-spin-reverse 25s linear infinite", transformOrigin: "200px 200px" }}>
              {RAYS_OUTER.map((r, i) => (
                <RayShape
                  key={i}
                  angle={r.angle}
                  color={r.color}
                  w={r.w}
                  h={r.h}
                  animStyle={{
                    animation: `ray-burst 4s ease-in-out ${r.burstDelay}s infinite`,
                    opacity: burst ? 1 : 0.92,
                    transform: burst ? "scaleY(1.8)" : "scaleY(1)",
                    transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
                    filter: burst ? `drop-shadow(0 0 18px ${r.color})` : `drop-shadow(0 0 8px ${r.color}88)`,
                  }}
                />
              ))}
            </g>

            {/* Декоративное вращающееся кольцо */}
            <circle
              cx="200" cy="200" r="72"
              fill="none"
              stroke="rgba(255,215,0,0.4)"
              strokeWidth="2"
              strokeDasharray="10 7"
              style={{ animation: "ray-spin 10s linear infinite", transformOrigin: "200px 200px" }}
            />
            <circle
              cx="200" cy="200" r="62"
              fill="none"
              stroke="rgba(255,60,172,0.25)"
              strokeWidth="1.5"
              strokeDasharray="6 10"
              style={{ animation: "ray-spin-reverse 7s linear infinite", transformOrigin: "200px 200px" }}
            />

            {/* Ядро */}
            <circle
              cx="200" cy="200" r="58"
              fill="url(#coreGrad)"
              filter="url(#glow)"
              style={{
                animation: `core-glow 3s ease-in-out infinite`,
                transform: burst ? "scale(1.15)" : "scale(1)",
                transition: "transform 0.15s ease-out",
                transformOrigin: "200px 200px",
              }}
            />

            {/* Блик */}
            <ellipse
              cx="183" cy="178" rx="20" ry="12"
              fill="rgba(255,255,255,0.6)"
              style={{ transform: "rotate(-20deg)", transformOrigin: "183px 178px" }}
            />
            {/* Малый блик */}
            <ellipse
              cx="176" cy="185" rx="8" ry="5"
              fill="rgba(255,255,255,0.35)"
              style={{ transform: "rotate(-30deg)", transformOrigin: "176px 185px" }}
            />
          </svg>
        </div>

        {/* Название — буква за буквой с волной */}
        <div
          className="flex items-end gap-1 -mt-10"
          style={{ animation: visible ? "float-up 0.9s ease-out 0.3s both" : "none" }}
        >
          {TITLE_LETTERS.map((letter, i) => (
            <span
              key={i}
              className="font-nunito font-black"
              style={{
                fontSize: "clamp(60px, 13vw, 100px)",
                color: LETTER_COLORS[i],
                textShadow: `0 0 24px ${LETTER_COLORS[i]}88, 0 4px 12px rgba(0,0,0,0.4)`,
                animation: `title-wave 4s ease-in-out ${i * 0.18}s infinite`,
                display: "inline-block",
                lineHeight: 1,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Подпись */}
        <p
          className="font-nunito-sans font-semibold mt-2 tracking-[0.38em] uppercase"
          style={{
            fontSize: "clamp(11px, 2.2vw, 15px)",
            color: "rgba(255,255,255,0.55)",
            animation: visible ? "float-up 0.9s ease-out 0.55s both" : "none",
          }}
        >
          Летний лагерь
        </p>

        {/* Цветные точки */}
        <div
          className="flex gap-3 mt-5"
          style={{ animation: visible ? "float-up 0.9s ease-out 0.7s both" : "none" }}
        >
          {["#FF6B35", "#FFD700", "#FF3CAC", "#00C9FF", "#2AF598"].map((c, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 10,
                height: 10,
                background: c,
                boxShadow: `0 0 10px ${c}, 0 0 4px ${c}`,
                animation: `sparkle 2s ease-in-out ${i * 0.22}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
