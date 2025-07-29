import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGame } from "../../lib/stores/useGame";
import * as THREE from "three";

export default function InteractiveControls() {
  const { camera, gl } = useThree();
  const { 
    setUserControlling, 
    setOrbitSpeedMultiplier, 
    setUserInteracting,
    isUserControlling 
  } = useGame();
  
  const rotationRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0 });
  const startPointer = useRef({ x: 0, y: 0 });
  const pointerStartTime = useRef(0);
  const hasMoved = useRef(false);
  
  // Thresholds for click vs drag detection
  const CLICK_TIME_THRESHOLD = 300; // ms
  const CLICK_DISTANCE_THRESHOLD = 5; // pixels

  // Manual gesture handling with explicit drag activation
  useEffect(() => {
    const canvas = gl.domElement;
    let isPointerDown = false;
    
    const handlePointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      startPointer.current = { x: e.clientX, y: e.clientY };
      lastPointer.current = { x: e.clientX, y: e.clientY };
      pointerStartTime.current = Date.now();
      hasMoved.current = false;
      isDragging.current = false;
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Only process if pointer is actually down
      if (!isPointerDown) return;
      
      const deltaX = e.clientX - lastPointer.current.x;
      const deltaY = e.clientY - lastPointer.current.y;
      
      // Check if this is significant movement to distinguish from click
      const totalDistance = Math.sqrt(
        Math.pow(e.clientX - startPointer.current.x, 2) + 
        Math.pow(e.clientY - startPointer.current.y, 2)
      );
      
      // Only start dragging if movement exceeds threshold AND we have significant time/distance
      if (totalDistance > CLICK_DISTANCE_THRESHOLD && !isDragging.current && isPointerDown) {
        const timeDiff = Date.now() - pointerStartTime.current;
        
        // Require either significant movement OR some time passed to avoid accidental drags
        if (totalDistance > 15 || timeDiff > 100) {
          isDragging.current = true;
          hasMoved.current = true;
          setUserControlling(true);
          setUserInteracting(true);
          
          // Now capture pointer since we're definitely dragging
          canvas.setPointerCapture(e.pointerId);
          
          // Prevent further event propagation for drags
          e.preventDefault();
          e.stopPropagation();
        }
      }
      
      // Only handle drag operations if we're actually dragging
      if (!isDragging.current) return;
      
      // Prevent event propagation during active drag
      e.preventDefault();
      e.stopPropagation();
      
      // Update rotation based on drag
      rotationRef.current.x -= deltaY * 0.01;
      rotationRef.current.y -= deltaX * 0.01;
      
      // Store velocity for momentum
      rotationVelocity.current.x = -deltaY * 0.001;
      rotationVelocity.current.y = -deltaX * 0.001;
      
      // Control orbit speed based on drag intensity
      const dragIntensity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const speedMultiplier = Math.max(0.1, 1 - dragIntensity * 0.01);
      setOrbitSpeedMultiplier(speedMultiplier);
      
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      isPointerDown = false;
      
      const timeDiff = Date.now() - pointerStartTime.current;
      const totalDistance = Math.sqrt(
        Math.pow(e.clientX - startPointer.current.x, 2) + 
        Math.pow(e.clientY - startPointer.current.y, 2)
      );
      
      // Determine if this was a click (short time + minimal movement)
      const wasClick = timeDiff < CLICK_TIME_THRESHOLD && 
                      totalDistance < CLICK_DISTANCE_THRESHOLD && 
                      !hasMoved.current;
      
      if (wasClick) {
        // This was a click - allow it to propagate to 3D objects
        console.log('Click detected - allowing navigation');
      } else if (isDragging.current) {
        // This was a drag - we already handled the interaction
        console.log('Drag completed');
      }
      
      // Clean up drag state
      isDragging.current = false;
      setUserInteracting(false);
      
      // Only release pointer capture if we had captured it
      if (hasMoved.current) {
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch (e) {
          // Ignore errors if pointer wasn't captured
        }
      }
      
      // Release control after a delay to allow momentum (only if was dragging)
      if (hasMoved.current) {
        setTimeout(() => {
          if (!isDragging.current) {
            setUserControlling(false);
            setOrbitSpeedMultiplier(1.0);
          }
        }, 2000);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Scroll wheel zoom
      const zoomSpeed = e.deltaY * 0.001;
      camera.position.multiplyScalar(1 + zoomSpeed);
      
      // Clamp zoom limits
      const distance = camera.position.length();
      if (distance < 5) {
        camera.position.normalize().multiplyScalar(5);
      } else if (distance > 50) {
        camera.position.normalize().multiplyScalar(50);
      }
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('wheel', handleWheel);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [camera, gl.domElement, setUserControlling, setOrbitSpeedMultiplier, setUserInteracting]);

  // Camera rotation with momentum
  useFrame(() => {
    if (isUserControlling) {
      // Apply rotation when user is controlling
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(camera.position);
      spherical.theta += rotationRef.current.y;
      spherical.phi += rotationRef.current.x;
      
      // Clamp phi to prevent flipping
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
      
      camera.position.setFromSpherical(spherical);
      camera.lookAt(0, 0, 0);
      
      // Reset rotation deltas
      rotationRef.current.x = 0;
      rotationRef.current.y = 0;
    } else if (!isDragging.current) {
      // Apply momentum when not dragging
      if (Math.abs(rotationVelocity.current.x) > 0.001 || Math.abs(rotationVelocity.current.y) > 0.001) {
        const spherical = new THREE.Spherical();
        spherical.setFromVector3(camera.position);
        spherical.theta += rotationVelocity.current.y;
        spherical.phi += rotationVelocity.current.x;
        
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
        
        camera.position.setFromSpherical(spherical);
        camera.lookAt(0, 0, 0);
        
        // Dampen velocity
        rotationVelocity.current.x *= 0.95;
        rotationVelocity.current.y *= 0.95;
      }
    }
  });

  return null;
}