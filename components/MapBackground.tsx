export default function MapBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none flex items-center justify-center">
      <svg
        viewBox="0 0 1000 800"
        className="w-full h-full"
        style={{
          stroke: '#0071E3',
          fill: 'none',
          strokeWidth: 2,
          opacity: 0.06
        }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Simplified abstract representation of the ROPME Sea Area coastlines */}
        <path d="M 200,600 C 250,550 300,500 350,550 C 400,600 450,550 500,500 C 550,450 600,500 650,550 C 700,600 750,650 800,600" />
        <path d="M 150,400 C 200,350 250,300 300,350 C 350,400 400,350 450,300 C 500,250 550,300 600,350 C 650,400 700,350 750,300" />
        <path d="M 350,200 C 400,150 450,100 500,150 C 550,200 600,150 650,100 C 700,50 750,100 800,150" />
        <path d="M 500,700 C 550,650 600,750 650,700 C 700,650 750,750 800,700" />
        {/* Arabian Gulf, Gulf of Oman, Arabian Sea, Red Sea outlines */}
        <path d="M 400,300 Q 450,350 500,300 T 600,300" />
        <path d="M 250,450 Q 300,500 350,450 T 450,450" />
      </svg>
    </div>
  );
}
