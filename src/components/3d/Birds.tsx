import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";
import * as THREE from "three";
import { useScene } from "../../lib/stores/useScene";

const BIRD_COUNT = 12;

interface BirdData {
  id: number;
  initialPosition: number[];
  scatterDirection: number[];
  speed: number;
  phase: number;
}

export default function Birds() {
  const meshRef = useRef<InstancedMesh>(null);
  const { animationPhase, setAnimationPhase } = useScene();
  const [scatterStartTime, setScatterStartTime] = useState<number | null>(null);
  
  // Pre-calculate bird data outside render - positioned on Gyakie initially
  const birdData = useMemo(() => {
    const birds: BirdData[] = [];
    const positions = [
      // On shoulders
      [-0.8, 1.2, 0.3], [0.8, 1.2, 0.3],
      // On head/hair
      [-0.3, 1.8, 0.2], [0.3, 1.8, 0.2],
      // Flying nearby
      [-1.5, 2, 0], [1.5, 2, 0],
      [-1, 0.5, 1], [1, 0.5, 1],
      [0, 3, -1], [-0.5, 2.5, -0.8],
      [0.5, 2.5, -0.8], [0, 1.5, 1.2]
    ];
    
    for (let i = 0; i < BIRD_COUNT; i++) {
      const pos = positions[i] || [
        (Math.random() - 0.5) * 3,
        Math.random() * 2 + 1,
        (Math.random() - 0.5) * 3
      ];
      
      birds.push({
        id: i,
        initialPosition: pos,
        scatterDirection: [
          (Math.random() - 0.5) * 30,
          Math.random() * 10 + 5,
          (Math.random() - 0.5) * 30
        ],
        speed: Math.random() * 3 + 2,
        phase: Math.random() * Math.PI * 2
      });
    }
    return birds;
  }, []);

  const tempObject = useMemo(() => new Object3D(), []);

  // Handle scattering phase
  useEffect(() => {
    if (animationPhase === 'scattering' && scatterStartTime === null) {
      setScatterStartTime(Date.now());
      
      // After birds scatter, transition to idle
      setTimeout(() => {
        setAnimationPhase('idle');
      }, 3000);
    }
  }, [animationPhase, scatterStartTime, setAnimationPhase]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    birdData.forEach((bird, index) => {
      let x, y, z;
      
      if (animationPhase === 'initial' || animationPhase === 'walking' || animationPhase === 'arrived') {
        // Birds follow Gyakie's position while she walks, then rest on her
        const charakterX = animationPhase === 'walking' ? -12 + (state.clock.elapsedTime - 1) * 2 : 0;
        
        x = charakterX + bird.initialPosition[0] + Math.sin(state.clock.elapsedTime + bird.phase) * 0.1;
        y = bird.initialPosition[1] + Math.sin(state.clock.elapsedTime * 2 + bird.phase) * 0.05;
        z = bird.initialPosition[2] + Math.cos(state.clock.elapsedTime + bird.phase) * 0.1;
      } else if (animationPhase === 'scattering' && scatterStartTime) {
        // Birds scatter dramatically
        const scatterTime = (Date.now() - scatterStartTime) / 1000;
        x = bird.initialPosition[0] + bird.scatterDirection[0] * scatterTime * bird.speed;
        y = bird.initialPosition[1] + bird.scatterDirection[1] * scatterTime * bird.speed;
        z = bird.initialPosition[2] + bird.scatterDirection[2] * scatterTime * bird.speed;
      } else {
        // Birds have scattered and are gone
        x = 1000; // Far away
        y = 1000;
        z = 1000;
      }

      tempObject.position.set(x, y, z);
      
      // Wing flapping rotation
      tempObject.rotation.y = Math.sin(state.clock.elapsedTime * 8 + bird.phase) * 0.3;
      tempObject.rotation.z = Math.sin(state.clock.elapsedTime * 6 + bird.phase) * 0.2;
      
      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(index, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, BIRD_COUNT]} castShadow>
      {/* Simple bird shape */}
      <group>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#4A4A4A" />
      </group>
    </instancedMesh>
  );
}
