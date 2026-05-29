const fs = require('fs');

let content = fs.readFileSync('components/MapBackground.tsx', 'utf8');

// Replace opacity
content = content.replace('opacity: 0.1', `opacity: 0.9, transform: 'translateX(20vw) scale(0.6)'`);

// Replace fill="none" with land styling
content = content.replace('fill="none"', 'fill="#D4E8D4" fillOpacity={0.15}');

// Replace strokeWidth="1" with 0.8
content = content.replace('strokeWidth="1"', 'strokeWidth={0.8}');

// Add the Gulf path before the land path
const gulfPath = `
        {/* Arabian Gulf water body path */}
        <path d="M 151,90 L 166,153 L 189,234 L 272,360 L 310,414 L 363,531 L 363,495 L 394,441 L 416,513 L 424,621 L 629,594 L 704,522 L 750,468 L 780,423 L 795,468 L 841,414 L 772,351 L 697,405 L 666,405 L 500,324 L 363,189 L 234,54 L 166,90 Z" fill="#0071E3" fillOpacity={0.08} stroke="none" />
        <path`;

content = content.replace('<path', gulfPath);

fs.writeFileSync('components/MapBackground.tsx', content);
console.log('Fixed MapBackground.tsx');
