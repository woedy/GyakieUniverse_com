import React, { useRef, useState, useEffect } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";
import { useScene } from "../../lib/stores/useScene";
import { useAudio } from "../../lib/stores/useAudio";
import { useGame } from "../../lib/stores/useGame";

export default function GyakieCharacter() {
  const meshRef = useRef<Mesh>(null);
  const { animationPhase, setAnimationPhase, setWelcomeShown, setCurrentSection } = useScene();
  const { playSuccess, playHit } = useAudio();
  const { userInteracting, isUserControlling } = useGame();
  const [position, setPosition] = useState([-12, 0, 0]);
  const [walkCycle, setWalkCycle] = useState(0);
  
  // Click detection state
  const startPointer = useRef({ x: 0, y: 0 });
  const startTime = useRef(0);
  const CLICK_TIME_THRESHOLD = 300; // ms
  const CLICK_DISTANCE_THRESHOLD = 8; // pixels

  // Handle phase transitions with useEffect to avoid state updates during render
  useEffect(() => {
    if (animationPhase === 'initial') {
      // Start the opening sequence after a brief delay
      const timer = setTimeout(() => {
        setAnimationPhase('walking');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animationPhase, setAnimationPhase]);

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
          // Use requestAnimationFrame to avoid state update during render
          requestAnimationFrame(() => {
            setAnimationPhase('arrived');
            playSuccess();
            // Show welcome message for 3 seconds
            setTimeout(() => {
              setWelcomeShown(true);
              setTimeout(() => {
                setAnimationPhase('scattering');
              }, 2000);
            }, 3000);
          });
          return [0, bobHeight, 0];
        }
        return [newX, bobHeight, 0];
      });
    } else if (animationPhase === 'arrived' || animationPhase === 'idle') {
      // Gentle floating animation
      const floatHeight = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      setPosition([0, floatHeight, 0]);
    }

    meshRef.current.position.set(position[0], position[1], position[2]);
    
    // Rotation for walking
    if (animationPhase === 'walking') {
      meshRef.current.rotation.z = Math.sin(walkCycle * 2) * 0.1;
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
      playHit();
      console.log('Gyakie character clicked - navigating to about!');
      
      // Navigate to about section after a brief delay
      setTimeout(() => {
        setCurrentSection('about');
      }, 200);
    }
    
    // Stop event propagation
    e.stopPropagation();
  };

  return (
    <mesh 
      ref={meshRef} 
      castShadow
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      userData={{ clickable: true }}
    >
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
        
        {/* Arms - with welcoming gesture */}
        <mesh 
          position={[-0.6, 0.2, 0]} 
          rotation={[
            animationPhase === 'arrived' ? -0.5 : 0, 
            0, 
            animationPhase === 'arrived' ? 0.8 : Math.sin(walkCycle * 2) * 0.3
          ]}
        >
          <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
          <meshStandardMaterial color="#DEB887" />
        </mesh>
        <mesh 
          position={[0.6, 0.2, 0]} 
          rotation={[
            animationPhase === 'arrived' ? -0.5 : 0, 
            0, 
            animationPhase === 'arrived' ? -0.8 : -Math.sin(walkCycle * 2) * 0.3
          ]}
        >
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
