import { create } from 'zustand'


type Store = {
    count: number
    inc: () => void
  }

const useProductStore = create((set) => ({
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),
  }))

export default useProductStore