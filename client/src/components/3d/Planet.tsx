import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";
import { useTexture, Text } from "@react-three/drei";
import { useScene } from "../../lib/stores/useScene";
import { useAudio } from "../../lib/stores/useAudio";

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  section: string;
  label: string;
  orbitRadius: number;
  orbitSpeed: number;
  textureUrl?: string;
}

export default function Planet({ 
  position, 
  size, 
  color, 
  section, 
  label, 
  orbitRadius, 
  orbitSpeed,
  textureUrl 
}: PlanetProps) {
  const meshRef = useRef<Mesh>(null);
  const { setCurrentSection } = useScene();
  const { playHit } = useAudio();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Load texture if provided
  const texture = textureUrl ? useTexture(textureUrl) : null;

  useFrame((state) => {
    if (!meshRef.current) return;

    // Orbit around center
    const time = state.clock.elapsedTime;
    const x = Math.cos(time * orbitSpeed) * orbitRadius;
    const z = Math.sin(time * orbitSpeed) * orbitRadius;
    
    meshRef.current.position.set(x, position[1], z);
    
    // Rotate the planet
    meshRef.current.rotation.y += 0.01;
    
    // Hover effect
    const scale = hovered ? 1.1 : 1;
    meshRef.current.scale.setScalar(scale);
  });

  const handleClick = () => {
    setClicked(true);
    playHit();
    
    // Navigate to section after a brief delay
    setTimeout(() => {
      setCurrentSection(section as any);
    }, 200);
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : color}
          map={texture}
          emissive={hovered ? "#333333" : "#000000"}
        />
      </mesh>
      
      {/* Planet label */}
      <Text
        position={[position[0], position[1] + size + 1, position[2]]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>
      
      {/* Ring effect for some planets */}
      {size > 1 && (
        <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size + 0.2, size + 0.4, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}
