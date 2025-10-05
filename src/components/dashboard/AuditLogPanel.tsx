import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Download, Trash2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuditLogPanel = () => {
  const { toast } = useToast();

  const mockLogs = [
    { id: 1, timestamp: "2025-10-05 14:32:11", action: "userinfo", status: "success", user: "User#1234" },
    { id: 2, timestamp: "2025-10-05 14:31:45", action: "serverinfo", status: "success", user: "System" },
    { id: 3, timestamp: "2025-10-05 14:30:22", action: "ban", status: "failed", user: "Admin#5678" },
    { id: 4, timestamp: "2025-10-05 14:29:10", action: "mass_role_assign", status: "success", user: "Admin#5678" },
    { id: 5, timestamp: "2025-10-05 14:28:03", action: "purge", status: "success", user: "Mod#9012" },
  ];

  const handleExport = () => {
    const data = JSON.stringify(mockLogs, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-log-${Date.now()}.json`;
    a.click();

    toast({
      title: "Logs Exported",
      description: "Audit log downloaded successfully",
    });
  };

  const handleClear = () => {
    toast({
      title: "Logs Cleared",
      description: "All audit logs have been deleted",
    });
  };

  return (
    <div className="space-y-8">
      <Card className="bg-card border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Audit Logs
              </CardTitle>
              <CardDescription>
                Complete history of all command executions and actions
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {mockLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors terminal"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <code className="text-sm font-mono text-accent">{log.action}</code>
                      <Badge 
                        variant={log.status === "success" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {log.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{log.timestamp}</span>
                      <span>•</span>
                      <span>{log.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardDescription>Total Commands</CardDescription>
            <CardTitle className="text-3xl text-primary">1,247</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardDescription>Success Rate</CardDescription>
            <CardTitle className="text-3xl text-accent">98.4%</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardDescription>Avg Response Time</CardDescription>
            <CardTitle className="text-3xl text-secondary">142ms</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default AuditLogPanel;
