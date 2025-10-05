import { Button } from "@/components/ui/button";
import { Bot, User } from "lucide-react";
import type { BotMode } from "@/pages/Index";

interface LandingPageProps {
  onModeSelect: (mode: BotMode) => void;
}

const LandingPage = ({ onModeSelect }: LandingPageProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-16 px-8 max-w-7xl mx-auto">
        {/* Title */}
        <div className="space-y-6">
          <h1 className="text-7xl font-bold tracking-tighter">
            <span className="holographic">CORRUPT</span>
            <span className="text-primary">-</span>
            <span className="holographic">WARE</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced Discord automation tool with futuristic controls.
            <br />
            Choose your operating mode to begin.
          </p>
          <p className="text-sm text-accent/80">
            Built by <span className="font-semibold">Yanna</span>
          </p>
        </div>

        {/* Mode Selection */}
        <div className="flex flex-col md:flex-row gap-12 justify-center items-center mt-8">
          {/* Discord Bot Mode */}
          <button
            onClick={() => onModeSelect("bot")}
            className="group relative w-80 h-96 bg-card border-2 border-primary/30 rounded-lg p-8 overflow-hidden transition-all duration-300 hover:border-primary hover:scale-105 neon-glow"
          >
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 h-full flex flex-col items-center justify-between">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary group-hover:animate-glow-pulse">
                <Bot className="w-12 h-12 text-primary" />
              </div>
              
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold text-primary">Discord Bot</h2>
                <p className="text-muted-foreground">
                  Official bot mode with full permissions and Discord intents.
                  Ideal for server automation and management.
                </p>
                <ul className="text-sm text-left space-y-2 text-muted-foreground">
                  <li>✓ Full event handling</li>
                  <li>✓ All bot privileges</li>
                  <li>✓ 300+ commands</li>
                  <li>✓ High-speed operations</li>
                </ul>
              </div>

              <div className="text-primary font-semibold text-lg">
                ENTER →
              </div>
            </div>
          </button>

          {/* Client Mode */}
          <button
            onClick={() => onModeSelect("client")}
            className="group relative w-80 h-96 bg-card border-2 border-secondary/30 rounded-lg p-8 overflow-hidden transition-all duration-300 hover:border-secondary hover:scale-105"
            style={{ boxShadow: "0 0 20px hsl(var(--secondary) / 0.5)" }}
          >
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 h-full flex flex-col items-center justify-between">
              <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center border-2 border-secondary group-hover:animate-glow-pulse">
                <User className="w-12 h-12 text-secondary" />
              </div>
              
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold text-secondary">Client Mode</h2>
                <p className="text-muted-foreground">
                  User account mode with TOS-aware operation.
                  Permission-based command execution.
                </p>
                <ul className="text-sm text-left space-y-2 text-muted-foreground">
                  <li>✓ User token based</li>
                  <li>✓ Safe operations</li>
                  <li>✓ Admin commands</li>
                  <li>⚠ TOS warnings</li>
                </ul>
              </div>

              <div className="text-secondary font-semibold text-lg">
                ENTER →
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground max-w-3xl mx-auto">
          Both modes support JSON import/export, speed controls, audit logging, and real-time updates.
          <br />
          Client Mode operates within Discord TOS and requires explicit permissions for admin commands.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
