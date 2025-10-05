import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Play, Info } from "lucide-react";
import type { BotMode } from "@/pages/Index";
import { COMMAND_CATEGORIES } from "@/lib/commands";

interface CommandsPanelProps {
  mode: BotMode;
}

const CommandsPanel = ({ mode }: CommandsPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = COMMAND_CATEGORIES;

  const filteredCategories = selectedCategory
    ? categories.filter(cat => cat.id === selectedCategory)
    : categories;

  return (
    <div className="space-y-8">
      {/* Search & Filter */}
      <Card className="bg-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary">Command Center</CardTitle>
          <CardDescription>
            Browse and execute {mode === "bot" ? "300+" : "200+"} commands across 8 categories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="gap-2"
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
                <Badge variant="secondary" className="ml-1">{cat.count}</Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Command Categories */}
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <category.icon className="w-4 h-4" />
                  {category.name}
                  <Badge variant="outline">{category.count} commands</Badge>
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {category.commands
                    .filter(cmd => 
                      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .filter(cmd => mode === "bot" || cmd.availableInClientMode)
                    .slice(0, 10) // Show first 10 commands per category
                    .map((cmd) => (
                      <div
                        key={cmd.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-sm font-mono text-accent">{cmd.name}</code>
                            {cmd.requiresAdmin && (
                              <Badge variant="destructive" className="text-xs">Admin</Badge>
                            )}
                            {!cmd.availableInClientMode && mode === "client" && (
                              <Badge variant="secondary" className="text-xs">Bot Only</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{cmd.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Info className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={mode === "client" && !cmd.availableInClientMode}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Run
                          </Button>
                        </div>
                      </div>
                    ))}
                  {category.commands.length > 10 && (
                    <p className="text-sm text-center text-muted-foreground mt-2">
                      + {category.commands.length - 10} more commands...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CommandsPanel;
