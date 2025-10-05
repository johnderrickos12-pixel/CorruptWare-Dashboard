import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "./dashboard/DashboardHeader";
import CommandsPanel from "./dashboard/CommandsPanel";
import ServerControlPanel from "./dashboard/ServerControlPanel";
import SettingsPanel from "./dashboard/SettingsPanel";
import AuditLogPanel from "./dashboard/AuditLogPanel";
import StatusPanel from "./dashboard/StatusPanel";
import type { BotMode } from "@/pages/Index";

interface DashboardProps {
  mode: BotMode;
  onModeChange: (mode: BotMode) => void;
}

const Dashboard = ({ mode, onModeChange }: DashboardProps) => {
  const [speed, setSpeed] = useState(50);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      <DashboardHeader 
        mode={mode!} 
        onModeChange={onModeChange}
        speed={speed}
        onSpeedChange={setSpeed}
        isConnected={isConnected}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="commands" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
              <TabsTrigger value="commands" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Commands
              </TabsTrigger>
              <TabsTrigger value="server" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Server Control
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Settings
              </TabsTrigger>
              <TabsTrigger value="logs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Audit Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="commands" className="mt-6">
              <CommandsPanel mode={mode!} />
            </TabsContent>

            <TabsContent value="server" className="mt-6">
              <ServerControlPanel mode={mode!} />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <SettingsPanel mode={mode!} onConnectionChange={setIsConnected} />
            </TabsContent>

            <TabsContent value="logs" className="mt-6">
              <AuditLogPanel />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar - Status */}
        <StatusPanel mode={mode!} isConnected={isConnected} />
      </div>
    </div>
  );
};

export default Dashboard;
