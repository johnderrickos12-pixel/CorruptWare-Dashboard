import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Zap, Server as ServerIcon, Users } from "lucide-react";
import type { BotMode } from "@/pages/Index";

interface StatusPanelProps {
  mode: BotMode;
  isConnected: boolean;
}

const StatusPanel = ({ mode, isConnected }: StatusPanelProps) => {
  const mockActivity = [
    { time: "14:32", message: "Command executed: userinfo", type: "success" },
    { time: "14:31", message: "Server info retrieved", type: "info" },
    { time: "14:30", message: "Ban command failed - no permission", type: "error" },
    { time: "14:29", message: "Mass role assignment completed", type: "success" },
    { time: "14:28", message: "50 messages purged", type: "success" },
  ];

  return (
    <div className="w-80 bg-card border-l border-border p-4 space-y-4">
      {/* Status Overview */}
      <Card className="bg-muted/30 border-primary/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">System Status</CardTitle>
          <CardDescription>Real-time monitoring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Mode</span>
            <Badge variant={mode === "bot" ? "default" : "secondary"}>
              {mode === "bot" ? "Discord Bot" : "Client"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Connection</span>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Active" : "Disconnected"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Uptime</span>
            <span className="text-sm font-mono text-accent">2h 14m</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-muted/30 border-border">
          <CardContent className="pt-4 pb-3 text-center">
            <ServerIcon className="w-5 h-5 mx-auto mb-1 text-primary" />
            <div className="text-xl font-bold text-primary">24</div>
            <div className="text-xs text-muted-foreground">Servers</div>
          </CardContent>
        </Card>
        <Card className="bg-muted/30 border-border">
          <CardContent className="pt-4 pb-3 text-center">
            <Users className="w-5 h-5 mx-auto mb-1 text-accent" />
            <div className="text-xl font-bold text-accent">1.2K</div>
            <div className="text-xs text-muted-foreground">Members</div>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity */}
      <Card className="bg-muted/30 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent" />
            Live Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {mockActivity.map((activity, index) => (
                <div key={index} className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-mono">{activity.time}</span>
                    <Badge 
                      variant={
                        activity.type === "success" ? "default" :
                        activity.type === "error" ? "destructive" : "secondary"
                      }
                      className="text-[10px] h-4"
                    >
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{activity.message}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="bg-muted/30 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">CPU Usage</span>
            <span className="text-accent font-mono">12%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Memory</span>
            <span className="text-accent font-mono">243MB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Latency</span>
            <span className="text-accent font-mono">48ms</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusPanel;
