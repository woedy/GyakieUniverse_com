import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import Planet from "./Planet";
import * as THREE from "three";

export default function Universe() {
  // Create starfield
  const stars = useMemo(() => {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return starGeometry;
  }, []);

  return (
    <group>
      {/* Starfield */}
      <points geometry={stars}>
        <pointsMaterial size={0.5} color="#ffffff" sizeAttenuation={false} />
      </points>
      
      {/* Planets representing different sections */}
      <Planet
        position={[5, 2, 5]}
        size={1.2}
        color="#FF6B6B"
        section="music"
        label="MUSIC"
        orbitRadius={6}
        orbitSpeed={0.3}
      />
      
      <Planet
        position={[-4, 1, 6]}
        size={0.8}
        color="#4ECDC4"
        section="images"
        label="IMAGES"
        orbitRadius={5}
        orbitSpeed={0.5}
      />
      
      <Planet
        position={[7, -1, -3]}
        size={1.0}
        color="#45B7D1"
        section="tours"
        label="TOURS"
        orbitRadius={8}
        orbitSpeed={0.2}
      />
      
      <Planet
        position={[-6, 3, -4]}
        size={0.9}
        color="#FFA07A"
        section="shop"
        label="SHOP"
        orbitRadius={7}
        orbitSpeed={0.4}
      />
      
      <Planet
        position={[3, -2, -7]}
        size={0.7}
        color="#DDA0DD"
        section="about"
        label="ABOUT"
        orbitRadius={4}
        orbitSpeed={0.6}
      />

      {/* Central sun/core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFA500"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}
