import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Upload, Key, Save } from "lucide-react";
import type { BotMode } from "@/pages/Index";
import { useToast } from "@/hooks/use-toast";

interface SettingsPanelProps {
  mode: BotMode;
  onConnectionChange: (connected: boolean) => void;
}

const SettingsPanel = ({ mode, onConnectionChange }: SettingsPanelProps) => {
  const { toast } = useToast();
  const [token, setToken] = useState("");
  const [jsonData, setJsonData] = useState("");

  const handleConnect = () => {
    if (!token) {
      toast({
        title: "Token Required",
        description: "Please enter your Discord token",
        variant: "destructive",
      });
      return;
    }

    // Simulate connection
    onConnectionChange(true);
    toast({
      title: "Connected Successfully",
      description: `${mode === "bot" ? "Bot" : "Client"} mode activated`,
    });
  };

  const handleExportJSON = () => {
    const settings = {
      mode,
      token: token ? "***HIDDEN***" : "",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    };

    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `corrupt-ware-${mode}-settings.json`;
    a.click();

    toast({
      title: "Settings Exported",
      description: "JSON file downloaded successfully",
    });
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonData);
      toast({
        title: "Settings Imported",
        description: `Loaded settings for ${parsed.mode} mode`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Invalid JSON format",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Token Configuration */}
      <Card className="bg-card border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            {mode === "bot" ? "Bot Token" : "User Token"}
          </CardTitle>
          <CardDescription>
            {mode === "bot" 
              ? "Enter your Discord bot token from the Developer Portal"
              : "⚠️ User tokens are sensitive. Use at your own risk. This violates Discord TOS."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">Discord Token</Label>
            <Input
              id="token"
              type="password"
              placeholder="Enter token..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="bg-input border-border font-mono"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleConnect} className="neon-glow">
              <Key className="w-4 h-4 mr-2" />
              Connect
            </Button>
            <Button variant="outline" onClick={() => setToken("")}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* JSON Import/Export */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="w-5 h-5" />
            JSON Settings Manager
          </CardTitle>
          <CardDescription>
            Import or export your configuration as JSON
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jsonData">JSON Data</Label>
            <Textarea
              id="jsonData"
              placeholder='{"mode": "bot", "settings": {...}}'
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              className="bg-input border-border font-mono min-h-[200px]"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleImportJSON} className="flex-1">
              <Upload className="w-4 h-4 mr-2" />
              Import JSON
            </Button>
            <Button variant="outline" onClick={handleExportJSON} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mode-Specific Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">
            {mode === "bot" ? "Bot Configuration" : "Client Configuration"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mode === "bot" ? (
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>✓ Requires Discord bot with proper intents enabled</p>
              <p>✓ Administrator permission recommended</p>
              <p>✓ All 300+ commands available</p>
              <p>✓ Full event handling support</p>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>⚠️ Uses your Discord user account</p>
              <p>⚠️ Commands limited by your permissions</p>
              <p>⚠️ Admin commands require admin rights</p>
              <p>⚠️ Violates Discord TOS - use responsibly</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;
