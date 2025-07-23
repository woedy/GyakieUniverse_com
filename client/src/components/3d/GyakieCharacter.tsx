import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";
import { useScene } from "../../lib/stores/useScene";
import { useAudio } from "../../lib/stores/useAudio";

export default function GyakieCharacter() {
  const meshRef = useRef<Mesh>(null);
  const { animationPhase, setAnimationPhase, setWelcomeShown } = useScene();
  const { playSuccess } = useAudio();
  const [position, setPosition] = useState([-8, 0, 0]);
  const [walkCycle, setWalkCycle] = useState(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Walking animation
    setWalkCycle(prev => prev + delta * 5);
    
    // Bob up and down while walking
    const bobHeight = Math.sin(walkCycle) * 0.1;
    
    if (animationPhase === 'walking') {
      // Walk from left to center
      setPosition(prev => {
        const newX = prev[0] + delta * 2;
        if (newX >= 0) {
          // Reached center, stop walking
          setAnimationPhase('arrived');
          playSuccess();
          // Show welcome message for 3 seconds
          setTimeout(() => {
            setWelcomeShown(true);
            setAnimationPhase('idle');
          }, 3000);
          return [0, bobHeight, 0];
        }
        return [newX, bobHeight, 0];
      });
    } else if (animationPhase === 'arrived' || animationPhase === 'idle') {
      // Gentle floating animation
      const floatHeight = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      setPosition([0, floatHeight, 0]);
    }

    meshRef.current.position.set(...position);
    
    // Rotation for walking
    if (animationPhase === 'walking') {
      meshRef.current.rotation.z = Math.sin(walkCycle * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      {/* Simple character representation - a stylized figure */}
      <group>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 1.5, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        
        {/* Head */}
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#DEB887" />
        </mesh>
        
        {/* Hair */}
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color="#2F1B14" />
        </mesh>
        
        {/* Arms */}
        <mesh position={[-0.6, 0.2, 0]} rotation={[0, 0, Math.sin(walkCycle * 2) * 0.3]}>
          <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
          <meshStandardMaterial color="#DEB887" />
        </mesh>
        <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, -Math.sin(walkCycle * 2) * 0.3]}>
          <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
          <meshStandardMaterial color="#DEB887" />
        </mesh>
        
        {/* Legs */}
        <mesh position={[-0.2, -1.2, 0]} rotation={[Math.sin(walkCycle * 2) * 0.3, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
          <meshStandardMaterial color="#4169E1" />
        </mesh>
        <mesh position={[0.2, -1.2, 0]} rotation={[-Math.sin(walkCycle * 2) * 0.3, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
          <meshStandardMaterial color="#4169E1" />
        </mesh>
      </group>
    </mesh>
  );
}
