export default function MapBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 1440 900"
        className="w-full h-full"
        style={{
          opacity: 0.12,
          transform: 'scale(0.7)'
        }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#0071E3" strokeWidth="1.5" fill="none">
          {/* Water body fill */}
          <path 
            d="M 151,90 L 166,153 L 189,234 L 272,360 L 310,414 L 363,531 L 363,495 L 394,441 L 416,513 L 424,621 L 629,594 L 704,522 L 750,468 L 780,423 L 795,468 L 841,414 L 772,351 L 697,405 L 666,405 L 500,324 L 363,189 L 234,54 L 166,90 Z" 
            fill="#0071E3" 
            fillOpacity={0.03}
            stroke="none"
          />

          {/* Southern Coastline (Kuwait, Saudi Arabia, Qatar, UAE, Oman) */}
          <path d="M 151,90 L 166,153 L 189,234 L 272,360 L 310,414 L 363,531 L 363,495 L 394,441 L 416,513 L 424,621 L 629,594 L 704,522 L 750,468 L 780,423 L 795,468 L 780,531 L 810,603 L 954,666 L 1022,765 L 985,900" />
          
          {/* Northern Coastline (Iraq, Iran) */}
          <path d="M 151,90 L 166,90 L 234,54 L 363,189 L 500,324 L 666,405 L 697,405 L 772,351 L 841,414 L 886,486 L 1106,513 L 1174,540" />
          
          {/* Bahrain */}
          <path d="M 335,450 A 6,6 0 1,1 347,450 A 6,6 0 1,1 335,450" />
        </g>
      </svg>
    </div>
  );
}
