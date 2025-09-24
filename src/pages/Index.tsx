import { BenjaminBackground } from "@/components/BenjaminBackground";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Benjamin Franklin Background */}
      <BenjaminBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="flex-1 flex flex-col justify-center items-start p-12 max-w-2xl">
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-2">
              <h1 className="text-6xl font-bold text-foreground tracking-tight">
                Benjamin<span className="text-secondary">AI</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Wisdom, wit, and intelligence from America's most ingenious founding father
              </p>
            </div>
            
            <div className="space-y-4 text-muted-foreground max-w-lg">
              <p className="text-lg">
                "An investment in knowledge pays the best interest."
              </p>
              <p>
                Engage with an AI that embodies the curiosity, practicality, and brilliance 
                of Benjamin Franklin. From science to diplomacy, business to philosophy.
              </p>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-8 bg-gradient-to-r from-secondary to-accent rounded opacity-80" />
              <span className="text-sm text-muted-foreground">
                Powered by $100 wisdom
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Chat Interface */}
        <div className="w-96 p-6 flex flex-col">
          <div className="h-full max-h-screen">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
