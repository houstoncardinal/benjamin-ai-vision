import { BenjaminBackground } from "@/components/BenjaminBackground";
import { ChatInterface } from "@/components/ChatInterface";
import { Volume2 } from "lucide-react";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Benjamin Franklin Background */}
      <BenjaminBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Premium Branding */}
        <div className="flex-1 flex flex-col justify-center items-start p-12 max-w-3xl">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-7xl font-black text-foreground tracking-tight leading-none">
                Benjamin<span className="text-secondary bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">AI</span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-secondary to-accent rounded-full" />
              <p className="text-2xl text-muted-foreground max-w-xl font-medium">
                The Ultimate Money Genius AI
              </p>
              <p className="text-lg text-muted-foreground/80 max-w-xl">
                Wisdom, wit, and financial intelligence from America's most ingenious founding father
              </p>
            </div>
            
            <div className="space-y-6 text-muted-foreground max-w-xl">
              <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-border/30">
                <p className="text-xl font-semibold text-secondary mb-2">
                  "An investment in knowledge pays the best interest."
                </p>
                <p className="text-sm text-muted-foreground/80">
                  - Benjamin Franklin, 1758
                </p>
              </div>
              
              <div className="space-y-3">
                <p className="text-lg leading-relaxed">
                  Get personalized financial advice from the man on the $100 bill. From budgeting basics 
                  to investment strategies, Benjamin Franklin's timeless wisdom meets modern AI.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {['💰 Budgeting', '📈 Investing', '💡 Side Hustles', '🏦 Banking', '📊 Planning'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full border border-secondary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-10 bg-gradient-to-r from-secondary via-accent to-secondary rounded-lg opacity-90 animate-shimmer" />
                <div className="text-sm text-muted-foreground">
                  <div className="font-semibold text-secondary">$100 Bill Wisdom</div>
                  <div>Powered by real AI & voice</div>
                </div>
              </div>
              
              <div className="w-px h-12 bg-border/50" />
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Volume2 className="h-4 w-4 text-secondary" />
                <span>Real Benjamin Franklin voice</span>
              </div>
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
