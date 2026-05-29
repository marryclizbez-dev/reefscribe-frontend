const fs = require('fs');

const svgPath = fs.readFileSync('path.txt', 'utf8');

const content = `export default function MapBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 1440 900"
        className="w-full h-full"
        style={{
          opacity: 0.1
        }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path 
          d="${svgPath}" 
          fill="none" 
          stroke="#0071E3" 
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
`;

fs.writeFileSync('components/MapBackground.tsx', content);
console.log('MapBackground.tsx updated!');
