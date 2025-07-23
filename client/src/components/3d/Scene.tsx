import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useScene } from "../../lib/stores/useScene";
import GyakieCharacter from "./GyakieCharacter";
import Birds from "./Birds";
import Universe from "./Universe";
import Lighting from "./Lighting";

export default function Scene() {
  const { setSceneLoaded, animationPhase } = useScene();
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
      
      {/* Camera Controls */}
      <OrbitControls
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
      {animationPhase === 'initial' && <Birds />}

      {/* Gyakie character */}
      <GyakieCharacter />
    </>
  );
}
