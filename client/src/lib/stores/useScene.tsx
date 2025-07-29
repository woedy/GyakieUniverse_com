import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type SceneSection = "universe" | "music" | "images" | "tours" | "shop" | "about";
export type AnimationPhase = "initial" | "walking" | "arrived" | "scattering" | "idle";

interface SceneState {
  currentSection: SceneSection;
  sceneLoaded: boolean;
  welcomeShown: boolean;
  animationPhase: AnimationPhase;
  
  // Actions
  setCurrentSection: (section: SceneSection) => void;
  setSceneLoaded: (loaded: boolean) => void;
  setWelcomeShown: (shown: boolean) => void;
  setAnimationPhase: (phase: AnimationPhase) => void;
}

export const useScene = create<SceneState>()(
  subscribeWithSelector((set) => ({
    currentSection: "universe",
    sceneLoaded: false,
    welcomeShown: false,
    animationPhase: "initial",
    
    setCurrentSection: (section) => set({ currentSection: section }),
    setSceneLoaded: (loaded) => set({ sceneLoaded: loaded }),
    setWelcomeShown: (shown) => set({ welcomeShown: shown }),
    setAnimationPhase: (phase) => set({ animationPhase: phase }),
  }))
);
