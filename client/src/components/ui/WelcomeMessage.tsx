import { useEffect, useState } from "react";
import { useScene } from "../../lib/stores/useScene";

export default function WelcomeMessage() {
  const { animationPhase, welcomeShown } = useScene();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (animationPhase === 'arrived' && !welcomeShown) {
      // Show welcome message
      setVisible(true);
      
      // Typewriter effect
      const welcomeText = "Welcome to my universe! ✨";
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex <= welcomeText.length) {
          setText(welcomeText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 80);

      return () => clearInterval(typeInterval);
    } else if (animationPhase === 'scattering') {
      // Hide welcome message when birds scatter
      setVisible(false);
    }
  }, [animationPhase, welcomeShown]);

  if (!visible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-pulse">
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-purple-600/20 rounded-3xl blur-xl scale-110"></div>
        
        {/* Main message container */}
        <div className="relative bg-black/90 backdrop-blur-lg rounded-3xl px-12 py-8 border border-purple-400/40 shadow-2xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-4 tracking-wide">
              {text}
            </h1>
            <p className="text-xl md:text-2xl text-purple-200/80 font-medium italic">
              - Gyakie
            </p>
            
            {/* Decorative sparkles */}
            <div className="absolute -top-4 -left-4 text-purple-400 text-2xl animate-bounce">✨</div>
            <div className="absolute -top-2 -right-6 text-pink-400 text-xl animate-bounce delay-150">⭐</div>
            <div className="absolute -bottom-6 left-8 text-purple-300 text-lg animate-bounce delay-300">✨</div>
            <div className="absolute -bottom-4 -right-8 text-pink-300 text-2xl animate-bounce delay-75">🌟</div>
          </div>
        </div>
      </div>
    </div>
  );
}