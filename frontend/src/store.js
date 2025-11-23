import { create } from 'zustand';

const useStore = create((set) => ({
  isVR: false,
  toggleVR: () => set((state) => ({ isVR: !state.isVR })),
}));

export default useStore;
