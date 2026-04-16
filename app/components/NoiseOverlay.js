export default function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" opacity="1">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"></feTurbulence>
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.25 0"></feColorMatrix>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)"></rect>
      </svg>
    </div>
  );
}
