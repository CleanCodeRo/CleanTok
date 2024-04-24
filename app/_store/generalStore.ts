import { create } from "zustand";
import { persist } from "zustand/middleware";

const generalStore = (set: any) => ({
    isSidebarOpen: false,
    toggleSidebarDisplay: () => set((state: any) => ({ isSidebarOpen: !state.isSidebarOpen })),
    isModalOpen: false,
    toggleModalDisplay: () => set((state: any) => ({ isModalOpen: !state.isModalOpen })),
});

const useGeneralStore = create(
    persist(generalStore, {
        name: "general",
    })
);

export default useGeneralStore;
