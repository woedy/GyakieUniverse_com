import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

interface PlanetLabelProps {
  position: Vector3;
  label: string;
  isHovered: boolean;
}

export default function PlanetLabel({ position, label, isHovered }: PlanetLabelProps) {
  const labelRef = useRef<HTMLDivElement>(null);
  const { camera, size } = useThree();
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useFrame(() => {
    if (!labelRef.current) return;

    // Convert 3D position to screen coordinates
    const vector = position.clone();
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * size.width;
    const y = (vector.y * -0.5 + 0.5) * size.height;
    
    // Check if the position is behind the camera
    const isInFront = vector.z < 1;
    setIsVisible(isInFront);
    
    if (isInFront) {
      setScreenPosition({ x, y });
    }
  });

  useEffect(() => {
    if (!labelRef.current) return;

    const labelElement = labelRef.current;
    labelElement.style.transform = `translate3d(${screenPosition.x}px, ${screenPosition.y}px, 0)`;
    labelElement.style.opacity = isVisible ? '1' : '0';
  }, [screenPosition, isVisible]);

  return (
    <div
      ref={labelRef}
      className={`fixed pointer-events-none z-20 transition-all duration-300 ${
        isHovered ? 'scale-110' : 'scale-100'
      }`}
      style={{
        position: 'fixed',
        left: '-50%',
        top: '-50%',
        transformOrigin: 'center center',
        fontFamily: 'Dancing Script, cursive',
        fontSize: '24px',
        fontWeight: '700',
        color: '#ff69b4',
        textShadow: '2px 2px 4px rgba(45, 27, 105, 0.8), 0 0 10px rgba(255, 105, 180, 0.5)',
        letterSpacing: '1px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        filter: isHovered ? 'drop-shadow(0 0 8px rgba(255, 105, 180, 0.8))' : 'none',
      }}
    >
      {label}
    </div>
  );
}