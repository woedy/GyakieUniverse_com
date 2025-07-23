import { Button } from "./button";
import { useScene } from "../../lib/stores/useScene";
import { useAudio } from "../../lib/stores/useAudio";
import { Volume2, VolumeX, Home } from "lucide-react";

export default function Navigation() {
  const { currentSection, setCurrentSection } = useScene();
  const { isMuted, toggleMute } = useAudio();

  const handleHome = () => {
    setCurrentSection('universe');
  };

  if (currentSection !== 'universe') {
    return (
      <div className="fixed top-4 left-4 z-30">
        <Button
          onClick={handleHome}
          variant="outline"
          size="lg"
          className="bg-black bg-opacity-50 text-white border-white border-opacity-30 hover:bg-white hover:bg-opacity-20"
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Universe
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-30 flex gap-2">
      <Button
        onClick={toggleMute}
        variant="outline"
        size="lg"
        className="bg-black bg-opacity-50 text-white border-white border-opacity-30 hover:bg-white hover:bg-opacity-20"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  );
}
