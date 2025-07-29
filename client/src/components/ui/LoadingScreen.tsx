import { useEffect, useState } from "react";
import { useIsMobile } from "../../hooks/use-is-mobile";

export default function LoadingScreen() {
  const [dots, setDots] = useState(".");
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return ".";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 mobile-optimized">
      <div className="text-center px-4">
        <div className={`text-white font-bold mb-4 ${isMobile ? 'text-4xl' : 'text-6xl'}`}>
          GYAKIE
        </div>
        <div className={`text-gray-400 ${isMobile ? 'text-lg' : 'text-xl'}`}>
          Loading{dots}
        </div>
        <div className="mt-8">
          <div className={`bg-gray-800 rounded-full overflow-hidden h-1 ${isMobile ? 'w-48' : 'w-64'}`}>
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
