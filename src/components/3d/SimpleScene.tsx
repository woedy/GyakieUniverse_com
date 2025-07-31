import React, { useEffect } from "react";
import { useScene } from "../../lib/stores/useScene";

export default function SimpleScene() {
  const { setSceneLoaded } = useScene();

  useEffect(() => {
    // Immediately set scene as loaded for testing
    setSceneLoaded(true);
  }, [setSceneLoaded]);

  return (
    <>
      <color attach="background" args={["#000611"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Simple test sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      
      {/* Test text */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshStandardMaterial color="#4ECDC4" />
      </mesh>
    </>
  );
}