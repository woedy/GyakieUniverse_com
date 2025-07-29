import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "ready" | "playing" | "ended";

interface GameState {
  phase: GamePhase;
  
  // Interactive universe controls
  isUserControlling: boolean;
  orbitSpeedMultiplier: number;
  userInteracting: boolean;
  
  // Actions
  start: () => void;
  restart: () => void;
  end: () => void;
  setUserControlling: (controlling: boolean) => void;
  setOrbitSpeedMultiplier: (multiplier: number) => void;
  setUserInteracting: (interacting: boolean) => void;
}

export const useGame = create<GameState>()(
  subscribeWithSelector((set) => ({
    phase: "ready",
    
    // Interactive controls
    isUserControlling: false,
    orbitSpeedMultiplier: 1.0,
    userInteracting: false,
    
    start: () => {
      set((state) => {
        // Only transition from ready to playing
        if (state.phase === "ready") {
          return { phase: "playing" };
        }
        return {};
      });
    },
    
    restart: () => {
      set(() => ({ phase: "ready" }));
    },
    
    end: () => {
      set((state) => {
        // Only transition from playing to ended
        if (state.phase === "playing") {
          return { phase: "ended" };
        }
        return {};
      });
    },
    
    setUserControlling: (controlling) => set({ isUserControlling: controlling }),
    setOrbitSpeedMultiplier: (multiplier) => set({ orbitSpeedMultiplier: multiplier }),
    setUserInteracting: (interacting) => set({ userInteracting: interacting }),
  }))
);
