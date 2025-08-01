import React, { useEffect, useState } from "react";
import { useGame } from "../../lib/stores/useGame";
import { useIsMobile } from "../../hooks/use-is-mobile";
import { Card } from "./card";
import { Badge } from "./badge";
import { Hand, RotateCcw, ZoomIn, MousePointer } from "lucide-react";

export default function InteractionInstructions() {
  const { userInteracting, orbitSpeedMultiplier, isUserControlling } = useGame();
  const isMobile = useIsMobile();
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    // Hide instructions after user starts interacting
    if (userInteracting) {
      setTimeout(() => setShowInstructions(false), 3000);
    }
  }, [userInteracting]);

  return (
    <>
      {/* Instructions for first-time users */}
      {showInstructions && !userInteracting && (
        <div className={`fixed bottom-14 left-4 z-30 ${isMobile ? 'max-w-xs' : 'max-w-sm'}`}>
          <Card className="bg-black bg-opacity-80 border-purple-400 border-opacity-50">
            <div className={`${isMobile ? 'p-3' : 'p-4'}`}>
              <h3 className={`text-white font-semibold mb-3 flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <Hand className={`text-purple-400 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                Interactive Universe
              </h3>
              <div className={`space-y-2 text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                <div className="flex items-center gap-2">
                  <MousePointer className={`text-blue-400 ${isMobile ? 'h-2 w-2' : 'h-3 w-3'}`} />
                  <span>{isMobile ? 'Touch & drag to rotate' : 'Drag to rotate the universe'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className={`text-green-400 ${isMobile ? 'h-2 w-2' : 'h-3 w-3'}`} />
                  <span>{isMobile ? 'Hold to control orbits' : 'Hold & drag to control planet orbits'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ZoomIn className={`text-yellow-400 ${isMobile ? 'h-2 w-2' : 'h-3 w-3'}`} />
                  <span>{isMobile ? 'Pinch to zoom' : 'Scroll to zoom in/out'}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Real-time interaction feedback */}
      {(userInteracting || isUserControlling) && (
        <div className={`fixed ${isMobile ? 'top-30' : 'top-1/2'} left-4 ${!isMobile && 'transform -translate-y-1/2'} z-30`}>
          <div className="space-y-2">
            {isUserControlling && (
              <Badge className={`bg-purple-600 text-white animate-pulse ${isMobile ? 'text-xs' : ''}`}>
                <RotateCcw className={`mr-1 ${isMobile ? 'h-2 w-2' : 'h-3 w-3'}`} />
                {isMobile ? 'Controlling' : 'Controlling Universe'}
              </Badge>
            )}
            {orbitSpeedMultiplier !== 1.0 && (
              <Badge className={`bg-blue-600 text-white ${isMobile ? 'text-xs' : ''}`}>
                Orbit: {(orbitSpeedMultiplier * 100).toFixed(0)}%
              </Badge>
            )}
          </div>
        </div>
      )}
    </>
  );
}