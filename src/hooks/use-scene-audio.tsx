import { useEffect } from "react";
import { useAudio } from "../lib/stores/useAudio";
import { useScene } from "../lib/stores/useScene";

export function useSceneAudio() {
  const { backgroundMusic, isMuted } = useAudio();
  const { sceneLoaded, welcomeShown } = useScene();

  useEffect(() => {
    if (backgroundMusic && sceneLoaded && welcomeShown && !isMuted) {
      backgroundMusic.play().catch(error => {
        console.log("Background music play prevented:", error);
      });
    } else if (backgroundMusic && (isMuted || !sceneLoaded || !welcomeShown)) {
      backgroundMusic.pause();
    }
  }, [backgroundMusic, sceneLoaded, welcomeShown, isMuted]);

  return null;
}
