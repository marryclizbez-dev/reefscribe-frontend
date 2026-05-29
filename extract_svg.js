const fs = require('fs');

const componentContent = fs.readFileSync('components/MapBackground.tsx', 'utf8');

// The SVG starts at <svg and ends at </svg>
const svgStart = componentContent.indexOf('<svg');
const svgEnd = componentContent.indexOf('</svg>') + 6;

if (svgStart === -1 || svgEnd === 5) {
  console.error("SVG not found in component");
  process.exit(1);
}

let svgString = componentContent.substring(svgStart, svgEnd);

// Strip React specific attributes and camelCase attributes from SVG for standard XML
// viewBox is fine. fillOpacity, strokeWidth need changing to standard CSS/SVG attributes in plain string format
// But wait! React SVG already has string representations if we just replace {} with "" and camelCase with kebab-case
// Let's just manually construct the SVG using the paths!

// Find the two paths
// Gulf water path starts with: <path d="M 151,90
// Land path starts with: <path d="M780.568,489.8
// Or just extract the contents between <svg ...> and </svg>
let pathsMatch = componentContent.match(/<path d="M 151,90.*?stroke="none" \/>/s);
let gulfPath = pathsMatch ? pathsMatch[0] : '';
// Replace fillOpacity={0.08} with fill-opacity="0.08"
gulfPath = gulfPath.replace(/fillOpacity=\{([^\}]+)\}/g, 'fill-opacity="$1"');

// The natural earth path is a huge d string. Let's just extract all paths and clean them up
let allPaths = componentContent.match(/<path[\s\S]*?\/>/g);

let cleanPaths = allPaths.map(p => {
  let cleaned = p.replace(/fillOpacity=\{([^\}]+)\}/g, 'fill-opacity="$1"');
  cleaned = cleaned.replace(/strokeWidth=\{([^\}]+)\}/g, 'stroke-width="$1"');
  cleaned = cleaned.replace(/opacity=\{([^\}]+)\}/g, 'opacity="$1"');
  // Remove React className
  cleaned = cleaned.replace(/className="[^"]*"/g, '');
  return cleaned;
}).join('\n');

const finalSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" opacity="0.12">
${cleanPaths}
</svg>`;

// Write public/gulf-map.svg
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/gulf-map.svg', finalSvg);
console.log('Saved public/gulf-map.svg');

// Now replace MapBackground.tsx
const newComponent = `export default function MapBackground() {
  return (
    <div style={{ position: 'fixed', bottom: '-5%', right: '-5%', width: '70%', height: '70%', zIndex: -1, opacity: 0.15, pointerEvents: 'none' }}>
      <img src="/gulf-map.svg" alt="Arabian Gulf Map" className="w-full h-full object-contain" />
    </div>
  );
}
`;

fs.writeFileSync('components/MapBackground.tsx', newComponent);
console.log('Saved MapBackground.tsx');
