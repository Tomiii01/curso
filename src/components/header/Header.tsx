import { ThemeSwitcher } from "@/components/theme-switcher/ThemeSwitcher";
import { MessagesSquare } from "lucide-react";
import { SidePanel } from "../side-panel/side-panel";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="float-left">
        <MessagesSquare />
      </div>
      <div className="flex items-center">LLM Chat</div>
      <div className="float-right">
        <div className="flex items-center">
          <ThemeSwitcher></ThemeSwitcher>
          <SidePanel title="Configuración"></SidePanel>
        </div>
      </div>
    </header>
  );
}
