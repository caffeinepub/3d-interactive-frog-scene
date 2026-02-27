import { create } from 'zustand';

interface SceneState {
  animationTime: number;
  isPlaying: boolean;
  togglePlay: () => void;
  resetAnimation: () => void;
  setAnimationTime: (time: number) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  animationTime: 0,
  isPlaying: true,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  resetAnimation: () => set({ animationTime: 0 }),
  setAnimationTime: (time) => set({ animationTime: time }),
}));
