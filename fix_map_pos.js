const fs = require('fs');

let content = fs.readFileSync('components/MapBackground.tsx', 'utf8');

// Replace the div
content = content.replace(
  '<div className="fixed inset-0 w-full h-full -z-10 pointer-events-none flex items-center justify-center overflow-hidden">',
  '<div className="fixed -z-10 pointer-events-none overflow-hidden" style={{ bottom: "-10%", right: "-10%", width: "100%", height: "100%" }}>'
);

// Replace opacity and transform on SVG
content = content.replace(
  "opacity: 0.9, transform: 'translateX(20vw) scale(0.6)'",
  "opacity: 0.12, transform: 'scale(0.5)'"
);

fs.writeFileSync('components/MapBackground.tsx', content);
console.log('Fixed position and opacity!');
