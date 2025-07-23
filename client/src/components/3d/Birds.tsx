import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";
import * as THREE from "three";
import { useScene } from "../../lib/stores/useScene";

const BIRD_COUNT = 12;

export default function Birds() {
  const meshRef = useRef<InstancedMesh>(null);
  const { animationPhase } = useScene();
  
  // Pre-calculate bird data outside render
  const birdData = useMemo(() => {
    const birds = [];
    for (let i = 0; i < BIRD_COUNT; i++) {
      birds.push({
        id: i,
        initialPosition: [
          (Math.random() - 0.5) * 10,
          Math.random() * 3 + 1,
          (Math.random() - 0.5) * 10
        ],
        scatterDirection: [
          (Math.random() - 0.5) * 20,
          Math.random() * 5 + 2,
          (Math.random() - 0.5) * 20
        ],
        speed: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2
      });
    }
    return birds;
  }, []);

  const tempObject = useMemo(() => new Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    birdData.forEach((bird, index) => {
      let x, y, z;
      
      if (animationPhase === 'initial' || animationPhase === 'walking') {
        // Birds are initially resting, with gentle movement
        x = bird.initialPosition[0] + Math.sin(state.clock.elapsedTime + bird.phase) * 0.5;
        y = bird.initialPosition[1] + Math.sin(state.clock.elapsedTime * 2 + bird.phase) * 0.2;
        z = bird.initialPosition[2] + Math.cos(state.clock.elapsedTime + bird.phase) * 0.3;
      } else {
        // Birds scatter when Gyakie arrives
        const scatterTime = state.clock.elapsedTime - 3; // Assuming 3 seconds to walk
        x = bird.initialPosition[0] + bird.scatterDirection[0] * scatterTime * bird.speed;
        y = bird.initialPosition[1] + bird.scatterDirection[1] * scatterTime * bird.speed;
        z = bird.initialPosition[2] + bird.scatterDirection[2] * scatterTime * bird.speed;
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
