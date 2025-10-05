import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Play, AlertTriangle, Server as ServerIcon } from "lucide-react";
import type { BotMode } from "@/pages/Index";
import { useToast } from "@/hooks/use-toast";

interface ServerControlPanelProps {
  mode: BotMode;
}

const ServerControlPanel = ({ mode }: ServerControlPanelProps) => {
  const { toast } = useToast();
  const [serverId, setServerId] = useState("");
  const [message, setMessage] = useState("");
  const [iterations, setIterations] = useState(1);

  const handleExecute = () => {
    if (!serverId || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Execution Started",
      description: `Running ${iterations} iteration(s) on server ${serverId}`,
    });
  };

  return (
    <div className="space-y-8">
      {/* TOS Warning for Client Mode */}
      {mode === "client" && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Client Mode TOS Warning:</strong> All operations execute with your user account permissions.
            Admin commands require explicit admin privileges. Misuse may result in account suspension.
          </AlertDescription>
        </Alert>
      )}

      {/* Server Configuration */}
      <Card className="bg-card border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ServerIcon className="w-5 h-5 text-primary" />
            Server Control Center
          </CardTitle>
          <CardDescription>
            Configure bulk operations and message automation for Discord servers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Server ID */}
          <div className="space-y-2">
            <Label htmlFor="serverId">Server ID</Label>
            <Input
              id="serverId"
              placeholder="Enter Discord server ID"
              value={serverId}
              onChange={(e) => setServerId(e.target.value)}
              className="bg-input border-border font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Enable Developer Mode in Discord to copy server IDs
            </p>
          </div>

          {/* Message Template */}
          <div className="space-y-2">
            <Label htmlFor="message">Message Template</Label>
            <Textarea
              id="message"
              placeholder="Enter message to send..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-input border-border min-h-[120px] font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Use {"{username}"}, {"{server}"} for dynamic variables
            </p>
          </div>

          {/* Iterations */}
          <div className="space-y-2">
            <Label htmlFor="iterations">Number of Iterations</Label>
            <div className="flex items-center gap-4">
              <Input
                id="iterations"
                type="number"
                min={1}
                max={1000}
                value={iterations}
                onChange={(e) => setIterations(parseInt(e.target.value) || 1)}
                className="bg-input border-border w-32"
              />
              <Badge variant="outline" className="text-xs">
                Est. time: ~{iterations * 2}s
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <Button 
              className="flex-1 neon-glow"
              onClick={handleExecute}
            >
              <Play className="w-4 h-4 mr-2" />
              Execute Operation
            </Button>
            <Button variant="outline" className="flex-1">
              Dry Run (Test)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Common server operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start">
              Mass Role Assignment
            </Button>
            <Button variant="outline" className="justify-start">
              Bulk Channel Create
            </Button>
            <Button variant="outline" className="justify-start">
              Lock All Channels
            </Button>
            <Button variant="outline" className="justify-start">
              Unlock All Channels
            </Button>
            <Button variant="outline" className="justify-start">
              Clone Roles
            </Button>
            <Button variant="outline" className="justify-start">
              Server Backup
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Permission Info */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Permission Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="default" className="mt-0.5">Bot Mode</Badge>
            <p className="text-sm text-muted-foreground">
              Requires bot to have Administrator permission or specific permissions for each operation.
              All Discord intents must be enabled.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">Client Mode</Badge>
            <p className="text-sm text-muted-foreground">
              Operations execute with your account's permissions. Admin commands work only if you have
              explicit admin rights on the server. No intents required.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerControlPanel;
