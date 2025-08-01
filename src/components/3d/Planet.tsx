import React, { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Mesh, Group, Vector3 } from "three";
import * as THREE from "three";
import { useTexture, Text, Html } from "@react-three/drei";
import { useScene } from "../../lib/stores/useScene";
import { useAudio } from "../../lib/stores/useAudio";
import { useGame } from "../../lib/stores/useGame";

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
  const groupRef = useRef<Group>(null);
  const textRef = useRef<Group>(null);
  const { setCurrentSection } = useScene();
  const { playHit } = useAudio();
  const { orbitSpeedMultiplier, userInteracting, isUserControlling } = useGame();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Click detection state
  const startPointer = useRef({ x: 0, y: 0 });
  const startTime = useRef(0);
  const CLICK_TIME_THRESHOLD = 300; // ms
  const CLICK_DISTANCE_THRESHOLD = 8; // pixels

  // Load texture if provided
  const texture = textureUrl ? useTexture(textureUrl) : null;

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;

    // Orbit around center with adjustable speed
    const time = state.clock.elapsedTime;
    const adjustedSpeed = orbitSpeed * orbitSpeedMultiplier * 0.3; // Slower default orbit
    const x = Math.cos(time * adjustedSpeed) * orbitRadius;
    const z = Math.sin(time * adjustedSpeed) * orbitRadius;
    
    // Update both planet and text position together
    groupRef.current.position.set(x, position[1], z);
    
    // Rotate the planet
    meshRef.current.rotation.y += 0.01;
    
    // Hover effect
    const scale = hovered ? 1.1 : 1;
    meshRef.current.scale.setScalar(scale);
    
    // Keep text facing camera
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position);
    }
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    // Don't interfere if user is already controlling the scene
    if (isUserControlling || userInteracting) {
      return;
    }
    
    startPointer.current = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
    startTime.current = Date.now();
    
    // Stop event propagation to prevent canvas controls from taking over
    e.stopPropagation();
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    // Don't interfere if user is controlling the scene
    if (isUserControlling || userInteracting) {
      return;
    }
    
    const timeDiff = Date.now() - startTime.current;
    const distance = Math.sqrt(
      Math.pow(e.nativeEvent.clientX - startPointer.current.x, 2) + 
      Math.pow(e.nativeEvent.clientY - startPointer.current.y, 2)
    );

    // Check if this was a quick click with minimal movement
    const wasClick = timeDiff < CLICK_TIME_THRESHOLD && distance < CLICK_DISTANCE_THRESHOLD;
    
    if (wasClick) {
      setClicked(true);
      playHit();
      console.log(`Planet ${section} clicked - navigating!`);
      
      // Navigate to section after a brief delay
      setTimeout(() => {
        setCurrentSection(section as any);
      }, 200);
    }
    
    // Stop event propagation
    e.stopPropagation();
  };

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        userData={{ clickable: true }}
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
      
      {/* Planet label that moves with planet - Beautiful handwriting style */}
      <group ref={textRef} position={[0, size + 1.5, 0]}>
        <Html
          center
          distanceFactor={10}
          transform
          occlude
          style={{
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          <div
            className={`transition-all duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '20px',
              fontWeight: '700',
              color: '#ff69b4',
              textShadow: '2px 2px 4px rgba(45, 27, 105, 0.9), 0 0 12px rgba(255, 105, 180, 0.6)',
              letterSpacing: '2px',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              filter: hovered ? 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.9))' : 'drop-shadow(0 0 6px rgba(255, 105, 180, 0.4))',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          >
            {label}
          </div>
        </Html>
      </group>
      
      {/* Ring effect for some planets */}
      {size > 1 && (
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size + 0.2, size + 0.4, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}
