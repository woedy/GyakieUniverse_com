import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useScene } from "../../lib/stores/useScene";
import { useGame } from "../../lib/stores/useGame";
import GyakieCharacter from "./GyakieCharacter";
import Birds from "./Birds";
import Universe from "./Universe";
import Lighting from "./Lighting";
import InteractiveControls from "./InteractiveControls";
import BackgroundAliens from "./BackgroundAliens";

export default function Scene() {
  const { setSceneLoaded, animationPhase } = useScene();
  const { isUserControlling } = useGame();
  const { scene } = useThree();

  useEffect(() => {
    // Scene is ready
    setTimeout(() => {
      setSceneLoaded(true);
    }, 1000);
  }, [setSceneLoaded]);

  return (
    <>
      {/* Background */}
      <color attach="background" args={["#000611"]} />
      
      {/* Lighting */}
      <Lighting />
      
      {/* Interactive Controls - Enhanced manual controls */}
      <InteractiveControls />
      
      {/* Orbit Controls - Disabled when user is manually controlling */}
      <OrbitControls
        enabled={!isUserControlling}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />

      {/* Universe with planets */}
      <Universe />

      {/* Birds that will scatter */}
      {(animationPhase === 'initial' || animationPhase === 'walking' || animationPhase === 'arrived' || animationPhase === 'scattering') && <Birds />}

      {/* Gyakie character */}
      <GyakieCharacter />

      {/* Background aliens and spaceships */}
      <BackgroundAliens />
    </>
  );
}
