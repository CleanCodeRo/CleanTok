import { create } from "zustand";
import { persist } from "zustand/middleware";

const generalStore = (set: any) => ({
    showSidebar: false,

    toggleSidebarDisplay: () => set((state: any) => ({ showSidebar: !state.showSidebar })),
});

const useGeneralStore = create(
    persist(generalStore, {
        name: "general",
    })
);

export default useGeneralStore;
