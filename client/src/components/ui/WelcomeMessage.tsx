import { useEffect } from "react";
import { useScene } from "../../lib/stores/useScene";

export default function WelcomeMessage() {
  const { setAnimationPhase } = useScene();

  useEffect(() => {
    // Start the walking animation
    setAnimationPhase('walking');
  }, [setAnimationPhase]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 pointer-events-none">
      <div className="text-center">
        <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 animate-pulse">
          Welcome to My World
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl">
          - Gyakie
        </p>
      </div>
    </div>
  );
}
