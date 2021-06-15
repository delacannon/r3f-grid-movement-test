import create from "zustand";

const useStore = create((set) => ({
  tiles: [],
  currentPos: null,
  currentAction: "",
  currentPlayerPos: { pos: { x: 0, y: 0 } },
  setCurrentPlayerPos: (tile) => set({ currentPlayerPos: tile }),
  setCurrentPos: (tile) => set({ tile }),
  setTiles: (tiles) => set({ tiles }),
  setCurrentAction: (action) => set({ currentAction: action }),
}));

export { useStore };
