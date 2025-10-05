import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Settings, Zap, ArrowLeft } from "lucide-react";
import type { BotMode } from "@/pages/Index";

interface DashboardHeaderProps {
  mode: BotMode;
  onModeChange: (mode: BotMode) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  isConnected: boolean;
}

const DashboardHeader = ({ mode, onModeChange, speed, onSpeedChange, isConnected }: DashboardHeaderProps) => {
  const modeColor = mode === "bot" ? "primary" : "secondary";
  const modeIcon = mode === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />;
  const modeName = mode === "bot" ? "Discord Bot" : "Client Mode";

  return (
    <header className="bg-card border-b border-border p-4 sticky top-0 z-50 backdrop-blur-sm bg-card/80">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Logo & Mode */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onModeChange(null)}
            className="hover:bg-primary/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="text-2xl font-bold">
            <span className="holographic">CORRUPT-WARE</span>
          </h1>

          <Badge 
            variant="outline" 
            className={`border-${modeColor} text-${modeColor} flex items-center gap-2 px-3 py-1 neon-glow`}
          >
            {modeIcon}
            {modeName}
          </Badge>

          <Badge variant={isConnected ? "default" : "secondary"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        {/* Center: Speed Control */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <Zap className="w-5 h-5 text-accent" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Speed</span>
              <span className="text-sm font-semibold text-accent">{speed}/100</span>
            </div>
            <Slider
              value={[speed]}
              onValueChange={(value) => onSpeedChange(value[0])}
              max={100}
              min={1}
              step={1}
              className="cursor-pointer"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            ~{Math.floor(speed / 10)} threads
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => onModeChange(mode === "bot" ? "client" : "bot")}
            className="border-border hover:border-primary"
          >
            Switch Mode
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
