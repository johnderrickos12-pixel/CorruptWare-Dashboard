import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";

export type BotMode = "bot" | "client" | null;

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<BotMode>(null);

  if (selectedMode === null) {
    return <LandingPage onModeSelect={setSelectedMode} />;
  }

  return <Dashboard mode={selectedMode} onModeChange={setSelectedMode} />;
};

export default Index;
