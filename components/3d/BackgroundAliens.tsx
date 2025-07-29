import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import * as THREE from "three";

interface AlienProps {
  position: [number, number, number];
  scale: number;
  color: string;
  animationOffset: number;
}

function Alien({ position, scale, color, animationOffset }: AlienProps) {
  const groupRef = useRef<Group>(null);
  const eyeRef1 = useRef<Mesh>(null);
  const eyeRef2 = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime + animationOffset;
    
    // Gentle floating motion
    const floatY = Math.sin(time * 0.8) * 0.3;
    const bobX = Math.cos(time * 0.5) * 0.1;
    
    groupRef.current.position.set(
      position[0] + bobX,
      position[1] + floatY,
      position[2]
    );
    
    // Slight rotation to look curious
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    
    // Blinking eyes
    if (eyeRef1.current && eyeRef2.current) {
      const blink = Math.sin(time * 3) > 0.8 ? 0.1 : 1;
      eyeRef1.current.scale.y = blink;
      eyeRef2.current.scale.y = blink;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Alien body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Large head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Large eyes */}
      <mesh ref={eyeRef1} position={[-0.4, 1.4, 0.8]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh ref={eyeRef2} position={[0.4, 1.4, 0.8]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Eye glow */}
      <mesh position={[-0.4, 1.4, 0.9]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.4, 1.4, 0.9]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Thin arms */}
      <mesh position={[-1, 0.2, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[1, 0.2, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Thin legs */}
      <mesh position={[-0.3, -1, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.3, -1, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

interface SpaceshipProps {
  startPosition: [number, number, number];
  endPosition: [number, number, number];
  speed: number;
  scale: number;
  color: string;
}

function Spaceship({ startPosition, endPosition, speed, scale, color }: SpaceshipProps) {
  const groupRef = useRef<Group>(null);
  const engineRef1 = useRef<Mesh>(null);
  const engineRef2 = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = (state.clock.elapsedTime * speed) % 1;
    
    // Interpolate between start and end positions
    const x = THREE.MathUtils.lerp(startPosition[0], endPosition[0], time);
    const y = THREE.MathUtils.lerp(startPosition[1], endPosition[1], time) + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    const z = THREE.MathUtils.lerp(startPosition[2], endPosition[2], time);
    
    groupRef.current.position.set(x, y, z);
    
    // Point towards direction of travel
    const direction = new THREE.Vector3(
      endPosition[0] - startPosition[0],
      endPosition[1] - startPosition[1],
      endPosition[2] - startPosition[2]
    ).normalize();
    
    groupRef.current.lookAt(
      groupRef.current.position.x + direction.x,
      groupRef.current.position.y + direction.y,
      groupRef.current.position.z + direction.z
    );
    
    // Engine glow effect
    if (engineRef1.current && engineRef2.current) {
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 10) * 0.3;
      const material1 = engineRef1.current.material as THREE.MeshStandardMaterial;
      const material2 = engineRef2.current.material as THREE.MeshStandardMaterial;
      material1.emissiveIntensity = intensity;
      material2.emissiveIntensity = intensity;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main hull */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.5, 2, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Cockpit */}
      <mesh position={[0.8, 0, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      
      {/* Wings */}
      <mesh position={[-0.5, 0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1.5, 0.1, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.5, -0.8, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[1.5, 0.1, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Engine glow */}
      <mesh ref={engineRef1} position={[-1.2, 0.4, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={0.8} />
      </mesh>
      <mesh ref={engineRef2} position={[-1.2, -0.4, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function DistantAsteroid({ position, scale, rotationSpeed }: { position: [number, number, number], scale: number, rotationSpeed: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    meshRef.current.rotation.x += rotationSpeed;
    meshRef.current.rotation.y += rotationSpeed * 0.7;
    meshRef.current.rotation.z += rotationSpeed * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#8B7355" roughness={0.8} />
    </mesh>
  );
}

export default function BackgroundAliens() {
  // Pre-calculate alien positions and properties to avoid re-renders
  const aliens = useMemo(() => [
    {
      position: [-15, 8, -12] as [number, number, number],
      scale: 0.8,
      color: "#90EE90",
      animationOffset: 0
    },
    {
      position: [18, -6, -20] as [number, number, number],
      scale: 1.2,
      color: "#DDA0DD",
      animationOffset: 2
    },
    {
      position: [-20, 12, 15] as [number, number, number],
      scale: 0.6,
      color: "#87CEEB",
      animationOffset: 4
    },
    {
      position: [25, 3, 8] as [number, number, number],
      scale: 1.0,
      color: "#FFB6C1",
      animationOffset: 1.5
    },
    {
      position: [-8, -15, 25] as [number, number, number],
      scale: 0.9,
      color: "#98FB98",
      animationOffset: 3.2
    }
  ], []);

  // Pre-calculate spaceship paths
  const spaceships = useMemo(() => [
    {
      startPosition: [-30, 20, -10] as [number, number, number],
      endPosition: [30, 15, 20] as [number, number, number],
      speed: 0.1,
      scale: 1.5,
      color: "#C0C0C0"
    },
    {
      startPosition: [35, -18, 25] as [number, number, number],
      endPosition: [-35, -12, -15] as [number, number, number],
      speed: 0.08,
      scale: 1.2,
      color: "#FFD700"
    },
    {
      startPosition: [15, 25, -30] as [number, number, number],
      endPosition: [-20, -25, 30] as [number, number, number],
      speed: 0.12,
      scale: 0.8,
      color: "#FF6347"
    }
  ], []);

  // Distant asteroids for atmosphere
  const asteroids = useMemo(() => [
    { position: [-40, 25, -35] as [number, number, number], scale: 2, rotationSpeed: 0.001 },
    { position: [45, -20, 40] as [number, number, number], scale: 1.5, rotationSpeed: 0.002 },
    { position: [-35, -30, 20] as [number, number, number], scale: 1.8, rotationSpeed: 0.0015 },
    { position: [50, 15, -25] as [number, number, number], scale: 1.2, rotationSpeed: 0.0008 },
    { position: [30, 35, 30] as [number, number, number], scale: 2.2, rotationSpeed: 0.0012 },
    { position: [-45, 10, -45] as [number, number, number], scale: 1.0, rotationSpeed: 0.003 }
  ], []);

  return (
    <group>
      {/* Amazed alien spectators */}
      {aliens.map((alien, index) => (
        <Alien key={`alien-${index}`} {...alien} />
      ))}
      
      {/* Passing spaceships */}
      {spaceships.map((ship, index) => (
        <Spaceship key={`ship-${index}`} {...ship} />
      ))}

      {/* Distant asteroids for atmosphere */}
      {asteroids.map((asteroid, index) => (
        <DistantAsteroid key={`asteroid-${index}`} {...asteroid} />
      ))}
    </group>
  );
}