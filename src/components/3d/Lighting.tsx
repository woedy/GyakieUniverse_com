import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Lighting() {
  const directionalRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    if (directionalRef.current) {
      // Gentle light movement
      directionalRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 10;
      directionalRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.2) * 10;
    }
  });

  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.4} color="#404040" />
      
      {/* Main directional light */}
      <directionalLight
        ref={directionalRef}
        intensity={1.2}
        position={[10, 10, 5]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Point light for character highlighting */}
      <pointLight
        intensity={0.8}
        position={[0, 5, 5]}
        color="#ffffff"
        distance={20}
        decay={2}
      />
      
      {/* Rim lighting for dramatic effect */}
      <directionalLight
        intensity={0.5}
        position={[-10, 2, -5]}
        color="#4169E1"
      />
    </>
  );
}
