import { useScene, type SceneSection } from "@/lib/stores/useScene";
import { Home, Music, Image, Calendar, ShoppingBag, User } from "lucide-react";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/700.css";

const sections: { id: SceneSection; icon: React.ElementType; label: string }[] = [
  { id: "universe", icon: Home, label: "Universe" },
  { id: "music", icon: Music, label: "Music" },
  { id: "images", icon: Image, label: "Gallery" },
  { id: "tours", icon: Calendar, label: "Tours" },
  { id: "shop", icon: ShoppingBag, label: "Shop" },
  { id: "about", icon: User, label: "About" },
];

export default function TopNavigation() {
  const { currentSection, setCurrentSection, setIsTransitioning } = useScene();

  const handleNavigation = (section: SceneSection) => {
    if (section === currentSection) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSection(section);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 
<<<<<<< HEAD
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
              style={{ fontFamily: "Great Vibes, cursive" }}
=======
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
              style={{ fontFamily: "Playfair Display, serif" }}
>>>>>>> f26b77818df8ed64602877622c20a7be0db03f1d
              onClick={() => handleNavigation("universe")}
            >
              Gyakie's Universe
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {sections.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => handleNavigation(id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    currentSection === id
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                      : "text-gray-300 hover:bg-purple-600/20 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <div className="grid grid-cols-3 gap-1">
              {sections.slice(0, 6).map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleNavigation(id)}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    currentSection === id
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-purple-600/20 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}