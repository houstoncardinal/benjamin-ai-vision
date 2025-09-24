import benjaminImage from "@/assets/benjamin-franklin.jpg";

export const BenjaminBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/25" />
      
      {/* Animated Money Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-secondary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Benjamin Franklin Portrait */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-7xl">
          <img
            src={benjaminImage}
            alt="Benjamin Franklin - The Ultimate Money Genius"
            className="benjamin-portrait w-full h-full object-cover opacity-35 sepia-[0.3] contrast-125 saturate-110"
          />
          
          {/* Enhanced Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          {/* Money Glow Effects */}
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse opacity-60" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: "1.5s" }} />
        </div>
      </div>

      {/* Premium Decorative Elements */}
      <div className="absolute top-1/6 left-1/5 w-40 h-40 bg-gradient-to-r from-secondary/15 to-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-1/6 right-1/5 w-56 h-56 bg-gradient-to-l from-primary/15 to-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      
      {/* Dynamic Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] animate-shimmer"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, hsl(45 90% 60%) 1px, transparent 0),
            linear-gradient(45deg, transparent 25%, hsla(45 90% 60% / 0.1) 25%, hsla(45 90% 60% / 0.1) 50%, transparent 50%)
          `,
          backgroundSize: '50px 50px, 100px 100px'
        }}
      />
      
      {/* Floating Dollar Signs */}
      <div className="absolute inset-0 pointer-events-none">
        {['$', '💰', '💵', '💸'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-secondary/10 text-2xl animate-pulse"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i}s`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
};