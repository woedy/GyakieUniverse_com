import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type SceneSection = "universe" | "music" | "images" | "tours" | "shop" | "about";
export type AnimationPhase = "initial" | "walking" | "arrived" | "scattering" | "idle";

interface SceneState {
  currentSection: SceneSection;
  previousSection: SceneSection;
  sceneLoaded: boolean;
  welcomeShown: boolean;
  animationPhase: AnimationPhase;
  isTransitioning: boolean;
  
  // Actions
  setCurrentSection: (section: SceneSection) => void;
  setPreviousSection: (section: SceneSection) => void;
  setSceneLoaded: (loaded: boolean) => void;
  setWelcomeShown: (shown: boolean) => void;
  setAnimationPhase: (phase: AnimationPhase) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  goBack: () => void;
}

export const useScene = create<SceneState>()(
  subscribeWithSelector((set, get) => ({
    currentSection: "universe",
    previousSection: "universe",
    sceneLoaded: false,
    welcomeShown: false,
    animationPhase: "initial",
    isTransitioning: false,
    
    setCurrentSection: (section) => set((state) => ({ 
      previousSection: state.currentSection,
      currentSection: section 
    })),
    setPreviousSection: (section) => set({ previousSection: section }),
    setSceneLoaded: (loaded) => set({ sceneLoaded: loaded }),
    setWelcomeShown: (shown) => set({ welcomeShown: shown }),
    setAnimationPhase: (phase) => set({ animationPhase: phase }),
    setIsTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
    goBack: () => {
      const { previousSection } = get();
      set({ currentSection: previousSection === "universe" ? "universe" : "universe" });
    },
  }))
);
