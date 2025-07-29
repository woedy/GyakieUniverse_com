import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import { useAudio } from "./lib/stores/useAudio";
import { useScene } from "./lib/stores/useScene";
import Scene from "./components/3d/Scene";
import LoadingScreen from "./components/ui/LoadingScreen";
import WelcomeMessage from "./components/ui/WelcomeMessage";
import Navigation from "./components/ui/Navigation";
import InteractionInstructions from "./components/ui/InteractionInstructions";
import Music from "./components/sections/Music";
import Images from "./components/sections/Images";
import Tours from "./components/sections/Tours";
import Shop from "./components/sections/Shop";
import About from "./components/sections/About";
import "@fontsource/inter";

// Define control keys for camera movement
const controls = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
  { name: "rightward", keys: ["KeyD", "ArrowRight"] },
  { name: "rotate", keys: ["Space"] },
];

function App() {
  const { currentSection, sceneLoaded, welcomeShown } = useScene();
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    // Initialize audio
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    useAudio.getState().setBackgroundMusic(bgMusic);

    const hitSound = new Audio("/sounds/hit.mp3");
    useAudio.getState().setHitSound(hitSound);

    const successSound = new Audio("/sounds/success.mp3");
    useAudio.getState().setSuccessSound(successSound);

    setShowCanvas(true);
  }, []);

  if (!showCanvas) {
    return <LoadingScreen />;
  }

  return (
<div
  className={`w-screen h-screen relative overflow-hidden bg-black ${
    currentSection !== 'universe' ? 'overflow-y-auto' : ''
  }`}
>
      {!sceneLoaded && <LoadingScreen />}
      
      {sceneLoaded && !welcomeShown && <WelcomeMessage />}
      
      {currentSection === 'universe' && (
        <KeyboardControls map={controls}>
          <Canvas
            shadows
            camera={{
              position: [0, 5, 15],
              fov: 60,
              near: 0.1,
              far: 1000
            }}
            gl={{
              antialias: true,
              powerPreference: "high-performance",
              alpha: false
            }}
            style={{ 
              display: 'block',
              width: '100%',
              height: '100%',
              touchAction: 'none' // Prevent default touch behaviors
            }}
          >
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
          <Navigation />
          <InteractionInstructions />
        </KeyboardControls>
      )}

      {currentSection === 'music' && <Music />}
      {currentSection === 'images' && <Images />}
      {currentSection === 'tours' && <Tours />}
      {currentSection === 'shop' && <Shop />}
      {currentSection === 'about' && <About />}
    </div>
  );
}

export default App;
