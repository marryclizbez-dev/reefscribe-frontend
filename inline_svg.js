const fs = require('fs');

let svg = fs.readFileSync('public/gulf-map.svg', 'utf8');

// Remove XML declaration
svg = svg.replace(/<\?xml.*?\?>\n?/, '');

// Convert attributes to camelCase
svg = svg.replace(/fill-opacity="/g, 'fillOpacity="');
svg = svg.replace(/stroke-width="/g, 'strokeWidth="');
svg = svg.replace(/stroke-linecap="/g, 'strokeLinecap="');
svg = svg.replace(/stroke-linejoin="/g, 'strokeLinejoin="');

// Parse the top <svg> tag to inject width, height, preserveAspectRatio
// Replace `<svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" opacity="0.12">`
// With `<svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">`
svg = svg.replace(/<svg[^>]*>/, '<svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">');

const component = `export default function MapBackground() {
  return (
    <div style={{ position: 'fixed', bottom: '-5%', right: '-5%', width: '70%', height: '70%', zIndex: -1, opacity: 0.15, pointerEvents: 'none' }}>
      ${svg.trim()}
    </div>
  );
}
`;

fs.writeFileSync('components/MapBackground.tsx', component);
console.log('Inlined SVG successfully.');
