import benjaminImage from "@/assets/benjamin-franklin.jpg";

export const BenjaminBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/20" />
      
      {/* Benjamin Franklin Portrait */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-6xl">
          <img
            src={benjaminImage}
            alt="Benjamin Franklin Portrait"
            className="benjamin-portrait w-full h-full object-cover opacity-30 grayscale contrast-125"
          />
          
          {/* Overlay gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};