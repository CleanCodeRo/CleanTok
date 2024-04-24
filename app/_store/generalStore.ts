import { create } from "zustand";
import { persist } from "zustand/middleware";

const generalStore = (set: any) => ({
    isSidebarOpen: false,
    toggleSidebarDisplay: () => set((state: any) => ({ isSidebarOpen: !state.isSidebarOpen })),
});

const useGeneralStore = create(
    persist(generalStore, {
        name: "general",
    })
);

export default useGeneralStore;
