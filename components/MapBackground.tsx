export default function MapBackground() {
  return (
    <div style={{ position: 'fixed', bottom: '-5%', right: '-5%', width: '70%', height: '70%', zIndex: -1, opacity: 0.15, pointerEvents: 'none' }}>
      <img src="/gulf-map.svg" alt="Arabian Gulf Map" className="w-full h-full object-contain" />
    </div>
  );
}
