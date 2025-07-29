import { Button } from "./button";
import { useScene } from "../../lib/stores/useScene";
import { useAudio } from "../../lib/stores/useAudio";
import { useGame } from "../../lib/stores/useGame";
import { useIsMobile } from "../../hooks/use-is-mobile";
import { Volume2, VolumeX, Home, Gamepad2 } from "lucide-react";

export default function Navigation() {
  const { currentSection, setCurrentSection } = useScene();
  const { isMuted, toggleMute } = useAudio();
  const { userInteracting, isUserControlling } = useGame();
  const isMobile = useIsMobile();

  const handleHome = () => {
    setCurrentSection('universe');
  };

  if (currentSection !== 'universe') {
    return (
      <div className="fixed top-4 left-4 z-30">
        <Button
          onClick={handleHome}
          variant="outline"
          size={isMobile ? "default" : "lg"}
          className="bg-black bg-opacity-50 text-white border-white border-opacity-30 hover:bg-white hover:bg-opacity-20 mobile-optimized"
        >
          <Home className={`mr-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
          {!isMobile && "Back to Universe"}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-30 flex gap-2">
      <Button
        onClick={toggleMute}
        variant="outline"
        size={isMobile ? "default" : "lg"}
        className="bg-black bg-opacity-50 text-white border-white border-opacity-30 hover:bg-white hover:bg-opacity-20"
      >
        {isMuted ? <VolumeX className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} /> : <Volume2 className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />}
      </Button>
      
      {/* Interaction status indicator */}
      {(userInteracting || isUserControlling) && (
        <Button
          variant="outline"
          size={isMobile ? "default" : "lg"}
          className="bg-purple-600 bg-opacity-50 text-white border-purple-400 border-opacity-50 animate-pulse cursor-default"
          disabled
        >
          <Gamepad2 className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
          {!isMobile && "Interactive"}
        </Button>
      )}
    </div>
  );
}
