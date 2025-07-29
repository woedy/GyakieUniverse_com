import { Heart, Music } from "lucide-react";
import "@fontsource/playfair-display/400.css";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-sm border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Music size={16} />
            <span style={{ fontFamily: "Playfair Display, serif" }}>
              Made with
            </span>
            <Heart size={14} className="text-pink-400" />
            <span style={{ fontFamily: "Playfair Display, serif" }}>
              for music lovers
            </span>
          </div>
          
          <div className="text-sm text-gray-400">
            <span style={{ fontFamily: "Playfair Display, serif" }}>
              © 2025 Gyakie's Universe
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}